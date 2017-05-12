var s_time;
var e_time;

var card_type = null;
var card_status = null;
var status_money1 = null;
var tab_type;

$(function(){
	s_time = addDate(new Date(), -30).format("yyyy-MM-dd");
	e_time = new Date().format("yyyy-MM-dd");
	
	var header_nav = '',
	status = getPramStr("status");
	tab_type = status;
	
	switch(status){
		case '1':
			header_nav = '卡劵信息';
			loadData(1,null);
			break;
		case '2':
			if(getPramStr("cardnumber") != null){ $("#inputSerch").val(getPramStr("cardnumber")); }
			header_nav = '单卡信息';
			bb(1,null);
			break;
		case '3':
			header_nav = '消费记录';
			if(getPramStr("cardnumber") != null){ $("#inputSerch").val(getPramStr("cardnumber")); }
			cc(1,null);
			break;
		default:
	}
	
	$('.content-title span').html('您当前位置：首页/' + header_nav);
	
	$(".main-box .filter .time .rangetime .drp-popup").on("click", function(){
		if(s_time != $(".drp-calendar-date").eq(0).text() || e_time != $(".drp-calendar-date").eq(1).text()){
			s_time = $(".drp-calendar-date").eq(0).text();
			e_time = $(".drp-calendar-date").eq(1).text();
		//	loadData(1);
		}
	});
	
	// 选择卡类型
	$(".cardType").on("click", function(){
		card_type = parseInt($(this).attr("card_type"));
		console.log(card_type);
		loadData(1);
	});
	
	// 选择状态
	$(".cardState").on("click", function(){
		card_status = parseInt($(this).attr("card_status"));
		console.log(card_status);
		loadData(1);
	});
	
	//点击下拉列表加载批次数据
	$("#batch_btn").on("click",function(){  $("#batchname_search").val(""); batchnameList(); });
	
	if(localStorage.getItem("roletype") == 2){
		$(".cinemaname_condition").hide();
	}else{
		//点击下拉列表加载影院数据
		$("#cinema_btn").on("click",function(){ $("#cinemaname_search").val(""); cinemanameList(); });
		//点击下拉列表里面的放大镜搜索
		$("#batchname_search_icon").on("click", function(){ batchnameList($("#batchname_search").val()); });
		//点击下拉列表里面的放大镜搜索
		$("#cinemaname_search_icon").on("click", function(){ inemanameList($("#cinemaname_search").val()); });
	}
});


/**
 * 查询卡劵信息
 */
var page = 1;
var pagesize = 10;
var pagingsize = 3;
var status = 0;
function loadData(side, complete_fn){
	$(".content-data1").hide();
	$(".content-data2").hide();
	
	page = pageUpDown(side);
	var param = {};
	param.page = page;
	param.pagesize = pagesize;
	param.filter = $(".filter_input").val();
	param.s_time = s_time;
	param.e_time = e_time;
	
	$("#inputSerch").attr("placeholder","卡名、备注、或操作员名 精确查询");
	
	if(card_type == 0){param.cardtype = 0;}
	else if(card_type == 1){param.cardtype = 1;}
	else{param.cardtype = null;}

	if(card_status == 0){param.card_status = 0;}
	else if(card_status == 1){param.card_status = 1;}
	else{param.card_status = null;}
	
	ajaxRequest("manageData/findBatchByName", "GET", true, param,
		function(data) {
			var result = data.result;
			switch (result) {
				case 1000:
					var dataArr = [];
					dataList = data.data;
					var total = data.total;

					$("#orderTotal").text(total == null ? "0" : total);
					
					if(total > 0 && dataList != null && dataList.length > 0){
						var totalpage = parseInt(total % pagesize == 0 ? total / pagesize : total / pagesize + 1);
						for(var i=0; i<dataList.length; i++){
							var batchInfo = dataList[i];
							var dataJson = {};
							dataJson.cardconfid = batchInfo.cardconfid + "";
							dataJson.cardname =  "<a href='javascript:void(0);' onclick='getBatchDetail(1, "+ batchInfo.cardconfid +", "+ batchInfo.cardtype +");'>" + batchInfo.cardname + "</a>";
     						if(batchInfo.cardtype==0){dataJson.cardtype="次卡"+ ""}else{dataJson.cardtype="储值卡"+ ""} ;
     						dataJson.value = (batchInfo.cardtype==1) ? ("￥" + batchInfo.value) : (batchInfo.count + "次  × ￥" + batchInfo.value);
							dataJson.endtime = batchInfo.endtime + "";
							dataJson.quantity = batchInfo.quantity + "";
							dataJson.note = batchInfo.note + "";							
							if(batchInfo.status==0){dataJson.status="未生成卡号"+ ""}else{dataJson.status="已生成卡号"+ ""} ;
							dataJson.createtime=batchInfo.createtime + "";
							dataJson.operatorid=batchInfo.username + "";
							dataJson.modifytime=batchInfo.modifytime + "";
							dataArr.push(dataJson);
						}
					}
					
					$(".data-tab tr").not(":first").remove();
					pushJsonData(".data-tab table", dataArr);
					
					var pagingstr = loadPaging(totalpage, page, pagingsize, "loadData"); // 分页
					$(".data-tab-ul").html(pagingstr);
					break;
				default : errorTip("错误提示",data.msg); break;
			}
		}, null,
		function(){ 
			loading();
			var table_head = '<tr><th>批次编号</th><th>卡名</th><th>卡类型</th><th>卡值</th><th>失效时间</th><th>发行数</th><th>备注</th><th>状态</th><th>创建时间</th><th>操作员</th><th>修改时间</th></tr>';
			$(".data-tab table").html(table_head);
		}, 
		function(){loadover();}
	);
	$(".headLine").html("数据列表");
}

