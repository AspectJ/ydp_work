var autoSizeMap = new Map();//定义处理框架表格和div自适应的map
var currentPageObj=null;//记录当前打开的页面对象
var mainLayout = null;//框架布局
var loginHtml = "login.html";//登录页面
var getUserSessionJsp = "getUserSession.jsp";
var resizeTimer = null;
var yhmc = "";

$(function() {
	defaultSessionId = $.cookie("sessionId");
	$.cookie("sessionId", null);
	if(defaultSessionId == null || defaultSessionId == ""){
		$.cookie("sessionId", null);
		window.location.href = "login.html";
	}
	
	//初始化菜单
	initUserData("首页");
	
	//菜单点击
	$("#leftMenu li").click(function(){
		$(".aside li.on").removeClass("on");
		$(this).addClass("on");
	});
	
	//导航切换
	$(".menuson li").click(function(){
		$(".menuson li.active").removeClass("active");
		$(this).addClass("active");
	});
	
	$('.title').click(function(){
		var $ul = $(this).next('ul');
		$('dd').find('ul').slideUp();
		if($ul.is(':visible')){
			$(this).next('ul').slideUp();
		}else{
			$(this).next('ul').slideDown();
		}
	});
	
	$('.wmleft > ul >li span').click(function(){
	    $(this).toggleClass('on');
	    $(this).next().slideToggle();
	}); 
    $('.select').click(function(){
	   $(this).children('ul').slideToggle();
    });
    $('.select ul li').click(function(){
	   $(this).parent().prev().text($(this).text());
    });
    
    $('.wmleft > ul li a').click(function(){
		   $('.wmleft > ul li a').removeClass('on');
		   $(this).addClass('on');
	});  
	   
	
	//处理刷新事件
	window.onunload = function(obj){
		var event;
		if(window.event){
			event = window.event;
		}else{
			event = obj;
		}
		//用户点击浏览器右上角关闭按钮或是按alt+F4关闭
		if(event.clientX>document.body.clientWidth&&event.clientY<0||event.altKey){
			 //alert("点关闭按钮");
		}if(event.clientY > document.body.clientHeight || event.altKey){//用户点击任务栏，右键关闭。s或是按alt+F4关闭else 
			 //alert("任务栏右击关闭");
		}else{//其他情况为刷新,点页面小X关闭单个页面时，也进了该方法
			$.cookie("sessionId",defaultSessionId);
		} 
	};
	
	$(window).bind('resize', function() {
		//重新将页面元素自适应
		setAutoSize();
	});
	
});

//初始化用户信息
function initUserData() {
	if (defaultSessionId) {
		jQuery.ajax({
			type : "POST",
			url : getUserSessionJsp,
			data : {
				sessionId : defaultSessionId
			},
			async : false,
			success : function(loginData) {
				var sessionData = JSON.parse(loginData);
				if (sessionData) {
					//initMenu(sessionData);
//					var userId = sessionData.data.userId;
					var userName = sessionData.data.dlzh;
					yhmc = userName;
					currentUser.yhid = sessionData.data.xtid;
					currentUser.dlzh = sessionData.data.dlzh;
					currentUser.yhnc = sessionData.data.yhnc;
					currentUser.yhlx = sessionData.data.yhlx;
					currentUser.jgfzr = sessionData.data.jgfzr;
					currentUser.jgid = sessionData.data.jgid;
					currentUser.jgmc = sessionData.data.jgmc;
					//设置成首页
					var divHtml="";
				    divHtml="<span class='l pl30'>您当前位置：首页</span><span class='db r pr30'>";
				    divHtml+="<a href='#' class='ml30'><img src='images/page/1_05.png' class='v_m' /><span class='pl5'>"+userName+"</span></a><a href='#'onclick='gooutSystem()'><span>&nbsp;&nbsp;&nbsp;退出</span></a></span>";
				    $("#current_location_div").html(divHtml);
				} else {
					ctl_alert("连接服务器失败，请重试或与管理员联系!", function() {
						window.location.href = loginHtml;
					});
				}
			},
			error : function() {
				ctl_alert("连接服务器失败，请重试或与管理员联系!", function() {
					window.location.href = loginHtml;
				});
			}
		});
	} else {
		window.location.href = loginHtml;
	}

}

