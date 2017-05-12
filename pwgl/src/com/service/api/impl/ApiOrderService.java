package com.service.api.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.common.constant.PageConstant;
import com.common.constant.SystemConstant;
import com.common.constant.TypeConstant;
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
import com.service.api.entity.ApiOrder;
import com.service.api.entity.ApiOrderDetail;
import com.service.api.entity.ApiPe;
import com.service.api.entity.ApiPriceLevelCout;
import com.service.api.entity.ApiUnlockOrder;
import com.service.api.entity.ApiYh;
import com.service.api.entity.ApiZwZt;
import com.service.api.entity.OrderReturn;

/**
 * 订单
 * 
 * @author xjm
 * 
 */
@Component
public class ApiOrderService extends BaseService implements IService {

	@Override
	public void install() {
		// TODO Auto-generated method stub

	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void service(Param pm) throws Exception {

		String data = (String) pm.getData();
		int dataPackType = pm.getDataFormat();
		if (SystemConstant.jsonType == dataPackType) {
			JSONObject obj = JSON.parseObject(data);
			String operType = obj.getString("operType");
			if ("lock".equals(operType)) {// 锁定座位
				lock(pm, obj);
			} else if ("unlock".equals(operType)) {
				unlock(pm, obj);// 释放
			} else if ("presell".equals(operType)) {
				presell(pm, obj);// 预定
			} else if ("out".equals(operType)) {
				out(pm, obj);// 出票
			} else if ("query".equals(operType)) {// 订单查询
				query(pm, obj);
			} else if ("update".equals(operType)) {
				update(pm, obj);
			} else if ("add".equals(operType)) {
				add(pm, obj);
			} else {
				Map<String, Object> retMap = new HashMap<String, Object>();
				retMap.put(TypeConstant.SF, TypeConstant.FAIL);
				retMap.put(TypeConstant.SHOW_MSG, "操作类型错误！");
				pm.setData(retMap);
				throw new DpException("操作类型错误!", null);
			}
		}
	}

	// 锁定座位
	private synchronized void lock(Param pm, JSONObject obj) throws Exception {
		Map<String, Object> retMap = new HashMap<String, Object>();
		OrderReturn returnObj = null;
		final String orderid = IdUtil.createThirteenId();
		List<ApiYh> yhLists = new ArrayList<ApiYh>();
		List<String> tpyhpwdjList = new ArrayList<String>();// 票价等级+票价--套票
		List<String> yhpwdjList = new ArrayList<String>();// 票价等级+票价--优惠
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			final String itemid = obj.getString("itemid");
			final String sessionsid = obj.getString("sessionsid");
			final String venueid = obj.getString("venueid");
			final String hallid = obj.getString("hallid");
			final String producttypeid = obj.getString("producttypeid");
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session
					.getAttribute(UserConstant.USER_XTID);// 售票员
			final String payboxid = (String) session.getAttribute("payboxid");// 售票机构ID
			final String pewids = obj.getString("pewids");
			map.put("sessionsid", sessionsid);
			boolean tag = false;// 这个是用来判断，如果是true可以锁定座位，否则不可以false
			if (null != pewids && !"".equals(pewids)) {
				final String zwid[] = pewids.split(",");
				map.put("pewid", zwid);
				int count = getDao().queryCount("apiorder.queryZwZt", map);
				if (count == zwid.length) {// 表示全是可以锁定的
					tag = true;
				} else {
					tag = false;
				}

				// 判断是否在订单表
				int ct = 0;// 如果大于0表示这个存在订单表中，不能进行锁定座位
				double sum = 0.0;
				for (int i = 0; i < zwid.length; i++) {
					map.put("pewid", zwid[i]);
					ApiZwZt zwztObj = (ApiZwZt) getDao().queryForObject(
							"apiorder.queryZwdyfq", map, ApiZwZt.class);
					sum = sum + Double.valueOf(zwztObj.getPrice());
					String zoneid = zwztObj.getZoneid();
					map.clear();
					map.put("pewid", zwid);
					map.put("zoneid", zoneid);
					map.put("sessionsid", sessionsid);
					map.put("venueid", venueid);
					map.put("hallid", hallid);
					int c = getDao().queryCount("apiorder.queryOrderStatus",
							map);
					if (c > 0) {
						ct = c;
					}
				}

				if (ct > 0) {
					tag = false;
				} else {
					tag = true;
				}

				if (!tag) {
					retMap.put(TypeConstant.SF, TypeConstant.FAIL);
					retMap.put(TypeConstant.SHOW_MSG, "请重新刷新座位状态！");
					retMap.put("tag", true);
					pm.setData(retMap);
					return;
				}

				map.clear();
				map.put("sessionsid", sessionsid);
				double price = 0.00;
				String setpolicyid = "";
				final double zwzh = sum;

				// 查询座位对应的票价等级分组
				// 查询座位对应的票价等级，及数量
				map.put("pewids", pewids.split(","));
				List<ApiPriceLevelCout> listPriceC = getDao().query(
						"apisession.queryZwpjdj", map, ApiPriceLevelCout.class);
				double tp_yhje = 0.00;// 优惠金额--套票政策
				int c = 0;// 如果大于0表示享受了套票政策
				double yhzc_yhje = 0.00;// 优惠金额--优惠政策
				int yc = 0;// 如果大于0表示享受了优惠政策

				// 优先取套票政策
				double zyhje = 0.0;

				if (!"".equals(pewids) && null != pewids) {
					map.put("sessionsid", sessionsid);

					/****************** 套票政策和优惠政策优先取套票政策 ******************************/
					// 查询套票政策
					ApiZwZt tpzcObj = (ApiZwZt) getDao().queryForObject(
							"apiorder.queryTpzcjg", map, ApiZwZt.class);
					if (tpzcObj != null) {
						// ApiYh yhObj=new ApiYh();
						String numb = tpzcObj.getNumb();
						String tpid = tpzcObj.getSetpolicyid();
						map.put("policyid", tpid);

						// 根据政策ID，查询明细表对应的票价等级和套票价
						List<ApiPriceLevelCout> priceList = getDao().query(
								"apiorder.queryZcPjdjhzpj", map,
								ApiPriceLevelCout.class);

						// 遍历座位List数据
						for (ApiPriceLevelCout zwObj : listPriceC) {
							String sl = zwObj.getSl();
							String pwdjid = zwObj.getPricelevelid();
							if (!"".equals(sl) && null != sl
									&& !"".equals(numb) && null != numb) {
								int ct1 = Integer.parseInt(sl);
								int tpnumb = Integer.parseInt(numb);

								// 只有票价等级的数量大于或等于套票数量,且票价等级都相同的情况,才能享受套票政策
								if (ct1 >= tpnumb) {
									for (ApiPriceLevelCout mxObj : priceList) {
										String pricelevelid = mxObj
												.getPricelevelid();
										String oldprice = mxObj.getOldprice();// 原来价格
										String yhjg = mxObj.getPrice();// 套票价格
										double yhje = 0.00;
										if (pricelevelid.equals(pwdjid)) {
											c++;
											if (!"".equals(oldprice)
													&& !"".equals(yhjg)) {
												yhje = Double.valueOf(oldprice)
														- Double.valueOf(yhjg);
												tp_yhje = tp_yhje
														+ (yhje * ct1);// 优惠金额=(原金额-套票金额)*数量
												tpyhpwdjList.add(pwdjid + ","
														+ yhje); // 设置票价等级优惠的金额--套票
											}
										}
									}

								}
							}
						}

					}

					// 查询优惠政策
					ApiZwZt yhzcObj = (ApiZwZt) getDao().queryForObject(
							"apiorder.queryYhzcjg", map, ApiZwZt.class);

					if (yhzcObj != null) {
						String numb = yhzcObj.getNumb();
						String tpid = yhzcObj.getSetpolicyid();
						map.put("policyid", tpid);

						// 根据政策ID，查询明细表对应的票价等级和套票价
						List<ApiPriceLevelCout> priceList = getDao().query(
								"apiorder.queryZcPjdjhzpj", map,
								ApiPriceLevelCout.class);

						// 遍历座位List数据
						for (ApiPriceLevelCout zwObj : listPriceC) {
							String sl = zwObj.getSl();
							String pwdjid = zwObj.getPricelevelid();
							if (!"".equals(sl) && null != sl
									&& !"".equals(numb) && null != numb) {
								int ct2 = Integer.parseInt(sl);
								int tpnumb = Integer.parseInt(numb);

								// 只有票价等级的数量大于或等于套票数量,且票价等级都相同的情况,才能享受套票政策
								if (ct2 >= tpnumb) {
									for (ApiPriceLevelCout mxObj : priceList) {
										String pricelevelid = mxObj
												.getPricelevelid();
										String oldprice = mxObj.getOldprice();// 原来价格
										String yhjg = mxObj.getPrice();// 套票价格
										double yhje = 0.00;
										if (pricelevelid.equals(pwdjid)) {
											yc++;
											if (!"".equals(oldprice)
													&& !"".equals(yhjg)) {
												yhje = Double.valueOf(oldprice)
														- Double.valueOf(yhjg);
												yhzc_yhje = tp_yhje
														+ (yhje * ct2);// 优惠金额=(原金额-套票金额)*数量
												yhpwdjList.add(pwdjid + ","
														+ yhje); // 设置票价等级优惠的金额
											}
										}
									}

								}
							}
						}
					}
					if (c > 0 || yc > 0) {
						if (tpzcObj != null && yhzcObj != null) {
							setpolicyid = tpzcObj.getSetpolicyid();
							zyhje = tp_yhje;
						} else if (tpzcObj != null && yhzcObj == null) {
							setpolicyid = tpzcObj.getSetpolicyid();
							zyhje = tp_yhje;
						} else if (tpzcObj == null && yhzcObj != null) {
							setpolicyid = yhzcObj.getSetpolicyid();
							zyhje = yhzc_yhje;
						}
					}
				}

				// 这里查询座位对应的优惠价格
				map.put("pewids", pewids.split(","));
				List<ApiYh> yhList = getDao().query("apisession.queryZwyhjg",
						map, ApiYh.class);
				List<String> yhListStr = new ArrayList<String>();
				if (tpyhpwdjList != null && yhpwdjList != null
						&& yhpwdjList.size() > 0 && tpyhpwdjList.size() > 0) {
					yhListStr = tpyhpwdjList;
				} else if (tpyhpwdjList != null && yhpwdjList == null
						&& yhpwdjList.size() <= 0 && tpyhpwdjList.size() > 0) {
					yhListStr = tpyhpwdjList;
				} else if (tpyhpwdjList == null && yhpwdjList != null
						&& yhpwdjList.size() > 0 && tpyhpwdjList.size() == 0) {
					yhListStr = yhpwdjList;
				}
				for (ApiYh yhObj : yhList) {
					String pjdjid = yhObj.getPricelevelid();
					for (int i = 0; i < yhListStr.size(); i++) {
						String priceLevelid = yhListStr.get(i).toString()
								.split(",")[0];
						String yhprice = yhListStr.get(i).toString().split(",")[1];
						if (pjdjid.equals(priceLevelid)) {
							yhObj.setActprice(yhprice);
						}
					}
				}
				yhLists = yhList;

				final String xszcid = setpolicyid;
				final double yhjes = zyhje;
			

				// 写入订单表及明细表
				if (tag) {
					final String ordercode = IdUtil.createId();
					returnObj = new OrderReturn();
					Double zpj = zwzh;
					final double sjpj=zpj - zyhje;
					returnObj.setTotal(zpj);// 总票价
					returnObj.setActprice(sjpj);// 实际票价
					returnObj.setPolicy(zyhje);// 优惠金额
					
					Map<String,Object> new_m=new HashMap<String,Object>();
					new_m.put("sessionsid", sessionsid);
					new_m.put("payboxid", payboxid);
					
					//检查场次配额
					ApiPe ccpeObj=(ApiPe)getDao().queryForObject("apiorder.queryCcpe", map, ApiPe.class);
					if(ccpeObj!=null){
						String ccpe=ccpeObj.getQuata();
						if(null!=ccpe){
							double cpe=Double.valueOf(ccpe);
							if(sjpj>cpe){//如果实际票价大于场次配额，那么不可以买票了
								retMap.put(TypeConstant.SF, TypeConstant.FAIL);
								retMap.put(TypeConstant.SHOW_MSG, "场次配额不足！");
								pm.setData(retMap);
								return;
							}else if(cpe<=0){
								retMap.put(TypeConstant.SF, TypeConstant.FAIL);
								retMap.put(TypeConstant.SHOW_MSG, "场次配额不足");
								return;
							}
						}else{
							retMap.put(TypeConstant.SF, TypeConstant.FAIL);
							retMap.put(TypeConstant.SHOW_MSG, "场次配不足！");
							return;
						}
					}
					
					//检查销售机构场次配额
					ApiPe xsjgObj=(ApiPe)getDao().queryForObject("apiorder.queryXszcCcpe", map, ApiPe.class);
					if(xsjgObj!=null){
						String ccpe=xsjgObj.getQuata();
						if(null!=ccpe){
							double cpe=Double.valueOf(ccpe);
							if(sjpj>cpe){//如果实际票价大于销售机构配额，那么不可以买票了
								retMap.put(TypeConstant.SF, TypeConstant.FAIL);
								retMap.put(TypeConstant.SHOW_MSG, "销售机构配额不足！");
								pm.setData(retMap);
								return;
							}else if(cpe<=0){
								retMap.put(TypeConstant.SF, TypeConstant.FAIL);
								retMap.put(TypeConstant.SHOW_MSG, "销售机构配额不足！");
								pm.setData(retMap);
								return;
							}
						}
					}else{
						retMap.put(TypeConstant.SF, TypeConstant.FAIL);
						retMap.put(TypeConstant.SHOW_MSG, "销售机构配额不足！");
						pm.setData(retMap);
						return;
					}
					

					// 写入订单表
					getDao().getJdbcTemplate().update(
							SqlUtil.getSql("apiorder.insertOrder", null)
									.getSql(), new PreparedStatementSetter() {
								public void setValues(PreparedStatement ps)
										throws SQLException {
									ps.setObject(1, orderid);
									ps.setObject(2, ordercode);
									ps.setObject(3, itemid);// 项目Id
									ps.setObject(4, sessionsid);// 场次sessionsid
									ps.setObject(5, venueid);// 场馆ID
									ps.setObject(6, hallid);// 演出厅ID
									ps.setObject(7, producttypeid);// 产品类别ID
									ps.setObject(8, DateUtil.getNowTimestamp());// 订单时间
									ps.setObject(9, DateUtil.getNowTimestamp());// 锁票时间
									ps.setObject(10, "");// 释放时间
									ps.setObject(11, "");// 出票时间
									ps.setObject(12, zwid.length);// 总张数
									ps.setObject(13, xszcid);// 销售政策ID
									ps.setObject(14, zwzh);// 原订单总金额=座位价格之和
									ps.setObject(15, yhjes);// 优惠金额
									ps.setObject(16, zwzh - yhjes);// 实际得到总金额
									ps.setObject(17, "");// 支付时间
									ps.setObject(18, "0");// 支付金额
									ps.setObject(19, payboxid);// 售票机构ID
									ps.setObject(20, userId);// 售票员ID
									ps.setObject(21, "2");// 是否取票 1.是，2否
									ps.setObject(22, "");// 取票时间
									ps.setObject(23, "1");// 订单类型：1售票订单 2预订订单
									ps.setObject(24, "1");// 订单状态 1锁票成功 2预订成功
															// 3已退票 4已完成 9已取消
									ps.setObject(25, "1");// 支付状态 1未支付 2支付中 3已支付
															// 4已退款
									ps.setObject(26, "1");// 出票状态
									ps.setObject(27, "0");// 数据库版本号
									ps.setObject(28, userId);// 操作人
									ps.setObject(29, DateUtil.getNowTimestamp());// 操作时间
									ps.setObject(30, userId);// 修改人
									ps.setObject(31, DateUtil.getNowTimestamp());// 修改时间
									ps.setObject(32, "");// 支付方式
								}
							});

					// 写入订单明细表
					for (int i = 0; i < zwid.length; i++) {
						map.put("pewid", zwid[i]);
						final ApiZwZt ztObj = (ApiZwZt) getDao()
								.queryForObject("apiorder.queryZwdyfq", map,
										ApiZwZt.class);
						getDao().getJdbcTemplate().update(
								SqlUtil.getSql("apiorder.insertOrderDetail",
										null).getSql(),
								new PreparedStatementSetter() {
									public void setValues(PreparedStatement ps)
											throws SQLException {
										ps.setObject(1,
												IdUtil.createThirteenId());// 明细ID
										ps.setObject(2, orderid);// 订单id
										ps.setObject(3, ordercode);// 订单编号
										ps.setObject(4, itemid);// 项目ID
										ps.setObject(5, sessionsid);// 场次ID
										ps.setObject(6, venueid);// 场馆ID
										ps.setObject(7, hallid);// 演出厅ID
										ps.setObject(8, producttypeid);// 产品类别ID
										ps.setObject(9, ztObj.getZoneid());// 分区ID
										ps.setObject(10, ztObj.getPewid());// 座位ID
										ps.setObject(11,
												ztObj.getPricelevelid());// 票价等级ID
										ps.setObject(12, ztObj.getReserveid());// 预留种类ID
										ps.setObject(13, payboxid);// 售票机构ID
										ps.setObject(14, userId);// 售票员ID userId
										ps.setObject(15, ztObj.getPrice());// 原票价
										ps.setObject(16, "0");// 数据库版本号
										ps.setObject(17, userId);// 操作人
										ps.setObject(18,
												DateUtil.getNowTimestamp());// 操作时间
										ps.setObject(19, userId);// 修改人
										ps.setObject(20,
												DateUtil.getNowTimestamp());// 修改时间
									}
								});
					}

					// 写入订单操作明细
					getDao().getJdbcTemplate().update(
							SqlUtil.getSql("apiorder.insertOrderOperate", null)
									.getSql(), new PreparedStatementSetter() {
								public void setValues(PreparedStatement ps)
										throws SQLException {
									ps.setObject(1, IdUtil.createThirteenId());// 订单操作明细ID
									ps.setObject(2, orderid);// 订单id
									ps.setObject(3, userId);// 操作用户
									ps.setObject(4, "1");// 操作类型 1锁票 2预订 3退票 4支付
															// 5退款 6出票 7取消
									ps.setObject(5, DateUtil.getNowTimestamp());// 操作时间
									ps.setObject(6, userId);// 操作用户
									ps.setObject(7, DateUtil.getNowTimestamp());// 操作时间
									ps.setObject(8, userId);// 修改人
									ps.setObject(9, DateUtil.getNowTimestamp());// 修改时间
								}
							});

				}
			}

			// 更新座位状态
			map.clear();
			map.put("pewstatus", "2");// 1可售，2不可售 3已售
			map.put("pewid", pewids.split(","));
			getDao().update("apiorder.updateZwStatus", map);
			retMap.put("data", returnObj);
			retMap.put("orderid", orderid);
			retMap.put("actPewList", yhLists);
			retMap.put(TypeConstant.SF, TypeConstant.SUCCESS);
			retMap.put(TypeConstant.SHOW_MSG, "锁票成功！");
			pm.setData(retMap);
		} catch (Exception e) {
			retMap.put(TypeConstant.SF, TypeConstant.FAIL);
			retMap.put(TypeConstant.SHOW_MSG, "锁票失败！");
			pm.setData(retMap);
			throw new DpException("锁票失败！", e);
		}
	}

