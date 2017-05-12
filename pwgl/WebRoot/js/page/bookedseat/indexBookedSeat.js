//座位预留
var indexBookedSeatService = "indexBookedSeatService";
var sessionsid = ccid==null?"":ccid;
var itemid = xmid==null?"":xmid;
var type='1';
$(function() {
	
	//新增座位
	$("#indexBookedseat_add_btn").click(function(){
		add_pew();
	});
	
	//删除座位
	$("#indexBookedseat_delete_btn").click(function(){
		delete_pew();
	});
	
	$("#indexSession_two_ccbh").text(sessionscode);
	$("#indexSession_two_ccmc_txt").text(sessionsname);
	spd('');

	// 预留分配加载预留种类
	ylzl('');

	// 分区名称
	$("#indexBookedseat_fqmc").ctl_select({
		id : 'indexBookedseat_fqmc_sel',
		width : 115,
		listboxmaxheight : 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
		checkbox : false,
		disabled : false,
		columnValue : 'sessnzoneid',
		columnName : 'zonename',
		url : springMvcUrl,
		type : 'post',
		dateType : 'json',
		param : {
			param : getParam(indexBookedSeatService),
			data : "{operType:'queryFqmc',value:'" + sessionsid + "'}"
		},
		onchange : function(name, value) {

			// 加载左边的第一个表格
			load_leftGrid(sessionsid, value);

			// 加载座位
			bookedseat_load(sessionsid, value);
		}
	});

	// 加载左边的第一个表格
	load_leftGrid(sessionsid, '');

	// 加载座位
	bookedseat_load(sessionsid, '');

	// 加载票价等级
	$("#indexBookedseat_pjdj").ctl_select({
		id : 'indexBookedseat_pjdj_sel',
		width : 115,
		listboxmaxheight : 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
		checkbox : false,
		disabled : false,
		columnValue : 'pricelevelid',
		columnName : 'djpjstr',
		hiddenId : 'indexBookedseat_pjdj_name',
		selectedIndex: '1',
        disableDefaultText : false,
		url : springMvcUrl,
		type : 'post',
		dateType : 'json',
		param : {
			param : getParam(indexBookedSeatService),
			data : "{operType:'queryPjdj',ccid:'" + sessionsid + "'}"
		}
	});
	
	
	//是否可预售
	$("#indexBookedseat_sfkys").ctl_select({
        id: "indexBookedseat_sfkys_sel",
        listboxwidth: 0,
        width: 55,
        listboxmaxheight: 300,
        selected:['1'],
        columns: 1,
        data:{'1':'是','2':'否'}
    });
	
	//是否可售
	$("#indexBookedseat_sfks").ctl_select({
        id: "indexBookedseat_sfks_sel",
        listboxwidth: 0,
        width: 55,
        listboxmaxheight: 300,
        selected:['1'],
        columns: 1,
        data:{'1':'是','2':'否'}
    });
	
	//是否可取
	$("#indexBookedseat_sfkq").ctl_select({
        id: "indexBookedseat_sfkq_sel",
        listboxwidth: 0,
        width: 55,
        listboxmaxheight: 300,
        selected:['1'],
        columns: 1,
        data:{'1':'是','2':'否'}
    });

	// 售票点和预留种类的查询
	$("#indexBookedseat_spd_query_btn").click(function() {
		var name = $("#indexBookedseat_spd_query_name").val();
		spd(name);
	});

	// 预留种类的查询
	$("#indexBookedseat_ylp_query_btn").click(function() {
		var name = $("#indexBookedseat_ylp_query_name").val();
		ylzl(name);
	});

	// 预留种类
	$("#indexBookedseat_ylzl").ctl_select({
		id : 'indexBookedseat_ylzl_sel',
		width : 115,
		listboxmaxheight : 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
		checkbox : false,
		disabled : false,
		columnValue : 'reserveid',
		columnName : 'reservename',
		url : springMvcUrl,
		selectedIndex: '1',
        disableDefaultText : false,
		type : 'post',
		dateType : 'json',
		param : {
			param : getParam(indexBookedSeatService),
			data : "{operType:'queryYlzl',sessionsid:'"+sessionsid+"'}"
		}
	});

	// 保存按钮
	$("#indexBookedseat_save_btn").click(function() {
			var pewids = '';// 座位
			if ("1" == type) {
				$("input[name='checkbox']:checked").each(function() {
						var id = $(this).attr("id");
						if(null != id && "" != id){
							if (pewids == "") {
								pewids += $(this).attr("id");
							} else {
								pewids += "," + $(this).attr("id");
							}
						}
					});
					if (pewids == "") {
						ctl_showMsg("至少选择一个座位");
						return;
					}
					var ppdjid = $("#indexBookedseat_pjdj_sel").val();// 票价等级
					if (ppdjid == "") {
						ctl_showMsg("请选择票价等级");
						return;
					}
					var pjstr = $("#indexBookedseat_pjdj_name").val()
							.split("(")[1];
					var pj = pjstr.substring(0, pjstr.length - 2);
					var ylzl = $("#indexBookedseat_ylzl_sel").val();
					if (ylzl == "") {
						ctl_showMsg("请选择预留种类");
						return;
					}
					var sfkys=$("#indexBookedseat_sfkys_sel").val();//是否可预售
					var sfks=$("#indexBookedseat_sfks_sel").val();//是否可售
					var sfkq=$("#indexBookedseat_sfkq_sel").val();//是否可取
					var data = {pewids : pewids,ppdjid : ppdjid,pj : pj,ylzl : ylzl,sfkys:sfkys,sfks:sfks,sfkq:sfkq,operType : 'update'};
					publicAjaxRequest(indexBookedSeatService,data,jsonType,function(response) {
								var rdata = response.data;
								if ("success" == rdata) {
									ctl_showMsg("操作成功!");
									ctl_reloadGrid('indexBookedSeat_left_table');
									var fqid = $("#indexBookedseat_fqmc_sel").val();
									bookedseat_load(sessionsid, fqid);
								} else if ("fail" == rdata) {
									ctl_showMsg("操作失败!");
								} else {
									ctl_showMsg(rdata);
								}
						 });
						} else {
							var payboxids = '';
							var reserveids = '';
							$("input[name='payboxnamecheckbox']:checked").each(function() {
									if (payboxids == "") {
										payboxids += $(this).attr("id");
									} else {
										payboxids += ","+ $(this).attr("id");
									}
							});
							$("input[name='reservenamecheckbox']:checked").each(function() {
									if (reserveids == "") {
										reserveids += $(this).attr(
												"id");
									} else {
										reserveids += ","+ $(this).attr("id");
									}
							});
							if ($("input[name='payboxnamecheckbox']:checked").length == 0) {
								ctl_showMsg("售票点至少选择一个");
								return;
							}
							if ($("input[name='reservenamecheckbox']:checked").length == 0) {
								ctl_showMsg("预留种类至少选择一个");
								return;
							}
							var data = {xsd : payboxids,ylzl : reserveids,xmid : itemid,ccid : sessionsid,operType : 'save'};
							publicAjaxRequest(indexBookedSeatService, data,jsonType, function(response) {
								var rdata = response.data;
								if ("success" == rdata) {
									ctl_showMsg("操作成功!");
								} else if ("fail" == rdata) {
									ctl_showMsg("操作失败!");
								} else {
									ctl_showMsg(rdata);
								}
							});
						}
					});

	// 取消选中
	$("#indexBookedseat_reselect_btn").click(function() {
		$("input[name='checkbox']:checked").each(function() {
			$(this).attr('checked', false);
			var id = $(this).attr("id");
			$("#" + id + "a").attr("class", "db");
		});
	});

	// 刷新座位
	$("#indexBookedseat_refresh_btn").click(function() {
		var fqmc = $("#indexBookedseat_fqmc_sel").val();
		if ("" == sessionsid) {
			ctl_showMsg("场次不能为空");
			return;
		}
		if ("" == fqmc) {
			ctl_showMsg("分区名称不能为空");
			return;
		}
		// 刷新统计表格
		ctl_reloadGrid('indexBookedSeat_left_table');

		// //加载座位
		bookedseat_load(sessionsid, fqmc);
	});

	// 座位预留
	$("#indexBookedseat_zwyl_div").click(function() {
		$(this).attr("class", "c_p dnb bod on");
		$("#indexBookedseat_ylfp_div").attr("class", "c_p dnb bod");
		$("#indexSession_zwyl_div").show();
		$("#indexBookedseat_ylfp_div_id").hide();
		type = "1";
	});

	// 预留分配
	$("#indexBookedseat_ylfp_div").click(function() {
		$(this).attr("class", "c_p dnb bod on");
		$("#indexBookedseat_zwyl_div").attr("class", "c_p dnb bod");
		$("#indexSession_zwyl_div").hide();
		$("#indexBookedseat_ylfp_div_id").show();
		type = "2";
	});
});

