package com.ydp.servier.facade;

import com.ydp.servier.bean.DataMessage;

/**
 * 排期数据服务接口
 * @author Administrator
 * @create 2015-11-26 上午11:44:04
 */
public interface IServicePlan
{
	/**
	 * 影片在指定影院的排期列表
	 * @param movieid
	 * @param threaterid
	 * @return
	 */
	public DataMessage movieCinemaPlan(String movieid, String threaterid, int channel);
}
