package com.common.huanxin;

import org.apache.http.client.methods.HttpEntityEnclosingRequestBase;
import org.apache.http.client.methods.HttpRequestBase;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.common.constant.ExceptionCode;
import com.common.exception.DpException;

/**
 * 
 * <p>
 * Title：认证管理器：即检查环信服务器的认证标识是否过期
 * </p>
 * <p>
 * Description：2015
 * </p>
 * <p>
 * Author : 2015-4-21
 * </p>
 * <p>
 * Department : 小区
 * </p>
 */
public class CredentialManager {

	public static Integer HHTPS_PORT = 443;
	public static String API_HTTP_SCHEMA = "https";
	public static String API_SERVER_HOST = "a1.easemob.com";
	public static String APPKEY = "hnsh#yxshyh";
	public static String APP_CLIENT_ID = "YXA6hGmmoHlMEeWm8q3QNyvP7g";
	public static String APP_CLIENT_SECRET = "YXA69og1avf0mOOHsxNAa7IFLJTTitE";
	public static String ORG_ADMIN_USERNAME = "";
	public static String ORG_ADMIN_PASSWORD = "";
	public static String DEFAULT_PASSWORD = "1234456";

	/**
	 * 获取环信验证TOKEN的grantType
	 */
	private final static String GRANT_TYPE_CREDENTIALS = "client_credentials";

	/**
	 * 用户登录环信的grantType
	 */
	public final static String GRANT_TYPE_PASSWORD = "password";

	private static String accessToken;
	private static Long expiredAt;

	/**
	 * <p>
	 * 作用描述：应用验证码：将验证串带入到header中，每次请求头部要包含该验证码串，否则环信服务端会验证失败
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param httpMethodEntity
	 * @param credentail
	 * 
	 */
	public static void applyAuthentication(
			HttpEntityEnclosingRequestBase httpMethodEntity) {
		String tokenStr = getToken();
		if (null != tokenStr && !"".equals(tokenStr)) {
			httpMethodEntity.addHeader("Authorization", "Bearer " + tokenStr);
		}
	}

	/**
	 * <p>
	 * 作用描述：应用验证码：将验证串带入到header中，每次请求头部要包含该验证码串，否则环信服务端会验证失败
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param httpMethodEntity
	 * @param credentail
	 * 
	 */
	public static void applyAuthentication(HttpRequestBase httpMethodEntity) {
		String tokenStr = getToken();
		if (null != tokenStr && !"".equals(tokenStr)) {
			httpMethodEntity.addHeader("Authorization", "Bearer " + tokenStr);
		}
	}

	private static String getToken() {

		if (null == accessToken || "".equals(accessToken) || isExpired()) {
			try {
				JSONObject reqParam = new JSONObject();
				reqParam.put("grant_type", GRANT_TYPE_CREDENTIALS);
				reqParam.put("client_id", APP_CLIENT_ID);
				reqParam.put("client_secret", APP_CLIENT_SECRET);

				String respContent = HuanxinUtil.sendHttpRequest(
						EndPoints.TOKEN_APP_URL, reqParam,
						HuanxinUtil.METHOD_POST, false);
				JSONObject resp = JSON.parseObject(respContent);
				// if (resp.getIntValue("statuscode") == HttpStatus.SC_OK) {

				accessToken = resp.getString("access_token");
				expiredAt = System.currentTimeMillis()
						+ resp.getLong("expires_in") * 1000;
				if (null == accessToken || "".equals(accessToken)) {
					throw new DpException(ExceptionCode.TOKEN_NULL, null);
				}
			} catch (Exception e) {
				throw new DpException(ExceptionCode.TOKEN_ERROR, e);
			}
		}
		return accessToken;
	}

	/**
	 * <p>
	 * 作用描述：token值是否过期
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @return
	 * 
	 */
	private static boolean isExpired() {
		return System.currentTimeMillis() > expiredAt;
	}

}
