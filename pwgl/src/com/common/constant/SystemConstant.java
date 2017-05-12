package com.common.constant;

import com.common.util.PropertiesUtil;

/**
 * 
 * <p>
 * Title：
 * </p>
 * <p>
 * Description：2014
 * </p>
 * <p>
 * Author : 2014-4-1
 * </p>
 * <p>
 * Department :
 * </p>
 */
public class SystemConstant {

	static {
		String str = PropertiesUtil.load(SystemConstant.class,
				"/conf/properties/system.properties", null);
		System.out.println("属性文件中如下属性在常量类中未找到匹配项：" + str);
	}

	/**
	 * 默认根节点字符串
	 */
	public final static String ROOT = "ROOT";

	public static Integer jsonType;

	/**
	 * 图片服务器地址
	 */
	public static String imgurl;

	/**
	 * 应用服务器上图片上传存放路径
	 */
	public static String img;
	
	public static String ptxmid;

	// public static void main(String[] args) {
	// String str = PropertiesUtil.load(SystemConstant.class,
	// "/conf/properties/system.properties", null);
	// System.out.println("属性文件中如下属性在常量类中未找到匹配项：" + str);
	// System.out.println(SystemConstant.jsonType);
	// }
	
	/**
	 * 代码分类--启用状态
	 */
	public static String jyzt = "2";
	
	/**
	 * 代码分类--启用状态
	 */
	public static String qyzt = "1";
	/**
	 * 代码分类--删除状态
	 */
	public static String delstatus="3";

	/**
	 * 代码分类--禁启状态
	 */
	public static String jqzt = "100";
	
	/**
	 * 代码分类--是否状态
	 */
	public static String sfzt = "101";
	
	/**
	 * 代码分类--意见来源
	 */
	public static String yjly = "102";
	
	/**
	 * 代码分类--使用场景
	 */
	public static String sycj = "103";
	
	/**
	 * 代码分类--数据格式
	 */
	public static String sjgs = "104";
	
	/**
	 * 代码分类--参数类型
	 */
	public static String cslx = "105";
	
	/**
	 * 代码分类--场次状态
	 */
	public static String cczt = "200";
	/**
	 * 座位解锁时间
	 */
	public static String jssj="30";
}
