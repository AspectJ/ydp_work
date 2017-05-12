package com.cp.wx_enterprize;

import java.io.IOException;
import java.io.StringReader;
import java.net.MalformedURLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import com.cp.rest.weix.WxLoginRest;
import com.cp.util.HttpRequestTools;
import com.qq.weixin.mp.aes.AesException;
import com.qq.weixin.mp.aes.WXBizMsgCrypt;

import net.sf.json.JSONObject;

@Service("enterprizeRest")
@Path("/rest/enterprize")
public class EnterprizeRest {
	
	@GET
	@POST
	@Path("/getAccess_token")
	public String getAccess_token() {
		String corpid = "wxd9d43b512d86cf6d";
		String corpsecret = "p0QtbfvUbfliGA-gl6czwATUJxuCI-0VZnzT3SvW-0jfJ-oRRNloKrpK7x4NeN-2";
		String url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=" + corpid + "&corpsecret=" + corpsecret;

		String result = WxLoginRest.httpGet(url);
		String access_token = (String) JSONObject.fromObject(result).get("access_token");
		return access_token;
	}

	@GET
	@POST
	@Path("/sendMessage")
	public void sendMessage() throws MalformedURLException, IOException {
		String access_token = this.getAccess_token();
		String urlStr = "https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + access_token;
		String param = "{'touser': 'dxl542298831',"
				// + "'toparty': ' PartyID1 | PartyID2 ',"
				// + "'totag': ' TagID1 | TagID2 ',"
				+ "'msgtype': 'text'," 
				+ "'agentid': 1," 
				+ "'text': {"
				+ "'content': 'Holiday Request For Pony(http://www.baidu.com)'" + "},"
				// + "'safe':0"
				+ "}";
		JSONObject jsonObject = JSONObject.fromObject(param);
		String contentType = "application/json;charset=UTF-8";
		String result = HttpRequestTools.getHttpRequest(urlStr, jsonObject.toString(), contentType);
		System.out.println(result);
	}
	
	
	@GET
	@POST
	@Path("/getUserCode")
	public String getUserCode() {
		System.out.println("123");
		String url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
		url = String.format(url, "wxd9d43b512d86cf6d", "duxl.ngrok.cc");
		System.out.println(url);
		return null;
	}
	
	@GET
	@POST
	@Path("getAppList")
	public void getAppList() {
		String url = "https://qyapi.weixin.qq.com/cgi-bin/agent/list?access_token=ACCESS_TOKEN";
		String access_token = this.getAccess_token();
		url = url.replace("ACCESS_TOKEN", access_token);
		String result = WxLoginRest.httpGet(url);
		System.out.println(result);
	}
	
