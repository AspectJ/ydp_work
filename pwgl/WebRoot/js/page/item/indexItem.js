var itemService='itemService';
function initItemGrid(){
	ctl_initGrid({
		jqGridId:"item_grid",
		serviceId:itemService,
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		width:400,
		height:200,
		colNames:['项目ID','项目名称','项目介绍','场次数','状态','状态','操作'],
		colModel:[
		{name:'itemid',index:'itemid',hidden:true},
		{name:'itemname',index:'itemname'},
		{name:'introduction',index:'introduction'},
		{name:'sl',index:'sl'},
		{name:'status',index:'status',hidden:true},
		{name:'statusname',index:'statusname'},
		{name:'oper',index:'oper',align:"center"}],
		pager:"item_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){
			var ids = ctl_getAllDataIds('item_grid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var rowObj = ctl_getRowObjForRowNo('item_grid',cl);
   				var oper = "";   				
   			    var xg="<input type='button' value='修改'  class='f14 ff bod bod_r c_p bgcolor pt5 pb5 pl15 pr15' onclick=updateItem(\""+cl+"\") />";
				var sc="<input type='button' value='删除'  class='f14 ff bod bod_r c_p bgcolor pt5 pb5 pl15 pr15' onclick=deleteItem(\""+rowObj.itemid+"\") />";
				var qy="<input type='button' value='启用'  class='f14 ff bod bod_r c_p bgcolor pt5 pb5 pl15 pr15' onclick=qyItem(\""+rowObj.itemid+"\") />";
				var jy="<input type='button' value='禁用'  class='f14 ff bod bod_r c_p bgcolor pt5 pb5 pl15 pr15' onclick=jyItem(\""+rowObj.itemid+"\") />";
   			    var status = rowObj.status;
   				if(status == '1'){
   					oper = jy+ "   " + xg + "   " + sc;
   				}else if(status == '2'){
   					oper = qy+ "   " + xg + "   " + sc;
   				}
   				var statusname="";
   				if(status=='1'){
   					statusname = "<span style='color:green;font-weight:bold;'>"+rowObj.statusname+"</span>";
   				}else{
   					statusname = "<span style='color:red;font-weight:bold;'>"+rowObj.statusname+"</span>";
   				}
   				ctl_setCell('item_grid', cl, 'statusname', statusname);
   				ctl_setCell('item_grid', cl, 'oper', oper);
   			}
   			
   	       addAutoSize([{
               htmlId: "item_grid",
               htmlType: "jqgrid",
               widthResize: -280,
               heightResize: -160
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
}

function qyItem(itemid){
	ctl_confirm('确定要启用吗？',function() {
		var data = {itemid:itemid,operType:'qy'};
		publicAjaxRequest(itemService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('item_grid');
				ctl_showMsg("启用成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("启用失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

function jyItem(itemid){
	ctl_confirm('确定要禁用吗？',function() {
		var data = {itemid:itemid,operType:'jy'};
		publicAjaxRequest(itemService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('item_grid');
				ctl_showMsg("禁用成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("禁用失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

function deleteItem(itemid){
	ctl_confirm('您确定要删除吗？',function() {
		var data = {itemid:itemid,operType:'delete'};
		publicAjaxRequest(itemService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('item_grid');
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


function updateItem(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改',
        content: 'additem_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['additem_close']);	
    var rowObj = ctl_getRowObjForRowNo('item_grid',rowId); 
    
    //状态
	$("#status").ctl_select({
        id: "status_sel",
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        selected:[rowObj.status],
        dialogId:'additem_div',
        columns: 1,
        data:{'1':'启用','2':'禁用'},
    });
	$('#additemname').val(rowObj.itemname);
	$('#addintroduction').val(rowObj.introduction);	
	$("#additem_save").click(function() {		
	 var itemname = $('#additemname').val();
	 var introduction = $('#addintroduction').val();
	 var status=$("#status_sel").val();
	 if($.trim(itemname) == ""){
		ctl_showMsg("项目名称不能为空");
		return;
	 }		
	 var data={itemid:rowObj.itemid,itemname:itemname,introduction:introduction,status:status,operType:'update'};		
	 publicAjaxRequest(itemService,data,jsonType, function(response) {
		var rdata = response.data;
		if("success" == rdata) {
			dlg.close();
			ctl_reloadGrid('item_grid');
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

$(function(){
	initItemGrid();
	
	//查询
	$('#item_query').click(function(){
		var data ={operType:"index"};
		data.itemname =$("#itemname").val();
		data.status=$("#zt").find("option:selected").val();
		ctl_onPagingForConditions('item_grid', itemService, true, data,jsonType);
	});
	
	$("#item_add").click(function (){
		var dlg = ctl_dialogDivClose('', {
	        title: '新增',
	        content: 'additem_div',
	        lock: true,
	        min: false,
	        max: false,
	        drag: false,
	        resize: false
	    },
	    ['additem_close']);	
		
		//状态
		$("#status").ctl_select({
	        id: "status_sel",
	        listboxwidth: 0,
	        width: 115,
	        listboxmaxheight: 300,
	        dialogId:'additem_div',
	        columns: 1,
	        selected:['1'],
	        data:{'1':'启用','2':'禁用'},
	    });
		
		$("#additem_save").click(function() {		
			var itemname = $('#additemname').val();
			var introduction = $('#addintroduction').val();
			var status=$("#status_sel").val();
			if($.trim(itemname) == ""){
				ctl_showMsg("项目名称不能为空");
				return;
			}		
			var data={itemname:itemname,introduction:introduction,status:status,operType:'add'};		
			publicAjaxRequest(itemService,data,jsonType, function(response) {
				var rdata = response.data;
				if("success" == rdata) {
					dlg.close();
					ctl_reloadGrid('item_grid');
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
});