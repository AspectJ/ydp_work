package com.cp.rest.product.dao;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cp.filter.BaseDao;

@Service("productDao")
public class ProductDaoImpl extends BaseDao
{

	/**
	 * 查找商品
	 * @param map
	 */
	public int productListTotal(Map<String, Object> map)
	{
		return getSqlSession().selectOne("product.productListTotal", map);
	}
	public List<Map<String, Object>> productList(Map<String, Object> map)
	{
		return getSqlSession().selectList("product.productList", map);
	}
	
	
	/**
	 * 查找商品详情
	 * @param map
	 */
	public Map<String, Object> findProductMess(int productid)
	{
		return getSqlSession().selectOne("product.findProductMess", productid);
	}
	
	
	/**
	 * 添加产品
	 * @param map
	 */
	public int addProduct(Map<String, Object> map)
	{
		Date now = new Date();
		map.put("createtime", now);
		map.put("modifytime", now);
		return getSqlSession().insert("product.addProduct", map);
	}
	
	
	/**
	 * 删除商品
	 * @param map
	 */
	public int delProduct(Map<String, Object> map)
	{
		return getSqlSession().insert("product.delProduct", map);
	}
	
	
	/**
	 * 修改商品信息
	 * @param map
	 */
	public int updateProduct(Map<String, Object> map)
	{
		map.put("modifytime", new Date());
		return getSqlSession().insert("product.updateProduct", map);
	}
	
	
	/**
	 * 创建卡劵
	 * @param priductid
	 * @param cardid
	 */
	public int createCoupons(String productid, String cardid)
	{
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("productid", Integer.parseInt(productid));
		map.put("cardid", cardid);
		return getSqlSession().update("product.createCoupons", map);
	}
	
	
	/**
	 * 验证是否可以支付（是否有卡劵, 是否已上架）
	 * @param parseInt
	 * @return
	 */
	public Map<String, Object> checkPayProduct(int productid)
	{
		return getSqlSession().selectOne("product.checkPayProduct", productid);
	}
	
	
	/**
	 * 商品状态修改
	 * @param map
	 * @return
	 */
	public int productStatusChange(Map<String, Object> map)
	{
		return getSqlSession().update("product.productStatusChange", map);
	}
	
	
	/**
	 * 查找商品名称列表
	 * @param filter
	 * @return
	 */
	public List<Map<String, Object>> productNameList(Map<String, Object> map)
	{
		return getSqlSession().selectList("product.productNameList", map);
	}
	
	
	/**
	 * 获取商品名称
	 * @param productid
	 * @return
	 */
	public String getProductName(int productid)
	{
		return getSqlSession().selectOne("product.getProductName", productid);
	}

	
	/**
	 * 同步线上状态
	 * @param productid
	 * @return
	 */
	public int getOnline(int productid)
	{
		return getSqlSession().selectOne("product.getOnline", productid);
	}
}
