package com.service.paybox.impl;

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
import com.service.paybox.entity.Paybox;
import com.service.performer.entity.Performer;

/**
 * 
 * <p>
 * Title：Paybox
 * </p>
 * <p>
 * Description：Paybox
 * </p>
 * <p>
 * Author : admin
 * </p>
 * <p>
 * Department : 
 * </p>
 */
@Component
public class PayboxService extends BaseService implements IService {

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
			} else if("querysjspdmc".equals(operType)){
				querySjspdmc(pm,obj);
			}else{
				pm.setData("fail");
				throw new DpException("操作类型错误，请联系系统管理员！", null);
			}
		}

	}

	//查询上级售票点名称
	private void querySjspdmc(Param pm,JSONObject obj)throws Exception{
		try {
			Map<String,Object> map=new HashMap<String,Object>();
			String payboxid=obj.getString("payboxid");
			map.put("payboxid", payboxid);
			List<Paybox> list = getDao().query("paybox.querySjspmc", map,
					Paybox.class);
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
			map.put("payboxname", obj.getString("payboxname"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao().queryForPage("paybox.selectPaybox", map,
						Paybox.class);
				pm.setData(list);
			} else {
				List<Paybox> list = getDao().query("paybox.selectPaybox", map,
						Paybox.class);
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
			final String payboxid = IdUtil.createThirteenId();
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			final String fid=obj.getString("fpayboxid");
			String fids="";
			if("".equals(fid)||null==fid){
				fids="ROOT";
			}else{
				fids=fid;
			}
			final String parentId=fids;
			getDao().getJdbcTemplate().update(
					SqlUtil.getSql("paybox.insertPaybox", null).getSql(),
					new PreparedStatementSetter() {
						public void setValues(PreparedStatement ps)
								throws SQLException {
							ps.setObject(1, payboxid);
							ps.setObject(2, obj.getString("payboxname"));
							ps.setObject(3, obj.getString("areaid"));
							ps.setObject(4, obj.getString("address"));
							ps.setObject(5, parentId);
							ps.setObject(6, obj.getString("introduction"));
							ps.setObject(7,SystemConstant.qyzt);
							ps.setObject(8, SystemConstant.delstatus);
							ps.setObject(9, obj.getString("vid"));
							ps.setObject(10,userId);
							ps.setObject(11, sysTime);
							ps.setObject(12,userId);
							ps.setObject(13, sysTime);
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
			final String fid=obj.getString("fpayboxid");
			String fids="";
			if("".equals(fid)||null==fid){
				fids="ROOT";
			}else{
				fids=fid;
			}
			final String parentId=fids;
			map.put("payboxid", obj.getString("payboxid"));
			map.put("payboxname", obj.getString("payboxname"));
			map.put("areaid", obj.getString("areaid"));
			map.put("address", obj.getString("address"));
			map.put("fpayboxid", parentId);
			map.put("introduction", obj.getString("introduction"));
			map.put("vid", obj.getString("vid"));
			map.put("cid",userId);
			map.put("ctime", sysTime);
			map.put("mid", userId);
			map.put("mtime", sysTime);
			getDao().update("paybox.updatePaybox", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("修改失败！", e);
		}
	}
	
	private void delete(Param pm, JSONObject obj) throws Exception {
		try {
			String payboxid = obj.getString("payboxid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("payboxid", payboxid);
			
			//查询是否存在子类，如果存在就不能删除
			int count=getDao().queryCount("paybox.queryZl", map);
			if(count>0){
				pm.setData("exist");
			}else{
				getDao().delete("paybox.deletePaybox", map);
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
			String payboxid = json.getString("payboxid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", SystemConstant.qyzt);
			map.put("payboxid", payboxid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("paybox.updateStatus", map);
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
			String payboxid = json.getString("payboxid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", SystemConstant.jyzt);
			map.put("payboxid", payboxid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("paybox.updateStatus", map);
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