// 加载左边的第一个表格--票价等级，预留种类，票价来汇总
function load_leftGrid(ccid, fqid) {
	var ccids = ccid;// 场次ID
	var fqids = fqid;// 分区ID
	var divHtml = "<table id='indexBookedSeat_left_table'></table><div id='indexBookedSeat_left_pagger'></div>";
	$("#indexBookedSeat_left_table_div").html(divHtml);
	ctl_initGrid({
		jqGridId : "indexBookedSeat_left_table",
		serviceId : indexBookedSeatService,
		requestDataXml : {
			operType : "queryLeftGrid",
			"ccid" : ccids,
			"fqid" : fqids
		},
		singleRowData : true,
		dataFormat : jsonType,
		width : 365,
		height : 200,
		colNames : [ '票价等级', '预留种类', '票价', '颜色','座位' ],
		colModel : [ {
			name : 'pricelevelname',
			index : 'pricelevelname'
		}, {
			name : 'reservename',
			index : 'reservename'
		}, {
			name : 'sumprice',
			index : 'sumprice'
		}, {
			name : 'color',
			index : 'color',
			hidden : true
		},{name:'zw',index:'zw'} ],
		pager : "indexBookedSeat_left_pagger",
		rowNum : 10,
		viewrecords : true,
		rowList : [ 10, 20, 30 ],
		gridComplete : function() {
			var ids = ctl_getAllDataIds('indexBookedSeat_left_table');
			var cl = '';
			for ( var i = 0; i < ids.length; i++) {
				cl = ids[i];
				var rowObj = ctl_getRowObjForRowNo(
						'indexBookedSeat_left_table', cl);
				var color = rowObj.color;
				var pricelevelname = '';
				var cls = '';
				if (color == '赤') {
					cls = "<span  class='chiColor dnb v_m'></span>";
				} else if (color == '橙') {
					cls = "<span  class='chengColor dnb v_m'></span>";
				} else if (color == '黄') {
					cls = "<span  class='huangColor dnb v_m'></span>";
				} else if (color == '绿') {
					cls = "<span  class='lvColor dnb v_m'></span>";
				} else if (color == '青') {
					cls = "<span  class='lvColor dnb v_m'></span>";
				} else if (color == '蓝') {
					cls = "<span  class='lanColor dnb v_m'></span>";
				} else if (color == '紫') {
					cls = "<span  class='ziColor dnb v_m'></span>";
				}
				pricelevelname = cls
						+ "<span class='v_m' style='padding-left:5px;'>"
						+ rowObj.pricelevelname + "</span>";
				ctl_setCell('indexBookedSeat_left_table', cl, 'pricelevelname',
						pricelevelname);
			}
		},
		jsonReader : {
			root : "data",
			total : "totalPage",
			page : "page",
			records : "totalSize",
			repeatitems : false
		}
	});
}

