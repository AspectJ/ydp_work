package com.service.whammanager.entity;
/**
 * 重打
 * @author Administrator
 *
 */

public class WhamManager {
	private String orderid;//订单号
	private String ordercode;//订单编号
	private String itemname;//项目名称
	private String sessionsname;//场次名称
	private String venuename;//场馆名称
	private String hallname;//演出厅名称
	private String zonename;//分区名
	private String sqr;//申请人
	private String shr;//审核人
	private String pewname;//座位名
	private String restatus;//重打状态
	private String applytime;//申请时间
	private String audittime;//审核时间
	private String reprintid;//ID
	private String isreprintname;//重打状态名称
	private String cs;//重打次数
	public String getCs() {
		return cs;
	}
	public void setCs(String cs) {
		this.cs = cs;
	}
	public String getIsreprintname() {
		return isreprintname;
	}
	public void setIsreprintname(String isreprintname) {
		this.isreprintname = isreprintname;
	}
	public String getReprintid() {
		return reprintid;
	}
	public void setReprintid(String reprintid) {
		this.reprintid = reprintid;
	}
	public String getApplytime() {
		return applytime;
	}
	public void setApplytime(String applytime) {
		this.applytime = applytime;
	}
	public String getAudittime() {
		return audittime;
	}
	public void setAudittime(String audittime) {
		this.audittime = audittime;
	}
	public String getRestatus() {
		return restatus;
	}
	public void setRestatus(String restatus) {
		this.restatus = restatus;
	}
	public String getOrderid() {
		return orderid;
	}
	public void setOrderid(String orderid) {
		this.orderid = orderid;
	}
	public String getOrdercode() {
		return ordercode;
	}
	public void setOrdercode(String ordercode) {
		this.ordercode = ordercode;
	}
	public String getItemname() {
		return itemname;
	}
	public void setItemname(String itemname) {
		this.itemname = itemname;
	}
	public String getSessionsname() {
		return sessionsname;
	}
	public void setSessionsname(String sessionsname) {
		this.sessionsname = sessionsname;
	}
	public String getVenuename() {
		return venuename;
	}
	public void setVenuename(String venuename) {
		this.venuename = venuename;
	}
	public String getHallname() {
		return hallname;
	}
	public void setHallname(String hallname) {
		this.hallname = hallname;
	}
	public String getZonename() {
		return zonename;
	}
	public void setZonename(String zonename) {
		this.zonename = zonename;
	}
	public String getSqr() {
		return sqr;
	}
	public void setSqr(String sqr) {
		this.sqr = sqr;
	}
	public String getShr() {
		return shr;
	}
	public void setShr(String shr) {
		this.shr = shr;
	}
	public String getPewname() {
		return pewname;
	}
	public void setPewname(String pewname) {
		this.pewname = pewname;
	}

}
