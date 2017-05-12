var page = 1;
var pagesize = 10;
var pagingsize = 3;
var currentpage = 1;

$(function() {
	updateStatus();
	loadData(1);
	
	$("#startTime").click(function(){
		WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',minDate:'',maxDate:'#F{$dp.$D(\'endTime\')}'});
	});
	
	$("#endTime").click(function(){
		WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',minDate:'#F{$dp.$D(\'startTime\')}',maxDate:new Date()});
	});
});

function loadData(side){
	page = pageUpDown(side);
	var param = {};
	param.page = page;
	param.pagesize = pagesize;
	param.startTime = $("#startTime").val();
	param.endTime = $("#endTime").val();
	param.search = encodeURIComponent($(".filter_input").val());
	ajaxRequest("log/getLogList", "GET", false, param, 
			function(data) {
			var result = data.result;
			switch (result) {
				case 1000:
					var dataArr = [];
					dataList = data.data;
					var total = data.total;
					var totalpage = parseInt(total % pagesize == 0 ? total / pagesize : total / pagesize + 1);
					if(dataList != null && dataList.length > 0){
						for (var i=0; i<dataList.length; i++) {
							var loginfo = dataList[i];
							var dataJson = {};
							var id = "<a href='javascript:void(0);' class='id'><font color='red'>"+loginfo.logid+"</font></a>";
							dataJson.logid =  id;
							dataJson.log_type =  loginfo.log_type_name;
							if(usertheaternum == "0"){
								$("#ssTheater").show();
								dataJson.theatername = loginfo.theatername;
							}
							dataJson.username = loginfo.username;
							dataJson.log_status = loginfo.log_status_name;
							dataJson.operator_time = loginfo.operator_time;
							dataJson.log_content = loginfo.log_content;
							dataArr.push(dataJson);
						}
						$(".data-tab tr").not(":first").remove();
						pushLogData(".data-tab table", dataArr);
						var pagingstr = loadPaging(totalpage, page, pagingsize, "loadData");
						$(".data-tab-ul").html(pagingstr);
					}
					break;
				case 1204 :
					$(".data-tab tr").not(":first").remove();
					errorTip("提示","查询日志列表失败，请稍后重试");
					break;
				case 1205 :
					$(".data-tab tr").not(":first").remove();
					errorTip("提示","日志列表信息不存在");
					break;
				default:
					$(".data-tab tr").not(":first").remove();
					errorTip("提示","请求超时，请稍后重试");
					break;
			}
		}
		, null, null,
		function(){
			
			$(".id").on("click",function(){
				var logid = dataList[$(this).parents("tr").attr("index")].logid;
				showLogInfo(logid);
			});
        	
        	currentpage = $(".data-tab-ul li[class='cur']").text();
        	if(currentpage == "" || currentpage == undefined){
        		currentpage = 1;
        	}
        }
		
	);
}


function updateStatus(){
	var url = service_url + "rest/log/logStatus";
	$.post( url,{},function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	
        }
	});
}

function showLogInfo(logid){
	var page = "manager/logInfoShow.html?logid="+logid;
	window.parent.$("#mainFrame").attr("src",page);
}

function getLogInfo(logid){
	var url = service_url + "rest/log/getLog";
	$.post( url,{logid : logid },function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
		if(result == 1000){
        	var resultData = retjson.data;
        	$("#logtype").html(resultData.log_type_name);
        	$("#theatername").html(resultData.theatername);
        	$("#username").html(resultData.username);
        	//$("#logstatus").html(resultData.log_status_name);
        	$("#time").html(resultData.operator_time);
        	$("#content").html(resultData.log_content);
        	$("#ip").html(resultData.ip);
        }else if(result == 1205){
        	errorTip("提示","日志信息不存在");
        	return;
        }else if(result == 1204){
        	errorTip("提示","查询日志信息失败");
        	return;
        }
	});
}


function pushLogData(){
	if(arguments.length<1){return;}	
	//容器
	var selector = arguments[0]; 
	var jsondata = arguments[1];
	var count = jsondata.length;
	var tr = "";
	for(var n=0; n<count; n++){
		tr += "<tr index="+ n +">";
		var obj = jsondata[n];
		for( var name in obj ){		
			tr += "<td>"+ obj[name] + "</td>";
		}
		tr += "</tr>";
	}
	$(selector).append( tr );
}
