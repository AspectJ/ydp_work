var html = "<label>角色<span class='must'>*</span></label><select id='roleid'><option selected>请选择</option></select>";
var htmlType = "<label>用户类别<span class='must'>*</span></label><select id='type'><option selected value='0'>系统用户</option><option value='1'>影院用户</option><option value='2'>影投用户</option></select>";
var htmlArea = "<label>所属地区<span class='must'>*</span></label><select id='areaid'></select>";
var htmlTheater = "<label>所属影院<span class='must'>*</span></label><select id='theaternum'></select>";
var htmlYt = "<label>所属影投<span class='must'>*</span></label><select id='yingtou'></select>";

$(function(){
	var id = $("#userid").val();
	if(id == undefined){
		if(userroletype == "3"){//
			$("#show").html(htmlType+html);
			getRole(usertheaternum,0);
		}else{
			$("#show").html(html);
			getRole(usertheaternum,0);
		}
	}
	
	$("#username").blur(function(){
		checkRepeat();
	});
	
	$("#show").on('change','#type',function(){
		var type = $("#type").val();
		if(type == "0"){//系统用户
			$("#show").html(htmlType+html);
			$("#type").find("option[value=0]").attr("selected",true);
			getRole(usertheaternum,0);
		}else if(type == "1"){//影院用户
			$("#show").html(htmlType+htmlArea+htmlTheater+html);
			$("#type").find("option[value=1]").attr("selected",true);
			getArea();
		}else if(type == "2"){//影投用户
			$("#show").html(htmlType+htmlYt+html);
			$("#type").find("option[value=2]").attr("selected",true);
			getYt();
		}
	});
	
	$("#show").on('change','#areaid',function(){
		getTheater();
	});
	
	$("#show").on('change','#theaternum',function(){
		getRole(0,0);
	});
	
	$(".cancelBn").on("click",function(){
		window.location.href = "userInfoList.html";
	});
});

function checkRepeat(){
	var userid = $("#userid").val();
	var username = $("#username").val();
	//var reg = /(^[a-zA-Z][a-zA-Z0-9_]{5,15}$)/;//必填，不能为空，长度是6-16位，可由字母、数字或下划线组合，首位必须是字母。
	var reg = /(^[a-zA-Z0-9_]{5,15}$)/;//必填，不能为空，长度是6-16位，可由字母、数字或下划线组合。
	if(reg.test(username)){
		var url = service_url + "rest/user/checkUserNameRepeat";
		$.post( url,{username : encodeURIComponent(username),userid : userid },function(data) {
			var retjson=$.parseJSON(data);
			var result = parseInt(retjson.result);
	        if(result == 1000){
	        	var count = retjson.total;
	    		if(count > 0){
	    			errorTip("提示","登录账号已被使用");
	    			$("#username").val("");
	    			return false;
	    		}else{
	    			return true;
	    		}
	        }else{
	        	return true;
	        }
		});
	}else{
		errorTip("提示","账号为6-16位，可由字母、数字或下划线组合");
		return false;
	}
}

function checkNickName(){
	var nickname = $("#nickname").val();
	var reg = new RegExp("^[\u4e00-\u9fa5 a-zA-Z0-9_]+$");//大小写、中文、中间空格
	if(reg.test(nickname) && nickname.length >= 2 && nickname.length <= 20){
		return true;
	}else{
		errorTip("提示","昵称为2-20个字符，中英文数字均可");
		return false;
	}
}

//验证手机号码格式是否正确
function checkMobile(){
	var mobile = $("#mobile").val();
	//电话号码格式   && !(/^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(mobile))
    if(!(/^1[3|4|5|8][0-9]\d{8}$/.test(mobile))){ 
        errorTip("提示","手机号格式不正确");
    	return false;
    }
    return true;
}

function checkWechart(){
	var wechart = $("#wechart").val();
	var reg = /^[a-zA-Z\d_]{5,}$/;
	if(wechart != "" && !reg.test(wechart)){ 
        errorTip("提示","微信号格式不正确");
    	return false;
    }
    return true;
}

//验证电子邮箱格式是否正确
function checkEmail(){
	var email = $("#email").val();
    if(!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(email))){ 
    	errorTip("提示","邮箱格式不正确");
    	return false;
    }
    return true;
}

