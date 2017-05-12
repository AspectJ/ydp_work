var txt = "<div style='position: absolute;' ondblclick='getHtml(this)'><label>请输入文字</label></div>";
var selObj;
var sessionsid = ccid;
var ticketfaceid = "";
$(function(){
	$("#add_sessionsname").val(sessionsname);
	
	//设置场次编号，场次名称
	$("#indexSession_two_ccbh").text(sessionscode);
	$("#indexSession_two_ccmc_txt").text(sessionsname);
	var data = {operType:'selectFacemake',sessionsid:sessionsid};		
	publicAjaxRequest("indexFacemakeService",data,jsonType, function(response) {
		var obj = response.data;
		if(obj != null){
			$("#add_ticketname").val(obj.ticketname);
			$("#add_bgurl").val(obj.bgurl);
			$("#add_carbonnum").val(obj.carbonnum);
			$("#add_carbonheight").val(obj.carbonheight);
			$("input[value='"+obj.carbonlocation+"']").attr("checked","true");
			$("#main_div").html(obj.contentstr);
			ticketfaceid = obj.ticketfaceid;
		}
    });
	
	szfq();
	$("input[name='position']").click(function(){
		szfq();
	});
	$("#add_carbonnum").change(function(){
		szfq();
	});
	
	$("#add_txt_btn").click(function(){
		$("#ticket_div").append(txt);
		move();
	});
	
	$("#color_btn").bigColorpicker(function(el,color){
		$("#nr_txt").css("color",color);
	});
	
	//修改文本
	$("#txt_save_btn").click(function(){
		var newnr = $("#nr_txt").val();
		var newsize = $("#size_txt").val();
		var newcolor = $("#nr_txt").css("color");
		$(selObj).find("label").html(newnr);
		$(selObj).find("label").css("font-size",newsize);
		$(selObj).find("label").css("color",newcolor);
	});
	
	//修改图片
	$("#img_save_btn").click(function(){
		var newwidth = $("#width_txt").val();
		var newheight = $("#height_txt").val();
		$(selObj).find("img").width(newwidth);
		$(selObj).find("img").height(newheight);
	});
	
	//删除
	$("#txt_del_btn").click(function(){
		$(selObj).remove();
		$("#nr_txt").val("");
		$("#size_txt").val("");
	});
	
	//背景图片
	upload("add_bkimg_txt");
	//图片
	uploadPic("add_img_btn");
	
	$("#save_btn").click(function(){
		saveFace();
	});
	
//	initSel();
	
	$("#print_btn").click(function(){
		$("#ticket_div").print();
	});
	
	//条形码
	$("#add_txm_btn").click(function(){
		var code = "20160707";
		var data={operType:'getBarcode',code:code};		
		publicAjaxRequest("indexFacemakeService",data,jsonType, function(response) {
			var url = imgPath+response.data;
			var img = "<div style='position: absolute;' ondblclick='getImg(this)'><img src='"+url+"'/></div>";
	     	$("#ticket_div").append(img);
			move();
	    });
	});
	
	//二维码
	$("#add_ewm_btn").click(function(){
		var codeInfo = sessionsid;
		var data={operType:'getQrcode',codeInfo:codeInfo};		
		publicAjaxRequest("indexFacemakeService",data,jsonType, function(response) {
			var url = imgPath+response.data;
			var img = "<div style='position: absolute;' ondblclick='getImg(this)'><img src='"+url+"'/></div>";
	     	$("#ticket_div").append(img);
			move();
	    });
	});
	
	//数据库字段
	dbfield();
	
	$("#add_db_field").change(function(){
		var name = $(this).find("option:selected").text();
		var value = $(this).val();
		var str = "<div style='position: absolute;' ondblclick='getHtml(this)'><label>"+name+"："+value+"</label></div>";
		$("#ticket_div").append(str);
		move();
	});
	
	//查询数据库数据
//	query();
});

