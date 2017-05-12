package com.cp.rest.userinfo;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
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

import com.cp.bean.ResMessage;
import com.cp.filter.BaseServlet;
import com.cp.rest.userinfo.dao.MenuInfoDaoImpl;
import com.cp.rest.userinfo.dao.RoleInfoDaoImpl;
import com.cp.rest.userinfo.redis.UserRedisImpl;
import com.cp.util.CodeUtil;
import com.cp.util.Permission;
import com.mongo.MyMongo;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Path("rest/menu")
@NoCache
@Service()
public class MenuInfoRest extends BaseServlet
{
	
	@Resource
	private MenuInfoDaoImpl menuInfoDao;
	@Resource
	private RoleInfoDaoImpl roleInfoDao;
	@Resource
	private LogInfoAdd logInfo;
	@Resource
	private UserRedisImpl userRedis;
	/**
	 * 新增菜单信息
	 * @throws UnsupportedEncodingException 
	 */
	@GET
	@POST
	@Path("/addMenu")
	@Produces("text/html;charset=UTF-8")
	public String addMenu(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String menuname = URLDecoder.decode(request.getParameter("menuname"), "UTF-8");
		String partentid = request.getParameter("partentid")==null || request.getParameter("partentid").equals("null") ? "0" : request.getParameter("partentid");
		String requesturl = URLDecoder.decode(request.getParameter("requesturl"), "UTF-8");
		String sortno = request.getParameter("sortno")==null || request.getParameter("sortno").equals("") ? "0" : request.getParameter("sortno");
		String menutype = request.getParameter("menutype");
		try{
			if(!privilegeCheck(request, Permission.addMenu, userRedis)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
				return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
			}
			
			if (CodeUtil.checkParam(menuname)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			Map<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("menuname", menuname);
			paramMap.put("partentid", Integer.parseInt(partentid));
			paramMap.put("menutype", Integer.parseInt(menutype));
			paramMap.put("requesturl", requesturl);
			paramMap.put("sortno", Integer.parseInt(sortno));
			List<Map<String, Object>> resultMenuList = menuInfoDao.checkRepeatMenuName(paramMap);
			if(resultMenuList.size()>0){
				MyMongo.mRequestFail(request,"不能重复添加权限信息");
				return this.returnError(resultJson, ResMessage.Commit_Repeat_Fail.code, request);
			}else{
				paramMap.put("menuid", "");
				Map<String, Object> resultMap = menuInfoDao.insertMenu(paramMap);
				//给系统内置权限自动加入权限
				Map<String,Object> searchInfo = new HashMap<String, Object>();
				List<Integer> list = new ArrayList<Integer>();
				list.add(3);
				searchInfo.put("roletype", JSONArray.fromObject(list).toArray());
				List<Map<String, Object>> resultList = roleInfoDao.getRoleInfo(searchInfo);
				String menuid = resultMap.get("menuid").toString();
				searchInfo.put("menuid", Integer.parseInt(menuid));
				for(int i =0;i<resultList.size();i++){
					Map<String, Object> map = resultList.get(i);
					searchInfo.put("roleid", Integer.parseInt(map.get("roleid").toString()));
					menuInfoDao.insertRolePer(searchInfo);
				}
				JSONObject data = new JSONObject();
				data.put("menuid", resultMap.get("menuid"));
				resultJson.put("data", data);
			}
			
		} catch (Exception e){
			MyMongo.mErrorLog("新增菜单信息失败", request, e);
			return this.returnError(resultJson, ResMessage.Add_Info_Fail.code, request);
		}
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("新增菜单信息成功",  etime - stime, request, resultJson);
		String logContent = "新增菜单信息["+menuname+"]";
		logInfo.addLogInfo(request, "0", logContent);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 修改菜单信息
	 * @throws UnsupportedEncodingException 
	 */
	@GET
	@POST
	@Path("/updateMenu")
	@Produces("text/html;charset=UTF-8")
	public String updateMenu(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String menuid = request.getParameter("menuid");
		String menuname = URLDecoder.decode(request.getParameter("menuname"), "UTF-8");
		String partentid = request.getParameter("partentid")==null || request.getParameter("partentid").equals("null") ? "0" : request.getParameter("partentid");
		String requesturl = URLDecoder.decode(request.getParameter("requesturl"), "UTF-8");
		String sortno = request.getParameter("sortno")==null || request.getParameter("sortno").equals("") ? "0" : request.getParameter("sortno");
		try{
			if(!privilegeCheck(request, Permission.updateMenu, userRedis)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
				return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
			}
			
			if (CodeUtil.checkParam(menuid)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			Map<String,Object> paramMap = new HashMap<String, Object>();
			paramMap.put("menuid", Integer.parseInt(menuid));
			paramMap.put("menuname", menuname);
			paramMap.put("partentid", Integer.parseInt(partentid));
			paramMap.put("requesturl", requesturl);
			paramMap.put("sortno", Integer.parseInt(sortno));
			Map<String, Object> resultMenu = menuInfoDao.getMenu(paramMap);
			if(resultMenu != null){//查询到信息
				MyMongo.mRequestFail(request,"不能重复删除权限信息");
				return this.returnError(resultJson, ResMessage.Commit_Repeat_Fail.code, request);
			}else{
				Map<String, Object> resultMap = menuInfoDao.updateMenu(paramMap);
				JSONObject data = new JSONObject();
				data.put("menuid", resultMap.get("menuid"));
				resultJson.put("data", data);
			}
		} catch (Exception e){
			MyMongo.mErrorLog("修改菜单信息失败", request, e);
			return this.returnError(resultJson, ResMessage.Update_Info_Fail.code, request);
		}
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("修改菜单信息成功",  etime - stime, request, resultJson);
		String logContent = "修改菜单信息["+menuname+"]";
		logInfo.addLogInfo(request, "0", logContent);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 删除菜单信息
	 * @throws UnsupportedEncodingException 
	 */
	@GET
	@POST
	@Path("/deleteMenu")
	@Produces("text/html;charset=UTF-8")
	public String deleteMenu(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String menuid = request.getParameter("menuid");//菜单ID
		try{
			if(!privilegeCheck(request, Permission.deleteMenu, userRedis)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
				return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
			}
			
			if (CodeUtil.checkParam(menuid)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("menuid", Integer.parseInt(menuid));
			Map<String, Object> resultMenu = menuInfoDao.getMenu(paramMap);
			if(resultMenu != null){//查询到信息
				menuInfoDao.deleteMenuSon(paramMap);//删除子菜单
				menuInfoDao.deleteRolePer(paramMap);//删除菜单权限
				menuInfoDao.deleteMenu(paramMap);//删除菜单
				JSONObject data = new JSONObject();
				data.put("menuid", menuid);
				resultJson.put("data", data);
			}else{
				MyMongo.mRequestFail(request,"不能重复删除权限信息");
				return this.returnError(resultJson, ResMessage.Commit_Repeat_Fail.code, request);
			}
		} catch (Exception e){
			MyMongo.mErrorLog("删除菜单信息失败", request, e);
			return this.returnError(resultJson, ResMessage.Delete_Info_Fail.code, request);
		}
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("删除菜单信息成功",  etime - stime, request, resultJson);
		String logContent = "删除菜单信息["+menuid+"]";
		logInfo.addLogInfo(request, "0", logContent);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 查看菜单信息下是否有子菜单
	 */
	@GET
	@POST
	@Path("/getMenuSon")
	@Produces("text/html;charset=UTF-8")
	public String getMenuSon(@Context HttpServletRequest request, @Context HttpServletResponse response){
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String menuid = request.getParameter("menuid");
		String search = request.getParameter("search");
		try{
			if (CodeUtil.checkParam(menuid)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("menuid", Integer.parseInt(menuid));
			if(!CodeUtil.checkParam(search)){
				search = URLDecoder.decode(search, "UTF-8");
				paramMap.put("search", "%" + search + "%");
			}
			List<Map<String, Object>> resultList = menuInfoDao.getMenuSonByPartent(paramMap);
			resultJson.put("total", resultList.size());
			JSONArray jsonArray = new JSONArray();
			if(resultList != null && resultList.size() > 0){
				for(int i=0;i<resultList.size();i++){
					Map<String, Object> resultMap = resultList.get(i);
					JSONObject data = new JSONObject();
					data.put("menuid", resultMap.get("menuid"));
					data.put("menuname", resultMap.get("menuname"));
					data.put("partentid", resultMap.get("partentid"));
					data.put("requesturl", resultMap.get("requesturl"));
					data.put("sortno", resultMap.get("sortno"));
					jsonArray.add(data);
				}
				resultJson.put("data", jsonArray);
			}
		} catch (Exception e){
			MyMongo.mErrorLog("查询菜单信息子菜单失败", request, e);
			return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request);
		}
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询菜单信息子菜单成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 查看菜单信息
	 */
	@GET
	@POST
	@Path("/getMenu")
	@Produces("text/html;charset=UTF-8")
	public String getMenu(@Context HttpServletRequest request, @Context HttpServletResponse response){
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String menuid = request.getParameter("menuid");
		try{
			if (CodeUtil.checkParam(menuid)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("menuid", Integer.parseInt(menuid));
			Map<String, Object> resultMap = menuInfoDao.getMenu(paramMap);
			JSONObject data = new JSONObject();
			if(resultMap != null && resultMap.size() > 0){
				data.put("menuid", resultMap.get("menuid"));
				data.put("menuname", resultMap.get("menuname"));
				data.put("partentid", resultMap.get("partentid"));
				data.put("requesturl", resultMap.get("requesturl"));
				data.put("sortno", resultMap.get("sortno"));
				data.put("menutype", resultMap.get("menutype"));
				resultJson.put("data", data);
			}else{
				MyMongo.mRequestFail(request, "查询菜单信息不存在");
				return this.returnError(resultJson, ResMessage.Select_Info_NotExist.code, request);
			}
		} catch (Exception e){
			MyMongo.mErrorLog("查询菜单信息失败", request, e);
			return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request);
		}
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询菜单信息成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 查看菜单信息列表
	 */
	@GET
	@POST
	@Path("/getMenuList")
	@Produces("text/html;charset=UTF-8")
	public String getMenuList(@Context HttpServletRequest request, @Context HttpServletResponse response){
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String userid = String.valueOf(request.getAttribute("userid"));
		List<String> userFeilds = userRedis.getUserField(userid, "roletype".getBytes(), "theaternum".getBytes(),"username".getBytes());
		if(userFeilds != null){
			
			if(!privilegeCheck(request, Permission.menuInfo, userRedis)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
				return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
			}
			
			//分页参数、条件查询参数
			String pagesize = request.getParameter("pagesize");//每页多少条数据
			String page = request.getParameter("page");//page＝（当前页数－1）*pagesize
			try{
				String search = URLDecoder.decode(request.getParameter("search"), "UTF-8");
				Map<String, Object> searchInfo = new HashMap<String, Object>();
				searchInfo.put("pageSize", Integer.parseInt(pagesize));
				searchInfo.put("offsetNum", Integer.parseInt(pagesize) * (Integer.parseInt(page) - 1));
				if(!CodeUtil.checkParam(search)){
					searchInfo.put("search", "%" + search + "%");
				}
				searchInfo.put("menutype", Integer.parseInt("0"));
				Map<String, Object> countMap = menuInfoDao.getMenuListCount(searchInfo);
				String count = countMap.get("count").toString();
				List<Map<String, Object>> resultList = menuInfoDao.getMenuList(searchInfo);
				JSONArray jsonArray = new JSONArray();
				if(resultList != null && resultList.size() > 0){
					for(int i=0;i<resultList.size();i++){
						Map<String, Object> resultMap = resultList.get(i);
						JSONObject data = new JSONObject();
						data.put("menuid", resultMap.get("menuid"));
						data.put("menuname", resultMap.get("menuname"));
						data.put("partentid", resultMap.get("partentid"));
						data.put("requesturl", resultMap.get("requesturl"));
						data.put("sortno", resultMap.get("sortno"));
						jsonArray.add(data);
					}
					resultJson.put("total", count);
					resultJson.put("current", page);
					resultJson.put("data", jsonArray);
				}else{
					MyMongo.mRequestFail(request, "查询菜单信息列表不存在");
					return this.returnError(resultJson, ResMessage.Select_Info_NotExist.code, request);
				}
			} catch (Exception e){
				MyMongo.mErrorLog("查询菜单信息列表失败", request, e);
				return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request);
			}
			
			// -------------------------------------------------------------------------------
			long etime = System.currentTimeMillis();
			MyMongo.mRequestLog("查询菜单信息列表成功",  etime - stime, request, resultJson);
			return this.response(resultJson, request);
		}else{
			MyMongo.mRequestFail(request, "登录超时");
			return this.returnError(resultJson, ResMessage.User_Login_TimeOut.code, request);
		}
	}
	
	
	/**
	 * 查看菜单信息列表
	 */
	@GET
	@POST
	@Path("/getMenuInfo")
	@Produces("text/html;charset=UTF-8")
	public String getMenuInfo(@Context HttpServletRequest request, @Context HttpServletResponse response){
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		try{
			String search = request.getParameter("search");
			Map<String, Object> searchInfo = new HashMap<String, Object>();
			searchInfo.put("menutype", Integer.parseInt("0"));
			if(!CodeUtil.checkParam(search)){
				search = URLDecoder.decode(search, "UTF-8");
				searchInfo.put("search", "%" + search + "%");
			}
			List<Map<String, Object>> resultList = menuInfoDao.getMenuInfoByType(searchInfo);
			JSONArray jsonArray = new JSONArray();
			if(resultList != null && resultList.size() > 0){
				for(int i=0;i<resultList.size();i++){
					Map<String, Object> resultMap = resultList.get(i);
					JSONObject data = new JSONObject();
					data.put("menuid", resultMap.get("menuid"));
					data.put("menuname", resultMap.get("menuname"));
					data.put("partentid", resultMap.get("partentid"));
					data.put("requesturl", resultMap.get("requesturl"));
					data.put("sortno", resultMap.get("sortno"));
					jsonArray.add(data);
				}
				resultJson.put("data", jsonArray);
			}else{
				MyMongo.mRequestFail(request, "查询菜单信息下拉列表不存在");
				return this.returnError(resultJson, ResMessage.Select_Info_NotExist.code, request);
			}
		} catch (Exception e){
			MyMongo.mErrorLog("查询菜单信息下拉列表失败", request, e);
			return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request);
		}
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询菜单信息下拉列表成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 分配权限列表
	 */
	@GET
	@POST
	@Path("/assignMenu")
	@Produces("text/html;charset=UTF-8")
	public String assignMenu(@Context HttpServletRequest request, @Context HttpServletResponse response){
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		try{
			String userid = String.valueOf(request.getAttribute("userid"));
			List<String> userFeilds = userRedis.getUserField(userid, "roletype".getBytes(), "theaternum".getBytes(),"username".getBytes(), "roleid".getBytes());
			
			Map<String, Object> searchInfo = new HashMap<String, Object>();
			searchInfo.put("menutype", Integer.parseInt("0"));
			searchInfo.put("roleid", userFeilds.get(3));
			if(!privilegeCheck(request, Permission.rolePermission, userRedis)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
				return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
			}
			
			if(userFeilds != null){
				String roletype = userFeilds.get(0);
				if(!roletype.equals("3")){
					searchInfo.put("url", "%enu%");
				}
			}
			
			List<Map<String, Object>> resultList = menuInfoDao.getMenuInfo(searchInfo);
			JSONArray jsonArray = new JSONArray();
			if(resultList != null && resultList.size() > 0){
				for(int i=0;i<resultList.size();i++){
					Map<String, Object> resultMap = resultList.get(i);
					JSONObject data = new JSONObject();
					data.put("menuid", resultMap.get("menuid"));
					data.put("menuname", resultMap.get("menuname"));
					data.put("menutype", resultMap.get("menutype"));
					searchInfo.put("menuid", resultMap.get("menuid"));
					List<Map<String,Object>> sonList = menuInfoDao.getMenuSon(searchInfo);
					JSONArray jsonArraySon = new JSONArray();
					for(int j=0;j<sonList.size();j++){
						Map<String,Object> sonMap = sonList.get(j);
						jsonArraySon.add(sonMap);
					}
					data.put("show", jsonArraySon);
					jsonArray.add(data);
				}
				resultJson.put("data", jsonArray);
			}else{
				MyMongo.mRequestFail(request, "查询菜单信息下拉列表不存在");
				return this.returnError(resultJson, ResMessage.Select_Info_NotExist.code, request);
			}
		} catch (Exception e){
			MyMongo.mErrorLog("查询菜单信息下拉列表失败", request, e);
			return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request);
		}
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询菜单信息下拉列表成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	
	/**
	 * 分配权限列表
	 */
	@GET
	@POST
	@Path("/assignMenuBySelf")
	@Produces("text/html;charset=UTF-8")
	public String assignMenuBySelf(@Context HttpServletRequest request, @Context HttpServletResponse response){
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		try{
			Map<String, Object> searchInfo = new HashMap<String, Object>();
			searchInfo.put("menutype", Integer.parseInt("0"));
			searchInfo.put("partentid", Integer.parseInt("0"));
			String userid = String.valueOf(request.getAttribute("userid"));
			List<String> userFeilds = userRedis.getUserField(userid, "roletype".getBytes(), "theaternum".getBytes(),"roleid".getBytes());
			
			if(!privilegeCheck(request, Permission.rolePermission, userRedis)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
				return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
			}
			String roletype = "";
			if(userFeilds != null){
				roletype = userFeilds.get(0);
				searchInfo.put("roleid", userFeilds.get(2));
			}else{
				MyMongo.mRequestFail(request, ResMessage.User_Login_TimeOut.code);
				return this.returnError(resultJson, ResMessage.User_Login_TimeOut.code, request);
			}
			
			if(roletype.equals("3")){
				List<Map<String, Object>> resultList = menuInfoDao.getMenuInfo(searchInfo);
				JSONArray jsonArray = new JSONArray();
				if(resultList != null && resultList.size() > 0){
					for(int i=0;i<resultList.size();i++){
						Map<String, Object> resultMap = resultList.get(i);
						JSONObject data = new JSONObject();
						data.put("menuid", resultMap.get("menuid"));
						data.put("menuname", resultMap.get("menuname"));
						data.put("menutype", resultMap.get("menutype"));
						searchInfo.put("menuid", resultMap.get("menuid"));
						List<Map<String,Object>> sonList = menuInfoDao.getMenuSon(searchInfo);
						JSONArray jsonArraySon = new JSONArray();
						for(int j=0;j<sonList.size();j++){
							Map<String,Object> sonMap = sonList.get(j);
							jsonArraySon.add(sonMap);
						}
						data.put("show", jsonArraySon);
						jsonArray.add(data);
					}
					resultJson.put("data", jsonArray);
				}else{
					MyMongo.mRequestFail(request, "查询菜单信息下拉列表不存在");
					return this.returnError(resultJson, ResMessage.Select_Info_NotExist.code, request);
				}
			}else{
				List<Map<String, Object>> resultList = menuInfoDao.getRolePerList(searchInfo);
				JSONArray jsonArray = new JSONArray();
				if(resultList != null && resultList.size() > 0){
					for(int i=0;i<resultList.size();i++){
						Map<String, Object> resultMap = resultList.get(i);
						JSONObject data = new JSONObject();
						data.put("menuid", resultMap.get("menuid"));
						data.put("menuname", resultMap.get("menuname"));
						data.put("menutype", resultMap.get("menutype"));
						searchInfo.put("partentid", Integer.parseInt(resultMap.get("menuid").toString()));
						List<Map<String,Object>> sonList = menuInfoDao.getRolePerList(searchInfo);
						JSONArray jsonArraySon = new JSONArray();
						for(int j=0;j<sonList.size();j++){
							Map<String,Object> sonMap = sonList.get(j);
							jsonArraySon.add(sonMap);
						}
						data.put("show", jsonArraySon);
						jsonArray.add(data);
					}
					resultJson.put("data", jsonArray);
				}else{
					MyMongo.mRequestFail(request, "查询菜单信息下拉列表不存在");
					return this.returnError(resultJson, ResMessage.Select_Info_NotExist.code, request);
				}
			}
		} catch (Exception e){
			MyMongo.mErrorLog("查询菜单信息下拉列表失败", request, e);
			return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request);
		}
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询菜单信息下拉列表成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	
	
	/**
	 * 获取角色已经授权的菜单权限
	 */
	@GET
	@POST
	@Path("/getChooseMenu")
	@Produces("text/html;charset=UTF-8")
	public String getChooseMenu(@Context HttpServletRequest request, @Context HttpServletResponse response){
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String roleid = request.getParameter("roleid");
		try{
			Map<String, Object> searchInfo = new HashMap<String, Object>();
			searchInfo.put("roleid", Integer.parseInt(roleid));
			List<Map<String, Object>> resultList = menuInfoDao.getRolePerList(searchInfo);
			JSONArray jsonArray = new JSONArray();
			for(int i=0;i<resultList.size();i++){
				Map<String, Object> resultMap = resultList.get(i);
				jsonArray.add(resultMap);
			}
			resultJson.put("data", jsonArray);
		} catch (Exception e){
			MyMongo.mErrorLog("查询角色已分配的权限失败", request, e);
			return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request);
		}
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询菜单信息下拉列表成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 分配权限操作
	 */
	@GET
	@POST
	@Path("/assignRoleMenu")
	@Produces("text/html;charset=UTF-8")
	public String assignRoleMenu(@Context HttpServletRequest request, @Context HttpServletResponse response){
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String roleid = request.getParameter("roleid");
		String menuids = request.getParameter("menuids");
		try{
			
			if(!privilegeCheck(request, Permission.rolePermission, userRedis)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
				return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
			}
			
			Map<String, Object> searchInfo = new HashMap<String, Object>();
			searchInfo.put("roleid", Integer.parseInt(roleid));
			//先删除不存在于此次选择的权限
			String[] menuid = menuids.split(",");
			List<Integer> list = new ArrayList<Integer>();
			for(int i=0;i<menuid.length;i++){
				list.add(Integer.parseInt(menuid[i]));
			}
			searchInfo.put("menuid", JSONArray.fromObject(list).toArray());
			menuInfoDao.deleteRoleMenu(searchInfo);
			//查找已存在的权限并去重
			List<Map<String, Object>> resultList = menuInfoDao.getRolePerList(searchInfo);
			for(int i=0;i<menuid.length;i++){
				String id = menuid[i];
				boolean flag = false;
				for(int j=0;j<resultList.size();j++){
					Map<String,Object> resultMap = resultList.get(j);
					String p_menuid = resultMap.get("menuid").toString();
					if(id.equals(p_menuid)){
						flag = true;
						break;
					}
				}
				if(flag == false){//添加新权限
					Map<String,Object> map = new HashMap<String, Object>();
					map.put("roleid", Integer.parseInt(roleid));
					map.put("menuid", Integer.parseInt(id));
					menuInfoDao.insertRolePer(map);
				}
			}
		} catch (Exception e){
			MyMongo.mErrorLog("分配权限失败", request, e);
			return this.returnError(resultJson, ResMessage.Assign_RoleMenu_Fail.code, request);
		}
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("分配权限成功",  etime - stime, request, resultJson);
		String logContent = "分配权限["+roleid+"]";
		logInfo.addLogInfo(request, "0", logContent);
		return this.response(resultJson, request);
	}
	
	
}
