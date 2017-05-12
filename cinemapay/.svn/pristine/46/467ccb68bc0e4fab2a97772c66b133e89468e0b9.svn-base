package com.tools.qiniu.init.upload;

import java.io.File;
import java.io.IOException;

import com.mongo.MyMongo;
import com.qiniu.common.QiniuException;
import com.qiniu.http.Response;
import com.qiniu.storage.UploadManager;

/**
 * 七牛上传文件
 */
public class QNUpload
{
	/**
	 * 简单上传
	 * @param token 七牛令牌
	 * @param filePath 上传文件的路径
	 * @param key 上传到七牛后保存的文件名
	 * @throws IOException
	 */
	public static void upload(String token, String filePath, String key) throws IOException
	{
		try
		{
			// 创建上传对象
			UploadManager uploadManager = new UploadManager();

			// 调用put方法上传
			Response res = uploadManager.put(filePath, key, token);
			// 打印返回的信息
			MyMongo.mLog("INFO", "七牛-简单上传", res.bodyString());
			
			File file = new File(filePath);  
		    if (file.isFile() && file.exists()) {  
		        file.delete();  
		    }  
		} catch (QiniuException e)
		{
			Response r = e.response;
			// 请求失败时打印的异常的信息
			MyMongo.mLog("WARN", "七牛-简单上传", r.toString());
			try
			{
				// 响应的文本信息
				MyMongo.mLog("WARN", "七牛-简单上传", r.bodyString());
			} catch (QiniuException e1)
			{
				MyMongo.mErrorLog("七牛-简单上传", e1);
			}
		}
	}
}
