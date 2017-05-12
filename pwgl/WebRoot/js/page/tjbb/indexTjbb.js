var sessionInfoService='sessionInfoService';
var indexSellPolicyService="indexSellPolicyService";

//统计报表
$(function(){
	
	//售票点，售票员
	spd();
	
	//项目，场馆
	xmcg();
	
	load_grid();
	
	//查询
	$("#tjbb_query").click(function(){
		var spjg=$("#spjgd_sel").val();
		var spy=$("#spy_sel").val();
		var kssj=$("#yckssj").val();
		var jssj=$("#ycjssj").val();
		var xmmc=$("#xmmc_sel").val();
		var yccg=$("#yccg_sel").val();
		var data={};
		data.spjg =spjg;
		data.spy=spy;
		data.kssj=kssj;
		data.jssj=jssj;
		data.yccg=yccg;
		data.xmmc=xmmc;
		ctl_onPagingForConditions('tjbb_grid', sessionInfoService, true, data,jsonType);
	});
});

//售票点，售票员
function spd(){
	//售票点
	$("#spjg").ctl_select({
        id: 'spjgd_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
    	selectedIndex: '1',
        columnValue: 'payboxid',
        columnName: 'payboxname',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(indexSellPolicyService),
            data: "{operType:'querySpd'}"
        }, onchange: function(name, value) {
        	$("#spy").ctl_select({
                id: 'spy_sel',
                width: 115,
                listboxmaxheight: 300,
        		listboxalign : 'auto',
        		listboxmaxheight : 200,
        		columns : 1,
                checkbox: false,
                disabled: false,
            	selectedIndex: '1',
                columnValue: 'sellerid',
                columnName: 'realname',
                url: springMvcUrl,
                type: 'post',
                dateType: 'json',
                param: {
                    param: getParam(indexSellPolicyService),
                    data: "{operType:'spy',payboxid:'"+value+"'}"
               }
            });
        },onsyncomplete: function(name, selectValue) {
        	$("#spy").ctl_select({
                id: 'spy_sel',
                width: 115,
                listboxmaxheight: 300,
        		listboxalign : 'auto',
        		listboxmaxheight : 200,
        		columns : 1,
                checkbox: false,
                disabled: false,
            	selectedIndex: '1',
                columnValue: 'sellerid',
                columnName: 'realname',
                url: springMvcUrl,
                type: 'post',
                dateType: 'json',
                param: {
                    param: getParam(indexSellPolicyService),
                    data: "{operType:'spy',payboxid:'"+selectValue+"'}"
               }
            });
        }
    });
}

//项目，场馆
function xmcg(){
	
	//项目名称
	$("#xmmc").ctl_select({
        id: 'xmmc_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
    	selectedIndex: '1',
        columnValue: 'itemid',
        columnName: 'itemname',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(sessionInfoService),
            data: "{operType:'queryXm'}"
        }
    });
	
	//演出场馆
	$("#yccg").ctl_select({
        id: 'yccg_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
    	selectedIndex: '1',
        columnValue: 'venueid',
        columnName: 'venuename',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(sessionInfoService),
            data: "{operType:'queryVenue'}"
        }
    });
}

//加载表格
function load_grid(){
	ctl_initGrid({
		jqGridId:"tjbb_grid",
		serviceId:sessionInfoService,
		requestDataXml:{operType:"index"},
		singleRowData:true,
		dataFormat:jsonType,
		width:500,
		height:200,
		colNames:['编号','场次名称','演出时间','演出场馆','售票机构','操作'],
		colModel:[
		{name:'sessionscode',index:'sessionscode'},
		{name:'sessionsname',index:'sessionsname'},
		{name:'playtime',index:'playtime'},
		{name:'venuename',index:'venuename'},
		{name:'payboxname',index:'payboxname'},
		{name:'oper',index:'oper',align:"center"}],
		pager:"tjbb_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){
			var ids = ctl_getAllDataIds('tjbb_grid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=scbb(\""+cl+"\")>生成报表</a>";
   				ctl_setCell('tjbb_grid', cl, 'oper', xg);
   			}
   			
   	       addAutoSize([{
               htmlId: "tjbb_grid",
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
}

function scbb(rowId){
	
}