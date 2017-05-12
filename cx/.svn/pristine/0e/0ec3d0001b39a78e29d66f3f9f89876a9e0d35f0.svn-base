var pageCount = 0;
var pageSize = 18;
var offsetNum = 0;

$(function() {
	// Logo，地区，主菜单
	LogoMenuTextLoad(5);
	// 底部导航
	bottomTextLoad();

	$(".elegant_left .league_theater, .elegant_left .theater_elegant, .elegant_left .theater_elegant").on("click", function(){
		$(".elegant_left .league_theater, .elegant_left .theater_elegant, .elegant_left .theater_elegant").find(".option").removeClass("cur");
		$(".elegant_left .league_theater .zone").hide();
		$(this).find(".option").addClass("cur");
		$(this).find(".zone").show();

		$(".cinemashow").hide();
		$(".cx_elegant").hide();
		$(".cx_distribution").hide();

		$("." + $(this).attr("target")).show();
	});

	//初始化地区列表
	getCityData();

	initInfo();
});

function initInfo(city_number) {
	//初始化页面
	InitData(0);
};

var city_number = "";
function InitData(pageindx) {
	var url = service_url + "cinema/getJoinCinemaInfo";
	var num = 0;
	var index = pageindx + 1;
	if(index != 0){
		num = (index - 1) * pageSize;
	}

	//获取影院风采-->加盟影院展示的数据
	$.ajax({
		url: url,
		type: "POST",
		dataType: "jsonp",
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		jsonp: "jsonpCallback",
		data: {
			pageSize: pageSize,
			offsetNum: num,
			city_number: city_number
		},
		beforeSend: function(){$(".cinemashow .content").empty();},
		complete: function(){
			if($(".cinemashow").height() > 600){
				$(".elegant_left").height($(".cinemashow").height());
			}else{
				$(".elegant_left").height(600);
			}
		},
		success: function(data) {
			var result = data.result;
			switch(result) {
				case 1000:
					var resultData = data.data;
	    			pageCount = data.total;
	    			//分页
	    			if(pageCount / pageSize > 1){
    	    			$("#Pagination").pagination(pageCount, {
    			            callback: pageselectCallback,
    			            prev_text: '上一页',
    			            next_text: '下一页',
    			            items_per_page: pageSize,     // 每页显示条数
    			            current_page: pageindx,  // 当前页索引,这里0为第一页
    			            num_display_entries: 3,  // 前面显示几个按钮
    			            num_edge_entries: 2  // 后面显示几个按钮
    			        });
	    			}

                    var default_img = './img/yyfc.png';
					for(var i = 0; i < resultData.length; i++) {
						var j_name = resultData[i].j_name;
						var content = "<div style='position:relative;float:left'>";
							content += "<img src='"+(!!resultData[i].org_path ? resultData[i].org_path : default_img)+"'/>";
							content += "<div>"+j_name+"</div>";
							content += "</div>";
						$(".cinemashow div:eq(1)").append(content);
					}
					break;
				case 1304:
					toolTip("对不起，该地区尚无加盟影院！");
					break;
			}
		}
	});

	//处理翻页,page_id为当前页索引(0为第一页)
    function pageselectCallback(page_id, jq) {
        InitData(page_id);
    }
}

//获取影院风采-->院线风采展示的数据
$(function(){
	//影院环境展示
	$.ajax({
		url: service_url + "cinema/getCinemaStyle",
		data: {
			s_type: 0 //影院环境
		},
		dataType: "jsonp",
		jsonp: "jsonpCallback",
		success: function(data) {
			var resultData = data.data;
/*			for(var i = 0; i < resultData.length; i++) {
				var org_path = resultData.org_path;
				console.log(org_path);
				$(".cx_elegant img").attr("src", org_path);
			}*/
		}
	});

	//休闲娱乐展示
	$.ajax({
		url: service_url + "cinema/getCinemaStyle",
		data: {
			s_type: 1 //休闲娱乐展示
		},
		dataType: "jsonp",
		jsonp: "jsonpCallback",
		success: function(data) {
			var resultData = data.data;
/*			for(var i = 0; i < resultData.length; i++) {
				var org_path = resultData.org_path;
				console.log(org_path);
				$(".cx_elegant img").attr("src", org_path);
			}*/
		}
	});

	//户外活动展示
	$.ajax({
		url: service_url + "cinema/getCinemaStyle",
		data: {
			s_type: 2 //户外活动展示
		},
		dataType: "jsonp",
		jsonp: "jsonpCallback",
		success: function(data) {
			var resultData = data.data;
/*			for(var i = 0; i < resultData.length; i++) {
				var org_path = resultData.org_path;
				console.log(org_path);
				$(".cx_elegant img").attr("src", org_path);
			}*/
		}
	});
});


/**
 * 初始化地区列表
 */
function getCityData(){
	ajaxRequest("join/getCityData", "GET", true, {},
		function(data) {
			var resultData = data.data;
			var cityLetter = {};
			for(var i = 0; i < resultData.length; i++) {
				var city_number = resultData[i].city_number;
				var city_name = resultData[i].city_name;
				var firstLetter = makePy(city_name).toString().substring(0,1);
				if(cityLetter[firstLetter] == null){
					cityLetter[firstLetter] = '<a city="'+ city_number +'">'+ city_name +'</a>';
				}else{
					cityLetter[firstLetter] += '<a city="'+ city_number +'">'+ city_name +'</a>';
				}
			}
			var zoneHtml = '<ol>';
			var letter = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
			for(var i = 0; i < letter.length; i++) {
				if(cityLetter[letter[i]] != null){
					zoneHtml += '<li id="city-'+ letter[i] +'"><p class="cf">';
					zoneHtml += '<span class="label"><strong>'+ letter[i] +'</strong></span>';
					zoneHtml += '<span>' + cityLetter[letter[i]] + '</span></p></li>';
				}
			}
			zoneHtml += '</ol>';
			$(".zone").html(zoneHtml);
		}
		, null, null,
		function(){
			//为每个地区添加点击事件
			$(".zone a").bind("click", function() {
				$(".zone a").removeClass("cur");
				$(this).addClass("cur");
				city_number = $(this).attr("city");
				if(typeof(city_number) == "undefined") {
					city_number = "";
				}
				InitData(0);

				if($("." + $(this).attr("target")).height() > 300){
					$(".elegant_left").height($("." + $(this).attr("target")).height());
				}
			});
		}
	);
}
