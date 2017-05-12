package com.service.api.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.common.constant.SystemConstant;
import com.common.constant.TypeConstant;
import com.common.dp.Param;
import com.common.exception.DpException;
import com.service.BaseService;
import com.service.IService;
import com.service.api.entity.ApiXzqh;

/**
 * 
 * <p>
 * Title：查询行政区划
 * </p>
 * <p>
 * Description：查询行政区划
 * </p>
 * <p>
 * Author : 2015-5-6
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */
@Component
public class ApiGetXzqhService extends BaseService implements IService {

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void service(Param pm) throws Exception {

		String data = (String) pm.getData();
		int dataPackType = pm.getDataFormat();
		if (SystemConstant.jsonType == dataPackType) {
			JSONObject obj = JSON.parseObject(data);
			String operType = obj.getString("operType");
			if ("xzqh".equals(operType)) {
				xzqh(pm, obj);
			} else {
				Map<String, Object> retMap = new HashMap<String, Object>();
				retMap.put(TypeConstant.SF, TypeConstant.FAIL);
				retMap.put(TypeConstant.SHOW_MSG, "操作类型错误！");
				pm.setData(retMap);
				throw new DpException("操作类型错误!", null);
			}
		}

	}

	private void xzqh(Param pm, JSONObject obj) throws Exception {
		Map<String, Object> retMap = new HashMap<String, Object>();
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			String pid = obj.getString("pid");
			if (null == pid || "".equals(pid)) {
				pid = "360";
			}
			map.put("pid", pid);
			@SuppressWarnings("unchecked")
			List<ApiXzqh> list = getDao().query("apixzqh.queryXzqh", map,
					ApiXzqh.class);
			retMap.put("data", list);
			retMap.put(TypeConstant.SF, TypeConstant.SUCCESS);
			pm.setData(retMap);
		} catch (Exception e) {
			retMap.put(TypeConstant.SF, TypeConstant.FAIL);
			retMap.put(TypeConstant.SHOW_MSG, "查询行政区划失败！");
			pm.setData(retMap);
			throw new DpException("查询行政区划失败！", e);
		}
	}

	@Override
	public void install() {
	}

	@Override
	public void unInstall() {
	}

}
