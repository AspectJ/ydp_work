package com.service.api.common;

import java.util.Random;

/**
 * 
 * <p>
 * Title：生成验证码
 * </p>
 * <p>
 * Description：2015
 * </p>
 * <p>
 * Author : 2015-10-14
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */
public class CodeUtil {

	/**
	 * <p>
	 * 作用描述：生成注册验证码
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @return
	 * 
	 */
	public static String zcCode() {
		int max = 10000;
		int min = 1000;
		Random random = new Random();
		int s = random.nextInt(max) % (max - min + 1) + min;
		return "" + s;
	}

	/**
	 * <p>
	 * 作用描述：生成找回密码验证码
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @return
	 * 
	 */
	public static String zhmmCode() {
		int max = 10000;
		int min = 1000;
		Random random = new Random();
		int s = random.nextInt(max) % (max - min + 1) + min;
		return "" + s;
	}

}
