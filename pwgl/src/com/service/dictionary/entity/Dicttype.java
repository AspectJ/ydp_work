package com.service.dictionary.entity;

import com.common.constant.SystemConstant;
import com.common.util.ConfigUtil;

/**
 * <p>Title: 字典类型实体</p>
 * @author 马骏
 * @date 2016-1-19
 */
public class Dicttype {

	private String dicttypeid;
	private String typename;
	private String istree;
	private String istreename;
	private String status;
	private String statusname;
	
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
	public String getIstree() {
		return istree;
	}
	public void setIstree(String istree) {
		this.istree = istree;
		this.istreename = ConfigUtil.getDicValue(SystemConstant.sfzt, istree);
	}
	public String getIstreename() {
		return istreename;
	}
	public void setIstreename(String istreename) {
		this.istreename = istreename;
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
