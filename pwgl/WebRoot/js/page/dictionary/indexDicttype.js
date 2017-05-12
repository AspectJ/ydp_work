$(function(){
	ctl_initGrid({
		jqGridId:"typeGrid",
		serviceId:"dicttypeService",
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		colNames:['分类代码','分类名称','是否树形分类id','是否树形分类','状态id','状态','操作'],
		colModel:[
		{name:'dicttypeid',index:'dicttypeid',width:40},
		{name:'typename',index:'typename',width:40},
		{name:'istree',index:'istree',width:40,hidden:true},
		{name:'istreename',index:'istreename',width:40},
		{name:'status',index:'status',width:80,hidden:true},
		{name:'statusname',index:'statusname',width:40},
		{name:'oper',index:'oper',width:60,align:'center'}],
		pager:"typePager",
		rowNum:30,
		viewrecords:true,
		rowList:[30,50,100],
		gridComplete:function(){
			var ids = ctl_getAllDataIds("typeGrid");
			var cl = '';
			for ( var i = 0; i < ids.length; i++) {
				cl = ids[i];
				var rowObj = ctl_getRowObjForRowNo("typeGrid",cl);
				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateType('"+cl+"')>修改</a>";
				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteType('"+rowObj.dicttypeid+"')>删除</a>";
				var jy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateStatus('"+rowObj.dicttypeid+"','2')>禁用</a>";
				var qy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateStatus('"+rowObj.dicttypeid+"','1')>启用</a>";
				if(rowObj.status == "1"){
					ctl_setCell("typeGrid", cl, "oper", jy);
				}else{
					ctl_setCell("typeGrid", cl, "oper", qy+" | "+xg+" | "+sc);
				}
			}
			addAutoSize([{
   				htmlId : "typeGrid",// 页面中元素的id
   				htmlType : "jqgrid",// 表示为jqgrid
   				widthResize : -25,// 缩放比例后需要调整的宽度
   				heightResize : 0 
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
		addType();
	});
	
	//查询
	$("#queryBtn").click(function(){
		var typename = $("#typename").val();
		var status = $("#status_sel").val();
		var data = {operType:"index",typename:typename,status:status};
		ctl_onPagingForConditions("typeGrid", "dicttypeService", true, data,jsonType);
	});
});

function addType(){
	var dlg = ctl_dialogDivClose('', {
        title: '新增代码分类',
        content: 'addDiv',
    },
    ['cancelBtn']);
	//是否树形分类
	$("#addIstree").ctl_select({
        id: "addIstree_sel",
        dialogId:'addDiv',
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        selected:['2'],
        data:{'1':'是','2':'否'},
    });
	
	$("#saveBtn").click(function() {
		var typename = $("#addTypename").val();
		var istree = $("#addIstree_sel").val();
		if($.trim(typename) == ""){
			ctl_showMsg("分类名称不能为空");
			return;
		}
		
		var data = {operType:"add",typename:typename,istree:istree};
		publicAjaxRequest("dicttypeService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('typeGrid');
				ctl_showMsg("新增成功！");
			}else if("repeat" == rdata){
				ctl_showMsg("分类名称重复！");
			}else {
				ctl_showMsg("新增失败！");
			}
		});
	});
}

function updateType(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改代码分类',
        content: 'addDiv',
    },
    ['cancelBtn']);
	var rowObj = ctl_getRowObjForRowNo('typeGrid',rowId);
	//是否树形分类
	$("#addIstree").ctl_select({
        id: "addIstree_sel",
        dialogId:'addDiv',
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        selected: [rowObj.istree],
        data:{'1':'是','2':'否'},
    });
	$("#addTypename").val(rowObj.typename);
	
	$("#saveBtn").click(function() {
		var typename = $("#addTypename").val();
		var istree = $("#addIstree_sel").val();
		if($.trim(typename) == ""){
			ctl_showMsg("分类名称不能为空");
			return;
		}
		var ids = ctl_getAllDataIds("typeGrid");
		var sum = 0;
		for ( var i = 0; i < ids.length; i++) {
			var id = ids[i];
			var rowObj1 = ctl_getRowObjForRowNo("typeGrid", id);
			if(typename == rowObj1.typename && id != rowId){
				sum++;
			}
		}
		if(sum > 0){
			ctl_showMsg("分类名称重复");
			return;
		}
		
		var data = {operType:"update",dicttypeid:rowObj.dicttypeid,typename:typename,istree:istree};
		publicAjaxRequest("dicttypeService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('typeGrid');
				ctl_showMsg("修改成功！");
			}else {
				ctl_showMsg("修改失败！");
			}
		});
	});
}

function deleteType(dicttypeid){
	ctl_confirm("您确定要删除吗？",function() {
		var data = {operType:"delete",dicttypeid:dicttypeid};
		publicAjaxRequest("dicttypeService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('typeGrid');
				ctl_showMsg("删除成功！");
			}else if("fail" == rdata){
				ctl_showMsg("删除失败！");
			}
		});
	},function(){});
}

function updateStatus(dicttypeid,status){
	var data = {operType:"updateStatus",dicttypeid:dicttypeid,status:status};
	publicAjaxRequest("dicttypeService",data,jsonType, function(response) {
		var rdata = response.data;
		if("success" == rdata){
			ctl_showMsg("操作成功！");
			ctl_reloadGrid("typeGrid");	
		}else{
			ctl_showMsg("操作失败！");
		}
	});
}