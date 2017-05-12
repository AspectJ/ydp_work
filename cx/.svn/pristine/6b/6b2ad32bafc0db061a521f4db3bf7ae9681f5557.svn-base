package com.ydp.servier.facade;

import com.ydp.servier.bean.DataMessage;

/**
 * 地区数据对外接口
 * @author Administrator
 * @create 2015-11-20 下午1:15:55
 */
public interface IServiceZone
{
	/**
	 * 返回正在上映影片的所有地区
	 * @param cityCode
	 * @return
	 */
	public DataMessage movieZone();
	
	
	/**
	 * 获取子区域
	 * @param parentCode
	 * @return
	 */
	public DataMessage getChirenCode(String parentCode);


	/**
	 * 城市播放指定影片的地区
	 * @param movieid
	 * @param citycode
	 * @return
	 */
	public DataMessage movieArea(String movieid, String citycode);
}
