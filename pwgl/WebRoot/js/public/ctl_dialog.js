/**
 * 这个是对lhgdialog的封装
 */

/**
 * 初始化弹出层
 * 
 * @param tagId
 *            按钮的id
 * @param valparam
 *            dialog的参数 格式{content:"",title:"",lock:true}
 */
function ctl_initDialog(tagId,valparam){
	if(tagId){
		return $("#"+tagId).dialog(valparam);
	}else{		
		return $.dialog(valparam);
	}
}
/**
 * 得到div中的html
 * 
 * @param tagId
 * @param valparam
 *            dialog中参数的格式{title:"",content:""},content表示div的id号
 */
function ctl_dialogDiv(tagId,valparam){
	if(typeof(valparam.max) == 'undefined'){
		valparam.max=false;
	}
	if(typeof(valparam.min) == 'undefined'){
		valparam.min=false;
	}
	var id = valparam.content;
	valparam.content = $("#"+id).html();
	var dialog;
	if(tagId){
		return $("#"+tagId).dialog(valparam);
	}else{
		return  $.dialog(valparam);
	}
	return dialog;
}
	



/**
 * 自己写的div，可以通过点击按钮关闭弹出层 得到div层里面的html dialog配置属性content时只需给定其层的id
 * 
 * @param tagId
 * @param valparam
 *            dialog的参数 格式{title:"",content:tagId} dialog配置属性content时只需给定其层的id
 * @param buttonIds
 *            表示一个button的id(数组格式["login","regist"])，如果ID上绑定有其他click函数，则不能直接在该ID上绑定窗体关闭事件，请直接调用ctl_closeDialog函数，参数为窗体对象
 */

function ctl_dialogDivClose(tagId,valparam,buttonIds){
	var id = valparam.content;
	valparam.content = $("#"+id).html();	
	var dialog;
	if(tagId){
		dialog = $("#"+tagId).dialog(valparam);
	}else{
		dialog = $.dialog(valparam);
	}
	
	if(buttonIds != 'undefined' && buttonIds){
		for(var i = 0;i < buttonIds.length;i++){
		    var bId = buttonIds[i];		 
			$("#"+bId).click(function(){				
				dialog.close();
			});
		}
	}
		
	return dialog;
}

// 关闭弹出窗
function ctl_closeDialog(dialog){
	dialog.close();
}



// 封装动画效果
/**
 * 
 * @param options是一种以json格式{title:"标题"}
 * @returns 没有返回值
 */
function ctl_donghuaDialog(options) {
	var opts = options || {};
	var api = opts.duration || 800;
	var aConfig = opts.duration || 800;
	var hide = opts.duration || 800;
	var wrap = opts.duration || 800;
	var top = opts.duration || 800;
	var duration = opts.duration || 800;
	var config = {		
		left : '100%',
		top : '100%',
		fixed : true,
		drag : false,
		resize : false,
		init : function(here) {
			api = this;
			aConfig = api.config;
			wrap = api.DOM.wrap;
			top = parseInt(wrap[0].style.top);
			hide = top + wrap[0].offsetHeight;

			wrap.css('top', hide + 'px').animate({
				top : top + 'px'
			}, duration, function() {
				opts.init && opts.init.call(api, here);
			});
		},
		close : function(here) {
			wrap.animate({
				top : hide + 'px'
			}, duration, function() {
				opts.close && opts.close.call(this, here);
				aConfig.close = $.noop;
				api.close();
			});
			return false;
		}
	};

	for ( var i in opts) {
		if (config[i] === undefined)
			config[i] = opts[i];
	}

	return $.dialog(config);

}

/**
 * 给弹出窗弹出弹入增加效果
 * 
 * @param options
 *            json格式，配置此参数时如需弹出层的内容是div的内容，那么需要配置divId属性如{divId:"test"};
 *            弹出弹入效果走向根据所点击的按钮时，需配置{btnId:"btnId"},默认效果是上下走向
 * @returns 没有返回值
 */