// 加载座位
function bookedseat_load(ccid, fqid) {
	var data = {
		ccid : ccid,
		fqid : fqid,
		operType : "querySeat"
	};
	publicAjaxRequest(indexBookedSeatService,data,jsonType,function(response) {
				var rdata = response.data.length;
				var divHtml = "";
				var preRow = 0;
				var preCol = 0;
				var newRowFlag = false;//是否新的一行
				var maxCol = 10;//一行最大座位数
				for ( var i = 0; i < rdata; i++) {
					var data = response.data;
					var pewid = data[i].pewid;// 座位ID
					var color = data[i].color;
					var pxh=data[i].pxh;
					var cls = "";
					var row=data[i].row;
					var col=data[i].col;
					var minuxCol_pre = 0;//前面--需补的座位
					var minuxCol_sub = 0;//上一行后面--需补的座位
					if(row != preRow){
						if(preCol != 0 && preCol < maxCol){//上一行后面--需补的座位
							minuxCol_sub = (maxCol - preCol);
							for(var j = 0;j < minuxCol_sub;j++){
								divHtml += "<li class='l'><a class='db deletePew'></a></li>";
							}
						}
						
						if(i != 0){
							divHtml+="<li class='l' id='"+preRow+"' style='margin-left:5px;'>"+preRow+"<input type='checkbox' id='"+preRow+"_checkbox' onclick='pew_status(\""+preRow+ "\")' style='margin-left: 5px;margin-top: 16px;'/></li>";
						}
						
						var minux = (row - preRow) - 1;//需补的行数
						if(minux > 0){
							for(var r = 0;r < minux;r++){
								for(var j = 0;j < maxCol;j++){
									divHtml += "<li class='l'><a class='db deletePew'></a></li>";
								}
							}
						}
						
						preRow = row;
						newRowFlag = true;
						preCol = 0;
					}else{
						newRowFlag = false;
					}
					if (color == '赤') {
						cls = "db chiColor";
					} else if (color == '橙') {
						cls = "db chengColor";
					} else if (color == '黄') {
						cls = "db huangColor";
					} else if (color == '绿') {
						cls = "db lvColor";
					} else if (color == '青') {
						cls = "db qingColor";
					} else if (color == '蓝') {
						cls = "db lanColor";
					} else if (color == '紫') {
						cls = "db ziColor";
					} else {
						cls = "db";
					}
					if(newRowFlag && col > 1){//每一最前面--需补的座位
						for(var j = 1;j < col;j++){
							divHtml += "<li class='l'><a class='db deletePew'></a></li>";
						}
					}
					
					if(preCol == 0){
						divHtml += "<li class='l' row='"+row+"_li'><a class='"+ cls+ "' id='"+ pewid+ "a' onclick='save(\""+ pewid+ "\")'><input type='checkbox'  style='display:none;'  name='checkbox'  id='"
						+ pewid + "' value='" + pewid + "' /></a></li>";
						preCol = col;
					}else{
						var minux = (col - preCol) - 1;//需补的空座位
						if(minux > 0){
							for(var j = 0;j < minux;j++){
								divHtml += "<li class='l'><a class='db deletePew'></a></li>";
							}
						}
						divHtml += "<li class='l' row='"+row+"_li'><a class='"+ cls+ "' id='"+ pewid+ "a' onclick='save(\""+ pewid+ "\")'><input type='checkbox'  style='display:none;'  name='checkbox'  id='"
						+ pewid + "' value='" + pewid + "' /></a></li>";
						preCol = col;
					}
					if(i == (rdata - 1)){
						if(preCol != 0 && col < maxCol){//最后一行后面--需补的座位
							minuxCol_sub = (maxCol - col);
							for(var j = 0;j < minuxCol_sub;j++){
								divHtml += "<li class='l'><a class='db deletePew'></a></li>";
							}
						}
						
						divHtml+="<li class='l' id='"+row+"' style='margin-left:5px;'>"+row+"<input type='checkbox' id='"+row+"_checkbox' onclick='pew_status(\""+row+ "\")'  style='margin-left: 5px;margin-top: 16px;'/></li>";
					}
				}
				$("#indexBookedSeat_seat_div").html(divHtml);
		});
}