	// 释放座位
	private synchronized void unlock(Param pm, JSONObject obj) throws Exception {
		Map<String, Object> retMap = new HashMap<String, Object>();
		try {
			Map<String, Object> map = new HashMap<String, Object>();

			// 先根据场次和座位，及订单状态是锁定的状态，查询出订单ID
			String sessionsid = obj.getString("sessionsid");
			String pewids = obj.getString("pewids");
			if (!"".equals(pewids) && null != pewids) {
				String ids[] = pewids.split(",");

				// 修改座位状态
				map.put("pewstatus", "1");// 1可售，2不可售 3已售
				map.put("pewid", pewids.split(","));
				getDao().update("apiorder.updateZwStatus", map);

				for (int i = 0; i < ids.length; i++) {
					map.clear();
					map.put("sessionsid", sessionsid);
					map.put("pewid", ids[i]);
					ApiUnlockOrder orderObj = (ApiUnlockOrder) getDao()
							.queryForObject("apiorder.queryCczwddid", map,
									ApiUnlockOrder.class);
					if (orderObj != null) {
						String orderid = orderObj.getOrderid();

						// 修改订单明细
						map.clear();
						map.put("unlocktime", DateUtil.getNowTimestamp());
						map.put("orderid", orderid);
						map.put("sessionsid", sessionsid);
						getDao().update("apiorder.updateOrderu", map);

						// 修改操作明细
						map.clear();
						map.put("optime", DateUtil.getNowTimestamp());
						map.put("orderid", orderid);
						getDao().update("apiorder.updateOrderOper", map);
					}
				}
			}
			retMap.put(TypeConstant.SF, TypeConstant.SUCCESS);
			retMap.put(TypeConstant.SHOW_MSG, "释放成功！");
			pm.setData(retMap);
		} catch (Exception e) {
			retMap.put(TypeConstant.SF, TypeConstant.FAIL);
			retMap.put(TypeConstant.SHOW_MSG, "释放失败！");
			pm.setData(retMap);
			throw new DpException("释放失败！", e);
		}
	}

