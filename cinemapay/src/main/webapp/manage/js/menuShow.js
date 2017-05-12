function checkNum(){
	var sortno = $("#sortno").val();
	var reg = /^\d+$/;
	if(sortno == ""){
		return true;
	}else{
		if(reg.test(sortno)){
			return true;
		}else{
			$("#sortno").val("");
			return false;
		}
	}
}

function getMenuSelect(partentid,parentidinput){
	var url= service_url + "rest/menu/getMenuInfo";
	$.post( url,{partentid : partentid},function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	var resultData = retjson.data;
        	$("#"+parentidinput).empty();
			if(resultData != null && resultData.length > 0){
				var select = 0;
				for (var i=0; i<resultData.length; i++) {
					var menuid = resultData[i].menuid;
					var menuname = resultData[i].menuname;
					if(menuid == partentid){
						select = 1;
						$("#"+parentidinput).prepend("<option value='"+menuid+"' selected>"+menuname+"</option>");
					}else{
						$("#"+parentidinput).prepend("<option value='"+menuid+"'>"+menuname+"</option>");
					}
				}
				if(select == 0){
					$("#"+parentidinput+" option:first").prop("selected", 'selected'); 
				}
			}else{
				errorTip("提示","请先添加页面权限");
				return;
			}
        }else{
        	errorTip("提示","请求超时，请稍后重试");
        	return;
        }
	});
}


function showMenuSon(){
	var menuid = $("#showmenuid").val();
	var search = encodeURIComponent($("#search").val());
	var url = service_url + "rest/menu/getMenuSon";
	$.post( url,{menuid : menuid,search:search},function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
		$("#result tr:gt(0)").remove();
		if(result == 1000){
        	var resultData = retjson.data;
			if(resultData != null && resultData.length > 0){
				for (var i=0; i<resultData.length; i++) {
					var menuid = resultData[i].menuid;
					var menuname = resultData[i].menuname;
					var partentid = resultData[i].partentid;
					var requesturl = resultData[i].requesturl;
					var sortno = resultData[i].sortno;
					var menutype = resultData[i].menutype;
					var row = i + 1;
					var content = "<tr id='row_"+row+"'><input type='hidden' name='menuid' id='id_"+menuid+"' value='"+menuid+"'/>";
					content += "<td>"+menuname+"</td><td>"+requesturl+"</td>";
					content += "<td>"+sortno+"</td>";
					content += "<td>";
					if(rolePer.indexOf("updateMenu")>-1){
						content += "<i class='edit' onclick='updateMenuInfo("+menuid+");'>修改</i>";
					}
					if(rolePer.indexOf("deleteMenu")>-1){
						content += "<i class='delete' onclick='delMenuInfo("+menuid+",\""+menuname+"\");'>删除</i>";
					}
					content += "</td><tr>";
					if(i == 0){
						$("#row_title").after(content);
					}else{
						$("#row_"+i).after(content);
					}
				}
			}
        }else if(result == 1204){
        	errorTip("提示","查询权限列表失败，请稍后重试");
        	return;
        }else if(result == 1204){
        	errorTip("提示","权限列表信息不存在");
        	return;
        }else{
        	errorTip("提示","请求超时，请稍后重试");
        	return;
        }
	});
}


function showMenuSonInfo(menuid,menuname){
	var url = service_url + "rest/menu/getMenuSon";
	$.post( url,{menuid : menuid},function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	var resultData = retjson.data;
        	sonCount = retjson.total;
			if(sonCount == 0){
				errorTip("提示","暂未添加子功能权限");return;
			}else{
				var page = "manager/menuSonShow.html?menuid="+menuid;
				window.parent.$("#mainFrame").attr("src",page);
				window.parent.$("#mainFrame").attr("param",menuname);
			}
        }else{
        	var page = "manager/menuSonShow.html?menuid="+menuid;
        	window.parent.$("#mainFrame").attr("src",page);
        	window.parent.$("#mainFrame").attr("param",menuname);
        }
	});
	
}

function updateMenuInfo(menuid){
	$("#updateInfo").fadeIn(200, "swing");
	$(".cancel").on("click", function(){ 
		$("#updateInfo").fadeOut(300, "swing");
	});
	$("#update").on("click",function(){
		var className = $("#update").attr("class");
		if(className == "commit"){
			$("#update").attr("class","commit-temp");
			updateMenu();
		}
	});
	$("#update_menutype").change(function(){
		var menutype = $("#update_menutype").val();
		if(menutype == "0"){//页面
			$("#update_p_partentid").hide();
		}else if(menutype == "1"){//功能权限
			$("#update_p_partentid").show();
			getMenuSelect(0,"update_partentid");
		}
	});
	
	$("#update_sortno").blur(function(){
		checkNum();
	});
	showMenuInfo(menuid);
}

