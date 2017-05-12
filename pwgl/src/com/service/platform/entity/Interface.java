package com.service.platform.entity;

import com.common.constant.SystemConstant;
import com.common.util.ConfigUtil;

/**
 * <p>Title: 接口管理实体</p>
 * @author 马骏
 * @date 2016-1-20
 */
public class Interface {

	private String interid;
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
	private String inexample;
	private String outexample;
	
	private String paramid;
	private String pkey;
	private String ptype;
	private String ptypename;
	
	public String getInterid() {
		return interid;
	}
	public void setInterid(String interid) {
		this.interid = interid;
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
	public String getInexample() {
		return inexample;
	}
	public void setInexample(String inexample) {
		this.inexample = inexample;
	}
	public String getOutexample() {
		return outexample;
	}
	public void setOutexample(String outexample) {
		this.outexample = outexample;
	}
	public String getParamid() {
		return paramid;
	}
	public void setParamid(String paramid) {
		this.paramid = paramid;
	}
	public String getPkey() {
		return pkey;
	}
	public void setPkey(String pkey) {
		this.pkey = pkey;
	}
	public String getPtype() {
		return ptype;
	}
	public void setPtype(String ptype) {
		this.ptype = ptype;
		this.ptypename = ConfigUtil.getDicValue(SystemConstant.cslx, ptype);
	}
	public String getPtypename() {
		return ptypename;
	}
	public void setPtypename(String ptypename) {
		this.ptypename = ptypename;
	}
	public String getPdesc() {
		return pdesc;
	}
	public void setPdesc(String pdesc) {
		this.pdesc = pdesc;
	}
	public String getPxh() {
		return pxh;
	}
	public void setPxh(String pxh) {
		this.pxh = pxh;
	}
	private String pdesc;
	private String pxh;
}
