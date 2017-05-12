package com.cp.rest.weix;

import javax.annotation.Resource;
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

import com.cp.bean.ResMessage;
import com.cp.filter.BaseServlet;
import com.cp.rest.product.dao.ProductDaoImpl;
import com.cp.rest.userinfo.LogInfoAdd;
import com.cp.rest.weix.redis.WeixRedisImpl;
import com.cp.rest.weix.tools.WxCouponsUtil;
import com.cp.util.CodeUtil;
import com.mongo.MyMongo;

import net.sf.json.JSONObject;

@Path("rest/coupons")
@NoCache
@Service
public class WxCoupons extends BaseServlet
{
	@Resource
	private ProductDaoImpl productDao;
	
	@Resource
	private LogInfoAdd logInfo;
	
	@Autowired
	private WeixRedisImpl weixRedis;
	
	/**
	 * 提交卡劵
	 */
	@GET
	@POST
	@Path("/subCoupons")
	@Produces("application/json;charset=UTF-8")
	public String subCoupons(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		
		String cardid = request.getParameter("cardid");
		String productid = request.getParameter("productid");
		String title = request.getParameter("title");
		String sub_title = request.getParameter("sub_title");
		String deal_detail = request.getParameter("deal_detail");
		String quantity = request.getParameter("quantity");
		String beginTime = request.getParameter("beginTime");
//		String endTime = request.getParameter("endTime");
		String expiry = request.getParameter("expiry"); // 有效期(天)
		String description = request.getParameter("description");
		String notice = request.getParameter("notice");
		
		if (CodeUtil.checkParam(productid))
		{
			MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
			return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
		}
		
		try
		{
			if(cardid == null){
				cardid = WxCouponsUtil.createCard(weixRedis.getAccessToken(), "GROUPON", title, sub_title, deal_detail, quantity, beginTime, expiry, description, notice);
				if(cardid == null){
					MyMongo.mRequestFail(request, ResMessage.Product_Createcoupons_Fail.code);
					return this.returnError(resultJson, ResMessage.Product_Createcoupons_Fail.code, request);
				}
				productDao.createCoupons(productid, cardid);
				logInfo.addLogInfo(request, "0", "创建商品[" + productDao.getProductName(Integer.parseInt(productid)) +"]的卡劵信息");
			}
		} catch (Exception e)
		{
			MyMongo.mErrorLog("提交卡劵", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("提交卡劵",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
}
