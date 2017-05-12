package com.cp.wx_enterprize;

import java.io.IOException;
import java.net.MalformedURLException;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.cp.rest.weix.WxLoginRest;
import com.cp.util.HttpRequestTools;

import net.sf.json.JSONObject;

@Service
@Path("/rest/resource")
public class ResourceRest {
	
	@Autowired
	@Qualifier("enterprizeRest")
	private EnterprizeRest enterprizeRest;

	/**
	 * 创建部门
	 * @throws MalformedURLException
	 * @throws IOException
	 */
	@GET
	@POST
	@Path("/createDepartment")
	public void createDepartment() throws MalformedURLException, IOException {
		String url = "https://qyapi.weixin.qq.com/cgi-bin/department/create?access_token=ACCESS_TOKEN";
		url = url.replace("ACCESS_TOKEN", enterprizeRest.getAccess_token());
		String param = "{'name': '深圳研发中心','parentid': 1,'order': 1,'id': 4}";
		JSONObject jsonObject = JSONObject.fromObject(param);
		String result = HttpRequestTools.getHttpRequest(url, jsonObject.toString(), "application/json;charset=utf-8");
		System.out.println(result);
	}
	
	/**
	 * 获取部门列表
	 */
//	http://duxl.ngrok.cc/wxTest/rest/resource/getDepartmentList
	@GET
	@POST
	@Path("getDepartmentList")
	@Test
	public void getDepartmentList() {
		String url = "https://qyapi.weixin.qq.com/cgi-bin/department/list?access_token=ACCESS_TOKEN&id=ID";
		url = url.replace("ACCESS_TOKEN", enterprizeRest.getAccess_token()).replace("ID", "1");
		String result = WxLoginRest.httpGet(url);
		System.out.println(result);
	}
	
	@GET
	@POST
	@Path("updateDepartment")
	public void updateDepartment() throws MalformedURLException, IOException {
		String url = "https://qyapi.weixin.qq.com/cgi-bin/department/update?access_token=%s";
		url = String.format(url, enterprizeRest.getAccess_token());
		String param = "{id:4,name:'智慧人民'}";
		JSONObject jsonObject = JSONObject.fromObject(param);
		String result = HttpRequestTools.getHttpRequest(url, jsonObject.toString(), "application/json;charset=utf-8");
		System.out.println(result);
	}
}
