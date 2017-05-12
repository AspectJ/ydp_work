package com.cp.rest.weix;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

import org.apache.http.client.methods.HttpGet;
import org.jboss.resteasy.annotations.cache.NoCache;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cp.rest.weix.user.UserRest;
import com.cp.util.Config;
import com.cp.util.HttpRequestTools;

import net.sf.json.JSONObject;




/**
 * 微信登录
 */
@Path("rest/wxlogin")
@NoCache
@Service()
public class WxLoginRest
{
	private static final Logger logger = LoggerFactory.getLogger(WxLoginRest.class);

	@Resource(name="user")
	private UserRest user;
	
	/**
	 * 微信扫码登陆
	 */
	@GET
	@POST
	@Path("/wxPayLogin")
	@Consumes("application/json;charset=UTF-8")
	public void wxPayLogin(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		String state = UUID.randomUUID().toString().toUpperCase().replaceAll("-", "");
		try
		{
			String redirectURI = URLEncoder.encode(Config.SERVICEURL + "rest/wxlogin/getUserInfo", "utf-8");
			
			//请求Code
			String resultstr = "https://open.weixin.qq.com/connect/qrconnect?appid=wx0a88190d11191f2e&redirect_uri="+redirectURI+"&response_type=code&scope=snsapi_login&state="+state+"#wechat_redirect";
			response.sendRedirect( resultstr );
			logger.info("微信扫码登录,urlstr:{}", resultstr);
		} catch (IOException e)
		{
			logger.error("微信扫码登录", e);
		}
	}
	
	
	@GET
	@POST
	@Path("/getUserInfo")
	@Produces("text/html;charset=UTF-8")
	public void getUserInfo(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		try
		{
			String code = request.getParameter("code");
			
			//通过code获取access_token(接口调用凭证)
			String result = httpGet("https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx0a88190d11191f2e&secret=48efa3bf772a799bc8b93d793371158d&code="+code+"&grant_type=authorization_code");
			JSONObject resultJSON = JSONObject.fromObject(result);
			String refresh_token = resultJSON.getString("refresh_token");//用户刷新access_token
			String openId = resultJSON.getString("openid");//授权用户唯一标识
			
			//刷新或续期access_token使用
			String value = httpGet("https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=wx0a88190d11191f2e&grant_type=refresh_token&refresh_token="+ refresh_token);
			JSONObject valueJSON = JSONObject.fromObject(value);
			String access_token = valueJSON.getString("access_token");//接口调用凭证
			
			//检验授权凭证（access_token）是否有效
			String isValid = httpGet("https://api.weixin.qq.com/sns/auth?access_token="+access_token+"&openid="+openId);
			JSONObject isValidJSON = JSONObject.fromObject(isValid);//正确的Json返回结果：{ "errcode":0,"errmsg":"ok"}
			if("0".equals(isValidJSON.getString("errcode"))) {
				//获取用户个人信息（UnionID机制）
				String userinfo = httpGet("https://api.weixin.qq.com/sns/userinfo?access_token="+access_token+"&openid="+openId+"&lang=zh-CN");
				JSONObject userJSON = JSONObject.fromObject(userinfo);
				System.out.println(userJSON);
				
				String unionid = userJSON.getString("unionid");//用户主键
				if(user.isRegist(unionid)) { //判断用户是否已注册
					if(user.isConcernAccounts(unionid)) {	//判断用户是否已关注公众号
						response.sendRedirect("http://www.yidepiao.com");
					}else {
						//如果未关注，则跳到关注界面
						String ticket = httpGet("http://www.yiyutao.net.ngrok.cc/wxDemo/rest/getTicket");
						response.sendRedirect("https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+URLEncoder.encode(ticket, "UTF-8"));
					}
				}else {
					//如果未注册，则跳到注册页面
					response.sendRedirect(Config.SERVICEURL + "web/wxRegist.html?params="+URLEncoder.encode(userJSON.toString(), "UTF-8"));
				}
			}
			
		} catch (Exception e)
		{
			logger.error("", e);
		}
	}
	
	
	
	public static String httpGet(String urlStr){
		String result="";
		HttpURLConnection connection=null;
		try {
			URL url=new URL(urlStr);
			connection = (HttpURLConnection) url.openConnection();
			// 设置是否从httpUrlConnection读入，默认情况下是true;
			connection.setDoInput(true);
			connection.setRequestProperty("Accept-Charset", "utf-8");
			connection.setRequestProperty("contentType", "utf-8");
			connection.setUseCaches(false);
			connection.connect();
			
			InputStream fin = connection.getInputStream();
			BufferedReader reader = new BufferedReader(new InputStreamReader(fin, "utf-8"));
			String str = reader.readLine();
			while (str != null)
			{
				result += str;
				str = reader.readLine();
			}
		}catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}
	
	
	//获取微信公众号二维码
	@Test
	public void fun() throws MalformedURLException, IOException {
		String url = "https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=" + getAccessToken();
		String param = "{'action_name': 'QR_LIMIT_STR_SCENE', 'action_info': {'scene': {'scene_str': '123'}}}";
		JSONObject jsonObject = JSONObject.fromObject(param);
		//创建二维码ticket
		String result = HttpRequestTools.getHttpRequest(url, jsonObject.toString(), "application/x-www-form-urlencoded");
		System.out.println(result);
		//通过ticket换取二维码
//		String qr_url = httpGet("https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+JSONObject.fromObject(result).getString("ticket"));
//		System.out.println(qr_url);
	}
	
	public static String getAccessToken() {
		String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxe3a2a7c3e6a1251c&secret=dbd70806e3fa9c6264e2f9100e12508e";
		String result = httpGet(url);
		JSONObject jsonObject = JSONObject.fromObject(result);
		return jsonObject.getString("access_token");
	}
	
	/**
	 * 添加客服账号
	 * @throws MalformedURLException
	 * @throws IOException
	 */
	@Test
	public void fun2() throws MalformedURLException, IOException {
		String url = "https://api.weixin.qq.com/customservice/kfaccount/add?access_token=" + getAccessToken();
		String param = "{'kf_account' : 'test21@gh_a39cf8498f3a','nickname' : '客服1','password' : 'helloworld'}";
		JSONObject jsonObject = JSONObject.fromObject(param);
		String result = HttpRequestTools.getHttpRequest(url, jsonObject.toString(), "application/x-www-form-urlencoded");
		System.out.println(result.toString());
	}
	
	/**
	 * 发送客服消息
	 * @throws MalformedURLException
	 * @throws IOException
	 */
	@Test
	public void fun3() throws MalformedURLException, IOException {
		String url = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=" + getAccessToken();
		String param = "{'touser' : 'oBqKQwJW3sLFvyWpHNHMaDYCL4CY','msgtype' : 'text','text' : {'content':'Hello World'}}";
		JSONObject jsonObject = JSONObject.fromObject(param);
		String result = HttpRequestTools.getHttpRequest(url, jsonObject.toString(), "application/x-www-form-urlencoded");
		System.out.println(result.toString());
	}
	
}
