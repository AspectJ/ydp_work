var performerService='performerService';
function initPerformerGrid(){
	ctl_initGrid({
		jqGridId:"performer_grid",
		serviceId:performerService,
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		width:500,
		height:200,
		colNames:['演出商ID','演出商名称','上级演出商名称','所在地区','所在地区','地址','上级演出商ID','介绍','禁启状态','状态','操作'],
		colModel:[
		{name:'performerid',index:'performerid',hidden:true},
		{name:'performername',index:'performername'},
		{name:'fperformername',index:'fperformername'},
		{name:'areaid',index:'areaid',hidden:true},
		{name:'areaname',index:'areaname',hidden:true},
		{name:'address',index:'address'},
		{name:'fperformerid',index:'fperformerid',hidden:true},
		{name:'introduction',index:'introduction'},
		{name:'status',index:'status',hidden:true},
		{name:'statusname',index:'statusname'},
		{name:'oper',index:'oper',align:"center"}],
		pager:"performer_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){
			var ids = ctl_getAllDataIds('performer_grid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var rowObj = ctl_getRowObjForRowNo('performer_grid',cl);
   				var oper = "";
   				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updatePerformer(\""+cl+"\")>修改</a>";
   				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deletePerformer(\""+rowObj.performerid+"\")>删除</a>";
   				var qy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=qyPerformer(\""+rowObj.performerid+"\")>启用</a>";
   			    var jy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=jyPerformer(\""+rowObj.performerid+"\")>禁用</a>";
   				var status = rowObj.status;
   				if(status == '1'){
   					oper = jy+ " | " + xg + " | " + sc;
   				}else if(status == '2'){
   					oper = qy;
   				}
   				ctl_setCell('performer_grid', cl, 'oper', oper);
   			}
   			
            addAutoSize([{
                htmlId: "performer_grid",
                htmlType: "jqgrid",
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
	
	//状态
	$("#status").ctl_select({
        id: "status_sel",
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        data:{'':'全部','1':'启用','2':'禁用'},
    });
}


$('#performer_query').click(function(){
	var data ={operType:"index"};
	data.status=$("#status_sel").val();
	data.performername =$("#performername").val();
	ctl_onPagingForConditions('performer_grid', performerService, true, data,jsonType);
});

$("#performer_add").click(function (){
	var dlg = ctl_dialogDivClose('', {
        title: '新增',
        content: 'addperformer_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addperformer_close']);
	loadXzqh(108,106,"addperformer_div","xzqh_sheng","xzqh_shi","xzqh_xian","indexXzqhService",null);
	
	//查询上级演出商名称
	$("#sjycsmc").ctl_select({
        id: 'sjycsmc_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
        dialogId:'addperformer_div',
    	selectedIndex: '',
    	selected:[],
		defaultValue : '',
		defaultText : '请选择',
        columnValue: 'performerid',
        columnName: 'performername',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(performerService),
            data: "{operType:'querysjycsmc'}"
        }
    });
	
	$("#addperformer_save").click(function() {		
		var performername = $('#addperformername').val();
		var areaid = $('#xzqh_xian_sel').val();
		var address = $('#addaddress').val();
		var fperformerid = $('#sjycsmc_sel').val();
		var introduction = $('#addintroduction').val();	
		if($.trim(performername) == ""){
			ctl_showMsg("演出商名称不能为空！");
			return;
		}
		if($.trim(address) == ""){
			ctl_showMsg("地址不能为空！");
			return;
		}
		if($.trim(areaid) == ""){
			ctl_showMsg("行政区划不能为空！");
			return;
		}
		var data={performername:performername,areaid:areaid,address:address,fperformerid:fperformerid,introduction:introduction,operType:'add'};		
		publicAjaxRequest(performerService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('performer_grid');
				ctl_showMsg("新增成功!");
			}else if("fail" == rdata){
				ctl_showMsg("新增失败!");
			}else if("exists" == rdata){
				ctl_showMsg("已经存在!");
			}else{
				ctl_showMsg(rdata);
			}
		});	
	});
});

function updatePerformer(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改',
        content: 'addperformer_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addperformer_close']);
	var rowObj = ctl_getRowObjForRowNo('performer_grid',rowId);
	var performerid=rowObj.performerid;
	
	//查询上级演出商名称
	$("#sjycsmc").ctl_select({
        id: 'sjycsmc_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
    	selectedIndex: '',
        dialogId:'addperformer_div',
    	selected:[rowObj.fperformerid],
		defaultValue : '',
		defaultText : '请选择',
        columnValue: 'performerid',
        columnName: 'performername',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(performerService),
            data: "{operType:'querysjycsmc',performerid:'"+performerid+"'}"
        }
    });	
	loadXzqh(108,106,"addperformer_div","xzqh_sheng","xzqh_shi","xzqh_xian","indexXzqhService",rowObj.areaid); 
	$('#addperformername').val(rowObj.performername);
	$('#addaddress').val(rowObj.address);
	$('#addintroduction').val(rowObj.introduction);	
	$("#addperformer_save").click(function() {		
		var performername = $('#addperformername').val();
		var areaid = $('#xzqh_xian_sel').val();
		var address = $('#addaddress').val();
		var fperformerid = $('#sjycsmc_sel').val();
		var introduction = $('#addintroduction').val();	
		if($.trim(performername) == ""){
			ctl_showMsg("演出商名称不能为空！");
			return;
		}
		if($.trim(address) == ""){
			ctl_showMsg("地址不能为空！");
			return;
		}
		if($.trim(areaid) == ""){
			ctl_showMsg("行政区划不能为空！");
			return;
		}
		var data={performerid:rowObj.performerid,performername:performername,areaid:areaid,address:address,fperformerid:fperformerid,introduction:introduction,operType:'update'};		
		publicAjaxRequest(performerService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('performer_grid');
				ctl_showMsg("修改成功!");
			}else if("fail" == rdata){
				ctl_showMsg("修改失败!");
			}else if("exists" == rdata){
				ctl_showMsg("已经存在!");
			}else{
				ctl_showMsg(rdata);
			}
		});	
	});
}

function deletePerformer(performerid){
	ctl_confirm('您确定要删除吗？',function() {
		var data = {performerid:performerid,operType:'delete'};
		publicAjaxRequest(performerService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('performer_grid');
				ctl_showMsg("删除成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("删除失败!");
			}else if("used" == rdata) {
				ctl_showMsg("已被使用，不能删除!");
			}else if("exist"==rdata){
				ctl_showMsg("请先删除子类!");
			}else{
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

function qyPerformer(performerid){
	ctl_confirm('确定要启用吗？',function() {
		var data = {performerid:performerid,operType:'qy'};
		publicAjaxRequest(performerService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('performer_grid');
				ctl_showMsg("启用成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("启用失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

function jyPerformer(performerid){
	ctl_confirm('确定要禁用吗？',function() {
		var data = {performerid:performerid,operType:'jy'};
		publicAjaxRequest(performerService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('performer_grid');
				ctl_showMsg("禁用成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("禁用失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}


$(function() {
	
	initPerformerGrid();
	
});