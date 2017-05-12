/*
 * message:你的提示信息
 * info:1.info表示提示
 *      2.alert表示警告
 *      3.closethick表示错误
 * */
function alertmsg(message,info){ 
	if(info==""){info="info";}
    if ($("#dialogalert").length == 0) { 
        $("body").append('<div id="dialogalert"></div>'); 
        $("#dialogalert").dialog({
            autoOpen: false, 
            title: '系统信息', 
            modal: true, 
            resizable:false, 
            overlay: { 
                opacity: 0.5, 
                background: "black" 
            }, 
            open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
            buttons: { 
                "确定": function(){ 
                    $(this).dialog("close"); 
                } 
            } 
        }); 
    }
   if($.browser.mozilla){
        $("#dialogalert").html('<p></p><p><span class="ui-icon ui-icon-'+info+'" style="float:left; margin:0 7px 30px 0;"></span>' +
        		'</p><p><b>'+message+'</b></p>'); 
	}else{//ie opera  safari
	    $("#dialogalert").html('<p></p><p><span class="ui-icon ui-icon-'+info+'" style="float:left; margin:10px 7px 30px 0;"></span>' +
        		'</p><p><span style="float:left; margin:11px 7px 30px 0;"><b>'+message+'</b></span></p>'); 
    }
    $("#dialogalert").dialog("open"); 

}
/*
 * message:你的提示信息
 * callback:回调方法
 * */
//function confirm(message, callback){ 
//    //if ($("#dialogconfirm").length == 0) { 
//    //    $("body").append('<div id="dialogconfirm"></div>'); 
//        $("#dialogconfirm").dialog({ 
//            autoOpen: false, 
//            title: '确认操作', 
//            modal: true, 
//            resizable:false, 
//            overlay: { 
//                opacity: 0.5, 
//                background: "black" 
//            }, 
//            buttons: { 
//                "确定": function(){ 
//                    $(this).dialog("close"); 
//                    callback(); 
//                }, 
//                "取消": function(){ 
//                    $(this).dialog("close"); 
//                } 
//            },
//            open: function(event, ui) { $(".ui-dialog-titlebar-close").hide(); },
//            close: function(event, ui) {$("#dialogconfirm").html(''); $(".ui-dialog-titlebar-close").show();} //这是关闭事件的回调函数,在这写你的逻辑
//        }); 
//  //  } 
//    if($.browser.mozilla){
//        $("#dialogconfirm").html('<p></p><p><span class="ui-icon ui-icon-help" style="float:left; margin:0 7px 30px 0;"></span><p><b>'+message+'</b></p>'); 
//	}else{//ie opera  safari
//		$("#dialogconfirm").html('<p></p><p><span class="ui-icon ui-icon-help" style="float:left; margin:10px 7px 30px 0;"></span><p><span style="float:left; margin:11px 7px 30px 0;"><b>'+message+'</b></span></p>'); 
//	}
//    $("#dialogconfirm").dialog("open");     
//}

//打开遮盖层 
function blockUIOpen(mage,w,h,f,s){
         if(f){
             $.blockUI({
//               message: '<div style="font-family:Arial, Helvetica, sans-serif;font-size: 12px;'+
//                   'margin-top:20px;margin-bottom:20px;"><span >'+mage+'</span></div>',
               message: '<div class="tc1010"><ul><li>'+mage+'</li><li><img src="images/main/gdt.gif" /></li></ul></div>',
               css:{
                   top:($(window).height()-h)/2+'px',
                   left:($(window).width()-w)/2+'px',
                   width:w+'px',
                   height:h+'px'
                },
                timeout:s
              });
         }else{
            $.blockUI({
//               message: '<div id="blockUIOpenDiv" style="font-family:Arial, Helvetica, sans-serif;font-size: 12px;'+
//                   'margin-top:20px;margin-bottom:20px;"><span >'+mage+'</span></div>',
               message: '<div class="tc1010"><ul><li>'+mage+'</li><li><img src="images/main/gdt.gif" /></li></ul></div>',
               css:{
                   top:($(window).height()-h)/2+'px',
                   left:($(window).width()-w)/2+'px',
                   width:w+'px',
                   height:h+'px'
                }
              });
         }
}
//关闭遮盖层
function blockUIClose(){
	//关闭弹出层
    $.unblockUI();
}

//打开主区域遮盖层 
//参数 DIV的ID
//参数msge 消息
//参数F 是否指定时间关闭 ture是
//参数S 指定时间
function divBlockUIOpen(div,mage,f,s){
         if(f){
              $('#'+div).block({
                   message: '<div style="font-family:Arial, Helvetica, sans-serif;font-size: 12px;'+
                        'margin-top:20px;margin-bottom:20px;"><span >'+mage+'</span></div>',
                   timeout:s
              });
         }else{
            $('#'+div).block({
                   message: '<div style="font-family:Arial, Helvetica, sans-serif;font-size: 12px;'+
                        'margin-top:20px;margin-bottom:20px;"><span >'+mage+'</span></div>'
              });
         }
}

//DIV的ID
function divBlockUIColse(div){
     $('#'+div).unblock();
}
