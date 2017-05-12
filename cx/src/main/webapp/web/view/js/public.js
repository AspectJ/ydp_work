
var clientWidth; //网页可见区域宽
var clientHeight; //网页可见区域高
var offsetWidth; //网页可见区域宽 (包括边线的宽)
var offsetHeight; //网页可见区域高 (包括边线的宽)
var scrollWidth; //网页正文全文宽
var scrollHeight; //网页正文全文高
var scrollTop; //网页被卷去的高
var scrollLeft; //网页被卷去的左
var screenTop; //网页正文部分上
var screenLeft; //网页正文部分左
var height; //屏幕分辨率的高
var width; //屏幕分辨率的宽
var availHeight; //屏幕可用工作区高度
var availWidth; //屏幕可用工作区宽度
var main_width; // 右边显示区域宽度

$(function(){
	// ++++++++++++++++++++++++++++++屏幕、浏览器尺寸++++++++++++++++++++++++++++++
	clientWidth = document.body.clientWidth;
	clientHeight = document.body.clientHeight;
	offsetWidth = document.body.offsetWidth;
	offsetHeight = document.body.offsetHeight;
	scrollWidth = document.body.scrollWidth;
	scrollHeight = document.body.scrollHeight;
	scrollTop = document.body.scrollTop;
	scrollLeft = document.body.scrollLeft;
	screenTop = window.screenTop;
	screenLeft = window.screenLeft;
	height = window.screen.height;
	width = window.screen.width;
	availHeight = window.screen.availHeight;
	availWidth = window.screen.availWidth;
	// ++++++++++++++++++++++++++++++屏幕、浏览器尺寸++++++++++++++++++++++++++++++

	// 在线资讯
	onlineConsultation();


	$(document).keyup(function(event){
		switch(event.keyCode) {
			case 27: $(".mask").hide(); break;
		}
	});
});


var service_url = "http://localhost:8080/cx/rest/";
//var service_url = "http://vip.hn.yidepiao.net:7070/cx/rest/";

/**
 * 顶部登录部分
 */
function topLoginTextLoad(){
	var html = "<div class='top' id='top'>";
       	html += "<span class='red pointer'><span id='userName'>登录 |</span></span>";
       	html += "<span class='out_login'>退出登录</span>";
		    html += "<span class='regist'> 注册</span>";
	   	html += '</div>';
	$("#header .body").append(html);

	// 登陆
	$("#userName").bind("click", function() {
		window.location.href = "/auth/login.html";
	});


	var nickname = localStorage.getItem("nickname");
	var nickname_cookie = $.cookie("nickname");
	// 注册
	$(".regist").on("click", function() {
//		if(nickname != null || nickname_cookie != null) {
//			toolTip("对不起，您已登录，不能注册！");
//			return;
//		}
		window.location.href = "/auth/regist.html";
	});

	// 退出登录
	$("#header .out_login").on("click", function(){
		localStorage.removeItem("nickname");
//		$.cookie("userid", null);
//		$.cookie("nickname", null);
		localStorage.removeItem("account");
		localStorage.removeItem("pass");
		window.location.href=window.location.href;
	});

	if(nickname != null || nickname_cookie != null) {
		$("#userName").text(nickname);
		$("#userName").unbind("click"); //如果用户已登录，则不能继续登录
		$(".regist").hide();
		$(".out_login").show();
	}

	if(window.location.href.indexOf("login.html") != -1 || window.location.href.indexOf("regist.html") != -1) {
		var content = "<span class='index'>【返回首页】 </span>";
		$("#header .regist").after(content);
		$("#header .index").bind("click", function() {
			window.location.href = "/index.html";
		});
	}
}


/**
 * Logo，地区，主菜单
 */
