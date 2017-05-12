//用法
var jcropOption = {
	imgId : "",// 绑定的图片id
	minSize :0,
	maxSize :0,
	changeCallBack : null,// 截图变化回调
	selectCallBack : null// 截图完成回调

};

var screenshotMap = new Map();

/**
 * 初始化方法
 */
function ctl_initCrop(option) {

	var imgId = option.imgId;

	$('#' + imgId).Jcrop({
		onChange : function(imgArea) {
			if (option.changeCallBack != null) {
				option.changeCallBack(imgArea);
			}
		},
		onSelect : function(imgArea) {

			option.x = imgArea.x;
			option.y = imgArea.y;
			option.x2 = imgArea.x2;
			option.y2 = imgArea.y2;
			option.w = imgArea.w;
			option.h = imgArea.h;

			if (option.changeCallBack != null) {
				option.selectCallBack(imgArea);
			}
		},
		aspectRatio : 1,
		minSize :option.minSize,
		maxSize :option.maxSize
	}, function() {
		// 将截图配置和图片id缓存起来
		screenshotMap.put(imgId, this);
	});

}

/**
 * 获取截图x坐标
 * 
 * @param imgId
 *            图片id
 */
function ctl_getImageX(imgId) {
	var crop = screenshotMap.get(imgId);
	var select = crop.tellSelect();
	return select.x;
}

/**
 * 获取截图y坐标
 * 
 * @param imgId
 *            图片id
 */
function ctl_getImageY(imgId) {
	var crop = screenshotMap.get(imgId);
	var select = crop.tellSelect();
	return select.y;
}

/**
 * 获取截图x2坐标
 * 
 * @param imgId
 *            图片id
 */
function ctl_getImageX2(imgId) {
	var crop = screenshotMap.get(imgId);
	var select = crop.tellSelect();
	return select.x2;
}

/**
 * 获取截图y2坐标
 * 
 * @param imgId
 *            图片id
 */
function ctl_getImageY2(imgId) {
	var crop = screenshotMap.get(imgId);
	var select = crop.tellSelect();
	return select.y2;
}

/**
 * 获取截图宽度
 * 
 * @param imgId
 *            图片id
 */
function ctl_getImageWidth(imgId) {
	var crop = screenshotMap.get(imgId);
	var select = crop.tellSelect();
	return select.w;
}

/**
 * 获取截图高度
 * 
 * @param imgId
 *            图片id
 */
function ctl_getImageHeight(imgId) {
	var crop = screenshotMap.get(imgId);
	var select = crop.tellSelect();
	return select.h;
}

/**
 * 释放截图
 * 
 * @param imgId
 *            图片id
 */
function ctl_releaseImage(imgId) {
	var crop = screenshotMap.get(imgId);
	crop.release();
}

/**
 * 摧毁截图控件
 * 
 * @param imgId
 *            图片id
 */
function ctl_destroyImgCut(imgId) {
	var crop = screenshotMap.get(imgId);
	crop.destroy();
	screenshotMap.remove(imgId);
}

/**
 * 禁用截图控件
 * 
 * @param imgId
 *            图片id
 */
function ctl_disableImgCut(imgId) {
	var crop = screenshotMap.get(imgId);
	crop.disable();

}

/**
 * 启用截图控件
 * 
 * @param imgId
 *            图片id
 */
function ctl_enableImgCut(imgId) {
	var crop = screenshotMap.get(imgId);
	crop.enable();
}

/**
 * 设置截图位置
 * 
 * @param imgId
 *            图片id
 * @param array
 *            数组中存放截图的 x,y,x2,y2坐标
 */
function ctl_setSelect(imgId, array) {
	var crop = screenshotMap.get(imgId);
	crop.setSelect(array);
}

/**
 * 重设截图位置到 (可以看到动画效果)
 * 
 * @param imgId
 *            图片id
 * @param array
 *            数组中存放截图的 x,y,x2,y2坐标
 */
function ctl_animateTo(imgId, array) {
	var crop = screenshotMap.get(imgId);
	crop.animateTo(array);
}
