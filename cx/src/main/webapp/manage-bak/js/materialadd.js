var contentArr=[];

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
		var oldImg = "notice";
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
function addMaterial(){
	var cinemaid = sessionStorage.getItem("cinemaid");
	var material_name = encodeURIComponent($("#material_name").val());
	
	var material_name_length = $("#material_name").val() ;
	if(material_name_length.length > 40 )
		{
		
		alert("素材标题不能超过40个字，添加失败!");
		return;
		}
	
//	var download_url = $("#download_url").val();
//	var fetch_code = $("#fetch_code").val();
//	var remark = $("#remark").val();
	
	var material_content = $("#material_content").val();
	var adminid = sessionStorage.getItem("adminid");
	

	var url= requestUrl + "rest/material/addMaterial";
	if(material_name == ""){
		alert("请编辑素材标题");
		return;
	}
	
	$.ajax({
		url : url,
		type : 'post',
		dataType : 'jsonp',
		contentType: "application/x-www-form-urlencoded; charset=utf-8", 
		data : {
			material_name : material_name,	
			material_content:material_content,
			adminid:adminid,
			cinemaid:cinemaid
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
					var page = "manager/materialList.html";
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

