package com.common.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.UnknownHostException;

import jcifs.smb.SmbFile;
import jcifs.smb.SmbFileInputStream;
import jcifs.smb.SmbFileOutputStream;

import com.common.constant.WyglExceptionCode;
import com.common.exception.DpException;

/**
 * 
 * <p>
 * Title：远程文件操作类，包括读取和写入
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
public class RemoteFileUtil {

	/**
	 * 远程文件路径前缀
	 */
	private final static String SUBM = "subm://";

	private final static String SYMBOL_1 = ":";

	private final static String SYMBOL_2 = "@";

	private final static String SYMBOL_3 = "/";

	/**
	 * <p>
	 * 作用描述：读取远程文件
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param osUserName
	 *            远程文件服务器操作系统用户名
	 * @param osPassword
	 *            远程文件服务器操作系统密码
	 * @param osIp
	 *            远程文件服务器操作系统IP地址
	 * @param fileName
	 *            远程文件名，格式为：share/test.txt(share 为共享的文件夹名，不带盘符，共享时指定的共享名)
	 * @param reader
	 *            流读取器(回调函数)
	 * @return 远程文件操作过程中消息，由reader流读取器自行定义
	 * 
	 */
	public static String read(String osUserName, String osPassword,
			String osIp, String fileName, IRemoteFileReader reader) {
		String msg = null;
		InputStream in = null;
		SmbFileInputStream smbIn = null;
		SmbFile remoteFile = null;
		String smbFile = SUBM + osUserName + SYMBOL_1 + osPassword + SYMBOL_2
				+ osIp + SYMBOL_3 + fileName;
		if (null != smbFile && !"".equals(smbFile)) {
			try {
				remoteFile = new SmbFile(smbFile);
				if (remoteFile != null) {
					smbIn = new SmbFileInputStream(remoteFile);
					in = new BufferedInputStream(smbIn);
					if (null != reader) {
						msg = reader.read(in);
					}
				} else {
					msg = "请确认远程文件是否存在!";
				}
				smbIn.close();
				in.close();
				remoteFile.delete();
			} catch (Exception e) {
				throw new DpException(WyglExceptionCode.REMOTEFILE_READ_ERROR,
						e);
			} finally {
				try {
					if (smbIn != null) {
						smbIn.close();
					}
					if (in != null) {
						in.close();
					}
					smbIn = null;
					in = null;
				} catch (Exception e) {
					throw new DpException(
							WyglExceptionCode.REMOTEFILE_READ_ERROR, e);
				}
			}
		}
		return msg;
	}

	/**
	 * <p>
	 * 作用描述：写入远程文件
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param osUserName
	 *            远程文件服务器操作系统用户名
	 * @param osPassword
	 *            远程文件服务器操作系统密码
	 * @param osIp
	 *            远程文件服务器操作系统IP地址
	 * @param fileName
	 *            远程文件名，格式为：share/test.txt(share 为共享的文件夹名，不带盘符，共享时指定的共享名)
	 * @param writer
	 *            流写入器(回调函数)
	 * @return 远程文件操作过程中消息，由writer流写入器自行定义
	 * 
	 */
	public static String write(String osUserName, String osPassword,
			String osIp, String fileName, IRemoteFileWriter writer) {
		String msg = null;
		OutputStream out = null;
		SmbFileOutputStream smbFileOut = null;
		String smbFile = SUBM + osUserName + SYMBOL_1 + osPassword + SYMBOL_2
				+ osIp + SYMBOL_3 + fileName;
		if (null != smbFile && !"".equals(smbFile)) {
			try {
				SmbFile remoteFile = new SmbFile(smbFile);
				if (!remoteFile.exists()) {
					remoteFile.createNewFile();
				}
				smbFileOut = new SmbFileOutputStream(remoteFile);
				out = new BufferedOutputStream(smbFileOut);
				if (null != writer) {
					msg = writer.write(out);
				}
				out.flush();
			} catch (Exception e) {
				throw new DpException(WyglExceptionCode.REMOTEFILE_WRITE_ERROR,
						e);
			} finally {
				try {
					if (smbFileOut != null) {
						smbFileOut.close();
					}
					if (out != null) {
						out.close();
					}
					smbFileOut = null;
					out = null;
				} catch (final Exception e) {
					throw new DpException(
							WyglExceptionCode.REMOTEFILE_WRITE_ERROR, e);
				}
			}
		}
		return msg;
	}

	/**
	 * <p>
	 * 作用描述：获取当前服务器的IP
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @return 当前服务器IP
	 * 
	 */
	public static String getServerIp() {
		try {
			return InetAddress.getLocalHost().getHostAddress();
		} catch (UnknownHostException e) {
			throw new DpException(WyglExceptionCode.GET_SERVERIP_ERROR, e);
		}
	}

	/**
	 * <p>
	 * 作用描述：删除文件
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param osUserName
	 *            远程文件服务器操作系统用户名
	 * @param osPassword
	 *            远程文件服务器操作系统密码
	 * @param osIp
	 *            远程文件服务器操作系统IP地址
	 * @param fileName
	 *            远程文件名，格式为：share/test.txt(share 为共享的文件夹名，不带盘符，共享时指定的共享名)
	 * 
	 */
	public static void delete(String osUserName, String osPassword,
			String osIp, String fileName) {
		String smbFile = SUBM + osUserName + SYMBOL_1 + osPassword + SYMBOL_2
				+ osIp + SYMBOL_3 + fileName;
		if (null != smbFile && !"".equals(smbFile)) {
			try {
				SmbFile remoteFile = new SmbFile(smbFile);
				if (remoteFile != null) {
					remoteFile.delete();
				}
			} catch (Exception e) {
				throw new DpException(
						WyglExceptionCode.REMOTEFILE_DELETE_ERROR, e);
			}
		}
	}

	public static void main(String[] args) throws IOException {
		String msg = RemoteFileUtil.read("administrator", "lianyi253",
				"192.168.2.253", "share/test.txt", new IRemoteFileReader() {

					public String read(InputStream in) {
						OutputStream out = null;
						FileOutputStream fileOut = null;
						byte[] sbyte = null;
						File localFile = null;
						localFile = new File("d:\\test.txt");
						try {
							fileOut = new FileOutputStream(localFile);
							out = new BufferedOutputStream(fileOut);
							sbyte = new byte[1024];
							while (in.read(sbyte) != -1) {
								out.write(sbyte);
								sbyte = new byte[1024];
							}
							out.flush();
						} catch (Exception e) {
							return "操作失败";
						} finally {
							try {
								if (fileOut != null) {
									fileOut.close();
								}
								if (out != null) {
									out.close();
								}
								sbyte = null;
								localFile = null;
								fileOut = null;
								out = null;
							} catch (Exception e) {
							}
						}
						return "操作成功";
					}
				});

		String msg2 = RemoteFileUtil.write("administrator", "lianyi253",
				"192.168.2.253", "share/test2.txt", new IRemoteFileWriter() {

					public String write(OutputStream out) {
						InputStream in = null;
						File localFile = null;
						FileInputStream fileIn = null;
						byte[] sbyte = null;

						localFile = new File("d:\\codetemplates.xml");
						try {
							fileIn = new FileInputStream(localFile);
							in = new BufferedInputStream(fileIn);
							sbyte = new byte[1024];
							while (in.read(sbyte) != -1) {
								out.write(sbyte);
								sbyte = new byte[1024];
							}
						} catch (Exception e) {
						} finally {
							try {
								if (fileIn != null) {
									fileIn.close();
								}
								if (in != null) {
									in.close();
								}
								sbyte = null;
								localFile = null;
								fileIn = null;
								in = null;
							} catch (Exception e) {
							}
						}
						return null;
					}
				});
	}

}
