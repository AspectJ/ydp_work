//获取影院ID下拉框中的数据（全部影院ID）
$(function() {
	$.ajax({
		url: requestUrl + "rest/adminInfo/selCinemaInfo",
		type: "POST",
		async: true,
		dataType: "json",
		jsonp: "jsonpCallback",
		success: function(data) {
			var resultData = data.data;
			$("#cinema_id option").remove();
			var content = "<option value='0' selected='selected'>"+"请选择"+"</option>";
			$("#cinema_id").append(content);
			if(resultData != null && resultData.length > 0) {
				for(var i = 0 ; i < resultData.length; i++) {
					var cinema_id = resultData[i].cinema_id;
					var content = "<option value='"+cinema_id+"'>"+cinema_id+"</option>";
					$("#cinema_id").append(content);
				}
			}
		}
	});
});

//获取信息显示在页面可进行修改
function getAdminInfoShow(admin_id, type) {
	var url = requestUrl + "rest/adminInfo/selSingleAdmin";
	$.ajax({
		url: url,
		type: "POST",
		dataType: "json",
		data: {
			admin_id : admin_id
		},
		jsonp: "jsonpCallback",
		success: function(data) {
			var result = parseInt(data.result);
			switch(result) {
				case 1000:
					var resultData = data.data;
					if(type == "show") {
						showInfo(resultData);
					}else {
						echo(resultData);
					}
					break;
				default:
					break;
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		},
		timeout : 32000
	});
}

//数据回显
function echo(resultData) {
	$("#admin_name").val(resultData.adminname);
	$("#admin_nickname").val(resultData.nickname);
	$("#cinema_name").html(resultData.cinema_name);
	$("#cinema_name").attr("ciname_id", resultData.cinemaid);
	//判断用户状态是否可用
	if(resultData.state == 0) {
		$("#admin_state").val("0");
	}else {
		$("#admin_state").val("1");
	}
	if(resultData.audit == 1){
		$("#checkbox_audit").attr("checked",true);		
	}else if(resultData.audit =="0"){
		$("#checkbox_audit").attr("checked",false);
	}
}

//更改管理员信息
function updateAdminInfo() {
	var admin_name = $("#admin_name").val();
	var admin_nickname = $("#admin_nickname").val();
	var cinema_id = $("#cinema_name").attr("ciname_id");
	var admin_state = parseInt($("#admin_state").val());
	var admin_id = $("#admin_id").val();
	var audit = $('#checkbox_audit').is(':checked');
	
	var params = {};
	params.admin_name = admin_name;
	params.admin_nickname = admin_nickname;
	params.cinema_id = cinema_id;
	params.admin_state = admin_state;
	params.admin_id = admin_id;
	params.audit = audit? 1:0;
	
	if(admin_name == "" || admin_nickname == "" || cinema_id == "0") {
		alert("信息请填写完整！"); return;
	}
	
	$.ajax({
		url: requestUrl + "rest/adminInfo/updateAdminInfo",
		type: "POST",
		async: true,
		dataType: "json",
		data: params,
		jsonp: "jsonpCallback",
		success: function(data) {
			var result = parseInt(data.result);
			switch(result) {
				case 1000:
					var login_adminId = sessionStorage.getItem("adminid");
					if(login_adminId == admin_id && admin_state == 1) {
						alert("修改成功，但您已被禁用！");
						var page = "../login.html";
						window.parent.location.href = page;
					}else {
						alert("修改成功！");
						var page = "auser/adminInfoList.html";
						window.parent.$("#mainFrame").attr("src", page);
					}
					break;
				default:
					alert("更改失败，请重试！");
					break;
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {},
		timeout : 32000
	});
}

//查看管理员信息（查看按钮）
function showInfo(resultData) {
	$("#admin_name").html(resultData.adminname);
	$("#admin_nickname").html(resultData.nickname);
	$("#cinema_name").html(resultData.name);
	$("#admin_create_time").html(resultData.create_time);
	$("#admin_lastlogin_time").html(resultData.last_login_time);
	
	var state = "";
	if(resultData.state == 1) {
		state = "可用";
	}else {
		state = "禁用";
	}
	$("#admin_state").html(state);
	
	if(resultData.audit==1){
		$("#checkbox_audit").attr("checked",true);		
	}else if(resultData.audit =="0"){
		$("#checkbox_audit").attr("checked",false);
	}
}

function toUpdateAdminInfo(){
	var admin_id = $("#admin_id").val();
	var page = "auser/adminInfoUpdate.html?adminid="+admin_id;
	window.parent.$("#mainFrame").attr("src",page);
}
