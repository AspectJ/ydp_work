/**
 * 收缩效果的封装
 */
/**
 * tagIds:表示点击的divIds数组 contentIds:表示内容的divIds数组 dakaiCss:展开的样式 shouqiCss:收缩的样式
 */
function ctl_contractionMore(tagIds, contentIds, dakaiCss, shouqiCss) {
	for ( var i = 0; i < tagIds.length; i++) {
		var tagId = tagIds[i];
		$("#" + tagId).click(
				function() {
					var c = $(this).parent().children();
					if (shouqiCss == null)
						shouqiCss = "dwxx_title1hover";
					if (dakaiCss == null)
						dakaiCss = "dwxx_title1";
					var curTagId = $(this).attr('id');
					var coentObj = $(this).next();
					var curContentId = coentObj.attr('id');
					var currCss = $("#" + curTagId).attr('class');
					// 如果当前是打开的css，则点击的时候需要变成关闭的css，并且下面的content需要隐藏
					if (currCss == dakaiCss) {
						$(this).removeClass(dakaiCss).addClass(shouqiCss);
						coentObj.hide();
					}

					// 如果当前是关闭的css，则点击的时候需要变成打开的css，并且下面的content需要显示
					// 同级的div需要收起
					if (currCss == shouqiCss) {
						$(this).removeClass(shouqiCss).addClass(dakaiCss);
						coentObj.show();
						for ( var j = 0, len = c.length; j < len; j++) {
							var o = c[j];
							var currId = ($(o).attr('id'));
							if (curTagId == currId || curContentId == currId) {
								continue;
							}

							if ($(o).attr('class') == shouqiCss
									|| $(o).attr('class') == dakaiCss) {
								$(o).removeClass(dakaiCss).addClass(shouqiCss);
							} else {
								$(o).hide();
							}
						}
					}

				});
	}
}
/**
 * 
 * @param tagIds
 *            表示标题,多个divId
 * @param contentIds
 *            表示内容,多个divId
 * @param addCss
 *            表示点击时改变的样式
 */
function ctl_contractDivMore(tagIds, contentIds, addCss) {
	for ( var i = 0; i < tagIds.length; i++) {
		var tagId = tagIds[i];
		$("#" + tagId).click(function() {
			for ( var j = 0; j < contentIds.length; j++) {
				var contentId = contentIds[j];
				$(this).addClass(addCss) // 为当前元素增加highlight类
				.next("#" + contentId).animate({
					height : 'toggle',
					opacity : 'toggle'
				}, "slow").end() // 将子节点的a元素显示出来并重新定位到上次操作的元素
				.siblings().removeClass(addCss) // 获取元素的兄弟元素，并去掉他们的highlight类
				.next("#" + contentId).hide(); // 将兄弟元素下的a元素隐藏
			}
		});
	}
}

/**
 * 
 * @param barId
 *            控制收起展开的div
 * @param contentId
 *            需要收起和展开的div
 * @param initState
 *            div的初始状态是收起还是展开 show,hide
 * @param initClass
 *            div的初始化class
 * @param reverseCss
 *            点击收起或展开时的class
 * @param callBack1
 *            奇数次点击时的回调
 * @param callBack2
 *            偶数次点击时的回调
 */
function ctl_contractDiv(barId, contentId, initState, initClass, reverseCss,
		callBack1, callBack2) {
	if (initState == null)
		initState = "show";
	if (initClass == null)
		initClass = "zhankai";
	if (reverseCss == null)
		reverseCss = "shousuo";
	$("#" + barId).addClass(initClass);

	$("#" + barId).toggle(function() {
		$("#" + barId).removeClass(initClass).addClass(reverseCss);

		if (initState == "show")
			$("#" + contentId).hide();
		else
			$("#" + contentId).show();

		if (callBack1 != null)
			callBack1();
	}, function() {

		$("#" + barId).removeClass(reverseCss).addClass(initClass);

		if (initState == "show")
			$("#" + contentId).show();
		else
			$("#" + contentId).hide();

		if (callBack2 != null)
			callBack2();
	});
}

/**
 * 
 * @param tagIds:表示数组id
 * @param contentId:表示收缩内容Ids
 * 
 */
