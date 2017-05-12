package com.cp.rest.weix;

import java.io.IOException;
import java.net.MalformedURLException;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cp.rest.weix.redis.WeixRedisImpl;
import com.cp.util.HttpRequestTools;
import com.mongo.MyMongo;
import com.tools.wxpay.tencent.common.Configure;

import net.sf.json.JSONObject;

/**
 * 微信获取tocken线程
 * @author Stone
 * @create 2016-3-12 下午4:57:47
 */
@Service
public class AccessTokenThread extends Thread
{
	private static Logger logger = LoggerFactory.getLogger(AccessTokenThread.class);
	
//	public static String access_token; // 服务开发方的access_token
	
//	public static String api_ticket; // 卡券 api_ticket
	
	@Autowired
	private WeixRedisImpl weixRedis;
	
	@PostConstruct
	private void initAccessThread(){
		this.start();
	}
	
	@Override
	public void run()
	{
		while (true)
		{
			try
			{
				String  url = Configure.GETTOCKET + "&appid=" + Configure.getAppid() 
						+ "&secret=" + Configure.appsecret;
				
				String result = HttpRequestTools.getHttpRequest(url, null, null);
				String access_token = JSONObject.fromObject(result).getString("access_token");
				MyMongo.mLog("INFO", "微信获取tocken", access_token);
				
				url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+ access_token +"&type=wx_card";
				result = HttpRequestTools.getHttpRequest(url, null, null);
				String api_ticket = JSONObject.fromObject(result).getString("ticket");
				MyMongo.mLog("INFO", "微信卡券api_ticket", api_ticket);
				
				weixRedis.setAccessToken(access_token);
				weixRedis.setApiTicket(api_ticket);
				
				Thread.sleep(1000 * 60 * 30);
			} catch (InterruptedException e)
			{
				logger.error("微信获取tocken线程", e);
			} catch (MalformedURLException e)
			{
				logger.error("微信获取tocken线程", e);
			} catch (IOException e)
			{
				logger.error("微信获取tocken线程", e);
			}
		}
	}
}