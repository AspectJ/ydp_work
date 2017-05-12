// JavaScript Document

/**
 * API说明
 */
// title: '', //设置当前图的标题
// title:{
// text: '', //设置当前图的标题
// show: true,//设置当前图的标题是否显示
// },
// axesDefaults:{
// show: false, //是否自动显示坐标轴。
// min: null, //横(纵)轴最小刻度值
// max: null, //横(纵)轴最大刻度值
// pad: 1.2, //横(纵)轴度值增涨因子
// ticks: [], //设置横（纵）坐标的刻度上的值，可为该ticks数组中的值
// numberTicks:
// undefined,//一个相除因子，用于设置横（纵）坐标刻度间隔，横（纵）坐标刻度间隔值=横（纵）坐标区间长度/(numberTicks-1)
// renderer: $.jqplot.LinearAxisRenderer, // 设置横（纵）轴上数据加载的渲染器
// rendererOptions: {}, // 设置renderer的Option配置对象，线状图不需要设置
// tickOptions: {
// mark: 'outside', // 设置刻度在坐标轴上的显示方式：分为:坐标轴外显示，内显示，和穿过显示;其值分别为 'outside',
// 'inside' or 'cross'。
// showMark: true, //设置是否显示刻度
// showGridline: true, // 是否在图表区域显示刻度值方向的网格
// markSize: 4, // 每个刻度线顶点距刻度线在坐标轴上点距离（像素为单位)如果mark值为 'cross',
// 那么每个刻度线都有上顶点和下顶点，刻度线与坐标轴在刻度线中间交叉，那么这时这个距离×2
// show: true, //是否显示刻度线，与刻度线同方向的网格线，以及坐标轴上的刻度值
// showLabel: true, //是否显示刻度线以及坐标轴上的刻度值
// formatString: '', //设置坐标轴上刻度值显示格式，eg:'%b %#d, %Y'表示格式"月 日，年"，"AUG 30,2008"
// fontSize:'10px', //刻度值的字体大小
// fontFamily:'Tahoma', //刻度值上字体
// angle:40, //刻度值与坐标轴夹角，角度为坐标轴正向顺时针方向
// fontWeight:'normal', //字体的粗细
// fontStretch:1//刻度值在所在方向（坐标轴外）上的伸展(拉伸)度
// }
// showTicks: true, //是否显示刻度线以及坐标轴上的刻度值,
// showTickMarks: true, // 设置是否显示刻度
// useSeriesColor: true //如果有多个纵（横）坐标轴，通过该属性设置这些坐标轴是否以不同颜色显示
// },
// axes: {
// xaxis: {
// // same options as axesDefaults
// },
// yaxis: {
// // same options as axesDefaults
// },
// x2axis: {
// // same options as axesDefaults
// },
// y2axis: {
// // same options as axesDefaults
// }
// },
// seriesDefaults: {//如果有多个分类，这可通过该配置属性设置各个分类的共性属性
// show: true, //设置是否渲染整个图表区域（即显示图表中内容）.
// xaxis: 'xaxis', // either 'xaxis' or 'x2axis'.
// yaxis: 'yaxis', // either 'yaxis' or 'y2axis'.
// label: '', // 用于显示在分类名称框中的分类名称.
// color: '', // 分类在图标中表示（折现，柱状图等）的颜色.
// lineWidth: 2.5, // 分类图（特别是折线图）哪宽度.
// shadow: true, // 各图在图表中是否显示阴影区域.
// shadowAngle: 45, //参考grid中相同参数.
// shadowOffset: 1.25, //参考grid中相同参数.
// shadowDepth: 3, //参考grid中相同参数.
// shadowAlpha: 0.1, // Opacity of the shadow.
// showLine: true, //是否显示图表中的折线（折线图中的折线）
// showMarker: true, // 是否强调显示图中的数据节点
// fill: false, // 是否填充图表中折线下面的区域（填充颜色同折线颜色）以及legend
// //设置的分类名称框中分类的颜色，此处注意的是如果fill为true，
// //那么showLine必须为true，否则不会显示效果
// fillAndStroke: false, //在fill为true的状态下，在填充区域最上面显示一条线（如果是折线图则显示该折线）
// fillColor: undefined, // 设置填充区域的颜色
// fillAlpha: undefined, // 梃置填充区域的透明度
// renderer: $.jqplot.PieRenderer, // 利用渲染器（这里是利用饼图PieRenderer）渲染现有图表
// //，从而转换成所需图表
// rendererOptions: {}, // 传给上个属性所设置渲染器的option对象，线状图的渲染器没有option对象，
// //不同图表的Option配置对象请参见下面《jqPlot各个不同插件的Option对象设置》
// //中各个图表的配置Option对象
// markerRenderer: $.jqplot.MarkerRenderer, // renderer to use to draw the data
// // point markers.
// markerOptions: {
// show: true, // 是否在图中显示数据点
// style: 'filledCircle', // 各个数据点在图中显示的方式，默认是"filledCircle"(实心圆点),
// //其他几种方式circle，diamond, square, filledCircle，
// // filledDiamond or filledSquare.
// lineWidth: 2, // 数据点各个的边的宽度（如果设置过大，各个边会重复，会显示的类似于实心点）
// size: 9, // 数据点的大小
// color: '#666666' // 数据点的颜色
// shadow: true, // 是否为数据点显示阴影区（增加立体效果）
// shadowAngle: 45, // 阴影区角度，x轴顺时针方向
// shadowOffset: 1, // 参考grid中相同参数
// shadowDepth: 3, //参考grid中相同参数
// shadowAlpha: 0.07 // 参考grid中相同参数
// }
// isDragable: true,//是否允许拖动（如果dragable包已引入）,默认可拖动
// },
// series:[
// //如果有多个分类需要显示，这在此处设置各个分类的相关配置属性
// //eg.设置各个分类在分类名称框中的分类名称
// //[label: 'Traps Division'},{label: 'Decoy Division'},{label: 'Harmony
// Division'}]//配置参数设置同seriesDefaults
// ],
// legend: {
// show: false,//设置是否出现分类名称框（即所有分类的名称出现在图的某个位置）
// location: 'ne', // 分类名称框出现位置, nw, n, ne, e, se, s, sw, w.
// xoffset: 12, // 分类名称框距图表区域上边框的距离（单位px）
// yoffset: 12, // 分类名称框距图表区域左边框的距离(单位px)
// background:'' //分类名称框距图表区域背景色
// textColor:'' //分类名称框距图表区域内字体颜色
// },
// grid: {
// drawGridLines: true, // wether to draw lines across the grid or not.
// gridLineColor: '#cccccc' // 设置整个图标区域网格背景线的颜色
// background: '#fffdf6', // 设置整个图表区域的背景色
// borderColor: '#999999', // 设置图表的(最外侧)边框的颜色
// borderWidth: 2.0, //设置图表的（最外侧）边框宽度
// shadow: true, // 为整个图标（最外侧）边框设置阴影，以突出其立体效果
// shadowAngle: 45, // 设置阴影区域的角度，从x轴顺时针方向旋转
// shadowOffset: 1.5, // 设置阴影区域偏移出图片边框的距离
// shadowWidth: 3, // 设置阴影区域的宽度
// shadowDepth: 3, // 设置影音区域重叠阴影的数量
// shadowAlpha: 0.07 // 设置阴影区域的透明度
// renderer: $.jqplot.CanvasGridRenderer, // renderer to use to draw the grid.
// rendererOptions: {} // options to pass to the renderer. Note, the default
// // CanvasGridRenderer takes no additional options.
// },
// //jqPlot各个不同插件的Option对象设置
// // BarRenderer（设置柱状图的Option对象）
// //该Option对象适用与柱状图的series和seriesDefault属性的相关配置对象设置
// seriesDefaults: {
// rendererOptions: {
// barPadding: 8, //设置同一分类两个柱状条之间的距离（px）
// barMargin: 10, //设置不同分类的两个柱状条之间的距离（px）（同一个横坐标表点上）
// barDirection: 'vertical', //设置柱状图显示的方向：垂直显示和水平显示
// //，默认垂直显示 vertical or horizontal.
// barWidth: null, // 设置柱状图中每个柱状条的宽度
// shadowOffset: 2, // 同grid相同属性设置
// shadowDepth: 5, // 同grid相同属性设置
// shadowAlpha: 0.8, // 同grid相同属性设置
// }
// },
// // Cursor(光标)
// // 鼠标移动到图中时，鼠标在图中显示形式，常与和高亮功能同时使用
// //此外，通过设置该属性的zoom相关属性来对图中某个区域钻取（就选定区域放大）
// //该配置对象直接在option下配置
// cursor: {
// style: 'crosshair', //当鼠标移动到图片上时，鼠标的显示样式，该属性值为css类
// show: true, //是否显示光标
// showTooltip: true, // 是否显示提示信息栏
// followMouse: false, //光标的提示信息栏是否随光标（鼠标）一起移动
// tooltipLocation: 'se', // 光标提示信息栏的位置设置。如果followMouse=true,那么该位置为
// //提示信息栏相对于光标的位置。否则，为光标提示信息栏在图标中的位置
// // 该属性可选值： n, ne, e, se, etc.
// tooltipOffset: 6, //提示信息栏距鼠标(followMouse=true)或坐标轴（followMouse=false）的位置
// showTooltipGridPosition: false,//是否在信息提示栏中显示光标位置（取其据图标左和上边缘线像素距离）
// showTooltipUnitPosition: true,// 是否显示提示光标所在位置（取其在横纵轴上数据值）的信息栏
// //注：注意此处与showTooltipGridPosition值区别，前者显示坐标值，该处显示的是数据值
// tooltipFormatString: '%.4P', // 同Highlighter的tooltipFormatString
// useAxesFormatters: true, // 同Highlighter的tooltipFormatString
// tooltipAxesGroups: [], // show only specified axes groups in tooltip. Would
// specify like:
// // [['xaxis', 'yaxis'], ['xaxis', 'y2axis']]. By default, all axes
// // combinations with for the series in the plot are shown.
// },
// // Dragable（拖动）
// //该配置对象通过seriesDefaults和series配置对象进行配置
// seriesDefaults: {
// dragable: {
// color: undefined, // 当拖动数据点是，拖动线与拖动数据点颜色
// constrainTo: 'none', //设置拖动的的范围: 'x'（只能在横向上拖动）,
// // 'y'（只能在纵向上拖动）, or 'none'（无限制）.
// },
// },
// // Highlighter（高亮）
// //设置高亮动作option属性对象
// //鼠标移动到某个数据点上时，该数据点增大并显示提示信息框
// //该配置对象直接在option下配置
// highlighter: {
// lineWidthAdjust: 2.5, //当鼠标移动到放大的数据点上时，设置增大的数据点的宽度
// // 目前仅适用于非实心数据点
// sizeAdjust: 5, // 当鼠标移动到数据点上时，数据点扩大的增量增量
// showTooltip: true, // 是否显示提示信息栏
// tooltipLocation: 'nw', // 提示信息显示位置（英文方向的首写字母）: n, ne, e, se, s, sw, w, nw.
// fadeTooltip: true, // 设置提示信息栏出现和消失的方式（是否淡入淡出）
// tooltipFadeSpeed: "fast"//设置提示信息栏淡入淡出的速度： slow, def, fast, 或者是一个毫秒数的值.
// tooltipOffset: 2, // 提示信息栏据被高亮显示的数据点的偏移位置，以像素计。
// tooltipAxes: 'both', // 提示信息框显示数据点那个坐标轴上的值，目前有横/纵/横纵三种方式。
// //值分别为 x, y or xy.
// tooltipSeparator: ', ' // 提示信息栏不同值之间的间隔符号
// useAxesFormatters: true // 提示信息框中数据显示的格式是否和该数据在坐标轴上显示格式一致
// tooltipFormatString: '%.5P' // 用于设置提示信息框中数据显示的格式，前提条件是useAxesFormatters
// // 为false. 此时信息提示框中数据格式不再与坐标轴一致，而是以此为准
// //同时，该属性还支持html格式字符串
// //eg:'<b><i><span style="color:red;"
// mce_style="color:red;">hello</span></i></b> %.2f'
// },
// // LogAxisRenderer(指数渲染器)
// // 该渲染器只有两个属性， 指数渲染器通过axesDefaults和axes配置对象进行配置
// axesDefaults: {
// base: 10, // 指数的底数
// tickDistribution: 'even', // 坐标轴显示方式：'even' or 'power'. 'even' 产生的是均匀分布于坐标
// //轴上的坐标刻度值 。而'power' 则是根据不断增大的增数来确定坐标轴上的刻度
// },
// // PieRenderer(设置饼状图的OPtion对象)
// // 饼状图通过seriesDefaults和series配置对象进行配置
// seriesDefaults: {
// rendererOptions: {
// diameter: undefined, // 设置饼的直径
// padding: 20, // 饼距离其分类名称框或者图表边框的距离，变相该表饼的直径
// sliceMargin: 20, // 饼的每个部分之间的距离
// fill:true, // 设置饼的每部分被填充的状态
// shadow:true, //为饼的每个部分的边框设置阴影，以突出其立体效果
// shadowOffset: 2, //设置阴影区域偏移出饼的每部分边框的距离
// shadowDepth: 5, // 设置阴影区域的深度
// shadowAlpha: 0.07 // 设置阴影区域的透明度
// }
// },
// //pointLabels(数据点标签)
// //用于在数据点所在位置显示相关信息（非提示框性质）
// seriesDefaults: {
// pointLabels: {
// location:'s',//数据标签显示在数据点附近的方位
// ypadding:2 //数据标签距数据点在纵轴方向上的距离
// }
// }
// // Trendline（趋势线）
// // 饼状图通过seriesDefaults和series配置对象进行配置
// seriesDefaults: {
// trendline: {
// show: true, // 是否显示趋势线
// color: '#666666', // 趋势线颜色
// label: '', // 趋势线名称
// type: 'linear', //趋势线类型'linear'（直线）, 'exponential'（幂值数线） or 'exp'
// shadow: true, // 同grid相同属性设置
// lineWidth: 1.5, // 趋势线宽度
// shadowAngle: 45, // 同grid相同属性设置
// shadowOffset: 1.5, // 同grid相同属性设置
// shadowDepth: 3, // 同grid相同属性设置
// shadowAlpha: 0.07 // 同grid相同属性设置
// }
// }
// }
// 色系
var sColors = [ "#3780E7", "#FF9900", "#D7380A", "#A7D00B", "#FFCC00",
		"#651DF8", "#6AEEFD", "#7EF408", "#FD5D7D", "#969614", "#8AEEFD",
		"#ff5800", "#0085cc" ];
