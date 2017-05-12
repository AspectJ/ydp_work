package com.cx.rest.carousel;

import java.util.ArrayList;
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

import com.cx.bean.ResMessage;
import com.cx.filter.BaseServlet;
import com.cx.rest.carousel.dao.CarouselDaoImpl;
import com.cx.util.CodeUtil;
import com.mongo.MyMongo;

import net.sf.json.JSONObject;

/**
 * 轮播图
 */
@Path("rest/carousel")
@NoCache
@Service()
public class CarouselRest extends BaseServlet
{

	@Resource
	private CarouselDaoImpl carouselDao;
	
	/**
	 * 轮播图列表
	 */
	@GET
	@POST
	@Path("/carouselList")
	@Produces("text/html;charset=UTF-8")
	public String carouselList(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		
		String type = request.getParameter("type");
		
		try
		{
			if (CodeUtil.checkParam(type))
			{
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			
			List<Map<String, Object>> carouselList = carouselDao.carouselList(type);
			resultJson.put("data", carouselList);
		} catch (Exception e)
		{
			MyMongo.mErrorLog("轮播图列表", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("轮播图列表",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	
	/**
	 * 更新轮播图
	 */
	@GET
	@POST
	@Path("/updateCarousel")
	@Produces("text/html;charset=UTF-8")
	public String updateCarousel(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		
		String carouselUrl = request.getParameter("carouselUrl");
		String carousel_id = request.getParameter("carousel_id");
		Integer id = 0;
		if(!"".equals(carousel_id) && carousel_id != null){
			switch (carousel_id) {
			case "carousel_1":
				  id = 1;
				break;
			case "carousel_2":
				  id = 2;
				break;
			case "carousel_3":
				  id = 3;
				break;
			case "carousel_4":
				  id = 4;
				break;

			default:
				break;
			}
			
			try
			{
				Map<String,Object> updateMap = new HashMap<String,Object>();
				updateMap.put("org_path", carouselUrl);
				updateMap.put("imageid", id);
				Map<String,Object> resultMap = carouselDao.updateCarousel(updateMap);
				resultJson.put("data", resultMap);
			} catch (Exception e)
			{
				MyMongo.mErrorLog("轮播图列表", request, e);
				return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
			}
		}else{
			String firstUrl = request.getParameter("firstUrl");
			String secondUrl = request.getParameter("secondUrl");
			String thirdUrl = request.getParameter("thirdUrl");
			String fourthUrl = request.getParameter("fourthUrl");
			List<String> list  = new ArrayList<String>();
			list.add(firstUrl);
			list.add(secondUrl);
			list.add(thirdUrl);
			list.add(fourthUrl);
			for(int i=0;i<list.size();i++){
				Map<String,Object> updateMap = new HashMap<String,Object>();
				id = i+1;
				System.out.println("url:"+list.get(i)+",id:"+id);
				updateMap.put("org_path", list.get(i));
				updateMap.put("imageid", id);
				carouselDao.updateCarousel(updateMap);
			}
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("轮播图列表",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
}
