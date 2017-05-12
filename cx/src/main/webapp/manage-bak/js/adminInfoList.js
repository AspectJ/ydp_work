var pageCount = 0;
var pageSize = 10;
var offsetNum = 0;

$(function() {
    // 初始化数据(显示第一页)
    InitData(0);
    
    function InitData(pageindx) {
    	var url = requestUrl + "rest/adminInfo/selAllAdmin";
    	var num = 0;
    	var index = pageindx + 1;
    	if(index != 0){
    		num = (index - 1) * pageSize;
    	}
    	
    	$.ajax({
    		type: "POST",
    		url: url,
    		cache: false,
    		dataType: "json",
    		data: {
    			pageSize: pageSize,
    			offsetNum: num
    		},
    		jsonp: "jsonpCallback",
    		success: function(data) {
    			var result = parseInt(data.result);
    			switch(result) {
    				case 1000:
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
    					if(resultData != null && resultData.length > 0) {
    						for(var i = 0; i < resultData.length; i++) {
    							var adminname = resultData[i].adminname;
    							var adminid = resultData[i].adminid;
    							var cinemaname = resultData[i].cinemaname;
    							if(typeof(cinemaname) == "undefined") {
    								cinemaname = "";
    							}
    							
    							var create_time = resultData[i].create_time;
    							var last_login_time = resultData[i].last_login_time;
    							var nickname = resultData[i].nickname;
    							var state = resultData[i].state;
    							if(state == 1) {
    								state = "可用";
    							}else {
    								state = "禁用";
    							}
    							
    							var row = i + 1;
    							var content = "<tr id='row_"+row+"'><td><input type='checkbox' name='check_adminid' id='check_"+adminid+"' value='"+adminid+"'/>";
    							content += "</td><td>"+adminname+"</td><td>"+nickname+"</td><td>"+cinemaname+"</td>";
    							content += "<td>"+create_time+"</td><td>"+last_login_time+"</td><td>"+state+"</td>";
    							content += "<td><a href='javascript:void(0);' onclick='showAdminInfo("+adminid+");'>查看</a>&nbsp;&nbsp;";
    							content += "<a href='javascript:void(0);' onclick='updateAdminInfo("+adminid+");'>修改</a></td><tr>";
//    							content += "<a href='javascript:void(0);' onclick='delAdminInfo("+adminid+");'>删除</a></td><tr>";
    							if(i == 0){
    								$("#row_title").after(content);
    							}else{
    								$("#row_"+i).after(content);
    							}
    						}
    					} 
    					break;
    				case 1001:
    					break;
    				default:
    					break;
    			}
    		}
    	});
    	
        //处理翻页,page_id为当前页索引(0为第一页)
        function pageselectCallback(page_id, jq) {
            InitData(page_id);
        }
/*        if(pageCount != 0){
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
        }*/
    }
});

/*添加管理员 */
$(".add").on("click", function(){
	var page = "auser/adminAdd.html";
	window.parent.$("#mainFrame").attr("src",page);
});
	

//删除管理员
//function delAdminInfo(admins_id){
//	if(window.confirm('你确定要删除该条管理员信息吗？')){
//		delAdmin(admins_id,0);
//    }else{
//       return false;
//    }
//}

//function delAdmin(admin_id, type) {
//	var url = "";
//	if(type == 0){
//		url = requestUrl + "rest/adminInfo/deleteAdminInfo";
//	}else{
//		url = requestUrl + "rest/adminInfo/deleteAdminInfos";
//	}
//	
//	$.ajax({
//		url : url,
//		type : 'POST',
//		dataType : 'json',
//		data : {
//			admin_id : admin_id
//		},
//		jsonp : "jsonpCallback",
//		success : function(data) {
//			var result = parseInt(data.result);
//			switch(result){
//				case 1000 :
//					var resultData = data.data;
//					alert("删除成功");
//					var page = "auser/adminInfoList.html";
//					window.parent.$("#mainFrame").attr("src",page);
//					break;
//				default:
//					break;
//			}
//		},
//		error : function(XMLHttpRequest, textStatus, errorThrown) {
//		},
//		timeout : 32000
//	});
//}

	
//删除选中（批量删除）
//$(".delSelect").on("click",function(){
//	if(window.confirm('你确定要删除选中的新闻信息吗？')){
//		var admin_id = document.getElementsByName("check_adminid");
//		var admin_ids = "";
//		if(admin_id.length == 0){
//			alert("请至少选中一条新闻信息进行删除");return;
//		}else{
//			var count=0;
//			for(var i=0;i<admin_id.length; i++){              
//				if(admin_id[i].checked){
//					admin_ids = admin_ids + admin_id[i].value+",";
//					count++;
//				}                                
//			}
//			if(count==0){       
//				alert("请至少选中一条新闻信息进行删除");return;
//			}else{
//				//执行删除操作
//				delAdmin(admin_ids,1);
//			}
//		}
//		
//    }else{
//       return false;
//    }
//});

//修改用户信息
function updateAdminInfo(adminid) {
	var page = "auser/adminInfoUpdate.html?adminid="+adminid;
	window.parent.$("#mainFrame").attr("src", page);
}

function showAdminInfo(adminid) {
	var page = "auser/adminInfoShow.html?adminid="+adminid;
	window.parent.$("#mainFrame").attr("src", page);
}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	