/**
 * 获取批次详情
 */
var cardconfid, cardtype;
function getBatchDetail(page, id, type){
	if(id != null && type != null){
		cardconfid = id;
		cardtype = type;
	}
	ajaxRequest("manageData/getCardInfo", "GET", true, {cardconfid:this.cardconfid, pagesize:5, page:page},
		function(data) {
			var result = data.result;
			switch (result) {
				case 1000: 
					if(data.data != null && data.data.cinema != null && data.data.cinema.total > 0){
//						var card = data.data.cinema.card;
//						var cardtype = card.cardtype;
//						var cardHtml = "<lable>卡名：</lable>" + card.cardname;
//						cardHtml += "<lable>卡号：</lable>" + card.cardnumber;
//						cardHtml += "<lable class='ml_2r'>卡类型：</lable>" + (cardtype == 0 ? "次卡" : "储值卡");
//						if(cardtype == 0){
//							cardHtml += "<lable class='ml_2r'>可用次数：</lable>" + card.restcount;
//						}else{
//							cardHtml += "<lable class='ml_2r'>剩余点数：</lable>" + card.restvalue.toFixed(2);
//						}
//						cardHtml += "<lable class='ml_2r'>开卡时间：</lable>" + card.createtime;
//						cardHtml += "<lable class='ml_2r'>变更时间：</lable>" + card.modifytime;
//						$(".cardDetail").html(cardHtml);
//						$(".content-data2").show();
						
						// 可用影院列表
						var cinema = data.data.cinema;
						var total = cinema.total;
						var totalpage = parseInt(total % 5 == 0 ? total / 5 : total / 5 + 1);
						
						$(".mask").remove();
						var msgHtml = '<div class="mask" style="display:block;">';
						msgHtml += '<div class="showMess batchdetail" style="display:block;">';
						msgHtml += '<p class="tip">批次详情<span class="close"></span></p>';
						msgHtml += '<table class="dataTable">';
						msgHtml += '<tr><th>影院名称</th><th>消费类型</th><th>'+ (cardtype == 0 ? "次卡结算价" : "储值卡结算比值") +'</th</tr>';
						
						for(var i=0; i<cinema.data.length; i++){
							var cinemaData = cinema.data[i];
//							alert(JSON.stringify(cinemaData));
							msgHtml += "<tr>";
							msgHtml +=   "<td>"+ cinemaData.theatername +"</td>"
							if (cinemaData.consumetype == 1) { msgHtml += "<td>线上</td>"; } 
							else if (cinemaData.consumetype == 2) { msgHtml += "<td>线下</td>"; } 
							else { msgHtml += "<td>线上 + 线下</td>"; }
							if (cardtype == 0) {
								msgHtml += "<td>" + cinemaData.settlevalue.toFixed(2) + "</td>";
							} else {
								msgHtml += "<td>" + cinemaData.settlerate.toFixed(2) + "</td>"
							}
							msgHtml += "</tr>";
						}
						
						msgHtml += '</table>';
						msgHtml += '<div class="page"><ul class="cinema-tab"></ul></div>';
						msgHtml += '</div>';
						msgHtml += '</div>';
						$("body").append(msgHtml);	
						
						var pagingstr1 = loadPaging(totalpage, page, pagingsize, "getBatchDetail");
						$(".cinema-tab").html(pagingstr1);
						$(".batchdetail .close").on("click", function(){$(".mask").remove();});
					}else{
						errorTip("提示", "暂未生成卡号");
					}
					break;
				default : break;
			}
		}
	);
}


