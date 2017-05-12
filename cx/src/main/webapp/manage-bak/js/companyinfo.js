var Request=new UrlSearch(); //实例化


function getCompanyInfo(){
//	var cinemaid = "9";
	
   	cinemaid = sessionStorage.getItem("cinemaid");
   	console.log("之前  ： " + cinemaid);
   	//cinemaid=100 是全局管理员的意思
   	if(cinemaid == "undefined" || cinemaid == "100" || cinemaid ==undefined)
   		{
   		cinemaid = Request.checkedCinemaId ; 
   	//	alert(cinemaid);
   		}
    console.log("当前  :" + cinemaid);
	var url= requestUrl + "rest/company/getCompanyInfo";
	$.ajax({
		url : url,
		type : 'post',
		dataType : 'jsonp',
		contentType: "application/x-www-form-urlencoded; charset=utf-8", 
		data : {
			cinemaid : cinemaid
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
	var cinemaName = encodeURIComponent($("#cinemaName").val());
	var cinemaNumber = encodeURIComponent($("#cinemaNumber").val());
	var cinemaLinkMan = encodeURIComponent($("#cinemaLinkMan").val());
	var cinemaLinkMan_telphone = encodeURIComponent($("#cinemaLinkMan_telphone").val());
	var job = encodeURIComponent($("#job").val());
	var customer_phone = encodeURIComponent($("#customer_phone").val());
	var customer_qq = encodeURIComponent($("#customer_qq").val());
	var customer_email = encodeURIComponent($("#customer_email").val());
	var address =$("#District option:selected").text()  + encodeURIComponent($("#address").val());
	var profile = encodeURIComponent($("#profile").val());
	var philosophy = encodeURIComponent($("#philosophy").val());
	var remark = encodeURIComponent($("#remark").val());
	var url= requestUrl + "rest/company/addCompanyInfo";
	var check_phone = $("#customer_phone").val();

	
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
	if(!IsEmail()){
		console.log("邮箱格式不对头");
		return;
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
		$("#cinemaid_show").val(resultData.cinemaid);
		$("#cinemaName_show").html(resultData.cinemaName);
		$("#customer_phone_show").html(resultData.customer_phone);
		$("#customer_qq_show").html(resultData.customer_qq);
		$("#customer_email_show").html(resultData.customer_email);
		$("#address_show").html(resultData.address);
		$("#profile_show").html(resultData.profile);
		$("#philosophy_show").html(resultData.philosophy);
		$("#remark_show").html(resultData.remark);
		//修改信息
		$("#cinemaid_update").val(resultData.cinemaid);
		$("#cinemaName_update").val(resultData.cinemaName);
		$("#customer_phone_update").val(resultData.customer_phone);
		$("#customer_qq_update").val(resultData.customer_qq);
		$("#customer_email_update").val(resultData.customer_email);
		$("#address_update").val(resultData.address);
		$("#profile_update").val(resultData.profile);
		$("#philosophy_update").val(resultData.philosophy);
		$("#remark_update").val(resultData.remark);
}


function toUpdateCompanyInfo(){
	$("#addCompanyInfo").fadeOut(200);
	$("#cinemaInfoShow").fadeOut(200);
	$("#updateCompanyInfo").fadeIn(200);
	$(document).scrollTop(document.body.scrollHeight);
	
}

function updateCompanyInfo(){
	
	var cinemaid = $("#cinemaid_update").val();
	var cinemaName = encodeURIComponent($("#cinemaName_update").val());
	var customer_phone = encodeURIComponent($("#customer_phone_update").val());
	var customer_qq = encodeURIComponent($("#customer_qq_update").val());
	var customer_email = encodeURIComponent($("#customer_email_update").val());
	var address = encodeURIComponent($("#address_update").val());
	var profile = encodeURIComponent($("#profile_update").val());
	var philosophy = encodeURIComponent($("#philosophy_update").val());
	var remark = encodeURIComponent($("#remark_update").val());
	var url= requestUrl + "rest/company/updateCompanyInfo";
	var adminid = sessionStorage.getItem("adminid");
	var check_phone = $("#customer_phone_update").val();


	if(cinemaName == ""){
		alert("请填写正确信息");
		return;
	}
	//判断输入长度是否超过20个字
	var cinemaName_length = $("#cinemaName").val();
	var customer_phone_length = $("#customer_phone").val();
	if(cinemaName_length.length > 40){
		
		alert("院线名称不能超过40个字，添加失败!");
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
	if(!IsEmail()){
		console.log("邮箱格式不对头");
		return;
	}
	
	$.ajax({
		url : url,
		type : 'post',
		dataType : 'jsonp',
		contentType: "application/x-www-form-urlencoded; charset=utf-8", 
		data : {
			cinemaid : cinemaid,
			cinemaName : cinemaName,
			customer_phone : customer_phone,
			customer_qq : customer_qq,
			customer_email : customer_email,
			address : address,
			profile : profile,
			philosophy : philosophy,
			remark : remark,
			adminid:adminid
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

function IsEmail()     
{     
        var str = document.getElementById('customer_email').value.trim(); 
        var str_update = document.getElementById('customer_email_update').value.trim();
        if(str.length!=0){    
        reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;    
        if(!reg.test(str)){    
            alert("对不起，您输入的邮箱格式不正确!");//请将“字符串类型”要换成你要验证的那个属性名称！ 
            return false;
        }else{
        	return true;
        }    

        }     
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





