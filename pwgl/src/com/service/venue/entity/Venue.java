package com.service.venue.entity;

import java.sql.Date;
import java.sql.Timestamp;

import com.common.constant.SystemConstant;
import com.common.util.ConfigUtil;

/**
* 场馆
禁启状态：1启用  2禁用
*/
public class Venue{

	/**
	* 场馆ID
	*/
	private String venueid;
	
	/**
	* 场馆名称
	*/
	private String venuename;
	
	/**
	* 地址
	*/
	private String address;
	
	/**
	* 所在地区
	*/
	private String areaid;
	
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
	
	//行政区划名称
	private String areaname;
	
	private String statusname;
	
	
	
	
	public String getStatusname() {
		return statusname;
	}
	public void setStatusname(String statusname) {
		this.statusname = statusname;
	}
	public String getAreaname() {
		return areaname;
	}
	public void setAreaname(String areaname) {
		this.areaname = areaname;
	}
	public String getVenueid(){
		return this.venueid;
	}
	public void setVenueid(String venueid){
		this.venueid = venueid;
	}
	
	public String getVenuename(){
		return this.venuename;
	}
	public void setVenuename(String venuename){
		this.venuename = venuename;
	}
	
	public String getAddress(){
		return this.address;
	}
	public void setAddress(String address){
		this.address = address;
	}
	
	public String getAreaid(){
		return this.areaid;
	}
	public void setAreaid(String areaid){
		this.areaid = areaid;
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
