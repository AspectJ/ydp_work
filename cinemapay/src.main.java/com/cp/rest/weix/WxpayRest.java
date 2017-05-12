package com.cp.rest.weix;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.jboss.resteasy.annotations.cache.NoCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cp.bean.ResMessage;
import com.cp.filter.BaseServlet;
import com.cp.filter.ReVerifyFilter;
import com.cp.rest.order.dao.OrderDaoImpl;
import com.cp.rest.weix.redis.WeixRedisImpl;
import com.cp.rest.weix.tools.WxCouponsUtil;
import com.cp.rest.weix.tools.WxPayUtil;
import com.cp.util.CodeUtil;
import com.cp.util.DateFormatUtil;
import com.mongo.MyMongo;
import com.tools.wxpay.tencent.common.Configure;
import com.tools.wxpay.tencent.common.Signature;

import net.sf.json.JSONObject;

@Path("rest/wxpay")
@NoCache
@Service
public class WxpayRest extends BaseServlet
{
	@Resource
	private OrderDaoImpl orderDao;

	@Autowired
	private WeixRedisImpl weixRedis;

	/**
	 * 回调商户支付URL
	 */
	@GET
	@POST
	@Path("/bizpayurl")
	@Produces("application/xml;charset=UTF-8")
	public String bizpayurl(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		String resultStr = "<xml><return_code>FAIL</return_code><return_msg>支付错误</return_msg></xml>";
		long stime = System.currentTimeMillis();
		StringBuffer xml = new StringBuffer();
		// -------------------------------------------------------------------------------
		try
		{
			// 获取请求参数
			BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream()));
			String readstr = reader.readLine();
			while (readstr != null)
			{
				xml.append(readstr);
				readstr = reader.readLine();
			}

