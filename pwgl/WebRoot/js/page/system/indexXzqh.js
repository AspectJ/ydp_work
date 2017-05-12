function initXzqhGrid(){
	ctl_initGrid({
		jqGridId:"xzqh_grid",
		serviceId:"indexXzqhService",
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		width:500,
		height:200,
		colNames:['地区名称','地区代码','上级地区名称','上级地区代码','层级','操作'],
		colModel:[
		{name:'xzqhmc',index:'xzqhmc'},
		{name:'xzqhid',index:'xzqhid'},
		{name:'sjxzqhmc',index:'sjxzqhmc'},
		{name:'sjxzqhid',index:'sjxzqhid'},
		{name:'cj',index:'cj'},
		{name:'oper',index:'oper',align:"center"}],
		pager:"xzqh_pager",
		rowNum:30,
		viewrecords:true,
		rowList:[30,50,100],
		gridComplete:function(){
			var ids = ctl_getAllDataIds('xzqh_grid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var rowObj = ctl_getRowObjForRowNo('xzqh_grid',cl);
   				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updatexzqh(\""+cl+"\")>修改</a>";
   				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deletexzqh(\""+rowObj.xzqhid+"\")>删除</a>";
   				ctl_setCell('xzqh_grid', cl, 'oper', xg + " | " + sc);
   			}
   			
            addAutoSize([{
                htmlId: "xzqh_grid",
                htmlType: "jqgrid",
                widthResize: -25,
                heightResize: -10
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

$(function() {
	
	initXzqhGrid();
	
	//查询事件
	$('#xzqh_query').click(function(){
		var data ={operType:"index"};
		data.dqmc =$("#dqmc").val();
		ctl_onPagingForConditions('xzqh_grid', "indexXzqhService", true, data,jsonType);
	});
	
	//新增按钮
	$("#xzqh_add").click(function (){
		var addxzqhDialog = ctl_dialogDivClose('', {
	        title: '新增行政区划',
	        content: 'addxzqh_div',
	        lock: true,
	        min: false,
	        max: false,
	        drag: false,
	        resize: false
	    },
	    ['addxzqh_close']);
		
		$("#addxzqh_save").click(function() {
			var xzqhdm = $('#addxzqhid').val();
			var xzqhmc = $('#addxzqhmc').val();
			
			if(isNullEmpty(xzqhdm)){
				ctl_showMsg("行政区划代码不能为空!");
				return ;
			}
			if(!isNullEmpty(xzqhdm)){
				
			}
			if(isNullEmpty(xzqhmc)){
				ctl_showMsg("行政区划名称不能为空!");
				return ;
			}
			
			var data={xzqhdm:xzqhdm,xzqhmc:xzqhmc,operType:'add'};
			publicAjaxRequest("indexXzqhService",data,jsonType, function(response) {
				var rdata = response.data;
				if("success" == rdata) {
					addxzqhDialog.close();
					ctl_reloadGrid('xzqh_grid');
					ctl_showMsg("新增成功!");
				}else if("fail" == rdata){
					ctl_showMsg("新增失败!");
				}else{
					ctl_showMsg(rdata);
				}
			});	
		});
	});
	
});

function updatexzqh(rowId){
	var updatexzqhDialog = ctl_dialogDivClose('', {
        title: '修改行政区划',
        content: 'addxzqh_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addxzqh_close']);
	
    var rowObj = ctl_getRowObjForRowNo('xzqh_grid',rowId);
	$('#addxzqhid').val(rowObj.xzqhid);
	$('#addxzqhmc').val(rowObj.xzqhmc);
			
	$("#addxzqh_save").click(function() {
		var updatexzqhid = $('#addxzqhid').val();
		var updatexzqhmc = $('#addxzqhmc').val();
		
		if(isNullEmpty(updatexzqhid)){
			ctl_showMsg("行政区划代码不能为空!");
			return ;
		}
		if(isNullEmpty(updatexzqhmc)){
			ctl_showMsg("行政区划名称不能为空!");
			return ;
		}
		var data={oldxzqhid:rowObj.xzqhid,updatexzqhid:updatexzqhid,updatexzqhmc:updatexzqhmc,operType:'update'};
		publicAjaxRequest("indexXzqhService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				updatexzqhDialog.close();
				ctl_reloadGrid('xzqh_grid');
				ctl_showMsg("修改成功!");
			}else if("fail" == rdata){
				ctl_showMsg("修改失败!");
			}else{
				ctl_showMsg(rdata);
			}
		});	
	});
}

function deletexzqh(xzqhdm){
	ctl_confirm('确定要删除所选行政区划吗？',function() {
		var data = {xzqhdm:xzqhdm,operType:'delete'};
		publicAjaxRequest("indexXzqhService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('xzqh_grid');
				ctl_showMsg("删除成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("删除失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

