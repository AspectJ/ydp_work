package com.service.sellpower.entity;

import java.sql.Date;
import java.sql.Timestamp;

import com.common.constant.SystemConstant;
import com.common.util.ConfigUtil;

/**
* 售票权限
如：售票、预售、取票
*/
public class Sellpower{

	/**
	* 售票权限ID
	*/
	private String sellpowerid;
	
	/**
	* 权限名称
	*/
	private String powername;
	
	/**
	* 权限唯一标识
	*/
	private String characteristic;
	
	/**
	* 排序号
	*/
	private String pxh;
	
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
	private String checked;
	
	public String getChecked() {
		return checked;
	}
	public void setChecked(String checked) {
		this.checked = checked;
	}
	private String statusname;//状态名称
	public String getStatusname() {
		return statusname;
	}
	public void setStatusname(String statusname) {
		this.statusname = statusname;
	}
	public String getSellpowerid(){
		return this.sellpowerid;
	}
	public void setSellpowerid(String sellpowerid){
		this.sellpowerid = sellpowerid;
	}
	
	public String getPowername(){
		return this.powername;
	}
	public void setPowername(String powername){
		this.powername = powername;
	}
	
	public String getCharacteristic(){
		return this.characteristic;
	}
	public void setCharacteristic(String characteristic){
		this.characteristic = characteristic;
	}
	
	public String getPxh(){
		return this.pxh;
	}
	public void setPxh(String pxh){
		this.pxh = pxh;
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