//这个bb函数是专门为了“查卡号”这个功能定制的入口函数
function bb(){
	$("#inputSerch").attr("placeholder","请输入单卡信息");
	if($("#inputSerch").val() != ""){
		getCardInfo(1); // 查询卡信息
	}else{
		$(".content-data").hide();
		$(".content-data1").hide();
		$(".content-data2").hide();
	}
	$(".filter").hide();
}

//这个cc函数是专门为了“查全部消费记录”这个功能定制的入口函数
function cc(side,complete_fn){
	$("#inputSerch").attr("placeholder","请输入单卡信息");
	$(".content-data1, .content-data2").hide();
	$(".content-data").show();
	
    $(".cardtype_condition, .cardstate_condition").hide();  //隐藏条件搜索卡类型
    $(".status_condition, .batchname_condition, .cinemaname_condition").show();  //显示查询所有批次
    $(".filter").show();  // 显示整个条件搜索框
//    $(".operator").hide();
    find_qb(side);
}

//这个函数用于input输入框里面的精确查询的点击事件
function clickSerchBtn(){
	if(tab_type == 1){
		loadData(1);
	}else if(tab_type == 2){
		bb(1);
	}else if(tab_type == 3){
		cc(1,null);
	}
}


/**
 * 查询卡信息
 * @param {Object} side
 */
function getCardInfo(side){
	page = pageUpDown(side);
	var param = {};
	param.page = page;
	param.pagesize = pagesize;
	param.cardnumber = $(".filter_input").val();
	
	ajaxRequest("manageData/getCardInfo", "GET", true, param,
		function(data) {
			var result = data.result;
			switch (result) {
				case 1000:
					// 卡详情
					if(data.data != null){
						if(data.data.card != null){
							var card = data.data.card;
							var cardtype = card.cardtype;
							var cardHtml = "<lable>卡名：</lable>" + card.cardname;
							cardHtml += "<lable>卡号：</lable>" + card.cardnumber;
							cardHtml += "<lable class='ml_2r'>卡类型：</lable>" + (cardtype == 0 ? "次卡" : "储值卡");
							if(cardtype == 0){
								cardHtml += "<lable class='ml_2r'>可用次数：</lable>" + card.restcount;
							}else{
								cardHtml += "<lable class='ml_2r'>剩余点数：</lable>" + card.restvalue.toFixed(2);
							}
							cardHtml += "<lable class='ml_2r'>开卡时间：</lable>" + card.createtime;
							cardHtml += "<lable class='ml_2r'>变更时间：</lable>" + card.modifytime;
							$(".cardDetail").html(cardHtml);
							$(".content-data2").show();
							
							// 可用影院列表
							var cinema = data.data.cinema;
							var total = cinema.total;
							var cinemaHtml = '<tr><th>影院名称</th><th>消费类型</th><th>'+ (cardtype == 0 ? "次卡结算价" : "储值卡结算比值") +'</th></tr>';
							
							if(total > 0 && cinema.data != null && cinema.data.length > 0){
								var totalpage1 = parseInt(total % pagesize == 0 ? total / pagesize : total / pagesize + 1);
								for (var i=0; i<cinema.data.length; i++) {
									var cinemaData = cinema.data[i];
									cinemaHtml += "<tr>";
									cinemaHtml +=   "<td>"+ cinemaData.theatername +"</td>"
									if (cinemaData.consumetype == 1) { cinemaHtml += "<td>线上</td>"; } 
									else if (cinemaData.consumetype == 2) { cinemaHtml += "<td>线下</td>"; } 
									else { cinemaHtml += "<td>线上 + 线下</td>"; }
									
									if(cardtype == 0){ cinemaHtml +=   "<td>"+ cinemaData.settlevalue.toFixed(2) +"</td>"; }
									else{ cinemaHtml +=   "<td>"+ cinemaData.settlerate.toFixed(2) +"</td>" }
									cinemaHtml += "</tr>";
								}
							}
							$(".content-data").hide();
							$(".content-data1").show();
							$(".data-tab1 table").html(cinemaHtml);
							$("#orderTotal1").text(total == null ? "0" : total);
							
							// 分页
							var pagingstr1 = loadPaging(totalpage1, page, pagingsize, "getCardInfo");
							console.log(pagingstr1);
							$(".data-tab-ul1").html(pagingstr1);
							
							// 查询单个卡的消费记录
							$("#check_record").on("click", function(){
								window.location.href = "ManageData.html?status=3&cardnumber=" + $(".filter_input").val();
							});
						}else{
							errorTip("提示","您输入的卡号不存在");
						}
					}else{
						errorTip("提示","您输入的卡号不存在");
					}
					break;
				default : errorTip("错误提示",data.msg); break;
			}
		}, null,
		function(){loading();}, 
		function(){loadover();}
	);
	$(".headLine1").html("可用影院");
}


