$(function(){
	ctl_initGrid({
		jqGridId:"interfaceGrid",
		serviceId:"interfaceService",
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		colNames:['接口id','接口域','接口类型','服务号','操作类型','服务url','数据格式','是否远程代码','是否远程','调用次数','服务说明','入参格式例子','结果格式例子','参数管理','操作'],
		colModel:[
		{name:'interid',index:'interid',hidden:true},
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
		{name:'inexample',index:'inexample',width:40},
		{name:'outexample',index:'outexample',width:40},
		{name:'param',index:'param',width:40,align:'center'},
		{name:'oper',index:'oper',width:80,align:'center'}],
		pager:"interfacePager",
		rowNum:30,
		viewrecords:true,
		rowList:[30,50,100],
		gridComplete:function(){
			var ids = ctl_getAllDataIds("interfaceGrid");
			var cl = '';
			for ( var i = 0; i < ids.length; i++) {
				cl = ids[i];
				var rowObj = ctl_getRowObjForRowNo("interfaceGrid",cl);
				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateInterface('"+cl+"')>修改</a>";
				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteInterface('"+rowObj.interid+"')>删除</a>";
				var cs = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=testInterface('"+cl+"')>测试</a>";
				ctl_setCell("interfaceGrid", cl, "oper", xg+" | "+sc+" | "+cs);
				var csgl = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=paramManage('"+rowObj.interid+"')>参数管理</a>";
				ctl_setCell("interfaceGrid", cl, "param", csgl);
			}
			addAutoSize([{
   				htmlId : "interfaceGrid",// 页面中元素的id
   				htmlType : "jqgrid",// 表示为jqgrid
   		        widthResize: -20,
                heightResize: -15
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
		addInterface();
	});
	
	//查询
	$("#queryBtn").click(function(){
		var serviceid = $("#serviceid").val();
		var opertype = $("#opertype").val();
		var data = {operType:"index",serviceid:serviceid,opertype:opertype};
		ctl_onPagingForConditions("interfaceGrid", "interfaceService", true, data,jsonType);
	});
});

//新增
function addInterface(){
	var dlg = ctl_dialogDivClose('', {
        title: '新增接口',
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
		publicAjaxRequest("interfaceService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('interfaceGrid');
				ctl_showMsg("新增成功！");
			}else if("repeat" == rdata){
				ctl_showMsg("此接口已存在！");
			}else {
				ctl_showMsg("新增失败！");
			}
		});
	});
}

function updateInterface(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改接口',
        content: 'addDiv',
    },
    ['cancelBtn']);
	
	var rowObj = ctl_getRowObjForRowNo('interfaceGrid',rowId);
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
		var ids = ctl_getAllDataIds("interfaceGrid");
		var sum = 0;
		for ( var i = 0; i < ids.length; i++) {
			var id = ids[i];
			var rowObj1 = ctl_getRowObjForRowNo("interfaceGrid", id);
			if(serviceid == rowObj1.serviceid && opertype == rowObj1.opertype && id != rowId){
				sum++;
			}
		}
		if(sum > 0){
			ctl_showMsg("此接口已存在！");
			return;
		}
		
		var data = {operType:"update",interid:rowObj.interid,type:type,serviceid:serviceid,opertype:opertype,domain:domain,
				isremote:isremote,surl:surl,dataformat:dataformat,des:des};
		publicAjaxRequest("interfaceService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('interfaceGrid');
				ctl_showMsg("修改成功！");
			}else {
				ctl_showMsg("修改失败！");
			}
		});
	});
}

function deleteInterface(interid){
	ctl_confirm("您确定要删除吗？",function() {
		var data = {operType:"delete",interid:interid};
		publicAjaxRequest("interfaceService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('interfaceGrid');
				ctl_showMsg("删除成功！");
			}else {
				ctl_showMsg("删除失败！");
			}
		});
	},function(){});
}