//初始化菜单
function initMenu(sess){
	var menu = sess.data.menu;
	if(null != menu && menu != "" && menu != "undefined"){
		var allMenu = "";
		var menuStr = "";
		var fcdmc = "";
		var cdxh = 0;
		var divHtml="";
		divHtml+="<li class='on'><a href='#' class='pt15'><span class='dnb m-bg1'></span><p class='pt5 pl10'>首页</p></a></li>";
		divHtml+="<li><a href='#' onclick='openUrl('pages/item/indexItem.html','项目管理','项目管理')'  class='pt15'><span class='dnb m-bg2'></span><p class='pt5'>项目管理</p></a></li>";
        divHtml+="<li><a href='#' class='pt15'><span class='dnb m-bg3'></span><p class='pt5'>场次管理</p></a></li>";
        divHtml+="<li><a href='#' class='pt15'><span class='dnb m-bg4'></span><p class='pt5'>分区座位</p></a></li>";
        divHtml+="<li><a href='#' class='pt15'><span class='dnb m-bg5'></span><p class='pt5'>销售管理</p></a></li>";
    	$("#leftMenu").html(divHtml);
		for(var i = 0,len = menu.length; i < 4;i++){
			var m = menu[i];
			var cdmc = m.cdmc;
			var cdurl = m.cdurl;
			var ys = m.ys;	
			if(cdurl == "" || cdurl == null){
				
			}
			if(cdurl == "" || cdurl == null){
				if(i > 0){
					menuStr += "</ul></li>";
					allMenu += menuStr;
				}
				fcdmc = cdmc;
				cdxh++;
			     menStr="<li><a href='#' class='pt15'><span class='dnb m-bg2'></span><p class='pt5'>"+cdmc+"</p></a></li>";
//				menuStr = "<li class='l_bgn"+cdxh+"'><span class='f14 '>"+cdmc+"</span><ul class='bgf d_n'>";
			}else{
				menuStr += "<li><a href='#' onclick=\"openUrl('"+cdurl+"','"+fcdmc+"','"+cdmc+"')\">"+cdmc+"</a></li>";
			}
			
			if(i == (len -1)){
				menuStr += "</ul></li>";
				allMenu += menuStr;
				menuStr = "";
			}
		}
	
	}
}

