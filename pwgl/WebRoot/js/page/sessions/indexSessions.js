var sessionsService='sessionsService';
var sessionsids='';
var producttypeids='';
var itemids='';
var venueids='';
var hallids='';
var performerids='';
var sessionscodes='';
var sessionsnames='';
var playtimes='';
var lengths='';
var begintimes='';
var endtimes='';
var sponsors='';
var dessponsors='';
var actualsponsors='';
var websites='';
var regnumbs='';
var introductions='';
var engnames='';
function initSessionsGrid(){
	ctl_initGrid({
		jqGridId:"sessions_grid",
		serviceId:sessionsService,
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		width:500,
		height:200,
		colNames:['场次ID','场馆ID','场次编号','场次名称','上演时间','所属项目','售票开始时间','售票截止时间','主办方','产品类别','检票次数','场次介绍','演出商名称',
		          '场馆','演出厅ID','演出厅名称','演出商ID','项目ID','场次英文名','片长','产品类别ID','指定主办方','承办方','网址','税号登记','场次状态',
		          '销售政策','票版信息','分区/座位','状态',
		          '操作'
		          ],
		colModel:[
		{name:'sessionsid',index:'sessionsid',hidden:true},
		{name:'venueid',index:'venueid',hidden:true},
		{name:'sessionscode',index:'sessionscode',width:70},
		{name:'sessionsname',index:'sessionsname',width:160},
		{name:'playtime',index:'playtime',width:100},
		{name:'itemname',index:'itemname',width:100},	
		{name:'begintime',index:'begintime',sorttype: "date",width:100,hidden:true},
		{name:'endtime',index:'endtime',sorttype: "date",width:100,hidden:true},
		{name:'sponsor',index:'sponsor',hidden:true},
		{name:'typename',index:'typename',width:50},
		{name:'checktimes',index:'checktimes',hidden:true},
		{name:'introduction',index:'introduction',hidden:true},
		{name:'performername',index:'performername',width:100,hidden:true},
		{name:'venuename',index:'venuename',width:80},
		{name:'hallid',index:'hallid',hidden:true},	
		{name:'hallname',index:'hallname',hidden:true},
		{name:'performerid',index:'performerid',hidden:true},		
		{name:'itemid',index:'itemid',hidden:true},		
		{name:'engname',index:'engname',hidden:true},		
		{name:'length',index:'length',hidden:true},		
		{name:'producttypeid',index:'producttypeid',hidden:true},
		{name:'dessponsor',index:'dessponsor',hidden:true},
		{name:'actualsponsor',index:'actualsponsor',hidden:true},
		{name:'website',index:'website',hidden:true},		
		{name:'regnumb',index:'regnumb',hidden:true},	
		{name:'status',index:'status',hidden:true},		
		{name:'xszc',index:'xszc',align:"center",width:80,hidden:true},
		{name:'pbxx',index:'pbxx',align:"center",width:80,hidden:true},
		{name:'fq',index:'fq',align:"center",width:80,hidden:true},
		{name:'statusname',index:'statusname',width:50},
		{name:'oper',index:'oper',align:"center",width:175}],
		pager:"sessions_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){
			var ids = ctl_getAllDataIds('sessions_grid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var rowObj = ctl_getRowObjForRowNo('sessions_grid',cl);
   				var oper = "";
   				var xg="<input type='button' value='修改'  class='f14 ff bod bod_r c_p bgcolor pt5 pb5 pl15 pr15' onclick=updateSessions(\""+cl+"\") />";
   				var sc="<input type='button' value='删除'  class='f14 ff bod bod_r c_p bgcolor pt5 pb5 pl15 pr15' onclick=deleteSessions(\""+rowObj.sessionsid+"\") />";
   				var status = rowObj.status;
	   			if(status == '1' || status == '3'){
	   				oper = xg+"  "+sc;
	   			} 
//	   			var statusname="";
//   				if(status=='1'){
//   					statusname = "<span style='color:green;font-weight:bold;'>"+rowObj.statusname+"</span>";
//   				}else{
//   					statusname = "<span style='color:red;font-weight:bold;'>"+rowObj.statusname+"</span>";
//   				}
//   				ctl_setCell('sessions_grid', cl, 'statusname', statusname);
	 			ctl_setCell('sessions_grid', cl, 'fq', '查看');
	 			ctl_setCell('sessions_grid', cl, 'pbxx', '查看');
	   			ctl_setCell('sessions_grid', cl, 'xszc', '查看');
   				ctl_setCell('sessions_grid', cl, 'oper', oper);
   			}   			
            addAutoSize([{
                htmlId: "sessions_grid",
                htmlType: "jqgrid",
                widthResize: -280,
                heightResize: -210
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


$('#sessions_query').click(function(){
		var data ={operType:"index"};
		data.zt=$("#zt_sel").find("option:selected").val();//状态
		data.ccmc =$("#ccmc").val();//场次名称
		data.sysjkssj=$("#sysjkssj").val();//上演开始时间
		data.sysjjssj=$("#sysjjssj").val();//上演结束时间
		data.ycs=$("#ycs").val();//演出商
		data.cg=$("#cg").val();//场馆
		ctl_onPagingForConditions('sessions_grid', sessionsService, true, data,jsonType);
});

//创建场次
$("#sessions_add").click(function(){
	sessionsids='';
	$.cookie("cctype", "show");
	openUrl('pages/sessions/main.html','创建场次','创建场次');
});

$("#sessions_add").click(function (){
//	var dlg = ctl_dialogDivClose('', {
//        title: '新增',
//        content: 'addsessions_div',
//        lock: true,
//        min: false,
//        max: false,
//        drag: false,
//        resize: false
//    },
//    ['addsessions_close']);
	
//	//产类别名称
//	$("#cplbmc").ctl_select({
//        id: 'cplbmc_sel',
//        width: 115,
//        listboxmaxheight: 300,
//		listboxalign : 'auto',
//		listboxmaxheight : 200,
//		columns : 1,
//        checkbox: false,
//        disabled: false,
//    	selectedIndex: '',
//    	selected:[],
//		defaultValue : '',
//		dialogId:'addsessions_div',
//		defaultText : '请选择',
//        columnValue: 'producttypeid',
//        columnName: 'typename',
//        url: springMvcUrl,
//        type: 'post',
//        dateType: 'json',
//        param: {
//            param: getParam(sessionsService),
//            data: "{operType:'querycplbmc'}"
//        }
//    });
//	
//	
//	//项目名称
//	$("#xmmc").ctl_select({
//        id: 'xmmc_sel',
//        width: 115,
//        listboxmaxheight: 300,
//		listboxalign : 'auto',
//		listboxmaxheight : 200,
//		columns : 1,
//        checkbox: false,
//        disabled: false,
//    	selectedIndex: '',
//    	selected:[],
//		defaultValue : '',
//		dialogId:'addsessions_div',
//		defaultText : '请选择',
//        columnValue: 'itemid',
//        columnName: 'itemname',
//        url: springMvcUrl,
//        type: 'post',
//        dateType: 'json',
//        param: {
//            param: getParam(sessionsService),
//            data: "{operType:'queryxmmc'}"
//        }
//    });
//	
//	//场管名称
//	$("#cgmc").ctl_select({
//        id: 'cgmc_sel',
//        width: 115,
//        listboxmaxheight: 300,
//		listboxalign : 'auto',
//		listboxmaxheight : 200,
//		columns : 1,
//        checkbox: false,
//        disabled: false,
//    	selectedIndex: '',
//    	selected:[],
//		defaultValue : '',
//		dialogId:'addsessions_div',
//		defaultText : '请选择',
//        columnValue: 'venueid',
//        columnName: 'venuename',
//        url: springMvcUrl,
//        type: 'post',
//        dateType: 'json',
//        param: {
//            param: getParam(sessionsService),
//            data: "{operType:'queryCgmc'}"
//        }
//    });
//	
//	
//	//演出厅名称
//	$("#yctmc").ctl_select({
//        id: 'yctmc_sel',
//        width: 115,
//        listboxmaxheight: 300,
//		listboxalign : 'auto',
//		listboxmaxheight : 200,
//		columns : 1,
//        checkbox: false,
//        disabled: false,
//    	selectedIndex: '',
//    	selected:[],
//		defaultValue : '',
//		dialogId:'addsessions_div',
//		defaultText : '请选择',
//        columnValue: 'hallid',
//        columnName: 'hallname',
//        url: springMvcUrl,
//        type: 'post',
//        dateType: 'json',
//        param: {
//            param: getParam(sessionsService),
//            data: "{operType:'queryyctmc'}"
//        }
//    });
//	
//	//演出商名称
//	$("#ycsmc").ctl_select({
//        id: 'ycsmc_sel',
//        width: 115,
//        listboxmaxheight: 300,
//		listboxalign : 'auto',
//		listboxmaxheight : 200,
//		columns : 1,
//        checkbox: false,
//        disabled: false,
//    	selectedIndex: '',
//    	selected:[],
//		defaultValue : '',
//		dialogId:'addsessions_div',
//		defaultText : '请选择',
//        columnValue: 'performerid',
//        columnName: 'performername',
//        url: springMvcUrl,
//        type: 'post',
//        dateType: 'json',
//        param: {
//            param: getParam(sessionsService),
//            data: "{operType:'queryycsmc'}"
//        }
//    });	
//	$("#addsessions_save").click(function() {
//			var venueid = $('#cgmc_sel').val();
//			var hallid = $('#yctmc_sel').val();
//			var performerid = $('#ycsmc_sel').val();
//			var itemid = $('#xmmc_sel').val();
//			var sessionscode = $('#addsessionscode').val();
//			var sessionsname = $('#addsessionsname').val();
//			var engname = $('#addengname').val();
//			var playtime = $('#addplaytime').val();
//			var length = $('#addlength').val();
//			var begintime = $('#addbegintime').val();
//			var endtime = $('#addendtime').val();
//			var producttypeid = $('#cplbmc_sel').val();
//			var sponsor = $('#addsponsor').val();
//			var dessponsor = $('#adddessponsor').val();
//			var actualsponsor = $('#addactualsponsor').val();
//			var website = $('#addwebsite').val();
//			var checktimes = $('#addchecktimes').val();
//			var regnumb = $('#addregnumb').val();
//			var introduction = $('#addintroduction').val();	
//			if($.trim(venueid)==""){
//				ctl_showMsg("场馆不能为空");
//				return;
//			}
//			if($.trim(hallid)==""){
//				ctl_showMsg("演出厅不能为空");
//				return;
//			}
//			if($.trim(performerid)==""){
//				ctl_showMsg("演出商不能为空");
//				return;
//			}
//			if($.trim(itemid)==""){
//				ctl_showMsg("项目名称不能为空");
//				return;
//			}
//			if($.trim(sessionscode)==""){
//				ctl_showMsg("场次编号不能为空");
//				return;
//			}
//			if($.trim(sessionsname)==""){
//				ctl_showMsg("场次名称不能为空");
//				return;
//			}
//			if($.trim(playtime)==""){
//				ctl_showMsg("上演时间不能为空");
//				return;
//			}
//			if($.trim(length)==""){
//				ctl_showMsg("片长不能为空");
//				return;
//			}
//			var reg = new RegExp("^[0-9]*$");  
//			if($.trim(length)!=""){
//			    if(!reg.test(length)){  
//			        ctl_showMsg("片长只能为数字");
//			        return;
//			    }  
//			}
//			if($.trim(begintime)==""){
//				ctl_showMsg("售票开始时间不能为空");
//				return;
//			}
//			if($.trim(endtime)==""){
//				ctl_showMsg("售票截止时间不能为空");
//				return;
//			}
//			if($.trim(checktimes)!=""){
//			    if(!reg.test(length)){  
//			        ctl_showMsg("检查次数只能为数字");
//			        return;
//			    }  
//			}
//			var data={venueid:venueid,hallid:hallid,performerid:performerid,
//			itemid:itemid,sessionscode:sessionscode,sessionsname:sessionsname,
//			engname:engname,playtime:playtime,length:length,
//			begintime:begintime,endtime:endtime,producttypeid:producttypeid,
//			sponsor:sponsor,dessponsor:dessponsor,actualsponsor:actualsponsor,
//			website:website,checktimes:checktimes,regnumb:regnumb,
//			introduction:introduction,operType:'add'};		
//			publicAjaxRequest(sessionsService,data,jsonType, function(response) {
//				var rdata = response.data;
//				if("success" == rdata) {
//					dlg.close();
//					ctl_reloadGrid('sessions_grid');
//					ctl_showMsg("新增成功!");
//				}else if("fail" == rdata){
//					ctl_showMsg("新增失败!");
//				}else if("exists" == rdata){
//					ctl_showMsg("已经存在!");
//				}else{
//					ctl_showMsg(rdata);
//				}
//			});	
//	});
});

//创建场次
function openUrls(url,fcdmc,cdmc){
	$("#indexSession_main_div").hide();
	currentPageObj={taburl:url};
	$("#indexSession_rightDiv").show();
	$("#indexSession_workMainDiv").load(url);
}

function showstepurl(url){
	//打开相应的界面
	$("#contentdiv").load(url);
}

function updateSessions(rowId){
	var rowObj = ctl_getRowObjForRowNo('sessions_grid',rowId);	
	sessionsids=rowObj.sessionsid;
	$.cookie("cctype", "update");
	$.cookie("ccid", sessionsids);
	openUrl('pages/sessions/main.html','场次管理','场次管理');
//	$("#indexSession_main_div").hide();
//	$("#indexSession_rightDiv").show();
//	$("#indexSession_workMainDiv").load(url);
	
//	var dlg = ctl_dialogDivClose('', {
//        title: '修改',
//        content: 'addsessions_div',
//        lock: true,
//        min: false,
//        max: false,
//        drag: false,
//        resize: false
//    },
//    ['addsessions_close']);	
//   
//    
//	
//	//项目名称
//	$("#xmmc").ctl_select({
//        id: 'xmmc_sel',
//        width: 115,
//        listboxmaxheight: 300,
//		listboxalign : 'auto',
//		listboxmaxheight : 200,
//		columns : 1,
//        checkbox: false,
//        disabled: false,
//    	selectedIndex: '',
//    	selected:[rowObj.itemid],
//		defaultValue : '',
//		dialogId:'addsessions_div',
//		defaultText : '请选择',
//        columnValue: 'itemid',
//        columnName: 'itemname',
//        url: springMvcUrl,
//        type: 'post',
//        dateType: 'json',
//        param: {
//            param: getParam(sessionsService),
//            data: "{operType:'queryxmmc'}"
//        }
//    });
//	
//	//场管名称
//	$("#cgmc").ctl_select({
//        id: 'cgmc_sel',
//        width: 115,
//        listboxmaxheight: 300,
//		listboxalign : 'auto',
//		listboxmaxheight : 200,
//		columns : 1,
//        checkbox: false,
//        disabled: false,
//    	selectedIndex: '',
//    	selected:[rowObj.venueid],
//		defaultValue : '',
//		dialogId:'addsessions_div',
//		defaultText : '请选择',
//        columnValue: 'venueid',
//        columnName: 'venuename',
//        url: springMvcUrl,
//        type: 'post',
//        dateType: 'json',
//        param: {
//            param: getParam(sessionsService),
//            data: "{operType:'queryCgmc'}"
//        }
//    });
//	
//	
//	//演出厅名称
//	$("#yctmc").ctl_select({
//        id: 'yctmc_sel',
//        width: 115,
//        listboxmaxheight: 300,
//		listboxalign : 'auto',
//		listboxmaxheight : 200,
//		columns : 1,
//        checkbox: false,
//        disabled: false,
//    	selectedIndex: '',
//    	selected:[rowObj.hallid],
//		defaultValue : '',
//		dialogId:'addsessions_div',
//		defaultText : '请选择',
//        columnValue: 'hallid',
//        columnName: 'hallname',
//        url: springMvcUrl,
//        type: 'post',
//        dateType: 'json',
//        param: {
//            param: getParam(sessionsService),
//            data: "{operType:'queryyctmc'}"
//        }
//    });
//	
//	//演出商名称
//	$("#ycsmc").ctl_select({
//        id: 'ycsmc_sel',
//        width: 115,
//        listboxmaxheight: 300,
//		listboxalign : 'auto',
//		listboxmaxheight : 200,
//		columns : 1,
//        checkbox: false,
//        disabled: false,
//    	selectedIndex: '',
//    	selected:[rowObj.performerid],
//		defaultValue : '',
//		dialogId:'addsessions_div',
//		defaultText : '请选择',
//        columnValue: 'performerid',
//        columnName: 'performername',
//        url: springMvcUrl,
//        type: 'post',
//        dateType: 'json',
//        param: {
//            param: getParam(sessionsService),
//            data: "{operType:'queryycsmc'}"
//        }
//    });    
//	$('#addsessionsid').val(rowObj.sessionsid);	
//	$('#addsessionscode').val(rowObj.sessionscode);
//	$('#addsessionsname').val(rowObj.sessionsname);
//	$('#addengname').val(rowObj.engname);
//	$('#addplaytime').val(rowObj.playtime);
//	$('#addlength').val(rowObj.length);
//	$('#addbegintime').val(rowObj.begintime);
//	$('#addendtime').val(rowObj.endtime);
//	$('#addsponsor').val(rowObj.sponsor);
//	$('#adddessponsor').val(rowObj.dessponsor);
//	$('#addactualsponsor').val(rowObj.actualsponsor);
//	$('#addwebsite').val(rowObj.website);
//	$('#addchecktimes').val(rowObj.checktimes);
//	$('#addregnumb').val(rowObj.regnumb);
//	$('#addintroduction').val(rowObj.introduction);	
//	$("#addsessions_save").click(function() {		
//		var venueid = $('#cgmc_sel').val();
//		var hallid = $('#yctmc_sel').val();
//		var performerid = $('#ycsmc_sel').val();
//		var itemid = $('#xmmc_sel').val();
//		var sessionscode = $('#addsessionscode').val();
//		var sessionsname = $('#addsessionsname').val();
//		var engname = $('#addengname').val();
//		var playtime = $('#addplaytime').val();
//		var length = $('#addlength').val();
//		var begintime = $('#addbegintime').val();
//		var endtime = $('#addendtime').val();
//		var producttypeid = $('#cplbmc_sel').val();
//		var sponsor = $('#addsponsor').val();
//		var dessponsor = $('#adddessponsor').val();
//		var actualsponsor = $('#addactualsponsor').val();
//		var website = $('#addwebsite').val();
//		var checktimes = $('#addchecktimes').val();
//		var regnumb = $('#addregnumb').val();
//		var introduction = $('#addintroduction').val();	
//		if($.trim(venueid)==""){
//			ctl_showMsg("场馆不能为空");
//			return;
//		}
//		if($.trim(hallid)==""){
//			ctl_showMsg("演出厅不能为空");
//			return;
//		}
//		if($.trim(performerid)==""){
//			ctl_showMsg("演出商不能为空");
//			return;
//		}
//		if($.trim(itemid)==""){
//			ctl_showMsg("项目名称不能为空");
//			return;
//		}
//		if($.trim(sessionscode)==""){
//			ctl_showMsg("场次编号不能为空");
//			return;
//		}
//		if($.trim(sessionsname)==""){
//			ctl_showMsg("场次名称不能为空");
//			return;
//		}
//		if($.trim(playtime)==""){
//			ctl_showMsg("上演时间不能为空");
//			return;
//		}
//		if($.trim(length)==""){
//			ctl_showMsg("片长不能为空");
//			return;
//		}
//		var reg = new RegExp("^[0-9]*$");  
//		if($.trim(length)!=""){
//		    if(!reg.test(length)){  
//		        ctl_showMsg("片长只能为数字");
//		        return;
//		    }  
//		}
//		if($.trim(begintime)==""){
//			ctl_showMsg("售票开始时间不能为空");
//			return;
//		}
//		if($.trim(endtime)==""){
//			ctl_showMsg("售票截止时间不能为空");
//			return;
//		}
//		if($.trim(checktimes)!=""){
//		    if(!reg.test(length)){  
//		        ctl_showMsg("检查次数只能为数字");
//		        return;
//		    }  
//		}
//		var data={sessionsid:rowObj.sessionsid,venueid:venueid,hallid:hallid,performerid:performerid,itemid:itemid,sessionscode:sessionscode,sessionsname:sessionsname,engname:engname,playtime:playtime,length:length,begintime:begintime,endtime:endtime,producttypeid:producttypeid,sponsor:sponsor,dessponsor:dessponsor,actualsponsor:actualsponsor,website:website,checktimes:checktimes,regnumb:regnumb,introduction:introduction,operType:'update'};
//		publicAjaxRequest(sessionsService,data,jsonType, function(response) {
//			var rdata = response.data;
//			if("success" == rdata) {
//				dlg.close();
//				ctl_reloadGrid('sessions_grid');
//				ctl_showMsg("修改成功!");
//			}else if("fail" == rdata){
//				ctl_showMsg("修改失败!");
//			}else if("exists" == rdata){
//				ctl_showMsg("已经存在!");
//			}else{
//				ctl_showMsg(rdata);
//			}
//		});	
//	});
}

function deleteSessions(sessionsid){
	ctl_confirm('您确定要删除吗？',function() {
		var data = {sessionsid:sessionsid,operType:'delete'};
		publicAjaxRequest(sessionsService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('sessions_grid');
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

function qySessions(sessionsid){
	ctl_confirm('确定要启用吗？',function() {
		var data = {sessionsid:sessionsid,operType:'qy'};
		publicAjaxRequest(sessionsService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('sessions_grid');
				ctl_showMsg("启用成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("启用失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

function jySessions(sessionsid){
	ctl_confirm('确定要禁用吗？',function() {
		var data = {sessionsid:sessionsid,operType:'jy'};
		publicAjaxRequest(sessionsService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('sessions_grid');
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
	initSessionsGrid();
	
});