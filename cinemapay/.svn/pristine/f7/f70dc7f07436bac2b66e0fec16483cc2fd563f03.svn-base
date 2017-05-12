package com.cp.rest.userinfo.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cp.filter.BaseDao;

@Service("userDao")
public class UserInfoDaoImpl extends BaseDao{

	/**
	 * 新增用户
	 * 
	 * @param insertMap
	 */
	public Map<String, Object> insertUser(Map<String, Object> insertMap){
		getSqlSession().insert("user.insertUser", insertMap);
		return insertMap;
	}
	
	/**
	 * 修改用户信息
	 * 
	 * @param updateMap
	 */
	public Map<String, Object> updateUser(Map<String, Object> updateMap){
		getSqlSession().update("user.updateUser", updateMap);
		return updateMap;
	}
	
	
	/**
	 * 删除用户信息
	 * 
	 * @param deleteMap
	 */
	public Map<String, Object> deleteUser(Map<String, Object> paramMap){
		getSqlSession().delete("user.deleteUser", paramMap);
		return paramMap;
	}
	
	
	/**
	 * 查询用户信息
	 */
	public Map<String, Object> getUser(Map<String, Object> Map){
		Map<String, Object> paramMap = getSqlSession().selectOne("user.getUser", Map);
		return paramMap;
	}
	
	/**
	 * 查询用户列表
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> getUserList(Map<String, Object> paramMap){
		List<Map<String, Object>> infoList = getSqlSession().selectList("user.getUserList", paramMap);
		return infoList;
	}
	
	/**
	 * 查询用户总数量
	 */
	public Map<String, Object> getUserListCount(Map<String, Object> paramMap){
		Map<String, Object> countMap = getSqlSession().selectOne("user.getUserListCount", paramMap);
		return countMap;
	}
	
	/**
	 * 用户登录信息
	 */
	public Map<String, Object> userLogin(Map<String, Object> Map){
		Map<String, Object> paramMap = getSqlSession().selectOne("user.userLogin", Map);
		return paramMap;
	}
	
	
	/**
	 * 查询用户名称是否存在
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> checkRepeatUserName(Map<String, Object> paramMap){
		List<Map<String, Object>> list = getSqlSession().selectList("user.checkRepeatUserName", paramMap);
		return list;
	}

	
	/**
	 * 获取影院的操作员
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> operaterList(Map<String, Object> map)
	{
		return getSqlSession().selectList("user.operaterList", map);
	}
}
