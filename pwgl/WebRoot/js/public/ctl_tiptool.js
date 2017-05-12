/**
 * 这是一个替换title的提示工具包 任托宇
 */
// title提示工具
var TitleTipTool = {
	// tipElements:"input,select,textarea,table,tr,td,button,a,label,img",
	// 自定义显示tip内容
	tipValue : '',
	tipElements : "input",
	init : function() {
		var tipValue = this.tipValue;
		$(this.tipElements).mouseover(function(e) {
			if (this.title != "") {
				this.myTitle = this.title;
				this.title = "";
			}
			if (typeof(this.title) == 'undefined'
					|| typeof(this.myTitle) == 'undefined') {
				this.myTitle = tipValue;
				// return;
			}
			var tooltip = "";
			if (this.myTitle == "") {
				tooltip = "";
			} else {
				tooltip = "<div id='publicTitleTooltip' style='position:absolute; z-index:1000; max-width:300px; width:auto!important; width:auto; background:#e0feba; border:#9bab81 solid 1px; text-align:left; padding:3px;WORD-WRAP: break-word;TABLE-LAYOUT: fixed;word-break:break-all'><p style='margin:0;padding:0; color:#000000;font:12px verdana,arial,sans-serif;'>"
						+ this.myTitle + "</p></div>";
			}
			$('body').append(tooltip);
			var elementZIndex = $(this.tipElements).css('z-index');
			var maxZindex = 2001;
			if (elementZIndex != null && elementZIndex != undefined
					&& elementZIndex != "") {
				maxZindex = elementZIndex + 1;
			}
			$("#publicTitleTooltip").css({
						"top" : (e.pageY + 3) + "px",
						"left" : (e.pageX) + "px",
						"z-index" : maxZindex
					}).show('fast');
		}).mouseout(function() {
					var tooltip = $("#publicTitleTooltip");
					if (typeof(tooltip) != 'undefined') {
						tooltip.remove();
					}
				});
	}
};
// 获取title提示工具对象
function getTitleTipTool() {
	return TitleTipTool;
}

/**
 * 当用户编辑内容时tip提示用户点击保存按钮
 * 
 * @param saveBtnId
 *            保存按钮id
 * @param leftOrRight
 *            提示信息出现在按钮的左边或右边 "left","right"
 * @param topOrBottom
 *            提示信息出现在按钮的上边或下边 "top","bottom"
 * @returns
 */
function ctl_showSaveTip(saveBtnId, leftOrRight, topOrBottom) {
	if (typeof(saveBtnId) == 'undefined') {
		alert("请先配置保存按钮Id！");
		return;
	}
	// 默认左
	if (typeof(leftOrRight) == 'undefined') {
		leftOrRight = "left";
	}
	// 默认上
	if (typeof(topOrBottom) == 'undefined') {
		topOrBottom = "top";
	}
	var divLeft = $("#" + saveBtnId).position().left;
	var divTop = $("#" + saveBtnId).position().top;
	var showImg = "<img src='images/page/tixing.png'/>";
	if (leftOrRight == "left") {
		if (topOrBottom == "top") {
			showImg = "<img src='images/page/tixing.png'/>";
			divLeft = divLeft + 90;
			divTop = divTop + 20;
		} else {
			showImg = "<img src='images/page/tixing2.png'/>";
			divLeft = divLeft + 70;
			divTop = divTop + $("#" + saveBtnId).outerHeight() + 60;
		}
	}
	if (leftOrRight == "right") {
		if (topOrBottom == "top") {
			showImg = "<img src='images/page/tixing4.png'/>";
			divLeft = divLeft + 150;
			divTop = divTop + 20;
		} else {
			showImg = "<img src='images/page/tixing3.png'/>";
			divLeft = divLeft + 150;
			divTop = divTop + $("#" + saveBtnId).outerHeight() + 60;
		}
	}

	$("#publicDiv_showSaveTip").remove();
	// 提醒div内容
	var showHtml = "";
	showHtml += '<div id="publicDiv_showSaveTip" style="position:absolute;width:129px;height:50px;margin-right:20px;z-index:9981;">';
	showHtml += showImg;
	showHtml += '</div>';

	$('body').append(showHtml);

	// $("#publicDiv_showSaveTip").show();
	$("#publicDiv_showSaveTip").css({
				left : divLeft + "px",
				top : divTop + "px"
			});
}
/**
 * 隐藏保存提示
 */
