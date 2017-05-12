function ctl_initTree(setting, treeNode) {
	var settingObj = {
		view : {
			showLine : setting.showLine,
			showIcon : setting.showIcon,
			showTitle : setting.showTitle,
			selectedMulti : setting.selectedMulti,
			fontCss : setting.fontCss, // 内部样式由自己设定fontCss:{color:'red',background:'green'...}
			nameIsHTML : setting.nameIsHTML,
			expandSpeed : setting.expandSpeed, // ("slow","normal","fast")
			dblClickExpand : setting.dblClickExpand,
			autoCancelSelected : setting.autoCancelSelected,
			addDiyDom: setting.addDiyDom, 	//默认值：null，此属性需要调用自身函数
			addHoverDom : setting.addHoverDom,
			removeHoverDom : setting.removeHoverDom
		},
		async : {
			enable : setting.asyncEnable,
			url : setting.asyncUrl,
			type : setting.asyncType,		//Ajax 的 http 请求模式(post/get)
			autoParam : setting.autoParam,	//异步加载时需要自动提交父节点属性的参数
			contentType : setting.contentType,	//默认值："application/x-www-form-urlencoded" 可以满足绝大部分请求，按照标准的 Form 格式提交参数
			dataFilter : setting.dataFilter,	//用于对 Ajax 返回数据进行预处理的函数,默认值：null
			dataType : setting.dataType,		//Ajax 获取的数据类型(json/xml/text)
			otherParam : setting.otherParam	//Ajax 请求提交的静态参数键值对,	Array(String)格式：可以为空[ ],如果有 key，则必须存在 value。 例如：[key, value]; JSON格式：例如：{ key1:value1, key2:value2 }
			},
		data : {
			simpleData : {
				enable : setting.simpleEnable,
				idKey : setting.simpleId,
				pIdKey : setting.simplePid,
				rootPId : null
			},
			keep : {
				leaf : setting.keepLeaf,
				parent : setting.keepParent
			},
			key : {
				checked : setting.keyChecked,
				children : setting.keyChildren,
				name : setting.keyName,
				title : setting.keyTitle,
				url : setting.keyUrl
			}
		},
		check : {
			enable : setting.checkEnable,
			autoCheckTrigger : setting.autoCheckTrigger,
			chkboxType : {"Y" : setting.chkboxTypeY,"N" : setting.chkboxTypeN},
			chkStyle : setting.chkStyle,
			nocheckInherit : setting.nocheckInherit,
			radioType : setting.radioType
		},
		edit : {
			drag : {
				autoExpandTrigger : setting.autoExpandTrigger,
				isCopy : setting.dragIsCopy,
				isMove : setting.dragIsMove,
				prev : setting.dragPrev,
				next : setting.dragNext,
				inner : setting.dragInner
			},
			enable : setting.editEnable,
			editNameSelectAll : setting.editNameSelectAll,
			removeTitle : setting.removeTitle,
			renameTitle : setting.renameTitle,
			showRemoveBtn : setting.showRemoveBtn,
			showRenameBtn : setting.showRenameBtn
		},
		callback : {
			beforeAsync : setting.beforeAsync,
			beforeCheck : setting.beforeCheck,
			beforeClick : setting.beforeClick,
			beforeCollapse : setting.beforeCollapse,
			beforeDblClick : setting.beforeDblClick,
			beforeDrag : setting.beforeDrag, 
			beforeDragOpen : setting.beforeDragOpen,
			beforeDrop : setting.beforeDrop,
			beforeEditName : setting.beforeEditName,
			beforeExpand : setting.beforeExpand,
			beforeMouseDown : setting.beforeMouseDown,
			beforeMouseUp : setting.beforeMouseUp,
			beforeRemove : setting.beforeRemove, 
			beforeRename : setting.beforeRename, 
			onAsyncError : setting.onAsyncError,
			onAsyncSuccess : setting.onAsyncSuccess,
			onCheck : setting.onCheck,
			onClick : setting.onClick,
			onCollapse : setting.onCollapse,
			onDblClick : setting.onDblClick,
			onDrag : setting.onDrag,
			onDrop : setting.onDrop,
			onExpand : setting.onExpand,
			onMouseDown : setting.onMouseDown,
			onMouseUp : setting.onMouseUp,
			onNodeCreated : setting.onNodeCreated,
			onRemove : setting.onRemove,
			onRename : setting.onRename,
			onRightClick : setting.onRightClick
		}
	};

	var zTreeObj = $.fn.zTree.init($("#" + setting.treeId), settingObj, treeNode);
	return zTreeObj;
}

