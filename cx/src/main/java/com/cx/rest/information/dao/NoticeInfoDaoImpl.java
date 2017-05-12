package com.cx.rest.information.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("noticeDao")
public class NoticeInfoDaoImpl extends SqlSessionDaoSupport{

	/**
	 * 新增通知基本信息
	 * 
	 * @param insertNewsMap
	 */
	public Map<String, Object> insertNotice(Map<String, Object> insertMap){
		getSqlSession().insert("notice.insertNotice", insertMap);
		return insertMap;
	}
	
	
	/**
	 * 查询通知信息
	 */
	public Map<String, Object> getNotice(Map<String, Object> Map){
		Map<String, Object> paramMap = getSqlSession().selectOne("notice.getNotice", Map);
		return paramMap;
	}

	
	/**
	 * 修改通知信息
	 * 
	 * @param updateMap
	 */
	public Map<String, Object> updateNotice(Map<String, Object> updateMap){
		getSqlSession().update("notice.updateNotice", updateMap);
		return updateMap;
	}
	
	/**
	 * 修改审核标记
	 * 
	 * @param updateMap
	 */
	public Map<String, Object> updateNotice_Audit(Map<String, Object> updateMap){
		getSqlSession().update("notice.updateNotice_Audit", updateMap);
		return updateMap;
	}
	
	/**
	 * 删除通知信息
	 * 
	 * @param newsMap
	 */
	public Map<String, Object> deleteNotice(Map<String, Object> paramMap){
		getSqlSession().delete("notice.deleteNotice", paramMap);
		return paramMap;
	}
	
	
	/**
	 * 查询通知列表
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> getNoticeList(Map<String, Object> paramMap){
		List<Map<String, Object>> paramList = getSqlSession().selectList("notice.getNoticeList", paramMap);
		return paramList;
	}
	
	/**
	 * 查询通知总数量
	 */
	public int getNoticeListCount(Map<String, Object> countMap){
		return getSqlSession().selectOne("notice.getNoticeListCount", countMap);
	}
	
	/**
	 * 查询通知总数量
	 */
	public int getFrontNoticeListCount(Map<String, Object> countMap){
		return getSqlSession().selectOne("notice.getFrontNoticeListCount", countMap);
	}
	
	/**
	 * 前台查看通知信息列表
	 * @return
	 */
	public List<Map<String, Object>> getFrontNoticeList(Map<String, Object> paramsMap) {
		List<Map<String, Object>> resultList = this.getSqlSession().selectList("notice.getFrontNoticeList", paramsMap);
		return resultList;
	}
	

	/**
	 * 更新通知点击量
	 * @param notiInfo
	 */
	public void updateBrowsTimes(Map<String, Object> notiInfo) {
		this.getSqlSession().update("notice.updateBrowsTimes", notiInfo);
		
	}
	

	/**
	 * 获取其它发行通知（页面右侧）
	 * @param noti_id
	 * @return
	 */
	public List<Map<String, Object>> getOtherNotice(int noti_id) {
		List<Map<String, Object>> resultList = this.getSqlSession().selectList("notice.getOtherNotice", noti_id);
		return resultList;
	}
	
	/**
	 * 获取Notice总条数，用于分页。
	 * @param paramsMap
	 * @return
	 */
	public int getNoticeCount(Map<String, Object> paramsMap) {
		return getSqlSession().selectOne("notice.getNoticeListCount", paramsMap);
	}
	/**
	 * 对notice进行模糊查询（noti_title）
	 * @param paramsMap
	 * @return
	 */
	public List<Map<String, Object>> getNoticeByCriteria(Map<String, Object> paramsMap) {
		List<Map<String, Object>> resultList = this.getSqlSession().selectList("notice.getNoticeByCriteria", paramsMap);
		return resultList;
	}

	@Autowired
	public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
		super.setSqlSessionFactory(sqlSessionFactory);
	}



}
