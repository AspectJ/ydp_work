var payboxService='payboxService';
function initPayboxGrid(){
	ctl_initGrid({
		jqGridId:"paybox_grid",
		serviceId:payboxService,
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		width:500,
		height:200,
		colNames:['售票点ID','售票点名称','所在地区','地址','上级售票点ID','上级售票点','介绍','禁启状态','状态','操作'],
		colModel:[
		{name:'payboxid',index:'payboxid',hidden:true},
		{name:'payboxname',index:'payboxname'},
		{name:'areaid',index:'areaid',hidden:true},
		{name:'address',index:'address'},
		{name:'fpayboxid',index:'fpayboxid',hidden:true},
		{name:'fpayboxname',index:'fpayboxname'},
		{name:'introduction',index:'introduction'},
		{name:'status',index:'status',hidden:true},
		{name:'statusname',index:'statusname'},
		{name:'oper',index:'oper',align:"center"}],
		pager:"paybox_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){
			var ids = ctl_getAllDataIds('paybox_grid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var rowObj = ctl_getRowObjForRowNo('paybox_grid',cl);
   				var oper = "";
   				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updatePaybox(\""+cl+"\")>修改</a>";
   				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deletePaybox(\""+rowObj.payboxid+"\")>删除</a>";
   				
   					var qy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=qyPaybox(\""+rowObj.payboxid+"\")>启用</a>";
   					var jy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=jyPaybox(\""+rowObj.payboxid+"\")>禁用</a>";
   					var status = rowObj.status;
	   				if(status == '1'){
	   					oper = jy + " | " + xg + " | " + sc;
	   				}else if(status == '2'){
	   					oper = qy;
	   				}
   				
   				ctl_setCell('paybox_grid', cl, 'oper', oper);
   			}
   			
            addAutoSize([{
                htmlId: "paybox_grid",
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


$('#paybox_query').click(function(){
	var data ={operType:"index"};
	data.payboxname =$("#payboxname").val();
	data.status=$("#status_sel").val();
	ctl_onPagingForConditions('paybox_grid', payboxService, true, data,jsonType);
});

$("#paybox_add").click(function (){
	var dlg = ctl_dialogDivClose('', {
        title: '新增',
        content: 'addpaybox_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addpaybox_close']);
	loadXzqh(108,106,"addpaybox_div","xzqh_sheng","xzqh_shi","xzqh_xian","indexXzqhService",null);
	
	//查询上级售票点
	$("#sjspdmc").ctl_select({
        id: 'sjspdmc_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
        dialogId:'addpaybox_div',
    	selectedIndex: '',
    	selected:[],
		defaultValue : '',
		defaultText : '请选择',
        columnValue: 'payboxid',
        columnName: 'payboxname',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(payboxService),
            data: "{operType:'querysjspdmc'}"
        }
    });
	
	$("#addpaybox_save").click(function() {		
		var payboxname = $('#addpayboxname').val();
		var areaid = $('#xzqh_xian_sel').val();
		var address = $('#addaddress').val();
		var fpayboxid = $('#sjspdmc_sel').val();
		var introduction = $('#addintroduction').val();	
		if($.trim(payboxname) == ""){
			ctl_showMsg("售票点名称不能为空！");
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
		var data={payboxname:payboxname,areaid:areaid,address:address,fpayboxid:fpayboxid,introduction:introduction,operType:'add'};		
		publicAjaxRequest(payboxService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('paybox_grid');
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

function updatePaybox(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改',
        content: 'addpaybox_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addpaybox_close']);
    var rowObj = ctl_getRowObjForRowNo('paybox_grid',rowId);
    loadXzqh(108,106,"addpaybox_div","xzqh_sheng","xzqh_shi","xzqh_xian","indexXzqhService",rowObj.areaid); 
    var payboxid=rowObj.payboxid;
    
    //查询上级售票点
	$("#sjspdmc").ctl_select({
        id: 'sjspdmc_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
        dialogId:'addpaybox_div',
    	selectedIndex: '',
    	selected:[rowObj.fpayboxid],
		defaultValue : '',
		defaultText : '请选择',
        columnValue: 'payboxid',
        columnName: 'payboxname',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(payboxService),
            data: "{operType:'querysjspdmc',payboxid:'"+payboxid+"'}"
        }
    });
	$('#addpayboxname').val(rowObj.payboxname);
	$('#addaddress').val(rowObj.address);
	$('#addintroduction').val(rowObj.introduction);	
	$("#addpaybox_save").click(function() {		
		var payboxname = $('#addpayboxname').val();
		var areaid = $('#xzqh_xian_sel').val();
		var address = $('#addaddress').val();
		var fpayboxid = $('#sjspdmc_sel').val();
		var introduction = $('#addintroduction').val();	
		if($.trim(payboxname) == ""){
			ctl_showMsg("售票点名称不能为空！");
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
		var data={payboxid:rowObj.payboxid,payboxname:payboxname,areaid:areaid,address:address,fpayboxid:fpayboxid,introduction:introduction,operType:'update'};		
		publicAjaxRequest(payboxService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('paybox_grid');
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

function deletePaybox(payboxid){
	ctl_confirm('您确定要删除吗？',function() {
		var data = {payboxid:payboxid,operType:'delete'};
		publicAjaxRequest(payboxService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('paybox_grid');
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

function qyPaybox(payboxid){
	ctl_confirm('确定要启用吗？',function() {
		var data = {payboxid:payboxid,operType:'qy'};
		publicAjaxRequest(payboxService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('paybox_grid');
				ctl_showMsg("启用成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("启用失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

function jyPaybox(payboxid){
	ctl_confirm('确定要禁用吗？',function() {
		var data = {payboxid:payboxid,operType:'jy'};
		publicAjaxRequest(payboxService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('paybox_grid');
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
	
	initPayboxGrid();
	
});