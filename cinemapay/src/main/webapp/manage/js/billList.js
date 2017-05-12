var page = 1;
var pagesize = 10;
var pagingsize = 3;
var status = ""; //账单状态 -1表示未提交    0表示未核对    1表示待支付   2表示已支付
var online = -1; //表示为选择线上还是线下(-1表示没有选择渠道)
var beginTime = '';
var endTime = '';
var theatertype = localStorage.getItem("theatertype"); //1表示易得票 3表示即影投 
$(document).ready(function() {
	//如果是影投或者易得票，则显示未提交按钮。
	if(theatertype == 1 || theatertype == 3) {
		$("span[class='init']").show();
	}
	
	$(".allOrder").on("click", function(){ window.location.href = "billList.html"; });
	$(".init").on("click", function(){ window.location.href = "billList.html?status=-1"; });
	$(".noSettle").on("click", function(){ window.location.href = "billList.html?status=0"; });
	$(".waitPay").on("click", function(){ window.location.href = "billList.html?status=1"; });
	$(".paysuccess").on("click", function(){ window.location.href = "billList.html?status=2"; });
	
	//搜索影院点击事件
	$("#theatername_search_icon").on("click", function(){
		if(online == 0) { //0表示线下，1表示线上
			theaterList($("#theatername_search").val());
		}
	});
	
	//只有影投和影投业务人员/易得票才可以过滤筛选账单
	if(theatertype == 1 || theatertype == 3) {$("div[class='filter']").show();}
	
	//添加时间点击事件
	$(".main-box .filter .time .rangetime .drp-popup").on("click", function(){
		if(beginTime != $(".drp-calendar-date").eq(0).text() || endTime != $(".drp-calendar-date").eq(1).text()){
			beginTime = $(".drp-calendar-date").eq(0).text() + " 00:00:00";
			endTime = $(".drp-calendar-date").eq(1).text() + " 23:59:59";
		}
	});
	
	//线上线下订单添加点击事件
	$(".online").on("click", function(){
		
		online = parseInt($(this).attr("online"));
		//选择线上线下时，把影院ID置为空，重新选择；	
		$("button #theatername").html("请选择影院");
		$("#theatername").removeAttr("theaterid");  
		
		if(online == 1) {	  		//线上消费
			$(".theater_list_filter .list-unstyled").remove();
			var theaterHtml  = '<ul class="list-unstyled">';
				theaterHtml += 		'<li class="filter-item items" theaterid="1">所有影院</li>';
				theaterHtml += '</ul>';
			$(".theater_list_filter").html(theaterHtml);
			
			//添加点击事件
			$(".theater_list_filter li").on("click", function(){
				$(this).parents(".selectpicker").removeClass("open");
				$("#theatername").attr("theaterid", $(this).attr("theaterid"));
				$("#theatername").text($(this).text());
			});
		}else if(online == 0) {		//线下消费
			theaterList(null);
		}
		
	});
	
	//获取账单status
	var href = window.location.href;
	if(href.lastIndexOf("=") != -1) {
		status = href.substring(href.lastIndexOf("=") + 1);
		if(status == -1) {
			$(".data_box .operator span").eq(1).addClass("cur");
		}else if(status == 0) {
			$(".data_box .operator span").eq(2).addClass("cur");
		}else if(status == 1) {
			$(".data_box .operator span").eq(3).addClass("cur");
		}else if(status == 2) {
			$(".data_box .operator span").eq(4).addClass("cur");
		}
	}else {
		if(status == '' || status == null || typeof(status) == "undefined") {
			$(".data_box .operator span").eq(0).addClass("cur");
		}
	}
	
	
	loadData();
});



/**
 * 加载页面数据
 */
function loadData(side, param) {
	page = pageUpDown(side);
	if(param == null) {
		var param = {};
		param.isCombiningQuery = false; //不是进行条件组合查询
	}else {
		param.isCombiningQuery = true;	//进行条件组合查询
	}
	param.page = page;
	param.pagesize = pagesize;
	param.status = status;
	param.roletype = localStorage.getItem("roletype"); 
	param.theaternum = localStorage.getItem("theaternum");
	ajaxRequest("settle/getBillList", "POST", true, param,
			function(data) {
				var result = data.result;
				switch(result) {
					case 1000:
						echoData(data);
						break;
					default:
						$("table tr:not(.title)").remove();//清空表格中的数据
						errorTip("错误提示",data.msg);
						break;
				}
			},
			null,
			loading(), 
			loadover()
	);
}

