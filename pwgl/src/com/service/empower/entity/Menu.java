package com.service.empower.entity;

import com.common.constant.SystemConstant;
import com.common.util.ConfigUtil;

/**
 * <p>Title: 功能菜单实体</p>
 * @author 马骏
 * @date 2016-1-16
 */
public class Menu {

	private String menuid;
	private String mname;
	private String alias;
	private String murl;
	private String pxh;
	private String fmenuid;
	private String des;
	private String status;
	private String statusname;
	private Number level;
	private Boolean isLeaf;
	private Boolean loaded;
	private Boolean expanded;
	private String parent;
	
	public String getParent() {
		return parent;
	}
	public void setParent(String parent) {
		this.parent = parent;
	}
	public String getMenuid() {
		return menuid;
	}
	public void setMenuid(String menuid) {
		this.menuid = menuid;
	}
	public String getMname() {
		return mname;
	}
	public void setMname(String mname) {
		this.mname = mname;
	}
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	public String getMurl() {
		return murl;
	}
	public void setMurl(String murl) {
		this.murl = murl;
	}
	public String getPxh() {
		return pxh;
	}
	public void setPxh(String pxh) {
		this.pxh = pxh;
	}
	public String getFmenuid() {
		return fmenuid;
	}
	public void setFmenuid(String fmenuid) {
		this.fmenuid = fmenuid;
		this.parent = fmenuid;
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
	public Number getLevel() {
		return level;
	}
	public void setLevel(Number level) {
		this.level = level;
	}
	public Boolean getIsLeaf() {
		return isLeaf;
	}
	public void setIsLeaf(Boolean isLeaf) {
		this.isLeaf = isLeaf;
	}
	public Boolean getLoaded() {
		return loaded;
	}
	public void setLoaded(Boolean loaded) {
		this.loaded = loaded;
	}
	public Boolean getExpanded() {
		return expanded;
	}
	public void setExpanded(Boolean expanded) {
		this.expanded = expanded;
	}
}
