$(function() {
	
	// 用户名回车事件
	$('#loginuser').bind('keyup', function(event) {
		if (event.keyCode == "13") {
			$("#loginuser").focus();
			$('#loginpwd').val("");
			$("#loginpwd").select();
		}
	});
	// 密码回车事件
	$('#loginpwd').bind('keyup', function(event) {
		if (event.keyCode == "13") {
			login();
		}
	});

	// 登录按钮点击事件
	$('#loginbtn').click(function() {
		login();
	});

});

// 登录
function login() {
	var loginuser = jQuery.trim($("#loginuser").val());
	var loginpwd = $("#loginpwd").val();
	if (loginuser == "" || loginpwd == "") {
		$("#loginmsg").html("提醒：用户名、密码不能为空!");
		return;
	}
	
	var data ={operType:'spy',loginuser:loginuser,loginpwd:loginpwd};
	var param = "serviceId/=/" + loginService + "/;/sessionId/=/"+defaultSessionId+"/;/dataFormat/=/"+defaultDataFormat;
	$.ajax({
		type : "POST",
		url : springMvcUrl,
		data : {
			param : param,
			data : JSON.stringify(data)
		},
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		success : function(response) {
			var messData = response.data;
			if (messData != null && messData != "") {
				for (key in messData) {
					if (key == "sf") {
						var sf = messData["sf"];
						if(sf == "success"){
							var loginData = messData["session"];
							$.cookie("sessionId", loginData.sessionId);
							window.location.href = "index.html";
						}else{
							$("#loginmsg").html("提醒："+messData["showMsg"]);
						}
					} else if (key == "error") {
						$("#loginmsg").html("提醒："+messData["showMsg"]);
					}
				}
			} else {
				$("#loginmsg").html("提醒：您输入的用户名或密码有误!");
			}
		},
		error : function(XMLHttpRequest, errMes, exception) {
			if (errMes == "timeout") {
				$("#loginmsg").html("提醒：连接服务器超时，请重试或与管理员联系!");
			} else if (errMes == "error" && XMLHttpRequest.status == 0) {
			} else {
				$("#loginmsg").html("提醒：连接服务器超时，请重试或与管理员联系!");
			}
		},
		dataType : "json"
	});
}