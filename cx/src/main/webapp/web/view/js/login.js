$().ready(function() {
	$("#account").val(localStorage.getItem("account"));
	$("#pass").val(localStorage.getItem("pass"));

	//底部导航
	bottomTextLoad();

	//弹出文本框时间
	maskInputEvent(".mask1 input");
});


/**
 * 登录请求服务器
 */
function login(){
	var account = encodeURIComponent($("#account").val());
	var pass = $("#pass").val();
	if(account == '') {
		layer.msg('登录账号不能为空', { icon: 5, anim: 6 });
		return;
	} else if ( pass == '') {
		layer.msg('登录密码不能为空', { icon: 5, anim: 6 });
		return;
	}

	var params = {};
	params.account = account;
	params.pass = pass;

	$.ajax({
        url: service_url + "user/login",
        dataType: 'jsonp',
        data: params,
        jsonp: "jsonpCallback",
        success: function(data){
			switch(data.result){
				case 1000:
					localStorage.setItem("nickname", data.data.nickname);

					// if(document.getElementById("remember").checked){
//						$.cookie("userid", user.userid, { expires: 7, path: '/' });
//						$.cookie("nickname", nickname, { expires: 7, path: '/' });
						// localStorage.setItem("account", account);
						// localStorage.setItem("pass", pass);
					// }

					// $(".mask1").remove(".mask1")
					// $("body").css("overflow", "auto");
					// $(".top .out_login").show();
					window.location.href = "../index.html";
					break;
				case 1004:
					// $("#account").after("<div class='text_error_tip'>"+ data.msg +"</div>"); break;
					layer.msg(data.msg, { icon: 5, anim: 6 });
				case 1005:
					// $("#pass").after("<div class='text_error_tip'>"+ data.msg +"</div>"); break;
					// $("#pass").val("");
					layer.msg(data.msg, { icon: 5, anim: 6 });
				default:
					layer.msg(data.msg, { icon: 5, anim: 6 });
					break;
			}
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
        	alert(errorThrown);
        },
        timeout: 30000
    });
}
