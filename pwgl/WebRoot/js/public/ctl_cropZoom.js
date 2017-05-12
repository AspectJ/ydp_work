// 用法
var zoomOption = {
	zoomId : "",// 图片缩放区div id
	imgSrc : "",// 图片路径
	bgColor : "",// 背景颜色
	enableRotation : true,// 是否需要旋转
	enableZoom : true,// 是否需要缩放
	// 图片容器的初始宽和高
	zoomWidth : 0,
	zoomHeight : 0,
	// 容器中图片的大小
	imgWidth : 0,
	imgHeight : 0,
	// 图片容器中可缩放的最大最小比例（%）
	maxZoom : 0,
	minZoom : 0,
	// 图片选区的初始宽和高
	selectorWidth : 0,
	selectorHeight : 0,

	// 选区拖动回调
	onSelectorDrag : null,
	// 选区拖动停止回调
	onSelectorDragStop : null,
	// 选区大小变动回调
	onSelectorResize : null,
	// 选区大小变动停止回调
	onSelectorResizeStop : null,
	// 缩放回调
	onZoom : null,
	// 旋转回调
	onRotate : null,
	// 图片拖动回调
	onImageDrag : null

};

// 图片缩放对象缓存Map
var cropZoomMap = new Map();
/**
 * 初始化方法
 */
