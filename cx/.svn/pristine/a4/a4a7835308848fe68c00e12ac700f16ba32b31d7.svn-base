//左侧页面
$(function() {
	// Logo，地区，主菜单
	LogoMenuTextLoad(1);
	
	// 底部导航
	bottomTextLoad();
	
	var href = window.location.href;
	var news_id = "";
	var index = href.lastIndexOf("=");

	if(index != -1) {
		news_id = href.substring(index+1);
	}else {
		alert("news_id错误");
	}


    //查询资讯详细
    $.when(
    	$.ajax({
			url: service_url + "newsinfo/getNewsDetail",
			type: "POST",
			data: { news_id: news_id},
			dataType: "jsonp",
			jsonp: "jsonpCallback",
    	})
	).then(function(data){
        var resultData = data.data;
        //查询热门资讯（右侧）
        getHotIntelligence(resultData.news_type);

		//装填资讯详细数据
        if(resultData != null){
            $('.section-body .news-title').html(resultData.news_title);			//title
            $('.section-body .news-helper .date').html(resultData.create_time);	//create_time
            $('.section-body .news-helper .view').html(resultData.brows_times);	//brows_times
            $('.section-body .news-content').html(resultData.news_content);		//news_content

		//上一条资讯
		if(data.PreviorsMap != null && data.PreviorsMap !='' && typeof(data.PreviorsMap) != 'undefined') {
				$('.news-pagination:first a').html(data.PreviorsMap.news_title);
				$('.news-pagination:first a').bind('click', {news_id: data.PreviorsMap.news_id}, function(event){showNewsDetail(event.data.news_id)})
		} else {
            $('.news-pagination:first a').html('暂无资讯');
		}

		//下一条资讯
		if(data.NextMap != null && data.NextMap !='' && typeof(data.NextMap) != 'undefined') {
			$('.news-pagination:last a').html(data.NextMap.news_title);
			$('.news-pagination:last a').bind('click', {news_id: data.NextMap.news_id}, function(event){showNewsDetail(event.data.news_id)})
		} else {
			$('.news-pagination:first a').html('暂无资讯');
		}

        }

        //面包屑(导航栏)
        var news_heading = '';
        if(resultData.news_type == '0') {
            news_heading = '电影政策';
        }else if(resultData.news_type == '1') {
            news_heading = '行业资讯';
        }else if(resultData.news_type == '2') {
            news_heading = '院线资讯';
        }else if(resultData.news_type == '3') {
            news_heading = '楚湘动态';
        }
        $('.breadcrumb div:eq(1)').html(news_heading);
        $('.breadcrumb div:eq(1)').bind('click', {news_type: resultData.news_type}, function(event){window.location.href = './more.html?news_type=' + event.data.news_type;});
	});

});

//查询热门资讯
function getHotIntelligence(news_type) {
    $.ajax({
        type: "POST",
        url: service_url + "newsinfo/getHotIntelligence",
        cache: false,
        dataType: "jsonp",
        data: {
            pageSize: 3,
            offsetNum: 0,
            news_type: news_type
        },
        jsonp: "jsonpCallback",
        success: function (data) {
            var resultData = data.data;
            var content = '';
            var default_img_zxdt = "../img/yxzx.png";
            $('.hot-news ul').empty();
            if(resultData != null && resultData.length > 0) {
                for(var i = 0; i < resultData.length; i++) {
                    content  = 	'<li>';
                    content += 		'<img src="'+(!!resultData[i].org_path ? resultData[i].org_path :  default_img_zxdt)+'" alt="">';
                    content += 		'<div class="news-title" onclick="showNewsDetail('+resultData[i].news_id+')">'+ resultData[i].news_title+'</div>';
                    content += 	'</li>';
                    $('.hot-news ul').append(content);
                }
            }
        }
    });
}

function showNewsDetail(news_id) {
	window.location.href = "news.html?news_id="+news_id;
}
