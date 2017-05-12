package com.service.api.entity;

import com.common.constant.SystemConstant;

public class ApiTicketDiv {
	private byte[] content;// 通知内容
	private String contentStr;

	public byte[] getContent() {
		return content;
	}

	public void setContent(byte[] content) {
		if (content != null && content.length > 0) {
			try {
				this.contentStr = new String(content, "utf-8").replace("img/", SystemConstant.imgurl);
			} catch (Exception e) {
			}
		}
		this.content = null;
	}

	public String getContentStr() {
		return contentStr;
	}

	public void setContentStr(String contentStr) {
		this.contentStr = contentStr;
	}
}
