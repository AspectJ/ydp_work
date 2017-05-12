package com.service.api.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.common.constant.NoteConstant;
import com.common.constant.SystemConstant;
import com.common.constant.TypeConstant;
import com.common.dp.Param;
import com.common.exception.DpException;
import com.common.util.SendSmsUtil;
import com.service.BaseService;
import com.service.IService;
import com.service.api.common.CodeUtil;

/**
 * 
 * <p>
 * Title：下发手机短信服务
 * </p>
 * <p>
 * Description：2015
 * </p>
 * <p>
 * Author : 2015-5-28
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */
@Component
public class PublicSendTelCodeService extends BaseService implements IService {

	@Transactional
	public void service(Param pm) throws Exception {

		String data = (String) pm.getData();
		int dataPackType = pm.getDataFormat();
		if (SystemConstant.jsonType == dataPackType) {
			JSONObject obj = JSON.parseObject(data);
			String operType = obj.getString("operType");
			if ("zc".equals(operType)) {// 注册下发验证码
				zcYzm(pm, obj);
			} else if ("zhmm".equals(operType)) {
				zhmm(pm, obj);
			} else {
				Map<String, Object> retMap = new HashMap<String, Object>();
				retMap.put(TypeConstant.SF, TypeConstant.FAIL);
				retMap.put(TypeConstant.SHOW_MSG, "操作类型错误！");
				pm.setData(retMap);
				throw new DpException("操作类型错误！", null);
			}
		}
	}

	/**
	 * <p>
	 * 作用描述：用户注册时，短信下发验证码
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param pm
	 * @param obj
	 * @throws Exception
	 * 
	 */
	private void zcYzm(Param pm, JSONObject obj) throws Exception {
		Map<String, Object> retMap = new HashMap<String, Object>();
		try {
			String tel = obj.getString("tel");
			String code = CodeUtil.zcCode();
//			String code = "123456";
			String content = NoteConstant.zc.replace("${code}", code);
			boolean flag = SendSmsUtil.sendNote(tel, content);
			if (flag) {
				retMap.put("data", code);
				retMap.put(TypeConstant.SF, TypeConstant.SUCCESS);
				retMap.put(TypeConstant.SHOW_MSG, "验证码发送成功!");
			} else {
				retMap.put(TypeConstant.SF, TypeConstant.FAIL);
				retMap.put(TypeConstant.SHOW_MSG, "短信通道发送失败，请联系通道负责人!");
			}
			pm.setData(retMap);
		} catch (Exception e) {
			retMap.put(TypeConstant.SF, TypeConstant.FAIL);
			retMap.put(TypeConstant.SHOW_MSG, "验证码发送失败!");
			pm.setData(retMap);
			throw new DpException("下发验证码异常！", e);
		}
	}

	/**
	 * <p>
	 * 作用描述：找回密码时，短信下发验证码
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param pm
	 * @param obj
	 * @throws Exception
	 * 
	 */
	private void zhmm(Param pm, JSONObject obj) throws Exception {
		Map<String, Object> retMap = new HashMap<String, Object>();
		try {
			String tel = obj.getString("tel");
			String code = CodeUtil.zhmmCode();
//			String code = "123456";
			String content = NoteConstant.zhmm.replace("${code}", code);
			boolean flag = SendSmsUtil.sendNote(tel, content);
			if (flag) {
				retMap.put("data", code);
				retMap.put(TypeConstant.SF, TypeConstant.SUCCESS);
				retMap.put(TypeConstant.SHOW_MSG, "验证码发送成功!");
			} else {
				retMap.put(TypeConstant.SF, TypeConstant.FAIL);
				retMap.put(TypeConstant.SHOW_MSG, "短信通道发送失败，请联系通道负责人!");
			}
			pm.setData(retMap);
		} catch (Exception e) {
			retMap.put(TypeConstant.SF, TypeConstant.FAIL);
			retMap.put(TypeConstant.SHOW_MSG, "验证码发送失败!");
			pm.setData(retMap);
			throw new DpException("下发验证码异常！", e);
		}
	}

	public void install() {
	}

	public void unInstall() {
	}
}
