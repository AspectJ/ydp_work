/**
 * 文件上传
 * @param valParam
 */
function ctl_initUpload(valParam){
	if (typeof(valParam.method) == 'undefined') {
		valParam.method = "post";
	}	
	$("#"+valParam.tagId).uploadify(valParam);	
	return $("#"+valParam.tagId).data('uploadify');
}

/**
 * 提交要上传的文件
 * @param tagId type="file"的文本框id
 */ 
function ctl_UploadSubmit(tagId){	
	$('#'+tagId).uploadify('upload','*');
}

/**
 * 取消上传
 * @param tagId type="file"的文本框id
 */
function ctl_UploadCancel(tagId){
	$('#'+tagId).uploadify('cancel','*');	
}


/**
 * 获取或者修改初始化参数方法
 * @param tagId type="file"的文本框id
 * 用法：ctl_UploadSetting("tagId", 'formData', formdata);修改formData的值
 * ctl_UploadSetting("tagId", 'formData');获取formData的值
 */
function ctl_UploadSetting(tagId,key,value){
	if(value==undefined){
		return $('#'+tagId).uploadify('settings',key);
	}
	$('#'+tagId).uploadify('settings',key,value);	
}

/**
 * 获取当前的上传文件对象的信息
 * @param tagId type="file"的文本框id
 * 用法：ctl_getUploadData("tagId").queueData.queueLength
 * 这样就可以获取到当前是否有文件在上传了
 */ 
function ctl_getUploadData(tagId){	
	return $("#"+tagId).data('uploadify');
}