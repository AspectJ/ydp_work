/**
 * 此js文件是对jqgrid的封装 参数以数组的形式传递
 * 
 * 创建jqgrid 共有104个属性和事件，都已有默认值，如果你需要的值和默认值不一样，则需要指定
 * sortGrid：表格加载完成后，是否进行排序,true:排序false:不排序，不排序的情况下需点击表头才能排序
 */
function ctl_initGrid(jqgridObj) {

	// -----------------------------------------------------------------------------(datatype和mytype处理)
	//jqgrid 设置colModel 默认的配置  xyk  2013-5-10
	jqgridObj.cmTemplate ={
			sortable: false
	};
	// datatype默认为json
	if (typeof(jqgridObj.datatype) == 'undefined') {
		jqgridObj.datatype = "json";
	}
	// mytype默认为post
	if (typeof(jqgridObj.mtype) == 'undefined') {
		jqgridObj.mtype = "post";
	}
	// width默认为本页自适应宽度
	if (typeof(jqgridObj.width) == 'undefined') {
		var centerW = $("#centerDiv").width();
		// alert(centerW);
		jqgridObj.width = centerW * 0.96;
		// jqgridObj.autowidth=true;
	}
	// height默认为本页自适应高度
	if (typeof(jqgridObj.height) == 'undefined') {
		var winHeight = getAbsoluteTop("south");
		if (winHeight == 0) {
			winHeight = $(window).height() - 130;
		}
		var gridHeight = winHeight - getAbsoluteTop(jqgridObj.jqGridId) - 92;
		// 需要表头工具栏时要就减去一行的高度：23px
		if (typeof(jqgridObj.toolbar) != 'undefined') {
			gridHeight = gridHeight - 23;
		}

		// 设置表格高度
		if (gridHeight < 50) {
			jqgridObj.height = "100px";
		} else if ($("#mainTabs").height() < jqgridObj.height) {
			jqgridObj.height = $("#mainTabs").height();
		} else {
			jqgridObj.height = gridHeight;
		}
	}

	// 如果不是本地数据
	if (jqgridObj.datatype != 'local' && jqgridObj.datatype != 'jsonstring'&&jqgridObj.datatype != 'xml'&&jqgridObj.datatype != 'xmlstring') {
		// -----------------------------------------------------------------------------(url处理)
		// url默认为pages/springMvcEntry/service.do
		if (typeof(jqgridObj.url) == 'undefined') {
			jqgridObj.url = springMvcUrl;// pages/springMvcEntry/service.do
		}

		// -----------------------------------------------------------------------------(serviceId、sessionId、dataFormat处理)
		// serviceId必须配置
		if (typeof(jqgridObj.serviceId) == 'undefined') {
			// alert("请给jqgrid表格配置serviceId参数！");
			ctl_showMessage("请给jqgrid表格配置serviceId参数！");
			return;
		}
		// sessionId配置
		var sessionId = defaultSessionId;// sessionId初始化默认值
		if (typeof(jqgridObj.sessionId) != 'undefined') {
			sessionId = jqgridObj.sessionId;
		}
		// dataFormat配置
		var dataFormat = defaultDataFormat;// dataFormat初始化默认值
		if (typeof(jqgridObj.dataFormat) != 'undefined') {
			dataFormat = jqgridObj.dataFormat;
		}

		// -----------------------------------------------------------------------------(reqDataXml、singleRowData、postData处理)
		if (typeof(jqgridObj.postData) == 'undefined') {
			jqgridObj.postData = {
				param : getParam(jqgridObj.serviceId, sessionId, dataFormat),
				data : jqgridObj.requestDataXml
			};
		}
	}

	jqgridObj.beforeRequest = function(e) {
		var pdata = ctl_getGridParam(
				jqgridObj.jqGridId, 'postData');
		
		//处理树表格异步请求时，是否带上所点击的数节点行数据作为请求的参数，true:带节点行数据作为请求的参数 false：不带；树结构必须与默认值保持一致
		if(typeof(jqgridObj.isPostTreeNode) != 'undefined' && jqgridObj.isPostTreeNode){
			var dtpdata = pdata.data;
			for(key in pdata){
				if(key == 'nodeid'){//id
					var bindex = dtpdata.indexOf('<nodeid>', 0);
					var eindex = dtpdata.indexOf('</nodeid>', 0);
					if(eindex > 0){
						var source = dtpdata.substring(bindex, eindex+9);
						if(null != source && '' != source){
							dtpdata = dtpdata.replace(source,'<nodeid>'+pdata[key]+'</nodeid>');
						}
					}else{
						dtpdata = dtpdata + '<nodeid>'+pdata[key]+'</nodeid>';
					}
				}else if(key == 'parentid'){//父id
					var bindex = dtpdata.indexOf('<parentid>', 0);
					var eindex = dtpdata.indexOf('</parentid>', 0);
					if(eindex > 0){
						var source = dtpdata.substring(bindex, eindex+10);
						if(null != source && '' != source){
							dtpdata = dtpdata.replace(source,'<parentid>'+pdata[key]+'</parentid>');
						}
					}else{
						dtpdata = dtpdata + '<parentid>'+pdata[key]+'</parentid>';
					}
				}else if(key == 'n_level'){//节点级
					var bindex = dtpdata.indexOf('<n_level>', 0);
					var eindex = dtpdata.indexOf('</n_level>', 0);
					if(eindex > 0){
						var source = dtpdata.substring(bindex, eindex+10);
						if(null != source && '' != source){
							dtpdata = dtpdata.replace(source,'<n_level>'+pdata[key]+'</n_level>');
						}
					}else{
						dtpdata = dtpdata + '<n_level>'+pdata[key]+'</n_level>';
					}
				}
			}
			pdata.data = dtpdata;
		}
		
		// 加载数据
		//blockUIOpen('正在加载数据,请稍候...', 300, 100, true, 100000);
		//blockUIClose();
		
		// jqgridObj.loadui="block";
		// if(jqgridObj.scroll){
		// jqgridObj.scrollTimeout=100;
		// document.getElementById("jqgrid_content_"+jqgridObj.jqGridId).style.disabled
		// = "disabled";
		// $("#jqgrid_content_"+jqgridObj.jqGridId).css({overflow:"hidden"});
		// window.setTimeout(function() {
		// $("#jqgrid_content_"+jqgridObj.jqGridId).css({overflow:"auto"});
		// }, 1000);
		// }
		ctl_beforeRequest(jqgridObj.jqGridId, pdata.data,
				jqgridObj.singleRowData, jqgridObj.dataFormat);
	};

	// 将我们包装的jqgrid对象给实际的jqgrid处理
	jQuery("#" + jqgridObj.jqGridId).jqGrid(jqgridObj);
	
	if(jqgridObj.sortGrid){
		sortGrid(jqgridObj.jqGridId);
	}
    
	// 需要扩展全选反选的checkbox
	if (jqgridObj.needEnhanceCbox == true) {
		enhanceCheckbox({
			id : jqgridObj.enhanceDivId,// 需要扩展checkbox的div
			jqGridId : jqgridObj.jqGridId,// 这个层悬浮在表格上，即对应的jqgrid的id
			allCheckboxSelect : jqgridObj.allCheckboxSelect,// 全选(默认为true)
			insteadCheckbox : jqgridObj.insteadCheckbox,// 反选(默认为true)
			noCheckboxSelect : jqgridObj.noCheckboxSelect,// 不选(默认为true)
			fieldName : jqgridObj.fieldName,// 指定需要加需要扩展checkbox的字段名,逗号隔开()
			fieldValue : jqgridObj.fieldValue
				// 对应字段的值,逗号隔开
			});
	}
	// 固定列
	// ctl_fixedColumns(jqgridObj.jqGridId);

}
/**
 * 这是一个公共的分页处理 特别注意，这是不带查询条件的分页
 * 
 * @param jqgridId
 *            表格Id
 * @param serviceId
 *            模块Id
 */
function ctl_onPaging(jqgridId, serviceId) {
	postData = {
		param : getParam(serviceId),// "serviceId/=/模块ID/;/sessionId/=/1/;/dataFormat/=/1"
		data : data
	};
	ctl_setGridParam(jqgridId, {
				postData : postData
			}, true);
}

/**
 * jqgrid表格request请求前对入参参数进行封装，主要是处理获取滚动时当前页，在beforeRequest回调函数中进行调用
 * 
 * @param jqgridId
 *            表格Id
 * @param serviceId
 *            模块服务Id
 * @param queryXml
 *            查询条件拼装的xml 格式为<id>1</id><name>任托宇</name>
 * @param singleRowData
 *            true表示requestDataXml为单行XML格式的数据,false表示requestDataXml为多行XML格式的数据
 */