var city;
function LogoMenuTextLoad(index, showCity){
	var html = '<div class="body">';
		html +=   '<a href="/index.html"><img src="/img/logo.png" class="logo" /></a>';
		if(showCity != null){
			html +=   '<div class="city"><input id="cityChoice" readonly unselectable="on" value="长沙"/></div>';
		}
		html +=   '<ul>';
		html +=     '<li src="/index.html">首页</li>';
		html +=     '<li src="/about.html">关于楚湘</li>';
		html +=     '<li src="/homeland.html" logined="true">院线家园</li>';
		html +=     '<li src="/league.html">影院加盟</li>';
		html +=     '<li src="/elegant.html">影院风采</li>';
		html +=     '<li src="/contact.html">联系我们</li>';
		html +=   '</ul>';
		html +=   "<div class='top' id='top'>";
   	html += 		"<span class='pointer' id='userName'>登录</span>";
   	html += 		"<span class='out_login pointer'>退出登录</span>";
    html += 		"<span class='regist pointer'>注册</span>";
   	html += 	'</div>';
		html += '</div>';

	$("#header").html(html);
	$("#header ul li").eq(index - 1).addClass("title_li_cur");
	// 选择主菜单事件
	$("#header li").on("click", function(){
		var logined = $(this).attr("logined");
		if(logined == "true"){
			if(localStorage.getItem("nickname") == null){
				// toolTip("对不起，您还未登录，请登录！", "/auth/login.html");
				return window.location.href = "/auth/login.html";
			}
		}

		$("#header li").removeClass("title_li_cur");
		$(this).addClass("title_li_cur");
		window.location.href = $(this).attr("src");
	});

	if(showCity != null){
		var cityPicker = new HzwCityPicker({
			data: data,
			target: 'cityChoice',
			valType: 'k-v',
			hideCityInput: {
				name: 'city',
				id: 'city'
			},
			hideProvinceInput: {
				name: 'province',
				id: 'province'
			},
			callback: function(){
				city = $("#cityChoice").val();
			}
		});
		cityPicker.init();
	}

	// 登陆
	$("#userName").bind("click", function() {
		window.location.href = "/auth/login.html";
	});


	var nickname = localStorage.getItem("nickname");
	var nickname_cookie = $.cookie("nickname");
	// 注册
	$(".regist").on("click", function() {
//		if(nickname != null || nickname_cookie != null) {
//			toolTip("对不起，您已登录，不能注册！");
//			return;
//		}
		window.location.href = "/auth/regist.html";
	});

	// 退出登录
	$("#header .out_login").on("click", function(){
		localStorage.removeItem("nickname");
//		$.cookie("userid", null);
//		$.cookie("nickname", null);
		localStorage.removeItem("account");
		localStorage.removeItem("pass");
		window.location.href=window.location.href;
	});

	if(nickname != null || nickname_cookie != null) {
		$("#userName").text(nickname);
		$("#userName").unbind("click"); //如果用户已登录，则不能继续登录
		$(".regist").hide();
		$(".out_login").show();
	}

	if(window.location.href.indexOf("login.html") != -1 || window.location.href.indexOf("regist.html") != -1) {
		var content = "<span class='index'>【返回首页】 </span>";
		$("#header .regist").after(content);
		$("#header .index").bind("click", function() {
			window.location.href = "/index.html";
		});
	}
}


/**
 * 轮播图
 */
function carouselTextLoad(type){
	var imgs = [];
//	if(sessionStorage.getItem("carousel_" + type) != null){
//		imgs = JSON.parse(localStorage.getItem("carousel_" + type));
//		showCarousel(imgs);
//	}else{
		var params = {};
		params.type = type;

		$.ajax({
	        url: service_url + "carousel/carouselList",
	        dataType: 'json',
	        data: params,
	        success: function(data){
				switch(data.result){
					case 1000:
						var obj = data.data;
						if(obj != null && obj.length > 0){
							for(var i=0; i<obj.length; i++){
								var img = {};
								img.src = obj[i].org_path;
								img.href = obj[i].href;
								img.title = obj[i].title;
								imgs[i] = img;
							}
							showCarousel(imgs);
//							sessionStorage.setItem("carousel_" + type, JSON.stringify(imgs))
						}
						break;
					default:
						alert(data.msg);
						break;
				}
	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown){
	        	alert(errorThrown);
	        },
	        timeout: 30000
	    });
//	}
}
/**
 * 显示轮播图
 */
