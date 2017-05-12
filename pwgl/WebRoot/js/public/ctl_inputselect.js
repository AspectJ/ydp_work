/**
 * 可输入的下拉列表
 * 
 * 具体用法见option0的参数配置
 * inputId:'',//文本框id
 * serviceId:'',//服务id
 * paramName:'',//输入框的值用于查询的列的名称，用于后台服务获取参数值的节点名称
 * otherParam:{},//其他参数,支持多个参数，如果某参数是要动态获取的则以#加输入框的ID，格式为:{classId:'88','className':'#classNameInputId'}
 * labelName:[],//用于取显示值的属性名称,此处为字符串或者数组（如果要显示多个属性的话，放到数组里面）
 * bindValChangeParam:{},//值改变事件绑定参数
 * valChanged:function(){}//值改变回调
 * @auther admin
 */
var option0 = {
	inputId:'',//文本框id
	serviceId:'',//服务id
	//dialogId:'',//弹出层的dialogId
	isSetValue:true,//是否将选择的值赋值给输入框,默认会进行赋值(不输入该参数或指定为true)，指定为false则不会进行赋值
	paramName:'',//输入框的值用于查询的列的名称，用于后台服务获取参数值的节点名称
	otherParam:'',//其他参数
	labelName:[],//用于取显示值的属性名称,此处为字符串或者数组（如果要显示多个属性的话，放到数组里面） 
	labelWidth:[],//label的宽度
	height:300,//下拉层的高度 
	top:56,//top位置，弹出层的无需设定该值
	left:85,//left位置，弹出层的无需设定该值
	convertType:1,//对输入项的转换功能：1：统一转成小写 2：统一转成大写 3：不转换 
	valChanged:function(){}//值改变回调 
};



function ctl_inputSelect(option){
	//现在下拉项数据回调函数map（如果一个页面有多个inputselect，则将多个inputselect的回调函数映射到map中）
	var valChangeMap = new Map();
	var inputId = option.inputId;
	var serviceId = option.serviceId;
	var paramName = option.paramName;
	var otherParam = option.otherParam;
	var labelName = option.labelName; //数组  显示的项
	var labelWidth = option.labelWidth || [];  //默认每列100宽度 ，数字值
	var valChanged = option.valChanged;
	var convertType = option.convertType;
	var height = option.height || 300;
	var parentId = option.parentId;//用于动态生成下拉div
	
	valChangeMap.put(inputId,valChanged);
	
	//清除数据
	var parentObj = null;
    if(parentId != null || parentId != undefined){
    	parentObj = $("#"+parentId);
    	$("#searchSelectDiv").remove();
    } else {
    	//parentObj = $("div.ui_content") || $("#centerWorkDiv");
    	parentObj = $("#workMainDiv");
    }
    
    $("#searchSelectDiv").remove();
	//if(!$("#searchSelectDiv").is("div")){
		var divHtml = "<div class='i_tab1119' id='searchSelectDiv'><div class='i_tab'><table id='searchSelectTab'  border='0' cellpadding='0' cellspacing='0'>" +
		"</table></div></div>";
//        parentObj.prepend(divHtml);
        $("body").append(divHtml);
	//} 
	
	var $searchSelectDiv = $("#searchSelectDiv");
	$searchSelectDiv.children().css('height',height-5);//下个div的高度
	
	var $inputObj = $("#"+option.inputId);
	
	
	var offset = $inputObj.offset();
	var top = Number(offset.top)+Number($inputObj.innerHeight())+2;
	if(option.top != null && option.top != undefined){
		top = option.top;
	}
	
	var left = offset.left;
	if(option.left != null && option.left != undefined){
		left = option.left;
	}
	
	$searchSelectDiv.offset({top:top,left:left});
	
	//key = index  value = lidata;
	var inputMap = new Map();
	 var $searchSelectTab = $("#searchSelectTab");

	$searchSelectDiv.mouseleave(function(){
		$(this).hide();
	});
	$inputObj.bind('keyup dblclick',function(){
		var tex = $.trim($inputObj.val());// 输入框的值
		if(!tex){
			$searchSelectDiv.hide();
			return;
		}
		//统一转成小写
		var tempTex = tex;
		if(convertType == "1"){//统一小写
			tempTex = tex.toLowerCase();
		} else if (convertType == "2"){//统一大写
			tempTex = tex.toUpperCase();
		}
		
		var pData={};//入参
		pData[paramName] = tempTex;
		if (otherParam != null && otherParam != "") {
			for (key in otherParam) {
				var keyValue = otherParam[key];
				pData[key] = keyValue;
			}
		}
		publicAjaxRequest(serviceId,pData,jsonType,function(response) {
			var data = response.data;
			if(data==null||data==undefined||data.length==0){
				return;
			}
			var tabHtml = "";
			inputMap.clear();
			for ( var i = 0; i < data.length; i++) {
				var liData = data[i];
				tabHtml +="<tr name='"+inputId+"' index="+i+">";
				inputMap.put(i, liData);
				for(var k =0 ; k <labelName.length;k++){
					var attribute = labelName[k];
					var value = liData[attribute] || "无";
					var width = labelWidth[k] || 100; //默认每列100
					tabHtml+="<td width="+width+">"+value+"</td>";
				}
				tabHtml +="</tr>";
			}
			if(tabHtml){
				$searchSelectTab.html(tabHtml);
				$searchSelectDiv.show();
			}
		});
	});

	//鼠标浮动事件
	$searchSelectTab.mouseover(function(event){
		event = event ? event : (window.event ? window.event : null);
		var element = event.srcElement || event.target;
		var tagName = element.tagName;
		if(tagName == "TD"){
			var td = $(element);
			td.parent('tr').siblings().removeClass();
			td.parent('tr').addClass('liover');
		}
	});
	
	$searchSelectTab.click(function(event){
		event = event ? event : (window.event ? window.event : null);
		var element = event.srcElement || event.target;
		var tagName = element.tagName;
		if(tagName == "TD"){
			var index = $(element).parent().attr("index");
			var lidata = inputMap.get(index);
			if(!lidata){
				return;
			}
			//获取到对应的inputId
			var inputId=($(element).parent().attr('name'));
			//获取回调函数
			var valChagnedFunc=valChangeMap.get(inputId);
			if(valChagnedFunc!=null){
				valChagnedFunc(lidata);
			}
			$searchSelectDiv.hide();
		}
	}); 
} 