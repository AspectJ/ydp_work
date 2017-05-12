package com.service.api.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.common.constant.PageConstant;
import com.common.constant.SystemConstant;
import com.common.constant.TypeConstant;
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
import com.service.api.entity.ApiOrderCode;
import com.service.api.entity.ApiReport;
import com.service.api.entity.ApiReprint;

/**
 * 重打申请列表
 * 
 * @author xjm
 * 
 */
@Component
public class ApiReprintService extends BaseService implements IService {

	@Override
	public void install() {
		// TODO Auto-generated method stub

	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void service(Param pm) throws Exception {

		String data = (String) pm.getData();
		int dataPackType = pm.getDataFormat();
		if (SystemConstant.jsonType == dataPackType) {
			JSONObject obj = JSON.parseObject(data);
			String operType = obj.getString("operType");
			if ("index".equals(operType)) {// 重打列表
				index(pm, obj);
			} else if ("add".equals(operType)) {
				add(pm, obj);
			} else if ("update".equals(operType)) {
				update(pm, obj);
			} else {
				Map<String, Object> retMap = new HashMap<String, Object>();
				retMap.put(TypeConstant.SF, TypeConstant.FAIL);
				retMap.put(TypeConstant.SHOW_MSG, "操作类型错误！");
				pm.setData(retMap);
				throw new DpException("操作类型错误!", null);
			}
		}
	}

	// 重打列表
	private void index(Param pm, JSONObject obj) throws Exception {
		Map<String, Object> retMap = new HashMap<String, Object>();
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if (null == page || null == rowNum) {
				retMap.put(TypeConstant.SF, "pageError");
				retMap.put(TypeConstant.SHOW_MSG, "分页参数有误!");
				pm.setData(retMap);
				return;
			}
			map.put(PageConstant.PAGE_NUM, page);
			map.put(PageConstant.ROW_NUMS, rowNum);
			String itemid = obj.getString("itemid");// 项目Id
			String sessionsname = obj.getString("sessionsname");// 场次名称
			String venueid = obj.getString("venueid");// 场馆ID
			String ordercode = obj.getString("ordercode");// 订单编号
			map.put("itemid", itemid);
			map.put("sessionsname", sessionsname);
			map.put("venueid", venueid);
			map.put("ordercode", ordercode);

			Object[] objArr = getDao().queryForPage("apireprint.queryPrint",
					map, ApiReprint.class);
			List<ApiReprint> list = null;
			Integer totalCount = 0;
			Integer totalPageSize = 0;
			if (null != objArr && objArr.length > 0) {
				list = (List<ApiReprint>) objArr[0];
				totalCount = (Integer) objArr[1];
				totalPageSize = (Integer) objArr[2];
			}
			retMap.put("data", list);// 数据列表
			retMap.put("totalCount", totalCount);// 总记录数
			retMap.put("totalPageSize", totalPageSize);// 总页数
			retMap.put("pageNum", page);// 当前页
			retMap.put(TypeConstant.SF, TypeConstant.SUCCESS);
			retMap.put(TypeConstant.SHOW_MSG, "重打申请列表成功！");
			pm.setData(retMap);
		} catch (Exception e) {
			retMap.put(TypeConstant.SF, TypeConstant.FAIL);
			retMap.put(TypeConstant.SHOW_MSG, "重打申请列表失败！");
			pm.setData(retMap);
			throw new DpException("重打申请列表失败！", e);
		}
	}

	// 添加
	private void add(Param pm, JSONObject obj) throws Exception {
		Map<String, Object> retMap = new HashMap<String, Object>();
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session
					.getAttribute(UserConstant.USER_XTID);// 售票员
			final String orderid = obj.getString("orderid");// 订单ID
			final String pewids = obj.getString("pewids");// 座位ids
			final String des=obj.getString("des");//描述

			// 根据订单id和座位ids,查询出明细ids
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("orderid", orderid);
			if (!"".equals(pewids) && null != pewids) {
				map.put("pewids", pewids.split(","));
			}
			List<ApiReport> list = getDao().query(
					"apireprint.queryRepeatPrint", map, ApiReport.class);
			if (list.size() > 0 && list != null) {

				// 写入重打记录表
				for (int i = 0; i < list.size(); i++) {
					final ApiReport reObj = list.get(i);
					getDao().getJdbcTemplate().update(
							SqlUtil.getSql("apireprint.insertReprint", null)
									.getSql(), new PreparedStatementSetter() {
								public void setValues(PreparedStatement ps)
										throws SQLException {
									ps.setObject(1, IdUtil.createThirteenId());
									ps.setObject(2, orderid);
									ps.setObject(3, reObj.getOrdercode());// 订单编号
									ps.setObject(4, reObj.getDetailid());// 订单明细ID
									ps.setObject(5, userId);// 申请人
									ps.setObject(6, DateUtil.getNowTimestamp());// 申请时间
									ps.setObject(7, userId);// 审核人
									ps.setObject(8, DateUtil.getNowTimestamp());// 审核时间
									ps.setObject(9, "1");// 重打状态：1待审核 2审核通过
															// 3审核未通过
									ps.setObject(10, "1");// 重打标记：1未重打 2已重打
									ps.setObject(11, des);//描述
									ps.setObject(12, "0");// 数据库版本号
									ps.setObject(13, userId);// 操作人
									ps.setObject(14, DateUtil.getNowTimestamp());// 操作时间
									ps.setObject(15, userId);// 修改人
									ps.setObject(16, DateUtil.getNowTimestamp());// 修改时间
								}
							});
				}
			}
			retMap.put(TypeConstant.SF, TypeConstant.SUCCESS);
			retMap.put(TypeConstant.SHOW_MSG, "重打申请成功！");
			pm.setData(retMap);
		} catch (Exception e) {
			retMap.put(TypeConstant.SF, TypeConstant.FAIL);
			retMap.put(TypeConstant.SHOW_MSG, "重打申请失败！");
			pm.setData(retMap);
			throw new DpException("重打申请失败！", e);
		}
	}

	// 修改
	private void update(Param pm, JSONObject obj) throws Exception {
		Map<String, Object> retMap = new HashMap<String, Object>();
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session
					.getAttribute(UserConstant.USER_XTID);// 售票员
			Map<String, Object> map = new HashMap<String, Object>();
			String reprintid = obj.getString("reprintid");
			map.put("reprintid", reprintid);
			map.put("mid", userId);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("apireprint.updateReprint", map);
			retMap.put(TypeConstant.SF, TypeConstant.SUCCESS);
			retMap.put(TypeConstant.SHOW_MSG, "完成重打成功！");
			pm.setData(retMap);
		} catch (Exception e) {
			retMap.put(TypeConstant.SF, TypeConstant.FAIL);
			retMap.put(TypeConstant.SHOW_MSG, "完成重打失败！");
			pm.setData(retMap);
			throw new DpException("完成重打失败！", e);
		}
	}

	@Override
	public void unInstall() {
		// TODO Auto-generated method stub

	}

}
