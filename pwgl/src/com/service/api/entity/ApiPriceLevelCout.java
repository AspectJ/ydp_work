package com.service.api.entity;
/**
 * 票价等级和数量及价格
 * @author Administrator
 *
 */
public class ApiPriceLevelCout {
	private String pricelevelid;//票价等级ID
	private String sl;//数量
	private String price;//票价
	private String oldprice;//原票价
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
	public String getPricelevelid() {
		return pricelevelid;
	}
	public void setPricelevelid(String pricelevelid) {
		this.pricelevelid = pricelevelid;
	}
	public String getSl() {
		return sl;
	}
	public void setSl(String sl) {
		this.sl = sl;
	}

}
