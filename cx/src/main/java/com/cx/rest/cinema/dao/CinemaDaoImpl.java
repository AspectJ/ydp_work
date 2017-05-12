package com.cx.rest.cinema.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cx.filter.BaseDao;

@Service("cinemaDao")
public class CinemaDaoImpl extends BaseDao{

	//查询院线信息
	public Map<String, Object> selCinemaInfo() {
		Map<String, Object> resultMap = this.getSqlSession().selectOne("cinema.selCinemaInfo");
		return resultMap;
	}
	
	//查询加盟影院信息
	public List<Map<String, Object>> getJoinCinemaInfo(Map<String, Object> paramsMap) {
		return getSqlSession().selectList("cinema.getJoinCinemaInfo", paramsMap);
	}

	//获取加盟影院的count（*） (用于分页）
	public int getJoinCinemaCount(Map<String, Object> paramsMap) {
		return this.getSqlSession().selectOne("cinema.getJoinCinemaCount", paramsMap);
	}
	
	//前台获取加盟影院的count（*） (用于分页）
	public int getFrontJoinCinemaCount(Map<String, Object> paramsMap) {
		return this.getSqlSession().selectOne("cinema.getFrontJoinCinemaCount", paramsMap);
	}

	public List<Map<String, Object>> getCinemaStyle(Map<String, Object> paramsMap) {
		return this.getSqlSession().selectList("cinema.getCinemaStyle", paramsMap);
	}

	public List<Map<String, Object>> getJoinCinemaShow() {
		List<Map<String, Object>> resultList = this.getSqlSession().selectList("cinema.getJoinCinemaShow");
		return resultList;
	}
	
	//Ajax获取省份数据
	public List<Map<String,Object>> AjaxProvince(Map<String, Object> paramsMap){
		return this.getSqlSession().selectList("cinema.AjaxProvince",paramsMap);
	}
	
	//Ajax获取地市数据
		public List<Map<String,Object>> AjaxCity(Map<String, Object> paramsMap){
			return this.getSqlSession().selectList("cinema.AjaxCity",paramsMap);
		}
		
		//Ajax获取区县数据
		public List<Map<String,Object>> AjaxArea(Map<String, Object> paramsMap){
			return this.getSqlSession().selectList("cinema.AjaxArea",paramsMap);
		}
	
	
}
