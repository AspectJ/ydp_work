package com.service.pricelevel.entity;

import com.common.constant.SystemConstant;
import com.common.util.ConfigUtil;

/**
* 票价等级
票面默认标识：买了该票价等级的票是否显示一个VIP字样
*/
public class Pricelevel{

	/**
	* 票价等级ID
	*/
	private String pricelevelid;
	
	/**
	* 票价等级名称
	*/
	private String pricelevelname;
	
	/**
	* 颜色标识
	*/
	private String color;
	
	/**
	* 图标标识
	*/
	private String pic;
	
	/**
	* 排序号
	*/
	private String pxh;
	
	/**
	* 票面默认标识
	*/
	private String defaultchar;
	
	/**
	* 说明
	*/
	private String des;
	
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
	
	
	public String getStatusname() {
		return statusname;
	}
	public void setStatusname(String statusname) {
		this.statusname = statusname;
	}
	public String getPricelevelid(){
		return this.pricelevelid;
	}
	public void setPricelevelid(String pricelevelid){
		this.pricelevelid = pricelevelid;
	}
	
	public String getPricelevelname(){
		return this.pricelevelname;
	}
	public void setPricelevelname(String pricelevelname){
		this.pricelevelname = pricelevelname;
	}
	
	public String getColor(){
		return this.color;
	}
	public void setColor(String color){
		this.color = color;
	}
	
	public String getPic(){
		return this.pic;
	}
	public void setPic(String pic){
		this.pic = pic;
	}
	
	public String getPxh(){
		return this.pxh;
	}
	public void setPxh(String pxh){
		this.pxh = pxh;
	}
	
	public String getDefaultchar(){
		return this.defaultchar;
	}
	public void setDefaultchar(String defaultchar){
		this.defaultchar = defaultchar;
	}
	
	public String getDes(){
		return this.des;
	}
	public void setDes(String des){
		this.des = des;
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