function ctl_beforeRequest(jqgridId, queryXml, singleRowData, dataFormat) {
	var data = null;
	var page = ctl_getGridParam(jqgridId, "page");
	var rowNum = ctl_getGridParam(jqgridId, "rowNum");

	if (dataFormat == jsonType) {
		if ((typeof queryXml) == "string") {
			queryXml = JSON.parse(queryXml);
		}
		if ((typeof queryXml) != "string") {
			queryXml.page = page;
			queryXml.rowNum = rowNum;
			data = JSON.stringify(queryXml);
		}
	} else {
		if (typeof(queryXml) != "undefined" && queryXml != "") {
			queryXml = removeDataXml(queryXml);
			queryXml = removePage(queryXml);
		}
		data = "<page>" + page + "</page>" + "<rowNum>" + rowNum + "</rowNum>";
		if (typeof(queryXml) != "undefined") {
			data = data + queryXml;
		}

		// singleRowData
		// true表示requestDataXml为单行XML格式的数据,false表示requestDataXml为多行XML格式的数据
		if (singleRowData) {
			data = getOneDataXml(data);
		} else {
			data = getDataXml(data);
		}
	}
	var postData = {
		data : data
	};
	ctl_setGridParam(jqgridId, {
				postData : postData,
				page : page,
				rowNum : rowNum
			}, false);
}

// 去除请求参数的pageNum、rowNum参数
function removePage(queryXml) {
	var pageBgIndex = queryXml.indexOf("<page>");
	if (pageBgIndex != -1) {
		var pageEndIndex = queryXml.indexOf("</page>");
		var pageChar = queryXml.substring(pageBgIndex, pageEndIndex + 7);
		queryXml = queryXml.replace(pageChar, '');
	}
	var rowNumBgIndex = queryXml.indexOf("<rowNum>");
	if (rowNumBgIndex != -1) {
		var rowNumEndIndex = queryXml.indexOf("</rowNum>");
		var rowNumChar = queryXml.substring(rowNumBgIndex, rowNumEndIndex + 9);
		queryXml = queryXml.replace(rowNumChar, '');
	}
	return queryXml;
}

/**
 * 这是一个公共的分页处理 特别注意，这是带查询条件的分页
 * 
 * @param jqgridId
 *            表格Id
 * @param serviceId
 *            模块Id
 * @param isQuery
 *            带条件查询为true,翻页查询为false ture表示需要重新分页
 * @param queryXml
 *            查询条件拼装的xml 格式为<id>1</id><name>任托宇</name>
 */
function ctl_onPagingForConditions(jqgridId, serviceId, isQuery, queryXml,dataFormat) {
	var page = ctl_getGridParam(jqgridId, "page");
	if (isQuery == true) {
		page = 1;
	}
	var data = null;
	var param = null;
	
	if (dataFormat == jsonType) {
		if ((typeof queryXml) == "string") {
			queryXml = stringToJson(queryXml);
		}
		queryXml.page = page;
		data = queryXml;
		param=getParam(serviceId,undefined,jsonType);
	} else {
		if (queryXml != "") {
			data = queryXml;
		}
		param = getParam(serviceId);
	}
	postData = {
		param : param,// "serviceId/=/模块ID/;/sessionId/=/1/;/dataFormat/=/1"
		data : data
	};
	ctl_setGridParam(jqgridId, {
				postData : postData,
				page : page
			}, true);
}

/**
 * 这是一个公共的表头排序处理
 * 
 * @param jqgridId
 *            表格Id
 * @param serviceId
 *            模块Id
 * @param isQuery
 *            带条件查询为true,翻页查询为false ture表示需要重新分页
 * @param queryXml
 *            查询条件拼装的xml 格式为<id>1</id><name>任托宇</name>
 * @param colindex
 *            列下标
 * @param sortorder
 *            升序或降序
 */
function ctl_onSortColFunction(jqgridId, serviceId, isQuery, queryXml,
		colindex, sortorder) {

	// 获取表格列对象
	var colModel = ctl_getGridParam(jqgridId, "colModel");
	
	if(isQuery){//表示json的传		
//		queryXml={};//入参
		queryXml[colModel[colindex].name] = colModel[colindex].name;
		queryXml[sortorder] = sortorder;
	}else{
		alert("2");
		queryXml = queryXml + "<colName>" + colModel[colindex].name + "</colName>";
		queryXml = queryXml + "<sortOrder>" + sortorder + "</sortOrder>";
	}

	ctl_onPagingForConditions(jqgridId, serviceId, isQuery, queryXml);// 这是带查询条件的通用翻页
}

/**
 * 设置表格自适应宽度
 * 
 * @param jqgridId
 *            表格Id
 */
function ctl_resizeGridWidth(jqgridId) {
	var width = $(this).width() - $("#centerDiv").position().left - 20;
	ctl_setGridWidth(jqgridId, width);
}

/**
 * 这是给表格加的提示信息，此处引用了框架的弹窗，也可以用alert或其他形式显示信息,所有提示信息可通过此处更改
 * 
 * @param message
 *            提示信息
 */
function ctl_showMessage(message) {
	ctl_alert(message);
}

/**
 * 刷新表格
 * 
 * @param jqgridId
 *            表格Id
 */
function ctl_reloadGrid(jqgridId) {
	jQuery("#" + jqgridId).trigger("reloadGrid");// 刷新表格
}

/**
 * 获取row对象
 * 
 * @param jqgridId
 *            表格ID
 * @param fun
 *            jqgrid函数
 * @param value
 *            参数的值，一般传第几行 返回row对象，可以通过row.id,row.name等获得字段的值 例如：var row =
 *            ctl_getRowData("jqgridId",'getRowData',2);
 */
function ctl_getRowData(jqgridId, fun, value) {
	var row = jQuery("#" + jqgridId).jqGrid(fun, value);
	return row;
}

/**
 * 获取选中行的行号
 * 
 * @param jqgridId
 *            表格ID
 * @returns 注意：如果表格没有设置id字段，返回选中行的行数，否则返回选中行id字段值
 */
function ctl_getSelectRowNo(jqgridId) {
	var id = jQuery("#" + jqgridId).jqGrid('getGridParam', 'selrow');
	return id;
}

/**
 * 获取某行对象
 * 
 * @param jqgridId
 *            表格ID
 * @param rowNo
 *            行数
 * @param isSelect
 *            是否选中该行  （可选）
 * @returns row对象
 */
function ctl_getRowObjForRowNo(jqgridId, rowNo ,isSelect) {
	if(isSelect){
		//选择该行
		ctl_setRowSelect(jqgridId, rowNo);
	}
	var row = jQuery("#" + jqgridId).jqGrid('getRowData', rowNo);
	return row;
}

/**
 * 获得所有数据的ID数组
 * 
 * @param jqgridId
 *            表格ID
 * @returns ids 如：1,2,3,4,5 也可以通过ids[2],得到行号
 *          注意：如果表格没有设置id字段，返回选中行的行数，否则返回选中行id字段值数组
 */
function ctl_getAllDataIds(jqgridId) {
	return $("#" + jqgridId).getDataIDs();
}

/**
 * 进入某行编辑状态
 * 
 * @param jqgridId
 *            表格ID
 * @param rowNo
 *            行数
 */
function intoEditRow(jqgridId, rowNo) {
	jQuery("#" + jqgridId).jqGrid("editRow", rowNo);
}

/**
 * 获取最后选中行数据
 * 
 * @param jqgridId
 *            表格ID 返回row对象，可以通过row.id,row.name等获得字段的值
 */
function ctl_getSelectRowData(jqgridId) {
	var id = jQuery("#" + jqgridId).jqGrid('getGridParam', 'selrow');
	if (id) {
		var row = jQuery("#" + jqgridId).jqGrid('getRowData', id);
		return row;
	} else {
		// alert("请先选择行！");
		ctl_showMessage("请先选择行！");
		return null;
	}
}

/**
 * 获取所有选中行号,用逗号隔开
 * 
 * @param jqgridId
 *            表格ID 注意：如果表格没有设置id字段，返回选中行的行数，否则返回选中行id字段值数组
 */
function ctl_getSelectIds(jqgridId) {
	var ids = jQuery("#" + jqgridId).jqGrid('getGridParam', 'selarrrow');
	return ids;
}

/**
 * 获取所有选中行id,用逗号隔开(这里直接返回不会有提示信息)
 * 
 * @param jqgridId
 *            表格ID 注意：如果表格没有设置id字段，返回选中行的行数，否则返回选中行id字段值数组
 */
function ctl_getNoTipSelectIds(jqgridId) {
	return jQuery("#" + jqgridId).jqGrid('getGridParam', 'selarrrow');
}

