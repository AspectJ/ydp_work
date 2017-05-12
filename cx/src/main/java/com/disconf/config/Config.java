package com.disconf.config;

import com.baidu.disconf.client.common.annotations.DisconfFile;
import com.baidu.disconf.client.common.annotations.DisconfFileItem;
import com.mongo.MyMongo;

/**
 * 静态 配置文件
 */
@DisconfFile(filename = "static.properties")
public class Config
{
	public static String cookiePubKey;

	public static int cookieMaxAge;

	@DisconfFileItem(name = "cookieMaxAge", associateField = "cookieMaxAge")
	public static int getCookieMaxAge()
	{
		return cookieMaxAge;
	}

	public static void setCookieMaxAge(int cookieMaxAge)
	{
		Config.cookieMaxAge = cookieMaxAge;
		 MyMongo.mLog("INFO", "静态配置文件设置", "cookieMaxAge:" + cookieMaxAge);
	}
	
	@DisconfFileItem(name = "cookiePubKey", associateField = "cookiePubKey")
	public static String getCookiePubKey()
	{
		return cookiePubKey;
	}

	public static void setCookiePubKey(String cookiePubKey)
	{
		Config.cookiePubKey = cookiePubKey;
		 MyMongo.mLog("INFO", "静态配置文件设置", "cookiePubKey:" + cookiePubKey);
	}
}
