var pageCount = 0;
var pageSize = 10;
var offsetNum = 0;

$(function() {
    // 初始化数据(显示第一页)
    InitData(0);
 
    // ★分页主函数(新闻类别ID，排序字段，排序类型，页大小，页索引，总条数)
    function InitData(pageindx) {
    	var url = requestUrl + "rest/notice/getNoticeList";
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
    							var noti_id = resultData[i].noti_id;
    							var noti_title = resultData[i].noti_title;
    							var create_time = resultData[i].create_time;
    							var noti_img = resultData[i].noti_img;
    							var noti_status = resultData[i].noti_status;
    							var noti_type = resultData[i].noti_type;
    							var author = resultData[i].author;
    							var brows_times = resultData[i].brows_times;
    							var audit_flag = resultData[i].audit_flag;
    							
    							if(audit_flag==1){
    								audit_flag = "通过";
    							}else{
    								audit_flag = "未通过";
    							}
    							
    							var row = i + 1;
    							var content = "<tr id='row_"+row+"'><td><input type='checkbox' name='check_notiid' id='check_"+noti_id+"' value='"+noti_id+"' datavalue='"+noti_img+"'/>";
    							content += "</td><td>"+noti_title+"</td><td>"+noti_type+"</td><td>"+noti_status+"</td><td>"+create_time+"</td><td>"+author+"</td><td>"+brows_times+"</td>";
    							content += "<td>" +audit_flag +"</td>";
    							content += "<td><a href='javascript:void(0);' onclick='showNoticeInfo("+noti_id+");'>查看</a>&nbsp;&nbsp;";
    							content += "<a href='javascript:void(0);' onclick='updateNoticeInfo("+noti_id+");'>修改</a>&nbsp;&nbsp;";
    							content += "<a href='javascript:void(0);' onclick='delNoticeInfo("+noti_id+","+noti_img+");'>删除</a></td><tr>";
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
    	window.parent.$("#mainFrame").attr("src","manager/noticeAdd.html");
	});
	
	//删除选中
	$(".delSelect").on("click",function(){
		if(window.confirm('你确定要删除选中的内容吗？')){
			var id = document.getElementsByName("check_notiid");
			var ids = "";
			if(id.length == 0){
				alert("请至少选中一条内容进行删除");return;
			}else{
				var count=0;
				for(var i=0;i<id.length; i++){              
					if(id[i].checked){
						ids = ids + id[i].value+",";
						count++;
					}                                
				}
				if(count==0){       
					alert("请至少选中一条内容进行删除");return;
				}else{
					//执行删除操作
					deleteChooseInfo(ids,1);
				}
			}
			
	    }else{
	       return false;
	    }
	});
 
});



function delNoticeInfo(id){
	if(window.confirm('你确定要删除此内容吗？')){
		deleteChooseInfo(id,0);
    }else{
       return false;
    }
}

function deleteChooseInfo(id,type){
	var url = "";
	if(type == 0){
		url = requestUrl + "rest/notice/deleteNotice";
	}else{
		url = requestUrl + "rest/notice/deleteNotices";
	}
	
	$.ajax({
		url : url,
		type : 'post',
		dataType : 'jsonp',
		data : {
			noti_id : id,
		},
		jsonp : "jsonpCallback",
		success : function(data) {
			var result = parseInt(data.result);
			switch(result){
				case 1000 :
					var resultData = data.data;
					alert("删除成功");
					window.parent.$("#mainFrame").attr("src","manager/noticeList.html");
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


function showNoticeInfo(id){
	window.parent.$("#mainFrame").attr("src","manager/noticeShow.html?noti_id="+id);
	
}

function updateNoticeInfo(id){
	window.parent.$("#mainFrame").attr("src","manager/noticeUpdate.html?noti_id="+id);
	
}