/**显示树 
*treeInputId:树的输入框,即样式为dropdownTree-select的DIV;
*treeDiv:
*contain:树不在弹出层层时,contain不用传参，不传或为空(默认取框架容器的DIV ID centerDivId),在弹出层层时为弹出层容器对象
**/
function ctl_showTree(treeInputId,treeDiv,contain){
	var treeInput = $("#"+treeInputId);
	var objOffset = $("#"+treeInputId).offset();
	var minusleft = 0;
	var minustop = 0;
	if(null != contain && contain != ''){
		var wrap = contain.DOM.wrap;
		minusleft = parseInt(wrap[0].style.left);
		minustop = parseInt(wrap[0].style.top);
	}else{
		minusleft = $("#" + centerDivId).position().left;
		minustop = $("#" + centerDivId).position().top;
	}
	
	$("#"+treeDiv).css({
		left : objOffset.left - minusleft + "px",
		top : objOffset.top + treeInput.outerHeight()- minustop + "px"}).slideDown("fast");
	
	$("body").bind("mousedown",function(event){
		if (!(event.target.id == treeInputId|| event.target.id == treeDiv 
			|| $(event.target).parents("#"+treeDiv).length > 0)) {
			ctl_hideTree(treeDiv);
		}
	});
}

//隐藏数
function ctl_hideTree(treeDivId){
	$("#"+treeDivId).hide("fast");
}

//treeInputId:样式dropdownTree-select对应的DIV ID;treeDiv:样式为display:none的DIV层的ID


//树的前台的查询
//treeObj:树对象；setting：查询项配置；value：查询提交的值
//树的查询配置 setting中加入如下几个属性，其他属性同init
//setting.searchName:'',//针对查询的属性名
//setting.searchType:'',//1:模糊查询 2:精确查询,默认为1走模糊查询
//setting.withParent:true,//是否带出子节点的父节点
function ctl_searchLocalTree(treeObj,setting,value){
	var nodes;
	if(setting.searchType == '2'){
		nodes = treeObj.getNodesByParam(setting.searchName,value,null);
	}else{
		nodes = treeObj.getNodesByParamFuzzy(setting.searchName,value,null);
	}
	var newNodes = [];
	for(var i = 0;i<nodes.length;i++){
		var node = nodes[i];
		ctl_removeChildNodes(treeObj,node);
		ctl_arrayAdd(newNodes,node);
		if(setting.withParent){
			while(node && ctl_getLevel(node)>0){
				node = node.getParentNode();
			}
			ctl_removeChildNodes(treeObj,node);
			ctl_arrayAdd(newNodes,node);
		}
	}
	return ctl_initTree(setting,newNodes);
}

function ctl_selectLocalTree(treeObj,setting,value){
	var nodes = treeObj.getNodesByParamFuzzy(setting.searchName,'',null);
	var newNodes = [];
	for(var i = 0;i<nodes.length;i++){
		var node = nodes[i];
		if(value==1){
			if(node.name.indexOf('blue')!=-1){
				ctl_removeChildNodes(treeObj,node);
				ctl_arrayAdd(newNodes,node);
			}
		}else if(value==2){
			if(node.name.indexOf('block')!=-1){
				ctl_removeChildNodes(treeObj,node);
				ctl_arrayAdd(newNodes,node);
			}
		}else if(value==3){
			if(node.name.indexOf('green')!=-1){
				ctl_removeChildNodes(treeObj,node);
				ctl_arrayAdd(newNodes,node);
			}
		}else if(value==4){
			if(node.name.indexOf('red')!=-1){
				ctl_removeChildNodes(treeObj,node);
				ctl_arrayAdd(newNodes,node);
			}
		}
	}
	return ctl_initTree(setting,newNodes);
}

function ctl_getZTreeObj(treeId) { //根据treeId获取ztree对象
	var treeObj = $.fn.zTree.getZTreeObj(treeId);
	return treeObj;
}

//获得节点的层级
function ctl_getLevel(node){
	return node.level;
}

function ctl_addNodes(treeObj, parentNode, newNode, isSilent){	//添加节点
	 return  treeObj.addNodes(parentNode,newNode,isSilent);	//指定的父节点，如果增加根节点，请设置 parentNode 为 null 即可,newNodes为需要增加的节点数据 JSON 对象集合
}

function ctl_cancelEditName(treeObj,newName){ //取消节点的编辑名称状态，可以恢复原名称，也可以强行赋给新的名称。
	treeObj.cancelEditName(newName); //newName为强行赋给的新名称的参数,如果不赋值则为空
}

function ctl_cancelSelectedNode(treeObj,node){ //取消节点的选中状态
	treeObj.cancelSelectedNode(node); //如果node为空则表示取消当前所有被选中节点的选中状态
}

function ctl_checkAllNodes(treeObj, checked){ // 勾选 或 取消勾选 全部节点。[setting.check.enable = true 且 setting.check.chkStyle = "checkbox" 时有效]
	treeObj.checkAllNodes(checked); //checked = true 表示勾选全部节点,false表示全部节点取消勾选
}

