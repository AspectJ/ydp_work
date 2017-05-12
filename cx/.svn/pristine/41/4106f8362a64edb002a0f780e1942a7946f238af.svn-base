var contentArr=[];
$(function(){
    $("#btnimg").append(" <span  style='color:red'  ''> 建议 图片尺寸：310*145 (像素) </span>");
    $("#btnimg").append("<br/>");
    $("#btnimg").append("<div class='cropper_div' >");
    $("#btnimg").append(" <img style='display:none;'  src=''  id='themeimg' picurl='' />");
    $("#btnimg").append("</div>");
	$("#news_img").change(function(){
		var news_img = $("#news_img").val();
		if(news_img == ""){
			alert("请选择一张图片!");
			return false;
		}else{
			var extStart = news_img.lastIndexOf(".");
			var ext = news_img.substring(extStart,news_img.length).toUpperCase();
			if(ext!=".BMP" && ext!=".PNG" && ext!=".GIF" && ext!=".JPG" && ext!=".JPEG"){
				alert("图片限于png,gif,jpeg,jpg,bmp格式");
				$("#news_img").val("");
				return;
			}
		}
	});
	
});

//检查是否选择图片上传
function checkImg(id){
	var news_img = $("#"+id).val();
	if(news_img == ""){
		alert("请选择一张图片!!");
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

	
	

/**
  * 异步上传图片
  */
function ajaxThemeImgUpload() {
	var check = checkImg("news_img");
	if(check){
		var oldImg = "newsinfo";
		console.log("进入上传主题图片的异步请求方法1");
		$.ajaxFileUpload({
		    url: requestUrl + "rest/image/newsThemeImgUpload", //用于文件上传的服务器端请求地址
			secureuri: false, //是否需要安全协议，一般设置为false
			fileElementId: 'news_img', //文件上传域的ID
			dataType: 'json', //返回值类型 一般设置为json
			data : {oldImg : oldImg},
			success: function (data, status){
				
				var Data = eval('(' + data + ')');
				var imgName = Data.data.imgName;
				var imgUrl = Data.data.imgUrl;
				var picUrl = Data.data.picUrl;
			
				//{"data":{"imgUrl":"http://127.0.0.1:8080/cx/image/newsInfo/themeImage/news_themeimg_1463371402033.png","imgName":"news_themeimg_1463371402033.png","picUrl":"/image/newsInfo/themeImage/news_themeimg_1463371402033.png"}}
				//$("#img_show").show();
				
			//	alert( requestUrl +"rest/image/download?f=" + imgUrl );
				
		//		$("#themeimg").attr("src",requestUrl +"rest/image/download?f=" + imgUrl);
				$("#themeimg").attr("src", requestUrl +picUrl );
				$("#themeimg").attr("picurl",picUrl);
				$("#themeimg").show();
				document.getElementById("upload_button").disabled=true;
		        
				 console.log("进入上传主题图片的异步请求方法2");
			
			},
			error: function (data, status, e){
				console.log("异步上传主题图片出错啦！！" + status);
			}
		});
			
	}
    
}



// 删除文本
function delText(obj,time){
	var text_id = "news_content_text_"+time;
	$("#add_content_"+time).remove();
	for(var i=0; i<contentArr.length; i++){
		if(contentArr[i] == text_id){
			contentArr.splice(i, 1);
		}
	}
	$("#add_content_"+time).remove();
}

function delImage(obj,time){
	var uploadImg = $("#content_img_"+time).attr("src");
	if(uploadImg == ""){
		delImageLabel(time);
	}else{
		if(window.confirm('你确定要删除该图片吗？')){
			
			delImageLabel(time);
	    }else{
	       return false;
	    }
	}
	
}

//删除已生成的图片标签
function delImageLabel(time){
	var text_id = "news_content_img_"+time;	
	$("#add_content_img_"+time).remove();
	$("#tr_show_"+time).remove();
	for(var i=0; i<contentArr.length; i++){
		if(contentArr[i] == text_id){
			contentArr.splice(i, 1);
		}
	}
	$("#add_content_img_"+time).remove();
}

//添加文本区域
function addTextArea(){
	var timestamp = new Date().getTime();
	var newtr = "<tr id='add_content_"+timestamp+"'><td class='title'>&nbsp;</td><td colspan='3'><textarea id='news_content_text_"+timestamp+"' class='w' cols='200' rows='20'></textarea>";
		newtr+= "<a href='javascript:void(0);' onclick='delText(this,"+timestamp+");'>&nbsp;&nbsp;删除</a></td></tr>";
	$("#add").before(newtr);
	contentArr[contentArr.length] = "news_content_text_" + timestamp;
}

//添加图片区域
function addImage(){
	var timestamp = new Date().getTime();
	var newtr = "<tr id='add_content_img_"+timestamp+"'><td class='title'>&nbsp;</td><td colspan='3'><input id='news_content_img_"+timestamp+"' type='file' name='news_content_img_"+timestamp+"'/>";
		newtr+= "<button onclick='ajaxImageUpload(this,"+timestamp+");' >上传内容图片</button> <span  style='color:red'  ''> 建议 图片尺寸：788*480 (像素) </span>";
		newtr+= "<a href='javascript:void(0);' onclick='delImage(this,"+timestamp+");'>&nbsp;&nbsp;&nbsp删除</a></td></tr>";
		newtr+= "<tr style='display:none;' id='tr_show_"+timestamp+"'><td class='title'>&nbsp;</td><td colspan='3'><img id='content_img_"+timestamp+"' src='' picurl=''/></td></tr>";
	$("#add").before(newtr);
	contentArr[contentArr.length] = "news_content_img_" + timestamp;
}


function ajaxImageUpload(obj,time){
	var check = checkImg("news_content_img_"+time);
	if(check){
		var oldImg = "newsinfo";
		$.ajaxFileUpload({
		    url: requestUrl + "rest/image/newsContentImgUpload", //用于文件上传的服务器端请求地址
			secureuri: false, //是否需要安全协议，一般设置为false
			fileElementId: 'news_content_img_'+time, //文件上传域的ID
			dataType: 'json', //返回值类型 一般设置为json
			data : {oldImg : oldImg},
			success: function (data, status){
				var Data = eval('(' + data + ')');
				var imgName = Data.data.imgName;
				var imgUrl = Data.data.imgUrl;
				var picUrl = Data.data.picUrl;
				$("#tr_show_"+time).show();
		//		$("#content_img_"+time).attr("src",requestUrl +"rest/image/download?f=" + imgUrl);
				$("#content_img_"+time).attr("src", requestUrl +picUrl);
				$("#content_img_"+time).attr("picurl",picUrl);
		
		//		document.getElementById("upload_button").disabled=true;
			//	alert( requestUrl +"rest/image/download?f=" + imgUrl );
			},
			error: function (data, status, e){
		    }
		});
	}
	
}

//保存新闻信息
function addNewsInfo(){
	var cinemaid = sessionStorage.getItem("cinemaid");
	var news_title = encodeURIComponent($("#news_title").val());
	var news_title_length = $("#news_title").val() ;
	if(news_title_length.length > 40 )
		{
		
		alert("新闻标题不能超过40个字，添加失败!");
		return;
		}
	var news_status = $("#news_status").val();
	var news_type = $("#news_type").val();
	var news_img = $("#themeimg").attr("src");
	
	
	var news_content = "";//'<p>'+ $("#news_content").val() +'<\/p>';
	if(contentArr.length > 0){
		for (var i=0; i<contentArr.length; i++) {
			var id = contentArr[i];
			if(id.indexOf("news_content_text_") != -1){//文本域区域
				news_content += '<p>'+ $("#" + id).val() +'<\/p>';
			}else{//图片区域
				var time = id.replace("news_content_img_","");
				news_content += '<p><img src="'+ $("#content_img_" + time).attr("src") +'"\/><\/p>';
			}
		}
	}

	var url= requestUrl + "rest/newsinfo/addNewsInfo";
	if(news_title == ""){
		alert("请编辑新闻标题");
		return;
	}
	else if(news_img == ""){
		if(window.confirm("您确定不上传主题图片?如果是，可能会造成您的资讯在首页不能置顶到第一条！")){
			
		}else {
			return false;
		}
	}
	else if(news_content == ""){
		alert("请编辑新闻内容");
		return;
	}
	
	$.ajax({
		url : url,
		type : 'post',
		dataType : 'jsonp',
		contentType: "application/x-www-form-urlencoded; charset=utf-8", 
		data : {
			cinemaid : cinemaid,
			news_title : news_title,
			news_status : news_status,
			news_type : news_type,
			news_img : news_img,
			news_content : news_content,
			author: sessionStorage.getItem("adminname")
		},
		jsonp : "jsonpCallback",
		//jsonpCallback : "success_jsonpCallback",
		success : function(data) {
			var result = parseInt(data.result);
			var msg = data.msg;
			switch(result){
				case 1000 :
					var resultData = data.data;
					alert("新增成功");
					var page = "manager/newsInfoList.html";
					window.parent.$("#mainFrame").attr("src",page);
					break;
				default: 
					alert("操作异常");
					break;
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		    alert("操作异常");
		},
		timeout : 32000
	});
	
}

function changeButtonStatus(){
	document.getElementById("upload_button").disabled=false;
}



