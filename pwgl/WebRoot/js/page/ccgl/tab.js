//展开
$('.click-t a').click(function(){
	$('.w845').slideDown();
	$('.click-t').hide();
});

//收起来
$('.up').click(function(){
	$('.w845').slideUp();
	$('.click-t').show();
});

$('.add').click(function(){
	$('.zhezhao').show();
});

$('.qx').click(function(){
	$('.zhezhao').hide();
});

$(".tab-title span").click(function(){
   $('.tab-title span').removeClass('on');
   $(this).addClass("on");
   var index = $(".tab-title span").index($(this));
   $(".tab-box").css("display","none");
   $(".tab-box").eq(index).css("display","block");
});

function showstepurl(url,mstep,step){
	//打开相应的界面
	$("#contentdiv").load(url);
	$("#dqwz_span").html("您当前的位置：场次管理-"+step);
	$("#mstep_span").html(mstep);
	$("#step_span").html(step);
	$("#fqzw").css("color","grey");
	$("#zwyl").css("color","grey");
	if("分区座位"==step){
		$("#fqzw").css("color","white");
		$("#zwyl").css("color","grey");
	}
	if("座位预留"==step){
		$("#zwyl").css("color","white");
		$("#fqzw").css("color","grey");
	}
}

//下一步样式切换
$(".step span").click(function(){
	$(".step span").removeClass("bggreen");
	$(".step span").removeClass("c_f");
	$(this).addClass("bggreen");
	$(this).addClass("c_f");
});

//提交审核
$("#tjshbtn").click(function(){
	
	//查询状态
	var data = {sessionsid:sessionsid,operType:'index'};
	publicAjaxRequest(sessionsService,data,jsonType, function(response) {
		var status=response.data[0].status;
		if('1'==status||'3'==status){
			var data = {sessionsid:sessionsid,operType:'dsh'};
			publicAjaxRequest(sessionsService,data,jsonType, function(response) {
				var rdata = response.data;
				if("success" == rdata) {
					ctl_reloadGrid('sessions_grid');
					ctl_showMsg("操作成功!");
				}else if("fail" == rdata) {
					ctl_showMsg("操作失败!");
				}else {
					ctl_showMsg(rdata);
				}
			});
		}else{
			ctl_showMsg("只有待审核和已驳回状态，才能提交审核");
		}
		
	});

});