//参数管理
function paramManage(interid){
	ctl_dialogDivClose('', {
        title: '参数管理',
        content: 'paramDiv',
    });
	
	ctl_initGrid({
		jqGridId:"paramGrid",
		serviceId:"interfaceService",
		requestDataXml:{operType:"selectParam",interid:interid},
		singleRowData:true,
		dataFormat:jsonType,
		width:600,
		height:300,
		colNames:['参数id','参数key','参数类型代码','参数类型','接口id','说明','排序号','操作'],
		colModel:[
		{name:'paramid',index:'paramid',hidden:true},
		{name:'pkey',index:'pkey',width:40},
		{name:'ptype',index:'ptype',width:40,hidden:true},
		{name:'ptypename',index:'ptypename',width:40},
		{name:'interid',index:'interid',width:40,hidden:true},
		{name:'pdesc',index:'pdesc',width:40},
		{name:'pxh',index:'pxh',width:40},
		{name:'oper',index:'oper',width:80,align:'center'}],
		pager:"paramPager",
		rowNum:30,
		viewrecords:true,
		rowList:[30,50,100],
		gridComplete:function(){
			var ids = ctl_getAllDataIds("paramGrid");
			var cl = '';
			for ( var i = 0; i < ids.length; i++) {
				cl = ids[i];
				var rowObj = ctl_getRowObjForRowNo("paramGrid",cl);
				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateParam('"+cl+"')>修改</a>";
				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteParam('"+rowObj.paramid+"')>删除</a>";
				ctl_setCell("paramGrid", cl, "oper", xg+" | "+sc);
			}
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
	$("#addParamBtn").click(function(){
		addParam(interid);
	});
}

//新增
function addParam(interid){
	var dlg = ctl_dialogDivClose('', {
        title: '新增接口参数',
        content: 'addParamDiv',
    },
    ['paramCancelBtn']);
	
	//参数类型
	$("#addPtype").ctl_select({
        id: "addPtype_sel",
        dialogId:'addParamDiv',
        listboxwidth: 0,
        width: 205,
        listboxmaxheight: 300,
        columns: 1,
        selected:['1'],
        data:{'1':'字符型','2':'数字型','3':'布尔型','4':'日期型'},
    });
	$("#paramSaveBtn").click(function() {
		var pkey = $("#addPkey").val();
		var ptype = $("#addPtype_sel").val();
		var pxh = $("#addPxh").val();
		var pdesc = $("#addPdesc").val();
		if($.trim(pkey) == ""){
			ctl_showMsg("参数key不能为空");
			return;
		}
		if($.trim(ptype) == ""){
			ctl_showMsg("参数类型不能为空");
			return;
		}
		
		var data = {operType:"addParam",interid:interid,pkey:pkey,ptype:ptype,pxh:pxh,pdesc:pdesc};
		publicAjaxRequest("interfaceService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('paramGrid');
				ctl_showMsg("新增成功！");
			}else if("repeat" == rdata){
				ctl_showMsg("此参数已存在！");
			}else {
				ctl_showMsg("新增失败！");
			}
		});
	});
}

function updateParam(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改接口参数',
        content: 'addParamDiv',
    },
    ['paramCancelBtn']);
	var rowObj = ctl_getRowObjForRowNo('paramGrid',rowId);
	//参数类型
	$("#addPtype").ctl_select({
        id: "addPtype_sel",
        dialogId:'addParamDiv',
        listboxwidth: 0,
        width: 205,
        listboxmaxheight: 300,
        columns: 1,
        selected: [rowObj.ptype],
        data:{'1':'字符型','2':'数字型','3':'布尔型','4':'日期型'},
    });
	$("#addPkey").val(rowObj.pkey);
	$("#addPxh").val(rowObj.pxh);
	$("#addPdesc").val(rowObj.pdesc);
	
	$("#paramSaveBtn").click(function() {
		var pkey = $("#addPkey").val();
		var ptype = $("#addPtype_sel").val();
		var pxh = $("#addPxh").val();
		var pdesc = $("#addPdesc").val();
		if($.trim(pkey) == ""){
			ctl_showMsg("参数key不能为空");
			return;
		}
		if($.trim(ptype) == ""){
			ctl_showMsg("参数类型不能为空");
			return;
		}
		var ids = ctl_getAllDataIds("paramGrid");
		var sum = 0;
		for ( var i = 0; i < ids.length; i++) {
			var id = ids[i];
			var rowObj1 = ctl_getRowObjForRowNo("paramGrid", id);
			if(pkey == rowObj1.pkey && ptype == rowObj1.ptype && id != rowId){
				sum++;
			}
		}
		if(sum > 0){
			ctl_showMsg("此参数已存在！");
			return;
		}
		
		var data = {operType:"updateParam",paramid:rowObj.paramid,pkey:pkey,ptype:ptype,pxh:pxh,pdesc:pdesc};
		publicAjaxRequest("interfaceService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('paramGrid');
				ctl_showMsg("修改成功！");
			}else {
				ctl_showMsg("修改失败！");
			}
		});
	});
}