/**
 * 删除表格中的行
 * 
 * @param jqgridId
 *            表格ID
 * @param rowNo
 *            表示行数 返回删除成功或失败
 */
function ctl_deleteRowData(jqgridId, rowNo) {
	var su = jQuery("#" + jqgridId).jqGrid('delRowData', rowNo);
	if (su) {
		// alert("成功。编写自定义代码从服务器删除行");
		return true;
	} else {
		// alert("已经删除或不在列表!");
		return false;
	}
}

/**
 * 批量删除表格中的行
 * 
 * @param jqgridId
 *            表格ID
 * @param selectRowArr
 *            表示选中的行数组
 */
function ctl_deleteMultiRowData(jqgridId, selectRowArr) {
	var len = selectRowArr.length;
	for (var i = len - 1; i >= 0; i--) {
		jQuery("#" + jqgridId).jqGrid('delRowData', selectRowArr[i]);
	}
}

/**
 * 更新一行数据
 * 
 * @param jqgridId
 *            表格ID
 * @param rowNo
 *            表示行数
 * @param rowObj
 *            行对象 例如：{amount:"333.00",tax:"33.00",total:"366.00",note:"<img
 *            src='images/user1.gif'/>"} 返回更新成功或失败
 */
function ctl_updateRowData(jqgridId, rowNo, rowObj) {
	var su = jQuery("#" + jqgridId).jqGrid('setRowData', rowNo, rowObj);
	if (su) {
		// alert("成功。编写自定义代码,以在服务器更新行！");
		return true;
	} else {
		// alert("不能更新！");
		return false;
	}
}

/**
 * 添加一行数据 最好在 loadComplete 方法里面使用  2013-9-26
 *  不建议使用此方法添加多行，建议使用数组的方式初始化多行数据
 * @param jqgridId
 *            表格ID
 * @param rowNo
 *            行数
 * @param rowObj
 *            行对象
 *            例如：{id:"99",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"}
 * @param insertType:last指向表格最后一行追加(默认),first第一行追加 first, last, before and after
 *            返回添加成功或失败
 */
function ctl_insertRowData(jqgridId, rowNo, rowObj, insertType) {
	if (typeof(insertType) == 'undefined') {
		insertType = "last";
	}
	var su = jQuery("#" + jqgridId).jqGrid('addRowData', rowNo, rowObj,
			insertType);
	if (su) {
		// alert("成功。编写自定义代码,以在服务器中添加数据!");
		return true;
	} else {
		// alert("添加失败！");
		return false;
	}
}

/**
 * 获取表格参数
 * 
 * @param jqgridId
 *            表格ID
 * @param param
 *            要获取的参数 如获取url：jQuery('#jqgridId').jqGrid('getGridParam','url')
 *            返回参数的值
 */
function ctl_getGridParam(jqgridId, param) {
	return jQuery('#' + jqgridId).jqGrid('getGridParam', param);
}

/**
 * 设置表格参数
 * 
 * @param jqgridId
 *            表格ID
 * @param param
 *            注意格式：{page:2,rowNum:15}
 * @param isReloadGrid
 *            是否需要刷新
 *            如：jQuery("#jqgridId").jqGrid('setGridParam',{page:2}).trigger("reloadGrid");
 */
function ctl_setGridParam(jqgridId, param, isReloadGrid) {
	if (isReloadGrid) {
		jQuery("#" + jqgridId).jqGrid('setGridParam', param)
				.trigger("reloadGrid");
	} else {
		jQuery("#" + jqgridId).jqGrid('setGridParam', param);
	}
}

/**
 * 设置表格标题
 * 
 * @param jqgridId
 *            表格ID
 * @param title
 *            表格标题
 */
function ctl_setGridTitle(jqgridId, title) {
	jQuery("#" + jqgridId).jqGrid('setCaption', title);
}

/**
 * 设置选中某行
 * 
 * @param jqgridId
 *            表格ID
 * @param rowNo
 *            行数
 */
function ctl_setRowSelect(jqgridId, rowNo) {
	// 获取当前全部选中行号
	var selectedArray = ctl_getSelectIds(jqgridId);
	// 如果当前行号没有被选中，才触发选中事件
	// update by liying(修改两次选中变成不选中的bug)
	if (!ctl_arrayContains(selectedArray, rowNo)) {
		jQuery("#" + jqgridId).jqGrid('setSelection', rowNo);
	}

}

/**
 * 取消选中某行
 * 
 * @param jqgridId
 *            表格ID
 * @param rowNo
 *            行数
 */
function ctl_cancelRowSelect(jqgridId, rowNo) {
	var selectedArray = ctl_getSelectIds(jqgridId);
	if (ctl_arrayContains(selectedArray, rowNo)) {
		jQuery("#" + jqgridId).jqGrid('setSelection', rowNo);
	}
}

/**
 * 设置表格显示或者隐藏
 * 
 * @param jqgridId
 *            表格ID
 * @param state
 *            显示：visible 隐藏：hidden
 */
function ctl_setGridState(jqgridId, state) {
	jQuery("#" + jqgridId).jqGrid('setGridState', state);
}

/**
 * 隐藏列
 * 
 * @param jqgridId
 *            表格ID
 * @param colName
 *            注意格式["amount","tax"]可隐藏多列
 */
function ctl_hiddenColumn(jqgridId, colName) {
	// jQuery("#"+jqgridId).jqGrid('navGrid','hideCol',colName);
	jQuery("#" + jqgridId).jqGrid("hideCol", colName);
}

/**
 * 显示列
 * 
 * @param jqgridId
 *            表格ID
 * @param colName
 *            注意格式["amount","tax"]可显示多列
 */
function ctl_showColumn(jqgridId, colName) {
	// jQuery("#"+jqgridId).jqGrid('navGrid','showCol',colName);
	jQuery("#" + jqgridId).jqGrid("showCol", colName);
}

/**
 * 改变列名
 * 
 * @param jqgridId
 *            表格ID
 * @param colName
 *            列名
 * @param newName
 *            新名字
 * @param cssStyle
 *            css样式 如：$("#jqgridId").jqGrid('setLabel',"tax","Tax
 *            Amt",{'font-weight': 'bold','font-style': 'italic'});
 */
function ctl_headerLabel(jqgridId, colName, newName, cssStyle) {
	$("#" + jqgridId).jqGrid('setLabel', colName, newName, cssStyle);
}

/**
 * 自定义列提示
 * 
 * @param jqgridId
 *            表格ID
 * @param iColumn
 *            列名或者列下标
 * @param textTip
 *            提示
 */
function ctl_setColumnHeaderTip(jqgridId, iColumn, textTip) {
	var thd = jQuery("thead:first", jQuery("#" + jqgridId).hDiv)[0];
	jQuery("tr.ui-jqgrid-labels th:eq(" + iColumn + ")", thd).attr("title",
			textTip);
}

/**
 * 改变单元格内容
 * 
 * @param jqgridId
 *            表格ID
 * @param rowNo
 *            行数
 * @param colName
 *            列名
 * @param newText
 *            新内容
 * @param cssStyle
 *            css样式
 * @param newProperties
 *            属性 如 $("#jqgridId").jqGrid('setCell',"12","tax","",{'font-weight':
 *            'bold',color: 'red','text-align':'center'},'');
 */
function ctl_setCell(jqgridId, rowNo, colName, newText, cssStyle, newProperties) {
	$("#" + jqgridId).jqGrid('setCell', rowNo, colName, newText, cssStyle,
			newProperties);
}

/**
 * 清空表格
 * 
 * @param jqgridId
 *            表格ID
 */
function ctl_clearGridData(jqgridId) {
	$("#" + jqgridId).jqGrid('clearGridData');
}

/**
 * 设置表格宽度
 * 
 * @param jqgridId
 *            表格ID
 * @param width
 *            表格宽度
 *  @param isReload
 *            默认允许reload，设置为false表示不允许reload
 */
function ctl_setGridWidth(jqgridId, width,isReload) {
	if (isNaN(width)) {
		// alert("表格高度的值必须是一个数字");
		ctl_showMessage("表格高度的值必须是一个数字");
	} else {
		jQuery("#" + jqgridId).jqGrid('setGridWidth', width);
		if(isReload == null || isReload == ''){
			jQuery("#" + jqgridId).trigger("reloadGrid");
		}
	}
}

/**
 * 设置表格高度
 * 
 * @param jqgridId
 *            表格ID
 * @param height
 *            表格高度 动态改变grid的高度，只能对单元格的高度进行设置而不能对表格的高度进行动态修改。
 */
function ctl_setGridHeight(jqgridId, height) {
	jQuery("#" + jqgridId).jqGrid('setGridHeight', height)
			.trigger("reloadGrid");
}

