package com.service.setpolicy.entity;

/**
 * 明细
 * 
 * @author Administrator
 * 
 */
public class PolicyDetail {
	private String detailid;
	private String policyid;
	private String pricelevelid;
	private String price;//原票价
	private String yhpj;//优惠票价
	private String operType;// 操作类型 1:表示套票政策，2：表示优惠政策
	private String cid;
	private String ctime;
	private String mid;
	private String mtime;
	private String pricelevelname;
	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getYhpj() {
		return yhpj;
	}

	public void setYhpj(String yhpj) {
		this.yhpj = yhpj;
	}

	public String getPricelevelname() {
		return pricelevelname;
	}

	public void setPricelevelname(String pricelevelname) {
		this.pricelevelname = pricelevelname;
	}

	public String getDetailid() {
		return detailid;
	}

	public void setDetailid(String detailid) {
		this.detailid = detailid;
	}

	public String getPolicyid() {
		return policyid;
	}

	public void setPolicyid(String policyid) {
		this.policyid = policyid;
	}

	public String getPricelevelid() {
		return pricelevelid;
	}

	public void setPricelevelid(String pricelevelid) {
		this.pricelevelid = pricelevelid;
	}


	public String getOperType() {
		return operType;
	}

	public void setOperType(String operType) {
		this.operType = operType;
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
}
