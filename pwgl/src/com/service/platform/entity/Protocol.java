package com.service.platform.entity;

import com.common.constant.SystemConstant;
import com.common.util.ConfigUtil;

/**
 * <p>Title: 协议管理实体</p>
 * @author 马骏
 * @date 2016-1-20
 */
public class Protocol {

	private String proid;
	private String title;
	private byte[] content;
	private String contentStr;
	private String scene;
	private String scenename;
	
	public String getProid() {
		return proid;
	}
	public void setProid(String proid) {
		this.proid = proid;
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
	public String getContentStr() {
		return contentStr;
	}
	public void setContentStr(String contentStr) {
		this.contentStr = contentStr;
	}
	public String getScene() {
		return scene;
	}
	public void setScene(String scene) {
		this.scene = scene;
		this.scenename = ConfigUtil.getDicValue(SystemConstant.sycj, scene);
	}
	public String getScenename() {
		return scenename;
	}
	public void setScenename(String scenename) {
		this.scenename = scenename;
	}
}