var grids = {
	drawGridLines : true, // wether to draw lines across the grid or not.
	// gridLineColor: 'red', // 设置整个图标区域网格背景线的颜色
	background : 'white', // 设置整个图表区域的背景色
	borderColor : '#AEC5E7', // 设置图表的(最外侧)边框的颜色
	borderWidth : 2.0, // 设置图表的（最外侧）边框宽度
	shadow : true, // 为整个图标（最外侧）边框设置阴影，以突出其立体效果
	shadowAngle : 45, // 设置阴影区域的角度，从x轴顺时针方向旋转
	shadowOffset : 1.5, // 设置阴影区域偏移出图片边框的距离
	shadowWidth : 3, // 设置阴影区域的宽度
	shadowDepth : 3, // 设置影音区域重叠阴影的数量
	shadowAlpha : 0.07
// 设置阴影区域的透明度
};

var titleColor = "blue";
var txtColor = '#003366'; // x y 轴颜色

var pieType = "pie";
var lineType = "line";
var barType = "bar";

function ctl_showFigure(dataModel) {

	var plot = null;

	if (dataModel.id == null || dataModel.id == '') {
		ctl_showMessage("请给jqplot表格配置id参数！");
		return null;
	}
	if (dataModel.type == null || dataModel.type == '') {
		ctl_showMessage("请给jqplot表格配置type参数！");
		return null;
	}

	var type = dataModel.type;
	if (type == lineType)
		plot = showLine(dataModel);
	else if (type == barType)
		plot = showBar(dataModel);
	else if (type = pieType)
		plot = showPie(dataModel);

	/**
	 * 绑定事件
	 * 
	 * jqplotMouseMove,鼠标移动事件 jqplotMouseDown,鼠标按下事件 jqplotMouseUp,鼠标弹起事件
	 * jqplotDataMouseOver,鼠标滑过数据事件 jqplotDataHighlight,高亮显示事件 jqplotDataClick,
	 * 数据点击事件 jqplotDataRightClick,数据右击事件
	 * 
	 */
	if (dataModel.jqplotMouseMove != null
			|| dataModel.jqplotMouseMove != undefined) {
		$('#' + dataModel.id)
				.bind(
						'jqplotMouseMove',
						function(ev, seriesIndex, pointIndex, data) {
							dataModel.jqplotMouseMove(ev, seriesIndex,
									pointIndex, data);
						});
	}

	if (dataModel.jqplotMouseDown != null
			|| dataModel.jqplotMouseDown != undefined) {
		$('#' + dataModel.id)
				.bind(
						'jqplotMouseDown',
						function(ev, seriesIndex, pointIndex, data) {
							dataModel.jqplotMouseDown(ev, seriesIndex,
									pointIndex, data);
						});
	}

	if (dataModel.jqplotMouseUp != null || dataModel.jqplotMouseUp != undefined) {
		$('#' + dataModel.id).bind('jqplotMouseUp',
				function(ev, seriesIndex, pointIndex, data) {
					dataModel.jqplotMouseUp(ev, seriesIndex, pointIndex, data);
				});
	}

	if (dataModel.jqplotDataClick != null
			|| dataModel.jqplotDataClick != undefined) {
		$('#' + dataModel.id)
				.bind(
						'jqplotDataClick',
						function(ev, seriesIndex, pointIndex, data) {
							dataModel.jqplotDataClick(ev, seriesIndex,
									pointIndex, data);
						});
	}

	if (dataModel.jqplotDataRightClick != null
			|| dataModel.jqplotDataRightClick != undefined) {
		$('#' + dataModel.id).bind(
				'jqplotDataRightClick',
				function(ev, seriesIndex, pointIndex, data) {
					dataModel.jqplotDataRightClick(ev, seriesIndex, pointIndex,
							data);
				});
	}

	if (dataModel.jqplotDataHighlight != null
			|| dataModel.jqplotDataHighlight != undefined) {
		$('#' + dataModel.id).bind(
				'jqplotDataHighlight',
				function(ev, seriesIndex, pointIndex, data) {
					dataModel.jqplotDataHighlight(ev, seriesIndex, pointIndex,
							data);
				});
	}
	
	if (dataModel.jqplotDataUnhighlight != null
			|| dataModel.jqplotDataUnhighlight != undefined) {
		$('#' + dataModel.id).bind(
				'jqplotDataUnhighlight',
				function(ev, seriesIndex, pointIndex, data) {
					dataModel.jqplotDataUnhighlight(ev, seriesIndex, pointIndex,
							data);
				});
	}
	

	$('#' + dataModel.id).bind(
			'jqplotDataMouseOver',
			function(ev, seriesIndex, pointIndex, data) {
				// 如果设置要在高亮的时候显示分类信息
				if (dataModel.showSeriesLabel == true) {
					var seriesLabel = "";
					if (seriesIndex != null && dataModel.series.length > 0) {
						seriesLabel = dataModel.series[seriesIndex].label;
					}
					$("#" + dataModel.showSeriesHtmlId).html(seriesLabel);
				}

				if (dataModel.jqplotDataMouseOver != null
						|| dataModel.jqplotDataMouseOver != undefined) {
					dataModel.jqplotDataMouseOver(ev, seriesIndex, pointIndex,
							data);
				}
			});
	
	
	return plot;
}

