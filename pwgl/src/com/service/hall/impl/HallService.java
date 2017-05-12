package com.service.hall.impl;

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
import com.common.util.DateUtil;
import com.common.util.IdUtil;
import com.common.util.SqlUtil;
import com.service.BaseService;
import com.service.IService;
import com.service.hall.entity.Hall;
import com.service.hall.entity.HallPew;
import com.service.hall.entity.HallZone;

/**
 * 
 * <p>
 * Title：Hall
 * </p>
 * <p>
 * Description：Hall
 * </p>
 * <p>
 * Author : admin
 * </p>
 * <p>
 * Department : 
 * </p>
 */
@Component
public class HallService extends BaseService implements IService {

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
			} else if("queryCgmc".equals(operType)){
				queryCgmc(pm,obj);
			}else if("queryHallZone".equals(operType)){
				queryHallZone(pm,obj);
			}else if("addZone".equals(operType)){
				addZone(pm,obj);
			}else if("updateZone".equals(operType)){
				updateZone(pm,obj);
			}else if("qyZone".equals(operType)){
				qyZone(pm,obj);
			}else if("jyZone".equals(operType)){
				jyZone(pm,obj);
			}else if("deleteZone".equals(operType)){
				deleteZone(pm,obj);
			}else if("queryPewname".equals(operType)){
				queryPewname(pm,obj);
			}else if("addPew".equals(operType)){
				addPew(pm,obj);
			}else if("updatePre".equals(operType)){
				updatePre(pm,obj);
			}else if("deletePrev".equals(operType)){
				deletePrev(pm,obj);
			}else if("qyPrev".equals(operType)){
				qyPrev(pm,obj);
			}else if("jyPrev".equals(operType)){
				jyPrev(pm,obj);
			}else{
				pm.setData("fail");
				throw new DpException("操作类型错误，请联系系统管理员！", null);
			}
		}

	}
	
	private void queryCgmc(Param pm,JSONObject obj) throws Exception{
		try {
			List<Hall> list = getDao().query("hall.queryCgmc", null,
					Hall.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}
	
	//查询分区
	private void queryHallZone(Param pm,JSONObject obj) throws Exception{
		try{
			Map<String, Object> map = new HashMap<String, Object>();
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			String zonename=obj.getString("zonename");
			String hallid=obj.getString("hallid");
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				map.put("zonename", zonename);
				map.put("hallid", hallid);
				Object[] list = getDao().queryForPage("hall.queryHallZone", map,
						HallZone.class);
				pm.setData(list);
			}
		}catch(Exception e){
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}
	
	//查询座位
	private void queryPewname(Param pm,JSONObject obj)throws Exception{
		try{
			Map<String, Object> map = new HashMap<String, Object>();
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			String hallid=obj.getString("hallid");
			String zoneid=obj.getString("zoneid");
			String pewname=obj.getString("pewname");
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				map.put("zoneid", zoneid);
				map.put("hallid", hallid);
				map.put("pewname", pewname);
				Object[] list = getDao().queryForPage("hall.queryYctzw", map,
						HallPew.class);
				pm.setData(list);
			}
		}catch(Exception e){
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}

	private void index(Param pm, JSONObject obj) throws Exception{
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("hallname", obj.getString("hallname"));
			map.put("status", obj.getString("status"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao().queryForPage("hall.selectHall", map,
						Hall.class);
				pm.setData(list);
			} else {
				List<Hall> list = getDao().query("hall.selectHall", map,
						Hall.class);
				pm.setData(list);
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}
	
	//添加座位
	private void addPew(Param pm,final JSONObject obj) throws Exception{
		try{
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session.getAttribute(UserConstant.USER_XTID);
			final String pewid = IdUtil.createThirteenId();
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			getDao().getJdbcTemplate().update(
					SqlUtil.getSql("hall.insertHallPew", null).getSql(),
					new PreparedStatementSetter() {
						public void setValues(PreparedStatement ps)
								throws SQLException {
							ps.setObject(1, pewid);//pewid
							ps.setObject(2, obj.getString("hallid"));//hallid
							ps.setObject(3, obj.getString("zoneid"));//zoneid
							ps.setObject(4, obj.getString("pewname"));//pewname
							ps.setObject(5, obj.getString("row"));//row
							ps.setObject(6, obj.getString("col"));//col
							ps.setObject(7,obj.getString("sfjz"));//isaddpew
							ps.setObject(8, obj.getString("remark"));//remark
							ps.setObject(9, SystemConstant.qyzt);
							ps.setObject(10, SystemConstant.delstatus);
							ps.setObject(11, obj.getString("vid"));
							ps.setObject(12, userId);
							ps.setObject(13, sysTime);
							ps.setObject(14, userId);
							ps.setObject(15, sysTime);
						}
					});
			pm.setData("success");
	} catch (Exception e) {
		pm.setData("fail");
		throw new DpException("新增失败！", e);
	}
	}
	
	private void addZone(Param pm,final JSONObject obj) throws Exception{
		try{
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session.getAttribute(UserConstant.USER_XTID);
			final String zoneid = IdUtil.createThirteenId();
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			getDao().getJdbcTemplate().update(
					SqlUtil.getSql("hall.insertHallZone", null).getSql(),
					new PreparedStatementSetter() {
						public void setValues(PreparedStatement ps)
								throws SQLException {
							ps.setObject(1, zoneid);//zoneid
							ps.setObject(2, obj.getString("hallid"));//hallid
							ps.setObject(3, obj.getString("zonename"));//zonename--分区名称
							ps.setObject(4, obj.getString("pewpic"));//所属于座位图
							ps.setObject(5, obj.getString("rule"));//rule
							ps.setObject(6, 0);//height
							ps.setObject(7,0);//width
							ps.setObject(8, 10);//rownum
							ps.setObject(9, 10);//colnum
							ps.setObject(10,0);//width
							ps.setObject(11, 0);//width
							ps.setObject(12, obj.getString("text"));//text
							ps.setObject(13, obj.getString("color"));//color
							ps.setObject(14, obj.getString("tpurl"));//color
							ps.setObject(15, obj.getString("zonetype"));//color
							ps.setObject(16, obj.getString("des"));//color
							ps.setObject(17, obj.getString("remark"));//color						
							ps.setObject(18, SystemConstant.qyzt);
							ps.setObject(19, SystemConstant.delstatus);
							ps.setObject(20, obj.getString("vid"));
							ps.setObject(21, userId);
							ps.setObject(22, sysTime);
							ps.setObject(23, userId);
							ps.setObject(24, sysTime);
						}
					});
			pm.setData("success");
	} catch (Exception e) {
		pm.setData("fail");
		throw new DpException("新增失败！", e);
	}
   }

	private void add(Param pm, final JSONObject obj) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session.getAttribute(UserConstant.USER_XTID);
			final String hallid = IdUtil.createThirteenId();
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			getDao().getJdbcTemplate().update(
					SqlUtil.getSql("hall.insertHall", null).getSql(),
					new PreparedStatementSetter() {
						public void setValues(PreparedStatement ps)
								throws SQLException {
							ps.setObject(1, hallid);
							ps.setObject(2, obj.getString("hallname"));
							ps.setObject(3, obj.getString("venueid"));
							ps.setObject(4, obj.getString("location"));
							ps.setObject(5, obj.getString("introduction"));
							ps.setObject(6, SystemConstant.qyzt);
							ps.setObject(7, SystemConstant.delstatus);
							ps.setObject(8, obj.getString("vid"));
							ps.setObject(9, userId);
							ps.setObject(10, sysTime);
							ps.setObject(11, userId);
							ps.setObject(12, sysTime);
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
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("hallid", obj.getString("hallid"));
			map.put("hallname", obj.getString("hallname"));
			map.put("venueid", obj.getString("venueid"));
			map.put("location", obj.getString("location"));
			map.put("introduction", obj.getString("introduction"));
			map.put("vid", obj.getString("vid"));
			map.put("cid",userId);
			map.put("ctime", sysTime);
			map.put("mid", userId);
			map.put("mtime", sysTime);
			getDao().update("hall.updateHall", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("修改失败！", e);
		}
	}
	
	//修改座位
	private void updatePre(Param pm,JSONObject obj)throws Exception{
		try{
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session
					.getAttribute(UserConstant.USER_XTID);
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("pewname", obj.getString("pewname"));
			map.put("row", obj.getString("row"));
			map.put("col", obj.getString("col"));
			map.put("isaddpew", obj.getString("sfjz"));
			map.put("remark", obj.getString("remark"));
			map.put("cid", userId);
			map.put("ctime", sysTime);
			map.put("mid", userId);
			map.put("mtime", sysTime);
			map.put("pewid", obj.getString("pewid"));
			getDao().update("hall.updateHallPrev", map);
			pm.setData("success");
		}catch(Exception e){
			pm.setData("fail");
			throw new Exception("修改失败", e);
		}
	}
	
	//修改禁用启用状态
	private void qyZone(Param pm,JSONObject obj)throws Exception{
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String yhid = (String) session
					.getAttribute(UserConstant.USER_XTID);
			String zoneid = obj.getString("zoneid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", SystemConstant.qyzt);
			map.put("zoneid", zoneid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("hall.updateZoneStatus", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new Exception("启用失败", e);
		}
	}
	
	//禁用
	private void jyPrev(Param pm,JSONObject obj)throws Exception{
		try{
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String yhid = (String) session
					.getAttribute(UserConstant.USER_XTID);
			String id = obj.getString("id");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", SystemConstant.jyzt);
			map.put("pewid", id);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("hall.updatePrevStatus", map);
			pm.setData("success");
		}catch(Exception e){
			pm.setData("fail");
			throw new Exception("启用失败",e);
		}
	}
	
	//修改启用状态座位
	private void qyPrev(Param pm,JSONObject obj)throws Exception{
		try{
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String yhid = (String) session
					.getAttribute(UserConstant.USER_XTID);
			String id = obj.getString("id");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", SystemConstant.qyzt);
			map.put("pewid", id);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("hall.updatePrevStatus", map);
			pm.setData("success");
		}catch(Exception e){
			pm.setData("fail");
			throw new Exception("启用失败",e);
		}
	}
	
	//修改禁用状态
	private void jyZone(Param pm,JSONObject obj)throws Exception{
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String yhid = (String) session
					.getAttribute(UserConstant.USER_XTID);
			String zoneid = obj.getString("zoneid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", SystemConstant.jyzt);
			map.put("zoneid", zoneid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("hall.updateZoneStatus", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new Exception("启用失败", e);
		}
	}
	
	//修改分区信息
	private void updateZone(Param pm,JSONObject obj)throws Exception{
		try{
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session
					.getAttribute(UserConstant.USER_XTID);
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("zonename", obj.getString("zonename"));
			map.put("rule", obj.getString("rule"));
			map.put("des", obj.getString("des"));
			map.put("text", obj.getString("text"));
			map.put("cid", userId);
			map.put("ctime", sysTime);
			map.put("mid", userId);
			map.put("mtime", sysTime);
			map.put("zoneid", obj.getString("zoneid"));
			getDao().update("hall.updateHallZone", map);
			pm.setData("success");
		}catch(Exception e){
			pm.setData("fail");
			throw new DpException("修改失败",e);
		}
	}
	
	//删除分区
	private void deleteZone(Param pm,JSONObject obj)throws Exception{
		try {
			String zoneid = obj.getString("zoneid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("zoneid", zoneid);
			getDao().delete("hall.deleteHallZone", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("删除失败！", e);
		}
	}
	
	//删除座位
	private void deletePrev(Param pm,JSONObject obj)throws Exception{
		try{
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("pewid", obj.getString("id"));
			getDao().delete("hall.deleteHallPrev", map);
			pm.setData("success");
		}catch(Exception e){
			pm.setData("fail");
			throw new DpException("删除失败！",e);
		}
	}
	
	private void delete(Param pm, JSONObject obj) throws Exception {
		try {
			String hallid = obj.getString("hallid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("hallid", hallid);
			getDao().delete("hall.deleteHall", map);
			pm.setData("success");
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
			String hallid = json.getString("hallid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", SystemConstant.qyzt);
			map.put("hallid", hallid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("hall.updateStatus", map);
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
			String hallid = json.getString("hallid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", SystemConstant.jyzt);
			map.put("hallid", hallid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("hall.updateStatus", map);
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
