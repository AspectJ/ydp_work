var ticketpriceService='ticketpriceService';
var sessionsid = ccid==null?"":ccid;
var tag=false;
function initTicketpriceGrid(){
	ctl_initGrid({
		jqGridId:"ticketprice_grid",
		serviceId:ticketpriceService,
		requestDataXml:{operType:"index",sessionsid:sessionsid},
		singleRowData:true,
		dataFormat:jsonType,
		editable: true,
		//width:1500,
		//height:200,
		colNames:['场次票价ID','场次ID','场次名称','票价等级ID','票价等级','票价等级颜色值','票价','票面字样','操作'],
		colModel:[
		{name:'sessntkprid',index:'sessntkprid',hidden:true},
		{name:'sessionsid',index:'sessionsid',hidden:true},
		{name:'sessionsname',index:'sessionsname'},
		{name:'pricelevelid',index:'pricelevelid',hidden:true},
		{name:'pricelevelname',index:'pricelevelname'},
		{name:'color',index:'color',editable:true,edittype: 'select',editoptions: {value:'赤:赤;橙:橙;黄:黄;绿:绿;青:青;蓝:蓝;紫:紫'},width:150},
		{name:'price',index:'price',editable:true,formatter:'number',formatoptions:{decimalPlaces:2},width:80},
		{name:'mark',index:'mark',editable:true},
		{name:'oper',index:'oper',align:"center"}],
		pager:"ticketprice_pager",
		rowNum:100,
		viewrecords:true,
        pgbuttons: false,
        pginput: false,
        viewrecords: true,
        shrinkToFit: true,
		gridComplete:function(){
			var ids = ctl_getAllDataIds('ticketprice_grid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				intoEditRow("ticketprice_grid", cl);
   				var rowObj = ctl_getRowObjForRowNo('ticketprice_grid',cl);
   				var oper = "";
   				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteTicketprice(\""+rowObj.sessntkprid+"\")>删除</a>";
   				oper=sc;
   				ctl_setCell('ticketprice_grid', cl, 'oper', oper);
   			}
   			
   			addAutoSize([{
   				htmlId : "ticketprice_grid",// 页面中元素的id
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
	}

//修改
function updateTicketprice(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改',
        content: 'addticketprice_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addticketprice_close']);	
    var rowObj = ctl_getRowObjForRowNo('ticketprice_grid',rowId);
    
	//票价等级
	$("#pjdj").ctl_select({
        id: 'pjdj_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
    	selectedIndex: '',
    	dialogId:'addticketprice_div',
    	selected:[rowObj.pricelevelid],
        columnValue: 'pricelevelid',
        columnName: 'pricelevelname',
        hiddenId:'pjdjid',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(ticketpriceService),
            data: "{operType:'pjdj'}"
        }
    });	
	
    //颜色值
	$("#addcolor").ctl_select({
        id: "addcolor_sel",
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        selected:[rowObj.color],
        dialogId:'addticketprice_div',
        columns: 1,
        data:{'赤':'赤','橙':'橙','黄':'黄','绿':'绿','青':'青','蓝':'蓝','紫':'紫'},
    });
	
	//设置值
	$("#ccmc_hidden_id").val(rowObj.sessionsid);
	$("#pjdjid_hidden_id").val(rowObj.pricelevelid);
	$("#addcolor_hidden_id").val(rowObj.color);
	$("#addprice").val(rowObj.price);
	$("#addmark").val(rowObj.mark);
	
	//保存
	$("#addticketprice_save").click(function(){
		var sessntkprid=rowObj.sessntkprid;
		var addpricelevelname=$("#pjdj_sel").val();
		var addprice=$("#addprice").val();
		var addmark=$("#addmark").val();
		var addcolor=$("#addcolor_sel").val();		
		if($.trim(addpricelevelname)==""){
			ctl_showMsg("票价等级不能为空");
			return;
		}
		if($.trim(addprice)==""){
			ctl_showMsg("票价不能为空");
			return;
		}		
		var reg = new RegExp("^(([0-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$");  
		if($.trim(addprice)!=""){
			 if(!reg.test(addprice)){  
			        ctl_showMsg("票价只能是带有2位小数点的数字");
			        return;
			    }  
		}
		if($.trim(addcolor)==''){
			ctl_showMsg('颜色不能为空');
			return;
		}
		if($.trim(sessionsid)==''){
			ctl_showMsg("场次不能为空");
			return;
		}
		var data={sessntkprid:sessntkprid,sessionsid:sessionsid,pjdjid:addpricelevelname,addpricelevelname:$("#pjdjid").val(),addprice:addprice,
				addmark:addmark,addcolor:addcolor,operType:"update"};
		publicAjaxRequest(ticketpriceService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_showMsg("修改成功!");
				dlg.close();
				ctl_reloadGrid('ticketprice_grid');
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

//删除
function deleteTicketprice(sessntkprid){
	ctl_confirm('您确定要删除吗？',function() {
		var data = {sessntkprid:sessntkprid,operType:'delete'};
		publicAjaxRequest(ticketpriceService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('ticketprice_grid');
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

$(function(){
	
	//设置场次编号，场次名称
	$("#indexSession_two_ccbh").text(sessionscode);
	$("#indexSession_two_ccmc_txt").text(sessionsname);
	initTicketpriceGrid();
	
	//查询
	$("#ticketprice_query").click(function(){
		var data ={operType:"index",sessionsid:sessionsid};
		data.ccmc=$("#ccmc").val();
		data.pjdj=$("#pjdj").val();
		ctl_onPagingForConditions('ticketprice_grid', ticketpriceService, true, data,jsonType);
	});
	
	//保存
	$("#indexSession_second_next_btn").click(function(){
		var ids = ctl_getAllDataIds('ticketprice_grid');
		var sessntkprids="";
		var array=[];
		for ( var i = 0; i < ids.length; i++) {
			var rowObj = ctl_getRowObjForRowNo("ticketprice_grid",ids[i]);
			var sessntkprid = rowObj.sessntkprid;
			var color = $("#"+ids[i]+"_color").val();
			var price = $("#"+ids[i]+"_price").val();
			var mark = $("#"+ids[i]+"_mark").val();
			array[i]=color;

			if(sessntkprids == ""){
				sessntkprids = "{color:'"+color+"',price:'"+price+"',sessntkprid:'"+sessntkprid+"',mark:'"+mark+"'}";
			}else{
				sessntkprids += "&"+"{color:'"+color+"',price:'"+price+"',sessntkprid:'"+sessntkprid+"',mark:'"+mark+"'}";
			}
			var jg=parseFloat(price);
			if(jg<=0){
				ctl_showMsg("票价不能小于或等于0");
				return;
			}
		   }
		   var tag=false;
		   for(var i = 0, l = array.length; i<l; i++){
               for(var j = i + 1; j < l; j++)
                   if(array[i] == array[j]) {
                	   j == ++i;
                	   tag=true;
                   }
           }
		   if(!tag){
				var ids = ctl_getAllDataIds('ticketprice_grid');
				if(ids.length <= 0){
					ctl_showMsg("请先制定票价等级!");
					return;
				}
				showstepurl("pages/ticketface/indexFacemake.html","第二步（票务）","票面制作");
				$(".step span").removeClass("bggreen");
				$(".step span").removeClass("c_f");
				$("#step_pmzz").addClass("bggreen");
				$("#step_pmzz").addClass("c_f");
		   }else{
			   ctl_showMsg("票价等级的颜色重复，请重新选择票价等级的颜色！");
			   return;
		   }
		  var data={operType:'update',sessntkprids:sessntkprids}; 
		  publicAjaxRequest(ticketpriceService,data,jsonType, function(response) {
				var rdata = response.data;
				if("success"==rdata){
					ctl_showMsg("修改成功");
				}else{
					ctl_showMsg("修改失败");
				}
		     });		
		
	});
	
	//新增
	$("#ticketprice_add").click(function(){
		var dlg = ctl_dialogDivClose('', {
	        title: '新增',
	        content: 'indexTicketprice_add_div',
	        lock: true,
	        min: false,
	        max: false,
	        drag: false,
	        resize: false
	    },
	    ['indexTicketpriceCancelBtn']);		
		var data={operType:'pjdj'};
		publicAjaxRequest(ticketpriceService,data,jsonType, function(response) {
		     var rdata = response.data.length;
			 var divHtml="";
			  for(var i=0;i<rdata;i++){
				 var data=response.data;
			     var pricelevelid=data[i].pricelevelid;
			     var pricelevelname=data[i].pricelevelname;
				 divHtml += "<dl>";
				 divHtml += "<dd>";
				 divHtml += "<input type='checkbox' id='" + pricelevelid
				 + "' name='checkbox' />";
				
				 divHtml += "<label name='roleNameLabel' id='roleLabel_"
						+ pricelevelid + "'>" + pricelevelname + "</label>";
				divHtml += "</dd>";
				divHtml += "</dl>";
			}
			$("#queryDataDiv").html(divHtml);
		});
		
		//保存
		$("#indexTicketpriceSaveBtn").click(function(){
			var pricelevelids = "";
			$("input[name='checkbox']:checked").each(function(){
				if(pricelevelids == ""){
					pricelevelids += $(this).attr("id");
				}else{
					pricelevelids+= ","+$(this).attr("id");
				}
		   });
			if(""==pricelevelids){
				ctl_showMsg("至少选择一个票价等级");
				return;
			}
			var data={pricelevelids:pricelevelids,sessionsid:sessionsid,operType:'add'};
			publicAjaxRequest(ticketpriceService,data,jsonType, function(response) {
				var rdata = response.data;
				if("success" == rdata) {
					ctl_showMsg("新增成功!");
					dlg.close();
					ctl_reloadGrid('ticketprice_grid');
				}else if("fail" == rdata){
					ctl_showMsg("新增失败!");
				}else if("exists" == rdata){
					ctl_showMsg("票价等级已经存在!");
				}else{
					ctl_showMsg(rdata);
				}
			});
		});
		
	});
});