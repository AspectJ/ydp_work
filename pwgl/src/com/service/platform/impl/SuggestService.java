package com.service.platform.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

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
import com.service.platform.entity.Suggest;

/**
 * 
 * <p>
 * Title：保存反馈意见
 * </p>
 * <p>
 * Description：保存反馈意见
 * </p>
 * <p>
 * Author : 2015-5-6
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */
@Component
public class SuggestService extends BaseService implements IService {

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void service(Param pm) throws Exception {

		String data = (String) pm.getData();
		int dataPackType = pm.getDataFormat();
		if (SystemConstant.jsonType == dataPackType) {
			JSONObject obj = JSON.parseObject(data);
			String operType = obj.getString("operType");
			if ("index".equals(operType)) {
				index(pm, obj);
			} 
		}

	}

	private void index(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			map.put(PageConstant.PAGE_NUM, page);
			map.put(PageConstant.ROW_NUMS, rowNum);
			map.put("starttime", obj.getString("starttime"));
			map.put("endtime", obj.getString("endtime"));
			map.put("suggnr", obj.getString("suggnr"));
			Object[] list = getDao().queryForPage("suggest.selectSuggest", map,
					Suggest.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}

	@Override
	public void install() {
	}

	@Override
	public void unInstall() {
	}

}
