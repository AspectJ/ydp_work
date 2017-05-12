package com.service.login.entity;

/**
 * 
 * <p>
 * Title：用户菜单ID
 * </p>
 * <p>
 * Description：2014
 * </p>
 * <p>
 * Author : 2014-4-1
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */
public class UserMenu implements java.io.Serializable {

	private static final long serialVersionUID = -7257064454897208302L;
	private String roleid;

	private String cdid;
	private String fcdid;
	private String cdmc;
	private Integer pxh;
	private String cdurl;
	private String ys;

	public String getYs() {
		return ys;
	}

	public void setYs(String ys) {
		this.ys = ys;
	}

	public String getRoleid() {
		return roleid;
	}

	public void setRoleid(String roleid) {
		this.roleid = roleid;
	}

	public String getCdid() {
		return cdid;
	}

	public void setCdid(String cdid) {
		this.cdid = cdid;
	}

	public String getFcdid() {
		return fcdid;
	}

	public void setFcdid(String fcdid) {
		this.fcdid = fcdid;
	}

	public String getCdmc() {
		return cdmc;
	}

	public void setCdmc(String cdmc) {
		this.cdmc = cdmc;
	}

	public Integer getPxh() {
		return pxh;
	}

	public void setPxh(Integer pxh) {
		this.pxh = pxh;
	}

	public String getCdurl() {
		return cdurl;
	}

	public void setCdurl(String cdurl) {
		this.cdurl = cdurl;
	}

}
