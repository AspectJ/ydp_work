$(function(){
	ctl_initGrid({
		jqGridId:"user_grid",
		serviceId:"userService",
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		colNames:['用户id','真实姓名','登录账号','手机号码','状态id','状态','性别','年龄','邮箱','密码','功能角色id'
		          ,'密码管理','授权管理','用户管理'],
		colModel:[
		{name:'userid',index:'userid',hidden:true},
		{name:'realname',index:'realname',width:40},
		{name:'username',index:'username',width:40},	
		{name:'telephone',index:'telephone',width:60},	
		{name:'status',index:'status',width:40,hidden:true},
		{name:'statusname',index:'statusname',width:40},
		{name:'sex',index:'sex',width:40,hidden:true},
		{name:'age',index:'age',width:40,hidden:true},
		{name:'email',index:'email',width:40,hidden:true},
		{name:'pass',index:'pass',width:40,hidden:true},
		{name:'roleid',index:'roleid',width:40,hidden:true},
		{name:'passmanage',index:'status',width:80,align:'center'},
		{name:'empowermanage',index:'empowermanage',width:60,align:'center'},
		{name:'usermanage',index:'usermanage',width:60,align:'center'}],
		pager:"userPager",
		rowNum:30,
		viewrecords:true,
		rowList:[30,50,100],
		gridComplete:function(){
			var ids = ctl_getAllDataIds("user_grid");
			var cl = '';
			for ( var i = 0; i < ids.length; i++) {
				cl = ids[i];
				var rowObj = ctl_getRowObjForRowNo("user_grid",cl);
				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateUser('"+cl+"')>修改</a>";
				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteUser('"+rowObj.userid+"')>删除</a>";
				var qy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateStatus('"+rowObj.userid+"','启用')>启用</a>";
				var jy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateStatus('"+rowObj.userid+"','禁用')>禁用</a>";
				var hf = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateStatus('"+rowObj.userid+"','恢复')>恢复</a>";
				var tc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateStatus('"+rowObj.userid+"','强制退出')>强制退出</a>";
				if(rowObj.status == "2"){
					ctl_setCell("user_grid", cl, "usermanage", qy+" | "+xg+" | "+sc);
				}else if(rowObj.status == "1"){
					ctl_setCell("user_grid", cl, "usermanage", jy+" | "+tc);
				}else{
					ctl_setCell("user_grid", cl, "usermanage", xg+" | "+hf);
				}
				var ckmm = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=seePass('"+rowObj.pass+"')>查看密码</a>";
				var xgmm = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updatePass('"+rowObj.userid+"')>修改密码</a>";
				var czmm = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=resetPass('"+rowObj.userid+"')>重置密码</a>";
				ctl_setCell("user_grid", cl, "passmanage", ckmm+" | "+xgmm+" | "+czmm);
				var gnsq = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=empowerFunction('"+rowObj.userid+"','"+rowObj.roleid+"')>功能授权</a>";
				var sjsq = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=empowerData('"+rowObj.userid+"')>数据授权</a>";
				ctl_setCell("user_grid", cl, "empowermanage", gnsq+" | "+sjsq);
			}
			addAutoSize([{
   				htmlId : "user_grid",// 页面中元素的id
   				htmlType : "jqgrid",// 表示为jqgrid
   				widthResize : -25,// 缩放比例后需要调整的宽度
   				heightResize : -54 
   			}]);
		},
		jsonReader:{
			root:"data",
			total:"totalPage",
			page:"page",
			records:"totalSize",
			repeatitems:false
		}	
	});
	
	//状态
	$("#status").ctl_select({
        id: "status_sel",
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        data:{'':'全部','1':'启用','2':'禁用','4':'已删'},
    });
	
	//增加
	$("#addBtn").click(function(){
		addUser();
	});
	
	//查询
	$("#queryBtn").click(function(){
		var realname = $("#realname").val();
		var telephone = $("#telephone").val();
		var deptid = $("#deptname_sel").val();
		var status = $("#status_sel").val();
		var data = {operType:"index",realname:realname,telephone:telephone,deptid:deptid,status:status};
		ctl_onPagingForConditions("user_grid", "userService", true, data,jsonType);
	});
});

