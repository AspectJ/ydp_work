var NetOfficeActivXStr = "";
NetOfficeActivXStr += "<object classid='clsid:1294BAB2-548B-4DBC-AD26-D92AC7D05834' id='NetOffice' CODEBASE='js/NetOffice.CAB#version=2,0,1,8'   width='100%' height='100%' style='LEFT: 0px; TOP: 0px'>";
NetOfficeActivXStr += "</object>";
/**
 * 初始化NetOffice对象
 * 
 * @param divId
 */
function ctl_initNetOffice(divId, height, width) {
	$("#" + divId).html(NetOfficeActivXStr);
	if (height != null) {
		$("#NetOffice").height(height);
	}
	if (width != null) {
		$("#NetOffice").width(width);
	}
	document.getElementById("NetOffice").SetTitle(false);
}

/**
 * 获取NetOffice对象
 * 
 * @returns
 */
function ctl_getNetOfficeObj() {
	return document.getElementById("NetOffice");
}

/**
 * 在线打开office文件
 * 
 * @param serviceId
 *            服务id
 * @param paramData
 *            页面传参
 * @param docType
 *            文档类型（.doc或.xls ）
 */
function ctl_viewNetOfficeFile(serviceId, paramData, docType) {

	var netOfficeObj = ctl_getNetOfficeObj();
	var url = lyetBasePath + springMvcUrl + "?param=" + getParam(serviceId)
			+ "&data=" + getOneDataXml(paramData);
	ctl_setNetOfficeDocType(docType);
	netOfficeObj.FileName = "temp.doc";
	netOfficeObj.WebUrl = url;
	netOfficeObj.WebOpenDoc(true);

}

/**
 * 上传当前的office文件
 * 
 * @param serviceId
 *            服务Id
 * @param paramData
 *            页面传参
 * @returns
 */
function ctl_upploadNetOfficeFile(serviceId, paramData) {

	var netOfficeObj = ctl_getNetOfficeObj();
	var url = lyetBasePath + springMvcUrl + "?param=" + getParam(serviceId)+ "&data=" + getOneDataXml(paramData);
	netOfficeObj.WebUrl = url;
	if (netOfficeObj.FileName == null || netOfficeObj.FileName == undefined || netOfficeObj.FileName == "") {
		ctl_alert("请设置netoffice的FileName属性");
		return;
	}
	if (netOfficeObj.FileType == null || netOfficeObj.FileType == undefined || netOfficeObj.FileType == "") {
		ctl_alert("请设置netoffice的FileType属性");
		return;
	}
	netOfficeObj.WebSaveDoc(true);
	return netOfficeObj.Status;
}

/**
 * 设置NetOffice控件当前处理的文档类型
 * 
 * @param docType
 *            文档类型（doc或xls或pdf ）
 */
function ctl_setNetOfficeDocType(docType) {
	var netOfficeObj = ctl_getNetOfficeObj();
	netOfficeObj.FileType = docType;
}

/**
 * 设置NetOffice控件当前处理的文档名称
 * 
 * @param {}
 *            docName 文档名称
 */
function ctl_setNetOfficeDocName(docName) {
	var netOfficeObj = ctl_getNetOfficeObj();
	netOfficeObj.FileName = docName;
}

/**
 * 设置NetOffice控件当前处理的编辑类型
 * 
 * @param editType
 *            0 － 只读和不可复制 1 － 可以编辑，无痕迹保留 2 － 可以编辑，有痕迹保留，无修订 3 － 可以编辑，有痕迹保留，有修订 4 －
 *            不可以编辑，但可以选择文档内容和复制 5 － 只读和不可复制，无痕迹保留，无修订
 * 
 */
function ctl_setNetOfficeEditType(editType) {
	var netOfficeObj = ctl_getNetOfficeObj();
	netOfficeObj.EditType = editType;
}

/**
 * 打印
 */
function ctl_printNetOffice() {
	var netOfficeObj = ctl_getNetOfficeObj();
	netOfficeObj.WebOpenPrint();
}

/**
 * 使控件全屏显示
 */
function ctl_printNetOffice() {
	var netOfficeObj = ctl_getNetOfficeObj();
	netOfficeObj.FullSize();
}

/**
 * 使控件从全屏恢复
 */
function ctl_printNetOffice() {
	var netOfficeObj = ctl_getNetOfficeObj();
	netOfficeObj.SmallSize();
}

/**
 * 关闭文档
 */
function ctl_closeNetOffice() {
	var netOfficeObj = ctl_getNetOfficeObj();
	netOfficeObj.WebClose();
}

/**
 * 创建新文件
 */
function ctl_closeNetOffice() {
	var netOfficeObj = ctl_getNetOfficeObj();
	netOfficeObj.CreateFile();
}
