package com.service.sessions.impl;

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
import com.service.hall.entity.HallZone;
import com.service.sessions.entity.Sessions;
import com.service.ticketprice.entity.Pricelevel;

/**
 * 
 * <p>
 * Title：sessions
 * </p>
 * <p>
 * Description：sessions
 * </p>
 * <p>
 * Author : admin
 * </p>
 * <p>
 * Department :
 * </p>
 */
@Component
public class SessionsService extends BaseService implements IService {

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
			} else if ("qy".equals(operType)) {
				qy(pm, obj);
			} else if ("jy".equals(operType)) {
				jy(pm, obj);
			} else if ("queryCgmc".equals(operType)) {
				queryCgmc(pm, obj);
			} else if ("queryyctmc".equals(operType)) {
				queryyctmc(pm, obj);
			} else if ("queryycsmc".equals(operType)) {
				queryycsmc(pm, obj);
			} else if ("queryxmmc".equals(operType)) {
				queryxmmc(pm, obj);
			} else if ("querycplbmc".equals(operType)) {
				querycplbmc(pm, obj);
			} else if ("selectAudit".equals(operType)) {
				selectAudit(pm, obj);//待审核场次
			} else if ("qrsh".equals(operType)) {
				qrsh(pm, obj);
			} else if ("bhsh".equals(operType)) {
				bhsh(pm, obj);
			} else if ("fb".equals(operType)) {
				fb(pm, obj);
			} else if ("tzyc".equals(operType)) {
				tzyc(pm, obj);
			} else if ("hfyc".equals(operType)) {
				hfyc(pm, obj);
			} else  if("dsh".equals(operType)){
				dsh(pm,obj);
			}else{
				pm.setData("fail");
				throw new DpException("操作类型错误，请联系系统管理员！", null);
			}
		}

	}
	
	private void hfyc(Param pm, final JSONObject json) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String yhid = (String) session
					.getAttribute(UserConstant.USER_XTID);
			String sessionsid = json.getString("sessionsid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", "4");
			map.put("sessionsid", sessionsid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("sessions.updateStatus", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new Exception("驳回失败", e);
		}
	}
	
	private void tzyc(Param pm, final JSONObject json) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String yhid = (String) session
					.getAttribute(UserConstant.USER_XTID);
			String sessionsid = json.getString("sessionsid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", "5");
			map.put("sessionsid", sessionsid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("sessions.updateStatus", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new Exception("驳回失败", e);
		}
	}
	
	private void fb(Param pm, final JSONObject json) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String yhid = (String) session
					.getAttribute(UserConstant.USER_XTID);
			String sessionsid = json.getString("sessionsid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", "4");
			map.put("sessionsid", sessionsid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("sessions.updateStatus", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new Exception("驳回失败", e);
		}
	}
	
	private void bhsh(Param pm, final JSONObject json) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String yhid = (String) session
					.getAttribute(UserConstant.USER_XTID);
			String sessionsid = json.getString("sessionsid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", "3");
			map.put("sessionsid", sessionsid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("sessions.updateStatus", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new Exception("驳回失败", e);
		}
	}
	
	private void dsh(Param pm, final JSONObject json) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String yhid = (String) session
					.getAttribute(UserConstant.USER_XTID);
			String sessionsid = json.getString("sessionsid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", "1");
			map.put("sessionsid", sessionsid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("sessions.updateStatus", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new Exception("待审核失败", e);
		}
	}
	
	private void qrsh(Param pm, final JSONObject json) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String yhid = (String) session
					.getAttribute(UserConstant.USER_XTID);
			String sessionsid = json.getString("sessionsid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", "2");
			map.put("sessionsid", sessionsid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("sessions.updateStatus", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new Exception("确认失败", e);
		}
	}
	
	private void selectAudit(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("ccmc", obj.getString("ccmc"));//场次名称
			map.put("sysjkssj", obj.getString("sysjkssj"));//开始时间
			map.put("sysjjssj", obj.getString("sysjjssj"));//结束时间
			map.put("ycs", obj.getString("ycs"));//演出商
			map.put("cg", obj.getString("cg"));//场馆
			map.put("zt", obj.getString("zt"));//状态
			map.put("sessionsid", obj.getString("sessionsid"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao().queryForPage(
						"sessions.selectAudit", map, Sessions.class);
				pm.setData(list);
			} else {
				List<Sessions> list = getDao().query("sessions.selectAudit",
						map, Sessions.class);
				pm.setData(list);
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}

	// 查询产品类别名称
	private void querycplbmc(Param pm, JSONObject obj) throws Exception {
		try {
			List<Sessions> list = getDao().query("sessions.querycplbmc", null,
					Sessions.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败", e);
		}
	}

	// 查询项目名称
	private void queryxmmc(Param pm, JSONObject obj) throws Exception {
		try {
			List<Sessions> list = getDao().query("sessions.queryxmmc", null,
					Sessions.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败", e);
		}
	}

	// 查询演出商名称
	private void queryycsmc(Param pm, JSONObject obj) throws Exception {
		try {
			List<Sessions> list = getDao().query("sessions.queryycsmc", null,
					Sessions.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败", e);
		}
	}

	// 查询场馆名称
	private void queryCgmc(Param pm, JSONObject obj) throws Exception {
		try {
			List<Sessions> list = getDao().query("sessions.queryCgmc", null,
					Sessions.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}

	// 查询演出厅名称
	private void queryyctmc(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("venueid", obj.getString("value"));
			List<Sessions> list = getDao().query("sessions.queryYctmc", map,
					Sessions.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败", e);
		}
	}

	private void index(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("ccmc", obj.getString("ccmc"));//场次名称
			map.put("sysjkssj", obj.getString("sysjkssj"));//开始时间
			map.put("sysjjssj", obj.getString("sysjjssj"));//结束时间
			map.put("ycs", obj.getString("ycs"));//演出商
			map.put("cg", obj.getString("cg"));//场馆
			map.put("zt", obj.getString("zt"));//状态
			map.put("sessionsid", obj.getString("sessionsid"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao().queryForPage(
						"sessions.selectSessions", map, Sessions.class);
				pm.setData(list);
			} else {
				List<Sessions> list = getDao().query("sessions.selectSessions",
						map, Sessions.class);
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
			final String userId = (String) session
					.getAttribute(UserConstant.USER_XTID);
			final String sessionsid = IdUtil.createThirteenId();
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			final String name=obj.getString("sessionsname");
			final String bh=obj.getString("sessionscode");
			final String sysj=obj.getString("playtime");
			final String itemid=obj.getString("itemid");
			final String hallid=obj.getString("hallid");
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("hallid", hallid);
		    List<HallZone>	 listHallZone=getDao().query("sessions.queryhallZone", map, HallZone.class);
		    
			//写入默认的场次票价等级
			final List<Pricelevel> listPrice = getDao().query(
					"ticketprice.queryPjdjData", map, Pricelevel.class);
		    for(int i=0;i<listHallZone.size();i++){
		    	final String sessnzoneid=IdUtil.createThirteenId();
		    	final HallZone zoneObj=listHallZone.get(i);
		    	getDao().getJdbcTemplate().update(
						SqlUtil.getSql("sessnzone.insertSessnzone", null).getSql(),
						new PreparedStatementSetter() {
							public void setValues(PreparedStatement ps)
									throws SQLException {
								ps.setObject(1, sessnzoneid);
								ps.setObject(2, sessionsid);//sessionsid
								ps.setObject(3,zoneObj.getHallid());//hallid
								ps.setObject(4, zoneObj.getZonename());//分区名称
								ps.setObject(5, "");
								ps.setObject(6, zoneObj.getPewpic());//所属的座位图--pewpic
								ps.setObject(7, zoneObj.getRule());//分区规则
								ps.setObject(8, zoneObj.getHeight());//高度
								ps.setObject(9, zoneObj.getWidth());//宽度
								ps.setObject(10, zoneObj.getRownum());//行
								ps.setObject(11, zoneObj.getColnum());//列
								ps.setObject(12, zoneObj.getX());//x
								ps.setObject(13,zoneObj.getY());//y
								ps.setObject(14, zoneObj.getText());//分区文字
								ps.setObject(15, zoneObj.getColor());//背景颜色
								ps.setObject(16, zoneObj.getTpurl());//图片url
								ps.setObject(17, zoneObj.getZoneType());//分区类型
								ps.setObject(18, zoneObj.getDes());//分区图片描述
								ps.setObject(19, zoneObj.getRemark());//说明	
								ps.setObject(20, SystemConstant.qyzt);
								ps.setObject(21, SystemConstant.delstatus);
								ps.setObject(22, obj.getString("vid"));
								ps.setObject(23, userId);
								ps.setObject(24,sysTime);
								ps.setObject(25, userId);
								ps.setObject(26, sysTime);
							}
						});
		    	
		    	//写入座位表
			    int h=0,l=0;
			    h=zoneObj.getRownum();
			    l=zoneObj.getColnum();
			    for(int j=0;j<h;j++){
			    	for(int t=0;t<l;t++){
			    		final int z=t;
			    		final int x=j;
			    		final String pewid = IdUtil.createThirteenId();
			    		getDao().getJdbcTemplate().update(
								SqlUtil.getSql("sessnzone.insertSessnpew", null).getSql(),
								new PreparedStatementSetter() {
									public void setValues(PreparedStatement ps)
											throws SQLException {
										ps.setObject(1, pewid);
										ps.setObject(2, sessionsid);//sessionsid
										ps.setObject(3, zoneObj.getHallid());//hallid
										ps.setObject(4,sessnzoneid);//zoneid
										ps.setObject(5, "第"+(x+1)+"排,第"+(z+1)+"座");//pewname --座位名
										ps.setObject(6, x+1);//排号
										ps.setObject(7, z+1);//列号
										ps.setObject(8, "");//是否加座
										ps.setObject(9, listPrice.get(0).getPricelevelid());//票价等级ID
										ps.setObject(10, 0);//票价
										ps.setObject(11, "");//预留分类ID
										ps.setObject(12,"");//是否可预售
										ps.setObject(13, "");//是否可售
										ps.setObject(14, "");//是否可取
										ps.setObject(15, "");//备注
										ps.setObject(16, "");//座位状态
										ps.setObject(17, SystemConstant.qyzt);//禁启状态
										ps.setObject(18,SystemConstant.delstatus);//删除状态
										ps.setObject(19, 0);//数据版本号
										ps.setObject(20, userId);
										ps.setObject(21,sysTime);
										ps.setObject(22, userId);
										ps.setObject(23, sysTime);
										ps.setObject(24, x*10+z+1);
									}
								});
			    	}
			    }
		    }
			getDao().getJdbcTemplate().update(
					SqlUtil.getSql("sessions.insertSessions", null).getSql(),
					new PreparedStatementSetter() {
						public void setValues(PreparedStatement ps)
								throws SQLException {
							ps.setObject(1, sessionsid);
							ps.setObject(2, obj.getString("venueid"));
							ps.setObject(3, obj.getString("hallid"));
							ps.setObject(4, obj.getString("performerid"));
							ps.setObject(5, itemid);
							ps.setObject(6,bh);
							ps.setObject(7, name);
							ps.setObject(8, obj.getString("engname"));
							ps.setObject(9, sysj);
							ps.setObject(10, obj.getString("length"));
							ps.setObject(11, obj.getString("begintime"));
							ps.setObject(12, obj.getString("endtime"));
							ps.setObject(13, obj.getString("producttypeid"));
							ps.setObject(14, obj.getString("sponsor"));
							ps.setObject(15, obj.getString("dessponsor"));
							ps.setObject(16, obj.getString("actualsponsor"));
							ps.setObject(17, obj.getString("website"));
							ps.setObject(18, obj.getString("checktimes"));
							ps.setObject(19, obj.getString("regnumb"));
							ps.setObject(20, obj.getString("introduction"));
							ps.setObject(21, SystemConstant.qyzt);
							ps.setObject(22, "待审核");//这里用作提交的
							ps.setObject(23, obj.getString("vid"));
							ps.setObject(24, userId);
							ps.setObject(25, sysTime);
							ps.setObject(26, userId);
							ps.setObject(27, sysTime);
						}
					});
			
						
			for (int i = 0; i < listPrice.size(); i++) {
				final String sessntkprid = IdUtil.createThirteenId();
				final Pricelevel rp = listPrice.get(i);
				getDao().getJdbcTemplate().update(
						SqlUtil.getSql("ticketprice.insertTicketprice", null)
								.getSql(), new PreparedStatementSetter() {
							public void setValues(PreparedStatement ps)
									throws SQLException {
								ps.setObject(1, sessntkprid);
								ps.setObject(2, sessionsid);
								ps.setObject(3, rp.getPricelevelid());// 票价等级代码
								ps.setObject(4, rp.getPricelevelname());
								ps.setObject(5, rp.getColor());
								ps.setObject(6, 0);// 票价
								ps.setObject(7, rp.getDefaultchar());// 标记
								ps.setObject(8, SystemConstant.delstatus);
								ps.setObject(9, "0");
								ps.setObject(10, userId);
								ps.setObject(11, sysTime);
								ps.setObject(12, userId);
								ps.setObject(13, sysTime);
							}
						});

			}
			pm.setData(sessionsid+","+name+","+bh+","+sysj+","+itemid);
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
			final String sessionsid=obj.getString("sessionsid");
			final String name=obj.getString("sessionsname");
			final String bh=obj.getString("sessionscode");
			final String sysj=obj.getString("playtime");
			final String itemid=obj.getString("itemid");
			map.put("sessionsid", obj.getString("sessionsid"));
			map.put("venueid", obj.getString("venueid"));
			map.put("hallid", obj.getString("hallid"));
			map.put("performerid", obj.getString("performerid"));
			map.put("itemid", obj.getString("itemid"));
			map.put("sessionscode", obj.getString("sessionscode"));
			map.put("sessionsname", obj.getString("sessionsname"));
			map.put("engname", obj.getString("engname"));
			map.put("playtime", obj.getString("playtime"));
			map.put("length", obj.getString("length"));
			map.put("begintime", obj.getString("begintime"));
			map.put("endtime", obj.getString("endtime"));
			map.put("producttypeid", obj.getString("producttypeid"));
			map.put("sponsor", obj.getString("sponsor"));
			map.put("dessponsor", obj.getString("dessponsor"));
			map.put("actualsponsor", obj.getString("actualsponsor"));
			map.put("website", obj.getString("website"));
			map.put("checktimes", obj.getString("checktimes"));
			map.put("regnumb", obj.getString("regnumb"));
			map.put("introduction", obj.getString("introduction"));
			map.put("vid", obj.getString("vid"));
			map.put("cid", userId);
			map.put("ctime", sysTime);
			map.put("mid", userId);
			map.put("mtime", sysTime);
			getDao().update("sessions.updateSessions", map);
			pm.setData(sessionsid+","+name+","+bh+","+sysj+","+itemid);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("修改失败！", e);
		}
	}

	private void delete(Param pm, JSONObject obj) throws Exception {
		try {
			String sessionsid = obj.getString("sessionsid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sessionsid", sessionsid);
			getDao().delete("sessions.deleteSessions", map);
			
			//删除票价等级
			getDao().delete("sessions.deleteTicketPrice", map);
			
			//删除票版
			getDao().delete("sessions.deleteticketface", map);
			
			//删除分区
			getDao().delete("sessions.deletesessnzone", map);
			
			//删除座位
			getDao().delete("sessions.deletesessnpew", map);
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
			String sessionsid = json.getString("sessionsid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", SystemConstant.qyzt);
			map.put("sessionsid", sessionsid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("sessions.updateStatus", map);
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
			String sessionsid = json.getString("sessionsid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("status", SystemConstant.jyzt);
			map.put("sessionsid", sessionsid);
			map.put("mid", yhid);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("sessions.updateStatus", map);
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
