package com.service.user.impl;

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
import com.service.BaseService;
import com.service.IService;
import com.service.empower.entity.User;

@Component
public class IndexUserService extends BaseService implements IService{

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
			String userid = obj.getString("userid");
			if(userid != null && !"".equals(userid)){
				map.put("userid", userid);
				List<Integer> timesLi = getDao().querySingleColumnList("user.selectDlcs", map, Integer.class);
				//当登录次数大于0把删除状态改为已删，否则物理删除
				if(timesLi.get(0) > 0){
					map.put("delstatus", "4");
					getDao().update("user.updateUserStatus", map);
				}else{
					getDao().delete("user.deleteUser", map);
				}
				pm.setData("success");
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
			String userid = obj.getString("userid");
			String status = obj.getString("status");
			if(userid != null && !"".equals(userid)){
				map.put("userid", userid);
				map.put("mid", xtId);
				map.put("mtime", sysTime);
				if("禁用".equals(status)){
					map.put("status", obj.getString("2"));
					getDao().update("user.updateUserStatus", map);
					SessionManager.removeSession(session);
					pm.setData("tc");
				}else if("启用".equals(status)){
					map.put("status", "1");
					getDao().update("user.updateUserStatus", map);
					pm.setData("success");
				}else if("恢复".equals(status)){
					map.put("status", "1");
					map.put("delstatus", "3");
					getDao().update("user.updateUserStatus", map);
					pm.setData("success");
				}else if("强制退出".equals(status)){
					SessionManager.removeSession(session);
					pm.setData("tc");
				}
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
			String userid = obj.getString("userid");
			if(userid != null && !"".equals(userid)){
				map.put("userid", userid);
				map.put("username", obj.getString("username"));
				map.put("realname", obj.getString("realname"));
				map.put("spell", SpellUtil.getFirstSpell(obj.getString("realname")));
				map.put("sex", obj.getString("sex"));
				map.put("age", obj.getString("age"));
				map.put("telephone", obj.getString("telephone"));
				map.put("extnum", obj.getString("extnum"));
				map.put("email", obj.getString("email"));
				map.put("worktime", obj.getString("worktime"));
				map.put("entrytime", obj.getString("entrytime"));
				map.put("deptid", obj.getString("deptid"));
				map.put("mid", xtId);
				map.put("mtime", sysTime);
				getDao().update("user.updateUser", map);
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
			final String username = obj.getString("username");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("username", username);
			int c = getDao().queryCount("user.selectZhsfcf", map);
			if(c > 0){
				pm.setData("repeat");
				return;
			}
			getDao().getJdbcTemplate().update(SqlUtil.getSql("user.insertUser", null).getSql(),new PreparedStatementSetter() {
				public void setValues(PreparedStatement ps)throws SQLException {
					ps.setObject(1, IdUtil.createThirteenId());
					ps.setObject(2, username);
					ps.setObject(3, obj.getString("pass"));
					ps.setObject(4, obj.getString("realname"));
					ps.setObject(5, SpellUtil.getFirstSpell(obj.getString("realname")));
					ps.setObject(6, obj.getString("sex"));
					ps.setObject(7, obj.getString("age"));
					ps.setObject(8, obj.getString("telephone"));
					ps.setObject(9, obj.getString("extnum"));
					ps.setObject(10, obj.getString("email"));
					ps.setObject(11, obj.getString("deptid"));
					ps.setObject(12, obj.getString("worktime"));
					ps.setObject(13, obj.getString("entrytime"));
					ps.setObject(14, "1");
					ps.setObject(15, xtId);
					ps.setObject(16, sysTime);
					ps.setObject(17, xtId);
					ps.setObject(18, sysTime);
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
			map.put("realname", obj.getString("realname"));
			map.put("telephone", obj.getString("telephone"));
			map.put("deptid", obj.getString("deptid"));
			map.put("status", obj.getString("status"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if(page != null && rowNum != null){
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao().queryForPage("user.selectUser", map,User.class);
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
