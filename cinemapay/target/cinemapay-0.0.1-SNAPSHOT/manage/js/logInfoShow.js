
function getLogInfo(logid){
	var url = service_url + "rest/log/getLog";
	$.post( url,{logid : logid },function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
		if(result == 1000){
        	var resultData = retjson.data;
        	$("#logtype").html(resultData.log_type_name);
        	$("#theatername").html(resultData.theatername);
        	$("#username").html(resultData.username);
        	$("#ip").html(resultData.ip);
        	$("#time").html(resultData.operator_time);
        	$("#content").html(resultData.log_content);
        }else if(result == 1205){
        	errorTip("提示","日志信息不存在");
        	return;
        }else if(result == 1204){
        	errorTip("提示","查询日志信息失败");
        	return;
        }
	});
}

