//分区座位
var sessionsid = ccid==null?"":ccid;
var indexSessnZoneService = "indexSessnZoneService";
$(function() {
	$("#indexSession_two_ccbh").text(sessionscode);
	$("#indexSession_two_ccmc_txt").text(sessionsname);
	
	//加载分区
	subzoneFunc('');
	
	//新建分区
	$("#indexSessnZone_addBtn").click(function(){
		add_fq();
	});
	
	//删除分区
	$("#indexSessnzone_deletebtn").click(function(){
		var dlg = ctl_dialogDivClose('', {
	        title: '删除分区',
	        content: 'indexSessnzone_del_div',
	        lock: true,
	        min: false,
	        max: false,
	        drag: false,
	        resize: false
	    },
	    ['indexSessnZoneCancelBtn']);		
		var data={operType:'fqindex',sessionsid:sessionsid};
		publicAjaxRequest(indexSessnZoneService,data,jsonType, function(response) {
		     var rdata = response.data.length;
			 var divHtml="";
			  for(var i=0;i<rdata;i++){
				 var data=response.data;
			     var sessnzoneid=data[i].sessnzoneid;
			     var zonename=data[i].zonename;
				 divHtml += "<dl>";
				 divHtml += "<dd>";
				 divHtml += "<input type='checkbox' id='" + sessnzoneid
				 + "' name='checkbox' />";
				
				 divHtml += "<label name='roleNameLabel' id='roleLabel_"
						+ sessnzoneid + "'>" + zonename + "</label>";
				divHtml += "</dd>";
				divHtml += "</dl>";
			}
			$("#deleteDataDiv").html(divHtml);
			
		});
		
		$("#indexSessnZoneSaveBtn").click(function(){
			var sessnzoneids = "";
			$("input[name='checkbox']:checked").each(function(){
				if(sessnzoneids == ""){
					sessnzoneids += $(this).attr("id");
				}else{
					sessnzoneids+= ","+$(this).attr("id");
				}
			});
			if(sessnzoneids==""){
				ctl_showMsg("请至少选择一个分区!");
				return;
			}
			var data = {sessnzoneids:sessnzoneids,operType:'sc'};
			publicAjaxRequest(indexSessnZoneService,data,jsonType, function(response) {
				var rdata = response.data;
				if("success" == rdata) {
					ctl_showMsg("删除成功!");
					subzoneFunc('');
					dlg.close();
				}else if("fail" == rdata) {
					ctl_showMsg("删除失败!");
					dlg.close();
				}else {
					ctl_showMsg(rdata);
				}
			});
	    });
	});
	
	//修改分区
	$("#indexSessnZone_updateBtn").click(function(){
		var dlg = ctl_dialogDivClose('', {
	        title: '修改分区',
	        content: 'indexSessnzone_update_div',
	        lock: true,
	        min: false,
	        max: false,
	        drag: false,
	        resize: false
	    },
	    ['indexSessnZoneCancelBtn']);
		if($.trim(sessionsid)==''){
			ctl_showMsg("场次不能为空");
			return;
		}
		var data={operType:'fqindex',sessionsid:sessionsid};
		publicAjaxRequest(indexSessnZoneService,data,jsonType, function(response) {
		     var rdata = response.data.length;
			 var divHtml="";
			  for(var i=0;i<rdata;i++){
				 var data=response.data;
			     var sessnzoneid=data[i].sessnzoneid;
			     var zonename=data[i].zonename;
				 divHtml += "<dl>";
				 divHtml += "<dd>";
				 divHtml += "<input type='radio' id='" + sessnzoneid
				 + "' name='radio' />";
				
				 divHtml += "<label name='roleNameLabel' id='roleLabel_"
						+ sessnzoneid + "'>" + zonename + "</label>";
				divHtml += "</dd>";
				divHtml += "</dl>";
			}
			$("#deleteDataDiv").html(divHtml);
			
		});
		
		$("#indexSessnZoneSaveBtn").click(function(){
			var sessnzoneids = "";
			$("input[name='radio']:checked").each(function(){
				sessnzoneids = $(this).attr("id");
			});
			if(sessnzoneids==""){
				ctl_showMsg("请至少选择一个分区!");
				return;
			}
			var len=$("input[name='radio']:checked").length;
			if(len==1){
				xgClick(sessnzoneids);
			}
		});
	});
});

