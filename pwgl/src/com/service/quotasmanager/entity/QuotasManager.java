package com.service.quotasmanager.entity;
/**
 * 配额
 * @author Administrator
 *
 */
public class QuotasManager {
	private String itemid;
	private String itemname;//项目名
	private String sessionsid;
	private String sessionsname;//场次名
	private String venuename;//场馆名称
	private String hallname;//演出厅
	private String time;//演出时间  开始-结束
	private String ccpe;//场次配额
	private String sxjgpe;//机构配额
	public String getItemid() {
		return itemid;
	}
	public void setItemid(String itemid) {
		this.itemid = itemid;
	}
	public String getItemname() {
		return itemname;
	}
	public void setItemname(String itemname) {
		this.itemname = itemname;
	}
	public String getSessionsid() {
		return sessionsid;
	}
	public void setSessionsid(String sessionsid) {
		this.sessionsid = sessionsid;
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
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getCcpe() {
		return ccpe;
	}
	public void setCcpe(String ccpe) {
		this.ccpe = ccpe;
	}
	public String getSxjgpe() {
		return sxjgpe;
	}
	public void setSxjgpe(String sxjgpe) {
		this.sxjgpe = sxjgpe;
	}
}
