//提示框信息样式
var tip = '<span style="color:#ff4400">\u25CF</span> {series.name}: <b>{point.y}</b><br/>';		
var opt = {
    chart: {
        renderTo: 'graphBox',
        type: 'line',
        margin: 25,
        height:300,
        marginLeft:60,
//		            borderWidth:1,
//		            spacingBottom:100,
        borderColor:"#ff4400",
        plotBackgroundColor:"#fff",
        style:{
        	fontFamily:"微软雅黑,serif",
        	overflow: "visible"
        }
    },
    tooltip:{//提示框
    	shared:true,
    	backgroundColor:'#333247',
    	borderColor:'#333247',
    	pointFormat:tip,
    	style:{
    		padding:"15px",
    		lineHeight:"20px",
    		color:"#fff"
    	}
    },
    exporting:{enabled: false}, 
	title: {text: ''},
    plotOptions: {
    	line:{ color:"#ff4400" }
    },
    xAxis: {//横坐标名称
        categories: [],
        labels:{
        	rotation:0,
        	step:4,
        	maxStaggerLines:1
        },
        offset:0
    },
    yAxis: {
    	title: ' ',
    	min:0,
    	startOnTick: true,
		labels: { format: '{value}' }
    },
    legend:{
    	title:{text:null},
    	y:50,
//					x:60,
    	verticalAlign: "bottom"
//			    	align:"right",
//			    	layout:"vertical"
    },
    series: [{ //数据值
    	name:'人数',
        data: []
    },{ 
    	name:'人数变化',
//		        	visible: false, //不显示
    	color:"rgba(255,255,255,0)",
        data: []
    }]
};

//虚拟数据
function createData( min, max, type){
	var old = 0;
	opt.series[0].data = [];
	opt.series[1].data = [];
	for(var i=0; i<32; i++){								
		var time = getDate(i,1);	
		var value = getRand( min,max );
		
		opt.xAxis.categories.push( time );
		opt.series[0].data.push( value );
		opt.series[1].data.push( value-old );					
		old = value;					
	}
	opt.series[0].name = type;
	opt.series[1].name = type+"变化";
}

		
//
var chart;	
//数据发生改变
function initChart(){			
	
	var type = $("div.select").find("span").text();
	if( type == "按金额查询" ){
		createData( 0,20000, "金额" );
	}else{
		createData( 5,40,"人数" );
	}
					
	chart = new Highcharts.Chart(opt);
	$("svg").children("text:last-child").remove();
}

$(function(){
	initChart();
	$("div.select").find("li").click(initChart);
});







