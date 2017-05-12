package com.cx.rest.carousel.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cx.filter.BaseDao;

@Service("carouselDao")
public class CarouselDaoImpl extends BaseDao
{

	/**
	 * 轮播图列表
	 * @param type
	 * @return
	 */
	public List<Map<String, Object>> carouselList(String type)
	{
		return getSqlSession().selectList("carousel.carouselList", type);
	}
	
	/**
	 * 更新轮播图
	 */
	public Map<String, Object> updateCarousel(Map<String, Object> updateMap){
		getSqlSession().update("carousel.updateCarousel", updateMap);
		return updateMap;
	}
}
