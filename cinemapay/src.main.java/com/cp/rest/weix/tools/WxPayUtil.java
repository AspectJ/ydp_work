package com.cp.rest.weix.tools;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.xml.parsers.ParserConfigurationException;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.xml.sax.SAXException;

import com.cp.util.CodeUtil;
import com.cp.util.Config;
import com.cp.util.HttpRequestTools;
import com.mongo.MyMongo;
import com.tools.wxpay.tencent.common.Configure;
import com.tools.wxpay.tencent.common.Signature;
import com.tools.wxpay.tencent.common.XMLParser;

/**
 * 微信工具
 */
public class WxPayUtil
{
//	public static void main(String[] args)
//	{
//		System.out.println(WxPayUtil.getProductQrcode("1"));;
//	}
	
	/**
	 * 获取商品二维码
	 * @return
	 */
	public static String getProductQrcode(String product_id){
		String nonce_str = CodeUtil.getRandomUUID(8);
		
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("appid", Configure.getAppid());
		param.put("mch_id", Configure.getMchid());
		param.put("nonce_str", nonce_str);
		param.put("product_id", product_id);
		param.put("time_stamp", System.currentTimeMillis() / 1000);

		String sign = Signature.getSign(param);
		
		StringBuffer buff = new StringBuffer();
		Set<String> keys = param.keySet();
		for (String key : keys)
		{
			buff.append("&").append(key).append("=").append(param.get(key));
		}
		
		return "weixin://wxpay/bizpayurl?sign=" + sign + buff;
	}
	
	/**
	 * 微信统一下单
	 * @param nonce_str 32位随机字符串
	 * @param body 商品描述
	 * @param out_trade_no 商户订单号
	 * @param total_fee 总金额
	 * @return 预支付交易会话标识
	 */
	public static Map<String, Object> getPrepayID(String trade_type, String body, String out_trade_no, String total_fee, String product_id, String openid, String time_start, String time_expire)
	{
		String resultStr = null;
		try
		{
			String param = getParamXml(trade_type, product_id, openid, body, out_trade_no, total_fee, time_start, time_expire);
			resultStr = HttpRequestTools.getHttpRequest(Configure.UNIFIEDORDER_API, param, "application/x-www-form-urlencoded");
			
			MyMongo.mLog("INFO", "微信统一下单", resultStr);
			return parseReturnXML(resultStr); // 解析返回的数据
		} catch (IOException e)
		{
			MyMongo.mErrorLog("微信统一下单", resultStr, e);
		} catch (Exception e)
		{
			MyMongo.mErrorLog("微信统一下单", resultStr, e);
		}
		return null;
	}

	/**
	 * 拼凑传入参数
	 */
	private static String getParamXml(String trade_type, String product_id, String openid, String body, String out_trade_no, String total_fee , String time_start, String time_expire) 
	{
		String nonce_str = CodeUtil.getRandomUUID(32);
		
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("appid", Configure.getAppid());
		param.put("mch_id", Configure.getMchid());
		
		param.put("trade_type", trade_type);
		if("JSAPI".equals(trade_type)){
			param.put("openid", openid); // trade_type=JSAPI，此参数必传
		}else if("NATIVE".equals(trade_type)){
			param.put("product_id", product_id); // trade_type=NATIVE，此参数必传
		}
		
		param.put("total_fee", total_fee);
		param.put("out_trade_no", out_trade_no);
		param.put("body", body);
		param.put("detail", body);
		param.put("nonce_str", nonce_str);
		param.put("notify_url", Config.SERVICEURL + "rest/wxpay/notify_url");
		param.put("time_start", time_start);
		param.put("time_expire", time_expire);
		param.put("spbill_create_ip", Configure.getIP());

		// 生成签名
		String sign = Signature.getSign(param);
		param.put("sign", sign);

		StringBuffer buff = new StringBuffer();
		buff.append("<xml>");
		Set<String> setKey = param.keySet();
		for (String key : setKey)
		{
			buff.append("<").append(key).append("><![CDATA[").append(param.get(key)).append("]]></").append(key).append(">");
		}
		buff.append("</xml>");

		MyMongo.mLog("INFO", "微信统一下单-入参", buff);
		return buff.toString();
	}

