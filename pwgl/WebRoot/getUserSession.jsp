<%@page import="com.common.session.SessionManager"%>
<%@ page contentType="image/jpeg; charset=UTF-8" import="java.util.*,java.util.regex.*,com.common.session.SessionManager,com.alibaba.fastjson.JSON"%>
<%
String sessionId = (String)request.getParameter("sessionId");
String userData = JSON.toJSONString(SessionManager.getSession(sessionId),true);

//处理空格、换行、回车等特殊字符，否则转JSON对象时报错
Pattern p = Pattern.compile("\\s*|\t|\r|\n");
Matcher m = p.matcher(userData);
String dest = m.replaceAll("");
response.getWriter().write(dest);
%>