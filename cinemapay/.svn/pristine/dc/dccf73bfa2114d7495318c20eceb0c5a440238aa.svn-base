package com.cp.rest.user;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

import com.cp.rest.userinfo.UserInfoRest;
import com.cp.util.ConfigTest;
import com.cp.util.HTTPClientTest;

public class UserRestTest extends UserInfoRest
{

	Map<String, Object> params = new HashMap<String, Object>();

	@Test
	public void testOperaterList() throws NoSuchAlgorithmException, IOException
	{
		String path = ConfigTest.URL + "rest/user/operaterList";
		params.put("page", 1);
		params.put("pagesize", 10);
		params.put("filter", 2);
		HTTPClientTest.sendHttpMess(path, params, "GET", "application/json;charset=UTF-8");
	}
}
