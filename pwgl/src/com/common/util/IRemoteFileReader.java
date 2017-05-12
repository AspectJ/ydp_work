package com.common.util;

import java.io.InputStream;

/**
 * 
 * <p>
 * Title：远程文件读取器
 * </p>
 * <p>
 * Description：
 * </p>
 * <p>
 * Author :彭彩红 2014-1-2
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */
public interface IRemoteFileReader {

	/**
	 * <p>
	 * 作用描述：读取远程文件
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param in
	 *            远程文件流
	 * @return 远程文件流处理过程消息
	 * 
	 */
	String read(InputStream in);

}
