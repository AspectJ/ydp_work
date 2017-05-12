//套票政策
var indexSetPolicyService="indexSetPolicyService";
var indexFavourableService="indexFavourableService";
var sessionsid = ccid;
var prefpolicyid='';//id
$(function(){
	
	//加载上演时间
	load_sysj();
	
	$("#indexSession_two_ccbh").text(sessionscode);
	$("#indexSession_two_ccmc_txt").text(sessionsname);
	ctl_initGrid({
		jqGridId:"indexSetPllicy_grid",
		serviceId:indexSetPolicyService,
		requestDataXml:{operType:"index",sessionsid:sessionsid},
		singleRowData:true,
		dataFormat:jsonType,
		colNames:['套票政策ID','场次ID','套票政策名称','数量','说明','票面是否显示套票字','票面显示的指定文字','开始时间','结束时间','操作'],
		colModel:[
		{name:'setpolicyid',index:'setpolicyid',hidden:true},
		{name:'sessionsid',index:'sessionsid',hidden:true},
		{name:'policyname',index:'policyname'},
		{name:'numb',index:'numb'},
		{name:'des',index:'des'},
		{name:'setshow',index:'setshow'},
		{name:'charshow',index:'charshow',hidden:true},
		{name:'begintime',index:'begintime'},
		{name:'endtime',index:'endtime'},
		{name:'oper',index:'oper',align:"center"}],
		pager:"indexSetPllicy_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){
			var ids = ctl_getAllDataIds('indexSetPllicy_grid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var rowObj = ctl_getRowObjForRowNo('indexSetPllicy_grid',cl);
   				var oper = "";
   				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateFavourable(\""+cl+"\")>修改</a>";
   				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteFavourable(\""+rowObj.setpolicyid+"\")>删除</a>";   				
   				oper=xg+" | "+sc;
   				ctl_setCell('indexSetPllicy_grid', cl, 'oper', oper);
   			}   
   			
   			addAutoSize([{
   				htmlId : "indexSetPllicy_grid",// 页面中元素的id
   				htmlType : "jqgrid",// 表示为jqgrid
   				widthResize : -405,// 缩放比例后需要调整的宽度
   				heightResize : -350
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
	
	//查询
	$("#query_btn").click(function(){
		var name=$("#name").val();
		var data ={operType:"index",sessionsid:sessionsid};
		data.name =name;
		ctl_onPagingForConditions('indexSetPllicy_grid', indexSetPolicyService, true, data,jsonType);
	});
	
	//添加
	$("#add_btn").click(function(){
		var dlg = ctl_dialogDivClose('', {
	        title: '新增套票政策',
	        content: 'indexFavourable_div',
	        lock: true,
	        min: false,
	        max: false,
	        drag: false,
	        resize: false
	    },
	    ['indexFavourable_cancel_btn']);
		
		//上演时间
		var sysj=$("#playtime_hidden_id").val();
		$("#indexFavourable_kssj").focus(function(){
			var jssj=$("#indexFavourable_jssj").val();
			if(""==jssj){
				 ctl_initDate({
	                 dateFmt: 'yyyy-MM-dd HH:mm:ss',
	                 maxDate: sysj
	             });
			}else{
				 ctl_initDate({
	                 dateFmt: 'yyyy-MM-dd HH:mm:ss',
	                 maxDate: jssj
	             });
			}
		});
		$("#indexFavourable_jssj").focus(function(){
			var syksj=$("#indexFavourable_kssj").val();
			if(""!=syksj){
				 ctl_initDate({
	                 dateFmt: 'yyyy-MM-dd HH:mm:ss',
	                 minDate: syksj,
	                 maxDate: sysj
	             });
			}else{
				 ctl_initDate({
	                 dateFmt: 'yyyy-MM-dd HH:mm:ss',
	                 maxDate: sysj
	             });
			}
		});
	
		
		//保存
		$("#indexFavourable_ok_btn").click(function(){	
			var zcmc=$("#indexFavourable_yhzcmc").val();	
			var kssj=$("#indexFavourable_kssj").val();//开始时间
			var jssj=$("#indexFavourable_jssj").val();//结束时间
			var bj=$("#indexFavourable_bj").val();//标记
			var sl=$("#indexFavourable_sl").val();//数量		
			var ids = ctl_getAllDataIds('pjdj_grid');
			var detail = "";
			for ( var i = 0; i < ids.length; i++) {
				var rowObj = ctl_getRowObjForRowNo("pjdj_grid",ids[i]);
				var pricelevelid = rowObj.pricelevelid;
				var price=rowObj.price;//原票价
				var tpj = $("#"+ids[i]+"_tpj").val();
				if(tpj == ""){
					continue;
				}
				if(detail == ""){
					detail = "{pricelevelid:'"+pricelevelid+"',tpj:'"+tpj+"',price:'"+price+"'}";
				}else{
					detail += "&"+"{pricelevelid:'"+pricelevelid+"',tpj:'"+tpj+"',price:'"+price+"'}";
				}
			}
			
			if(""==zcmc){
				ctl_showMsg("套票政策名称不能为空");
				return;
			}
			if(""==sl){
				ctl_showMsg("数量不能为空");
				return;
			}
			if(""==kssj){
				ctl_showMsg("开始时间不能为空");
				return;
			}
			if(""==jssj){
				ctl_showMsg("结束时间不能为空");
				return;
			}
			var data={sessionsid:sessionsid,zcmc:zcmc,kssj:kssj,jssj:jssj,bj:bj,sl:sl,operType:'add',detail:detail}; 
		     publicAjaxRequest(indexSetPolicyService,data,jsonType, function(response) {
					var rdata = response.data;
					if("success" == rdata) {
						ctl_reloadGrid('indexSetPllicy_grid');	
						ctl_showMsg("新增成功！");
						dlg.close();
					}else if("fail" == rdata){
						ctl_showMsg("新增失败");
					}else {
						ctl_showMsg("新增失败！");
					}
				});

		});	
		ctl_initGrid({
			jqGridId:"pjdj_grid",
			serviceId:indexFavourableService,
			requestDataXml:{operType:"selectPjdj",sessionsid:sessionsid},
			singleRowData:true,
			dataFormat:jsonType,
			editable: true,
			width:600,
			height:200,
			colNames:['sessntkprid','pricelevelid','票价等级名称','原票价','套票价'],
			colModel:[
			{name:'sessntkprid',index:'sessntkprid',hidden:true},
			{name:'pricelevelid',index:'pricelevelid',hidden:true},
			{name:'pricelevelname',index:'pricelevelname'},
			{name:'price',index:'price'},
			{name:'tpj',index:'tpj',editable:true}
			],
			pager:"pjdj_pager",
			rowNum:10,
			viewrecords:true,
			rowList:[10,20,30],
			gridComplete:function(){		
				var ids = ctl_getAllDataIds('pjdj_grid');
				var cl='';
				for ( var i = 0; i < ids.length; i++) {
					cl = ids[i];
					intoEditRow("pjdj_grid", cl);
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
	});
	
	
	//下一步
	$("#indexSession_second_next_btn").click(function(){
		showstepurl("pages/favourable/indexFavourable.html","第四步（销售）","优惠政策");
		$(".step span").removeClass("bggreen");
		$(".step span").removeClass("c_f");
		$("#step_yhzc").addClass("bggreen");
		$("#step_yhzc").addClass("c_f");
	});
});
	
function initDetail_grid(prefpolicyid,width,sl){
	ctl_initGrid({
		jqGridId:"indexFavourable_yhzc_grid",
		serviceId:indexFavourableService,
		requestDataXml:{prefpolicyid:prefpolicyid,operType:"queryDetail"},
		singleRowData:true,
		dataFormat:jsonType,
		editable: true,
		width:width,
		height:200,
		colNames:['detailid','票价等级ID','票价等级名称','原票价','policyid','套票价','操作'],
		colModel:[
		{name:'detailid',index:'detailid',hidden:true},
		{name:'pricelevelid',index:'pricelevelid',hidden:true},
		{name:'pricelevelname',index:'pricelevelname'},
		{name:'price',index:'price'},
		{name:'policyid',index:'policyid',hidden:true},
		{name:'yhpj',index:'yhpj',editable:true},
		{name:'oper',index:'oper',align:"center",width:350}],
		pager:"indexFavourable_yhzc_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){		
			var ids = ctl_getAllDataIds('indexFavourable_yhzc_grid');
			var cl='';
			for ( var i = 0; i < ids.length; i++) {
				cl = ids[i];
				var rowObj = ctl_getRowObjForRowNo('indexFavourable_yhzc_grid',cl);
				intoEditRow("indexFavourable_yhzc_grid", cl);
				var oper = "";
				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deletePllicyDetail(\""+rowObj.detailid+"\",\""+prefpolicyid+"\",\""+rowObj.price+"\")>删除</a>";   				
				oper=sc;
				ctl_setCell('indexFavourable_yhzc_grid', cl, 'oper', oper);
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
}

//删除
function deleteFavourable(id){
	ctl_confirm("您确定要删除吗？",function() {
		var data = {operType:"delete",setpolicyid:id};
		publicAjaxRequest(indexSetPolicyService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('indexSetPllicy_grid');
				ctl_showMsg("删除成功！");
			}else {
				ctl_showMsg("删除失败！");
			}
		});
	},function(){});
}

//修改
function updateFavourable(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改套票政策',
        content: 'indexFavourable_upate_div',
        top:'20%',
        left:'40%',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['indexFavourable_update_cancel_btn']); 	
	var rowObj = ctl_getRowObjForRowNo('indexSetPllicy_grid',rowId);
	
	
	
	var prefpolicyid=rowObj.setpolicyid;	
	var sl=rowObj.numb;
    $("#indexFavourable_sl").val(rowObj.numb);
	$("#indexFavourable_update_yhzcmc").val(rowObj.policyname);
	$("#indexFavourable_update_kssj").val(rowObj.begintime);
	$("#indexFavourable_update_jssj").val(rowObj.endtime);
	$("#indexFavourable_update_bj").val(rowObj.charshow);
	
	//上演时间
	var sysj=$("#playtime_hidden_id").val();
	$("#indexFavourable_update_kssj").focus(function(){
		var jssj=$("#indexFavourable_update_jssj").val();
		if(""==jssj){
			 ctl_initDate({
                 dateFmt: 'yyyy-MM-dd HH:mm:ss',
                 maxDate: sysj
             });
		}else{
			 ctl_initDate({
                 dateFmt: 'yyyy-MM-dd HH:mm:ss',
                 maxDate: jssj
             });
		}
	});
	$("#indexFavourable_update_jssj").focus(function(){
		var syksj=$("#indexFavourable_update_kssj").val();
		if(""!=syksj){
			 ctl_initDate({
                 dateFmt: 'yyyy-MM-dd HH:mm:ss',
                 minDate: syksj,
                 maxDate: sysj
             });
		}else{
			 ctl_initDate({
                 dateFmt: 'yyyy-MM-dd HH:mm:ss',
                 maxDate: sysj
             });
		}
	});
	
	//保存
	$("#indexFavourable_update_ok_btn").click(function(){
		var ccmc=$("#indexFavourable_update_ccmc_sel").val();
		var yhzcmc=$("#indexFavourable_update_yhzcmc").val();
		var kssj=$("#indexFavourable_update_kssj").val();
		var jssj=$("#indexFavourable_update_jssj").val();
		var bj=$("#indexFavourable_update_bj").val();
		var ids = ctl_getAllDataIds('indexFavourable_yhzc_grid');
		var sl=$("#indexFavourable_sl").val();
		var detail = "";
		for ( var i = 0; i < ids.length; i++) {
			var rowObj = ctl_getRowObjForRowNo("indexFavourable_yhzc_grid",ids[i]);
			var pricelevelid = rowObj.pricelevelid;
			var detailid=rowObj.detailid;
			var yhpj = $("#"+ids[i]+"_yhpj").val();
			var price=rowObj.price;
		
			if(yhpj == ""){
				continue;
			}
			if(detail == ""){
				detail = "{pricelevelid:'"+pricelevelid+"',yhpj:'"+yhpj+"',price:'"+price+"',detailid:'"+detailid+"'}";
			}else{
				detail += "&"+"{pricelevelid:'"+pricelevelid+"',yhpj:'"+yhpj+"',price:'"+price+"',detailid:'"+detailid+"'}";
			}
		}
		if(""==yhzcmc){
			ctl_showMsg("优惠政策名称不能为空");
			return;
		}
		if(""==sl){
			ctl_showMsg("数量不能为空");
			return;
		}
		var reg = new RegExp("^[0-9]*$");  
		if(""!=sl){
			if(!reg.test(sl)){  
				ctl_showMsg("数量只能为数字!"); 
				return;
			 }  
		}
		if(""==ccmc){
			ctl_showMsg("场次名称不能为空");
			return;
		}
		if(""==kssj){
			ctl_showMsg("开始时间不能为空");
			return;
		}
		if(""==jssj){
			ctl_showMsg("结束时间不能为空");
			return;
		}
		var data={sessionsid:sessionsid,yhzcmc:yhzcmc,kssj:kssj,jssj:jssj,bj:bj,prefpolicyid:prefpolicyid,operType:'update',detail:detail,sl:sl}; 
	    publicAjaxRequest(indexSetPolicyService,data,jsonType, function(response) {
				var rdata = response.data;
				if("success" == rdata) {
					dlg.close();
					ctl_reloadGrid('indexSetPllicy_grid');
					ctl_showMsg("修改成功！");
				}else if("fail" == rdata){
					ctl_showMsg("修改失败");
				}else {
					ctl_showMsg("修改失败！");
				}
			});
	});
	initDetail_grid(prefpolicyid,600,sl);
}

//修改票价等级的数据
function updatePllicyDetail(prefpolicyid,rowId,sl){
	var dlg = ctl_dialogDivClose('', {
        title: '修改明细',
        content: 'indexFavourable_detail_update_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['indexFavourable_detail_cancel_btn']); 
	var rowObj = ctl_getRowObjForRowNo('indexFavourable_yhzc_grid',rowId);
	var policyid=rowObj.policyid;
	var detailid=rowObj.detailid;
	
	//票价等级
	$("#indexFavourable_detail_pjdj").ctl_select({
	        id: 'indexFavourable_detail_pjdj_sel',
	        width: 115,
	        listboxmaxheight: 300,
			listboxalign : 'auto',
			listboxmaxheight : 200,
			dialogId:'indexFavourable_detail_update_div',
			columns : 1,
	        checkbox: false,
	        disabled: false,
	        columnValue: 'pricelevelid',
	        hiddenId:'indexFavourable_detail_pjdj_name',
	        columnName: 'pname',
	        selected:[''],
	        url: springMvcUrl,
	        type: 'post',
	        dateType: 'json',
	        param: {
	            param: getParam(indexFavourableService),
	            data: "{operType:'queryPjdj',sessionsid:'"+sessionsid+"'}"
	        },onchange:function(name,value){
	        	var pricename=name;
				var price=pricename.split("(")[1];
				var p=price.substring(0,price.length-2);
				var sumPrice=p*parseInt($("#indexFavourable_detail_sl").val());
				$("#indexFavourable_detail_jg").val(sumPrice);
	        }
   });	
	
	$("#indexFavourable_detail_sl").change(function(){
		var pjdj=$("#indexFavourable_detail_pjdj_sel").val();
		var name=$("#indexFavourable_detail_pjdj_name").val();
		if($.trim(pjdj)==""){
			ctl_showMsg("请选择票价等级");
			return;
		}
		var sl=$("#indexFavourable_detail_sl").val();
		if($.trim(sl)==""){
			ctl_showMsg("请输入数量");
			return;
		}
		var pricename=name;
		var price=pricename.split("(")[1];
		var p=price.substring(0,price.length-2);
		var sumPrice=p*parseInt($("#indexFavourable_detail_sl").val());
		$("#indexFavourable_detail_jg").val(sumPrice);
	});
	$("#indexFavourable_detail_sl").val(sl);
	$("#indexFavourable_detail_sl").change(function(){
		var pjdj=$("#indexFavourable_detail_pjdj_sel").val();
		var name=$("#indexFavourable_detail_pjdj_name").val();
		if($.trim(sessionsid)==""){
			ctl_showMsg("请先选择场次");
			return;
		}
		if($.trim(pjdj)==""){
			ctl_showMsg("请选择票价等级");
			return;
		}
		var sl=$("#indexFavourable_detail_sl").val();
		if($.trim(sl)==""){
			ctl_showMsg("请输入数量");
			return;
		}
		var pricename=name;
		var price=pricename.split("(")[1];
		var p=price.substring(0,price.length-2);
		var sumPrice=p*parseInt($("#indexFavourable_detail_sl").val());
		$("#indexFavourable_detail_jg").val(sumPrice);
	});
	
	//保存
	$("#indexFavourable_detail_save_btn").click(function(){	
		var sl=$("#indexFavourable_detail_sl").val();
		var jg=$("#indexFavourable_detail_jg").val();
		var pjdj=$("#indexFavourable_detail_pjdj_sel").val();
		if($.trim(sessionsid)==""){
			ctl_showMsg("场次名称不能为空");
			return;
		}
		if($.trim(sl)==""){
			ctl_showMsg("数量不能为空");
			return;
		}
		if($.trim(pjdj)==""){
			ctl_showMsg("票价不能为空");
			return;
		}
		var pjdjs=pjdj.split(":")[0];
		if($.trim(jg)==""){
			ctl_showMsg("总价不能为空");
			return;
		}
		var data={detailid:detailid,pjdj:pjdjs,jg:jg,sl:sl,policyid:policyid,ccmc:sessionsid,operType:'updateDetail'};
		publicAjaxRequest(indexSetPolicyService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('indexSetPllicy_grid');
				ctl_reloadGrid('indexFavourable_yhzc_grid');
				ctl_showMsg("修改成功！");
			}else if("fail" == rdata){
				ctl_showMsg("修改失败");
			}else {
				ctl_showMsg("修改失败！");
			}
		});
	});
}

function deletePllicyDetail(detailid,setpolicyid,price){
	ctl_confirm("您确定要删除吗？",function() {
		var data = {operType:"deleteDetail",detailid:detailid,setpolicyid:setpolicyid,price:price};
		publicAjaxRequest(indexSetPolicyService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('indexFavourable_yhzc_grid');
				ctl_showMsg("删除成功！");
			}else {
				ctl_showMsg("删除失败！");
			}
		});
	},function(){});
}

//上演时间
function load_sysj(){
	var data = {operType:"querySessionSysj",sessionsid:sessionsid};
	publicAjaxRequest(indexSetPolicyService,data,jsonType, function(response) {
		var rdata = response.data;
		var playtime=rdata.playtime;
		$("#playtime_hidden_id").val(playtime);
	});
}