$(function() {
	//回车事件绑定
	$('#cardCode').focus();
	$('#cardCode').bind('keyup', function(event) {
		if (event.keyCode == "13") {
			if( $('#cardCode').val() != "" ){
				$('#query').click();
			}
		}
	});
	
	var header_nav = '',
    	url_status = window.location.href.split('status=');
	status = url_status[1];
	
	if(status == '-1'){
		online = false;
		$('.content-title span').html('您当前位置：首页/线下订单');
		myChargeOff();
	} else if(status == '1'){
		online = true;
		$('.content-title span').html('您当前位置：首页/线上订单');
		myChargeOff();
	}else{
		$('.content-title span').html('您当前位置：首页/卖品核销');
	}
	
	
	$('.chargeOff').on('click', function(event) {
		operateTip("提示", "确认执行核销操作？", function(){chargeOff();});
	});
});


/**
 * 查询商品信息
 */
function orderMess(){
	var param = {};
	param.cardCode = $("#cardCode").val();
	
	if($("#cardCode").val() == "" 
		|| ($("#cardCode").val().length != 12 && $("#cardCode").val().length != 16)){
		errorTip( "参数错误", "请输入正确核销码！" );
		return;
	}
	
	ajaxRequest("order/orderMess", "GET", true, param, 
		function(data){
			var result = data.result;
			switch (result) {
				case 1000:
					var order = data.data;
					if(order != null){
						var str = '';
						var status = 0;
						if(param.cardCode.length == 16){
							var productname = order.productname;
							status = order.status;
							if(order.productname.length > 10){
								productname = productname.substr(0, 10) + "<br/>" + productname.substr(10);
							}
							str += '<tr>';
							str += '<td>线下购买</td>';
							str += '<td>'+ productname + '</td>';
							str += '<td>'+ order.quantity +'</td>';
							str += '<td>'+ order.price.toFixed(2) +'</td>';
							str += '<td>'+ order.ordernumber.substr(0, 13) + '<br/>' + order.ordernumber.substr(13, 13) +'</td>';
							str += '<td>'+ order.createtime +'</td>';
							str += '<td>'+ order.amount.toFixed(2) +'</td>';
							str += '<td>'+ getOrderStatusText(order.status) +'</td>';
							str += '</tr>';
						}else{
							status = order[0].status;
							for(var i=0; i<order.length; i++){
								var productname = order[i].productname;
								if(order[i].productname.length > 10){
									productname = productname.substr(0, 10) + "<br/>" + productname.substr(10);
								}
								str += '<tr>';
								str += '<td>网售</td>';
								str += '<td>'+ productname + '</td>';
								str += '<td>'+ order[i].quantity +'</td>';
								str += '<td>'+ order[i].price.toFixed(2) +'</td>';
								str += '<td>'+ order[i].ordernumber.substr(0, 13) + ( order[i].ordernumber.length > 13 ? ('<br/>' + order[i].ordernumber.substr(13, order[i].ordernumber.length)) : "") +'</td>';
								str += '<td>'+ order[i].createtime +'</td>';
								str += '<td>'+ order[i].amount.toFixed(2) +'</td>';
								str += '<td>'+ getOrderStatusText(order[i].status) +'</td>';
								str += '</tr>';
							}
						}
						$(".data-tab tr").not(":first").remove();
						$(".data-tab table").append(str);
						$(".content-data .checkcard .productMess").show();
						
						if(status != 2 && status != 4){
							$(".chargeOff").hide();						
						}else{
							$(".chargeOff").show();		
							$('.chargeOff').focus();
						}
					}else{
						errorTip( "错误提示", "信息不存在，请确认后再试！" );
					}
					break;
				default : errorTip( "错误提示", data.msg ); break;
			}
		}, null, function(){
			var dataHeadHtml = '<tr><th class="w150">来源</th><th class="w250">商品名称</th><th class="w100">数量</th><th class="w100">价格</th><th class="w250">订单号</th><th class="w200">订单时间</th><th class="w100">总计</th><th class="w150">订单状态</th></tr>';
			$(".data-tab table").html(dataHeadHtml);
			$(".headLine").text("商品信息");
			$(".data-tab-ul").html("");
		}
	);
}


/**
 * 核销订单
 */
function chargeOff(){
	var param = {};
	param.cardCode = $("#cardCode").val();
	
	ajaxRequest("order/chargeOff", "GET", true, param, 
		function(data){
			var result = data.result;
			switch (result) {
				case 1000:
					errorTip("操作成功","核销成功", function(){
						window.location.reload();						
					});
					break;
				default : errorTip("操作失败", data.msg); break;
			}
		}
	);
}


/**
 * 我的核销订单
 */
var page = 1;
var pagesize = 5;
var pagingsize = 3;
var online = false;
function myChargeOff(side){
	page = pageUpDown(side);
	
	var param = {};
	param.page = page;
	param.pagesize = pagesize;
	if(online == true){
		param.online = "online";
	}
	
	ajaxRequest("order/myChargeOff", "GET", true, param, 
		function(data){
			var result = data.result;
			switch (result) {
				case 1000:
					var total = data.total;
				
					var orderList = data.data;
					if(total > 0 && orderList != null && orderList.length > 0){
						var totalpage = parseInt(total % pagesize == 0 ? total / pagesize : total / pagesize + 1);
						var str = '';
						for(var i=0; i<orderList.length; i++){
							var order = orderList[i];
							str += '<tr>';
							var productname = order.productname;
							if(order.productname.length > 10){
								productname = productname.substr(0, 10) + "<br/>" + productname.substr(10);
							}
							str += '<td>'+ productname + '</td>';
							str += '<td>'+ order.quantity +'</td>';
							str += '<td>'+ order.price.toFixed(2) +'</td>';
							str += '<td>'+ order.ordernumber.substr(0, 13) + '<br/>' + order.ordernumber.substr(13, 13) +'</td>';
							str += '<td>'+ (order.modifytime != null ? (order.modifytime.substr(0, 10) + '<br/>' + order.modifytime.substr(10)) : "") +'</td>';
							str += '<td>'+ order.amount.toFixed(2) +'</td>';
							str += '<td>'+ getOrderStatusText(order.status) +'</td>';
							str += '</tr>';
						}
						$(".data-tab tr").not(":first").remove();
						$(".data-tab table").append(str);
						$(".content-data .checkcard .productMess").show();
						$(".chargeOff").hide();	
						
						// 分页
						var pagingstr = loadPaging(totalpage, page, pagingsize, "myChargeOff");
						$(".data-tab-ul").html(pagingstr);
					}else{
						errorTip( "提示", "暂无已核销订单！" );
					}
					break;
				default : errorTip( "错误提示", data.msg ); break;
			}
		}, null, function(){
			var dataHeadHtml = '<tr><th class="w250">商品名称</th><th class="w100">数量</th><th class="w100">价格</th><th class="w250">订单号</th><th class="w200">核销时间</th><th class="w100">总计</th><th class="w150">订单状态</th></tr>';
			$(".data-tab table").html(dataHeadHtml);
			$(".headLine").text("我的核销订单记录");
			$(".data-tab table").addClass("charge_off_order");
			$(".data-tab-ul").html("");
		}
	);
}