package com.service.setpolicy.entity;

import com.sun.jna.platform.win32.Sspi.TimeStamp;

/**
 * 优惠政策
 * 
 * @author Administrator
 * 
 */

public class PrefPolicy {
	private String prefpolicyid;
	private String sessionsid;
	private String policyname;
	private String pricelevelid;
	private double prefprice;
	private int agio;
	private String charshow;
	private String origshow;
	private String agioshow;
	private String begintime;
	private String endtime;
	private String pricelevelname;
	public String getPricelevelname() {
		return pricelevelname;
	}

	public void setPricelevelname(String pricelevelname) {
		this.pricelevelname = pricelevelname;
	}

	public String getPrefpolicyid() {
		return prefpolicyid;
	}

	public void setPrefpolicyid(String prefpolicyid) {
		this.prefpolicyid = prefpolicyid;
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

	public double getPrefprice() {
		return prefprice;
	}

	public void setPrefprice(double prefprice) {
		this.prefprice = prefprice;
	}

	public int getAgio() {
		return agio;
	}

	public void setAgio(int agio) {
		this.agio = agio;
	}

	public String getCharshow() {
		return charshow;
	}

	public void setCharshow(String charshow) {
		this.charshow = charshow;
	}

	public String getOrigshow() {
		return origshow;
	}

	public void setOrigshow(String origshow) {
		this.origshow = origshow;
	}

	public String getAgioshow() {
		return agioshow;
	}

	public void setAgioshow(String agioshow) {
		this.agioshow = agioshow;
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