function ctl_cropZoom(option) {

	var zoomId = option.zoomId;
	if (zoomId == null || zoomId == undefined || zoomId == "") {
		ctl_showMsg("请给定图片区id!");
		return;
	}

	var imgSrc = option.imgSrc;
	if (imgSrc == null || imgSrc == undefined || imgSrc == "") {
		ctl_showMsg("请选择要上传的图片!");
		return;
	}

	// 背景颜色（在旋转的时候有用）
	var bgColor = option.bgColor;
	if (bgColor == null || bgColor == undefined || bgColor == "") {
		bgColor = '#ccc';
	}

	var enableRotation = option.enableRotation;// 是否需要旋转
	var enableZoom = option.enableZoom;// 是否需要缩放

	if (enableRotation == null || enableRotation == undefined
			|| enableRotation == "") {
		enableRotation = true;
	}
	if (enableZoom == null || enableZoom == undefined || enableZoom == "") {
		enableZoom = true;
	}

	// 图片容器的初始宽和高
	var zoomWidth = option.zoomWidth;
	var zoomHeight = option.zoomHeight;

	// 容器中图片的大小
	var imgWidth = option.imgWidth;
	var imgHeight = option.imgHeight;

	// 图片容器中可缩放的最大最小比例（%）
	var minZoom = option.minZoom;
	var maxZoom = option.maxZoom;

	// 图片选区的初始宽和高
	var selectorWidth = option.selectorWidth;
	var selectorHeight = option.selectorHeight;

	if (zoomWidth == null || zoomWidth == undefined || zoomWidth == "") {
		zoomWidth = 500;
	}
	if (zoomHeight == null || zoomHeight == undefined || zoomHeight == "") {
		zoomWidth = 500;
	}

	if (imgWidth == null || imgWidth == undefined || imgWidth == "") {
		imgWidth = 1000;
	}

	if (imgHeight == null || imgHeight == undefined || imgHeight == "") {
		imgHeight = 1000;
	}

	if (minZoom == null || minZoom == undefined || minZoom == "") {
		minZoom = 200;
	}

	if (maxZoom == null || maxZoom == undefined || maxZoom == "") {
		maxZoom = 10;
	}

	if (selectorWidth == null || selectorWidth == undefined
			|| selectorWidth == "") {
		selectorWidth = 250;
	}
	if (selectorHeight == null || selectorHeight == undefined
			|| selectorHeight == "") {
		selectorHeight = 250;
	}

	var zoomOption = {

		width : zoomWidth,
		height : zoomHeight,
		bgColor : bgColor,

		enableRotation : enableRotation,
		enableZoom : enableZoom,

		selector : {
			w : selectorWidth,
			h : selectorHeight,
			centered : true,
			bgInfoLayer : '#fff',
			borderColor : 'blue',
			borderColorHover : 'yellow',
			// 选区拖动回调
			onSelectorDrag : option.onSelectorDrag,
			// 选区拖动停止回调
			onSelectorDragStop : option.onSelectorDragStop,
			// 选区大小变动回调
			onSelectorResize : option.onSelectorResize,
			// 选区大小变动停止回调
			onSelectorResizeStop : option.onSelectorResizeStop
		},
		image : {
			source : imgSrc,
			width : imgWidth,
			height : imgHeight,
			// snapToContainer : false,
			minZoom : minZoom,
			maxZoom : maxZoom,
			// 缩放回调
			onZoom : function(object) {

				var cropzoom = ctl_getCropZoom(zoomId);
				var rotation = cropzoom.data('image').rotation;// 图像的旋转角度
				rotation = parseFloat(rotation);
				rotation = rotation % 360;
				var imageZoomW = cropzoom.data('image').w; // 图像缩放后的宽
				var imageZoomH = cropzoom.data('image').h;// 图像缩放后的高

				var cropzoom_width = cropzoom.width();
				var cropzoom_height = cropzoom.height();

				var iw = imageZoomW;
				var ih = imageZoomH;
				var w = 0;
				var h = 0;

				if (rotation == 180 || rotation == 0 || rotation == 360) {
					w = iw;
					h = ih;
				} else if (rotation == 90 || rotation == 270) {
					w = ih;
					h = iw;
				} else {
					var d = iw + ih;
					var ang = 2 * Math.PI / 360 * rotation;
					w = (d * Math.abs(Math.cos(ang)));
					h = (d * Math.abs(Math.sin(ang)));
				}

				cropzoom.rotateWidth = w;
				cropzoom.rotateHeight = h;

				if (option.onZoom != null) {
					option.onZoom(object);
				}

			},
			// 旋转回调
			onRotate : function(object) {

				var cropzoom = ctl_getCropZoom(zoomId);
				var rotation = cropzoom.data('image').rotation;// 图像的旋转角度
				rotation = parseFloat(rotation);
				rotation = rotation % 360;
				var imageZoomW = cropzoom.data('image').w; // 图像缩放后的宽
				var imageZoomH = cropzoom.data('image').h;// 图像缩放后的高

				var cropzoom_width = cropzoom.width();
				var cropzoom_height = cropzoom.height();

				var img = $(object);

				var iw = imageZoomW;
				var ih = imageZoomH;
				var w = 0;
				var h = 0;

				if (rotation == 180 || rotation == 0 || rotation == 360) {
					w = iw;
					h = ih;
				} else if (rotation == 90 || rotation == 270) {
					w = ih;
					h = iw;
				} else {
					var d = iw + ih;
					var ang = 2 * Math.PI / 360 * rotation;
					w = (d * Math.abs(Math.cos(ang)));
					h = (d * Math.abs(Math.sin(ang)));
				}

				cropzoom.rotateWidth = w;
				cropzoom.rotateHeight = h;

				if (option.onRotate != null) {
					option.onRotate(object);
				}

			},
			// 图片拖动回调
			onImageDrag : function(object) {

				var cropzoom = ctl_getCropZoom(zoomId);

				// 图像缩放后的宽和高
				var imageZoomW = cropzoom.data('image').w;
				var imageZoomH = cropzoom.data('image').h;

				// 图片容器的宽和高
				var cropzoom_width = cropzoom.width();
				var cropzoom_height = cropzoom.height();

				// 获取图片当前被移动的偏移量
				var left = cropzoom.data('image').posX0;
				var top = cropzoom.data('image').posY0;

				// 如果存在缩放，需要将缩放引起的偏移量也算进去
				var moveLeft = left + (imageZoomW - cropzoom_width) / 2
				var moveTop = top + (imageZoomH - cropzoom_height) / 2

				// 记录下图片拖动后的偏移量
				cropzoom.moveLeft = moveLeft;
				cropzoom.moveTop = moveTop;

				// 如果拖动回调函数不为空，则执行回调
				if (option.onImageDrag != null) {
					option.onImageDrag(object);
				}
			}

		}
	};

	var cropzoom = $('#' + zoomId).cropzoom(zoomOption);

	// 将配置信息缓存起来
	cropzoom.option = zoomOption;
	cropZoomMap.put(zoomId, cropzoom);
	return cropzoom;
}