/**
 * 表头合并
 * 
 * @param jqgridObj
 *            如：
 *            ----------------------------------------------------------------------------------------
 *            needHeaderMerger:true,//需要表头合并
 *             useColSpanStyle: true, //单元格合并：true,不合并false 
 *             groupHeaders:[ {startColumnName: 'menuId',
 *            numberOfColumns: 2, titleText: '<em>联系方式</em>'},
 *            {startColumnName: 'operUser', numberOfColumns: 4, titleText:
 *            '其他信息'} ],
 *            ----------------------------------------------------------------------------------------
 */
function ctl_headerMerger(headerMergerObj,callBack) {
	// 表头合并
	jQuery("#" + headerMergerObj.jqGridId).jqGrid('setGroupHeaders', {
				useColSpanStyle : headerMergerObj.useColSpanStyle,
				groupHeaders : headerMergerObj.groupHeaders
			});
	if(null != callBack){
		callBack();
	}
}

/**
 * 固定列
 * 
 * @param jqgridId
 *            表格ID
 */
function ctl_fixedColumns(jqgridId) {
	jQuery("#" + jqgridId).jqGrid('setFrozenColumns');
}

/**
 * 配置分页导航栏
 * 
 * @param jqgridId
 *            表格ID
 * @param pagerId
 *            分页导航栏ID
 * @param pagerObj
 *            分页导航栏对象
 *            如：{add:false,edit:false,del:false,search:false,refresh:false}
 */
function ctl_configurationPager(jqgridId, pagerId, pagerObj) {
	jQuery("#" + jqgridId).jqGrid('navGrid', '#' + pagerId, pagerObj);
}

/**
 * 更新分页栏上要显示的html内容,jqgrid本身分页栏只加载一次，刷新不重新加载
 * 
 * @param pagerId
 *            分页栏ID
 * @param htmlText
 *            要显示的html内容
 */
function ctl_updatePagerHtmlText(pagerId, htmlText) {
	$("#" + pagerId + " ." + jqgridPagerHtmlClass).html(htmlText);
}

/**
 * 分页导航栏添加自定义按钮
 * 
 * @param jqgridId
 *            表格ID
 * @param pagerId
 *            分页导航栏ID
 * @param navButtonObj
 *            分页导航栏按钮对象 如： ---------------------------------------------------- {
 *            caption: "自定义列", title: "自定义列", onClickButton : function (){
 *            ctl_alertColumnChooserPage(thePageJqgridId); } }
 *            ----------------------------------------------------
 */
function ctl_navButtonAdd(jqgridId, pagerId, navButtonObj) {
	jQuery("#" + jqgridId).jqGrid('navButtonAdd', '#' + pagerId, navButtonObj);
}

/**
 * 弹出jqgrid自定义列页面
 * 
 * @param jqgridId
 *            表格ID 注意：在调用前必须配置分页导航栏
 */
function ctl_alertColumnChooserPage(jqgridId,obj) {	
	jQuery("#" + jqgridId).jqGrid('columnChooser',obj);
}

/**
 * 将子表html插入到子表div中
 * 
 * @param subgrid_divid
 *            主表格中会创建一个div元素用来容纳子表格
 * @param subgrid_table_id
 *            子表的id 子表分页工具栏id
 * @param subgrid_pager_id
 */
function ctl_insertSubJqgridHtml(subgrid_divid, subgrid_table_id,
		subgrid_pager_id) {
	// 将子表html插入到子表div中
	$("#" + subgrid_divid).html("<table id='" + subgrid_table_id
			+ "' class='scroll'></table><div id='" + subgrid_pager_id
			+ "' class='scroll'></div>");
}

/**
 * 需要行合并时，在colModel的列字段处配置：cellattr:ctl_addCellSpanAttr
 * 
 * @param rowId
 * @param tv
 * @param rawObject
 * @param cm
 * @param rdata
 * @returns {String} 它的作用是动态给该单元格添加属性 例如：{name:'menuId',index:'menuId',cellattr:
 *          ctl_addCellSpanAttr},
 */
function ctl_addCellSpanAttr(rowId, tv, rawObject, cm, rdata) {
	return "id=\'" + cm.name + rowId + "\'";
}

/**
 * 在gridComplete调执行合并方法,传入JqgridId和需要行合并的列的name数组
 * 
 * @param jqgridId
 *            表格ID
 * @param colNameArr
 *            需要行合并的列的name数组
 */
function ctl_execRowMerger(jqgridId, colNameArr) {
	if (typeof(jqgridId) == 'undefined') {
		ctl_showMessage("请先配置行合并的表格id");
		return;
	}
	if (typeof(colNameArr) == 'undefined') {
		ctl_showMessage("请先配置哪些列需要行合并");
		return;
	}
	for (var i = 0; i < colNameArr.length; i++) {
		ctl_rowMerger(jqgridId, colNameArr[i]);
	}
}

/**
 * 行合并算法
 * 
 * @param jqgridId
 *            表格ID
 * @param colModelName
 *            需要行合并的列的name
 */
function ctl_rowMerger(jqgridId, colModelName) {
	// 得到显示到界面的id集合
	var mya = $("#" + jqgridId).getDataIDs();
	// 当前显示多少条
	var length = mya.length;
	for (var i = 0; i < length; i++) {
		// 从上到下获取一条信息
		var before = $("#" + jqgridId).jqGrid('getRowData', mya[i]);
		// 定义合并行数
		var rowSpanTaxCount = 1;
		for (var j = i + 1; j <= length; j++) {
			// 和上边的信息对比 如果值一样就合并行数+1 然后设置rowspan 让当前单元格隐藏
			var end = $("#" + jqgridId).jqGrid('getRowData', mya[j]);
			if (before[colModelName] == end[colModelName]) {
				rowSpanTaxCount++;
				$("#" + jqgridId).setCell(mya[j], colModelName, '', {
							display : 'none'
						});
			} else {
				break;
			}
		}
		$("#"+mya[i]).find("td[aria-describedby='"+jqgridId+"_"+colModelName+"']").attr("rowspan", rowSpanTaxCount);
	}
}


/**
 * 表格行拖动处理
 * 
 * @param jqgridId
 *            表格ID
 * @param rowDragObj
 *            行拖动要设置的参数
 */
function ctl_rowDragEvents(jqgridId, rowDragObj) {
	jQuery("#" + jqgridId).jqGrid('sortableRows', rowDragObj);
}

/**
 * 配置表格搜索工具栏
 * 
 * @param jqgridId
 *            表格ID
 * @param filterToolbarObj
 *            搜索工具栏对象
 */
function ctl_configFilterToolbar(jqgridId, filterToolbarObj) {
	jQuery("#" + jqgridId).jqGrid('filterToolbar', filterToolbarObj);
}

/**
 * 求每列的统计
 * 
 * @param jqgridId
 *            表格ID
 * @param colName
 *            统计的列名
 * @param returntype
 *            返回的数据结果类型 false:只返回值，不带属性名 true:带属性名
 *            如{id:1,value:1},{id:2,value:2}
 * @param mathtype
 *            分为求和'sum', 求平均值'avg', 求总数'count'
 */
function ctl_getCol(jqgridId, colName, returntype, mathtype) {
	return $('#' + jqgridId).getCol(colName, returntype, mathtype);
}

/**
 * 获取jqgrid随机行id
 * 
 * @param num
 *            从num开始
 * @returns
 */
function getRandId(num) {
	if (!num || num <= 0) {
		return $.jgrid.randId();
	} else {
		return $.jgrid.randId(num);
	}
}

// /**
// * 灵活调用jqgrid的方法
// * @param jqgridId
// * @param methodType
// * @param value
// * 例：
// */
// function ctl_callsMethod(jqgridId,methodType,value){
// $("#"+jqgridId).jqGrid(methodType,value);
// }

/**
 * 恢复行编辑
 * 
 * @param jqgridId
 * @param rowNo
 */
function ctl_restoreRow(jqgridId, rowNo) {
	$("#" + jqgridId).jqGrid('restoreRow', rowNo);
}

/**
 * 说明： 在jqgrid中找到要单元格并将处在编辑的状态的单元格实现键盘中上下左右键的控制
 * 
 * @param jqgridId
 *            jqgrid的唯一标识id
 * @param inputType
 *            文本框类型
 * @returns 调用示例：tabTableInput("jqgridId","textbox");
 */
