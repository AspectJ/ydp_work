$(function(){
	ctl_initGrid({
		jqGridId:"serviceGrid",
		serviceId:"serviceService",
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		colNames:['服务id','服务域','服务类型','服务号','操作类型','服务url','数据格式','是否远程代码','是否远程','调用次数','服务说明','操作'],
		colModel:[
		{name:'sid',index:'sid',hidden:true},
		{name:'domain',index:'domain',width:40},
		{name:'type',index:'type',width:40},
		{name:'serviceid',index:'serviceid',width:40},	
		{name:'opertype',index:'opertype',width:40},	
		{name:'surl',index:'surl',width:40},
		{name:'dataformat',index:'dataformat',width:40,hidden:true},
		{name:'isremote',index:'isremote',width:40,hidden:true},
		{name:'isremotename',index:'isremotename',width:40},
		{name:'times',index:'times',width:40,hidden:true},
		{name:'des',index:'des',width:40},
		{name:'oper',index:'oper',width:80,align:'center'}],
		pager:"servicePager",
		rowNum:30,
		viewrecords:true,
		rowList:[30,50,100],
		gridComplete:function(){
			var ids = ctl_getAllDataIds("serviceGrid");
			var cl = '';
			for ( var i = 0; i < ids.length; i++) {
				cl = ids[i];
				var rowObj = ctl_getRowObjForRowNo("serviceGrid",cl);
				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateService('"+cl+"')>修改</a>";
				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteService('"+rowObj.sid+"')>删除</a>";
				ctl_setCell("serviceGrid", cl, "oper", xg+" | "+sc);
			}
			addAutoSize([{
   				htmlId : "serviceGrid",// 页面中元素的id
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
	
	//增加
	$("#addBtn").click(function(){
		addService();
	});
	
	//查询
	$("#queryBtn").click(function(){
		var serviceid = $("#serviceid").val();
		var opertype = $("#opertype").val();
		var data = {operType:"index",serviceid:serviceid,opertype:opertype};
		ctl_onPagingForConditions("serviceGrid", "serviceService", true, data,jsonType);
	});
});

//新增
function addService(){
	var dlg = ctl_dialogDivClose('', {
        title: '新增服务',
        content: 'addDiv',
    },
    ['cancelBtn']);
	
	//数据格式
	$("#addDataformat").ctl_select({
        id: "addDataformat_sel",
        dialogId:'addDiv',
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        selected:['1'],
        data:{'1':'json','2':'xml'},
    });
	//是否远程
	$("#addIsremote").ctl_select({
        id: "addIsremote_sel",
        dialogId:'addDiv',
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        selected:['1'],
        data:{'1':'是','2':'否'},
    });
	$("#saveBtn").click(function() {
		var domain = $("#addDomain").val();
		var type = $("#addType").val();
		var surl = $("#addSurl").val();
		var serviceid = $("#addServiceid").val();
		var opertype = $("#addOpertype").val();
		var dataformat = $("#addDataformat_sel").val();
		var isremote = $("#addIsremote_sel").val();
		var des = $("#addDes").val();
		
		if($.trim(serviceid) == ""){
			ctl_showMsg("服务号不能为空");
			return;
		}
		if($.trim(opertype) == ""){
			ctl_showMsg("操作类型不能为空");
			return;
		}
		
		var data = {operType:"add",domain:domain,type:type,serviceid:serviceid,opertype:opertype,isremote:isremote,surl:surl
				,dataformat:dataformat,des:des};
		publicAjaxRequest("serviceService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('serviceGrid');
				ctl_showMsg("新增成功！");
			}else if("repeat" == rdata){
				ctl_showMsg("此服务已存在！");
			}else {
				ctl_showMsg("新增失败！");
			}
		});
	});
}

function updateService(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改服务',
        content: 'addDiv',
    },
    ['cancelBtn']);
	
	var rowObj = ctl_getRowObjForRowNo('serviceGrid',rowId);
	//数据格式
	$("#addDataformat").ctl_select({
        id: "addDataformat_sel",
        dialogId:'addDiv',
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        selected: [rowObj.dataformat],
        data:{'1':'json','2':'xml'},
    });
	//是否远程
	$("#addIsremote").ctl_select({
        id: "addIsremote_sel",
        dialogId:'addDiv',
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        selected: [rowObj.isremote],
        data:{'1':'是','2':'否'},
    });
	$("#addDomain").val(rowObj.domain);
	$("#addType").val(rowObj.type);
	$("#addServiceid").val(rowObj.serviceid);
	$("#addOpertype").val(rowObj.opertype);
	$("#addSurl").val(rowObj.surl);
	$("#addDes").val(rowObj.des);
	
	$("#saveBtn").click(function() {
		var domain = $("#addDomain").val();
		var type = $("#addType").val();
		var surl = $("#addSurl").val();
		var serviceid = $("#addServiceid").val();
		var opertype = $("#addOpertype").val();
		var dataformat = $("#addDataformat_sel").val();
		var isremote = $("#addIsremote_sel").val();
		var des = $("#addDes").val();
		
		if($.trim(serviceid) == ""){
			ctl_showMsg("服务号不能为空");
			return;
		}
		if($.trim(opertype) == ""){
			ctl_showMsg("操作类型不能为空");
			return;
		}
		var ids = ctl_getAllDataIds("serviceGrid");
		var sum = 0;
		for ( var i = 0; i < ids.length; i++) {
			var id = ids[i];
			var rowObj1 = ctl_getRowObjForRowNo("serviceGrid", id);
			if(serviceid == rowObj1.serviceid && opertype == rowObj1.opertype && id != rowId){
				sum++;
			}
		}
		if(sum > 0){
			ctl_showMsg("此服务已存在！");
			return;
		}
		
		var data = {operType:"update",sid:rowObj.sid,type:type,serviceid:serviceid,opertype:opertype,domain:domain,
				isremote:isremote,surl:surl,dataformat:dataformat,des:des};
		publicAjaxRequest("serviceService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('serviceGrid');
				ctl_showMsg("修改成功！");
			}else {
				ctl_showMsg("修改失败！");
			}
		});
	});
}

function deleteService(sid){
	ctl_confirm("您确定要删除吗？",function() {
		var data = {operType:"delete",sid:sid};
		publicAjaxRequest("serviceService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('serviceGrid');
				ctl_showMsg("删除成功！");
			}else {
				ctl_showMsg("删除失败！");
			}
		});
	},function(){});
}
