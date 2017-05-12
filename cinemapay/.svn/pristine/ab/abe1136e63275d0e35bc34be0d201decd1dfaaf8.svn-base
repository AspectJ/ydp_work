package com.cp.rest.userinfo.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cp.filter.BaseDao;

@Service("logDao")
public class LogInfoDaoImpl extends BaseDao{

	/**
	 * 新增日志
	 * 
	 * @param insertMap
	 */
	public Map<String, Object> insertLog(Map<String, Object> insertMap){
		getSqlSession().insert("log.insertLog", insertMap);
		return insertMap;
	}
	
	/**
	 * 修改日志信息
	 * 
	 * @param updateMap
	 */
	public Map<String, Object> updateLog(Map<String, Object> updateMap){
		getSqlSession().update("log.updateLog", updateMap);
		return updateMap;
	}
	
	
	/**
	 * 查询日志信息
	 */
	public Map<String, Object> getLog(Map<String, Object> Map){
		Map<String, Object> paramMap = getSqlSession().selectOne("log.getLog", Map);
		return paramMap;
	}
	
	/**
	 * 查询日志列表
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> getLogList(Map<String, Object> paramMap){
		List<Map<String, Object>> infoList = getSqlSession().selectList("log.getLogList", paramMap);
		return infoList;
	}
	
	/**
	 * 查询日志总数量
	 */
	public Map<String, Object> getLogListCount(Map<String, Object> paramMap){
		Map<String, Object> countMap = getSqlSession().selectOne("log.getLogListCount", paramMap);
		return countMap;
	}
	
}
