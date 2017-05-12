package com.ydp.servier.facade;

import com.ydp.servier.bean.DataMessage;

/**
 * 座位数据服务接口
 * @author Administrator
 * @create 2015-11-26 下午5:51:13
 */
public interface IServiceOrder
{
	
	/**
	 * 锁座
	 */
	public DataMessage lockSeat(String planid, String seats, String userid, String mobile, int channel);
	
	
	/**
	 * 会员卡支付
	 * @param userid
	 * @param mobile
	 * @param sid
	 * @param cardno
	 * @param cardPass
	 * @return
	 */
	public DataMessage cardPay(String userid, String mobile, String orderid, String cardno, String cardpass, int channel);	
	
	
	/**
	 * 用户订单列表
	 * @return
	 */
	public DataMessage userOrderList(String userid, String type, int start, int pagesize);	
	
	
	/**
	 * 用户订单列表
	 * @param userid
	 * @param cinemaid
	 * @param type
	 * @param start
	 * @param pagesize
	 * @return
	 */
	public DataMessage userOrderList(String userid, String cinemaid, String type, int start, int pagesize);
	
	
	/**
	 * 订单详情
	 * @param orderid
	 * @return
	 */
	public DataMessage orderDetail(String orderid);	
	
	
	/**
	 * 取消订单
	 * @param orderid
	 * @return
	 */
	public DataMessage cancelOrder(String orderid);	
	
	
	/**
	 * 等待完成支付
	 * @param orderid 订单编号
	 * @param payMethod 支付方式
	 * @return
	 */
	public DataMessage waitPayment(String orderid, String payMethod);	
	
	
	/**
	 * 通过orderid 获取ordernumber
	 * @param orderid
	 * @return
	 */
	public DataMessage getOrdernumber(String orderid);
	
	
	/**
	 * 支付宝支付完成
	 * @param orderid 订单id
	 * @param transaction 支付宝交易号
	 * @param amounts 支付金额
	 * @return
	 */
	public DataMessage alipayNotify(String ordernumber, String transaction, String amounts);

	
	/**
	 * 微信支付完成
	 * @param ordernumber
	 * @param transaction
	 * @param totalfee
	 */
	public DataMessage wxpayNotify(String ordernumber, String transaction, String totalfee);
	
	
	/**
	 * 获取有效订单状态(Redis)
	 * @param orderid
	 * @return
	 */
	public DataMessage getEffectiveOrderStatus(String orderid);
	
	
	/**
	 * 获取有效订单详情(Redis)
	 * @param orderid
	 * @return
	 */
	public DataMessage getEffectiveOrderMessage(String orderid);
	
	
	/**
	 * 修改接受短信手机号码
	 * @param orderid 订单编号
	 * @param payMethod 支付方式
	 * @return
	 */
	public DataMessage changeMobile(String orderid, String mobile);
	
	
	/**
	 * 支付通知
	 * @param orderid 订单id
	 * @param transaction 支付宝交易号
	 * @param amounts 支付金额
	 * @param payMethod 支付方式
	 * @return
	 */
	public DataMessage payNotify(String ordernumber, String transaction, String amounts, String payMethod);
}
