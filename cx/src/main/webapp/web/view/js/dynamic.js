$(function() {
	// Logo，地区，主菜单
	LogoMenuTextLoad(3);
	// 轮播图
//	carouselTextLoad("index");
	// 底部导航
	bottomTextLoad(2750);
	
	//获取更多新闻
	$(".more span").bind("click",function() {
		window.location.href = "dynamic/more.html";
	});
	
	//获取公司新闻
	$.ajax({
		url: service_url + "newsinfo/getCompanyDynamic",
		dataType: "json",
		jsonp: "jsonpCallback",
		success: function(data) {
			var resultData = data.data;
			for(var i = 0; i < resultData.length; i++) {
				var news_id = resultData[i].news_id;
				var update_time = resultData[i].update_time;
				var brows_times = resultData[i].brows_times;
				var news_title = resultData[i].news_title;
				var news_content = resultData[i].dynamic_newsContent;
				var org_path = resultData[i].org_path;
				$(".content .time:eq("+i+")").html(update_time);
				$(".content .sea_size:eq("+i+")").html(brows_times);
				$(".content .news_head:eq("+i+") a").html(news_title);
				$(".content .news_content:eq("+i+")").html(news_content);
				$(".content .left:eq("+i+") img:first").attr("src", org_path);
				//给news_title添加超链接
				$(".content .news_head:eq("+i+") a").attr("href", "dynamic/news.html?news_id="+news_id);
			}
		}
	});
	
	//前台查看    最新活动   信息
	$.ajax({
		url: service_url + "activity/getFrontActivityList",
		dataType: "jsonp",
		jsonp: "jsonpCallback",
		success: function(data) {
			var resultData = data.data;
			for(var i = 0; i < 3; i++) {
				var acti_id = resultData[i].acti_id;
				var acti_title = resultData[i].acti_title;
				var exp_date = resultData[i].exp_date;
				var org_path = resultData[i].org_path;
				$(".latest_activity img:eq("+i+")").attr("src", org_path);
				$(".latest_activity .bg_img:eq("+i+") div:first").html(acti_title);
				$(".latest_activity .bg_img:eq("+i+") div:eq(1)").html(exp_date);
				$(".latest_activity img:eq("+i+")").click({acti_id: acti_id}, function(event) {
					var acti_id = event.data.acti_id;
					window.location.href = "activity_detail.html?acti_id="+acti_id;
					
				});
				//给标题添加点击事件
				$(".latest_activity .bg_img:eq("+i+") div:first").click({acti_id: acti_id}, function(event) {
					var acti_id = event.data.acti_id;
					window.location.href = "activity_detail.html?acti_id="+acti_id;
					
				});
			}
			//轮播图
			var index = 0;
			size = resultData.length;
			//点击上一张
			$(".left").bind("click", function() {
				if(index == 0) {
					index = size - 1;
				}else {
					index = index -1;
				}
				$(".latest_activity .content div img").removeAttr("src"); //清空图片缓存
				for(var i = 0; i < 3; i++) {
					$(".latest_activity img:eq("+i+")").attr("src", resultData[(index+i)%size].org_path);
					$(".latest_activity .bg_img:eq("+i+") div:first").html(resultData[(index+i)%size].acti_title);
					$(".latest_activity .bg_img:eq("+i+") div:eq(1)").html(resultData[(index+i)%size].exp_date);
					$(".latest_activity img:eq("+i+")").click({acti_id: resultData[(index+i)%size].acti_id}, function(event) {
						var acti_id = event.data.acti_id;
						window.location.href = "activity_detail.html?acti_id="+acti_id;
						
					});
					//给标题添加点击事件
					$(".latest_activity .bg_img:eq("+i+") div:first").click({acti_id: resultData[(index+i)%size].acti_id}, function(event) {
						var acti_id = event.data.acti_id;
						window.location.href = "activity_detail.html?acti_id="+acti_id;
						
					});
				}
			});
			//点击下一张
			$(".right").bind("click", function() {
				if(index == size - 1) {
					index = 0;
				}else {
					index = index + 1;
				}
				$(".latest_activity .content div img").removeAttr("src"); //清空图片缓存
				for(var i = 0; i < 3; i++) {
					$(".latest_activity img:eq("+i+")").attr("src", resultData[(index+i)%size].org_path);
					$(".latest_activity .bg_img:eq("+i+") div:first").html(resultData[(index+i)%size].acti_title);
					$(".latest_activity .bg_img:eq("+i+") div:eq(1)").html(resultData[(index+i)%size].exp_date);
					$(".latest_activity img:eq("+i+")").click({acti_id: resultData[(index+i)%size].acti_id}, function(event) {
						var acti_id = event.data.acti_id;
						window.location.href = "activity_detail.html?acti_id="+acti_id;
						
					});
					//给标题添加点击事件
					$(".latest_activity .bg_img:eq("+i+") div:first").click({acti_id: resultData[(index+i)%size].acti_id}, function(event) {
						var acti_id = event.data.acti_id;
						window.location.href = "activity_detail.html?acti_id="+acti_id;
						
					});
				}
			});
		}
	});
});
