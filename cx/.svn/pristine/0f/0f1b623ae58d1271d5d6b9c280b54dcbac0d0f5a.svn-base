//获取影院ID下拉框中的数据（全部影院ID）
function showCinemaInfo() {
	$.ajax({
		url: requestUrl + "rest/adminInfo/selCinemaInfo",
		type: "POST",
		async: true,
		dataType: "json",
		jsonp: "jsonpCallback",
		success: function(data) {
			var resultData = data.data;
			var content  = "<select id='select'>";
				content += 		"<option value='0' selected='selected'>"+"请选择"+"</option>";
				content += "</select>";
			$("#cinema_name").append(content);
			if(resultData != null && resultData.length > 0) {
				for(var i = 0 ; i < resultData.length; i++) {
					var cinema_id = resultData[i].cinema_id;
					var cinema_name = resultData[i].cinema_name;
					var content = "<option value='"+cinema_id+"'>"+cinema_name+"</option>";
					$("#select").append(content);
				}
			}
		}
	});
}

$(function() {
	var admin_id = sessionStorage.getItem("adminid");
	$.ajax({
		url: requestUrl + "rest/adminInfo/selSingleAdmin",
		type: "POST",
		data: {
			admin_id: admin_id
		},
		async: true,
		dataType: "json",
		jsonp: "jsonpCallback",
		success: function(data) {
			var resultData = data.data;
			//判断当前管理员是否是超级管理员（如果是则院线名称显示下拉框，否则显示普通文本）
			if(typeof(resultData.name) != "undefined") {
				var content = "<span id='cinemaid' value="+resultData.cinemaid+">"+resultData.name+"</span>";
				$("#cinema_name").html(content);
			}else {
				showCinemaInfo();
			}
			
		}
	});
});

//添加管理员
function addAdminInfo() {
	var admin_name = $("#admin_name").val();
	var reg  = /^\w{3,10}$/;  //只能是字母、数字、下划线（3-10位）
	if(!reg.test(admin_name)) {
		alert("用户名格式不对！");
		window.location.reload();
		return;
	}
	var admin_nickname = $("#admin_nickname").val();
	var admin_pwd = $("#admin_pwd").val();
	var cinema_id = $("#cinema_name #select").val();
	var audit = $('#checkbox_audit').is(':checked');
	
	//判断影院名称处是下拉框还是普通文本
	if(typeof(cinema_id) == "undefined" || cinema_id == null) {
		cinema_id = $("#cinema_name #cinemaid").attr("value");
	}
	
	var params = {};
	params.admin_name = admin_name;
	params.admin_nickname = admin_nickname;
	params.admin_pwd = admin_pwd;
	params.cinema_id = cinema_id;
	params.audit = audit? 1:0;
	
	$.ajax({
		url: requestUrl + "rest/adminInfo/addAdminInfo",
		type: "POST",
		dataType: "json",
		data: params,
		jsonp: "jsonpCallback",
		success: function(data) {
			var result = parseInt(data.result);
			switch(result) {
				case 1000:
					alert("管理员添加成功");
					var page = "auser/adminInfoList.html";
					window.parent.$("#mainFrame").attr("src",page);
					break;
				case 1998: alert("信息请填写完整！"); break;
				case 1999: alert("对不起，添加管理员失败！"); break;
				case 1008: alert("对不起，管理员用户名已存在，请更改用户名！"); break;
				default: break;
			}
		}
	});
};

