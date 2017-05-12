package com.service.api.entity;
/**
 * 座位预留种类
 * @author xjm
 *
 */

public class ApiReserve {
	private String reserveid;
	private String reservename;
	private String ispresell;
	private String issale;
	private String iscancel;
	public String getReserveid() {
		return reserveid;
	}
	public void setReserveid(String reserveid) {
		this.reserveid = reserveid;
	}
	public String getReservename() {
		return reservename;
	}
	public void setReservename(String reservename) {
		this.reservename = reservename;
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

}