function deleteParam(paramid){
	ctl_confirm("您确定要删除吗？",function() {
		var data = {operType:"deleteParam",paramid:paramid};
		publicAjaxRequest("interfaceService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('paramGrid');
				ctl_showMsg("删除成功！");
			}else {
				ctl_showMsg("删除失败！");
			}
		});
	},function(){});
}

//接口测试
function testInterface(rowId){
	ctl_dialogDivClose('', {
        title: '接口测试',
        content: 'testDiv',
    });
	var jkRowObj = ctl_getRowObjForRowNo("interfaceGrid",rowId);
	
	ctl_initGrid({
		jqGridId:"testGrid",
		serviceId:"interfaceService",
		requestDataXml:{operType:"selectParam",interid:jkRowObj.interid},
		singleRowData:true,
		dataFormat:jsonType,
		width:600,
		height:300,
		colNames:['参数id','参数key','参数值','参数类型','说明'],
		colModel:[
		{name:'paramid',index:'paramid',hidden:true},
		{name:'pkey',index:'pkey',width:40},
		{name:'pvalue',index:'pvalue',width:40,editable:true},
		{name:'ptype',index:'ptype',width:40},
		{name:'pdesc',index:'pdesc',width:40}],
		pager:"jkcsPager",
		rowNum:30,
		viewrecords:true,
		rowList:[30,50,100],
		gridComplete:function(){
			var ids = ctl_getAllDataIds("testGrid");
			var cl = '';
			for ( var i = 0; i < ids.length; i++) {
				cl = ids[i];
				intoEditRow("testGrid", cl);
			}
		},
		jsonReader:{
			root:"data",
			total:"totalPage",
			page:"page",
			records:"totalSize",
			repeatitems:false
		}	
	});
	
	$("#testBtn").click(function(){
		var data = {operType:jkRowObj.opertype};
		var ids = ctl_getAllDataIds("testGrid");
		var cl = '';
		for ( var i = 0; i < ids.length; i++) {
			cl = ids[i];
			var rowObj = ctl_getRowObjForRowNo("testGrid",cl);
			var pkey = rowObj.pkey;
			var pvalue = $("#"+cl+"_pvalue").val();
			if($.trim(pkey) == ""){
				continue;
			}
			if($.trim(pvalue) == ""){
				continue;
			}
			data[pkey] = pvalue;
		}
		var inexample = JSON.stringify(data);
		publicAjaxRequest(jkRowObj.serviceid,data,jsonType, function(response) {
			var rdata = response.data;
			var outexample = JSON.stringify(rdata);
			alert(outexample);
			if("success" == rdata.sf){
				var data = {operType:"update",interid:jkRowObj.interid,inexample:inexample,outexample:outexample};
				publicAjaxRequest("interfaceService",data,jsonType, function(response) {
					var rdata = response.data;
					if("success" == rdata){
						ctl_reloadGrid('interfaceGrid');
//						ctl_showMsg("操作成功！");
					}else{
//						ctl_showMsg("操作失败！");
					}
				});
			}
		});
	});
}
