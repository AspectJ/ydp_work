
//配额管理
$(function(){
	ctl_initGrid({
		jqGridId:"quotasmanager_grid",
		serviceId:"indexQuotasManagerService",
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		width:500,
		height:200,
		colNames:['itemid','项目名','sessionsid','场次名称','场馆名称','演出厅','演出时间','场次配额','机构配额'],
		colModel:[
		{name:'itemid',index:'itemid',hidden:true},          
		{name:'itemname',index:'itemname',width:'100'},
		{name:'sessionsid',index:'sessionsid',hidden:true},
		{name:'sessionsname',index:'sessionsname',width:'120'},
		{name:'venuename',index:'venuename',width:'120'},
		{name:'hallname',index:'hallname',width:'120'},
		{name:'time',index:'time',width:'150'},
		{name:'ccpe',index:'ccpe',width:'80',align:'center'},
		{name:'sxjgpe',index:'sxjgpe',width:'80',align:'center'}
		],
		pager:"quotasmanager_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){
			var ids = ctl_getAllDataIds('quotasmanager_grid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var rowObj = ctl_getRowObjForRowNo('quotasmanager_grid',cl);
   				var ccpe = rowObj.ccpe;
   				var sxjgpe = rowObj.sxjgpe;
   				var ccpeStr="";
   				var jgpeStr="";
   				var cpe=parseFloat(ccpe);
   				var sxpe=parseFloat(sxjgpe);
   				if(cpe<=0){
   					ccpeStr = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=ccpeFunc(\""+rowObj.sessionsid+"\",\""+ccpe+"\")>设置</a>";
   				}else if(cpe>0){
   					ccpeStr = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=ccpeFunc(\""+rowObj.sessionsid+"\",\""+ccpe+"\")>"+ccpe+"</a>";
   				}	
   				if(sxpe<=0){
   					jgpeStr = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=jgpeFunc(\""+rowObj.sessionsid+"\",\""+ccpe+"\")>设置</a>";
   				}else{
   					jgpeStr = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=jgpeFunc(\""+rowObj.sessionsid+"\",\""+ccpe+"\")>"+sxjgpe+"</a>";
   				}	
   			   ctl_setCell('quotasmanager_grid', cl, 'ccpe', ccpeStr);
   			   ctl_setCell('quotasmanager_grid', cl, 'sxjgpe', jgpeStr);
   			}
   	       addAutoSize([{
               htmlId: "quotasmanager_grid",
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
	
	//查询
	$("#query_btn").click(function(){
		var xmm=$("#xmm").val();
		var ccmc=$("#ccmc").val();
		var data ={operType:"index",xmm:xmm,ccmc:ccmc};
		ctl_onPagingForConditions('quotasmanager_grid', "indexQuotasManagerService", true, data,jsonType);
	});
	
});

//场次配额
function ccpeFunc(sessionsid,ccpe){
	var dlg = ctl_dialogDivClose('', {
        title: '设置场次配额',
        content: 'addquotasManager_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addquotasManager_close']);
	$("#addccpe").val(ccpe);
	
	//保存
	$("#addquotasManager_save").click(function(){
		var ccpe=$("#addccpe").val();
		if(ccpe==""){
			ctl_showMsg("场次配额不能为空！");
			return;
		}
		var cpeStr=parseFloat(ccpe);
		if(cpeStr<=0){
			ctl_showMsg("场次配额必须大于0");
			return;
		}
		var data = {operType:"setCcpe",sessionsid:sessionsid,ccpe:ccpe};
		publicAjaxRequest("indexQuotasManagerService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata){
				ctl_showMsg("操作成功！");
				ctl_reloadGrid("quotasmanager_grid");	
				dlg.close();
			}else{
				ctl_showMsg("操作失败！");
			}
		});
		
	});
	
}

//销售配额
function jgpeFunc(sessionsid,ccpe){
	var dlg = ctl_dialogDivClose('', {
        title: '设置销售机构配额',
        content: 'addquotasManager_query_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    });
	
	ctl_initGrid({
		jqGridId:"quotasmanager_query_grid",
		serviceId:"indexQuotasManagerService",
		requestDataXml:{operType:"xsjg",sessionsid:sessionsid},
		multiselect: true,
		singleRowData:true,
		dataFormat:jsonType,
		editable: true,
		width:600,
		height:300,
		colNames:['payboxid','销售机构','可用额度（元）','操作'],
		colModel:[
		{name:'payboxid',index:'payboxid',hidden:true},
		{name:'payboxname',index:'payboxname',width:'120'},
		{name:'quota',index:'quota',width:'100',editable:true},
		{name:'oper',index:'oper',align:"center",width:350}],
		pager:"quotasmanager_query_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){		
			var ids = ctl_getAllDataIds('quotasmanager_query_grid');
			var cl='';
			for ( var i = 0; i < ids.length; i++) {
				cl = ids[i];
				intoEditRow("quotasmanager_query_grid", cl);
				var rowObj = ctl_getRowObjForRowNo('quotasmanager_query_grid',cl);
				var oper = "";
				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteFunc(\""+cl+"\")>删除</a>";   				
				oper=sc;
				ctl_setCell('quotasmanager_query_grid', cl, 'oper', oper);
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
	
	//保存
	$("#addquotasManager_confrim").click(function(){
		var ids = ctl_getSelectIds('quotasmanager_query_grid');
		var detail="";
		if(ids.length<=0){
			ctl_showMsg("请至少选择一行");
			return;
		}
		var sum="0.00";
		for ( var i = 0; i < ids.length; i++) {
			var rowObj = ctl_getRowObjForRowNo("quotasmanager_query_grid",ids[i]);
			var payboxid = rowObj.payboxid;
			var quota = $("#"+ids[i]+"_quota").val();
			sum=parseFloat(sum)+parseFloat(quota);
			if(quota == ""){
				continue;
			}
			if(detail == ""){
				detail = "{quota:'"+quota+"',payboxid:'"+payboxid+"'}";
			}else{
				detail += "&"+"{quota:'"+quota+"',payboxid:'"+payboxid+"'}";
			}
		}
		if(parseFloat(ccpe)<sum){
			ctl_showMsg("销售机构总金额必须小于场次配额");
			return;
		}
		var data={operType:'addXsjg',detail:detail,sessionsid:sessionsid}; 
	     publicAjaxRequest("indexQuotasManagerService",data,jsonType, function(response) {
	    	 var rdata = response.data;
				if("success" == rdata){
					ctl_showMsg("操作成功！");
					ctl_reloadGrid("quotasmanager_grid");	
					dlg.close();
				}else{
					ctl_showMsg("操作失败！");
				}
			});
		});
}

//删除
function deleteFunc(id){
	ctl_deleteRowData('quotasmanager_query_grid', id);
}