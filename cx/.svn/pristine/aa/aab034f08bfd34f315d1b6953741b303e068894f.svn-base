//请求数据的服务器地址
var requestUrl = "http://localhost:8081/cx/";


$(function(){
	
	//没有登陆的话强制跳转到登陆页面
	checkIsLogin();
	
	//下拉框
	$(".select").find("li").on("click", function(){
		$(this).parents(".select").find("p>span").text( $(this).text() );
		$(this).parent().hide(0);
	});
		
	//下拉和删除
	//select_del();
});

//获取日期
function getDate( n,hasY, d ){
	
	d = d || new Date();
	d.setDate( d.getDay()+n );
	var y = d.getFullYear();
	var m = d.getMonth()+1;
	var day = d.getDate();
	
	var result = fill(m)+'-'+fill(day);
	result = hasY ? (y+'-')+result : result;
	return result;
}
function fill( m ){
	return m<10?"0"+m: m;
}

//指定随机数
function getRand( min, max ){
	return Math.floor( Math.random()*(max-min)+min );
}

//动态添加数据
function pushData(){
	
	if(arguments.length<1){return;}	
	//容器
	var selector = arguments[0]; 
	var count = arguments[1];
	var column = arguments.length;
	var tr = "";
	for(var n=0; n<count; n++){
		tr += "<tr>";
		for( var i=2; i<column; i++ ){
			var val = arguments[i];			
			tr += "<td";
			if( val.indexOf("||")!=-1 ){
				tr += " class='"+val.split("||")[0]+"'";
				val = val.split("||")[1];
			}
			tr += ">" + val + "</td>";
		}
		tr += "</tr>";
	}
	$(selector).append( tr );
	select_del();
}


//动态添加json数据
function pushJsonData(){
	
	if(arguments.length<1){return;}	
	//容器
	var selector = arguments[0]; 
	var jsondata = arguments[1];
	var count = jsondata.length;
	var tr = "";
	for(var n=0; n<count; n++){
		tr += "<tr>";
		var obj = jsondata[n];
		for( var name in obj ){		
			tr += "<td";
			if( obj[name].indexOf("||")!=-1 ){
				tr += " class='"+obj[name].split("||")[0]+"'";
				obj[name] = obj[name].split("||")[1];
			}
			tr += ">" + obj[name] + "</td>";
		}
		tr += "</tr>";
	}
	$(selector).append( tr );
	select_del();
}



//选中、编辑、删除
var $curTr = null; // 当前编辑行
function select_del(){		
	//删除
	$(".del").on("click", function(){		
		showMsg("是否删除该信息?", "remind", $(this).parents("tr"));
	});
	
	
	//信息编辑
	$(".edit").on( "click", function(){				
		//先取消其他编辑状态行
		if( $curTr ){ cancelEdit($(window)); }
		
		$curTr = $(this).parents("tr");
		$curTr.attr( "data-cur", 1 );
		$curTr.css( "border", "1px dashed #ff4400");
		var $tds = $curTr.find("td:not(.state)");
		$tds.prop( "contenteditable", true );
		$(this).parent().removeAttr( "contenteditable" );
		//是否去除第一个
		if($tds.eq(0).find("i,span").size()>0){
			$tds.eq(0).removeAttr( "contenteditable" );
		}
		return false;
	} );
	//取消编辑
	$("table.data-tab").find("tr").on( "click", function(){ cancelEdit($(this)); });
	
	//选中
	$(".check").click(function(){
		if($(this).hasClass("checked")){
			$(this).removeClass("checked");
		}else{
			$(this).addClass("checked");
		}
	});
}
//取消编辑方法
function cancelEdit( $obj ){		
	if( $curTr!=null && $obj.attr("data-cur")!=1){
	$curTr.removeAttr("data-cur");
	$curTr.css("border", "none");
	$curTr.find("td:gt(0)").removeAttr( "contenteditable" );
		$curTr = null;
	}
}
	


//上传文件
function clickUpFile( source, aim, aim1 ){
	//打开文件
	$(aim).on("focus click", function(){
		$(source)[0].click();
	});
	if(aim1){
		$(aim1).on("focus click", function(){
			$(source)[0].click();
		});
	}
	$(source).on("change",function(){
		$(aim).val( this.value );
	});
}


