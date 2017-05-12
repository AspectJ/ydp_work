package com.service.setpolicy.impl;

import java.math.BigDecimal;
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
import com.service.setpolicy.entity.SetPolicy;

/**
 * 套票政策
 * 
 * @author Administrator
 * 
 */
@Component
public class IndexSetPolicyService extends BaseService implements IService {

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
			} else if ("add".equals(operType)) {
				// 新增套票政策
				add(pm, obj);
			} else if ("update".equals(operType)) {
				update(pm, obj);
			} else if ("delete".equals(operType)) {
				delete(pm, obj);
			} else if ("updateDetail".equals(operType)) {
				updateDetail(pm, obj);
			} else if ("deleteDetail".equals(operType)) {
				deleteDetail(pm, obj);
			} else if ("querySessionSysj".equals(operType)) {
				querySessionSysj(pm, obj);
			} else {
				pm.setData("fail");
				throw new DpException("操作类型错误，请联系系统管理员！", null);
			}
		}
	}

	private void index(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("name", obj.getString("name"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			map.put("sessionsid", obj.getString("sessionsid"));
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao().queryForPage(
						"setpolicy.querySetpolicy", map, SetPolicy.class);
				pm.setData(list);
			} else {
				List<SetPolicy> list = getDao().query(
						"setpolicy.querySetpolicy", map, SetPolicy.class);
				pm.setData(list);
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}

	// 新增套票政策
	private void add(Param pm, final JSONObject obj) throws Exception {
		try {
			// final String id=obj.getString("prefpolicyid");
			// String ids=id;
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session
					.getAttribute(UserConstant.USER_XTID);
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			final String setpolicyid = IdUtil.createThirteenId();

			getDao().getJdbcTemplate().update(
					SqlUtil.getSql("setpolicy.insertTpzc", null).getSql(),
					new PreparedStatementSetter() {
						public void setValues(PreparedStatement ps)
								throws SQLException {
							ps.setObject(1, setpolicyid);
							ps.setObject(2, obj.getString("sessionsid"));// sessionsid
							ps.setObject(3, obj.getString("zcmc"));// 政策名称
							ps.setObject(4, obj.getString("sl"));// 数量
							ps.setObject(5, 0);// totalprice
							ps.setObject(6, "");// 描述
							ps.setObject(7, "");// setshow
							ps.setObject(8, obj.getString("bj"));// charshow 标记
							ps.setObject(9, obj.getString("kssj"));// 开始时间
							ps.setObject(10, obj.getString("jssj"));// 结束时间
							ps.setObject(11, userId);
							ps.setObject(12, sysTime);
							ps.setObject(13, userId);
							ps.setObject(14, sysTime);
						}
					});
			String detail = obj.getString("detail");
			if (!"".equals(detail) && null != detail) {
				String[] xq = detail.split("&");
				for (int i = 0; i < xq.length; i++) {
					JSONObject jsonObj = JSON.parseObject(xq[i]);
					if (jsonObj == null) {
						continue;
					}
					final String pricelevelid = jsonObj
							.getString("pricelevelid");
					final String tpj = jsonObj.getString("tpj");// 套票价格
					final String price = jsonObj.getString("price");// 原票价
					getDao().getJdbcTemplate().update(
							SqlUtil.getSql("setpolicy.insertDetail", null)
									.getSql(), new PreparedStatementSetter() {
								public void setValues(PreparedStatement ps)
										throws SQLException {
									ps.setObject(1, IdUtil.createThirteenId());
									ps.setObject(2, setpolicyid);
									ps.setObject(3, pricelevelid);
									ps.setObject(4, tpj);// 套票价
									ps.setObject(5, "1");
									ps.setObject(6, userId);
									ps.setObject(7, sysTime);
									ps.setObject(8, userId);
									ps.setObject(9, sysTime);
									ps.setObject(10, price);// 原票价
								}
							});
				}
			}
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("新增失败", e);
		}

	}

	// 修改
	private void update(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sessionsid", obj.getString("sessionsid"));// 场次名称
			map.put("policyname", obj.getString("yhzcmc"));// 套票名称
			map.put("des", obj.getString("sm"));// 说明
			map.put("setshow", obj.getString("sfxstp"));// 票面是否显示套票字样
			map.put("charshow", obj.getString("bj"));
			map.put("begintime", obj.getString("kssj"));// 开始时间
			map.put("endtime", obj.getString("jssj"));
			map.put("setpolicyid", obj.getString("prefpolicyid"));
			map.put("numb", obj.getString("sl"));// 数量
			getDao().update("setpolicy.updateTpzc", map);

			// 修改明细
			String detail = obj.getString("detail");
			if (!"".equals(detail) && null != detail) {
				String[] xq = detail.split("&");
				for (int i = 0; i < xq.length; i++) {
					JSONObject jsonObj = JSON.parseObject(xq[i]);
					map.clear();
					if (jsonObj == null) {
						continue;
					}
					String yhpj = jsonObj.getString("yhpj");
					String price = jsonObj.getString("price");
					String detailid = jsonObj.getString("detailid");
					map.put("oldprice", price);
					map.put("price", yhpj);
					map.put("detailid", detailid);
					getDao().update("favourable.updateDetail", map);
				}
			}
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("修改失败", e);
		}
	}

	// 删除
	private void delete(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("setpolicyid", obj.getString("setpolicyid"));
			getDao().delete("setpolicy.deleteTpzc", map);

			// 删除明细
			map.put("policyid", obj.getString("setpolicyid"));
			getDao().delete("setpolicy.deleteSDetail", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("删除失败", e);
		}
	}

	// 修改
	private void updateDetail(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("pricelevelid", obj.getString("pjdj"));
			map.put("price", obj.getString("jg"));
			map.put("detailid", obj.getString("detailid"));
			getDao().update("setpolicy.updateDetail", map);

			// 修改主表的比例
			map.put("setpolicyid", obj.getString("policyid"));
			map.put("sessionsid", obj.getString("ccmc"));
			map.put("numb", obj.getString("sl"));
			getDao().update("setpolicy.updateTpzc", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("修改失败", e);
		}
	}

	// 删除详情
	private void deleteDetail(Param pm, JSONObject obj) throws Exception {
		try {
			String price = obj.getString("price");
			String setpolicyid = obj.getString("setpolicyid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("detailid", obj.getString("detailid"));
			getDao().delete("setpolicy.deleteDetail", map);

			// 减少总价
			map.put("totalprice", price);
			map.put("setpolicyid", setpolicyid);
			getDao().update("favourable.updateReduceSumPrice", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("删除失败", e);
		}
	}

	@Override
	public void unInstall() {
		// TODO Auto-generated method stub

	}

	private void querySessionSysj(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			String sessionsid = obj.getString("sessionsid");
			map.put("sessionsid", sessionsid);
			SetPolicy setObj = (SetPolicy) getDao().queryForObject(
					"favourable.querySessionPlayTime", map, SetPolicy.class);
			pm.setData(setObj);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败", e);
		}
	}

}
