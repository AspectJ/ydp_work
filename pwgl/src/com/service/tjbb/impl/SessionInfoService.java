package com.service.tjbb.impl;

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
import com.fr.third.com.lowagie.text.pdf.AcroFields.Item;
import com.service.BaseService;
import com.service.IService;
import com.service.ticketprice.entity.Ticketprice;
import com.service.tjbb.entity.SessionInfo;
import com.service.tjbb.entity.Venue;

/**
 * 场次信息
 * 
 * @author Administrator
 * 
 */

@Component
public class SessionInfoService extends BaseService implements IService {

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
			} else if ("queryXm".equals(operType)) {
				queryXm(pm, obj);
			} else if ("queryVenue".equals(operType)) {
				queryVenue(pm, obj);
			} else {
				pm.setData("fail");
				throw new DpException("操作类型错误，请联系系统管理员！", null);
			}
		}
	}

	// 查询信息
	private void index(Param pm, JSONObject json) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			Integer page = json.getInteger("page");
			Integer rowNum = json.getInteger("rowNum");
			String spjg=json.getString("spjg");
			String spy=json.getString("spy");
			String kssj=json.getString("kssj");
			String jssj=json.getString("jssj");
			String xmmc=json.getString("xmmc");
			String yccg=json.getString("yccg");
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao().queryForPage("tjbb.queryOrderStatus",
						map, SessionInfo.class);
				pm.setData(list);
			} else {
				List<Ticketprice> list = getDao().query(
						"tjbb.queryOrderStatus", map, SessionInfo.class);
				pm.setData(list);
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}

	// 查询项目
	private void queryXm(Param pm, JSONObject obj) throws Exception {
		try {
			List<Item> listItem = getDao().query("tjbb.queryXm", null,
					Item.class);
			pm.setData(listItem);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}

	// 查询演出场馆
	private void queryVenue(Param pm, JSONObject obj) throws Exception {
		try {
			List<Venue> listVenue = getDao().query("tjbb.queryCg", null,
					Venue.class);
			pm.setData(listVenue);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}

	@Override
	public void unInstall() {
		// TODO Auto-generated method stub

	}

}
