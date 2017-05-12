package com.cx.rest.information.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("joincinemaDao")
public class JoinCinemaDaoImpl extends SqlSessionDaoSupport{

	/**
	 * 新增加盟院线基本信息
	 * 
	 * @param insertNewsMap
	 */
	public Map<String, Object> insertJoinCinema(Map<String, Object> insertMap){
		getSqlSession().insert("joincinema.insertJoinCinema", insertMap);
		return insertMap;
	}
	
	
	/**
	 * 查询加盟院线信息
	 */
	public Map<String, Object> getJoinCinema(Map<String, Object> Map){
		Map<String, Object> paramMap = getSqlSession().selectOne("joincinema.getJoinCinema", Map);
		return paramMap;
	}

	
	/**
	 * 修改加盟院线信息
	 * 
	 * @param updateMap
	 */
	public Map<String, Object> updateJoinCinema(Map<String, Object> updateMap){
		getSqlSession().update("joincinema.updateJoinCinema", updateMap);
		return updateMap;
	}
	
	
	
	/**
	 * 修改审核标记
	 * 
	 * @param updateMap
	 */
	public Map<String, Object> updateJoinCinema_Audit(Map<String, Object> updateMap){
		getSqlSession().update("joincinema.updateJoinCinema_Audit", updateMap);
		return updateMap;
	}
	
	/**
	 * 删除加盟院线信息
	 * 
	 * @param newsMap
	 */
	public Map<String, Object> deleteJoinCinema(Map<String, Object> paramMap){
		getSqlSession().delete("joincinema.deleteJoinCinema", paramMap);
		return paramMap;
	}
	
	
	/**
	 * 查询加盟院线列表
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> getJoinCinemaList(Map<String, Object> paramMap){
		List<Map<String, Object>> paramList = getSqlSession().selectList("joincinema.getJoinCinemaList", paramMap);
		return paramList;
	}
	
	/**
	 * 查询加盟院线总数量
	 */
	public int getJoinCinemaListCount(Map<String, Object> countMap){
		return getSqlSession().selectOne("joincinema.getJoinCinemaListCount", countMap);
	}
	
	/**
	 * ajax动态获取城市数据
	 */
	public List<Map<String,Object>> getCityData(){
		List<Map<String,Object>> paramList = getSqlSession().selectList("joincinema.getCityData");
		return paramList;
	}
	
    public Map<String,Object> getCityNameByCityNumber(Map<String,Object> paramMap){
    	Map<String,Object> resultMap = getSqlSession().selectOne("joincinema.getCityNameByCityNumber", paramMap);
    	return resultMap;
    }
    
    public Map<String,Object>getAreaByarea_number(Map<String,Object> paramMap){
    	Map<String,Object> resultMap = getSqlSession().selectOne("joincinema.getAreaByarea_number", paramMap);
    	return resultMap;
    }
	
	@Autowired
	public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
		super.setSqlSessionFactory(sqlSessionFactory);
	}
}
