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
function getMaterialShow(material_id,type){
	var url = requestUrl + "rest/material/getMaterial";
	$.ajax({
		url : url,
		type : 'post',
		dataType : 'jsonp',
		data : {
			material_id : material_id
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
	$("#material_name").html(resultData.material_name);
	$("#material_content").html(resultData.material_content);
//	$("#download_url").html(resultData.download_url);
//	$("#fetch_code").html(resultData.fetch_code);
//	$("#remark").html(resultData.remark);
}

function toUpdateMaterial(){
	var material_id = $("#material_id").val();
	var page = "manager/MaterialUpdate.html?material_id="+material_id;
	window.parent.$("#mainFrame").attr("src",page);
}


function updateInfo(resultData){
	$("#material_name").val(resultData.material_name);
	$("#material_content").val(resultData.material_content);
//	$("#download_url").val(resultData.download_url);
//	$("#fetch_code").val(resultData.fetch_code);
//	$("#remark").val(resultData.remark);
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
		newtr+= "<button onclick='ajaxImageUpload(this,"+timestamp+");' >上传</button>";
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

//更新素材
function updateMaterial(){
	var material_id = $("#material_id").val();
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
	var material_content = encodeURIComponent($("#material_content").val());
	var adminid = sessionStorage.getItem("adminid");
	
	
	var url= requestUrl + "rest/material/updateMaterial";
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
			material_id : material_id,
			material_name:material_name,
			material_content:material_content,
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
	
	var material_id = Request.material_id;
	
	$.ajax({
		url :   requestUrl + "rest/material/updateMaterial_Audit",
		type : 'post',
		dataType : 'jsonp',
		contentType: "application/x-www-form-urlencoded; charset=utf-8", 
		data : {
			audit_flag:audit_flag,
			material_id:material_id
		},
		jsonp : "jsonpCallback",
		success : function(data) {
			var result = parseInt(data.result);
			var msg = data.msg;
			console.log("result:"+result +" ,msg:"+msg);
			switch(result){
				case 1000 : break;
				default: break;
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("操作异常");
		},
		timeout : 32000
	});
	
}

