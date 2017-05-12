package com.service.empower.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
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
import com.service.empower.entity.Role;
import com.service.empower.entity.Sqcd;
import com.service.empower.entity.User;
/**
 * <p>Title: 角色管理service</p>
 * @author 马骏
 * @date 2016-1-18
 */
@Component
public class RoleService extends BaseService implements IService{

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
			}else if("delete".equals(operType)){
				delete(pm, obj);
			}else if("cdsq".equals(operType)){
				cdsq(pm, obj);
			} if("selectFatherRole".equals(operType)){
				selectFatherRole(pm, obj);//查询父角色
			}else if("empowerJs".equals(operType)){
				empowerJs(pm, obj); // 授权角色
			}
		}
	}
	
	private void empowerJs(Param pm, JSONObject obj) {
		try {
			final Timestamp tt = DateUtil.getNowTimestamp();
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session
					.getAttribute(UserConstant.USER_XTID);
			final String roleid = obj.getString("roleid");
			String cdids = obj.getString("cdids");

			// 删除原菜单关系
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("roleid", roleid);
			getDao().delete("role.deleteJscdByJsid", map);
			// 批量写入新菜单关系

			if (cdids != null && !"".equals(cdids)) {
				final String[] cds = cdids.split(",");
				getDao().getJdbcTemplate().batchUpdate(
						SqlUtil.getSql("role.insertJscdgx", null).getSql(),
						new BatchPreparedStatementSetter() {
							@Override
							public void setValues(PreparedStatement ps, int i)
									throws SQLException {
								ps.setObject(1, IdUtil.createThirteenId());
								ps.setObject(2, roleid);
								ps.setObject(3, cds[i]);
								ps.setObject(4, userId);
								ps.setObject(5, tt);
								ps.setObject(6, userId);
								ps.setObject(7, tt);
							}

							@Override
							public int getBatchSize() {
								return cds.length;
							}
						});
			}

			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("授权角色异常！", e);
		}
	}
	
	
	private void cdsq(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("roleid", obj.getString("roleid"));
			List<Sqcd> list = getDao().query("role.selectSqCd", map, Sqcd.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}

	private void selectFatherRole(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			List<Role> list = getDao().query("role.selectFatherRole", map, Role.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}

	private void delete(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			String roleid = obj.getString("roleid");
			if(roleid != null && !"".equals(roleid)){
				map.put("roleid", roleid);
				int c = getDao().queryCount("role.selectSfgl", map);
				if(c > 0){
					pm.setData("ygl");
					return;
				}
				getDao().delete("role.deleteRole", map);
				pm.setData("success");
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("删除失败！", e);
		}
	}

	private void update(Param pm, final JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			ISession session = SessionManager.getSession(pm.getSessionId());
			String xtId = (String) session.getAttribute(UserConstant.USER_XTID);
			Timestamp sysTime = DateUtil.getNowTimestamp();
			String roleid = obj.getString("roleid");
			if(roleid != null && !"".equals(roleid)){
				map.put("roleid", roleid);
				map.put("rolename", obj.getString("rolename"));
				map.put("des", obj.getString("des"));
				map.put("mid", xtId);
				map.put("mtime", sysTime);
				getDao().update("role.updateRole", map);
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
			Map<String, Object> map = new HashMap<String, Object>();
			final String rolename = obj.getString("rolename");
			String froleid = obj.getString("froleid");
			String roletype = obj.getString("roletype");
			map.put("rolename", rolename);
			int c = getDao().queryCount("role.selectSfcf", map);
			if(c > 0){
				pm.setData("repeat");
				return;
			}
			if(froleid == null){
				froleid = "ROOT";
			}
			if(roletype == null){
				map.put("roleid", froleid);
				List<String> typeLi = getDao().querySingleColumnList("role.selectRoletype", map, String.class);
				if(typeLi.size() > 0){
					roletype = typeLi.get(0);
				}
			}
			final String xfroleid = froleid;
			final String xroletype = roletype;
			getDao().getJdbcTemplate().update(SqlUtil.getSql("role.insertRole", null).getSql(),new PreparedStatementSetter() {
				public void setValues(PreparedStatement ps)throws SQLException {
					ps.setObject(1, IdUtil.createThirteenId());
					ps.setObject(2, rolename);
					ps.setObject(3, xfroleid);
					ps.setObject(4, xroletype);
					ps.setObject(5, obj.getString("des"));
					ps.setObject(6, xtId);
					ps.setObject(7, sysTime);
					ps.setObject(8, xtId);
					ps.setObject(9, sysTime);
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
			map.put("rolename", obj.getString("rolename"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if(page != null && rowNum != null){
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao().queryForPage("role.selectRole", map, Role.class);
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
