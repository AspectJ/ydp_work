package com.cx.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class ToIndexFilter implements Filter {

    public ToIndexFilter() {}
    
	public void destroy() {}

	public void init(FilterConfig fConfig) throws ServletException {}

	
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;
		
		
//		String path = req.getRequestURI();
//		if(path.indexOf("/m") != -1 && path.indexOf("rest") == -1 && path.indexOf(".css") == -1 && path.indexOf(".js") == -1 && path.indexOf(".jpg") == -1){
//			if(path.indexOf("/login") != -1) {
//				req.getRequestDispatcher("/m/index.html").forward(req, resp);
//				return;
//			}
//		}
//		chain.doFilter(request, response);
		
		req.getRequestDispatcher("/m/index.html").forward(req, resp);
		return;
		
	}


}
