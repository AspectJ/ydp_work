var dicttypeid = "";
$(function(){
	ctl_initGrid({
		jqGridId:"dicttreeGrid",
		serviceId:"dicttreeService",
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		colNames:['代码id','值','分类id','分类','父代码id','父代码值','排序号','说明','状态id','状态','操作'],
		colModel:[
		{name:'treeid',index:'treeid',width:40},
		{name:'dvalue',index:'dvalue',width:40},
		{name:'dicttypeid',index:'dicttypeid',width:40,hidden:true},
		{name:'typename',index:'typename',width:40},
		{name:'ftreeid',index:'ftreeid',width:40},
		{name:'fdvalue',index:'fdvalue',width:40},
		{name:'pxh',index:'pxh',width:40},
		{name:'des',index:'des',width:40},
		{name:'status',index:'status',width:80,hidden:true},
		{name:'statusname',index:'statusname',width:40},
		{name:'oper',index:'oper',width:60,align:'center'}],
		pager:"dicttreePager",
		rowNum:30,
		viewrecords:true,
		rowList:[30,50,100],
		gridComplete:function(){
			var ids = ctl_getAllDataIds("dicttreeGrid");
			var cl = '';
			for ( var i = 0; i < ids.length; i++) {
				cl = ids[i];
				var rowObj = ctl_getRowObjForRowNo("dicttreeGrid",cl);
				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateDicttree('"+cl+"')>修改</a>";
				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteDicttree('"+rowObj.treeid+"')>删除</a>";
				var jy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateStatus('"+rowObj.treeid+"','2')>禁用</a>";
				var qy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateStatus('"+rowObj.treeid+"','1')>启用</a>";
				if(rowObj.status == "1"){
					ctl_setCell("dicttreeGrid", cl, "oper", jy);
				}else{
					ctl_setCell("dicttreeGrid", cl, "oper", qy+" | "+xg+" | "+sc);
				}
			}
			addAutoSize([{
   				htmlId : "dicttreeGrid",// 页面中元素的id
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
		addDicttree();
	});
	
	//查询
	$("#queryBtn").click(function(){
		var dvalue = $("#dvalue").val();
		var typename = $("#typename").val();
		var status = $("#status_sel").val();
		var data = {operType:"index",dvalue:dvalue,typename:typename,status:status};
		ctl_onPagingForConditions("dicttreeGrid", "dicttreeService", true, data,jsonType);
	});
});

function addDicttree(){
	var dlg = ctl_dialogDivClose('', {
        title: '新增树形代码',
        content: 'addDiv',
    },
    ['cancelBtn']);
	//父代码
	$('#addFdvalue').ctl_select({
		id:"addFdvalue_sel",
		listboxwidth:0,
		width:115,
		columns:1,
		listboxalign:'auto',
		listboxmaxheight:80,
		disabled:false,
		columnValue:'treeid',
		columnName:'dvalue',
		selectedIndex:'0',
		disableDefaultText:true,
	    dialogId: "addDiv",
		url:springMvcUrl,
		param:{
			 param:getParam("dicttreeService"),
		     data: "{operType:'selectFatherDicttree'}"
		},
		type:'post',
		dataType:'json',
		onsyncomplete: function(name, selectValue) {
        	if(selectValue == "" || selectValue == "ROOT"){
        		$("#addTypenameSel").show();
        		$("#addTypenameInput").hide();
        	}else{
        		$("#addTypenameSel").hide();
        		$("#addTypenameInput").show();
        		query(selectValue);
        	}
        },
        onchange: function(name, value) {
        	if(value == "" || value == "ROOT"){
        		$("#addTypenameSel").show();
        		$("#addTypenameInput").hide();
        	}else{
        		$("#addTypenameSel").hide();
        		$("#addTypenameInput").show();
        		query(value);
        	}
        }
	});
	//代码分类
	$('#addTypenameSel').ctl_select({
		id:"addTypenameSel_sel",
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
			 param:getParam("dicttreeService"),
		     data: "{operType:'selectDicttype'}"
		},
		type:'post',
		dataType:'json',
		onsyncomplete: function(name, selectValue) {
			dicttypeid = selectValue;
        },
        onchange: function(name, value) {
        	dicttypeid = value;
        }
	});
	
	$("#saveBtn").click(function() {
		var ftreeid = $("#addFdvalue_sel").val();
		var treeid = $("#addTreeid").val();
		var dvalue = $("#addDvalue").val();
		var pxh = $("#addPxh").val();
		var des = $("#addDes").val();
		if($.trim(treeid) == ""){
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
		if(ftreeid == ""){
			ftreeid = "ROOT";
		}
		
		var data = {operType:"add",treeid:treeid,dicttypeid:dicttypeid,ftreeid:ftreeid,dvalue:dvalue,pxh:pxh,des:des};
		publicAjaxRequest("dicttreeService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('dicttreeGrid');
				ctl_showMsg("新增成功！");
			}else if("repeat" == rdata){
				ctl_showMsg("代码id重复！");
			}else if("fail" == rdata){
				ctl_showMsg("新增失败！");
			}else{
				ctl_showMsg(rdata);
			}
		});
	});
}

function updateDicttree(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改树形代码',
        content: 'addDiv',
    },
    ['cancelBtn']);
	var rowObj = ctl_getRowObjForRowNo('dicttreeGrid',rowId);
	dicttypeid = rowObj.dicttypeid;
	$("#addTypenameSel").hide();
	$("#addFdvalue").hide();
	$("#addTypenameInput").show();
	$("#addFdvalueInput").show();
	$("#addFdvalueInput").val(rowObj.fdvalue);
	$("#addTypenameInput").val(rowObj.typename);
	$("#addTreeid").val(rowObj.treeid);
	$("#addDvalue").val(rowObj.dvalue);
	$("#addPxh").val(rowObj.pxh);
	$("#addDes").val(rowObj.des);
	
	$("#saveBtn").click(function() {
		var treeid = $("#addTreeid").val();
		var dvalue = $("#addDvalue").val();
		var pxh = $("#addPxh").val();
		var des = $("#addDes").val();
		if($.trim(treeid) == ""){
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
		var ids = ctl_getAllDataIds("dicttreeGrid");
		var sum = 0;
		for ( var i = 0; i < ids.length; i++) {
			var id = ids[i];
			var rowObj1 = ctl_getRowObjForRowNo("dicttreeGrid", id);
			if(treeid == rowObj1.treeid && id != rowId){
				sum++;
			}
		}
		if(sum > 0){
			ctl_showMsg("代码id重复");
			return;
		}
		
		var data = {operType:"update",ytreeid:rowObj.treeid,treeid:treeid,dicttypeid:dicttypeid,dvalue:dvalue,pxh:pxh,des:des};
		publicAjaxRequest("dicttreeService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('dicttreeGrid');
				ctl_showMsg("修改成功！");
			}else if("fail" == rdata){
				ctl_showMsg("修改失败！");
			}else{
				ctl_showMsg(rdata);
			}
		});
	});
}

function deleteDicttree(treeid){
	ctl_confirm("您确定要删除吗？",function() {
		var data = {operType:"delete",treeid:treeid};
		publicAjaxRequest("dicttreeService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('dicttreeGrid');
				ctl_showMsg("删除成功！");
			}else if("fail" == rdata){
				ctl_showMsg("删除失败！");
			}
		});
	},function(){});
}

function updateStatus(treeid,status){
	var data = {operType:"updateStatus",treeid:treeid,status:status};
	publicAjaxRequest("dicttreeService",data,jsonType, function(response) {
		var rdata = response.data;
		if("success" == rdata){
			ctl_showMsg("操作成功！");
			ctl_reloadGrid("dicttreeGrid");	
		}else{
			ctl_showMsg("操作失败！");
		}
	});
}

function query(treeid){
	var data = {operType:"selectTypeByTreeid",treeid:treeid};
	publicAjaxRequest("dicttreeService",data,jsonType, function(response) {
		var rdata = response.data[0];
		dicttypeid = rdata.dicttypeid;
		$("#addTypenameInput").val(rdata.typename);
	});
}