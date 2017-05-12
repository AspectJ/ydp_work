package com.service.api.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.common.constant.PageConstant;
import com.common.constant.SystemConstant;
import com.common.constant.TypeConstant;
import com.common.dp.Param;
import com.common.exception.DpException;
import com.common.util.SqlUtil;
import com.service.BaseService;
import com.service.IService;
import com.service.api.entity.ApiPriceLevel;
import com.service.api.entity.ApiReport;
import com.service.api.entity.ApiTp;
import com.service.api.entity.ApiTpPriceNum;

/**
 * 销售员销售报表
 * 
 * @author xjm
 * 
 */
@Component
public class ApiReportService extends BaseService implements IService {

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
			if ("seller".equals(operType)) {// 销售员销售
				seller(pm, obj);
			} else if ("newseller".equals(operType)) {// 新的销售报表
				newseller(pm, obj);
			} else {
				Map<String, Object> retMap = new HashMap<String, Object>();
				retMap.put(TypeConstant.SF, TypeConstant.FAIL);
				retMap.put(TypeConstant.SHOW_MSG, "操作类型错误！");
				pm.setData(retMap);
				throw new DpException("操作类型错误!", null);
			}
		}
	}

	// 销售员销售列表
	private void seller(Param pm, JSONObject obj) throws Exception {
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
			String payboxid = obj.getString("payboxid");
			String sellerid = obj.getString("sellerid");
			String bgtime = obj.getString("bgtime");
			String endtime = obj.getString("endtime");
			map.put("payboxid", payboxid);
			map.put("sellerid", sellerid);
			map.put("bgtime", bgtime);
			map.put("endtime", endtime);
			Object[] objArr = getDao().queryForPage("apireport.queryReport",
					map, ApiReport.class);
			List<ApiReport> list = null;
			Integer totalCount = 0;
			Integer totalPageSize = 0;
			if (null != objArr && objArr.length > 0) {
				list = (List<ApiReport>) objArr[0];
				totalCount = (Integer) objArr[1];
				totalPageSize = (Integer) objArr[2];
			}
			retMap.put("data", list);// 数据列表
			retMap.put("totalCount", totalCount);// 总记录数
			retMap.put("totalPageSize", totalPageSize);// 总页数
			retMap.put("pageNum", page);// 当前页
			retMap.put(TypeConstant.SF, TypeConstant.SUCCESS);
			retMap.put(TypeConstant.SHOW_MSG, "销售员销售列表成功！");
			pm.setData(retMap);
		} catch (Exception e) {
			retMap.put(TypeConstant.SF, TypeConstant.FAIL);
			retMap.put(TypeConstant.SHOW_MSG, "销售员销售列表失败！");
			pm.setData(retMap);
			throw new DpException("销售员销售列表失败！", e);
		}
	}

	//
	private void newseller(Param pm, JSONObject obj) throws Exception {
		Map<String, Object> retMap = new HashMap<String, Object>();
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			String sessionsid = obj.getString("sessionsid");
			map.put("sessionsid", sessionsid);

			// 查询场次票价，票价等级
			List<ApiPriceLevel> list = getDao().query(
					"apireport.queryPriceLevel", map, ApiPriceLevel.class);

			// 查询场次的优惠政策和套票政策
			List<ApiTp> tpList = getDao().query("apireport.querySessionTpOrYh",
					map, ApiTp.class);
			map.put("sessionsid1", sessionsid);
			map.put("sessionsid", sessionsid);
			for (ApiTp priceObj : tpList) {
				String tpid = priceObj.getSetpolicyid();
				map.put("policyid", tpid);
				List<ApiTpPriceNum> numObj = getDao().query(
						"apireport.queryTpYhSlPrice", map, ApiTpPriceNum.class);
				priceObj.setNum(numObj);
			}

			for (ApiPriceLevel pObj : list) {
				String pricelevelid = pObj.getPricelevelid();
				map.put("pricelevelid", pricelevelid);
				ApiPriceLevel objs = (ApiPriceLevel) getDao().queryForObject(
						"apireport.queryTpAndYhSum", map, ApiPriceLevel.class);
				if (objs != null) {
					String price = objs.getSumprice();
					String num = objs.getSumnumb();
					pObj.setSumprice(price);
					pObj.setSumnumb(num);
				}
			}
			retMap.put("list", list);// 票价等级列表
			retMap.put("data", tpList);// 数据列表
			retMap.put(TypeConstant.SF, TypeConstant.SUCCESS);
			retMap.put(TypeConstant.SHOW_MSG, "销售员销售列表成功！");
			pm.setData(retMap);
		} catch (Exception e) {
			retMap.put(TypeConstant.SF, TypeConstant.FAIL);
			retMap.put(TypeConstant.SHOW_MSG, "销售员销售列表失败！");
			pm.setData(retMap);
			throw new DpException("销售员销售列表失败！", e);
		}
	}

	@Override
	public void unInstall() {
		// TODO Auto-generated method stub

	}

}
