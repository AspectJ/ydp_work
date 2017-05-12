
//重打
$(function(){
	ctl_initGrid({
		jqGridId:"whamManager_grid",
		serviceId:"indexWhamManagerService",
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		width:500,
		height:200,
		colNames:['reprintid','订单Id','订单编号','重打次数','项目名称','场次名称','场馆名称','演出厅名称','分区名','座位名','申请人','申请时间','审核人','审核时间','重打状态','操作','重打'],
		colModel:[
		{name:'reprintid',index:'reprintid',hidden:true},          
		{name:'orderid',index:'orderid',hidden:true},
		{name:'ordercode',index:'ordercode'},
		{name:'cs',index:'cs'},
		{name:'itemname',index:'itemname'},
		{name:'sessionsname',index:'sessionsname'},
		{name:'venuename',index:'venuename'},
		{name:'hallname',index:'hallname'},
		{name:'zonename',index:'zonename'},
		{name:'pewname',index:'pewname'},
		{name:'sqr',index:'sqr'},
		{name:'applytime',index:'applytime'},
		{name:'shr',index:'shr'},
		{name:'audittime',index:'audittime'},
		{name:'isreprintname',index:'isreprintname'},
		{name:'oper',index:'oper',align:"center"},
		{name:'restatus',index:'restatus',hidden:true}],
		pager:"whamManager_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){
			var ids = ctl_getAllDataIds('whamManager_grid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var rowObj = ctl_getRowObjForRowNo('whamManager_grid',cl);
   				var oper = "";
   				var status = rowObj.restatus;
   				if(status == '1'||status=='3'){
   					oper = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=shFunc(\""+rowObj.reprintid+"\")>审核</a>";
   				}else{
   					oper = "<span>审核通过</span>";
   				}			
   			   ctl_setCell('whamManager_grid', cl, 'oper', oper);
   			}
   	       addAutoSize([{
               htmlId: "whamManager_grid",
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
		var ddbh=$("#ddbh").val();
		var xmmc=$("#xmmc").val();
		var data ={operType:"index",ddbh:ddbh,xmmc:xmmc};
		ctl_onPagingForConditions('whamManager_grid', "indexWhamManagerService", true, data,jsonType);
	});
});

//审核
function shFunc(reprintid){
	var dlg = ctl_dialogDivClose('', {
        title: '审核',
        content: 'whamManagerDiv',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['cancelBtn']);
	
	//状态
	$("#sh_status").ctl_select({
        id: "sh_status_sel",
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        dialogId:'whamManagerDiv',
        columns: 1,
        data:{'2':'审核通过','3':'审核不通过'},
    });
	
	//保存
	$("#saveBtn").click(function(){
		var status=$("#sh_status_sel").val();
		if($.trim(status)==""){
			ctl_showMsg("审核状态不能为空");
			return;
		}
		var data = {operType:"updateStatus",reprintid:reprintid,status:status};
		publicAjaxRequest("indexWhamManagerService",data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata){
				ctl_showMsg("操作成功！");
				ctl_reloadGrid("whamManager_grid");	
				dlg.close();
			}else{
				ctl_showMsg("操作失败！");
			}
		});
	});
}