var tabTableInput = function(jqgridId, inputType) {
	var rowInputs = [];
	var trs = $("#" + jqgridId).find("tr");
	var inputRowIndex = 0;
	$.each(trs, function(i, obj) {
		if ($(obj).find("th").length > 0) {
			// 跳过表头
			return true;
		}
		var rowArray = [];
		var thisRowInputs;
		if (!inputType) {
			// 所有的input
			thisRowInputs = $(obj)
					.find("input:not(:disabled):not(:hidden):not([readonly])[type!='checkbox']");
			thisRowselects = $(obj).find("select");
		} else {
			thisRowInputs = $(obj)
					.find("input:not(:disabled):not(:hidden):not([readonly])[type="
							+ inputType + "]");
		}
		if (thisRowInputs.length == 0)
			return true;
		thisRowInputs.each(function(j) {
					$(this).attr("_r_", inputRowIndex).attr("_c_", j);
					rowArray.push({
								"c" : j,
								"input" : this
							});
					$(this).keydown(function(evt) {
						var r = $(this).attr("_r_");
						var c = $(this).attr("_c_");
						var tRow;
						if (evt.which == 38) {
							// 上
							if (r == 0)
								return;
							$(rowInputs[r].data[c].input).blur();
							r--; // 向上一行
							tRow = rowInputs[r];

							if (c > tRow.length - 1) {

								c = tRow.length - 1;

							}

						} else if (evt.which == 40) { // 下
							if (r == rowInputs.length - 1) {
								// 已经是最后一行
								return;
							}
							$(rowInputs[r].data[c].input).blur();
							r++;
							tRow = rowInputs[r];
							if (c > tRow.length - 1) {
								c = tRow.length - 1;
							}
						} else if (evt.which == 37) { // 左
							if (r == 0 && c == 0) {
								// 第一行第一个,则不执行操作
								return;
							}
							$(rowInputs[r].data[c].input).blur();
							if (c == 0) {
								// 某行的第一个,则要跳到上一行的最后一个,此处保证了r大于0
								r--;
								tRow = rowInputs[r];
								c = tRow.length - 1;
							} else {
								// 否则只需向左走一个
								c--;
							}
						} else if (evt.which == 39) { // 右
							tRow = rowInputs[r];
							if (r == rowInputs.length - 1
									&& c == tRow.length - 1) {
								// 最后一个不执行操作
								return;
							}
							$(rowInputs[r].data[c].input).blur();
							if (c == tRow.length - 1) { // 当前行的最后一个,跳入下一行的第一个
								r++;
								c = 0;
							} else {
								c++;
							}
						} else if (evt.which == 13) { // enter键
							evt.preventDefault();
							tRow = rowInputs[r];
							if (r == rowInputs.length - 1
									&& c == tRow.length - 1) { // 最后一个不执行操作
								return;
							}

							$(rowInputs[r].data[c].input).blur();
							if (c == tRow.length - 1) { // 当前行的最后一个,跳入下一行的第一个
								r++;
								c = 0;
							} else {
								c++;
							}
						}
						if (evt.which == 13 || evt.which == 39
								|| evt.which == 37 || evt.which == 40
								|| evt.which == 38) {
							$(rowInputs[r].data[c].input).focus(function() {
										this.select();
									});
							$(rowInputs[r].data[c].input).focus();
						}
					});
				});
		rowInputs.push({
					"length" : thisRowInputs.length,
					"rowindex" : inputRowIndex,
					"data" : rowArray
				});
		inputRowIndex++;
	});
};

/**
 * jqgrid扩展全选、反选、不选
 * 
 * @param checkboxObj
 *            复选框对象
 */
function enhanceCheckbox(checkboxObj) {
	var id = checkboxObj.id;// 需要扩展checkbox的div
	var jqGridId = checkboxObj.jqGridId;// 这个层悬浮在表格上，即对应的jqgrid的id
	var allCheckboxSelect = checkboxObj.allCheckboxSelect;// 全选
	var insteadCheckbox = checkboxObj.insteadCheckbox;// 反选
	var noCheckboxSelect = checkboxObj.noCheckboxSelect;// 不选
	var fieldName = checkboxObj.fieldName;// 指定需要加需要扩展checkbox的字段名,逗号隔开
	var fieldValue = checkboxObj.fieldValue;// 对应字段的值,逗号隔开

	// 全选、反选、不选默认为true
	if (typeof(allCheckboxSelect) == 'undefined') {
		allCheckboxSelect = true;
	}
	if (typeof(insteadCheckbox) == 'undefined') {
		insteadCheckbox = true;
	}
	if (typeof(noCheckboxSelect) == 'undefined') {
		noCheckboxSelect = true;
	}
	// 拼装下拉显示层
	var divStr = "<div id='qty_items_" + jqGridId
			+ "' class='qty_items' style='display: none'>";
	if (allCheckboxSelect) {
		divStr = divStr + "<div class='qty_items_out'>全选</div>";
	}
	if (insteadCheckbox) {
		divStr = divStr + "<div class='qty_items_out'>反选</div>";
	}
	if (noCheckboxSelect) {
		divStr = divStr + "<div class='qty_items_out'>不选</div>";
	}
	if (typeof(fieldName) != 'undefined' && typeof(fieldValue) != 'undefined') {
		if (fieldName.length - fieldValue.length == 0) {
			for (var i = 0; i < fieldName.length; i++) {
				divStr = divStr + "<div class='qty_items_hr'>-----</div>";
				var name = fieldName[i];
				var values = fieldValue[i];
				for (var j = 0; j < values.length; j++) {
					divStr = divStr + "<div class='qty_items_out' name='"
							+ name + "'>" + values[j] + "</div>";
				}
			}
		} else {
			// alert("扩展复选框配置的fieldName和fieldValue长度不想等，不符合解析规则！");
			ctl_showMessage("扩展复选框配置的fieldName和fieldValue长度不想等，不符合解析规则！");
		}
	}
	divStr = divStr + "</div>";
	document.getElementById(id).innerHTML = divStr;
}

/**
 * 全选不选反选下拉---显示下拉显示层（这里有jqgrid源码中调用） xiala表示下拉图片的id option表示下拉层id
 * jqgridId需要加下拉层的扩展表格id
 */
function show_select(xiala, option, jqgridId) {
	optionobj = document.getElementById(option);

	// ----------------------------------------------------------------------------------------------//
	// 针对联羿布局框架的特殊性，而加入此代码
	if (navigator.userAgent.indexOf("MSIE") > 0) {
		optionobj.style.left = getAbsoluteLeft(xiala)
				- $("#centerDiv").position().left - 16 + "px";
		// optionobj.style.top=getAbsoluteTop(xiala)-$("#centerDiv").position().top-document.getElementById(currentCode).scrollTop+16+"px";
		optionobj.style.top = getAbsoluteTop(xiala)
				- $("#centerDiv").position().top + 16 + "px";
	} else {
		optionobj.style.left = getAbsoluteLeft(xiala)
				- $("#centerDiv").position().left - 14 + "px";
		// optionobj.style.top=getAbsoluteTop(xiala)-$("#centerDiv").position().top-document.getElementById(currentCode).scrollTop+16+"px";
		optionobj.style.top = getAbsoluteTop(xiala)
				- $("#centerDiv").position().top + 16 + "px";
	}
	// ----------------------------------------------------------------------------------------------//
	// optionobj.style.left=getAbsoluteLeft(xiala)-15+"px";
	// optionobj.style.top=getAbsoluteTop(xiala)+16+"px";

	optionobj.style.display = optionobj.style.display == "" ? "none" : "block";
	optionobj.onblur = function() {
		optionobj.style.display = "none";
	};
	for (var i = 0; i < optionobj.childNodes.length; i++) {
		optionobj.style.display = "block";
		optionobj.focus();
		optionobj.childNodes[i].onmouseover = function() {
			if (this.className != 'qty_items_hr') {
				this.className = "qty_items_over";
			}
		};
		optionobj.childNodes[i].onmouseout = function() {
			if (this.className != 'qty_items_hr') {
				this.className = "qty_items_out";
			}
		};
		optionobj.childNodes[i].onclick = function() {
			if (this.innerHTML == "全选") {
				jqgridAllCheckboxSelect(jqgridId);
			} else if (this.innerHTML == "反选") {
				jqgridInsteadCheckbox(jqgridId);
			} else if (this.innerHTML == "不选") {
				jqgridNoCheckboxSelect(jqgridId);
			} else {
				// 选中当前页中指定字段与下拉层中选中的值一致的记录

				$("#" + jqgridId).resetSelection();// 清空已选记录
				var reccount = $("#" + jqgridId).getGridParam("reccount");// 获得当前列表行数
				var page = jQuery("#" + jqgridId)
						.jqGrid('getGridParam', 'page');// 获得当前页
				var rowNum = jQuery("#" + jqgridId).jqGrid('getGridParam',
						'rowNum');// 获得每页显示记录数
				var start = (page - 1) * rowNum;
				for (var i = 1; i <= reccount; i++) {
					var row = jQuery("#" + jqgridId).jqGrid('getRowData',
							(i + start));
					// 如果当前页中指定字段与下拉层中选中的值一致
					// 注意火狐中只有this.getAttribute("name")才能获取值
					var name = this.getAttribute("name");
					if (this.innerHTML == row[name + ""]) {
						jQuery("#" + jqgridId).jqGrid('setSelection',
								'' + (i + start));
					}
				}
			}
			optionobj.blur();
			optionobj.style.display = "none";
		};
	}
}
/**
 * 获取控件左绝对位置
 * 
 * @param objectId
 * @returns
 */
