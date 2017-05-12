var treejgObj=null;//机构
var treeObj=null;//售票点
var xszcObj=null;//销售政策
var sessionsid = ccid;
var type = "jg";//默认上为机构
$(function(){
	spsqinit();
	loadJg();
	loadXszc();
	
	/**售票授权逻辑begin*/
	$("input[name='tj']").click(function(){
		if($(this).val() == "jg"){
			$("#jg_div").show();
			$("#yh_div").hide();
		}else{
			$("#jg_div").hide();
			$("#yh_div").show();
		}
		sq();	
	});
	
	//销售政策授权
	$("#xszcsq_btn").click(function(){
		xsjgTreeInit();
	});
	
	$("#spsq_save_btn").click(function(){
		var spqxids = "";
		$("#spqx_div input").each(function(){
			if(!$(this).attr("checked")){
				return;
			}
			if(spqxids == ""){
				spqxids = $(this).val();
			}else{
				spqxids += ","+$(this).val();
			}
		});
		type = $("input[name='tj']:checked").val();
		if(type == "jg"){
			var nodes = ctl_getCheckedNodes(treejgObj,true);
			if(null == nodes||''==nodes){
				ctl_showMsg("请选择要授权的机构！");
				return;
			}
			if(spqxids == ""){
				ctl_showMsg("请选择售票权限！");
				return;
			}
			var jgids = "";
			for(var i = 0; i < nodes.length; i++){
				if(jgids != ""){
					jgids += ",";
				}
				jgids += nodes[i].id;
			}
			var data = {operType:'saveJgspsq',jgids:jgids,spqxids:spqxids,sessionsid:sessionsid};
			publicAjaxRequest("indexSellEmpowerService",data,jsonType, function(response) {
				var rdata = response.data;
				if("fail" == rdata) {
					ctl_showMsg("授权失败！");
				}else if("success" == rdata){
//					init();
					ctl_showMsg("授权成功！");
					sq();
				}
			});
		}else if(type == "yh"){
			var nodes = ctl_getCheckedNodes(treeObj);
			var spyids = "";
			for(var i = 0; i < nodes.length; i++){
				if(spyids != ""){
					spyids += ",";
				}
				spyids += nodes[i].id;
			}
			if(spyids == ""){
				ctl_showMsg("请选择要授权的售票员！");
				return;
			}
			if(spqxids == ""){
				ctl_showMsg("请选择售票权限！");
				return;
			}
			var data = {operType:'saveSpyspsq',spyids:spyids,spqxids:spqxids,sessionsid:sessionsid};
			publicAjaxRequest("indexSellEmpowerService",data,jsonType, function(response) {
				var rdata = response.data;
				if("fail" == rdata) {
					ctl_showMsg("授权失败！");
				}else if("success" == rdata){
					sq();
					ctl_showMsg("授权成功！");
				}
			});
		}
	});
	/**售票授权逻辑end*/
	
	/**销售政策授权逻辑begin*/
	$("#payboxname").keydown(function(e){
		if(e.keyCode == "13"){
			xsjgTreeInit();
		}
	});
	$("#areaname").keydown(function(e){
		if(e.keyCode == "13"){
			xsjgTreeInit();
		}
	});
	$("#qx_chk").click(function(){
		if($(this).attr("checked")){
			$("#jgyh_div input").attr("checked",true);
		}else{
			$("#jgyh_div input").attr("checked",false);
		}
	});
	$("#zcsq_save_btn").click(function(){
		var nodes = ctl_getCheckedNodes(xszcObj,true);
		if(null == nodes||''==nodes){
			ctl_showMsg("请选择要授权的机构！");
			return;
		}
		var sqjgids="";
		for(var i = 0; i < nodes.length; i++){
			if(!ctl_isParent(nodes[i])){//得到叶子节点
			  if(sqjgids != ""){
				sqjgids += ",";
			  }
			  sqjgids += nodes[i].id;
			}
		}
		var xszcids="";
		$("input[name='zcname']:checked").each(function() {
			if (xszcids == "") {
				xszcids += $(this).attr("id");
			} else {
				xszcids += "," + $(this).attr("id");
			}
		});
		if(xszcids==""){
			ctl_showMsg("请至少选择一个政策！");
			return;
		}
		var data = {operType:'saveXszcsq',sqjgids:sqjgids,xszcids:xszcids,sessionsid:sessionsid};
		publicAjaxRequest("indexSellEmpowerService",data,jsonType, function(response) {
			var rdata = response.data;
			if("fail" == rdata) {
				ctl_showMsg("授权失败！");
			}else if("success" == rdata){
				spsqinit();
				ctl_showMsg("授权成功！");
			}
		});
	});
	/**销售政策授权逻辑end*/
});


