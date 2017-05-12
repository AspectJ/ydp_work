var sellpowerService='sellpowerService';
function initSellpowerGrid(){

	ctl_initGrid({
		jqGridId:"sellpower_grid",
		serviceId:sellpowerService,
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		width:500,
		height:200,
		colNames:['售票权限ID','权限名称','权限唯一标识','排序号','说明','禁启状态','状态','操作'],
		colModel:[
		{name:'sellpowerid',index:'sellpowerid',hidden:true},
		{name:'powername',index:'powername'},
		{name:'characteristic',index:'characteristic',hidden:true},
		{name:'pxh',index:'pxh',hidden:true},
		{name:'des',index:'des'},
		{name:'status',index:'status',hidden:true},
		{name:'statusname',index:'statusname'},
		{name:'oper',index:'oper',align:"center"}],
		pager:"sellpower_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){
			var ids = ctl_getAllDataIds('sellpower_grid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var rowObj = ctl_getRowObjForRowNo('sellpower_grid',cl);
   				var oper = "";
   				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateSellpower(\""+cl+"\")>修改</a>";
   				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteSellpower(\""+rowObj.sellpowerid+"\")>删除</a>";   				
   				var qy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=qySellpower(\""+rowObj.sellpowerid+"\")>启用</a>";
   				var jy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=jySellpower(\""+rowObj.sellpowerid+"\")>禁用</a>";
   				var status = rowObj.status;
	   			if(status == '1'){
	   				oper = jy+ " | " + xg + " | " + sc;
	   			}else if(status == '2'){
	   				oper = qy ;
	   			}   	   			
   				ctl_setCell('sellpower_grid', cl, 'oper', oper);
   			}   			
            addAutoSize([{
                htmlId: "sellpower_grid",
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


$('#sellpower_query').click(function(){
	var data ={operType:"index"};
	data.status=$("#status_sel").val();
	data.powername =$("#powername").val();
	ctl_onPagingForConditions('sellpower_grid', sellpowerService, true, data,jsonType);
});

$("#sellpower_add").click(function (){
	var dlg = ctl_dialogDivClose('', {
        title: '新增',
        content: 'addsellpower_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addsellpower_close']);
	$("#addsellpower_save").click(function() {		
		var powername = $('#qxmc').val();
		var des = $('#adddes').val();	
		if($.trim(powername) == ""){
			ctl_showMsg("权限名称不能为空");
			return;
		}	
		var data={powername:powername,des:des,operType:'add'};		
		publicAjaxRequest(sellpowerService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('sellpower_grid');
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

function updateSellpower(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改',
        content: 'addsellpower_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addsellpower_close']);
    var rowObj = ctl_getRowObjForRowNo('sellpower_grid',rowId);
    
	$('#adddes').val(rowObj.des);	
	$("#qxmc").val(rowObj.powername);
	$("#addsellpower_save").click(function() {			
		var powername = $('#qxmc_sel').val();
		var name=$("#qxmcid").val();
		var des = $('#adddes').val();
		var type="";
		if(powername!=name){
			type="1";//表示修改了，需要进行验证
		}else{
			type="2";
		}
		var data={sellpowerid:rowObj.sellpowerid,powername:powername,type:type,des:des,operType:'update'};
		publicAjaxRequest(sellpowerService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('sellpower_grid');
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

function deleteSellpower(sellpowerid){
	ctl_confirm('您确定要删除吗？',function() {
		var data = {sellpowerid:sellpowerid,operType:'delete'};
		publicAjaxRequest(sellpowerService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('sellpower_grid');
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

function qySellpower(sellpowerid){
	ctl_confirm('确定要启用吗？',function() {
		var data = {sellpowerid:sellpowerid,operType:'qy'};
		publicAjaxRequest(sellpowerService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('sellpower_grid');
				ctl_showMsg("启用成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("启用失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

function jySellpower(sellpowerid){
	ctl_confirm('确定要禁用吗？',function() {
		var data = {sellpowerid:sellpowerid,operType:'jy'};
		publicAjaxRequest(sellpowerService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('sellpower_grid');
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
	
	initSellpowerGrid();
	
});