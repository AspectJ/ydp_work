var reserveService='reserveService';
function initReserveGrid(){
	ctl_initGrid({
		jqGridId:"reserve_grid",
		serviceId:reserveService,
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		width:500,
		height:200,
		colNames:['座位预留ID','座位预留名称','排序号','说明','是否可预约','是否可售','是否可取','禁启状态','状态','操作','是否预约','是否可售','是否可取'],
		colModel:[
		{name:'reserveid',index:'reserveid',hidden:true},
		{name:'reservename',index:'reservename'},
		{name:'pxh',index:'pxh',hidden:true},
		{name:'des',index:'des'},
		{name:'isreservename',index:'isreservename'},
		{name:'issalename',index:'issalename'},
		{name:'iscancelname',index:'iscancelname'},
		{name:'status',index:'status',hidden:true},
		{name:'statusname',index:'statusname'},
		{name:'oper',index:'oper',align:"center"},
		{name:'isreserve',index:'isreserve',hidden:true},
		{name:'issale',index:'issale',hidden:true},
		{name:'iscancel',index:'iscancel',hidden:true}
		],
		pager:"reserve_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){
			var ids = ctl_getAllDataIds('reserve_grid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var rowObj = ctl_getRowObjForRowNo('reserve_grid',cl);
   				var oper = "";
   				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateReserve(\""+cl+"\")>修改</a>";
   				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteReserve(\""+rowObj.reserveid+"\")>删除</a>";   				
   				var qy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=qyReserve(\""+rowObj.reserveid+"\")>启用</a>";
   			    var jy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=jyReserve(\""+rowObj.reserveid+"\")>禁用</a>";
   				var status = rowObj.status;
	   			if(status == '1'){
	   				oper = jy+ " | " + xg + " | " + sc;
	   			}else if(status == '2'){
	   				oper = qy;
	   			}   				
   				ctl_setCell('reserve_grid', cl, 'oper', oper);
   			}
   			
            addAutoSize([{
                htmlId: "reserve_grid",
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
	$("#indexBookedseat_sfkys").ctl_select({
        id: "indexBookedseat_sfkys_sel",
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        data:{'1':'是','2':'否'},
    });
}


$('#reserve_query').click(function(){
	var data ={operType:"index"};
	data.reservename =$("#reservename").val();
	data.status=$("#status_sel").val();
	ctl_onPagingForConditions('reserve_grid', reserveService, true, data,jsonType);
});

$("#reserve_add").click(function (){
	var dlg = ctl_dialogDivClose('', {
        title: '新增',
        content: 'addreserve_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addreserve_close']);	
	
	//是否可预约
	$("#addSfkyy").ctl_select({
        id: "addSfkyy_sel",
        dialogId:'addreserve_div',
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        selected:['是'],
        data:{'1':'是','2':'否'},
    });
	
	//是否可售
	$("#addSfks").ctl_select({
        id: "addSfks_sel",
        dialogId:'addreserve_div',
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        selected:['1'],
        data:{'1':'是','2':'否'},
    });
	
	
	//是否可取
	$("#addSfkq").ctl_select({
        id: "addSfkq_sel",
        dialogId:'addreserve_div',
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        selected:['1'],
        data:{'1':'是','2':'否'},
    });
	
	$("#addreserve_save").click(function() {		
		var reservename = $('#addreservename').val();
		var des = $('#adddes').val();
		var isreserve = $('#addSfkyy_sel').val();
		var issale = $('#addSfks_sel').val();
		var iscancel = $('#addSfkq_sel').val();	
		if($.trim(reservename) == ""){
			ctl_showMsg("座位预留名称不能为空！");
			return;
		}
		var data={reservename:reservename,des:des,isreserve:isreserve,issale:issale,iscancel:iscancel,operType:'add'};		
		publicAjaxRequest(reserveService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('reserve_grid');
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

function updateReserve(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改',
        content: 'addreserve_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addreserve_close']);
    var rowObj = ctl_getRowObjForRowNo('reserve_grid',rowId);
    
	//是否可预约
	$("#addSfkyy").ctl_select({
        id: "addSfkyy_sel",
        dialogId:'addreserve_div',
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        selected:[rowObj.isreserve],
        data:{'1':'是','2':'否'},
    });
	
	//是否可售
	$("#addSfks").ctl_select({
        id: "addSfks_sel",
        dialogId:'addreserve_div',
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        selected:[rowObj.issale],
        data:{'1':'是','2':'否'},
    });
	
	
	//是否可取
	$("#addSfkq").ctl_select({
        id: "addSfkq_sel",
        dialogId:'addreserve_div',
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        selected:[rowObj.iscancel],
        data:{'1':'是','2':'否'},
    }); 
	$('#addreservename').val(rowObj.reservename);
	$('#adddes').val(rowObj.des);	
	$("#addreserve_save").click(function() {		
		var reservename = $('#addreservename').val();
		var des = $('#adddes').val();
		var isreserve = $('#addSfkyy_sel').val();
		var issale = $('#addSfks_sel').val();
		var iscancel = $('#addSfkq_sel').val();	
		if($.trim(reservename) == ""){
			ctl_showMsg("座位预留名称不能为空！");
			return;
		}
		var data={reserveid:rowObj.reserveid,reservename:reservename,des:des,isreserve:isreserve,issale:issale,iscancel:iscancel,operType:'update'};		
		publicAjaxRequest(reserveService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('reserve_grid');
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

function deleteReserve(reserveid){
	ctl_confirm('您确定要删除吗？',function() {
		var data = {reserveid:reserveid,operType:'delete'};
		publicAjaxRequest(reserveService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('reserve_grid');
				ctl_showMsg("删除成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("删除失败!");
			}else if("used" == rdata) {
				ctl_showMsg("已被使用，不能删除!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

function qyReserve(reserveid){
	ctl_confirm('确定要启用吗？',function() {
		var data = {reserveid:reserveid,operType:'qy'};
		publicAjaxRequest(reserveService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('reserve_grid');
				ctl_showMsg("启用成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("启用失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

function jyReserve(reserveid){
	ctl_confirm('确定要禁用吗？',function() {
		var data = {reserveid:reserveid,operType:'jy'};
		publicAjaxRequest(reserveService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('reserve_grid');
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
	
	initReserveGrid();
	
});