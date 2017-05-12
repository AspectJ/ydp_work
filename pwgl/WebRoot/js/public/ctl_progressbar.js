/**
 *显示进度条的函数
 *@param tagId 
 *		标签id
 *		该参数必填
 *@param percentage 
 *		设置进度条的百分比 如：50 
 *		该参数可选
 *		
 *@param config 
 *		设置初始化一个进度条，参数格式：{speed:15,showText: false, barImage: 'images/progressbg_red.gif'}
 *		该参数可选
 */
function ctl_initProgressbar(tagId,percentage,config){	
	$("#"+tagId).progressBar(percentage,config);
}