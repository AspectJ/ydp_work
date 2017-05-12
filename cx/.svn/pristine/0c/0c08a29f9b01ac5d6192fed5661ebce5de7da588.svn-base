package com.cx.rest.information.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("materialDao")
public class MaterialInfoDaoImpl extends SqlSessionDaoSupport{

	/**
	 * 新增素材基本信息
	 * 
	 * @param insertNewsMap
	 */
	public Map<String, Object> insertMaterial(Map<String, Object> insertMap){
		getSqlSession().insert("material.insertMaterial", insertMap);
		return insertMap;
	}
	
	
	/**
	 * 查询素材信息
	 */
	public Map<String, Object> getMaterial(Map<String, Object> Map){
		Map<String, Object> paramMap = getSqlSession().selectOne("material.getMaterial", Map);
		return paramMap;
	}

	
	/**
	 * 修改素材信息
	 * 
	 * @param updateMap
	 */
	public Map<String, Object> updateMaterial(Map<String, Object> updateMap){
		getSqlSession().update("material.updateMaterial", updateMap);
		return updateMap;
	}
	
	/**
	 * 修改审核标记
	 * 
	 * @param updateMap
	 */
	public Map<String, Object> updateMaterial_Audit(Map<String, Object> updateMap){
		getSqlSession().update("material.updateMaterial_Audit", updateMap);
		return updateMap;
	}
	
	/**
	 * 删除素材信息
	 * 
	 * @param newsMap
	 */
	public Map<String, Object> deleteMaterial(Map<String, Object> paramMap){
		getSqlSession().delete("material.deleteMaterial", paramMap);
		return paramMap;
	}
	
	
	/**
	 * 查询素材列表
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> getMaterialList(Map<String, Object> paramMap){
		List<Map<String, Object>> paramList = getSqlSession().selectList("material.getMaterialList", paramMap);
		return paramList;
	}
	
	/**
	 * 查询素材总数量
	 */
	public int getMaterialListCount(Map<String, Object> countMap){
		return getSqlSession().selectOne("material.getMaterialListCount", countMap);
	}
	
	/**
	 * 前台查看素材信息列表
	 * @return
	 */
	public List<Map<String, Object>> getFrontNoticeList(Map<String, Object> paramsMap) {
		List<Map<String, Object>> resultList = this.getSqlSession().selectList("notice.getFrontNoticeList", paramsMap);
		return resultList;
	}
	


	public void updateBrowsTimes(Map<String, Object> materialInfo) {
		this.getSqlSession().update("material.updateBrowsTimes", materialInfo);
		
	}
	


	public List<Map<String, Object>> getOtherNotice(int noti_id) {
		List<Map<String, Object>> resultList = this.getSqlSession().selectList("notice.getOtherNotice", noti_id);
		return resultList;
	}
	
	
	
	@Autowired
	public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
		super.setSqlSessionFactory(sqlSessionFactory);
	}


}
