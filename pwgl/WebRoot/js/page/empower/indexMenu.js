$(function(){
	ctl_initGrid({
		jqGridId:"menuGrid",
		serviceId:"menuService",
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
//		treeGrid:true,
//		ExpandColumn:"menuid",//展开的列
//		ExpandColClick:true,
		colNames:['菜单id','菜单名称','别名','url','说明','状态代码','状态','父菜单id','排序号','操作'],
		colModel:[
		{name:'menuid',index:'menuid',width:40},
		{name:'mname',index:'mname',width:40},
		{name:'alias',index:'alias',width:40},
		{name:'murl',index:'murl',width:80},
		{name:'des',index:'des',width:60},
		{name:'status',index:'status',width:30,hidden:true},
		{name:'statusname',index:'statusname',width:30},
		{name:'fmenuid',index:'fmenuid',width:60,hidden:true},
		{name:'pxh',index:'pxh',width:60,hidden:true},
		{name:'oper',index:'oper',width:60,align:'center'}],
		pager:"menuPager",
		rowNum:30,
		viewrecords:true,
		rowList:[30,50,100],
		gridComplete:function(){
			var ids = ctl_getAllDataIds("menuGrid");
			var cl = '';
			for ( var i = 0; i < ids.length; i++) {
				cl = ids[i];
				var rowObj = ctl_getRowObjForRowNo("menuGrid",cl);
				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateMenu('"+cl+"')>修改</a>";
				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteMenu('"+rowObj.menuid+"')>删除</a>";
				var jy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateStatus('"+rowObj.menuid+"','2')>禁用</a>";
				var qy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateStatus('"+rowObj.menuid+"','1')>启用</a>";
				if(rowObj.status == "1"){
					ctl_setCell("menuGrid", cl, "oper", jy);
				}else{
					ctl_setCell("menuGrid", cl, "oper", qy+" | "+xg+" | "+sc);
				}
			}
			addAutoSize([{
   				htmlId : "menuGrid",// 页面中元素的id
   				htmlType : "jqgrid",// 表示为jqgrid
   				widthResize : -25,// 缩放比例后需要调整的宽度
   				heightResize : -24 
   			}]);
		},
		jsonReader:{
			root:"data",
			total:"totalPage",
			page:"page",
			records:"totalSize",
			repeatitems:false
		},
//		treeReader : {
//            level_field: "level",
//            parent_id_field: "parent",
//            leaf_field: "isLeaf",
//            expanded_field: "expanded"
//        }
	});
	
	//增加
	$("#addBtn").click(function(){
		addMenu();
	});
	
	//查询
	$("#queryBtn").click(function(){
		var menuid = $("#menuid").val();
		var mname = $("#mname").val();
		var data = {operType:"index",menuid:menuid,mname:mname};
		ctl_onPagingForConditions("menuGrid", "menuService", true, data,jsonType);
	});
});

function addMenu(){
	var dlg = ctl_dialogDivClose('', {
        title: '新增菜单',
        content: 'addDiv',
    },
    ['cancelBtn']);
	
	$("#saveBtn").click(function() {
		var fmenuid = $("#addFmenuid").val();
		var menuid = $("#addMenuid").val();
		var mname = $("#addMname").val();
		var alias = $("#addAlias").val();
		var murl = $("#addMurl").val();
		var pxh = $("#addPxh").val();
		var des = $("#addDes").val();
		if($.trim(fmenuid) == ""){
			ctl_showMsg("父菜单ID不能为空");
			return;
		}
		if($.trim(menuid) == ""){
			ctl_showMsg("菜单ID不能为空");
			return;
		}
		if($.trim(mname) == ""){
			ctl_showMsg("菜单名称不能为空");
			return;
		}
		if($.trim(alias) == ""){
			ctl_showMsg("菜单别名不能为空");
			return;
		}
		if($.trim(murl) == ""){
			ctl_showMsg("菜单url不能为空");
			return;
		}
		if($.trim(pxh) == ""){
			ctl_showMsg("排序号不能为空");
			return;
		}
		
		var data = {operType:"add",fmenuid:fmenuid,menuid:menuid,mname:mname,alias:alias,murl:murl,pxh:pxh,des:des};
		publicAjaxRequest("menuService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('menuGrid');
				ctl_showMsg("新增成功！");
			}else if("repeat" == rdata){
				ctl_showMsg("菜单id重复！");
			}else {
				ctl_showMsg("新增失败！");
			}
		});
	});
}

function updateMenu(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改菜单',
        content: 'addDiv',
    },
    ['cancelBtn']);
	var rowObj = ctl_getRowObjForRowNo('menuGrid',rowId);
	$("#addMenuid").attr("disabled",true);
	$("#addFmenuid").val(rowObj.fmenuid);
	$("#addMenuid").val(rowObj.menuid);
	$("#addMname").val(rowObj.mname);
	$("#addAlias").val(rowObj.alias);
	$("#addMurl").val(rowObj.murl);
	$("#addPxh").val(rowObj.pxh);
	$("#addDes").val(rowObj.des);
	
	$("#saveBtn").click(function() {
		var fmenuid = $("#addFmenuid").val();
		var menuid = $("#addMenuid").val();
		var mname = $("#addMname").val();
		var alias = $("#addAlias").val();
		var murl = $("#addMurl").val();
		var pxh = $("#addPxh").val();
		var des = $("#addDes").val();
		if($.trim(fmenuid) == ""){
			ctl_showMsg("父菜单ID不能为空");
			return;
		}
		if($.trim(menuid) == ""){
			ctl_showMsg("菜单ID不能为空");
			return;
		}
		if($.trim(mname) == ""){
			ctl_showMsg("菜单名称不能为空");
			return;
		}
		if($.trim(alias) == ""){
			ctl_showMsg("菜单别名不能为空");
			return;
		}
		if($.trim(murl) == ""){
			ctl_showMsg("菜单url不能为空");
			return;
		}
		if($.trim(pxh) == ""){
			ctl_showMsg("排序号不能为空");
			return;
		}
		
		var data = {operType:"update",fmenuid:fmenuid,menuid:menuid,mname:mname,alias:alias,murl:murl,pxh:pxh,des:des};
		publicAjaxRequest("menuService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('menuGrid');
				ctl_showMsg("修改成功！");
			}else {
				ctl_showMsg("修改失败！");
			}
		});
	});
}

function deleteMenu(menuid){
	ctl_confirm("您确定要删除吗？",function() {
		var data = {operType:"delete",menuid:menuid};
		publicAjaxRequest("menuService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('menuGrid');
				ctl_showMsg("删除成功！");
			}else if("fail" == rdata){
				ctl_showMsg("删除失败！");
			}else {
				ctl_showMsg("此菜单被"+rdata+"关联，无法删除！");
			}
		});
	},function(){});
}

//禁用、启用
function updateStatus(menuid,status){
	var data = {operType:"updateStatus",menuid:menuid,status:status};
	publicAjaxRequest("menuService",data,jsonType, function(response) {
		var rdata = response.data;
		if("success" == rdata){
			ctl_showMsg("操作成功！");
			ctl_reloadGrid("menuGrid");	
		}else{
			ctl_showMsg("操作失败！");
		}
	});
}
