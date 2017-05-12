$(function(){
	ctl_initGrid({
		jqGridId:"dictGrid",
		serviceId:"dictService",
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		colNames:['代码id','值','分类id','分类','排序号','说明','状态id','状态','操作'],
		colModel:[
		{name:'dictid',index:'dictid',width:40},
		{name:'dvalue',index:'dvalue',width:40},
		{name:'dicttypeid',index:'dicttypeid',width:40,hidden:true},
		{name:'typename',index:'typename',width:40},
		{name:'pxh',index:'pxh',width:40},
		{name:'des',index:'des',width:40},
		{name:'status',index:'status',width:80,hidden:true},
		{name:'statusname',index:'statusname',width:40},
		{name:'oper',index:'oper',width:60,align:'center'}],
		pager:"dictPager",
		rowNum:30,
		viewrecords:true,
		rowList:[30,50,100],
		gridComplete:function(){
			var ids = ctl_getAllDataIds("dictGrid");
			var cl = '';
			for ( var i = 0; i < ids.length; i++) {
				cl = ids[i];
				var rowObj = ctl_getRowObjForRowNo("dictGrid",cl);
				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateDict('"+cl+"')>修改</a>";
				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteDict('"+rowObj.dictid+"')>删除</a>";
				var jy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateStatus('"+rowObj.dictid+"','2')>禁用</a>";
				var qy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateStatus('"+rowObj.dictid+"','1')>启用</a>";
				if(rowObj.status == "1"){
					ctl_setCell("dictGrid", cl, "oper", jy);
				}else{
					ctl_setCell("dictGrid", cl, "oper", qy+" | "+xg+" | "+sc);
				}
			}
			addAutoSize([{
   				htmlId : "dictGrid",// 页面中元素的id
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
		addDict();
	});
	
	//查询
	$("#queryBtn").click(function(){
		var dvalue = $("#dvalue").val();
		var typename = $("#typename").val();
		var status = $("#status_sel").val();
		var data = {operType:"index",dvalue:dvalue,typename:typename,status:status};
		ctl_onPagingForConditions("dictGrid", "dictService", true, data,jsonType);
	});
});

function addDict(){
	var dlg = ctl_dialogDivClose('', {
        title: '新增普通代码',
        content: 'addDiv',
    },
    ['cancelBtn']);
	//代码分类
	$('#addTypename').ctl_select({
		id:"addTypename_sel",
		listboxwidth:0,
		width:115,
		columns:1,
		listboxalign:'auto',
		listboxmaxheight:80,
		disabled:false,
		columnValue:'dicttypeid',
		columnName:'typename',
		selectedIndex:'0',
		disableDefaultText:true,
	    dialogId: "addDiv",
		url:springMvcUrl,
		param:{
			 param:getParam("dictService"),
		     data: "{operType:'selectDicttype'}"
		},
		type:'post',
		dataType:'json',
	});
	
	$("#saveBtn").click(function() {
		var dicttypeid = $("#addTypename_sel").val();
		var dictid = $("#addDictid").val();
		var dvalue = $("#addDvalue").val();
		var pxh = $("#addPxh").val();
		var des = $("#addDes").val();
		if($.trim(dictid) == ""){
			ctl_showMsg("代码id不能为空");
			return;
		}
		if($.trim(dvalue) == ""){
			ctl_showMsg("值不能为空");
			return;
		}
		if($.trim(pxh) == ""){
			ctl_showMsg("排序号不能为空");
			return;
		}
		if($.trim(des) == ""){
			ctl_showMsg("说明不能为空");
			return;
		}
		
		var data = {operType:"add",dictid:dictid,dicttypeid:dicttypeid,dvalue:dvalue,pxh:pxh,des:des};
		publicAjaxRequest("dictService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('dictGrid');
				ctl_showMsg("新增成功！");
			}else if("repeat" == rdata){
				ctl_showMsg("代码id重复！");
			}else if("fail" == rdata) {
				ctl_showMsg("新增失败！");
			}else{
				ctl_showMsg(rdata);
			}
		});
	});
}

function updateDict(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改普通代码',
        content: 'addDiv',
    },
    ['cancelBtn']);
	var rowObj = ctl_getRowObjForRowNo('dictGrid',rowId);
	//是否树形分类
	$('#addTypename').ctl_select({
		id:"addTypename_sel",
		listboxwidth:0,
		width:115,
		columns:1,
		listboxalign:'auto',
		listboxmaxheight:80,
		disabled:false,
		columnValue:'dicttypeid',
		columnName:'typename',
		selected:[rowObj.dicttypeid],
	    dialogId: "addDiv",
		url:springMvcUrl,
		param:{
			 param:getParam("dictService"),
		     data: "{operType:'selectDicttype'}"
		},
		type:'post',
		dataType:'json',
	});
	$("#addDictid").val(rowObj.dictid);
	$("#addDvalue").val(rowObj.dvalue);
	$("#addPxh").val(rowObj.pxh);
	$("#addDes").val(rowObj.des);
	
	$("#saveBtn").click(function() {
		var dicttypeid = $("#addTypename_sel").val();
		var dictid = $("#addDictid").val();
		var dvalue = $("#addDvalue").val();
		var pxh = $("#addPxh").val();
		var des = $("#addDes").val();
		if($.trim(dictid) == ""){
			ctl_showMsg("代码id不能为空");
			return;
		}
		if($.trim(dvalue) == ""){
			ctl_showMsg("值不能为空");
			return;
		}
		if($.trim(pxh) == ""){
			ctl_showMsg("排序号不能为空");
			return;
		}
		if($.trim(des) == ""){
			ctl_showMsg("说明不能为空");
			return;
		}
		var ids = ctl_getAllDataIds("dictGrid");
		var sum = 0;
		for ( var i = 0; i < ids.length; i++) {
			var id = ids[i];
			var rowObj1 = ctl_getRowObjForRowNo("dictGrid", id);
			if(dictid == rowObj1.dictid && id != rowId){
				sum++;
			}
		}
		if(sum > 0){
			ctl_showMsg("代码id重复");
			return;
		}
		
		var data = {operType:"update",ydictid:rowObj.dictid,dictid:dictid,dicttypeid:dicttypeid,dvalue:dvalue,pxh:pxh,des:des};
		publicAjaxRequest("dictService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('dictGrid');
				ctl_showMsg("修改成功！");
			}else {
				ctl_showMsg("修改失败！");
			}
		});
	});
}

function deleteDict(dictid){
	ctl_confirm("您确定要删除吗？",function() {
		var data = {operType:"delete",dictid:dictid};
		publicAjaxRequest("dictService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('dictGrid');
				ctl_showMsg("删除成功！");
			}else if("fail" == rdata){
				ctl_showMsg("删除失败！");
			}
		});
	},function(){});
}

function updateStatus(dictid,status){
	var data = {operType:"updateStatus",dictid:dictid,status:status};
	publicAjaxRequest("dictService",data,jsonType, function(response) {
		var rdata = response.data;
		if("success" == rdata){
			ctl_showMsg("操作成功！");
			ctl_reloadGrid("dictGrid");	
		}else{
			ctl_showMsg("操作失败！");
		}
	});
}