var contentArr=[];
var Request=new UrlSearch(); //实例化

$(function(){
	
	$("#news_img").change(function(){
		var news_img = $("#news_img").val();
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

//获取信息显示在页面可进行修改
function getActivity(acti_id,type){
	var url = requestUrl + "rest/activity/getActivity";
	$.ajax({
		url : url,
		type : 'post',
		dataType : 'jsonp',
		data : {
			acti_id : acti_id
		},
		jsonp : "jsonpCallback",
		success : function(data) {
			var result = parseInt(data.result);
			switch(result){
				case 1000 :
					var resultData = data.data;
					if(type == "show"){//显示页面
						showInfo(resultData);
					}else{
						updateInfo(resultData);
					}
					break;
				case 1001 :
					break;
				default:
					break;
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		},
		timeout : 32000
	});
}


function showInfo(resultData){
	var content = resultData.acti_content;
	$("#acti_title").html(resultData.acti_title);
	$("#acti_status").html(resultData.acti_status_name);
	$("#time").html(resultData.start_time+" 至 "+resultData.end_time);
	$("#acti_img").attr("src",resultData.org_path);
	//新闻内容
	var contentList = content.split("</p>");
	for(var i=0;i<contentList.length-1;i++){
		var para = contentList[i].replace("<p>","");
		var newtr = "";
		if(i == 0){
			newtr = "<tr><td class='title'>内容：</td>";
		}else{
			newtr = "<tr><td class='title'>&nbsp;</td>";
		}
		newtr += "<td colspan='3'><span id='show_"+i+"'></span></td></tr>";
		$("#add").before(newtr);
		$("#show_"+i).html(para);
	}
}

function toUpdateActivity(){
	var acti_id = $("#acti_id").val();
	var page = "manager/activityUpdate.html?acti_id="+acti_id;
	window.parent.$("#mainFrame").attr("src",page);
}


function updateInfo(resultData){
	var content = resultData.acti_content;
	$("#acti_id").val(resultData.acti_id);
	$("#acti_title").val(resultData.acti_title);
	$("#startTime").val(resultData.startTime_date);
	$("#endTime").val(resultData.startTime_date);
	$("#acti_status").val(resultData.acti_status);
	$("#imageid").val(resultData.acti_img);
	$("#img_show").attr("src",resultData.org_path);
	
	//新闻内容
	var contentList = content.split("</p>");
	for(var i=0;i<contentList.length-1;i++){
		var timestamp = new Date().getTime();
		var para = contentList[i].replace("<p>","");
		var newtr = "";
		if(para.indexOf("<img") != -1){//图片
			if(i == 0){
				newtr = "<tr id='add_content_img_"+i+"'><td class='title'>内容</td>";
			}else{
				newtr = "<tr id='add_content_img_"+i+"'><td class='title'>&nbsp;</td>";
			}
			newtr += "<td colspan='3' id='update_img_"+i+"'><span id='update_img_span_"+i+"'>"+para+"</span><a href='javascript:void(0);' onclick='updateContentImg("+i+");'>修改</a><a href='javascript:void(0);' onclick='deleteContentImg("+i+");'>&nbsp;&nbsp;删除</a></td></tr>";
			contentArr[contentArr.length] = "news_content_img_" + i;
		}else{
			if(i == 0){
				newtr = "<tr id='add_content_"+i+"'><td class='title'>内容</td>";
			}else{
				newtr = "<tr id='add_content_"+i+"'><td class='title'>&nbsp;</td>";
			}
			newtr += "<td colspan='3'><textarea id='news_content_text_"+i+"' class='w' name='news_content' cols='200' rows='20'>"+para+"</textarea><a href='javascript:void(0);' onclick='deleteContent("+i+");'>&nbsp;删除</a></td></tr>";
			contentArr[contentArr.length] = "news_content_text_" + i;
		}
		$("#add").before(newtr);
		
	}
}

function updateThemeImg(){
	$("#show_img_tr").hide();
	$("#update_img_tr").show();
}

//修改图片、即显示为可选择上传的内容
function updateContentImg(num){
	var rowContent = "<input type='file' id='news_content_img_"+num+"' name='news_content_img_"+num+"'/>";
	rowContent += "<button onclick='ajaxImageUpload(this,"+num+");' >上传内容图片</button>";
	rowContent += "<span  style='color:red'  ''> 建议 图片尺寸：788*480 (像素) </span>";
	rowContent += "<a href='javascript:void(0);' onclick='delImage(this,"+num+");'>&nbsp;&nbsp;删除</a>";
	var nextRow = "<tr style='display:none;' id='tr_show_"+num+"'><td class='title'>&nbsp;</td><td colspan='3'><img id='content_img_"+num+"' src='' picurl=''/></td></tr>";
	
	$("#update_img_"+num).html(rowContent);
	$("#add_content_img_"+num).after(nextRow);
	
}

//删除图片
function deleteContentImg(num){
	if(window.confirm('你确定要删除该图片吗？')){
		var text_id = "news_content_img_"+num;	
		$("#add_content_img_"+num).remove();
		for(var i=0; i<contentArr.length; i++){
			if(contentArr[i] == text_id){
				contentArr.splice(i, 1);
			}
		}
		$("#add_content_img_"+num).remove();
    }else{
       return false;
    }
}

//删除文本框
function deleteContent(num){
	if(window.confirm('你确定要删除该内容吗？')){
		var text_id = "news_content_text_"+num;
		$("#add_content_"+num).remove();
		for(var i=0; i<contentArr.length; i++){
			if(contentArr[i] == text_id){
				contentArr.splice(i, 1);
			}
		}
		$("#add_content_"+num).remove();
    }else{
       return false;
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

/**
  * 异步上传图片
  */
function ajaxFileUpload() {
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
				$("#update_img_show_tr").show();
			//	$("#update_img_show").attr("src", requestUrl+"rest/image/download?f="+imgUrl);
				$("#update_img_show").attr("src",requestUrl +picUrl);
				$("#update_img_show").attr("picurl",picUrl);
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
	contentArr[contentArr.length] = "news_content_img_" + timestamp;
}


function ajaxImageUpload(obj,time){
	var check = checkImg("news_content_img_"+time);
	if(check){
		$.ajaxFileUpload({
		    url: requestUrl + "rest/image/newsContentImgUpload", //用于文件上传的服务器端请求地址
			secureuri: false, //是否需要安全协议，一般设置为false
			fileElementId: 'news_content_img_'+time, //文件上传域的ID
			dataType: 'json', //返回值类型 一般设置为json
			success: function (data, status){
				var Data = eval('(' + data + ')');
				var imgName = Data.data.imgName;
				var imgUrl = Data.data.imgUrl;
				var picUrl = Data.data.picUrl;
				//{"data":{"imgUrl":"http://127.0.0.1:8080/cx/image/newsInfo/themeImage/news_themeimg_1463371402033.png","imgName":"news_themeimg_1463371402033.png","picUrl":"/image/newsInfo/themeImage/news_themeimg_1463371402033.png"}}
				$("#tr_show_"+time).show();
			//	$("#content_img_"+time).attr("src",requestUrl +"rest/image/download?f=" + imgUrl);
				$("#content_img_"+time).attr("src", requestUrl +picUrl);
				$("#content_img_"+time).attr("picurl",picUrl);
			//	document.getElementById("upload_button").disabled=true;
			},
			error: function (data, status, e){
		    }
		});
	}
	
}

//保存新闻信息
function updateActivity(){
	var acti_id = $("#acti_id").val();
	var acti_title = encodeURIComponent($("#acti_title").val());
	
	var acti_title_length = $("#acti_title").val() ;
	if(acti_title_length.length > 40 )
		{
		
		alert("通知标题不能超过40个字，添加失败!");
		return;
		}
	
	var acti_status = $("#acti_status").val();
	var start_time = $("#startTime").val();
	var end_time = $("#endTime").val();
	var imageid = $("#imageid").val();
	var org_path = $("#update_img_show").attr("src");
	var image_change = "0";
	var adminid = sessionStorage.getItem("adminid");
	
	if(org_path != ""){
		image_change = "1";
		news_img = $("#img_show").attr("src");
	}
	console.log("org_path:"+org_path);
	
	
	var news_content = "";
	if(contentArr.length > 0){
		for (var i=0; i<contentArr.length; i++) {
			var id = contentArr[i];
			if(id.indexOf("news_content_text_") != -1){//文本域区域
				news_content += '<p>'+ $("#" + id).val() +'<\/p>';
			}else{//图片区域
				var time = id.replace("news_content_img_","");
				var path = $("#content_img_" + time).attr("src");
				if(path == "" || path == undefined){
					path = $("#update_img_span_"+time).html();
				}else{
					path = '<img src="'+ path +'"\/>';
				}
				news_content += '<p>'+ path +'<\/p>';
			}
		}
	}
	
	var url= requestUrl + "rest/activity/updateActivity";
	if(acti_title == ""){
		alert("请编辑活动标题");
		return;
	}else if(news_content == ""){
		alert("请编辑活动内容");
		return;
	}else if(start_time ==""){
		alert("请输入一个活动有效期的开始时间");
		return;
	}else if(end_time ==""){
		alert("请输入一个活动有效期的结束时间");
		return ;
	}
	
	$.ajax({
		url : url,
		type : 'post',
		dataType : 'jsonp',
		contentType: "application/x-www-form-urlencoded; charset=utf-8", 
		data : {
			acti_id : acti_id,
			acti_title : acti_title,
			acti_status : acti_status,
			start_time : start_time,
			end_time : end_time,
			org_path : org_path,
			acti_content : news_content,
			image_change : image_change,
			imageid : imageid,
			adminid:adminid
		},
		jsonp : "jsonpCallback",
		//jsonpCallback : "success_jsonpCallback",
		success : function(data) {
			var result = parseInt(data.result);
			var msg = data.msg;
			switch(result){
				case 1000 :
					var resultData = data.data;
					alert("修改成功");
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
	
}


function changeButtonStatus(){
	document.getElementById("upload_button").disabled=false;
}

function doAudit(){
	
	
	$.ajax({
		url :   requestUrl + "rest/adminInfo/selSingleAdmin",
		type : 'post',
		dataType : 'jsonp',
		contentType: "application/x-www-form-urlencoded; charset=utf-8", 
		data : {
			admin_id: sessionStorage.getItem("adminid")
		},
		jsonp : "jsonpCallback",
		success : function(data) {
			var result = parseInt(data.result);
			switch(result){
				case 1000 :
					var resultData = data.data;
					 if(resultData.audit==0){
						 swal("出错啦!", "您不具备审核的权限","error")
						 return;
						 }

						swal({
							title: "你确定吗?",
							text: "此文件将会在您的审核之下发布成功！",
							type: "warning",
							showCancelButton: true,
							confirmButtonColor: '#DD6B55',
							confirmButtonText: '确定, 审核通过!',
							cancelButtonText: "取消!",
							closeOnConfirm: false,
							closeOnCancel: false
						},
						function(isConfirm){
						    if (isConfirm){
						      swal("审核通过", "文件已经成功发布!", "success");
						      audit_jdbc(1);
						    } else {
						      swal("取消审核", "文件未被发布！", "error");
						      audit_jdbc(0);
						    }
						});
					break;
				default: 
					console.log("操作异常");
					break;
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("操作异常");
		},
		timeout : 32000
	});
}


function audit_jdbc(audit_flag){
	var acti_id = Request.acti_id;
	
	$.ajax({
		url :   requestUrl + "rest/activity/updateActivity_Audit",
		type : 'post',
		dataType : 'jsonp',
		contentType: "application/x-www-form-urlencoded; charset=utf-8", 
		data : {audit_flag:audit_flag, acti_id:acti_id},
		jsonp : "jsonpCallback",
		success : function(data) {
			var result = parseInt(data.result);
			var msg = data.msg;
			console.log("result:"+result +" ,msg:"+msg);
			switch(result){
				case 1000 :
					var resultData = data.data;
					console.log("修改成功  :" + resultData.audit_flag);
				
					break;
				default: 
					console.log("操作异常");
					break;
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("操作异常");
		},
		timeout : 32000
	});
	
}

