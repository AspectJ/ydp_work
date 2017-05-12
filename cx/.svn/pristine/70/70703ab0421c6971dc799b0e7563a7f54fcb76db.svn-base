$(function() {
	// Logo，地区，主菜单
	LogoMenuTextLoad(1, "city");
	// 轮播图
//	carouselTextLoad("index");
	// 底部导航
	bottomTextLoad(1800);
	
	// 热映与即将上映切换
	$(".film .showing .film_lab span").on("click", function(){
		$(".film .showing .film_lab span").removeClass("cur");
		$(this).addClass("cur");
		// 加载数据
		var param = {};
		param.type = $(this).attr("type");
		param.cityCode = "430100";
		CommAjaxLoad("movie/showing", param, "showing");
	});
	
	loadHtml(); // 加载数据
});

/**
 * 加载数据 
 */
function loadHtml(){
	var param = {};
	param.type = 0;
	param.cityCode = "430100";
	
	$.when(
		$.ajax({
	        url: service_url + "movie/showing",
	        data: param,
	        dataType: 'jsonp',
	        async: false,
	    }),
		$.ajax({
	        url: service_url + "cinema/cinemaList",
	        data: param,
	        dataType: 'jsonp',
	        async: false,
	    })
		).done(function(data1, data2){
	    	var movies = data1[0].data;
			showing(movies); // 上映影片(真在热映、即将上映)
			rankingShowing(movies); // 影片排行
			
			var cinemas = data2[0].data;
			hotCinemas(cinemas); // 热门影院
		}).fail(function(){});
}


/**
 * 上映影片(真在热映、即将上映)
 * @param {Object} movies
 */
function showing(movies){
	var films_html = '';
	films_html += '<table>';
	films_html +=   '<tr>';
	
	for(var i=0; i<10; i++){
		var movie = movies[i];
		movie.director = "乔恩.费如";
		movie.type = "剧情";
		movie.area = "大陆";
		movie.language = "国语";
		
		films_html += '<td>';
		films_html += "<div class='showmovie' style='background-image: url("+ movie.poster +"!150);'>"; 
		films_html +=   "<div class='movie_mess'>";
		films_html +=     "<p>导演："+ movie.director +"</p>";
		films_html +=     "<p>主演："+ movie.leadingRole +"</p>";
		films_html +=     "<p>类型："+ movie.type +"</p>";
		films_html +=     "<p>地区："+ movie.area +"</p>";
		films_html +=     "<p>语言："+ movie.language +"</p>";
		films_html +=   "</div>";
		films_html +=   "<p class='moviename'>"+ truncate(movie.moviename, 8) +"<span>"+ (movie.remark != null ? movie.remark : "") +"</span></p>";
		films_html +=   '<div class="buy_ticket" movieid="'+ movie.movieid +'">选座购票</div>';
		films_html += "</div>";
		films_html += '</td>';
		
		if(i == 4){films_html += '</tr><tr>';}
	}
	
	films_html +=   '</tr>';
	films_html += '</table>';
	$(".films").html(films_html);
	
//	// 购票
	$(".buy_ticket").on("click", function(){
		window.location.href = "movies/plan.html?movieid=" + $(this).attr("movieid");
	});
	
	$(".showmovie").bind("mouseover", function(){
		$(this).find(".movie_mess").addClass("mouseover");
		$(this).find(".movie_mess p").show("normal");
	});
	$(".showmovie").on("mouseleave", function(){
		$(this).find(".movie_mess").removeClass("mouseover");
		$(".showmovie").find(".movie_mess p").hide("normal");
	});
}


/**
 * 影片排行
 * @param {Object} movies
 */
function rankingShowing(movies){
	var hot_html = '<ul>';
	var length = movies.length > 7 ? 7 : movies.length;
	for(var i=0; i<length; i++){
		hot_html += '<li><div' + (i<3? ' class="hostest"' : "") + '>' + (i + 1) + '</div><a href="movies/plan.html?movieid=' + movies[i].movieid + '" title="'+ movies[i].moviename +'">'+ truncate(movies[i].moviename, 6) +'</a></li>';
	}
	hot_html += '</ul>';
	$(".hot").html(hot_html);
}


/**
 * 热门影院
 * @param {Object} cinemas
 */
function hotCinemas(cinemas){
	var cinemas_html = '';
	var length = cinemas.length > 4 ? 4 : cinemas.length;
	for(var i=0; i<length; i++){
		cinemas_html += '<div class="cinema_div">';
		cinemas_html += '<div class="cinemaName">'+ cinemas[i].cinemaName +'</div>';
		cinemas_html += '<div class="cinemaAddress"><img src="img/movie_local.png">'+ cinemas[i].address +'</div>';
		cinemas_html += '<button class="cinema_buy_ticket">选座购票</button>';
		cinemas_html += '</div>';
	}
	$(".cinemas").html(cinemas_html);
}