function getAbsoluteLeft(objectId) {
	var o = document.getElementById(objectId);
	if (o) {
		var oLeft = o.offsetLeft;
		while (o.offsetParent != null) {
			var oParent = o.offsetParent;
			oLeft += oParent.offsetLeft;
			o = oParent;
		}
		return oLeft;
	}
	return 0;
}
/**
 * 获取控件上绝对位置
 * 
 * @param objectId
 * @returns
 */
function getAbsoluteTop(objectId) {
	var o = document.getElementById(objectId);
	if (o) {
		var oTop = o.offsetTop;
		while (o.offsetParent != null) {
			var oParent = o.offsetParent;
			oTop += oParent.offsetTop;
			o = oParent;
		}
		return oTop;
	}
	return 0;
}

/**
 * 表格全选方法，传入jqgrid的id
 */
function jqgridAllCheckboxSelect(jqgridId) {
	// 法1：先不选再反选
	jqgridNoCheckboxSelect(jqgridId);
	jqgridInsteadCheckbox(jqgridId);

	// 法2：判断该行是否已选择，已选跳过，未选则勾上
	// var reccount=$("#myTab").getGridParam("reccount");//获得当前列表行数
	// var selarrrow=jQuery("#myTab").jqGrid("getGridParam","selarrrow");
	// var selarrrows=(""+selarrrow).split(",");
	// for(var i=1;i<=reccount;i++){
	// var bool="false";
	// for(var j=0;j<selarrrows.length;j++){
	// if(i==selarrrows[j]){
	// var bool="true";
	// break;
	// }
	// }
	// if(bool=="false"){
	// jQuery("#myTab").jqGrid('setSelection',''+i);
	// }
	// }
}

/**
 * 表格反选方法，传入jqgrid的id
 */
function jqgridInsteadCheckbox(jqgridId) {
	var reccount = $("#" + jqgridId).getGridParam("reccount");// 获得当前列表行数
	var page = jQuery("#" + jqgridId).jqGrid('getGridParam', 'page');// 获得当前页
	var rowNum = jQuery("#" + jqgridId).jqGrid('getGridParam', 'rowNum');// 获得每页显示记录数
	var start = (page - 1) * rowNum;
	for (var i = 1; i <= reccount; i++) {
		jQuery("#" + jqgridId).jqGrid('setSelection', '' + (i + start));
	}
}

/**
 * 表格不选方法，传入jqgrid的id
 */
function jqgridNoCheckboxSelect(jqgridId) {
	$("#" + jqgridId).resetSelection();
}

// -----jqgrid验证（开始）----------------------------------------------------------------//
// validatorObj包含属性[required number integer minValue maxValue email url date
// time]
// 调用：
// ctl_jqgridValidator{
// obj:obj,
// validatorObj:validatorObj,
// validatorCallBack:validatorCallBack
// }

/**
 * jqgrid验证,传入验证配置
 */
function ctl_jqgridValidator(jqgridValidator) {
	var obj = jqgridValidator.obj;
	var validatorObj = jqgridValidator.validatorObj;
	var errorCallBack = jqgridValidator.errorCallBack;
	var validatorCallBack = jqgridValidator.validatorCallBack;
	var validatorValue = obj.value;
	// required==true
	if (typeof(validatorObj.required) != "undefined"
			&& validatorObj.required == true) {
		// 验证是否为空
		var bool = false;
		if (validatorValue == "") {
			bool = true;
		} else {
			var valReg = new RegExp("^[ ]+$");
			bool = valReg.test(validatorValue);
		}
		if (bool) {
			ctl_alert("不能为空", function() {
						ctl_errorCallBack(errorCallBack, obj);
					});
			return;
		}
	}
	// number==true
	if (typeof(validatorObj.number) != "undefined"
			&& validatorObj.number == true) {
		// 验证是否为数字
		validatorValue = $.trim(validatorValue);
		if (validatorValue) {
			validatorValue = $.trim(validatorValue);
			var valReg = new RegExp("^([+-]?)\\d*\\.?\\d+$");
			var bool = valReg.test(validatorValue);
			if (!bool) {
				ctl_alert("必须输入数字", function() {
							ctl_errorCallBack(errorCallBack, obj);
						});
				return;
			}
		}
	}
	// integer==true
	if (typeof(validatorObj.integer) != "undefined"
			&& validatorObj.integer == true) {
		validatorValue = $.trim(validatorValue);
		if (validatorValue) {
			// 验证是否为整数
			var valReg = new RegExp("^-?[0-9]\\d*$");
			var bool = valReg.test(validatorValue);
			if (!bool) {
				ctl_alert("必须输入整数", function() {
							ctl_errorCallBack(errorCallBack, obj);
						});
				return;
			}
		}
	}
	// minValue==XX
	if (typeof(validatorObj.minValue) != "undefined") {
		if (validatorValue < validatorObj.minValue) {
			ctl_alert("数值不能小于" + validatorObj.minValue, function() {
						ctl_errorCallBack(errorCallBack, obj);
					});
			return;
		}
	}
	// maxValue==XX
	if (typeof(validatorObj.maxValue) != "undefined") {
		if (validatorValue > validatorObj.maxValue) {
			ctl_alert("数值不能大于" + validatorObj.maxValue, function() {
						ctl_errorCallBack(errorCallBack, obj);
					});
			return;
		}
	}
	// email==true
	if (typeof(validatorObj.email) != "undefined" && validatorObj.email == true) {
		// 验证邮箱
		var reg = new RegExp("^[0-9a-zA-Z]+@[0-9a-zA-Z]+[\.]{1}[0-9a-zA-Z]+[\.]?[0-9a-zA-Z]+$");
		var bool = reg.test(validatorValue);
		if (!bool) {
			ctl_alert("请输入正确的邮箱", function() {
						ctl_errorCallBack(errorCallBack, obj);
					});
			return;
		}
	}
	// url==true
	if (typeof(validatorObj.url) != "undefined" && validatorObj.url == true) {
		// 验证URl 如：http://www.baidu.com
		var reg = new RegExp("^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$");
		var bool = reg.test(validatorValue);
		if (!bool) {
			ctl_alert("请输入正确的URl", function() {
						ctl_errorCallBack(errorCallBack, obj);
					});
			return;
		}
	}
	// date==true
	if (typeof(validatorObj.date) != "undefined" && validatorObj.date == true) {
		// 验证是否为日期
		/*
		 * var reg = new RegExp("^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$"); var
		 * bool=reg.test(validatorValue); if(!bool){ alert("请输入正确的日期"); return; }
		 */
		/**/
		var bool = false;
		var r = validatorValue.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
		if (r == null) {
			bool = false;
		} else {
			var d = new Date(r[1], r[3] - 1, r[4]);
			bool = (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d
					.getDate() == r[4]);
		}
		if (!bool) {
			ctl_alert("请输入正确的日期", function() {
						ctl_errorCallBack(errorCallBack, obj);
					});
			return;
		}
	}
	// time==true
	if (typeof(validatorObj.time) != "undefined" && validatorObj.time == true) {
		// 验证是否为时间
		var bool = false;
		var r = validatorValue
				.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
		if (r == null) {
			bool = false;
		} else {
			var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
			bool = (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3]
					&& d.getDate() == r[4] && d.getHours() == r[5]
					&& d.getMinutes() == r[6] && d.getSeconds() == r[7]);
		}
		if (!bool) {
			ctl_alert("请输入正确的时间", function() {
						ctl_errorCallBack(errorCallBack, obj);
					});
			return;
		}
	}

	// 回调函数
	if (typeof(validatorCallBack) != "undefined") {
		validatorCallBack(obj);
	}
}

// 失败的回调函数
function ctl_errorCallBack(errorCallBack, obj) {
	// 回调函数
	if (typeof(errorCallBack) != "undefined") {
		errorCallBack(obj);
	}
}
// -----jqgrid验证（结束）----------------------------------------------------------------//

/**
 * @desc 判断行是否是编辑状态
 * @author xyk 2013-5-8
 */
function isRowEditMode(jqGridId,rowId){
	if(!jqGridId || !rowId){
		return;
	}
	var edited = "0";
	var ind = jQuery("#"+jqGridId).getInd(rowId,true);
	if(ind != false){
	    edited = $(ind).attr("editable");
	}
	if(edited === "1"){
		return true;
	} else {
		return false;
	}
}

