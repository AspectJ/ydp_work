var pageCount = 0;
var pageSize = 10;
var offsetNum = 0;


$(function() {
    //getNewsInfoCount();
    // 初始化数据(显示第一页)
    InitData(0);
 
    // ★分页主函数(新闻类别ID，排序字段，排序类型，页大小，页索引，总条数)
    function InitData(pageindx) {
    	var url = requestUrl + "rest/cinema/getCinemaInfoList";
    	var num = 0;
    	var index = pageindx + 1;
    	if(index != 0){
    		num = (index - 1) * pageSize;
    	}
    	// Ajax取出分页列表数据
        $.ajax({
            type: "POST",
            cache: false,
            dataType: "json", // 数据格式:JSON
            url: url,
            data : {
    			pageSize : pageSize,
    			offsetNum : num
    		},
    		jsonp : "jsonpCallback",
    		success : function(data) {
    			var result = parseInt(data.result);
    			switch(result){
    				case 1000 :
    					var resultData = data.data;
    					pageCount = data.total;
    					
    					$("#Pagination").pagination(pageCount, {
    			            callback: pageselectCallback,
    			            prev_text: '« 上一页',
    			            next_text: '下一页 »',
    			            items_per_page: pageSize,     // 每页显示条数
    			            current_page: pageindx,  // 当前页索引,这里0为第一页
    			            num_display_entries: 3,  // 前面显示几个按钮
    			            num_edge_entries: 2  // 后面显示几个按钮
    			        });
    			        
    					$("#result tr:gt(0)").remove();
    					if(resultData != null && resultData.length > 0){
    						for (var i=0; i<resultData.length; i++) {
    							var cinemaid = resultData[i].cinemaid;
    							var name = resultData[i].name;
    							var profile = resultData[i].profile;
    							var philosophy = resultData[i].philosophy;
    							var customer_phone = resultData[i].customer_phone;
    							var customer_qq = resultData[i].customer_qq;
    							var customer_email = resultData[i].customer_email;
    							var address = resultData[i].address;
    							var author = resultData[i].author;
    							var remark = resultData[i].remark;
    							var create_time = resultData[i].create_time;
    							var update_time = resultData[i].update_time;
    							var row = i + 1;
    							var content = "<tr id='row_"+row+"'>";
    							// <td><input type='checkbox'  name='check_Cinemasid'  id='check_"+ cinemaid +"' value='"+cinemaid+"' datavalue='"+cinemaid+"'/></td>";
    							content += "<td>"+name+"</td><td>"+address+"</td><td>"+customer_phone+"</td>";
    							content += "<td>"+customer_email+"</td><td>"+author+"</td><td>"+remark+"</td>";
    							content += "<td><a href='javascript:void(0);' onclick='showCinemaInfo("+cinemaid+");'>查看</a>&nbsp;&nbsp;";
    						//	content += "<a href='javascript:void(0);' onclick='updateNewsInfo("+cinemaid+");'>修改</a>&nbsp;&nbsp;";
    							content += "<a href='javascript:void(0);' onclick='delCinema("+cinemaid+");'>删除</a></td><tr>";
    							content += "</td><tr>";
    							if(i == 0){
    								$("#row_title").after(content);
    							}else{
    								$("#row_"+i).after(content);
    							}
    						}
    					}
    					break;
    				case 1001 :
    					break;
    				default:
    					break;
    			}
    		},
 
        });
 
      //处理翻页,page_id为当前页索引(0为第一页)
        function pageselectCallback(page_id, jq) {
            InitData(page_id);
        }
        
        if(pageCount != 0){
        	// 加入分页插件的绑定，第一个参数pageCount为总共多少条数据
            $("#Pagination").pagination(3, {
                callback: pageselectCallback,
                prev_text: '« 上一页',
                next_text: '下一页 »',
                items_per_page: pageSize,     // 每页显示条数
                current_page: pageindx,  // 当前页索引,这里0为第一页
                num_display_entries: 3,  // 前面显示几个按钮
                num_edge_entries: 2  // 后面显示几个按钮
            });
        }
        
    } 
    
    
    $(".add").on("click", function(){
		var page = "manager/cinemaInfoAdd.html";
		window.parent.$("#mainFrame").attr("src",page);
	});
	
	//删除选中
	$(".delSelect").on("click",function(){
		
		//删除院线的功能不用做，从这条语句之后基本只改了一半，因为没含义了。直接弹出一个alert提示不能删除
		//  弹出完后直接返回 ，结束点击事件就行了。
		alert("不好意思，用户没有权限删除院线，如果非的要删除不可，那可以致电易得票客服，电话：400-677-8292");
		return ;
		if(window.confirm('你确定要删除选中的院线信息吗？')){
			var cinemaid = document.getElementsByName("check_Cinemasid");
			var cinemaid_ids = "";
			var cinemaid_imgs = "";
			if(cinemaid.length == 0){
				alert("请至少选中一条院线信息进行删除!");return;
			}else{
				var count=0;
				for(var i=0;i<cinemaid.length; i++){              
					if(cinemaid[i].checked){
						cinemaid_ids = cinemaid_ids + cinemaid[i].value+",";
						count++;
					}                                
				}
				if(count==0){       
					alert("请至少选中一条院线信息进行删除!!");return;
				}else{
					//执行删除操作
					delCinemaInfo(cinemaid_ids,1);
				}
			}
			
	    }else{
	       return false;
	    }
	});
 
});

function getNewsInfoCount(){
	var url = requestUrl + "rest/newsinfo/getNewsInfoCount";
    $.ajax({
        type: "POST",
        cache: false,
        dataType: "json", // 数据格式:JSON
        url: url,
        data : {},
		jsonp : "jsonpCallback",
		success : function(data) {
			var result = parseInt(data.result);
			switch(result){
				case 1000 :
					var resultData = data.data;
					pageCount = data.total;
					break;
				default:
					break;
			}
		},

    });
}


function delCinema(cinemaid){
	if(window.confirm('你确定要删除此院线信息吗？')){
		delCinemaInfo(cinemaid,0);
    }else{
       return false;
    }
}

function delCinemaInfo(cinemaid,type){
	var url = "";
	if(type == 0){
		url = requestUrl + "rest/company/deleteCompany";
	}else{
		url = requestUrl + "rest/company/deleteCompanys";
	}
	
	$.ajax({
		url : url,
		type : 'post',
		dataType : 'jsonp',
		data : {
			cinemaid : cinemaid
		},
		jsonp : "jsonpCallback",
		success : function(data) {
			var result = parseInt(data.result);
			switch(result){
				case 1000 :
					var resultData = data.data;
					alert("删除成功");
					var page = "manager/cinemaList.html";
					window.parent.$("#mainFrame").attr("src",page);
					break;
				case 1001 :
					break;
				default:
					break;
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		},
		timeout : 32000
	});
}


function showCinemaInfo(cinemaid){
// 下面这个被注释是因为checkbox 被废弃了，如果要启用checkbox复选按钮，那么下面这个注释要重新生效	
//	var checkedCinemaId = $("#check_"+ cinemaid +"").val();
	var checkedCinemaId = cinemaid;
	console.log(checkedCinemaId);
	var page = "manager/companyInfo.html?checkedCinemaId="+checkedCinemaId;
	window.parent.$("#mainFrame").attr("src",page);
	
}

function updateNewsInfo(cinemaid){
	var page = "manager/cinemaInfoUpdate.html?cinemaid="+cinemaid;
	window.parent.$("#mainFrame").attr("src",page);
	
}
