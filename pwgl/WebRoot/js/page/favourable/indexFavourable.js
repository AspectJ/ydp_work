//优惠政策
var indexFavourableService="indexFavourableService";
var sessionsid=ccid==null?"":ccid;
var prefpolicyid='';//id
$(function(){
	
	//加载上演时间
	load_sysj();
	
	$("#indexSession_two_ccbh").text(sessionscode);
	$("#indexSession_two_ccmc_txt").text(sessionsname);
	ctl_initGrid({
		jqGridId:"indexSetPllicy_yhzc_grid",
		serviceId:indexFavourableService,
		requestDataXml:{operType:"index",sessionsid:sessionsid},
		singleRowData:true,
		dataFormat:jsonType,
		width:1500,
		height:500,
		colNames:['票价优惠政策ID','场次ID','优惠政策名称','数量','折扣比例','票面显示的指定文字','是否显示原价','是否显示折扣价','开始时间','结束时间','操作'],
		colModel:[
		{name:'prefpolicyid',index:'prefpolicyid',hidden:true},
		{name:'sessionsid',index:'sessionsid',hidden:true},
		{name:'policyname',index:'policyname'},
		{name:'numb',index:'numb'},
		{name:'agio',index:'agio',hidden:true},
		{name:'charshow',index:'charshow'},
		{name:'origshow',index:'origshow',hidden:true},
		{name:'agioshow',index:'agioshow',hidden:true},
		{name:'begintime',index:'begintime'},
		{name:'endtime',index:'endtime'},
		{name:'oper',index:'oper',align:"center"}],
		pager:"indexSetPllicy_yhzc_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){
			var ids = ctl_getAllDataIds('indexSetPllicy_yhzc_grid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var rowObj = ctl_getRowObjForRowNo('indexSetPllicy_yhzc_grid',cl);
   				var oper = "";
   				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateFavourable(\""+cl+"\")>修改</a>";
   				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteFavourable(\""+rowObj.prefpolicyid+"\")>删除</a>";   				
   				oper=xg+" | "+sc;
   				ctl_setCell('indexSetPllicy_yhzc_grid', cl, 'oper', oper);
   			}  
   			addAutoSize([{
   				htmlId : "indexSetPllicy_yhzc_grid",// 页面中元素的id
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
	$("#indexFavourable_query_btn").click(function(){
		var name=$("#indexFavourable_name").val();
		var data ={operType:"index",sessionsid:sessionsid};
		data.name =name;
		ctl_onPagingForConditions('indexSetPllicy_yhzc_grid', indexFavourableService, true, data,jsonType);
	});
	
	//添加
	$("#indexFavourable_add_btn").click(function(){
		var dlg = ctl_dialogDivClose('', {
	        title: '新增优惠政策',
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

        //初始化表格数据
		init_priceLevel_grid();
		
		//保存
		$("#indexFavourable_ok_btn").click(function(){	
			var yhzcmc=$("#indexFavourable_yhzcmc").val();	
			var kssj=$("#indexFavourable_kssj").val();//开始时间
			var jssj=$("#indexFavourable_jssj").val();//结束时间
			var bj=$("#indexFavourable_bj").val();//标记
			var sl=$("#indexFavourable_sl").val();//数量	
			var ids = ctl_getAllDataIds('pjdj_grid');
			var detail = "";
			for ( var i = 0; i < ids.length; i++) {
				var rowObj = ctl_getRowObjForRowNo("pjdj_grid",ids[i]);
				var pricelevelid = rowObj.pricelevelid;
				var yhpj = $("#"+ids[i]+"_yhpj").val();
				var price=rowObj.price;
				if(yhpj == ""){
					continue;
				}
				if(detail == ""){
					detail = "{pricelevelid:'"+pricelevelid+"',yhpj:'"+yhpj+"',price:'"+price+"'}";
				}else{
					detail += "&"+"{pricelevelid:'"+pricelevelid+"',yhpj:'"+yhpj+"',price:'"+price+"'}";
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
			if(""==kssj){
				ctl_showMsg("开始时间不能为空");
				return;
			}
			if(""==jssj){
				ctl_showMsg("结束时间不能为空");
				return;
			}			
			var data={ccmc:sessionsid,yhzcmc:yhzcmc,kssj:kssj,jssj:jssj,bj:bj,detail:detail,sl:sl,operType:'add'}; 
		     publicAjaxRequest(indexFavourableService,data,jsonType, function(response) {
					var rdata = response.data;
					if("success" == rdata) {
						ctl_reloadGrid('indexSetPllicy_yhzc_grid');	
						ctl_showMsg("新增成功！");
						dlg.close();
					}else if("fail" == rdata){
						ctl_showMsg("新增失败");
					}else {
						ctl_showMsg("新增失败！");
					}
				});

		});	
	});
	
	//下一步
	$("#indexSession_second_next_btn").click(function(){
		showstepurl("pages/empowersell/indexSellEmpower.html","第四步（销售）","售票授权");
		$(".step span").removeClass("bggreen");
		$(".step span").removeClass("c_f");
		$("#step_spsq").addClass("bggreen");
		$("#step_spsq").addClass("c_f");
	});
});

//初始化票价等级表格数据
function init_priceLevel_grid(){
	ctl_initGrid({
		jqGridId:"pjdj_grid",
		serviceId:"indexFavourableService",
		requestDataXml:{operType:"selectPjdj",sessionsid:sessionsid},
		singleRowData:true,
		dataFormat:jsonType,
		editable: true,
		width:600,
		height:200,
		colNames:['sessntkprid','pricelevelid','票价等级名称','原票价','优惠票价'],
		colModel:[
		{name:'sessntkprid',index:'sessntkprid',hidden:true},
		{name:'pricelevelid',index:'pricelevelid',hidden:true},
		{name:'pricelevelname',index:'pricelevelname'},
		{name:'price',index:'price'},
		{name:'yhpj',index:'yhpj',editable:true}],
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
}
	
function initDetail_grid(prefpolicyid,width,zkbl,sl){
		ctl_initGrid({
			jqGridId:"indexFavourable_yhzc_grid",
			serviceId:indexFavourableService,
			requestDataXml:{prefpolicyid:prefpolicyid,operType:"queryDetail"},
			singleRowData:true,
			dataFormat:jsonType,
			editable: true,
			width:width,
			height:200,
			colNames:['detailid','票价等级ID','票价等级名称','原票价','policyid','优惠票价','操作'],
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
					var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updatePllicyDetail(\""+prefpolicyid+"\",\""+cl+"\",\""+zkbl+"\",\""+sl+"\")>修改</a>";
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
		var data = {operType:"deleteYhzc",prefpolicyid:id};
		publicAjaxRequest(indexFavourableService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('indexSetPllicy_yhzc_grid');
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
        title: '修改优惠政策',
        content: 'indexFavourable_upate_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['indexFavourable_update_cancel_btn']); 	
	var rowObj = ctl_getRowObjForRowNo('indexSetPllicy_yhzc_grid',rowId);
	var prefpolicyid=rowObj.prefpolicyid;	
	var zkbl=rowObj.agio;
	var sl=rowObj.numb;
    var itemid='';//项目代码
    $("#indexFavourable_sl").val(rowObj.numb);
	
	$("#indexFavourable_update_yhzcmc").val(rowObj.policyname);
	$("#indexFavourable_update_zkbl").val(rowObj.agio);
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
		var data={ccmc:sessionsid,yhzcmc:yhzcmc,kssj:kssj,jssj:jssj,bj:bj,prefpolicyid:prefpolicyid,operType:'updateYhzc',detail:detail,sl:sl}; 
	    publicAjaxRequest(indexFavourableService,data,jsonType, function(response) {
				var rdata = response.data;
				if("success" == rdata) {
					dlg.close();
					ctl_reloadGrid('indexSetPllicy_yhzc_grid');
					ctl_showMsg("修改成功！");
				}else if("fail" == rdata){
					ctl_showMsg("修改失败");
				}else {
					ctl_showMsg("修改失败！");
				}
			});
	});
	
	 initDetail_grid(prefpolicyid,600,zkbl,sl);
}


function deletePllicyDetail(detailid,setpolicyid,price,type){
	ctl_confirm("您确定要删除吗？",function() {
		var data = {operType:"deleteDetail",detailid:detailid,setpolicyid:setpolicyid,price:price};
		publicAjaxRequest(indexFavourableService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('indexFavourable_yhzc_grid');
				ctl_reloadGrid('indexSetPllicy_yhzc_grid');
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