function subzoneFunc(fqmc) {
	var data = {
		operType : 'fqindex',
		sessionsid : sessionsid
	};
	publicAjaxRequest(indexSessnZoneService, data, jsonType, function(
			response) {
		var rdata = response.data.length;
		var divHtml = "";
		for ( var i = 0; i < rdata; i++) {
			var data = response.data;
			var sessnzoneid = data[i].sessnzoneid;
			var zonename = data[i].zonename;
			if (fqmc == zonename) {
				divHtml += "<li class='l on' ondblclick='fqClick(\""
						+ sessnzoneid + "\",\"" + zonename
						+ "\")'><a class='c_f' >" + zonename + "</a></li>";
			} else {
				divHtml += "<li class='l' ondblclick='fqClick(\""
						+ sessnzoneid + "\",\"" + zonename
						+ "\")'><a class='c_f' >" + zonename + "</a></li>";
			}
		}
		$("#indexSessnZone_fq_ulId").html(divHtml);
	});
}

// 座位
function fqClick(sessnzoneid, zonename) {
	var data = {
		sessnzoneid : sessnzoneid,
		operType : 'queryZw'
	};
	publicAjaxRequest(indexSessnZoneService, data, jsonType, function(
			response) {
		var rdata = response.data.length;
		var divHtml = "";
		for ( var i = 0; i < rdata; i++) {
			var data = response.data;
			divHtml += "<li class='l'><a class='db'></a></li>";
		}
		$("#indexSession_fq_div").hide();
		$("#indexSession_zw_divId").show();
		$("#indexSessnzone_zw_detail_div").html(divHtml);
	});
	$("#indexSessnzone_name_li").html("当前分区：" + zonename);

	// 返回的点击事件
	$("#indexSessnZone_return_back_btn").click(function() {
		$("#indexSession_zw_divId").hide();// 座位隐藏
		$("#indexSession_fq_div").show();// 分区显示
		$('#indexSession_add_table tr td span').removeClass('bggreen1');
		$("#indexSession_fqzw_td_id span").addClass("bggreen1");

		// 分区重新加载
		subzoneFunc('');
	});
	initGird(sessnzoneid);
}

