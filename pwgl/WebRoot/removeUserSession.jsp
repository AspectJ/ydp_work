<%@ page contentType="image/jpeg; charset=UTF-8" import="java.util.*"%>
<%
String sessionId = (String)request.getParameter("sessionId");
session.removeAttribute(sessionId);
response.getWriter().write("true");
%>