//座位状态
function pew_status(id){
	if ($("#" + id+"_checkbox").attr("checked") == 'checked') {
		$("li[row='"+id+"_li']").each(function() {
			var li_a = $(this).find("a").attr("id");
			var li_input = li_a.substring(0,li_a.length-1);
			$("#" + li_input).attr("checked", true);
			$("#"+li_a).attr("class", "db yes");
		});
	} else {
		$("li[row='"+id+"_li']").each(function() {
			var li_a = $(this).find("a").attr("id");
			var li_input = li_a.substring(0,li_a.length-1);
			$("#" + li_input).attr("checked", false);
			$("#"+li_a).attr("class", "db");
		});
	}
}

// 预留分配加载售票点
function spd(name) {
	var data = {
		name : name,
		operType : 'queryXsd',
		sessionsid:sessionsid
	};
	publicAjaxRequest(indexBookedSeatService,data,jsonType,function(response) {
			var len = response.data.length;
			var divHtml = "";
			for ( var i = 0; i < len; i++) {
				var payboxname = response.data[i].payboxname;
				var payboxid = response.data[i].payboxid;
				var checked=response.data[i].checked;
				if(checked=='true'){
					divHtml += "<a href='#'  onclick='ylfpcheckboxclick(\""+ payboxid
					+ "\")'><div  id='"
					+ payboxid
					+ "div' class='c_f pl15 pt10 pb10 bggreen' >"
					+ payboxname
					+ "</div></a><input style='display:none;' type='checkbox' checked='checked' value='"
					+ payboxid + "' name='payboxnamecheckbox' id='"
					+ payboxid + "'/>";
				}else{
				    divHtml += "<a href='#'  onclick='ylfpcheckboxclick(\""+ payboxid
						+ "\")'><div  id='"
						+ payboxid
						+ "div' class='pl15 pt10 pb10 pr15' >"
						+ payboxname
						+ "</div></a><input style='display:none;' type='checkbox' value='"
						+ payboxid + "' name='payboxnamecheckbox' id='"
						+ payboxid + "'/>";
				}
			}
			$("#indexBookedSeat_ylfp_spd_div").html(divHtml);
	});
}

