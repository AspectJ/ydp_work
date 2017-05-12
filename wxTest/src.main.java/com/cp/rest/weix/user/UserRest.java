package com.cp.rest.weix.user;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
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
import org.junit.Test;
import org.springframework.stereotype.Service;

import com.cp.bean.ResMessage;
import com.cp.filter.BaseServlet;
import com.cp.rest.weix.WxLoginRest;
import com.cp.rest.weix.user.dao.UserDaoImpl;
import com.cp.util.CodeUtil;
import com.mongo.MyMongo;

import jxl.common.Logger;
import net.sf.json.JSONObject;

@Path("rest/user")
@NoCache
@Service("user")
public class UserRest extends BaseServlet{
	
	@Resource(name="userDao")
	private UserDaoImpl userDao;
	
	private Logger logger = Logger.getLogger(UserRest.class);
	/**
	 * 注册
	 */
	@GET
	@POST
	@Path("/regist")
	@Produces("text/html;charset=UTF-8")
	public String regist(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		
		String nickname = URLDecoder.decode(request.getParameter("nickname"), "utf-8");
		String unionid = URLDecoder.decode(request.getParameter("unionid"), "utf-8");
		String mobile = request.getParameter("mobile");
		String sex = URLDecoder.decode(request.getParameter("sex"), "utf-8");
		String cinemaname = URLDecoder.decode(request.getParameter("cinemaname"), "utf-8");
		try
		{
			if (CodeUtil.checkParam(nickname, unionid, mobile, sex, cinemaname))
			{
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			
			Map<String, Object> user = new HashMap<String, Object>();
			user.put("nickname", nickname);
			user.put("unionid", unionid);
			user.put("mobile", mobile);
			user.put("sex", sex);
			user.put("cinemaname", cinemaname);
			userDao.regist(user);
			
			String ticket = WxLoginRest.httpGet("http://www.yiyutao.net.ngrok.cc/wxDemo/rest/getTicket");
			resultJson.put("data", user);
			resultJson.put("ticket", ticket);
		} catch (Exception e)
		{
			MyMongo.mErrorLog("注册失败", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("注册成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 查询用户是否已关注公众号(扫描公众号二维码)
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public Boolean isConcernAccounts(String unionid) {
		
		Boolean flag = false;
		Map<String, Object> userMap = userDao.getConcernUser(unionid);
		
		if(userMap != null && userMap.size() > 0) {
			flag = true;
		}
		return flag;
	}
	
	
	/**
	 * 查询用户是否已注册
	 * @param request
	 * @param response
	 * @return
	 */
	public Boolean isRegist(String unionid) {
		Boolean flag = false;
		
		Map<String, Object> userMap = userDao.getUserInfo(unionid);
		if(userMap != null && userMap.size() > 0) {
			flag = true;
		}
		return flag;

	}
	
	
}
