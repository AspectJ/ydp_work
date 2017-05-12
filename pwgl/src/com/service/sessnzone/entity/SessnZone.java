package com.service.sessnzone.entity;

import com.common.constant.SystemConstant;
import com.common.util.ConfigUtil;

/**
 * 分区
 * @author Administrator
 *
 */
public class SessnZone {
	private String sessnzoneid;
	private String sessionsid;
	private String hallid;
	private String zonename;
	private String pewpic;
	private String rule;
	private String height;
	private String width;
	private String rownum;
	private String colnum;
	private String x;
	private String y;
	private String text;
	private String color;
	private String tpurl;
	private String zonetype;
	private String des;
	private String remark;
	private String status;
	private String delstatus;
	private String vid;
	private String cid;
	private String ctime;
	private String mid;
	private String mtime;
	private String statusname;
	
	private String sessionsname;//场次名称
	private String hallname;//演出厅名称
	private String pricelevelname;//等级名称
	private String addr;//位置
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public String getPricelevelname() {
		return pricelevelname;
	}
	public void setPricelevelname(String pricelevelname) {
		this.pricelevelname = pricelevelname;
	}
	public String getHallname() {
		return hallname;
	}
	public void setHallname(String hallname) {
		this.hallname = hallname;
	}
	public String getSessionsname() {
		return sessionsname;
	}
	public void setSessionsname(String sessionsname) {
		this.sessionsname = sessionsname;
	}
	public String getSessnzoneid() {
		return sessnzoneid;
	}
	public void setSessnzoneid(String sessnzoneid) {
		this.sessnzoneid = sessnzoneid;
	}
	public String getSessionsid() {
		return sessionsid;
	}
	public void setSessionsid(String sessionsid) {
		this.sessionsid = sessionsid;
	}
	public String getHallid() {
		return hallid;
	}
	public void setHallid(String hallid) {
		this.hallid = hallid;
	}
	public String getZonename() {
		return zonename;
	}
	public void setZonename(String zonename) {
		this.zonename = zonename;
	}
	public String getPewpic() {
		return pewpic;
	}
	public void setPewpic(String pewpic) {
		this.pewpic = pewpic;
	}
	public String getRule() {
		return rule;
	}
	public void setRule(String rule) {
		this.rule = rule;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getTpurl() {
		return tpurl;
	}
	public void setTpurl(String tpurl) {
		this.tpurl = tpurl;
	}
	public String getZonetype() {
		return zonetype;
	}
	public void setZonetype(String zonetype) {
		this.zonetype = zonetype;
	}
	public String getDes() {
		return des;
	}
	public void setDes(String des) {
		this.des = des;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
		this.statusname = ConfigUtil.getDicValue(SystemConstant.jqzt, status);
	}
	public String getDelstatus() {
		return delstatus;
	}
	public void setDelstatus(String delstatus) {
		this.delstatus = delstatus;
	}
	public String getVid() {
		return vid;
	}
	public void setVid(String vid) {
		this.vid = vid;
	}
	public String getCid() {
		return cid;
	}
	public void setCid(String cid) {
		this.cid = cid;
	}
	public String getCtime() {
		return ctime;
	}
	public void setCtime(String ctime) {
		this.ctime = ctime;
	}
	public String getMid() {
		return mid;
	}
	public void setMid(String mid) {
		this.mid = mid;
	}
	public String getMtime() {
		return mtime;
	}
	public void setMtime(String mtime) {
		this.mtime = mtime;
	}
	public String getStatusname() {
		return statusname;
	}
	public void setStatusname(String statusname) {
		this.statusname = statusname;
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
	public String getRownum() {
		return rownum;
	}
	public void setRownum(String rownum) {
		this.rownum = rownum;
	}
	public String getColnum() {
		return colnum;
	}
	public void setColnum(String colnum) {
		this.colnum = colnum;
	}
	public String getX() {
		return x;
	}
	public void setX(String x) {
		this.x = x;
	}
	public String getY() {
		return y;
	}
	public void setY(String y) {
		this.y = y;
	}

}
