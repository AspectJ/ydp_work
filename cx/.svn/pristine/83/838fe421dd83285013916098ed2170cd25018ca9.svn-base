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
import com.cx.rest.information.dao.NewsInfoDaoImpl;
import com.cx.rest.information.dao.PartnerChannelDaoImpl;
import com.cx.util.CodeUtil;
import com.mongo.MyMongo;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Path("rest/partner")
@NoCache
@Service()
public class PartnerChannelRest extends BaseServlet
{
	
	@Resource
	private NewsInfoDaoImpl newsInfoDao;
	
	@Resource
	private PartnerChannelDaoImpl partnerDao;
	
	@Autowired
	private AdminInfoDaoImpl adminInfoDao;
	
	/**
	 * 新增合作渠道信息
	 * @throws UnsupportedEncodingException 
	 */
	@GET
	@POST
	@Path("/addPartnerChannel")
	@Produces("text/html;charset=UTF-8")
	public String addPartnerChannel(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		String cinemaid = request.getParameter("cinemaid");
		String p_name = URLDecoder.decode(request.getParameter("name"), "UTF-8");
		String p_img = request.getParameter("img");
		String p_remark = URLDecoder.decode(request.getParameter("remark"), "UTF-8");

		try{
			if (CodeUtil.checkParam(p_name)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			
			Map<String, Object> imageMap = new HashMap<String, Object>();
			imageMap.put("imageid", "");
			imageMap.put("org_path", p_img);
			Map<String, Object> imageResult = newsInfoDao.insertImage(imageMap);
			String news_img_id = imageResult.get("imageid").toString();
			Map<String, Object> insertMap = new HashMap<String, Object>();
			insertMap.put("p_id", "0");
			insertMap.put("p_name", p_name);
			insertMap.put("p_img", Integer.parseInt(news_img_id));
			insertMap.put("p_remark", p_remark);
			insertMap.put("cinemaid", Integer.parseInt(cinemaid));
			Map<String, Object> resultMap = partnerDao.insertPartnerChannel(insertMap);
			JSONObject data = new JSONObject();
			data.put("p_id", resultMap.get("p_id"));
			data.put("p_name", resultMap.get("p_name"));
			data.put("p_remark", resultMap.get("p_remark"));
			data.put("cinemaid", resultMap.get("cinemaid"));
			data.put("audit_flag", "0");
			data.put("create_time", new SimpleDateFormat("yyyy-MM-dd HH:mm").format(new Date()));
			resultJson.put("data", data);
			
		} catch (Exception e){
			MyMongo.mErrorLog("新增合作渠道信息", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("新增合作渠道信息",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 修改合作渠道信息
	 * @throws UnsupportedEncodingException 
	 */
	@GET
	@POST
	@Path("/updatePartnerChannel")
	@Produces("text/html;charset=UTF-8")
	public String updatePartnerChannel(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		String p_id = request.getParameter("id");
		String p_name = URLDecoder.decode(request.getParameter("name"), "UTF-8");
		String org_path = URLDecoder.decode(request.getParameter("org_path"), "UTF-8");
		String p_remark = URLDecoder.decode(request.getParameter("remark"), "UTF-8");
		String image_change = request.getParameter("image_change");
		String imageid = request.getParameter("imageid");
		String adminid = URLDecoder.decode(request.getParameter("adminid"), "UTF-8");
		try{
			if (CodeUtil.checkParam(p_name)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			if(image_change.equals("0")){//需要修改主题图片
				Map<String, Object> imageMap = new HashMap<String, Object>();
				imageMap.put("org_path", org_path);
				imageMap.put("imageid", Integer.parseInt(imageid));
				newsInfoDao.updateImageInfo(imageMap);
			}
			Map<String,Object> adminMap = new HashMap<String,Object>();
			adminMap.put("adminid", Integer.parseInt(adminid));
			Map<String,Object> resultMap_admin = adminInfoDao.selAdminById(adminMap);
		    String adminname = (String) resultMap_admin.get("adminname");
			Map<String, Object> updateMap = new HashMap<String, Object>();
			updateMap.put("p_id", Integer.parseInt(p_id));
			updateMap.put("p_name", p_name);
			updateMap.put("p_remark", p_remark);
			updateMap.put("update_time", new Date());
			updateMap.put("author", adminname);
			Map<String, Object> resultMap = partnerDao.updatePartnerChannel(updateMap);
			JSONObject data = new JSONObject();
			data.put("p_id", resultMap.get("p_id"));
			resultJson.put("data", data);
			
		} catch (Exception e){
			MyMongo.mErrorLog("修改合作渠道信息", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("修改合作渠道信息",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 删除合作渠道信息
	 * @throws UnsupportedEncodingException 
	 */
	@GET
	@POST
	@Path("/deletePartnerChannel")
	@Produces("text/html;charset=UTF-8")
	public String deletePartnerChannel(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		String imageid = request.getParameter("imageid");//图片ID
		String p_id = request.getParameter("id");//合作渠道ID
		try{
			if (CodeUtil.checkParam(p_id)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			
			Map<String, Object> deleteMap = new HashMap<String, Object>();
			deleteMap.put("imageid", Integer.parseInt(imageid));
			deleteMap.put("p_id", Integer.parseInt(p_id));
			newsInfoDao.deleteImage(deleteMap);
			partnerDao.deletePartnerChannel(deleteMap);
			JSONObject data = new JSONObject();
			data.put("imageid", imageid);
			data.put("news_id", p_id);
			resultJson.put("data", data);
			
		} catch (Exception e){
			MyMongo.mErrorLog("删除合作渠道信息", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("删除合作渠道信息",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 批量删除合作渠道信息
	 * @throws UnsupportedEncodingException 
	 */
	@GET
	@POST
	@Path("/deletePartnerChannels")
	@Produces("text/html;charset=UTF-8")
	public String deletePartnerChannels(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		String imageid = request.getParameter("imageid");//图片ID
		String p_id = request.getParameter("id");//合作渠道ID
		try{
			if (CodeUtil.checkParam(p_id)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			String[] imageids = imageid.split(",");
			String[] p_ids = p_id.split(",");
			
			for(int i=0;i<p_ids.length;i++){
				String imgid = imageids[i];
				String pid = p_ids[i];
				Map<String, Object> deleteMap = new HashMap<String, Object>();
				deleteMap.put("imageid", Integer.parseInt(imgid));
				deleteMap.put("p_id", Integer.parseInt(pid));
				newsInfoDao.deleteImage(deleteMap);
				partnerDao.deletePartnerChannel(deleteMap);
			}
			
			JSONObject data = new JSONObject();
			data.put("imageid", imageid);
			data.put("p_id", p_id);
			resultJson.put("data", data);
			
		} catch (Exception e){
			MyMongo.mErrorLog("删除合作渠道信息失败", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("删除合作渠道信息成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 查看合作渠道信息
	 */
	@GET
	@POST
	@Path("/getPartnerChannel")
	@Produces("text/html;charset=UTF-8")
	public String getPartnerChannel(@Context HttpServletRequest request, @Context HttpServletResponse response){
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		String p_id = request.getParameter("id");
		try{
			if (CodeUtil.checkParam(p_id)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			Map<String, Object> getInfo = new HashMap<String, Object>();
			getInfo.put("p_id", Integer.parseInt(p_id));
			Map<String, Object> resultMap = partnerDao.getPartnerChannel(getInfo);
			JSONObject data = new JSONObject();
			if(resultMap != null && resultMap.size() > 0){
				data.put("id", resultMap.get("p_id"));
				data.put("name", resultMap.get("p_name"));
				data.put("img", resultMap.get("p_img"));
				data.put("remark", resultMap.get("p_remark"));
				data.put("cinemaid", resultMap.get("cinemaid"));
				data.put("create_time", resultMap.get("create_time"));
				data.put("update_time", resultMap.get("update_time"));
				data.put("org_path", resultMap.get("org_path"));
				resultJson.put("data", data);
			}else{
				MyMongo.mRequestFail(request, "查询合作渠道信息不存在");
				return this.returnError(resultJson, ResMessage.Info_NoExist.code, request);
			}
			
			
		} catch (Exception e){
			MyMongo.mErrorLog("查询合作渠道信息失败", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询合作渠道信息成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 查看合作渠道信息总条数
	 */
	@GET
	@POST
	@Path("/getPartnerChannelCount")
	@Produces("text/html;charset=UTF-8")
	public String getPartnerChannelCount(@Context HttpServletRequest request, @Context HttpServletResponse response){
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		try{
			Map<String, Object> countInfo = new HashMap<String, Object>();
			resultJson.put("total", partnerDao.getPartnerChannelListCount(countInfo));
		} catch (Exception e){
			MyMongo.mErrorLog("查询合作渠道信息总数量失败", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询合作渠道信息总数量成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	/**
	 * 查看合作渠道信息列表
	 */
	@GET
	@POST
	@Path("/getPartnerChannelList")
	@Produces("text/html;charset=UTF-8")
	public String getPartnerChannelList(@Context HttpServletRequest request, @Context HttpServletResponse response){
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		//分页参数、条件查询参数
		String pageSize = request.getParameter("pageSize");//每页多少条数据
		String offsetNum = request.getParameter("offsetNum");//offsetNum＝（当前页数－1）*pagesize
		try{
			Map<String, Object> info = new HashMap<String, Object>();
			info.put("pageSize", Integer.parseInt(pageSize));
			info.put("offsetNum", Integer.parseInt(offsetNum));
			int count = partnerDao.getPartnerChannelListCount(info);
			List<Map<String, Object>> resultList = partnerDao.getPartnerChannelList(info);
			JSONArray jsonArray = new JSONArray();
			if(resultList != null && resultList.size() > 0){
				for(int i=0;i<resultList.size();i++){
					Map<String, Object> resultMap = resultList.get(i);
					JSONObject jsonObject = new JSONObject();
					jsonObject.put("id", resultMap.get("p_id"));
					jsonObject.put("name", resultMap.get("p_name"));
					jsonObject.put("img", resultMap.get("p_img"));
					jsonObject.put("remark", resultMap.get("p_remark"));
					jsonObject.put("cinemaid", resultMap.get("cinemaid"));
					jsonObject.put("create_time", new SimpleDateFormat("yyyy-MM-dd HH:mm").format(resultMap.get("create_time")));
					if(resultMap.containsKey("update_time")){
						jsonObject.put("update_time", new SimpleDateFormat("yyyy-MM-dd HH:mm").format(resultMap.get("update_time")));
					}
					jsonArray.add(jsonObject);
				}
				resultJson.put("total", count);
				resultJson.put("data", jsonArray);
			}else{
				MyMongo.mRequestFail(request, "查询合作渠道信息列表不存在");
				return this.returnError(resultJson, ResMessage.Info_NoExist.code, request);
			}
			
			
		} catch (Exception e){
			MyMongo.mErrorLog("查询合作渠道信息列表失败", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("查询合作渠道信息列表成功",  etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
}
