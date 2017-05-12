package com.service.api.entity;
/**
 * 座位状态
 * @author xjm
 *
 */
public class ApiZwZt {
	private String ispresell;//是否可预售  1.是，2.否
	private String issale;//是否可售  1.是 ,2.否
	private String iscancel;//是否可取 1.是，2.否
	private String pewstatus;//1.可售，2.不可售，3.已售
	private String zoneid;//分区ID
	private double price;//价格
	private String setpolicyid;//套票政策
	private String pewid;//座位ID
	private String pricelevelid;//票价等级
	private String reserveid;//预留种类
	private String numb;//数量
	public String getNumb() {
		return numb;
	}
	public void setNumb(String numb) {
		this.numb = numb;
	}
	public String getPricelevelid() {
		return pricelevelid;
	}
	public void setPricelevelid(String pricelevelid) {
		this.pricelevelid = pricelevelid;
	}
	public String getReserveid() {
		return reserveid;
	}
	public void setReserveid(String reserveid) {
		this.reserveid = reserveid;
	}
	public String getPewid() {
		return pewid;
	}
	public void setPewid(String pewid) {
		this.pewid = pewid;
	}
	public String getSetpolicyid() {
		return setpolicyid;
	}
	public void setSetpolicyid(String setpolicyid) {
		this.setpolicyid = setpolicyid;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getZoneid() {
		return zoneid;
	}
	public void setZoneid(String zoneid) {
		this.zoneid = zoneid;
	}
	public String getIspresell() {
		return ispresell;
	}
	public void setIspresell(String ispresell) {
		this.ispresell = ispresell;
	}
	public String getIssale() {
		return issale;
	}
	public void setIssale(String issale) {
		this.issale = issale;
	}
	public String getIscancel() {
		return iscancel;
	}
	public void setIscancel(String iscancel) {
		this.iscancel = iscancel;
	}
	public String getPewstatus() {
		return pewstatus;
	}
	public void setPewstatus(String pewstatus) {
		this.pewstatus = pewstatus;
	}

}
