package com.cx.filter;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.serializer.RedisSerializer;

/**
 * redis 数据处理
 * @author Administrator
 * @create 2015-11-16 上午11:37:57
 */
public class BaseRedis
{
	/**
	 * Redis数据操作对象
	 */
	@Autowired
	protected JedisConnectionFactory jedisConnectionFactory;

	@Autowired
	protected RedisSerializer<String> stringSerializer;

	public RedisSerializer<String> getStringSerializer()
	{
		return stringSerializer;
	}

	public void setStringSerializer(RedisSerializer<String> stringSerializer)
	{
		this.stringSerializer = stringSerializer;
	}
	
	
	/**
	 * byte[]转换成string
	 */
	public String toString(byte[] bytes)
	{
		return stringSerializer.deserialize(bytes);
	}

	
	/**
	 * string转换成byte[]
	 */
	public byte[] toByte(String key)
	{
		return stringSerializer.serialize(key);
	}
	
	/**
	 * objectmap转换为bytemap
	 */
	public Map<byte[], byte[]> toByteMap(Map<String, Object> objectMap)
	{
		Map<byte[], byte[]> bmap = new HashMap<byte[], byte[]>();
		Set<String> keyset = objectMap.keySet();
		for (String key : keyset)
		{
			bmap.put(stringSerializer.serialize(key), stringSerializer.serialize(objectMap.get(key).toString()));
		}
		return bmap;
	}

	
	/**
	 * bytemap转换为stringmap
	 */
	public Map<String, String> toStringMap(Map<byte[], byte[]> bmap)
	{
		Map<String, String> StringMap = new HashMap<String, String>();
		Set<byte[]> keyset = bmap.keySet();
		for (byte[] key : keyset)
		{
			StringMap.put(stringSerializer.deserialize(key), stringSerializer.deserialize(bmap.get(key)));
		}
		return StringMap;
	}
	
	
	/**
	 * byte list转换为string list
	 */
	public List<String> toStringList(List<byte[]> blist)
	{
		List<String> strlist = new LinkedList<String>();
		for (byte[] bs : blist)
		{
			strlist.add(stringSerializer.deserialize(bs));	
		}
		return strlist;
	}
	
	
	/**
	 * set装byte数组
	 * @param strSet
	 * @return
	 */
	public  byte[][] toByteSet(Set<String> strSet)
	{
		byte[][] bset = new byte[strSet.size()][];
		int i=0;
		for (String str : strSet)
		{
			bset[i] = toByte(str);
			i++;
		}
		return bset;
	}
	
	
	/**
	 * set byte[]转list string
	 * @return
	 */
	public List<String> setToStrList(Set<byte[]> set){
		List<String> list = new LinkedList<String>();
		for (byte[] bytes : set)
		{
			list.add(toString(bytes));
		}
		return list;
	}
}
