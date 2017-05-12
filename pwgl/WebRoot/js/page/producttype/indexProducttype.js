var producttypeService='producttypeService';
function initProducttypeGrid(){
	ctl_initGrid({
		jqGridId:"producttype_grid",
		serviceId:producttypeService,
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		width:500,
		height:200,
		colNames:['产品类别ID','产品类别名称','上级产品类别名称','父产品类别ID','说明','禁启状态','状态','操作'],
		colModel:[
		{name:'producttypeid',index:'producttypeid',hidden:true},
		{name:'typename',index:'typename'},
		{name:'ftypename',index:'ftypename'},
		{name:'fprodtypeid',index:'fprodtypeid',hidden:true},
		{name:'des',index:'des'},
		{name:'status',index:'status',hidden:true},	
		{name:'statusname',index:'statusname'},
		{name:'oper',index:'oper',align:"center"}],
		pager:"producttype_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){
			var ids = ctl_getAllDataIds('producttype_grid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var rowObj = ctl_getRowObjForRowNo('producttype_grid',cl);
   				var oper = "";
   				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateProducttype(\""+cl+"\")>修改</a>";
   				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteProducttype(\""+rowObj.producttypeid+"\")>删除</a>";   				
   				var qy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=qyProducttype(\""+rowObj.producttypeid+"\")>启用</a>";
   				var jy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=jyProducttype(\""+rowObj.producttypeid+"\")>禁用</a>";
   				var status = rowObj.status;
	   			if(status == '1'){
	   				oper = jy+ " | " + xg + " | " + sc;
	   			}else if(status == '2'){
	   				oper = qy;
	   			}   				
   				ctl_setCell('producttype_grid', cl, 'oper', oper);
   			}
   			
            addAutoSize([{
                htmlId: "producttype_grid",
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


$('#producttype_query').click(function(){
	var data ={operType:"index"};	
	data.typename =$("#typename").val();
	data.status=$("#status_sel").val();
	ctl_onPagingForConditions('producttype_grid', producttypeService, true, data,jsonType);
});

$("#producttype_add").click(function (){
	var dlg = ctl_dialogDivClose('', {
        title: '新增',
        content: 'addproducttype_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addproducttype_close']);
	
	//查询上级产品分类名称
	$("#sjcplb").ctl_select({
        id: 'sjcplb_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
        dialogId:'addproducttype_div',
    	selectedIndex: '',
    	selected:[],
		defaultValue : '',
		defaultText : '请选择',
        columnValue: 'producttypeid',
        columnName: 'typename',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(producttypeService),
            data: "{operType:'sjcplb'}"
        }
    });	
	
	$("#addproducttype_save").click(function() {		
		var typename = $('#addtypename').val();
		var fprodtypeid = $('#sjcplb_sel').val();
		var des = $('#adddes').val();
		if($.trim(typename) == ""){
			ctl_showMsg("产品类别名称不能为空！");
			return;
		}
		var data={typename:typename,fprodtypeid:fprodtypeid,des:des,operType:'add'};		
		publicAjaxRequest(producttypeService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('producttype_grid');
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

function updateProducttype(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改',
        content: 'addproducttype_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addproducttype_close']);	
    var rowObj = ctl_getRowObjForRowNo('producttype_grid',rowId);
    var producttypeid=rowObj.producttypeid;
    
	//查询上级产品分类名称
	$("#sjcplb").ctl_select({
        id: 'sjcplb_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
        dialogId:'addproducttype_div',
    	selectedIndex: '',
    	selected:[rowObj.fprodtypeid],
		defaultValue : '',
		defaultText : '请选择',
        columnValue: 'producttypeid',
        columnName: 'typename',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(producttypeService),
            data: "{operType:'sjcplb',producttypeid:'"+producttypeid+"'}"
        }
    });		
	$('#addtypename').val(rowObj.typename);
	$('#adddes').val(rowObj.des);	
	$("#addproducttype_save").click(function() {		
		var typename = $('#addtypename').val();
		var fprodtypeid = $('#sjcplb_sel').val();
		var des = $('#adddes').val();	
		if($.trim(typename) == ""){
			ctl_showMsg("产品类别名称不能为空！");
			return;
		}
		var data={producttypeid:rowObj.producttypeid,typename:typename,fprodtypeid:fprodtypeid,des:des,operType:'update'};		
		publicAjaxRequest(producttypeService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('producttype_grid');
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

function deleteProducttype(producttypeid){
	ctl_confirm('您确定要删除吗？',function() {
		var data = {producttypeid:producttypeid,operType:'delete'};
		publicAjaxRequest(producttypeService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('producttype_grid');
				ctl_showMsg("删除成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("删除失败!");
			}else if("used" == rdata) {
				ctl_showMsg("已被使用，不能删除!");
			}else {
				ctl_showMsg("存在子类，请先删除子类");
			}
		});
	},function(){});
}

function qyProducttype(producttypeid){
	ctl_confirm('确定要启用吗？',function() {
		var data = {producttypeid:producttypeid,operType:'qy'};
		publicAjaxRequest(producttypeService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('producttype_grid');
				ctl_showMsg("启用成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("启用失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

function jyProducttype(producttypeid){
	ctl_confirm('确定要禁用吗？',function() {
		var data = {producttypeid:producttypeid,operType:'jy'};
		publicAjaxRequest(producttypeService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('producttype_grid');
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
	
	initProducttypeGrid();
	
});