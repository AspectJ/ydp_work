package com.common.util;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;
import java.net.URLEncoder;

import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpRequestBase;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.common.constant.ExceptionCode;
import com.common.exception.DpException;
import com.common.httpclient.HttpClientManage;
import com.common.httpclient.IMethodEntity;
import com.common.huanxin.CredentialManager;
import com.common.huanxin.HuanxinUtil;

/**
 * 
 * <p>
 * Title：推送消息工具类
 * </p>
 * <p>
 * Description：推送消息工具类
 * </p>
 * <p>
 * Author : 2015-10-23
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */
public class SendSmsUtil {

	private final static String GB2312 = "GB2312";
	private final static String SMS_URL = "http://api.106msg.com/TXTJK.aspx";// 短信通道-URL
	private final static String QYID = "43";// 短信通道-企业ID
	private final static String ZH = "9197403_tz";// 短信通道-账号
	private final static String MM = "123456";// 短信通道-密码

	/**
	 * <p>
	 * 作用描述：发送短信
	 * </p>
	 * <p>
	 * 修改说明： 1 发送短信成功(其他请求代表成功) -1 账号无效或未开户 -2 账号密码错误 -3 下发手机号为空 -4 下发短信内容为空 -5
	 * 指定短信企业ID为空 -6 账户或密码错误 -7 账户被冻结 -8 下发短信内容包含非法关键词 -9 账户没有充值或指定企业ID错误 -10
	 * 下发短信内容长度超出规定限制，限制为350字符 -11 下发账号余额不足 -20 服务器连接异常 -21 当前短信隶属106营销短信
	 * 必须加“尊称”、“退订回复T” -99 系统未知错误
	 * </p>
	 * 
	 * @param tel
	 * @param content
	 * @return
	 * 
	 */
	public static boolean sendNote(String tel, String content) {
		DataOutputStream server = null;
		BufferedReader in = null;
		InputStreamReader is = null;
		boolean flag = false;
		try {
			String urlencContent = URLEncoder.encode(content, GB2312);
			String postData = "type=send&gwid=" + QYID + "&ua=" + ZH + "&pwd="
					+ MM + "&mobile=" + tel + "&msg=" + urlencContent;
			URL myurl = new URL(SMS_URL);
			URLConnection urlc = myurl.openConnection();
			urlc.setReadTimeout(1000 * 30);
			urlc.setDoOutput(true);
			urlc.setDoInput(true);
			urlc.setAllowUserInteraction(false);
			server = new DataOutputStream(urlc.getOutputStream());
			server.write(postData.getBytes(GB2312));
			server.close();
			server = null;

			is = new InputStreamReader(urlc.getInputStream(), GB2312);
			in = new BufferedReader(is);
			String resXml = "", s = "";
			while ((s = in.readLine()) != null) {
				resXml = resXml + s + "\r\n";
			}
			in.close();
			in = null;
			is.close();
			is = null;
			String respon = URLDecoder.decode(resXml, GB2312).replaceAll(
					"\r|\n", "");
			System.out.println("短信下发返回结果=" + respon);
			if (null != respon && !"".equals(respon) && respon.equals("1")) {
				flag = true;
			}
			return flag;
		} catch (Exception e) {
			throw new DpException(ExceptionCode.SMS_ERROR, e);
		} finally {
			try {
				if (null != server) {
					server.close();
					server = null;
				}
				if (null != in) {
					in.close();
					in = null;
				}
				if (null != is) {
					is.close();
					is = null;
				}
			} catch (IOException e) {
				throw new DpException(ExceptionCode.SMS_ERROR, e);
			}
		}
	}

