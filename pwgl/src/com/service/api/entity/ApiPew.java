package com.service.api.entity;

/**
 * 座位
 * 
 * @author xjm
 * 
 */
public class ApiPew {
	private String pewid;
	private String zoneid;
	private String zonename;
	private String pewname;
	private String row;
	private String col;
	private String isaddpew;
	private String pricelevelid;
	private String pricelevelname;
	private double price;
	private String reserveid;
	private String ispresell;
	private String issale;
	private String iscancel;
	private String pewstatus;
	private String reservename;

	public String getReservename() {
		return reservename;
	}

	public void setReservename(String reservename) {
		this.reservename = reservename;
	}

	public String getPewid() {
		return pewid;
	}

	public void setPewid(String pewid) {
		this.pewid = pewid;
	}

	public String getZoneid() {
		return zoneid;
	}

	public void setZoneid(String zoneid) {
		this.zoneid = zoneid;
	}

	public String getZonename() {
		return zonename;
	}

	public void setZonename(String zonename) {
		this.zonename = zonename;
	}

	public String getPewname() {
		return pewname;
	}

	public void setPewname(String pewname) {
		this.pewname = pewname;
	}

	public String getRow() {
		return row;
	}

	public void setRow(String row) {
		this.row = row;
	}

	public String getCol() {
		return col;
	}

	public void setCol(String col) {
		this.col = col;
	}

	public String getIsaddpew() {
		return isaddpew;
	}

	public void setIsaddpew(String isaddpew) {
		this.isaddpew = isaddpew;
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

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getReserveid() {
		return reserveid;
	}

	public void setReserveid(String reserveid) {
		this.reserveid = reserveid;
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
