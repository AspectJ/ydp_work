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
import com.service.dictionary.entity.Dict;
import com.service.dictionary.entity.Dicttype;
import com.service.empower.entity.Role;
/**
 * <p>Title: 普通字典service</p>
 * @author 马骏
 * @date 2016-1-19
 */
@Component
public class DictService extends BaseService implements IService{

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
			}
		}
	}

	private void selectDicttype(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			List<Dict> list = getDao().query("dict.selectDicttype", map, Dict.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}

	private void delete(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			String dictid = obj.getString("dictid");
			if(dictid != null && !"".equals(dictid)){
				map.put("dictid", dictid);
				getDao().delete("dict.deleteDict", map);
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
			String dictid = obj.getString("dictid");
			if(dictid != null && !"".equals(dictid)){
				map.put("dictid", dictid);
				map.put("status", obj.getString("status"));
				map.put("mid", xtId);
				map.put("mtime", sysTime);
				getDao().update("dict.updateStatus", map);
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
			String ydictid = obj.getString("ydictid");
			String dictid = obj.getString("dictid");
			if(dictid.length() != 4){
				pm.setData("字典代码格式错误，位数不正确");
				return;
			}
			String dicttypeid = obj.getString("dicttypeid");
			if(!dictid.substring(0, 3).equals(dicttypeid)){
				pm.setData("字典代码格式错误，与类型不匹配");
				return;
			}
			if(ydictid != null && !"".equals(ydictid) && dictid != null && !"".equals(dictid)){
				map.put("ydictid", ydictid);
				map.put("dictid", dictid);
				map.put("dicttypeid", dicttypeid);
				map.put("dvalue", obj.getString("dvalue"));
				map.put("pxh", obj.getString("pxh"));
				map.put("des", obj.getString("des"));
				map.put("mid", xtId);
				map.put("mtime", sysTime);
				getDao().update("dict.updateDict", map);
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
			final String dictid = obj.getString("dictid");
			if(dictid.length() != 4){
				pm.setData("字典代码格式错误，位数不正确");
				return;
			}
			map.put("dictid", dictid);
			int c = getDao().queryCount("dict.selectSfcf", map);
			if(c > 0){
				pm.setData("repeat");
				return;
			}
			final String dicttypeid = obj.getString("dicttypeid");
			if(!dictid.substring(0, 3).equals(dicttypeid)){
				pm.setData("字典代码格式错误，与类型不匹配");
				return;
			}
			getDao().getJdbcTemplate().update(SqlUtil.getSql("dict.insertDict", null).getSql(),new PreparedStatementSetter() {
				public void setValues(PreparedStatement ps)throws SQLException {
					ps.setObject(1, dictid);
					ps.setObject(2, obj.getString("dvalue"));
					ps.setObject(3, dicttypeid);
					ps.setObject(4, obj.getString("pxh"));
					ps.setObject(5, obj.getString("des"));
					ps.setObject(6, "1");
					ps.setObject(7, xtId);
					ps.setObject(8, sysTime);
					ps.setObject(9, xtId);
					ps.setObject(10, sysTime);
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
				Object[] list = getDao().queryForPage("dict.selectDict", map, Dict.class);
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
