var venueService='venueService';
function initVenueGrid(){

	ctl_initGrid({
		jqGridId:"venue_grid",
		serviceId:venueService,
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		width:500,
		height:200,
		colNames:['场馆ID','场馆名称','地址','所在地区','所在地区','介绍','禁启状态','状态','删除状态','数据版本号','创建时间','操作'],
		colModel:[
		{name:'venueid',index:'venueid',hidden:true},
		{name:'venuename',index:'venuename'},
		{name:'address',index:'address'},
		{name:'areaid',index:'areaid',hidden:true},
		{name:'areaname',index:'areaname'},
		{name:'introduction',index:'introduction'},
		{name:'status',index:'status',hidden:true},
		{name:'statusname',index:'statusname'},
		{name:'delstatus',index:'delstatus',hidden:true},
		{name:'vid',index:'vid',hidden:true},
		{name:'ctime',index:'ctime',hidden:true},
		{name:'oper',index:'oper',align:"center"}],
		pager:"venue_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){
			var ids = ctl_getAllDataIds('venue_grid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var rowObj = ctl_getRowObjForRowNo('venue_grid',cl);
   				var oper = "";
   				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateVenue(\""+cl+"\")>修改</a>";
   				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteVenue(\""+rowObj.venueid+"\")>删除</a>";   				
   				var qy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=qyVenue(\""+rowObj.venueid+"\")>启用</a>";
   				var jy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=jyVenue(\""+rowObj.venueid+"\")>禁用</a>";
   				var status = rowObj.status;
   				if(status == '1'){
   					oper = jy+ " | " + xg + " | " + sc;
   				}else if(status == '2'){
   					oper = qy;
   				}   				
   			   ctl_setCell('venue_grid', cl, 'oper', oper);
   			}
   			
   	       addAutoSize([{
               htmlId: "venue_grid",
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


$('#venue_query').click(function(){
	var data ={operType:"index"};
	data.venuename =$("#venuename").val();
	data.status=$("#status_sel").val();
	ctl_onPagingForConditions('venue_grid', venueService, true, data,jsonType);
});

$("#venue_add").click(function (){
	var dlg = ctl_dialogDivClose('', {
        title: '新增',
        content: 'addvenue_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addvenue_close']);
	loadXzqh(108,106,"addvenue_div","xzqh_sheng","xzqh_shi","xzqh_xian","indexXzqhService",null);
	
	$("#addvenue_save").click(function() {		
		var venuename = $('#addvenuename').val();
		var address = $('#addaddress').val();
		var areaid = $('#xzqh_xian_sel').val();
		var introduction = $('#addintroduction').val();	
		if($.trim(venuename) == ""){
			ctl_showMsg("场馆名称不能为空！");
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
		var data={venuename:venuename,address:address,areaid:areaid,introduction:introduction,operType:'add'};		
		publicAjaxRequest(venueService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('venue_grid');
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

function updateVenue(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改',
        content: 'addvenue_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addvenue_close']);
    var rowObj = ctl_getRowObjForRowNo('venue_grid',rowId);
	loadXzqh(108,106,"addDiv","xzqh_sheng","xzqh_shi","xzqh_xian","indexXzqhService",rowObj.areaid); 	
	$('#addvenuename').val(rowObj.venuename);
	$('#addaddress').val(rowObj.address);
	$('#addintroduction').val(rowObj.introduction);	
	$("#addvenue_save").click(function() {		
		var venuename = $('#addvenuename').val();
		var address = $('#addaddress').val();
		var areaid = $('#xzqh_xian_sel').val();
		var introduction = $('#addintroduction').val();
		if($.trim(venuename) == ""){
			ctl_showMsg("场馆名称不能为空！");
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
		var data={venueid:rowObj.venueid,venuename:venuename,address:address,areaid:areaid,introduction:introduction,operType:'update'};		
		publicAjaxRequest(venueService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('venue_grid');
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

function deleteVenue(venueid){
	ctl_confirm('您确定要删除吗？',function() {
		var data = {venueid:venueid,operType:'delete'};
		publicAjaxRequest(venueService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('venue_grid');
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

function qyVenue(venueid){
	ctl_confirm('确定要启用吗？',function() {
		var data = {venueid:venueid,operType:'qy'};
		publicAjaxRequest(venueService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('venue_grid');
				ctl_showMsg("启用成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("启用失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

function jyVenue(venueid){
	ctl_confirm('确定要禁用吗？',function() {
		var data = {venueid:venueid,operType:'jy'};
		publicAjaxRequest(venueService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('venue_grid');
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
	
	initVenueGrid();
	
});