function getArea(){
	var url= service_url + "rest/cinema/areaList";
	$.post( url,{},function(data) {
		var retjson = data;
		var result = parseInt(retjson.result);
        if(result == 1000){
        	var resultData = retjson.data;
			if(resultData != null && resultData.length > 0){
				$("#areaid").empty();
				for (var i=0; i<resultData.length; i++) {
					var citycode = resultData[i].citycode;
					var name = resultData[i].name;
					$("#areaid").append("<option value='"+citycode+"'>"+name+"</option>");
				}
				$("#areaid option:first").prop("selected", 'selected'); 
				getTheater();
			}else{
				$("#areaid").empty();
				$("#theaternum").empty();
				$("#roleid").empty();
				$("#areaid").append("<option selected>暂无地区信息</option>");
				$("#theaternum").append("<option selected>暂无影院信息</option>");
				$("#roleid").append("<option value='0' selected>暂无角色信息</option>");
				//errorTip("提示","暂地区可以选择");
				return;
			}
        }else{
        	$("#areaid").empty();
        	$("#theaternum").empty();
			$("#roleid").empty();
			$("#areaid").append("<option selected>暂无地区信息</option>");
			$("#theaternum").append("<option selected>暂无影院信息</option>");
			$("#roleid").append("<option value='0' selected>暂无角色信息</option>");
        	//errorTip("提示","暂无地区可以选择");
        	return;
        }
	});
}


function getYt(){
	var url= service_url + "rest/role/getTheater";
	var theatertype = "3";
	$.post( url,{theatertype:theatertype},function(data) {
		var retjson=data;
		var result = parseInt(retjson.result);
        if(result == 1000){
        	var resultData = retjson.data;
			if(resultData != null && resultData.length > 0){
				$("#yingtou").empty();
				for (var i=0; i<resultData.length; i++) {
					var theaterid = resultData[i].theaterid;
					var theaternum = resultData[i].theaternum;
					var theatername = resultData[i].theatername;
					$("#yingtou").append("<option value='"+theaternum+"'>"+theatername+"</option>");
				}
				$("#yingtou option:first").prop("selected", 'selected'); 
				getRoleByYt(0,0);
			}else{
				//errorTip("提示","暂无影院可以选择");
				$("#yingtou").empty();
				$("#roleid").empty();
	        	$("#yingtou").append("<option selected>暂无影投信息</option>");
				$("#roleid").append("<option value='0' selected>暂无角色信息</option>");
				return;
			}
        }else{
        	$("#yingtou").empty();
        	$("#roleid").empty();
        	$("#yingtou").append("<option selected>暂无影投信息</option>");
        	$("#roleid").append("<option value='0' selected>暂无角色信息</option>");
        	return;
        }
	});
}


function getTheater(areaid){
	//var url= service_url + "rest/role/getTheater";
	var url= service_url + "rest/cinema/cinemaList";
	var areaid = $("#areaid").val();
	$.post( url,{areaid:areaid},function(data) {
		var retjson=data;
		var result = parseInt(retjson.result);
        if(result == 1000){
        	var resultData = retjson.data;
			if(resultData != null && resultData.length > 0){
				$("#theaternum").empty();
//				if(userroletype=="3"){
//					$("#theaternum").append("<option value='0'>全部</option>");
//				}
				for (var i=0; i<resultData.length; i++) {
					var theaterid = resultData[i].theaterid;
					var theaternum = resultData[i].theaternum;
					var theatername = resultData[i].theatername;
					$("#theaternum").append("<option value='"+theaterid+"|"+theaternum+"'>"+theatername+"</option>");
				}
				$("#theaternum option:first").prop("selected", 'selected'); 
				getRole(0,0);
			}else{
				//errorTip("提示","暂无影院可以选择");
				$("#theaternum").empty();
				$("#roleid").empty();
	        	$("#theaternum").append("<option selected>暂无影院信息</option>");
				$("#roleid").append("<option value='0' selected>暂无角色信息</option>");
				return;
			}
        }else{
        	//errorTip("提示","暂无影院可以选择");
        	$("#theaternum").empty();
        	$("#roleid").empty();
        	$("#theaternum").append("<option selected>暂无影院信息</option>");
        	$("#roleid").append("<option value='0' selected>暂无角色信息</option>");
        	return;
        }
	});
}


