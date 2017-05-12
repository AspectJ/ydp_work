package com.service.seller.impl;

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
import com.common.util.IdUtil;
import com.common.util.SqlUtil;
import com.common.util.DateUtil;
import com.common.util.UploadFileUtil;
import com.service.BaseService;
import com.service.IService;
import com.service.performer.entity.Performer;
import com.service.seller.entity.Seller;

/**
 * 
 * <p>
 * Title：Seller
 * </p>
 * <p>
 * Description：Seller
 * </p>
 * <p>
 * Author : admin
 * </p>
 * <p>
 * Department : 
 * </p>
 */
@Component
public class SellerService extends BaseService implements IService {

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
			}else if ("qy".equals(operType)) {
				qy(pm, obj);
			} else if ("jy".equals(operType)) {
				jy(pm, obj);
			} else if("queryspd".equals(operType)) {
				queryspd(pm,obj);
			}else if("updatePic".equals(operType)){
				updatePic(pm,obj);
			}else{
				pm.setData("fail");
				throw new DpException("操作类型错误，请联系系统管理员！", null);
			}
		}

	}
	
	//查询售票点
	private void queryspd(Param pm, JSONObject obj)throws Exception{
		try {
			List<Seller> list = getDao().query("seller.querySjspmc", null,
					Seller.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}
	
	private void updatePic(Param pm, JSONObject obj) {
		try {
			List<String> picUrl = UploadFileUtil.uploadFiles("seller");
			String rePicUrl = picUrl.get(0);
			pm.setData(rePicUrl);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("图片上传失败！", e);
		}
	}

	private void index(Param pm, JSONObject obj) throws Exception{
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", obj.getString("status"));
			map.put("username", obj.getString("username"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao().queryForPage("seller.selectSeller", map,
						Seller.class);
				pm.setData(list);
			} else {
				List<Seller> list = getDao().query("seller.selectSeller", map,
						Seller.class);
				pm.setData(list);
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}

	private void add(Param pm, final JSONObject obj) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session.getAttribute(UserConstant.USER_XTID);
			final String sellerid = IdUtil.createThirteenId();
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			getDao().getJdbcTemplate().update(
					SqlUtil.getSql("seller.insertSeller", null).getSql(),
					new PreparedStatementSetter() {
						public void setValues(PreparedStatement ps)
								throws SQLException {
							ps.setObject(1, sellerid);
							ps.setObject(2, obj.getString("payboxid"));
							ps.setObject(3, obj.getString("username"));
							ps.setObject(4, obj.getString("pass"));
							ps.setObject(5, obj.getString("lasttime"));
							ps.setObject(6, obj.getString("lastip"));
							ps.setObject(7, obj.getString("times"));
							ps.setObject(8, obj.getString("realname"));
							ps.setObject(9, obj.getString("sex"));
							ps.setObject(10, obj.getString("age"));
							ps.setObject(11, obj.getString("tele"));
							ps.setObject(12, obj.getString("txurl"));
							ps.setObject(13, SystemConstant.qyzt);
							ps.setObject(14, SystemConstant.delstatus);
							ps.setObject(15, obj.getString("vid"));
							ps.setObject(16, userId);
							ps.setObject(17, sysTime);
							ps.setObject(18,userId);
							ps.setObject(19, sysTime);
						}
					});
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("新增失败！", e);
		}
	}

	private void update(Param pm, JSONObject obj) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session
					.getAttribute(UserConstant.USER_XTID);
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			Map<String, Object> map = new HashMap<String, Object>();			
			map.put("sellerid", obj.getString("sellerid"));
			map.put("payboxid", obj.getString("payboxid"));
			map.put("username", obj.getString("username"));
			map.put("pass", obj.getString("pass"));
			map.put("realname", obj.getString("realname"));
			map.put("sex", obj.getString("sex"));
			map.put("age", obj.getString("age"));
			map.put("tele", obj.getString("tele"));
			map.put("txurl", obj.getString("url"));
			map.put("cid",userId);
			map.put("ctime", sysTime);
			map.put("mid", userId);
			map.put("mtime",sysTime);
			getDao().update("seller.updateSeller", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("修改失败！", e);
		}
	}
	
	private void delete(Param pm, JSONObject obj) throws Exception {
		try {
			String sellerid = obj.getString("sellerid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sellerid", sellerid);
			getDao().delete("seller.deleteSeller", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("删除失败！", e);
		}
	}
	
	private void qy(Param pm, final JSONObject json) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String yhid = (String) session
					.getAttribute(UserConstant.USER_XTID);
			String sellerid = json.getString("sellerid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", SystemConstant.qyzt);
			map.put("sellerid", sellerid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("seller.updateStatus", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new Exception("启用失败", e);
		}
	}

	private void jy(Param pm, final JSONObject json) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String yhid = (String) session
					.getAttribute(UserConstant.USER_XTID);
			String sellerid = json.getString("sellerid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", SystemConstant.qyzt);
			map.put("sellerid", sellerid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("seller.updateStatus", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new Exception("禁用失败", e);
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
