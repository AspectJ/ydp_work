package com.service.api.impl;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.common.constant.SystemConstant;
import com.common.constant.TypeConstant;
import com.common.constant.UserConstant;
import com.common.constant.UserType;
import com.common.dp.Param;
import com.common.exception.DpException;
import com.common.session.ISession;
import com.common.session.SessionManager;
import com.common.util.DateUtil;
import com.common.util.SendSmsUtil;
import com.service.BaseService;
import com.service.IService;
/**
 * 修改密码
 * @author Administrator
 *
 */
@Component
public class ApiUpdatePassService extends BaseService implements IService {

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
			if ("spy".equals(operType)) {// 用户APP用户
				spy(pm, obj);
			} else {
				Map<String, Object> retMap = new HashMap<String, Object>();
				retMap.put(TypeConstant.SF, TypeConstant.FAIL);
				retMap.put(TypeConstant.SHOW_MSG, "操作类型错误！");
				pm.setData(retMap);
				throw new DpException("操作类型错误!", null);
			}
		}
	}
	
	//修改密码
	private void spy(Param pm,JSONObject obj) throws Exception{
		Map<String, Object> retMap = new HashMap<String, Object>();
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			String userId = (String) session
					.getAttribute(UserConstant.USER_XTID);
			String jmm = obj.getString("jmm");// 旧密码
			String xmm = obj.getString("xmm");// 新密码
			Timestamp tt = DateUtil.getNowTimestamp();

			Map<String, Object> map = new HashMap<String, Object>();
			map.put("xtid", userId);
			map.put("jmm", jmm);
			map.put("xmm", xmm);
			map.put("xgr", userId);
			map.put("xgsj", tt);
			int i = getDao().update("login.updateYhPass", map);
			if (i > 0) {
				retMap.put(TypeConstant.SF, TypeConstant.SUCCESS);
				retMap.put(TypeConstant.SHOW_MSG, "修改密码成功！");
			} else {
				retMap.put(TypeConstant.SF, TypeConstant.FAIL);
				retMap.put(TypeConstant.SHOW_MSG, "修改密码失败，原密码不正确！");
			}
			pm.setData(retMap);
		} catch (Exception e) {
			retMap.put(TypeConstant.SF, TypeConstant.FAIL);
			retMap.put(TypeConstant.SHOW_MSG, "修改密码失败！");
			pm.setData(retMap);
			throw new DpException("修改密码失败！", e);
		}
	}

	@Override
	public void unInstall() {
		// TODO Auto-generated method stub
		
	}

}
