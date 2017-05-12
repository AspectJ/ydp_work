package com.cp.rest.order.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cp.filter.BaseDao;
import com.mongo.MyMongo;

@Service("orderDao")
public class OrderDaoImpl extends BaseDao
{

	/**
	 * 订单列表
	 * @param map
	 */
	public int orderListTotal(Map<String, Object> map)
	{
		return getSqlSession().selectOne("order.orderListTotal", map);
	}
//	public float totalPrice(Map<String, Object> map)
//	{
//		return getSqlSession().selectOne("order.totalPrice", map);
//	}
	public List<Map<String, Object>> orderList(Map<String, Object> map)
	{
		return getSqlSession().selectList("order.orderList", map);
	}
	
	
	/**
	 * 订单详情
	 * @param map
	 * @return
	 */
	public Map<String, Object> orderMess(Map<String, Object> map)
	{
		return getSqlSession().selectOne("order.orderMess", map);
	}
	
	
	/**
	 * 生成订单
	 * @param map
	 * @return
	 */
	public int createOrder(Map<String, Object> map){
		return getSqlSession().insert("order.createOrder", map);
	}
	
	/**
	 * 订单支付
	 * @param map
	 * @return
	 */
	public boolean payOrder(Map<String, Object> map){
		boolean flag = false;
		
		try
		{
			map.put("status", 2);
			saveOrderStatus( map ); // 插入订单状态记录表
			
			getSqlSession().update("order.payOrder", map);
			return true;
		} catch (Exception e)
		{
			MyMongo.mErrorLog("订单支付", e);
		}
		return flag;
	}
	
	/**
	 * 修改订单状态
	 * @param map
	 * @return
	 */
	public int updateOrderStatus(Map<String, Object> map){
		map.put("modifytime", new Date());
		return getSqlSession().update("order.updateOrderStatus", map);
	}
	
	/**
	 * 插入订单状态记录表
	 * @param map
	 * @return
	 */
	public int saveOrderStatus(Map<String, Object> map){
		map.put("createtime", new Date());
		return getSqlSession().insert("order.saveOrderStatus", map);
	}
	
	/**
	 * 获取订单状态
	 * @param ordernumber
	 * @return
	 */
	public int getOrderStatus(String ordernumber)
	{
		return getSqlSession().selectOne("order.getOrderStatus", ordernumber);
	}
	
	
	/**
	 * 根据订单，获取订单商品的卡劵ID
	 * @param ordernumber
	 * @return
	 */
	public String getProductCardid(String ordernumber)
	{
		return getSqlSession().selectOne("order.getProductCardid", ordernumber);
	}
	
	
	/**
	 * 校验订单信息
	 * @param orderid
	 * @return
	 */
	public Map<String, Object> checkCardCode(String cardCode)
	{
		return getSqlSession().selectOne("order.checkCardCode", cardCode);
	}
	public Map<String, Object> checkOrder(String ordernumber)
	{
		return getSqlSession().selectOne("order.checkOrder", ordernumber);
	}
	
	
	/**
	 * 订单与卡劵绑定
	 * @param ordernumber
	 * @param cardCode
	 */
	public int bindCard( Map<String, Object> map )
	{
		return getSqlSession().update( "order.bindCard", map );
	}
	
	
	/**
	 * 用户订单列表
	 * @param openid
	 * @return
	 */
	public List<Map<String, Object>> userOrderList(String openid)
	{
		return getSqlSession().selectList("order.userOrderList", openid);
	}
	
	
	/**
	 * 获取订单卡劵号
	 * @param orderid
	 * @return
	 */
	public String getOrderCard(int orderid)
	{
		return getSqlSession().selectOne("order.getOrderCard", orderid);
	}
	
	
	/**
	 * 我的核销订单
	 * @param parseInt
	 * @return
	 */
	public int myChargeOffTotal(Map<String, Object> map)
	{
		return getSqlSession().selectOne("order.myChargeOffTotal", map);
	}
	public List<Map<String, Object>> myChargeOff(Map<String, Object> map)
	{
		return getSqlSession().selectList("order.myChargeOff", map);
	}
	
	public int myChargeOffOnlineTotal(Map<String, Object> map)
	{
		return getSqlSession().selectOne("order.myChargeOffOnlineTotal", map);
	}
	public List<Map<String, Object>> myChargeOffOnline(Map<String, Object> map)
	{
		return getSqlSession().selectList("order.myChargeOffOnline", map);
	}
	
	
	/**
	 * 保存核销的线上订单
	 * @param merchantList
	 */
	public void saveOnlineOrder(Map<String, Object> order)
	{
		getSqlSession().insert("order.saveOnlineOrder", order);
	}
}
