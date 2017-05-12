package com.service.common.impl;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.common.constant.BusinessType;
import com.common.constant.SystemConstant;
import com.common.dp.Param;
import com.common.util.UploadFileUtil;
import com.common.util.WebUtil;
import com.service.BaseService;
import com.service.IService;

/**
 * 
 * <p>
 * Title：CKEDITOR文件上传服务
 * </p>
 * <p>
 * Description：2015
 * </p>
 * <p>
 * Author : 2015-6-30
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */
@Component
public class UploadFileService extends BaseService implements IService {

	@Override
	public void install() {
		// TODO Auto-generated method stub

	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void service(Param pm) throws Exception {
		List<String> list = UploadFileUtil.uploadFiles(BusinessType.NOTICE);
		if (null != list && list.size() > 0) {
			String fileName = SystemConstant.img + "/" + list.get(0);
			String callback = WebUtil.getRequest().getParameter(
					"CKEditorFuncNum");
			String fileData = "<script type='text/javascript'>"
					+ "window.parent.CKEDITOR.tools.callFunction(" + callback
					+ ",'" + fileName + "',''" + ")" + "</script>";
			pm.setData(fileData);
		}
	}

	@Override
	public void unInstall() {
		// TODO Auto-generated method stub

	}

}
