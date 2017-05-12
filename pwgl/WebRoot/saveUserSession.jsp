<%@ page contentType="image/jpeg; charset=UTF-8" import="java.util.*"%>
<%
String sessionId = (String)request.getParameter("sessionId");
String userData = (String)request.getParameter("userSession");
session.setAttribute(sessionId,userData);
//response.getWriter().write(sessionCode);
%>