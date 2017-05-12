package com.service.dictionary.entity;

import com.common.constant.SystemConstant;
import com.common.util.ConfigUtil;

/**
 * <p>Title: 树形字典实体</p>
 * @author 马骏
 * @date 2016-1-21
 */
public class Dicttree {

	private String treeid;
	private String dvalue;
	private String dicttypeid;
	private String typename;
	private String ftreeid;
	private String fdvalue;
	private String pxh;
	private String des;
	private String status;
	private String statusname;
	
	public String getTreeid() {
		return treeid;
	}
	public void setTreeid(String treeid) {
		this.treeid = treeid;
	}
	public String getDvalue() {
		return dvalue;
	}
	public void setDvalue(String dvalue) {
		this.dvalue = dvalue;
	}
	public String getDicttypeid() {
		return dicttypeid;
	}
	public void setDicttypeid(String dicttypeid) {
		this.dicttypeid = dicttypeid;
	}
	public String getTypename() {
		return typename;
	}
	public void setTypename(String typename) {
		this.typename = typename;
	}
	public String getFtreeid() {
		return ftreeid;
	}
	public void setFtreeid(String ftreeid) {
		this.ftreeid = ftreeid;
	}
	public String getFdvalue() {
		return fdvalue;
	}
	public void setFdvalue(String fdvalue) {
		this.fdvalue = fdvalue;
	}
	public String getPxh() {
		return pxh;
	}
	public void setPxh(String pxh) {
		this.pxh = pxh;
	}
	public String getDes() {
		return des;
	}
	public void setDes(String des) {
		this.des = des;
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
}
