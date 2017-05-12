package com.common.util;

import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.common.constant.SystemConstant;
import com.common.constant.WyglExceptionCode;
import com.common.exception.DpException;

/**
 * 
 * <p>
 * Title：APP文件上传工具类
 * </p>
 * <p>
 * Description：APP文件上传工具类
 * </p>
 * <p>
 * Author : 2015-5-14
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */
public class UploadFileUtil {

	/**
	 * <p>
	 * 作用描述：文件上传
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param type
	 *            即业务类型：hd活动有约 chtd茶话天地等
	 * @return 文件上传后的各文件名List<String>，文件名包括文件路径,但非全路径
	 * 
	 */
	public static List<String> uploadFiles(String type) {
		List<String> fileNamesList = null;
		HttpServletRequest request = WebUtil.getRequest();
		if (request instanceof MultipartHttpServletRequest) {
			MultipartHttpServletRequest multiRequset = (MultipartHttpServletRequest) request;
			FileOutputStream fop = null;
			try {
				SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
				String date = df.format(new Date());
				fileNamesList = new ArrayList<String>();
				int i = 1;
				for (Entry<String, MultipartFile> e : multiRequset.getFileMap()
						.entrySet()) {
					MultipartFile file = e.getValue();
					byte[] fileBytes = file.getBytes();
					String oriFileName = file.getOriginalFilename();
					int idx = oriFileName.indexOf(".");
					String hz = oriFileName
							.substring(idx, oriFileName.length());
					String fileName = System.currentTimeMillis() + "_" + i + hz;
					i++;
					String filePath = type + "/" + date + "/" + fileName;// 文件路径带文件名，用于返回给APP端
					File f = new File(FilePathUtil.getWebRootPath()
							+ SystemConstant.img + "/" + filePath);// 写入到tomcat下的路径
					if (!f.getParentFile().exists()) {
						f.getParentFile().mkdirs();
						f.createNewFile();
					}
					fop = new FileOutputStream(f);
					fop.write(fileBytes);
					fop.flush();
					fop.close();
					fop = null;
					fileNamesList.add(filePath);
				}
			} catch (Exception e) {
				throw new DpException(WyglExceptionCode.UPLOAD_FILE_ERROR, e);
			} finally {
				try {
					if (null != fop) {
						fop.close();
						fop = null;
					}
				} catch (Exception e) {
					throw new DpException(WyglExceptionCode.UPLOAD_FILE_ERROR,
							e);
				}
			}
		}
		return fileNamesList;
	}
}
