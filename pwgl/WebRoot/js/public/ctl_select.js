/*!
 * jQuery ctl_select	//下拉框
 *
 * Date: 2012-07-25
 * 
 * 
	参数说明
	id:'',此id为唯一标识,假设id为dr1,则可以用方法dr1.init(data,selected)初始化/可用作联动/,dr1.text,dr1.value;$('#dr1').val();dr1.onchange=callback	
	dialogId:'',// 如果下拉框在弹出窗体中，则指定改弹出窗的DIV ID
	hiddenId:'',//存放选中项的text的输入框的ID,输入框的type='hidden'
	width:100,下拉框显示宽
	listboxwidth:0,下拉框宽为0表示同上面的显示宽度
	listboxmaxheight:200,下拉框最大高度，超过即显示滚动条
	listboxalign:'auto',下拉列表的对齐方式，可选值left,right,auto
	columns:1, 显示列数
	optionCount: 指定每列显示个数，动态计算列数,取得data数据的个数/optionCount(设置了此参数则columns设为''或不设置columns)
	checkbox:false,是否复选
	maxchecked:3,最多同时选择数，checkbox=true时有效
	selectedtext:'',checkbox=true时有效,选择框文字,为空显示为选中项，非空时固定不变
	requiredvalue:[],必须选择的值,显示为不可点击状态，checkbox=true时有效
	disabled:false,是否禁用
	selectclass:'ddl-select',选框样式
	listboxclass:'ddl-listbox',展开的列表框样式
	selected:[],选中的对象value
	selectedIndex:'',按照索引为来默认选中,默认1是选中的默认值'请选择'，如果不想是默认选中默认值，指定>1的索引 ,此属性只适应于ajax请求的下拉框
	disableDefaultText:false,是否禁用默认值，true禁用 false使用 默认false,此属性只适应于ajax请求的下拉框,如果禁用了默认值，则selectedIndex为1时不会选中默认值
	defaultText:显示初始化选择框文字，为空则默认为  请选择
	data:{},数据，格式：{value:name} 注意：非标准JSON格式
	url:ajax请求到后台的url
	columnValue:data数据的value,后台返回json数据的value名称,可自行定义
	columnName:data数据的name,后台返回json数据的name名称,可自行定义
	param:传到后台的参数
	type:数据传输方法(post/get)
	dateType:返回的数据类型(json)
	beforechange:null,参数:oldText原文本oldValue原值 newText新文本newValue新值，要中断则在回调函数里return false,继续执行则return true
	onchange:null,
	onsyncomplete:null,// 异步下拉框的回调(参数：data,selectValue,selectText),data:格式为JSON,异步加载时格式为[{"name":'test',"pass":'test'}],本地数据时格式为{"test":"test","test1":"test1"} selectValue:默认选中值 selectText：默认选中项的显示值
 */
