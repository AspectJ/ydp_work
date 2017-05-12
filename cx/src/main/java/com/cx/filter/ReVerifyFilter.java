package com.cx.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.disconf.config.Config;

/**
 * 请求过滤器
 */
public class ReVerifyFilter extends BaseServlet implements Filter
{
	/**
	 * 过滤器
	 */
	public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException
	{
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) resp;

//		setPubKey(request, response);
		
		
		// 字符乱码处理
		response.setContentType("text/html; charset=UTF-8");
		
		request.setCharacterEncoding("UTF-8");
		// Access-Control-Allow-Origin解决跨域问题
		//response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Origin", com.cx.util.Config.SERVICEURL);
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS, HEAD");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With");
					
		// 跳转
		chain.doFilter(request, response);
	}
	
	/**
	 * 初始化参数
	 */
	@Override
	public void init(FilterConfig config) throws ServletException
	{
		// String unUrl = config.getInitParameter("url");
		// if (unUrl != null)
		// {
		// this.unUrl = unUrl.split(",");
		// }
		//
		// ServletContext sc = config.getServletContext();
		// WebApplicationContext wac = (WebApplicationContext) sc
		// .getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);
		//
		// this.userRedis = (UserRedisImpl) wac.getBean("userRedis");
	}

	@Override
	public void destroy()
	{
	}
	
	
	/**
	 * 检查公钥
	 * @param request
	 * @param response
	 */
	public static void setPubKey(HttpServletRequest request, HttpServletResponse response)
	{
		if(getCookieByName(request, "pubKey") == null){
			addCookie(response, "pubKey", Config.cookiePubKey, Config.cookieMaxAge);
		}
	}
	

	/**
	 * 设置cookie
	 * @param response
	 * @param name  cookie名字
	 * @param value cookie值
	 * @param maxAge cookie生命周期  以秒为单位
	 */
	public static void addCookie(HttpServletResponse response,String name,String value,int maxAge){
	    Cookie cookie = new Cookie(name,value);
	    cookie.setPath("/");
	    if(maxAge>0)  cookie.setMaxAge(maxAge);
	    response.addCookie(cookie);
	}
	
	/**
	 * 根据名字获取cookie
	 * @param request
	 * @param name cookie名字
	 * @return
	 */
	public static Cookie getCookieByName(HttpServletRequest request,String name){
	    Map<String,Cookie> cookieMap = ReadCookieMap(request);
	    if(cookieMap.containsKey(name)){
	        Cookie cookie = (Cookie)cookieMap.get(name);
	        return cookie;
	    }else{
	        return null;
	    }   
	}
	
	/**
	 * 将cookie封装到Map里面
	 * @param request
	 * @return
	 */
	private static Map<String,Cookie> ReadCookieMap(HttpServletRequest request){  
	    Map<String,Cookie> cookieMap = new HashMap<String,Cookie>();
	    Cookie[] cookies = request.getCookies();
	    if(null!=cookies){
	        for(Cookie cookie : cookies){
	            cookieMap.put(cookie.getName(), cookie);
	        }
	    }
	    return cookieMap;
	}
}
