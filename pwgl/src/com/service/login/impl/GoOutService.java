package com.service.login.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.common.constant.SystemConstant;
import com.common.constant.TypeConstant;
import com.common.constant.UserType;
import com.common.dp.Param;
import com.common.exception.DpException;
import com.common.session.ISession;
import com.common.session.SessionManager;
import com.service.BaseService;
import com.service.IService;

/**
 * 
 * <p>
 * Title：用户退出系统
 * </p>
 * <p>
 * Description：2014
 * </p>
 * <p>
 * Author : 2014-4-1
 * </p>
 * <p>
 * Department :
 * </p>
 */
@Component
public class GoOutService extends BaseService implements IService {

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void service(Param pm) throws Exception {

		String data = (String) pm.getData();
		int dataPackType = pm.getDataFormat();
		if (SystemConstant.jsonType == dataPackType) {
			JSONObject obj = JSON.parseObject(data);
			String operType = obj.getString("operType");
			if ("zx".equals(operType)) {// 注销
				zx(pm, obj);
			} else {
				Map<String, Object> retMap = new HashMap<String, Object>();
				retMap.put(TypeConstant.SF, TypeConstant.FAIL);
				retMap.put(TypeConstant.SHOW_MSG, "操作类型错误！");
				pm.setData(retMap);
				throw new DpException("操作类型错误!", null);
			}
		}

	}
	
	//注销
	private void zx(Param pm,JSONObject obj) throws Exception{
		Map<String, Object> retMap = new HashMap<String, Object>();
		try{
			System.out.println("已注销");
			ISession session = SessionManager.getSession(pm.getSessionId());
			SessionManager.removeSession(session);
			pm.setData(true);	
		} catch (Exception e) {
			retMap.put(TypeConstant.SF, TypeConstant.FAIL);
			retMap.put(TypeConstant.SHOW_MSG, "注销失败！");
			pm.setData(retMap);
			throw new DpException("注销失败！", e);
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