function ctl_checkNode(treeObj,node, checked, checkTypeFlag, callbackFlag){//勾选 或 取消勾选 单个节点
		treeObj.checkNode(node,checked,checkTypeFlag,callbackFlag);	  //checked = true 表示勾选节点,false表示节点取消勾选;checkTypeFlag = true 表示父子节点勾选关联，false表示无关联操作。
																	  //callbackFlag = true 表示执行此方法时触发 beforeCheck & onCheck 事件回调函数,false不触发
}

function ctl_getSelectedNodes(treeObj){ //获取 zTree 当前被选中的节点全部数据
	return treeObj.getSelectedNodes();
}

function ctl_getNodes(treeObj){ //获取 zTree 根节点全部数据
	return treeObj.getNodes();
}

function ctl_getCheckStatus(node){	//获取节点 checkbox / radio 半勾选状态
	return node.getCheckStatus();
}

function ctl_getNextNode(node){	//获取与 treeNode 节点相邻的后一个节点
	return node.getNextNode();
}

function ctl_getPreNode(node){	//获取与 treeNode 节点相邻的前一个节点
		return node.getPreNode();
}

function ctl_getParentNode(node){		//获取 treeNode 节点的父节点
		return node.getParentNode();	//nodes为选中的节点数据
}

function ctl_copyNode(treeObj, targetNode, node, moveType, isSilent){ //复制节点
	return treeObj.copyNode(targetNode, node, moveType);	//targetNode为要复制到目标节点的JSON数据,node为被复制的节点的JSON数据,moveType为复制到目标节点的相对位置（"inner"：成为子节点，"prev"：成为同级前一个节点，"next"：成为同级后一个节点）。
}															//isSilent为设定复制节点后是否自动展开父节点,isSilent = true 时,不展开父节点,其他值或缺省状态都自动展开

function ctl_editName(treeObj, node){ //设置某节点进入编辑状态，node为选中的节点，treeObj为ztree对象
	treeObj.editName(node);
}

function ctl_expandAll(treeObj, expandFlag){	//展开 或  折叠 全部节点
	return treeObj.expandAll(expandFlag); //expandFlag为true表示展开全部节点,false表示折叠据全部节点。
}

function ctl_expandNode(treeObj, node, expandFlag, sonSign, focus, callbackFlag){	//展开 / 折叠 指定的节点
	return treeObj.expandNode(node, expandFlag, sonSign, focus, callbackFlag);	//expandFlag = true 表示 展开 节点,false表示折叠节点
																			//sonSign = true 表示 全部子节点 进行与 expandFlag 相同的操作,sonSign = false 表示 只影响此节点，对于其 子节点无任何影响,省略此参数等同于false
																			//focus = true 表示 展开 / 折叠 操作后，通过设置焦点保证此焦点进入可视区域内,focus = false 表示 展开 / 折叠 操作后,不设置任何焦点,省略此参数等同于 true
																			//callbackFlag = true 表示执行此方法时触发某事件回调函数,false则不触发,省略此参数等同于 false
}

function ctl_getChangeCheckedNodes(treeObj){	//获取输入框勾选状态被改变的节点集合 [setting.check.enable = true 时有效]
	return treeObj.getChangeCheckedNodes();
}

function ctl_getCheckedNodes(treeObj, checked){	 //获取输入框被勾选 或 未勾选的节点集合 [setting.check.enable = true 时有效]
	return treeObj.getCheckedNodes(checked);	//checked = true 表示获取 被勾选 的节点集合,false 表示获取 未勾选 的节点集合
}

function ctl_getNodeByParam(treeObj, key, value, parentNode){	//根据节点数据的属性搜索，获取条件完全匹配的节点数据 JSON 对象
	return treeObj.getNodeByParam(key, value, parentNode); 		//key为需要精确匹配的属性名称("id","pid","name"),value为需要精确匹配的属性值，可以是任何类型，只要保证与 key 指定的属性值保持一致即可
																//parentNode为搜索范围，指定在某个父节点下的子节点中进行搜索,忽略此参数表示在全部节点中搜索
}

function ctl_getNodeByTId(treeObj, tId){	//根据 zTree 的唯一标识 tId 快速获取节点 JSON 数据对象
	return treeObj.getNodeByTId(tId);	//tId为节点在 zTree 内的唯一标识 tId
}

function ctl_getNodeIndex(treeObj, node){	//获取某节点在同级节点中的序号（从0开始）
	return treeObj.getNodeIndex(node);		//如果不存在该节点数据，返回 -1
}