function getRoleByYt(theaternum_temp,roleid_temp){
	var url= service_url + "rest/role/getRoleInfo";
	var theaternum = $("#yingtou").val();
	if(theaternum == undefined || theaternum == ""){
		errorTip("提示","请先选择所属影投");
		return;
	}
	$.post( url,{theaternum : theaternum ,roletype:100},function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	var resultData = retjson.data;
			if(resultData != null && resultData.length > 0){
				$("#roleid").empty();
				var select = 0;
				for (var i=0; i<resultData.length; i++) {
					var roleid = resultData[i].roleid;
					var rolename = resultData[i].rolename;
					if(roleid == roleid_temp){
						select = 1;
						$("#roleid").append("<option value='"+roleid+"' selected>"+rolename+"</option>");
					}else{
						$("#roleid").append("<option value='"+roleid+"'>"+rolename+"</option>");
					}
				}
				if(select == 0){
					$("#roleid option:first").prop("selected", 'selected'); 
				}
			}else{
				$("#roleid").empty();
	        	$("#roleid").append("<option value='0' selected>暂无角色信息</option>");
				return;
			}
        }else{
        	$("#roleid").empty();
        	$("#roleid").append("<option value='0' selected>暂无角色信息</option>");
        	return;
        }
	});
}


function getRole(theaternum_temp,roleid_temp){
	var url= service_url + "rest/role/getRoleInfo";
	var theaternum = $("#theaternum").val();
	if(theaternum == undefined){
		theaternum = theaternum_temp;
	}
	if(userroletype == "3" && theaternum == ""){
		errorTip("提示","请先选择所属影院");
		return;
	}else{
		if(theaternum.indexOf("|")>-1){
			var num = theaternum.split("|");
			theaternum = num[1];
		}
		$.post( url,{roleid_temp : roleid_temp,theaternum : theaternum },function(data) {
			var retjson=$.parseJSON(data);
			var result = parseInt(retjson.result);
	        if(result == 1000){
	        	var resultData = retjson.data;
				if(resultData != null && resultData.length > 0){
					$("#roleid").empty();
					var select = 0;
					for (var i=0; i<resultData.length; i++) {
						var roleid = resultData[i].roleid;
						var rolename = resultData[i].rolename;
						if(roleid == roleid_temp){
							select = 1;
							$("#roleid").append("<option value='"+roleid+"' selected>"+rolename+"</option>");
						}else{
							$("#roleid").append("<option value='"+roleid+"'>"+rolename+"</option>");
						}
					}
					if(select == 0){
						$("#roleid option:first").prop("selected", 'selected'); 
					}
				}else{
					$("#roleid").empty();
		        	$("#roleid").append("<option value='0' selected>暂无角色信息</option>");
					return;
				}
	        }else{
	        	$("#roleid").empty();
	        	$("#roleid").append("<option value='0' selected>暂无角色信息</option>");
	        	return;
	        }
		});
	}
}

//提交表单
function addUserInfo(){
	var username = $("#username").val();
	var nickname = $("#nickname").val();
	var mobile = $("#mobile").val();
	var wechart = $("#wechart").val();
	var email = $("#email").val();
	var roleid = $("#roleid").val();
	
	var type = localStorage.getItem("roletype");
	if($("#type").val() != null){
		type = $("#type").val();
	}else if(type == 2){ // 如果是管理角色创建业务角色
		type = 1;
	}
	var theaternum = localStorage.getItem("theaternum");
	var theatername = localStorage.getItem("theatername");
	if($("#theaternum").val() != null){
		theaternum = $("#theaternum").val();
		theatername = $("#theaternum").find("option:selected").text();
	}
	
	if(username == ""){
		errorTip("提示","请填写登录账号");
		return;
	}
	if(checkRepeat()==false){
		return;
	}
	if(checkNickName()==false){
		return;
	}
	if(checkMobile()==false){
		return;
	}
	if(checkEmail()==false){
		return;
	}
	if(checkWechart()==false){
		return;
	}
	
	debugger;
	
	if(theaternum.indexOf("undefined") > -1){
		errorTip("提示","影院数据有误、请联系工作人员");
		return;
	}
	if(roleid == "" || roleid == "0"){
		errorTip("提示","请选择角色信息");
		return;
	}
	
	//设置保存按钮不可多次点击
	$("#add").attr("class","submitBn-temp");
	var url= service_url + "rest/user/addUser";
	$.post( url,{username : encodeURIComponent(username),
				 nickname : encodeURIComponent(nickname),
				 mobile : encodeURIComponent(mobile),
				 wechart : encodeURIComponent(wechart),
				 email : encodeURIComponent(email),
				 roleid : roleid,
				 type : type,
				 theaternum : theaternum,
				 theatername : encodeURIComponent(theatername)},function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
		$("#add").attr("class","submitBn");
        if(result == 1000){
			var page = "manager/userInfoList.html";
			window.parent.$("#mainFrame").attr("src",page);
        }else if(result == 1104){
        	errorTip("提示","用户添加失败，请稍后重试");
        	return;
        }else if(result == 1207){
			var page = "manager/userInfoList.html";
			window.parent.$("#mainFrame").attr("src",page);
        }else if(result == 9997){
        	errorTip("提示",retjson.msg);
        	return;
        }else{
        	errorTip("提示","请求超时，请稍后重试");
        	return;
        }
	});
}