/**
 * 填充页面数据
 * @param data
 */
function echoData(data) {
	var total = data.total;
	var data = data.data;
	//清空表格
	$("table tr:not(.title)").remove();
	$("#billTotal").html(total);
	
	for(var i = 0; i < data.length; i ++) {
		//消费渠道
		var consume_channel = '';
			if(data[i].type == "0") {
				consume_channel = "线下消费";
			} else if(data[i].type == "1"){
				consume_channel = "线上消费";
			}
		//账单状态
		var bill_status = '';
			if(data[i].status == "-1") {
				bill_status = "未提交";
			}else if(data[i].status == "0") {
				bill_status = "未核对";
			}else if(data[i].status == "1") {
				bill_status = "待支付";
			}else if(data[i].status == "2") {
				bill_status = "已支付";
			}
		//账单可用状态(正常或作废)
		var sign = (data[i].sign == 1)?"<span style='color:red;'>作废</span>":"<span>正常</span>";
		
		//上传附件所需参数
		var file_Param = {};
		file_Param.statementid = data[i].statementid;
		file_Param.theatertype = data[i].theatertype;
		var bill_content  = "<tr>";
			bill_content +=		 "<td>"+ data[i].statementid +"</td>";
			bill_content +=		 "<td>"+ data[i].theatername +"</td>";
			bill_content +=		 "<td>"+ consume_channel +"</td>";
			bill_content +=		 "<td>"+ (parseFloat(data[i].amount) + parseFloat(data[i].floatamount)).toFixed(2) +"</td>";
			bill_content +=		 "<td>"+ data[i].starttime +"</td>";
			bill_content +=		 "<td>"+ data[i].endtime +"</td>";
			bill_content +=		 "<td>"+ data[i].createtime +"</td>";
			bill_content +=		 "<td>"+ bill_status +"</td>";
			bill_content +=		 "<td id='downloadRes' style='display:none;'><span class='file' onclick='downloadRes(" + JSON.stringify(data[i].attachfileurl) + ");'>"+ data[i].filename +"</span></td>";
			bill_content +=		 "<td id='downloadRes' style='display:none;'>"+ data[i].fileuploadtime +"</td>";
			bill_content +=		 "<td>"+ sign +"</td>";
			bill_content +=		 "<td>";
			bill_content +=		     "<button class='bill_soldout' onclick='showDetail("+ data[i].statementid +")'>查看详细</button>";
			bill_content +=		 	 "<button class='bill_soldout uploadAttachFile' onclick='uploadAttachFile("+ JSON.stringify(file_Param) +")' style='display:none;'>上传附件 </button>";
			bill_content +=		     "<button class='bill_soldout reCreateBill' onclick='reCreateBill("+ JSON.stringify(data[i]) +")' style='display:none;'>重新生成 </button>";
			bill_content +=		 "</td>";
			bill_content +=	"</tr>";
			
		$("table").append(bill_content);
		
		//如果该账单已过期，则只能查看详细，不能重新生成和上传附件
		if(data[i].sign == "1") {
			$("table tr:last td button:not(:first)").remove();
		}
	}
	
	//权限管理
	var menu = localStorage.getItem("menuinfo");
	var menuinfo = JSON.parse(menu);
	if(menuinfo != null){
		for(var i=0;i<menuinfo.length;i++){
			var requesturl = menuinfo[i].requesturl;
			if(requesturl == "manager/settleManage.html"){
				var show = menuinfo[i].show;
				if(show != null){
					for(var j=0;j<show.length;j++){
						var label = show[j].requesturl;
						$("button."+label).show();  //上传附件/重新生成账单
						$("tr #"+label).show();   //下载附件
					}
				}
				break;
			}
		}
	}
	
	var totalpage = parseInt(total % pagesize == 0 ? total / pagesize : total / pagesize + 1);
	//分页
	var pagingstr = loadPaging(totalpage, page, pagingsize, "loadData");
	$(".data-tab-ul").html(pagingstr);
}

/**
 * 跳转到订单详细页面
 * @param sid
 */
