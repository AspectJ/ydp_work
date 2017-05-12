package com.service.empowersell.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
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
import com.service.empower.entity.Sqcd;
import com.service.empowersell.entity.SellPolicy;
import com.service.empowersell.entity.Xszc;
import com.service.paybox.entity.Paybox;
import com.service.seller.entity.Seller;
import com.service.sellpower.entity.Sellpower;
import com.service.setpolicy.entity.PrefPolicy;

@Component
public class IndexSellEmpowerService extends BaseService implements IService {

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
			} else if ("spjg".equals(operType)) {
				spjg(pm, obj);//售票机构
			} else if ("selectSpy".equals(operType)) {
				selectSpy(pm, obj);//售票员
			} else if ("selectSpqx".equals(operType)) {
				selectSpqx(pm, obj);//售票权限
			} else if ("saveJgspsq".equals(operType)) {
				saveJgspsq(pm, obj);//机构授权
			} else if ("saveSpyspsq".equals(operType)) {
				saveSpyspsq(pm, obj);//售票员授权
			} else if ("selectJg".equals(operType)) {
				selectJg(pm, obj);//机构
			} else if ("selectXszc".equals(operType)) {
				selectXszc(pm, obj);//销售政策
			} else if ("selectJgyh".equals(operType)) {
				selectJgyh(pm, obj);//机构用户
			} else if ("saveXszcsq".equals(operType)) {
				saveXszcsq(pm, obj);//售票员授权
			} else {
				pm.setData("fail");
				throw new DpException("操作类型错误，请联系系统管理员！", null);
			}
		}
	}

	// 添加
	private void add(Param pm, final JSONObject obj) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session
					.getAttribute(UserConstant.USER_XTID);
			final String sellpolicyid = IdUtil.createThirteenId();
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			getDao().getJdbcTemplate().update(
					SqlUtil.getSql("empowersell.insertEmpowerSell", null)
							.getSql(), new PreparedStatementSetter() {
						public void setValues(PreparedStatement ps)
								throws SQLException {
							ps.setObject(1, sellpolicyid);// sellpolicyid
							ps.setObject(2, obj.getString("ccmc"));// sessionsid
							ps.setObject(3, obj.getString("spd"));// 售票点ID
							ps.setObject(4, obj.getString("spy"));// 售票员ID
							ps.setObject(5, obj.getString("tpzc"));// 套票代码
							ps.setObject(6, obj.getString("yhzc"));// 优惠政策ID
							ps.setObject(7, userId);
							ps.setObject(8, sysTime);
							ps.setObject(9, userId);
							ps.setObject(10, sysTime);
						}
					});
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("添加失败", e);
		}
	}

	private void spjg(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("sessionsid", obj.getString("sessionsid"));
			List<Sqcd> list = getDao().query("sellempower.spjg", map, Sqcd.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败", e);
		}
	}
	
	private void selectSpy(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("sessionsid", obj.getString("sessionsid"));
			System.out.println(SqlUtil.getSql("sellempower.selectSpy", map).getSql());
			List<Sqcd> list = getDao().query("sellempower.selectSpy", map, Sqcd.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败", e);
		}
	}

	private void selectSpqx(Param pm, JSONObject obj) throws Exception {
		try {
			String flag=obj.getString("flag");
			String sqlId="";
			if("yh".equals(flag)){//用户
				sqlId="sellempower.selectSpqx";
			}else{
				sqlId="sellempower.selectSjg";
			}
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("sessionsid", obj.getString("sessionsid"));
			List<Sellpower> list = getDao().query(sqlId, map, Sellpower.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败", e);
		}
	}

	private void saveJgspsq(Param pm, JSONObject obj) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session.getAttribute(UserConstant.USER_XTID);
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			String[] spqxids = obj.getString("spqxids").split(",");
			final String[] jgids = obj.getString("jgids").split(",");
			final String sessionsid = obj.getString("sessionsid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("jgids", jgids);
			map.put("sessionsid", obj.getString("sessionsid"));
		    System.out.println(SqlUtil.getSql("sellempower.deleteJgspsq", map).getSql());
			getDao().delete("sellempower.deleteJgspsq", map);
			for (final String id : spqxids) {
				getDao().getJdbcTemplate().batchUpdate(
						SqlUtil.getSql("sellempower.saveJgspsq", null)
								.getSql(),
						new BatchPreparedStatementSetter() {
							@Override
							public void setValues(PreparedStatement ps,
									int i) throws SQLException {
								ps.setObject(1, IdUtil.createThirteenId());
								ps.setObject(2, sessionsid);
								ps.setObject(3, jgids[i]);
								ps.setObject(4, id);
								ps.setObject(5, userId);
								ps.setObject(6, sysTime);
								ps.setObject(7, userId);
								ps.setObject(8, sysTime);
							}

							@Override
							public int getBatchSize() {
								return jgids.length;
							}
						});
			}
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("授权失败", e);
		}
	}

	private void saveSpyspsq(Param pm, JSONObject obj) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session.getAttribute(UserConstant.USER_XTID);
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			String[] spqxids = obj.getString("spqxids").split(",");
			String[] spyids = obj.getString("spyids").split(",");
			final String sessionsid = obj.getString("sessionsid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("spyids", spyids);
			map.put("sessionsid", sessionsid);
			getDao().delete("sellempower.deleteSpyspsq", map);
			final List<Seller> list = getDao().query("sellempower.selectSellerByIds", map, Seller.class);			
			for (final String id : spqxids) {
				getDao().getJdbcTemplate().batchUpdate(
						SqlUtil.getSql("sellempower.saveSpyspsq", null)
								.getSql(),
						new BatchPreparedStatementSetter() {
							@Override
							public void setValues(PreparedStatement ps,
									int i) throws SQLException {
								ps.setObject(1, IdUtil.createThirteenId());
								ps.setObject(2, sessionsid);
//								ps.setObject(3, list.get(i).getPayboxid());
								ps.setObject(3, list.get(i).getSellerid());
								ps.setObject(4, id);
								ps.setObject(5, userId);
								ps.setObject(6, sysTime);
								ps.setObject(7, userId);
								ps.setObject(8, sysTime);
							}

							@Override
							public int getBatchSize() {
								return list.size();
							}
						});
			}
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("授权失败", e);
		}
	}
	
	private void selectJg(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("payboxname", obj.getString("payboxname"));
			map.put("areaname", obj.getString("areaname"));
			List<Paybox> list = getDao().query("sellempower.selectJg", map, Paybox.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败", e);
		}
	}
	
	private void selectXszc(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sessionsid", obj.getString("sessionsid"));
			System.out.println(SqlUtil.getSql("sellempower.selectXszc", map).getSql());
			List<Xszc> list = getDao().query("sellempower.selectXszc", map, Xszc.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败", e);
		}
	}
	
	private void selectJgyh(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sessionsid", obj.getString("sessionsid"));
			List<Sqcd> list = getDao().query("sellempower.queryZtree", map, Sqcd.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败", e);
		}
	}
	
	private void saveXszcsq(Param pm, final JSONObject obj) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session.getAttribute(UserConstant.USER_XTID);
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			String[] spyids = obj.getString("sqjgids").split(",");//售票员
			final String []xszcids=obj.getString("xszcids").split(",");//销售政策代码
			final String sessionsid = obj.getString("sessionsid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("spyids", spyids);			
			final List<Seller> list = getDao().query("sellempower.selectSellerByIds", map, Seller.class);
			map.clear();
			map.put("sellerid", spyids);
			map.put("sessionsid", sessionsid);
//			map.put("setpolicyid", xszcids);
//			map.put("prefpolicyid", xszcids);
			getDao().delete("sellempower.deleteXszcgx", map);
			for(int i=0;i<list.size();i++){
			  final int x=i;
			  for(int j=0;j<xszcids.length;j++){
				   final  int t= j;
					getDao().getJdbcTemplate().update(
							SqlUtil.getSql("sellempower.saveXszcsq", null).getSql(),
							new PreparedStatementSetter() {
								public void setValues(PreparedStatement ps)
										throws SQLException {
									ps.setObject(1, IdUtil.createThirteenId());
									ps.setObject(2, sessionsid);
									ps.setObject(3, list.get(x).getPayboxid());
									ps.setObject(4, list.get(x).getSellerid());
									ps.setObject(5, xszcids[t]);
									ps.setObject(6, xszcids[t]);
									ps.setObject(7, userId);
									ps.setObject(8,sysTime);
									ps.setObject(9, userId);
									ps.setObject(10, sysTime);
								}
							}); 
				}
			}
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("授权失败", e);
		}
	}

	@Override
	public void unInstall() {
		// TODO Auto-generated method stub

	}

}