//授权
function sq(){
	type = $("input[name='tj']:checked").val();
	var flag="";
	if(type=="yh"){
		flag="yh";
	}else{
		flag="jg";
	}
	var data2 = {operType:'selectSpqx',sessionsid:sessionsid,flag:flag};
	publicAjaxRequest("indexSellEmpowerService",data2,jsonType, function(response) {
		var obj = response.data;
		$("#spqx_div").html("");
		var str = "";
		for ( var i in obj) {
			var checked=obj[i].checked;
			if(checked=='true'){
				str = "<p class='pt15'><input type='checkbox' checked='checked' class='v_m' value='"+obj[i].sellpowerid+"'/> "+obj[i].powername+"</p>";
			}else{
				str = "<p class='pt15'><input type='checkbox' class='v_m' value='"+obj[i].sellpowerid+"'/> "+obj[i].powername+"</p>";
			}
			
			$("#spqx_div").append(str);
		}
	});
}

//加载销售机构
function xsjgTreeInit(){
	var data0 = "{operType:'selectJgyh',sessionsid:'"+sessionsid+"'}";
	var treeParam = {
		treeId:"jgyh_ztree",
		checkEnable:true,
		simpleEnable : true,
		asyncEnable : true,
		asyncUrl : springMvcUrl,
		asyncType : 'post',
		dataType : 'json',
		onClick : function(event,treeId,treeNode){
		},
		otherParam : {
			param : getParam("indexSellEmpowerService"),
			data : data0
		}
	};
	//初始化树
	xszcObj = ctl_initTree(treeParam, null);
}

function spsqinit(){
	
	//加载售票机构
	var data0 = "{operType:'spjg',sessionsid:'"+sessionsid+"'}";
	var treeParam = {
		treeId:"menu",
		checkEnable:true,
		simpleEnable : true,
		asyncEnable : true,
		asyncUrl : springMvcUrl,
		asyncType : 'post',
		dataType : 'json',
		onClick : function(event,treeId,treeNode){
		},
		otherParam : {
			param : getParam("indexSellEmpowerService"),
			data : data0
		}
	};
	//初始化树
	treejgObj = ctl_initTree(treeParam, null);	
	var data1 = "{operType:'selectSpy',sessionsid:'"+sessionsid+"'}";
	var treeParam1 = {
			treeId:"yh_menu",
			checkEnable:true,
			simpleEnable : true,
			asyncEnable : true,
			asyncUrl : springMvcUrl,
			asyncType : 'post',
			dataType : 'json',
			onClick : function(event,treeId,treeNode){
			},
			otherParam : {
				param : getParam("indexSellEmpowerService"),
				data : data1
			}
		};
	//初始化树
	treeObj = ctl_initTree(treeParam1, null);
	
	//加载售票权限
	$("#spqx_div p").remove();
	sq();
}

function loadJg(){
	$("#jg_sel").html("<option value=''>请选择</option>");
	var payboxname = $("#payboxname").val();
	var areaname = $("#areaname").val();
	var data = {operType:'selectJg',payboxname:payboxname,areaname:areaname};
	publicAjaxRequest("indexSellEmpowerService",data,jsonType, function(response) {
		var obj = response.data;
		var str = "";
		for ( var i = 0; i < obj.length; i++) {
			str = "<option value='"+obj[i].payboxid+"'>"+obj[i].payboxname+"</option>";
			$("#jg_sel").append(str);
		}
	});
}

function loadXszc(){	
	var data = {operType:'selectXszc',sessionsid:sessionsid};
	publicAjaxRequest("indexSellEmpowerService",data,jsonType, function(response) {
		var obj = response.data;
		var str = "";
		for ( var i = 0; i < obj.length; i++) {
			var checked=obj[i].checked;
			if(checked=='true'){
				str=str+ "<p class='pt15'><input type='checkbox' name='zcname' checked='checked' class='v_m' id='"+obj[i].zcid+"'/> "+obj[i].zcmc+"</p>";
			}else{
				str=str+ "<p class='pt15'><input type='checkbox' name='zcname' class='v_m' id='"+obj[i].zcid+"'/> "+obj[i].zcmc+"</p>";
			}
			$("#zc_sel_div").html(str);
		}
	});
}
