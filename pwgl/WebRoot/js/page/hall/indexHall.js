var hallService='hallService';
function initHallGrid(){
	ctl_initGrid({
		jqGridId:"hall_grid",
		serviceId:hallService,
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		width:500,
		height:200,
		colNames:['演出厅ID','演出厅名称','场馆ID','场馆名称','位置','介绍','禁启状态','删除状态','数据版本号','创建时间','状态','操作'],
		colModel:[
		{name:'hallid',index:'hallid',hidden:true},
		{name:'hallname',index:'hallname'},
		{name:'venueid',index:'venueid',hidden:true},
		{name:'venuename',index:'venuename'},
		{name:'location',index:'location'},
		{name:'introduction',index:'introduction'},
		{name:'status',index:'status',hidden:true},
		{name:'delstatus',index:'delstatus',hidden:true},
		{name:'vid',index:'vid',hidden:true},
		{name:'ctime',index:'ctime',hidden:true},
		{name:'statusname',index:'statusname'},
		{name:'oper',index:'oper',align:"center"}],
		pager:"hall_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){
			var ids = ctl_getAllDataIds('hall_grid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var rowObj = ctl_getRowObjForRowNo('hall_grid',cl);
   				var oper = "";
   				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateHall(\""+cl+"\")>修改</a>";
   				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteHall(\""+rowObj.hallid+"\")>删除</a>";   				
   				var qy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=qyHall(\""+rowObj.hallid+"\")>启用</a>";
   				var jy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=jyHall(\""+rowObj.hallid+"\")>禁用</a>";
   				var add = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=addHall(\""+rowObj.hallid+"\")>添加分区</a>";
   				var status = rowObj.status;
	   			if(status == '1'){
	   				oper = jy+ " | " + xg + " | " + sc+" | "+add;
	   			}else if(status == '2'){
	   				oper = qy;
	   			}
   				
   				ctl_setCell('hall_grid', cl, 'oper', oper);
   			}
   			
   	       addAutoSize([{
               htmlId: "hall_grid",
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


$('#hall_query').click(function(){
	var data ={operType:"index"};
	data.hallname =$("#hallname").val();
	data.status=$("#status_sel").val();
	ctl_onPagingForConditions('hall_grid', hallService, true, data,jsonType);
});

$("#hall_add").click(function (){
	var dlg = ctl_dialogDivClose('', {
        title: '新增',
        content: 'addhall_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addhall_close']);
	
	//场管名称
	$("#cgmc").ctl_select({
        id: 'cgmc_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
    	selectedIndex: '',
    	selected:[],
		defaultValue : '',
		defaultText : '请选择',
        columnValue: 'venueid',
        columnName: 'venuename',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(hallService),
            data: "{operType:'queryCgmc'}"
        }
    });
	
	$("#addhall_save").click(function() {		
		var hallname = $('#addhallname').val();
		var venueid = $('#cgmc_sel').val();
		var location = $('#addlocation').val();
		var introduction = $('#addintroduction').val();
		if($.trim(hallname) == ""){
			ctl_showMsg("演出厅名称不能为空");
			return;
		}		
		if($.trim(venueid) == ""){
			ctl_showMsg("场馆名称不能为空");
			return;
		}
		if($.trim(location) == ""){
			ctl_showMsg("位置不能为空");
			return;
		}
		var data={hallname:hallname,venueid:venueid,location:location,introduction:introduction,operType:'add'};		
		publicAjaxRequest(hallService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('hall_grid');
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

//添加分区
function addHall(hallid){
	var dlg = ctl_dialogDiv('', {
        title: '添加分区',
        content: 'addhall_fq_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    });		
	ctl_initGrid({
		jqGridId:"hall_zone_grid",
		serviceId:hallService,
		requestDataXml:{hallid:hallid,operType:"queryHallZone"},
		singleRowData:true,
		dataFormat:jsonType,
		width:600,
		height:200,
		colNames:['分区ID','分区名称','分区规则','分区文字','分区描述','备注','禁启状态','状态','操作'],
		colModel:[
		{name:'zoneid',index:'zoneid',hidden:true},
		{name:'zonename',index:'zonename'},
		{name:'rule',index:'rule'},
		{name:'text',index:'text'},
		{name:'des',index:'des'},
		{name:'remark',index:'remark',hidden:true},
		{name:'status',index:'status',hidden:true},
		{name:'statusname',index:'statusname',width:50},
		{name:'oper',index:'oper',align:"center",width:350}],
		pager:"hall_zone_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){		
			var ids = ctl_getAllDataIds('hall_zone_grid');
			var cl='';
			for ( var i = 0; i < ids.length; i++) {
				cl = ids[i];
				var rowObj = ctl_getRowObjForRowNo('hall_zone_grid',cl);
				var oper = "";
				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateHallZone(\""+cl+"\")>修改</a>";
				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteHallZone(\""+rowObj.zoneid+"\")>删除</a>";   				
				var qy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=qyHallZone(\""+rowObj.zoneid+"\")>启用</a>";
				var jy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=jyHallZone(\""+rowObj.zoneid+"\")>禁用</a>";
				var add = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=addHallZone(\""+rowObj.zoneid+"\",\""+hallid+"\")>添加座位</a>";
				var status = rowObj.status;
				if(status == '1'){
					oper = jy+ " | " + xg + " | " + sc+" | "+add;
				}else if(status == '2'){
					oper = qy;
				}	   				
				ctl_setCell('hall_zone_grid', cl, 'oper', oper);
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
	
	//添加
	$("#hall_add").click(function(){
		var dlg = ctl_dialogDivClose('', {
	        title: '添加分区',
	        content: 'addhall_zone_div',
	        lock: true,
	        min: false,
	        max: false,
	        drag: false,
	        resize: false
	    },
	    ['addhall_zone_close']);	
		
		//保存
		$("#addhall_zone_save").click(function(){
			var zonename=$("#zonename").val();
			var rule=$("#rule").val();
			var text=$("#text").val();
			var des=$("#des").val();
			var data={zonename:zonename,rule:rule,text:text,des:des,hallid:hallid,operType:'addZone'};		
			publicAjaxRequest(hallService,data,jsonType, function(response) {
				var rdata = response.data;
				if("success" == rdata) {
					dlg.close();
					ctl_reloadGrid('hall_zone_grid');
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
	
	//查询
	$("#hall_query").click(function(){
		var zonename=$("#zonename").val();
		var data={zonename:zonename,operType:"queryHallZone"};
		ctl_onPagingForConditions('hall_zone_grid', hallService, true, data,jsonType);
	});
}


//添加座位
function addHallZone(zoneid,hallid){
	var dlg = ctl_dialogDiv('', {
        title: '添加座位',
        content: 'addhall_zw_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    });		
	ctl_initGrid({
		jqGridId:"hall_pewname_grid",
		serviceId:hallService,
		requestDataXml:{zoneid:zoneid,hallid:hallid,operType:"queryPewname"},
		singleRowData:true,
		dataFormat:jsonType,
		width:600,
		height:200,
		colNames:['座位代码','演出厅ID','分区ID','座位名','排号','列号','是否加座','备注','禁启状态','状态','操作'],
		colModel:[
		{name:'pewid',index:'pewid',hidden:true},
		{name:'hallid',index:'hallid',hidden:true},
		{name:'zoneid',index:'zoneid',hidden:true},
		{name:'pewname',index:'pewname'},
		{name:'row',index:'row'},
		{name:'col',index:'col'},
		{name:'isaddpew',index:'isaddpew'},
		{name:'remark',index:'remark'},
		{name:'status',index:'status',hidden:true},
		{name:'statusname',index:'statusname'},
		{name:'oper',index:'oper',align:"center",width:250}],
		pager:"hall_pewname_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){		
			var ids = ctl_getAllDataIds('hall_pewname_grid');
			var cl='';
			for ( var i = 0; i < ids.length; i++) {
				cl = ids[i];
				var rowObj = ctl_getRowObjForRowNo('hall_pewname_grid',cl);
				var oper = "";
				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateHallPrev(\""+cl+"\")>修改</a>";
				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteHallPrev(\""+rowObj.pewid+"\")>删除</a>";   				
				var qy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=qyHallPrev(\""+rowObj.pewid+"\")>启用</a>";
				var jy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=jyHallPrev(\""+rowObj.pewid+"\")>禁用</a>";
				var status = rowObj.status;
				if(status == '1'){
					oper = jy+ " | " + xg + " | " + sc;
				}else if(status == '2'){
					oper = qy;
				}	   				
				ctl_setCell('hall_pewname_grid', cl, 'oper', oper);
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
	
	//查询
	$("#hall_query").click(function(){
		var pewname=$("#pewname").val();
		var data={zoneid:zoneid,hallid:hallid,operType:"queryPewname",pewname:pewname};
		ctl_onPagingForConditions('hall_pewname_grid', hallService, true, data,jsonType);
	});
	
	//添加
	$("#pewname_add").click(function(){
		var dlg = ctl_dialogDivClose('', {
	        title: '添加座位',
	        content: 'addhall_pew_div',
	        lock: true,
	        min: false,
	        max: false,
	        drag: false,
	        resize: false
	    },['addhall_pew_close']);	
		
		//是否加座
		$("#sfjz").ctl_select({
	        id: "sfjz_sel",
	        listboxwidth: 0,
	        width: 115,
	        listboxmaxheight: 300,
	        dialogId:'addhall_pew_div',
	        columns: 1,
	        data:{'1':'是','2':'否'},
	    });
		
		//保存
		$("#addhall_pew_save").click(function(){
			var pewname=$("#pewname").val();
			var row=$("#row").val();
			var col=$("#col").val();
			var sfjz=$("#sfjz_sel").val();
			var remark=$("#remark").val();
			var data = {zoneid:zoneid,hallid:hallid,pewname:pewname,row:row,col:col,sfjz:sfjz,remark:remark,operType:'addPew'};
			publicAjaxRequest(hallService,data,jsonType, function(response) {
				var rdata = response.data;
				if("success" == rdata) {
					ctl_reloadGrid('hall_pewname_grid');
					ctl_showMsg("新增成功!");
					dlg.close();
				}else if("fail" == rdata) {
					ctl_showMsg("新增失败!");
				}else {
					ctl_showMsg(rdata);
				}
			});
		});
	});	
}

function deleteHallPrev(id){
	ctl_confirm('确定要删除吗？',function() {
		var data = {id:id,operType:'deletePrev'};
		publicAjaxRequest(hallService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('hall_pewname_grid');
				ctl_showMsg("删除成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("删除失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

//启用
function qyHallPrev(id){
	ctl_confirm('确定要启用吗？',function() {
		var data = {id:id,operType:'qyPrev'};
		publicAjaxRequest(hallService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('hall_pewname_grid');
				ctl_showMsg("启用成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("启用失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

//禁用
function jyHallPrev(id){
	ctl_confirm('确定要禁用吗？',function() {
		var data = {id:id,operType:'jyPrev'};
		publicAjaxRequest(hallService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('hall_pewname_grid');
				ctl_showMsg("禁用成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("禁用失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

//修改
function updateHallPrev(cl){
	var dlg = ctl_dialogDivClose('', {
        title: '修改座位',
        content: 'addhall_pew_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },['addhall_pew_close']);	
     var rowObj = ctl_getRowObjForRowNo('hall_pewname_grid',cl);
    
	  //是否加座
	  $("#sfjz").ctl_select({
	        id: "sfjz_sel",
	        listboxwidth: 0,
	        width: 115,
	        listboxmaxheight: 300,
	        dialogId:'addhall_pew_div',
	        columns: 1,
	        selected:[rowObj.isaddpew],
	        data:{'1':'是','2':'否'},
	    });
	
	   $("#pewname").val(rowObj.pewname);
	   $("#row").val(rowObj.row);
	   $("#col").val(rowObj.col);
	   $("#remark").val(rowObj.remark);
	   $("#addhall_pew_save").click(function(){
		   var pewname=$("#pewname").val();
		   var row=$("#row").val();
		   var col=$("#col").val();
		   var remark=$("#remark").val();
		   var sfjz=$("#sfjz_sel").val();
		   var pewid=rowObj.pewid;
		   var data={pewname:pewname,row:row,col:col,remark:remark,pewid:pewid,sfjz:sfjz,operType:'updatePre'};
		   publicAjaxRequest(hallService,data,jsonType, function(response) {
				var rdata = response.data;
				if("success" == rdata) {
					ctl_reloadGrid('hall_pewname_grid');
					ctl_showMsg("修改成功!");
					dlg.close();
				}else if("fail" == rdata) {
					ctl_showMsg("修改失败!");
				}else {
					ctl_showMsg(rdata);
				}
			});
	   });
}

//删除
function deleteHallZone(zoneid){
	ctl_confirm('确定要删除吗？',function() {
		var data = {zoneid:zoneid,operType:'deleteZone'};
		publicAjaxRequest(hallService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('hall_zone_grid');
				ctl_showMsg("删除成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("删除失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

//启用
function qyHallZone(zoneid){
	ctl_confirm('确定要启用吗？',function() {
		var data = {zoneid:zoneid,operType:'qyZone'};
		publicAjaxRequest(hallService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('hall_zone_grid');
				ctl_showMsg("启用成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("启用失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

//禁用
function jyHallZone(zoneid){
	ctl_confirm('确定要禁用吗？',function() {
		var data = {zoneid:zoneid,operType:'jyZone'};
		publicAjaxRequest(hallService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('hall_zone_grid');
				ctl_showMsg("禁用成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("禁用失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

function updateHallZone(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改',
        content: 'addhall_zone_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addhall_zone_close']);
	var rowObj = ctl_getRowObjForRowNo('hall_zone_grid',rowId);
	var zoneid=rowObj.zoneid;
	$("#zonename").val(rowObj.zonename);
	$("#rule").val(rowObj.rule);
	$("#text").val(rowObj.text);
	$("#des").val(rowObj.des);
	
	//保存
	$("#addhall_zone_save").click(function(){
		var zonename=$("#zonename").val();
		var rule=$("#rule").val();
		var text=$("#text").val();
		var des=$("#des").val();
		var data={zonename:zonename,rule:rule,text:text,des:des,zoneid:zoneid,operType:"updateZone"};
		publicAjaxRequest(hallService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('hall_zone_grid');
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

function updateHall(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改',
        content: 'addhall_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addhall_close']);	
    var rowObj = ctl_getRowObjForRowNo('hall_grid',rowId);
    
    //场管名称
	$("#cgmc").ctl_select({
        id: 'cgmc_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
    	selected:[rowObj.venueid],
        columnValue: 'venueid',
        columnName: 'venuename',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(hallService),
            data: "{operType:'queryCgmc'}"
        }
    });	
	$('#addhallname').val(rowObj.hallname);
	$('#addlocation').val(rowObj.location);
	$('#addintroduction').val(rowObj.introduction);	
	$("#addhall_save").click(function() {		
		var hallname = $('#addhallname').val();
		var venueid = $('#cgmc_sel').val();
		var location = $('#addlocation').val();
		var introduction = $('#addintroduction').val();
		if($.trim(hallname) == ""){
			ctl_showMsg("演出厅名称不能为空");
			return;
		}		
		if($.trim(venueid) == ""){
			ctl_showMsg("场馆名称不能为空");
			return;
		}
		if($.trim(location) == ""){
			ctl_showMsg("位置不能为空");
			return;
		}
		var data={hallid:rowObj.hallid,hallname:hallname,venueid:venueid,location:location,introduction:introduction,operType:'update'};		
		publicAjaxRequest(hallService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('hall_grid');
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

function deleteHall(hallid){
	ctl_confirm('您确定要删除吗？',function() {
		var data = {hallid:hallid,operType:'delete'};
		publicAjaxRequest(hallService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('hall_grid');
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

function qyHall(hallid){
	ctl_confirm('确定要启用吗？',function() {
		var data = {hallid:hallid,operType:'qy'};
		publicAjaxRequest(hallService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('hall_grid');
				ctl_showMsg("启用成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("启用失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

function jyHall(hallid){
	ctl_confirm('确定要禁用吗？',function() {
		var data = {hallid:hallid,operType:'jy'};
		publicAjaxRequest(hallService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('hall_grid');
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
	initHallGrid();	
});