/**
 *  条形码参数配置
 *  divId:"bcTarget",	条形码显示区域divId
	code:"04421281000100000957",	条形码id
	type:"code128",		条形码类型(ean8, ean13, code11, code39, code128)
	barWidth: 1,	条码间隔宽度
    barHeight: 50,	条码高度
    moduleSize: 5,	取默认值
    showHRI: true,	是否显示条码内容
    addQuietZone: true,	是否显示边距
    marginHRI: 5,	条码内容和条码间宽
    bgColor: "#FFFFFF",	背景色
    color: "#000000",	条码颜色
    output: 'css',输出格式，默认css    格式为：bmp、svg、css
    fontSize: 10	字体大小
 */

function ctl_barcode(settings){
	if(settings.type=='' || typeof(settings.type)=='undefined'){
		settings.type='code128';
	}
	if(settings.barWidth=='' || typeof(settings.barWidth)=='undefined'){
		settings.barWidth=1;
	}
	if(settings.barHeight=='' || typeof(settings.barHeight)=='undefined'){
		settings.barHeight=50;
	}
	if(settings.moduleSize=='' || typeof(settings.moduleSize)=='undefined'){
		settings.moduleSize=5;
	}
	if(settings.showHRI=='' || typeof(settings.showHRI)=='undefined'){
		settings.showHRI=true;
	}
	if(settings.addQuietZone=='' || typeof(settings.addQuietZone)=='undefined'){
		settings.addQuietZone=true;
	}
	if(settings.marginHRI=='' || typeof(settings.marginHRI)=='undefined'){
		settings.marginHRI=5;
	}
	if(settings.bgColor=='' || typeof(settings.bgColor)=='undefined'){
		settings.bgColor='#FFFFFF';
	}
	if(settings.color=='' || typeof(settings.color)=='undefined'){
		settings.color='#000000';
	}
	if(settings.fontSize=='' || typeof(settings.fontSize)=='undefined'){
		settings.fontSize=10;
	}
	if(settings.output=='' || typeof(settings.output)=='undefined'){
		settings.output='css';
	}
	$("#"+settings.divId).barcode(settings.code,settings.type,settings);
}