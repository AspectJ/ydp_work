var page = 1;
var pagesize = 10;
var pagingsize = 3;
var currentpage = 1;

$(function() {
	loadData(1);
	
    $("#addUser").on("click", function(){
    	var page = "manager/userInfoAdd.html";
		window.parent.$("#mainFrame").attr("src",page);
	});
    
    $("#roleInfo").on("click",function(){
    	var page = "manager/roleInfoList.html";
		window.parent.$("#mainFrame").attr("src",page);
    });
    
    $("#menuInfo").on("click",function(){
    	var page = "manager/menuInfoList.html";
		window.parent.$("#mainFrame").attr("src",page);
    });
	
});

function loadData(side){
	page = pageUpDown(side);
	var param = {};
	param.page = page;
	param.pagesize = pagesize;
	param.search = encodeURIComponent($(".filter_input").val());
	ajaxRequest("user/getUserList", "GET", false, param, 
			function(data) {
			var result = data.result;
			switch (result) {
				case 1000:
					var dataArr = [];
					dataList = data.data;
					var total = data.total;
					var totalpage = parseInt(total % pagesize == 0 ? total / pagesize : total / pagesize + 1);
					if(dataList != null && dataList.length > 0){
						for (var i=0; i<dataList.length; i++) {
							var userinfo = dataList[i];
							var dataJson = {};
							dataJson.username =  userinfo.username;
							dataJson.nickname = userinfo.nickname;
							dataJson.mobile = userinfo.mobile;
//							dataJson.wechart = userinfo.wechart;
							dataJson.email = userinfo.email;
							dataJson.status_name = userinfo.status_name;
							dataJson.rolename = userinfo.rolename;
							dataJson.createtime = userinfo.createtime;
							if(usertheaternum == "0"){
								$("#ssTheater").show();
								dataJson.theatername = userinfo.theatername;
							}
							var opreator = "";
							if(rolePer.indexOf("userStatus")>-1){
								if(userinfo.status == "0"){//启用状态、可禁用
									opreator += "<i class='disable'>禁用</i>";
    							}else if(userinfo.status == "1"){//禁用状态、可启用
    								opreator += "<i class='enable'>启用</i>";
    							}
							}
							opreator += '<i class="reset">重置密码</i><i class="edit">修改</i>';
							dataJson.opreator = opreator;
							dataArr.push(dataJson);
						}
						$(".data-tab tr").not(":first").remove();
						pushJsonData(".data-tab table", dataArr);
						var pagingstr = loadPaging(totalpage, page, pagingsize, "loadData");
						$(".data-tab-ul").html(pagingstr);
					}
					break;
				case 1107 :
					$(".data-tab tr").not(":first").remove();
					errorTip("提示","查询用户列表失败，请稍后重试");
					break;
				case 1108 :
					$(".data-tab tr").not(":first").remove();
					errorTip("提示","用户列表信息不存在");
					break;
				case 9997 :
					$(".data-tab tr").not(":first").remove();
					errorTip("提示",data.msg);
					break;
				default:
					$(".data-tab tr").not(":first").remove();
					errorTip("提示","请求超时，请稍后重试");
					break;
			}
		}
		, null, function(){loading();},
		function(){
			loadover(); // 加载完
        	//禁用
			$(".disable").on("click",function(){
				var userid = dataList[$(this).parents("tr").attr("index")].userid;
				var username = dataList[$(this).parents("tr").attr("index")].username;
				var info = "确定设置用户["+username+"]为禁用状态？";
				confirmshowMsg(info,1,userid,1);
			});
			$(".enable").on("click",function(){
				var userid = dataList[$(this).parents("tr").attr("index")].userid;
				var username = dataList[$(this).parents("tr").attr("index")].username;
				var info = "确定设置用户["+username+"]为启用状态？";
				confirmshowMsg(info,1,userid,0);
				//userStatus(userid,0);
			});
			$(".reset").on("click",function(){
				var userid = dataList[$(this).parents("tr").attr("index")].userid;
				var username = dataList[$(this).parents("tr").attr("index")].username;
				var info = "确定重置用户["+username+"]密码？";
				confirmshowMsg(info,2,userid,username);
				
			});
        	$(".edit").on("click", function(){
        		var userid = dataList[$(this).parents("tr").attr("index")].userid;
        		updateUserInfo(userid);
        	});
        	
        	currentpage = $(".data-tab-ul li[class='cur']").text();
        	if(currentpage == "" || currentpage == undefined){
        		currentpage = 1;
        	}
        }
		
	);
}


function resetPass(userid,username){
	var url = service_url + "rest/user/resetPass";
	$.post( url,{userid : userid,pass : username },function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	loadData(currentpage);
        }else if(result == 1105){
        	errorTip("提示","密码重置失败，请稍后重试");
        	return;
        }else{
        	errorTip("提示","请求超时，请稍后重试");
        	return;
        }
	});
}

function userStatus(userid,status){
	var curStatus = "禁用";
	if(status == 0){
		curStatus = "启用";
	}
	var info = "确定"+curStatus+"该用户？";
	confirmshowMsg(info,1,userid,status);
}

function updateStatus(userid,status){
	var url = service_url + "rest/user/userStatus";
	$.post( url,{userid : userid,status : status },function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	loadData(currentpage);
        }else if(result == 1105){
        	errorTip("提示","用户状态更新失败，请稍后重试");
        	return;
        }else if(result == 9997){
        	errorTip("提示",retjson.msg);
        	return;
        }else{
        	errorTip("提示","请求超时，请稍后重试");
        	return;
        }
	});
}

function updateUserInfo(userid){
	var page = "manager/userInfoUpdate.html?userid="+userid;
	window.parent.$("#mainFrame").attr("src",page);
}

function deleteUser(userid){
	var url = service_url + "rest/user/deleteUser";
	if(window.confirm('你确定要删除该用户吗？')){
		$.post( url,{userid : userid },function(data) {
			var retjson=$.parseJSON(data);
			var result = parseInt(retjson.result);
	        if(result == 1000){
	        	loadData(currentpage);
	        }else if(result == 1106){
	        	errorTip("提示","删除用户失败，请稍后重试");
	        	return;
	        }else{
	        	errorTip("提示","请求超时，请稍后重试");
	        	return;
	        }
		});
    }else{
       return false;
    }
}
