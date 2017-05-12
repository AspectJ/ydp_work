package com.service.api.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * 套票政策
 * @author xjm
 *
 */

public class ApiSetPolicy {
	private String setpolicyid;
	private String policyname;
	private String pricelevelid;
	private String pricelevelname;
	private String numb;
	private double totalprice;
	private String setshow;
	private String charshow;
	private String begintime;
	private String endtime;
	private List<ApiPolicyPrice> priceList=new ArrayList<ApiPolicyPrice>();
	public List<ApiPolicyPrice> getPriceList() {
		return priceList;
	}
	public void setPriceList(List<ApiPolicyPrice> priceList) {
		this.priceList = priceList;
	}
	public String getSetpolicyid() {
		return setpolicyid;
	}
	public void setSetpolicyid(String setpolicyid) {
		this.setpolicyid = setpolicyid;
	}
	public String getPolicyname() {
		return policyname;
	}
	public void setPolicyname(String policyname) {
		this.policyname = policyname;
	}
	public String getPricelevelid() {
		return pricelevelid;
	}
	public void setPricelevelid(String pricelevelid) {
		this.pricelevelid = pricelevelid;
	}
	public String getPricelevelname() {
		return pricelevelname;
	}
	public void setPricelevelname(String pricelevelname) {
		this.pricelevelname = pricelevelname;
	}
	public String getNumb() {
		return numb;
	}
	public void setNumb(String numb) {
		this.numb = numb;
	}
	public double getTotalprice() {
		return totalprice;
	}
	public void setTotalprice(double totalprice) {
		this.totalprice = totalprice;
	}
	public String getSetshow() {
		return setshow;
	}
	public void setSetshow(String setshow) {
		this.setshow = setshow;
	}
	public String getCharshow() {
		return charshow;
	}
	public void setCharshow(String charshow) {
		this.charshow = charshow;
	}
	public String getBegintime() {
		return begintime;
	}
	public void setBegintime(String begintime) {
		this.begintime = begintime;
	}
	public String getEndtime() {
		return endtime;
	}
	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}

}
