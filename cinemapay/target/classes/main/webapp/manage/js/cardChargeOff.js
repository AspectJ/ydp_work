$(function() {
	//回车事件绑定
	$('#cardcipher').focus();
	$('#cardcipher').bind('keyup', function(event) {
		if (event.keyCode == "13") {
			if( $('#cardcipher').val() != "" ){
				$('#query').click();
			}
		}
	});
	
	$('.chargeOff').on('click', function(event) {
		chargeOff();
	});
	
	$(".myChargeOff").on("click", function(){
		if($(this).attr("online") != null){
			online = true;
		}else{
			online = false;
		}
		myChargeOff();
	});
})


//小写转大写
function checkUpper(obj){
	var reg = /^[A-Za-z0-9]+$/;
	if(reg.test (obj.value)){
		obj.value = obj.value.toUpperCase();
	}else{
		obj.value = obj.value.substr(0, obj.value.length - 1); 
	}
	
}


/**
 * 查询卡券信息
 */
function cardMess(){
	var param = {};
	param.cardcipher = $("#cardcipher").val();
	
	if($("#cardcipher").val() == "" 
		|| ($("#cardcipher").val().length != 12 && $("#cardcipher").val().length != 16)){
		errorTip( "参数错误", "请输入正确卡券信息！" );
		return;
	}
	
	ajaxRequest("card/cardMess", "GET", true, param, 
		function(data){
			var result = data.result;
			switch (result) {
				case 1000:
					var card = data.data;
					if(card != null){
						var dataHeadHtml = '';
						var str = '';
						var cardname = card.cardname;
						var cardtype = card.cardtype;
						if(card.cardname.length > 10){
							cardname = cardname.substr(0, 10) + "<br/>" + cardname.substr(10);
						}
						str += '<tr>';
						str += '<td>'+ cardname + '</td>';
						str += '<td>'+ card.cardtype_name + '</td>';
						str += '<td>'+ card.cardnumber + '</td>';
						if(cardtype == 0){
							dataHeadHtml = '<tr><th class="w250">卡券名称</th><th class="w100">类型</th><th class="w250">卡号</th><th class="w100">总次数</th><th class="w100">剩余次数</th><th class="w100">面值</th><th class="w150">使用渠道</th><th class="w250">有效期</th><th class="w250">备注</th></tr>';
							str += '<td>'+ card.count +'</td>';
							str += '<td>'+ card.restcount +'</td>';
							str += '<td>'+ card.value +'</td>';
						}else if(cardtype == 1){
							dataHeadHtml = '<tr><th class="w250">卡券名称</th><th class="w100">类型</th><th class="w250">卡号</th><th class="w100">总点数</th><th class="w100">剩余点数</th><th class="w150">使用渠道</th><th class="w250">有效期</th><th class="w250">备注</th></tr>';
							str += '<td>'+ card.value +'</td>';
							str += '<td>'+ card.restvalue +'</td>';
						}
						str += '<td>'+ card.consumetype +'</td>';
						str += '<td>'+ card.starttime + ' 至 ' + card.endtime +'</td>';
						str += '<td>'+ card.note +'</td>';
						str += '</tr>';
						$(".data-tab tr").remove();
						$(".data-tab table").append(dataHeadHtml+str);
						$(".content-data .checkcard .productMess").show();
						
						var spend = "";
						var hidden = "<input id='cardconfid' type='hidden' value='"+card.cardconfid+"'/>" +
									 "<input id='cardtype' type='hidden' value='"+card.cardtype+"'/>" +
									 "<input id='cardid' type='hidden' value='"+card.cardid+"'/>" +
									 "<input id='cardnumber' type='hidden' value='"+card.cardnumber+"'/>";
						if(cardtype == 0 && card.restcount > 0 ){
							spend = "<input id='rest' type='hidden' value='"+card.restcount+"'/><input id='spend' maxlength='5' oninput='checkNum(this)' value='1'/>次";
							$("#xiaofei").html(hidden+spend);
							$(".chargeOff").show();		
							$('.chargeOff').focus();
						}else if(cardtype == 1 && card.restvalue > 0){
							spend = "<input id='rest' type='hidden' value='"+card.restvalue+"'/><input id='spend' maxlength='5' oninput='checkPrice(this)'/>点";
							$("#xiaofei").html(hidden+spend);
							$(".chargeOff").show();		
							$('.chargeOff').focus();
						}else{
							$("#xiaofei").html("");
							$(".chargeOff").hide();		
						}
					}else{
						$(".data-tab tr").remove();
						$(".headLine").text("");
						$("#xiaofei").html("");
						$(".chargeOff").hide();	
						errorTip( "错误提示", "卡券信息不存在，请确认后再试！" );
					}
					break;
				default : 
					$(".data-tab tr").remove();
					$(".headLine").text("");
					$("#xiaofei").html("");
					$(".chargeOff").hide();	
					errorTip( "错误提示", data.msg ); break;
			}
		}, null, function(){
			$(".headLine").text("卡券信息");
			$(".data-tab-ul").html("");
		}
	);
}


