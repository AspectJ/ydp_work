package com.cp.rest.weix.tools;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.cp.rest.weix.WxLoginRest;
import com.cp.util.HttpRequestTools;
import com.tools.wxpay.tencent.common.Configure;

import net.sf.json.JSONObject;

public class WXLoginUtil
{
	private static final Logger logger = LoggerFactory.getLogger(WxLoginRest.class);
	
	public static String loginAuthorizePath(String redirectURI, String state) throws UnsupportedEncodingException
	{
		StringBuffer urlstr = new StringBuffer();
		urlstr.append("https://open.weixin.qq.com/connect/oauth2/authorize?");
		urlstr.append("appid=").append(Configure.getAppid());
		urlstr.append("&redirect_uri=").append(redirectURI);
		urlstr.append("&response_type=code&scope=snsapi_base&state=" + state);
		urlstr.append("#wechat_redirect");
		
		return urlstr.toString();
	}
	
	
	/**
	 * 微信登录获取openid和state
	 * @throws IOException 
	 * @throws MalformedURLException, IOException 
	 */
	public static Map<String, String> getWxLoginParam(HttpServletRequest request) throws MalformedURLException, IOException, IOException
	{
		String code = request.getParameter("code");
		String state = request.getParameter("state");

		StringBuffer paramBuffer = new StringBuffer();
		paramBuffer.append("appid=").append(Configure.getAppid());
		paramBuffer.append("&code=").append(code);
		paramBuffer.append("&grant_type=authorization_code");
		paramBuffer.append("&secret=").append(Configure.appsecret);
		String url = "https://api.weixin.qq.com/sns/oauth2/access_token?" + paramBuffer.toString();
		String result = HttpRequestTools.getHttpRequest(url, paramBuffer.toString(), null);

		logger.info("微信登录获取openid, {}", result);
		
		JSONObject jsonObject = JSONObject.fromObject(result);
		String openid = jsonObject.getString("openid");
//		String unitid = jsonObject.getString("unitid");
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("openid", openid);
		map.put("state", state);
//		map.put("unitid", unitid);
		return map;
	}
}
