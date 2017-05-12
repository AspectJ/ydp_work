package com.service.ticketprice.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
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
import com.service.ticketprice.entity.Pricelevel;
import com.service.ticketprice.entity.Ticketprice;

/**
 * 
 * <p>
 * Title：Ticketprice
 * </p>
 * <p>
 * Description：Ticketprice
 * </p>
 * <p>
 * Author : admin
 * </p>
 * <p>
 * Department :
 * </p>
 */
@Component
public class TicketpriceService extends BaseService implements IService {

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
			} else if ("add".equals(operType)) {
				add(pm, obj);
			} else if ("delete".equals(operType)) {
				delete(pm, obj);
			} else if ("update".equals(operType)) {
				update(pm, obj);
			} else if ("pjdj".equals(operType)) {
				pjdj(pm, obj);
			} else {
				pm.setData("fail");
				throw new DpException("操作类型错误，请联系系统管理员！", null);
			}
		}
	}

	private void index(Param pm, JSONObject json) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("ccmc", json.getString("ccmc"));
			map.put("pjdj", json.getString("pjdj"));
			map.put("sessionsid", json.getString("sessionsid"));
			Integer page = json.getInteger("page");
			Integer rowNum = json.getInteger("rowNum");
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao()
						.queryForPage("ticketprice.selectTicketprice", map,
								Ticketprice.class);
				pm.setData(list);
			} else {
				List<Ticketprice> list = getDao()
						.query("ticketprice.selectTicketprice", map,
								Ticketprice.class);
				pm.setData(list);
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}

	private void add(Param pm, final JSONObject json) throws Exception {
		try {
			String pricelevelids = json.getString("pricelevelids");
			String id[] = pricelevelids.split(",");
			Map<String, Object> map = new HashMap<String, Object>();
			final String sessionsid=json.getString("sessionsid");
			map.put("pricelevelid", id);
			map.put("pricelevelid", id);
			map.put("sessionsid", sessionsid);
			int count = getDao().queryCount("ticketprice.queryUniquePjdj",
					map);
			if(count<=0){
				List<Pricelevel> listPrice = getDao().query(
						"ticketprice.queryPjdjData", map, Pricelevel.class);				
				for (int i = 0; i < listPrice.size(); i++) {
					ISession session = SessionManager.getSession(pm.getSessionId());
					final String userId = (String) session
							.getAttribute(UserConstant.USER_XTID);
					final Timestamp sysTime = DateUtil.getNowTimestamp();
					final String sessntkprid = IdUtil.createThirteenId();
					final Pricelevel obj = listPrice.get(i);
					getDao().getJdbcTemplate().update(
							SqlUtil.getSql("ticketprice.insertTicketprice", null)
									.getSql(), new PreparedStatementSetter() {
								public void setValues(PreparedStatement ps)
										throws SQLException {
									ps.setObject(1, sessntkprid);
									ps.setObject(2, sessionsid);
									ps.setObject(3, obj.getPricelevelid());// 票价等级代码
									ps.setObject(4, obj.getPricelevelname());
									ps.setObject(5, obj.getColor());
									ps.setObject(6, 0);// 票价
									ps.setObject(7, obj.getDefaultchar());// 标记
									ps.setObject(8, SystemConstant.delstatus);
									ps.setObject(9, json.getString("vid"));
									ps.setObject(10, userId);
									ps.setObject(11, sysTime);
									ps.setObject(12, userId);
									ps.setObject(13, sysTime);
								}
							});
	
				}
				pm.setData("success");
			}else{
				pm.setData("exists");
			}
		
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("新增失败！", e);
		}
	}

	private void delete(Param pm, JSONObject json) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sessntkprid", json.getString("sessntkprid"));
			getDao().delete("ticketprice.deleteTicketPrice", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("删除失败！", e);
		}
	}

	private void update(Param pm, JSONObject json) throws Exception {
		try {			
			String sessntkprids = json.getString("sessntkprids");
			if(!"".equals(sessntkprids) && null != sessntkprids){
				String[] data = sessntkprids.split("&");
				for (int i = 0; i < data.length; i++) {
					JSONObject jsonObj = JSON.parseObject(data[i]);
					String color=jsonObj.getString("color");
					String price=jsonObj.getString("price");
					String sessntkprid=jsonObj.getString("sessntkprid");
					String mark=jsonObj.getString("mark");
					ISession session = SessionManager.getSession(pm.getSessionId());
					final String userId = (String) session
							.getAttribute(UserConstant.USER_XTID);
					final Timestamp sysTime = DateUtil.getNowTimestamp();
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("color", color);
					map.put("price", price);
					map.put("mark", mark);
					map.put("cid", userId);
					map.put("ctime", sysTime);
					map.put("mid", userId);
					map.put("mtime", sysTime);
					map.put("sessntkprid", sessntkprid);
					getDao().update("ticketprice.updateTicketprice", map);
				}
			}	
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("修改失败！", e);
		}
	}

	// 查询票价等级
	private void pjdj(Param pm, JSONObject obj) throws Exception {
		try {
			List<Ticketprice> list = getDao().query("ticketprice.queryPjdj",
					null, Ticketprice.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败", e);
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