function ctl_contractionOnly(tagIds, contentIds) {
	for ( var i = 0; i < tagIds.length; i++) {
		var tagId = tagIds[i];
		var tempTagId = tagId;
		$("#" + tagId).click(function() {
			for ( var j = 0; j < contentIds.length; j++) {
				var contentId = contentIds[j];
				if (tagId == tempTagId) {
					$(this).next("#" + contentId).animate({
						height : 'toggle',
						opacity : 'toggle'
					}, "slow");
				} else {
					$(this).next("#" + contentId).animate({
						height : 'toggle',
						opacity : 'toggle'
					}, "slow");
				}
			}
		});
	}
}
/**
 * 
 * @param tagId表示tagId
 * @param contentId表示contentId
 */
function ctl_contraction(tagId, contentId) {
	$("#" + tagId).toggle(function() {
		$(this).next("#" + contentId).animate({
			height : 'toggle',
			opacity : 'toggle'
		}, "slow");
	}, function() {
		$(this).next("#" + contentId).animate({
			height : 'toggle',
			opacity : 'toggle'
		}, "slow");
	});
}


/**
 * 自定义显示列
 * @param gridId 表名
 * @param colNames 列名称例：['单据号','填报分类代码','物品目录编号']
 * @param colModel [billid,assetsortid,articlequipid]
 */
function ctl_chooseShowCol(gridId,colNames,colModel){
	// 拼装div
	var div = "<div><div class='pub_role_tab'><ul><li><div class='role_list'>";
	var count = Math.ceil((colNames.length)/4);// 计算出列的行数
	var firInd = Math.ceil((colNames.length)/count);
	
	var n = 1;
	for ( var int = 0; int < firInd; int++) {
		div += "<dl>";
		var maxLen = (n-1)*count+count;		
		if(parseFloat(maxLen) > parseFloat(colNames.length)){maxLen = colNames.length;}
		for ( var secIn = (n-1)*count; secIn < maxLen; secIn++) {
			div += "<dd><input type='checkbox' name='"+gridId+"_box' value='"+colModel[secIn]+"'";
			// 得到表格现有显示的列，默认选中
			if(!$("#"+gridId+"_"+colModel[secIn]).is(":hidden")){
				div += " checked='checked' ";
			};		
			
			div += "/><label>"+colNames[secIn]+"</label></dd>";
		}		
		div += "</dl>";
		n ++;
	}
	
	div += "</div></li>";
	div += "<li class='ri'>" +			
			"<button type='submit' class='anniu' id='"+gridId+"_chooseCancel'>" +
			    "<span class='anniuico'><span class='ico-401' title='取消'></span></span><span class='anniutxt'>取消</span>" +
		    "</button>" +
		    "<button type='submit' class='anniu' id='"+gridId+"_chooseBtn'>" +
			"<span class='anniuico'><span class='ico-501' title='确定'></span></span><span class='anniutxt'>确定</span>" +
		"</button>" +
		  "</li>";	
	div += "</ul></div></div>";	
	
	var dialog = ctl_dialogDivClose('',{title:'选项',min:false,max:false,content:div,lock:true});
	
	// 做热区
	 $("input[name='"+gridId+"_box']:checkbox").siblings("label").click(function(){
		 var check = $(this).prev("input[name='"+gridId+"_box']:checkbox");
		 if(check.is(":checked")){
			 check.attr("checked",false);
		 }else{
			 check.attr("checked",true);
		 }
	 });	 
	 
	// 确定
	$("#"+gridId+"_chooseBtn").click(function(){
		  var array = new Array();	      
	      var hideArray = new Array();
	      
	      $.each($(".ui_content input[name='"+gridId+"_box']:checkbox"),function(){	 
	    	  var col = $(this).attr("value"); 
	    	  if(!$(this).is(":checked")){
	    		  // 装隐藏列的容器	    		 
		   		   ctl_arrayAdd(hideArray,col);	 
	    	  }else{
	    		  // 装显示列的容器
		   		   ctl_arrayAdd(array,col);
	    	  }	   		   		
	   	  });
	      
	      // 显示列
	      ctl_showColumn(gridId,array);
	     // 隐藏列
	      ctl_hiddenColumn(gridId,hideArray);
	});
	
	// 取消
	$("#"+gridId+"_chooseCancel").click(function(){
		ctl_closeDialog(dialog);
	});
}

