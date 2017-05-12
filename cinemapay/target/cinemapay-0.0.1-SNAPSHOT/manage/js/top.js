$(function(){
	// 加载顶部用户消息栏
	loadTopHtml();
	// 未读消息
	getNewsNotice();
});		


/**
 * 加载顶部用户消息栏
 */
function loadTopHtml(){
	var userinfo = localStorage.getItem("info");
	
	var topHtml = '';
	topHtml += '<div class="top">';
	topHtml +=   '<span class="message" id="newnotice">';
	topHtml +=     '<span class="new"></span>最新消息';
	topHtml +=   '</span>';
	topHtml +=   '<span class="manage">' + userinfo;
	topHtml +=     '<ul>';
	topHtml +=       '<li id="userlogin">账户信息</li>';
	topHtml +=       '<li id="updatePass">修改密码</li>';
	topHtml +=       '<li id="loginout">退出</li>';
	topHtml +=     '</ul>';
	topHtml +=   '</span>';
	topHtml += '</div>';
	$("body").before(topHtml);
	
	$(".top ul").width($(".top .manage").width() + 40);
	$(".top .manage").on("click", function(){ 
		$(".top ul").show();
		$(".top ul").on("mouseleave", function(){ $(".top ul").hide(); });
	});
	
	$("#userlogin").on("click",function(){
		var page = "manager/userInfo.html";
		window.parent.$("#mainFrame").attr("src",page);
	});
	$("#updatePass").on("click",function(){
		var page = "manager/updatePass.html";
		window.parent.$("#mainFrame").attr("src",page);
	});
	$("#loginout").on("click",function(){
		//清除页面session
		localStorage.clear();
		var url = service_url + "rest/user/loginOut";
		$.post( url,{},function(data) {
			var retjson=$.parseJSON(data);
			var result = parseInt(retjson.result);
			window.parent.location= "../login.html";
		});
	});
}


/**
 * 未读消息
 */
function getNewsNotice(){
	if(localStorage.getItem("total") != null){
		if(parseInt(localStorage.getItem("total")) > 0){
			$($(".top .new")).show();
			$(".top .new").text(localStorage.getItem("total"));
		}
	}else{
		var url = service_url + "rest/log/getLogCount";
		$.post( url,{},function(data) {
			var retjson=$.parseJSON(data);
			var result = parseInt(retjson.result);
			if(result == 1000){
				var total = retjson.total;
				if(total != 0 && total != undefined){
					$($(".top .new")).show();
					$(".top .new").text(total);
					localStorage.setItem("total", total);
				}
			}
		});
	}
	$("#newnotice").on("click",function(){
		localStorage.setItem("total", 0);
		window.parent.$("#mainFrame").attr("src", "manager/logInfoList.html");
	});
}