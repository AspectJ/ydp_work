package com.cp.rest.managedata;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

import org.jboss.resteasy.annotations.cache.NoCache;
import org.springframework.stereotype.Service;

import com.cp.bean.ResMessage;
import com.cp.filter.BaseServlet;
import com.cp.rest.managedata.dao.ManageDataDaoImpl;
import com.cp.rest.userinfo.dao.UserInfoDaoImpl;
import com.cp.rest.userinfo.redis.UserRedisImpl;
import com.cp.util.CodeUtil;
import com.cp.util.DateFormatUtil;
import com.mongo.MyMongo;

import net.sf.json.JSONObject;

/**
 * @ClassName: ManageDataRest 
 * @Description: 经营数据
 * @date 2016年9月22日 下午6:14:12 
 *
 */
@Path("rest/manageData")
@NoCache
@Service()
public class ManageDataRest extends BaseServlet
{
	@Resource
	private ManageDataDaoImpl manageDataDao;
	
	@Resource
	private UserInfoDaoImpl userInfoDao;
	
	@Resource
	private UserRedisImpl userRedis;
	
	/**
	 * @Title: findBatchByName 
	 * @Description: 按批次卡名称查询批次信息(查询条件：按批次名、按时间、按卡类型)
	 * @param @param request
	 * @param @param response
	 * @param @return
	 * @param @throws UnsupportedEncodingException
	 * @return String
	 * @throws
	 */
	@GET
	@POST
	@Path("/findBatchByName")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public String findBatchByName(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------

		String page = request.getParameter("page");
		String pagesize = request.getParameter("pagesize");
		String filter = request.getParameter("filter");
		String cardconfid = request.getParameter("cardconfid");
		String card_status = request.getParameter("card_status");
		String cardname = request.getParameter("cardname");
		String cardtype = request.getParameter("cardtype");
		String s_time = request.getParameter("s_time");
		String e_time = request.getParameter("e_time");

		try
		{
			if (CodeUtil.checkParam(page, pagesize))
			{
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			if(!privilegeCheck(request, "manager/ManageData.html", userRedis)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
				return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
			}
			
			Map<String, Object> batchMap = new HashMap<String, Object>();
			if (!CodeUtil.checkParam(s_time)){batchMap.put("s_time", DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_date(s_time + " 00:00:00"));}
			if (!CodeUtil.checkParam(e_time)){batchMap.put("e_time", DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_date(e_time + " 23:59:59"));}
			if (!CodeUtil.checkParam(page) && !CodeUtil.checkParam(pagesize))
			{
				batchMap.put("start", Integer.parseInt(pagesize) * (Integer.parseInt(page) - 1));
				batchMap.put("pagesize", Integer.parseInt(pagesize));
			}
			if (!CodeUtil.checkParam(cardconfid)){batchMap.put("cardconfid", Integer.parseInt(cardconfid));}
			if (!CodeUtil.checkParam(filter)){batchMap.put("filter", "%" + filter + "%");}
			if (!CodeUtil.checkParam(cardtype)){batchMap.put("cardtype", Integer.parseInt(cardtype));}
			if (!CodeUtil.checkParam(card_status)){batchMap.put("card_status", Integer.parseInt(card_status));}
			if (!CodeUtil.checkParam(cardname)){batchMap.put("cardname", cardname);}

			String userid = String.valueOf(request.getAttribute("userid"));
			List<String> userFeilds = userRedis.getUserField(userid, "theaterid".getBytes(), "theatertype".getBytes());
			if ("2".equals(userFeilds.get(1)))
			{
				batchMap.put("cinemaid", Integer.parseInt(userFeilds.get(0)));
			}
			
			int total = manageDataDao.findBatch_count(batchMap);
			if (total > 0)
			{
				List<Map<String, Object>> batchInfo = manageDataDao.findBatchByName(batchMap);
				for (Map<String, Object> map : batchInfo)
				{
					map.put("starttime", DateFormatUtil.to_yyyy_MM_dd_str((Date) map.get("starttime")));
					map.put("endtime", DateFormatUtil.to_yyyy_MM_dd_str((Date) map.get("endtime")));
					map.put("createtime", DateFormatUtil.to_yyyy_MM_dd_str((Date) map.get("createtime")));
					map.put("modifytime", DateFormatUtil.to_yyyy_MM_dd_str((Date) map.get("modifytime")));
				}
				resultJson.put("data", batchInfo);
			}
			resultJson.put("total", total);
			resultJson.put("current", page);
		} catch (Exception e)
		{
			MyMongo.mErrorLog("查询批次信息", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}

		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询批次信息", etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	/**
	 * 查找影院
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@GET
	@POST
	@Path("/findCinema")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public String findCinema(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException {
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();	
		String theatername = request.getParameter("theatername");
		
		try
		{
			if (!CodeUtil.checkParam(theatername))
			{
				theatername = "%" + theatername + "%";
			}
			List <Map<String, Object>> batchInfo = manageDataDao.findCinema(theatername);
			resultJson.put("data", batchInfo);
		} catch (Exception e)
		{
			MyMongo.mErrorLog("查询影院", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询影院",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	/**
	 * 查询卡信息
	 */
	@GET
	@POST
	@Path("/getCardInfo")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public String getCardInfo(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		
		String page = request.getParameter("page");
		String pagesize = request.getParameter("pagesize");
		String cardnumber = request.getParameter("cardnumber");
		String cardconfid = request.getParameter("cardconfid");
		
		try
		{
			if(!privilegeCheck(request, "manager/ManageData.html", userRedis)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
				return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
			}
			
			JSONObject returnObj = new JSONObject();
			
			Map<String,Object> param = new HashMap<String,Object>();
			if (!CodeUtil.checkParam(cardnumber))
			{
				param.put("cardnumber", cardnumber);
				// 卡详情
				Map<String, Object> cardDeatil = manageDataDao.cardDeatil(cardnumber);	
				if(cardDeatil != null){
					cardDeatil.put("modifytime", DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_str((Date)cardDeatil.get("modifytime")));
					cardDeatil.put("createtime", DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_str((Date)cardDeatil.get("createtime")));
					returnObj.put("card", cardDeatil);
				}
			}
			
			param.put("start", Integer.parseInt(pagesize) * (Integer.parseInt(page) - 1));	
			param.put("pagesize", Integer.parseInt(pagesize));		
			if (!CodeUtil.checkParam(cardconfid))
			{
				param.put("cardconfid", cardconfid);
			}
			
			String userid = String.valueOf(request.getAttribute("userid"));
			List<String> userFeilds = userRedis.getUserField(userid, "theaterid".getBytes(), "theatertype".getBytes());
			if ("2".equals(userFeilds.get(1)))
			{
				param.put("cinemaid", Integer.parseInt(userFeilds.get(0)));
			}

			// 可用影院
			JSONObject cinemaObj = new JSONObject();
			int total = manageDataDao.findUsableCinema_cardnumber_Count(param);
			if(total > 0){
				List <Map<String, Object>> cardCinemaList = manageDataDao.findUsableCinema_cardnumber(param);		
				cinemaObj.put("data", cardCinemaList);
			}
			cinemaObj.put("total", total);
			cinemaObj.put("current", page);
			
			returnObj.put("cinema", cinemaObj);
			resultJson.put("data", returnObj);
		} catch (Exception e)
		{
			MyMongo.mErrorLog("查询卡信息", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询卡信息",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 查询消费记录
	 * 查询条件：根据很多条件  查询
	 */
	@GET
	@POST
	@Path("/findCardRecord_qb")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public String findCardRecord_qb(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		
		String page = request.getParameter("page");
		String pagesize = request.getParameter("pagesize");
		String status = request.getParameter("status");
		String cinemaid = request.getParameter("cinemaid");
		String cardname = request.getParameter("cardname");
		String cardconfid = request.getParameter("cardconfid");
		String cardnumber = request.getParameter("cardnumber");
		String s_time = request.getParameter("s_time");  //必须是Timestamp类型 例如   Timestamp.valueOf("2016-08-30 00:00:00"));
		String e_time = request.getParameter("e_time");//必须是Timestamp类型 例如   Timestamp.valueOf("2016-09-1 00:00:00"));
		try
		{
			if(!privilegeCheck(request, "manager/ManageData.html", userRedis)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
				return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
			}
			
			Map<String,Object> CardRecordMap = new HashMap<String,Object>();
			if (!CodeUtil.checkParam(s_time)){CardRecordMap.put("s_time", DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_date(s_time + " 00:00:00"));}
			if (!CodeUtil.checkParam(e_time)){CardRecordMap.put("e_time", DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_date(e_time + " 23:59:59"));}
			if(!CodeUtil.checkParam(page)){CardRecordMap.put("start",  Integer.parseInt(pagesize) * (Integer.parseInt(page) - 1));}
			if(!CodeUtil.checkParam(pagesize)){CardRecordMap.put("pagesize",  Integer.parseInt(pagesize));}
			
			if (!CodeUtil.checkParam(cinemaid))
			{
				CardRecordMap.put("cinemaid", Integer.parseInt(cinemaid.trim()));
			}else{
				String userid = String.valueOf(request.getAttribute("userid"));
				List<String> userFeilds = userRedis.getUserField(userid, "theaterid".getBytes(), "theatertype".getBytes());
				if ("2".equals(userFeilds.get(1)))
				{
					CardRecordMap.put("cinemaid", Integer.parseInt(userFeilds.get(0)));
				}
			}
			if(!CodeUtil.checkParam(cardconfid)){CardRecordMap.put("cardconfid", cardconfid);}
			if(!CodeUtil.checkParam(cardname)){ CardRecordMap.put("cardname", cardname.trim()); }
			if(!CodeUtil.checkParam(status)){ CardRecordMap.put("status",Integer.parseInt(status) ); }
			if(!CodeUtil.checkParam(cardnumber)){ CardRecordMap.put("cardnumber","%" + cardnumber + "%" ); }
			
			 int total = manageDataDao.findCardRecord_qb_Count(CardRecordMap);
			 if (total > 0)
			 {
				 List <Map<String, Object>>CardRecordInfo = manageDataDao.findCardRecord_qb(CardRecordMap);	
				 for (Map<String, Object> map : CardRecordInfo) {
						map.put("createtime", DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_str((Date)map.get("createtime")));
						if(map.get("modifytime") != null && !map.get("modifytime").equals("")){
							map.put("modifytime", DateFormatUtil.to_yyyy_MM_dd_HH_mm_ss_str((Date)map.get("modifytime")));
						}else{
							map.put("modifytime", "无");
						}
					}
				 resultJson.put("data", CardRecordInfo);
			}
			 resultJson.put("total", total);
			 resultJson.put("current", page);
		} catch (Exception e)
		{
			MyMongo.mErrorLog("查询消费记录（全部）", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询消费记录（全部）",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	/**
	 * 查询所有批次
	 */
	@GET
	@POST
	@Path("/findAllBatch")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public String findAllBatch(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String cardname = request.getParameter("cardname");
		// -------------------------------------------------------------------------------
		
		try{
			if(cardname != null){
				cardname = "%" + cardname + "%";
			}
			List<Map<String,Object>> batchInfo = manageDataDao.findAllBatch(cardname);			
			resultJson.put("data", batchInfo);
		} catch (Exception e)
		{
			MyMongo.mErrorLog("查询所有批次", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询所有批次",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
}