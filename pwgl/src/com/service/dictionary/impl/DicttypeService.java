package com.service.dictionary.impl;

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
import com.service.dictionary.entity.Dicttype;
/**
 * <p>Title: 字典类型service</p>
 * @author 马骏
 * @date 2016-1-19
 */
@Component
public class DicttypeService extends BaseService implements IService{

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
				updateStatus(pm, obj);
			}else if("delete".equals(operType)){
				delete(pm, obj);
			}
		}
	}

	private void delete(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			String dicttypeid = obj.getString("dicttypeid");
			if(dicttypeid != null && !"".equals(dicttypeid)){
				map.put("dicttypeid", dicttypeid);
				int c = getDao().queryCount("dicttype.selectSfysy", map);
				if(c > 0){
					pm.setData("ysy");
					return;
				}
				getDao().delete("dicttype.deleteType", map);
				pm.setData("success");
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("删除失败！", e);
		}
	}

	private void updateStatus(Param pm, final JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			ISession session = SessionManager.getSession(pm.getSessionId());
			String xtId = (String) session.getAttribute(UserConstant.USER_XTID);
			Timestamp sysTime = DateUtil.getNowTimestamp();
			String dicttypeid = obj.getString("dicttypeid");
			if(dicttypeid != null && !"".equals(dicttypeid)){
				map.put("dicttypeid", dicttypeid);
				map.put("status", obj.getString("status"));
				map.put("mid", xtId);
				map.put("mtime", sysTime);
				getDao().update("dicttype.updateStatus", map);
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
			String dicttypeid = obj.getString("dicttypeid");
			if(dicttypeid != null && !"".equals(dicttypeid)){
				map.put("dicttypeid", dicttypeid);
				map.put("typename", obj.getString("typename"));
				map.put("istree", obj.getString("istree"));
				map.put("mid", xtId);
				map.put("mtime", sysTime);
				getDao().update("dicttype.updateType", map);
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
			final String typename = obj.getString("typename");
			map.put("typename", typename);
			int c = getDao().queryCount("dicttype.selectSfcf", map);
			if(c > 0){
				pm.setData("repeat");
				return;
			}
			Integer dicttypeid = 101;
			List<Integer> maxLi = getDao().querySingleColumnList("dicttype.selectMaxid", map, Integer.class);
			if(maxLi.size() > 0){
				dicttypeid = maxLi.get(0)+1;
			}
			final Integer newdicttypeid = dicttypeid;
			getDao().getJdbcTemplate().update(SqlUtil.getSql("dicttype.insertType", null).getSql(),new PreparedStatementSetter() {
				public void setValues(PreparedStatement ps)throws SQLException {
					ps.setObject(1, newdicttypeid);
					ps.setObject(2, typename);
					ps.setObject(3, obj.getString("istree"));
					ps.setObject(4, "1");
					ps.setObject(5, xtId);
					ps.setObject(6, sysTime);
					ps.setObject(7, xtId);
					ps.setObject(8, sysTime);
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
			map.put("typename", obj.getString("typename"));
			map.put("status", obj.getString("status"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if(page != null && rowNum != null){
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao().queryForPage("dicttype.selectType", map, Dicttype.class);
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
