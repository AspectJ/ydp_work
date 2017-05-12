package com.service.api.entity;
/**
 * 释放座位对象锁
 * @author Administrator
 *
 */
public class TimeLockOrder {
	private String orderid;//订单ID
	private String pewid;//座位ID

	public String getPewid() {
		return pewid;
	}

	public void setPewid(String pewid) {
		this.pewid = pewid;
	}

	public String getOrderid() {
		return orderid;
	}

	public void setOrderid(String orderid) {
		this.orderid = orderid;
	}

}
