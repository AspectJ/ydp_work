package com.cp.rest.weix.tools;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;

import com.cp.util.HttpRequestTools;
import com.mongo.MyMongo;
import com.tools.wxpay.tencent.common.Configure;

import net.sf.json.JSONObject;

public class WxCouponsUtil
{

	/**
	 * 创建卡劵
	 * @param card_type 卡劵类型
	 * @param title 卡券名
	 * @param sub_title 副标题
	 * @param deal_detail 详情(测试劵 \n 爆米花一份 \n 小可一份)
	 * @param quantity 投放数量
	 * @param beginTime 卡劵开始时间
	 * @param endTime 卡劵过期时间
	 * @param description 卡券使用说明
	 * @param notice 卡券使用提醒
	 * @return 卡劵ID
	 * @throws ParseException 
	 */
//	public static String createCard(String card_type, String title, String sub_title, String deal_detail, String quantity, 
//			String beginTime, String endTime, String description, String notice) throws ParseException
	public static String createCard(String access_token, String card_type, String title, String sub_title, String deal_detail, String quantity, 
			String beginTime, String expiry, String description, String notice) throws ParseException
	{
		String url = Configure.CARDCREATE + access_token;

		JSONObject base_info = new JSONObject();
		base_info.put("title", title); // 卡券名 (建议涵盖卡券属性、服务及金额)
		base_info.put("notice", notice); // 卡券使用提醒
		base_info.put("sub_title", sub_title); // 卡券名的副标题 (鸳鸯锅底+牛肉1份+土豆一份)
		base_info.put("description", description); // 卡券使用说明

		base_info.put("color", "Color010"); // 券颜色。按色彩规范标注填写Color010-Color100
		base_info.put("brand_name", "易得票电子商务有限公司"); // 商户
		base_info.put("logo_url", Configure.CARDLOGO); // 卡券的商户logo
		base_info.put("code_type", "CODE_TYPE_QRCODE");
		
		JSONObject sku = new JSONObject();
		sku.put("quantity", quantity); // 卡券库存的数量，不支持填写0
		base_info.put("sku", sku);

		JSONObject date_info = new JSONObject();
		date_info.put( "type", "DATE_TYPE_FIX_TERM" ); // DATE_TYPE_FIX_TIME_RANGE 为固定日期区间，DATE_TYPE_FIX_TERM为固定时长
		date_info.put( "begin_timestamp", new SimpleDateFormat("yyyy.MM.dd HH:mm:ss").parse(beginTime).getTime() / 1000 );
//		date_info.put( "end_timestamp", new SimpleDateFormat("yyyy.MM.dd HH:mm:ss").parse(endTime).getTime() / 1000 );
		date_info.put( "fixed_term", expiry );
		date_info.put( "fixed_begin_term", 0 );
		base_info.put("date_info", date_info);

		base_info.put("service_phone", "400-677-8292"); // 客服电话
		base_info.put("use_custom_code", true); // 是否自定义Code码
		base_info.put("bind_openid", true); // 是否指定用户领取
		base_info.put("source", "易得票微信公众号"); // 第三方来源名，例如同程旅游、大众点评。
		base_info.put("custom_url_name", "购买影票"); // 自定义跳转外链的入口名字
		base_info.put("custom_url", "http://open-wx.yidepiao.cn/rest/user/login?channel=2"); // 自定义跳转外链的入口名字

		JSONObject movie_ticket = new JSONObject();
		movie_ticket.put("deal_detail", deal_detail);
		movie_ticket.put("base_info", base_info);

		JSONObject cardJson = new JSONObject();
		cardJson.put("card_type", card_type);
		cardJson.put(card_type.toLowerCase(), movie_ticket);

		JSONObject paramJson = new JSONObject();
		paramJson.put("card", cardJson);

		System.out.println(paramJson.toString());

		try
		{
			String resultStr = HttpRequestTools.getHttpRequest(url, paramJson.toString(), "application/json;charset=UTF-8");
			MyMongo.mLog("INFO", "创建卡劵", resultStr);

			JSONObject resultJson = JSONObject.fromObject(resultStr);
			if (resultJson.getInt("errcode") == 0)
			{
				return resultJson.getString("card_id");
			}
		} catch (IOException e)
		{
			e.printStackTrace();
		}
		return null;
	}
	
	
	/**
	 * 卡劵-线下核销
	 */
	public static boolean chargeOff(String access_token, Object card_id, Object code) throws ParseException
	{
		boolean flag = false;
		
		// 查询卡劵Code
		String url = Configure.CARD_GET + access_token;
		JSONObject card_info = new JSONObject();
		card_info.put("card_id", card_id);
		card_info.put("code", code);
		card_info.put("check_consume", true);
		
		try
		{
			String resultStr = HttpRequestTools.getHttpRequest(url, card_info.toString(), "application/json;charset=UTF-8");
			MyMongo.mLog("INFO", "查询卡劵Code", resultStr);

			JSONObject resultJson = JSONObject.fromObject(resultStr);
			if ( resultJson.getInt("errcode") == 0 && "NORMAL".equals(resultJson.getString("user_card_status")) )
			{
				// 卡劵核销
				url = Configure.CARD_CONSUME + access_token;
				card_info.remove("check_consume");
				
				resultStr = HttpRequestTools.getHttpRequest(url, card_info.toString(), "application/json;charset=UTF-8");
				MyMongo.mLog("INFO", "卡劵核销", resultStr);
				
				resultJson = JSONObject.fromObject(resultStr);
				if ( resultJson.getInt("errcode") == 0 )
				{
					return true;
				}
			}
		} catch (IOException e)
		{
			e.printStackTrace();
		}
		return flag;
	}
	
	
	 /**
     * 用SHA1算法生成安全签名
     * @param token 票据
     * @param timestamp 时间戳
     * @param nonce 随机字符串
     * @param encrypt 密文
     * @return 安全签名
     * @throws NoSuchAlgorithmException 
     * @throws AesException 
     */
	public static String getSHA1(Map<String, String> map) throws NoSuchAlgorithmException
	{
		ArrayList<String> list = new ArrayList<String>();
		for (Map.Entry<String, String> entry : map.entrySet())
		{
			if (entry.getValue() != "")
			{
				list.add(String.valueOf(entry.getValue()));
			}
		}
		int size = list.size();
		String[] arrayToSort = list.toArray(new String[size]);
		Arrays.sort(arrayToSort, String.CASE_INSENSITIVE_ORDER);
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < size; i++)
		{
			sb.append(arrayToSort[i]);
		}

		System.out.println(sb);

		String str = sb.toString();
		// SHA1签名生成
		MessageDigest md = MessageDigest.getInstance("SHA-1");
		md.update(str.getBytes());
		byte[] digest = md.digest();

		StringBuffer hexstr = new StringBuffer();
		String shaHex = "";
		for (int i = 0; i < digest.length; i++)
		{
			shaHex = Integer.toHexString(digest[i] & 0xFF);
			if (shaHex.length() < 2)
			{
				hexstr.append(0);
			}
			hexstr.append(shaHex);
		}
		return hexstr.toString();
	}
}
