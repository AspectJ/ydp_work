package com.service.ticketface.entity;


/**
* 票版
生成票版：将票价制定、票价划分、票面、售票权限、预留、销售政策均生成数据（空白和复制都生成，复制时，可
*/
public class Ticketface{

	/**
	* 票版ID
	*/
	private String ticketfaceid;
	
	/**
	* 场次ID
	*/
	private String sessionsid;
	
	/**
	* 票面编号
	*/
	private String ticketcode;
	
	/**
	* 票面名称
	*/
	private String ticketname;
	
	/**
	* 票面方向
	*/
	private String ticketorient;
	
	/**
	* 票面背景图URL
	*/
	private String bgurl;
	
	/**
	* 高度
	*/
	private Double height;
	
	/**
	* 宽度
	*/
	private Double width;
	
	/**
	* 副劵位置
	*/
	private String carbonlocation;
	
	/**
	* 副劵数量
	*/
	private Integer carbonnum;
	
	/**
	* 副劵高度cm
	*/
	private Double carbonheight;
	private String sessionsname;	
	public String getSessionsname() {
		return sessionsname;
	}
	public void setSessionsname(String sessionsname) {
		this.sessionsname = sessionsname;
	}
	public String getTicketfaceid(){
		return this.ticketfaceid;
	}
	public void setTicketfaceid(String ticketfaceid){
		this.ticketfaceid = ticketfaceid;
	}
	
	public String getSessionsid(){
		return this.sessionsid;
	}
	public void setSessionsid(String sessionsid){
		this.sessionsid = sessionsid;
	}
	
	public String getTicketcode(){
		return this.ticketcode;
	}
	public void setTicketcode(String ticketcode){
		this.ticketcode = ticketcode;
	}
	
	public String getTicketname(){
		return this.ticketname;
	}
	public void setTicketname(String ticketname){
		this.ticketname = ticketname;
	}
	
	public String getTicketorient(){
		return this.ticketorient;
	}
	public void setTicketorient(String ticketorient){
		this.ticketorient = ticketorient;
	}
	
	public String getBgurl(){
		return this.bgurl;
	}
	public void setBgurl(String bgurl){
		this.bgurl = bgurl;
	}
	
	public Double getHeight(){
		return this.height;
	}
	public void setHeight(Double height){
		this.height = height;
	}
	
	public Double getWidth(){
		return this.width;
	}
	public void setWidth(Double width){
		this.width = width;
	}
	
	public String getCarbonlocation(){
		return this.carbonlocation;
	}
	public void setCarbonlocation(String carbonlocation){
		this.carbonlocation = carbonlocation;
	}
	
	public Integer getCarbonnum(){
		return this.carbonnum;
	}
	public void setCarbonnum(Integer carbonnum){
		this.carbonnum = carbonnum;
	}
	
	public Double getCarbonheight(){
		return this.carbonheight;
	}
	public void setCarbonheight(Double carbonheight){
		this.carbonheight = carbonheight;
	}
	
}
