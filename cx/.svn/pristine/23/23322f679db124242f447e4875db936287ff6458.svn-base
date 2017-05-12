$(function() {
	// Logo，地区，主菜单
	LogoMenuTextLoad(1, "city");
	// 轮播图
//	carouselTextLoad("index");
	// 底部导航
	bottomTextLoad(1450);
	
	$(".choose .options .option_value .area li").on("click", function() {
		$(".choose .options .option_value .area li").removeClass("area_cur");
		$(this).addClass("area_cur");
	});
	$(".choose .options .option_value .cinema li").on("click", function() {
		$(".choose .options .option_value .cinema li").removeClass("cinema_cur");
		$(this).addClass("cinema_cur");
	});
	$(".choose .options .option_value .time li").on("click", function() {
		$(".choose .options .option_value .time li").removeClass("time_cur");
		$(this).addClass("time_cur");
	});
	
	$(".plans .plan .buy_ticket").on("click", function(){
		window.location.href = "movies/seat.html";
	});
	
	loadHtml(); // 加载数据
});


/**
 * 加载数据 
 */
function loadHtml(){
	var movieid = GetQueryString("movieid");
	
	var param = {};
	param.movieid = movieid;
	
	$.when(
		$.ajax({
	        url: service_url + "movie/movieDetail",
	        data: param,
	        dataType: 'jsonp',
	        async: false,
	    })
		).done(function(data){
			var movie = data.data;
	    	movieMess(movie); // 影片信息
		}).fail(function(){});
}


/**
 * 影片信息
 */
function movieMess(movie){
	var movie_mess_html = '';
	movie_mess_html += '<div class="movie_name">'+ movie.showName +'<span>'+ movie.remark +'</span></div>';
	movie_mess_html += '<hr />';
	movie_mess_html += '<img class="poster" src="'+ movie.poster +'!200" />';
	movie_mess_html += '<div class="message">';
	movie_mess_html += '<p>导演：'+ movie.director +'</p>';
	movie_mess_html += '<p>主演：'+ movie.leadingRole +'</p>';
	movie_mess_html += '<p>类型：'+ movie.movieType +'</p>';
	movie_mess_html += '<p>地区：'+ movie.moviearea +'</p>';
	movie_mess_html += '<p>语言：英语</p>';
	movie_mess_html += '<p>片长：'+ movie.duration +'分钟</p>';
	movie_mess_html += '<p class="feature" title="'+ movie.feature.trim() +'">剧情介绍：'+ truncate(movie.feature.trim(), 200) +'</p>';
	movie_mess_html += '</div>';
	movie_mess_html += '<div class="showtime">上映时间：2016-05-03</div>';
	movie_mess_html += '<div class="stagePhoto">';
	movie_mess_html += '<img src="'+ movie.stagePhoto.split("@")[1] +'!150"/>';
	movie_mess_html += '<div>(剧照：1/'+ movie.stagePhoto.split("@").length +'张)</div>';
	movie_mess_html += '</div>';
	$("#movie_mess").html(movie_mess_html);
}
