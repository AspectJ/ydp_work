package com.service.empowersell.entity;

/**
 * 销售政策授权
 * 
 * @author Administrator
 * 
 */
public class SellPolicy {
	private String sellpolicyid;
	private String sessionsid;
	private String payboxid;
	private String sellerid;
	private String setpolicyid;
	private String prefpolicyid;
	private String cid;
	private String ctime;
	private String mid;
	private String mtime;
	
	//场次名称
	private String sessionsname;
	
	//售票点名称
	private String payboxname;
	
	//套票政策名称
	private String policyname;
	
	//售票员
	private String realname;

	public String getRealname() {
		return realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public String getPolicyname() {
		return policyname;
	}

	public void setPolicyname(String policyname) {
		this.policyname = policyname;
	}

	public String getPayboxname() {
		return payboxname;
	}

	public void setPayboxname(String payboxname) {
		this.payboxname = payboxname;
	}

	public String getSessionsname() {
		return sessionsname;
	}

	public void setSessionsname(String sessionsname) {
		this.sessionsname = sessionsname;
	}

	public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	public String getCtime() {
		return ctime;
	}

	public void setCtime(String ctime) {
		this.ctime = ctime;
	}

	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}

	public String getMtime() {
		return mtime;
	}

	public void setMtime(String mtime) {
		this.mtime = mtime;
	}

	public String getSellpolicyid() {
		return sellpolicyid;
	}

	public void setSellpolicyid(String sellpolicyid) {
		this.sellpolicyid = sellpolicyid;
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

	public String getSellerid() {
		return sellerid;
	}

	public void setSellerid(String sellerid) {
		this.sellerid = sellerid;
	}

	public String getSetpolicyid() {
		return setpolicyid;
	}

	public void setSetpolicyid(String setpolicyid) {
		this.setpolicyid = setpolicyid;
	}

	public String getPrefpolicyid() {
		return prefpolicyid;
	}

	public void setPrefpolicyid(String prefpolicyid) {
		this.prefpolicyid = prefpolicyid;
	}
}