function showCarousel(imgs){
	if(imgs != null && imgs.length > 0){
//		var html = '<img src="'+ imgs[0].src +'" class="Logo_img" href="'+ imgs[0].href +'"/>';
//			html += '<img src="img/left.png" class="back"/>';
//			html += '<img src="img/right.png" class="next"/>';
//			html += '<ul>';
//			html += '<li src="'+ imgs[0].src +'" class="cur_li" href="'+ imgs[0].href +'"></li>';
//			html += '<li src="'+ imgs[1].src +'" href="'+ imgs[1].href +'"></li>';
//			html += '<li src="'+ imgs[2].src +'" href="'+ imgs[2].href +'"></li>';
//			html += '<li src="'+ imgs[3].src +'" href="'+ imgs[3].href +'"></li>';
//			html += '</ul>';
//		$(".carousel").html(html);
//		// 点击第几张
//		$(".carousel li").on("click", function(){
//			$(".carousel li").removeClass("cur_li");
//			$(this).addClass("cur_li");
//			$(".carousel .Logo_img").attr("src", $(this).attr("src"))
//			$(".carousel .Logo_img").attr("href", $(this).attr("href"))
//		});
//
//		var index = 0;
//		var li_size = $(".carousel li").size(); // 总张数
//		// 上一张
//		$(".carousel .back").on("click", function(){
//			if(index == 0){
//				index = li_size - 1;
//			}else{
//				index = index - 1;
//			}
//			$(".carousel .cur_li").removeClass("cur_li");
//			$(".carousel li").eq(index).addClass("cur_li");
//			$(".carousel .Logo_img").attr("src", $(".carousel li").eq(index).attr("src"))
//			$(".carousel .Logo_img").attr("href", $(".carousel li").eq(index).attr("href"))
//		});
//
//		// 下一张
//		$(".carousel .next").on("click", function(){
//			if(index == li_size - 1){
//				index = 0;
//			}else{
//				index = index + 1;
//			}
//			$(".carousel .cur_li").removeClass("cur_li");
//			$(".carousel li").eq(index).addClass("cur_li");
//			$(".carousel .Logo_img").attr("src", $(".carousel li").eq(index).attr("src"))
//			$(".carousel .Logo_img").attr("href", $(".carousel li").eq(index).attr("href"))
//		});
//
//		// 轮播
//		var i=1;
//		setInterval(function(){
//			$(".carousel .next").click();
//		}, 5000);

//		<div class="swiper-container">
//		    <div class="swiper-wrapper">
//		        <div class="swiper-slide">Slide 1</div>
//		        <div class="swiper-slide">Slide 2</div>
//		        <div class="swiper-slide">Slide 3</div>
//		    </div>
//		    <div class="swiper-pagination"></div>
//
//		    <div class="swiper-button-prev"></div>
//		    <div class="swiper-button-next"></div>
//		</div>

		var html = '<div class="swiper-wrapper">' +
		       			'<div class="swiper-slide"><img class="Logo_img" src="' + imgs[0].src + '" /></div>' +
				        '<div class="swiper-slide"><img class="Logo_img" src="' + imgs[1].src + '" /></div>' +
				        '<div class="swiper-slide"><img class="Logo_img" src="' + imgs[2].src + '" /></div>' +
				        '<div class="swiper-slide"><img class="Logo_img" src="' + imgs[3].src + '" /></div>' +
				   '</div>' +
				   '<div class="swiper-pagination"></div>' +
				   '<div class="swiper-button-prev"></div>' +
				   '<div class="swiper-button-next"></div>';
		$(".carousel").html(html);

		var mySwiper = new Swiper ('.swiper-container', {
		    loop: true,

		    // 如果需要分页器
		    pagination: '.swiper-pagination',
		    paginationClickable :true,

		    // 如果需要前进后退按钮
		    nextButton: '.swiper-button-next',
		    prevButton: '.swiper-button-prev'
	    });
	}
}


/**
 * 底部导航
 */
function bottomTextLoad(top){
	var html = '<div class="body">';
        html +=   '<img class="logo" src="/img/logo_top.png" />';
        html +=   '<div class="phone">0731-82568532</div>';
        html +=   '<div class="address">客服热线（服务时间：9:00 - 18:00）</div>';
        html +=   '<div class="copy_right">公司地址：湖南省长沙市营盘东路13号 | 湖南楚湘影业有限责任公司 cxfilm.com&nbsp;&nbsp;Copyright©2010-2016湘ICP备10026184号</div>';
        html += '</div>';
	$(".bottom").html(html);
	if(top != null){
		$(".bottom").css("top", top + "px");
	}

}


