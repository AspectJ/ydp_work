package com.service.api.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * 优惠政策
 * @author xjm
 *
 */

public class ApiPrefpolicy {
	private String prefpolicyid;
	private String policyname;
	private String pricelevelid;
	private String pricelevelname;
	private double prefprice;
	private String agio;
	private String charshow;
	private String origshow;
	private String agioshow;
	private String begintime;
	private String endtime;
	private String numb;
	private List<ApiPolicyPrice> priceList=new ArrayList<ApiPolicyPrice>();
	public String getNumb() {
		return numb;
	}
	public void setNumb(String numb) {
		this.numb = numb;
	}
	public List<ApiPolicyPrice> getPriceList() {
		return priceList;
	}
	public void setPriceList(List<ApiPolicyPrice> priceList) {
		this.priceList = priceList;
	}
	public String getPrefpolicyid() {
		return prefpolicyid;
	}
	public void setPrefpolicyid(String prefpolicyid) {
		this.prefpolicyid = prefpolicyid;
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
	public double getPrefprice() {
		return prefprice;
	}
	public void setPrefprice(double prefprice) {
		this.prefprice = prefprice;
	}
	public String getAgio() {
		return agio;
	}
	public void setAgio(String agio) {
		this.agio = agio;
	}
	public String getCharshow() {
		return charshow;
	}
	public void setCharshow(String charshow) {
		this.charshow = charshow;
	}
	public String getOrigshow() {
		return origshow;
	}
	public void setOrigshow(String origshow) {
		this.origshow = origshow;
	}
	public String getAgioshow() {
		return agioshow;
	}
	public void setAgioshow(String agioshow) {
		this.agioshow = agioshow;
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
