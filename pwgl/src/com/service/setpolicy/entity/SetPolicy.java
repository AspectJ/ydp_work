package com.service.setpolicy.entity;
/**
 * 销售政策
 * @author Administrator
 *
 */
public class SetPolicy {
	private String setpolicyid;
	private String sessionsid;
	private String policyname;
	private String pricelevelid;
	private int numb;
	private double totalprice;
	private String des;
	private String setshow;
	private String charshow;
	private String begintime;
	private String endtime;
	private String sessionsname;
	private String pricelevelname;
	private String playtime;//上演时间
	public String getPlaytime() {
		return playtime;
	}
	public void setPlaytime(String playtime) {
		this.playtime = playtime;
	}
	public String getPricelevelname() {
		return pricelevelname;
	}
	public void setPricelevelname(String pricelevelname) {
		this.pricelevelname = pricelevelname;
	}
	public String getSessionsname() {
		return sessionsname;
	}
	public void setSessionsname(String sessionsname) {
		this.sessionsname = sessionsname;
	}
	public String getSetpolicyid() {
		return setpolicyid;
	}
	public void setSetpolicyid(String setpolicyid) {
		this.setpolicyid = setpolicyid;
	}
	public String getSessionsid() {
		return sessionsid;
	}
	public void setSessionsid(String sessionsid) {
		this.sessionsid = sessionsid;
	}
	public String getPolicyname() {
		return policyname;
	}
	public void setPolicyname(String policyname) {
		this.policyname = policyname;
	}
	public String getPricelevelid() {
		return pricelevelid;
	}
	public void setPricelevelid(String pricelevelid) {
		this.pricelevelid = pricelevelid;
	}
	public int getNumb() {
		return numb;
	}
	public void setNumb(int numb) {
		this.numb = numb;
	}
	public double getTotalprice() {
		return totalprice;
	}
	public void setTotalprice(double totalprice) {
		this.totalprice = totalprice;
	}
	public String getDes() {
		return des;
	}
	public void setDes(String des) {
		this.des = des;
	}
	public String getSetshow() {
		return setshow;
	}
	public void setSetshow(String setshow) {
		this.setshow = setshow;
	}
	public String getCharshow() {
		return charshow;
	}
	public void setCharshow(String charshow) {
		this.charshow = charshow;
	}
	public String getBegintime() {
		return begintime;
	}
	public void setBegintime(String begintime) {
		this.begintime = begintime;
	}
	public String getEndtime() {
		return endtime;
	}
	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}
}
