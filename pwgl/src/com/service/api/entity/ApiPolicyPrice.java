package com.service.api.entity;
/**
 * 套票或优惠政策对应的票价，票价等级名称，套票价格
 * @author Administrator
 *
 */
public class ApiPolicyPrice {
	private String oldprice;//原票价
	private String price;//套票或优惠票价
	private String pricelevelname;//票价等级名称
	private String pricelevelid;//票价等级ID
	public String getOldprice() {
		return oldprice;
	}
	public void setOldprice(String oldprice) {
		this.oldprice = oldprice;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getPricelevelname() {
		return pricelevelname;
	}
	public void setPricelevelname(String pricelevelname) {
		this.pricelevelname = pricelevelname;
	}
	public String getPricelevelid() {
		return pricelevelid;
	}
	public void setPricelevelid(String pricelevelid) {
		this.pricelevelid = pricelevelid;
	}

}
