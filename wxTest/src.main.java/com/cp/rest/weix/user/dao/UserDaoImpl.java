package com.cp.rest.weix.user.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.cp.filter.BaseDao;

@Repository("userDao")
public class UserDaoImpl extends BaseDao{

	/**
	 * 用户第一次登陆网站时进行注册
	 * @param user
	 */
	public void regist(Map<String, Object> user) {
		getSqlSession().insert("user.regist", user);
	}


	/**
	 * 查询用户所有信息
	 * @param unionid
	 * @return
	 */
	public Map<String, Object> getUserInfo(String unionid) {
		return this.getSqlSession().selectOne("user.getUserInfo", unionid);
	}
	
	/**
	 * 查询关注用户信息
	 * @param unionid
	 * @return
	 */
	public Map<String, Object> getConcernUser(String unionid) {
		return this.getSqlSession().selectOne("user.getConcernUser", unionid);
	}
	
	

}
