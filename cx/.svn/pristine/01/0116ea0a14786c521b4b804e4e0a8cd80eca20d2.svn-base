package com.cx.rest.company.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("companyDao")
public class CompanyDaoImpl extends SqlSessionDaoSupport{

	/**
	 * 新增院线基本信息
	 * 
	 * @param insertCompanyMap
	 */
	public Map<String, Object> insertCompanyInfo(Map<String, Object> insertCompanyMap){
		getSqlSession().insert("company.insertCinemaInfo", insertCompanyMap);
		return insertCompanyMap;
	}
	
	
	/**
	 * 查询院线信息
	 */
	public Map<String, Object> getCompanyInfo(Map<String, Object> cinemaMap){
		Map<String, Object> paramMap = getSqlSession().selectOne("company.getCinemaInfo", cinemaMap);
		return paramMap;
	}
	
	
	/**
	 * 修改院线信息
	 * 
	 * @param cinemaMap
	 */
	public Map<String, Object> updateCompanyInfo(Map<String, Object> cinemaMap){
		getSqlSession().update("company.updateCinemaInfo", cinemaMap);
		return cinemaMap;
	}
	
	/**
	 * 删除院线信息
	 * 
	 * @param cinemaMap
	 */
	public Map<String, Object> deleteCompanyInfo(Map<String, Object> cinemaMap){
		getSqlSession().delete("company.deleteCompanyInfo", cinemaMap);
		return cinemaMap;
	}
	
	
	
	@Autowired
	public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
		super.setSqlSessionFactory(sqlSessionFactory);
	}
}