/**
 * 
 */

/**
 * 对数组的数字进行快速排序
 * 
 * @param array
 * @returns
 */
var ctl_quickSort = function(array) {
	var arr = array;// 将数组赋予变量arr
	var i = 0;// 初始化数组第一位i
	var j = arr.length - 1;// 数组长度,快排一般从数组最后一位开始比较
	var qSort = function(i, j) {// 闭包函数 qSort
		if (i == j) {// 当i向后移，j向前移，相当结束
			return ;                        
		}
		var ai = arr[i];// 记录初始比较值
		var ii = i;                             
		var jj = j;
		while (i < j) {// 当i<j，开始快排操作
			if (arr[j] >= ai) {             
				j--;
			} else {
				arr[i] = arr[j];
				i++;
				while (i < j) {
					if (arr[i] > ai) {
						arr[j] = arr[i];
						break;
					} else {
						i++;
					}
				}
			}
		}// 当一次快排结束，i=j,arr[i]位于中间值
		if (ii == i) {// 判断ii==i，如果等于，说明快排次数结束
			qSort(++i, jj);
			return;
		}
		arr[i] = ai;// 将初始比较值放在arr[i]上，i为中间值
		qSort(ii, i);// 对[arr[ii]-arr[i]]进行快排
		qSort(j, jj);// 对[arr[j]-arr[jj]]进行快排
	};
	qSort(i, j);
	return array;
};

/**
 * 判断字符串的是否以指定的字符串结尾的
 * @param endStr 指定的结尾字符串
 * @returns true：表示是以指定的字符串结尾，false：表示否
 */
String.prototype.endWith=function(endStr){
	if(endStr == null||endStr == ""||this.length == 0||endStr.length > this.length){
		return false;
	}
	if(this.substring(this.length-endStr.length)==endStr){
		return true;
	}else{
		return false;
	}
};

/**
 * 判断字符串的是否以指定的字符串开头的
 * @param beginStr 指定的开头字符串
 * @returns true：表示是以指定的字符串开头，false：表示否
 */
String.prototype.startWith=function(beginStr){
	if(beginStr == null||beginStr == ""||this.length == 0||beginStr.length > this.length){
		return false;
	}
	if(this.substr(0,beginStr.length) == beginStr){
		return true;
	}else{
		return false;
	}
};

/**
 * 小数点前面整数位的验证
 * @param val 数字
 * @param len 整数的位数
 *  @param msg 提示信息
 */
function pub_valiZsFunction(val,len,msg,id){	
	if(val != 0){
		if(val.indexOf(".") != -1){
			val = val.substring(0,val.indexOf("."));
			if(val.length > len){
				if(id){
					ctl_initShowMsg(msg,id);
				}else{
					ctl_showMsg(msg);
				}
				
				return false;
			}
		}else if(val.length > len){
			if(id){
				ctl_initShowMsg(msg,id);
			}else{
				ctl_showMsg(msg);
			}
			return false;
		}
	}
	return true;
}

/**
 * 输入是整数验证
 * @param val 值
 * @param msg 提示信息
 */
function valCountFun(val,msg){
	var isTrue = true;
	if(val){
	   var reg = /^[0-9]*$/;
	   isTrue = reg.test(val);
	}
	
	if(!isTrue){
		ctl_showMsg(msg);
	}
	return isTrue;
}

/**
 * 数字的验证
 */
function valNumFun(val,msg){
	var isTrue = true;
	if(val){
		var valReg = new RegExp("^([+]?)\\d*\\.?\\d+$");
		isTrue = valReg.test(val);
	}
	
	if(!isTrue){
		ctl_showMsg(msg);
	}
	return isTrue;
}

/**
 * 整数的验证
 */
function valIntegerFun(val,msg){
	var isTrue = true;
	if(val){
		var valReg = new RegExp("^-?[0-9]\\d*$");
		isTrue = valReg.test(val);
	}
	
	if(!isTrue){
		ctl_showMsg(msg);
	}
	return isTrue;
}



