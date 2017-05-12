$(function() {
	// Logo，地区，主菜单
	LogoMenuTextLoad(4);
	// 轮播图
//	carouselTextLoad("index");
	// 底部导航
	bottomTextLoad();

	$(".leftText>div:not(.head)").on("click", function(){
		$(".option").removeClass("cur");
		$(this).find(".option").addClass("cur");

		$(".rightText>div").hide();
		$("." + $(this).attr("target")).show();
	});
});