function addUser(){
	var dlg = ctl_dialogDivClose('', {
        title: '新增用户',
        content: 'addDiv',
    },
    ['cancelBtn']);
	
	//所在部门
	$('#addDept').ctl_select({
		id:"addDept_sel",
		dialogId:"addDiv",
		listboxwidth:0,
		width:115,
		columns:1,
		listboxmaxheight:300,
		columnValue:'deptid',
		columnName:'deptname',
		selectedIndex:'0',
		disableDefaultText:true,
		url:springMvcUrl,
		param:{
			 param:getParam("userService"),
		     data: "{operType:'selectDeptname'}"
		},
		type:'post',
		dataType:'json'
	});
	//性别
	$("#addSex").ctl_select({
        id: "addSex_sel",
        dialogId:'addDiv',
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        selected:['男'],
        data:{'男':'男','女':'女'},
    });
	
	$("#saveBtn").click(function() {
		var username = $("#addUserName").val();
		var pass = $("#addPass").val();
		var confirmpass = $("#addConfirmPass").val();
		var realname = $("#addRealName").val();
		var sex = $("#addSex_sel").val();
		var age = $("#addAge").val();
		var telephone = $("#addPhone").val();
		var extnum = $("#addExtnum").val();
		var email = $("#addEmail").val();
		var worktime = $("#addWorkTime").val();
		var entrytime = $("#addEntryTime").val();
		var deptid = $("#addDept_sel").val();
		if($.trim(username) == ""){
			ctl_showMsg("登录账号不能为空");
			return;
		}
		if($.trim(pass) == ""){
			ctl_showMsg("登录密码不能为空");
			return;
		}
		if($.trim(realname) == ""){
			ctl_showMsg("真实姓名不能为空");
			return;
		}
		if($.trim(age) == ""){
			ctl_showMsg("年龄不能为空");
			return;
		}
		if($.trim(worktime) == ""){
			ctl_showMsg("参加工作时间不能为空");
			return;
		}
		if($.trim(entrytime) == ""){
			ctl_showMsg("入职时间不能为空");
			return;
		}
		if($.trim(pass) != $.trim(confirmpass)){
			ctl_showMsg("确认密码输入错误");
			return;
		}
		
		var data = {operType:"add",username:username,pass:pass,realname:realname,sex:sex,age:age,telephone:telephone,extnum:extnum,email:email
				,worktime:worktime,entrytime:entrytime,deptid:deptid};
		publicAjaxRequest("userService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('user_grid');
				ctl_showMsg("新增成功！");
			}else if("repeat" == rdata){
				ctl_showMsg("账号重复！");
			}else {
				ctl_showMsg("新增失败！");
			}
		});
	});
}