(function($) {
    $.fn.ctl_select = function(opts) {
        var settings = {
            id: '',
            dialogId: '', // 如果下拉框在弹出窗体中，则指定改弹出窗的DIV ID
            hiddenId:'',//存放选中项的text的输入框的ID,输入框的type='hidden',通过该输入框来获取选中的text
            width: '',
            listboxwidth: '',
            listboxmaxheight: '',
            listboxalign: 'auto',
            columns: '',
            optionCount: '',
            checkbox: false,
            maxchecked: '',
            selectedtext: '',
            requiredvalue: [],
            disabled: false,
            selectclass: 'ddl-select',
            listboxclass: 'ddl-listbox',
            selected: [],
            selectedIndex: '',
            disableDefaultText : false,
            defaultText: '',
            url: '',
            param: {},
            readerRoot: '',//ajax形式的读取数据的根节点属性
            type: 'post',
            dataType: 'json',
            columnValue: '',
            columnName: '',
            data: {},
            beforechange:null,
            onchange: null,
            keydata:null,//保存key值的顺序的数组Array
            onsyncomplete: null, // 异步下拉框的回调(参数：data,selectValue,selectText),data:格式为JSON,异步加载时格式为[{"name":'test',"pass":'test'}],本地数据时格式为{"test":"test","test1":"test1"} selectValue:默认选中值 selectText：默认选中项的显示值
            onBeforeLoad:null // 对后台得到的数据进行更改，返回新的data
        };

        var stopBubble = function(a) {
            var a = a || window.event;
            if (a.stopPropagation) {
                a.stopPropagation();
            } else {
                window.event.cancelBubble = true;
            }
        };
        return this.each(function() {
            $.extend(settings, opts || {});
            if (settings.id == '') {
                throw new Error('ctl_select 的id不能为空。');
            }
            if (settings.checkbox) {
                for (var _i = 0; _i < settings.requiredvalue.length; _i++) {
                    if ($.inArray(settings.requiredvalue[_i], settings.selected) == -1) {
                        throw new Error(settings.id + '错误：必须选择的值（requiredvalue）没有设置为选中（selected）');
                    }
                }
                if (settings.selected.length > settings.maxchecked) {
                    throw new Error(settings.id + '错误：默认选中的值（selected）多于设置的最多同时选择的值（maxchecked）');
                }
            }

            var $this = $(this);
            $this.empty();
            window[settings.id] = {};
            var objid = eval(settings.id);
            objid.onchange = settings.onchange;
            var select = $('<div>', {
                'class': (settings.disabled ? settings.disabledclass: settings.selectclass),
                'width': settings.width,
                'click': function(evt) {
                    $('.ddlclass').hide();
                    if (settings.disabled) {
                        return;
                    }
                    var $thispos = $(this).offset(); //$thispos.top=52
                    var $thisheight = $(this).outerHeight(); //22
                    var $lb = $('div.' + settings.listboxclass, $this);
                    var $lbheight = $lb.outerHeight(); //80
                    var $lbwidth = $lb.outerWidth();
                    var lbtop = (($thispos.top + $thisheight + $lbheight) > $(document).height() && $thispos.top > $lbheight) ? $thispos.top - $lbheight: $thispos.top + $thisheight;
                    var minusTop = 0;
                    var minusLeft = 0;

                    if (settings.dialogId != null && settings.dialogId != '' && typeof(settings.dialogId) != 'undefined') {
                        var dialogObj = $('#' + settings.dialogId);
                        minusTop = dialogObj.top;
                        minusLeft = dialogObj.left;

                    } else {
                        minusTop = $("#"+centerDivId).position().top;
                        minusLeft = $("#"+centerDivId).position().left;
                    }

                    // 处理弹出位置
                    lbtop = lbtop - minusTop;

                    var posright = $thispos.left + $(this).outerWidth() - $lbwidth;
                    var posleft = $thispos.left;
                    var lbleft = $lbwidth + $thispos.left > $(document).width() ? posright: posleft;

                    // 处理弹出位置
                    lbleft = lbleft - minusLeft;

                    switch (settings.listboxalign) {
                    case 'left':
                        lbleft = posleft;
                        break;
                    case 'right':
                        lbleft = posright;
                        break;
                    default:
                        break;
                    }

                    $('div.' + settings.listboxclass, $this).css({
//                        'top': lbtop,
//                        'left': lbleft
                    }).show();
                    stopBubble(evt);
                }
            }).appendTo($this);

            if (navigator.userAgent.toLowerCase().indexOf('msie 6.0') != -1) {
                select.mouseover(function() {
                    if (!select.hasClass('hover')) {
                        select.addClass('hover');
                    }
                }).mouseout(function() {
                    if (select.hasClass('hover')) {
                        select.removeClass('hover');
                    }
                });
            }
            settings.listboxwidth = settings.listboxwidth <= 0 ? select.outerWidth() : settings.listboxwidth;
            var listbox = $('<div>', {
                'class': settings.listboxclass + ' ddlclass',
                'html': '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tbody></tbody></table>',
                'css': {
                    'position': 'absolute',
                    'width': settings.listboxwidth,
                    'overflow': 'hidden',
                    'overflow-y': 'auto',
                    'display': 'none',
                    'z-index': 1000
                }
            }).appendTo($this);
            if (settings.checkbox) {
                if (settings.maxchecked == '') {
                    settings.maxchecked = '1';
                }
                var tfoot = $('<tfoot><td colspan="' + settings.columns + '"><span class="info">　最多可选 ' + settings.maxchecked + ' 项</span><span class="btn-area"><input type="button" value="确定" class="btn-ok"><input type="button" value="取消" class="btn-cancel"></span></td></tfoot>');
                $('table', listbox).append(tfoot);
                var _btn = $('input', tfoot);

                $(_btn[0]).click(function() {
                	
                    if (typeof(select.attr('selectedTmpValue')) != 'undefined') {
                        var dtext = '请选择';
                        if (settings.defaultText != '') {
                            dtext = settings.defaultText;
                        }
                        var tmpText = select.attr('selectedTmpText');
                        var tmpValue = select.attr('selectedTmpValue');
                        if (tmpText.indexOf(dtext) == 0) {
                            tmpText = tmpText.replace(dtext + ',', '');
                        }
                        if (tmpValue.indexOf(',') == 0) {
                            tmpValue = ';' + tmpValue;
                            tmpValue = tmpValue.replace(';,', '');
                        }
                        if (tmpText == '') {
                            tmpText = dtext;
                        }
                        //默认的选中值
                        select.attr({
                            'selectedText': tmpText,
                            'selectedValue': tmpValue
                        });
                        select.attr({
                            'selectedTmpText': '',
                            'selectedTmpValue': ''
                        });
                    }
                    objid.text = select.attr('selectedText');
                    objid.value = select.attr('selectedValue');
                    if (settings.selectedtext == '') {
                        select.html(objid.text);
                    }
                    changeval();
                    objid.hide(true);
                });
                $(_btn[1]).click(function() {
                    objid.hide();
                });
            };
            var table = $('table>tbody', listbox).get(0);
            objid.disable = function() {
                settings.disabled = true;
                if (!select.hasClass('ddl-disabled')) {
                    select.addClass('ddl-disabled');
                }
            };
            objid.enable = function() {
                select.removeClass('ddl-disabled');
                settings.disabled = false;
            };
            objid.init = function(mdata, selectedValue) {
//                $('tfoot td').attr('colspan', settings.columns);
                var row, cell, chk, lbl;
                var index = 0;
                var selecttextarr = [];
                if (selectedValue) {
                    $.each(selectedValue,
                    function(i, n) {
                        var tmptxt = mdata[n] ? mdata[n] : '';
                        tmptxt = tmptxt.replace(/;/g, '；');
                        selecttextarr[selecttextarr.length] = tmptxt;
                    });
                }
                var selecttext = selecttextarr.join(',');
                if (settings.defaultText == "" && !settings.disableDefaultText) {
                    settings.defaultText = "请选择";
                }
                selecttext = selecttext == '' ? settings.defaultText: selecttext;
                selecthtml = settings.checkbox && settings.selectedtext != '' ? settings.selectedtext: selecttext;
                select.attr({
                    'selectedText': selecttext,
                    'selectedValue': settings.selected.join(',')
                }).html(selecthtml);

                $(table).html('');
                var fordata = mdata;
                if(settings.keydata != null && typeof(settings.keydata)!='undefined'){
                	fordata = settings.keydata;
                }
                $.each(fordata,
                function(k, v) {
                	//此处的k是存放JSON对象属性数组的数组索引，根据数组索引得到JSON对象的属性值，再根据该属性值获取对应的值
                	if(settings.keydata != null && typeof(settings.keydata)!='undefined'){
                		k = settings.keydata[k];
                    	v = mdata[k];
                    }
                    if (index % settings.columns == 0) {
                        row = table.insertRow( - 1);
                    }
                    cell = row.insertCell(index % settings.columns);
                    var $cell = $(cell);
                    if (navigator.userAgent.toLowerCase().indexOf('msie 6.0') != -1) {
                        $cell.mouseover(function() {
                            if (!$cell.hasClass('hover')) {
                                $cell.addClass('hover');
                            }
                        }).mouseout(function() {
                            if ($cell.hasClass('hover')) {
                                $cell.removeClass('hover');
                            }
                        });
                    }
                    if(v != '' && v != null){
                    	lbl = v.replace(/;/g, '；');
                    }else{
                    	lbl = v;
                    }
                    if (settings.checkbox) {
                        chk = $('<input>', {
                            type: 'checkbox',
                            value: k,
                            'txt': lbl
                        });
                        if ($.inArray(k, settings.selected) != -1) {
                            chk.attr('checked', 'checked');
                        }
                        if ($.inArray(k, settings.requiredvalue) != -1) {
                            chk.attr('disabled', 'disabled');
                        }
                        $cell.append(chk);
                    }

                    $cell.append(lbl);
                    $cell.attr('value', k).css({
                        'cursor': 'pointer',
                        'width': settings.listboxwidth
                    }).click(function(evt) {
                    	
                    	//加一个beforeChange回调
                    	if(settings.beforechange){
                    		if(!settings.beforechange(select.attr('selectedText'),select.attr('selectedValue'),$(this).text(),$(this).attr('value'))){
                    			return;
                    		}
                    	}
                    	
                        var tmp = $('input', $(this));
                        if (tmp.attr('disabled')) {
                            stopBubble(evt);
                            return;
                        }
                        if (settings.checkbox) {
                        	
                            if (tmp.attr('disabled') == 'disabled') return;
                            var obj = evt.srcElement || evt.target;

                            var tmptext = select.attr('selectedTmpText');
                            var tmpvalue = select.attr('selectedTmpValue');
                            tmptext = typeof(tmptext) != 'undefined' ? (tmptext != '' ? tmptext.split(',') : []) : objid.text.split(',');
                            tmpvalue = typeof(tmpvalue) != 'undefined' ? (tmpvalue != '' ? tmpvalue.split(',') : []) : objid.value.split(',');
                            if (obj.tagName && obj.tagName.toLowerCase() != 'input') {//点击的是单元格时
                                if (tmp.attr('checked')){
                                	tmp.removeAttr('checked');
//                                	tmp.css({"color":"#fff" ,"background":"#3399ff"});
                                }else{
                                	tmp.attr('checked', 'checked');
//                                	tmp.css({"color":"" ,"background":""});
                                }
                            }else{//点击的是checkbox的选择框时
//                            	alert('t312');
//                            	 if (tmp.attr('checked')){
//                            		 tmp.css({"color":"#fff" ,"background":"#3399ff"});
//                                 }else{
//                                	 tmp.css({"color":"" ,"background":""});
//                                 }
                            }
                            if (!tmp.attr('checked')) {
                                var _i = $.inArray(tmp.val(), tmpvalue);
                                tmpvalue.splice(_i, 1);
                                tmptext.splice(_i, 1);
                            } else {
                                tmpvalue[tmpvalue.length] = tmp.val();
                                tmptext[tmptext.length] = tmp.attr('txt');
                            }

                            if (tmpvalue.length > settings.maxchecked) {
                                var _i = 0;
                                for (_i = 0; _i < tmpvalue.length; _i++) {
                                    if ($.inArray(tmpvalue[_i], settings.requiredvalue) == -1) {
                                        break;
                                    }
                                }
                                $('input[value="' + tmpvalue[_i] + '"]', listbox).removeAttr('checked');
                                tmpvalue.splice(_i, 1);
                                tmptext.splice(_i, 1);
                            }
                            select.attr({
                                'selectedTmpText': tmptext.join(','),
                                'selectedTmpValue': tmpvalue.join(',')
                            });
                            stopBubble(evt);
                        } else {
                            select.attr({
                                'selectedText': $(this).text(),
                                'selectedValue': $(this).attr('value')
                            }).html($(this).text());
                            objid.value = select.attr('selectedValue');
                            objid.text = select.attr('selectedText');
                            
                        }
                        if (!settings.checkbox) {
                            changeval();
                        }
                    });
                    index++;
                });
                if (cell && index % settings.columns != 0) {
                    $(cell).attr('colspan', settings.columns + 1 - index % settings.columns);
                }

                if (listbox.height() > settings.listboxmaxheight) {
                    listbox.height(settings.listboxmaxheight).css({
                        'overflow': 'hidden',
                        'overflow-y': 'auto'
                    });
                }
            };
            objid.hide = function(clear) {
                if (settings.checkbox && !clear) {
                    select.removeAttr('selectedTmpText');
                    select.removeAttr('selectedTmpValue');
                    var tmpsv = select.attr('selectedValue').split(',');
                    $('input', listbox).each(function() {
                        $(this).removeAttr('checked');
                    });
                    $.each(tmpsv,
                    function(i, n) {
                        $('input[value="' + n + '"]', listbox).attr('checked', 'checked');
                    });
                }
                $('div.' + settings.listboxclass, $this).hide();
            };
            var changeval = function() {
            	
            	//选择选项时，如果设定了隐藏输入框的ID，指定默认选中值
                if(settings.hiddenId != ''){
                	$('#' + settings.hiddenId).val(objid.text);
                }
                $('#' + settings.id).val(objid.value);
                if (objid.onchange) {
                    objid.onchange(objid.text, objid.value);
                }
            };
            if (settings.url != '') {
                $.ajax({
                    contentType: 'application/x-www-form-urlencoded',
                    url: settings.url,
                    type: settings.type,
                    data: settings.param,
                    dateType: settings.dataType,
                    success: function(respons) {
                    	var keydata = new Array();
                    	var param = '';
                        var paramJson = '{';
                        //加上默认值的选项 pch
                        var dflag = false;
                        if(settings.defaultText !=''){//如果指定默认值则加上默认值
                        	paramJson += '\'' + '' + '\'';
                        	paramJson += ':';
                        	paramJson += '\'' + settings.defaultText + '\'';
                        	paramJson += ',';
                        	keydata.push('');
                        	if(settings.selectedIndex == '0'){
                        		settings.selected = [''];
                        	}
                        	dflag = true;
                        }else{//没有特别指定默认值的，在为选择框时，不加自动给定的默认值,否则给指定的默认值'请选择'
                        	if(!settings.checkbox && !settings.disableDefaultText){
                        		paramJson += '\'' + '' + '\'';
                        		paramJson += ':';
                        		paramJson += '\'' + '请选择' + '\'';
                        		paramJson += ',';
                        		keydata.push('');
                        		if(settings.selectedIndex == '0'){
                            		settings.selected = [''];
                            	}
                        		dflag = true;
                        	}
                        }
                        if (typeof respons == 'string') {
                            param = eval('(' + respons + ')');
                        }
                        if(settings.readerRoot != null && settings.readerRoot != "" && settings.readerRoot != "undefined"){
                        	param = param.data[settings.readerRoot];
                        }else{
                        	param = param.data;
                        }
                        
                        //更改后台得到的数据
                        if (settings.onBeforeLoad) {
                        	 settings.onBeforeLoad(param); 
                        }
                        
                        if(param != null && param != ''){
                        	var tempFlag = true;
	                        $(param).each(function(i, newParam) {
	                            var value = newParam[settings.columnValue];
	                            var name = newParam[settings.columnName];
	                            if (!tempFlag) {
	                                paramJson += ',';
	                            }
	                            keydata.push(value);
	                            paramJson += '\'' + value + '\'';
	                            paramJson += ':';
	                            paramJson += '\'' + name + '\'';
	                            tempFlag = false;
	                            if(typeof(settings.selectedIndex) != 'undefined' && settings.selectedIndex !=''){
		                            if(dflag){
		                            	if((i + 1) == settings.selectedIndex){
		                            		settings.selected = [value];
		                            	}
		                            }else{
		                            	if(i == settings.selectedIndex){
		                            		settings.selected = [value];
		                            	}
		                            }
	                            }
	                        });
                        }
                        if (paramJson != '') {
                            paramJson += '}';
                            paramJson = eval('(' + paramJson + ')');
//                            paramJson = (new Function("return " + paramJson))();
                        }
                        var arrayAsync = [];
                        if(typeof(settings.selected) != 'undefined' && settings.selected !=''){
                        	for (var i = 0; i < settings.selected.length; i++) {
                                for (var key in paramJson) {
                                    if (settings.selected[i] == key) {
                                        arrayAsync[i] = settings.selected[i];
                                    }
                                }
                            }
                        }
                        settings.selected = arrayAsync;
                        var k = 0;
                        for (var key in paramJson) {
                            k++;
                        }
                        if (settings.columns == '') { // 动态计算列数
                            settings.columns = Math.ceil(k / settings.optionCount);
                        }
                        settings.keydata = keydata;
                        objid.init(paramJson, settings.selected);
                        objid.text = select.attr('selectedText');
                        objid.value = select.attr('selectedValue');
                        
                        //选择选项时，如果设定了隐藏输入框的ID，指定默认选中值
                        if(settings.hiddenId != ''){
                        	if(typeof ($('#' + settings.hiddenId)) != 'undefined'){
                        		$('#' + settings.hiddenId).val(objid.text);
                        	}
                        }
                        $('<input>', {
                            type: 'hidden',
                            value: objid.value,
                            id: settings.id,
                            name: settings.id
                        }).appendTo($this);
                        
                        $(document).click(function() {
                            objid.hide();
                        });
                        $(window).resize(function() {
                            objid.hide();
                        });
                        
                        //异步加载完成的回调
                        if (settings.onsyncomplete) {
                            settings.onsyncomplete(param,objid.value,objid.text); //pch
                        }
                    },
                    error: function(data) {
                        alert('数据错误!');
                    }
                });
            } else {

                // 取settings.data里面的个数k
                var k = 0;
                for (var key in settings.data) {
                    k++;
                }
                if (settings.columns == '') { // 动态计算列数
                    settings.columns = Math.ceil(k / settings.optionCount);
                }
                objid.init(settings.data, settings.selected);
                objid.text = select.attr('selectedText');
                objid.value = select.attr('selectedValue');
                
               //选择选项时，如果设定了隐藏输入框的ID，指定默认选中值
                if(settings.hiddenId != ''){
                	$('#' + settings.hiddenId).val(objid.text);
                }
                
                $('<input>', {
                    type: 'hidden',
                    value: objid.value,
                    id: settings.id,
                    name: settings.id
                }).appendTo($this);
                
                $(document).click(function() {
                    objid.hide();
                });
                $(window).resize(function() {
                    objid.hide();
                });
                
                //异步加载完成的回调
                if (settings.onsyncomplete) {
                    settings.onsyncomplete(settings.data,objid.value,objid.text); //pch
                }
            }
        });
    };

})(jQuery);


