package com.cx.rest.cinema;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

import org.jboss.resteasy.annotations.cache.NoCache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cx.bean.ResMessage;
import com.cx.filter.BaseServlet;
import com.cx.rest.cinema.dao.CinemaDaoImpl;
import com.cx.util.CodeUtil;
import com.cx.util.Config;
import com.mongo.MyMongo;
import com.ydp.servier.bean.DataMessage;
import com.ydp.servier.facade.IServiceCinema;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Path("rest/cinema")
@NoCache
@Service
public class CinemaRest extends BaseServlet
{
	@Autowired
	private IServiceCinema serviceCinema;
	
	@Autowired
	private CinemaDaoImpl cinemaDao;
	/**
	 * 影院列表
	 */
	@SuppressWarnings("unchecked")
	@GET
	@POST
	@Path("/cinemaList")
	@Produces("application/json;charset=UTF-8")
	public String cinemaList(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------

		// 验证参数
		String movieid = request.getParameter("movieid");
		String citycode = BaseServlet.getParam(request, "citycode", "430100");

		try
		{
			DataMessage dataMessage = null;
			if (CodeUtil.checkParam(movieid))
			{
				dataMessage = serviceCinema.cityCinema(citycode);
			}

			if (dataMessage.isSuccess())
			{
				List<Map<String, Object>> cinemaList = (List<Map<String, Object>>) dataMessage.getData();

				if (cinemaList != null && cinemaList.size() > 0)
				{
					JSONArray cinemaArr = new JSONArray();
					for (Map<String, Object> map : cinemaList)
					{
						JSONObject cinemaObject = new JSONObject();
						cinemaObject.put("cinemaid", map.get("theaterid"));
						cinemaObject.put("cinemaName", map.get("theatername"));
						cinemaObject.put("address", map.get("theateraddress"));
						cinemaArr.add(cinemaObject);
					}
					resultJson.put("data", cinemaArr);
				}
			}
		} catch (Exception e)
		{
			MyMongo.mErrorLog("影院列表", e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}

		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("影院列表", etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	/**
	 * 查询院线信息
	 * @param request
	 * @return
	 */
	@GET
	@POST
	@Path("/selCinemaInfo")
	@Produces("html/text;charset=UTF-8")
	public String selCinemaInfo(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		
		// -------------------------------------------------------------------------------
		try {
			Map<String, Object> resultMap = cinemaDao.selCinemaInfo();
			resultJson.put("data", resultMap);
		}catch(Exception e) {
			MyMongo.mErrorLog("查询院线信息失败", e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询院线信息成功", etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	/**
	 * 查询加盟影院信息（根据cinemaId查询）
	 * @param request
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@GET
	@POST
	@Path("/getJoinCinemaInfo")
	@Produces("html/text;charset=UTF-8")
	public String getJoinCinemaInfo(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		
		// -------------------------------------------------------------------------------
		String pageSize = request.getParameter("pageSize");
		String offsetNum = request.getParameter("offsetNum");
		String city_number = request.getParameter("city_number");
		try {
			if(CodeUtil.checkParam(pageSize, offsetNum)) {
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
	
			Map<String, Object> paramsMap = new HashMap<String, Object>();
			paramsMap.put("pageSize", Integer.parseInt(pageSize));
			paramsMap.put("offsetNum", Integer.parseInt(offsetNum));
			if(!CodeUtil.checkParam(city_number)){
				paramsMap.put("city_number", city_number);
			}
			
			int count = cinemaDao.getFrontJoinCinemaCount(paramsMap);
			List<Map<String, Object>> resultList = cinemaDao.getJoinCinemaInfo(paramsMap);
			JSONArray jsonArray = new JSONArray();
			if(resultList != null && resultList.size() > 0) {
				for(int i = 0; i < resultList.size(); i++) {
					Map<String, Object> resultMap = resultList.get(i);
					JSONObject jsonObject = new JSONObject();
					jsonObject.put("j_id", resultMap.get("j_id"));
					jsonObject.put("j_name", resultMap.get("j_name"));
					jsonObject.put("org_path", resultMap.get("t_logo_url"));
					jsonObject.put("cinemaid", resultMap.get("cinemaid"));
					jsonArray.add(jsonObject);
				}
				resultJson.put("data", jsonArray);
				resultJson.put("total", count);
			}else {
				MyMongo.mRequestFail(request, "查询加盟影院信息不存在");
				return this.returnError(resultJson, ResMessage.Info_NoExist.code, request);
			}
		}catch(Exception e) {
			MyMongo.mErrorLog("查询加盟影院信息失败", e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询加盟影院信息成功", etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	/**
	 * 查询院线风采展示
	 * @param request
	 * @return
	 */
	@GET
	@POST
	@Path("/getCinemaStyle")
	@Produces("html/text;charset=UTF-8")
	public String getCinemaStyle(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		
		// -------------------------------------------------------------------------------
		String s_type = request.getParameter("s_type");
		try {
			if(CodeUtil.checkParam(s_type)) {
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			Map<String, Object> paramsMap = new HashMap<String, Object>();
			paramsMap.put("s_type", Integer.parseInt(s_type));
			
			List<Map<String, Object>> resultList = cinemaDao.getCinemaStyle(paramsMap);
			JSONArray jsonArray = new JSONArray();
			if(resultList != null && resultList.size() > 0) {
				for(int i = 0; i < resultList.size(); i++) {
					Map<String, Object> resultMap = resultList.get(i);
					JSONObject jsonObject = new JSONObject();
					jsonObject.put("s_id", resultMap.get("s_id"));
					jsonObject.put("org_path", resultMap.get("org_path"));
					jsonArray.add(jsonObject);
				}
				resultJson.put("data", jsonArray);
			}else {
				MyMongo.mRequestFail(request, "查询院线风采展示信息不存在");
				return this.returnError(resultJson, ResMessage.Info_NoExist.code, request);
			}
		}catch(Exception e) {
			MyMongo.mErrorLog("查询院线风采展示信息失败", e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询院线风采展示信息成功", etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	/**
	 * 首页查询 加盟影院-->影院风采展示
	 * @param request
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	@GET
	@POST
	@Path("/getJoinCinemaShow")
	@Produces("html/text;charset=UTF-8")
	public String getJoinCinemaShow(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		
		try {
			List<Map<String, Object>> resultList = cinemaDao.getJoinCinemaShow();
			JSONArray jsonArray = new JSONArray();
			if(resultList != null && resultList.size() > 0) {
				for(int i = 0; i < resultList.size(); i++) {
					Map<String, Object> resultMap = resultList.get(i);
					JSONObject jsonObject = new JSONObject();
					jsonObject.put("j_id", resultMap.get("j_id"));
					jsonObject.put("j_name", resultMap.get("j_name"));
					jsonObject.put("org_path", resultMap.get("t_logo_url"));
					jsonObject.put("cinemaid", resultMap.get("cinemaid"));
					jsonArray.add(jsonObject);
				}
				resultJson.put("data", jsonArray);
			}else {
				MyMongo.mRequestFail(request, "查询首页影院风采展示信息不存在");
				return this.returnError(resultJson, ResMessage.Info_NoExist.code, request);
			}
		}catch(Exception e) {
			MyMongo.mErrorLog("查询首页影院风采展示信息失败", e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询首页影院风采展示信息成功", etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	@GET
	@POST
	@Path("/AjaxProvince")
	@Produces("html/text;charset=UTF-8")
	public String AjaxProvince(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		Map<String, Object> paramsMap = new HashMap<String, Object>();
			List<Map<String, Object>> resultList = cinemaDao.AjaxProvince(paramsMap);
			JSONArray jsonArray = new JSONArray();
			if(resultList != null && resultList.size() > 0) {
				for(int i = 0; i < resultList.size(); i++) {
					Map<String, Object> resultMap = resultList.get(i);
					JSONObject jsonObject = new JSONObject();
					jsonObject.put("id", resultMap.get("id"));
					jsonObject.put("provinceID", resultMap.get("provinceID"));
					jsonObject.put("province", resultMap.get("province"));
					jsonArray.add(jsonObject);
				}
				resultJson.put("data", jsonArray);
				
			}else {
				MyMongo.mRequestFail(request, "查询省份数据失败");
				return this.returnError(resultJson, ResMessage.Info_NoExist.code, request);
			}
	
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询省份数据成功", etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	
	@GET
	@POST
	@Path("/AjaxCity")
	@Produces("html/text;charset=UTF-8")
	public String AjaxCity(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		
		String fatherID = request.getParameter("provinceid");
	
		Map<String, Object> paramsMap = new HashMap<String, Object>();
		paramsMap.put("fatherID", fatherID);
		
		
			List<Map<String, Object>> resultList = cinemaDao.AjaxCity(paramsMap);
			JSONArray jsonArray = new JSONArray();
			if(resultList != null && resultList.size() > 0) {
				for(int i = 0; i < resultList.size(); i++) {
					Map<String, Object> resultMap = resultList.get(i);
					JSONObject jsonObject = new JSONObject();
					jsonObject.put("id", resultMap.get("id"));
					jsonObject.put("cityID", resultMap.get("cityID"));
					jsonObject.put("city", resultMap.get("city"));
					jsonArray.add(jsonObject);
				}
				resultJson.put("data", jsonArray);
				
			}else {
				MyMongo.mRequestFail(request, "查询地市数据失败");
				return this.returnError(resultJson, ResMessage.Info_NoExist.code, request);
			}
	
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询地市数据成功", etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	@GET
	@POST
	@Path("/AjaxArea")
	@Produces("html/text;charset=UTF-8")
	public String AjaxArea(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		
		String fatherID = request.getParameter("cityid");
		Map<String, Object> paramsMap = new HashMap<String, Object>();
		paramsMap.put("fatherID", fatherID);
		List<Map<String, Object>> resultList = cinemaDao.AjaxArea(paramsMap);
			JSONArray jsonArray = new JSONArray();
			if(resultList != null && resultList.size() > 0) {
				for(int i = 0; i < resultList.size(); i++) {
					Map<String, Object> resultMap = resultList.get(i);
					JSONObject jsonObject = new JSONObject();
					jsonObject.put("id", resultMap.get("id"));
					jsonObject.put("areaID", resultMap.get("areaID"));
					jsonObject.put("area", resultMap.get("area"));
					jsonArray.add(jsonObject);
				}
				resultJson.put("data", jsonArray);
				
			}else {
				MyMongo.mRequestFail(request, "查询区县数据失败");
				return this.returnError(resultJson, ResMessage.Info_NoExist.code, request);
			}
	
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询区县数据成功", etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	@GET
	@POST
	@Path("/AjaxAreaInfo")
	@Produces("html/text;charset=UTF-8")
	public String AjaxAreaInfo(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		Map<String, Object> searchInfo = new HashMap<String, Object>();
		List<String> provList = new ArrayList<String>();//限制查询省份
		if(Config.PROVINCE.length()>0){
			String[] province = Config.PROVINCE.split(",");
			for(int i=0;i<province.length;i++){
				provList.add(province[i]);
			}
			searchInfo.put("provinceID", JSONArray.fromObject(provList).toArray());
		}
		//查找省份信息
		List<Map<String, Object>> resultList = cinemaDao.AjaxProvince(searchInfo);
		JSONArray jsonArray = new JSONArray();
		if(resultList != null && resultList.size() > 0) {
			for(int i = 0; i < resultList.size(); i++) {
				Map<String, Object> resultMap = resultList.get(i);
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("value", resultMap.get("provinceID"));
				jsonObject.put("label", resultMap.get("province"));
				//查找城市信息
				Map<String, Object> cityMap = new HashMap<String, Object>();
				cityMap.put("fatherID", resultMap.get("provinceID"));
				List<Map<String, Object>> cityList = cinemaDao.AjaxCity(cityMap);
				JSONArray jsonArrayCity = new JSONArray();
				for(int j=0;j<cityList.size();j++){
					Map<String,Object> sonMap = cityList.get(j);
					Map<String,Object> cityResultMap = new HashMap<String, Object>();
					//查找区域信息
					Map<String, Object> areaMap = new HashMap<String, Object>();
					areaMap.put("fatherID", sonMap.get("cityID"));
					List<Map<String, Object>> areaList = cinemaDao.AjaxArea(areaMap);
					JSONArray jsonArrayArea = new JSONArray();
					for(int k=0;k<areaList.size();k++){
						Map<String,Object> sonAreaMap = areaList.get(k);
						if(sonAreaMap.get("area").equals("市辖区")){
						}else{
							Map<String,Object> areaResultMap = new HashMap<String,Object>();
							areaResultMap.put("value", sonAreaMap.get("areaID"));
							areaResultMap.put("label", sonAreaMap.get("area"));
							jsonArrayArea.add(areaResultMap);
						}
					}
					cityResultMap.put("value", sonMap.get("cityID"));
					cityResultMap.put("label", sonMap.get("city"));
					cityResultMap.put("children", jsonArrayArea);
					jsonArrayCity.add(cityResultMap);
				}
				jsonObject.put("children", jsonArrayCity);
				jsonArray.add(jsonObject);
			}
			resultJson.put("data", jsonArray);
			
		}else {
			MyMongo.mRequestFail(request, "查询地区数据失败");
			return this.returnError(resultJson, ResMessage.Info_NoExist.code, request);
		}
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询地区数据成功", etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
}
