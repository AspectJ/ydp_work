package com.service.ticketface.entity;

public class Facemake {

	private String ticketfaceid;
	private String ticketcode;
	private String ticketname;
	private String bgurl;
	private String height;
	private String width;
	private String cjr;
	private String cjsj;
	private String sessionsname;
	private String sessionsid;
	private String carbonlocation;
	private String carbonnum;
	private String carbonheight;
	private byte[] content;
	private String contentstr;
	
	public byte[] getContent() {
		return content;
	}
	public void setContent(byte[] content) {
		this.content = content;
		if (content != null && content.length > 0) {
			try {
				this.contentstr = new String(content, "utf-8");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	public String getContentstr() {
		return contentstr;
	}
	public void setContentstr(String contentstr) {
		this.contentstr = contentstr;
	}
	public String getCarbonlocation() {
		return carbonlocation;
	}
	public void setCarbonlocation(String carbonlocation) {
		this.carbonlocation = carbonlocation;
	}
	public String getCarbonnum() {
		return carbonnum;
	}
	public void setCarbonnum(String carbonnum) {
		this.carbonnum = carbonnum;
	}
	public String getCarbonheight() {
		return carbonheight;
	}
	public void setCarbonheight(String carbonheight) {
		this.carbonheight = carbonheight;
	}
	public String getSessionsid() {
		return sessionsid;
	}
	public void setSessionsid(String sessionsid) {
		this.sessionsid = sessionsid;
	}
	public String getTicketfaceid() {
		return ticketfaceid;
	}
	public void setTicketfaceid(String ticketfaceid) {
		this.ticketfaceid = ticketfaceid;
	}
	public String getTicketcode() {
		return ticketcode;
	}
	public void setTicketcode(String ticketcode) {
		this.ticketcode = ticketcode;
	}
	public String getTicketname() {
		return ticketname;
	}
	public void setTicketname(String ticketname) {
		this.ticketname = ticketname;
	}
	public String getBgurl() {
		return bgurl;
	}
	public void setBgurl(String bgurl) {
		this.bgurl = bgurl;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
	}
	public String getCjr() {
		return cjr;
	}
	public void setCjr(String cjr) {
		this.cjr = cjr;
	}
	public String getCjsj() {
		return cjsj;
	}
	public void setCjsj(String cjsj) {
		this.cjsj = cjsj;
	}
	public String getSessionsname() {
		return sessionsname;
	}
	public void setSessionsname(String sessionsname) {
		this.sessionsname = sessionsname;
	}
}