/**
 * 登录
 */
//function loginTextLoad(){
//	var html = '<div class="mask">';
//		html +=   '<div class="logintext h400">';
//		html +=     '<div class="head">登录<img class="cancel" src="/img/cancel.png"/></div>';
//		html +=     '<div class="account"><i></i><input id="account" placeholder="请输入帐号" tip1="帐号不能为空" maxlength="20"/></div>';
//		html +=     '<div class="pass"><i></i><input type="password" id="pass" placeholder="请输入密码" tip1="密码不能为空" maxlength="20"/></div>';
//		html +=     '<div class="tip"><input id="remember" type="checkbox" name="r" value="r"/><span class="remember">记住密码</span><span class="forget">忘记密码?</span>|<span class="regist">立即注册</span></div>';
//		html +=     '<div class="loginbn" onclick="login();">登录</div>';
//		html +=   '</div>';
//		html += "</div>";
//	$("body").append(html);
//	$("body").css("overflow", "hidden");
//	// 弹出框文本事件
//	maskInputEvent();
//	$("#account").focus();
//	$(".regist").on("click", function(){
//		$(".mask").remove(".mask")
//		$("body").css("overflow", "auto");
//		registTextLoad()
//	});
//}

/**
 * 登录请求服务器
 */
/*function login(){
	var account = encodeURIComponent($("#account").val());
	var pass = $("#pass").val();

	if(account == "" || pass == ""){
		$(".mask input").blur();
		return;
	}

	var params = {};
	params.account = account;
	params.pass = pass;

	$.ajax({
        url: service_url + "user/login",
        dataType: 'jsonp',
        data: params,
        async: false,
        jsonp: "jsonpCallback",
        success: function(data){
			switch(data.result){
				case 1000:
					var user = data.data;
					var nickname = user.nickname;
					$("#userName").text(nickname);
					localStorage.setItem("nickname", nickname);

					if(document.getElementById("remember").checked){
						$.cookie("userid", user.userid, { expires: 7, path: '/' });
						$.cookie("nickname", nickname, { expires: 7, path: '/' });
					}

					$(".mask").remove(".mask")
					$("body").css("overflow", "auto");
					$(".top .out_login").show();
					break;
				case 1004:
					$("#account").after("<div class='text_error_tip'>"+ data.msg +"</div>"); break;
				case 1005:
					$("#pass").after("<div class='text_error_tip'>"+ data.msg +"</div>"); break;
					$("#pass").val("");
				default:
					toolTip(data.msg);
					break;
			}
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
        	alert(errorThrown);
        },
        timeout: 30000
    });
}*/


/**
 * 注册
 */
/*function registTextLoad(){
	var html = '<div class="mask">'
		html +=   '<div class="registtext">'
		html +=     '<div class="head">注册<img class="cancel" src="/img/cancel.png"></div>'
		html +=     '<div class="tap">帐号信息</div>'
		html +=     '<div class="account"><i></i><input id="account" placeholder="请输入会员帐号" tip1="帐号不能为空" maxlength="20"></div>'
		html +=     '<div class="pass"><i></i><input type="password" id="pass" placeholder="请输入密码" tip1="密码不能为空" maxlength="20"></div>'
		html +=     '<div class="tap">个人信息</div>'
		html +=     '<div class="realname"><i></i><input id="realname" placeholder="联系人姓名" tip1="姓名不能为空" maxlength="20"></div>'
		html +=     '<div class="mobile"><i></i><input id="mobile" placeholder="联系电话" tip1="电话不能为空" maxlength="20"></div>'
		html +=     '<div class="cinamename"><i></i><input id="cinamename" placeholder="影院名称" tip1="请填写影院名称" maxlength="20"></div>'
		html +=     '<div class="email"><i></i><input id="email" placeholder="邮箱" tip1="邮箱不能为空" maxlength="20"></div>'
		html +=     '<div class="tip"><input id="remember" checked type="checkbox" name="r" value="r">&nbsp;我已阅读并遵守本网站服务条款</div>'
		html +=     '<div class="registbn" onclick="regist();">提交</div>'
		html +=   '</div>'
		html += '</div>';
	$("body").append(html);
	$("body").css("overflow", "hidden");
	// 弹出框文本事件
	maskInputEvent();
	$("#account").focus();
}*/
/**
 * 注册请求服务器
 */
