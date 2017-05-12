function commit(type,rolenameInput,roleid){
	var rolename = $("#"+rolenameInput).val();
	if(rolename == ""){
		errorTip("提示","请填写角色名称");
		if(type == "add"){
			$("#add").attr("class","commit");
		}else{
			$("#update").attr("class","commit");
		}
		return;
	}else{
		var url = service_url + "rest/role/checkRepeat";
		$.post( url,{rolename : encodeURIComponent(rolename),roleid : roleid },function(data) {
			var retjson=$.parseJSON(data);
			var result = parseInt(retjson.result);
	        if(result == 1000){
	        	var count = retjson.total;
	    		if(count > 0){
	    			errorTip("提示","该角色名称已存在");
	    			if(type == "add"){
	    				$("#add").attr("class","commit");
	    			}else{
	    				$("#update").attr("class","commit");
	    			}
	    			return;
	    		}else{
	    			if(type == "add"){
	    				addRoleInfo();
	    			}else{
	    				updateRole();
	    			}
	    		}
	        }else{
	        	errorTip("提示","请求超时，请稍后重试");
	        	if(type == "add"){
    				$("#add").attr("class","commit");
    			}else{
    				$("#update").attr("class","commit");
    			}
	        	return;
	        }
		});
	}
}

//提交表单
function addRoleInfo(){
	var rolename = $("#rolename").val();
	var roletype = $("#roletype").val();
	var theaternum = $("#theaternum").val();
	var theatername = $("#theaternum").find("option:selected").text(); 
	if(roletype == ""){
		errorTip("提示","请选择角色类型");
		$("#add").attr("class","commit");
		return;
	}else if(theaternum == "-1"){
		if(roletype == "100"){
			errorTip("提示","请选择影投信息");
		}else{
			errorTip("提示","请选择影院信息");
		}
		$("#add").attr("class","commit");
		return;
	}
	var url= service_url + "rest/role/addRole";
	$.post( url,{rolename : encodeURIComponent(rolename),roletype : roletype,theaternum : theaternum,theatername:encodeURIComponent(theatername) },function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	$("#add").attr("class","commit");
        	$("#addInfo").fadeOut(300, "swing");
        	loadData(currentpage);
        }else if(result == 1201){
        	$("#add").attr("class","commit");
        	errorTip("提示","角色添加失败，请稍后重试");
        	return;
        }else if(result == 1207){
        	$("#add").attr("class","commit");
        	$("#addInfo").fadeOut(300, "swing");
        	loadData(currentpage);
        }else if(result == 9997){
        	$("#add").attr("class","commit");
        	errorTip("提示",retjson.msg);
        	return;
        }else{
        	$("#add").attr("class","commit");
        	errorTip("提示","请求超时，请稍后重试");
        	return;
        }
	});
	
}


//提交表单
function updateRole(){
	var rolename = encodeURIComponent($("#rolenameupdate").val());
	var roleid = $("#roleid").val();
	var url= service_url + "rest/role/updateRole";
	$.post( url,{rolename : rolename,roleid : roleid },function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	$("#update").attr("class","commit");
        	$("#updateInfo").fadeOut(300, "swing");
        	loadData(currentpage);
        }else if(result == 1202){
        	$("#update").attr("class","commit");
        	errorTip("提示","修改角色失败，请稍后重试");return;
        }else if(result == 1207){
        	$("#update").attr("class","commit");
        	$("#updateInfo").fadeOut(300, "swing");
        	loadData(currentpage);
        }else if(result == 9997){
        	$("#update").attr("class","commit");
        	errorTip("提示",retjson.msg);
        	return;
        }else{
        	$("#update").attr("class","commit");
        	errorTip("提示","请求超时，请稍后重试");
        	return;
        }
	});
}

function checkRepeatRole(roleid,rolenameInput){
	var rolename = $("#"+rolenameInput).val();
	if(rolename == ""){
		return false;
	}else{
		var url = service_url + "rest/role/checkRepeat";
		$.post( url,{rolename : encodeURIComponent(rolename),roleid : roleid },function(data) {
			var retjson=$.parseJSON(data);
			var result = parseInt(retjson.result);
	        if(result == 1000){
	        	var count = retjson.total;
	    		if(count > 0){
	    			errorTip("提示","该角色名称已存在");
	    			return false;
	    		}else{
	    			return true;
	    		}
	        }else{
	        	errorTip("提示","请求超时，请稍后重试");
	        	return false;
	        }
		});
	}
}

