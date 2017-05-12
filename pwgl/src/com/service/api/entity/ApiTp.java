package com.service.api.entity;

import java.util.ArrayList;
import java.util.List;

public class ApiTp {
	private String setpolicyid;
	private String policyname;
	private List<ApiTpPriceNum> num=new ArrayList<ApiTpPriceNum>();
	public List<ApiTpPriceNum> getNum() {
		return num;
	}

	public void setNum(List<ApiTpPriceNum> num) {
		this.num = num;
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

}
