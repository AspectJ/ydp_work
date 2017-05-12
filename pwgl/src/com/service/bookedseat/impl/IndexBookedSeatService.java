package com.service.bookedseat.impl;

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
import com.service.bookedseat.entity.BookedSeat;
import com.service.bookedseat.entity.SessnPew;
import com.service.bookedseat.entity.SessnZone;

/**
 * 座位预留
 * 
 * @author Administrator
 * 
 */
@Component
public class IndexBookedSeatService extends BaseService implements IService {

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
			if ("queryFqmc".equals(operType)) {
				queryFqmc(pm, obj);
			} else if ("queryZw".equals(operType)) {
				queryZw(pm, obj);
			} else if ("queryPjdj".equals(operType)) {
				queryPjdj(pm, obj);
			} else if ("update".equals(operType)) {
				update(pm, obj);
			} else if ("queryXmmc".equals(operType)) {
				queryXmmc(pm, obj);
			} else if ("queryCcmc".equals(operType)) {
				queryCcmc(pm, obj);
			} else if ("queryYlzl".equals(operType)) {
				queryYlzl(pm, obj);
			} else if ("save".equals(operType)) {
				save(pm, obj);
			} else if ("queryXsd".equals(operType)) {
				queryXsd(pm, obj);
			} else if ("queryLeftGrid".equals(operType)) {
				queryLeftGrid(pm, obj);
			} else if ("queryCcmc".equals(operType)) {
				queryCcmc(pm, obj);
			} else if ("querySeat".equals(operType)) {
				querySeat(pm, obj);
			} else if ("delete".equals(operType)) {
				delete(pm, obj);
			} else if ("addPew".equals(operType)) {
				addPew(pm, obj);
			} else {
				pm.setData("fail");
				throw new DpException("操作类型错误，请联系系统管理员！", null);
			}
		}
	}

	// 查询左边表格的数据
	private void queryLeftGrid(Param pm, JSONObject obj) throws Exception {
		try {
			try {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("ccid", obj.getString("ccid"));// 场次ID
				map.put("fqid", obj.getString("fqid"));// 分区ID
				Integer page = obj.getInteger("page");
				Integer rowNum = obj.getInteger("rowNum");
				if (page != null && rowNum != null) {
					map.put(PageConstant.PAGE_NUM, page);
					map.put(PageConstant.ROW_NUMS, rowNum);
					Object[] list = getDao().queryForPage(
							"bookedseat.querySumInfo", map, SessnPew.class);
					pm.setData(list);
				} else {
					List<SessnPew> list = getDao().query(
							"bookedseat.querySumInfo", map, SessnPew.class);
					pm.setData(list);
				}
			} catch (Exception e) {
				pm.setData("fail");
				throw new DpException("加载失败！", e);
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败", e);
		}
	}

	// 查询场次名称
	private void queryFqmc(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sessnzoneid", obj.getString("value"));
			List<SessnZone> list = getDao().query("bookedseat.queryFq", map,
					SessnZone.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("加载失败");
			throw new DpException("加载失败", e);
		}
	}

	// 查询座位
	private void queryZw(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("zoneid", obj.getString("sessnzoneid"));
			List<SessnPew> list = getDao().query("bookedseat.queryZw", map,
					SessnPew.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("加载失败");
			throw new DpException("加载失败", e);
		}
	}

	// 查询票价等级
	private void queryPjdj(Param pm, JSONObject obj) throws Exception {
		try {
			String ccid = obj.getString("ccid");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("ccid", ccid);
			List<BookedSeat> list = getDao().query("bookedseat.queryPjdj", map,
					BookedSeat.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("加载失败");
			throw new DpException("加载失败", e);
		}
	}

	// 修改
	private void update(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			String pjdj = obj.getString("ppdjid");
			String pj = obj.getString("pj");
			String ylzl = obj.getString("ylzl");
			String pewid[] = obj.getString("pewids").split(",");
			String sfkys = obj.getString("sfkys");// 是否可预售
			String sfks = obj.getString("sfks");// 是否可售
			String sfkq = obj.getString("sfkq");// 是否可取
			map.put("pricelevelid", pjdj);
			map.put("price", pj);
			map.put("reserveid", ylzl);
			map.put("pewid", pewid);
			map.put("ispresell", sfkys);
			map.put("issale", sfks);
			map.put("iscancel", sfkq);
			if ("2".equals(sfks) || "2" == sfks) {// 设置锁定--如果是否可售为否，设置锁定
				map.put("pewstatus", "2");
			}
			getDao().update("bookedseat.update", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("修改失败");
			throw new DpException("修改失败", e);
		}
	}

	// 查询项目名称
	private void queryXmmc(Param pm, JSONObject obj) throws Exception {
		try {
			List<SessnZone> list = getDao().query("bookedseat.queryXmmc", null,
					SessnZone.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("查询失败");
			throw new DpException("查询失败", e);
		}
	}

	// 查询场次名称
	private void queryCcmc(Param pm, JSONObject obj) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("itemid", obj.getString("xmid"));
		try {
			List<SessnZone> list = getDao().query("bookedseat.queryCcmc", map,
					SessnZone.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("查询失败");
			throw new DpException("查询失败", e);
		}
	}

	// 查询预留种类
	private void queryYlzl(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("reservename", obj.getString("name"));
			map.put("sessionsid", obj.getString("sessionsid"));
			List<SessnPew> list = getDao().query("bookedseat.queryYlzlz", map,
					SessnPew.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("查询失败");
			throw new DpException("查询失败", e);
		}
	}

	// 保存
	private void save(Param pm, final JSONObject obj) throws Exception {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session
					.getAttribute(UserConstant.USER_XTID);
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			final String[] xsdIds = obj.getString("xsd").split(",");// 售票点
			final String[] ylzlIds = obj.getString("ylzl").split(",");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("itemid", obj.getString("xmid"));
			map.put("sessionsid", obj.getString("ccid"));
			getDao().delete("bookedseat.deleteReserveallot", map);
			for (int j = 0; j < xsdIds.length; j++) {
				final int z = j;
				for (int x = 0; x < ylzlIds.length; x++) {
					final int s = x;
					getDao().getJdbcTemplate().update(
							SqlUtil.getSql("bookedseat.insertReserveallot",
									null).getSql(),
							new PreparedStatementSetter() {
								public void setValues(PreparedStatement ps)
										throws SQLException {
									ps.setObject(1, IdUtil.createThirteenId());
									ps.setObject(2, obj.getString("xmid"));
									ps.setObject(3, obj.getString("ccid"));
									ps.setObject(4, xsdIds[z]);
									ps.setObject(5, ylzlIds[s]);
									ps.setObject(6, "");
									ps.setObject(7, "");
									ps.setObject(8, "");
									ps.setObject(9, userId);
									ps.setObject(10, sysTime);
									ps.setObject(11, userId);
									ps.setObject(12, sysTime);
								}
							});
				}

			}

			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("新增失败", e);
		}
	}

	// 查询销售点
	private void queryXsd(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			String name = obj.getString("name");
			map.put("payboxname", name);
			map.put("sessionsid", obj.getString("sessionsid"));
			List<SessnZone> list = getDao().query("bookedseat.querySpd", map,
					SessnZone.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("查询失败");
			throw new DpException("查询失败", e);
		}
	}

	// 查询座位
	private void querySeat(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("ccid", obj.getString("ccid"));
			map.put("fqid", obj.getString("fqid"));
			List<SessnPew> list = getDao().query("bookedseat.querySeat", map,
					SessnPew.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("查询失败");
			throw new DpException("查询失败", e);
		}
	}

	// 删除
	private void delete(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			String pewids = obj.getString("pewids");
			map.put("pewids", pewids.split(","));
			getDao().delete("bookedseat.deletePewids", map);
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("删除失败");
			throw new DpException("删除失败", e);
		}
	}

	// 添加座位
	private void addPew(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			final String hh = obj.getString("hh");
			final String lh = obj.getString("lh");
			final String fqid = obj.getString("fqid");
			final String sessionsid = obj.getString("sessionsid");
			final String pjdjid=obj.getString("pjdjid");
		    final String jg=obj.getString("jg");
		    final String sfkys=obj.getString("sfkys");//是否可预售
		    final String sfks=obj.getString("sfks");//是否可售
		    final String sfkq=obj.getString("sfkq");//是否可取
		    final String ylzl=obj.getString("ylzl");//预留种类
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session
					.getAttribute(UserConstant.USER_XTID);
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			final int x = Integer.parseInt(hh);// 行号
			final int y = Integer.parseInt(lh);// 列号
			map.put("sessionsid", sessionsid);
			BookedSeat seatObj = (BookedSeat) getDao().queryForObject(
					"bookedseat.querySessionHall", map, BookedSeat.class);
			String hallid = "";
			if (null != seatObj) {
				hallid = seatObj.getHallid();
			}
			final String yctid = hallid;
			map.put("zoneid", fqid);
			map.put("hallid", hallid);
			map.put("row", x+1);
			map.put("col", y+1);
			int count = getDao().queryCount("bookedseat.querySessionExistsPew",
					map);
			if (count > 0) {
				pm.setData("exists");
				return;
			} else {// 新增座位
				final String pewid = IdUtil.createThirteenId();
				getDao().getJdbcTemplate().update(
						SqlUtil.getSql("sessnzone.insertSessnpew", null)
								.getSql(), new PreparedStatementSetter() {
							public void setValues(PreparedStatement ps)
									throws SQLException {
								ps.setObject(1, pewid);
								ps.setObject(2, sessionsid);// sessionsid
								ps.setObject(3, yctid);// hallid
								ps.setObject(4, fqid);// zoneid
								ps.setObject(5, "第" + (x + 1) + "排,第" + (y + 1)
										+ "座");// pewname --座位名
								ps.setObject(6, x + 1);// 排号
								ps.setObject(7, y + 1);// 列号
								ps.setObject(8, "");// 是否加座
								ps.setObject(9, pjdjid);// 票价等级ID
								ps.setObject(10, jg);// 票价
								ps.setObject(11,ylzl);// 预留分类ID
								ps.setObject(12, sfkys);// 是否可预售
								ps.setObject(13, sfks);// 是否可售
								ps.setObject(14, sfkq);// 是否可取
								ps.setObject(15, "");// 备注
								String zwzt="";
								if ("2".equals(sfks) || "2" == sfks) {// 设置锁定--如果是否可售为否，设置锁定
									zwzt="2";
								}
								ps.setObject(16, zwzt);// 座位状态
								ps.setObject(17, SystemConstant.qyzt);// 禁启状态
								ps.setObject(18, SystemConstant.delstatus);// 删除状态
								ps.setObject(19, 0);// 数据版本号
								ps.setObject(20, userId);
								ps.setObject(21, sysTime);
								ps.setObject(22, userId);
								ps.setObject(23, sysTime);
								ps.setObject(24, (x-1)*10+y);
							}
						});
				pm.setData("success");

			}
		} catch (Exception e) {
			pm.setData("添加失败");
			throw new DpException("添加失败", e);
		}
	}

	@Override
	public void unInstall() {
		// TODO Auto-generated method stub

	}

}