/**
 * 拼装下拉框对象,返回对象数组
 * 
 * @param multiDropDownList
 *            多个下拉框对象
 * @param sorttypeids
 *            字典分类id："02,03,04"
 * @returns {Array} 返回对象数组 注意：返回拼装好的json数组的下标与字典分类id数组："02,03,04"下标是对应的
 *          即：02对应的是dropDownArray[0],03对应的是dropDownArray[1],04对应的是dropDownArray[2]
 */
function ctl_assemblyDropDownArr(multiDropDownList, sorttypeids) {

    var sorttypeidArray = sorttypeids.split(","); // 按逗号解开为数组
    var dropDownArray = new Array(sorttypeidArray.length); // 创建一个数组
    // 循环字典分类id数组："02,03,04"
    for (var i = 0; i < sorttypeidArray.length; i++) {
        // 遍历下拉对象集
        $(multiDropDownList).each(function(j, dropDownObj) {
            var value = dropDownObj.systemsortid;
            var name = dropDownObj.systemsortname;
            // 当循环字典分类id数组的值等于遍历下拉对象集中的sorttypeid时，我们来组装json对象
            if (dropDownObj.sorttypeid == sorttypeidArray[i]) {
                // 不为空时，补上逗号
                if (typeof(dropDownArray[i]) != 'undefined') {
                    dropDownArray[i] = dropDownArray[i] + ',';
                } else { // 第一次拼装
                    dropDownArray[i] = '{';
                }
                // 补充下拉框的key和value
                dropDownArray[i] += '\'' + value + '\'';
                dropDownArray[i] += ':';
                dropDownArray[i] += '\'' + name + '\'';
            }
        });
        // 如果下拉框有值时，补充右括号，转换为json对象
        if (typeof(dropDownArray[i]) != 'undefined') {
            dropDownArray[i] = dropDownArray[i] + "}";
            dropDownArray[i] = eval('(' + dropDownArray[i] + ')');
        }
    }
    // 返回拼装好的json数组
    return dropDownArray;
}


