package com.service.hall.entity;

import java.sql.Date;
import java.sql.Timestamp;

import com.common.constant.SystemConstant;
import com.common.util.ConfigUtil;

/**
* 演出厅
*/
public class Hall{

	/**
	* 演出厅ID
	*/
	private String hallid;
	
	/**
	* 演出厅名称
	*/
	private String hallname;
	
	/**
	* 场馆ID
	*/
	private String venueid;
	
	/**
	* 位置
	*/
	private String location;
	
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
	
	
	//场管名称
	private String venuename;
	
	private String statusname;
	
	
	public String getStatusname() {
		return statusname;
	}
	public void setStatusname(String statusname) {
		this.statusname = statusname;
	}
	public String getVenuename() {
		return venuename;
	}
	public void setVenuename(String venuename) {
		this.venuename = venuename;
	}
	public String getHallid(){
		return this.hallid;
	}
	public void setHallid(String hallid){
		this.hallid = hallid;
	}
	
	public String getHallname(){
		return this.hallname;
	}
	public void setHallname(String hallname){
		this.hallname = hallname;
	}
	
	public String getVenueid(){
		return this.venueid;
	}
	public void setVenueid(String venueid){
		this.venueid = venueid;
	}
	
	public String getLocation(){
		return this.location;
	}
	public void setLocation(String location){
		this.location = location;
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