// 预留分配加载预留种类
function ylzl(name) {
	var data = {
		name : name,
		operType : 'queryYlzl',
		sessionsid:sessionsid
	};
	publicAjaxRequest(
			indexBookedSeatService,
			data,
			jsonType,
			function(response) {
				var len = response.data.length;
				var divHtml = "";
				for ( var i = 0; i < len; i++) {
					var reservename = response.data[i].reservename;
					var reserveid = response.data[i].reserveid;
					var checked = response.data[i].checked;
					if(checked=='true'){
					     divHtml += "<a href='#'  onclick='ylzlcheckboxclick(\""
								+ reserveid
								+ "\")'><div  name='ylzldiv' id='"
								+ reserveid
								+ "div' class='c_f pl15 pt10 pb10 bggreen' >"
								+ reservename
								+ "</div></a><input style='display:none;' type='checkbox' checked='checked' value='"
								+ reserveid + "' name='reservenamecheckbox' id='"
								+ reserveid + "'/>";
					}else{
					     divHtml += "<a href='#'  onclick='ylzlcheckboxclick(\""
							+ reserveid
							+ "\")'><div  name='ylzldiv' id='"
							+ reserveid
							+ "div' class='pl15 pt10 pb10 pr15' >"
							+ reservename
							+ "</div></a><input style='display:none;' type='checkbox' value='"
							+ reserveid + "' name='reservenamecheckbox' id='"
							+ reserveid + "'/>";
					}
				}
				$("#indexBookedSeat_ylfp_ylzl_div").html(divHtml);
			});
}

//设置选中
function ylzlcheckboxclick(id) {	
	if($("#" + id + "div").attr("class")=='pl15 pt10 pb10 pr15'){
		$("#" + id + "div").attr("class", "c_f pl15 pt10 pb10 bggreen");
		$("#" + id).attr("checked", true);
	}else{
		$("#" + id + "div").attr("class", "pl15 pt10 pb10 pr15");
		$("#" + id).attr("checked", false);
	}
}

