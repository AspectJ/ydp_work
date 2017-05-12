package com.service.reserve.entity;

import java.sql.Date;
import java.sql.Timestamp;

import com.common.constant.SystemConstant;
import com.common.util.ConfigUtil;

/**
* 座位预留种类
是否可预约、是否可售、是否可取：即指该类预留座位在售票点是否可以预定、销售、取消，这个是默认值
*/
public class Reserve{

	/**
	* 座位预留ID
	*/
	private String reserveid;
	
	/**
	* 座位预留名称
	*/
	private String reservename;
	
	/**
	* 排序号
	*/
	private String pxh;
	
	/**
	* 说明
	*/
	private String des;
	
	/**
	* 是否可预约
	*/
	private String isreserve;
	
	/**
	* 是否可售
	*/
	private String issale;
	
	/**
	* 是否可取
	*/
	private String iscancel;
	
	/**
	* 禁启状态
	*/
	private String status;
	
	/**
	* 删除状态
	*/
	private String delstatus;
	
	/**
	* 数据版本号
	*/
	private Integer vid;
	
	/**
	* 创建人
	*/
	private String cid;
	
	/**
	* 创建时间
	*/
	private String ctime;
	
	/**
	* 修改人
	*/
	private String mid;
	
	/**
	* 修改时间
	*/
	private String mtime;
	
	private String statusname;
	
	private String isreservename;//预留种类名称
	private String issalename;//是否可售名称
	private String iscancelname;//是否取消名称	
	
	public String getIsreservename() {
		return isreservename;
	}
	public void setIsreservename(String isreservename) {
		this.isreservename = isreservename;
	}
	public String getIssalename() {
		return issalename;
	}
	public void setIssalename(String issalename) {
		this.issalename = issalename;
	}
	public String getIscancelname() {
		return iscancelname;
	}
	public void setIscancelname(String iscancelname) {
		this.iscancelname = iscancelname;
	}
	public String getStatusname() {
		return statusname;
	}
	public void setStatusname(String statusname) {
		this.statusname = statusname;
	}
	public String getReserveid(){
		return this.reserveid;
	}
	public void setReserveid(String reserveid){
		this.reserveid = reserveid;
	}
	
	public String getReservename(){
		return this.reservename;
	}
	public void setReservename(String reservename){
		this.reservename = reservename;
	}
	
	public String getPxh(){
		return this.pxh;
	}
	public void setPxh(String pxh){
		this.pxh = pxh;
	}
	
	public String getDes(){
		return this.des;
	}
	public void setDes(String des){
		this.des = des;
	}
	
	public String getIsreserve(){
		return this.isreserve;
	}
	public void setIsreserve(String isreserve){
		this.isreserve = isreserve;
	}
	
	public String getIssale(){
		return this.issale;
	}
	public void setIssale(String issale){
		this.issale = issale;
	}
	
	public String getIscancel(){
		return this.iscancel;
	}
	public void setIscancel(String iscancel){
		this.iscancel = iscancel;
	}
	
	public String getStatus(){
		return this.status;
	}
	public void setStatus(String status){
		this.status = status;
		this.statusname = ConfigUtil.getDicValue(SystemConstant.jqzt, status);
	}
	
	public String getDelstatus(){
		return this.delstatus;
	}
	public void setDelstatus(String delstatus){
		this.delstatus = delstatus;
	}
	
	public Integer getVid(){
		return this.vid;
	}
	public void setVid(Integer vid){
		this.vid = vid;
	}
	
	public String getCid(){
		return this.cid;
	}
	public void setCid(String cid){
		this.cid = cid;
	}
	
	public String getCtime(){
		return this.ctime;
	}
	public void setCtime(String ctime){
		this.ctime = ctime;
	}
	
	public String getMid(){
		return this.mid;
	}
	public void setMid(String mid){
		this.mid = mid;
	}
	
	public String getMtime(){
		return this.mtime;
	}
	public void setMtime(String mtime){
		this.mtime = mtime;
	}
	
}