/**
 * 保存行编辑
 * @author  xyk 2013-4-24
 * @param jqgridId
 * @param rowNo
 * @param type  是否本地保存 
 */
function ctl_saveRow(jqgridId, rowNo, type) {
	if(type && type === 'clientArray'){
		$("#" + jqgridId).jqGrid('saveRow', rowNo,false ,type);
	} else {
		$("#" + jqgridId).jqGrid('saveRow', rowNo);
	}
}

/**
 *  新增一编辑行,  在loadComplete里面写入
 *  @author xyk  2013-5-15
 *  @param jqGridId
 *  @param rowObj {name:'xyk'}
 *  @param opeCol  操作列名
 *  @param opeObj {'保存':'function','清空':'function'}
 *  @param addRowId    如果有值说明这不是重新新增的一行，没有值说明是表格加载完后默认新增一行，
 *   区别在于重新新增一行，上一行的操作列从保存变为删除      可选
 *   @param callBackObj {'删除':'function'}    需要rowId参数  保存新行的同时，把这一行的链接从 保存 清空 改为 删除
 *  @return rowId  新行id
 */
function ctl_createNewLine(jqGridId,rowObj,opeObj,opeCol,addRowId,callBackObj){
	if(!jqGridId || !opeObj){
		return;
	}
	var rowId = "n"+new Date().getTime()+parseInt(Math.random()*10+1);
	if(rowObj){
		ctl_insertRowData(jqGridId, rowId,rowObj, 'first');
	} else {
		ctl_insertRowData(jqGridId, rowId,{}, 'first');
	}
	//删除的操作
    if(addRowId){
    	ctl_setOperateColLink(jqGridId,addRowId,opeCol,callBackObj);
    	ctl_saveRow(jqGridId,addRowId,'clientArray');
	}
	// 表格可编辑
	intoEditRow(jqGridId, rowId);
	ctl_setOperateColLink(jqGridId,rowId,opeCol,opeObj);
	return rowId;
}

/**
 * @desc 操作列 增加链接 同时去掉 title
 * @author xyk 
 * @param jqGridId
 * @param rowId
 * @param opeCol  操作列名
 * @param opeObj  {'保存&提示信息':'function','清空':'function'}
 */
function ctl_setOperateColLink(jqGridId,rowId,opeCol,opeObj){
	if(!jqGridId || !rowId || !opeObj){
		return;
	}
	//操作列的链接处理
	var opeHtml = "<center>";
	//去否去掉列名
	var removeTitle = false;
	var count = 1;
	for(var key in opeObj){
		//第二个链接加空格
		if(opeHtml != "<center>"){
			opeHtml+="";
			removeTitle = true;
		}
		//提示信息
		var title = key.split('&')[1];
		title = title || key;
		//链接文字
		var text = key.split('&')[0];
		if(count > 1){
			opeHtml+=" | ";
		}
		opeHtml += "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;'  title='"+title+"' onclick=\""+opeObj[key]+"('"+ rowId + "',this)\" id=" + rowId + ">"+text+"</a>";
		count++;
	}
	opeHtml+"</center>";
	ctl_setCell(jqGridId,rowId,opeCol,opeHtml);
	
	// 去掉列 title
	if(removeTitle){
		ctl_cancelColumnTitle(jqGridId,[opeCol]);
	}
}

/**
 * 应用在 循环每行验证，一有错误立即退出
 * 行数据验证( 数字、字符、金额) .  在colModel 里面要指定,  需要在colModel中指定formatter
 * @author xyk  2013-5-10
 * @param jqgridId 
 * @param rowNo
 * @return 布尔值
 */
function  ctl_newRowValidation(jqGridId,rowId){
	if(!jqGridId || !rowId){
		return false;
	}
	var colModel = ctl_getGridParam(jqGridId, "colModel");
	var colName = ctl_getGridParam(jqGridId, "colNames");
	if(!colModel || !colName){
		return false;
	}
	//那些editable 为true的
	for(var i in colModel){
		var colObj = colModel[i];
		if(!colObj.editable || !colObj.name || colObj.hidden){
			 continue;
		}
		//元素是编辑状态
		if($("#"+rowId+"_"+colObj.name).length<1){
			continue;
		}
		var value = ctl_getCurRowData(jqGridId,rowId,colObj.name);
		//空值判断  nullCheck 有这个属性说明可以为空   , 默认可以为空
		var nullCheck = colObj.nullCheck;
		if(!value && nullCheck){
			ctl_showMsg(colName[i]+"不能为空！");
			ctl_setRowSelect(jqGridId, rowId);
			$("#"+rowId+"_"+colObj.name).focus();
			return false;
		}
		//长度验证
		var length = colObj.maxLength;
		if(length && length > 0){
			if(value.length > length){
				ctl_showMsg(colName[i]+"长度过长！");
				ctl_setRowSelect(jqGridId, rowId);
				$("#"+rowId+"_"+colObj.name).focus();
				return false;
			}
		}
		
		//符合值判断（不指定不判断是否符合）
		var formatter = colObj.formatter;
		var zero = colObj.zero;
		if(!formatter){
			continue;
		}
		if(formatter === 'integer'){
			if(zero === undefined){
				if(!validateNumFn(value)){
					ctl_showMsg("请在 "+colName[i]+" 列输入正整数！");
					ctl_setRowSelect(jqGridId, rowId);
					$("#"+rowId+"_"+colObj.name).focus();
					return false;
				}
			} else {
				if(!validateNumFn(value,zero)){
					ctl_showMsg("请在 "+colName[i]+" 列输入不小于0的整数！");
					ctl_setRowSelect(jqGridId, rowId);
					$("#"+rowId+"_"+colObj.name).focus();
					return false;
				}
			}
		}
		if(formatter === 'number'){
			if(!validateMountFn(value,zero)){
				ctl_showMsg("请在 "+colName[i]+" 列输入大于0的正数！");
				ctl_setRowSelect(jqGridId, rowId);
				$("#"+rowId+"_"+colObj.name).focus();
				return false;
			}
		}
	}
	return true;
}

/**
 * 取消列的title  主要用于操作列的title 出现了空格等 html元素
 * @author xyk
 * @param jqGridId
 * @param operateArr
 */
function ctl_cancelColumnTitle(jqGridId,operateArr){
	if(!(jqGridId && operateArr && operateArr.length > 0)){
		return;
	}
	//jqgrid 操作列 不显示tip
	for(var index in operateArr){
		var operate = operateArr[index];
		if(operate){
		   	$.each($("td[aria-describedby='"+jqGridId+"_"+operate+"']"),function(){
		   		$(this).attr("title","");
		   	});
		 }
	}
}


/**
 * @desc 清空行数据，单元格可为编辑或者不为编辑
 * @author xyk  2013-4-27
 * @param jqgridId
 * @param rowId
 * @param colNameArr 不包含列集合  可为空  比如说 ['operate']  操作列
 */
function ctl_clearRowData(jqGridId,rowId,colNameArr){
	if(!jqGridId && !rowId){
		return;
	}
	var colModel = ctl_getGridParam(jqGridId, "colModel");
	if(!colModel && colModel.length < 1){
		return;
	}
	for(var i in colModel){
        var name = colModel[i].name;
        if(!name || name == 'rn'){
        	continue;
        }
        if(colNameArr && colNameArr.length > 0){
        	if(ctl_arrayContains(colNameArr, name)){
        		continue;
        	}
        }
        //判断是否编辑元素 还是不可编辑元素，编辑元素有 input这个元素
        if($("#"+rowId+"_"+name).length>0){
        	$("#"+rowId+"_"+name).val("");
        } else {
        	ctl_setCell(jqGridId, rowId, name, null);
        }
	}
}

/**
 * @desc 获取当前行指定列数据 ,当前列可以是编辑状态和不可编辑状态
 * @author xyk 2013-5-8
 * @param jqGridId
 * @param rowId 
 * @param name
 */
function ctl_getCurRowData(jqGridId,rowId,name){
	var value = "";
	if(!rowId){
		return;
	}
	var len = $("#"+rowId+"_"+name).length;
	if($("#"+rowId+"_"+name) && len > 0){
		//看是否是下拉元素
		if($("#"+rowId+"_"+name).is('select')){
			value =  $("#"+rowId+"_"+name+" option:selected").val();
		} else {
			 value =  $("#"+rowId+"_"+name).val();
		}
	 } else {
		 var rowObj = ctl_getRowObjForRowNo(jqGridId, rowId);
		 value = rowObj[name];
	 }
	 if(value){
		 //去除操作列中的html
		 value = value.replace(/<[^>].*?>/g, "");
	 } else {
		 value = "";
	 }
	 return $.trim(value);
}

