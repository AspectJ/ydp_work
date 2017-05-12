var productid;

$(function(){
	productid = getPramStr("productid");	
	
	if(productid != null){
		
	}
	
	// 预览点击切换
	$("li").on("click", function(){
		$("li").removeClass("li_cur");
		$(this).addClass("li_cur");
		
		$(".review").hide();
		$("." + $(this).attr("name")).show();
	});
	
	// 输入
	$("input, textarea").on("input", function(){
		// 输入限制
		$(this).nextAll(".restrict").text($(this).val().length + "/" + $(this).attr("maxlength"));
		// 自动填充
		$(".coupons_" + $(this).attr("id")).text( $(this).val() );
		if($(this).attr("id") == "title" || $(this).attr("id") == "quantity" || $(this).attr("id") == "beginTime"|| $(this).attr("id") == "endTime"){
			$(".review").hide();
			$(".review_message").show();
		}else if($(this).attr("id") == "deal_detail" || $(this).attr("id") == "description"){
			$(".review").hide();
			$(".review_detail").show();
		}else if($(this).attr("id") == "notice"){
			$(".review").hide();
			$(".review_qrcode").show();
		}
	});
});


function subCoupons(){
	if( $("#title").val() == "" ){
		errorTip("参数错误", "标题不能为空！"); return;
	}else if( $("#quantity").val() == "" ){
		errorTip("输入错误", "投放数量不能为空！"); return;
	}else if( $("#beginTime").val() == "" ){
		errorTip("输入错误", "请选择开始时间"); return;
//	}else if( $("#endTime").val() == "" ){
//		errorTip("输入错误", "请选择结束时间"); return;
	}else if( $("#expiry").val() == "" ){
		errorTip("输入错误", "请填写卡劵有效天数"); return;
	}else if( $("#deal_detail").val() == "" ){
		errorTip("输入错误", "卡券详情不能为空"); return;
	}else if( $("#description").val() == "" ){
		errorTip("输入错误", "使用说明不能为空"); return;
	}else if( $("#notice").val() == "" ){
		errorTip("输入错误", "卡使用提醒不能为空"); return;
	}
	
	var param = {};
	param.productid = productid;
	param.title = $("#title").val();
	param.sub_title = $("#sub_title").val();
	param.deal_detail = $("#deal_detail").val();
	param.quantity = $("#quantity").val();
	param.beginTime = $("#beginTime").val();
//	param.endTime = $("#endTime").val();
	param.expiry = $("#expiry").val();
	param.description = $("#description").val();
	param.notice = $("#notice").val();
	
	ajaxRequest("coupons/subCoupons", "GET", true, param, 
		function(data){
			var result = data.result;
			switch (result) {
				case 1000:
					errorTip("操作成功", "恭喜您，您的卡劵创建成功！", function(){
						window.location.href = "ProductList.html?status=-1";
//						history.go(-1);
					});
					break;
				default : errorTip("操作失败", "对不起，您的卡劵创建失败！"); break;
			}
		}
	);
}


// 日期选择
function changeTime(){
	
	var beginTime = $("#beginTime").val() == "" ? "" : $("#beginTime").val().substr(0, 10);
//	var endTime = $("#endTime").val() == "" ? "" : $("#endTime").val().substr(0, 10);
	var expiry = $("#expiry").val() == "" ? 0 : parseInt($("#expiry").val());
	var endTime = addDate(new Date(beginTime), expiry).format("yyyy.MM.dd");
	
	if(expiry > 7){
		errorTip("提示", "使用有效期建议小于7天");
	}
	
	$(".review").hide();
	$(".review_message").show();
	$(".review_message .coupons_expirydate").text( "有效期："+ beginTime +"-" + endTime );
	$(".review_detail .coupons_expirydate").text( beginTime +"-" + endTime );
}


