package com.service.item.entity;

import com.common.constant.SystemConstant;
import com.common.util.ConfigUtil;


/**
* 项目管理
*/
public class Item{

	/**
	* 项目ID
	*/
	private String itemid;
	
	/**
	* 项目名称
	*/
	private String itemname;
	
	/**
	* 项目介绍
	*/
	private String introduction;
	
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
	
	//场次名称
	private String sessionsname;
	
	//状态
	private String status;
	private String statusname;//状态名称
	private Integer sl;//场次数
	
	
	public Integer getSl() {
		return sl;
	}
	public void setSl(Integer sl) {
		this.sl = sl;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
		this.statusname = ConfigUtil.getDicValue(SystemConstant.jqzt, status);
	}
	public String getStatusname() {
		return statusname;
	}
	public void setStatusname(String statusname) {
		this.statusname = statusname;
	}
	public String getSessionsname() {
		return sessionsname;
	}
	public void setSessionsname(String sessionsname) {
		this.sessionsname = sessionsname;
	}
	public String getItemid(){
		return this.itemid;
	}
	public void setItemid(String itemid){
		this.itemid = itemid;
	}
	
	public String getItemname(){
		return this.itemname;
	}
	public void setItemname(String itemname){
		this.itemname = itemname;
	}
	
	public String getIntroduction(){
		return this.introduction;
	}
	public void setIntroduction(String introduction){
		this.introduction = introduction;
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
