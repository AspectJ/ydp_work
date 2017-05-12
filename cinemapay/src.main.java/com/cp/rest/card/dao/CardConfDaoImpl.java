package com.cp.rest.card.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;


import org.springframework.stereotype.Service;

import com.cp.filter.BaseDao;

@Service("cardConfDao")
public class CardConfDaoImpl extends BaseDao{

	/**
	 * 发行卡类信息查询 
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> getCardConfList(Map<String, Object> paramMap){
		List<Map<String, Object>> infoList = getSqlSession().selectList("cardConf.getCardConfList", paramMap);
		return infoList;
	}
	
	/**
	 * 查询发行卡类总数量
	 */
	public Map<String, Object> getCardConfCount(Map<String, Object> paramMap){
		Map<String, Object> countMap = getSqlSession().selectOne("cardConf.getCardConfCount", paramMap);
		return countMap;
	}
	
	/**
	 * 新增卡券
	 * 
	 * @param insertMap
	 */
	public Map<String, Object> insertCardConf(Map<String, Object> insertMap){
		getSqlSession().insert("cardConf.insertCardConf", insertMap);
		return insertMap;
	}
	
	/**
	 * 修改通卡（券）信息
	 * 
	 * @param updateMap
	 */
	public Map<String, Object> updateCardConf(Map<String, Object> updateMap){
		updateMap.put("modifytime", new Date());
		getSqlSession().update("cardConf.updateCardConf", updateMap);
		return updateMap;
	}
	
	/**
	 * 删除通卡（券）信息
	 * 
	 * @param deleteMap
	 */
	public Map<String, Object> deleteCardConf(Map<String, Object> paramMap){
		getSqlSession().delete("cardConf.deleteCardConf", paramMap);
		return paramMap;
	}
	
	
	/**
	 * 查询单条通卡（券）信息
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> getCardConf(Map<String, Object> paramMap){
		List<Map<String, Object>> infoList = getSqlSession().selectList("cardConf.getCardConf", paramMap);
		return infoList;
	}
	
	
	/**
	 * 查询基本信息
	 */
	public Map<String, Object> getCardConfBasic(Map<String, Object> Map){
		Map<String, Object> paramMap = getSqlSession().selectOne("cardConf.getCardConfBasic", Map);
		return paramMap;
	}
	
	
	/**
	 * 查询通卡（券）名称是否存在
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> checkRepeatCardName(Map<String, Object> paramMap){
		List<Map<String, Object>> list = getSqlSession().selectList("cardConf.checkRepeatCardName", paramMap);
		return list;
	}
	
}
