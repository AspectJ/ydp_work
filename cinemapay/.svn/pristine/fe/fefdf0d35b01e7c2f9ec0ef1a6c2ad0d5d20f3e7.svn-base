package com.cp.rest.product;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

import com.cp.util.ConfigTest;
import com.cp.util.HTTPClientTest;

public class ProductRestTest extends ProductRest
{
	Map<String, Object> params = new HashMap<String, Object>();
	
	@Test
	public void testFindProduct() throws NoSuchAlgorithmException, IOException
	{
		String path = ConfigTest.URL + "rest/product/findProduct";
		params.put("page", 1);
		params.put("pagesize", 10);
		params.put("filter", 2);
		HTTPClientTest.sendHttpMess(path, params, "GET", "application/json;charset=UTF-8");
	}
	
	@Test
	public void testFindProductMess() throws NoSuchAlgorithmException, IOException
	{
		String path = ConfigTest.URL + "rest/product/findProductMess";
		params.put("productid", 58);
		HTTPClientTest.sendHttpMess(path, params, "GET", "application/json;charset=UTF-8");
	}

	@Test
	public void testSubProduct() throws NoSuchAlgorithmException, IOException
	{
		String path = ConfigTest.URL + "rest/product/subProduct";
		params.put("productname", "测试222");
		params.put("headimg", "headimg");
		params.put("intro", "intro");
		params.put("price", 0.01);
		params.put("status", 0);
		params.put("operator", 1);
		HTTPClientTest.sendHttpMess(path, params, "GET", "application/json;charset=UTF-8");
	}

	@Test
	public void testDelProduct() throws NoSuchAlgorithmException, IOException
	{
		String path = ConfigTest.URL + "rest/product/delProduct";
		params.put("productid", 1);
		HTTPClientTest.sendHttpMess(path, params, "GET", "application/json;charset=UTF-8");
	}

//	@Test
//	public void testUpdateProduct() throws NoSuchAlgorithmException, IOException
//	{
//		String path = ConfigTest.URL + "rest/product/updateProduct";
//		params.put("productid", 2);
//		params.put("productname", "测试商品2");
//		params.put("headimg", "http://123123123");
//		params.put("intro", "简介");
//		params.put("price", 0.01);
//		params.put("operator", 1);
//		params.put("status", 1);
//		HTTPClientTest.sendHttpMess(path, params, "GET", "application/json;charset=UTF-8");
//	}
}