//显示信息
function showMsg( info, type, $obj ){
	type = type || "success";  	
	
	var $show = $("#showMsg");
	var isExsit = $show.size() > 0;
	if(isExsit){
		var $msg = $show.find(".msg");
		$msg.attr( "class", "msg "+type ).text(info);
		$show.fadeIn(200);
		return;
	}
	//不存在，添加
	var rgba = "<div class='msg "+type+"'><p><i></i>"+info+"</p>";
	if( type == "remind" ){
		rgba += "<p class='btn-p'><span class='sure'>是</span><span class='deny'>否</span></p>";
	}
	rgba +="</div>";
	rgba = "<div class='rgba op3' id='showMsg'>"+rgba +"</div>";
	$('body').append( rgba );
	
	$show = $("#showMsg");
	$show.fadeIn(200);	
	if( type == "success" ){ //成功提示，自动退出		
		removeEle( 2000, 200, $show );
		return;
	}
	
	//确认框
	if( type == "remind" ){
		$(".sure").on("click", function(){
			removeEle( 50, 200, $show, function(){
				//移除元素
				$obj.fadeOut(200,function(){
					$(this).remove();
				});	
			});
			
		});
		$(".deny").on("click", function(){
			removeEle( 50, 200, $show );
		});
	}
}

//移除元素
function removeEle( delaytime, timespan, $obj, fn ){
	$obj.delay( delaytime ).fadeOut( timespan, function(){
		$(this).remove();
		fn && fn();
	});
}


//-----------------------------------------------------------

//导航栏更多
function navMore(){
	
	$("#more-select").find("li").off("click");
	$("#more-select").on("click", "li",  function(){
		var curTxt = $(this).text();
		var link = $(this).attr( "link" );
		var arr = [];
		var $th = $("#data-tab-title").find("th:not(.normal)");						
		$th.each(function(){
			arr.push( $(this).html() );
		});
		arr.unshift( "<a href='"+link+"'>"+curTxt+"</a>" );
		
		var last = arr.pop();
		var href = $( last ).attr( "href" );
		var txt =  $( last ).text();
						
		//更改横向导航
		var i=0;
		$th.each(function(){
			$(this).html( arr[i] );
			//根据内容涉及宽度
			var len = $(arr[i]).text().length; 
			if( $(arr[i]).text().length>3 ){
				$(this).css( "width", len*20 ); //一个文字占16像素
			}else{
				$(this).css( "width", "auto" );
			}
			
			i++;
		});
		//移除本身
		$(this).parents("ul").append( "<li link='"+href+"'>"+txt+"</li>" );	
		$(this).remove();	
	});
	
}

//判断是否登陆，如果没有登陆（adminid=null）就跳转到登陆页面
function checkIsLogin(){
	//获取当前页面完整url
	var url = window.location.protocol + "//" + window.location.host + window.location.pathname ;
	var loginhtmlurl = "login.html";
	var abspath = window.location.protocol + "//" + window.location.host + "/cx/manage/" + loginhtmlurl ;
	if(url != abspath) {
	var adminid = sessionStorage.getItem("adminid");
	
	if(adminid==null || adminid =="null"|| adminid==""|| adminid=="undefine"|| adminid=="undefined")
		{
			window.location.href=abspath;
		}
	}
}

//获取URL地址栏里面的参数（www.123.com?id=3，这里取得是id的值,并且需要 new UrlSearch() 来调用它）
//这里我是在顶部声明了一个全局变量 var Request = new UrlSearch() ; 
//具体调用就是Request.这里填？后面的属性。然后就可以得到这个属性的值
function UrlSearch()
{
 var name,value;
 var str=location.href; //取得整个地址栏
 var num=str.indexOf("?")
 str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

 var arr=str.split("&"); //各个参数放到数组里
 for(var i=0;i < arr.length;i++){
  num=arr[i].indexOf("=");
  if(num>0){
   name=arr[i].substring(0,num);
   value=arr[i].substr(num+1);
   this[name]=value;
   }
  }
}
//alert(Request.checkedCinemaId);

//判断输入的EMAIL格式是否正确    


/**
 * *************************************************************
 *   ----------------------   获取参数   ------------------------- 
 * *************************************************************
 */
function getPramStr(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}





