$(function(){
	showUserInfo();
	
	$(".revisability>a").on("click", function(){
		var $this = $(this);
		var field = $(this).attr("name");
		var field_value = $("#" + field).text();
		
		if(!$this.hasClass("sure_update")){
			if(field == "mobile"){
				$("#" + field).html("<input class='revisability_text' maxlength='11'>");				
			}else{
				$("#" + field).html("<input class='revisability_text'>");
			}
			$($("#" + field).find(".revisability_text")).focus();
			$($("#" + field).find(".revisability_text")).val(field_value);
			$($("#" + field).find(".revisability_text")).on("blur", function(){
				if($(this).val() == "" || field_value == $(this).val()){
					$this.html("修改");
					$this.removeClass("sure_update");
					$("#" + field).html(field_value);
				}else{
					$this.focus();
				}
			});
			$this.html("确认");
			$this.addClass("sure_update");
		}else{
			var sendValue = $($("#" + field).find(".revisability_text")).val();
			if(field == "mobile"){
				if(checkMobile(sendValue) ==false){
					return;
				}
			}else if(field == "email"){
				if(checkEmail(sendValue)==false){
					return;
				}
			}
			operateTip("提示", "您确认修改您的"+ $(this).parents("tr").find(".lab").text() +"信息？", function(){
				var param = {};
				param[field] = $($("#" + field).find(".revisability_text")).val();
				ajaxRequest("user/updateUserMessage", "GET", true, param,
					function(data){
						var result = data.result;
						switch (result) {
							case 1000: errorTip("操作成功", "个人信息修改成功!"); break;
							default : errorTip( "加载错误", "数据加载错误：【"+ data.msg +"】" ); break;
						}
					}, null, 
					function(){loading();},
					function(){
						loadover();
						$this.html("修改");
						$this.removeClass("sure_update");
						showUserInfo();
					}
				);
			});
		}
	});
});

//验证手机号码格式是否正确
function checkMobile(mobile){
    if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(mobile))){ 
        errorTip("提示","手机号格式不正确");
    	return false;
    }
    return true;
}

//验证电子邮箱格式是否正确
function checkEmail(email){
    if(!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(email))){ 
    	errorTip("提示","邮箱格式不正确");
    	return false;
    }
    return true;
}


function showUserInfo(){
	var url = service_url + "rest/user/getUser";
	$.post( url,{},function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	var resultData = retjson.data;
        	$("#username").html(resultData.username);
        	$("#nickname").html(resultData.nickname);
        	$("#mobile").html(resultData.mobile);
        	$("#email").html(resultData.email);
        	$("#wechart").html(resultData.wechart);
        	$("#status").html(resultData.status_name);
        	$("#theatername").html(resultData.theatername);
        	$("#rolename").html(resultData.rolename);
        	$("#createtime").html(resultData.createtime);
        	$("#logintime").html(resultData.lastlogintime);
        }else if(result == 1108){
        	errorTip("提示","用户信息不存在");
        	return;
        }else if(result == 1107){
        	errorTip("提示","查询用户信息失败");
        	return;
        }else{
        	errorTip("提示","请求超时，请稍后重试");
        	return;
        }
	});
}