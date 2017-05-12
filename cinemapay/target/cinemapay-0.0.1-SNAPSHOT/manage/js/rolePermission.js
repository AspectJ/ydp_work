function getMenuList(roleid){
	//var url = service_url + "rest/menu/assignMenu";
	var url = service_url + "rest/menu/assignMenuBySelf";
	$.post( url,{},function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	var resultData = retjson.data;
        	if(resultData != null && resultData.length > 0){
        		var tableContent = "<table>"+"<tr><td>&nbsp;</td></tr>";
        		for (var i=0; i<resultData.length; i++) {
        			var menuid = resultData[i].menuid;
    				var menuname = resultData[i].menuname;
    				var show = resultData[i].show;
    				var row = i + 1; 
    				var content = "<tr><td><input type='checkbox' name='menuid' id='id_"+menuid+"' value='"+menuid+"' parentid='0' onclick='chooseSonId("+menuid+");'/>"+menuname+"</td></tr>";
    				if(show != null && show.length >0){//存在子功能
    					var length = show.length +1;
    					for(var j=1;j<length;j++){
    						var jj = j -1;
    						var son_menuid = show[jj].menuid;
    	    				var son_menuname = show[jj].menuname;
    	    				if(j == 1){//第一行加行
    	    					content += "<tr>";
    	    				}
    	    				if(j>1 && j%3==1){
    	    					content += "<tr>";
    	    				}
    	    				content += "<td><input type='checkbox' name='menuid' id='id_"+son_menuid+"' value='"+son_menuid+"' parentid='"+menuid+"' onclick='chooseParentId("+son_menuid+","+menuid+");'/>"+son_menuname+"</td>";
    	    				if(j>1 && j < length-1 && j%3==0){
    	    					content += "</tr>";
    	    				}
    	    				if(j == length - 1){//最后一个
    	    					content += "</tr><tr><td>&nbsp;</td></tr>";
    	    				}
    					}
    				}else{
    					content += "<tr><td>&nbsp;</td></tr>";
    				}
    				tableContent += content;
        		}
        		tableContent += "</table>";
        		$("#roleperResult").html(tableContent);
        		getChooseMenu(roleid);//设置已选择的菜单权限
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


function getChooseMenu(roleid_temp){
	var roleid = $("#roleidper").val();
	if(roleid == "" || roleid == undefined){
		roleid = roleid_temp;
	}
	var url = service_url + "rest/menu/getChooseMenu";
	$.post( url,{roleid:roleid},function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	var resultData = retjson.data;
        	if(resultData != null && resultData.length > 0){
        		for (var i=0; i<resultData.length; i++) {
        			var menuid = resultData[i].menuid;
        			$("#id_"+menuid).prop("checked",true);
        		}
        	}
        }else{
        	errorTip("提示","请求超时，请稍后重试");
        	return;
        }
	});
}

function chooseSonId(menuid){
	if($("#id_"+menuid).prop("checked") == false){
		$("input[parentid="+menuid+"]").prop("checked",false);
	}
}

function chooseParentId(sonMenuid,menuid){
	if($("#id_"+sonMenuid).prop("checked") == true){
		$("#id_"+menuid).prop("checked",true);
	}
}

function save(){
	$("#per").attr("class","commit-temp");
	var roleid = $("#roleidper").val();
	var check = document.getElementsByName("menuid");
	var menuids = "";
	if(check.length == 0){
		$("#per").attr("class","commit");
		errorTip("提示","没有分配任何权限");return;
	}else{
		var count=0;
		for(var i=0;i<check.length; i++){              
			if(check[i].checked){
				menuids = menuids + check[i].value+",";
				count++;
			}                                
		}
		if(count==0){
			$("#per").attr("class","commit");
			errorTip("提示","没有分配任何权限");return;
		}else{
			var url= service_url + "rest/menu/assignRoleMenu";
			$.post( url,{menuids : menuids,roleid : roleid},function(data) {
				var retjson=$.parseJSON(data);
				var result = parseInt(retjson.result);
		        if(result == 1000){
		        	$("#per").attr("class","commit");
		        	$("#roleper").fadeOut(300, "swing");
		        	loadData(currentpage);
		        }else if(result == 9997){
		        	$("#per").attr("class","commit");
		        	errorTip("提示",retjson.msg);
		        	return;
		        }else{
		        	$("#per").attr("class","commit");
		        	errorTip("提示","权限分配失败，请稍后重试");
		        	return;
		        }
			});
		}
	}
}

