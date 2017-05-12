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
import com.service.BaseService;
import com.service.IService;
import com.service.empower.entity.User;
/**
 * <p>Title: 平台用户service</p>
 * @author 马骏
 * @date 2016-1-15
 */
@Component
public class UserService extends BaseService implements IService{
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
			}else if("selectDeptname".equals(operType)){
				selectDeptname(pm, obj);  //查询部门
			}else if("updatePass".equals(operType)){
				updatePass(pm, obj);//修改密码
			}else if("selectFunctionRole".equals(operType)){
				selectFunctionRole(pm, obj);//查询功能角色
			}else if("saveFunctionEmpower".equals(operType)){
				saveFunctionEmpower(pm, obj);//保存功能授权
			}else if("selectDataRole".equals(operType)){
				selectDataRole(pm, obj);//查询数据角色
			}else if("saveDataEmpower".equals(operType)){
				saveDataEmpower(pm, obj);//保存数据授权
			}
		}
	}
	
	private void saveDataEmpower(Param pm, final JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String xtId = (String) session.getAttribute(UserConstant.USER_XTID);
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			final String userid = obj.getString("userid");
			final String roleids = obj.getString("roleids");
			String [] roleid = roleids.split(",");
			if(userid != null && !"".equals(userid)){
				map.put("userid", userid);
				getDao().delete("user.deleteDataEmpower", map);
				for (int i = 0; i < roleid.length; i++) {
					final String newroleid = roleid[i]; 
					getDao().getJdbcTemplate().update(SqlUtil.getSql("user.insertEmpower", null).getSql(),new PreparedStatementSetter() {
						public void setValues(PreparedStatement ps)throws SQLException {
							ps.setObject(1, IdUtil.createThirteenId());
							ps.setObject(2, userid);
							ps.setObject(3, newroleid);
							ps.setObject(4, xtId);
							ps.setObject(5, sysTime);
							ps.setObject(6, xtId);
							ps.setObject(7, sysTime);
						}
					});
				}
				pm.setData("success");
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("修改失败！", e);
		}
	}

	private void selectDataRole(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("userid", obj.getString("userid"));
			//所有数据角色
			List<User> allRole = getDao().query("user.selectAllDataRole", map, User.class);
			//用户所关联的数据角色
			List<User> userRole = getDao().query("user.selectUserDataRole", map, User.class);
			Map<String, Object> reMap = new HashMap<String, Object>();
			reMap.put("all", allRole);
			reMap.put("user", userRole);
			pm.setData(reMap);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}
	
	private void saveFunctionEmpower(Param pm, final JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String xtId = (String) session.getAttribute(UserConstant.USER_XTID);
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			final String userid = obj.getString("userid");
			if(userid != null && !"".equals(userid)){
				map.put("userid", userid);
				getDao().delete("user.deleteFunctionEmpower", map);
				getDao().getJdbcTemplate().update(SqlUtil.getSql("user.insertEmpower", null).getSql(),new PreparedStatementSetter() {
					public void setValues(PreparedStatement ps)throws SQLException {
						ps.setObject(1, IdUtil.createThirteenId());
						ps.setObject(2, userid);
						ps.setObject(3, obj.getString("roleid"));
						ps.setObject(4, xtId);
						ps.setObject(5, sysTime);
						ps.setObject(6, xtId);
						ps.setObject(7, sysTime);
					}
				});
				pm.setData("success");
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("修改失败！", e);
		}
	}
	
	private void selectFunctionRole(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			List<User> list = getDao().query("user.selectFunctionRole", map, User.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}
	
	private void updatePass(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			ISession session = SessionManager.getSession(pm.getSessionId());
			String xtId = (String) session.getAttribute(UserConstant.USER_XTID);
			Timestamp sysTime = DateUtil.getNowTimestamp();
			String userid = obj.getString("userid");
			if(userid != null && !"".equals(userid)){
				map.put("userid", userid);
				map.put("newpass", obj.getString("newpass"));
				map.put("mid", xtId);
				map.put("mtime", sysTime);
				getDao().update("user.updatePass", map);
				pm.setData("success");
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("修改失败！", e);
		}
	}

	private void selectDeptname(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			List<User> list = getDao().query("user.selectDeptname", map, User.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询部门失败！", e);
		}
	}

	private void delete(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			String userid = obj.getString("userid");
			map.put("userid", userid);
			getDao().delete("user.deleteUser", map);
			pm.setData("success");
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
				map.put("status", status);
				System.out.println(SqlUtil.getSql("user.updateUserStatus", map).getSql());
				getDao().update("user.updateUserStatus", map);
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
			String userid = obj.getString("userid");
			if(userid != null && !"".equals(userid)){
				map.put("userid", userid);
				map.put("username", obj.getString("username"));
				map.put("realname", obj.getString("realname"));
				map.put("spell", SpellUtil.getFirstSpell(obj.getString("realname")));
				map.put("sex", obj.getString("sex"));
				map.put("age", obj.getString("age"));
				map.put("telephone", obj.getString("telephone"));
				map.put("email", obj.getString("email"));
				map.put("mid", xtId);
				map.put("mtime", sysTime);
				map.put("areaid", obj.getString("xzqh"));
				map.put("addr", obj.getString("addr"));
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
					ps.setObject(9, obj.getString("email"));
					ps.setObject(10, obj.getString("addr"));//地址
					ps.setObject(11, obj.getString("xzqh"));//行政区划
					ps.setObject(12, obj.getString("lasttime"));//最后登录时间
					ps.setObject(13, obj.getString("lastip"));//最后登录ip
					ps.setObject(14, obj.getString("times"));//登录次数
					ps.setObject(15,obj.getString("yhjf"));//用户积分
					ps.setObject(16, obj.getString("yhye"));//用户余额
					ps.setObject(17,SystemConstant.qyzt);//状态  表示启动，表示禁用
					ps.setObject(18, "3");//删除状态，3表示添加的用户可以登录
					ps.setObject(19, obj.getString("vid"));//数据库版本号
					ps.setObject(20, xtId);
					ps.setObject(21, sysTime);
					ps.setObject(22, xtId);
					ps.setObject(23, sysTime);
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
