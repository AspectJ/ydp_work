package com.service.api.entity;
/**
 * 场次和销售机构的金额信息
 * @author xjm
 *
 */
public class ApiMoney {
	private double sessionstotal;
	private double payboxtotal;
	public double getSessionstotal() {
		return sessionstotal;
	}
	public void setSessionstotal(double sessionstotal) {
		this.sessionstotal = sessionstotal;
	}
	public double getPayboxtotal() {
		return payboxtotal;
	}
	public void setPayboxtotal(double payboxtotal) {
		this.payboxtotal = payboxtotal;
	}
	

}