// 获取x轴刻度数组
function ctl_getXTick(plot) {
	return plot.axes.xaxis.ticks;
}

// 获取y轴刻度数组
function ctl_getYTick(plot) {
	return plot.axes.yaxis.ticks;
}

// 获取高亮显示tip的table对象
function ctl_getHighlighterTable() {
	return $(".jqplot-highlighter");
}

// 摧毁图表对象
function ctl_destroyPlot(plot) {
	plot.destroy();
}

// 重新加载图形界面(用于window.onresize事件中)
function ctl_replot(plot,width){
	if(width && !isNaN(width)){
		plot.replot({ 
			resetAxes:true,
			width:width
		});
	}  
}
/**
 * 显示线形图表
 * 
 * @param dataModel
 */
function showLine(dataModel) {

	var plot = null;
	// 将y轴上的title转换成竖排显示
	var toolTip = dataModel.yTitle.replace("︵", "(");
	toolTip = toolTip.replace("︶", ")");
	var yTitle = "";
	for ( var k = 0; k < dataModel.yTitle.length; k++) {
		yTitle += dataModel.yTitle.substring(k, k + 1) + "<br />";
	}
	dataModel.yTitle = yTitle;

	// 如果参数不存在，给各必须参赛设置默认值
	if (dataModel.data != null && dataModel.data != ""
			&& dataModel.data != undefined) {
		var objShow = false;

		// 是否显示标题
		if (dataModel.title != undefined && dataModel.title != '') {
			objShow = true;
		}
		if (dataModel.xTitle == undefined) {
			dataModel.xTitle = '';
		}
		if (dataModel.xDataType == undefined || dataModel.xDataType == '') {
			dataModel.xDataType = 'string';
		}

		if (dataModel.xFormat == undefined || dataModel.xFormat == '') {
			if (dataModel.xDataType == 'number')
				dataModel.xFormat = '%.0f';
			else if (dataModel.xDataType == 'date')
				dataModel.xFormat = '%Y-%m-%d';
		}
		if (dataModel.xTicks == undefined || dataModel.xTicks == '') {
			dataModel.xTicks = [];
		}
		if (dataModel.xMax == undefined || dataModel.xMax == '') {
			dataModel.xMax = 0;
		}
		if (dataModel.xMin == undefined || dataModel.xMin == '') {
			dataModel.xMin = 0;
		}
		if (dataModel.xTickInterval == undefined
				|| dataModel.xTickInterval == '') {
			dataModel.xTickInterval = 0;
		}

		if (dataModel.yTitle == undefined) {
			dataModel.yTitle = '';
		}
		if (dataModel.yDataType == undefined || dataModel.yDataType == '') {
			dataModel.yDataType = 'string';
		}
		if (dataModel.yFormat == undefined || dataModel.yFormat == '') {
			if (dataModel.yDataType == 'number')
				dataModel.yFormat = '%.0f';
			else if (dataModel.yDataType == 'date')
				dataModel.yFormat = '%Y-%m-%d';
		}
		if (dataModel.yTicks == undefined || dataModel.yTicks == '') {
			dataModel.yTicks = [];
		}
		if (dataModel.yMax == undefined || dataModel.yMax == '') {
			dataModel.yMax = 0;
		}
		if (dataModel.yMin == undefined || dataModel.yMin == '') {
			dataModel.yMin = 0;
		}
		if (dataModel.yTickInterval == undefined
				|| dataModel.yTickInterval == '') {
			dataModel.yTickInterval = 0;
		}

		if (dataModel.legendLocation == undefined
				|| dataModel.legendLocation == '') {
			dataModel.legendLocation = 'ne';
		}
		if (dataModel.showLegend == null || dataModel.showLegend == undefined) {
			dataModel.showLegend = true;
		}
		if (dataModel.showLegendByRow == undefined
				|| dataModel.showLegendByRow == '') {
			dataModel.showLegendByRow = false;
		}
		if (dataModel.legendRowSize == undefined
				|| dataModel.legendRowSize == '') {
			dataModel.legendRowSize = 5;
		}
		if (dataModel.legendPlacement == undefined
				|| dataModel.legendPlacement == '') {
			dataModel.legendPlacement = 'outsideGrid';
		}
		if (dataModel.showHighLightXY == undefined
				|| dataModel.showHighLightXY == null) {
			dataModel.showHighLightXY = true;
		}

		var highter = "<table class='jqplot-highlighter' style='background-color:#FF9; border-color:#F90;'>";

		// 如果要在高亮显示tip中显示当前xy信息
		if (dataModel.showHighLightXY) {
			if (dataModel.xTitle != null && dataModel.xTitle != "") {
				highter += "<tr><td style='font-size:12px;'>"
						+ dataModel.xTitle + ": </td><td>%s</td></tr>";
			} else {
				highter += "<tr><td style='font-size:12px;'>"
						+ dataModel.xTitle + "</td><td>%s</td></tr>";
			}
			if (dataModel.yTitle != null && dataModel.yTitle != "") {
				highter += "<tr><td style='font-size:12px;'>" + toolTip
						+ ": </td><td>%s</td></tr>";
			} else {
				highter += "<tr><td style='font-size:12px;'>" + toolTip
						+ "</td><td>%s</td></tr>";
			}

		}

		// 如果要在高亮显示的时候显示分类名称
		if (dataModel.showSeriesLabel == true) {
			// 如果没有指定要显示的高亮html元素id
			if (dataModel.showSeriesHtmlId == null
					|| dataModel.showSeriesHtmlId == "") {
				dataModel.showSeriesHtmlId = "seriesLabelId";
			}
			highter += "<tr><td style='font-size:12px;'>"
					+ dataModel.showSeriesLabelName + ": </td><td id="
					+ dataModel.showSeriesHtmlId + ">" + "</td></tr>";
		}

		// 如果有自定义的高亮显示数据，将数据添加到高亮显示的html中
		if (dataModel.highLightNames != null
				&& dataModel.highLightNames.length > 0
				&& dataModel.highLightValues != null
				&& dataModel.highLightValues.length > 0
				&& dataModel.highLightNames.length == dataModel.highLightValues.length) {

			for ( var i = 0, len = dataModel.highLightNames.length; i < len; i++) {
				var name = dataModel.highLightNames[i];
				var value = dataModel.highLightValues[i];
				highter += "<tr><td style='font-size:12px;'>" + name
						+ ": </td><td id='seriesLabelId'>" + value
						+ "</td></tr>";
			}
		}

		highter += "</table>";

		// 设置x轴和y轴的渲染器
		var axRenderer = null;
		if (dataModel.xDataType == 'string') {
			axRenderer = $.jqplot.CategoryAxisRenderer;
		} else if (dataModel.xDataType == 'number') {
			axRenderer = $.jqplot.CanvasAxisLabelRenderer;
		} else if (dataModel.xDataType == 'date') {
			axRenderer = $.jqplot.DateAxisRenderer;
		}
		var ayRenderer = null;
		if (dataModel.yDataType == 'string') {
			ayRenderer = $.jqplot.CategoryAxisRenderer;
		} else if (dataModel.yDataType == 'number') {
			ayRenderer = $.jqplot.CanvasAxisLabelRenderer;
		} else if (dataModel.yDataType == 'date') {
			ayRenderer = $.jqplot.DateAxisRenderer;
		}

		// 显示X轴格式
		var ax = {
			label : dataModel.xTitle,
			labelOptions : {
				textColor : txtColor,
				fontSize : '12px', // 刻度值的字体大小
				fontFamily : '宋体' // 刻度值上字体
			},
			renderer : axRenderer,
			autoscale : true,
			// ticks : dataModel.xTicks,
			tickOptions : {
				textColor : txtColor,
				formatString : dataModel.xFormat,
				angle : dataModel.xAngle
			}
		// min : dataModel.xMin,
		// max : dataModel.xMax,
		// tickInterval : dataModel.xTickInterval,
		};

		// 设置y轴显示格式
		var ay = {
			label : dataModel.yTitle,
			labelOptions : {
				textColor : txtColor,
				fontSize : '12px', // 刻度值的字体大小
				fontFamily : '宋体' // 刻度值上字体
			},
			renderer : ayRenderer,
			autoscale : true,
			// ticks : dataModel.yTicks,
			tickOptions : {
				textColor : txtColor,
				formatString : dataModel.yFormat,
				angle : dataModel.xAngle
			}
		// min : dataModel.yMin,
		// max : dataModel.yMax,
		// tickInterval : dataModel.yTickInterval,
		};

		// 调用渲染图表方法
		plot = $.jqplot(dataModel.id, dataModel.data, {
			grid : grids, // 边框
			title : {
				text : dataModel.title, // 设置当前图的标题
				textColor : titleColor,
				fontSize : '12px', // 刻度值的字体大小
				fontFamily : '宋体', // 刻度值上字体
				// fontWeight:'bold', //字体的粗细
				show : objShow
			},
			seriesColors : sColors, // 自定义颜色
			stackSeries : dataModel.showOne,
			series : dataModel.series,
			legend : {
				show : true,
				location : dataModel.legendLocation,
				showLegend : dataModel.showLegend,
				placement : dataModel.legendPlacement,// Grid'
				showLegendByRow : dataModel.showLegendByRow,
				// 单行显示分类信息个数
				legendRowSize : dataModel.legendRowSize,
				bindLegendType:dataModel.type
			},
			axesDefaults : {
				// labelRenderer : $.jqplot.CanvasAxisLabelRenderer,
				tickRenderer : $.jqplot.CanvasAxisTickRenderer,
				tickOptions : {
					labelPosition : 'middle'
				}
			},
			axes : {
				xaxis : ax,
				yaxis : ay
			},
			highlighter : {
				show : true,
				sizeAdjust : 7.5,
				tooltipLocation : 'n',
				formatString : highter
			},
			cursor : {
				show : true,
				zoom : true,
				tooltipLocation : 'sw'
			}
		});
	}

	// 设置不出现分类名称框
	if (dataModel.showLegend == false) {
		$("#" + dataModel.id).find(".jqplot-table-legend").hide();
	}

	// 设置不显示x轴
	if (dataModel.showXaxis == false) {
		$("#" + dataModel.id).find(".jqplot-xaxis").hide();
	}

	return plot;
}

