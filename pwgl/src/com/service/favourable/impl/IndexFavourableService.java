package com.service.favourable.impl;

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
import com.service.favourable.entity.Favourable;
import com.service.setpolicy.entity.PolicyDetail;

/**
 * 优惠政策
 * 
 * @author Administrator
 * 
 */
@Component
public class IndexFavourableService extends BaseService implements IService {

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
			} else if ("queryCcmc".equals(operType)) {
				queryCcmc(pm, obj);
			} else if ("queryPjdj".equals(operType)) {
				queryPjdj(pm, obj);
			} else if ("add".equals(operType)) {
				add(pm, obj);
			} else if ("queryDetail".equals(operType)) {
				queryDetail(pm, obj);
			} else if ("updateYhzc".equals(operType)) {
				updateYhzc(pm, obj);
			} else if ("updateDetail".equals(operType)) {
				updateDetail(pm, obj);
			} else if ("deleteDetail".equals(operType)) {
				deleteDetail(pm, obj);
			} else if ("deleteYhzc".equals(operType)) {
				deleteYhzc(pm, obj);
			} else if ("selectPjdj".equals(operType)) {
				selectPjdj(pm, obj);
			} else {
				pm.setData("fail");
				throw new DpException("操作类型错误，请联系系统管理员！", null);
			}
		}
	}

	private void selectPjdj(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("name", obj.getString("name"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				map.put("sessionsid", obj.getString("sessionsid"));
				Object[] list = getDao().queryForPage("favourable.selectPjdj",
						map, Favourable.class);
				pm.setData(list);
			} else {
				List<Favourable> list = getDao().query("favourable.selectPjdj",
						map, Favourable.class);
				pm.setData(list);
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}

	// 加载
	private void index(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("name", obj.getString("name"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				map.put("sessionsid", obj.getString("sessionsid"));
				Object[] list = getDao().queryForPage(
						"favourable.queryPrefpolicy", map, Favourable.class);
				pm.setData(list);
			} else {
				List<Favourable> list = getDao().query(
						"favourable.queryPrefpolicy", map, Favourable.class);
				pm.setData(list);
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}

	// 查询场次名称
	private void queryCcmc(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("itemid", obj.getString("itemid"));
			List<Favourable> list = getDao().query("favourable.queryCcmc", map,
					Favourable.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败", e);
		}
	}

	// 加载票价等级
	private void queryPjdj(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sessionsid", obj.getString("sessionsid"));
			List<Favourable> list = getDao().query("favourable.queryPjdj", map,
					Favourable.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败", e);
		}
	}

	// 新增优惠政策
	private void add(Param pm, final JSONObject obj) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session
					.getAttribute(UserConstant.USER_XTID);
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			final String prefpolicyid = IdUtil.createThirteenId();
			final String sl = obj.getString("sl");
			getDao().getJdbcTemplate().update(
					SqlUtil.getSql("favourable.insertYhzc", null).getSql(),
					new PreparedStatementSetter() {
						public void setValues(PreparedStatement ps)
								throws SQLException {
							ps.setObject(1, prefpolicyid);
							ps.setObject(2, obj.getString("ccmc"));// sessionsid
							ps.setObject(3, obj.getString("yhzcmc"));// 优惠政策名称
							ps.setObject(4, 0);// 价格
							ps.setObject(5, 0);// 折扣比例
							ps.setObject(6, obj.getString("bj"));// 票面显示的指定文字
							ps.setObject(7, "");// 是否显示原价
							ps.setObject(8, "");// 是否显示折扣价
							ps.setObject(9, obj.getString("kssj"));// 开始时间
							ps.setObject(10, obj.getString("jssj"));// 结束时间
							ps.setObject(11, userId);
							ps.setObject(12, sysTime);
							ps.setObject(13, userId);
							ps.setObject(14, sysTime);
							ps.setObject(15, sl);// 数量
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
					final String yhpj = jsonObj.getString("yhpj");
					final String price=jsonObj.getString("price");
					getDao().getJdbcTemplate().update(
							SqlUtil.getSql("favourable.insertDetail", null)
									.getSql(), new PreparedStatementSetter() {
								public void setValues(PreparedStatement ps)
										throws SQLException {
									ps.setObject(1, IdUtil.createThirteenId());
									ps.setObject(2, prefpolicyid);
									ps.setObject(3, pricelevelid);
									ps.setObject(4, yhpj);
									ps.setObject(5, "2");
									ps.setObject(6, userId);
									ps.setObject(7, sysTime);
									ps.setObject(8, userId);
									ps.setObject(9, sysTime);
									ps.setObject(10, price);
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

	// 查询明细
	private void queryDetail(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("policyid", obj.getString("prefpolicyid"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao().queryForPage(
						"favourable.queryTpDetail", map, PolicyDetail.class);
				pm.setData(list);
			} else {
				List<PolicyDetail> list = getDao().query(
						"favourable.queryTpDetail", map, PolicyDetail.class);
				pm.setData(list);
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}

	// 修改优惠政策
	private void updateYhzc(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sessionsid", obj.getString("ccmc"));
			map.put("policyname", obj.getString("yhzcmc"));// 优惠政策名称
			map.put("agio", obj.getString("zkbl"));// 折扣比例
			map.put("charshow", obj.getString("bj"));// 票价是否指定
			map.put("begintime", obj.getString("kssj"));// 开始时间
			map.put("endtime", obj.getString("jssj"));// 结束时间
			map.put("prefpolicyid", obj.getString("prefpolicyid"));
			map.put("numb", obj.getString("sl"));//数量			
			getDao().update("favourable.updateYhzc", map);
			
			//修改明细			
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
					String price=jsonObj.getString("price");
					String detailid=jsonObj.getString("detailid");
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

	// 修改
	private void updateDetail(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("pricelevelid", obj.getString("pjdj"));
			map.put("price", obj.getString("jg"));
			map.put("detailid", obj.getString("detailid"));
			getDao().update("favourable.updateDetail", map);

			// 修改主表的比例
			map.put("prefpolicyid", obj.getString("policyid"));
			map.put("numb", obj.getString("sl"));
			map.put("sessionsid", obj.getString("ccmc"));
			getDao().update("favourable.updateYhzc", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("修改失败", e);
		}
	}

	// 删除详情
	private void deleteDetail(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("detailid", obj.getString("detailid"));
			getDao().delete("favourable.deleteDetail", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("删除失败", e);
		}
	}

	// 删除优惠政策
	private void deleteYhzc(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("prefpolicyid", obj.getString("prefpolicyid"));
			getDao().delete("favourable.deleteYhzc", map);

			// 删除明细
			map.put("policyid", obj.getString("prefpolicyid"));
			getDao().update("favourable.deleteSDetail", map);
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

}
