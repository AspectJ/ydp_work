function importJsAndCss(arguments) {
	for ( var i = 0; i < arguments.length; i++) {
		var file = arguments[i];
		// js文件
		if (file.match(/.*\.js$/)) {
			document.write('<script type="text/javascript" src="' + file
					+ '"></script>');
		}
		// css文件
		else if (file.match(/.*\.css$/)) {
			document.write('<link rel="stylesheet" href="' + file
					+ '" type="text/css" />');
		}
		// .skins，加载css皮肤 jquery-ui
		else if (file.match(/.*\.skins$/)) {
			document
					.write('<link rel="stylesheet" href="css/skin/redmond/jquery-ui-1.8.22.custom.css" id="cssfile" type="text/css" />');
		}
		// .tabsSkins，加载css皮肤 选项卡皮肤
		else if (file.match(/.*\.tabsSkins$/)) {
			document
					.write('<link rel="stylesheet" href="css/skin/redmond/magicTabs/magicTabs.css" id="csstabs" type="text/css" />');
		}
		// 特殊情况
		else if (file.match(/.*\.lhgdialog$/)) {
			document
					.write('<script type="text/javascript" src="js/plugin/lhgdialog/lhgdialog.js?myself=true&skin=iblue"></script>');
		}
	}
}

/**
 * 特别说明：js包引入顺序如果错乱，将会导致jquery的插件冲突
 */
