package com.service.empower.impl;

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
import com.common.util.SpellUtil;
import com.common.util.SqlUtil;
import com.fr.report.core.A.r;
import com.service.BaseService;
import com.service.IService;
import com.service.empower.entity.Menu;
import com.service.empower.entity.User;
/**
 * <p>Title: 功能菜单service</p>
 * @author 马骏
 * @date 2016-1-16
 */
@Component
public class MenuService extends BaseService implements IService{

	@Override
	public void install() {
		// TODO Auto-generated method stub
		
	}

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
			if("index".equals(operType)){
				index(pm, obj);
			}else if("add".equals(operType)){
				add(pm, obj);
			}else if("update".equals(operType)){
				update(pm, obj);
			}else if("updateStatus".equals(operType)){
				updateStatus(pm, obj);  //修改状态
			}else if("delete".equals(operType)){
				delete(pm, obj);
			}
		}
	}

	private void delete(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			String menuid = obj.getString("menuid");
			if(menuid != null && !"".equals(menuid)){
				map.put("menuid", menuid);
				List<String> roleLi = getDao().querySingleColumnList("menu.selectGljs", map, String.class);
				//菜单被角色关联，不允许删除，返回关联的角色名称
				String roles = roleLi.get(0);
				if(roles != null && !"".equals(roles)){
					pm.setData(roles);
				}else{
					getDao().delete("menu.deleteMenu", map);
					pm.setData("success");
				}
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("删除失败！", e);
		}
	}

	private void updateStatus(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			ISession session = SessionManager.getSession(pm.getSessionId());
			String xtId = (String) session.getAttribute(UserConstant.USER_XTID);
			Timestamp sysTime = DateUtil.getNowTimestamp();
			String menuid = obj.getString("menuid");
			if(menuid != null && !"".equals(menuid)){
				map.put("menuid", menuid);
				map.put("status", obj.getString("status"));
				map.put("mid", xtId);
				map.put("mtime", sysTime);
				getDao().update("menu.updateMenuStatus", map);
				pm.setData("success");
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("修改失败！", e);
		}
	}
	
	private void update(Param pm, final JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			ISession session = SessionManager.getSession(pm.getSessionId());
			String xtId = (String) session.getAttribute(UserConstant.USER_XTID);
			Timestamp sysTime = DateUtil.getNowTimestamp();
			String menuid = obj.getString("menuid");
			if(menuid != null && !"".equals(menuid)){
				map.put("menuid", menuid);
				map.put("fmenuid", obj.getString("fmenuid"));
				map.put("mname", obj.getString("mname"));
				map.put("alias", obj.getString("alias"));
				map.put("murl", obj.getString("murl"));
				map.put("pxh", obj.getString("pxh"));
				map.put("des", obj.getString("des"));
				map.put("mid", xtId);
				map.put("mtime", sysTime);
				getDao().update("menu.updateMenu", map);
				pm.setData("success");
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("修改失败！", e);
		}
	}

	private void add(Param pm, final JSONObject obj) {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String xtId = (String) session.getAttribute(UserConstant.USER_XTID);
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			final String menuid = obj.getString("menuid");
			getDao().getJdbcTemplate().update(SqlUtil.getSql("menu.insertMenu", null).getSql(),new PreparedStatementSetter() {
				public void setValues(PreparedStatement ps)throws SQLException {
					ps.setObject(1, menuid);
					ps.setObject(2, obj.getString("mname"));
					ps.setObject(3, obj.getString("alias"));
					ps.setObject(4, obj.getString("murl"));
					ps.setObject(5, obj.getString("pxh"));
					ps.setObject(6, obj.getString("fmenuid"));
					ps.setObject(7, obj.getString("des"));
					ps.setObject(8, "1");
					ps.setObject(9, xtId);
					ps.setObject(10, sysTime);
					ps.setObject(11, xtId);
					ps.setObject(12, sysTime);
				}
			});
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("新增失败！", e);
		}
	}

	private void index(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if(page != null && rowNum != null){
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao().queryForPage("menu.selectMenu", map, Menu.class);
				pm.setData(list);
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询异常！", e);
		}
	}

	@Override
	public void unInstall() {
		// TODO Auto-generated method stub
		
	}

}