// 加载表格
function initGird(sessnzoneid) {
	var divHtml = "<table id='indexSessnoZone_grid'></table><div id='indexSessnoZone_pager'></div>";
	$("#indexSesszone_table_div").html(divHtml);
	ctl_initGrid({
		jqGridId : "indexSessnoZone_grid",
		serviceId : indexSessnZoneService,
		requestDataXml : {
			sessnzoneid : sessnzoneid,
			operType : "queryHz"
		},
		singleRowData : true,
		dataFormat : jsonType,
		width : 365,
		height : 200,
		colNames : [ '等级', '票价', '数量', '金额' ],
		colModel : [ {
			name : 'pricelevelname',
			index : 'pricelevelname'
		}, {
			name : 'price',
			index : 'price'
		}, {
			name : 'num',
			index : 'num'
		}, {
			name : 'sumprice',
			index : 'sumprice'
		} ],
		pager : "indexSessnoZone_pager",
		rowNum : 10,
		viewrecords : true,
		rowList : [ 10, 20, 30 ],
		gridComplete : function() {
			var ids = ctl_getAllDataIds('indexSessnoZone_grid');
			var len = ids.length;
			var number = '0';
			var cl = "";
			for ( var i = 0; i < len; i++) {
				cl = ids[i];
				var rowObj = ctl_getRowObjForRowNo('indexSessnoZone_grid',
						cl);
				number = parseInt(number) + parseInt(rowObj.num);
			}
			$("#indexSesszone_fq_div_num").html(
					"本分区共有" + parseInt(number) + "个座位");
			
//			addAutoSize([{
//   				htmlId : "indexSessnoZone_grid",// 页面中元素的id
//   				htmlType : "jqgrid",// 表示为jqgrid
//   				widthResize : -1005,// 缩放比例后需要调整的宽度
//   				heightResize : -750
//   			}]);
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

// 新增分区
function add_fq() {
	var dlg = ctl_dialogDivClose('', {
		title : '新增分区',
		content : 'addSessnZone_div',
		lock : true,
		min : false,
		max : false,
		drag : false,
		resize : false
	}, [ 'qx' ]);
	var data={sessionsid:sessionsid,operType:'queryct'};
	publicAjaxRequest(indexSessnZoneService,data,jsonType,function(response) {
		var data=response.data[0].hallid;
		var name=response.data[0].hallname;
		$("#yctname").val(data);
		$("#yct").val(name);
	});
	$("#ffgz").ctl_select({
		id : "ffgz_sel",
		listboxwidth : 0,
		width : 115,
		listboxmaxheight : 300,
		dialogId : 'addSessnZone_div',
		columns : 1,
		data : {
			'分区座位包含单、双号交叉排列' : '分区座位包含单、双号交叉排列',
			'分区座位仅有单号排列' : '分区座位仅有单号排列',
			'分区座位仅有双号排列' : '分区座位仅有双号排列'
		},
	});

	// 保存
	$("#qd").click(
			function() {
				var fqmc = $("#fqmc").val();// 分区名称
				var fqgz = $("#ffgz_sel").val();// 分区规则
				var zshs = $("#zshs").val();// 座位行数
				var zwls = $("#zsls").val();// 座位列数
				var sm = $("#sm").val();// 说明
				var yct = $("#yctname").val();// 演出厅
				var wz=$("#wz").val();
				var reg = new RegExp("^[0-9]*$");
				if ($.trim(fqmc) == "") {
					ctl_showMsg("分区名称不能为空");
					return;
				}
				if ($.trim(zshs) == "") {
					ctl_showMsg("座位行数不能为空");
					return;
				}

				if ($.trim(zshs) != "") {
					if (!reg.test(zshs)) {
						ctl_showMsg("座位行数只能为数字");
						return;
					}
				}
				if ($.trim(zwls) == "") {
					ctl_showMsg("座位列数不能为空");
					return;
				}
				if ($.trim(zwls) != "") {
					if (!reg.test(zwls)) {
						ctl_showMsg("座位列数只能为数字");
						return;
					}
				}
				if($.trim(sessionsid)==''){
					ctl_showMsg("场次不能为空");
					return;
				}
				if($.trim(wz)==''){
					ctl_showMsg("位置不能为空");
					return;
				}
				var data = {
					fqmc : fqmc,
					sessionsid : sessionsid,
					fqgz : fqgz,
					yct : yct,
					zwls : zwls,
					zshs : zshs,
					sm : sm,
					wz:wz,
					operType : 'addFq'
				};
				publicAjaxRequest(indexSessnZoneService, data, jsonType,function(response) {
							var rdata = response.data;
							if ("success" == rdata) {
								ctl_showMsg("添加成功!");
								dlg.close();
								subzoneFunc(fqmc);// 通过分区名称来判断，是否是新增的分区
							} else if ("fail" == rdata) {
								ctl_showMsg("添加失败!");
							} else {
								ctl_showMsg(rdata);
							}
						});
			});
}

// 修改分区--
function xgClick(sessnzoneid) {
	var dlg = ctl_dialogDivClose('', {
		title : '修改分区',
		content : 'updateSessnZone_div',
		lock : true,
		min : false,
		max : false,
		drag : false,
		resize : false
	}, [ 'qx' ]);
	var data={sessionsid:sessionsid,operType:'queryyct'};
	publicAjaxRequest(indexSessnZoneService,data,jsonType,function(response) {
		var data=response.data[0].hallname;
		$("#yctname").val(data);			
	});

	// 查询赋值
	var data = {
		sessnzoneid : sessnzoneid,
		sessionsid : sessionsid,
		operType : 'fqindex'
	};
	publicAjaxRequest(indexSessnZoneService, data, jsonType, function(
			response) {
		var data = response.data[0];
		var zonename = data.zonename;
		var hallname = data.hallname;		
		var rownum = data.rownum;
		var colnum = data.colnum;
		var remark = data.des;
		var sessnzoneid = data.sessnzoneid;
		var sessionsid = data.sessionsid;
		var wz=data.addr;
		$("#fqmc").val(zonename);
		$("#yctname").val(hallname);// 演出听
		$("#zshs").val(rownum);// 座位行数
		$("#zsls").val(colnum);
		$("#sm").val(remark);// 说明
		$("#wz").val(wz);
		
		// 保存
		$("#qd").click(
				function() {
					var fqmc = $("#fqmc").val();// 分区名称
					var zshs = $("#zshs").val();// 座位行数
					var zsls = $("#zsls").val();// 座位列数
					var yct = $("#yct").val();// 演出厅
					var sm=$("#sm").val();
					var wz=$("#wz").val();//位置
					var data = {
						fqmc : fqmc,
						zshs : zshs,
						zsls : zsls,
						sessionsid : sessionsid,
						sessnzoneid : sessnzoneid,
						yct : yct,
						sm:sm,
						wz:wz,
						operType : 'update'
					};
					publicAjaxRequest(indexSessnZoneService, data,
							jsonType, function(response) {
								var rdata = response.data;
								if ("success" == rdata) {
									ctl_showMsg("修改成功!");
									dlg.close();
									fq(fqmc);//通过分区名称来判断，是否是新增的分区
								} else if ("fail" == rdata) {
									ctl_showMsg("修改失败!");
								} else {
									ctl_showMsg(rdata);
								}
							});
				});
	});
}
