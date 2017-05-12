package com.service.tjbb.entity;
/**
 * 场次信息
 * @author Administrator
 *
 */
public class SessionInfo {
	private String sessionscode;//场次编号
	private String sessionsname;//场次名称
	private String playtime;//上演时间
	private String venuename;//演出场馆
	private String payboxname;//售票机构
	public String getSessionscode() {
		return sessionscode;
	}
	public void setSessionscode(String sessionscode) {
		this.sessionscode = sessionscode;
	}
	public String getSessionsname() {
		return sessionsname;
	}
	public void setSessionsname(String sessionsname) {
		this.sessionsname = sessionsname;
	}
	public String getPlaytime() {
		return playtime;
	}
	public void setPlaytime(String playtime) {
		this.playtime = playtime;
	}
	public String getVenuename() {
		return venuename;
	}
	public void setVenuename(String venuename) {
		this.venuename = venuename;
	}
	public String getPayboxname() {
		return payboxname;
	}
	public void setPayboxname(String payboxname) {
		this.payboxname = payboxname;
	}
	

}
