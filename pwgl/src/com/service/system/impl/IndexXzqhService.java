package com.service.system.impl;

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
import com.common.dp.Param;
import com.common.exception.DpException;
import com.common.sql.SqlResult;
import com.common.util.DateUtil;
import com.common.util.SqlUtil;
import com.service.BaseService;
import com.service.IService;
import com.service.system.entity.Xzqh;

/**
 * 
 * <p>
 * Title：行政区划
 * </p>
 * <p>
 * Description：2014
 * </p>
 * <p>
 * Author : 2014-4-4
 * </p>
 * <p>
 * Department :
 * </p>
 */
@Component
public class IndexXzqhService extends BaseService implements IService {

	@Transactional
	public void service(Param pm) throws Exception {
		String data = (String) pm.getData();
		if (StringUtils.trimToNull(data) == null) {
			return;
		}
		int dataPackType = pm.getDataFormat();
		if (SystemConstant.jsonType == dataPackType) {
			JSONObject json = JSON.parseObject(data);
			String operType = json.getString("operType");
			if ("index".equals(operType)) {
				index(pm, json);
			} else if ("add".equals(operType)) {
				add(pm, json);
			} else if ("delete".equals(operType)) {
				delete(pm, json);
			} else if ("update".equals(operType)) {
				update(pm, json);
			}else if("queryArea".equals(operType)){	//查询树
				queryAreaTree(pm,json);
			}else if ("queryXzqh".equals(operType)) {
				queryXzqh(pm, json);
			}
		}
	}

	//加载行政区划
	private void queryXzqh(Param pm, JSONObject json) {
		Map<String, Object> returnMsg = new HashMap<String, Object>();
		String type = json.getString("type");
		String sqlId = "";
		try {	
			if("1".equals(type)){
				sqlId = "xzqh.querySheng";
			}else if("2".equals(type)){
				sqlId = "xzqh.queryShi";
			}else{	
				sqlId = "xzqh.queryXian";
			}
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("sheng", json.getString("sheng"));
			map.put("shi", json.getString("shi"));	
			List<Xzqh> listHp = getDao().query(sqlId, map, Xzqh.class);
			pm.setData(listHp);
		} catch (Exception e) {
			returnMsg.put("sf", "fail");
			pm.setData(returnMsg);
			throw new DpException("查询行政区划失败", e);
		}
	}	
	
