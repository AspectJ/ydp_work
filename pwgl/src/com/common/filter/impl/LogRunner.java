package com.common.filter.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Random;

import org.springframework.jdbc.core.PreparedStatementSetter;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.common.constant.UserConstant;
import com.common.dp.Param;
import com.common.session.ISession;
import com.common.session.SessionManager;
import com.common.util.DaoUtil;
import com.common.util.DateUtil;
import com.common.util.SqlUtil;

public class LogRunner implements Runnable {

	private Param pm;

	public LogRunner(Param pm) {
		this.pm = pm;
	}

	@Override
	public void run() {
//		ISession sess = SessionManager.getSession(pm.getSessionId());
//		String czrid = null;
//		String name = null;
//		String lxdh = null;
//		String yhlx = null;
//		if (sess != null) {
//			czrid = (String) sess.getAttribute(UserConstant.USER_XTID);
//			name = (String) sess.getAttribute(UserConstant.YHNC);
//			lxdh = (String) sess.getAttribute(UserConstant.DLZH);
//			yhlx = (String) sess.getAttribute("yhlx");
//		}
//		final String fczrid = czrid;
//		final String fname = name;
//		final String flxdh = lxdh;
//		final String fyhlx = yhlx;
//		Object oriData = pm.getOriData();
//		String rc = null;
//		String ot = null;
//		if (null != oriData) {
//			rc = (String) oriData;
//			JSONObject dataJson = JSON.parseObject(rc);
//			ot = dataJson.getString("operType");
//		}
//		final String fot = ot;
//		final String frc = rc;
//		final String serviceId = pm.getServiceId();
//		Random random = new Random();
//		final Integer i = random.nextInt();
//		final String ip = pm.getIp();
//		DaoUtil.getDao()
//				.getJdbcTemplate()
//				.update(SqlUtil.getSql("log.insertLog", null).getSql(),
//						new PreparedStatementSetter() {
//							public void setValues(PreparedStatement ps)
//									throws SQLException {
//								ps.setObject(1, System.currentTimeMillis()
//										+ "_" + i);
//								ps.setObject(2, null);
//								ps.setObject(3, null);
//								ps.setObject(4, fczrid);
//								ps.setObject(5, fname);
//								ps.setObject(6, flxdh);
//								ps.setObject(7, DateUtil.getNowTimestamp());
//								ps.setObject(8, frc);
//								ps.setObject(9, "");
//								ps.setObject(10, serviceId);
//								ps.setObject(11, fot);
//								ps.setObject(12, fyhlx);
//								ps.setObject(13, ip);
//							}
//						});
	}

}
