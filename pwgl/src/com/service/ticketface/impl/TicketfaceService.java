package com.service.ticketface.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
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
import com.common.util.IdUtil;
import com.common.util.SqlUtil;
import com.common.util.DateUtil;
import com.service.BaseService;
import com.service.IService;
import com.service.performer.entity.Performer;
import com.service.ticketface.entity.Ticketface;

/**
 * 
 * <p>
 * Title：Ticketface
 * </p>
 * <p>
 * Description：Ticketface
 * </p>
 * <p>
 * Author : admin
 * </p>
 * <p>
 * Department : 
 * </p>
 */
@Component
public class TicketfaceService extends BaseService implements IService {

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
			} else if("ccmc".equals(operType)){//场馆名称
				ccmc(pm,obj);
			} else if("copyData".equals(operType)){//场馆名称
				copyData(pm,obj);
			} else {
				pm.setData("fail");
				throw new DpException("操作类型错误，请联系系统管理员！", null);
			}
		}
	}
	
	@SuppressWarnings("unchecked")
	private void copyData(Param pm,JSONObject obj){
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			String[] tables = obj.getString("tables").split(",");
			List<Ticketface> list = getDao().query("ticketface.queryCgmc", null, Ticketface.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}
	
	//查询场次名称
	private void ccmc(Param pm,JSONObject json) throws Exception{
		try {
			List<Ticketface> list = getDao().query("ticketface.queryCgmc", null,
					Ticketface.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}
	
	private void index(Param pm,JSONObject json) throws Exception{
		
	}
	
	private void add(Param pm,JSONObject json) throws Exception{
		final String pjmc=json.getString("pjmc");
		final String pjbh=json.getString("pjbh");
		final String id = IdUtil.createThirteenId();
		getDao().getJdbcTemplate().update(
				SqlUtil.getSql("ticketface.insertTicketface", null).getSql(),
				new PreparedStatementSetter() {
					public void setValues(PreparedStatement ps)
							throws SQLException {
						ps.setObject(1, id);
						ps.setObject(2, pjbh);
						ps.setObject(3,pjbh);
						ps.setObject(4, pjmc);
						ps.setObject(5, 0);
						ps.setObject(6, 0);
						ps.setObject(7, 0);
						ps.setObject(8,0);
						ps.setObject(9, 0);
						ps.setObject(10,0);
						ps.setObject(11,0);
					}
				});
		pm.setData("success");		
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
