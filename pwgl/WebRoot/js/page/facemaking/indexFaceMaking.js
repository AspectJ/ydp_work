var indexFaceMakingService='indexFaceMakingService';
function initItemGrid(){
	ctl_initGrid({
		jqGridId:"facemaking_grid",
		serviceId:indexFaceMakingService,
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		width:500,
		height:200,
		colNames:['票版ID','票面编号','票面名称','操作'],
		colModel:[
		{name:'ticketfaceid',index:'ticketfaceid',hidden:true},
		{name:'ticketcode',index:'ticketcode'},
		{name:'ticketname',index:'ticketname'},
		{name:'oper',index:'oper',align:"center"}],
		pager:"facemaking_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){
			var ids = ctl_getAllDataIds('item_grid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var rowObj = ctl_getRowObjForRowNo('facemaking_grid',cl);
   				var oper = "";   				
   			    var xg="<input type='button' value='修改'  class='f14 ff bod bod_r c_p bgcolor pt5 pb5 pl15 pr15' onclick=updateItem(\""+cl+"\") />";
				var sc="<input type='button' value='删除'  class='f14 ff bod bod_r c_p bgcolor pt5 pb5 pl15 pr15' onclick=deleteItem(\""+rowObj.itemid+"\") />";
   				oper =xg + "   " + sc;
   				ctl_setCell('item_grid', cl, 'oper', oper);
   			}
   			
   	       addAutoSize([{
               htmlId: "facemaking_grid",
               htmlType: "jqgrid",
               widthResize: -35,
               heightResize: -10
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








$(function(){
	initItemGrid();
	
	//查询
	$('#facemaking_query').click(function(){
		var data ={operType:"index"};
		data.itemname =$("#itemname").val();
		data.status=$("#zt").find("option:selected").val();
		ctl_onPagingForConditions('item_grid', itemService, true, data,jsonType);
	});
	
	
});