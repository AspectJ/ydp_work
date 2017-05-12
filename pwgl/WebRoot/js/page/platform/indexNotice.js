var config = {toolbar :null,imageUploadUrl:'uploadFileService'};	//编辑框配置
$(function(){
	ctl_initGrid({
		jqGridId:"noticeGrid",
		serviceId:"noticeService",
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		colNames:['通知id','标题','内容','发布时间','有效类型','状态id','状态','操作'],
		colModel:[
		{name:'noticeid',index:'noticeid',hidden:true},
		{name:'title',index:'title'},	
		{name:'contentStr',index:'contentStr',hidden:true},	
		{name:'reltime',index:'reltime'},
		{name:'relplatform',index:'relplatform',hidden:true},
		{name:'status',index:'status'},
		{name:'statusname',index:'statusname'},
		{name:'oper',index:'oper',align:'center'}],
		pager:"noticePager",
		rowNum:30,
		viewrecords:true,
		rowList:[30,50,100],
		gridComplete:function(){
			var ids = ctl_getAllDataIds("noticeGrid");
			var cl = '';
			for ( var i = 0; i < ids.length; i++) {
				cl = ids[i];
				var rowObj = ctl_getRowObjForRowNo("noticeGrid",cl);
				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateNotice('"+cl+"')>修改</a>";
				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteNotice('"+rowObj.noticeid+"')>删除</a>";
				var qy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateStatus('"+rowObj.noticeid+"','1')>启用</a>";
				var jy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateStatus('"+rowObj.noticeid+"','2')>禁用</a>";
				if(rowObj.status == "2"){
					ctl_setCell("noticeGrid", cl, "oper", qy+" | "+xg+" | "+sc);
				}else{
					ctl_setCell("noticeGrid", cl, "oper", jy);
				}
			}
			addAutoSize([{
   				htmlId : "noticeGrid",// 页面中元素的id
   				htmlType : "jqgrid",// 表示为jqgrid
   				widthResize : -25,// 缩放比例后需要调整的宽度
   				heightResize : -40
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
	
	//发布平台
	$("#relplatform").ctl_select({
        id: "relplatform_sel",
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        data:{'':'全部','1':'网点端APP','2':'业务端APP','3':'后台管理'},
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
		addNotice();
	});
	
	//查询
	$("#queryBtn").click(function(){
		var title = $("#title").val();
		var starttime = $("#starttime").val();
		var endtime = $("#endtime").val();
		var relplatform = $("#relplatform_sel").val();
		var status = $("#status_sel").val();
		var data = {operType:"index",title:title,starttime:starttime,endtime:endtime,relplatform:relplatform,status:status};
		ctl_onPagingForConditions("noticeGrid", "noticeService", true, data,jsonType);
	});
});

function addNotice(){
	var dlg = ctl_dialogDivClose('', {
        title: '新增通知',
        content: 'addDiv',
        width: 850
    },
    ['cancelBtn']);
	
	//发布平台
	$("#addRelplatform").ctl_select({
        id: "addRelplatform_sel",
        dialogId:'addDiv',
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        selected:['3'],
        data:{'1':'网点端APP','2':'业务端APP','3':'后台管理'},
    });
	//初始化富文本框
	ctl_initCkEditor('addContent',config);
	ctl_setCkEditorData('addContent',null);
	
	$("#saveBtn").click(function() {
		var relplatform = $("#addRelplatform_sel").val();
		var title = $("#addTitle").val();
		var content = ctl_getCkEditorData("addContent");
		var reltime = $("#addReltime").val();
		if($.trim(title) == ""){
			ctl_showMsg("通知标题不能为空");
			return;
		}
		if($.trim(reltime) == ""){
			ctl_showMsg("发布时间不能为空");
			return;
		}
		if($.trim(content) == ""){
			ctl_showMsg("通知内容不能为空");
			return;
		}
		
		var data = {operType:"add",relplatform:relplatform,title:title,content:"<![CDATA["+content+"]]>",reltime:reltime};
		publicAjaxRequest("noticeService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('noticeGrid');
				ctl_showMsg("新增成功！");
			}else {
				ctl_showMsg("新增失败！");
			}
		});
	});
}

function updateNotice(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改通知',
        content: 'addDiv',
        width: 850
    },
    ['cancelBtn']);
	var rowObj = ctl_getRowObjForRowNo('noticeGrid',rowId);
	
	//发布平台
	$("#addRelplatform").ctl_select({
        id: "addRelplatform_sel",
        dialogId:'addDiv',
        listboxwidth: 0,
        width: 100,
        listboxmaxheight: 300,
        columns: 1,
        selected: [rowObj.relplatform],
        data:{'1':'网点端APP','2':'业务端APP','3':'后台管理'},
    });
	//初始化富文本框
	ctl_initCkEditor('addContent',config);
	ctl_setCkEditorData('addContent',null);
	$("#addTitle").val(rowObj.title);
	$("#addContent").val(rowObj.contentStr);
	$("#addReltime").val(rowObj.reltime);
	
	$("#saveBtn").click(function() {
		var relplatform = $("#addRelplatform_sel").val();
		var title = $("#addTitle").val();
		var content = ctl_getCkEditorData("addContent");
		var reltime = $("#addReltime").val();
		if($.trim(title) == ""){
			ctl_showMsg("通知标题不能为空");
			return;
		}
		if($.trim(reltime) == ""){
			ctl_showMsg("发布时间不能为空");
			return;
		}
		if($.trim(content) == ""){
			ctl_showMsg("通知内容不能为空");
			return;
		}
		
		var data = {operType:"update",noticeid:rowObj.noticeid,title:title,content:"<![CDATA["+content+"]]>",reltime:reltime
				,relplatform:relplatform};
		publicAjaxRequest("noticeService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('noticeGrid');
				ctl_showMsg("修改成功！");
			}else {
				ctl_showMsg("修改失败！");
			}
		});
	});
}

function deleteNotice(noticeid){
	ctl_confirm("您确定要删除吗？",function() {
		var data = {operType:"delete",noticeid:noticeid};
		publicAjaxRequest("noticeService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('noticeGrid');
				ctl_showMsg("删除成功！");
			}else {
				ctl_showMsg("删除失败！");
			}
		});
	},function(){});
}

//发布和停用
function updateStatus(noticeid,status){
	var data = {operType:"updateStatus",noticeid:noticeid,status:status};
	publicAjaxRequest("noticeService",data,jsonType, function(response) {
		var rdata = response.data;
		if("success" == rdata){
			ctl_showMsg("操作成功！");
			ctl_reloadGrid("noticeGrid");						
		}else{
			ctl_showMsg("操作失败！");
		}
	});
}