function ctl_hideSaveTip() {
	$("#publicDiv_showSaveTip").hide();
}
/**
 * 框架封装自定义提示tip
 * 
 * @param htmlId
 *            元素id
 * @param leftOrRight
 *            提示信息出现在元素的左边或右边 "left","right"
 * @param topOrBottom
 *            提示信息出现在元素的上边或下边 "top","bottom"
 * @param tipContent
 *            提示信息
 * @param tipWidth
 *            提示框的宽度
 * @param isDialog
 *            true:表示弹出层 默认不是弹出层；此参数目前只是为了解决目录合并弹出层的位置偏移问题，后续再调整完善
 *  @param autoClose 是否自动关闭提示层，默认true
 * @returns
 */
function ctl_showCustomTip(htmlId, leftOrRight, topOrBottom, tipContent,
		tipWidth, isDialog, left, top,autoClose) {
	if (typeof(htmlId) == 'undefined') {
		alert("请先配置保存按钮Id！");
		return;
	}
	// 默认左
	if (typeof(leftOrRight) == 'undefined') {
		leftOrRight = "left";
	}
	// 默认上
	if (typeof(topOrBottom) == 'undefined') {
		topOrBottom = "top";
	}
	if (typeof(tipWidth) == 'undefined') {
		tipWidth = 100;
	}
	var divLeft = $("#" + htmlId).position().left;
	var divTop = $("#" + htmlId).position().top;

	// 提醒div内容
	var showHtml = "";

	// 左
	if (leftOrRight == "left") {
		// 上
		if (topOrBottom == "top") {
			divLeft = divLeft + 90;
			divTop = divTop - 35;

			showHtml += '<div id="publicDiv_showSaveTip" class="tishixx" style="position:relative;width:100px;top:-100px;z-index:9981;">';
			showHtml += '<div class="tishixxm1">';
			showHtml += '<li class="tishixxm1a"></li>';
			showHtml += '<li class="tishixxm1b"></li>';
			showHtml += '</div>';
			showHtml += '<div class="tishixxm">';
			showHtml += '<div class="tishixxm2">';
			showHtml += '<div class="tishixxm2a">';
			showHtml += '<div class="tishixxm2b" style="">';
			showHtml += '<div class="lone"></div>';
			showHtml += '<div class="lone"></div>';
			showHtml += '<div class="tsxxcontb">';
			showHtml += '<li>' + tipContent + '</li>';
			showHtml += '</div>';
			showHtml += '<div class="lone"></div>';
			showHtml += '<div class="lone"></div>';
			showHtml += '</div>';
			showHtml += '</div>';
			showHtml += '</div>';
			showHtml += '</div>';
			showHtml += '<div class="tishixxm3">';
			showHtml += '<li class="tishixxm3a"></li>';
			showHtml += '<li class="tishixxm3b"></li>';
			showHtml += '<li class="tishixxm3d"></li>';
			showHtml += '</div>';
			showHtml += '</div>';
		} else {// 下
			divLeft = divLeft + 80;
			divTop = divTop + $("#" + htmlId).outerHeight() + 60;

			showHtml += '<div id="publicDiv_showSaveTip" class="tishixx" style="position:relative;width:100px;top:-100px;z-index:9981;">';
			showHtml += '<div class="tishixxm1u">';
			showHtml += '<li class="tishixxm1ua"></li>';
			showHtml += '<li class="tishixxm1ub"></li>';
			showHtml += '<li class="tishixxm1ud"></li>';
			showHtml += '</div>';
			showHtml += '<div class="tishixxm">';
			showHtml += '<div class="tishixxm2">';
			showHtml += '<div class="tishixxm2a">';
			showHtml += '<div class="tishixxm2b" style="">';
			showHtml += '<div class="lone"></div>';
			showHtml += '<div class="lone"></div>';
			showHtml += '<div class="tsxxcontb">';
			showHtml += '<li>' + tipContent + '</li>';
			showHtml += '</div>';
			showHtml += '<div class="lone"></div>';
			showHtml += '<div class="lone"></div>';
			showHtml += '</div>';
			showHtml += '</div>';
			showHtml += '</div>';
			showHtml += '</div>';
			showHtml += '<div class="tishixxm3">';
			showHtml += '<li class="tishixxm3a"></li>';
			showHtml += '<li class="tishixxm3b"></li>';
			showHtml += '</div>';
			showHtml += '</div>';
		}
	} else if (leftOrRight == "right") {// 右
		// 上
		if (topOrBottom == "top") {
			divLeft = divLeft + 200;
			divTop = divTop - 35;

			showHtml += '<div id="publicDiv_showSaveTip" class="tishixx" style="position:relative;width:100px;top:-100px;z-index:9981;">';
			showHtml += '<div class="tishixxm1">';
			showHtml += '<li class="tishixxm1a"></li>';
			showHtml += '<li class="tishixxm1b"></li>';
			showHtml += '</div>';
			showHtml += '<div class="tishixxm">';
			showHtml += '<div class="tishixxm2">';
			showHtml += '<div class="tishixxm2a">';
			showHtml += '<div class="tishixxm2b" style="">';
			showHtml += '<div class="lone"></div>';
			showHtml += '<div class="lone"></div>';
			showHtml += '<div class="tsxxcontc">';
			showHtml += '<li>' + tipContent + '</li>';
			showHtml += '</div>';
			showHtml += '<div class="lone"></div>';
			showHtml += '<div class="lone"></div>';
			showHtml += '</div>';
			showHtml += '</div>';
			showHtml += '</div>';
			showHtml += '</div>';
			showHtml += '<div class="tishixxm3">';
			showHtml += '<li class="tishixxm3a"></li>';
			showHtml += '<li class="tishixxm3c"></li>';
			showHtml += '<li class="tishixxm3b"></li>';
			showHtml += '</div>';
			showHtml += '</div>';
		} else {// 下
			divLeft = divLeft + 180;
			divTop = divTop + $("#" + htmlId).outerHeight() + 60;

			showHtml += '<div id="publicDiv_showSaveTip" class="tishixx" style="position:relative;width:100px;top:-100px;z-index:9981;">';
			showHtml += '<div class="tishixxm1u">';
			showHtml += '<li class="tishixxm1ua"></li>';
			showHtml += '<li class="tishixxm1ub"></li>';
			showHtml += '<li class="tishixxm1uc"></li>';
			showHtml += '</div>';
			showHtml += '<div class="tishixxm">';
			showHtml += '<div class="tishixxm2">';
			showHtml += '<div class="tishixxm2a">';
			showHtml += '<div class="tishixxm2b" style="">';
			showHtml += '<div class="lone"></div>';
			showHtml += '<div class="lone"></div>';
			showHtml += '<div class="tsxxcontb">';
			showHtml += '<li>' + tipContent + '</li>';
			showHtml += '</div>';
			showHtml += '<div class="lone"></div>';
			showHtml += '<div class="lone"></div>';
			showHtml += '</div>';
			showHtml += '</div>';
			showHtml += '</div>';
			showHtml += '</div>';
			showHtml += '<div class="tishixxm3">';
			showHtml += '<li class="tishixxm3a"></li>';
			showHtml += '<li class="tishixxm3b"></li>';
			showHtml += '</div>';
			showHtml += '</div>';
		}
	}

	$("#publicDiv_showSaveTip").remove();

	$('body').append(showHtml);

	var cssLeft = 0;
	if (isDialog) {
		 cssLeft = divLeft + 80;
	} else {
		 cssLeft = divLeft + (100 - tipWidth);
	}
	var cssTop = divTop;

	if (typeof(left) == "undefined") {
		$("#publicDiv_showSaveTip").css({
				width : tipWidth + "px",
				left : cssLeft + "px",
				top : cssTop + "px"
		});
	} else {
		$("#publicDiv_showSaveTip").css({
				width : tipWidth + "px",
				left : left + "px",
				top : top + "px"
		});
	}
	$("#publicDiv_showSaveTip div.lone").click(function() {
		ctl_hideCustomTip();
	});
	//自动关闭
	if(autoClose!=false){
		setTimeout(ctl_hideCustomTip,3000);
	}
	
}

/**
 * 隐藏自定义提示tip
 */
function ctl_hideCustomTip() {
	$("#publicDiv_showSaveTip").hide('slow');
}