function ctl_dynamicDialog(options) {
	var opts = options || {}, api=null, aConfig, hide=0, wrap=null, top, btnTop=0,btnLeft=0, duration = opts.duration || 800;
	var config = "";
	
	// content属性值是否是div的内容
	if(options.divId){		
		var id = options.divId;
		options.content = $("#"+id).html();
	}	
	
	// 弹出弹入效果走向
	if(options.btnId){
		btnTop=parseInt($("#"+options.btnId).offset().top);
		btnLeft=parseInt($("#"+options.btnId).offset().left);
	
		// 弹出弹入效果走向根据所点击的按钮
		config = {	
				 id:"dynamic",	
				 lock:true,			 
				 top:btnTop,
				 left:btnLeft,
				init : function(here) {
					api = this;
					aConfig = api.config;
					wrap = api.DOM.wrap;	
					
					wrap.css({opacity:0.3});
					wrap.animate({					
						left:($(document).width() - wrap[0].offsetWidth)/2,
						top:(document.documentElement.clientHeight - wrap[0].offsetHeight)/2 + $(document).scrollTop(),
						opacity:0.9
					},400,function(){wrap.css("opacity",1);});			
				},		
				close : function(here) {
					wrap.animate({
						left:btnLeft,
						top:btnTop,
						opacity:0.1
					},200,function(){
						wrap.css("opacity",0.2); 
						opts.close && opts.close.call(this, here);
			            aConfig.close = $.noop;
			            api.close();
					});				
					return false;
				}
			};
	}else{
		// 弹出弹入效果上下走向
		config = {	
			 id:"dynamic",	
			 lock:true,			
			 init : function(here) {
				api = this;
				aConfig = api.config;
				wrap = api.DOM.wrap;
				top = parseInt(wrap[0].style.top);
		        hide = top + wrap[0].offsetHeight;
				
		        // 初始化的动态走向
				wrap.css({opacity:0.3});
				wrap.animate({					
					left:($(document).width() - wrap[0].offsetWidth)/2,
					top:(document.documentElement.clientHeight - wrap[0].offsetHeight)/2 + $(document).scrollTop(),
					opacity:0.9
				},400,function(){wrap.css("opacity",1);});			
			},		
			close : function(here) {
				// 关闭时的走向
				wrap.animate({					
					top:document.documentElement.clientHeight-200,
					opacity:0.1
				},400,function(){
					wrap.css("opacity",0.2); 
					opts.close && opts.close.call(this, here);
		            aConfig.close = $.noop;
		            api.close();
				});				
				return false;
			}
		};	
}

	for ( var i in opts) {
		if (config[i] === undefined)
			config[i] = opts[i];
	}
	
	 $.dialog(config);
}

// 没有选中行，给出提示信息
/**
 * param valparam 它是一种以json格式({title:"标题"})
 */
function ctl_dialog(valparam){
	$.dialog(valparam);
}
/**
 * 
 * @param content是指内容
 * @param callback是指窗口关闭是的回调函数
 */
function ctl_alert(content,callback){
	$.dialog.alert(content,callback);
}
/**
 * 
 * @param content是指内容
 * @param yes是指确定按钮回调函数
 * @param no是指取消按钮的回调函数
 */
function ctl_confirm(content,yes,no){
   $.dialog.confirm(content,yes,no);
}

/**
 * 
 * @param param是指内容
 */
function ctl_tips(param){
   $.dialog.tips(param);
}
/**
 * 
 * @param content是指内容
 * @param yes是指确定按钮回调函数
 * @param value是指文本框默认值
 */
function ctl_prompt(content,yes,value){
  $.dialog.prompt(content,yes,value);
}

/**
 * 
 * @param content是指内容
 * @param time是指显示时间
 * @param icon是指提示图标
 * @param callback是指提示关闭时执行的函数
 */
function ctl_dtips(content,time,icon,callback){
  var realIcon = dialogDefaultIcon;
  if(icon != 'undefined' && icon){
	  realIcon = icon;
  }
  $.dialog.tips(content,time,realIcon,callback);
}

/**
 * 显示消息提示框
 * 
 * @param content
 *            消息内容
 * @param title
 *            消息标题
 * @param width
 *            消息框宽度
 * @param height
 *            消息框高度
 * @param time
 *            显示维持时间
 */
function ctl_showMsg(content,title,width,height,time){
	
	if(content == null || content == ''){
		return;
	}
	
	if(title==null||title==''){
		title='信息提示';
	}
	if(width==null||width==''){
		width=180;
	}
	if(height==null||height==''){
		height=65;
	}
	if(time==null||time==''){
		var len = content.length;
		time = len/15;
		if(time < 3){
			time = 3;
		}
	}
	ctl_donghuaDialog({
		title : title,
		width : width,
		height:height,
		content : content,
		min:false,
		max:false,
		time : time
	});
}


/**
 * 显示消息提示框(针对期初弹出框问题)
 * 
 * @param content
 *            消息内容
 * @param id
 *            保存按钮的id
 * 
 */
function ctl_initShowMsg(content,id){
	var title = '';
	var width = '';
	var height = '';
	var time = '';
	
	$("#"+id).attr("disabled",true);
	
	if(title==null||title==''){
		title='信息提示';
	}
	if(width==null||width==''){
		width=180;
	}
	if(height==null||height==''){
		height=65;
	}
	if(time==null||time==''){
		time=3;
	}
	ctl_donghuaDialog({
		title : title,
		width : width,
		height:height,
		content : content,
		min:false,
		max:false,
		time : time,
		init:function(){$("#"+id).attr("disabled",true);},
		close:function(){$("#"+id).attr("disabled",false);}
	});
}
