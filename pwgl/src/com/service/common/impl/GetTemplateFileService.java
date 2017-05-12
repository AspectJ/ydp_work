package com.service.common.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.common.constant.SystemConstant;
import com.common.dp.Param;
import com.common.parser.IParser;
import com.common.util.FileUtil;
import com.common.util.ParserUtil;
import com.common.util.WebUtil;
import com.service.BaseService;
import com.service.IService;

/**
 * 
 * <p>
 * Title：模板文件下载通用服务
 * </p>
 * <p>
 * Description：2014
 * </p>
 * <p>
 * Author :2014-4-5
 * </p>
 * <p>
 * Department : 小区
 * </p>
 */
@Component
public class GetTemplateFileService extends BaseService implements IService {

	@Transactional
	public void service(Param pm) throws Exception {
		FileInputStream fis = null;
		OutputStream output = null;
		try {
			String data = (String) pm.getData();
			int dataPackType = pm.getDataFormat();
			String fileName = null;
			if (SystemConstant.jsonType == dataPackType) {
				JSONObject obj = JSON.parseObject(data);
				fileName = obj.getString("fileName");
			} else {
				IParser parserAll = ParserUtil.createParser(dataPackType, data);
				String rowData = parserAll.selectNode("/bean/row", null);
				IParser parser = ParserUtil.createParser(dataPackType, rowData);
				fileName = parser.getText("/row/fileName");
			}

			if (StringUtils.trimToNull(fileName) == null) {
				return;
			}
			fileName = fileName.replace("\\", "/");
			String pathName = FileUtil.getFileName(fileName);
			File templateFile = new File(pathName);
			if (!templateFile.exists()) {
				return;
			}
			HttpServletRequest request = WebUtil.getRequest();
			HttpServletResponse resp = WebUtil.getResponse();
			String simpleFileName = "";
			if (fileName.contains("/")) {
				simpleFileName = fileName
						.substring(fileName.lastIndexOf("/") + 1);
			} else {
				simpleFileName = fileName;
			}
			simpleFileName = processFileName(request,simpleFileName);
			WebUtil.processDownloadResponse(simpleFileName, request, resp);
			fis = new FileInputStream(templateFile);
			output = resp.getOutputStream();
			byte[] b = new byte[4096];
			int len = 0;
			while ((len = fis.read(b)) != -1) {
				output.write(b, 0, len);
			}
		} catch (Exception e) {
			throw new Exception("下载失败!", e);
		} finally {
			try {
				if (fis != null) {
					fis.close();
				}
			} catch (Exception e2) {
				fis = null;
			}
			try {
				if (output != null) {
					output.close();
				}
			} catch (Exception e2) {
				output = null;
			}
		}

	}

	/**
	 * <p>
	 * 作用描述：ie,chrom,firfox下处理文件名显示乱码
	 * </p>
	 * <p>
	 * 修改说明：ie 11的agent是Trident
	 * </p>
	 * 
	 * @param request
	 * @param fileNames
	 * @return
	 *            
	 */
	public static String processFileName(HttpServletRequest request,
			String fileNames) {
		String codedfilename = null;
		try {
			String agent = request.getHeader("USER-AGENT");
			if (null != agent && -1 != agent.indexOf("MSIE") || null != agent
					&& -1 != agent.indexOf("Trident")) {// ie

				String name = java.net.URLEncoder.encode(fileNames, "UTF8");

				codedfilename = name;
			} else if (null != agent && -1 != agent.indexOf("Mozilla")) {// 火狐,chrome等

				codedfilename = new String(fileNames.getBytes("UTF-8"),
						"UTF8");
			}
		} catch (Exception e) {
			return null;
		}
		return codedfilename;
	}

	public void install() {
	}

	public void unInstall() {
	}
}