function upload(id){
	 ctl_initUpload({
      tagId: id,
      swf: 'js/plugin/uploadify/uploadify.swf',
      uploader: springMvcUrl,
      formData:{
          param:getParam("indexFacemakeService"),
          data:"{operType:'updatePic'}"
      },
      buttonText: '票面底图',
      auto: true,
      width: 105,
      height: 30,
      multi:true ,
      fileSizeLimit: 500,
      queueSizeLimit: 1,
      fileTypeDesc: '支持常用图片格式',
      fileTypeExts: "*.jpg;*.gif;*.jpeg;*.png;*.bmp",
      onQueueComplete: function(queueData) {
      },
      onUploadError: function(file, errorCode, errorMsg, errorString) {
          tips().content("文件:" + file.name + "上传失败");
      },
      onCancel: function(fileObj) {
          tips().content("取消了" + fileObj.name);
      },
      'onUploadSuccess': function(file, resdata, response) {
      	var obj = JSON.parse(resdata);//把JSON字符串转成JSON对象
      	var url = obj.data;
      	$("#ticket_div").css("background-image","url("+imgPath+url+")");
      	$("#add_bgurl").val(url);
      }
  });
}

function uploadPic(id){
	 ctl_initUpload({
     tagId: id,
     swf: 'js/plugin/uploadify/uploadify.swf',
     uploader: springMvcUrl,
     formData:{
         param:getParam("indexFacemakeService"),
         data:"{operType:'updatePic'}"
     },
     buttonText: '图片',
     auto: true,
     width: 105,
     height: 30,
     multi:true ,
     fileSizeLimit: 500,
     queueSizeLimit: 1,
     fileTypeDesc: '支持常用图片格式',
     fileTypeExts: "*.jpg;*.gif;*.jpeg;*.png;*.bmp",
     onQueueComplete: function(queueData) {
     },
     onUploadError: function(file, errorCode, errorMsg, errorString) {
         tips().content("文件:" + file.name + "上传失败");
     },
     onCancel: function(fileObj) {
         tips().content("取消了" + fileObj.name);
     },
     'onUploadSuccess': function(file, resdata, response) {
     	var obj = JSON.parse(resdata);//把JSON字符串转成JSON对象
     	var url = imgPath+obj.data;
     	var img = "<div style='position: absolute;' ondblclick='getImg(this)'><img style='width:100px;heigth:100px;' src='"+url+"'/></div>";
     	$("#ticket_div").append(img);
		move();
     }
 });
}

//拖拽初始化
function move(){
	$("#ticket_div div").each(function() {
        $(this).dragging({
		    move:"both",
			randomPosition:false	
		});
    });
}

//获取所选label属性
function getHtml(obj){
	selObj = obj;
	var nr = $(obj).find("label").html();
	var size = $(obj).find("label").css("font-size");
	var color = $(obj).find("label").css("color");
	$("#nr_txt").val(nr);
	$("#size_txt").val(size);
	$("#nr_txt").css("color",color);
}

//图片
function getImg(obj){
	selObj = obj;
	var width = $(obj).find("img").width();
	var height = $(obj).find("img").height();
	$("#width_txt").val(width);
	$("#heigth_txt").val(height);
}

//function initSel(){
//	//场次
//    var data={operType:'selectSessions'};		
//	publicAjaxRequest("indexFacemakeService",data,jsonType, function(response) {
//		var obj = response.data;
//		var str = "";
//		for ( var i in obj) {
//			str = "<option value='"+obj[i].sessionsid+"'>"+obj[i].sessionsname+"</option>";
//			$("#add_sessions").append(str);
//		}
//    });
//}

//票面保存
function saveFace(){
	var ticketname = $("#add_ticketname").val();
	var bgurl = $("#add_bgurl").val();
	var carbonheight = $("#add_carbonheight").val();
//	var sessionsid = $("#add_sessions").val();
	var carbonnum = $("#add_carbonnum").val();
	var wz = $("input[name='position']:checked").val();
	var content = $("#main_div").html();
	var data = {operType:'add',ticketname:ticketname,bgurl:bgurl,carbonheight:carbonheight,sessionsid:sessionsid,carbonnum:carbonnum,
			carbonlocation:wz,content:content};	
	if(ticketfaceid != ""){
		data = {operType:'update',ticketfaceid:ticketfaceid,ticketname:ticketname,bgurl:bgurl,carbonheight:carbonheight,sessionsid:sessionsid
				,carbonnum:carbonnum,carbonlocation:wz,content:content};
	}
	publicAjaxRequest("indexFacemakeService",data,jsonType, function(response) {
		var rdata = response.data;
		if("success" == rdata) {
			ctl_reloadGrid('face_grid');
			ctl_showMsg("保存成功!");
			showstepurl("pages/setpolicy/indexSetPllicy.html","第三步（座位）","销售政策");
			$(".step span").removeClass("bggreen");
			$(".step span").removeClass("c_f");
			$("#step_xszc").addClass("bggreen");
			$("#step_xszc").addClass("c_f");
		}else if("fail" == rdata){
			ctl_showMsg("保存失败!");
		}else{
			ctl_showMsg(rdata);
		}
    });
}

