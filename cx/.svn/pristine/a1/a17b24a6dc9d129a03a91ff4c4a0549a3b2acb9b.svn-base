var contentArr=[];
$(function(){
	//加载启动时间new Date()
	$("#startTime").click(function(){
		WdatePicker({minDate:new Date(),maxDate:'#F{$dp.$D(\'endTime\')}'});
	});
	
	$("#endTime").click(function(){
		WdatePicker({minDate:'#F{$dp.$D(\'startTime\')}',maxDate:''});
	});
	
	$("#news_img").change(function(){
		var news_img = $("#news_img").val();
		console.log("pic:"+news_img);
		if(news_img == ""){
			alert("请选择一张图片");
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

/**
  * 异步上传图片
  */
function ajaxThemeImageUpload() {
	var check = checkImg("news_img");
	if(check){
		var oldImg = "activity";
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
				$("#img_show").show();
			//	$("#news_img_show").attr("src",requestUrl +"rest/image/download?f=" + imgUrl);
				$("#news_img_show").attr("src", requestUrl +picUrl);
				$("#news_img_show").attr("picurl",picUrl);
				document.getElementById("upload_button").disabled=true;
			    
			//	alert(requestUrl +"rest/image/download?f=" + imgUrl);
				
			},
			error: function (data, status, e){
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
	console.log("uploadImg:"+uploadImg);
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
		newtr+= "<button onclick='ajaxImageUpload(this,"+timestamp+");' >上传内容图片</button>";
		newtr+="<span  style='color:red'  ''> 建议 图片尺寸：788*480 (像素) </span>";
		newtr+= "<a href='javascript:void(0);' onclick='delImage(this,"+timestamp+");'>&nbsp;&nbsp;删除</a></td></tr>";
		newtr+= "<tr style='display:none;' id='tr_show_"+timestamp+"'><td class='title'>&nbsp;</td><td colspan='3'><img id='content_img_"+timestamp+"' src='' picurl=''/></td></tr>";
	$("#add").before(newtr);
	console.log("newtr:"+newtr);
	contentArr[contentArr.length] = "news_content_img_" + timestamp;
}


function ajaxImageUpload(obj,time){
	var check = checkImg("news_content_img_"+time);
	if(check){
		var oldImg = "activity";
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
				console.log("picUrl:"+picUrl);
				//{"data":{"imgUrl":"http://127.0.0.1:8080/cx/image/newsInfo/themeImage/news_themeimg_1463371402033.png","imgName":"news_themeimg_1463371402033.png","picUrl":"/image/newsInfo/themeImage/news_themeimg_1463371402033.png"}}
				$("#tr_show_"+time).show();
			//	$("#content_img_"+time).attr("src",requestUrl +"rest/image/download?f=" + imgUrl);
				$("#content_img_"+time).attr("src", requestUrl +picUrl);
				$("#content_img_"+time).attr("picurl",picUrl);
			
			},
			error: function (data, status, e){
		    }
		});
	}
	
}

//保存新闻信息
function addActivity(){
	var cinemaid = sessionStorage.getItem("cinemaid");
	var acti_title = encodeURIComponent($("#acti_title").val());
//	var acti_title = $("#acti_title").val();
	
	var acti_title_length = $("#acti_title").val() ;
	if(acti_title_length.length > 40 )
		{
		
		alert("通知标题不能超过40个字，添加失败!");
		return;
		}
	
	
	var acti_status = $("#acti_status").val();
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	var news_img = $("#news_img_show").attr("src");
	var adminid = sessionStorage.getItem("adminid");

	console.log("acti_status:"+acti_status);
	var acti_content = "";//'<p>'+ $("#news_content").val() +'<\/p>';
	if(contentArr.length > 0){
		for (var i=0; i<contentArr.length; i++) {
			var id = contentArr[i];
			if(id.indexOf("news_content_text_") != -1){//文本域区域
				acti_content += '<p>'+ $("#" + id).val() +'<\/p>';
			}else{//图片区域
				var time = id.replace("news_content_img_","");
				acti_content += '<p><img src="'+ $("#content_img_" + time).attr("src") +'"\/><\/p>';
			}
		}
	}

	var url= requestUrl + "rest/activity/addActivity";
	if(acti_title == ""){
		alert("请编辑活动标题");
		return;
	}
	else if(news_img == ""){
		if(window.confirm("您确定不上传主题图片?如果是，可能会造成您的活动在首页不能显示！")) {
			
		}else {
			return false;
		}
		
	}
	else if(acti_content == ""){
		alert("请编辑活动内容");
		return;
	}else if(startTime ==""){
		alert("请输入一个活动有效期的开始时间");
		return;
	}else if(endTime ==""){
		alert("请输入一个活动有效期的结束时间");
		return ;
	}
	
	$.ajax({
		url : url,
		type : 'post',
		dataType : 'jsonp',
		contentType: "application/x-www-form-urlencoded; charset=utf-8", 
		data : {
			cinemaid : cinemaid,
			acti_title : acti_title,
			acti_status : acti_status,
			acti_img : news_img,
			start_time : startTime,
			end_time : endTime,
			acti_content : acti_content,
			adminid:adminid
		},
		jsonp : "jsonpCallback",
		//jsonpCallback : "success_jsonpCallback",
		success : function(data) {
			var result = parseInt(data.result);
			var msg = data.msg;
			console.log("result:"+result +" ,msg:"+msg);
			switch(result){
				case 1000 :
					var resultData = data.data;
					alert("新增成功");
					var page = "manager/activityList.html";
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
	//保存当前活动开始时间,用以给更新活动时的开始时间赋值
    var startTime_value =  $("#startTime").val();
    sessionStorage.setItem("startTime_value",startTime_value);
}

function changeButtonStatus(){
	document.getElementById("upload_button").disabled=false;
}


