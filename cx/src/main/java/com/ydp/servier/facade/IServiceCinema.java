package com.ydp.servier.facade;

import com.ydp.servier.bean.DataMessage;

/**
 * 影院对外数据接口
 * @author Administrator
 * @create 2015-11-16 下午6:11:24
 */
public interface IServiceCinema
{
	/**
	 * 获取地区对应影片的影院列表
	 * @param cityCode
	 * @return
	 */
	public DataMessage cityShowingCinema(String cityCode, String movieid);
	
	/**
	 * 地区影院信息
	 * @param cityCode
	 * @return
	 */
	public DataMessage cityCinema(String cityCode);

	/**
	 * 获取易得票影院id
	 * @param cinemanum
	 * @return
	 */
	public DataMessage getTheaterid(String cinemanum);
	
	
	/**
	 * 影院正在上映影片数量
	 * @param cinemaid
	 * @return
	 */
	public  DataMessage cinemaMovieCount(String cinemaid);
	

	/**
	 * 获取影院信息
	 * @param cinemaid
	 * @return
	 */
	public DataMessage cinemaMessage(String cinemaid);
	
	/**
	 * 影院与取票机心跳
	 * @param cinemanum 影院编号
	 * @param screen 屏幕截图
	 * @return
	 */
	public  DataMessage utmdHeart(String cinemanum, String screen);
}