//设置副券
function szfq(){
	var zs = $("#add_carbonnum").val();
	var wz = $("input[name='position']:checked").val();
	if(zs == "1" && wz != "left" && wz != "right"){
		ctl_showMsg("只有一个副劵时，不能加到两边!");
		return;
	}
	var fzkd = $("#add_carbonheight").val();
	
	$("div[name='fq']").remove();
	var fq = "";
	var imgwidth = 'style="width:'+fzkd+'px;height:100%;"';
	var pyxs = +fzkd+1;
	if(zs == "1"){
		if(wz == "left"){
			fq = "<div name='fq' style='position: absolute; height:100%; width:"+fzkd+"px; left:0; border:1px dashed #000; border-style: none solid none none;'><img "+imgwidth+" src='images/fq.png'/></div>";
		}else if(wz == "right"){
			fq = "<div name='fq' style='position: absolute; height:100%; width:"+fzkd+"px; right:0; border:1px dashed #000; border-style: none none none solid;'><img "+imgwidth+" src='images/fq.png'/></div>";
		}else{
			
		}
	}else if(zs == "2"){
        if(wz == "left"){
			fq = "<div name='fq' style='position: absolute; height:100%; width:"+fzkd+"px; left:0; border:1px dashed #000; border-style: none solid none none;'><img style='width:100%;height:100%' src='images/fq.png'/></div><div name='fq' style='position: absolute; height:100%; width:"+fzkd+"px; left:"+pyxs+"px; border:1px dashed #000; border-style: none solid none none;'><img "+imgwidth+" src='images/fq.png'/></div>";
		}else if(wz == "right"){
			fq = "<div name='fq' style='position: absolute; height:100%; width:"+fzkd+"px; right:0; border:1px dashed #000; border-style: none none none solid;'><img style='width:100%;height:100%' src='images/fq.png'/></div><div name='fq' style='position: absolute; height:100%; width:"+fzkd+"px; right:"+pyxs+"px; border:1px dashed #000; border-style: none none none solid;'><img "+imgwidth+" src='images/fq.png'/></div>";
		}else{
			fq = "<div name='fq' style='position: absolute; height:100%; width:"+fzkd+"px; left:0; border:1px dashed #000; border-style: none solid none none;'><img style='width:100%;height:100%' src='images/fq.png'/></div><div name='fq' style='position: absolute; height:100%; width:"+fzkd+"px; right:0; border:1px dashed #000; border-style: none none none solid;'><img "+imgwidth+" src='images/fq.png'/></div>";
		}
	}
	$("#ticket_div").append(fq);
}

//数据库字段
function dbfield(){
    var data={operType:'selectDbfieled',sessionsid:sessionsid};		
	publicAjaxRequest("indexFacemakeService",data,jsonType, function(response) {
		var obj = response.data;
		var str = "";
		for ( var i in obj) {
			str = "<option value='"+obj[i].fieldvalue+"'>"+obj[i].fieldname+"</option>";
			$("#add_db_field").append(str);
		}
    });
}

function query(){
	var data={operType:'select',sessionsid:sessionsid};		
	publicAjaxRequest("indexFacemakeService",data,jsonType, function(response) {
		var obj = response.data;
		var str = "";
		for ( var i in obj) {
			str = "<option value='"+obj[i].fieldvalue+"'>"+obj[i].fieldname+"</option>";
			$("#add_db_field").append(str);
		}
    });
}