/**
 * @desc 获取表格中某一列的数据Map
 * @author xyk  2013-5-16
 * @param jqGridId 
 * @param colArr 列名数组
 * @param removeRowArr  不包括的行 数组  (可选)
 * @param pointArr  指定的行(可选)
 * @return map   key=列名  value = 逗号分隔的数据字符
 */
function ctl_getColDataMap(jqGridId,colArr,removeRowArr,pointArr){
	if(!jqGridId || !colArr){
		return;
	}
	var rowIds = ctl_getAllDataIds(jqGridId);
	if(!rowIds || rowIds.length <= 0){
		return;
	}
	if(pointArr && pointArr.length>0){
		rowIds = pointArr;
	}
	var valMap = new Map();
	//遍历行
	for(var index in rowIds){
		var rowId = rowIds[index];
		if(removeRowArr && ctl_arrayContains(removeRowArr,rowId)){
			continue;
		}
		//遍历列
		for(var i in colArr){
			var value = ctl_getCurRowData(jqGridId,rowId,colArr[i]);
			value = value || "";
			value += ",";
			var mapValue = valMap.get(colArr[i]);
			mapValue = mapValue || "";
			valMap.put(colArr[i],mapValue+value);
		}
	}
	return valMap;
}

/**
 * 是否是重复添加(这是在添加前的验证，所以不需要去掉新加的行)
 * @author xyk
 * @param colName 列的数据 主键列
 * @param identify 重复列的提示用的列名
 * @param rowId  自身的一行
 * @return  是唯一 返回 true 不是唯一返回 false
 */
function isIdentifyDataFn(jqGridId,colName,identify,rowId){
	if(!jqGridId || !colName || !identify || !rowId){
		return false;
	}
	var rowIds = ctl_getAllDataIds(jqGridId);
	ctl_arrayRemove(rowIds,rowId);
	var rowVal = ctl_getCurRowData(jqGridId,rowId,colName);
    for(var index in rowIds){
    	var rowId = rowIds[index];
    	var value = ctl_getCurRowData(jqGridId,rowId,colName);
    	if(value && rowVal === value){
			ctl_showMsg("该"+identify+"已存在！不能重复添加");
			$("#"+rowId+"_"+colName).focus();
			return false;
    	}
    }
	return true;
}

/**
 * 单个或多个列组合是否重复
 * @param jqGridId
 * @param rowId
 * @param columnArr
 * @returns {Boolean}
 */
function ctl_repeatColumnValue(jqGridId,rowId,columnArr){
	var value = "";
	for(var index in columnArr){
		var name = columnArr[index];  
		value+=ctl_getCurRowData(articleGrid,rowId,name);
	}
	var ids = ctl_getAllDataIds(jqGridId);
	ctl_arrayRemove(ids, rowId);
	
	for(var inx in ids){
		var rowIds = ids[inx];
		var v = "";
		for(var iny in columnArr){
			var yName = columnArr[iny];
			v+=ctl_getCurRowData(articleGrid,rowIds,yName);
		}
		if(value == v){
			return false;
		}
	}
	return true;
}

/**
 * @desc 获取表格中新加的rowid数组
 * @desc 获取编辑的rowid  通过编辑事件 
 * @param jqGridId  
 * @param identifier  表格列中的主键区分新增和修改, 主键的列是不可编辑的
 * @param newRowId 新加的行不在计算范围内, 因为该行的数据未验证
 */
function getAddRowIds(jqGirdId,identifier,newRowId){
	if(!jqGirdId || !identifier){
		return;
	}
	var rowIds = ctl_getAllDataIds(jqGirdId);
	if(!rowIds || rowIds.length <= 0){
		return;
	}
	if(newRowId){
		ctl_arrayRemove(rowIds, newRowId);
	}
	var newArr = [];
	for(var index in rowIds){
		var rowId = rowIds[index];
		var rowObj = ctl_getRowObjForRowNo(jqGirdId, rowId);
		var identifValue = rowObj[identifier];
		if(!identifValue){
			ctl_arrayAdd(newArr, rowId);
		}
	}
	return newArr;
}

/**
 * @desc 组装Grid参数 , 默认不取operate 操作列的数据，支持增加，删除，修改，多行或单行数据的获取与组装
 * @authror xyk  2013-4-25
 * @param jqGridId     不能为空
 * @param typeName  <row type='typeName'><row>  可为空    noRow  表示不要<row></row>  估计是单行
 * @param pointIdArr : 指定组装参数的行(数组)  可为空
 * @param removeIdArr : 去除不需要组装参数的行(数组)  可为空
 * @param paramObj   有些参数不是grid里面 但是需要传到后台  可为空
 * @return <row type='typeName'><name>xyk</name>....所有列.....<row> 
 */
function generateGridParam(jqGridId,typeName,pointIdArr,removeIdArr,paramObj,removeCol){
	var param = "";
	var colModel = ctl_getGridParam(jqGridId, "colModel");
	if(!(jqGridId && colModel)){
		return param;
	}
	var ids = ctl_getAllDataIds(jqGridId);
	if(pointIdArr){
		ids = pointIdArr;
	}
	if(removeIdArr && removeIdArr.length>0){
		for(var i=0;i<removeIdArr.length;i++){
			ctl_arrayRemove(ids, removeIdArr[i]);
		};
	}
	paramObj = paramObj || {};
	for(var i=0;i<ids.length;i++){
		var rowId = ids[i];
		if(typeName){
			param+="<row type='"+typeName+"'>";
		} else {
			param+="<row>";
		}
        if(typeName == "noRow"){
        	param="";
		}
		for(var k=0;k<colModel.length;k++){
			var name = colModel[k].name;
			if(!name || name == 'rn' || name == 'operate'){
	        	continue;
	        }
			//去掉指定列
			if(removeCol && ctl_arrayContains(removeCol,name)){
				continue;
			}
			//如果标签开头是数字，后台报错，这里在前面加上sns
			if(!isNaN(name.charAt(0))){
				param+="<sns"+name+">"+ctl_getCurRowData(jqGridId,rowId,name)+"</sns"+name+">";
			} else {
				//规格型号可能含有特殊字符，为防止解析出错，用CDATA处理一下
				if(name=='ggxh'){
					param+="<"+name+"><![CDATA["+ctl_getCurRowData(jqGridId,rowId,name)+"]]></"+name+">";
				}else{
					param+="<"+name+">"+ctl_getCurRowData(jqGridId,rowId,name)+"</"+name+">";
				}
			}
			
			
		}
		//每行添加另外的数据
		for(var pro in paramObj){
			if(pro){
				param+="<"+pro+">"+paramObj[pro]+"</"+pro+">";
			}
		}
		//自动加上rowId
		param+="<rowId>"+rowId+"</rowId>";
		if(typeName != "noRow"){ 
			param+="</row>";
		}
	}
	return param;
}

/**
 * @author xyk
 * 作用，一列中重复的值合并列单元格
 * 要求，该列已排序  order by
 */
function ctl_ColumnMerge(jqGridId,columnName){
	var tds = $("td[aria-describedby='"+jqGridId+"_"+columnName+"']");
	//行数，每行都有这个重复td
	var len = tds.length; 
	var obj = null;
	var rows = 2;
	for(var i= 0;i<len;i++){
		 var o = $(tds[i]);
		 var t = o.html();
		 if(i>0 && t == obj.html()){
			obj.attr('rowspan',rows);
			//隐藏压缩的td
			o.hide();
			rows++;
		 } else {
			obj = o;
			rows = 2;
		 }
	}
}
/**
 * @author xyk
 * 选中下拉默认值，每行的下拉框
 * bool 是否现在是编辑状态  默认编辑状态 null , 'true' 表示非编辑状态
 */
function ctl_selectDefaultValue(jqgridId){
	var colModel = ctl_getGridParam(jqgridId, "colModel");
	if(!(jqgridId && colModel)){
		return;
	}
	var ids = ctl_getAllDataIds(jqgridId);
	for(var i=0;i<ids.length;i++){
		var rowId = ids[i];
		for(var k=0;k<colModel.length;k++){
			var colObj = colModel[k];
			var colName = colObj.name;
			if(colObj.edittype && colObj.edittype == 'select'){
				//获取默认值，就是本来的那个值，后台传过来了, 放在title
				var defaultValue = $($("#"+rowId+"_"+colName).parent("td")).attr('title');
				$("#"+rowId+"_"+colName+" option[value='"+defaultValue+"']:selected");
	        }
		}
	}
}

 
/**
 * @desc  grid 排序，加载完成默认排序
 * @param gridId 表格ID
 */
function sortGrid(gridId){
	$("#"+gridId).jqGrid("sortGrid");
}