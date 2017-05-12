package com.cx.rest.information.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("theaterstyleDao")
public class TheaterStyleDaoImpl extends SqlSessionDaoSupport{

	/**
	 * 新增院线风采基本信息
	 * 
	 * @param insertNewsMap
	 */
	public Map<String, Object> insertTheaterStyle(Map<String, Object> insertMap){
		getSqlSession().insert("theaterstyle.insertTheaterStyle", insertMap);
		return insertMap;
	}
	
	
	/**
	 * 查询院线风采信息
	 */
	public Map<String, Object> getTheaterStyle(Map<String, Object> Map){
		Map<String, Object> paramMap = getSqlSession().selectOne("theaterstyle.getTheaterStyle", Map);
		return paramMap;
	}

	
	/**
	 * 修改院线风采信息
	 * 
	 * @param updateMap
	 */
	public Map<String, Object> updateTheaterStyle(Map<String, Object> updateMap){
		getSqlSession().update("theaterstyle.updateTheaterStyle", updateMap);
		return updateMap;
	}
	
	/**
	 * 删除院线风采信息
	 * 
	 * @param newsMap
	 */
	public Map<String, Object> deleteTheaterStyle(Map<String, Object> paramMap){
		getSqlSession().delete("theaterstyle.deleteTheaterStyle", paramMap);
		return paramMap;
	}
	
	
	/**
	 * 查询院线风采列表
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> getTheaterStyleList(Map<String, Object> paramMap){
		List<Map<String, Object>> paramList = getSqlSession().selectList("theaterstyle.getTheaterStyleList", paramMap);
		return paramList;
	}
	
	/**
	 * 查询院线风采总数量
	 */
	public int getTheaterStyleListCount(Map<String, Object> countMap){
		return getSqlSession().selectOne("theaterstyle.getTheaterStyleListCount", countMap);
	}
	
	@Autowired
	public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
		super.setSqlSessionFactory(sqlSessionFactory);
	}
}
