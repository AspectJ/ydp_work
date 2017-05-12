$(function(){
	ctl_initGrid({
		jqGridId:'suggestGrid',
		serviceId:'suggestService',
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		colNames:['意见ID','意见内容','反馈时间','反馈人ID','用户昵称','联系电话','意见来源','操作'],
		colModel:[
		{name:'suggid',index:'suggid',hidden:true},
		{name:'suggnr',index:'suggnr',width:200},
		{name:'ctime',index:'ctime',width:100},
		{name:'userid',index:'userid',width:80,hidden:true},
		{name:'realname',index:'realname',width:80},
		{name:'telephone',index:'telephone',width:80},
		{name:'suggfromname',index:'suggfromname',width:80,hidden:true},
		{name:'oper',index:'oper',width:50,align:'center'}],
		pager:'suggestPager',
		rowNum:30,
		viewrecords:true,
		rowList:[30,50,100],
		width:200,
		height:200,
		gridComplete:function(){
			var ids = ctl_getAllDataIds('suggestGrid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var see = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=seeSuggest(\""+cl+"\")>查看</a>";
   				ctl_setCell('suggestGrid', cl, 'oper', see);
   			}
			addAutoSize([{
   				htmlId : 'suggestGrid',// 页面中元素的id
   				htmlType : "jqgrid",// 表示为jqgrid
   				widthResize : -25,// 缩放比例后需要调整的宽度
   				heightResize : 0 
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
	$("#queryBtn").click(function(){
		var suggnr = $("#suggnr").val();
		var starttime = $("#starttime").val();
		var endtime = $("#endtime").val();
		var data={operType:"index",suggnr:suggnr,starttime:starttime,endtime:endtime};
		ctl_onPagingForConditions('suggestGrid', 'suggestService', true, data,jsonType);
	});
});

//查看
function seeSuggest(rowId){
	ctl_dialogDivClose('', {
	  title: '查看',
	  content: 'addDiv'
	});
	var rowObj = ctl_getRowObjForRowNo('suggestGrid',rowId);
    $("#addFeedbackTime").val(rowObj.ctime);
    $("#addSuggfrom").val(rowObj.suggfromname);
    $("#addSuggnr").val(rowObj.suggnr);
}