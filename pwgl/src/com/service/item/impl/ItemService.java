package com.service.item.impl;
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
import com.service.item.entity.Item;

/**
 * 
 * <p>
 * Title：item
 * </p>
 * <p>
 * Description：item
 * </p>
 * <p>
 * Author : admin
 * </p>
 * <p>
 * Department : 
 * </p>
 */
@Component
public class ItemService extends BaseService implements IService {

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
			}else if("qy".equals(operType)){
				qy(pm,obj);
			}else if("jy".equals(operType)){
				jy(pm,obj);
			}else{
				pm.setData("fail");
				throw new DpException("操作类型错误，请联系系统管理员！", null);
			}
		}
	}
	
	private void index(Param pm, JSONObject obj) throws Exception{
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("itemname", obj.getString("itemname"));
			map.put("status",obj.getString("status"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao().queryForPage("item.selectItem", map,
						Item.class);
				pm.setData(list);
			} else {
				List<Item> list = getDao().query("item.selectItem", map,
						Item.class);
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
			final String itemid = IdUtil.createThirteenId();
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			getDao().getJdbcTemplate().update(
					SqlUtil.getSql("item.insertItem", null).getSql(),
					new PreparedStatementSetter() {
						public void setValues(PreparedStatement ps)
								throws SQLException {
							ps.setObject(1, itemid);
							ps.setObject(2, obj.getString("itemname"));
							ps.setObject(3, obj.getString("introduction"));
							ps.setObject(4, SystemConstant.delstatus);
							ps.setObject(5, obj.getString("vid"));
							ps.setObject(6, userId);
							ps.setObject(7, sysTime);
							ps.setObject(8, userId);
							ps.setObject(9, sysTime);
							ps.setObject(10, obj.getString("status"));
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
			map.put("itemname", obj.getString("itemname"));
			map.put("introduction", obj.getString("introduction"));
			map.put("status",obj.getString("status"));
			map.put("cid", userId);
			map.put("ctime", sysTime);
			map.put("mid", userId);
			map.put("mtime", sysTime);
			map.put("itemid", obj.getString("itemid"));
			getDao().update("item.updateItem", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("修改失败！", e);
		}
	}
	
	private void delete(Param pm, JSONObject obj) throws Exception {
		try {
			String itemid = obj.getString("itemid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("itemid", itemid);
			getDao().delete("item.deleteItem", map);
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
			String itemid = json.getString("itemid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", SystemConstant.qyzt);
			map.put("itemid", itemid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("item.updateStatus", map);
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
			String itemid = json.getString("itemid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", SystemConstant.jyzt);
			map.put("itemid", itemid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("item.updateStatus", map);
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