/**
 * 输入是数字包含4位小数
 */
function valFourPointFun(val,msg){
	var isTrue = true;
	if(val){
	   var reg = /^(([1-9]\d*)|(([0-9]{1}|[0-9]+)\.[0-9]{1,4}))$/;
	   isTrue = reg.test(val);
	}
	
	if(!isTrue){
		ctl_showMsg(msg);
	}
	return isTrue;
}

/**
 * 输入是数字包含2位小数的验证
 */
function valTwoPointFun(val,msg){
	var isTrue = true;
	if(val){
	   var reg = /^(([0-9]\d*)|(([0-9]{1}|[0-9]+)\.[0-9]{1,2}))$/;
	   isTrue = reg.test(val);
	}
	
	if(!isTrue){
		ctl_showMsg(msg);
	}
	return isTrue;
}

/**
 * 填报添加页面信息可收缩
 * @param oSourceObj
 * @param oTargetObj
 * @param shutAble
 * @param oOpenTip
 * @param oShutTip
 */
function openShutManager(oSourceObj,oTargetObj,shutAble,oOpenTip,oShutTip){
	var sourceObj = $(oSourceObj);
	var targetObj = $("#"+oTargetObj);
	var openTip = oOpenTip || "";
	var shutTip = oShutTip || "";
	if(targetObj.css("display")!="none"){
	   if(shutAble) return;
	   targetObj.css("display","none");
	   if(openTip  &&  shutTip){
		   sourceObj.html(shutTip); 
	   }
	} else {
	   targetObj.css("display","block");
	   if(openTip  &&  shutTip){
	    sourceObj.html(openTip); 
	   }
	}
	
	$(".ui_l").css("height","");
	$(".ui_c").css("height","");
	$(".ui_r").css("height","");
	$(".ui_l").css("height","auto");
	$(".ui_c").css("height","auto");
	$(".ui_r").css("height","auto");
}

/**
 * 取当前日期
*/
function currentDate(){
	var d = new Date();
	var vYear = d.getFullYear();
	var vMon = d.getMonth() + 1;
	var vDay = d.getDate();
	//var h = d.getHours();
	//var m = d.getMinutes();
	//var se = d.getSeconds();
	var s = vYear +"-"+ (vMon < 10 ? "0" + vMon : vMon)
			+"-"+(vDay < 10 ? "0" + vDay : vDay);
	// var hmse =  (h < 10 ? "0" + h : h)+ (m < 10 ? "0" + m : m) + (se < 10 ? "0" + se : se);
	return s;
}

/**
 * 日期比较
 * @param a
 * @param b
 *
 * @returns {Boolean}
 */
function duibi(a, b) {
    var arr = a.split("-");
    var starttime = new Date(arr[0], arr[1], arr[2]);
    var starttimes = starttime.getTime();

    var arrs = b.split("-");
    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
    var lktimes = lktime.getTime();

    if (starttimes >= lktimes) {
        return false;
    }
    else
        return true;

}

/**
 * 前一个数不能比后一个数小的比较
 */
function pub_compareCount(bigCount,smallCount){
	if(parseFloat(bigCount) >= parseFloat(smallCount)){
		return true;
	}
	return false;
}

/**
 * 字节长度的验证
 * 
 * @param val
 *            值
 * @param maxLen
 *            最大长度
 * @return true/false 长度是否符合
 */
function pub_valByteLen(val,maxLen) {
	var len = 0; 
	for (var i = 0; i < val.length; i++) { 
	if (val[i].match(/[^\x00-\xff]/ig) != null){ // 全角
		len += 3; 
	}
	else {
		len += 1; 
	}
	} 	
	if(parseInt(len,10)>parseInt(maxLen,10)){
		return false;
	}
	return true; 
} 

/**
 * 去字符串的字符，只保留数字
 */
function pub_strToNumber(val){
	var rs = 0;
	var ov = val.replace(/[^0-9]/ig, "");
	if(ov){
		var fn = ov.substring(0, 1);
		rs = val.substring(val.indexOf(fn));
	}
	return parseFloat(rs); 
}