// 设置选区
function ctl_setZoomSelector(cropzoom, x, y, w, h, animated) {
	cropzoom.setSelector(x, y, w, h, true);
}

// 根据容器id获取图片缩放对象
function ctl_getCropZoom(zoomId) {
	return cropZoomMap.get(zoomId);
}

// 获取选区对象（对象包含了选区的起点和结束坐标及宽高及缩放后的图片宽高）
function ctl_getZoomImgObj(cropzoom) {

	if (cropzoom == null) {
		return null;
	}

	var imageX = cropzoom.data('selector').x; // 图像x坐标
	var imageY = cropzoom.data('selector').y; // 图像Y坐标
	var imageW = cropzoom.data('selector').w; // 图像宽
	var imageH = cropzoom.data('selector').h; // 图像高
	var imageZoomW = cropzoom.data('image').w; // 图像缩放后的宽
	var imageZoomH = cropzoom.data('image').h;// 图像缩放后的高
	var rotation = cropzoom.data('image').rotation;// 图像的旋转角度

	var cropzoom_width = cropzoom.width();
	var cropzoom_height = cropzoom.height();

	// 如果cropzoom比图片的的缩放宽度要宽
	if (cropzoom_width > imageZoomW) {
		imageX = imageX - ((cropzoom_width - imageZoomW) / 2);
		// 如果cropzoom比图片的的缩放宽度要窄
	} else if (cropzoom_width < imageZoomW) {
		imageX = imageX + ((imageZoomW - cropzoom_width) / 2);
	}

	// 如果cropzoom比图片的的缩放宽度要高
	if (cropzoom_height > imageZoomH) {
		imageY = imageY - ((cropzoom_height - imageZoomH) / 2);
		// 如果cropzoom比图片的的缩放宽度要高
	} else if (cropzoom_height < imageZoomH) {
		imageY = imageY + ((imageZoomH - cropzoom_height) / 2);
	}

	var rotateWidth = cropzoom.rotateWidth;
	var rotateHeight = cropzoom.rotateHeight;
	// 如果图片被旋转，则要算出图片旋转后的x,y的值
	if (rotateWidth != null && rotateHeight != null) {

		var diffW = Math.abs(rotateWidth - imageZoomW) / 2;
		var diffH = Math.abs(rotateHeight - imageZoomH) / 2;

		imageX = Math.abs(rotateWidth < imageZoomW ? imageX - diffW : imageX
				+ diffW);
		imageY = Math.abs(rotateHeight < imageZoomH ? imageY - diffH : imageY
				+ diffH);
	}

	// 如果存在图片拖动的偏移量，则要减去这部分偏移
	if (cropzoom.moveLeft != null) {
		imageX = imageX - cropzoom.moveLeft;
	}

	if (cropzoom.moveTop != null) {
		imageY = imageY - cropzoom.moveTop;
	}

	var imageX2 = imageX + imageW;
	var imageY2 = imageY + imageH;

	var obj = {
		imageX : imageX,
		imageY : imageY,
		imageX2 : imageX2,
		imageY2 : imageY2,
		imageW : imageW,
		imageH : imageH,
		imageZoomW : imageZoomW,
		imageZoomH : imageZoomH,
		rotation : rotation
	};

	return obj;
}
