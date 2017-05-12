$(function(){
	var indexSellPolicyService="indexSellPolicyService";
	
	//场次名称
	$("#ccmc").ctl_select({
        id: 'ccmc_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
    	selectedIndex: '1',
        columnValue: 'sessionsid',
        columnName: 'sessionsname',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(indexSellPolicyService),
            data: "{operType:'queryCcmc'}"
        }
    });
	
	//售票点
	$("#spd").ctl_select({
        id: 'spd_sel',
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
	

	
	//套票政策
	$("#tpzc").ctl_select({
        id: 'tpzc_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
    	selectedIndex: '1',
        columnValue: 'setpolicyid',
        columnName: 'policyname',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(indexSellPolicyService),
            data: "{operType:'queryTpzc'}"
        }
    });
	
	//查询优惠政策
	$("#yhzc").ctl_select({
        id: 'yhzc_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
    	selectedIndex: '1',
        columnValue: 'prefpolicyid',
        columnName: 'policyname',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(indexSellPolicyService),
            data: "{operType:'queryYhzc'}"
        }
    });
	
	//保存
	$("#indexEmpowerSeller_ok_btn").click(function(){
		var ccmc=$("#ccmc_sel").val();//场次名称
		var spd=$("#spd_sel").val();//售票点
		var tpzc=$("#tpzc_sel").val();//套票政策
		var yhzc=$("#yhzc_sel").val();//优惠政策
		var spy=$("#spy_sel").val();//售票员
		if($.trim(ccmc)==""){
			ctl_showMsg("场次名称不能为空");
			return;
		}
		if($.trim(spd)==""){
			ctl_showMsg("售票点不能为空");
			return;
		}
		if($.trim(spy)==""){
			ctl_showMsg("售票员不能为空");
			return;
		}
		if($.trim(tpzc)==""){
			ctl_showMsg("套票政策不能为空");
			return;			
		}
		if($.trim(yhzc)==""){
			ctl_showMsg("优惠政策不能为空");
			return;
		}
		var data={ccmc:ccmc,spd:spd,tpzc:tpzc,yhzc:yhzc,spy:spy,operType:"add"};
		publicAjaxRequest(indexSellPolicyService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_showMsg("保存成功!");
			}else if("fail" == rdata){
				ctl_showMsg("保存失败!");
			}
		});
	});
});

//查询售票员
function spyfunc(value){
	var payboxid=value;
	alert("payboxid88:"+payboxid);	
//	$("#spy").ctl_select({
//        id: 'spy_sel',
//        width: 115,
//        listboxmaxheight: 300,
//		listboxalign : 'auto',
//		listboxmaxheight : 200,
//		columns : 1,
//        checkbox: false,
//        disabled: false,
//    	selectedIndex: '1',
//        columnValue: 'sellerid',
//        columnName: 'realname',
//        url: springMvcUrl,
//        type: 'post',
//        dateType: 'json',
//        param: {
//            param: getParam(indexSellPolicyService),
//            data: "{operType:'spy'}"
//       }
//    });
}