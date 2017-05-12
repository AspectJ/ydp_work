package com.service.quotasmanager.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
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
import com.common.dp.Param;
import com.common.exception.DpException;
import com.common.util.IdUtil;
import com.common.util.SqlUtil;
import com.service.BaseService;
import com.service.IService;
import com.service.quotasmanager.entity.QuotasManager;
import com.service.quotasmanager.entity.Xsjg;

/**
 * 配管管理
 * 
 * @author xjm
 * 
 */
@Component
public class IndexQuotasManagerService extends BaseService implements IService {

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
			if ("index".equals(operType)) {
				index(pm, obj);
			} else if ("setCcpe".equals(operType)) {
				setCcpe(pm, obj);
			} else if ("xsjg".equals(operType)) {
				xsjg(pm, obj);
			} else if ("addXsjg".equals(operType)) {
				addXsjg(pm, obj);
			} else {
				pm.setData("fail");
				throw new DpException("操作类型错误，请联系系统管理员！", null);
			}
		}
	}

	private void index(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("xmm", obj.getString("xmm"));
			map.put("ccmc", obj.getString("ccmc"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao().queryForPage(
						"quotasmanager.selectQuotasmanager", map,
						QuotasManager.class);
				pm.setData(list);
			} else {
				List<QuotasManager> list = getDao().query(
						"quotasmanager.selectWhamManager", map,
						QuotasManager.class);
				pm.setData(list);
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}

	private void setCcpe(Param pm, JSONObject obj) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			final String sessionsid = obj.getString("sessionsid");
			final String ccpe = obj.getString("ccpe");
			map.put("sessionsid", sessionsid);
			getDao().delete("quotasmanager.deleteQuotasManager", map);

			// 写入
			getDao().getJdbcTemplate().update(
					SqlUtil.getSql("quotasmanager.insertQuotasManager", null)
							.getSql(), new PreparedStatementSetter() {
						public void setValues(PreparedStatement ps)
								throws SQLException {
							ps.setObject(1, IdUtil.createThirteenId());
							ps.setObject(2, sessionsid);// sessionsid
							ps.setObject(3, ccpe);// ccpe
						}
					});
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}

	// 销售机构
	private void xsjg(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				map.put("sessionsid", obj.getString("sessionsid"));
				Object[] list = getDao().queryForPage(
						"quotasmanager.queryXsjg", map, Xsjg.class);
				pm.setData(list);
			} else {
				List<Xsjg> list = getDao().query("quotasmanager.queryXsjg",
						map, Xsjg.class);
				pm.setData(list);
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}

	// 添加销售机构
	private void addXsjg(Param pm, JSONObject obj) throws Exception {
		try {
			String detail = obj.getString("detail");
			final String sessionid = obj.getString("sessionsid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sessionsid", sessionid);
			getDao().delete("quotasmanager.deleteCcxsjg", map);
			if (!"".equals(detail) && null != detail) {
				String[] xq = detail.split("&");
				for (int i = 0; i < xq.length; i++) {
					JSONObject jsonObj = JSON.parseObject(xq[i]);
					if (jsonObj == null) {
						continue;
					}

					final String quota = jsonObj.getString("quota");
					final String payboxid = jsonObj.getString("payboxid");
					getDao().getJdbcTemplate().update(
							SqlUtil.getSql("quotasmanager.insertCcxsjg", null)
									.getSql(), new PreparedStatementSetter() {
								public void setValues(PreparedStatement ps)
										throws SQLException {
									ps.setObject(1, IdUtil.createThirteenId());
									ps.setObject(2, sessionid);
									ps.setObject(3, payboxid);
									ps.setObject(4, quota);
								}
							});
				}
			}
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("添加失败", e);
		}
	}

	@Override
	public void unInstall() {
		// TODO Auto-generated method stub

	}

}
