var pageCount = 0;
var pageSize = 10;
var offsetNum = 0;

$(function() {
    // 初始化数据(显示第一页)
    InitData(0);
 
    // ★分页主函数(新闻类别ID，排序字段，排序类型，页大小，页索引，总条数)
    function InitData(pageindx) {
    	var url = requestUrl + "rest/activity/getActivityList";
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
            data : {pageSize : pageSize, offsetNum : num},
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
    							var acti_id = resultData[i].acti_id;
    							var acti_title = resultData[i].acti_title;
    							var acti_status = resultData[i].acti_status;
    							var create_time = resultData[i].create_time;
    							var start_time = resultData[i].start_time;
    							var end_time = resultData[i].end_time;
    							var author = resultData[i].author;
    							var brows_times = resultData[i].brows_times;
    							var acti_img = resultData[i].acti_img;
    							var audit_flag = resultData[i].audit_flag;
    							
    							if(audit_flag==1 || audit_flag == true){
    								audit_flag = "通过";
    							}else{
    								audit_flag = "未通过";
    							}
    							
    							var row = i + 1;
    							var content = "<tr id='row_"+row+"'><td><input type='checkbox' name='check_actiid' id='check_"+acti_id+"' value='"+acti_id+"' datavalue='"+acti_img+"'/>";
    							content += "</td><td>"+acti_title+"</td><td>"+acti_status+"</td><td>"+start_time+"至"+end_time+"</td>";
    							content += "<td>"+create_time+"</td><td>"+author+"</td><td>"+brows_times+"</td>";
    							content += "<td>" +audit_flag+ "</td>";
    							content += "<td><a href='javascript:void(0);' onclick='showActivity("+acti_id+");'>查看</a>&nbsp;&nbsp;";
    							content += "<a href='javascript:void(0);' onclick='updateActivity("+acti_id+");'>修改</a>&nbsp;&nbsp;";
    							content += "<a href='javascript:void(0);' onclick='delActivity("+acti_id+","+acti_img+");'>删除</a></td><tr>";
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
    	var page = "manager/activityAdd.html";
		window.parent.$("#mainFrame").attr("src",page);
	});
	
	//删除选中
	$(".delSelect").on("click",function(){
		if(window.confirm('你确定要删除选中的最新活动吗？')){
			var acti_id = document.getElementsByName("check_actiid");
			var acti_ids = "";
			var acti_imgs = "";
			if(acti_id.length == 0){
				alert("请至少选中一条最新活动进行删除");return;
			}else{
				var count=0;
				for(var i=0;i<acti_id.length; i++){              
					if(acti_id[i].checked){
						acti_ids = acti_ids + acti_id[i].value+",";
						acti_imgs = acti_imgs + $("#check_"+acti_id[i].value).attr("datavalue")+",";
						count++;
					}                                
				}
				if(count==0){       
					alert("请至少选中一条活动信息进行删除");return;
				}else{
					//执行删除操作
					delActi(acti_ids,acti_imgs,1);
				}
			}
			
	    }else{
	       return false;
	    }
	});
 
});

function delActivity(acti_id,acti_img){
	if(window.confirm('你确定要删除此新闻信息吗？')){
		delActi(acti_id,acti_img,0);
    }else{
       return false;
    }
}

function delActi(acti_id,acti_img,type){
	var url = "";
	if(type == 0){
		url = requestUrl + "rest/activity/deleteActivity";
	}else{
		url = requestUrl + "rest/activity/deleteActivitys";
	}
	
	$.ajax({
		url : url,
		type : 'post',
		dataType : 'jsonp',
		data : {
			acti_id : acti_id,
			imageid : acti_img
		},
		jsonp : "jsonpCallback",
		success : function(data) {
			var result = parseInt(data.result);
			switch(result){
				case 1000 :
					var resultData = data.data;
					//alert("删除成功");
					var page = "manager/activityList.html";
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

function showActivity(acti_id){
	var page = "manager/activityShow.html?acti_id="+acti_id;
	window.parent.$("#mainFrame").attr("src",page);
	
}

function updateActivity(acti_id){
	var page = "manager/activityUpdate.html?acti_id="+acti_id;
	window.parent.$("#mainFrame").attr("src",page);
	
}



