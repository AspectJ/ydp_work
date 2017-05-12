package com.service.sellpower.impl;

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
import com.service.sellpower.entity.Sellpower;

/**
 * 
 * <p>
 * Title：Sellpower
 * </p>
 * <p>
 * Description：Sellpower
 * </p>
 * <p>
 * Author : admin
 * </p>
 * <p>
 * Department : 
 * </p>
 */
@Component
public class SellpowerService extends BaseService implements IService {

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
			} else {
				pm.setData("fail");
				throw new DpException("操作类型错误，请联系系统管理员！", null);
			}
		}

	}

	private void index(Param pm, JSONObject obj) throws Exception{
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", obj.getString("status"));
			map.put("powername", obj.getString("powername"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao().queryForPage("sellpower.selectSellpower", map,
						Sellpower.class);
				pm.setData(list);
			} else {
				List<Sellpower> list = getDao().query("sellpower.selectSellpower", map,
						Sellpower.class);
				pm.setData(list);
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}

	private void add(Param pm, final JSONObject obj) throws Exception {
		try {
			String powername=obj.getString("powername");
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("powername", powername);
			int count=getDao().queryCount("sellpower.querySellpower", map);
			if(count>0){
				pm.setData("exists");
			}else{
				ISession session = SessionManager.getSession(pm.getSessionId());
				final String userId = (String) session.getAttribute(UserConstant.USER_XTID);
				final Timestamp sysTime = DateUtil.getNowTimestamp();
				final String sellpowerid = IdUtil.createThirteenId();
				getDao().getJdbcTemplate().update(
						SqlUtil.getSql("sellpower.insertSellpower", null).getSql(),
						new PreparedStatementSetter() {
							public void setValues(PreparedStatement ps)
									throws SQLException {
								ps.setObject(1, sellpowerid);
								ps.setObject(2, obj.getString("powername"));
								ps.setObject(3, obj.getString("characteristic"));
								ps.setObject(4, obj.getString("pxh"));
								ps.setObject(5, obj.getString("des"));
								ps.setObject(6, SystemConstant.qyzt);
								ps.setObject(7, SystemConstant.delstatus);
								ps.setObject(8, obj.getString("vid"));
								ps.setObject(9, userId);
								ps.setObject(10,sysTime);
								ps.setObject(11, userId);
								ps.setObject(12, sysTime);
							}
						});
				pm.setData("success");
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("新增失败！", e);
		}
	}

	private void update(Param pm, JSONObject obj) throws Exception {
		try {
			String powername=obj.getString("powername");
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("powername", powername);
			int count=getDao().queryCount("sellpower.querySellpower", map);
			String type=obj.getString("type");
			if("1".equals(type)){
				if(count>0){
					pm.setData("exists");
					return;
				}
			}
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session
					.getAttribute(UserConstant.USER_XTID);
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			map.clear();
			map.put("sellpowerid", obj.getString("sellpowerid"));
			map.put("powername", powername);
			map.put("des", obj.getString("des"));
			map.put("cid", userId);
			map.put("ctime", sysTime);
			map.put("mid", userId);
			map.put("mtime", sysTime);
			getDao().update("sellpower.updateSellpower", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("修改失败！", e);
		}
	}
	
	private void delete(Param pm, JSONObject obj) throws Exception {
		try {
			String sellpowerid = obj.getString("sellpowerid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sellpowerid", sellpowerid);
			getDao().delete("sellpower.deleteSellpower", map);
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
			String sellpowerid = json.getString("sellpowerid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", SystemConstant.qyzt);
			map.put("sellpowerid", sellpowerid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("sellpower.updateStatus", map);
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
			String sellpowerid = json.getString("sellpowerid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", SystemConstant.jyzt);
			map.put("sellpowerid", sellpowerid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("sellpower.updateStatus", map);
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
