package com.service.api.entity;
/**
 * 锁定座位返回值
 * @author xjm
 *
 */

public class OrderReturn {
	private Double total;//总票价
	private Double actprice;//实际票价
	private Double policy;//优惠金额
	public Double getTotal() {
		return total;
	}
	public void setTotal(Double total) {
		this.total = total;
	}
	public Double getActprice() {
		return actprice;
	}
	public void setActprice(Double actprice) {
		this.actprice = actprice;
	}
	public Double getPolicy() {
		return policy;
	}
	public void setPolicy(Double policy) {
		this.policy = policy;
	}

}
