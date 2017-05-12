package com.service.payboxempower.impl;

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
import com.service.empowersell.entity.SellPolicy;
import com.service.empowersell.entity.SellerPower;

/**
 * 售票员授权
 * 
 * @author Administrator
 * 
 */
@Component
public class IndexPayboxEmPowerService extends BaseService implements IService {

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
			if ("add".equals(operType)) {
				add(pm, obj);
			} else if ("queryCcmc".equals(operType)) {
				queryCcmc(pm, obj);
			} else if ("querySpd".equals(operType)) {
				querySpd(pm, obj);
			} else if ("spy".equals(operType)) {
				querySpy(pm, obj);
			} else if ("queryQxmc".endsWith(operType)) {
				qxmc(pm, obj);
			} else {
				pm.setData("fail");
				throw new DpException("操作类型错误，请联系系统管理员！", null);
			}
		}
	}

	// 查询场次名称
	private void queryCcmc(Param pm, JSONObject obj) throws Exception {
		try {
			List<SellPolicy> list = getDao().query("empowersell.queryCcmc",
					null, SellPolicy.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("加载失败");
			throw new DpException("加载失败", e);
		}
	}

	// 查询售票点
	private void querySpd(Param pm, JSONObject obj) throws Exception {
		try {
			List<SellPolicy> list = getDao().query("empowersell.querySpd",
					null, SellPolicy.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("加载失败");
			throw new DpException("加载失败", e);
		}
	}

	// 查询售票员
	private void querySpy(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("payboxid", obj.getString("payboxid"));
			List<SellPolicy> list = getDao().query("empowersell.querySpy", map,
					SellPolicy.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("加载失败");
			throw new DpException("加载失败", e);
		}
	}

	// 查询权限名称
	private void qxmc(Param pm, JSONObject obj) throws Exception {
		try {
			List<SellerPower> list = getDao().query(
					"payboxempower.querySellpower", null, SellerPower.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("加载失败");
			throw new DpException("加载失败", e);
		}
	}

	// 添加
	private void add(Param pm, final JSONObject obj) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session
					.getAttribute(UserConstant.USER_XTID);
			final String sellerpowerid = IdUtil.createThirteenId();
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			getDao().getJdbcTemplate().update(
					SqlUtil.getSql("payboxempower.insertSellpower", null)
							.getSql(), new PreparedStatementSetter() {
						public void setValues(PreparedStatement ps)
								throws SQLException {
							ps.setObject(1, sellerpowerid);// sellpolicyid
							ps.setObject(2, obj.getString("ccmc"));// sessionsid
							ps.setObject(3, obj.getString("spd"));// 售票点ID
							ps.setObject(4, obj.getString("spy"));// 售票员ID
							ps.setObject(5, obj.getString("qxmc"));// 权限代码
							ps.setObject(6, SystemConstant.delstatus);//删除状态
							ps.setObject(7, 0);//数据库版本号
							ps.setObject(8, userId);
							ps.setObject(9, sysTime);
							ps.setObject(10, userId);
							ps.setObject(11, sysTime);
						}
					});
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