// 定义下拉框对象集
// var dropDownBoxs={
// dropDownBoxIds:"",//下拉框的id
// sorttypeids:"",//字典表中对应的分类ID
// selectValueArr:[],
// dropDownBoxWindowId:"",//下拉框所在窗口ID
// needShowAll:true //是否需要显示全部，true为需要
// };
/**
 * 从后台字典加载数据生成选择框（包括多选框和单选框） 此方法将在空的div中生成选择框的input，
 * input的id和name均根据div的id生成，如果是单选框，id=div的Id+radio 如果是多选框，id=div的Id+checkbox //
 * 传入的参数： selectCfg = { // 生成的选中框类型（checkbox,radio） selectType : 'checkbox', //
 * 选择框对应的div divIds : "div1,div2", // 字典表中对应的分类ID sorttypeids : "22,23", //
 * 默认选中值，注意：此值为数组，每个div对应一个数组，checkbox中存在多个选中值用逗号分隔 checked : [ "220,221", "220" ] }
 */
function ctl_loadingDicSelct(selectCfg) {

    if (typeof(selectCfg.selectType) == "undefined") {
        alert("请您先定义选择框类型！");
        return;
    }
    if (typeof(selectCfg.divIds) == "undefined") {
        alert("请您先定义选择框div的ID集！");
        return;
    }
    if (typeof(selectCfg.sorttypeids) == "undefined") {
        alert("请您先定义选择框在字典表中对应的分类ID集！");
        return;
    }
    if (typeof(selectCfg.checked) == "undefined") {
        alert("请您先定义选择框默认值！");
        return;
    }

    if (typeof(selectCfg.needShowAll) == "undefined") {
        selectCfg.needShowAll = true;
    }

    // 根据字典类型id请求后台获取字典信息
    var paramData = "<sorttypeids>" + selectCfg.sorttypeids + "</sorttypeids>";
    publicAjaxRequest(dictionaryService, paramData, true,
    function(response) {
        // 获取需要的下拉对象集,后台一次性取数据
        var multiDropDownList = response.data;

        var sorttypeidArray = selectCfg.sorttypeids.split(","); // 按逗号解开为数组---字典表中对应的分类ID
        var divIds = selectCfg.divIds.split(","); // 按逗号解开为数组---下拉框的id
        var checkArray = selectCfg.checked;

        // 遍历字典类型id列表
        for (var i = 0; i < sorttypeidArray.length; i++) {
            // 获取字典类型id对应的选择框div
            var div = $("#" + divIds[i]);
            var divId = div.attr('id');
            var typeId = sorttypeidArray[i];
            // 获取选择框默认值
            var checkValues = checkArray[i].split(",");

            var count = 0;

            if (selectCfg.selectType == 'radio' && selectCfg.needShowAll) {
                var html = "";
                html += " <input type='radio'";
                html += " id=" + divId + 'radio' + count;
                html += " name=" + divId + 'radio';
                html += " checked='checked'";
                html += " value=" + "''";
                html += " />" + '全部';
                div.html(html);
            } else {
                div.html("");
            }

            if (selectCfg.selectType == 'select' && selectCfg.needShowAll) {
                var html = "<option value=''>全部</option>";
                div.html(html);
            }

            // 遍历下拉对象集
            $(multiDropDownList).each(function(j, obj) {

                // 获取字典的key和value
                var value = obj.systemsortid;
                var name = obj.systemsortname;

                // 如果字典类型id适应于div的字典类型
                if (typeId == obj.sorttypeid) {

                    count++;

                    // 获取div的html
                    var html = div.html();

                    // 如果选择框的类型为单选框
                    if (selectCfg.selectType == 'radio') {
                        html += " <input type='radio'";
                        html += " id=" + divId + 'radio' + count;
                        html += " name=" + divId + 'radio';
                        html += " value=" + value;

                        if (ctl_arrayContains(checkValues, value)) {
                            html += " checked='checked'";
                        }

                        html += " />" + "<span>" + name + "</span>";
                        div.html(html);
                    }

                    // 如果选择框的类型为多项框
                    else if (selectCfg.selectType == 'checkbox') {
                        html += " <input type='checkbox'";
                        html += " id=" + divId + 'checkbox' + count;
                        html += " name=" + divId + 'checkbox' + count;
                        html += " value=" + value;

                        if (ctl_arrayContains(checkValues, value)) html += " checked='checked'";

                        html += " />" + "<span>" + name + "</span>";
                        div.html(html);
                    }

                    else if (selectCfg.selectType == 'select') {
                        html += " <option ";
                        html += " value='" + value;
                        html += "'>";
                        html += name + "</option>";
                        div.html(html);
                    }
                }

            });

        }

        var click = selectCfg.click;
        // 回调
        if (typeof(click) != 'undefined') {

            // 定义click事件句柄
            function clickHandler(event) {
                var div = event.data.div;
                var values = [];
                var sel = $("div[id=" + div + "]>input:checked");

                // 从选择的选择框中拿值
                for (var i = 0; i < sel.length; i++) {

                    // 由于循环遍历拿到的是一个html元素，所有这里用.value取值
                    values.push(sel[i].value);
                }

                // 执行外部定义的click方法
                event.data.func(values);
            }

            for (var key in click) {
                var div = key;
                var func = click[div];
                var ip = $("div[id=" + div + "]>input");

                // 绑定click事件句柄，并将变量绑定到event事件上
                ip.bind("click", {
                    'div': div,
                    'func': func
                },
                clickHandler);

            }

        }

    });

}

