package com.cp.rest.settle;

import java.io.UnsupportedEncodingException;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
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

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.jboss.resteasy.annotations.cache.NoCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import com.cp.bean.ResMessage;
import com.cp.filter.BaseServlet;
import com.cp.rest.settle.dao.SettleDaoImpl;
import com.cp.rest.theater.dao.TheaterDaoImpl;
import com.cp.rest.userinfo.LogInfoAdd;
import com.cp.rest.userinfo.redis.UserRedisImpl;
import com.cp.util.CodeUtil;
import com.cp.util.DateFormatUtil;
import com.mongo.MyMongo;

/**
 * 查看结算以及生成账单，查询账单
 * @author john
 *
 */
@Path("rest/settle")
@NoCache
@Controller("settleInfoRest")
@Transactional
public class SettleInfoRest extends BaseServlet{
	
	@Resource(name="settleDao")
	private SettleDaoImpl settleDao;
	
	@Autowired
	@Qualifier("theaterDao")
	private TheaterDaoImpl theaterDao;
	
	@Resource
	private UserRedisImpl userRedis;
	
	@Resource
	private LogInfoAdd logInfo;
	
	private static final Logger logger = Logger.getLogger(SettleInfoRest.class);
	
	
	/**
	 * 查看结算信息(各种条件过滤：时间、渠道、影院etc)
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@GET
	@POST
	@Path("/getSettleInfo")
	@Produces("text/html;charset=UTF-8")
	public String getSettleInfo(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		
		String beginTime = request.getParameter("beginTime");
		String endTime = request.getParameter("endTime");
		String theaterid = request.getParameter("theaterid");
		String isOnline = request.getParameter("isOnline");
		String page = request.getParameter("page");
		String pageSize = request.getParameter("pagesize");
		try{
			if (CodeUtil.checkParam(beginTime, endTime, theaterid, isOnline, page, pageSize)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			//根据ID查询theatertype
			int theatertype = theaterDao.getTheaterType(Integer.parseInt(theaterid));
			
			Map<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("beginTime", beginTime);
			paramMap.put("endTime", endTime);
			paramMap.put("theaterid", Integer.parseInt(theaterid));
			paramMap.put("isOnline", Integer.parseInt(isOnline)); // 0表示线下消费，1表示线上消费，2表示所有消费
			paramMap.put("limit_start", (Integer.parseInt(page) -1) * Integer.parseInt(pageSize));
			paramMap.put("limit_size", Integer.parseInt(pageSize));
			paramMap.put("theatertype", theatertype);
			int count = settleDao.getSettleCount(paramMap);
			List<Map<String, Object>> resultList = settleDao.getSettleInfo(paramMap);
			
			//根据查询条件获取结算合计
			double summation = 0;
			for(int i = 0; i < resultList.size(); i++) {
				summation += Double.parseDouble(resultList.get(i).get("SUM").toString());
			}
			resultJson.put("total", count);
			resultJson.put("current", page);
			resultJson.put("data", resultList);
			resultJson.put("summation", summation);
			
		} catch (Exception e){
			MyMongo.mErrorLog("查询结算信息失败", request, e);
			return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request);
		}
		
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询结算信息成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 生成账单
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@GET
	@POST
	@Path("/createBill")
	@Produces("text/html;charset=UTF-8")
	public String createBill(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		
		String theatername = request.getParameter("theatername");
		String cinemaid = request.getParameter("cinemaid");
		String amount = request.getParameter("amount");
		String channel = request.getParameter("channel"); //交易渠道：线上/线下
		String beginTime = request.getParameter("beginTime");
		String endTime = request.getParameter("endTime");
		String floatamount = request.getParameter("floatamount");
		String remarks = request.getParameter("remarks");
		
		//获取操作员ID
		String userid = String.valueOf(request.getAttribute("userid"));
		
		try{
			if (CodeUtil.checkParam(theatername, cinemaid, amount, channel, beginTime, endTime, userid)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			
			DecimalFormat df = new DecimalFormat("##0.00");
			
			Map<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("theatername", theatername);
			paramMap.put("cinemaid", Integer.parseInt(cinemaid)); // 影院id
			paramMap.put("amount", df.format(Double.parseDouble(amount)));
			paramMap.put("channel", Integer.parseInt(channel));
			paramMap.put("beginTime", beginTime);
			paramMap.put("endTime", endTime);
			paramMap.put("userid", Integer.parseInt(userid));
			if(!CodeUtil.checkParam(floatamount)) {
				paramMap.put("floatamount", df.format(Double.parseDouble(floatamount)));
			}else {
				paramMap.put("floatamount", "0.00");
			}
			if(!CodeUtil.checkParam(remarks)) {
				paramMap.put("remarks", remarks);
			}else {
				paramMap.put("remarks", "");
			}
			
			Map<String, Object> resultMap = settleDao.createBill(paramMap);
			resultJson.put("sid", resultMap.get("sid"));
			
		} catch (Exception e){
			MyMongo.mErrorLog("生成对账单失败", request, e);
			return this.returnError(resultJson, ResMessage.Add_Info_Fail.code, request);
		}
		
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("生成对账单成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 根据sid查询账单表
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@GET
	@POST
	@Path("/getOneBill")
	@Produces("text/html;charset=UTF-8")
	public String getOneBill(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		
		String sid = request.getParameter("sid");

		try{
			if (CodeUtil.checkParam(sid)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			
			Map<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("sid", Integer.parseInt(sid));
			
			DecimalFormat df = new DecimalFormat("##0.00");
			
			Map<String, Object> resultMap = settleDao.getOneBill(paramMap);
			JSONObject jsonObject = new JSONObject();
			
			jsonObject.put("statementid", resultMap.get("statementid"));
			jsonObject.put("theatername", resultMap.get("theatername"));
			jsonObject.put("starttime", DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_str(DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_date(resultMap.get("starttime").toString())));
			jsonObject.put("endtime", DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_str(DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_date(resultMap.get("endtime").toString())));
			jsonObject.put("status", Integer.parseInt(resultMap.get("status").toString()));
			jsonObject.put("floatamount", df.format(Double.parseDouble(resultMap.get("floatamount").toString())));
			jsonObject.put("remarks", resultMap.get("remarks"));
			jsonObject.put("type", Integer.parseInt(resultMap.get("type").toString()));
			jsonObject.put("cinemaid", Integer.parseInt(resultMap.get("cinemaid").toString()));
			jsonObject.put("amount", df.format(Double.parseDouble(resultMap.get("amount").toString())));
			jsonObject.put("createtime", DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_str(DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_date(resultMap.get("createtime").toString())));
			jsonObject.put("operatorid", Integer.parseInt(resultMap.get("operatorid").toString()));
			jsonObject.put("modifytime", DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_str(DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_date(resultMap.get("modifytime").toString())));
			jsonObject.put("operatorname", resultMap.get("username"));
			if(resultMap.get("attachfileurl") == null || resultMap.get("attachfileurl") == "" ) {
				jsonObject.put("filename", "");
				jsonObject.put("attachfileurl", "");
			}else {
				String url = resultMap.get("attachfileurl").toString();
				jsonObject.put("filename", url.substring(url.lastIndexOf("/") + 1).substring(33)); //获取文件名称
				jsonObject.put("attachfileurl", resultMap.get("attachfileurl")); //获取文件保存路径
			}
			//	获取上传文件附件的时间
			if(resultMap.get("fileuploadtime") == null || resultMap.get("fileuploadtime") == "" ) {
				jsonObject.put("fileuploadtime", "");
			}else {
				jsonObject.put("fileuploadtime", DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_str(DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_date(resultMap.get("fileuploadtime").toString())));
			}
			jsonObject.put("sign", resultMap.get("sign"));
			
			//根据ID查询theatertype
			int theatertype = theaterDao.getTheaterType(jsonObject.getInt("cinemaid"));
			jsonObject.put("theatertype", theatertype);
			
			resultJson.put("data", jsonObject);
			
			
		} catch (Exception e){
			MyMongo.mErrorLog("获取对账单信息失败", request, e);
			return this.returnError(resultJson, ResMessage.Add_Info_Fail.code, request);
		}
		
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("获取对账单信息成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	/**
	 * 查看账单列表信息
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@GET
	@POST
	@Path("/getBillList")
	@Produces("text/html;charset=UTF-8")
	public String getBillList(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		
		if(!privilegeCheck(request, "getBillList", userRedis)){
			MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
			return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
		}
		
		String page = request.getParameter("page");
		String pageSize = request.getParameter("pagesize");
		String status = request.getParameter("status"); 	//查询账单状态字段 -1初始 0未核对 1待支付 2 已支付
		String roleType = request.getParameter("roletype"); //当前登录用户的角色
		String theaternum = request.getParameter("theaternum"); //当前登录用户的所属影院
		String isCombiningQuery = request.getParameter("isCombiningQuery"); //是否进行条件组合查询(消费渠道，影院,线上线下)
		try{
			if (CodeUtil.checkParam(page, pageSize, roleType, theaternum)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			
			Map<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("page", (Integer.parseInt(page)-1) * Integer.parseInt(pageSize));
			paramMap.put("pageSize", Integer.parseInt(pageSize));
			paramMap.put("roleType", Integer.parseInt(roleType));
			paramMap.put("theaternum", theaternum);
			//判断账单状态字段是否为空
			if(!CodeUtil.checkParam(status)) {
				paramMap.put("status", Integer.parseInt(status));
			}
			//是否进行条件组合查询
			if(Boolean.parseBoolean(isCombiningQuery)) { //进行条件组合查询
				String online = request.getParameter("online");
				String theaterid = request.getParameter("theaterid");
				String beginTime = request.getParameter("beginTime");
				String endTime = request.getParameter("endTime");
				paramMap.put("online", Integer.parseInt(online));
				paramMap.put("theaterid", Integer.parseInt(theaterid));
				paramMap.put("beginTime", beginTime);
				paramMap.put("endTime", endTime);
			}
			//是否进行条件组合查询，如果为false, mybatis则不进行条件组合查询
			paramMap.put("isCombiningQuery", Boolean.parseBoolean(isCombiningQuery));
			
			
			DecimalFormat df = new DecimalFormat("##0.00");
			
			int count = settleDao.getBillListCount(paramMap);
			List<Map<String, Object>> resultList = settleDao.getBillList(paramMap);
			
			JSONArray jsonArray = new JSONArray();
			
			if(resultList != null && resultList.size() > 0) {
				for(int i = 0; i < resultList.size(); i++) {
					JSONObject jsonObject = new JSONObject();
					Map<String, Object> resultMap = resultList.get(i);
					jsonObject.put("statementid", resultMap.get("statementid"));
					jsonObject.put("theatername", resultMap.get("theatername"));
					jsonObject.put("starttime", DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_str(DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_date(resultMap.get("starttime").toString())));
					jsonObject.put("endtime", DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_str(DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_date(resultMap.get("endtime").toString())));
					jsonObject.put("status", Integer.parseInt(resultMap.get("status").toString()));
					jsonObject.put("floatamount", df.format(Double.parseDouble(resultMap.get("floatamount").toString())));
					jsonObject.put("remarks", resultMap.get("remarks"));
					jsonObject.put("type", Integer.parseInt(resultMap.get("type").toString()));
					jsonObject.put("cinemaid", Integer.parseInt(resultMap.get("cinemaid").toString()));
					jsonObject.put("amount", df.format(Double.parseDouble(resultMap.get("amount").toString())));
					jsonObject.put("createtime", DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_str(DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_date(resultMap.get("createtime").toString())));
					jsonObject.put("operatorid", Integer.parseInt(resultMap.get("operatorid").toString()));
					jsonObject.put("modifytime", DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_str(DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_date(resultMap.get("modifytime").toString())));
					//	获取上传文件附件的名称
					if(resultMap.get("attachfileurl") == null || resultMap.get("attachfileurl") == "" ) {
						jsonObject.put("filename", "");
						jsonObject.put("attachfileurl", ""); //	获取上传文件附件的保存路径
					}else {
						String url = resultMap.get("attachfileurl").toString();
						jsonObject.put("filename", url.substring(url.lastIndexOf("/") + 1).substring(33));
						jsonObject.put("attachfileurl", resultMap.get("attachfileurl"));
					}
					//	获取上传文件附件的时间
					if(resultMap.get("fileuploadtime") == null || resultMap.get("fileuploadtime") == "" ) {
						jsonObject.put("fileuploadtime", "");
					}else {
						jsonObject.put("fileuploadtime", DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_str(DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_date(resultMap.get("fileuploadtime").toString())));
					}
					jsonObject.put("sign", resultMap.get("sign"));
					
					//根据ID查询theatertype
					int theatertype = theaterDao.getTheaterType(jsonObject.getInt("cinemaid"));
					jsonObject.put("theatertype", theatertype);
					
					jsonArray.add(jsonObject);
				}
				resultJson.put("data", jsonArray);
				resultJson.put("total", count);
				resultJson.put("current", page);
			} else {
				MyMongo.mRequestFail(request, "查询账单信息列表不存在");
				return this.returnError(resultJson, ResMessage.Bill_NotExist_YDP.code, request);
			}
		} catch (Exception e){
			MyMongo.mErrorLog("查询账单信息列表失败", request, e);
			return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request);
		}
		
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询账单信息列表成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	/**
	 * 修改对账单的调整金额以及调整备注
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@GET
	@POST
	@Path("/changeBillInfo")
	@Produces("text/html;charset=UTF-8")
	public String changeBillInfo(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		
		String statementid = request.getParameter("statementid");
		String floatamount = request.getParameter("floatamount");
		String remarks = request.getParameter("remarks");
		try{
			if (CodeUtil.checkParam(floatamount, remarks, statementid)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			DecimalFormat df = new DecimalFormat("##0.00");
			
			Map<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("statementid", Integer.parseInt(statementid));
			paramMap.put("floatamount", df.format(Double.parseDouble(floatamount)));
			paramMap.put("remarks", remarks);
			
			settleDao.changeBillInfo(paramMap);
			resultJson.put("sid", statementid);
			
		} catch (Exception e){
			MyMongo.mErrorLog("更改账单信息(结算价以及结算备注)失败", request, e);
			return this.returnError(resultJson, ResMessage.Add_Info_Fail.code, request);
		}
		
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("更改账单信息(结算价以及结算备注)成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	/**
	 * 查询消费明细（结算合计）
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@GET
	@POST
	@Path("/getConsumeDetails")
	@Produces("text/html;charset=UTF-8")
	public String getConsumeDetails(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		
		if(!privilegeCheck(request, "getConsumeDetails", userRedis)){
			MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
			return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
		}
		
		DecimalFormat df = new DecimalFormat("##0.00");
		
		String beginTime = request.getParameter("beginTime");
		String endTime = request.getParameter("endTime");
		String theaterid = request.getParameter("theaterid");
		String isOnline = request.getParameter("isOnline");
		String page = request.getParameter("page");
		String pageSize = request.getParameter("pagesize");
		try{
			if (CodeUtil.checkParam(beginTime, endTime, theaterid, isOnline, page, pageSize)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			//根据ID查询theatertype
			int theatertype = theaterDao.getTheaterType(Integer.parseInt(theaterid));
			
			Map<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("beginTime", beginTime);
			paramMap.put("endTime", endTime);
			paramMap.put("theaterid", Integer.parseInt(theaterid));
			paramMap.put("isOnline", Integer.parseInt(isOnline)); // 0表示线下消费，1表示线上消费
			paramMap.put("limit_start", (Integer.parseInt(page) -1) * Integer.parseInt(pageSize));
			paramMap.put("limit_size", Integer.parseInt(pageSize));
			paramMap.put("theatertype", theatertype);
			
			
			double SUM = settleDao.getSettleSum(paramMap);//查询结算总价
			int count = settleDao.getConsumeDetailsCount(paramMap);//查询消费详细信息的个数
			List<Map<String, Object>> resultList = settleDao.getConsumeDetails(paramMap); //分页查询消费流水详细信息
			
			JSONArray jsonArray = new JSONArray();
			if(resultList != null && resultList.size() > 0) {
				for(int i = 0; i < resultList.size(); i++) {
					JSONObject jsonObject = new JSONObject();
					Map<String, Object> resultMap = resultList.get(i);
					jsonObject.put("recordid", resultMap.get("recordid"));
					jsonObject.put("cardid", resultMap.get("cardid"));
					jsonObject.put("cardname", resultMap.get("cardname"));
					jsonObject.put("cardtype", resultMap.get("cardtype"));
					jsonObject.put("count", resultMap.get("count"));
					jsonObject.put("value", df.format(Double.parseDouble(resultMap.get("value").toString())));
					jsonObject.put("createtime", DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_str(DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_date(resultMap.get("createtime").toString())));
					jsonObject.put("settleprice", df.format(Double.parseDouble(resultMap.get("settleprice").toString())));
					jsonObject.put("theatername", resultMap.get("theatername"));
					String online = "";
					if("0".equals(isOnline)) {
						online = "线下消费";
					}else if("1".equals(isOnline)) {
						online = "线上消费";
					}
					jsonObject.put("online", online);
					
					jsonArray.add(jsonObject);
				}
			}
			
			resultJson.put("total", count);
			resultJson.put("current", page);
			resultJson.put("data", jsonArray);
			resultJson.put("SUM", df.format(SUM));
			
			
		} catch (Exception e){
			MyMongo.mErrorLog("查询消费明细信息失败", request, e);
			return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request);
		}
		
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询消费明细信息成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	/**
	 * 查询未出账单的初始时间
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@GET
	@POST
	@Path("/getNoOccurDate")
	@Produces("text/html;charset=UTF-8")
	public String getNoOccurDate(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		
		String theaterid = request.getParameter("theaterid");
		
		//根据ID查询theatertype
		int theatertype = theaterDao.getTheaterType(Integer.parseInt(theaterid));
		
		try{
			if (CodeUtil.checkParam(theaterid)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			
			String beginTime = "";
			//查询该影院上一笔账单的查账区间的结束时间时间
			String end_time = settleDao.getNoOccurDate(Integer.parseInt(theaterid));
			//判断是否有上一笔上单(若上一笔账单存在，则取最后一个时间+1天；若不存在，查询该影院消费流水第一笔消费时间)
			if(end_time != null && end_time != "") {
				Date date = new SimpleDateFormat("yyyy-MM-dd").parse(end_time); //将字符串日期解析成为Date格式
				Calendar cal = Calendar.getInstance();	//获取Calendar实例
				cal.setTime(date);   					//为Calendar赋值
				cal.add(Calendar.DATE, 1);				//对日期进行加一天
				Date beginTime_start = cal.getTime();	//获取处理后的日期Date
				beginTime = new SimpleDateFormat("yyyy-MM-dd 00:00:00").format(beginTime_start); //未出账账单的开始时间
			}else {
				Map<String, Object> paramsMap = new HashMap<String, Object>();
				paramsMap.put("theaterid", Integer.parseInt(theaterid));
				paramsMap.put("theatertype", theatertype);
				String time = settleDao.getFirstConsumeTime(paramsMap); // 获取该影院第一笔流水消费时间
				if(time == null || time == "") {
					beginTime = "1970-01-01 00:00:00";	//未出账账单的开始时间
				}else {
					beginTime = new SimpleDateFormat("yyyy-MM-dd 00:00:00").format(new SimpleDateFormat("yyyy-MM-dd").parse(time));  //未出账账单的开始时间
				}
			}
			System.out.println(beginTime + "---------");
			
			resultJson.put("beginTime", beginTime); //未出账账单的开始时间
			//==================start===================
			//获取当前日期的前一天---->作为未出账账单的查询结束时间
			Date date2 = new Date();
			Calendar cal2 = Calendar.getInstance();	//获取Calendar实例
			cal2.setTime(date2);   					//为Calendar赋值
			cal2.add(Calendar.DATE, -1);			//对日期进行减一天
			Date time_end = cal2.getTime();			//获取处理后的日期Date
			//===================end====================
			resultJson.put("endTime", new SimpleDateFormat("yyyy-MM-dd 23:59:59").format(time_end));//未出账账单的结束时间
			
			//获取上次账单的结束时间
			Date date3 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(beginTime);
			Calendar cal3 = Calendar.getInstance();	//获取Calendar实例
			cal3.setTime(date3);   					//为Calendar赋值
			cal3.add(Calendar.SECOND, -1);			//对日期进行减一秒
			Date last_time = cal3.getTime();			//获取处理后的日期Date
			//===================end====================
			resultJson.put("lastTime", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(last_time));
			
		} catch (Exception e){
			MyMongo.mErrorLog("查询未出账单结束时间失败", request, e);
			return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request);
		}
		
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询未出账单结束时间成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 重新生成对账单，并把该影院的前一个对账单状态置为过期
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@GET
	@POST
	@Path("/ReCreateBill")
	@Produces("text/html;charset=UTF-8")
	public String ReCreateBill(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		
		if(!privilegeCheck(request, "reCreateBill", userRedis)){
			MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
			return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
		}
		
		String theatername = request.getParameter("theatername");
		String cinemaid = request.getParameter("cinemaid");
		String amount = request.getParameter("amount");
		String channel = request.getParameter("channel"); //交易渠道：线上/线下
		String beginTime = request.getParameter("beginTime");
		String endTime = request.getParameter("endTime");
		String floatamount = request.getParameter("floatamount");
		String remarks = request.getParameter("remarks");
		String statementid = request.getParameter("statementid");
		
		//获取操作员ID
		String userid = String.valueOf(request.getAttribute("userid"));
		
		try{
			if (CodeUtil.checkParam(theatername, cinemaid, amount, channel, beginTime, endTime, userid, statementid)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			
			DecimalFormat df = new DecimalFormat("##0.00");
			//把对应的前一个账单的状态置为1（表示过期）
			settleDao.updateBeforeBillState(Integer.parseInt(statementid));
			
			Map<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("theatername", theatername);
			paramMap.put("cinemaid", Integer.parseInt(cinemaid)); // 影院id
			paramMap.put("amount", df.format(Double.parseDouble(amount)));
			paramMap.put("channel", Integer.parseInt(channel));
			paramMap.put("beginTime", beginTime);
			paramMap.put("endTime", endTime);
			paramMap.put("userid", Integer.parseInt(userid));
			if(!CodeUtil.checkParam(floatamount)) {
				paramMap.put("floatamount", df.format(Double.parseDouble(floatamount)));
			}else {
				paramMap.put("floatamount", "0.00");
			}
			if(!CodeUtil.checkParam(remarks)) {
				paramMap.put("remarks", remarks);
			}else {
				paramMap.put("remarks", "");
			}
			
			Map<String, Object> resultMap = settleDao.createBill(paramMap);
			resultJson.put("sid", resultMap.get("sid"));
			
		} catch (Exception e){
			MyMongo.mErrorLog("重新生成对账单失败", request, e);
			return this.returnError(resultJson, ResMessage.Add_Info_Fail.code, request);
		}
		
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("重新生成对账单成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	/**
	 * 修改账单状态(-1 表示初始状态，0表示未核对，1表示待支付，2表示已支付)
	 * 			PS:	 账单状态只能 +1，即不能跳过修改
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@GET
	@POST
	@Path("/updateBillStatus")
	@Produces("text/html;charset=UTF-8")
	public String updateBillStatus(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		
		if(!privilegeCheck(request, "updateBillStatus", userRedis)){
			MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
			return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
		}
		
		String sid = request.getParameter("sid");
		String status = request.getParameter("status");
		String theatername = request.getParameter("theatername");
		
		try{
			if (CodeUtil.checkParam(sid, status)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			Map<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("sid", Integer.parseInt(sid));
			paramMap.put("status", Integer.parseInt(status));
			
			settleDao.updateBillStatus(paramMap);
			
		} catch (Exception e){
			MyMongo.mErrorLog("修改账单状态失败", request, e);
			return this.returnError(resultJson, ResMessage.Add_Info_Fail.code, request);
		}
		
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("修改账单状态成功",  etime - stime, request, resultJson);
		String logContent = "您有一笔来自【"+ theatername +"】影院的账单状态有更新";
		logInfo.addLogInfo(request, "1", logContent);
		return this.response(resultJson, request);
	}
	
	
	@GET
	@POST
	@Path("/getBillStream")
	@Produces("text/html;charset=UTF-8")
	public String getBillStream(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		
		if(!privilegeCheck(request, "getBillStream", userRedis)){
			MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
			return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
		}
		
		String sid = request.getParameter("sid");
		String page = request.getParameter("page");
		String pageSize = request.getParameter("pageSize");
		try{
			if (CodeUtil.checkParam(sid)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			
			Map<String, Object> attrMap = new HashMap<String, Object>();
			attrMap.put("sid", sid);
			attrMap.put("page", page);
			attrMap.put("pageSize", pageSize);
			
			//调用封装方法
			resultJson = getStreamInstance(attrMap);
			
		} catch (Exception e){
			MyMongo.mErrorLog("查询账单流水信息失败", request, e);
			return this.returnError(resultJson, ResMessage.Add_Info_Fail.code, request);
		}
		
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询账单流水信息成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	/**
	 * 对查询账单流水信息方法进行方法封装
	 * @return
	 * @throws ParseException 
	 */
	public JSONObject getStreamInstance(Map<String, Object> attrMap) throws ParseException {
		String sid = (String) attrMap.get("sid");
		String page = (String) attrMap.get("page");
		String pageSize = (String) attrMap.get("pageSize");
		
		DecimalFormat df = new DecimalFormat("##0.00");
		
		Map<String,Object> paramMap = new HashMap<String, Object>();
		paramMap.put("sid", Integer.parseInt(sid));
		Map<String, Object> helloMap = settleDao.getOneBill(paramMap);   //查询账单信息(开始时间，结束时间，线上/线下，影院ID)
		paramMap.put("beginTime", helloMap.get("starttime"));
		paramMap.put("endTime", helloMap.get("endtime"));
		int isOnline = Integer.parseInt(helloMap.get("type").toString());
		paramMap.put("isOnline", isOnline);
		
		paramMap.put("theaterid", Integer.parseInt(helloMap.get("cinemaid").toString()));
		if (!CodeUtil.checkParam(page, pageSize)) {
			paramMap.put("limit_start", (Integer.parseInt(page) -1) * Integer.parseInt(pageSize));
			paramMap.put("limit_size", Integer.parseInt(pageSize));
		}
		
		int count = settleDao.getConsumeDetailsCount(paramMap);//查询消费详细信息的个数
		List<Map<String, Object>> resultList = settleDao.getConsumeDetails(paramMap); //分页查询消费流水详细信息
		
		
		JSONArray jsonArray = new JSONArray();
		if(resultList != null && resultList.size() > 0) {
			for(int i = 0; i < resultList.size(); i++) {
				JSONObject jsonObject = new JSONObject();
				Map<String, Object> resultMap = resultList.get(i);
				jsonObject.put("recordid", resultMap.get("recordid"));
				jsonObject.put("cardid", resultMap.get("cardid"));
				jsonObject.put("cardname", resultMap.get("cardname"));
				if("0".equals(resultMap.get("cardtype").toString())) {
					jsonObject.put("cardtype", resultMap.get("cardtype"));
					jsonObject.put("cardtype_str", "次卡");
				}else if("1".equals(resultMap.get("cardtype").toString())) {
					jsonObject.put("cardtype", resultMap.get("cardtype"));
					jsonObject.put("cardtype_str", "储值卡");
				}
				jsonObject.put("count", (resultMap.get("count")== null)?"无":resultMap.get("count"));
				
				jsonObject.put("value", df.format(Double.parseDouble(resultMap.get("value").toString())));
				jsonObject.put("createtime", DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_str(DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_date(resultMap.get("createtime").toString())));
				jsonObject.put("settleprice", df.format(Double.parseDouble(resultMap.get("settleprice").toString())));
				jsonObject.put("theatername", resultMap.get("theatername"));
				String online = "";
				if(isOnline == 0) {
					online = "线下消费";
				}else if(isOnline == 1) {
					online = "线上消费";
				}
				jsonObject.put("online", online);
				
				jsonArray.add(jsonObject);
			}
		}
		
		
		
		JSONObject resultJson = new JSONObject();
		resultJson.put("total", count);
		resultJson.put("current", page);
		resultJson.put("data", jsonArray);
		
		return resultJson;
		
	}
}


