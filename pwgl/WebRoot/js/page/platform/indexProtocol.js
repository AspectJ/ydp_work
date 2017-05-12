var config = {toolbar :null,imageUploadUrl:'uploadFileService'};	//编辑框配置
$(function(){
	ctl_initGrid({
		jqGridId:"protocolGrid",
		serviceId:"protocolService",
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		colNames:['协议id','标题','使用场景id','使用场景','内容','操作'],
		colModel:[
		{name:'proid',index:'proid',hidden:true},
		{name:'title',index:'title'},	
		{name:'scene',index:'scene',hidden:true},	
		{name:'scenename',index:'scenename'},
		{name:'contentStr',index:'contentStr',hidden:true},
		{name:'oper',index:'oper',align:'center'}],
		pager:"protocolPager",
		rowNum:30,
		viewrecords:true,
		rowList:[30,50,100],
		gridComplete:function(){
			var ids = ctl_getAllDataIds("protocolGrid");
			var cl = '';
			for ( var i = 0; i < ids.length; i++) {
				cl = ids[i];
				var rowObj = ctl_getRowObjForRowNo("protocolGrid",cl);
				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateProtocol(\""+cl+"\")>修改</a>";
				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteProtocol(\""+rowObj.mzsmid+"\")>删除</a>";
				var ck = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=seeProtocol(\""+cl+"\")>内容</a>";
				ctl_setCell("protocolGrid", cl, "oper", xg+" | "+sc+" | "+ck);
			}
			addAutoSize([{
   				htmlId : "protocolGrid",// 页面中元素的id
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
		}	
	});
	
	//有效类型
	$("#scene").ctl_select({
        id: "scene_sel",
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        data:{'':'全部','1':'网点端App注册','2':'网点端合作协议','3':'业务员端注册协议'},
    });
	
	//增加
	$("#addBtn").click(function(){
		addProtocol();
	});
	
	//查询
	$("#queryBtn").click(function(){
		var title = $("#title").val();
		var scene = $("#scene_sel").val();
		var data = {operType:"index",title:title,scene:scene};
		ctl_onPagingForConditions("protocolGrid", "protocolService", true, data,jsonType);
	});
});

function addProtocol(){
	var dlg = ctl_dialogDivClose('', {
        title: '新增协议',
        content: 'addDiv',
        width: 600
    },
    ['cancelBtn']);
	
	//有效类型
	$("#addScene").ctl_select({
        id: "addScene_sel",
        dialogId:'addDiv',
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        selected: ['1'],
        data:{'1':'网点端App注册','2':'网点端合作协议','3':'业务员端注册协议'},
    });
	//初始化富文本框
	ctl_initCkEditor('addContent',config);
	ctl_setCkEditorData('addContent',null);
	
	$("#saveBtn").click(function() {
		var title = $("#addTitle").val();
		var scene = $("#addScene_sel").val();
		var content = ctl_getCkEditorData("addContent");
		if($.trim(title) == ""){
			ctl_showMsg("标题不能为空");
			return;
		}
		if($.trim(scene) == ""){
			ctl_showMsg("使用场景不能为空");
			return;
		}
		if($.trim(content) == ""){
			ctl_showMsg("内容不能为空");
			return;
		}
		
		var data = {operType:"add",title:title,scene:scene,content:"<![CDATA["+content+"]]>"};
		publicAjaxRequest("protocolService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('protocolGrid');
				ctl_showMsg("新增成功！");
			}else {
				ctl_showMsg("新增失败！");
			}
		});
	});
}

function updateProtocol(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改协议',
        content: 'addDiv',
        width: 600
    },
    ['cancelBtn']);
	var rowObj = ctl_getRowObjForRowNo('protocolGrid',rowId);
	
	//有效类型
	$("#addScene").ctl_select({
        id: "addScene_sel",
        dialogId:'addDiv',
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        selected: [rowObj.scene],
        data:{'1':'网点端App注册','2':'网点端合作协议','3':'业务员端注册协议'},
    });
	//初始化富文本框
	ctl_initCkEditor('addContent',config);
	ctl_setCkEditorData('addContent',null);
	$("#addTitle").val(rowObj.title);
	$("#addContent").val(rowObj.contentStr);
	
	$("#saveBtn").click(function() {
		var title = $("#addTitle").val();
		var scene = $("#addScene_sel").val();
		var content = ctl_getCkEditorData("addContent");
		if($.trim(title) == ""){
			ctl_showMsg("标题不能为空");
			return;
		}
		if($.trim(scene) == ""){
			ctl_showMsg("使用场景不能为空");
			return;
		}
		if($.trim(content) == ""){
			ctl_showMsg("内容不能为空");
			return;
		}
		
		var data = {operType:"update",proid:rowObj.proid,title:title,scene:scene,content:"<![CDATA["+content+"]]>"};
		publicAjaxRequest("protocolService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('protocolGrid');
				ctl_showMsg("修改成功！");
			}else {
				ctl_showMsg("修改失败！");
			}
		});
	});
}

function deleteProtocol(proid){
	ctl_confirm("您确定要删除吗？",function() {
		var data = {operType:"delete",proid:proid};
		publicAjaxRequest("protocolService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('protocolGrid');
				ctl_showMsg("删除成功！");
			}else {
				ctl_showMsg("删除失败！");
			}
		});
	},function(){});
}

function seeProtocol(rowId){
	ctl_dialogDivClose('', {
        title: '协议内容',
        content: 'seeDiv',
        width:400,
        height:300
    });
	var rowObj = ctl_getRowObjForRowNo('protocolGrid',rowId);
	$("#contentDiv").html(rowObj.contentStr);
}