package com.service.paybox.entity;

import com.common.constant.SystemConstant;
import com.common.util.ConfigUtil;

/**
* 售票点
销售机构-->销售点模式
*/
public class Paybox{

	/**
	* 售票点ID
	*/
	private String payboxid;
	
	/**
	* 售票点名称
	*/
	private String payboxname;
	
	/**
	* 所在地区
	*/
	private String areaid;
	
	/**
	* 地址
	*/
	private String address;
	
	/**
	* 上级售票点ID
	*/
	private String fpayboxid;
	
	/**
	* 介绍
	*/
	private String introduction;
	
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
	
	private String fpayboxname;//父级售票点
	private String areaname;//行政区划名称
	private String statusname;//状态名称	
	public String getStatusname() {
		return statusname;
	}
	public void setStatusname(String statusname) {
		this.statusname = statusname;
	}
	public String getFpayboxname() {
		return fpayboxname;
	}
	public void setFpayboxname(String fpayboxname) {
		this.fpayboxname = fpayboxname;
	}
	public String getAreaname() {
		return areaname;
	}
	public void setAreaname(String areaname) {
		this.areaname = areaname;
	}
	public String getPayboxid(){
		return this.payboxid;
	}
	public void setPayboxid(String payboxid){
		this.payboxid = payboxid;
	}
	
	public String getPayboxname(){
		return this.payboxname;
	}
	public void setPayboxname(String payboxname){
		this.payboxname = payboxname;
	}
	
	public String getAreaid(){
		return this.areaid;
	}
	public void setAreaid(String areaid){
		this.areaid = areaid;
	}
	
	public String getAddress(){
		return this.address;
	}
	public void setAddress(String address){
		this.address = address;
	}
	
	public String getFpayboxid(){
		return this.fpayboxid;
	}
	public void setFpayboxid(String fpayboxid){
		this.fpayboxid = fpayboxid;
	}
	
	public String getIntroduction(){
		return this.introduction;
	}
	public void setIntroduction(String introduction){
		this.introduction = introduction;
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
