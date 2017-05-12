$(function() {
	// Logo，地区，主菜单
	LogoMenuTextLoad(3);
	// 轮播图
//	carouselTextLoad("index");
	// 底部导航
	bottomTextLoad(1300);
});

var pageCount = 0;
var pageSize = 15;
var offsetNum = 0;

$(function() {
	var href = window.location.href;
	if(href.indexOf("noti_type") != -1) {   //发行通知和院线通知
		var noti_type = href.substring(href.indexOf("=")+1);
		
	    // 初始化数据(显示第一页)
	    InitData(0);
	    
	    function InitData(pageindx) {
	    	//清空页面数据
	    	$("#issue_notice ul").empty();
	    	
	    	var url = service_url + "notice/getFrontNoticeList";
	    	var num = 0;
	    	var index = pageindx + 1;
	    	if(index != 0){
	    		num = (index - 1) * pageSize;
	    	}
	    	$.ajax({
	    		url: url,
	    		data: {
	    			noti_type: noti_type,
	    			pageSize: pageSize,
	    			offsetNum: num
	    		},
	    		dataType: "jsonp",
	    		jsonp: "jsonpCallback",
	    		type: "POST",
	    		success: function(data) {
	    			if(noti_type == 0) {
	    				$(".headline").html("发行通知");
	    			}else {
	    				$(".headline").html("院线通知");
	    			}
	    			
	    			var resultData = data.data;
	    			pageCount = data.total;
	    			
	    			$("#Pagination").pagination(pageCount, {
	    	            callback: pageselectCallback,
	    	            prev_text: '« 上一页',
	    	            next_text: '下一页 »',
	    	            items_per_page: pageSize,     // 每页显示条数
	    	            current_page: pageindx,  // 当前页索引,这里0为第一页
	    	            num_display_entries: 3,  // 前面显示几个按钮
	    	            num_edge_entries: 2  // 后面显示几个按钮
	    	        });
	    			

	    			if(resultData != null && resultData.length > 0) {
	    				for(var i = 0; i < resultData.length; i++) {
	    					var noti_id = resultData[i].noti_id;
	    					var noti_title = resultData[i].noti_title;
	    					var update_time = resultData[i].update_time;
	    					var noti_document_url = resultData[i].noti_document_url;
	    					if(i < 3) {
	    						$(".content ul").append("<li><span class='num hot'>"+eval(i+1)+"</span><a href='homeland/notice.html?noti_id?="+noti_id+"'><span>"+noti_title+"</span></a><span class='time'>"+update_time+" <button type='button'>下载</button></span></li>");
	    					}else {
	    						$(".content ul").append("<li><span class='num'>"+eval(i+1)+"</span><a href='homeland/notice.html?noti_id?="+noti_id+"'><span>"+noti_title+"</span></a><span class='time'>"+update_time+" <button type='button'>下载</button></span></li>");
	    					}
	    					if(noti_document_url == "" || noti_document_url == null || typeof(noti_document_url) == "undefined") {
	    						$(".content ul li:last button").attr("disabled", "disabled");
	    					}
	    				$($(".content ul li:last button")).bind("click", {url: noti_document_url}, function(event) {
	    					window.location.href = service_url + "image/download?f=" + event.data.url;
	    				});
	    				}
	    			}
	    		}
	    	});
	    }
	    
	    //处理翻页,page_id为当前页索引(0为第一页)
	    function pageselectCallback(page_id, jq) {
	        InitData(page_id);
	    }
	}else if(href.indexOf("material") != -1) {  //素材下载
		InitData(0);
		
	    function InitData(pageindx) {
	    	//清空页面数据
	    	$("#issue_notice ul").empty();
	    	
	    	var url = service_url + "material/getMaterialList";
	    	var num = 0;
	    	var index = pageindx + 1;
	    	if(index != 0){
	    		num = (index - 1) * pageSize;
	    	}
	    	$.ajax({
	    		url: url,
	    		data: {
	    			pageSize: pageSize,
	    			offsetNum: num
	    		},
	    		dataType: "jsonp",
	    		jsonp: "jsonpCallback",
	    		type: "POST",
	    		success: function(data) {
	    			
	    			$(".headline").html("素材下载");
	    			var resultData = data.data;
	    			pageCount = data.total;
	    			
	    			$("#Pagination").pagination(pageCount, {
	    	            callback: pageselectCallback,
	    	            prev_text: '« 上一页',
	    	            next_text: '下一页 »',
	    	            items_per_page: pageSize,     // 每页显示条数
	    	            current_page: pageindx,  // 当前页索引,这里0为第一页
	    	            num_display_entries: 3,  // 前面显示几个按钮
	    	            num_edge_entries: 2  // 后面显示几个按钮
	    	        });
	    			

	    			if(resultData != null && resultData.length > 0) {
	    				for(var i = 0; i < resultData.length; i++) {
	    					var material_id = resultData[i].material_id;
	    					var material_name = resultData[i].material_name;
	    					var material_content = resultData[i].material_content;
	    					var update_time = resultData[i].update_time.substring(0, 10);
	    					if(i < 3) {
	    						$(".content ul").append("<li><span class='num hot'>"+eval(i+1)+"</span><span class='mate_title'>"+material_name+"【"+material_content+"】</span><span class='time'>"+ update_time +"</span></li>");
	    					}else {
	    						$(".content ul").append("<li><span class='num'>"+eval(i+1)+"</span><span class='mate_title'>"+material_name+"【"+material_content+"】</span><span class='time'>"+ update_time +"</span></li>");	    					}
	    				}
	    			}
	    		}
	    	});
	    	
	    	//处理翻页,page_id为当前页索引(0为第一页)
		    function pageselectCallback(page_id, jq) {
		        InitData(page_id);
		    }
	    }
	}else {
		toolTip("参数错误！");
		return;
	}
});