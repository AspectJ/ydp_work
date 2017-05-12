/**
 * 这是框架js工具包
 */

/**
 * 这是公共的访问ajax的方法 serviceId:模块ID data：数据 dataType:数据类型 true代表单行数据 false代表多行数据
 * callback：回调函数
 */
function publicAjaxRequest(serviceId, data, dataType, callback) {
	var dataXml = "";
	var param = null;
	if (dataType == jsonType) {
		dataXml = JSON.stringify(data);
		param = getParam(serviceId, undefined, dataType);
	} else if (dataType) {
		dataXml = getOneDataXml(data);
		param = getParam(serviceId);
	} else {
		dataXml = getDataXml(data);
		param = getParam(serviceId);
	}
	$.ajax({
				type : 'POST',
				url : springMvcUrl,
				data : {
					param : param,
					data : dataXml
				},
				contentType : "application/x-www-form-urlencoded; charset=UTF-8",
				success : function(response) {
					var successFlag = true;
					if (response != null && response != undefined
							&& response != "") {
						successFlag = getRequestSuccessFlag(response.data);
					}
					callback(response, successFlag);
				},
				timeout : 14400000,// 设置请求超时时间（毫秒）。此设置将覆盖全局设置。
				error : function(XMLHttpRequest, errMes, exception) {
					if (errMes == "timeout") {
						ctl_alert('连接服务器超时，请重试或与管理员联系!', function() {
								});
					} else if (errMes == "error" && XMLHttpRequest.status == 0) {
					} else {
						ctl_alert('请求服务器失败，请重试或与管理员联系!', function() {
								});
					}
				},
				dataType : "json"
			});
}

/**
 * 判断后台执行是否成功
 * 
 * @param resData
 *            response返回data
 * @returns {Boolean}后台执行正常返回true 执行异常返回false
 */
function getRequestSuccessFlag(resData) {
	if (resData != null && resData != undefined && resData != "") {
		var data = resData.toString();
		if (data.indexOf(exceptionFlag) != -1) {
			return false;
		} else if(data.indexOf("DP-00902") != -1){
			$.cookie("sessionIdKey", null);
			$.cookie("dlyh", null);
			window.location.href = "login.html";
		}else {
			return true;
		}
	}

	return true;
}

// 参数封装js
var rowBgXml = "<row>";
var rowEnXml = "</row>";

var dataBgXml = "<bean>";
var dataEnXml = "</bean>";

// 后台异常标识常量
var exceptionFlag = "errorId";

// 每行数据的初步外壳包装
function getRowXml(data) {
	return rowBgXml + data + rowEnXml;
}

// 初步包装好的数据包装最终外壳
function getDataXml(data) {
	return dataBgXml + data + dataEnXml;
}

// 一行数据的外壳包装
function getOneDataXml(data) {
	return dataBgXml + rowBgXml + data + rowEnXml + dataEnXml;
}

// 去除数据的外壳包装
function removeDataXml(data) {
	data = data.replace(rowBgXml, '');
	data = data.replace(rowEnXml, '');
	data = data.replace(dataBgXml, '');
	data = data.replace(dataEnXml, '');
	return data;
}

// 组装param参数
function getParam(serviceId, sessionId, dataFormat) {
	// todo sessionId从cookie中取
	// 如果传人的sessionId为空，则取默认的sessionId
	if (typeof(sessionId) == 'undefined') {
		sessionId = defaultSessionId;
	}
	// 如果传人的dataFormat为空，则取默认的dataFormat
	if (typeof(dataFormat) == 'undefined') {
		dataFormat = defaultDataFormat;
	}
	return "serviceId/=/" + serviceId + "/;/sessionId/=/" + sessionId
			+ "/;/dataFormat/=/" + dataFormat;
}

/**
 * 给单选按钮组设置值
 * 
 * @param radioName
 *            单选按钮的name
 * @param radioValue
 *            单选按钮的value
 */
function setRadioValue(radioName, radioValue) {
	var radioObj = document.getElementsByName(radioName);
	for (var i = 0; i < radioObj.length; i++) {
		if (radioObj[i].value == radioValue) {
			radioObj[i].checked = true;
		}
	}
}

/**
 * 获取选中的复选框的值
 */
function getSelectCheckboxValue(checkboxName) {
	var selectCheckbox = "";
	$(":checkbox[name=" + checkboxName + "]:checked").each(function() {
				if (selectCheckbox == "") {
					selectCheckbox = $(this).val();
				} else {
					selectCheckbox = selectCheckbox + "," + $(this).val();
				}
			});
	return selectCheckbox;
}

/**
 * 表单 组装参数通过 map 适用于 单独表单变量值，不适用于混合数据
 * 
 * @author xyk
 * @param map
 *            key : 页面ID<=>js变量<=>param参数名称 value: 类型 如 text radio
 * @return <name>xyk</name>
 */
function getParamByMap(map) {
	var param = "";
	if (map) {
		var keyArr = map.keys();
		for (var i = 0; i < keyArr.length; i++) {
			var key = keyArr[i];
			if (key) {
				var val = map.get(key);
				if (val === "radio") {
					param += "<" + key + ">"
							+ $("input[name='" + key + "']:checked").val()
							+ "</" + key + ">";
				} else if (val === "text") {
					var keyVal = $('#' + key).val();
					if (keyVal === "undefined" || keyVal === "null") {
						keyVal = "";
					}
					if (keyVal) {
						param += "<" + key + ">" + keyVal + "</" + key + ">";
					}
				}
			};
		};
		map = null;
	}
	return param;
};

/**
 * @author: xyk 适用于组合各种数据形成参数 map key = name value = 值
 */
function getParamByNameValue(map, param, another) {
	param = param || "";
	if (!map) {
		return;
	}
	if (another) {
		param += "<row type='" + another + "'>";
	}
	var keyArr = map.keys();
	for (var index in keyArr) {
		var key = keyArr[index];
		if (!key) {
			continue;
		}
		param += "<" + key + ">" + map.get(key) + "</" + key + ">";
	}
	if (another) {
		param += "</row>";
	}
	return param;
}

/**
 * 对象是否为空或者null
 * 
 * @param {}
 *            obj
 * @return {}
 */
function isNullEmpty(obj) {
	return (obj == null || obj == "" || obj == undefined);
}

/**
 * 跳转到新的url
 * 
 * @param newUrl
 *            新的url
 * @param callBackFunc
 *            回调函数 designatedDivId 指定的div id
 */
function turnToNewUrl(newUrl, callBackFunc, designatedDivId) {
	if (typeof(designatedDivId) != "undefined") {
		$("#" + designatedDivId).load(newUrl, callBackFunc);
		return;
	}
	currentPageObj={
			taburl:newUrl
		};
	if ($("#workMainDiv").length > 0) {
		$("#workMainDiv").load(newUrl, callBackFunc);
	}
}