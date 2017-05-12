package com.service.platform.entity;

import com.common.constant.SystemConstant;
import com.common.util.ConfigUtil;

/**
 * <p>Title: 意见反馈实体</p>
 * @author 马骏
 * @date 2016-1-19
 */
public class Suggest {

	private String suggid;
	private String suggnr;
	private String ctime;
	private String userid;
	private String suggfrom;
	private String suggfromname;
	private String realname;
	private String telephone;
	
	public String getSuggid() {
		return suggid;
	}
	public void setSuggid(String suggid) {
		this.suggid = suggid;
	}
	public String getSuggnr() {
		return suggnr;
	}
	public void setSuggnr(String suggnr) {
		this.suggnr = suggnr;
	}
	public String getCtime() {
		return ctime;
	}
	public void setCtime(String ctime) {
		this.ctime = ctime;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getSuggfrom() {
		return suggfrom;
	}
	public void setSuggfrom(String suggfrom) {
		this.suggfrom = suggfrom;
		this.suggfromname = ConfigUtil.getDicValue(SystemConstant.yjly, suggfrom);
	}
	public String getSuggfromname() {
		return suggfromname;
	}
	public void setSuggfromname(String suggfromname) {
		this.suggfromname = suggfromname;
	}
	public String getRealname() {
		return realname;
	}
	public void setRealname(String realname) {
		this.realname = realname;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

}
