package com.cp.rest.userinfo.redis;

import java.util.List;
import java.util.Map;

import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.stereotype.Service;

import com.cp.filter.BaseRedis;

import net.sf.json.JSONArray;

@Service("userRedis")
public class UserRedisImpl extends BaseRedis
{

	/**
	 * 用户登录保存用户信息(有效期7天)
	 * @param user
	 */
	public void saveUser(Map<String, Object> user)
	{
		RedisConnection conn = jedisConnectionFactory.getConnection();
		conn.select(3);
		byte[] key = toByte("cinamepay:user:userid:" + user.get("userid"));
		conn.hMSet(key, toByteMap(user));
		
		conn.expire(key, 3600 * 24 * 7);
		conn.close();
	}
	
	/**
	 * 获取用户信息单个字段
	 * @param id
	 * @param fieldName
	 * @return
	 */
	public String getUserField(String id, String fieldName)
	{
		return this.queryMapField(3, "cinamepay:user:userid:" + id, fieldName);
	}
	
	/**
	 * 获取用户信息值的列表
	 * @param id
	 * @param fieldName
	 * @return
	 */
	public List<String> getUserField(String id, byte[] ... fieldName)
	{
		return this.queryMapFields(3, "cinamepay:user:userid:" + id, fieldName);
	}
	
	
	/**
	 * 用户退出，删除记录
	 * @param id
	 * @param fieldName
	 * @return
	 */
	public void loginOut(String id)
	{
		removeKey(3, "cinamepay:user:userid:" + id);
	}

	/**
	 * @Title: privilegeCheck 
	 * @Description: 权限验证
	 * @param @param userid
	 * @param @param menuid
	 * @param @return
	 * @return boolean
	 * @throws
	 */
	public boolean privilegeCheck(int userid, String menuid)
	{
		String privilege = this.queryMapField(3, "cinamepay:user:userid:" + userid, "privilege");
		return JSONArray.fromObject(privilege).contains(menuid);
	}
}
