package com.service.bookedseat.entity;

/**
 * 预留座位
 * 
 * @author Administrator
 * 
 */
public class BookedSeat {
	private String allotid;
	private String itemid;
	private String sessionsid;
	private String payboxid;
	private String reserveid;
	private String ispresell;
	private String issale;
	private String iscancel;

	private String pricelevelid;
	private String pricelevelname;
	private String djpjstr;
	private String hallid;// 演出厅ID

	public String getHallid() {
		return hallid;
	}

	public void setHallid(String hallid) {
		this.hallid = hallid;
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

	public String getDjpjstr() {
		return djpjstr;
	}

	public void setDjpjstr(String djpjstr) {
		this.djpjstr = djpjstr;
	}

	public String getAllotid() {
		return allotid;
	}

	public void setAllotid(String allotid) {
		this.allotid = allotid;
	}

	public String getItemid() {
		return itemid;
	}

	public void setItemid(String itemid) {
		this.itemid = itemid;
	}

	public String getSessionsid() {
		return sessionsid;
	}

	public void setSessionsid(String sessionsid) {
		this.sessionsid = sessionsid;
	}

	public String getPayboxid() {
		return payboxid;
	}

	public void setPayboxid(String payboxid) {
		this.payboxid = payboxid;
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
}
