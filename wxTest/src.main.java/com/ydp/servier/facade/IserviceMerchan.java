package com.ydp.servier.facade;

import com.ydp.servier.bean.DataMessage;

import net.sf.json.JSONObject;

/**
 * 卖品相关接口
 */
public interface IserviceMerchan
{
	/**
	 * 核销卖品订单
	 * @param cardCode
	 * @return
	 */
	public DataMessage merchanChargeOff(String theaterid, String cardCode);

	
	/**
	 * 卖品订单详情
	 * @param theaterid
	 * @param cardCode
	 * @return
	 */
	public DataMessage orderMess(String theaterid, String cardCode);


	/**
	 * 影院在线订单查询
	 * @param theaterid
	 * @param page
	 * @param pagesize
	 * @param status
	 * @param filter
	 * @param beginTime
	 * @param endTime
	 * @return
	 */
	public DataMessage onlineOrderList(String theaterid, String page, String pagesize, String status, 
			String filter, String beginTime, String endTime);
	
	
	/**
	 * 提交卖品(同步到线上)
	 * @param productid
	 * @param merchandiseName
	 * @param theaterid
	 * @param price
	 * @param headimg
	 * @return
	 */
	public DataMessage subMerchandies(String productid, String merchandiseName, int theaterid, float price, String headimg, JSONObject rule);


	/**
	 * 删除卖品(同步到线上)
	 * @param productid
	 * @param merchandiseName
	 * @param theaterid
	 * @param price
	 * @param headimg
	 * @return
	 */
	public DataMessage delMerchandies(String productid);
	
	
	/**
	 * 更改状态(同步到线上)
	 * @param productid
	 * @param status
	 * @return
	 */
	public DataMessage changeMerchandiesStatus(String productid, int status);
}
