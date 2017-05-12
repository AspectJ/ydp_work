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
import com.common.constant.UserConstant;
import com.common.dp.Param;
import com.common.exception.DpException;
import com.common.session.ISession;
import com.common.session.SessionManager;
import com.service.BaseService;
import com.service.IService;
import com.service.api.entity.ApiItem;
/**
 * 项目列表
 * @author xjm
 *
 */
@Component
public class ApiItemService extends BaseService implements IService {

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
			if ("index".equals(operType)) {// 项目
				index(pm, obj);
			} else {
				Map<String, Object> retMap = new HashMap<String, Object>();
				retMap.put(TypeConstant.SF, TypeConstant.FAIL);
				retMap.put(TypeConstant.SHOW_MSG, "操作类型错误！");
				pm.setData(retMap);
				throw new DpException("操作类型错误!", null);
			}
		}
	}
	
	//项目列表
	private void index(Param pm,JSONObject obj) throws Exception{
		Map<String, Object> retMap = new HashMap<String, Object>();
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session
					.getAttribute(UserConstant.USER_XTID);
			final String payboxid=(String)session.getAttribute("payboxid");
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("payboxid", payboxid);
			map.put("sellerid", userId);
			List<ApiItem> list=getDao().query("apiitem.queryApiItem", map, ApiItem.class);
			retMap.put("data", list);
			retMap.put(TypeConstant.SF, TypeConstant.SUCCESS);
			retMap.put(TypeConstant.SHOW_MSG, "查询成功！");
			pm.setData(retMap);
		} catch (Exception e) {
			retMap.put(TypeConstant.SF, TypeConstant.FAIL);
			retMap.put(TypeConstant.SHOW_MSG, "查询失败！");
			pm.setData(retMap);
			throw new DpException("查询失败！", e);
		}
	}
	@Override
	public void unInstall() {
		// TODO Auto-generated method stub
		
	}

}
