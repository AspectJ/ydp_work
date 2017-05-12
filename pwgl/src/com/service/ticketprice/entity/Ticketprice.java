package com.service.ticketprice.entity;

/**
* 票价制定
*/
public class Ticketprice{

	/**
	* 场次票价ID
	*/
	private String sessntkprid;
	
	/**
	* 场次ID
	*/
	private String sessionsid;
	
	/**
	* 票价等级ID
	*/
	private String pricelevelid;
	
	/**
	* 票价等级名称
	*/
	private String pricelevelname;
	
	/**
	* 票价等级颜色值
	*/
	private String color;
	
	/**
	* 票价
	*/
	private Double price;
	
	/**
	* 票价标记（VIP字样）
	*/
	private String mark;
	
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
	private String sessionsname;	
	public String getSessionsname() {
		return sessionsname;
	}
	public void setSessionsname(String sessionsname) {
		this.sessionsname = sessionsname;
	}
	public String getSessntkprid(){
		return this.sessntkprid;
	}
	public void setSessntkprid(String sessntkprid){
		this.sessntkprid = sessntkprid;
	}
	
	public String getSessionsid(){
		return this.sessionsid;
	}
	public void setSessionsid(String sessionsid){
		this.sessionsid = sessionsid;
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
	
	public Double getPrice(){
		return this.price;
	}
	public void setPrice(Double price){
		this.price = price;
	}
	
	public String getMark(){
		return this.mark;
	}
	public void setMark(String mark){
		this.mark = mark;
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