function getUserInfo(userid){
	var url = service_url + "rest/user/getUser";
	$.post( url,{userid : userid },function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	var resultData = retjson.data;
        	$("#username").html(resultData.username);
        	$("#nickname").val(resultData.nickname);
        	$("#mobile").val(resultData.mobile);
        	$("#email").val(resultData.email);
        	$("#wechart").val(resultData.wechart);
        	var html = "<label>角色<span class='must'>*</span></label><select id='roleid'></select>";
    		var htmlTheater = "<label>所属影院<span class='must'>*</span></label><span class='xianshi'>"+resultData.theatername+"</span>";
    		$("#showUpdate").html(htmlTheater+html);
        	var roletype = resultData.roletype;
        	if(roletype == "3"){
        		$("#roleid").prepend("<option value='"+resultData.roleid+"' selected>"+resultData.rolename+"</option>");
        	}else if(roletype == "2"){
        		$("#roleid").prepend("<option value='"+resultData.roleid+"' selected>"+resultData.rolename+"</option>");
        	}else if(roletype == "1"){
        		if(userroletype == "1"){//登录者为业务角色
        			$("#roleid").prepend("<option value='"+resultData.roleid+"' selected>"+resultData.rolename+"</option>");
        		}else{
        			getRole(resultData.theaternum,resultData.roleid);
        		}
        	}else if(roletype == "100"){//影投角色
        		htmlTheater = "<label>所属影投<span class='must'>*</span></label><span class='xianshi'>"+resultData.theatername+"</span>";
        		$("#showUpdate").html(htmlTheater+html);
        		$("#roleid").prepend("<option value='"+resultData.roleid+"' selected>"+resultData.rolename+"</option>");
        	}
        	$("#createtime").html(resultData.createtime);
        	$("#lastlogintime").html(resultData.lastlogintime);
        }else if(result == 1108){
        	errorTip("提示","用户信息不存在");
        	return;
        }else if(result == 1107){
        	errorTip("提示","查询用户信息失败");
        }else{
        	errorTip("提示","请求超时，请稍后重试");
        	return;
        }
	});
}


function updateUser(){
	if(checkNickName()==false){
		return;
	}
	if(checkMobile()==false){
		return;
	}
	if(checkEmail()==false){
		return;
	}
	if(checkWechart()==false){
		return;
	}
	var userid = $("#userid").val();
	var username = $("#username").html();
	var nickname = $("#nickname").val();
	var mobile = $("#mobile").val();
	var email = $("#email").val();
	var wechart = $("#wechart").val();
	var roleid = $("#roleid").val();
	if(roleid == ""){
		return;
	}
	//设置保存按钮不可多次点击
	$("#update").attr("class","submitBn-temp");
	var url = service_url + "rest/user/updateUser";
	$.post( url,{userid : userid,username:username,nickname : nickname,mobile : mobile,email : email,wechart:wechart,roleid:roleid },function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
		$("#update").attr("class","submitBn");
        if(result == 1000){
        	var page = "manager/userInfoList.html";
			window.parent.$("#mainFrame").attr("src",page);
        }else if(result == 1105){
        	errorTip("提示","修改用户信息失败，请稍后重试");
        	return;
        }else{
        	errorTip("提示","请求超时，请稍后重试");
        	return;
        }
	});
}
