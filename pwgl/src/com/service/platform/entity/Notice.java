package com.service.platform.entity;

import com.common.constant.SystemConstant;
import com.common.util.ConfigUtil;

/**
 * <p>Title: 系统通知实体</p>
 * @author 马骏
 * @date 2016-01-19
 */
public class Notice {

	private String noticeid;
	private String title;
	private byte[] content;
	private String reltime;
	private String relplatform;
	private String status;
	private String contentStr;
	private String statusname;
	
	public String getStatusname() {
		return statusname;
	}
	public void setStatusname(String statusname) {
		this.statusname = statusname;
	}
	public String getNoticeid() {
		return noticeid;
	}
	public void setNoticeid(String noticeid) {
		this.noticeid = noticeid;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public byte[] getContent() {
		return content;
	}
	public void setContent(byte[] content) {
		this.content = content;
		if (content != null && content.length > 0) {
			try {
				this.contentStr = new String(content, "utf-8");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	public String getReltime() {
		return reltime;
	}
	public void setReltime(String reltime) {
		this.reltime = reltime;
	}
	public String getRelplatform() {
		return relplatform;
	}
	public void setRelplatform(String relplatform) {
		this.relplatform = relplatform;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
		this.statusname = ConfigUtil.getDicValue(SystemConstant.jqzt, status);
	}
	public String getContentStr() {
		return contentStr;
	}
	public void setContentStr(String contentStr) {
		this.contentStr = contentStr;
	}
}