function updateUser(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改用户',
        content: 'addDiv',
    },
    ['cancelBtn']);
	$("#passTr").hide();
	var rowObj = ctl_getRowObjForRowNo('user_grid',rowId);
	//所在部门
	$('#addDept').ctl_select({
		id:"addDept_sel",
		dialogId:"addDiv",
		listboxwidth:0,
		width:115,
		columns:1,
		listboxmaxheight:300,
		columnValue:'deptid',
		columnName:'deptname',
		selected: [rowObj.deptid],
		disableDefaultText:true,
		url:springMvcUrl,
		param:{
			 param:getParam("userService"),
		     data: "{operType:'selectDeptname'}"
		},
		type:'post',
		dataType:'json'
	});
	//性别
	$("#addSex").ctl_select({
        id: "addSex_sel",
        dialogId:'addDiv',
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        selected: [rowObj.sex],
        data:{'男':'男','女':'女'},
    });
	$("#addUserName").val(rowObj.username);
	$("#addRealName").val(rowObj.realname);
	$("#addAge").val(rowObj.age);
	$("#addPhone").val(rowObj.telephone);
	$("#addExtnum").val(rowObj.extnum);
	$("#addEmail").val(rowObj.email);
	$("#addWorkTime").val(rowObj.worktime);
	$("#addEntryTime").val(rowObj.entrytime);
	
	$("#saveBtn").click(function() {
		var username = $("#addUserName").val();
		var realname = $("#addRealName").val();
		var sex = $("#addSex_sel").val();
		var age = $("#addAge").val();
		var telephone = $("#addPhone").val();
		var extnum = $("#addExtnum").val();
		var email = $("#addEmail").val();
		var worktime = $("#addWorkTime").val();
		var entrytime = $("#addEntryTime").val();
		var deptid = $("#addDept_sel").val();
		if($.trim(username) == ""){
			ctl_showMsg("登录账号不能为空");
			return;
		}
		if($.trim(realname) == ""){
			ctl_showMsg("真实姓名不能为空");
			return;
		}
		if($.trim(age) == ""){
			ctl_showMsg("年龄不能为空");
			return;
		}
		if($.trim(worktime) == ""){
			ctl_showMsg("参加工作时间不能为空");
			return;
		}
		if($.trim(entrytime) == ""){
			ctl_showMsg("入职时间不能为空");
			return;
		}
		var ids = ctl_getAllDataIds("user_grid");
		var sum = 0;
		for ( var i = 0; i < ids.length; i++) {
			var id = ids[i];
			var rowObj1 = ctl_getRowObjForRowNo("user_grid", id);
			if(username == rowObj1.username && id != rowId){
				sum++;
			}
		}
		if(sum > 0){
			ctl_showMsg("账号重复");
			return;
		}
		
		var data = {operType:"update",userid:rowObj.userid,username:username,realname:realname,sex:sex,age:age,telephone:telephone,extnum:extnum
				,email:email,worktime:worktime,entrytime:entrytime,deptid:deptid};
		publicAjaxRequest("userService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('user_grid');
				ctl_showMsg("修改成功！");
			}else {
				ctl_showMsg("修改失败！");
			}
		});
	});
}

function deleteUser(userid){
	ctl_confirm("您确定要删除吗？",function() {
		var data = {operType:"delete",userid:userid};
		publicAjaxRequest("userService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('user_grid');
				ctl_showMsg("删除成功！");
			}else {
				ctl_showMsg("删除失败！");
			}
		});
	},function(){});
}

//发布和停用
function updateStatus(userid,status){
	var data = {operType:"updateStatus",userid:userid,status:status};
	publicAjaxRequest("userService",data,jsonType, function(response) {
		var rdata = response.data;
		if("success" == rdata){
			ctl_showMsg("操作成功！");
			ctl_reloadGrid("user_grid");	
		}else if("tc" == rdata){
			defaultSessionId="";
			$.cookie("sessionIdKey", null);
			$.cookie("dlyh", null);
			window.location.href = loginHtml;
		}else{
			ctl_showMsg("操作失败！");
		}
	});
}

//修改密码
function updatePass(userid){
	var dlg = ctl_dialogDivClose('', {
        title: '修改用户',
        content: 'updatePassDiv',
    },
    ['cancelBtn']);
	
	$("#saveBtn").click(function(){
		var newpass = $("#updateNewPass").val();
		var okpass = $("#updateOkPass").val();
		if($.trim(newpass) == ""){
			ctl_showMsg("新密码不能为空");
			return;
		}
		if(okpass != newpass){
			ctl_showMsg("两次密码不一致");
			return;
		}
		
		var data = {operType:"updatePass",userid:userid,newpass:newpass};
		publicAjaxRequest("userService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata){
				dlg.close();
				ctl_showMsg("操作成功！");
				ctl_reloadGrid("user_grid");	
			}else{
				ctl_showMsg("操作失败！");
			}
		});
	});
}

function resetPass(userid){
	var data = {operType:"updatePass",userid:userid,newpass:"123456"};
	publicAjaxRequest("userService",data,jsonType, function(response) {
		var rdata = response.data;
		if("success" == rdata){
			ctl_showMsg("操作成功！");
			ctl_reloadGrid("user_grid");	
		}else{
			ctl_showMsg("操作失败！");
		}
	});
}

function seePass(pass){
	alert("密码："+pass);
}

