package com.cp.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * 发送http请求
 */
public class HttpRequestTools
{
	/**
	 * 获取http请求的数据
	 * @return
	 * @throws IOException 
	 * @throws MalformedURLException 
	 */
	public static String getHttpRequest(String url, String param, String contentType) throws MalformedURLException, IOException{
		String result = "";
		
		HttpURLConnection connection = null;
		connection = (HttpURLConnection) new URL(url).openConnection();
		connection.setDoOutput(true);
		connection.setDoInput(true); 
		connection.setRequestProperty("Accept-Charset", "utf-8");
		connection.setRequestMethod("POST"); 
		connection.setUseCaches(false); 
		
		// application/json;charset=UTF-8	application/x-www-form-urlencoded
		if(contentType != null){
			connection.setRequestProperty("contentType", contentType);
		}
		
		connection.connect(); // 建立连接
		
		if(param != null){
			OutputStream out = connection.getOutputStream(); // 创建输入输出流
			out.write(param.getBytes("UTF-8")); // 将参数输出到连接
			out.flush(); // 输出完成后刷新并关闭流
			out.close(); // 重要且易忽略步骤 (关闭流,切记!)
		}

		InputStream fin = connection.getInputStream();

		BufferedReader reader = new BufferedReader(new InputStreamReader(fin, "utf-8"));
		String str = reader.readLine();
		while (str != null)
		{
			result += str;
			str = reader.readLine();
		}
		return result;
	}
}