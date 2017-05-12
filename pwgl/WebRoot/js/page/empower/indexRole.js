$(function(){
	ctl_initGrid({
		jqGridId:"roleGrid",
		serviceId:"roleService",
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		colNames:['角色id','角色名称','说明','父角色id','角色类型','操作'],
		colModel:[
		{name:'roleid',index:'roleid',width:40},
		{name:'rolename',index:'rolename',width:40},
		{name:'des',index:'des',width:40},
		{name:'froleid',index:'froleid',width:80,hidden:true},
		{name:'roletype',index:'roletype',width:60,hidden:true},
		{name:'oper',index:'oper',width:60,align:'center'}],
		pager:"rolePager",
		rowNum:30,
		viewrecords:true,
		rowList:[30,50,100],
		gridComplete:function(){
			var ids = ctl_getAllDataIds("roleGrid");
			var cl = '';
			for ( var i = 0; i < ids.length; i++) {
				cl = ids[i];
				var rowObj = ctl_getRowObjForRowNo("roleGrid",cl);
				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateRole('"+cl+"')>修改</a>";
				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteRole('"+rowObj.roleid+"')>删除</a>";
				var sq = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=empowerJs(\""+cl+"\")>菜单设置</a>";
				ctl_setCell("roleGrid", cl, "oper", xg+" | "+sc+" | "+sq);
			}
			addAutoSize([{
   				htmlId : "roleGrid",// 页面中元素的id
   				htmlType : "jqgrid",// 表示为jqgrid
   				widthResize : -25,// 缩放比例后需要调整的宽度
   				heightResize : -4 
   			}]);
		},
		jsonReader:{
			root:"data",
			total:"totalPage",
			page:"page",
			records:"totalSize",
			repeatitems:false
		},
	});
	
	//增加父角色
	$("#addFatherBtn").click(function(){
		addFatherRole();
	});
	//增加子角色
	$("#addChildBtn").click(function(){
		addChildRole();
	});
	
	//查询
	$("#queryBtn").click(function(){
		var rolename = $("#rolename").val();
		var data = {operType:"index",rolename:rolename};
		ctl_onPagingForConditions("roleGrid", "roleService", true, data,jsonType);
	});
});


function empowerJs(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '菜单设置',
        content: 'empowerRoleDiv',
        min: false,
        max: false,
    },
    ['cancelBtn']);
	var rowObj = ctl_getRowObjForRowNo('roleGrid',rowId);

	//菜单树
	var data = "{roleid:'"+rowObj.roleid+"',operType:'cdsq'}";
	var treeParam = {
		treeId:"cd",
		checkEnable:true,
		simpleEnable : true,
		asyncEnable : true,
		asyncUrl : springMvcUrl,
		asyncType : 'post',
		dataType : 'json',
		onClick : function(event,treeId,treeNode){
		},
		otherParam : {
			param : getParam("roleService"),
			data : data
		}
	};
	//初始化树
	var treeObj = ctl_initTree(treeParam, null);
	
	$("#saveBtn").click(function(){
		var nodes = ctl_getCheckedNodes(treeObj);
		if(null==nodes){
			ctl_showMsg("请选择要授权的功能菜单！");
			return;
		}
		var cdids = "";
		for(var i=0;i<nodes.length;i++){
			if(cdids != ""){
				cdids += ",";
			}
			cdids += nodes[i].id;
		}
		var data = {cdids:cdids,roleid:rowObj.roleid,operType:'empowerJs'};
		publicAjaxRequest("roleService",data,jsonType, function(response) {
			var rdata = response.data;
			if("fail" == rdata) {
				ctl_showMsg("授权角色失败！");
			}else {
				dlg.close();
				ctl_showMsg("授权角色成功！");
			}
		});
	});
}