//设置选中
function ylfpcheckboxclick(id) {
	if ($("#" + id + "div").attr("class") == 'pl15 pt10 pb10 pr15') {
		$("#" + id + "div").attr("class", "c_f pl15 pt10 pb10 bggreen");
		$("#" + id).attr("checked", true);
	}else{
		$("#" + id + "div").attr("class", "pl15 pt10 pb10 pr15");
		$("#" + id).attr("checked", false);
	}
}

//设置选中
function save(id) {
	if ($("#" + id).attr("checked") == 'checked') {
		$("#" + id + "a").attr("class", "db");
		$("#" + id).attr("checked", false);
	} else {
		$("#" + id + "a").attr("class", "db yes");
		$("#" + id).attr("checked", true);
		$("#" + id + "a").css("	border-color", "red");
	}
}

//删除座位
function delete_pew(){
	var pewids="";
	$("input[name='checkbox']:checked").each(function() {
		if (pewids == "") {
			pewids += $(this).attr("id");
		} else {
			pewids += "," + $(this).attr("id");
		}
	});
	if(""==pewids){
		ctl_showMsg("请至少选择上一个座位！");
		return;
	}
	var data={pewids:pewids,operType:'delete'};
	publicAjaxRequest(indexBookedSeatService,data,jsonType,function(response) {
		var data=response.data;
		if("success"==data){
			ctl_showMsg("操作成功！");
			var fqid = $("#indexBookedseat_fqmc_sel").val();
			bookedseat_load(sessionsid, fqid);
		}else{
			ctl_showMsg("操作失败！");
		}
   });
	
}

//新增座位
function add_pew(){
	 var dlg = ctl_dialogDivClose('', {
	        title: '新增座位',
	        content: 'addBookedSeat_pew_div',
	        lock: true,
	        min: false,
	        max: false,
	        drag: false,
	        resize: false
	    },
	    ['qx_btn']);	
	 
	 //新增座位
	 $("#qd_btn").click(function(){
		var hh=$("#hh").val();//行号
		var lh=$("#lh").val();//列号
		var fqid = $("#indexBookedseat_fqmc_sel").val();
		if(""==fqid){
			ctl_showMsg("分区名称不能为空！");
			return;
		}
		var reg = new RegExp("^[0-9]*$");
		if(""==hh){
			ctl_showMsg("行号不能为空！");
			return;
		}
	    if(!reg.test(hh)){
	        ctl_showMsg("行号数字！");
	        return;
	    }
	    if(""==lh){
			ctl_showMsg("列号不能为空！");
			return;
		}
	    if(!reg.test(lh)){
	        ctl_showMsg("列号数字！");
	        return;
	    }
	    var pjdjid=$("#indexBookedseat_pjdj_sel").val();
	    var price=$("#indexBookedseat_pjdj_name").val();
	    var str=price.split("(")[1];
	    var jg=str.substring(str,str.length-2);
	    var sfkys=$("#indexBookedseat_sfkys_sel").val();//是否可预售
	    var sfks=$("#indexBookedseat_sfks_sel").val();//是否可售
	    var sfkq=$("#indexBookedseat_sfkq_sel").val();//是否可取
	    var ylzl=$("#indexBookedseat_ylzl_sel").val();//预留种类
		var data={hh:hh,lh:lh,fqid:fqid,sessionsid:sessionsid,pjdjid:pjdjid,operType:'addPew',jg:jg,sfkys:sfkys,sfks:sfks,sfkq:sfkq,ylzl:ylzl};
		publicAjaxRequest(indexBookedSeatService,data,jsonType,function(response) {
			var data=response.data;
			if("success"==data){
				ctl_showMsg("操作成功！");
				dlg.close();
				var fqid = $("#indexBookedseat_fqmc_sel").val();
				bookedseat_load(sessionsid, fqid);
			}else if("exists"==data){
				ctl_showMsg("座位已存在，请重新添加！");
			}else{
				ctl_showMsg("操作失败！");
			}
	   });
	 });
}