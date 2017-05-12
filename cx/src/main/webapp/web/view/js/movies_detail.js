$(function() {
	// Logo，地区，主菜单
	LogoMenuTextLoad(3);
	// 底部导航
	bottomTextLoad();

	var movieid = GetQueryString("movieid");

	var param = {};
	param.type = 0;
	param.movieid = movieid;
	param.cityCode = "430100";

	$.when(
		$.ajax({
	        url: service_url + "movie/showing",
	        data: param,
	        dataType: 'jsonp',
	        jsonp: "jsonpCallback",
	        async: false,
	    }),
	    $.ajax({
	        url: service_url + "movie/movieDetail",
	        data: param,
	        dataType: 'jsonp',
	        jsonp: "jsonpCallback",
	        async: false,
	    })
	).done(function(data1, data2){
	    	var movies = data1[0].data;
			showing(movies);

			var movie = data2[0].data;
			movieDetail(movie);
	}).fail(function(){});
});


/**
 * 其他热映影片
 */
	function showing(movies){
		var other_html = '';
		var length = movies.length > 10 ? 10 : movies.length;
		for(var i=0; i<length; i++){
			var movie = movies[i];
			other_html += "<li onclick='javascript:CommAjaxLoad(\"movie/movieDetail\",{movieid:"+ movie.movieid +"}, function(data){movieDetail(data);});'><span "+ (i < 3 ? "class='red'":"") +">"+ (i+1) +"</span><span class='noti_title'>《"+ truncate(movie.moviename, 15) +"》</span></li>";
		}
		$(".other ul").html(other_html);
	}


/**
 * 影片详情
 */
function movieDetail(movie){
	$("#moviename, .breadcrumb div:last").text(movie.showName);
	$("#remark").text(movie.remark);
	$("#director").text(movie.director);
	$("#leadingRole").text(movie.leadingRole);
	$("#movieType").text(movie.movieType);
	$("#moviearea").text(movie.moviearea);
	$("#duration").text(movie.duration);
	$("#openDay").text(movie.openDay);
	$("#feature").text(movie.feature);

	var index = 1;
	if(movie.stagePhoto != null){
		var photos = movie.stagePhoto.split("@");
		$("#poster").attr("src", photos[0] + "!500");
		var html = '';
		for (var i = 0; i < photos.length; i++) {
			html += '<div class="swiper-slide"><img src="' + photos[i] + '" /></div>';
		}
		$('.stills .swiper-wrapper').html(html);


    var swiper = new Swiper('.stills', {
        slidesPerView: 'auto',
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
        spaceBetween: 30
    });
		// $("#stagePhoto img").attr("src", photos[index] + "!500");
		// $("#stagePhoto img").attr("index", index);
		// $(".last").on("click", function(){
		// 	if($("#stagePhoto img").attr("index") > 1){
		// 		index = parseInt($("#stagePhoto img").attr("index")) - 1;
		// 		$("#stagePhoto img").attr("src", photos[index] + "!500");
		// 		$("#stagePhoto img").attr("index", index);
		// 	}
		// });
		// $(".next").on("click", function(){
		// 	if($("#stagePhoto img").attr("index") < photos.length - 1){
		// 		index = parseInt($("#stagePhoto img").attr("index")) + 1;
		// 		$("#stagePhoto img").attr("src", photos[index] + "!500");
		// 		$("#stagePhoto img").attr("index", index);
		// 	}
		// });
	}
}


function getNoticeDetail(noti_id) {
	window.location.href = "/homeland/notice.html?noti_id="+noti_id;
}
