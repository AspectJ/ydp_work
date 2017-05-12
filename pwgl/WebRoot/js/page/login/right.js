var autoSizeMap = new Map();//定义处理框架表格和div自适应的map
$(function() {
	defaultSessionId = $.cookie("sessionIdKey");
	dlyh = $.cookie("dlyh");
	
	$(window).resize(debounce(function(){
		setAutoSize();
	},10,true));
	
});

function debounce(func, threshold, execAsap) {
	var timeout = 10;
	return function debounced () {
		var obj = this, args = arguments;
		function delayed () {
			if (!execAsap){
				func.apply(obj, args);
			}
			timeout = null;
		};
		if (timeout){
			clearTimeout(timeout);
		}else if (execAsap){
			func.apply(obj, args);
		}
		timeout = setTimeout(delayed, threshold || 100);
	};
}

//function divGetWidthGrid(){
//	var obj = window.top.frames['rightFrame'].$('#mainDIv');
//	var iWidth = obj.width() ;
//	return iWidth -  30; 
//}
//
//function divGetHeightGrid(){
//	var obj = window.top.frames['rightFrame'].$('#mainDIv');
//	var iHeight = obj.height() ;
//	return iHeight - 202;
//}

/**
* 将每个页面中的需要resize的对象加到处理框架表格和div自适应的map中,key值为页面的url
*/
function addAutoSize(resizeArr,callBack){
	autoSizeMap.put("resize",resizeArr);
}
/**
* 重新将页面元素自适应
*/
function setAutoSize(){
	//获取中间div的宽度
	var obj = window.top.frames['rightFrame'].$('#mainDIv');
	var width = obj.width();
	var height = $(window).height();
	
	var thePageResizeArr=autoSizeMap.get("resize");
	for(key in thePageResizeArr){
		var thePageResizeObj=thePageResizeArr[key];
		//存在该页面元素
		if(typeof(thePageResizeObj.htmlId)!="undefined"&&thePageResizeObj.htmlId!=""&&thePageResizeObj.htmlId!=null){
			//表格处理
			if(thePageResizeObj.htmlType == "jqgrid"){
				//高度处理
				if(typeof(thePageResizeObj.heightResize) != "undefined"){
					var newHeight=height;
					if(typeof(thePageResizeObj.heightThan) != "undefined"){
						newHeight = newHeight * thePageResizeObj.heightThan;
					}
					if(typeof(thePageResizeObj.heightResize) != "undefined"){
						newHeight = newHeight + thePageResizeObj.heightResize;
					}
					newHeight = parseInt(newHeight);
					jQuery("#"+thePageResizeObj.htmlId).jqGrid('setGridHeight',newHeight);//.trigger("reloadGrid")
				}
				//宽度处理
				if(typeof(thePageResizeObj.widthResize) != "undefined" || typeof(thePageResizeObj.widthThan) != "undefined"){
					var newWidth = width;
					if(typeof(thePageResizeObj.widthThan) != "undefined"){
						newWidth = newWidth * thePageResizeObj.widthThan;
					}
					if(typeof(thePageResizeObj.widthResize) != "undefined"){
						newWidth = newWidth + thePageResizeObj.widthResize;
					}
					newWidth = parseInt(newWidth);
//					alert("width="+width+",newWidth="+newWidth);
					jQuery("#"+thePageResizeObj.htmlId).jqGrid('setGridWidth',newWidth);//.trigger("reloadGrid")
				}
			}else if(thePageResizeObj.htmlType == "div"){//div处理
				//高度处理
				if(typeof(thePageResizeObj.heightResize) != "undefined" || typeof(thePageResizeObj.heightThan) != "undefined"){
					var newHeight = height;
					if(typeof(thePageResizeObj.heightResize) != "undefined"){
						newHeight = newHeight + thePageResizeObj.heightResize;
					}
					if(typeof(thePageResizeObj.heightThan) != "undefined"){
						newHeight = newHeight * thePageResizeObj.heightThan;
					}
					newHeight = parseInt(newHeight);
					$("#"+thePageResizeObj.htmlId).height(newHeight);
				}
				//宽度处理
				if(typeof(thePageResizeObj.widthResize) != "undefined" || typeof(thePageResizeObj.widthThan) != "undefined"){
					var newWidth = width;
					if(typeof(thePageResizeObj.widthResize) != "undefined"){
						newWidth = newWidth + thePageResizeObj.widthResize;
					}
					if(typeof(thePageResizeObj.widthThan) != "undefined"){
						newWidth = newWidth * thePageResizeObj.widthThan;
					}
					newWidth = parseInt(newWidth);
					$("#"+thePageResizeObj.htmlId).width(newWidth);
				}
			}
		}
	}
}

//退出系统
function gooutSystem(){
	//返回登录页面
	window.location.href = loginHtml;
	//移除后台session
	//ajax单行数据提交到后台
	publicAjaxRequest(goOutService,"",true,goOutService_callback);
}
//退出回调
function goOutService_callback(response){
	var resData=response.data;
	if(resData==true){
		
		//将前台session清空
		defaultSessionId="";
	}
}