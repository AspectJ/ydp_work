package com.service.performer.entity;


import com.common.constant.SystemConstant;
import com.common.util.ConfigUtil;

/**
* 演出商
*/
public class Performer{

	/**
	* 演出商ID
	*/
	private String performerid;
	
	/**
	* 演出商名称
	*/
	private String performername;
	
	/**
	* 所在地区
	*/
	private String areaid;
	
	/**
	* 地址
	*/
	private String address;
	
	/**
	* 上级演出商ID
	*/
	private String fperformerid;
	
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
	
	//父角色名称
	private String fperformername;	
	
	public String getFperformername() {
		return fperformername;
	}
	public void setFperformername(String fperformername) {
		this.fperformername = fperformername;
	}
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
	public String getPerformerid(){
		return this.performerid;
	}
	public void setPerformerid(String performerid){
		this.performerid = performerid;
	}
	
	public String getPerformername(){
		return this.performername;
	}
	public void setPerformername(String performername){
		this.performername = performername;
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
	
	public String getFperformerid(){
		return this.fperformerid;
	}
	public void setFperformerid(String fperformerid){
		this.fperformerid = fperformerid;
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
