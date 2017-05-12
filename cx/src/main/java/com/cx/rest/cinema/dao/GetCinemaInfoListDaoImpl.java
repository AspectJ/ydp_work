package com.cx.rest.cinema.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("getCinemaInfoListDao")
public class GetCinemaInfoListDaoImpl extends SqlSessionDaoSupport
{

	/**
	 * 查询全部院线信息（List）
	 */
	public int getCinemaInfoListCount(Map<String, Object> cinimaInfoMap)
	{
		return getSqlSession().selectOne("cinemainfolist.getCinemaInfoListCount", cinimaInfoMap);
	}
	public List<Map<String, Object>> getCinemaInfoList(Map<String, Object> paramMap)
	{
		List<Map<String, Object>> cinemaList = getSqlSession().selectList("cinemainfolist.getCinemaInfoList", paramMap);
		return cinemaList;
	}

	@Autowired
	public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory)
	{
		super.setSqlSessionFactory(sqlSessionFactory);
	}
}
