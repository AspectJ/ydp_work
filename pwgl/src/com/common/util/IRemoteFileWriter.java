package com.common.util;

import java.io.OutputStream;

/**
 * 
 * <p>
 * Title：远程文件写入器
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
public interface IRemoteFileWriter {

	/**
	 * <p>
	 * 作用描述：写入远程文件
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param out
	 *            远程文件输出流
	 * @return 写入过程消息
	 * 
	 */
	String write(OutputStream out);

}
