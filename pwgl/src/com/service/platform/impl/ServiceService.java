package com.service.platform.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.common.constant.PageConstant;
import com.common.constant.SystemConstant;
import com.common.dp.Param;
import com.common.exception.DpException;
import com.common.util.IdUtil;
import com.common.util.SqlUtil;
import com.service.BaseService;
import com.service.IService;
import com.service.platform.entity.Service;

/**
 * <p>Title: 服务管理Service</p>
 * @author 马骏
 * @date 2016-01-20
 */
@Component
public class ServiceService extends BaseService implements IService{

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
			if("index".equals(operType)){
				index(pm, obj);
			}else if("add".equals(operType)){
				add(pm, obj);
			}else if("update".equals(operType)){
				update(pm, obj);
			}else if("delete".equals(operType)){
				delete(pm, obj);
			}
		}
	}
	
	private void delete(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			String sid = obj.getString("sid");
			if(sid != null && !"".equals(sid)){
				map.put("sid", sid);
				getDao().delete("service.deleteService", map);
				pm.setData("success");
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("删除失败！", e);
		}
	}

	private void update(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			String sid = obj.getString("sid");
			if(sid != null && !"".equals(sid)){
				map.put("sid", sid);
				map.put("entity", obj.getString("entity"));
				map.put("type", obj.getString("type"));
				map.put("surl", obj.getString("surl"));
				map.put("serviceid", obj.getString("serviceid"));
				map.put("opertype", obj.getString("opertype"));
				map.put("dataformat", obj.getString("dataformat"));
				map.put("isremote", obj.getString("isremote"));
				map.put("des", obj.getString("des"));
				getDao().update("service.updateService", map);
				pm.setData("success");
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("修改失败！", e);
		}
	}

	private void add(Param pm, final JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			final String serviceid = obj.getString("serviceid");
			final String opertype = obj.getString("opertype");
			map.put("serviceid", serviceid);
			map.put("opertype", opertype);
			int c = getDao().queryCount("service.selectServicesfcf", map);
			if(c > 0){
				pm.setData("repeat");
			}else{
				getDao().getJdbcTemplate().update(SqlUtil.getSql("service.insertService", null).getSql(),new PreparedStatementSetter() {
					public void setValues(PreparedStatement ps)throws SQLException {
						ps.setObject(1, IdUtil.createThirteenId());
						ps.setObject(2, obj.getString("entity"));
						ps.setObject(3, obj.getString("type"));
						ps.setObject(4, obj.getString("surl"));
						ps.setObject(5, serviceid);
						ps.setObject(6, opertype);
						ps.setObject(7, obj.getString("dataformat"));
						ps.setObject(8, obj.getString("isremote"));
						ps.setObject(9, obj.getString("des"));
					}
				});
				pm.setData("success");
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("新增失败！", e);
		}
	}

	private void index(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("serviceid", obj.getString("serviceid"));
			map.put("opertype", obj.getString("opertype"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if(page != null && rowNum != null){
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao().queryForPage("service.selectService", map,Service.class);
				pm.setData(list);
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询异常！", e);
		}
	}

	@Override
	public void unInstall() {
		// TODO Auto-generated method stub
		
	}

}
