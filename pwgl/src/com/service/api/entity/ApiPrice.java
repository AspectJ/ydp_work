package com.service.api.entity;
/**
 * 票价
 * @author xjm
 *
 */
public class ApiPrice {
	private String pricelevelid;
	private String pricelevelname;
	private String color;
	private double price;
	private String mark;
	private String pewnum;
	private double pewprice;
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
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getMark() {
		return mark;
	}
	public void setMark(String mark) {
		this.mark = mark;
	}
	public String getPewnum() {
		return pewnum;
	}
	public void setPewnum(String pewnum) {
		this.pewnum = pewnum;
	}
	public double getPewprice() {
		return pewprice;
	}
	public void setPewprice(double pewprice) {
		this.pewprice = pewprice;
	}

}
