package com.cp.rest.userinfo;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cp.rest.userinfo.dao.LogInfoDaoImpl;
import com.cp.rest.userinfo.redis.UserRedisImpl;
import com.cp.util.INetAddress;

/**
 * 操作日志数据记录
 */
@Service()
public class LogInfoAdd
{
	@Autowired
	private LogInfoDaoImpl dao;
	
	@Resource
	private UserRedisImpl userRedis;

	/**
	 * 插入日志信息
	 * @param request
	 * @param log_type  0、操作；1、登录
	 * @param log_content  操作内容信息
	 */
	public void addLogInfo(HttpServletRequest request,String log_type,String log_content){
		String userid = String.valueOf(request.getAttribute("userid"));
		String theaterid = userRedis.getUserField(userid, "theaterid");
		INetAddress add = new INetAddress();
		String ip = add.getIpAddr(request);
		Map<String,Object> logMap = new HashMap<String, Object>();
		logMap.put("logid", "");
		logMap.put("log_type", Integer.parseInt(log_type));
		logMap.put("theaterid", Integer.parseInt(theaterid));
		logMap.put("operator", Integer.parseInt(userid));
		logMap.put("log_status", Integer.parseInt("0"));
		logMap.put("operator_time", new Date());
		logMap.put("log_content", log_content);
		logMap.put("ip", ip);
		dao.insertLog(logMap);
	}
	
}
