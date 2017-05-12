function ajaxCarouselUpload(carousel_id) {
	var check = checkImg(carousel_id);
	if(check){
		var oldImg = "carousel";
	
		$.ajaxFileUpload({
		    url: requestUrl + "rest/image/newsThemeImgUpload", //用于文件上传的服务器端请求地址
			secureuri: false, //是否需要安全协议，一般设置为false
			fileElementId: carousel_id, //文件上传域的ID
			dataType: 'json', //返回值类型 一般设置为json
			data : {oldImg : oldImg},
			success: function (data, status){
				var Data = eval('(' + data + ')');
				var imgName = Data.data.imgName;
				var imgUrl = Data.data.imgUrl;
				var picUrl = Data.data.picUrl;
				var carouselUrl = requestUrl + picUrl;
				ajaxUpdateCarousel(carouselUrl,carousel_id);
				alert("上传成功！");
			
			    
			
			},
			error: function (data, status, e){
				console.log("异步上传主题图片出错啦！！" + status);
				alert("上传失败！");
			}
		});
			
	}
    
}


//检查是否选择图片上传
function checkImg(id){
	var news_img = $("#"+id).val();
	if(news_img == ""){
		alert("请选择一张图片");
		return false;
	}else{
		var extStart = news_img.lastIndexOf(".");
		var ext = news_img.substring(extStart,news_img.length).toUpperCase();
		if(ext!=".BMP" && ext!=".PNG" && ext!=".GIF" && ext!=".JPG" && ext!=".JPEG"){
			alert("图片限于png,gif,jpeg,jpg,bmp格式");
			$("#news_img").val("");
			return false;
		}else{
			return true;
		}
	}
}

function ajaxUpdateCarousel(carouselUrl,carousel_id){
    $.ajax( {
    	type:"POST",
    	cache:false,
    	dataType:"json",
    	data:{carouselUrl:carouselUrl,
    		carousel_id:carousel_id},
    	url:requestUrl + "rest/carousel/updateCarousel",
    	jsonp:"jsonpCallback",
    	success:function(data) {
    		var result = parseInt(data.result);
			switch(result){
				case 1000 :
					var resultData = data.data;    					
		            
					break;
				case 1001:
				break;
				defaule:
				break;
    	}
    	}});
}