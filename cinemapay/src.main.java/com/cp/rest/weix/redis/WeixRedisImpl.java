package com.cp.rest.weix.redis;

import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.stereotype.Service;

import com.cp.filter.BaseRedis;

/**
 * redis用户操作
 */
@Service("weixRedis")
public class WeixRedisImpl extends BaseRedis
{
	/**
	 * 微信授权码
	 * @param string
	 * @param api_component_token
	 */
	public String getWXToken(String tokenname)
	{
		RedisConnection conn = jedisConnectionFactory.getConnection();
		conn.select(0);
		byte[] key = toByte("user:weix:" + tokenname);
		String token = toString(conn.get(key));
		conn.close();
		return token;
	}

	
	/**
	 * 设置微信access_token
	 */
	public void setAccessToken(String access_token)
	{
		RedisConnection conn = jedisConnectionFactory.getConnection();
		conn.select(3);
		byte[] key = toByte("cinamepay:weix:access_token");
		conn.set(key, toByte(access_token));
		conn.close();
	}
	
	
	/**
	 * 获取微信access_token
	 */
	public String getAccessToken()
	{
		RedisConnection conn = jedisConnectionFactory.getConnection();
		conn.select(3);
		byte[] key = toByte("cinamepay:weix:access_token");
		String access_token = toString(conn.get(key));
		conn.close();
		return access_token;
	}

	public void setApiTicket(String api_ticket)
	{
		RedisConnection conn = jedisConnectionFactory.getConnection();
		conn.select(3);
		byte[] key = toByte("cinamepay:weix:api_ticket");
		conn.set(key, toByte(api_ticket));
		conn.close();
	}
	public String getApiTicket()
	{
		RedisConnection conn = jedisConnectionFactory.getConnection();
		conn.select(3);
		byte[] key = toByte("cinamepay:weix:api_ticket");
		String api_ticket = toString(conn.get(key));
		conn.close();
		return api_ticket;
	}
}
