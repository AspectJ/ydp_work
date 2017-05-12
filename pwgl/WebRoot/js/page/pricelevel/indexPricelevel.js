var pricelevelService='pricelevelService';
function initPricelevelGrid(){
	ctl_initGrid({
		jqGridId:"pricelevel_grid",
		serviceId:pricelevelService,
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		width:500,
		height:200,
		colNames:['票价等级ID','票价等级名称','颜色值','图标URL','票面默认值','说明','禁启状态','状态','操作'],
		colModel:[
		{name:'pricelevelid',index:'pricelevelid',hidden:true},
		{name:'pricelevelname',index:'pricelevelname'},
		{name:'color',index:'color'},
		{name:'pic',index:'pic',hidden:true},
		{name:'defaultchar',index:'defaultchar'},
		{name:'des',index:'des'},
		{name:'status',index:'status',hidden:true},	
		{name:'statusname',index:'statusname'},
		{name:'oper',index:'oper',align:"center"}],
		pager:"pricelevel_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){
			var ids = ctl_getAllDataIds('pricelevel_grid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var rowObj = ctl_getRowObjForRowNo('pricelevel_grid',cl);
   				var oper = "";
   				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updatePricelevel(\""+cl+"\")>修改</a>";
   				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deletePricelevel(\""+rowObj.pricelevelid+"\")>删除</a>";   				
   				var qy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=qyPricelevel(\""+rowObj.pricelevelid+"\")>启用</a>";
   				var sctp="<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=sctpPricelevel(\""+rowObj.pricelevelid+"\")>上传</a>";
   			    var jy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=jyPricelevel(\""+rowObj.pricelevelid+"\")>禁用</a>";
   				var status = rowObj.status;
	   			if(status == '1'){
	   				oper = jy+" | "+ xg + " | " + sc+" | "+sctp;
	   			}else if(status == '2'){
	   				oper = qy;
	   			}
   				ctl_setCell('pricelevel_grid', cl, 'oper', oper);
   			}
   			
            addAutoSize([{
                htmlId: "pricelevel_grid",
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


$('#pricelevel_query').click(function(){
	var data ={operType:"index"};
	data.pricelevelname =$("#pricelevelname").val();
	data.status=$("#status_sel").val();
	ctl_onPagingForConditions('pricelevel_grid', pricelevelService, true, data,jsonType);
});

$("#pricelevel_add").click(function (){
	var dlg = ctl_dialogDivClose('', {
        title: '新增',
        content: 'addpricelevel_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addpricelevel_close']);
	
	//颜色值
	$("#addcolor").ctl_select({
        id: "addcolor_sel",
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        selected:[''],
        dialogId:'addpricelevel_div',
        columns: 1,
        data:{'赤':'赤','橙':'橙','黄':'黄','绿':'绿','青':'青','蓝':'蓝','紫':'紫'},
    });
	$("#addpricelevel_save").click(function() {		
		var pricelevelname = $('#addpricelevelname').val();
		var color = $('#addcolor_sel').val();
		var defaultchar = $('#adddefaultchar').val();
		var des = $('#adddes').val();	
		if($.trim(pricelevelname) == ""){
			ctl_showMsg("票价等级名称不能为空！");
			return;
		}
		var data={pricelevelname:pricelevelname,color:color,defaultchar:defaultchar,des:des,operType:'add'};		
		publicAjaxRequest(pricelevelService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('pricelevel_grid');
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

//上传
function sctpPricelevel(pricelevelid){
	var dlg = ctl_dialogDivClose('', {
        title: '上传图片',
        content: 'upload_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['cancel_btn']);
	 ctl_initUpload({
	     tagId: "add_spy",
	     swf: 'js/plugin/uploadify/uploadify.swf',
	     uploader: springMvcUrl,
	     formData:{
	         param:getParam(pricelevelService),
	         data:"{operType:'updatePic'}"
	     },
	     buttonText: '图片上传',
	     auto: true,
	     width: 143,
	     height: 30,
	     multi:true ,
	     fileSizeLimit: 500,
	     queueSizeLimit: 1,
	     fileTypeDesc: '支持常用图片格式',
	     fileTypeExts: "*.jpg;*.gif;*.jpeg;*.png;*.bmp",
	     onQueueComplete: function(queueData) {
	     },
	     onUploadError: function(file, errorCode, errorMsg, errorString) {
	         tips().content("文件:" + file.name + "上传失败");
	     },
	     onCancel: function(fileObj) {
	         tips().content("取消了" + fileObj.name);
	     },
	     'onUploadSuccess': function(file, resdata, response) {
	     	var obj = JSON.parse(resdata);//把JSON字符串转成JSON对象
	     	var url = obj.data;
	     	$("#tp_img").attr("src",imgPath+url);
	     	$("#tp_img").show();
	     	$("#add_spyurl").val(url);
	     }
	 });
	 
	 //保存
	 $("#save_btn").click(function(){		  
		    var url=$("#add_spyurl").val();
			var data={pricelevelid:pricelevelid,url:url,operType:'update'};		
			publicAjaxRequest(pricelevelService,data,jsonType, function(response) {
				var rdata = response.data;
				if("success" == rdata) {
					dlg.close();
					ctl_reloadGrid('pricelevel_grid');
					ctl_showMsg("操作成功!");
				}else if("fail" == rdata){
					ctl_showMsg("操作失败!");
				}else if("exists" == rdata){
					ctl_showMsg("已经存在!");
				}else{
					ctl_showMsg(rdata);
				}
			});	
	 });
}

function updatePricelevel(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改',
        content: 'addpricelevel_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addpricelevel_close']);
    var rowObj = ctl_getRowObjForRowNo('pricelevel_grid',rowId);    
	$('#addpricelevelname').val(rowObj.pricelevelname);
	
	//颜色值
	$("#addcolor").ctl_select({
        id: "addcolor_sel",
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        selected:[rowObj.color],
        dialogId:'addpricelevel_div',
        columns: 1,
        data:{'赤':'赤','橙':'橙','黄':'黄','绿':'绿','青':'青','蓝':'蓝','紫':'紫'},
    });
	$('#adddefaultchar').val(rowObj.defaultchar);
	$('#adddes').val(rowObj.des);	
	$("#addpricelevel_save").click(function() {
		var pricelevelname = $('#addpricelevelname').val();
		var color = $('#addcolor_sel').val();
		var defaultchar = $('#adddefaultchar').val();
		var des = $('#adddes').val();
		if($.trim(pricelevelname) == ""){
			ctl_showMsg("票价等级名称不能为空！");
			return;
		}
		var data={pricelevelid:rowObj.pricelevelid,pricelevelname:pricelevelname,color:color,defaultchar:defaultchar,des:des,operType:'update'};
		publicAjaxRequest(pricelevelService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('pricelevel_grid');
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

function deletePricelevel(pricelevelid){
	ctl_confirm('您确定要删除吗？',function() {
		var data = {pricelevelid:pricelevelid,operType:'delete'};
		publicAjaxRequest(pricelevelService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('pricelevel_grid');
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

function qyPricelevel(pricelevelid){
	ctl_confirm('确定要发布吗？',function() {
		var data = {pricelevelid:pricelevelid,operType:'qy'};
		publicAjaxRequest(pricelevelService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('pricelevel_grid');
				ctl_showMsg("发布成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("发布失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

function jyPricelevel(pricelevelid){
	ctl_confirm('确定要禁用吗？',function() {
		var data = {pricelevelid:pricelevelid,operType:'jy'};
		publicAjaxRequest(pricelevelService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('pricelevel_grid');
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
	initPricelevelGrid();
});