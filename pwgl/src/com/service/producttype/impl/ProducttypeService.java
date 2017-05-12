package com.service.producttype.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang.StringUtils;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.common.constant.PageConstant;
import com.common.constant.SystemConstant;
import com.common.constant.UserConstant;
import com.common.dp.Param;
import com.common.exception.DpException;
import com.common.session.ISession;
import com.common.session.SessionManager;
import com.common.util.IdUtil;
import com.common.util.SqlUtil;
import com.common.util.DateUtil;
import com.service.BaseService;
import com.service.IService;
import com.service.hall.entity.Hall;
import com.service.producttype.entity.Producttype;

/**
 * 
 * <p>
 * Title：Producttype
 * </p>
 * <p>
 * Description：Producttype
 * </p>
 * <p>
 * Author : admin
 * </p>
 * <p>
 * Department : 
 * </p>
 */
@Component
public class ProducttypeService extends BaseService implements IService {

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void service(Param pm) throws Exception {

		String data = (String) pm.getData();
		if (StringUtils.trimToNull(data) == null) {
			return;
		}
		int dataPackType = pm.getDataFormat();
		if (SystemConstant.jsonType == dataPackType) {
			JSONObject obj = JSON.parseObject(data);
			String operType = obj.getString("operType");
			if ("index".equals(operType)) {
				index(pm, obj);
			} else if ("add".equals(operType)) {
				add(pm, obj);
			} else if ("delete".equals(operType)) {
				delete(pm, obj);
			} else if ("update".equals(operType)) {
				update(pm, obj);
			}else if ("qy".equals(operType)) {
				qy(pm, obj);
			} else if ("jy".equals(operType)) {
				jy(pm, obj);
			} else  if("sjcplb".equals(operType)){
				sjcplb(pm,obj);
			}else{
				pm.setData("fail");
				throw new DpException("操作类型错误，请联系系统管理员！", null);
			}
		}
	}
	
	//查询上级产品类别
	private void sjcplb(Param pm,JSONObject obj)throws Exception{
		try {
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("producttypeid", obj.getString("producttypeid"));
			System.out.println(SqlUtil.getSql("producttype.sjcplb", map).getSql());
			List<Producttype> list = getDao().query("producttype.sjcplb", map,
					Producttype.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}

	private void index(Param pm, JSONObject obj) throws Exception{
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", obj.getString("status"));
			map.put("typename", obj.getString("typename"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao().queryForPage("producttype.selectProducttype", map,
						Producttype.class);
				pm.setData(list);
			} else {
				List<Producttype> list = getDao().query("producttype.selectProducttype", map,
						Producttype.class);
				pm.setData(list);
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}

	private void add(Param pm, final JSONObject obj) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session.getAttribute(UserConstant.USER_XTID);
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			final String producttypeid = IdUtil.createThirteenId();
			final String fid=obj.getString("fprodtypeid");
			String fids="";
			if("".equals(fid)||null==fid){
				fids="ROOT";
			}else{
				fids=fid;
			}
			final String parentId=fids;
			getDao().getJdbcTemplate().update(
					SqlUtil.getSql("producttype.insertProducttype", null).getSql(),
					new PreparedStatementSetter() {
						public void setValues(PreparedStatement ps)
								throws SQLException {
							ps.setObject(1, producttypeid);
							ps.setObject(2, obj.getString("typename"));
							ps.setObject(3, obj.getString("pxh"));
							ps.setObject(4, parentId);
							ps.setObject(5, obj.getString("des"));
							ps.setObject(6, SystemConstant.qyzt);
							ps.setObject(7, SystemConstant.delstatus);
							ps.setObject(8, obj.getString("vid"));
							ps.setObject(9, userId);
							ps.setObject(10,sysTime);
							ps.setObject(11, userId);
							ps.setObject(12,sysTime);
						}
					});
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("新增失败！", e);
		}
	}

	private void update(Param pm, JSONObject obj) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session
					.getAttribute(UserConstant.USER_XTID);
			Map<String, Object> map = new HashMap<String, Object>();
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			final String fid=obj.getString("fprodtypeid");
			String fids="";
			if("".equals(fid)||null==fid){
				fids="ROOT";
			}else{
				fids=fid;
			}
			final String parentId=fids;			
			map.put("producttypeid", obj.getString("producttypeid"));
			map.put("typename", obj.getString("typename"));
			map.put("pxh", obj.getString("pxh"));
			map.put("fprodtypeid", parentId);
			map.put("des", obj.getString("des"));
			map.put("cid", userId);
			map.put("ctime",sysTime);
			map.put("mid", userId);
			map.put("mtime", sysTime);
			getDao().update("producttype.updateProducttype", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("修改失败！", e);
		}
	}
	
	private void delete(Param pm, JSONObject obj) throws Exception {
		try {
			String producttypeid = obj.getString("producttypeid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("prodtypeid", producttypeid);
			int count=getDao().queryCount("producttype.queryProduct", map);
			//表示存在
			if(count>0){
				pm.setData("exists");
			}else{
				map.put("producttypeid", producttypeid);
				getDao().delete("producttype.deleteProducttype", map);
				pm.setData("success");
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("删除失败！", e);
		}
	}
	
	private void qy(Param pm, final JSONObject json) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String yhid = (String) session
					.getAttribute(UserConstant.USER_XTID);
			String producttypeid = json.getString("producttypeid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", SystemConstant.qyzt);
			map.put("producttypeid", producttypeid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("producttype.updateStatus", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new Exception("启用失败", e);
		}
	}

	private void jy(Param pm, final JSONObject json) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String yhid = (String) session
					.getAttribute(UserConstant.USER_XTID);
			String producttypeid = json.getString("producttypeid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", SystemConstant.jyzt);
			map.put("producttypeid", producttypeid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("producttype.updateStatus", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new Exception("禁用失败", e);
		}
	}
	
		
	@Override
	public void install() {
		// TODO Auto-generated method stub
	}
	
	@Override
	public void unInstall() {
		// TODO Auto-generated method stub
	}

}
