package com.service.sessnzone.entity;
/**
 * 座位
 * @author Administrator
 *
 */

public class SessnPew {
	private String pewid;
	private String sessionsid;
	private String hallid;
	private String zoneid;
	private String pewname;
	private String row;
	private String col;
	private String isaddpew;
	private String pricelevelid;
	private double price;
	private String reserveid;
	private String ispresell;
	private String issale;
	private String iscancel;
	private String remark;
	private String pewstatus;
	private String status;
	private String delstatus;
	private String vid;
	private String cid;
	private String ctime;
	private String mid;
	private String mtime;
	
	//用于统计的
	private double sumprice;//总价格
	private int num;//总数量
	public double getSumprice() {
		return sumprice;
	}
	public void setSumprice(double sumprice) {
		this.sumprice = sumprice;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public String getPewid() {
		return pewid;
	}
	public void setPewid(String pewid) {
		this.pewid = pewid;
	}
	public String getSessionsid() {
		return sessionsid;
	}
	public void setSessionsid(String sessionsid) {
		this.sessionsid = sessionsid;
	}
	public String getHallid() {
		return hallid;
	}
	public void setHallid(String hallid) {
		this.hallid = hallid;
	}
	public String getZoneid() {
		return zoneid;
	}
	public void setZoneid(String zoneid) {
		this.zoneid = zoneid;
	}
	public String getPewname() {
		return pewname;
	}
	public void setPewname(String pewname) {
		this.pewname = pewname;
	}
	public String getRow() {
		return row;
	}
	public void setRow(String row) {
		this.row = row;
	}
	public String getCol() {
		return col;
	}
	public void setCol(String col) {
		this.col = col;
	}
	public String getIsaddpew() {
		return isaddpew;
	}
	public void setIsaddpew(String isaddpew) {
		this.isaddpew = isaddpew;
	}
	public String getPricelevelid() {
		return pricelevelid;
	}
	public void setPricelevelid(String pricelevelid) {
		this.pricelevelid = pricelevelid;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getReserveid() {
		return reserveid;
	}
	public void setReserveid(String reserveid) {
		this.reserveid = reserveid;
	}
	public String getIspresell() {
		return ispresell;
	}
	public void setIspresell(String ispresell) {
		this.ispresell = ispresell;
	}
	public String getIssale() {
		return issale;
	}
	public void setIssale(String issale) {
		this.issale = issale;
	}
	public String getIscancel() {
		return iscancel;
	}
	public void setIscancel(String iscancel) {
		this.iscancel = iscancel;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getPewstatus() {
		return pewstatus;
	}
	public void setPewstatus(String pewstatus) {
		this.pewstatus = pewstatus;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDelstatus() {
		return delstatus;
	}
	public void setDelstatus(String delstatus) {
		this.delstatus = delstatus;
	}
	public String getVid() {
		return vid;
	}
	public void setVid(String vid) {
		this.vid = vid;
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