	// 注册即时通讯服务器
	public static boolean zc(String hxid, String password) {
		try {
			JSONObject user = new JSONObject();
			user.put("username", hxid.toLowerCase());
			user.put("password", password);

			HttpClient httpClient = HttpClientManage.getClient(
					CredentialManager.API_HTTP_SCHEMA,
					CredentialManager.HHTPS_PORT, true);
			URL url = HuanxinUtil.getURL(CredentialManager.APPKEY.replace("#",
					"/") + "/users");
			String paramData = JSON.toJSONString(user);
			String resp = HttpClientManage.httpPost(httpClient, url, paramData,
					new IMethodEntity() {

						@Override
						public void addHeader(HttpRequestBase httpMethodEntity) {
							CredentialManager
									.applyAuthentication(httpMethodEntity);
						}
					});

			if (null != resp && !"".equals(resp)
					&& resp.contains(hxid.toLowerCase())) {
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			return false;
		}
	}

	// 重置密码：即时通讯服务器
	public static boolean czmm(String hxid, String password) {
		try {
			JSONObject user = new JSONObject();
			user.put("newpassword", password);

			HttpClient httpClient = HttpClientManage.getClient(
					CredentialManager.API_HTTP_SCHEMA,
					CredentialManager.HHTPS_PORT, true);
			URL url = HuanxinUtil.getURL(CredentialManager.APPKEY.replace("#",
					"/") + "/users/" + hxid + "/password");
			String paramData = JSON.toJSONString(user);
			String resp = HttpClientManage.httpPut(httpClient, url, paramData,
					new IMethodEntity() {

						@Override
						public void addHeader(HttpRequestBase httpMethodEntity) {
							CredentialManager
									.applyAuthentication(httpMethodEntity);
						}
					});

			if (null != resp && !"".equals(resp) && !resp.contains("error")) {
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * 推送消息
	 * 
	 * 
	 * @param users
	 *            要推送给的用户
	 * @param msg
	 *            要推送的消息内容 type、msg
	 * @param from
	 *            传null,表示这个消息是谁发出来的, 可以没有这个属性,那么就会显示是admin, 如果有的话,则会显示是这个用户发出的
	 * @param ext
	 *            附加的消息信息
	 * @return
	 */
	public static String sendSms(String[] users, JSONObject msg, String from,
			JSONObject ext) {
		String responseContent = null;
		try {
			JSONObject dataBody = new JSONObject();
			dataBody.put("target_type", "users");
			dataBody.put("target", users);
			dataBody.put("msg", msg);
			if (null != from && "".equals(from)) {
				from = null;
			}
			dataBody.put("from", from);
			dataBody.put("ext", ext);
			HttpClient httpClient = HttpClientManage.getClient(
					CredentialManager.API_HTTP_SCHEMA,
					CredentialManager.HHTPS_PORT, true);
			URL url = HuanxinUtil.getURL(CredentialManager.APPKEY.replace("#",
					"/") + "/messages");
			String paramData = JSON.toJSONString(dataBody);
			responseContent = HttpClientManage.httpPost(httpClient, url,
					paramData, new IMethodEntity() {

						@Override
						public void addHeader(HttpRequestBase httpMethodEntity) {
							CredentialManager
									.applyAuthentication(httpMethodEntity);
						}
					});

		} catch (Exception e) {
			throw new DpException(ExceptionCode.SEND_ERROR, e);
		}

		return responseContent;
	}

	public static void main(String[] args) {
		 String content = "您的注册验证码为：111111，请在10分钟内验证！";
		 boolean f = sendNote("18975167477", content);
		 System.out.println(f);

//		boolean f = czmm("00915JLKo0000002", "123456");
//		System.out.println(f);

		// String[] u = new String[] { "shaoen1", "shaoen2", "0001" };
		// JSONObject msg = new JSONObject();
		// msg.put("type", "txt");
		// msg.put("msg", "消息通知测试44");
		//
		// obj.put("from", "00915jlk80000001");// //表示这个消息是谁发出来的, 可以没有这个属性,
		// // 那么就会显示是admin, 如果有的话,
		// // 则会显示是这个用户发出的
		//
		// JSONObject ext = new JSONObject();
		// ext.put("xxid", "消息ID11");
		// ext.put("xxbk", "消息板块ID");
		// String res = sendSms(obj);
		// System.out.println(res);
	}

}
