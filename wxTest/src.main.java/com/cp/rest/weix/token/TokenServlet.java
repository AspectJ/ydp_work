package com.cp.rest.weix.token;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.security.MessageDigest;
import java.util.Arrays;
import java.util.Iterator;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Hex;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;

import com.mongo.MyMongo;

import wx.AesException;

public class TokenServlet extends HttpServlet {

		private static final long serialVersionUID = 2509908230968164482L;
		
		public static final String TOKEN = "duxiaole";
		
		@Override
		protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			
//			response.setContentType("text/html;charset=UTF-8");
			
			try {  
	            // 开发者提交信息后，微信服务器将发送GET请求到填写的服务器地址URL上，GET请求携带参数  
	            String signature = request.getParameter("signature");// 微信加密签名（token、timestamp、nonce。）  
	            String timestamp = request.getParameter("timestamp");// 时间戳  
	            String nonce = request.getParameter("nonce");// 随机数  
	            String echostr = request.getParameter("echostr");// 随机字符串  
	            // 将token、timestamp、nonce三个参数进行字典序排序  
/*	            String[] params = new String[] { TOKEN, timestamp, nonce };  
	            Arrays.sort(params);  
	            // 将三个参数字符串拼接成一个字符串进行sha1加密  
	            String clearText = params[0] + params[1] + params[2];  
	            String algorithm = "SHA-1";  
	            MessageDigest md = MessageDigest.getInstance(algorithm);
	            md.update(clearText.getBytes());
	            String sign = new String(  
	                    Hex.encodeHex(md.digest(), true));*/
	            String sign=SHA1.getSHA1(TOKEN, timestamp, nonce, "");
	            // 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信  
	            if (signature.equals(sign)) {  
	                response.getWriter().print(echostr);
	            }  
	        } catch (Exception e) {  
	            e.printStackTrace();  
	        }  
		}
		
		@SuppressWarnings("rawtypes")
		@Override
		protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			System.out.println("1235");
			InputStream input = request.getInputStream();
			SAXReader saxReader = new SAXReader();

			try {
	            Document document = saxReader.read(input);
	            System.out.println(document);
	            Element eles = document.getRootElement();
	            for (Iterator i = eles.elementIterator(); i.hasNext();) {
	                Element ele = (Element) i.next();
//	                for (Iterator j = user.elementIterator(); j.hasNext();) {
//	                    Element node = (Element) j.next();
//	                    System.out.println(node.getName() + ":" + node.getText());
//	                }
	                System.out.println(ele.getName() + " : " + ele.getText());
	            }
	        } catch (DocumentException e) {
	            System.out.println(e.getMessage());
	        }
		}

}

class SHA1 {

	/**
	 * 用SHA1算法生成安全签名
	 * @param token 票据
	 * @param timestamp 时间戳
	 * @param nonce 随机字符串
	 * @param encrypt 密文
	 * @return 安全签名
	 * @throws AesException 
	 */
	public static String getSHA1(String token, String timestamp, String nonce, String encrypt) throws AesException
			  {
		try {
			String[] array = new String[] { token, timestamp, nonce, encrypt };
			StringBuffer sb = new StringBuffer();
			// 字符串排序
			Arrays.sort(array);
			for (int i = 0; i < 4; i++) {
				sb.append(array[i]);
			}
			String str = sb.toString();
			// SHA1签名生成
			MessageDigest md = MessageDigest.getInstance("SHA-1");
			md.update(str.getBytes());
			byte[] digest = md.digest();

			StringBuffer hexstr = new StringBuffer();
			String shaHex = "";
			for (int i = 0; i < digest.length; i++) {
				shaHex = Integer.toHexString(digest[i] & 0xFF);
				if (shaHex.length() < 2) {
					hexstr.append(0);
				}
				hexstr.append(shaHex);
			}
			return hexstr.toString();
		} catch (Exception e) {
			e.printStackTrace();
			throw new AesException(AesException.ComputeSignatureError);
		}
	}
}
