/**
 * 拖拽控件
 * 
 * 具体用法见dragOption0的参数配置 inputId:'',//文本框id serviceId:'',//服务id
 * paramName:'',//输入框的值用于查询的列的名称，用于后台服务获取参数值的节点名称
 * otherParam:{},//其他参数,支持多个参数，如果某参数是要动态获取的则以#加输入框的ID，格式为:{classId:'88','className':'#classNameInputId'}
 * labelName:[],//用于取显示值的属性名称,此处为字符串或者数组（如果要显示多个属性的话，放到数组里面）
 * bindValChangeParam:{},//值改变事件绑定参数 valChanged:function(){}//值改变回调
 * 
 * @auther admin
 */
var dragOption0 = {
	dragContainerObj : [],// 文本框Obj
	dragableItemObj : [],// 服务Obj
	dragHandleObj : [],// 弹出层的dialogObj
	dragContentObj : [],// 是否将选择的值赋值给输入框,默认会进行赋值(不输入该参数或指定为true)，指定为false则不会进行赋值
	startCallBack : null,// sortablestart，当开始排序时触发
	sortCallBack : null,// sortablesort，当排序期间触发
	changeCallBack : null,// sortablechange，当元素位置发生改变时触发
	beforeStopCallBack : null,// sortbeforestop，当停止排序，但辅助元素仍可用
	stopCallBack : null,// sortstop，当排序停止时触发
	updateCallBack : null,// sortupdate，当停止排序，且元素位置发生变化时触发
	receiveCallBack : null,// sortreceive，当连接的列表从另个列表接受条目时触发
	removeCallBack : null,// sortremove，当从列表中拖出条目，并放置到另个列表时触发
	overCallBack : null// 当条目被移除列表时触发
};

var containerCss = 'dragableContainer';
var dragableItemCss = 'dragableWidget';
var dragHandleCss = 'dragableWidget-head';
var dragContentCss = 'dragableWidget-content';

function ctl_freeDrag(option) {

	// 给定默认值
	var dragContainerObj = option.dragContainerObj;
	var dragableItemObj = option.dragableItemObj;
	var dragHandleObj = option.dragHandleObj;
	var dragContentObj = option.dragContentObj;

	try {

		for ( var i = 0; i < dragContainerObj.length; i++) {
			var obj = dragContainerObj[i];
			if ((typeof obj) == 'string') {
				$("#" + obj).addClass(containerCss);
			} else {
				$(obj).addClass(containerCss);
			}

		}
		for ( var i = 0; i < dragableItemObj.length; i++) {
			var obj = dragableItemObj[i];
			if ((typeof obj) == 'string') {
				$("#" + obj).addClass(dragableItemCss);
			} else {
				$(obj).addClass(dragableItemCss);
			}
		}

		for ( var i = 0; i < dragHandleObj.length; i++) {
			var obj = dragHandleObj[i];
			if ((typeof obj) == 'string') {
				$("#" + obj).addClass(dragHandleCss);
			} else {
				$(obj).addClass(dragHandleCss);
			}
		}

		for ( var i = 0; i < dragContentObj.length; i++) {
			var obj = dragContentObj[i];
			if ((typeof obj) == 'string') {
				$("#" + obj).addClass(dragContentCss);
			} else {
				$(obj).addClass(dragContentCss);
			}
		}

		initFreeDrag(option);

	} catch (e) {
		alert(e.toLocaleString());
	}
}