function showDetail(sid) {
	window.location.href = 'billDetailInfo.html?sid=' + sid;
}


//查询影院列表
function theaterList(theaterFilter ){
	var param = {};
	if( theaterFilter != null && theaterFilter != "" ){
		param.filter = theaterFilter;
	}
	ajaxRequest("theater/getTheaterList", "GET", true, param, 
			function(data) {
			var result = data.result;
			switch (result) {
				case 1000:
					var dataArr = [];
					var theaterList = data.data;
					var theaterHtml = '';
					if(theaterList != null && theaterList.length > 0){
						theaterHtml += '<ul class="list-unstyled">';
						for(var i=0; i<theaterList.length; i++){
							theaterHtml += '<li class="filter-item items ellipsis" title="'+ theaterList[i].theatername +'" theaterid="'+ theaterList[i].theaterid +'">'+ theaterList[i].theatername +'</li>';
						}
						theaterHtml += '</ul>';
					}else{
						theaterHtml += '<div class="no-search-results">';
						theaterHtml += '<div class="alert alert-warning" role="alert"><i class="fa fa-warning margin-right-sm"></i>No entry for <strong>"<span></span>"</strong> was found.</div>';
						theaterHtml += '</div>';
					}
					$(".theater_list_filter").empty();
					$(".theater_list_filter").html(theaterHtml);
					
					$(".theater_list_filter li").on("click", function(){
						$(this).parents(".selectpicker").removeClass("open");
						$("#theatername").attr("theaterid", $(this).attr("theaterid"));
						$("#theatername").text($(this).text());
					});
					break;
				default : errorTip( "提示", "查询影院错误" ); break;
			}
		},
		null,
		loading(), 
		loadover()
	);
}

/**
 * 条件组合查询账单
 */
function getData() {
	var param = {}; //条件组合查询时条件对象
	if(online == -1) { //表示为选择线上还是线下
		alert("请选择消费渠道");
		return;
	}
	if(typeof($("span[id='theatername']").attr("theaterid")) == "undefined") {
		alert("请选择影院");
		return;
	}
	if(beginTime == '' || endTime == '') {
		alert("请选择日期");
		return;
	}
	param.online = online;
	param.theaterid = $("span[id='theatername']").attr("theaterid");
	param.beginTime = beginTime;
	param.endTime = endTime;
	
	loadData(null, param);
	
}

/**
 * ajax异步上传附件
 */
function uploadAttachFile(file_Param) {
	if(file_Param.theatertype == 2) { //线下订单
		if(theatertype != 2) { //只有影城及影城业务人员可以上传附件
			errorTip("错误提示", "非影城工作人员");
			return;
		}
	}else if(file_Param.theatertype == 1) { //线上订单
		if(theatertype != 1) { //只有易得票可以上传附件
			errorTip("错误提示", "非易得票工作人员");
			return;
		}
	}
	
	var msgHtml  = '<div class="mask" style="display:block;">';
		msgHtml += '<div class="showMess" style="display:block;">';
		msgHtml += '<p class="tip">上传附件</p>';
		msgHtml += '<input type="file" name="uploadfile" id="uploadfile"/>';
		msgHtml += '<p class="btn-p"><button class="sure">确定</button><button class="deny">取消</button></p>';
		msgHtml += '</div>';
		msgHtml += '</div>';
	
	$("body").append(msgHtml);
	
	//给确认按钮添加点击事件
	$(".btn-p .sure").on("click", function(){
		var file_upload = $(".mask input").val();
		if(file_upload == '') {
			alert("请选择您要上传的文件");
			return;
		}else {
			var ext = file_upload.substring(file_upload.lastIndexOf(".") + 1).toUpperCase();
			console.log(ext);
			if(ext!="DOC" && ext!="DOCX" && ext!="PDF" && ext!="DOT" && ext!="DOTX" && ext!="WPS" && ext!="WPT" && ext!="XLS" && ext!="XLSX" && ext!="XLSM" && ext!="XLT") {
				alert("上传的附件仅限于Excel,Word以及Pdf格式！");
				return;
			}
		}
		$.ajaxFileUpload({
                url: service_url + 'rest/file/uploadAttachFile?statementid=' + file_Param.statementid, //用于文件上传的服务器端请求地址
                secureuri: false, //是否需要安全协议，一般设置为false
                fileElementId: 'uploadfile', //文件上传域的ID
                dataType: 'json', //返回值类型 一般设置为json
                success: function (data, status)  //服务器成功响应处理函数
                {
                	$(".mask").remove();
                	showDetail(file_Param.statementid);
                },
                error: function (data, status, e)//服务器响应失败处理函数
                {
                    alert(e);
                }
		});


	});
	
	$(".btn-p .deny").on("click", function(){ $(".mask").remove(); });
}



