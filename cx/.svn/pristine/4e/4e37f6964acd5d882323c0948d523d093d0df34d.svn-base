package com.ydp.servier.facade;

import com.ydp.servier.bean.DataMessage;

/**
 * 影片数据对外接口
 * @author Administrator
 * @create 2015-11-20 下午1:15:55
 */
public interface IServiceMovie
{
	/**
	 * 地区正在上映影片
	 * @param cityCode
	 * @return data 为json字符串
	 */
	public DataMessage movieList(String cityCode);
	
	/**
	 * 即将上映影片列表
	 * @param cityCode
	 * @return data 为json字符串
	 */
	public DataMessage immovieList();
	
	/**
	 * 影片详情
	 * @return Map<String, String>
	 */
	public DataMessage movieMess(String movieid);
	
	/**
	 * 影院正在上映的影片列表
	 * @param theaterid
	 * @return List<Map<String, String>>
	 */
	public DataMessage cinemaShowing(String theaterid);

	
	/**
	 * 正在热映
	 * @param channel
	 * @return
	 */
	public DataMessage hotShowing();

	
	/**
	 * 地区电影
	 * @param parentCode(省，市，区编码)
	 * @return
	 */
	public DataMessage zoneMovie(String parentCode);
}
