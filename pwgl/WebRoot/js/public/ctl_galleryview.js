//图片轮播控件
//ption说明
//galleryViewId: id
//transition_speed:0, 图片切换速度
//transition_interval:0, 间隔时间
//panel_width:0, 主图片的宽度
//panel_height:0, 主图片的高度
//frame_gap: "", 间隔的距离
//start_frame:"", 开始位置
//autoplay:false, 设置图片是否轮播
//enable_slideshow:false, 设置面板中的暂停按钮是否显示
//panel_animation:"slide", 设置轮播的动画效果
//imgJson:[{"src":"t1.png","alt":"alt","title":"title"},{"src":"t1.png","alt":"alt","title":"title"}] 图片对象JSON数据格式

function clt_galleryview(option){
	var divId = option.divId;
	var ulId = divId + '_ulid';
	var imgHtml = '';
	var imgJson = option.imgJson;
	if(imgJson != null && imgJson != '' && imgJson != 'undefined'){
		$.each(imgJson, function (n, value) {
			imgHtml += "<li ><img id='n"+n+"' src='" + value.src + "'";
			if(typeof value.title != 'undefined'){
				imgHtml += " title='"+value.title + "'";
			}
			if(typeof value.alt != 'undefined'){
				imgHtml += " alt='"+value.alt + "'";
			}
			imgHtml += " /></li>";
		});
	}else{
		imgHtml = option.imgHtml;
	}
	$("#"+divId).html('<ul id="' + ulId + '"></ul');
	$("#"+ulId).html(imgHtml);
	var transition_speed=option.transition_speed;
	var transition_interval=option.transition_interval;
	var panel_width=option.panel_width;
	var panel_height=option.panel_height;
	var frame_gap=option.frame_gap;
	var start_frame=option.start_frame;
	var autoplay1=option.autoplay;	
	var enable_slideshow=option.enable_slideshow;
	var panel_animation=option.panel_animation;
	var show_captions=option.show_captions;
	var show_filmstrip=option.show_filmstrip;
	if(show_filmstrip==undefined||show_filmstrip==null){
		show_filmstrip=false;
	}
	if(transition_speed==null||transition_speed==undefined||transition_speed==""){
		transition_speed=500;
	}
	if(transition_interval==null||transition_interval==undefined||transition_interval==""){
		transition_interval=1000;
	}
	if(panel_width==null||panel_width==undefined||panel_width==""){
		panel_width=800;
	}
	if(panel_height==null||panel_height==undefined||panel_height==""){
		panel_width=300;
	}
	if(frame_gap==null||frame_gap==undefined||frame_gap==""){
		frame_gap=5;
	}
	if(start_frame==null||start_frame==undefined||start_frame==""){
		start_frame=1;
	}
	$("#"+ulId).galleryView({
		transition_speed:transition_speed,
		transition_interval:transition_interval,
		panel_width:panel_width,//主图片的宽度
		panel_height:panel_height,//主图片的高度	
		frame_gap:frame_gap,
		start_farme:start_frame,
		autoplay:autoplay1,//图片自动播	  
	    enable_slideshow:enable_slideshow,//是否显示小面板的暂停按钮
		panel_animation:panel_animation,
		show_captions:show_captions,
		show_filmstrip:show_filmstrip//小面板是否显示与隐藏
	});
}