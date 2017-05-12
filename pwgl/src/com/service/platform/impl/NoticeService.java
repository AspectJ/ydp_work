package com.service.platform.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.HashMap;
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
import com.service.platform.entity.Notice;
/**
 * <p>Title: 系统通知service</p>
 * @author 马骏
 * @date 2016-01-19
 */
@Component
public class NoticeService extends BaseService implements IService{

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
			}else if("updateStatus".equals(operType)){
				updateStatus(pm, obj);
			}
		}
	}

	private void updateStatus(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String xtId = (String) session.getAttribute(UserConstant.USER_XTID);
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			final String noticeid = obj.getString("noticeid");
			if(noticeid != null && !"".equals(noticeid)){
				map.put("noticeid", noticeid);
				map.put("status", obj.getString("status"));
				map.put("mid", xtId);
				map.put("mtime", sysTime);
				getDao().update("notice.updateStatus", map);
				pm.setData("success");
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("修改状态失败！", e);
		}
	}

	private void delete(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			String noticeid = obj.getString("noticeid");
			if(noticeid != null && !"".equals(noticeid)){
				map.put("noticeid", noticeid);
				getDao().delete("notice.deleteNotice", map);
				pm.setData("success");
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("删除失败！", e);
		}
	}

	private void update(Param pm, final JSONObject obj) {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String xtId = (String) session.getAttribute(UserConstant.USER_XTID);
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			String content = obj.getString("content");
			if(content.startsWith("<![CDATA[") && content.endsWith("]]>")){
				content = content.substring("<![CDATA[".length(), content.length() - "]]>".length());
			}
			final byte[] contentByte = content.getBytes("utf-8");
			final String noticeid = obj.getString("noticeid");
			if(noticeid != null && !"".equals(noticeid)){
				getDao().getJdbcTemplate().update(
						SqlUtil.getSql("notice.updateNotice", null).getSql(),
						new PreparedStatementSetter() {
							public void setValues(PreparedStatement ps)
									throws SQLException {
								ps.setObject(1, obj.getString("title"));
								ps.setObject(2, contentByte);
								ps.setObject(3, obj.getString("reltime"));
								ps.setObject(4, obj.getString("relplatform"));
								ps.setObject(5, xtId);
								ps.setObject(6, sysTime);
								ps.setObject(7, noticeid);
							}
				});
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
			String content = obj.getString("content");
			if(content.startsWith("<![CDATA[") && content.endsWith("]]>")){
				content = content.substring("<![CDATA[".length(), content.length() - "]]>".length());
			}
			final byte[] contentByte = content.getBytes("utf-8");
			getDao().getJdbcTemplate().update(SqlUtil.getSql("notice.insertNotice", null).getSql(),new PreparedStatementSetter() {
				public void setValues(PreparedStatement ps)throws SQLException {
					ps.setObject(1, IdUtil.createThirteenId());
					ps.setObject(2, obj.getString("title"));
					ps.setObject(3, contentByte);
					ps.setObject(4, obj.getString("reltime"));
					ps.setObject(5, obj.getString("relplatform"));
					ps.setObject(6, "2");
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
			map.put("title", obj.getString("title"));
			map.put("starttime", obj.getString("starttime"));
			map.put("endtime", obj.getString("endtime"));
			map.put("relplatform", obj.getString("relplatform"));
			map.put("status", obj.getString("status"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if(page != null && rowNum != null){
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao().queryForPage("notice.selectNotice", map,Notice.class);
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
