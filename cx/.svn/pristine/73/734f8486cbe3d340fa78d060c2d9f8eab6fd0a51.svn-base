package com.cx.rest.zone;

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
import com.cx.util.CodeUtil;
import com.mongo.MyMongo;
import com.ydp.servier.bean.DataMessage;
import com.ydp.servier.facade.IServiceZone;

import net.sf.json.JSONObject;

@Path("rest/zone")
@NoCache
@Service()
public class ZoneRest extends BaseServlet
{
	@Autowired
	private IServiceZone serviceZone;
	
	/**
	 * 城市播放指定影片的地区
	 */
	@GET
	@POST
	@Path("/movieArea")
	@Produces("text/html;charset=UTF-8")
	public String movieArea(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		
		String movieid = request.getParameter("movieid");
		String citycode = request.getParameter("citycode");
		
		try
		{
			if (CodeUtil.checkParam(movieid, citycode))
			{
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			
			DataMessage dataMessage = serviceZone.movieArea(movieid, citycode);
			if (dataMessage.isSuccess())
			{
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> data = (List<Map<String, Object>>) dataMessage.getData();
				resultJson.put("data", data);
			}
		} catch (Exception e)
		{
			MyMongo.mErrorLog("城市播放指定影片的地区", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("城市播放指定影片的地区",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
}