/*
 * 显示柱形图
 */
function showBar(dataModel) {
	var plot = null;
	// 将y轴上的title转换成竖排显示
	var toolTip = dataModel.yTitle.replace("︵", "(");
	toolTip = toolTip.replace("︶", ")");
//	var yTitle = "";
//	for ( var k = 0; k < dataModel.yTitle.length; k++) {
//		yTitle += dataModel.yTitle.substring(k, k + 1) + "<br />";
//	}
//	dataModel.yTitle = yTitle;

	// 如果参数不存在，给各必须参赛设置默认值
	if (dataModel.data != null && dataModel.data != ""
			&& dataModel.data != undefined) {
		var objShow = false;

		// 是否显示标题
		if (dataModel.title != undefined && dataModel.title != '') {
			objShow = true;
		}
		if (dataModel.xTitle == undefined) {
			dataModel.xTitle = '';
		}
		if (dataModel.xDataType == undefined || dataModel.xDataType == '') {
			dataModel.xDataType = 'number';
		}

		if (dataModel.xFormat == undefined || dataModel.xFormat == '') {
			// dataModel.xFormat = '%.0f';
		}
		if (dataModel.xTicks == undefined || dataModel.xTicks == '') {
			dataModel.xTicks = [];
		}
		if (dataModel.xMax == undefined || dataModel.xMax == '') {
			dataModel.xMax = 0;
		}
		if (dataModel.xMin == undefined || dataModel.xMin == '') {
			dataModel.xMin = 0;
		}
		if (dataModel.xTickInterval == undefined
				|| dataModel.xTickInterval == '') {
			dataModel.xTickInterval = 0;
		}

		if (dataModel.yTitle == undefined) {
			dataModel.yTitle = '';
		}
		if (dataModel.yDataType == undefined || dataModel.yDataType == '') {
			dataModel.yDataType = 'number';
		}
		if (dataModel.yFormat == undefined || dataModel.yFormat == '') {
			// dataModel.yFormat = '%.0f';
		}
		if (dataModel.yTicks == undefined || dataModel.yTicks == '') {
			dataModel.yTicks = [];
		}
		if (dataModel.yMax == undefined || dataModel.yMax == '') {
			dataModel.yMax = 0;
		}
		if (dataModel.yMin == undefined || dataModel.yMin == '') {
			dataModel.yMin = 0;
		}
		if (dataModel.yTickInterval == undefined
				|| dataModel.yTickInterval == '') {
			dataModel.yTickInterval = 0;
		}

		if (dataModel.barPadding == undefined || dataModel.barPadding == '') {
			dataModel.barPadding = 5;
		}
		if (dataModel.barMargin == undefined || dataModel.barMargin == '') {
			dataModel.barMargin = 40;
		}
		if (dataModel.barWidth == undefined || dataModel.barWidth == '') {
			dataModel.barWidth = 25;
		}
		if (dataModel.barDirection == undefined || dataModel.barDirection == '') {
			dataModel.barWidth = 'vertical';
		}
		if (dataModel.showOne == undefined || dataModel.showOne == '') {
			dataModel.showOne = false;
		}

		if (dataModel.showLegend == undefined || dataModel.showLegend == null) {
			dataModel.showLegend = true;
		}
		if (dataModel.legendLocation == undefined
				|| dataModel.legendLocation == '') {
			dataModel.legendLocation = 'ne';
		}
		if (dataModel.showLegendByRow == undefined
				|| dataModel.showLegendByRow == '') {
			dataModel.showLegendByRow = false;
		}
		if (dataModel.legendRowSize == undefined
				|| dataModel.legendRowSize == '') {
			dataModel.legendRowSize = 5;
		}
		if (dataModel.legendPlacement == undefined
				|| dataModel.legendPlacement == '') {
			dataModel.legendPlacement = 'outsideGrid';
		}
		if (dataModel.showHighLightXY == undefined
				|| dataModel.showHighLightXY == null) {
			dataModel.showHighLightXY = true;
		}

		var highter = "<table class='jqplot-highlighter' style='background-color:#FF9; border-color:#F90;'>";

		// 如果要在高亮显示tip中显示当前xy信息
		if (dataModel.showHighLightXY) {
			if (dataModel.xTitle != null && dataModel.xTitle != "") {
				highter += "<tr><td style='font-size:12px;'>"
						+ dataModel.xTitle + ": </td><td>%s</td></tr>";
			} else {
				highter += "<tr><td style='font-size:12px;'>"
						+ dataModel.xTitle + "</td><td>%s</td></tr>";
			}
			if (dataModel.yTitle != null && dataModel.yTitle != "") {
				highter += "<tr><td style='font-size:12px;'>" + toolTip
						+ ": </td><td>%s</td></tr>";
			} else {
				highter += "<tr><td style='font-size:12px;'>" + toolTip
						+ "</td><td>%s</td></tr>";
			}
		}

		// 如果要在高亮显示的时候显示分类名称
		if (dataModel.showSeriesLabel == true) {
			// 如果没有指定要显示的高亮html元素id
			if (dataModel.showSeriesHtmlId == null
					|| dataModel.showSeriesHtmlId == "") {
				dataModel.showSeriesHtmlId = "seriesLabelId";
			}
			highter += "<tr><td style='font-size:12px;'>"
					+ dataModel.showSeriesLabelName + ": </td><td id="
					+ dataModel.showSeriesHtmlId + ">" + "</td></tr>";
		}

		// 如果有自定义的高亮显示数据，将数据添加到高亮显示的html中
		if (dataModel.highLightNames != null
				&& dataModel.highLightNames.length > 0
				&& dataModel.highLightValues != null
				&& dataModel.highLightValues.length > 0
				&& dataModel.highLightNames.length == dataModel.highLightValues.length) {

			for ( var i = 0, len = dataModel.highLightNames.length; i < len; i++) {
				var name = dataModel.highLightNames[i];
				var value = dataModel.highLightValues[i];
				highter += "<tr><td style='font-size:12px;'>" + name
						+ ": </td><td id='seriesLabelId'>" + value
						+ "</td></tr>";
			}
		}

		highter += "</table>";

		// 设置x轴渲染器
		var axRenderer = null;
		if (dataModel.xDataType == 'string') {
			axRenderer = $.jqplot.CategoryAxisRenderer;
		} else if (dataModel.xDataType == 'number') {
			axRenderer = $.jqplot.CanvasAxisLabelRenderer;
		} else if (dataModel.xDataType == 'date') {
			axRenderer = $.jqplot.DateAxisRenderer;
		}

		// 设置y轴渲染器
		var ayRenderer = null;
		if (dataModel.yDataType == 'string') {
			ayRenderer = $.jqplot.CategoryAxisRenderer;
		} else if (dataModel.yDataType == 'number') {
			ayRenderer = $.jqplot.CanvasAxisTickRenderer;
		} else if (dataModel.yDataType == 'date') {
			ayRenderer = $.jqplot.DateAxisRenderer;
		}

		// 显示X轴格式
		var ax = {
			label : dataModel.xTitle,
			labelOptions : {
				textColor : txtColor,
				fontSize : '12px', // 刻度值的字体大小
				fontFamily : '宋体' // 刻度值上字体
			},
			// renderer : axRenderer,
			autoscale : true,
			// ticks : dataModel.xTicks,
			tickOptions : {
				textColor : txtColor,
				formatString : dataModel.xFormat,
				angle : dataModel.xAngle
			}
		// min : dataModel.xMin,
		// max : dataModel.xMax,
		// tickInterval : dataModel.xTickInterval,
		};

		if (dataModel.xDataType == 'string') {
			ax.renderer = axRenderer;
		}

		// 显示y轴格式
		var ay = {
			label : dataModel.yTitle,
			labelOptions : {
				textColor : txtColor,
				fontSize : '12px', // 刻度值的字体大小
				fontFamily : '宋体' // 刻度值上字体
			},
			// renderer : ayRenderer,
			autoscale : true,
			// ticks : dataModel.yTicks,
			tickOptions : {
				textColor : txtColor,
				formatString : dataModel.yFormat,
				angle : dataModel.yAngle
			}
		// min : dataModel.yMin,
		// max : dataModel.yMax,
		// tickInterval : dataModel.yTickInterval,
		};

		if (dataModel.yDataType == 'string') {
			ay.renderer = ayRenderer;

		}

		// if (dataModel.xDataType == 'string') {
		// var map1 = new Map();
		// var map2 = new Map();
		// if (dataModel.series.length > 1) {
		// var count = 1;
		// for ( var i = 0; i < dataModel.series.length; i++) {
		// map1.put(dataModel.series[i].label, count);
		// map2.put(count, dataModel.series[i].label);
		// count++;
		// }
		// }
		// for ( var i = 0; i < dataModel.data.length; i++) {
		// var data0 = dataModel.data[i];
		// for ( var j = 0; j < data0.length; j++) {
		// var data1 = data0[j];
		// if (map1.get(data1[0]) != null
		// && map1.get(data1[0]) != undefined) {
		// data1[0] = map1.get(data1[0]);
		// }
		// }
		// }
		// }

		plot = $.jqplot(dataModel.id, dataModel.data, {
			grid : grids, // 边框
			title : {
				text : dataModel.title, // 设置当前图的标题
				textColor : titleColor,
				fontSize : '12px', // 刻度值的字体大小
				fontFamily : '宋体', // 刻度值上字体
				// fontWeight:'bold', //字体的粗细
				show : objShow
			// 设置当前标题是否显示
			},

			seriesColors : sColors, // 自定义颜色
			stackSeries : dataModel.showOne,

			animate : true,

			// 默认的分类风格
			seriesDefaults : {
				renderer : $.jqplot.BarRenderer,
				rendererOptions : {
					// 是否在渲染的时候使用多颜色
					useMutliColor : dataModel.useMutliColor,
					barPadding : dataModel.barPadding,// 设置同一分类两个柱状条之间的距离（px）
					barMargin : dataModel.barMargin, // 设置不同分类的两个柱状条之间的距离（px）（同一个横坐标表点上）
					barWidth : dataModel.barWidth,// 设置柱状图中每个柱状条的宽度
					// 设置柱状图显示的方向：垂直显示和水平显示 默认垂直显示
					// vertical表示垂直 horizontal表示水平
					barDirection : dataModel.barDirection
				}
			},
			highlighter: { show: false },
			series : dataModel.series,
			legend : {
				show : true,
				showLegend : dataModel.showLegend,
				location : dataModel.legendLocation,
				placement : dataModel.legendPlacement,
				showLegendByRow : dataModel.showLegendByRow,
				// 单行显示分类信息个数
				legendRowSize : dataModel.legendRowSize,
				bindLegendType:dataModel.type
			},
			axesDefaults : {
				labelRenderer : $.jqplot.CanvasAxisLabelRenderer,
				tickRenderer : $.jqplot.CanvasAxisTickRenderer,
				tickOptions : {
					labelPosition : 'middle'
				}
			},
			axes : {
				xaxis : ax,
				yaxis : ay
			},
			// 高亮
			highlighter : {
				show : false,
				showTooltip : true,
				sizeAdjust : 7.5,
				tooltipLocation : 'n',
				formatString : highter
			},
			cursor : {
				show : true,
				tooltipLocation : 'sw'
			}
		});

	}

	// 设置不出现分类名称框
	if (dataModel.showLegend == false) {
		$("#" + dataModel.id).find(".jqplot-table-legend").remove();
	}
	// 设置不显示x轴
	if (dataModel.showXaxis == false) {
		$("#" + dataModel.id).find(".jqplot-xaxis").hide();
	}

	return plot;
}

