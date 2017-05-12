package com.cp.rest.card;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

import com.cp.util.ConfigTest;
import com.cp.util.HTTPClientTest;

public class CardRestTest
{
	Map<String, Object> params = new HashMap<String, Object>();
	
	@Test
	public void testFindProduct() throws NoSuchAlgorithmException, IOException
	{
		String path = ConfigTest.URL + "rest/card/addCard";
		params.put("cardconfid", 1111);
		HTTPClientTest.sendHttpMess(path, params, "POST", "application/json;charset=UTF-8");
	}
}