/**
* 消费记录查询数据
* @param side
* @param complete_fn
*/
function find_qb(side){
   // 选择状态
	$(".status_money").unbind("click");
	$(".status_money").bind("click", function(){
		status_money1 = parseInt($(this).attr("status_money1"));
		find_qb(1,null);
	});
	//选择时间范围
	$(".main-box .filter .time .rangetime .drp-popup").on("click", function(){
		if(s_time != $(".drp-calendar-date").eq(0).text() || e_time != $(".drp-calendar-date").eq(1).text()){
			s_time = $(".drp-calendar-date").eq(0).text();
			e_time = $(".drp-calendar-date").eq(1).text();
			find_qb(1,null);
		}
	});
      
	page = pageUpDown(side);
	var param = {};
	param.page = page;
	param.pagesize = pagesize;
	param.s_time = s_time;
	param.e_time = e_time;
	if(status_money1 == 0 || status_money1 == 1){
		param.status = status_money1; //0-正常,1-已退款
	}
	//给批次添加选中点击事件
	if($("#batchname").attr("batchid") != null && $("#batchname").attr("batchid") != 0){
		param.cardconfid = $("#batchname").attr("batchid");
	}
	//给批次添加选中点击事件
	if($("#cinemaname").attr("cinemaid") != null && $("#cinemaname").attr("cinemaid") != 0){
		param.cinemaid = $("#cinemaname").attr("cinemaid");
	}
	if($("#inputSerch").val() != ""){
		param.cardnumber = $("#inputSerch").val();
	}
	
	ajaxRequest("manageData/findCardRecord_qb", "GET", true, param,
		function(data) {
			var result = data.result;
			switch (result) {
				case 1000:
					var dataArr = [];
					dataList = data.data;
					var total = data.total;
					
					var valueSum = 0;
					var countSum = 0;
					var settlepriceSum = 0;

					$("#orderTotal").text(total == null ? "0" : total);
					
					if(total > 0 && dataList != null && dataList.length > 0){
						var totalpage = parseInt(total % pagesize == 0 ? total / pagesize : total / pagesize + 1);
						for(var i=0; i<dataList.length; i++){
							var batchInfo = dataList[i];
							var dataJson = {};

							dataJson.recordid = batchInfo.recordid + "";
							dataJson.cardname =  batchInfo.cardname + "";
       						dataJson.cardnumber = "<a href='ManageData.html?status=2&cardnumber="+ batchInfo.cardnumber +"'>" + batchInfo.cardnumber + "</a>";
							dataJson.theatername = batchInfo.theatername + "";
							if(batchInfo.value == undefined){dataJson.value = 0 + "";}else{dataJson.value = batchInfo.value + "";}
							if(batchInfo.count == undefined){dataJson.count = 0 + "";}else{dataJson.count = batchInfo.count + "";}
							if(batchInfo.settleprice == undefined){dataJson.settleprice = 0 + "";}else{dataJson.settleprice = batchInfo.settleprice + "";}
							if(batchInfo.status==0){dataJson.status="正常"+ ""}else{dataJson.status="已退款"+ ""} ;
							dataJson.createtime=batchInfo.createtime + "";
							dataJson.modifytime=batchInfo.modifytime + "";
							dataArr.push(dataJson);
						}
					}
					
					$(".data-tab tr").not(":first").remove();
					pushJsonData(".data-tab table", dataArr);
					
					// 分页
					var pagingstr = loadPaging(totalpage, page, pagingsize, "find_qb");
					$(".data-tab-ul").html(pagingstr);
					break;
				default : errorTip("错误提示",data.msg); break;
			}
		}, null,
		function(){ 
			loading();
			var table_head = '<tr><th>记录号</th><th>批次名</th><th>卡号</th><th>影院名称</th><th>消费金额</th><th>次卡消费次数</th><th>结算价</th><th>状态</th><th>创建时间</th><th>退款时间</th></tr>';
			$(".data-tab table").html(table_head);
		}, 
		function(){loadover();}
	);
	$(".headLine").html("消费记录");
}


