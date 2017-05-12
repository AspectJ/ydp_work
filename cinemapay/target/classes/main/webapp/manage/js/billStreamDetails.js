var page = 1;
var pagesize = 15;
var pagingsize = 3;
var sid = "";
$(document).ready(function() {
	var href = window.location.href;
	sid = href.substring(href.lastIndexOf("=") + 1);

	loadData();
	
	$(".operation button[class='exportExcel']").bind("click", function() {
		//导出为Excel表格
		window.location.href = service_url + "rest/file/exportExcel?sid=" + sid;
	});
});


function loadData(side) {
	page = pageUpDown(side);
	
	var params = {};
	params.pageSize = pagesize;
	params.page = page;
	params.sid = sid;
	
	ajaxRequest("settle/getBillStream", "POST", true, params, 
			function(data) {
				switch(data.result) {
					case 1000: 
						//显示数据
						echoData(data);
						break;
					default:
						break;
				}
			}, 
			null,
			loading(),
			loadover());
}



/**
 * 向消费明细table页面填充数据
 * @param data
 */
function echoData(data) {
	//初始化数据(清空数据)
	$(".consume_table table tr:not(:first)").remove();
	$(".data-tab-ul").empty();
	//如果有“暂无消费记录”，则清除
	$("body").find(".no_data").remove();
	
	var total = data.total;
	var resultData = data.data;
	
	$("#consumeTotal").html(total);
	
	if(resultData != null && resultData.length > 0) {
		for(var i = 0; i < resultData.length; i++) {
			//如果是储值卡，则消费次数显示为 '无'
			var cousumeCount = resultData[i].count;
			
			if(resultData[i].cardtype == "0") {
				resultData[i].cardtype = "次卡";
			}else if(resultData[i].cardtype == "1") {
				resultData[i].cardtype = "储值卡";
				//如果是储值卡，则消费次数显示为 '无'
				if(cousumeCount == "0" || typeof(cousumeCount) == "undefined") {
					cousumeCount = '无';
				}
			}
			var html_data  = "<tr>";
				html_data += "<td>"+ resultData[i].recordid +"</td>";
				html_data += "<td>"+ resultData[i].cardid +"</td>";
				html_data += "<td>"+ resultData[i].cardname +"</td>";
				html_data += "<td>"+ resultData[i].cardtype +"</td>";
				html_data += "<td>"+ resultData[i].online +"</td>";
				html_data += "<td>"+ resultData[i].theatername+"</td>";
				html_data += "<td>"+ cousumeCount +"</td>";
				html_data += "<td>"+ resultData[i].value +"</td>";
				html_data += "<td>"+ resultData[i].createtime +"</td>";
				html_data += "<td>"+ resultData[i].settleprice +"</td>";
				html_data += "</tr>";
			
			$(".consume_table table").append(html_data);
		}
		
		//权限控制
			var menu = localStorage.getItem("menuinfo");
			var menuinfo = JSON.parse(menu);
			console.log(menuinfo);
			if(menuinfo != null){
				for(var i=0;i<menuinfo.length;i++){
					var requesturl = menuinfo[i].requesturl;
					if(requesturl == "manager/settleManage.html"){
						var show = menuinfo[i].show;
						if(show != null){
							for(var j=0;j<show.length;j++){
								var label = show[j].requesturl;
								$("button."+label).show();  //导出为Excel
							}
						}
						break;
					}
				}
			}
			if(resultData.filename == '') {   //如果文件为空，则隐藏"下载附件"按钮
				$("button.downloadRes").hide()
			}
		
		var totalpage = parseInt(total % pagesize == 0 ? total / pagesize : total / pagesize + 1);
		//分页
		var pagingstr = loadPaging(totalpage, page, pagingsize, "loadData");
		$(".data-tab-ul").html(pagingstr);
	}else {
		var html = "<div class='no_data'>暂无消费记录</div>"
		$("div[class='page']").after(html);
	}
}

