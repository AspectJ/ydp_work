var webOfficeActivXStr = "";
webOfficeActivXStr += "<object id=WebOffice height=768 width='100%' height='100%' style='LEFT: 0px; TOP: 0px'  classid='clsid:E77E049B-23FC-4DB8-B756-60529A35FAD5' codebase='js/weboffice_v6.0.5.0.cab#Version=6,0,5,0'>";
webOfficeActivXStr += "<param name='_ExtentX' value='6350'><param name='_ExtentY' value='6350'>";
webOfficeActivXStr += "</OBJECT>";

/**
 * 初始化weboffice对象
 * 
 * @param divId
 */
function ctl_initWebOffice(divId) {
	$("#" + divId).html(webOfficeActivXStr);
}

/**
 * 获取weboffice对象
 * 
 * @returns
 */
function ctl_getWebOfficObj() {
	return document.getElementById("WebOffice");
}

/**
 * 在线打开office文件
 * 
 * @param serviceId 服务id
 * @param paramData 页面传参
 * @param docType 文档类型（doc或xls或pdf ）
 */
function ctl_viewOfficeFile(serviceId, paramData, docType) {

	var webObj = document.getElementById("WebOffice");
	var url = "/" + springMvcUrl + "?param=" + getParam(serviceId) + "&data="
			+ getOneDataXml(paramData);
	webObj.LoadOriginalFile(url, docType);
	ctl_setWebOfficeDocType(docType);
}

/**
 * 上传当前的office文件
 * 
 * @param serviceId 服务Id 
 * @param paramData 页面传参
 * @returns
 */
function ctl_handleUploadFile(serviceId, paramData) {

	var webObj = document.getElementById("WebOffice");
	// 初始化Http引擎
	webObj.HttpInit();
	// 添加相应的Post元素
	webObj.HttpAddPostString("param", getParam(serviceId));
	webObj.HttpAddPostString("data", getOneDataXml(paramData));

	// 上传文件
	webObj.HttpAddPostCurrFile("DocContent", "");
	var value = webObj.HttpPost("/" + springMvcUrl);
	return value;
}

/**
 * 设置weboffice控件当前处理的文档类型
 * @param docType 文档类型（doc或xls或pdf ）
 */
function ctl_setWebOfficeDocType(docType) {
	var webObj = document.getElementById("WebOffice");
	webObj.SetDefDocType(docType);
}

/**
 * 关闭文档
 */
function ctl_closeWebOffice() {
	var webObj = document.getElementById("WebOffice");
	webObj.CloseDoc(2);
}