	@GET
	@POST
	@Path("/createMenu")
	public void createMenu() throws MalformedURLException, IOException {
		String url = "https://qyapi.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN&agentid=1";
		String access_token = this.getAccess_token();
		url = url.replace("ACCESS_TOKEN", access_token);
		String param = "{'button':[{"
									+ "'type':'click',"
									+ "'name':'今日歌曲',"
									+ "'key':'V1001_TODAY_MUSIC'"
									+ "},"
									+ "{"
									+ "'name':'菜单',"
									+ "'sub_button':["
										+ "{"
											+ "'type':'view',"
											+ "'name':'搜索',"
											+ "'url':'http://www.soso.com/'"
											+ "},"
										+ "{"
											+ "'type':'click',"
											+ "'name':'赞一下我们',"
											+ "'key':'V1001_GOOD'"
										+ "}"
									+ "]"
								+ "}"
							+ "]"
							+ "}";
		
		JSONObject jsonObject = JSONObject.fromObject(param);
		String result = HttpRequestTools.getHttpRequest(url, jsonObject.toString(), "application/json;charset=utf-8");
		System.out.println(result);
	}
	
	
	/**
	 * 将应用设置为回调模式
	 * @param request
	 * @param response
	 * @return
	 * @throws AesException
	 * @throws IOException 
	 * @throws DocumentException 
	 */
	@SuppressWarnings("unchecked")
	@GET
	@POST
	@Path("/callback")
	public String callback(@Context HttpServletRequest request, @Context HttpServletResponse response) throws AesException, IOException {
//		System.out.println(request.getMethod());
//		if("POST".equals(request.getMethod())) {
//			InputStream input = request.getInputStream();
//			
//			//创建dom4j解析器
//			SAXReader saxReader = new SAXReader();
//			Document document = saxReader.read(input);
//			
//			Element rootElement = document.getRootElement();
//			
//			listNode(rootElement);
//			
//			
//			return null;
//		}
		
		//配置回调url
		String sToken = "1tzFttWvBYnGoGPe3H7iNqz";
		String sCorpID = "wxd9d43b512d86cf6d";
		String sEncodingAESKey = "18h5wWkcfTDlyD5ZnZD6qJNXYdoR51iWeMTtphQM4O7";

		WXBizMsgCrypt wxcpt = new WXBizMsgCrypt(sToken, sEncodingAESKey, sCorpID);
		
		@SuppressWarnings("unused")
		String queryString = request.getQueryString();
		// 解析出url上的参数值如下：
		String sVerifyMsgSig = request.getParameter("msg_signature").toString();
		
		String sVerifyTimeStamp = request.getParameter("timestamp").toString();
		
		String sVerifyNonce = request.getParameter("nonce").toString();
		
		
		//==============================接收消息及事件时的加解密处理 START================================
		String encryptMsg = IOUtils.toString(request.getInputStream());
		try {
			String sMsg = wxcpt.DecryptMsg(sVerifyMsgSig, sVerifyTimeStamp, sVerifyNonce, encryptMsg);
			System.out.println("after decrypt msg: \n" + sMsg);
			// TODO: 解析出明文xml标签的内容进行处理
			// For example:
			
			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			DocumentBuilder db = dbf.newDocumentBuilder();
			StringReader sr = new StringReader(sMsg);
			InputSource is = new InputSource(sr);
			Document document = db.parse(is);

			Element root = document.getDocumentElement();
			NodeList nodelist1 = root.getElementsByTagName("Content");
			String Content = nodelist1.item(0).getTextContent();
			System.out.println("Content：" + Content);
			
		} catch (Exception e) {
			// TODO
			// 解密失败，失败原因请查看异常
			e.printStackTrace();
		}
		//==============================接收消息及事件时的加解密处理 END================================

			
		//================================配置回调模式 START========================================
		String sVerifyEchoStr = request.getParameter("echostr");
		String sEchoStr = ""; //需要返回的明文
		if(sVerifyEchoStr != null) {
			try {
				sEchoStr = wxcpt.VerifyURL(sVerifyMsgSig, sVerifyTimeStamp,
						sVerifyNonce, sVerifyEchoStr);
				System.out.println("verifyurl echostr: " + sEchoStr);
				// 验证URL成功，将sEchoStr返回
				//HttpUtils.SetResponse(sEchoStr);
			} catch (Exception e) {
				//验证URL失败，错误原因请查看异常
				e.printStackTrace();
			}
		}
		
		return sEchoStr;
		//================================配置回调模式 END========================================

	}
	
	
//	public static void listNode(Element ele) {
//		//判断该节点是元素节点
//		if(ele.getNodeType() == Node.ELEMENT_NODE) {
//			System.out.println(ele.getName());
//		}
//		List<Element> list = ele.elements();
//		for(int i = 0; i < list.size(); i++) {
//			//使用递归
//			listNode(list.get(i));
//		}
//	}


	@GET
	@POST
	@Path("/getMenuList")
	public void getMenuList() {
		String url = "https://qyapi.weixin.qq.com/cgi-bin/menu/get?access_token=%s&agentid=%s";
		String access_token = this.getAccess_token();
		url = String.format(url, access_token, 1);
		String result = WxLoginRest.httpGet(url);
		System.out.println(result);
	}
}