	// 预定
	private synchronized void presell(Param pm, JSONObject obj)
			throws Exception {
		Map<String, Object> retMap = new HashMap<String, Object>();
		try {
		
			Map<String,Object> map=new HashMap<String,Object>();
            String orderid=obj.getString("orderid");
            map.put("orderid", orderid);
            
        	// 更新订单状态--主表
//        	map.put("outtime", DateUtil.getNowTimestamp());
//			map.put("outlettime", DateUtil.getNowTimestamp());
			getDao().update("apiorder.updatePreSellOrder", map);
			
			//明细表
			getDao().update("apiorder.udpateOperDetail", map);
			

			
			retMap.put(TypeConstant.SF, TypeConstant.SUCCESS);
			retMap.put(TypeConstant.SHOW_MSG, "预定成功！");
			pm.setData(retMap);
		} catch (Exception e) {
			retMap.put(TypeConstant.SF, TypeConstant.FAIL);
			retMap.put(TypeConstant.SHOW_MSG, "预定失败！");
			pm.setData(retMap);
			throw new DpException("预定失败！", e);
		}
	}

	// 出票
	private synchronized void out(Param pm, JSONObject obj) throws Exception {
		Map<String, Object> retMap = new HashMap<String, Object>();
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session
					.getAttribute(UserConstant.USER_XTID);// 售票员
			final String payboxid = (String) session.getAttribute("payboxid");// 售票机构ID
			String orderid = obj.getString("orderid");

			// 根据订单Id,查询场次
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("orderid", orderid);
			ApiOrder orderObj = (ApiOrder) getDao().queryForObject(
					"apiorder.querySessionOrder", map, ApiOrder.class);

			// 更新订单状态
			map.put("outtime", DateUtil.getNowTimestamp());
			map.put("outlettime", DateUtil.getNowTimestamp());
			map.put("orderid", orderid);
			getDao().update("apiorder.updateOutOrderStatus", map);
			List<ApiOrderDetail> list = getDao().query(
					"apiorder.queryOrderDetailZw", map, ApiOrderDetail.class);

			// 修改座位状态
			if (list.size() > 0) {
				for (ApiOrderDetail objs : list) {
					map.clear();
					map.put("pewid", objs.getPewid());
					getDao().update("apiorder.updatePewStatus", map);
				}

			}

			ApiOrder order = (ApiOrder) getDao().queryForObject(
					"apiorder.queryPayPrice", map, ApiOrder.class);
			String payprice = order.getPayprice();
			map.put("price", payprice);
			map.put("sessionsid", orderObj.getSessionsid());
			map.put("payboxid", payboxid);
			getDao().update("apiorder.updateSessionMoney", map);
			getDao().update("apiorder.updateSellerMoney", map);

			// 修改操作明细
			map.clear();
			map.put("orderid", orderid);
			map.put("mid", userId);
			map.put("mtime", DateUtil.getNowTimestamp());
			getDao().update("apiorder.updateOperDetail", map);
			retMap.put(TypeConstant.SF, TypeConstant.SUCCESS);
			retMap.put(TypeConstant.SHOW_MSG, "出票成功！");
			pm.setData(retMap);
		} catch (Exception e) {
			retMap.put(TypeConstant.SF, TypeConstant.FAIL);
			retMap.put(TypeConstant.SHOW_MSG, "出票失败！");
			pm.setData(retMap);
			throw new DpException("出票失败！", e);
		}
	}

	// 订单查询
	private void query(Param pm, JSONObject obj) throws Exception {
		Map<String, Object> retMap = new HashMap<String, Object>();
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if (null == page || null == rowNum) {
				retMap.put(TypeConstant.SF, "pageError");
				retMap.put(TypeConstant.SHOW_MSG, "分页参数有误!");
				pm.setData(retMap);
				return;
			}
			map.put(PageConstant.PAGE_NUM, page);
			map.put(PageConstant.ROW_NUMS, rowNum);
			String itemid = obj.getString("itemid");// 项目ID
			String sessionsname = obj.getString("sessionsname");// 场次名称
			String venueid = obj.getString("venueid");// 场馆ID
			String producttypeid = obj.getString("producttypeid");// 产品类别
			String bgtime = obj.getString("bgtime");// 开始时间
			String endtime = obj.getString("endtime");// 结束时间
			String ordercode = obj.getString("ordercode");// 订单编号
			String name = obj.getString("name");// 客户姓名
			String tele = obj.getString("tele");// 客户手机
			String payboxid = obj.getString("payboxid");// 售票机构id
			String sellerid = obj.getString("sellerid");// 售票员ID
			String selbgtime = obj.getString("selbgtime");// 售票开始时间（订单时间）
			String selendtime = obj.getString("selendtime");// 售票结束时间（订单时间）
			String odstatus = obj.getString("odstatus");// 订单状态
			String odtype = obj.getString("odtype");// 订单类型
			String paystatus = obj.getString("paystatus");// 支付订单状态
			String outstatus = obj.getString("outstatus");// 出票状态
			map.put("itemid", itemid);
			map.put("sessionsname", sessionsname);
			map.put("venueid", venueid);
			map.put("producttypeid", producttypeid);
			map.put("bgtime", bgtime);
			map.put("endtime", endtime);
			map.put("ordercode", ordercode);
			map.put("name", name);
			map.put("tele", tele);
			map.put("payboxid", payboxid);
			map.put("sellerid", sellerid);
			map.put("selbgtime", selbgtime);
			map.put("selendtime", selendtime);
			map.put("odstatus", odstatus);
			map.put("odtype", odtype);
			map.put("paystatus", paystatus);
			map.put("outstatus", outstatus);
			map.put(PageConstant.PAGE_NUM, page);
			map.put(PageConstant.ROW_NUMS, rowNum);
			Object[] objArr = getDao().queryForPage("apiorder.queryOrder", map,
					ApiOrder.class);
			List<ApiOrder> list = null;
			Integer totalCount = 0;
			Integer totalPageSize = 0;
			if (null != objArr && objArr.length > 0) {
				list = (List<ApiOrder>) objArr[0];
				totalCount = (Integer) objArr[1];
				totalPageSize = (Integer) objArr[2];
			}
			
			//遍历订单数据
			List<ApiYh> listYh=new ArrayList<ApiYh>();
			for(ApiOrder orderObj:list){
				ApiYh yhObj=new ApiYh();
				
				//根据订单ID，查询座位ID
				String orderid=orderObj.getOrderid();
				String pewids=orderObj.getPewids();//座位
				String policyid=orderObj.getPolicyid();//销售政策/优惠政策
				
				//查询优惠的价格
				Map<String,Object> map1=new HashMap<String,Object>();
				
				//根据订单id，座位id，查询优惠票价
				map1.put("pewids", pewids.split(","));
				map1.put("orderid", orderid);
				List<ApiOrder> detailList=getDao().query("apiorder.queryPewidsPricelevel", map1, ApiOrder.class);
				double yhprice=0.0;
				for(int i=0;i<detailList.size();i++){
					ApiOrder o=detailList.get(i);
					String pricelevelid=o.getPricelevelid();
					String pewname=o.getPewname();
					yhObj.setPewname(pewname);
					String price=o.getPrice();
					map1.put("policyid", policyid);
					map1.put("pricelevelid", pricelevelid);
					ApiOrder od=(ApiOrder)getDao().queryForObject("apiorder.queryPolicyOldPrice", map1, ApiOrder.class);
					if(od!=null){
						String oldprice=od.getOldprice();
						if(null!=oldprice&&!"".equals(oldprice)&&null!=price&&!"".equals(price)){
							double op=Double.valueOf(oldprice);
							double cp=Double.valueOf(price);
							yhprice=cp-op;
							yhObj.setActprice(String.valueOf(yhprice));
						}
						listYh.add(yhObj);
					}
				}
			
			}
			retMap.put("actPewList", listYh);// 优惠列表
			retMap.put("data", list);// 数据列表
			retMap.put("totalCount", totalCount);// 总记录数
			retMap.put("totalPageSize", totalPageSize);// 总页数
			retMap.put("pageNum", page);// 当前页
			retMap.put(TypeConstant.SF, TypeConstant.SUCCESS);
			retMap.put(TypeConstant.SHOW_MSG, "查询成功！");
			pm.setData(retMap);
		} catch (Exception e) {
			retMap.put(TypeConstant.SF, TypeConstant.FAIL);
			retMap.put(TypeConstant.SHOW_MSG, "查询失败！");
			pm.setData(retMap);
			throw new DpException("查询失败！", e);
		}
	}

	// 订单修改
	private synchronized void update(Param pm, JSONObject obj) throws Exception {
		Map<String, Object> retMap = new HashMap<String, Object>();
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			final String orderid = obj.getString("orderid");
			String odstatus = obj.getString("odstatus");// 订单状态
			String paystatus = obj.getString("paystatus");// 支付状态
			String outstatus = obj.getString("outstatus");// 出票状态 1,未出票，2已经出票
			String isoutlet = obj.getString("isoutlet");// 是否取票
			String outlettime = obj.getString("outlettime");// 取票时间
			final String tracknumb = obj.getString("tracknumb");// 运单号
			String paytype = obj.getString("paytype");// 支付方式

			map.put("orderid", orderid);
			map.put("odstatus", odstatus);
			map.put("paystatus", paystatus);
			map.put("outstatus", outstatus);
			map.put("isoutlets", isoutlet);
			map.put("outlettimes", outlettime);
			map.put("paytype", paytype);
			getDao().update("apiitem.updateOrderd", map);
			map.clear();
			if (!"".equals(tracknumb) && null != tracknumb) {
				map.put("tracknumb", tracknumb);
				map.put("orderid", orderid);
				getDao().update("apiorder.updateCustomerInfo", map);
			}

			retMap.put(TypeConstant.SF, TypeConstant.SUCCESS);
			retMap.put(TypeConstant.SHOW_MSG, "修改成功！");
			pm.setData(retMap);
		} catch (Exception e) {
			retMap.put(TypeConstant.SF, TypeConstant.FAIL);
			retMap.put(TypeConstant.SHOW_MSG, "修改失败！");
			pm.setData(retMap);
			throw new DpException("修改失败！", e);
		}
	}

	// 添加客户信息
	private void add(Param pm, JSONObject obj) throws Exception {
		Map<String, Object> retMap = new HashMap<String, Object>();
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session
					.getAttribute(UserConstant.USER_XTID);// 售票员
			final String payboxid = (String) session.getAttribute("payboxid");// 售票机构ID
			final String orderid = obj.getString("orderid");
			final String tracknumb = obj.getString("tracknumb");// 运单号

			// 预定座位
			final String name = obj.getString("name");
			final String sex = obj.getString("sex");
			final String tele = obj.getString("tele");
			final String custype = obj.getString("custype");
			final String credtype = obj.getString("credtype");
			final String crednum = obj.getString("crednum");
			final String addr = obj.getString("addr");
			final String sendtype = obj.getString("sendtype");
			final String company = obj.getString("company");
			map.put("orderid", orderid);
			final ApiYh oderObj = (ApiYh) getDao().queryForObject(
					"apiorder.queryOrderCodes", map, ApiYh.class);

			getDao().getJdbcTemplate().update(
					SqlUtil.getSql("apiorder.insertCustomer", null).getSql(),
					new PreparedStatementSetter() {
						public void setValues(PreparedStatement ps)
								throws SQLException {
							ps.setObject(1, IdUtil.createThirteenId());// 客户信息ID
							ps.setObject(2, orderid);// 订单id
							ps.setObject(3, oderObj.getOrdercode());// 订单编号
							ps.setObject(4, name);// 姓名
							ps.setObject(5, sex);// 性别
							ps.setObject(6, tele);// 手机号码
							ps.setObject(7, custype);// 客户类型
							ps.setObject(8, credtype);// 证件类型
							ps.setObject(9, crednum);// 证件号码
							ps.setObject(10, "");// 所在地区
							ps.setObject(11, addr);// 详细地址
							ps.setObject(12, sendtype);// 配送方式
							ps.setObject(13, tracknumb);// 运单号
							ps.setObject(14, company);// 发票抬头
							ps.setObject(15, "0");// 数据库版本号
							ps.setObject(16, userId);
							ps.setObject(17, DateUtil.getNowTimestamp());
							ps.setObject(18, userId);
							ps.setObject(19, DateUtil.getNowTimestamp());

						}
					});
			
			//修改订单状态
			map.put("outtime", DateUtil.getNowTimestamp());
			map.put("outlettime", DateUtil.getNowTimestamp());
			map.put("orderid", orderid);
			getDao().update("apiorder.updatePreSellAddCusOrder", map);
			List<ApiOrderDetail> list = getDao().query(
					"apiorder.queryOrderDetailZw", map, ApiOrderDetail.class);

			// 修改座位状态
			if (list.size() > 0) {
				for (ApiOrderDetail objs : list) {
					map.clear();
					map.put("pewid", objs.getPewid());
					getDao().update("apiorder.updatePewStatus", map);
				}
			}
			
			ApiOrder order = (ApiOrder) getDao().queryForObject(
					"apiorder.queryPayPrice", map, ApiOrder.class);
			ApiOrder orderObj = (ApiOrder) getDao().queryForObject(
					"apiorder.querySessionOrder", map, ApiOrder.class);
			String payprice = order.getPayprice();
			map.put("price", payprice);
			map.put("sessionsid", orderObj.getSessionsid());
			map.put("payboxid", payboxid);
			getDao().update("apiorder.updateSessionMoney", map);
			
			retMap.put(TypeConstant.SF, TypeConstant.SUCCESS);
			retMap.put(TypeConstant.SHOW_MSG, "添加成功！");
			pm.setData(retMap);
		} catch (Exception e) {
			retMap.put(TypeConstant.SF, TypeConstant.FAIL);
			retMap.put(TypeConstant.SHOW_MSG, "添加失败！");
			pm.setData(retMap);
			throw new DpException("添加失败！", e);
		}
	}

	@Override
	public void unInstall() {
		// TODO Auto-generated method stub

	}

}
