package com.cp.rest.weix;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

import org.jboss.resteasy.annotations.cache.NoCache;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cp.filter.ReVerifyFilter;
import com.cp.rest.weix.redis.WeixRedisImpl;
import com.cp.rest.weix.tools.WXLoginUtil;
import com.cp.util.Config;

/**
 * 微信登录
 */
@Path("rest/wxlogin")
@NoCache
@Service()
public class WxLoginRest
{
	private static final Logger logger = LoggerFactory.getLogger(WxLoginRest.class);

	@Autowired
	private WeixRedisImpl weixRedis;
	
	/**
	 * 微信支付登录
	 */
	@GET
	@POST
	@Path("/wxPayLogin")
	@Consumes("application/json;charset=UTF-8")
	public void wxPayLogin(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		String productid = request.getParameter("productid");
		try
		{
			String redirectURI = URLEncoder.encode(Config.SERVICEURL + "rest/wxlogin/wxPay_AccessToken", "utf-8");
			String api_component_token = weixRedis.getWXToken("api_component_token");

			StringBuffer urlstr = new StringBuffer();
			urlstr.append("https://open.weixin.qq.com/connect/oauth2/authorize?");
			urlstr.append("appid=wx984f6afc9b7ec8d0");
			urlstr.append("&redirect_uri=").append(redirectURI);
			urlstr.append("&response_type=code&scope=snsapi_base&state=" + productid);
			urlstr.append("&component_appid=wx913f9d43f84eb680");
			urlstr.append("&component_access_token=").append(api_component_token);
			urlstr.append("#wechat_redirect");
			
			String resultstr = urlstr.toString();
			
			response.sendRedirect( resultstr );
			logger.info("微信支付登录,urlstr:{}", resultstr);
		} catch (IOException e)
		{
			logger.error("微信支付登录", e);
		}
	}
	/**
	 * 微信支付登录获取openid
	 */
	@GET
	@POST
	@Path("/wxPay_AccessToken")
	@Produces("text/html;charset=UTF-8")
	public void wxPay_AccessToken(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		try
		{
			Map<String, String> map = WXLoginUtil.getWxLoginParam(request);
			String productid = map.get("state");
			String openid = map.get("openid");

			ReVerifyFilter.addCookie(response, "openid", openid, 300);
			response.sendRedirect(Config.SERVICEURL + "view/WXPay.html?productid=" + productid);
		} catch (MalformedURLException e)
		{
			logger.error("", e);
		} catch (IOException e)
		{
			logger.error("", e);
		}
	}
	
	
	/**
	 * 查看用户下订单登录
	 */
	@GET
	@POST
	@Path("/wxOrderLogin")
	@Consumes("application/json;charset=UTF-8")
	public void wxOrderLogin(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		try
		{
			String redirectURI = URLEncoder.encode(Config.SERVICEURL + "rest/wxlogin/wxUserOrder_AccessToken", "utf-8");
			String api_component_token = weixRedis.getWXToken("api_component_token");

			StringBuffer urlstr = new StringBuffer();
			urlstr.append("https://open.weixin.qq.com/connect/oauth2/authorize?");
			urlstr.append("appid=wx984f6afc9b7ec8d0");
			urlstr.append("&redirect_uri=").append(redirectURI);
			urlstr.append("&response_type=code&scope=snsapi_base&state=");
			urlstr.append("&component_appid=wx913f9d43f84eb680");
			urlstr.append("&component_access_token=").append(api_component_token);
			urlstr.append("#wechat_redirect");
			
			String resultstr = urlstr.toString();
			
			response.sendRedirect( resultstr );
			logger.info("查看用户下订单登录,authorizePath:{}", resultstr);
		} catch (IOException e)
		{
			logger.error("查看用户下订单登录", e);
		}
	}
	/**
	 * 微信用户订单获取openid
	 */
	@GET
	@POST
	@Path("/wxUserOrder_AccessToken")
	@Produces("text/html;charset=UTF-8")
	public void wxUserOrder_AccessToken(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		try
		{
			Map<String, String> map = WXLoginUtil.getWxLoginParam(request);
			String openid = map.get("openid");
			ReVerifyFilter.addCookie(response, "openid", openid, 300);
			response.sendRedirect( Config.SERVICEURL + "view/weix/WXUserOrder.html" );
		} catch (MalformedURLException e)
		{
			logger.error("", e);
		} catch (IOException e)
		{
			logger.error("", e);
		}
	}
}