/*function regist(){
	var account = encodeURIComponent($("#account").val());
	var pass = $("#pass").val();
	var realname = $("#realname").val();
	var mobile = $("#mobile").val();
	var email = $("#email").val();
	var cinamename = $("#cinamename").val();

	if(account == "" || pass == "" || realname == "" || mobile == "" || cinamename == "" || email == ""){
		$(".mask input").blur();
		return;
	}

	var params = {};
	params.account = account;
	params.pass = pass;
	params.realname = realname;
	params.mobile = mobile;
	params.cinema_name = cinamename;
	params.email = email;

	$.ajax({
        url: service_url + "user/regist",
        dataType: 'jsonp',
        data: params,
        async: false,
        jsonp: "jsonpCallback",
        success: function(data){
			switch(data.result){
				case 1000:
					var user = data.data;
					var nickname = user.nickname;
					$("#userName").text(nickname);
					localStorage.setItem("nickname", nickname);

					if(document.getElementById("remember").checked){
						$.cookie("userid", user.userid, { expires: 7, path: '/' });
						$.cookie("nickname", nickname, { expires: 7, path: '/' });
					}

					$(".mask").remove(".mask")
					$("body").css("overflow", "auto");
					break;
				case 1006:
					$("#mobile").after("<div class='text_error_tip'>"+ data.msg +"</div>"); break;
				case 1007:
					$("#email").after("<div class='text_error_tip'>"+ data.msg +"</div>"); break;
				default:
					toolTip(data.msg);
					break;
			}
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
        	alert(errorThrown);
        },
        timeout: 30000
    });
}*/
/**
 * 弹出框文本事件
 */
function maskInputEvent(sign){
	if(sign != null) {
		$(sign).on("focus", function(){
			$(this).css("border-color", "#EB002A");
			$(this).next().remove();
		});
		$(sign).on("blur", function(){
			if($(this).val() == ""){
				$(this).after("<div class='text_error_tip'>"+ $(this).attr("tip1") +"</div>");
			}else{
				$(this).css("border-color", "#DDDDDD");
			}
		});
		$(sign).on("input",function(){
			if($(this).next() != null && $(this).next().hasClass("text_error_tip")){
				$(this).next().remove();
			}
		});
	}else {
//		$(".mask .head .cancel").on("click", function(){
//		$(".mask").remove(".mask")
//		$("body").css("overflow", "auto");
//	});
		$(".mask input").on("focus", function(){
			$(this).css("border-color", "#EB002A");
//			$(this).next().remove();
		});
		$(".mask input").on("blur", function(){
			if($(this).val() == ""){
				$(this).after("<div class='text_error_tip'>"+ $(this).attr("tip1") +"</div>");
			}else{
				$(this).css("border-color", "#DDDDDD");
			}
		});
		$(".mask input").on("input",function(){
			if($(this).next() != null && $(this).next().hasClass("text_error_tip")){
				$(this).next().remove();
			}
		});
	}
}

/**
 * 在线资讯
 */
function onlineConsultation(){
	var html = '<div class="customer_service"><span class="font">QQ客服</span>'
		html +=   '<div class="online_service">';
		// html +=    	'<img class="jt" src="../img/online_consultation_wxicon_1_jt.png" />'
		html +=   	'<div class="QQ_service"><img class="QQ_one" src="/img/qq.png"/><a href="http://wpa.qq.com/msgrd?v=3&uin=249234000&site=qq&menu=yes" target="_blank"><b>QQ交谈</b></a></div>';
		html +=   	'<div class="QQ_service"><img class="QQ_two" src="/img/qq.png"/><a href="http://wpa.qq.com/msgrd?v=3&uin=249234000&site=qq&menu=yes" target="_blank"><b>QQ交谈</b></a></div>';
		html +=   '</div>';
		html += '</div>';

		html += '<div class="back_top"></div>'
	$(".online_consultation").append(html);
	$(".online_consultation .customer_service").hover(function() {
		$(this).find(".online_service").show();
	}, function(){
		$(this).find(".online_service").hide();
	});

	$(".online_consultation .back_top").on("click", function(){window.location.href="#top"});
}