// 定义框架中的基本js和css库,请特别注意css、js的导入顺序，否则会冲突
var argsAllFiles = new Array(
// 框架通用css
"css/skin/redmond/jquery-ui-1.8.22.custom.css.skins",// jquery-ui
// 特别注意.skins表示皮肤
"css/main/layout-default-latest.css",// 布局css
"css/jqgrid/ui.jqgrid.css",// jqgrid的css
"css/jqgrid/ui.multiselect.css",// jqgrid的多选插件
//"css/skin/redmond/magicTabs/magicTabs.css.tabsSkins",// 选项卡的css
//"css/magicTabs/tabsMenu.css",// 选项卡右击菜单的css
"css/ztree/zTreeStyle/zTreeStyle.css",// 树css
"css/ztree/mainTree.css",// 树css
//"css/yuiValidator/validator.css",// 验证插件css
"css/select/ctl_select.css",// 下拉css
"css/uploadify/uploadify.css",// 上传样式
//"css/jqplot/jquery.jqplot.css",// jqplot的css
"css/galleryview/jquery.galleryview-3.0-dev.css",//轮播控件的css
"css/inputSelect/inputSelect.css",// 可输入下拉的css 
//"css/freeDrag/inettuts.css",// 拖拽控件的css
//"css/freeDrag/inettuts.js.css",// 拖拽控件的css
//"css/jcrop/jquery.Jcrop.min.css",// 截图控件的css

"css/main/query.css",
"css/main/tablediv.css",
"css/main/dialog.css",//弹出层的布局样式
"css/main/dialog.css",//弹出层的布局样式
"css/main/base.css",//新的样式
"css/main/style.css",//新的样式

//"css/main/main.css",// 主页的css
//"css/main/footer.css",// 主页下面部分的css

// 框架必需js和jquery插件
"js/jquery/jquery.min.js",// jquery核心
//"js/plugin/layout/jquery-lastest.js",// 布局js
//"js/plugin/layout/jquery.layout-latest.js",// 布局js
"js/jquery/jquery.cookie.js",// cookie

//"js/plugin/block/jquery.blockUI.js",// blockUI
//"js/plugin/i18n/jquery.i18n.properties-1.0.9.js",// 读取properties文件
"js/public/alert.js",// 公用弹出框

//"js/plugin/magicTabs/magicTabs.js",// 选项卡的js
//"js/plugin/magicTabs/tabsMenu.js",// 选项卡右击菜单的js
"js/plugin/drag/drag.js",//drag.js
"js/plugin/ztree/jquery.ztree.core-3.3.js",// 树js
"js/plugin/ztree/jquery.ztree.excheck-3.3.js",// 树js
"js/plugin/ztree/jquery.ztree.exedit-3.3.js",// 树js
"js/plugin/datePicker/My97DatePicker/WdatePicker.js",// 日期控件js
"js/plugin/uploadify/jquery.uploadify-3.1.min.js",// 文件上传所需的js
"lhgdialogJs.lhgdialog",// 弹窗js 此js文件必须要在jquery-ui-1.8.22.custom.min.js前

"js/jquery/jquery-ui-1.8.22.custom.min.js",// jquery-ui js jqGrid自定义列需要的此js
"js/plugin/jqgrid/grid.locale-cn.js",// jqGrid中文包
"js/plugin/jqgrid/ui.multiselect.js",// jqgrid 相关js
"js/plugin/jqgrid/jquery.jqGrid.src.js",// jqGrid核心包

"js/plugin/tabswitch/jquery.tabswitch.js", // tabswith核心包

//"js/plugin/jqplot/excanvas.js",// jqplot在IE下的必须js
//"js/plugin/jqplot/jquery.jqplot.min.js",// jqplot核心包
//下面是jqplot的插件包
//"js/plugin/jqplot/plugins/jqplot.canvasTextRenderer.min.js",
//"js/plugin/jqplot/plugins/jqplot.dateAxisRenderer.min.js",
//"js/plugin/jqplot/plugins/jqplot.canvasAxisTickRenderer.min.js",
//"js/plugin/jqplot/plugins/jqplot.categoryAxisRenderer.min.js",
//"js/plugin/jqplot/plugins/jqplot.barRenderer.min.js",
//"js/plugin/jqplot/plugins/jqplot.json2.min.js",
//"js/plugin/jqplot/plugins/jqplot.highlighter.min.js",
//"js/plugin/jqplot/plugins/jqplot.cursor.min.js",
//"js/plugin/jqplot/plugins/jqplot.ohlcRenderer.min.js",
//"js/plugin/jqplot/plugins/jqplot.pieRenderer.min.js",
//"js/plugin/jqplot/plugins/jqplot.donutRenderer.min.js",
//"js/plugin/jqplot/plugins/jqplot.pointLabels.min.js",
//"js/plugin/jqplot/plugins/jqplot.bubbleRenderer.min.js",
//"js/plugin/jqplot/plugins/jqplot.canvasAxisLabelRenderer.min.js",

// 进度条progressbar的js
//"js/plugin/progressbar/js/jquery.progressbar.js",

//下面是ckeditor的插件包
"js/plugin/ckeditor/ckeditor.js",
"js/plugin/ckeditor/adapters/jquery.js",

//条形码
//"js/plugin/barcode/jquery-barcode-2.0.2.min.js",

//轮播控件js(插件包)
"js/plugin/galleryview/jquery.easing.1.3.js",
"js/plugin/galleryview/jquery.galleryview-3.0-dev.js",
"js/plugin/galleryview/jquery.timers-1.2.js",

//截图控件js
//"js/plugin/cropzoom/jquery.cropzoom.js",

//验证的js
//"js/plugin/yuiValidator/yui.js",
//"js/plugin/yuiValidator/yui.validator.js",
//"js/plugin/yuiValidator/maxLength.js",

// 自己封装的js
"js/public/ctl_service.js",// 框架通用服务js js常量文件
"js/public/ctl_util.js",// 框架公共功能js
"js/public/ctl_common.js",// 框架通用函数js
"js/public/ctl_grid.js",// 封装jqgrid的js
"js/public/ctl_tree.js",// 封装ztree的js
"js/public/ctl_date.js",// 封装my97的js
"js/public/ctl_inputselect.js",
"js/public/ctl_select.js",// 封装下拉联动的js
"js/public/ctl_dialog.js",// 封装弹窗控件的js
"js/public/ctl_uploadify.js",// 封装上传控件的js
"js/public/ctl_download.js",// 封装下载控件的js
"js/public/ctl_array.js",// 封装的数组操作js
"js/public/ctl_map.js",// 封装的map操作js
"js/public/ctl_tiptool.js",// 替换title的提示工具包
//"js/public/ctl_jqplot.js",// 封装的jqplot的js
"js/public/ctl_ckeditor.js",// 封装的ckeditor的js
//"js/public/ctl_progressbar.js",// 封装的ckeditor的js
//"js/public/ctl_cropZoom.js",//图片缩放工具js
"js/public/ctl_galleryview.js",//图片轮播工具js
//"js/public/ctl_barcode.js",// 封装的条形码的js

//截图控件js
//"js/plugin/jcrop/jquery.Jcrop.min.js",

//"js/public/ctl_freeDrag.js",// 封装拖拽 js
//"js/public/ctl_jcrop.js",// 封装截图 js

"js/public/ctl_dateUtil.js",// 日期工具类 js
"js/public/ctl_uuid.js",// uuid工具类js

"js/public/json2.js"

);

// 初始化加载js和css
importJsAndCss(argsAllFiles);