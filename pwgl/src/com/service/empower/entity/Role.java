package com.service.empower.entity;

/**
 * <p>Title: 角色管理实体</p>
 * @author 马骏
 * @date 2016-1-18
 */
public class Role {

	private String roleid;
	private String rolename;
	private String froleid;
	private String roletype;
	private String des;
	
	public String getRoleid() {
		return roleid;
	}
	public void setRoleid(String roleid) {
		this.roleid = roleid;
	}
	public String getRolename() {
		return rolename;
	}
	public void setRolename(String rolename) {
		this.rolename = rolename;
	}
	public String getFroleid() {
		return froleid;
	}
	public void setFroleid(String froleid) {
		this.froleid = froleid;
	}
	public String getRoletype() {
		return roletype;
	}
	public void setRoletype(String roletype) {
		this.roletype = roletype;
	}
	public String getDes() {
		return des;
	}
	public void setDes(String des) {
		this.des = des;
	}
}