/**
 * 加载当页下拉框
 * defaultChecks:指定是否使用选择框,如',true,false,true'
 * 
 */
function ctl_loadingDropDownBox(dropDownBoxs) {
    if (typeof(dropDownBoxs) == "undefined") {
        alert("请您先定义下拉框对象集！");
        return;
    }
    if (typeof(dropDownBoxs.dropDownBoxIds) == "undefined") {
        alert("请您先定义下拉框的ID集！");
        return;
    }
    if (typeof(dropDownBoxs.sorttypeids) == "undefined") {
        alert("请您先定义下拉框在字典表中对应的分类ID集！");
        return;
    }
    var dropDownBoxObjs = dropDownBoxs;
    var dataDropDown = "<dictType>" + dropDownBoxObjs.sorttypeids + "</dictType>";
    publicAjaxRequest(getDictionaryService, dataDropDown, true, function(response){
    	// 获取需要的下拉对象集,后台一次性取数据
        var multiDropDownList = response.data;
        var sorttypeidArray = dropDownBoxObjs.sorttypeids.split(","); // 按逗号解开为数组---字典表中对应的分类ID
        var dropDownBoxId = dropDownBoxObjs.dropDownBoxIds.split(","); // 按逗号解开为数组---下拉框的id
        var defaultText = '';//默认值
        if(typeof(dropDownBoxObjs.selectDefaultTexts)!='undefined'){
        	defaultText = dropDownBoxObjs.selectDefaultTexts;
        }
        var defaultCheck = '';//默认选中
        if(typeof(dropDownBoxObjs.defaultChecks)!='undefined'){
        	defaultCheck = dropDownBoxObjs.defaultChecks;
        }
        var defaultWidth = '';
        if(typeof(dropDownBoxObjs.defaultWidths)!='undefined'){
        	defaultWidth = dropDownBoxObjs.defaultWidths;
        }
        
        var disableDefaultTextArr=[];
        if(typeof(dropDownBoxObjs.disableDefaultTextArr)!='undefined'){
        	disableDefaultTextArr = dropDownBoxObjs.disableDefaultTextArr;
        }
        var onchangeArr=[];
        if(typeof(dropDownBoxObjs.onchangeArr)!='undefined'){
        	onchangeArr = dropDownBoxObjs.onchangeArr;
        }
        
        
        var dropDefaultText = defaultText.split(",");
        var defaultCheckText = defaultCheck.split(",");
        var defaultWidthText = defaultWidth.split(",");
        
        var dropDownArray = new Array(sorttypeidArray.length); // 创建一个数组
        // 循环字典分类id数组："02,03,04"
        for (var i = 0; i < sorttypeidArray.length; i++) {
        	var currentDropDefaultText = '';
        	if(typeof(dropDefaultText[i])!='undefined' && dropDefaultText[i]!=''){
        		currentDropDefaultText = dropDefaultText[i];
        	}else{
        		currentDropDefaultText='';
        	}
        	var currentDefaultWidthText = '';
        	if(typeof(defaultWidthText[i])!='undefined' && defaultWidthText[i]!='' ){
        		currentDefaultWidthText = defaultWidthText[i];
        	}else{
        		currentDefaultWidthText = 100;
        	}
        	var curDisableDefaultText=false;
        	if(typeof(disableDefaultTextArr[i])!='undefined' && disableDefaultTextArr[i]!='' ){
        		curDisableDefaultText = disableDefaultTextArr[i];
        	}
        	var curOnchange=false;
        	if(typeof(onchangeArr[i])!='undefined'){
        		curOnchange = onchangeArr[i];
        	}
        	
        	var currentDropCheck = defaultCheckText[i];
        	var currentSortKeyData = new Array();
            // 遍历下拉对象集
            $(multiDropDownList).each(function(j, dropDownObj) {
                var value = dropDownObj.dmId;
                var name = dropDownObj.dmz;
                // 当循环字典分类id数组的值等于遍历下拉对象集中的sorttypeid时，我们来组装json对象
                if (dropDownObj.flid == sorttypeidArray[i]) {
                    // 不为空时，补上逗号
                    if (typeof(dropDownArray[i]) != 'undefined') {
                        dropDownArray[i] += ',';
                    } else { // 第一次拼装
                        dropDownArray[i] = '{';
                        
                        if(!curDisableDefaultText){

                        	//加上默认值的选项 pch
	                        if(typeof(currentDropDefaultText)!='undefined' && currentDropDefaultText !=''){//是选择框的情况时，不是要默认值，如果未强行指定默认值
		                        dropDownArray[i] += '\'' + '' + '\'';
		                        dropDownArray[i] += ':';
		                        dropDownArray[i] += '\'' + currentDropDefaultText + '\'';
		                        dropDownArray[i] += ',';
		                        currentSortKeyData.push('');
	                        }else{//没有特别指定默认值的，在为选择框时，不加自动给定的默认值,否则给指定的默认值'请选择'
	                        	if(typeof(currentDropCheck) =='undefined' || currentDropCheck ==''){
	                        		dropDownArray[i] += '\'' + '' + '\'';
	    	                        dropDownArray[i] += ':';
	    	                        dropDownArray[i] += '\'' + '请选择' + '\'';
	    	                        dropDownArray[i] += ',';
	    	                        currentSortKeyData.push('');
	                        	}
	                        }
                        }
                    }
                    // 补充下拉框的key和value
                    currentSortKeyData.push(value);
                    dropDownArray[i] += '\'' + value + '\'';
                    dropDownArray[i] += ':';
                    dropDownArray[i] += '\'' + name + '\'';
                }
            });
//            for(var i = 0;i<currentSortKeyData.length;i++){
//            	alert(currentSortKeyData[i]);
//            }
            // 如果下拉框有值时，补充右括号，转换为json对象
            if (typeof(dropDownArray[i]) != 'undefined') {
                dropDownArray[i] = dropDownArray[i] + "}";
                dropDownArray[i] = eval('(' + dropDownArray[i] + ')');

                // 当前下拉框Json
                var currentDropDownBoxJson = dropDownArray[i];
                // 当前下拉框选中值
                var currentSelectValue = "";
                if (typeof(dropDownBoxObjs.selectValueArr) != 'undefined') {
                    currentSelectValue = dropDownBoxObjs.selectValueArr[i];
                }
                // 当前下拉框Id
                var currentDropDownBoxId = dropDownBoxId[i];
                // 把数据装给下拉框
                $("#" + currentDropDownBoxId).ctl_select({
                    id: currentDropDownBoxId + "_s",
                    dialogId: dropDownBoxObjs.dropDownBoxWindowId,
                    listboxwidth: 0,
                    width: currentDefaultWidthText,
                    listboxalign: 'auto',
                    listboxmaxheight: 200,
                    columns: 1,
                    checkbox: false,
                    disabled: false,
                    defaultText: currentDropDefaultText,
                    selected: [currentSelectValue],
                    data: currentDropDownBoxJson,
                    onchange: curOnchange,
                    keydata:currentSortKeyData
                });

            }
        }
    });
}