/**
 * 核销订单
 */
function chargeOff(){
	var cardtype = $("#cardtype").val();
	var rest = $("#rest").val();
	var spend = $("#spend").val().trim();
	
	if(spend == ""){
		if(cardtype == "0"){
			errorTip( "提示", "请填写核销次数" );
		}else if(cardtype == "1"){
			errorTip( "提示", "请填写核销点数" );
		}
		return;
	}else if(spend == "0"){
		if(cardtype == "0"){
			errorTip( "提示", "核销次数不能为0" );
		}else if(cardtype == "1"){
			errorTip( "提示", "核销点数不能为0" );
		}
		return;
	}else{
		if(cardtype == "0"){//大于0小于剩余次数的正整数
			var reg = new RegExp("^[1-9]\d*$");//匹配正整数
			if(!reg.test(spend)){
				errorTip( "提示", "核销次数为大于0的正整数" );return;
			}else{
				if(parseInt(spend) > parseInt(rest)){
					errorTip( "提示", "核销次数不能大于剩余次数" );return;
				}
			}
		}else if(cardtype == "1"){//大于0小于剩余点数的正数
			var reg = new RegExp("^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$");//匹配正浮点数
			if(!reg.test(spend)){
				errorTip( "提示", "核销点数必须大于0" );return;
			}else{
				if(parseInt(spend) > parseInt(rest)){
					errorTip( "提示", "核销点数不能大于剩余点数");return;
				}
			}
		}
	}
	operateTip("提示", "确认执行核销操作？", function(){chargeOffSubmit();});
}


//确定核销
function chargeOffSubmit(){
	var url = service_url + "rest/card/chargeOffCard";
	$.post( url,{cardconfid : $("#cardconfid").val(),
		cardid :$("#cardid").val(),
		cardnumber:$("#cardnumber").val(),
		cardcipher:$("#cardcipher").val(),
		spend:$("#spend").val() },function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	errorTip("操作成功","核销成功", function(){
				window.location.reload();						
			});
        }else if(result == 1202){
        	errorTip("错误提示","卡号核销失败");
        	return;
        }else if(result == 1208){
        	errorTip("错误提示","该卡号不能进行核销");
        	return;
        }else if(result == 1304){
        	var cardtype = retjson.data.cardtype;
        	if(cardtype == 0){
        		errorTip("错误提示","核销次数不能大于剩余次数");
        	}else if(cardtype == 1){
        		errorTip("错误提示","核销点数不能大于剩余点数");
        	}
        	return;
        }else if(result == 9997){
        	errorTip("错误提示",retjson.msg);
        	return;
        }else{
        	errorTip("错误提示","操作失败，请稍后重试");
        	return;
        }
	});	
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
	param.type = "one";
	$("#xiaofei").html("");
	ajaxRequest("card/getChargeOffCardList", "GET", true, param, 
		function(data){
			var result = data.result;
			switch (result) {
				case 1000:
					var total = data.total;
					var cardRecordList = data.data;
					if(total > 0 && cardRecordList != null && cardRecordList.length > 0){
						var totalpage = parseInt(total % pagesize == 0 ? total / pagesize : total / pagesize + 1);
						var str = '';
						for(var i=0; i<cardRecordList.length; i++){
							var record = cardRecordList[i];
							str += '<tr>';
							var cardname = record.cardname;
							if(record.cardname.length > 10){
								cardname = cardname.substr(0, 10) + "<br/>" + cardname.substr(10);
							}
							str += '<td>'+ cardname + '</td>';
							str += '<td>'+ record.cardtype_name +'</td>';
							str += '<td>'+ record.cardnumber +'</td>';
							str += '<td>'+ record.createtime +'</td>';
							str += '<td>'+ record.status_name +'</td>';
							if(record.cardtype=="0"){
								str += '<td>'+ record.count +'</td>';
							}else if(record.cardtype=="1"){
								str += '<td>--</td>';
							}
							str += '<td>'+ record.value.toFixed(2) +'</td>';
							str += '<td>'+ record.modifytime +'</td>';
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
						errorTip( "提示", "暂无已核销信息！" );
					}
					break;
				default : errorTip( "错误提示", data.msg ); break;
			}
		}, null, function(){
			var dataHeadHtml = '<tr><th class="w250">卡券名称</th><th class="w100">类型</th><th class="w250">卡号</th><th class="w200">核销时间</th><th class="w100">核销状态</th><th class="w100">核销次数</th><th class="w100">核销面值</th><th class="w200">退款时间</th></tr>';
			$(".data-tab table").html(dataHeadHtml);
			$(".headLine").text("我的核销信息");
			$(".data-tab table").addClass("charge_off_order");
			$(".data-tab-ul").html("");
		}
	);
}