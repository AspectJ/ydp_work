package com.service.api.entity;

/**
 * 票价等级
 * @author Administrator
 *
 */
public class ApiPriceLevel {
	private String pricelevelid;
	private String pricelevelname;
	private String price;
	private String sumprice;//价格之和
	private String sumnumb;//数量之和
	public String getSumprice() {
		return sumprice;
	}
	public void setSumprice(String sumprice) {
		this.sumprice = sumprice;
	}
	public String getSumnumb() {
		return sumnumb;
	}
	public void setSumnumb(String sumnumb) {
		this.sumnumb = sumnumb;
	}
	public String getPricelevelid() {
		return pricelevelid;
	}
	public void setPricelevelid(String pricelevelid) {
		this.pricelevelid = pricelevelid;
	}
	public String getPricelevelname() {
		return pricelevelname;
	}
	public void setPricelevelname(String pricelevelname) {
		this.pricelevelname = pricelevelname;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	

}
