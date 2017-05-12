var page = 1;
var pagesize = 10;
var pagingsize = 3;
var currentpage = 1;


function loadData(side){
	var cardtype = $("#cardtype").val();
	page = pageUpDown(side);
	var param = {};
	param.page = page;
	param.pagesize = pagesize;
	param.search = encodeURIComponent($(".filter_input").val());
	param.cardconfid = $("#cardconfid").val();
	ajaxRequest("card/getCardList", "GET", false, param,
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
							var cardinfo = dataList[i];
							var dataJson = {};
							dataJson.cardnumber = cardinfo.cardnumber;
							if(cardtype == "0"){
								dataJson.count = cardinfo.count;
								dataJson.restcount = cardinfo.restcount;
								dataJson.restvalue = cardinfo.value;
							}else if(cardtype == "1"){
								dataJson.count = cardinfo.value;
								dataJson.restvalue = cardinfo.restvalue;
							}
							dataJson.starttime = cardinfo.starttime+" 至 "+cardinfo.endtime;
							dataJson.cardstatus = cardinfo.cardstatusname;
							dataJson.operatorid = cardinfo.operatorid;
							dataJson.modifytime = cardinfo.modifytime;
							var opreator = "";
							if(cardConfPer.indexOf("cardStatus")>-1){
								if(cardinfo.cardstatus == "1"){
									opreator += '<i class="disable">禁用卡号</i>';
								}else if(cardinfo.cardstatus == "2"){
									opreator += '<i class="enable">启用卡号</i>';
								}
								dataJson.opreator = opreator;
							}
							dataArr.push(dataJson);
						}
						$(".data-tab tr").not(":first").remove();
						pushJsonData(".data-tab table", dataArr);
						var pagingstr = loadPaging(totalpage, page, pagingsize, "loadData");
						$(".data-tab-ul").html(pagingstr);
					}
					break;
				case 1204 :
					$(".data-tab tr").not(":first").remove();
					break;
				case 1205 :
					$(".data-tab tr").not(":first").remove();
					break;
				case 9997 :
					$(".data-tab tr").not(":first").remove();
					errorTip("提示",data.msg);
					break;
				default:
					$(".data-tab tr").not(":first").remove();
					errorTip("提示","请求超时，请稍后重试");
					break;
			}
		}
		, null, function(){
			loading();
			var table_head = "";
			if(cardtype == "0"){
				table_head = "<tr><th>卡号</th><th>总次数</th><th>剩余次数</th><th>面值</th><th>有效期</th><th>状态</th><th>操作人</th><th>更新时间</th>";
			}else if(cardtype == "1"){
				table_head = "<tr><th>卡号</th><th>总面值</th><th>剩余金额</th><th>有效期</th><th>状态</th><th>操作人</th><th>更新时间</th>";
			}
			if(cardConfPer.indexOf("cardStatus")>-1){
				table_head = table_head + "<th>操作</th></tr>";
			}else{
				table_head = table_head + "</tr>";
			}
			$(".data-tab table").append(table_head);
		},
		function(){
			loadover(); // 加载完成
			
			$(".disable").on("click", function(){//禁用
        		var cardid = dataList[$(this).parents("tr").attr("index")].cardid;
        		var cardnumber = dataList[$(this).parents("tr").attr("index")].cardnumber;
        		var info = "确定禁用卡号["+cardnumber+"]？";
        		confirmshowMsg(info,9,cardid,cardnumber);
        	});
        	
        	$(".enable").on("click", function(){//启用
        		var cardid = dataList[$(this).parents("tr").attr("index")].cardid;
        		var cardnumber = dataList[$(this).parents("tr").attr("index")].cardnumber;
        		var info = "确定启用卡号["+cardnumber+"]？";
        		confirmshowMsg(info,10,cardid,cardnumber);
        	});
			
        	currentpage = $(".data-tab-ul li[class='cur']").text();
        	if(currentpage == "" || currentpage == undefined){
        		currentpage = 1;
        	}
        }
		
	);
}



$(function(){
	$("#back").on("click",function(){
		var page = "manager/cardConfList.html";
		window.parent.$("#mainFrame").attr("src",page);
	});
	
	$("#exportCardInfo").on("click",function(){
		loading();
		var url = service_url + "rest/card/exportCard";
		$.post( url,{cardconfid : cardconfid},function(data) {
			loadover();
			var retjson=$.parseJSON(data);
			var result = parseInt(retjson.result);
			if(result == 1000){
	        	var path = retjson.path;
	        	window.location.href=path;
	        }else if(result == 1205){
	        	errorTip("提示","卡号信息不存在");
	        	return;
	        }else if(result == 1204){
	        	errorTip("提示","导出卡号信息失败");
	        	return;
	        }else if(result == 1208){
	        	errorTip("提示","暂未生成卡号");
	        	return;
	        }else if(result == 9997){
	        	errorTip("提示",retjson.msg);
	        	return;
	        }else{
	        	errorTip("提示","请求超时，请稍后重试");
	        	return;
	        }
		});
	});
});

function changeCardStatus(cardid,cardnumber,status){
	var url = service_url + "rest/card/changeCardStatus";
	$.post( url,{cardid : cardid,cardnumber : cardnumber,status : status },function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	if(status == 1){
        		errorTip("提示","已启用卡号");
        	}else if(status == 2){
        		errorTip("提示","已禁用卡号");
        	}
        	setTimeout(function(){
        		loadData(currentpage);
        	}, 2000);
        }else if(result == 1208){
        	errorTip("提示","请稍后重试");
        	return;
        }else if(result == 1202){
        	errorTip("提示","更改状态失败，请稍后重试");
        	return;
        }else if(result == 9997){
        	errorTip("提示",retjson.msg);
        	return;
        }else{
        	errorTip("提示","请求超时，请稍后重试");
        	return;
        }
	});	
}

