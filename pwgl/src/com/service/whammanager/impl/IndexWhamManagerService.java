package com.service.whammanager.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.common.constant.PageConstant;
import com.common.constant.SystemConstant;
import com.common.dp.Param;
import com.common.exception.DpException;
import com.common.util.SqlUtil;
import com.service.BaseService;
import com.service.IService;
import com.service.whammanager.entity.WhamManager;

/**
 * 
 * @author Administrator
 * 
 */
@Component
public class IndexWhamManagerService extends BaseService implements IService {

	@Override
	public void install() {
		// TODO Auto-generated method stub

	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void service(Param pm) throws Exception {

		String data = (String) pm.getData();
		if (StringUtils.trimToNull(data) == null) {
			return;
		}
		int dataPackType = pm.getDataFormat();
		if (SystemConstant.jsonType == dataPackType) {
			JSONObject obj = JSON.parseObject(data);
			String operType = obj.getString("operType");
			if ("index".equals(operType)) {
				index(pm, obj);
			} else if("updateStatus".equals(operType)){
				updateStatus(pm,obj);
			}else{
				pm.setData("fail");
				throw new DpException("操作类型错误，请联系系统管理员！", null);
			}
		}
	}

	private void index(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("ordercode", obj.getString("ddbh"));
			map.put("itemname", obj.getString("xmmc"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao()
						.queryForPage("whammanager.selectWhamManager", map,
								WhamManager.class);
				pm.setData(list);
			} else {
				List<WhamManager> list = getDao()
						.query("whammanager.selectWhamManager", map,
								WhamManager.class);
				pm.setData(list);
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}
	
	//修改状态
	private void updateStatus(Param pm,JSONObject obj) throws Exception{
		try{
			Map<String,Object> map=new HashMap<String,Object>();
			String reprintid=obj.getString("reprintid");
			String status=obj.getString("status");
			map.put("reprintid", reprintid.split(","));
			map.put("restatus", status);
			getDao().update("whammanager.updateStatus", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("修改失败！", e);
		}
	}

	@Override
	public void unInstall() {
		// TODO Auto-generated method stub

	}

}
