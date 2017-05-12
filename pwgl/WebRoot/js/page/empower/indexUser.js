$(function(){
	ctl_initGrid({
		jqGridId:"userGrid",
		serviceId:"userService",
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		colNames:['用户id','真实姓名','登录账号','手机号码','状态id','性别','年龄','邮箱','密码','功能角色id'
		          ,'角色名称','行政区划','地址','状态','行政区划代码','用户管理'],
		colModel:[
		{name:'userid',index:'userid',hidden:true},
		{name:'realname',index:'realname',width:40},
		{name:'username',index:'username',width:40},	
		{name:'telephone',index:'telephone',width:60},
		{name:'status',index:'status',width:40,hidden:true},		
		{name:'sex',index:'sex',width:40,hidden:true},
		{name:'age',index:'age',width:40,hidden:true},
		{name:'email',index:'email',width:40,hidden:true},
		{name:'pass',index:'pass',width:40,hidden:true},
		{name:'roleid',index:'roleid',width:40,hidden:true},
		{name:'rolename',index:'rolename',width:80,align:'center'},
		{name:'areaname',index:'areaname',width:80,align:'center'},
		{name:'addr',index:'addr',width:80,align:'center'},
		{name:'statusname',index:'statusname',width:40},
		{name:'areaid',index:'areaid',hidden:true},
		{name:'act',index:'act',width:60,align:'center'}],
		pager:"userPager",
		rowNum:30,
		viewrecords:true,
		rowList:[30,50,100],
		gridComplete:function(){
			var ids = ctl_getAllDataIds("userGrid");
			var cl = '';
			for ( var i = 0; i < ids.length; i++) {
				cl = ids[i];
				var rowObj = ctl_getRowObjForRowNo("userGrid",cl);
				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateUser('"+cl+"')>修改</a>";
				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteUser('"+rowObj.userid+"')>删除</a>";
				var qy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateStatus('"+rowObj.userid+"','"+zt_qy+"')>启用</a>";
				var jy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateStatus('"+rowObj.userid+"','"+zt_jy+"')>禁用</a>";
				var sqjs= "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=empowerFunction('"+rowObj.userid+"','"+rowObj.roleid+"')>角色授权</a>";
				var qyStr="";//2禁用,1启用
				if(rowObj.status=='2'){
					qyStr=qy;
				}else{
					qyStr=jy;
				}				
				ctl_setCell("userGrid", cl, "act", xg+" | "+sc+" |"+qyStr+"|"+sqjs);
			}
			addAutoSize([{
   				htmlId : "userGrid",// 页面中元素的id
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
        data:{'':'全部','1':'启用','2':'禁用'},
    });
	
	
	//增加
	$("#addBtn").click(function(){
		addUser();
	});
	
	//查询
	$("#queryBtn").click(function(){
		var realname = $("#realname").val();
		var telephone = $("#telephone").val();
		var status = $("#status_sel").val();
		var data = {operType:"index",realname:realname,telephone:telephone,status:status};
		ctl_onPagingForConditions("userGrid", "userService", true, data,jsonType);
	});
});

function addUser(){
	var dlg = ctl_dialogDivClose('', {
        title: '新增用户',
        content: 'addDiv',
    },
    ['cancelBtn']);
	
	loadXzqh(108,106,"addDiv","xzqh_sheng","xzqh_shi","xzqh_xian","indexXzqhService",null);
	
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
		var email = $("#addEmail").val();
		var xzqh=$("#xzqh_xian_sel").val();
		var addr=$("#addAddr").val();
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
		if($.trim(pass) != $.trim(confirmpass)){
			ctl_showMsg("确认密码输入错误");
			return;
		}
		
		var data = {operType:"add",username:username,pass:pass,realname:realname,sex:sex,age:age,telephone:telephone,email:email,
				xzqh:xzqh,addr:addr};
		publicAjaxRequest("userService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('userGrid');
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
	var rowObj = ctl_getRowObjForRowNo('userGrid',rowId);
	loadXzqh(108,106,"addDiv","xzqh_sheng","xzqh_shi","xzqh_xian","indexXzqhService",rowObj.areaid);

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
	$("#addEmail").val(rowObj.email);
	$("#addAddr").val(rowObj.addr);
	
	$("#saveBtn").click(function() {
		var username = $("#addUserName").val();
		var realname = $("#addRealName").val();
		var sex = $("#addSex_sel").val();
		var age = $("#addAge").val();
		var telephone = $("#addPhone").val();
		var email = $("#addEmail").val();
		var xzqh=$("#xzqh_xian_sel").val();
		var addr=$("#addAddr").val();
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
		var ids = ctl_getAllDataIds("userGrid");
		var sum = 0;
		for ( var i = 0; i < ids.length; i++) {
			var id = ids[i];
			var rowObj1 = ctl_getRowObjForRowNo("userGrid", id);
			if(username == rowObj1.username && id != rowId){
				sum++;
			}
		}
		if(sum > 0){
			ctl_showMsg("账号重复");
			return;
		}
		
		var data = {operType:"update",userid:rowObj.userid,username:username,realname:realname,sex:sex,age:age,telephone:telephone,email:email,
				xzqh:xzqh,addr:addr};
		publicAjaxRequest("userService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('userGrid');
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
				ctl_reloadGrid('userGrid');
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
			ctl_reloadGrid("userGrid");			
		}else{
			ctl_showMsg("操作失败！");
		}
	});
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
		$("#roleDiv").html(divHtml);
	});
	$("#empowerSaveBtn").click(function(){
    	var checked = $($("input[name='role_radio_name']:checked"));
		var roleId = $(checked).val();
		var data = {userid:userid,roleid:roleId,operType:'saveFunctionEmpower'};
		publicAjaxRequest("userService",data,jsonType, function(response) {
			if(response.data == "success"){
				ctl_showMsg("操作成功!");
				dlg.close();
				ctl_reloadGrid('userGrid');
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
				ctl_reloadGrid('userGrid');
			}else{
				ctl_showMsg("操作失败!");
			}
		});
    });
}