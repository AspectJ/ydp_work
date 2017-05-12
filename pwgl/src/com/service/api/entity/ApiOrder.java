package com.service.api.entity;
/**
 * 订单
 * @author xjm
 *
 */

public class ApiOrder {
	private String orderid;
	private String ordercode;
	private String itemid;
	private String itemname;
	private String sessionsid;
	private String sessionsname;
	private String venueid;
	private String venuename;
	private String hallid;
	private String hallname;
	private String producttypeid;
	private String producttypename;
	private String playtime;
	private String odtime;
	private String locktime;
	private String unlocktime;
	private String outtime;
	private String numb;
	private String policyid;
	private String totalprice;
	private String policyprice;
	private String actprice;
	private String paytime;
	private String payprice;
	private String payboxid;
	private String payboxname;
	private String sellerid;
	private String sellername;
	private String isoutlet;
	private String outlettime;
	private String odtype;
	private String odtypename;
	private String odstatus;
	private String odstatusname;
	private String paystatus;
	private String paystatusname;
	private String outstatus;
	private String outstatusname;
	private String pewarr;
	private String name;
	private String sex;
	private String tele;
	private String custype;
	private String credtype;
	private String crednum;
	private String addr;
	private String sendtype;
	private String tracknumb;
	private String company;
	private String paytype;
	private String pewids;//座位IDs
	private String pricelevelid;//票价等级ID
	private String price;//票价等级对应的票价
	private String pewname;//座位名称
	private String oldprice;//优惠后的价格
	public String getOldprice() {
		return oldprice;
	}
	public void setOldprice(String oldprice) {
		this.oldprice = oldprice;
	}
	public String getPricelevelid() {
		return pricelevelid;
	}
	public void setPricelevelid(String pricelevelid) {
		this.pricelevelid = pricelevelid;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getPewname() {
		return pewname;
	}
	public void setPewname(String pewname) {
		this.pewname = pewname;
	}
	public String getPewids() {
		return pewids;
	}
	public void setPewids(String pewids) {
		this.pewids = pewids;
	}
	public String getOrderid() {
		return orderid;
	}
	public void setOrderid(String orderid) {
		this.orderid = orderid;
	}
	public String getOrdercode() {
		return ordercode;
	}
	public void setOrdercode(String ordercode) {
		this.ordercode = ordercode;
	}
	public String getItemid() {
		return itemid;
	}
	public void setItemid(String itemid) {
		this.itemid = itemid;
	}
	public String getItemname() {
		return itemname;
	}
	public void setItemname(String itemname) {
		this.itemname = itemname;
	}
	public String getSessionsid() {
		return sessionsid;
	}
	public void setSessionsid(String sessionsid) {
		this.sessionsid = sessionsid;
	}
	public String getSessionsname() {
		return sessionsname;
	}
	public void setSessionsname(String sessionsname) {
		this.sessionsname = sessionsname;
	}
	public String getVenueid() {
		return venueid;
	}
	public void setVenueid(String venueid) {
		this.venueid = venueid;
	}
	public String getVenuename() {
		return venuename;
	}
	public void setVenuename(String venuename) {
		this.venuename = venuename;
	}
	public String getHallid() {
		return hallid;
	}
	public void setHallid(String hallid) {
		this.hallid = hallid;
	}
	public String getHallname() {
		return hallname;
	}
	public void setHallname(String hallname) {
		this.hallname = hallname;
	}
	public String getProducttypeid() {
		return producttypeid;
	}
	public void setProducttypeid(String producttypeid) {
		this.producttypeid = producttypeid;
	}
	public String getProducttypename() {
		return producttypename;
	}
	public void setProducttypename(String producttypename) {
		this.producttypename = producttypename;
	}
	public String getPlaytime() {
		return playtime;
	}
	public void setPlaytime(String playtime) {
		this.playtime = playtime;
	}
	public String getOdtime() {
		return odtime;
	}
	public void setOdtime(String odtime) {
		this.odtime = odtime;
	}
	public String getLocktime() {
		return locktime;
	}
	public void setLocktime(String locktime) {
		this.locktime = locktime;
	}
	public String getUnlocktime() {
		return unlocktime;
	}
	public void setUnlocktime(String unlocktime) {
		this.unlocktime = unlocktime;
	}
	public String getOuttime() {
		return outtime;
	}
	public void setOuttime(String outtime) {
		this.outtime = outtime;
	}
	public String getNumb() {
		return numb;
	}
	public void setNumb(String numb) {
		this.numb = numb;
	}
	public String getPolicyid() {
		return policyid;
	}
	public void setPolicyid(String policyid) {
		this.policyid = policyid;
	}
	public String getTotalprice() {
		return totalprice;
	}
	public void setTotalprice(String totalprice) {
		this.totalprice = totalprice;
	}
	public String getPolicyprice() {
		return policyprice;
	}
	public void setPolicyprice(String policyprice) {
		this.policyprice = policyprice;
	}
	public String getActprice() {
		return actprice;
	}
	public void setActprice(String actprice) {
		this.actprice = actprice;
	}
	public String getPaytime() {
		return paytime;
	}
	public void setPaytime(String paytime) {
		this.paytime = paytime;
	}
	public String getPayprice() {
		return payprice;
	}
	public void setPayprice(String payprice) {
		this.payprice = payprice;
	}
	public String getPayboxid() {
		return payboxid;
	}
	public void setPayboxid(String payboxid) {
		this.payboxid = payboxid;
	}
	public String getPayboxname() {
		return payboxname;
	}
	public void setPayboxname(String payboxname) {
		this.payboxname = payboxname;
	}
	public String getSellerid() {
		return sellerid;
	}
	public void setSellerid(String sellerid) {
		this.sellerid = sellerid;
	}
	public String getSellername() {
		return sellername;
	}
	public void setSellername(String sellername) {
		this.sellername = sellername;
	}
	public String getIsoutlet() {
		return isoutlet;
	}
	public void setIsoutlet(String isoutlet) {
		this.isoutlet = isoutlet;
	}
	public String getOutlettime() {
		return outlettime;
	}
	public void setOutlettime(String outlettime) {
		this.outlettime = outlettime;
	}
	public String getOdtype() {
		return odtype;
	}
	public void setOdtype(String odtype) {
		this.odtype = odtype;
	}
	public String getOdtypename() {
		return odtypename;
	}
	public void setOdtypename(String odtypename) {
		this.odtypename = odtypename;
	}
	public String getOdstatus() {
		return odstatus;
	}
	public void setOdstatus(String odstatus) {
		this.odstatus = odstatus;
	}
	public String getOdstatusname() {
		return odstatusname;
	}
	public void setOdstatusname(String odstatusname) {
		this.odstatusname = odstatusname;
	}
	public String getPaystatus() {
		return paystatus;
	}
	public void setPaystatus(String paystatus) {
		this.paystatus = paystatus;
	}
	public String getPaystatusname() {
		return paystatusname;
	}
	public void setPaystatusname(String paystatusname) {
		this.paystatusname = paystatusname;
	}
	public String getOutstatus() {
		return outstatus;
	}
	public void setOutstatus(String outstatus) {
		this.outstatus = outstatus;
	}
	public String getOutstatusname() {
		return outstatusname;
	}
	public void setOutstatusname(String outstatusname) {
		this.outstatusname = outstatusname;
	}
	public String getPewarr() {
		return pewarr;
	}
	public void setPewarr(String pewarr) {
		this.pewarr = pewarr;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getTele() {
		return tele;
	}
	public void setTele(String tele) {
		this.tele = tele;
	}
	public String getCustype() {
		return custype;
	}
	public void setCustype(String custype) {
		this.custype = custype;
	}
	public String getCredtype() {
		return credtype;
	}
	public void setCredtype(String credtype) {
		this.credtype = credtype;
	}
	public String getCrednum() {
		return crednum;
	}
	public void setCrednum(String crednum) {
		this.crednum = crednum;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public String getSendtype() {
		return sendtype;
	}
	public void setSendtype(String sendtype) {
		this.sendtype = sendtype;
	}
	public String getTracknumb() {
		return tracknumb;
	}
	public void setTracknumb(String tracknumb) {
		this.tracknumb = tracknumb;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getPaytype() {
		return paytype;
	}
	public void setPaytype(String paytype) {
		this.paytype = paytype;
	}

}