function delMenuInfo(menuid,menuname){
	var sonCount = 0;
	var url = service_url + "rest/menu/getMenuSon";
	$.post( url,{menuid : menuid},function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	var resultData = retjson.data;
        	sonCount = retjson.total;
			if(sonCount == 0){
				var info = "确定删除["+menuname+"]权限？";
				confirmshowMsg(info,5,menuid,0);
			}else{
				var info = "["+menuname+"]权限下有子功能，确定删除？";
				confirmshowMsg(info,5,menuid,0);
			}
        }else if(result == 9997){
        	errorTip("提示",retjson.msg);
        	return;
        }else{
        	errorTip("提示","请求超时，请稍后重试");
        	return;
        }
	});
	
}


function delMenu(menuid){
	var url = service_url + "rest/menu/deleteMenu";
	$.post( url,{menuid : menuid},function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	var showmenuid = $("#showmenuid").val();
        	if(showmenuid != undefined){
        		showMenuSon();
        	}else{
        		loadData(1);
        	}
        }else{
        	errorTip("提示","请求超时，请稍后重试");
        	return;
        }
	});
}


function showMenuInfo(menuid){
	var url = service_url + "rest/menu/getMenu";
	$.post( url,{menuid : menuid},function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	var resultData = retjson.data;
			var menuid = resultData.menuid;
			var menuname = resultData.menuname;
			var partentid = resultData.partentid;
			var requesturl = resultData.requesturl;
			var sortno = resultData.sortno;
			var menutype = resultData.menutype;
			$("#update_menutype").val(menutype);
			if(menutype == 1){
				$("#update_p_partentid").show();
				getMenuSelect(partentid,"update_partentid");//加载下拉框
				$("#update_partentid").val(partentid);
			}
			$("#menuid").val(menuid);
			$("#update_menuname").val(menuname);
			
			$("#update_requesturl").val(requesturl);
			$("#update_sortno").val(sortno);
        }else{
        	errorTip("提示","请求超时，请稍后重试");
        	return;
        }
	});
}


//提交表单
function addMenuInfo(){
	var menuname = encodeURIComponent($("#menuname").val());
	var menutype = encodeURIComponent($("#menutype").val());
	var partentid = encodeURIComponent($("#partentid").val());
	var requesturl = encodeURIComponent($("#requesturl").val());
	var sortno = encodeURIComponent($("#sortno").val());
	var url= service_url + "rest/menu/addMenu";
	if(menuname == ""){
		$("#add").attr("class","commit");
		errorTip("提示","请填写权限名称");
		return;
	}else if(menutype == ""){
		$("#add").attr("class","commit");
		errorTip("提示","请选择权限类型");
		return;
	}else if(menutype == "1"){
		if(partentid == "" || partentid == "null"){
			$("#add").attr("class","commit");
			errorTip("提示","请选择上级权限");
			return;
		}
	}else if(requesturl == ""){
		$("#add").attr("class","commit");
		errorTip("提示","请填写请求地址");
		return;
	}
	$.post( url,{menuname : menuname,
				 menutype : menutype,
				 partentid : partentid,
				 requesturl : requesturl,
				 sortno : sortno },function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	$("#add").attr("class","commit");
        	$("#addInfo").fadeOut(300, "swing");
        	loadData(1);
        }else if(result == 1201){
        	$("#add").attr("class","commit");
        	errorTip("提示","权限添加失败");return;
        }else if(result == 1207){
        	$("#add").attr("class","commit");
        	return;
        }else if(result == 9997){
        	$("#add").attr("class","commit");
        	errorTip("提示",retjson.msg);
        	return;
        }else{
        	$("#add").attr("class","commit");
        	errorTip("提示","操作异常");
        	return;
        }
	});
	
}

function updateMenu(){
	var menuid = $("#menuid").val();
	var menuname = encodeURIComponent($("#update_menuname").val());
	var partentid = encodeURIComponent($("#update_partentid").val());
	var requesturl = encodeURIComponent($("#update_requesturl").val());
	var sortno = encodeURIComponent($("#update_sortno").val());
	var menutype = $("#update_menutype").val();
	var url= service_url + "rest/menu/updateMenu";
	if(menuname == ""){
		$("#update").attr("class","commit");
		errorTip("提示","请填写权限名称");
		return;
	}else if(menutype == "1"){
		if(partentid == "" || partentid == "null"){
			$("#update").attr("class","commit");
			errorTip("提示","请选择上级权限");
			return;
		}
	}else if(requesturl == ""){
		$("#update").attr("class","commit");
		errorTip("提示","请填写请求地址");
		return;
	}
	$.post( url,{menuid : menuid,
				 menuname : menuname,
				 partentid : partentid,
				 requesturl : requesturl,
				 sortno : sortno},function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	$("#update").attr("class","commit");
        	$("#updateInfo").fadeOut(300, "swing");
        	var showmenuid = $("#showmenuid").val();
        	if(showmenuid != undefined){
        		showMenuSon();
        	}else{
        		loadData(1);
        	}
        }else if(result == 1202){
        	$("#update").attr("class","commit");
        	errorTip("提示","权限修改失败");return;
        }else if(result == 1207){
        	$("#update").attr("class","commit");
        	return;
        }else if(result == 9997){
        	$("#update").attr("class","commit");
        	errorTip("提示",result.msg);
        	return;
        }else{
        	$("#update").attr("class","commit");
        	errorTip("提示","请求超时，请稍后重试");
        	return;
        }
	});
}