/**
 * 提示框
 */
function toolTip(message, url){
	var html = '<div class="mask">'
		html +=   '<div class="toolTip">'
		html +=     '<div class="head">提示</div>'
		html +=     '<div class="substance">'+ message +'</div>'
		html +=     '<div class="sure"><p>确定</p></div>'
		html +=   '</div>'
		html += '</div>';
	$("body").append(html);
	$("body").css("overflow", "hidden");
	$("#account").focus();

	$(".mask .toolTip .sure p").on("click", function(){
		//跳转到url页面
		if(url != null) {
			window.location.href = url;
			return;
		}

		$(".mask").remove(".mask")
		$("body").css("overflow", "auto");
	});
}


/**
 * 截取字符
 * instr 输入字符串
 * reservelen 保留长度
 */
function truncate(instr, reservelen){
	if(instr != null){
		var strlen = instr.length;
		if(strlen > reservelen){
			return instr.substr(0, reservelen) + "...";
		}
	}
	return instr;
}


//function replaceAll(str) {
//	if(str != null) {
//		str = str.replace(/\n/g,"<br/>");
//		str = str.replace(/ /g, "&nbsp;");
//		return str;
//	}
//}


/**
 * 通用调用ajax接口
 * @param serviceName 调用接口名称
 * @param params 传入参数
 * @param returnFunction 成功后调用函数
 */
function CommAjaxLoad(serviceName, params, returnFunction){
	$.ajax({
        url: service_url + serviceName,
        dataType: 'jsonp',
        data: params,
        async: false,
        jsonp: "jsonpCallback",
        success: function(data){
			switch(data.result){
				case 1000:
					// 新建创建保存的方法
					var func=eval(returnFunction);
					new func(data.data);
					break;
				default:
					toolTip(data.msg);
					break;
			}
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
        	alert(errorThrown);
        },
        timeout: 30000
    });
}


/**
 * ajax请求数据
 * @param {Object} apiName 接口名称 (类型+名称)
 * @param {Object} type GET/POST
 * @param {Object} async 是否异步调用
 * @param {Object} param 参数
 * @param {Object} success 成功调用方法
 * @param {Object} error 失败调用方法
 * @param {Object} beforefn 请求执行前调用方法
 * @param {Object} afterfn 请求执行后调用方法
 */
function ajaxRequest(apiName, type, async, param, fn_success, fn_error, fn_before, fn_after){
	$.ajax({
		url: service_url + apiName,
		type: type,
		data: param,
		async: async,
		dataType: 'jsonp',
		jsonp: "jsonpCallback",
		beforeSend: function(request) { if(fn_before != null){ new fn_before(); } },
        complete: function(){ if(fn_after != null){ new fn_after(); } },
		success: function(data) {
			new fn_success(data);
		},
		error: function( XMLHttpRequest, textStatus, errorThrown ) { if(fn_error != null){ new fn_error(); } },
		timeout: 120000
	});
}


// 参数查询
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

/**
 * 正则表达式判断邮箱格式
 */
function isEmail(email) {
	var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
	return reg.test(email);
}

/**
 * 正则表达式判断手机号码
 */
function isPhone(mobile) {
	var reg = /^1[34578](\d){9}$/;
	return reg.test(mobile);
}

/**
 * 正则表达式判断用户名（字母数字下划线【6~12位】）
 */
function isUsername(username) {
	var reg = /^[a-zA-Z0-9_]{6,12}$/
	return reg.test(username)
}

/**
 * 去除文本里所有的P标签
 */
function disposeTag_p(content) {
	if(content != null) {
		return content.replace(/<p>/g, "").replace(/<\/p>/, "");
	}
}

/**
 * 去除文本里所有的html标签
 */
function disposeHtmlTag(text) {
	if(text != null) {
		var reg = /<[^>]+>/g;
		return text.replace(reg, '');
	}
}
