var Request=new UrlSearch(); //实例化


function getCompanyInfo(){
	
	var j_id = Request.checked_j_id;
	
   	cinemaid = sessionStorage.getItem("cinemaid");
	var url= requestUrl + "rest/join/getJoinCinema";
	
	$.ajax({
		url : url,
		type : 'post',
		dataType : 'jsonp',
		contentType: "application/x-www-form-urlencoded; charset=utf-8", 
		data : {
			j_id : j_id
		},
		jsonp : "jsonpCallback",
		success : function(data) {
			var result = parseInt(data.result);
			var msg = data.msg;
			console.log("Get result:"+result +" ,msg:"+msg);
			switch(result){
				case 1000 :
					var resultData = data.data;
					showCompanyInfo(resultData);
					break;
				case 1304 :
					$("#addCompanyInfo").fadeIn(200);
					$(document).scrollTop(document.body.scrollHeight);
					break;
				default: 
					alert("操作异常");
					$("#addCompanyInfo").fadeIn(200);
					$(document).scrollTop(document.body.scrollHeight);
					break;
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		    alert("操作异常");
		},
		timeout : 32000
	});
}

function addCompanyInfo(){
	var cinemaName = $("#cinemaName").val();
	var cinemaNumber = $("#cinemaNumber").val();
	var cinemaLinkMan = $("#cinemaLinkMan").val();
	var cinemaLinkMan_telphone = $("#cinemaLinkMan_telphone").val();
	var job = $("#job").val();
	var customer_phone = encodeURIComponent($("#customer_phone").val());
	var customer_qq = encodeURIComponent($("#customer_qq").val());
	var customer_email = $("#customer_email").val();
	var address = $("#address").val();
	var profile = $("#profile").val();
	var philosophy = $("#philosophy").val();
	var remark = $("#remark").val();
	var url= requestUrl + "rest/join/addJoinCinema";
	var check_phone = $("#customer_phone").val();
	var adminid = sessionStorage.getItem("adminid");
	var cinemaid = sessionStorage.getItem("cinemaid");
	var area_number = $("#District option:selected").val();
	var t_logo_url = $("#news_img_show").attr("src");
	var province = $("#Province option:selected").text() ;
	var city = $("#City option:selected").text();
	var district =  $("#District option:selected").text();

	
	if(cinemaName == ""){
		alert("请填写影院名称");
		return;
	}
	if(cinemaNumber == ""){
		alert("请填写影院编号");
		return;
	}
	if(cinemaLinkMan == ""){
		alert("请填写联系人");
		return;
	}
	if(cinemaLinkMan_telphone == ""){
		alert("请填写联系人电话");
		return;
	}
	if(job == ""){
		alert("请填写职务");
		return;
	}
	if($("#District option:selected").text()=="—请选择区县—"){
		alert("请选择地址");
		return;
	}
	
	//判断输入长度是否超过20个字
	var cinemaName_length = $("#cinemaName").val();
	var customer_phone_length = $("#customer_phone").val();
	if(cinemaName_length.length > 40){
	
		alert("影院名称不能超过40个字，添加失败!");
		return;
	}
	if(customer_phone_length.length > 40){
	
		alert("电话长度不能超过40个字，添加失败!");
		return;
	}
	if(customer_phone==''||customer_phone==null&&customer_phone=='undefined'){
		alert("客服电话不能为空");
		return;
	}
	if(customer_email==''||customer_email==null&&customer_email=='undefined'){
		alert("邮箱不能为空");
		return;
	}
	
//	//验证是不是手机或座机
//	if(!checkTel(check_phone)){
//		console.log("客服电话不对头");
//		return;
//	}
	//验证邮箱格式
	if(!IsEmail_add()){
		console.log("邮箱格式不对头");
		return;
	}
	if(t_logo_url == null || t_logo_url == '' || typeof(t_logo_url) == "undefined") {
		if(window.confirm("您确定不上传主题图片？如果是，可能会造成您的影院在首页不能展示！")) {
			
		}else {
			return false;
		}
	}
	
	$.ajax({
		url : url,
		type : 'post',
		dataType : 'jsonp',
		contentType: "application/x-www-form-urlencoded; charset=utf-8", 
		data : {
			cinemaName : cinemaName,
			cinemaNumber:cinemaNumber,
			cinemaLinkMan:cinemaLinkMan,
			cinemaLinkMan_telphone:cinemaLinkMan_telphone,
			job:job,
			customer_phone : customer_phone,
			customer_qq : customer_qq,
			customer_email : customer_email,
			address : address,
			profile : profile,
			philosophy : philosophy,
			remark : remark,
			adminid:adminid,
			cinemaid:cinemaid,
			area_number:area_number,
			t_logo_url:t_logo_url,
			province:province,
			city:city,
			district:district
		},
		jsonp : "jsonpCallback",
		success : function(data) {
			var result = parseInt(data.result);
			var msg = data.msg;
			console.log("result:"+result +" ,msg:"+msg);
			switch(result){
				case 1000 :
					var resultData = data.data;
					showCompanyInfo(resultData);
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


function showCompanyInfo(resultData){
		$("#addCompanyInfo").fadeOut(200);
		$("#updateCompanyInfo").fadeOut(200);
		$("#cinemaInfoShow").fadeIn(200);
		$(document).scrollTop(document.body.scrollHeight);
		//显示信息
		
		$("#j_id_show").html(resultData.j_id);
		$("#j_number_show").html(resultData.j_number);
		$("#j_name_show").html(resultData.j_name);
		$("#customer_phone_show").html(resultData.customer_phone);
		$("#profile_show").html(resultData.profile);
		$("#area_number_show").html(resultData.area_number);
		$("#address_show").html(resultData.province + resultData.district + resultData.address);
		$("#linkman_show").html(resultData.linkman);
		$("#contact_phone_show").html(resultData.contact_phone);
		$("#remark_show").html(resultData.remark);
		$("#job_show").html(resultData.job);
		$("#customer_qq_show").html(resultData.customer_qq);
		$("#customer_email_show").html(resultData.customer_email);
		$("#philosophy_show").html(resultData.philosophy);
		$("#t_logo_url").attr("src",resultData.t_logo_url);
		$("#t_logo_url_show").show();
		//修改信息
		$("#j_id_update1").val(resultData.j_id);
		$("#j_number_update1").val(resultData.j_number);
		$("#j_name_update1").val(resultData.j_name);
		$("#customer_phone_update1").val(resultData.customer_phone);
		$("#profile_update1").val(resultData.profile);
		$("#area_number_update1").val(resultData.area_number);
		$("#address_update1").val(resultData.address);
		$("#linkman_update1").val(resultData.linkman);
		$("#contact_phone_update1").val(resultData.contact_phone);
		$("#remark_update1").val(resultData.remark);
		$("#job_update1").val(resultData.job);
		$("#customer_qq_update1").val(resultData.customer_qq);
		$("#customer_email_update1").val(resultData.customer_email);
		$("#philosophy_update1").val(resultData.philosophy);
		$("#t_logo_url_update").attr("src",resultData.t_logo_url);
		$("#t_logo_url_update_tr").show();
	
	
		var urlStr = window.location.href;
		urlStr = urlStr.substring(urlStr.lastIndexOf("/"),urlStr.indexOf("?"));
		if(urlStr == "/cinemaInfoUpdate.html" ){
			//先加载ajax异步城市数据 ，(警告，这段函数有点乱)
			getAjaxCityData_forUpdate(resultData);
		}	
//		$("#Province option:contains('"+resultData.province+"')").attr("selected",true);
//		$("#City option:contains('"+resultData.city+"')").attr("selected",true);
//		$("#District option:contains('"+resultData.district+"')").attr("selected",true);
		
//	alert($("#Province option[value='"+resultData.province+"']").text());
			
//		$("#Province option[text='"+resultData.province+"']").attr("selected",true);
//		$("#City option[text='"+resultData.city+"']").attr("selected",true);
//		$("#District option[text='"+resultData.district+"']").attr("selected",true);
		
//		$("#Province").find("option[text='"+DB_data.province +"']").attr("selected",true);
//		$("#City").find("option[text='"+DB_data.city +"']").attr("selected",true);
//		$("#District").find("option[text='"+DB_data.district +"']").attr("selected",true);
		
//		$("#Province option[text='"+DB_data.province+"']").attr("selected",true);
//		$("#City option[text='"+DB_data.city+"']").attr("selected",true);
//		$("#District option[text='"+DB_data.district+"']").attr("selected",true);
	
//		$("#Province").text(resultData.province);
//		$("#City").text(resultData.city);
//		$("#District").text(resultData.district);
		
//	alert(resultData.province +resultData.city + resultData.district );
		
}


function toUpdateCompanyInfo(){
  
  var j_id= Request.checked_j_id;
 
	window.location.href="cinemaInfoUpdate.html?checked_j_id="+ j_id;
}

function updateCompanyInfo(){
	
//	var cinemaid = $("#cinemaid_update").val();
//	var cinemaName = encodeURIComponent($("#cinemaName_update").val());
//	var customer_phone = encodeURIComponent($("#customer_phone_update").val());
//	var customer_qq = encodeURIComponent($("#customer_qq_update").val());
//	var customer_email = encodeURIComponent($("#customer_email_update").val());
//	var address = encodeURIComponent($("#address_update").val());
//	var profile = encodeURIComponent($("#profile_update").val());
//	var philosophy = encodeURIComponent($("#philosophy_update").val());
//	var remark = encodeURIComponent($("#remark_update").val());
//	var url= requestUrl + "rest/company/updateCompanyInfo";
//	var adminid = sessionStorage.getItem("adminid");
//	var check_phone = $("#customer_phone_update").val();
	
	var j_id = $("#j_id_update1").val();
	var cinemaName = $("#j_name_update1").val();
	var cinemaNumber = $("#j_number_update1").val();
	var cinemaLinkMan = $("#linkman_update1").val();
	var cinemaLinkMan_telphone = $("#contact_phone_update1").val();
	var job = $("#job_update1").val();
	var customer_phone = encodeURIComponent($("#customer_phone_update1").val());
	var customer_qq = encodeURIComponent($("#customer_qq_update1").val());
	var customer_email = $("#customer_email_update1").val();
	var address = $("#address_update1").val();
	var profile = $("#profile_update1").val();
	var philosophy = $("#philosophy_update1").val();
	var remark = $("#remark_update1").val();
//	var url= requestUrl + "rest/join/addJoinCinema";
	var check_phone = $("#customer_phone_update1").val();
	var adminid = sessionStorage.getItem("adminid");
	var cinemaid = sessionStorage.getItem("cinemaid");
	var area_number = $("#District option:selected").val();
	var t_logo_url = $("#t_logo_url_update").attr("src");
	var province = $("#Province option:selected").text() ;
	var city = $("#City option:selected").text();
	var district =  $("#District option:selected").text();

	if(cinemaName == ""){
		alert("请填写影院名称");
		return;
	}
	if(cinemaNumber == ""){
		alert("请填写影院编号");
		return;
	}
	if(cinemaLinkMan == ""){
		alert("请填写联系人");
		return;
	}
	if(cinemaLinkMan_telphone == ""){
		alert("请填写联系人电话");
		return;
	}
	if(job == ""){
		alert("请填写职务");
		return;
	}
	if($("#District option:selected").text()=="—请选择区县—"){
		alert("请选择地址");
		return;
	}
	//判断输入长度是否超过20个字
	var cinemaName_length = cinemaName;
	var customer_phone_length = customer_phone;
	if(cinemaName_length.length > 40){
		
		alert("影院名称不能超过40个字，添加失败!");
		return;
	}
	if(customer_phone_length.length > 40){
		
		alert("电话长度不能超过40个字，添加失败!");
		return;
	}
	
	if(customer_phone==''||customer_phone==null&&customer_phone=='undefined'){
		alert("客服电话不能为空");
		return;
	}
	if(customer_email==''||customer_email==null&&customer_email=='undefined'){
		alert("邮箱不能为空");
		return;
	}
//	//验证是不是手机或座机
//	if(!checkTel(check_phone)){
//		console.log("客服电话不对头");
//		return;
//	}
	
	//验证邮箱格式
	if(!IsEmail_update()){
		console.log("邮箱格式不正确");
		return;
	}
	
	
	$.ajax({
		url :   requestUrl + "rest/join/updateJoinCinema",
		type : 'post',
		dataType : 'jsonp',
		contentType: "application/x-www-form-urlencoded; charset=utf-8", 
		data : {
			j_id:j_id,
			cinemaName : cinemaName,
			cinemaNumber:cinemaNumber,
			cinemaLinkMan:cinemaLinkMan,
			cinemaLinkMan_telphone:cinemaLinkMan_telphone,
			job:job,
			customer_phone : customer_phone,
			customer_qq : customer_qq,
			customer_email : customer_email,
			address : address,
			profile : profile,
			philosophy : philosophy,
			remark : remark,
			adminid:adminid,
			cinemaid:cinemaid,
			area_number:area_number,
			t_logo_url:t_logo_url,
			province:province,
			city:city,
			district:district
		},
		jsonp : "jsonpCallback",
		success : function(data) {
			var result = parseInt(data.result);
			var msg = data.msg;
			console.log("result:"+result +" ,msg:"+msg);
			switch(result){
				case 1000 :
					var resultData = data.data;
					alert("修改成功");
				//	showCinemaInfo(resultData);
					window.location.href="cinemaInfo_Show.html?checked_j_id="+resultData.j_id ;
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

function IsEmail_add()     
{     
//        var str = document.getElementById('customer_email').value.trim(); 
//        var str_update = document.getElementById('customer_email_update1').value.trim();
		   var str = $("#customer_email").val();
//		   var str_update = $("#customer_email_update1").val();
        if(str.length!=0){    
        reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;    
        if(!reg.test(str)){    
            alert("对不起，您输入的邮箱格式不正确!");//请将“字符串类型”要换成你要验证的那个属性名称！ 
            return false;
        }else{
        	return true;
        }    

        }     
//        if(str_update.length!=0){    
//            reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;    
//            if(!reg.test(str_update)){    
//                alert("对不起，您输入的邮箱格式不正确!");//请将“字符串类型”要换成你要验证的那个属性名称！ 
//                return false;
//            }else{
//            	return true;
//            }    
//
//            }     
}  

function IsEmail_update()     
{     
//        var str = document.getElementById('customer_email').value.trim(); 
//        var str_update = document.getElementById('customer_email_update1').value.trim();
//		   var str = $("#customer_email").val();
		   var str_update = $("#customer_email_update1").val();
//        if(str.length!=0){    
//        reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;    
//        if(!reg.test(str)){    
//            alert("对不起，您输入的邮箱格式不正确!");//请将“字符串类型”要换成你要验证的那个属性名称！ 
//            return false;
//        }else{
//        	return true;
//        }    
//
//        }     
        if(str_update.length!=0){    
            reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;    
            if(!reg.test(str_update)){    
                alert("对不起，您输入的邮箱格式不正确!");//请将“字符串类型”要换成你要验证的那个属性名称！ 
                return false;
            }else{
            	return true;
            }    

            }     
}  


//验证是不是手机或座机
function checkTel(customer_phone){
	var isPhone =/^0\d{2,3}-?\d{7,8}$/;
	var isMob=/^1\d{10}$/;
	var value=customer_phone.trim();
	if(isMob.test(value)||isPhone.test(value)){
		return true;
	}
	else{
		alert("客服电话必须是手机或座机的形式");
		return false;
	}
	}

//只能按数字
function keyPress() {    
    var keyCode = event.keyCode;    
    if ((keyCode >= 48 && keyCode <= 57))    
   {    
        event.returnValue = true;    
    } else {    
          event.returnValue = false;    
   }    
}    


/**
 * 异步上传图片
 */
function ajaxThemeImgUpload() {
	var check = checkImg("news_img");
	if(check){
		var flag = "joincinema";
		var oldImg = "joincinema";
		console.log("进入上传主题图片的异步请求方法1");
		$.ajaxFileUpload({
		    url: requestUrl + "rest/image/newsThemeImgUpload", //用于文件上传的服务器端请求地址
			secureuri: false, //是否需要安全协议，一般设置为false
			fileElementId: 'news_img', //文件上传域的ID
			dataType: 'json', //返回值类型 一般设置为json
			data : {oldImg : oldImg,flag:flag},
			success: function (data, status){
				
				var Data = eval('(' + data + ')');
				var imgName = Data.data.imgName;
				var imgUrl = Data.data.imgUrl;
				var picUrl = Data.data.picUrl;
			
				//{"data":{"imgUrl":"http://127.0.0.1:8080/cx/image/newsInfo/themeImage/news_themeimg_1463371402033.png","imgName":"news_themeimg_1463371402033.png","picUrl":"/image/newsInfo/themeImage/news_themeimg_1463371402033.png"}}
				//$("#img_show").show();
				
			//	alert( requestUrl +"rest/image/download?f=" + imgUrl );
				
			//	$("#news_img_show").attr("src",requestUrl +"rest/image/download?f=" + imgUrl);
				$("#news_img_show").attr("src", requestUrl +picUrl);
				$("#news_img_show").attr("picurl",picUrl);
				$("#img_show").show();
		        
				 console.log("进入上传主题图片的异步请求方法2");
			
			},
			error: function (data, status, e){
				console.log("异步上传主题图片出错啦！！" + status);
			}
		});
			
	}
   
}

/**
 * 更新专用的上传图片的方法
 */
function ajaxThemeImgUpload_update() {
	var check = checkImg("news_img");
	if(check){
		var flag = "joincinema";
		var oldImg = "joincinema";
		console.log("进入上传主题图片的异步请求方法1");
		$.ajaxFileUpload({
		    url: requestUrl + "rest/image/newsThemeImgUpload", //用于文件上传的服务器端请求地址
			secureuri: false, //是否需要安全协议，一般设置为false
			fileElementId: 'news_img', //文件上传域的ID
			dataType: 'json', //返回值类型 一般设置为json
			data : {oldImg : oldImg,flag:flag},
			success: function (data, status){
				
				var Data = eval('(' + data + ')');
				var imgName = Data.data.imgName;
				var imgUrl = Data.data.imgUrl;
				var picUrl = Data.data.picUrl;
			
				//{"data":{"imgUrl":"http://127.0.0.1:8080/cx/image/newsInfo/themeImage/news_themeimg_1463371402033.png","imgName":"news_themeimg_1463371402033.png","picUrl":"/image/newsInfo/themeImage/news_themeimg_1463371402033.png"}}
				//$("#img_show").show();
				
			//	alert( requestUrl +"rest/image/download?f=" + imgUrl );
				
			//	$("#t_logo_url_update").attr("src",requestUrl +"rest/image/download?f=" + imgUrl);
				$("#t_logo_url_update").attr("src", requestUrl +picUrl);
				$("#t_logo_url_update").attr("picurl",picUrl);
				$("#t_logo_url_update_tr").show();
		        
				 console.log("进入上传主题图片的异步请求方法2");
			
			},
			error: function (data, status, e){
				console.log("异步上传主题图片出错啦！！" + status);
			}
		});
			
	}
   
}

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
				default: break;
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("操作异常");
		},
		timeout : 32000
	});
}


function audit_jdbc(audit_flag){
	
	var j_id = Request.checked_j_id;
	
	$.ajax({
		url :   requestUrl + "rest/join/updateJoinCinema_Audit",
		type : 'post',
		dataType : 'jsonp',
		contentType: "application/x-www-form-urlencoded; charset=utf-8", 
		data : {
			audit_flag:audit_flag,
			j_id:j_id
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