function addFatherRole(){
	var dlg = ctl_dialogDivClose('', {
        title: '新增父角色',
        content: 'addFatherRoleDiv',
    },
    ['cancelBtn']);
	//角色类型
	$("#addRoletype").ctl_select({
        id: "addRoletype_sel",
        dialogId:'addFatherRoleDiv',
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        selected:['1'],
        data:{'1':'功能角色','2':'数据角色'},
    });
	
	$("#saveBtn").click(function() {
		var roletype = $("#addRoletype_sel").val();
		var rolename = $("#addFatherRolename").val();
		var des = $("#addFatherRoleDes").val();
		if($.trim(rolename) == ""){
			ctl_showMsg("角色名称不能为空");
			return;
		}
		
		var data = {operType:"add",roletype:roletype,rolename:rolename,des:des};
		publicAjaxRequest("roleService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('roleGrid');
				ctl_showMsg("新增成功！");
			}else if("repeat" == rdata){
				ctl_showMsg("角色名称重复！");
			}else {
				ctl_showMsg("新增失败！");
			}
		});
	});
}

function addChildRole(){
	var dlg = ctl_dialogDivClose('', {
        title: '新增子角色',
        content: 'addChildRoleDiv',
    },
    ['cancelBtn']);
	//父角色名称
	$('#addChildFrn').ctl_select({
		id:"addChildFrn_sel",
		listboxwidth:0,
		width:115,
		columns:1,
		listboxalign:'auto',
		listboxmaxheight:80,
		disabled:false,
		columnValue:'roleid',
		columnName:'rolename',
		selectedIndex:'0',
		disableDefaultText:true,
	    dialogId: "addChildRoleDiv",
		url:springMvcUrl,
		param:{
			 param:getParam("roleService"),
		     data: "{operType:'selectFatherRole'}"
		},
		type:'post',
		dataType:'json',
	});
	
	$("#saveBtn").click(function() {
		var froleid = $("#addChildFrn_sel").val();
		var rolename = $("#addChildRolename").val();
		var des = $("#addChildRoleDes").val();
		if($.trim(rolename) == ""){
			ctl_showMsg("角色名称不能为空");
			return;
		}
		
		var data = {operType:"add",froleid:froleid,rolename:rolename,des:des};
		publicAjaxRequest("roleService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('roleGrid');
				ctl_showMsg("新增成功！");
			}else if("repeat" == rdata){
				ctl_showMsg("角色名称重复！");
			}else {
				ctl_showMsg("新增失败！");
			}
		});
	});
}

function updateRole(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改角色',
        content: 'updateRoleDiv',
    },
    ['cancelBtn']);
	var rowObj = ctl_getRowObjForRowNo('roleGrid',rowId);
	$("#updateRolename").val(rowObj.rolename);
	$("#updateRoleDes").val(rowObj.des);
	
	$("#saveBtn").click(function() {
		var rolename = $("#updateRolename").val();
		var des = $("#updateRoleDes").val();
		if($.trim(rolename) == ""){
			ctl_showMsg("角色名称不能为空");
			return;
		}
		var ids = ctl_getAllDataIds("roleGrid");
		var sum = 0;
		for ( var i = 0; i < ids.length; i++) {
			var id = ids[i];
			var rowObj1 = ctl_getRowObjForRowNo("roleGrid", id);
			if(rolename == rowObj1.rolename && id != rowId){
				sum++;
			}
		}
		if(sum > 0){
			ctl_showMsg("角色名称重复");
			return;
		}
		
		var data = {operType:"update",roleid:rowObj.roleid,rolename:rolename,des:des};
		publicAjaxRequest("roleService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('roleGrid');
				ctl_showMsg("修改成功！");
			}else {
				ctl_showMsg("修改失败！");
			}
		});
	});
}

function deleteRole(roleid){
	ctl_confirm("您确定要删除吗？",function() {
		var data = {operType:"delete",roleid:roleid};
		publicAjaxRequest("roleService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('roleGrid');
				ctl_showMsg("删除成功！");
			}else if("fail" == rdata){
				ctl_showMsg("删除失败！");
			}else if("ygl"==rdata){
				ctl_showMsg("对不起已经授权了，不能删除");
			}
		});
	},function(){});
}