/**
 * 显示饼图
 * 
 * @param dataModel
 */
function showPie(dataModel) {

	var plot = null;

	if (dataModel.data != null && dataModel.data != ""
			&& dataModel.data != undefined) {
		var objShow = false;
		// 是否显示标题
		if (dataModel.title != undefined && dataModel.title != '') {
			objShow = true;
		}

		// 如果参数不存在，给各必须参赛设置默认值
		if (dataModel.pieFill == undefined || dataModel.pieFill == '') {
			dataModel.pieFill = true;
		}

		if (dataModel.pieShowDataLabels == undefined
				|| dataModel.pieShowDataLabels == '') {
			dataModel.pieShowDataLabels = true;
		}

		if (dataModel.pieSliceMargin == undefined
				|| dataModel.pieSliceMargin == '') {
			dataModel.pieSliceMargin = 4;
		}

		if (dataModel.pieLineWidth == undefined || dataModel.pieLineWidth == '') {
			dataModel.pieLineWidth = 5;
		}

		if (dataModel.pieStartAngle == undefined
				|| dataModel.pieStartAngle == '') {
			dataModel.pieStartAngle = 0;
		}

		if (dataModel.legendLocation == undefined
				|| dataModel.legendLocation == '') {
			dataModel.legendLocation = 'ne';
		}
		if (dataModel.showLegend == null || dataModel.showLegend == undefined) {
			dataModel.showLegend = true;
		}
		if (dataModel.showLegendByRow == undefined
				|| dataModel.showLegendByRow == '') {
			dataModel.showLegendByRow = false;
		}
		if (dataModel.legendRowSize == undefined
				|| dataModel.legendRowSize == '') {
			dataModel.legendRowSize = 5;
		}
		if (dataModel.legendPlacement == undefined
				|| dataModel.legendPlacement == '') {
			dataModel.legendPlacement = 'outsideGrid';
		}

		// 设置饼图的渲染器
		var render = null;
		// 如果只有一个分类，使用一般的饼图渲染器
		if (dataModel.data.length == 1)
			render = jQuery.jqplot.PieRenderer;
		// 如果有多个分类，使用环形的饼图渲染器
		else if (dataModel.data.length > 1)
			render = jQuery.jqplot.DonutRenderer;

		// 绘制图表
		plot = $.jqplot(dataModel.id, dataModel.data, {
			grid : grids, // 边框
			title : {
				text : dataModel.title, // 设置当前图的标题
				textColor : titleColor,
				fontSize : '12px', // 刻度值的字体大小
				fontFamily : '宋体', // 刻度值上字体
				// fontWeight:'bold', //字体的粗细
				show : objShow
			// 设置当前标题是否显示
			},
			
			seriesColors : sColors, // 自定义颜色,
			stackSeries : false,
			seriesDefaults : {
				renderer : render,
				rendererOptions : {
					// 是否填充
					fill : dataModel.pieFill,
					// 是否显示数据值
					showDataLabels : dataModel.pieShowDataLabels,
					// 分隔距离
					sliceMargin : dataModel.pieSliceMargin,
					// 分割线宽度
					lineWidth : dataModel.pieLineWidth,
					// 开始角度
					startAngle : dataModel.pieStartAngle
				}
			},
			useSeriesColor : true,
			legend : {
				show : true,
				showLegend : dataModel.legendLocation,
				location : dataModel.legendLocation,
				rowSpacing:dataModel.rowSpacing,
				placement : dataModel.legendPlacement,
				showLegendByRow :false,
				// 单行显示分类信息个数
				legendRowSize : dataModel.legendRowSize,
				bindLegendType:dataModel.type,
				rendererOptions: {numberColumns:dataModel.legendRowSize}
			}
		});
	}
	return plot;
}

Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1,
		"d+" : this.getDate(),
		"h+" : this.getHours(),
		"m+" : this.getMinutes(),
		"s+" : this.getSeconds(),
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		"S" : this.getMilliseconds()
	};
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};

// 获取日期，根据long类型转日期
// date:日期
// pattern：日期格式 默认yyyy-MM-dd hh:mm:ss
function getFormatDate(date, pattern) {
	if (date == undefined) {
		date = new Date();
	}
	if (pattern == undefined) {
		pattern = "yyyy-MM-dd hh:mm:ss";
	}
	return date.format(pattern);
}
