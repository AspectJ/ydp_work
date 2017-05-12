$(function(){
	var indexPayboxEmPowerService="indexPayboxEmPowerService";
	
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
            param: getParam(indexPayboxEmPowerService),
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
            param: getParam(indexPayboxEmPowerService),
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
                    param: getParam(indexPayboxEmPowerService),
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
                    param: getParam(indexPayboxEmPowerService),
                    data: "{operType:'spy',payboxid:'"+selectValue+"'}"
               }
            });
        }
    });
	
	//权限名称
	$("#qxmc").ctl_select({
        id: 'qxmc_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
    	selectedIndex: '1',
        columnValue: 'sellpowerid',
        columnName: 'powername',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(indexPayboxEmPowerService),
            data: "{operType:'queryQxmc'}"
        }
    });
	
	//保存
	$("#indexPayboxEmpower_ok_btn").click(function(){
		var ccmc=$("#ccmc_sel").val();//场次名称
		var spd=$("#spd_sel").val();//售票点
		var spy=$("#spy_sel").val();//售票员
		var qxmc=$("#qxmc_sel").val();//权限名称
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
		if($.trim(qxmc)==""){
			ctl_showMsg("权限名称不能为空");
			return;
		}
		var data={ccmc:ccmc,spd:spd,qxmc:qxmc,spy:spy,operType:"add"};
		publicAjaxRequest(indexPayboxEmPowerService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_showMsg("保存成功!");
			}else if("fail" == rdata){
				ctl_showMsg("保存失败!");
			}
		});
	});
	
});