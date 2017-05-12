package com.service.common.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.common.constant.SystemConstant;
import com.common.dp.Param;
import com.common.exception.DpException;
import com.common.util.SqlUtil;
import com.service.BaseService;
import com.service.IService;
import com.service.common.entity.Zxdm;
import com.service.system.entity.Xzqh;

/**
 * 
 * <p>
 * Title：平台管理公有查询
 * </p>
 * <p>
 * Description：2014
 * </p>
 * <p>
 * Author : tangke 2014-10
 * </p>
 * <p>
 * Department :
 * </p>
 */
@Component
public class PtglCommonService extends BaseService implements IService {
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
			 if ("queryArea".equals(operType)) { // 查询树
				queryAreaTree(pm, json);
			}else if ("queryZxdm".equals(operType)) {	//查询资讯代码
				queryZxdm(pm, json);
			}
		}
	}

	private void queryAreaTree(Param pm, JSONObject obj) {
		try {
			List<Xzqh> list = getDao().query("common.queryAreaTree", null,Xzqh.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}

	private void queryZxdm(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("zxlxdm", obj.getString("zxlxdm"));
			List<Zxdm> list = getDao().query("common.queryZxdm", map,Zxdm.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
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
