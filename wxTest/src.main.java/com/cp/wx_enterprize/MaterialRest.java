package com.cp.wx_enterprize;

import java.io.IOException;
import java.net.MalformedURLException;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.cp.rest.weix.WxLoginRest;
import com.cp.util.HttpRequestTools;

import net.sf.json.JSONObject;

@Service
@Path("/rest/material")
public class MaterialRest {
	
	@Autowired
	@Qualifier("enterprizeRest")
	private EnterprizeRest enterprizeRest;
	
	/**
	 * 上传临时素材
	 * @throws IOException 
	 * @throws MalformedURLException 
	 */
	//  http://duxl.ngrok.cc/wxTest/rest/material/uploadTempMaterial
	//  media_id = 1JBXLPq1S0EfkNIZ61-SHlpqHjnH0uzHy0Kv6a2C9HNFQejKgs8aPmcTG3Yc-Qxp3auH2GrX6KJIpFsVLcjG58Q
	@GET
	@POST
	@Path("/uploadTempMaterial")
	public String uploadTempMaterial() throws MalformedURLException, IOException {
		String url = "https://qyapi.weixin.qq.com/cgi-bin/media/upload?access_token="+enterprizeRest.getAccess_token()+"&type=image";
		String fileName = "G:\\hello1.png";
		String result = HttpRequestTools.uploadFile(url, fileName);
		JSONObject jsonObject = JSONObject.fromObject(result);
		return jsonObject.get("media_id").toString();
	}
	
	@GET
	@POST
	@Path("/getTempMaterial")
	public void getTempMaterial() {
		String url = "https://qyapi.weixin.qq.com/cgi-bin/media/get?access_token=%s&media_id=%s";
		url = String.format(url, enterprizeRest.getAccess_token(), "1JBXLPq1S0EfkNIZ61-SHlpqHjnH0uzHy0Kv6a2C9HNFQejKgs8aPmcTG3Yc-Qxp3auH2GrX6KJIpFsVLcjG58Q");
		String result = WxLoginRest.httpGet(url);
		System.out.println(result);
	}
}