/**
 * 下载附件
 * @param path
 */
function downloadRes(path) {
	window.location.href = service_url +  "rest/file/downloadRes?path=" + path;
}


/**
 * 重新生成对账单
 * @param param
 */
function reCreateBill(params) {
	if(theatertype != 3) {
		errorTip("错误提示", "非影投工作人员");
		return;
	}
	
	var paramsOBJ = {};
	paramsOBJ.theatername = params.theatername;
	paramsOBJ.cinemaid = params.cinemaid;
	paramsOBJ.amount = params.amount;
	paramsOBJ.channel = params.type;
	paramsOBJ.beginTime = params.starttime;
	paramsOBJ.endTime = params.endtime;
	paramsOBJ.statementid = params.statementid;
			
	var msgHtml  = '<div class="mask" style="display:block;">';
		msgHtml += '<div class="showMess" style="display:block;">';
		msgHtml += '<p class="tip">确认操作</p>';
		msgHtml += '<p class="message">您正在执行重新生成<span style="color:blue;">['+ paramsOBJ.theatername +']</span></p>';
		msgHtml += '<p class="message">['+paramsOBJ.beginTime.substring(0,10) +'] 至 ['+  paramsOBJ.endTime.substring(0,10)+']</p>';
		msgHtml += '<p class="message">账单操作</p>';
		msgHtml += '<p class="btn-p"><button class="sure">确定</button><button class="deny">取消</button></p>';
		msgHtml += '</div>';
		msgHtml += '</div>';
	$("body").append(msgHtml);
	
	$(".sure").on("click", function(){
		$(".mask").remove();
		

		var msgHtml  = '<div class="mask alias" style="display:block;">';
			msgHtml += '<div class="showMess" style="display:block;">';
			msgHtml += '<p class="tip">调整金额<button type="button" class="close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button></p>';
			msgHtml += '<p class="message"><span type="">请输入调整金额:</span><input type="text" value="0"></p>';
			msgHtml += '<p class="ps_tip"><span>提示：可以为负数，负数则与影院结算金额减少相应数值</span></p><br/>'
			msgHtml += '<p class="remarks"><span type="">请输入调整备注:</span><textarea rows="4" cols="30"/></p>';
			msgHtml += '<p class="btn-p"><button class="sure">确定</button></p>';
			msgHtml += '</div>';
			msgHtml += '</div>';
		
		$("body").append(msgHtml);
		//给取消按钮添加点击事件
		$(".mask .tip button").bind("click", function() {
			$(".mask").remove();
			return;
		});

		//给确认按钮添加点击事件
		$(".btn-p .sure").click(function() {
			if($(".message input").val() == null || $(".remarks textarea").val() == null
					|| $(".message input").val() == '' || $(".remarks textarea").val() == '') {
				alert("请输入完整信息");
				return;
			}
			var reg = /^-*\d+\.*\d*$/;
			if(!reg.test($(".message input").val())) {
				alert("调整金额请输入数字(包括小数)");
				return;
			}
			
			paramsOBJ.floatamount = parseFloat($(".message input").val()).toFixed(2);
			paramsOBJ.remarks = $(".remarks textarea").val();

			$(".mask").remove();

			//重新生成对账单
			ajaxRequest("settle/ReCreateBill", "POST", true, paramsOBJ,
					function(data) {
						var result = parseInt(data.result);
						var sid = parseInt(data.sid); //生成对账单的主键
						switch(result) {
							case 1000:
								window.location.href = "billDetailInfo.html?sid=" + sid;
								break; 
							default:
								errorTip("请求错误", data.msg);
								break;
						}
				},
					null,
					loading(), 
					loadover())
		});
	});
	$(".deny").on("click", function(){ $(".mask").remove(); });
}