/**
 * 批次列表
 */
var batchList;
function batchnameList(batchname){
	if(batchList == null || batchname != null || batchname != ""){
		var param = {};
		if( batchname !=null && batchname != "" ){
			param.cardname = batchname;
		}
		
		ajaxRequest("manageData/findAllBatch", "GET", true, param, 
			function(data) {
				var result = data.result;
				switch (result) {
					case 1000:
						if(batchname != ""){
							batchList = data.data;
						}
						batchHtml(data.data);
						break;
					default : errorTip( "提示", "查询批次错误" ); break;
				}
			}
		);
	}else{
		batchHtml();
	}
}
/**
 * 渲染批次选项
 */
function batchHtml(batchList){
	var batchHtml = '';
	if(batchList != null && batchList.length > 0){
		batchHtml += '<ul class="list-unstyled">';
		batchHtml += '<li class="filter-item items" batchid="0">所有批次</li>';
		for(var i=0; i<batchList.length; i++){
			batchHtml += '<li class="filter-item items ellipsis" title="'+ batchList[i].cardname +'" batchid="'+ batchList[i].cardconfid +'">'+ batchList[i].cardname +'</li>';
		}
		batchHtml += '</ul>';
	}else{
		batchHtml += '<div class="no-search-results">';
		batchHtml += '<div class="alert alert-warning" role="alert"><i class="fa fa-warning margin-right-sm"></i>No entry for <strong>"<span></span>"</strong> was found.</div>';
		batchHtml += '</div>';
	}
	$(".batchname_list_filter").html(batchHtml);
	
	$(".batchname_list_filter li").on("click", function(){
		$(this).parents(".selectpicker").removeClass("open");
		$("#batchname").attr("batchid", $(this).attr("batchid"));
		$("#batchname").text($(this).text());
		find_qb(1);
	});
}


/**
 * 查询影院影院列表
 */
var cinemaList;
function cinemanameList(cinemaname){
	if(cinemaList == null || cinemaname != null || cinemaname != ""){
		var param = {};
		if( cinemaname !=null && cinemaname != "" ){
			param.theatername = cinemaname;
		}
		ajaxRequest("manageData/findCinema", "GET", true, param, 
			function(data) {
				var result = data.result;
				switch (result) {
					case 1000:
						if(cinemaname != ""){
							cinemaList = data.data;
						}
						cinemaHtml(data.data);
						break;
					default : errorTip( "提示", "查询影院错误" ); break;
				}
			}
		);
	}else{
		cinemaHtml(cinemaList);
	}
}

/**
 * 渲染影院列表选项
 * @param cinemaList
 */
function cinemaHtml(cinemaList){
	var cinemaHtml = '';
	if(cinemaList != null && cinemaList.length > 0){
		if(cinemaList != null && cinemaList.length > 0){
			cinemaHtml += '<ul class="list-unstyled">';
			cinemaHtml += '<li class="filter-item items" cinemaid="0">全部影院</li>';
			for(var i=0; i<cinemaList.length; i++){
				cinemaHtml += '<li class="filter-item items ellipsis" title="'+ cinemaList[i].theatername +'" cinemaid="'+ cinemaList[i].cinemaid +'">'+ cinemaList[i].theatername +'</li>';
			}
			cinemaHtml += '</ul>';
		}else{
			cinemaHtml += '<div class="no-search-results">';
			cinemaHtml += '<div class="alert alert-warning" role="alert"><i class="fa fa-warning margin-right-sm"></i>No entry for <strong>"<span></span>"</strong> was found.</div>';
			cinemaHtml += '</div>';
		}
	}
	$(".cinemaname_list_filter").html(cinemaHtml);
	// 选择影院事件
	$(".cinemaname_list_filter li").on("click", function(){
		$(this).parents(".selectpicker").removeClass("open");
		$("#cinemaname").attr("cinemaid", $(this).attr("cinemaid"));
		$("#cinemaname").text($(this).text());
		find_qb(1);
	});
}