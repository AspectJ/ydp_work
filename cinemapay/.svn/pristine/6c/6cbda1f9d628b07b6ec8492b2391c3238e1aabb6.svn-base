document.onkeydown = function (e) {
	var theEvent = window.event || e;
	var code = theEvent.keyCode || theEvent.which;
	if (code == 13) {

		login();
	}
}

$(function(){
	$("#username").focus(function(){
		$("#name").addClass("inBigBox");
		msgShow("");
	});
	
	$("#pass").focus(function(){
		$("#pwd").addClass("inBigBox");
		msgShow("");
	});
	
	$("#username").blur(function(){
		$("#name").removeClass("inBigBox");
		checkLoginName();
	});
	
	$("#pass").blur(function(){
		$("#pwd").removeClass("inBigBox");
		checkLoginPass();
	});
	
	$("#login").on("click",function(){
		login();
	});
	
});

function checkLoginName(){
	var username = $("#username").val();
	var reg = /(^[a-zA-Z0-9_]{5,15}$)/;
	if(username == ""){
		msgShow("登录账号不能为空");
		return false;
	}else{
		if(!reg.test(username)){
			msgShow("登录账号格式错误");
			return false;
		}else{
			msgHide();
			return true;
		}
	}
}

function checkLoginPass(){
	var pass = $("#pass").val();
	if(pass == ""){
		msgShow("登录密码不能为空");
		return false;
	}else if(pass.length < 6 || pass.length > 16){
		msgShow("登录密码为6-16位");
		return false;
	}else{
		msgHide();
		return true;
	}
}

function msgShow(msg){
	$("#msg").show();
	$("#msg").html(msg);
}

function msgHide(){
	$("#msg").html("");
	$("#msg").hide();
}

function login(){
	var username = $("#username").val();
	var pass = $("#pass").val();
	if(checkLoginName() == false){
		return;
	}else if(checkLoginPass() == false){
		return;
	}else{
		msgHide();
		var url = service_url + "rest/user/login";
		$.ajax({
			url : url,
			type : 'post',
			dataType : 'jsonp',
			contentType: "application/x-www-form-urlencoded; charset=utf-8", 
			data : {
				username : username , 
				pass : pass,
			},
			jsonp : "jsonpCallback",
			success : function(data) {
				var retjson = data;
				var result = parseInt(retjson.result);
				if(result == 1000){
					localStorage.setItem("username", retjson.data.username);
					localStorage.setItem("roletype", retjson.data.roletype);
					localStorage.setItem("theaternum", retjson.data.theaternum);
					localStorage.setItem("theatername", retjson.data.theatername);
					localStorage.setItem("theatertype", retjson.data.theatertype);
					localStorage.setItem("info", retjson.data.info);
					localStorage.setItem("menuinfo", JSON.stringify(retjson.data.menuInfo));
		        	//$("input").val("");
					$("#loginForm").submit();
		        }else if(result == 1101){
					msgShow("登录账号不存在");
					$("#pass").val("");
		        }else if(result == 1102){
					msgShow("登录密码错误");
					$("#pass").val("");
		        }else if(result == 1103){
					msgShow("登录账号已被禁用，请联系管理员");
					$("#pass").val("");
		        }else if(result == 1110){
					msgShow("登录账号的角色信息已被禁用，请联系管理员");
					$("#pass").val("");
		        }else{
					msgShow("请求超时，请稍后重试");
					$("#pass").val("");
		        }
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				msgShow("请求超时，请稍后重试");
				$("#pass").val("");
			},
			timeout : 32000
		});
	}
}


