package com.service.platform.entity;

import com.common.constant.SystemConstant;
import com.common.util.ConfigUtil;

/**
 * <p>Title: 服务管理实体</p>
 * @author 马骏
 * @date 2016-1-20
 */
public class Service {

	private String sid;
	private String domain;
	private String type;
	private String surl;
	private String serviceid;
	private String opertype;
	private String dataformat;
	private String dataformatname;
	private String isremote;
	private String isremotename;
	private String times;
	private String des;
	
	public String getSid() {
		return sid;
	}
	public void setSid(String sid) {
		this.sid = sid;
	}
	public String getDomain() {
		return domain;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getSurl() {
		return surl;
	}
	public void setSurl(String surl) {
		this.surl = surl;
	}
	public String getServiceid() {
		return serviceid;
	}
	public void setServiceid(String serviceid) {
		this.serviceid = serviceid;
	}
	public String getOpertype() {
		return opertype;
	}
	public void setOpertype(String opertype) {
		this.opertype = opertype;
	}
	public String getDataformat() {
		return dataformat;
	}
	public void setDataformat(String dataformat) {
		this.dataformat = dataformat;
		this.dataformatname = ConfigUtil.getDicValue(SystemConstant.sjgs, dataformat);
	}
	public String getDataformatname() {
		return dataformatname;
	}
	public void setDataformatname(String dataformatname) {
		this.dataformatname = dataformatname;
	}
	public String getIsremote() {
		return isremote;
	}
	public void setIsremote(String isremote) {
		this.isremote = isremote;
		this.isremotename = ConfigUtil.getDicValue(SystemConstant.sfzt, isremote);
	}
	public String getIsremotename() {
		return isremotename;
	}
	public void setIsremotename(String isremotename) {
		this.isremotename = isremotename;
	}
	public String getTimes() {
		return times;
	}
	public void setTimes(String times) {
		this.times = times;
	}
	public String getDes() {
		return des;
	}
	public void setDes(String des) {
		this.des = des;
	}
}
