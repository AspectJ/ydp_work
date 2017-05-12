package com.service.common.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.common.constant.SystemConstant;
import com.common.dp.Param;
import com.common.exception.DpException;
import com.common.parser.IParser;
import com.common.util.ParserUtil;
import com.common.util.SqlUtil;
import com.service.BaseService;
import com.service.IService;
import com.service.common.entity.Dict;

/**
 * 
 * <p>
 * Title：数据字典
 * </p>
 * <p>
 * Description：2014
 * </p>
 * <p>
 * Author : 2014-4-5
 * </p>
 * <p>
 * Department : 小区
 * </p>
 */
@Component
public class GetDictionaryService extends BaseService implements IService {

	public void service(Param pm) throws Exception {
		String data = (String) pm.getData();
		if (StringUtils.trimToNull(data) == null) {
			return;
		}
		int dataPackType = pm.getDataFormat();
		if (SystemConstant.jsonType == dataPackType) {
			JSONObject obj = JSON.parseObject(data);
			String operType = obj.getString("operType");
			 if("selectSjzd".equals(operType)){
				selectSjzd(pm,obj);
			}
		}
		
	}
	
	public void selectSjzd(Param pm,JSONObject obj) throws Exception {
		try {	
			
			final String sjzd=obj.getString("dictType");
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("dmflid", sjzd);			
			String SqlId="common.querySjzd";
			List<Dict> list = getDao().query(SqlId, map,
					Dict.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("数据字典抛出异常", e);
		}
	}

	public void install() {
	}

	public void unInstall() {
	}
}
