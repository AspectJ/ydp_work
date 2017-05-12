$(function() {
	// Logo，地区，主菜单
	LogoMenuTextLoad(1);
	// 轮播图
//	carouselTextLoad("index");
	// 底部导航
	bottomTextLoad();
});


var pageCount = 0;
var pageSize = 6;
var offsetNum = 0;
var default_img_zxdt = '../img/yxzx.png';

$(function() {
	
	var href = window.location.href;
	var news_type = href.substring(href.lastIndexOf("=") + 1).replace('#', '');

	//更改标题
	var news_heading = '';
	if(news_type === '0') {
        news_heading = '电影政策';
	}else if(news_type === '1') {
        news_heading = '行业资讯';
    }else if(news_type === '2') {
        news_heading = '院线资讯';
    }else if(news_type === '3') {
        news_heading = '楚湘动态';
    }
    $('.section-header h1').html(news_heading);

    // 初始化数据(显示第一页)
    InitData(0);
    
    function InitData(pageindx) {
    	var url = service_url + "newsinfo/getNewsListByType";
    	var num = 0;
    	var index = pageindx + 1;
    	if(index != 0){
    		num = (index - 1) * pageSize;
    	}
    	
    	$.ajax({
    		type: "POST",
    		url: url,
    		cache: false,
    		dataType: "jsonp",
    		data: {
    			pageSize: pageSize,
    			offsetNum: num,
                news_type: news_type
    		},
    		jsonp: "jsonpCallback",
    		success: function(data) {
    			var result = parseInt(data.result);
    			switch(result) {
    				case 1000:
    					var resultData = data.data;
    					pageCount = data.total;

                        $(".section-body").empty();
    					$("#Pagination").pagination(pageCount, {
    			            callback: pageselectCallback,
    			            prev_text: '« 上一页',
    			            next_text: '下一页 »',
    			            items_per_page: pageSize,     // 每页显示条数
    			            current_page: pageindx,  // 当前页索引,这里0为第一页
    			            num_display_entries: 3,  // 前面显示几个按钮
    			            num_edge_entries: 2  // 后面显示几个按钮
    			        });

                        if(resultData != null && resultData.length > 0) {
                            var content = '';

                            for(var i = 0; i < resultData.length; i++) {
                                content  = '<div class="news-item clearfix">';
                                content += 		'<img class="pointer" src="'+(!!resultData[i].org_path ? resultData[i].org_path : default_img_zxdt)+'" alt="" />';
                                content += 		'<div class="item-info">';
                                content += 			'<div class="item-title pointer">'+resultData[i].news_title+'</div>';
                                content += 			'<div class="item-intro">'+disposeHtmlTag(resultData[i].news_content)+'</div>';
                                content += 			'<div class="item-helper clearfix">';
                                content += 				'<span class="date">'+resultData[i].create_time.substr(0,10)+'</span>';
                                content += 				'<span class="view">'+resultData[i].brows_times+'</span>';
                                content += 			'</div>';
                                content += 		'</div>';
                                content += 	'</div>';

                                $('.section-body').append(content);

                                //给标题添加点击事件
								$('.section-body .item-title:eq('+i+')').bind("click", {news_id: resultData[i].news_id}, function(event) {
										window.location.href = './news.html?news_id=' + event.data.news_id;
										console.log('./news.html?news_id=' + event.data.news_id);
								});
                            }
                        }
                        break;
    				case 1001:
    					break;
    				default:
    					break;
    			}
    		}
    	});
    	
        //处理翻页,page_id为当前页索引(0为第一页)
        function pageselectCallback(page_id, jq) {
            InitData(page_id);
        }
    }

	//查询热门资讯（右侧）
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
			console.log(resultData.length);
			var content = '';
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

});

//查看资讯详细
function showNewsDetail(news_id) {
    window.location.href = "news.html?news_id="+news_id;
}