package com.service.sessions.entity;
import com.common.constant.SystemConstant;
import com.common.util.ConfigUtil;
/**
* 场次信息
*/
public class Sessions{

	/**
	* 场次ID
	*/
	private String sessionsid;
	
	/**
	* 场馆ID
	*/
	private String venueid;
	
	/**
	* 演出厅ID
	*/
	private String hallid;
	
	/**
	* 演出商ID
	*/
	private String performerid;
	
	/**
	* 项目ID
	*/
	private String itemid;
	
	/**
	* 场次编号
	*/
	private String sessionscode;
	
	/**
	* 场次名称
	*/
	private String sessionsname;
	
	/**
	* 场次英文名
	*/
	private String engname;
	
	/**
	* 上演时间
	*/
	private String playtime;
	
	/**
	* 片长
	*/
	private String length;
	
	/**
	* 售票开始时间
	*/
	private String begintime;
	
	/**
	* 售票截止时间
	*/
	private String endtime;
	
	/**
	* 产品类别ID
	*/
	private String producttypeid;
	
	/**
	* 主办方
	*/
	private String sponsor;
	
	/**
	* 指定主办方
	*/
	private String dessponsor;
	
	/**
	* 承办方
	*/
	private String actualsponsor;
	
	/**
	* 网址
	*/
	private String website;
	
	/**
	* 检票次数
	*/
	private String checktimes;
	
	/**
	* 税号登记
	*/
	private String regnumb;
	
	/**
	* 场次介绍
	*/
	private String introduction;
	
	/**
	* 场次状态
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
	private String venuename;
	private String hallname;
	private String performername;
	private String itemname;
	private String typename;
	private String statusname;	
	public String getPlaytime() {
		return playtime;
	}
	public void setPlaytime(String playtime) {
		this.playtime = playtime;
	}
	public String getBegintime() {
		return begintime;
	}
	public void setBegintime(String begintime) {
		this.begintime = begintime;
	}
	public String getEndtime() {
		return endtime;
	}
	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}
	public String getVenuename() {
		return venuename;
	}
	public void setVenuename(String venuename) {
		this.venuename = venuename;
	}
	public String getHallname() {
		return hallname;
	}
	public void setHallname(String hallname) {
		this.hallname = hallname;
	}
	public String getPerformername() {
		return performername;
	}
	public void setPerformername(String performername) {
		this.performername = performername;
	}
	public String getItemname() {
		return itemname;
	}
	public void setItemname(String itemname) {
		this.itemname = itemname;
	}
	public String getTypename() {
		return typename;
	}
	public void setTypename(String typename) {
		this.typename = typename;
	}
	public String getStatusname() {
		return statusname;
	}
	public void setStatusname(String statusname) {
		this.statusname = statusname;
	}
	public String getSessionsid(){
		return this.sessionsid;
	}
	public void setSessionsid(String sessionsid){
		this.sessionsid = sessionsid;
	}
	
	public String getVenueid(){
		return this.venueid;
	}
	public void setVenueid(String venueid){
		this.venueid = venueid;
	}
	
	public String getHallid(){
		return this.hallid;
	}
	public void setHallid(String hallid){
		this.hallid = hallid;
	}
	
	public String getPerformerid(){
		return this.performerid;
	}
	public void setPerformerid(String performerid){
		this.performerid = performerid;
	}
	
	public String getItemid(){
		return this.itemid;
	}
	public void setItemid(String itemid){
		this.itemid = itemid;
	}
	
	public String getSessionscode(){
		return this.sessionscode;
	}
	public void setSessionscode(String sessionscode){
		this.sessionscode = sessionscode;
	}
	
	public String getSessionsname(){
		return this.sessionsname;
	}
	public void setSessionsname(String sessionsname){
		this.sessionsname = sessionsname;
	}
	
	public String getEngname(){
		return this.engname;
	}
	public void setEngname(String engname){
		this.engname = engname;
	}	
	public String getLength(){
		return this.length;
	}
	public void setLength(String length){
		this.length = length;
	}
	public String getProducttypeid(){
		return this.producttypeid;
	}
	public void setProducttypeid(String producttypeid){
		this.producttypeid = producttypeid;
	}
	
	public String getSponsor(){
		return this.sponsor;
	}
	public void setSponsor(String sponsor){
		this.sponsor = sponsor;
	}
	
	public String getDessponsor(){
		return this.dessponsor;
	}
	public void setDessponsor(String dessponsor){
		this.dessponsor = dessponsor;
	}
	
	public String getActualsponsor(){
		return this.actualsponsor;
	}
	public void setActualsponsor(String actualsponsor){
		this.actualsponsor = actualsponsor;
	}
	
	public String getWebsite(){
		return this.website;
	}
	public void setWebsite(String website){
		this.website = website;
	}
	
	public String getChecktimes(){
		return this.checktimes;
	}
	public void setChecktimes(String checktimes){
		this.checktimes = checktimes;
	}
	
	public String getRegnumb(){
		return this.regnumb;
	}
	public void setRegnumb(String regnumb){
		this.regnumb = regnumb;
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
		this.statusname = ConfigUtil.getDicValue(SystemConstant.cczt, status);
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
