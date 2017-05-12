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
	 * 地区影院信息
	 * @param cityCode
	 * @return
	 */
	public DataMessage cityCinema(String cityCode);

	/**
	 * 潇湘-地区的影院
	 * @param cityCode
	 * @return
	 */
	public DataMessage xiaoxCityCinema(String citycode);
	
	/**
	 * 获取影院信息
	 * @param cinemaid
	 * @return
	 */
	public DataMessage cinemaMessage(String cinemaid);
}
