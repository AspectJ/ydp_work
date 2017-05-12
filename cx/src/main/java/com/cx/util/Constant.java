package com.cx.util;


/**
 * 描述：公用常量
 * 编写：PCF、2016-05-13
 */
public interface Constant {
	
	//图片存储路径
	public static final String image = "upload\\";//上传图片文件夹
	//  图片保存确保每次启动项目文件夹不会被删除而新定义的一个路径
   //  public static final String image = "c:\\";
	//图片
	public static final String news_info = "image\\";//图片文件夹
	public static final String news_theme = "themeImage\\";//主题文件夹
	public static final String news_content = "contentImage\\";//内容图片文件夹
	public static final String news_img = "themeimg_";//主题图片前缀
	public static final String news_content_img = "contentimg_";//内容图片前缀
	public static final String content_img = "contentimg_\\";//上传(资讯/活动/通知)内容中的图片
	//通知文件夹
	public static final String notice_info = "notice\\";
	//通知第三层文件夹（为了迎合创建文件夹的方法必须传三个参数，其实这是不必要的）
	public static final String notice_content = "content\\";
	//通知文件的前缀
	public static final String notice_document = "notice_";
	
	

}
