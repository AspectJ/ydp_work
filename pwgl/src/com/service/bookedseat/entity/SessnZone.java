package com.service.bookedseat.entity;
/**
 * 查询分区名称
 * @author Administrator
 *
 */
public class SessnZone {
	private String sessnzoneid;
	private String zonename;
	
	private String pricelevelid;//票价等级代码
	private String pricelevelname;//票价等级名称
	
	private String reserveid;//预留代码
	private String reservename;//预留名称
	
	private String itemid;//项目代码
	private String itemname;//项目名称
	
	private String sessionsid;//场次代码
	private String sessionsname;//场次名称
	
	private String payboxid;//售票点ID
	private String payboxname;//售票点名称
	private String checked;
	public String getChecked() {
		return checked;
	}
	public void setChecked(String checked) {
		this.checked = checked;
	}
	public String getPayboxid() {
		return payboxid;
	}
	public void setPayboxid(String payboxid) {
		this.payboxid = payboxid;
	}
	public String getPayboxname() {
		return payboxname;
	}
	public void setPayboxname(String payboxname) {
		this.payboxname = payboxname;
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
	public String getSessnzoneid() {
		return sessnzoneid;
	}
	public void setSessnzoneid(String sessnzoneid) {
		this.sessnzoneid = sessnzoneid;
	}
	public String getZonename() {
		return zonename;
	}
	public void setZonename(String zonename) {
		this.zonename = zonename;
	}

}
