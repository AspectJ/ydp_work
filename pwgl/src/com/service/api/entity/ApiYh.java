package com.service.api.entity;
/**
 * 座位对应的优惠
 * @author Administrator
 *
 */

public class ApiYh {
	private String pewid;//座位ID
	private String pewname;//座位名称
	private String price;//原来价格
	private String actprice;//优惠价格
	private String ordercode;
	private String pricelevelid;
	public String getPricelevelid() {
		return pricelevelid;
	}
	public void setPricelevelid(String pricelevelid) {
		this.pricelevelid = pricelevelid;
	}
	public String getOrdercode() {
		return ordercode;
	}
	public void setOrdercode(String ordercode) {
		this.ordercode = ordercode;
	}
	public String getPewid() {
		return pewid;
	}
	public void setPewid(String pewid) {
		this.pewid = pewid;
	}
	public String getPewname() {
		return pewname;
	}
	public void setPewname(String pewname) {
		this.pewname = pewname;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getActprice() {
		return actprice;
	}
	public void setActprice(String actprice) {
		this.actprice = actprice;
	}

}