	/**
	 * 微信统一下单-解析返回的数据
	 * 
	 * @param xml
	 * @return
	 * @throws SAXException 
	 * @throws IOException 
	 * @throws ParserConfigurationException 
	 * @throws DocumentException 
	 */
	private static Map<String, Object> parseReturnXML(String xml) throws ParserConfigurationException, IOException, SAXException, DocumentException
	{
		Map<String, Object> wxPayMap = new HashMap<String, Object>();
		
		if (xml != null && xml.length() > 0)
		{
			if (!Signature.checkIsSignValidFromResponseString(xml))
			{
				MyMongo.mLog("INFO", "微信统一下单", "签名错误");
				return wxPayMap;
			}

			Document doc = DocumentHelper.parseText(xml);
			Element root = doc.getRootElement();

			String return_code = root.selectSingleNode("return_code").getText(); // 返回状态码

			if ("SUCCESS".equals(return_code))
			{
				String result_code = root.selectSingleNode("result_code").getText();
				if ("SUCCESS".equals(result_code))
				{
					String prepay_id = root.selectSingleNode("prepay_id").getText();
					wxPayMap.put("prepay_id", prepay_id);
				} else
				{
					String err_code_des = root.selectSingleNode("err_code_des").getText();
					wxPayMap.put("err_code_des", err_code_des);
				}
			} else
			{
				String return_msg = root.selectSingleNode("return_msg").getText();
				wxPayMap.put("return_msg", return_msg);
			}
		}
		return wxPayMap;
	}

	
	/**
	 * 关闭订单
	 */
	public static boolean closeOrder(String out_trade_no)
	{
		boolean flag = false;
		String nonce_str = CodeUtil.getRandomUUID(32);

		try
		{
			out_trade_no = out_trade_no.substring(0, out_trade_no.indexOf("_N"));

			Map<String, Object> param = new HashMap<String, Object>();
			param.put("appid", Configure.getAppid());
			param.put("mch_id", Configure.getMchid());
			param.put("out_trade_no", out_trade_no);
			param.put("nonce_str", nonce_str);

			// 生成签名
			String sign = Signature.getSign(param);
			StringBuffer paramXml = new StringBuffer();
			paramXml.append("<xml>");
			paramXml.append("<appid>").append(Configure.getAppid()).append("</appid>");
			paramXml.append("<mch_id>").append(Configure.getMchid()).append("</mch_id>");
			paramXml.append("<nonce_str>").append(nonce_str).append("</nonce_str>");
			paramXml.append("<out_trade_no>").append(out_trade_no).append("</out_trade_no>");
			paramXml.append("<sign>").append(sign).append("</sign>");
			paramXml.append("</xml>");
			
			String resultStr = HttpRequestTools.getHttpRequest(Configure.UNIFIEDORDER_API, paramXml.toString(), "application/x-www-form-urlencoded");
			MyMongo.mLog("INFO", "微信-关闭订单", "【入参】" + paramXml + ",【返回】" + resultStr);

			if (resultStr != null && resultStr.length() > 0)
			{
				if (!Signature.checkIsSignValidFromResponseString(resultStr.toString()))
				{
					MyMongo.mLog("INFO", "微信-关闭订单", "签名错误");
				}
				Document doc = DocumentHelper.parseText(resultStr.toString());
				Element root = doc.getRootElement();
				String return_code = root.selectSingleNode("return_code").getText();

				if ("SUCCESS".equals(return_code))
				{
					flag = true;
				}
			}
		} catch (IOException e)
		{
			MyMongo.mErrorLog("微信-关闭订单", e);
		} catch (Exception e)
		{
			MyMongo.mErrorLog("微信-关闭订单", e);
		}
		return flag;
	}
	
	
	/**
	 * 从微信获取支付结果
	 * @param ordernumber
	 * @return
	 */
	public static Map<String, Object> getWXPayResult(String ordernumber)
	{
		Map<String, Object> payResultMap = null;
		try
		{
			// 拼凑传入参数
			String nonce_str = CodeUtil.getRandomUUID(32);
			
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("appid", Configure.getAppid());
			param.put("mch_id", Configure.getMchid());
			param.put("nonce_str", nonce_str);
			param.put("out_trade_no", ordernumber);
			
			StringBuffer sb = new StringBuffer();
			sb.append("<xml>");
			sb.append("<appid>").append(Configure.getAppid()).append("</appid>");
			sb.append("<mch_id>").append(Configure.getMchid()).append("</mch_id>");
			sb.append("<nonce_str>").append(nonce_str).append("</nonce_str>");
			sb.append("<out_trade_no>").append(ordernumber).append("</out_trade_no>");
			sb.append("<sign>").append(Signature.getSign(param)).append("</sign>");
			sb.append("</xml>");

			String resultStr = HttpRequestTools.getHttpRequest(Configure.ORDER_QUERY_API, sb.toString(), "application/x-www-form-urlencoded");
			
			MyMongo.mLog("INFO", "从微信获取支付结果返回", resultStr);
				
			if (Signature.checkIsSignValidFromResponseString(resultStr))
			{
				Map<String,Object> resultMap = XMLParser.getMapFromXML(resultStr.toString());
				if (resultMap.containsKey("return_code") && "SUCCESS".equals(resultMap.get("return_code").toString())
						&& resultMap.containsKey("result_code") && "SUCCESS".equals(resultMap.get("result_code").toString()))
				{
					String total_fee = resultMap.get("total_fee").toString();
					String transaction_id = resultMap.get("transaction_id").toString();
					String out_trade_no = resultMap.get("out_trade_no").toString();
					
					payResultMap = new HashMap<String, Object>();
					payResultMap.put("total_fee", total_fee);
					payResultMap.put("transaction_id", transaction_id);
					payResultMap.put("out_trade_no", out_trade_no);
				}
			}
		} catch (Exception e)
		{
			MyMongo.mErrorLog("从微信获取支付结果", e);
		}
		return payResultMap;
	}

	
	/**
	 * 微信接口退款
	 */
	public static boolean refund(String ordernumber, String total_fee)
	{
		boolean flag = false;
		try
		{
			// 拼凑传入参数
			String nonce_str = CodeUtil.getRandomUUID(32);
			
			Map<String, Object> param = new HashMap<String, Object>();
			param.put("appid", Configure.getAppid());
			param.put("mch_id", Configure.getMchid());
			param.put("nonce_str", nonce_str);
			param.put("out_trade_no", ordernumber);
			param.put("out_refund_no", ordernumber); // 商户退款单号
			param.put("total_fee", String.valueOf(Float.parseFloat(total_fee) * 100)); // 商户退款单号
			param.put("refund_fee", String.valueOf(Float.parseFloat(total_fee) * 100)); // 退款金额
			param.put("op_user_id", Configure.getMchid()); // 操作员帐号, 默认为商户号
			
			// 生成签名
			String sign = Signature.getSign(param);
			param.put("sign", sign);

			StringBuffer buff = new StringBuffer();
			buff.append("<xml>");
			Set<String> setKey = param.keySet();
			for (String key : setKey)
			{
				buff.append("<").append(key).append("><![CDATA[").append(param.get(key)).append("]]></").append(key).append(">");
			}
			buff.append("</xml>");

			String resultStr = HttpRequestTools.getHttpRequest(Configure.PAY_REFUND_API, buff.toString(), "application/x-www-form-urlencoded");
			
			MyMongo.mLog("INFO", "微信接口退款", resultStr);
				
			if (Signature.checkIsSignValidFromResponseString(resultStr))
			{
				Map<String,Object> resultMap = XMLParser.getMapFromXML(resultStr.toString());
				if (resultMap.containsKey("return_code") && "SUCCESS".equals(resultMap.get("return_code").toString())
						&& resultMap.containsKey("result_code") && "SUCCESS".equals(resultMap.get("result_code").toString()))
				{
					flag = true;
				}
			}
		} catch (Exception e)
		{
			MyMongo.mErrorLog("微信接口退款", e);
		}
		return flag;
	}
}
