package com.cx.rest.user.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cx.filter.BaseDao;

@Service("userDao")
public class UserDaoImp extends BaseDao
{

	/**
	 * 注册
	 * @param user
	 */
	public void regist(Map<String, Object> user)
	{
		getSqlSession().insert("user.regist", user);
	}

	
	/**
	 * 登录
	 * @param user
	 * @return
	 */
	public Map<String, Object> login(String account)
	{
		return getSqlSession().selectOne("user.login", account);
	}

	
	/**
	 * 验证重复(手机号、邮箱)
	 * @param user
	 * @return
	 */
	public List<Map<String, Object>> checkRepetition(Map<String, Object> user)
	{
		return getSqlSession().selectList("user.checkRepetition", user);
	}

	//查询全部用户信息
	public List<Map<String, Object>> selAllUser(Map<String, Object> paramsMap) {
		return getSqlSession().selectList("user.selAllUser", paramsMap);
	}

	
	//得到状态被启用用户信息个数（用于分页）
	public Map<String, Object> getUserInfoListCount() {
		return this.getSqlSession().selectOne("user.getUserInfoListCount");
	}

	//改变用户状态（启用/禁用）
	public void changeState(Map<String, Object> paramsMap) {
		this.getSqlSession().update("user.changeState", paramsMap);
	}
	
	public List<Map<String,Object>>sel_status_true(){
		List<Map<String,Object>> resultList = this.getSqlSession().selectList("user.sel_status_true");
		return resultList;
	}
	
	public List<Map<String,Object>>sel_status_false(Map<String, Object> paramsMap){
		List<Map<String,Object>> resultList = this.getSqlSession().selectList("user.sel_status_false", paramsMap);
		return resultList;
	}

	/**
	 * 查询用户信息
	 * @param userid
	 * @return
	 */
	public Map<String, Object> selSingleUser(int userid) {
		Map<String, Object> resultMap = this.getSqlSession().selectOne("user.selSingleUser", userid);
		return resultMap;
	}


}
