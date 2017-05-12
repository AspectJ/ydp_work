//加载行政区划的公共类

//行政区划--查询和添加
//width
//shengId 省下拉框的ID
//selectValue 修改时，选中的值，新增或查询时，该值传''
function loadXzqh(width,height,dialogId,shengId,shiId,xianId,serviceId,selectXzqh){
	initSheng(shengId,shiId,xianId,width,height,dialogId,serviceId,selectXzqh);
}

//初始化省
function initSheng(shengId,shiId,xianId,width,height,dialogId,serviceId,selectXzqh){
	var selectedIndex = '';
	var seletSheng = '';//选中的省
	if(null == selectXzqh || selectXzqh == '' || selectXzqh == 'undefined'){
		selectedIndex = '0';
	}else{
		seletSheng = selectXzqh.substring(0, 2) + "0000";
	}
	$("#"+shengId).ctl_select({
        id: shengId+'_sel',
        listboxwidth : width,
		width : height,
		listboxalign : 'auto',
		dialogId:dialogId,
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
    	selectedIndex: selectedIndex,
    	selected:[seletSheng],
		defaultValue : '',
		defaultText : '请选择',
        columnValue: 'xzqhid',
        columnName: 'xzqhmc',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(serviceId),
            data: "{operType:'queryXzqh',type:'1'}"
        },
        onchange: function(name, value) {
        	initShi(shiId,xianId,width,height,value,dialogId,serviceId,selectXzqh);
        },
        onsyncomplete: function(name, selectValue) { 
        	initShi(shiId,xianId,width,height,selectValue,dialogId,serviceId,selectXzqh);
        }
    });
}

//初始化市
function initShi(shiId,xianId,width,height,selectValue,dialogId,serviceId,selectXzqh){
	var selectedIndex = '';
	var seletShi = '';//选中的市
	if(null == selectXzqh || selectXzqh == '' || selectXzqh == 'undefined'){
		selectedIndex = '0';
	}else{
		seletShi = selectXzqh.substring(0, 4) + "00";
	}
	$("#"+shiId).ctl_select({
        id: shiId+'_sel',
        listboxwidth : width,
		width : height,
		listboxalign : 'auto',
		listboxmaxheight : 200,
        columns: 1,
        checkbox: false,
        disabled: false,
        dialogId:dialogId,
    	selectedIndex: selectedIndex,
    	selected:[seletShi],
		defaultValue : '',
		defaultText : '请选择',
        columnValue: 'xzqhid',
        columnName: 'xzqhmc',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(serviceId),
            data: "{operType:'queryXzqh',type:'2',sheng:'"+selectValue+"'}"
        },
        onchange: function(name, value) {
        	initXian(xianId,width,height,value,dialogId,serviceId,selectXzqh);
        },
        onsyncomplete: function(name, selectValue) { 
        	initXian(xianId,width,height,selectValue,dialogId,serviceId,selectXzqh);
        }
    });
}

//初始化县
function initXian(xianId,width,height,selectValue,dialogId,serviceId,selectXzqh){
	var selectedIndex = '';
	var seletXian = '';//选中的县
	if(null == selectXzqh || selectXzqh == '' || selectXzqh == 'undefined'){
		selectedIndex = '0';
	}else{
		seletXian = selectXzqh;
	}
	$("#"+xianId).ctl_select({
        id: xianId+'_sel',
        listboxwidth : width,
		width : height,
		listboxalign : 'auto',
		listboxmaxheight : 200,
        columns: 1,
        checkbox: false,
        disabled: false,
        dialogId:dialogId,
        selectedIndex: selectedIndex,
    	selected:[seletXian],
		defaultValue : '',
		defaultText : '请选择',
        columnValue: 'xzqhid',
        columnName: 'xzqhmc',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(serviceId),
            data: "{operType:'queryXzqh',shi:'"+selectValue+"'}"
        }
    });
}