			if (!Signature.checkIsSignValidFromResponseString(xml.toString()))
			{
				resultStr = "<xml><return_code>FAIL</return_code><return_msg>签名错误</return_msg></xml>";
				MyMongo.mLog("WARN", "回调商户支付URL", resultStr);
			} else
			{
				if (xml != null && xml.length() > 0)
				{
					Document doc = DocumentHelper.parseText(xml.toString());
					Element root = doc.getRootElement();

					// String openid = root.selectSingleNode("openid").getText();
					String product_id = root.selectSingleNode("product_id").getText();
					String body = "测试商品";
					// String body = new String("测试商品".getBytes("ISO-8859-1") ,"UTF-8");
					// String body = URLEncoder.encode("测试商品", "UTF-8");

					Date now = new Date();
					String time_start = DateFormatUtil.to_YYYYMMddHHmmss_str(now);
					String time_expire = DateFormatUtil.to_YYYYMMddHHmmss_str(DateFormatUtil.addMinute(now, 10));

					// 获取预付单信息
					Map<String, Object> wxPayMap = WxPayUtil.getPrepayID("NATIVE", body, CodeUtil.getRandomUUID(3), "1",
							product_id, null, time_start, time_expire);
					if (wxPayMap == null)
					{
						resultStr = "<xml><return_code>FAIL</return_code><return_msg>统一下单返回为空</return_msg></xml>";
						MyMongo.mLog("WARN", "回调商户支付URL", "统一下单返回为空");
					} else if (wxPayMap.containsKey("prepay_id"))
					{
						Map<String, Object> param = new HashMap<String, Object>();
						param.put("return_code", "SUCCESS");
						param.put("appid", Configure.getAppid());
						param.put("mch_id", Configure.getMchid());
						param.put("nonce_str", CodeUtil.getRandomUUID(32));
						param.put("prepay_id", wxPayMap.get("prepay_id"));
						param.put("result_code", "SUCCESS");

						String sign = Signature.getSign(param);
						param.put("sign", sign);

						StringBuffer buff = new StringBuffer();
						buff.append("<xml>");
						Set<String> setKey = param.keySet();
						for (String key : setKey)
						{
							buff.append("<").append(key).append(">").append(param.get(key)).append("</").append(key)
									.append(">");
						}
						buff.append("</xml>");
						resultStr = buff.toString();
					} else
					{
						resultStr = "<xml><return_code>FAIL</return_code><return_msg>统一下单返回错误</return_msg></xml>";
						MyMongo.mLog("WARN", "回调商户支付URL", wxPayMap.toString());
					}
				} else
				{
					MyMongo.mLog("WARN", "回调商户支付URL", resultStr);
				}
			}
		} catch (Exception e)
		{
			MyMongo.mErrorLog("回调商户支付URL", "IP" + CodeUtil.getRemortIP(request) + ",XML" + String.valueOf(xml), e);
		}
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("回调商户支付URL", etime - stime, request, resultStr);
		return resultStr;
	}

	/**
	 * 微信支付成功,同步到后台
	 */
	@GET
	@POST
	@Path("/return_url")
	@Produces("application/json;charset=UTF-8")
	public String return_url(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------

		String ordernumber = request.getParameter("ordernumber");

		try
		{
			if (CodeUtil.checkParam(ordernumber))
			{
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}

			String openid = ReVerifyFilter.getCookieByName(request, "openid").getValue();

			// 判断订单状态
			int status = orderDao.getOrderStatus(ordernumber);
			if (status == 1)
			{
				Map<String, Object> payResultMap = WxPayUtil.getWXPayResult(ordernumber);

				Map<String, Object> map = new HashMap<String, Object>();
				map.put("ordernumber", ordernumber);
				map.put("transaction_number", payResultMap.get("transaction_id"));
				orderDao.payOrder(map);
			} else if (status != 2)
			{
				return this.returnError(resultJson, ResMessage.Pay_Wx_OrderStatus_False.code, request);
			}

			// 投放卡劵
			String timestamp = String.valueOf(System.currentTimeMillis() / 1000);
			String cardCode = CodeUtil.randomNum(1000000000000000l, 9999999999999999l);

			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("ordernumber", ordernumber);
			paramMap.put("cardCode", cardCode);
			int result = orderDao.bindCard(paramMap); // 订单与卡劵绑定
			if (result == 1)
			{
				Map<String, String> map = new HashMap<String, String>();
				map.put("card_id", orderDao.getProductCardid(ordernumber));
				map.put("timestamp", timestamp);
				map.put("openid", openid);
				map.put("code", cardCode);
				map.put("nonce_str", CodeUtil.getRandomUUID(13));
				// map.put("api_ticket", AccessTokenThread.api_ticket);
				map.put("api_ticket", weixRedis.getApiTicket());
				map.put("signature", WxCouponsUtil.getSHA1(map));

				JSONObject wxcard = new JSONObject();
				wxcard.put("card_id", map.get("card_id"));
				map.remove("card_id");

				JSONObject card_ext = new JSONObject();

				Set<String> keys = map.keySet();
				for (String key : keys)
				{
					card_ext.put(key, map.get(key));
				}
				wxcard.put("card_ext", card_ext);
				resultJson.put("data", wxcard);
			}
		} catch (Exception e)
		{
			MyMongo.mErrorLog("微信支付成功,同步到后台", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}

		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("微信支付成功,同步到后台", etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}

	/**
	 * 微信支付，异步通知
	 */
	@GET
	@POST
	@Path("/notify_url")
	@Produces("application/xml;charset=UTF-8")
	public String notify_url(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		String resultStr = "<xml><return_code>FAIL</return_code><return_msg>支付错误</return_msg></xml>";
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------

		StringBuffer xml = new StringBuffer();

		try
		{
			// 获取请求参数
			BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream()));
			String readstr = reader.readLine();
			while (readstr != null)
			{
				xml.append(readstr);
				readstr = reader.readLine();
			}

			if (!Signature.checkIsSignValidFromResponseString(xml.toString()))
			{
				resultStr = "<xml><return_code>FAIL</return_code><return_msg>签名错误</return_msg></xml>";
				MyMongo.mLog("WARN", "微信支付-异步通知", resultStr);
			} else
			{
				if (xml != null && xml.length() > 0)
				{
					Document doc = DocumentHelper.parseText(xml.toString());
					Element root = doc.getRootElement();

					// 返回状态码
					String return_code = root.selectSingleNode("return_code").getText();
					if ("SUCCESS".equals(return_code))
					{
						// 业务结果
						String result_code = root.selectSingleNode("result_code").getText();
						if ("SUCCESS".equals(result_code))
						{
							String ordernumber = root.selectSingleNode("out_trade_no").getText(); // 商户订单号
							String transaction = root.selectSingleNode("transaction_id").getText(); // 微信支付订单号
							// String totalfee = String.valueOf(Float.parseFloat(root.selectSingleNode("total_fee").getText()) /
							// 100); // 总金额
							// 判断订单金额是否正确

							// 判断订单状态
							int status = orderDao.getOrderStatus(ordernumber);
							if (status == 1)
							{
								Map<String, Object> map = new HashMap<String, Object>();
								map.put("ordernumber", ordernumber);
								map.put("transaction_number", transaction);
								orderDao.payOrder(map);
								// 微信支付完成接口
								resultStr = "<xml><return_code>SUCCESS</return_code><return_msg>OK</return_msg></xml>";
								MyMongo.mLog("WARN", "微信支付-异步通知", resultStr);
							} else if (status == 2)
							{
								resultStr = "<xml><return_code>SUCCESS</return_code><return_msg>OK</return_msg></xml>";
							}
						} else
						{
							String err_code = root.selectSingleNode("err_code").getText(); // 错误代码
							String err_code_des = root.selectSingleNode("err_code_des").getText(); // 错误代码描述
							MyMongo.mLog("WARN", "微信支付-异步通知", err_code + "-" + err_code_des);
						}
					} else
					{
						// 返回信息
						String return_msg = root.selectSingleNode("return_msg").getText();
						MyMongo.mLog("WARN", "微信支付-异步通知", return_msg);
					}
				} else
				{
					MyMongo.mLog("WARN", "微信支付-异步通知", resultStr);
				}
			}
		} catch (Exception e)
		{
			MyMongo.mErrorLog("微信支付，异步通知", "IP" + CodeUtil.getRemortIP(request) + ",XML" + String.valueOf(xml), e);
		}
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("微信支付，异步通知", etime - stime, request, resultStr);
		return resultStr;
	}
}
