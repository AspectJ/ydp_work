var sellerService='sellerService';
function initSellerGrid(){
	ctl_initGrid({
		jqGridId:"seller_grid",
		serviceId:sellerService,
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		width:500,
		height:200,
		colNames:['售票员ID','售票点ID','登录用户名','登录密码','最近一次登录时间','最近一次登录IP','登录次数','姓名','性别','年龄','联系电话','头像URL','禁启状态','状态','操作'],
		colModel:[
		{name:'sellerid',index:'sellerid',hidden:true},
		{name:'payboxid',index:'payboxid',hidden:true},
		{name:'username',index:'username'},
		{name:'pass',index:'pass'},
		{name:'lasttime',index:'lasttime',hidden:true},
		{name:'lastip',index:'lastip',hidden:true},
		{name:'times',index:'times',hidden:true},
		{name:'realname',index:'realname'},
		{name:'sex',index:'sex'},
		{name:'age',index:'age'},
		{name:'tele',index:'tele'},
		{name:'txurl',index:'txurl',hidden:true},
		{name:'status',index:'status',hidden:true},
		{name:'statusname',index:'statusname'},
		{name:'oper',index:'oper',align:"center"}],
		pager:"seller_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){
			var ids = ctl_getAllDataIds('seller_grid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var rowObj = ctl_getRowObjForRowNo('seller_grid',cl);
   				var oper = "";
   				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateSeller(\""+cl+"\")>修改</a>";
   				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteSeller(\""+rowObj.sellerid+"\")>删除</a>";   				
   				var qy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=qySeller(\""+rowObj.sellerid+"\")>启用</a>";
   				var jy = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=jySeller(\""+rowObj.sellerid+"\")>禁用</a>";
   				var sctp="<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=sctpSeller(\""+rowObj.sellerid+"\")>上传</a>";
   				var status = rowObj.status;
	   			if(status == '1'){
	   				oper = jy+ " | " + xg + " | " +sc+" | "+sctp;
	   			}else if(status == '2'){
	   				oper = qy;
	   			}
   				ctl_setCell('seller_grid', cl, 'oper', oper);
   			}
   			
            addAutoSize([{
                htmlId: "seller_grid",
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


$('#seller_query').click(function(){
	var data ={operType:"index"};
	data.username =$("#username").val();
	data.status=$("#status_sel").val();
	ctl_onPagingForConditions('seller_grid', sellerService, true, data,jsonType);
});

$("#seller_add").click(function (){
	var dlg = ctl_dialogDivClose('', {
        title: '新增',
        content: 'addseller_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addseller_close']);
	
	//性别
	$("#addSex").ctl_select({
        id: "addSex_sel",
        dialogId:'addseller_div',
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        selected:['男'],
        data:{'男':'男','女':'女'},
    });
	
	//查询上级演出商名称
	$("#spd").ctl_select({
        id: 'spd_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
        dialogId:'addseller_div',
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
            param: getParam(sellerService),
            data: "{operType:'queryspd'}"
        }
    });	
	$("#addseller_save").click(function() {		
		var payboxid = $('#spd_sel').val();
		var username = $('#addusername').val();
		var pass = $('#addpass').val();
		var realname = $('#addrealname').val();
		var sex = $('#addSex_sel').val();
		var age = $('#addage').val();
		var tele = $('#addtele').val();
		if($.trim(username) == ""){
			ctl_showMsg("登录用户名不能为空");
			return;
		}	
		if($.trim(pass) == ""){
			ctl_showMsg("登录密码不能为空");
			return;
		}	
		if($.trim(age) == ""){
			ctl_showMsg("年龄不能为空");
			return;
		}	
		if($.trim(tele) == ""){
			ctl_showMsg("联系电话不能为空");
			return;
		}	
		var data={payboxid:payboxid,username:username,pass:pass,realname:realname,sex:sex,age:age,tele:tele,operType:'add'};		
		publicAjaxRequest(sellerService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('seller_grid');
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

//上传图片
function sctpSeller(sellerid){	
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
	         param:getParam(sellerService),
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
			var data={sellerid:sellerid,url:url,operType:'update'};		
			publicAjaxRequest(sellerService,data,jsonType, function(response) {
				var rdata = response.data;
				if("success" == rdata) {
					dlg.close();
					ctl_reloadGrid('seller_grid');
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

function updateSeller(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改',
        content: 'addseller_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addseller_close']);	
    var rowObj = ctl_getRowObjForRowNo('seller_grid',rowId);
    
	//性别
	$("#addSex").ctl_select({
        id: "addSex_sel",
        dialogId:'addseller_div',
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        columns: 1,
        selected:[rowObj.sex],
        data:{'男':'男','女':'女'},
    });
	
	//查询上级演出商名称
	$("#spd").ctl_select({
        id: 'spd_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
        dialogId:'addseller_div',
    	selectedIndex: '',
    	selected:[rowObj.payboxid],
		defaultValue : '',
		defaultText : '请选择',
        columnValue: 'payboxid',
        columnName: 'payboxname',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(sellerService),
            data: "{operType:'queryspd'}"
        }
    });		
	$('#addusername').val(rowObj.username);
	$('#addpass').val(rowObj.pass);
	$('#addrealname').val(rowObj.realname);
	$('#addage').val(rowObj.age);
	$('#addtele').val(rowObj.tele);	
	$("#addseller_save").click(function() {		
		var payboxid = $('#spd_sel').val();
		var username = $('#addusername').val();
		var pass = $('#addpass').val();
		var realname = $('#addrealname').val();
		var sex = $('#addsex').val();
		var age = $('#addage').val();
		var tele = $('#addtele').val();	
		if($.trim(username) == ""){
			ctl_showMsg("登录用户名不能为空");
			return;
		}	
		if($.trim(pass) == ""){
			ctl_showMsg("登录密码不能为空");
			return;
		}	
		if($.trim(age) == ""){
			ctl_showMsg("年龄不能为空");
			return;
		}	
		if($.trim(tele) == ""){
			ctl_showMsg("联系电话不能为空");
			return;
		}
		var data={sellerid:rowObj.sellerid,payboxid:payboxid,username:username,pass:pass,realname:realname,sex:sex,age:age,tele:tele,operType:'update'};
		publicAjaxRequest(sellerService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('seller_grid');
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

function deleteSeller(sellerid){
	ctl_confirm('您确定要删除吗？',function() {
		var data = {sellerid:sellerid,operType:'delete'};
		publicAjaxRequest(sellerService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('seller_grid');
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

function qySeller(sellerid){
	ctl_confirm('确定要启用吗？',function() {
		var data = {sellerid:sellerid,operType:'qy'};
		publicAjaxRequest(sellerService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('seller_grid');
				ctl_showMsg("启用成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("启用失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

function jySeller(sellerid){
	ctl_confirm('确定要禁用吗？',function() {
		var data = {sellerid:sellerid,operType:'jy'};
		publicAjaxRequest(sellerService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('seller_grid');
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
	
	initSellerGrid();
	
});