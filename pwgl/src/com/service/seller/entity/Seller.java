package com.service.seller.entity;

import java.sql.Date;
import java.sql.Timestamp;

import com.common.constant.SystemConstant;
import com.common.util.ConfigUtil;

/**
* 售票员
*/
public class Seller{

	/**
	* 售票员ID
	*/
	private String sellerid;
	
	/**
	* 售票点ID
	*/
	private String payboxid;
	
	/**
	* 登录用户名
	*/
	private String username;
	
	/**
	* 登录密码
	*/
	private String pass;
	
	/**
	* 最近一次登录时间
	*/
	private String lasttime;
	
	/**
	* 最近一次登录IP
	*/
	private String lastip;
	
	/**
	* 登录次数
	*/
	private Integer times;
	
	/**
	* 姓名
	*/
	private String realname;
	
	/**
	* 性别
	*/
	private String sex;
	
	/**
	* 年龄
	*/
	private Integer age;
	
	/**
	* 联系电话
	*/
	private String tele;
	
	/**
	* 头像URL
	*/
	private String txurl;
	
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
	
	private String statusname;//状态名称
	private String checked;
	
    public String getChecked() {
		return checked;
	}
	public void setChecked(String checked) {
		this.checked = checked;
	}
	private String payboxname;//售票名称	
	public String getPayboxname() {
		return payboxname;
	}
	public void setPayboxname(String payboxname) {
		this.payboxname = payboxname;
	}
	public String getStatusname() {
		return statusname;
	}
	public void setStatusname(String statusname) {
		this.statusname = statusname;
	}
	public String getSellerid(){
		return this.sellerid;
	}
	public void setSellerid(String sellerid){
		this.sellerid = sellerid;
	}
	
	public String getPayboxid(){
		return this.payboxid;
	}
	public void setPayboxid(String payboxid){
		this.payboxid = payboxid;
	}
	
	public String getUsername(){
		return this.username;
	}
	public void setUsername(String username){
		this.username = username;
	}
	
	public String getPass(){
		return this.pass;
	}
	public void setPass(String pass){
		this.pass = pass;
	}
	
	public String getLasttime(){
		return this.lasttime;
	}
	public void setLasttime(String lasttime){
		this.lasttime = lasttime;
	}
	
	public String getLastip(){
		return this.lastip;
	}
	public void setLastip(String lastip){
		this.lastip = lastip;
	}
	
	public Integer getTimes(){
		return this.times;
	}
	public void setTimes(Integer times){
		this.times = times;
	}
	
	public String getRealname(){
		return this.realname;
	}
	public void setRealname(String realname){
		this.realname = realname;
	}
	
	public String getSex(){
		return this.sex;
	}
	public void setSex(String sex){
		this.sex = sex;
	}
	
	public Integer getAge(){
		return this.age;
	}
	public void setAge(Integer age){
		this.age = age;
	}
	
	public String getTele(){
		return this.tele;
	}
	public void setTele(String tele){
		this.tele = tele;
	}
	
	public String getTxurl(){
		return this.txurl;
	}
	public void setTxurl(String txurl){
		this.txurl = txurl;
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