/**
* 将每个页面中的需要resize的对象加到处理框架表格和div自适应的map中,key值为页面的url
*/
function addAutoSize(resizeArr,callBack){
	autoSizeMap.put(currentPageObj.taburl,resizeArr);
	setAutoSize();
	if(callBack!=null){
		callBack();
	}
}
/**
* 重新将页面元素自适应
*/
function setAutoSize(){
	//获取中间div的宽度
	var centerWidth = $("#workMainDiv").width();
	var centerHeight = $("#leftDiv").height() - 135;
	var thePageResizeArr = autoSizeMap.get(currentPageObj.taburl);
	for(key in thePageResizeArr){
		var thePageResizeObj = thePageResizeArr[key];
		//存在该页面元素
		var htmlid = thePageResizeObj.htmlId;
		if(typeof(htmlid) != "undefined" && htmlid != "" && htmlid != null){
			//表格处理
			var htmlType = thePageResizeObj.htmlType;
			if(htmlType == "jqgrid"){
				//高度处理
				if(typeof(thePageResizeObj.heightResize) != "undefined"){
					var newHeight = centerHeight;
					if(typeof(thePageResizeObj.heightResize) != "undefined"){
						newHeight = newHeight + thePageResizeObj.heightResize;
					}
					if(typeof(thePageResizeObj.heightThan) != "undefined"){
						newHeight = newHeight * thePageResizeObj.heightThan;
					}
					newHeight = parseInt(newHeight);
					jQuery("#"+htmlid).jqGrid('setGridHeight',newHeight);//.trigger("reloadGrid")
					
					//处理多级表头的自适应
					var divObj = jQuery("#" + gridViewIdPre + thePageResizeObj.htmlId);
					var divTh = divObj.find(gridHeaderFrc);
					var divTr = divTh.children();
					var tableTr = divObj.find(gridTableFrc);
					var tableTd = tableTr.children();
					var divLen = divTr.length;
					for(var i = 0;i<divLen;i++){
						var trObj = divTr[i];
						if(trObj.style.display != 'none'){//如果是隐藏的列则不做处理
							trObj.style.width = tableTd[i].style.width;
						}
					}
				}
				//宽度处理
				if(typeof(thePageResizeObj.widthResize) != "undefined" || typeof(thePageResizeObj.widthThan) != "undefined"){
					var newWidth = centerWidth;
					if(typeof(thePageResizeObj.widthResize) != "undefined"){
						newWidth = newWidth + thePageResizeObj.widthResize;
					}
					if(typeof(thePageResizeObj.widthThan) != "undefined"){
						newWidth = newWidth * thePageResizeObj.widthThan;
					}
					newWidth = parseInt(newWidth);
					jQuery("#"+htmlid).jqGrid('setGridWidth',newWidth);//.trigger("reloadGrid")
				}
			}else if(htmlType == "div"){
				//高度处理
				if(typeof(thePageResizeObj.heightResize) != "undefined" || typeof(thePageResizeObj.heightThan) != "undefined"){
					var newHeight = centerHeight;
					var oldHight = $("#"+htmlid).height();
					if(typeof(thePageResizeObj.heightThan) != "undefined"){
						newHeight = newHeight * thePageResizeObj.heightThan;
					}
					if(typeof(thePageResizeObj.heightResize) != "undefined"){
						newHeight = newHeight + thePageResizeObj.heightResize;
					}
					newHeight = parseInt(newHeight);
					if(newHeight != oldHight){
						$("#"+htmlid).height(newHeight);
					}
				}
				//宽度处理
				if(typeof(thePageResizeObj.widthResize) != "undefined" || typeof(thePageResizeObj.widthThan) != "undefined"){
					var newWidth = centerWidth;
					var oldWidth = $("#"+htmlid).width();
					if(typeof(thePageResizeObj.widthThan) != "undefined"){
						newWidth = newWidth * thePageResizeObj.widthThan;
					}
					if(typeof(thePageResizeObj.widthResize) != "undefined"){
						newWidth = newWidth + thePageResizeObj.widthResize;
					}
					newWidth = parseInt(newWidth);
					if(newWidth != oldWidth){
						$("#"+htmlid).width(newWidth);
					}
				}
			}
		}
	}
}

function openUrl(url,fcdmc,cdmc){
	   if(cdmc!='首页'){	
		    $("#main_div").hide();
			currentPageObj={taburl:url};
			$("#rightDiv").show();	
			$("#workMainDiv").load(url);
			var divHtml="";
			divHtml="<span class='l pl30'>您当前位置：首页</span><span class='db r pr30'>";
		    divHtml+="<a href='#' class='ml30'><img src='images/page/1_05.png' class='v_m' /><span class='pl5'>"+yhmc+"</span></a><a href='#'onclick='gooutSystem()'><span>&nbsp;&nbsp;&nbsp;退出</span></a></span>";
		    $("#current_location_div").html(divHtml);
	   }else{
		    $("#main_div").show();
		    $("#rightDiv").hide();	
			var divHtml="";
			divHtml="<span class='l pl30'>您当前位置：首页</span><span class='db r pr30'>";
		    divHtml+="<a href='#' class='ml30'><img src='images/page/1_05.png' class='v_m' /><span class='pl5'>"+yhmc+"</span></a><a href='#'onclick='gooutSystem()'><span>&nbsp;&nbsp;&nbsp;退出</span></a></span>";
		    $("#current_location_div").html(divHtml);
	   }
}

//退出系统
function gooutSystem(){
	var data ={operType:'pt'};
	var param = "serviceId/=/"+goOutService+"/;/sessionId/=/"+defaultSessionId+"/;/dataFormat/=/"+defaultDataFormat;
	$.ajax({
		type : "POST",
		url : springMvcUrl,
		data : {
			param : param,
			data : JSON.stringify(data)
		},
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		success : function(response) {
		},
		error : function(XMLHttpRequest, errMes, exception) {
		},
		dataType : "json"
	});
	
	$.cookie("sessionIdKey", null);
	$.cookie("dlyh", null);
	window.location.href = loginHtml;
}
//退出回调
function goOutService_callback(response){
	var resData=response.data;
	if(resData==true){
		
		//将前台session清空
		defaultSessionId="";
	}
}

/**
 * 禁用鼠标右键
 */
$(document).bind("contextmenu",function(e){
	return true; 
});
