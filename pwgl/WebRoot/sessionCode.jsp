<%@page import="com.sun.org.apache.xalan.internal.xsltc.compiler.sym"%>
<%@ page contentType="image/jpeg; charset=UTF-8" import="com.common.util.CacheUtil" %>
<%
// 将认证码从session中取出来，并回写给调用的JQUERY请求
//String sessionCode ="";
//sessionCode = (String)session.getAttribute("rand");
String codeKey=request.getParameter("codeKey");
Object yzm=CacheUtil.get("codeCache", codeKey);
String sessionCode=yzm==null?"none":yzm.toString();
response.getWriter().write(sessionCode);
%>
