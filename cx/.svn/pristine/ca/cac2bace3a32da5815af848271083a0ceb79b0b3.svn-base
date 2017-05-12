
(function(){
	
	var _win = window;
	$(function(){		
		//点击大导航
		$("h2.menu-title").click(function(){	
			var $p = $(this).parent();
			//展开当前
			$(this).next().slideDown(300);
			$p.addClass("menu-show")
			//收拢其他
			$p.siblings().find(".menu-box").slideUp(100);
			$p.siblings().removeClass("menu-show");
			$p.siblings().find("li").css("background", "#333247");
		});
		//点击小导航
		$(".menu-box").find("li").click(function(){
			$(this).css("background", "#FF4400");
			$(this).siblings().css("background", "#333247");
			
			//跳转页面
			var link = $(this).attr("href");
			var $iObj = $(parent.document).find("iframe#mainFrame");
			$iObj.attr( "src", link );
		});		
	});	
})();

$(function() {
	$(".quanxian").html("修改密码");
	$(".quanxian").bind("click", function() {
		var page = "auser/modifyPwd.html";
		window.parent.$("#mainFrame").attr("src",page);
	});
});