function ctl_getNodesByFilter(treeObj,  filter, isSingle, parentNode, invokeParam){	//根据自定义规则搜索节点数据 JSON 对象集合 或 单个节点数据
	return treeObj.getNodesByFilter(filter, isSingle);	//filter 自定义过滤器函数
														//isSingle = true 表示只查找单个节点, false 表示查找节点集合,忽略此参数同等于false
}														//parentNode 可以指定在某个父节点下的子节点中搜索,忽略此参数，表示在全部节点中搜索

function ctl_getNodesByParam(treeObj, key, value, parentNode){	//根据节点数据的属性搜索，获取条件完全匹配的节点数据 JSON 对象集合
	return treeObj.getNodesByParam(key, value, parentNode);
}

function ctl_getNodesByParamFuzzy(treeObj, key, value, parentNode){	 //根据节点数据的属性搜索，获取条件  模糊    匹配的节点数据 JSON 对象集合
	return treeObj.getNodesByParam(key, value, parentNode);
}

function ctl_moveNode(treeObj, targetNode, node, moveType, isSilent){	//移动节点
	return treeObj.moveNode(targetNode, nodes, moveType, isSilent);
}

function ctl_reAsyncChildNodes(treeObj, parentNode, reloadType, isSilent){	//强行异步加载父节点的子节点。[setting.async.enable = true 时有效]
	treeObj.reAsyncChildNodes(parentNode, reloadType);//parentNode为异步加载的父节点的JSON 数据,为null 时相当于从根节点 Root 进行异步加载
													  //reloadType = "refresh" 表示清空后重新加载; != "refresh" 时，表示追加子节点处理。
}


function ctl_refresh(treeObj){	//刷新 zTree
	treeObj.refresh();
}

function ctl_removeChildNodes(treeObj, parentNode){	//清空父节点的子节点
	return treeObj.removeChildNodes(parentNode);
}

function ctl_removeNode(treeObj, node, callbackFlag){	//删除节点
	treeObj.removeNode(node);	//callbackFlag = true 表示执行此方法时触发 beforeRemove  & onRemove  事件回调函数,false则不触发回调函数
}

function ctl_selectNode(treeObj, node, addFlag) {	//选中指定节点
	treeObj.selectNode(node);	//addFlag = true 表示追加选中，会出现多点同时被选中的情况,false 表示单独选中，原先被选中的节点会被取消选中状态,setting.view.selectedMulti = false 时此参数无效,始终进行单独选中
}

//选中符合条件的第一个节点,并返回选中的节点对象treeObj:树对象,key:节点的key值，可以是id,name,pId，value：key对应的值
function ctl_selectFirstNode(treeObj,key,value){
	var obj = ctl_getNodesByParam(treeObj,key,value);
	var node = obj[0];
	ctl_selectNode(treeObj,node,true);
	return node;
}

function ctl_setChkDisabled(treeObj, node, disabled){	//禁用 或 解禁 某个节点的 checkbox / radio [setting.check.enable = true 时有效]
	treeObj.setChkDisabled(node, disabled);	//disabled = true 表示禁用 checkbox / radio(禁用根节点时子节点也会被禁用),false 表示解禁 checkbox / radio,省略此参数，等同于 disabled = false
}

function ctl_setEditable(treeObj, editable){	//设置 zTree 进入 / 取消 编辑状态。
	treeObj.setEditable(editable);	//editable = true 表示进入 编辑状态,false 表示取消 编辑状态
}

function ctl_transformToArray(treeObj, nodes){	//将 zTree 使用的标准 JSON 嵌套格式的数据转换为简单 Array 格式
	return treeObj.transformToArray(nodes);		//nodes为zTree 节点数据对象集合 或 某个单独节点的数据对象
}

function ctl_transformTozTreeNodes(treeObj, impleNodes){	//将简单 Array 格式数据转换为 zTree 使用的标准 JSON 嵌套数据格式。
	return treeObj.transformTozTreeNodes(simpleNodes);		//需要被转换的简单 Array 格式数据 或 某个单独的数据对象
}

function ctl_updateNode(treeObj, node, checkTypeFlag){	//更新某节点数据，主要用于该节点显示属性的更新。
	treeObj.updateNode(node);
}

function ctl_hideNode(treeObj, node){	//隐藏某个节点
	treeObj.hideNode(node);
}

function ctl_hideNodes(treeObj, nodes){	//隐藏一批节点
	treeObj.hideNode(nodes);
}

function ctl_showNode(treeObj, node){	//显示某个被隐藏的节点
	treeObj.showNode(node);
}

function ctl_showNodes(treeObj, nodes){	//显示一批已经被隐藏的节点
	treeObj.showNodes(nodes);
}
/**
 * 返回是否节点对象是否为父节点  父节点返回true 否则 false
 * @param nodeObj 节点对象
 * @returns
 */
function ctl_isParent(node){
	return node.isParent;
}

