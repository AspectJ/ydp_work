package com.cx.rest.information;

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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cx.bean.ResMessage;
import com.cx.filter.BaseServlet;
import com.cx.rest.information.dao.AdminInfoDaoImpl;
import com.cx.rest.information.dao.MaterialInfoDaoImpl;
import com.cx.util.CodeUtil;
import com.mongo.MyMongo;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Path("rest/material")
@NoCache
@Service()
public class MaterialInfoRest extends BaseServlet
{
	
	@Resource
	private MaterialInfoDaoImpl materialDao;
	@Autowired
	private AdminInfoDaoImpl adminInfoDao;
	
	/**
	 * 新增素材信息
	 * @throws UnsupportedEncodingException 
	 */
	@GET
	@POST
	@Path("/addMaterial")
	@Produces("text/html;charset=UTF-8")
	public String addMaterial(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------

		
		String material_name = URLDecoder.decode(request.getParameter("material_name"), "UTF-8");
		String material_content = URLDecoder.decode(request.getParameter("material_content"), "UTF-8");
//		String download_url = URLDecoder.decode(request.getParameter("download_url"), "UTF-8");
//		String fetch_code = URLDecoder.decode(request.getParameter("fetch_code"), "UTF-8");
//		String remark = URLDecoder.decode(request.getParameter("remark"), "UTF-8");
		String adminid = URLDecoder.decode(request.getParameter("adminid"), "UTF-8");
		String cinemaid = URLDecoder.decode(request.getParameter("cinemaid"),"UTF-8");
		
		try{
			if (CodeUtil.checkParam(material_name)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			Map<String,Object> adminMap = new HashMap<String,Object>();
			adminMap.put("adminid", Integer.parseInt(adminid));
			Map<String,Object> resultMap_admin = adminInfoDao.selAdminById(adminMap);
		    String adminname = (String) resultMap_admin.get("adminname");
		    
			Map<String, Object> materialMap = new HashMap<String, Object>();
			materialMap.put("material_name", material_name);
			materialMap.put("material_content", material_content);
			materialMap.put("delete_flag", Integer.parseInt("0"));
			materialMap.put("author", adminname);
			materialMap.put("brows_times", Integer.parseInt("1"));
			materialMap.put("cinemaid", Integer.parseInt(cinemaid));
			Map<String, Object> resultMap = materialDao.insertMaterial(materialMap);
			JSONObject data = new JSONObject();
			data.put("material_id", resultMap.get("material_id"));
			data.put("material_name", resultMap.get("material_name"));
			data.put("material_content", resultMap.get("material_content"));
			data.put("delete_flag", resultMap.get("delete_flag"));
			data.put("author", resultMap.get("author"));
			data.put("brows_times", resultMap.get("brows_times"));
			data.put("cinemaid", resultMap.get("cinemaid"));
			data.put("audit_flag", "0");
			data.put("create_time", new SimpleDateFormat("yyyy-MM-dd HH:mm").format(new Date()));
			resultJson.put("data", data);
			
		} catch (Exception e){
			MyMongo.mErrorLog("新增素材信息", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("新增素材信息",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	
	/**
	 * 修改素材信息
	 * @throws UnsupportedEncodingException 
	 */
	@GET
	@POST
	@Path("/updateMaterial")
	@Produces("text/html;charset=UTF-8")
	public String updateMaterial(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		String material_id = request.getParameter("material_id");
		String material_name = URLDecoder.decode(request.getParameter("material_name"), "UTF-8");
//		String download_url = request.getParameter("download_url");
//		String fetch_code = request.getParameter("fetch_code");
//		String remark = request.getParameter("remark");
		String material_content = URLDecoder.decode(request.getParameter("material_content"), "UTF-8");
		String adminid = URLDecoder.decode(request.getParameter("adminid"), "UTF-8");
	

		try{
			if (CodeUtil.checkParam(material_name)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			Map<String,Object> adminMap = new HashMap<String,Object>();
			adminMap.put("adminid", Integer.parseInt(adminid));
			Map<String,Object> resultMap_admin = adminInfoDao.selAdminById(adminMap);
		    String adminname = (String) resultMap_admin.get("adminname");
			Map<String, Object> MaterialMap = new HashMap<String, Object>();
			MaterialMap.put("material_id", Integer.parseInt(material_id));
			MaterialMap.put("material_name", material_name);
			MaterialMap.put("material_content", material_content);
			MaterialMap.put("update_time", new Date());
			MaterialMap.put("author", adminname);
			Map<String, Object> resultMap = materialDao.updateMaterial(MaterialMap);
			JSONObject data = new JSONObject();
			data.put("material_id", resultMap.get("material_id"));
			resultJson.put("data", data);
			
		} catch (Exception e){
			MyMongo.mErrorLog("修改素材信息", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("修改素材信息",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 审核过程
	 */
	@GET
	@POST
	@Path("/updateMaterial_Audit")
	@Produces("text/html;charset=UTF-8")
	public String updateMaterial_Audit(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		String material_id = request.getParameter("material_id");
		String audit_flag = request.getParameter("audit_flag");
		String adminid = request.getParameter("admin_id")==null || request.getParameter("admin_id").equals("") ? "0" : request.getParameter("admin_id");
		
		Map<String, Object> updateMap = new HashMap<String, Object>();
		if(!adminid.equals("0")){//再次查询是否具备权限
			updateMap.put("adminid", Integer.parseInt(adminid));
			Map<String, Object> resultMap = adminInfoDao.selSingleAdmin(updateMap);
			if(resultMap != null){
				String audit = resultMap.get("audit_flag").toString();
				if(audit.equals("1")){//可以审核
					updateMap.put("audit_flag", audit_flag);
				    updateMap.put("material_id", Integer.parseInt(material_id));
				}else{
					return this.returnError(resultJson, ResMessage.User_Lack_Privilege.code, request);
				}
			}else{
				return this.returnError(resultJson, ResMessage.User_Lack_Privilege.code, request);
			}
		}else{
			updateMap.put("audit_flag", audit_flag);
		    updateMap.put("material_id", Integer.parseInt(material_id));
		}

		materialDao.updateMaterial_Audit(updateMap);
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("审核事务结束", etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	/**
	 * 删除素材信息
	 */
	@GET
	@POST
	@Path("/deleteMaterial")
	@Produces("text/html;charset=UTF-8")
	public String deleteMaterial(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		String material_id = request.getParameter("material_id");//活动ID
		try{
			if (CodeUtil.checkParam(material_id)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			
			Map<String, Object> materialMap = new HashMap<String, Object>();
			materialMap.put("material_id", Integer.parseInt(material_id));
			materialDao.deleteMaterial(materialMap);
			JSONObject data = new JSONObject();
			data.put("material_id", material_id);
			resultJson.put("data", data);
			
		} catch (Exception e){
			MyMongo.mErrorLog("删除素材信息", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("删除素材信息",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 批量删除素材信息
	 * @throws UnsupportedEncodingException 
	 */
	@GET
	@POST
	@Path("/deleteMaterials")
	@Produces("text/html;charset=UTF-8")
	public String deleteMaterials(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		String material_id = request.getParameter("material_id");//通知ID
		System.out.println(material_id);
		try{
			if (CodeUtil.checkParam(material_id)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			String[] material_ids = material_id.split(",");
			
			for(int i=0;i<material_ids.length;i++){
				String materialid = material_ids[i];
				Map<String, Object> materialMap = new HashMap<String, Object>();
				materialMap.put("material_id", Integer.parseInt(materialid));
				materialDao.deleteMaterial(materialMap);
			}
			
			
			JSONObject data = new JSONObject();
			data.put("material_id", material_id);
			resultJson.put("data", data);
			
		} catch (Exception e){
			MyMongo.mErrorLog("删除素材信息失败", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("删除素材信息成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	/**
	 * 查看素材信息
	 */
	@GET
	@POST
	@Path("/getMaterial")
	@Produces("text/html;charset=UTF-8")
	public String getMaterial(@Context HttpServletRequest request, @Context HttpServletResponse response){
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		String material_id = request.getParameter("material_id");
		try{
			if (CodeUtil.checkParam(material_id)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			Map<String, Object> materialInfo = new HashMap<String, Object>();
			materialInfo.put("material_id", Integer.parseInt(material_id));
			
			//----------------------更新素材的点击量--------------------------------------
	//		materialDao.updateBrowsTimes(materialInfo);
			Map<String, Object> resultMap = materialDao.getMaterial(materialInfo);
			JSONObject data = new JSONObject();
			if(resultMap != null && resultMap.size() > 0){
//				data.put("material_id", resultMap.get("material_id"));
				data.put("material_name", resultMap.get("material_name"));
				data.put("material_content", resultMap.get("material_content"));
				//-------------------------------------------------------------------------------------------
//				data.put("delete_flag", resultMap.get("delete_flag"));
//				data.put("brows_times", resultMap.get("brows_times"));
//				data.put("create_time", new SimpleDateFormat("yyyy-MM-dd").format(resultMap.get("create_time")));
//				data.put("update_time", new SimpleDateFormat("yyyy-MM-dd").format(resultMap.get("update_time")));
//				data.put("author", resultMap.get("author"));
//				data.put("brows_times", resultMap.get("brows_times"));

				resultJson.put("data", data);
			}else{
				MyMongo.mRequestFail(request, "查询素材信息不存在");
				return this.returnError(resultJson, ResMessage.Info_NoExist.code, request);
			}
			
		} catch (Exception e){
			MyMongo.mErrorLog("查询素材信息失败", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询素材信息成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 查看素材信息列表
	 * @throws UnsupportedEncodingException 
	 */
	@GET
	@POST
	@Path("/getMaterialList")
	@Produces("text/html;charset=UTF-8")
	public String getMaterialList(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		//分页参数、条件查询参数
		String pageSize = request.getParameter("pageSize");//每页多少条数据
		String offsetNum = request.getParameter("offsetNum");//offsetNum＝（当前页数－1）*pagesize
		String criteria = request.getParameter("criteria");
		String audit_flag = request.getParameter("audit_flag");
		try{
			Map<String, Object> notiInfo = new HashMap<String, Object>();
			notiInfo.put("pageSize", Integer.parseInt(pageSize));
			notiInfo.put("offsetNum", Integer.parseInt(offsetNum));
			if(!CodeUtil.checkParam(criteria)) {
				notiInfo.put("criteria", URLDecoder.decode(criteria, "UTF-8"));
			}
			if(!CodeUtil.checkParam(audit_flag)) {
				notiInfo.put("audit_flag", audit_flag);
			}
			int count = materialDao.getMaterialListCount(notiInfo);
			if(count > 0){
				List<Map<String, Object>> resultList = materialDao.getMaterialList(notiInfo);
				JSONArray jsonArray = new JSONArray();
				for(int i=0;i<resultList.size();i++){
					Map<String, Object> resultMap = resultList.get(i);
					JSONObject jsonObject = new JSONObject();
					jsonObject.put("material_id", resultMap.get("material_id"));
					jsonObject.put("material_name", resultMap.get("material_name"));
					jsonObject.put("material_content", resultMap.get("material_content"));
					jsonObject.put("delete_flag", resultMap.get("delete_flag"));
					jsonObject.put("create_time", new SimpleDateFormat("yyyy-MM-dd HH:mm").format(resultMap.get("create_time")));
					if(resultMap.containsKey("update_time")){
						jsonObject.put("update_time", new SimpleDateFormat("yyyy-MM-dd HH:mm").format(resultMap.get("update_time")));
					}
					jsonObject.put("author", resultMap.get("author"));
					jsonObject.put("brows_times", resultMap.get("brows_times"));
					jsonObject.put("audit_flag", resultMap.get("audit_flag"));
					jsonArray.add(jsonObject);
				}
				resultJson.put("data", jsonArray);
			}else{
				MyMongo.mRequestFail(request, "查询素材信息列表不存在");
				return this.returnError(resultJson, ResMessage.Info_NoExist.code, request);
			}
			resultJson.put("total", count);
		} catch (Exception e){
			MyMongo.mErrorLog("查询素材信息列表失败", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询素材信息列表成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}

}
