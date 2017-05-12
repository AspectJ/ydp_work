var ticketfaceService="ticketfaceService";
var sessionsid = "CS001CCID";
$(function(){
	//加载场次
	var data={operType:'ccmc'};
	publicAjaxRequest(ticketfaceService,data,jsonType, function(response) {
		var obj = response.data;
		var str = "";
		for ( var i = 0; i < obj.length; i++) {
			str += "<option value='"+obj[i].sessionsid+"'>"+obj[i].sessionsname+"</option>";
		}
		$("#ccmc_sel").html(str);
	});
	
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
    	selectedIndex: '',
    	selected:[],
		defaultValue : '',
		defaultText : '请选择',
        columnValue: 'sessionsid',
        columnName: 'sessionsname',
        url: springMvcUrl,
        hiddenId: 'ccmcid',
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(ticketfaceService),
            data: "{operType:'ccmc'}"
        }
    });	
	
	//确定
	$("#ticketface_qd").click(function(){
		var pjmc=$("#ccmc_sel").val();
		var pjbh=$("#ccmcid").val();
		if($.trim(pjmc) == ""){
			ctl_showMsg("场次名称不能为空");
			return;
		}	
		var data={pjmc:pjmc,pjbh:pjbh,operType:'add'};
		publicAjaxRequest(ticketfaceService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_showMsg("新增成功!");
			}else if("fail" == rdata){
				ctl_showMsg("新增失败!");
			}else if("exists" == rdata){
				ctl_showMsg("已经存在!");
			}else{
				ctl_showMsg(rdata);
			}
		});	
	});
	
	$("#save_btn").click(function(){
		var type = $("input[name='ticket']:checked").val();
		if(type == "1"){
			
		}else if(type == "2"){
			var oldsessionsid = $("#ccmc_sel").val();
			var tables = "";
			$("#table_li input:checked").each(function(){
				if(tables == ""){
					tables = $(this).val();
				}else{
					tables += ","+$(this).val();
				}
			});
			if(tables == ""){
				ctl_showMsg("请勾选需赋值的信息!");
				return;
			}
			
			var data={operType:'copyData',sessionsid:sessionsid,oldsessionsid:oldsessionsid,tables:tables};
			publicAjaxRequest(ticketfaceService,data,jsonType, function(response) {
				var rdata = response.data;
				if("success" == rdata) {
					ctl_showMsg("新增成功!");
				}else if("fail" == rdata){
					ctl_showMsg("新增失败!");
				}else if("exists" == rdata){
					ctl_showMsg("已经存在!");
				}else{
					ctl_showMsg(rdata);
				}
			});
		}
	});
});
