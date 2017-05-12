package com.service.login.entity;

public class User implements java.io.Serializable {

	private static final long serialVersionUID = 1L;

	private String yhid;
	private String userName;
	private String yhnc;
	private String sjhm;
	private String xzqh;
	private String tx;
	private String xb;

	
	//售票人员
	private String payboxid;//售票机构ID
	private String dlzh;//登录帐号
	private String pass;//密码
	private String tele;//电话
	private String realname;//真实姓名
	private String txurl;//头像
	private String xtid;//系统Id

	public String getPayboxid() {
		return payboxid;
	}

	public void setPayboxid(String payboxid) {
		this.payboxid = payboxid;
	}

	public String getDlzh() {
		return dlzh;
	}

	public void setDlzh(String dlzh) {
		this.dlzh = dlzh;
	}

	public String getPass() {
		return pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

	public String getTele() {
		return tele;
	}

	public void setTele(String tele) {
		this.tele = tele;
	}

	public String getRealname() {
		return realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public String getTxurl() {
		return txurl;
	}

	public void setTxurl(String txurl) {
		this.txurl = txurl;
	}

	public String getXtid() {
		return xtid;
	}

	public void setXtid(String xtid) {
		this.xtid = xtid;
	}

	public String getXb() {
		return xb;
	}

	public void setXb(String xb) {
		this.xb = xb;
	}


	public String getTx() {
		return tx;
	}

	public void setTx(String tx) {
		this.tx = tx;
	}

	public String getSjhm() {
		return sjhm;
	}

	public void setSjhm(String sjhm) {
		this.sjhm = sjhm;
	}

	public String getYhid() {
		return yhid;
	}

	public void setYhid(String yhid) {
		this.yhid = yhid;
	}

	public String getYhnc() {
		return yhnc;
	}

	public void setYhnc(String yhnc) {
		this.yhnc = yhnc;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getXzqh() {
		return xzqh;
	}

	public void setXzqh(String xzqh) {
		this.xzqh = xzqh;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
