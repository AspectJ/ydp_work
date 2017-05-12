var sessionsService='sessionsService';
function initSessionsGrid(){
	ctl_initGrid({
		jqGridId:"sessions_grid",
		serviceId:sessionsService,
		requestDataXml:{operType:"selectAudit"},
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
   				var qrsh="<input type='button' value='确认审核'  class='f14 ff bod bod_r c_p bgcolor pt5 pb5 pl15 pr15' onclick=qrsh(\""+rowObj.sessionsid+"\") />";
   				var bhsh="<input type='button' value='驳回审核'  class='f14 ff bod bod_r c_p bgcolor pt5 pb5 pl15 pr15' onclick=bhsh(\""+rowObj.sessionsid+"\") />";
   				var fb="<input type='button' value='发布'  class='f14 ff bod bod_r c_p bgcolor pt5 pb5 pl15 pr15' onclick=fb(\""+rowObj.sessionsid+"\") />";
   				var tzyc="<input type='button' value='停止演出'  class='f14 ff bod bod_r c_p bgcolor pt5 pb5 pl15 pr15' onclick=tzyc(\""+rowObj.sessionsid+"\") />";
   				var hfyc="<input type='button' value='恢复演出'  class='f14 ff bod bod_r c_p bgcolor pt5 pb5 pl15 pr15' onclick=hfyc(\""+rowObj.sessionsid+"\") />";
	   			var status = rowObj.status;
   				if(status == "1" || status == "3"){
   					oper = qrsh+"  "+bhsh;
	   			}else if(status == "2"){
	   				oper = fb;
	   			}else if(status == "4"){
	   				oper = tzyc;
	   			}else if(status == "5"){
	   				oper = hfyc;
	   			}
   				
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

function qrsh(sessionsid){
	ctl_confirm('您确定要确认审核吗？',function() {
		var data = {sessionsid:sessionsid,operType:'qrsh'};
		publicAjaxRequest(sessionsService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('sessions_grid');
				ctl_showMsg("操作成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("操作失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

function bhsh(sessionsid){
	ctl_confirm('您确定要驳回审核吗？',function() {
		var data = {sessionsid:sessionsid,operType:'bhsh'};
		publicAjaxRequest(sessionsService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('sessions_grid');
				ctl_showMsg("操作成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("操作失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

function fb(sessionsid){
	ctl_confirm('您确定要发布吗？',function() {
		var data = {sessionsid:sessionsid,operType:'fb'};
		publicAjaxRequest(sessionsService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('sessions_grid');
				ctl_showMsg("操作成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("操作失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

function tzyc(sessionsid){
	ctl_confirm('您确定要停止演出吗？',function() {
		var data = {sessionsid:sessionsid,operType:'tzyc'};
		publicAjaxRequest(sessionsService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('sessions_grid');
				ctl_showMsg("操作成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("操作失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

function hfyc(sessionsid){
	ctl_confirm('您确定要恢复演出吗？',function() {
		var data = {sessionsid:sessionsid,operType:'hfyc'};
		publicAjaxRequest(sessionsService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('sessions_grid');
				ctl_showMsg("操作成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("操作失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

$(function() {	
	initSessionsGrid();
	
});