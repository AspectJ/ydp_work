package com.cp.rest.theater;

import java.io.UnsupportedEncodingException;
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
import com.cp.rest.theater.dao.TheaterDaoImpl;
import com.cp.util.CodeUtil;
import com.mongo.MyMongo;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Path("rest/theater")
@NoCache
@Service()
public class TheaterInfoRest extends BaseServlet
{

	@Resource(name = "theaterDao")
	private TheaterDaoImpl theaterDao;

	@GET
	@POST
	@Path("/getTheaterList")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public String getTheaterList(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		try
		{
			Map<String, Object> paramsMap = new HashMap<String, Object>();
			if (!CodeUtil.checkParam(request.getParameter("filter")))
			{
				String theater_filter = new String(request.getParameter("filter").getBytes("iso-8859-1"), "utf-8");
				paramsMap.put("filter", theater_filter);
			}
			List<Map<String, Object>> resultList = theaterDao.getTheaterList(paramsMap);
			JSONArray jsonArray = new JSONArray();
			for (int i = 0; i < resultList.size(); i++)
			{
				Map<String, Object> resultMap = resultList.get(i);
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("theaterid", resultMap.get("theaterid"));
				jsonObject.put("theaternum", resultMap.get("theaternum"));
				jsonObject.put("theatername", resultMap.get("theatername"));
				jsonArray.add(jsonObject);
			}
			resultJson.put("data", jsonArray);
		} catch (Exception e)
		{
			MyMongo.mErrorLog("查询影院列表信息失败", request, e);
			return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request);
		}

		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询影院列表信息成功", etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
}