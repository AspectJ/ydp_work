package com.cp.rest.weix.tools;

/**
 * 发送消息接口
 */
public class WxSendMessage
{
//	public static void main(String[] args) throws InterruptedException
//	{
//		new AccessTokenThread().start();
//		Thread.sleep(2000);
//		WxSendMessage.massMessagePreview();
//	}

	/**
	 * 预览接口
	 * 开发者可通过该接口发送消息给指定用户，在手机端查看消息的样式和排版。
	 * 为了满足第三方平台开发者的需求，在保留对openID预览能力的同时，增加了对指定微信号发送预览的能力，
	 * 但该能力每日调用次数有限制（100次），请勿滥用。
	 */
//	public static void massMessagePreview()
//	{
//		String url = Configure.MASS_MESSAGE_PREVIEW + AccessTokenThread.access_token;
//
//		JSONObject wxcard = new JSONObject();
//		wxcard.put("card_id", "pPB6tjjLFrsDEzfWnCmc4CtV6Tew");
//		
//		String timestamp = String.valueOf(System.currentTimeMillis() / 1000);
//		Map<String, Object> map = new HashMap<String, Object>();
//		map.put("timestamp", timestamp);
//		
//		JSONObject card_ext = new JSONObject();
////		card_ext.put("code", "");
//		card_ext.put("openid", "oPB6tjsIodhfAGysEP4m1YAkAhnA");
//		card_ext.put("timestamp", timestamp);
////		card_ext.put("nonce_str", "");
//		String signature = Signature.getSign(map);
//		card_ext.put("signature", signature);
//		
//		wxcard.put("card_ext", card_ext);
//		
//		JSONObject paramJson = new JSONObject();
//		paramJson.put("touser", "oPB6tjsIodhfAGysEP4m1YAkAhnA");
//		paramJson.put("msgtype", "wxcard");
//		paramJson.put("wxcard", wxcard);
//		
//		System.out.println(paramJson.toString());
//		
//		try
//		{
//			String resultStr = HttpRequestTools.getHttpRequest(url, paramJson.toString(), "application/json");
//			System.out.println(resultStr);
//		} catch (IOException e)
//		{
//			e.printStackTrace();
//		}
//	}
	
	
	/**
	 * 客服接口-发消息
	 * 客服消息有时间限制，微信用户如果24小时之内未与微信公众号互动过，则公众号无法向该微信用户发送客服消息。
	 */
//	public static void customMessageSend(String[] openids)
//	{
//		String url = Configure.CUSTOM_MESSAGE_SEND + AccessTokenThread.access_token;
//		
//		JSONObject wxcard = new JSONObject();
//		wxcard.put("card_id", "pPB6tjv_dltWkzpIWxxz2FrGP4c8");
//		wxcard.put("card_ext", "pPB6tjv_dltWkzpIWxxz2FrGP4c8");
//		
//		String timestamp = String.valueOf(System.currentTimeMillis() / 1000);
//		Map<String, Object> map = new HashMap<String, Object>();
//		map.put("timestamp", timestamp);
//		
//		JSONObject card_ext = new JSONObject();
////		card_ext.put("code", "");
////		card_ext.put("openid", "oPB6tjsIodhfAGysEP4m1YAkAhnA");
//		card_ext.put("timestamp", timestamp);
////		card_ext.put("nonce_str", "");
//		String signature = Signature.getSign(map);
//		card_ext.put("signature", signature);
//		
//		JSONObject paramJson = new JSONObject();
//		paramJson.put("touser", "oPB6tjsIodhfAGysEP4m1YAkAhnA");
//		wxcard.put("msgtype", "wxcard");
//		
////			{
////			   "touser":[
////			    "OPENID1",
////			    "OPENID2"
////			   ],
////			        "wxcard": {"card_id":"123dsdajkasd231jhksad"}
////			        "msgtype":"wxcard"
////			}
//		
//		try
//		{
//			String resultStr = HttpRequestTools.getHttpRequest(url, paramJson.toString(), "application/json;charset=UTF-8");
//			System.out.println(resultStr);
//		} catch (IOException e)
//		{
//			e.printStackTrace();
//		}
//	}
}