//功能授权
function empowerFunction(userid,roleid){
	var dlg = ctl_dialogDivClose('', {
        title: '功能授权',
        content: 'empowerDiv',
    },
    ['empowerCancelBtn']);
	
	//加载角色
	var data = {operType:'selectFunctionRole'};
	var divHtml = "";
	publicAjaxRequest("userService",data,jsonType, function(response) {
		var resData = response.data;
		for (var i = 0; i < resData.length; i++) {
			var role = resData[i];
			divHtml += "<dl>";
			divHtml += "<dd>";
			var roleId = roleid;
			if(roleId==role.roleid){
				divHtml += "<input type='radio' id='roleId_" + role.roleid
				+ "' name='role_radio_name' checked='checked' value='" + role.roleid
				+ "' tag='1'/>";
			}else{
				divHtml += "<input type='radio' id='roleId_" + role.roleid
				+ "' name='role_radio_name' value='" + role.roleid
				+ "' tag='0'/>";
			}
			
			divHtml += "<label name='roleNameLabel' id='roleLabel_"
					+ role.roleid + "'>" + role.rolename + "</label>";
			divHtml += "<input type='text' id='roleInput_" + role.roleid
					+ "' value='" + role.rolename
					+ "' style='display:none;'/>";
			divHtml += "</dd>";
			divHtml += "</dl>";
		}
//		divHtml += "<dl><dd><input type='radio' id='cancelRadio' name='role_radio_name' value='取消授权'/>" +
//				"<label name='roleNameLabel' id='cancelLabel'>取消授权</label>" +
//				"<input type='text' id='cancelInput' value='取消授权' style='display:none;'/></dd></dl>";
		$("#roleDiv").html(divHtml);
		
		//单选按钮点击取消
//		$(":radio").click(function(){
//			if($(this).attr("tag") == 1){
//				$(this).attr("checked",false);
//				$(this).attr("tag",0);
//			}else{
//			    $(this).attr("tag",1);
//			}
//		});
	});
	$("#empowerSaveBtn").click(function(){
    	var checked = $($("input[name='role_radio_name']:checked"));
		var roleId = $(checked).val();
		var data = {userid:userid,roleid:roleId,operType:'saveFunctionEmpower'};
		publicAjaxRequest("userService",data,jsonType, function(response) {
			if(response.data == "success"){
				ctl_showMsg("操作成功!");
				dlg.close();
				ctl_reloadGrid('user_grid');
			}else{
				ctl_showMsg("操作失败!");
			}
		});
    });
}

//数据授权
function empowerData(userid){
	var dlg = ctl_dialogDivClose('', {
        title: '数据授权',
        content: 'empowerDataDiv',
    },
    ['empowerCancelBtn']);
	
	//加载角色
	var data = {operType:'selectDataRole',userid:userid};
	var divHtml = "";
	publicAjaxRequest("userService",data,jsonType, function(response) {
		var allRole = response.data.all;
		var userRole = response.data.user;
		for (var i = 0; i < allRole.length; i++) {
			var role = allRole[i];
			divHtml += "<dl>";
			divHtml += "<dd>";
			divHtml += "<input type='checkbox' id='" + role.roleid
			+ "' name='checkbox' />";
			
			divHtml += "<label name='roleNameLabel' id='roleLabel_"
					+ role.roleid + "'>" + role.rolename + "</label>";
			divHtml += "</dd>";
			divHtml += "</dl>";
		}
		$("#roleDataDiv").html(divHtml);
		for ( var i = 0; i < userRole.length; i++) {
			$("#"+userRole[i].roleid).attr("checked","checked");
		}
		
	});
	$("#empowerSaveBtn").click(function(){
		var roleids = "";
		$("input[name='checkbox']:checked").each(function(){
			if(roleids == ""){
				roleids += $(this).attr("id");
			}else{
				roleids += ","+$(this).attr("id");
			}
		});
		var data = {userid:userid,roleids:roleids,operType:'saveDataEmpower'};
		publicAjaxRequest("userService",data,jsonType, function(response) {
			if(response.data == "success"){
				ctl_showMsg("操作成功!");
				dlg.close();
				ctl_reloadGrid('user_grid');
			}else{
				ctl_showMsg("操作失败!");
			}
		});
    });
}