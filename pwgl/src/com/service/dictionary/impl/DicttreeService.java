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
import com.common.util.SqlUtil;
import com.service.BaseService;
import com.service.IService;
import com.service.dictionary.entity.Dict;
import com.service.dictionary.entity.Dicttree;
/**
 * <p>Title: 树形字典service</p>
 * @author 马骏
 * @date 2016-1-21
 */
@Component
public class DicttreeService extends BaseService implements IService{

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
			}else if("selectDicttype".equals(operType)){
				selectDicttype(pm, obj);//查询代码分类
			}else if("selectFatherDicttree".equals(operType)){
				selectFatherDicttree(pm, obj);//查询父代码
			}else if("selectTypeByTreeid".equals(operType)){
				selectTypeByTreeid(pm, obj);//查询父代码
			}
		}
	}
	
	private void selectTypeByTreeid(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("treeid", obj.getString("treeid"));
			List<Dicttree> list = getDao().query("dicttree.selectTypeByTreeid", map, Dicttree.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}
	
	private void selectFatherDicttree(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			List<Dicttree> list = getDao().query("dicttree.selectFatherDicttree", map, Dicttree.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}

	private void selectDicttype(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			List<Dicttree> list = getDao().query("dicttree.selectDicttype", map, Dicttree.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}

	private void delete(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			String treeid = obj.getString("treeid");
			if(treeid != null && !"".equals(treeid)){
				map.put("treeid", treeid);
				getDao().delete("dicttree.deleteDicttree", map);
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
			String treeid = obj.getString("treeid");
			if(treeid != null && !"".equals(treeid)){
				map.put("treeid", treeid);
				map.put("status", obj.getString("status"));
				map.put("mid", xtId);
				map.put("mtime", sysTime);
				getDao().update("dicttree.updateStatus", map);
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
			String ytreeid = obj.getString("ytreeid");
			String treeid = obj.getString("treeid");
			if(treeid.length() != 4){
				pm.setData("字典代码格式错误，位数不正确");
				return;
			}
			String dicttypeid = obj.getString("dicttypeid");
			if(!treeid.substring(0, 3).equals(dicttypeid)){
				pm.setData("字典代码格式错误，与类型不匹配");
				return;
			}
			if(ytreeid != null && !"".equals(ytreeid) && treeid != null && !"".equals(treeid)){
				map.put("ytreeid", ytreeid);
				map.put("treeid", treeid);
				map.put("dicttypeid", dicttypeid);
				map.put("dvalue", obj.getString("dvalue"));
				map.put("pxh", obj.getString("pxh"));
				map.put("des", obj.getString("des"));
				map.put("mid", xtId);
				map.put("mtime", sysTime);
				getDao().update("dicttree.updateDicttree", map);
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
			final String treeid = obj.getString("treeid");
			if(treeid.length() != 4){
				pm.setData("字典代码格式错误，位数不正确");
				return;
			}
			map.put("treeid", treeid);
			int c = getDao().queryCount("dicttree.selectSfcf", map);
			if(c > 0){
				pm.setData("repeat");
				return;
			}
			final String dicttypeid = obj.getString("dicttypeid");
			if(!treeid.substring(0, 3).equals(dicttypeid)){
				pm.setData("字典代码格式错误，与类型不匹配");
				return;
			}
			getDao().getJdbcTemplate().update(SqlUtil.getSql("dicttree.insertDicttree", null).getSql(),new PreparedStatementSetter() {
				public void setValues(PreparedStatement ps)throws SQLException {
					ps.setObject(1, treeid);
					ps.setObject(2, obj.getString("dvalue"));
					ps.setObject(3, dicttypeid);
					ps.setObject(4, obj.getString("ftreeid"));
					ps.setObject(5, obj.getString("pxh"));
					ps.setObject(6, obj.getString("des"));
					ps.setObject(7, "1");
					ps.setObject(8, xtId);
					ps.setObject(9, sysTime);
					ps.setObject(10, xtId);
					ps.setObject(11, sysTime);
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
			map.put("dvalue", obj.getString("dvalue"));
			map.put("typename", obj.getString("typename"));
			map.put("status", obj.getString("status"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if(page != null && rowNum != null){
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao().queryForPage("dicttree.selectDicttree", map, Dicttree.class);
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