	private void index(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("dqmc", obj.getString("dqmc"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);				
				Object[] list = getDao().queryForPage("system.selectXzqh", map,Xzqh.class);
				pm.setData(list);
			} else {
				List<Xzqh> list = getDao().query("system.selectXzqh", map,Xzqh.class);
				pm.setData(list);
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}
	
	private void queryAreaTree(Param pm, JSONObject obj) {
		try {
			//Map<String, Object> map = new HashMap<String, Object>();
			SqlResult sr = SqlUtil.getSql("system.queryAreaTree", null);
			List<Xzqh> list = getDao().query("system.queryAreaTree", null,Xzqh.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}

	@Transactional
	private void add(Param pm, final JSONObject json) throws Exception {
		try {
			// 检查位数
			final String xzqhdm = json.getString("xzqhdm");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("xzqhdm", xzqhdm);
			Xzqh xzqh = (Xzqh) getDao().queryForObject("system.getXzqhByDm",
					map, Xzqh.class);
			if (null != xzqh) {
				pm.setData("该行政区划已经存在！");
				return;
			}
			int len = xzqhdm.length();
			if (len != 6 && len != 9) {
				pm.setData("行政区划代码位数错误，请认真核对！");
				return;
			}

			// 根据行政区划代码截取上级代码
			String sjdm = "";
			if (len == 6) {

				// 4-6位
				String fs = xzqhdm.substring(2, 6);
				if (fs.equals("0000")) {// 新增的为省
					sjdm = "360";
				} else {
					fs = xzqhdm.substring(4, 6);
					if (fs.equals("00")) {// 新增的为市,上级为省
						sjdm = xzqhdm.substring(0, 2) + "0000";
					} else {// 新增的为县，上级为市
						sjdm = xzqhdm.substring(0, 4) + "00";
					}
				}

			} else if (len == 9) {// 街道,上级为县
				sjdm = xzqhdm.substring(0, 6);
			}

			// 检查上级代码是否存在
			if (!sjdm.equals("360")) {
				map.clear();
				map.put("xzqhdm", sjdm);
				xzqh = (Xzqh) getDao().queryForObject("system.getXzqhByDm",
						map, Xzqh.class);
				if (null == xzqh) {
					pm.setData("对应的上级行政区划不存在，请先添加好上级行政区划！");
					return;
				}
			}

			final String sj = sjdm;
			String tempCj = "0";
			if (xzqh != null) {
				tempCj = String.valueOf(Integer.valueOf(xzqh.getCj()) + 1);
			}
			final String cj = tempCj;
			List<String> max = getDao().querySingleColumnList("system.selectMaxpxh", map, String.class);
			final int pxh = Integer.parseInt(max.get(0))+1;
			final Timestamp sysTime = DateUtil.getNowTimestamp();
 			getDao().getJdbcTemplate().update(
					SqlUtil.getSql("system.insertXzqh", null).getSql(),
					new PreparedStatementSetter() {
						public void setValues(PreparedStatement ps)
								throws SQLException {
							ps.setObject(1, xzqhdm);
							ps.setObject(2, json.getString("xzqhmc"));
							ps.setObject(3, sj);
							ps.setObject(4, cj);
							ps.setObject(5, pxh);
							ps.setObject(6, sysTime);
							ps.setObject(7, sysTime);
						}
					});
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new Exception("新增失败！", e);
		}
	}

	@Transactional
	private void update(Param pm, final JSONObject json) throws Exception {
		try {
			// 检查位数
			final String xzqhdm = json.getString("updatexzqhid");
			String updatexzqhid = json.getString("updatexzqhid");
			Map<String, Object> map = new HashMap<String, Object>();
			Xzqh xzqh = null;
			if (!xzqhdm.equals(updatexzqhid)) {
				map.put("xzqhdm", xzqhdm);
				xzqh = (Xzqh) getDao().queryForObject("system.getXzqhByDm",map, Xzqh.class);
				if (null != xzqh) {
					pm.setData("该行政区划已经存在！");
					return;
				}
			}
			int len = xzqhdm.length();
			if (len != 6 && len != 9) {
				pm.setData("行政区划代码位数错误，请认真核对！");
				return;
			}

			// 根据行政区划代码截取上级代码
			String sjdm = "";
			if (len == 6) {

				// 4-6位
				String fs = xzqhdm.substring(2, 6);
				if (fs.equals("0000")) {// 新增的为省
					sjdm = "360";
				} else {
					fs = xzqhdm.substring(4, 6);
					if (fs.equals("00")) {// 新增的为市,上级为省
						sjdm = xzqhdm.substring(0, 2) + "0000";
					} else {// 新增的为县，上级为市
						sjdm = xzqhdm.substring(0, 4) + "00";
					}
				}

			} else if (len == 9) {// 街道,上级为县
				sjdm = xzqhdm.substring(0, 6);
			}

			// 检查上级代码是否存在
			if (!sjdm.equals("360")) {
				map.clear();
				map.put("xzqhdm", sjdm);
				xzqh = (Xzqh) getDao().queryForObject("system.getXzqhByDm",
						map, Xzqh.class);
				if (null == xzqh) {
					pm.setData("对应的上级行政区划不存在，请先添加好上级行政区划！");
					return;
				}
			}

			final String sj = sjdm;
			String tempCj = "0";
			if (xzqh != null) {
				tempCj = String.valueOf(Integer.valueOf(xzqh.getCj()) + 1);
			}
			final String cj = tempCj;

			map.clear();
			map.put("xzqhdm", updatexzqhid);
			map.put("xzqhmc", json.getString("updatexzqhmc"));
			map.put("sjxzqhdm", sj);
			map.put("cj", cj);
			map.put("oldxzqhid", json.getString("oldxzqhid"));
			getDao().update("system.updateXzqh", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new Exception("更新失败", e);
		}
	}

	@Transactional
	private void delete(Param pm, final JSONObject json) throws Exception {
		try {
			String xzqhId = json.getString("xzqhdm");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("xzqhdm", xzqhId);
			Xzqh xzqh = (Xzqh) getDao().queryForObject("system.getChildXzqh",
					map, Xzqh.class);
			if (null != xzqh) {
				pm.setData("该行政区划下还有下级行政区划，请先删除其下级行政区划！");
				return;
			}
			getDao().delete("system.deleteXzqh", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new Exception("删除失败", e);
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
