package com.cp.rest.userinfo;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

import org.jboss.resteasy.annotations.cache.NoCache;
import org.springframework.stereotype.Service;

import com.cp.bean.ResMessage;
import com.cp.filter.BaseServlet;
import com.cp.rest.userinfo.dao.LogInfoDaoImpl;
import com.cp.rest.userinfo.redis.UserRedisImpl;
import com.cp.util.CodeUtil;
import com.mongo.MyMongo;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Path("rest/log")
@NoCache
@Service()
public class LogInfoRest extends BaseServlet
{
	@Resource
	private LogInfoDaoImpl logInfoDao;
	
	@Resource
	private UserRedisImpl userRedis;

	/**
	 * 修改日志状态
	 * @throws UnsupportedEncodingException 
	 */
	@GET
	@POST
	@Path("/logStatus")
	@Produces("text/html;charset=UTF-8")
	public String logStatus(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String userid = String.valueOf(request.getAttribute("userid"));
		List<String> userFeilds = userRedis.getUserField(userid, "theaterid".getBytes(), "theaternum".getBytes());
		String theaternum = userFeilds.get(1);
		try{
			if (CodeUtil.checkParam(theaternum)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			Map<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("log_status", Integer.parseInt("1"));
			if(!theaternum.equals("0")){//单个影院人员
				paramMap.put("theaterid", Integer.parseInt(userFeilds.get(0)));
			}
			logInfoDao.updateLog(paramMap);
		} catch (Exception e){
			MyMongo.mErrorLog("修改日志状态失败", request, e);
			return this.returnError(resultJson, ResMessage.Update_Info_Fail.code, request);
		}
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("修改日志状态成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 查看日志信息
	 */
	@GET
	@POST
	@Path("/getLog")
	@Produces("text/html;charset=UTF-8")
	public String getLog(@Context HttpServletRequest request, @Context HttpServletResponse response){
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String logid = request.getParameter("logid");
		try{
			if (CodeUtil.checkParam(logid)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("logid", Integer.parseInt(logid));
			Map<String, Object> resultMap = logInfoDao.getLog(paramMap);
			JSONObject data = new JSONObject();
			if(resultMap != null && resultMap.size() > 0){
				data.put("logid", resultMap.get("logid"));
				data.put("log_type", resultMap.get("log_type"));
				data.put("log_type_name", CodeUtil.convertLogType(resultMap.get("log_type").toString()));
				data.put("theaternum", resultMap.get("theaternum"));
				data.put("theatername", resultMap.get("theatername"));
				data.put("operator", resultMap.get("operator"));
				data.put("username", resultMap.get("username"));
				data.put("log_content", resultMap.get("log_content"));
				data.put("operator_time", new SimpleDateFormat("yyyy-MM-dd HH:mm").format(resultMap.get("operator_time")));
				data.put("log_status", resultMap.get("log_status"));
				data.put("log_status_name", CodeUtil.convertLogStatus(resultMap.get("log_status").toString()));
				data.put("ip", resultMap.get("ip"));
				resultJson.put("data", data);
			}else{
				MyMongo.mRequestFail(request, "查询日志信息不存在");
				return this.returnError(resultJson, ResMessage.Select_Info_NotExist.code, request);
			}
		} catch (Exception e){
			MyMongo.mErrorLog("查询日志信息失败", request, e);
			return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request);
		}
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询日志信息成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 查看用户信息列表
	 */
	@GET
	@POST
	@Path("/getLogList")
	@Produces("text/html;charset=UTF-8")
	public String getLogList(@Context HttpServletRequest request, @Context HttpServletResponse response){
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String userid = String.valueOf(request.getAttribute("userid"));
		List<String> userFeilds = userRedis.getUserField(userid, "theaterid".getBytes(), "theaternum".getBytes(), "roletype".getBytes());

		if(userFeilds != null){
			String theaternum = userFeilds.get(1);//从登录用户信息中获取
			//分页参数、条件查询参数
			String pagesize = request.getParameter("pagesize");//每页多少条数据
			String page = request.getParameter("page");//page＝（当前页数－1）*pagesize
			try{
				String startTime = request.getParameter("startTime");
				String endTime = request.getParameter("endTime");
				String search = URLDecoder.decode(request.getParameter("search"), "UTF-8");
				Map<String, Object> searchInfo = new HashMap<String, Object>();
				searchInfo.put("pageSize", Integer.parseInt(pagesize));
				searchInfo.put("offsetNum", Integer.parseInt(pagesize) * (Integer.parseInt(page) - 1));
				if(!startTime.equals("") && !endTime.equals("")){
					searchInfo.put("startTime", new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(startTime));
					searchInfo.put("endTime", new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(endTime));
				}else{
					SimpleDateFormat sDateFormat=new SimpleDateFormat("yyyy-MM-dd");
					String todayDate = sDateFormat.format(new Date());
					searchInfo.put("startTime", new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(todayDate+" 00:00"));
					searchInfo.put("endTime", new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(todayDate+" 23:59"));
				}
				if(!CodeUtil.checkParam(search)){
					searchInfo.put("search", "%" + search + "%");
				}
				if(!theaternum.equals("0")){//单个影院人员
					searchInfo.put("theaterid", Integer.parseInt(userFeilds.get(0)));
				}
				
				if(userFeilds.get(2).equals("1")){
					searchInfo.put("operator", Integer.parseInt(userid));
				}
				
				Map<String, Object> countMap = logInfoDao.getLogListCount(searchInfo);
				String count = countMap.get("count").toString();
				List<Map<String, Object>> resultList = logInfoDao.getLogList(searchInfo);
				JSONArray jsonArray = new JSONArray();
				if(resultList != null && resultList.size() > 0){
					for(int i=0;i<resultList.size();i++){
						Map<String, Object> resultMap = resultList.get(i);
						JSONObject data = new JSONObject();
						data.put("logid", resultMap.get("logid"));
						data.put("log_type", resultMap.get("log_type"));
						data.put("log_type_name", CodeUtil.convertLogType(resultMap.get("log_type").toString()));
						data.put("theaternum", resultMap.get("theaternum"));
						data.put("theatername", resultMap.get("theatername"));
						data.put("operator", resultMap.get("operator"));
						data.put("username", resultMap.get("username"));
						data.put("log_content", resultMap.get("log_content"));
						data.put("operator_time", new SimpleDateFormat("yyyy-MM-dd HH:mm").format(resultMap.get("operator_time")));
						data.put("log_status", resultMap.get("log_status"));
						data.put("log_status_name", CodeUtil.convertLogStatus(resultMap.get("log_status").toString()));
						data.put("ip", resultMap.get("ip"));
						jsonArray.add(data);
					}
					resultJson.put("total", count);
					resultJson.put("current", page);
					resultJson.put("data", jsonArray);
				}else{
					MyMongo.mRequestFail(request, "查询日志信息列表不存在");
					return this.returnError(resultJson, ResMessage.Select_Info_NotExist.code, request);
				}
			} catch (Exception e){
				MyMongo.mErrorLog("查询日志信息列表失败", request, e);
				return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request);
			}
			long etime = System.currentTimeMillis();
			MyMongo.mRequestLog("查询日志信息列表成功",  etime - stime, request, resultJson);
			return this.response(resultJson, request);
		}else{
			MyMongo.mRequestFail(request, "登录超时");
			return this.returnError(resultJson, ResMessage.User_Login_TimeOut.code, request);
		}
	}
	
	
	/**
	 * 查看用户信息未读数量
	 */
	@GET
	@POST
	@Path("/getLogCount")
	@Produces("text/html;charset=UTF-8")
	public String getLogCount(@Context HttpServletRequest request, @Context HttpServletResponse response){
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String userid = String.valueOf(request.getAttribute("userid"));
		List<String> userFeilds = userRedis.getUserField(userid, "theaterid".getBytes(), "theaternum".getBytes());

		if(userFeilds != null){
			String theaternum = userFeilds.get(1);//从登录用户信息中获取
			try{
				Map<String, Object> searchInfo = new HashMap<String, Object>();
				searchInfo.put("log_type", Integer.parseInt("0"));
				searchInfo.put("log_status", Integer.parseInt("0"));
				if(!theaternum.equals("0")){//单个影院人员
					searchInfo.put("theaterid", Integer.parseInt(userFeilds.get(0)));
				}
				Map<String, Object> countMap = logInfoDao.getLogListCount(searchInfo);
				String count = countMap.get("count").toString();
				resultJson.put("total", count);
				
			} catch (Exception e){
				MyMongo.mErrorLog("查询日志未读信息失败", request, e);
				return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request);
			}
			long etime = System.currentTimeMillis();
			MyMongo.mRequestLog("查询日志未读信息成功",  etime - stime, request, resultJson);
			return this.response(resultJson, request);
		}else{
			MyMongo.mRequestFail(request, "登录超时");
			return this.returnError(resultJson, ResMessage.User_Login_TimeOut.code, request);
		}
	}
	
	
}
