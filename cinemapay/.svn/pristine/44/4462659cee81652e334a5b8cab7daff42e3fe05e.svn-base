var page = 1;
var pagesize = 10;
var pagingsize = 3;
var currentpage = 1;

$(function() {
	$("#countCard").addClass("cur");
	$("#cardtype").val(0);
	
	var header_nav = '',
	    url_status = window.location.href.split('status=');
	status = url_status[1];
	
	switch(status){
		case '0':
			header_nav = '发行卡券';
			break;
		case '1':
			header_nav = '次卡查询';
			$("#cardtype").val(0);
			$(".data-tab table").html("");
			break;
		case '2':
			header_nav = '储值卡查询';
			$("#cardtype").val(1);
			$(".data-tab table").html("");
			break;
		default:
	}
	loadData(1);
	$('.content-title span').html('您当前位置：首页/' + header_nav);
	
    $("#addCardConf").on("click", function(){
    	var page = "manager/cardConfAdd.html";
		window.parent.$("#mainFrame").attr("src", page);
	});
	
});

function loadData(side){
	page = pageUpDown(side);
	var param = {};
	param.page = page;
	param.pagesize = pagesize;
	param.search = encodeURIComponent($(".filter_input").val());
	param.cardtype = $("#cardtype").val();
	ajaxRequest("cardConf/getCardConfList", "GET", false, param, 
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
							var cardconfinfo = dataList[i];
							var dataJson = {};
							dataJson.cardname = cardconfinfo.cardname;
							dataJson.cardtype = cardconfinfo.cardtype_name;
							if($("#cardtype").val() == 0){
								dataJson.count = cardconfinfo.count;
							}
							dataJson.value = cardconfinfo.value;
							dataJson.starttime = cardconfinfo.starttime+" 至 "+cardconfinfo.endtime;
							dataJson.quantity = cardconfinfo.quantity;
							dataJson.status = cardconfinfo.status_name;
							dataJson.createtime = cardconfinfo.createtime;
							dataJson.operatorid = cardconfinfo.operatorid;
							var opreator = "";
							opreator += '<i class="get">查看</i>';
							if(cardconfinfo.status == "0"){//未生成卡号
								if(cardConfPer.indexOf("updateCardConf")>-1){
									opreator += '<i class="edit">修改</i>';
								}
								if(cardConfPer.indexOf("deleteCardConf")>-1){
									opreator += '<i class="del">删除</i>';
								}
								if(cardConfPer.indexOf("createCard")>-1){
									if(cardconfinfo.ifover == "0"){
										opreator += '<i class="create">生成卡号</i>';
									}
								}
							}else{
								if(cardConfPer.indexOf("showCardInfo")>-1){
									opreator += '<i class="showcard">查看卡号</i>';
								}
								if(cardConfPer.indexOf("cardConfStatus")>-1){
									if(cardconfinfo.status == "1"){
										opreator += '<i class="disable">禁用批次</i>';
									}else if(cardconfinfo.status == "2"){
										opreator += '<i class="enable">启用批次</i>';
									}
								}
							}
							dataJson.opreator = opreator;
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
			if($("#cardtype").val() == "0"){
				table_head = '<tr><th>卡券名</th><th>类型</th><th>次数</th><th>面值</th><th>有效期</th><th>数量(张)</th><th>卡号状态</th><th>创建时间</th><th>操作员</th><th>操作</th></tr>';
			}else{
				table_head = '<tr><th>卡券名</th><th>类型</th><th>面值</th><th>有效期</th><th>数量(张)</th><th>卡号状态</th><th>创建时间</th><th>操作员</th><th>操作</th></tr>';
			}
			$(".data-tab table").append(table_head);
		},
		function(){
			loadover(); // 加载完成
        	//查看
			$(".get").on("click",function(){
				var cardconfid = dataList[$(this).parents("tr").attr("index")].cardconfid;
				
				showCardConf(cardconfid);
			});
			$(".edit").on("click",function(){
				var cardconfid = dataList[$(this).parents("tr").attr("index")].cardconfid;
				editCardConf(cardconfid);
			});
			$(".del").on("click",function(){
				var cardconfid = dataList[$(this).parents("tr").attr("index")].cardconfid;
				var cardname = dataList[$(this).parents("tr").attr("index")].cardname;
				var info = "确定删除["+cardname+"]？";
				confirmshowMsg(info,6,cardconfid,cardname);
				
			});
        	$(".create").on("click", function(){
        		var cardconfid = dataList[$(this).parents("tr").attr("index")].cardconfid;
        		var cardname = dataList[$(this).parents("tr").attr("index")].cardname;
        		var quantity = dataList[$(this).parents("tr").attr("index")].quantity;
        		var info = "确定给["+cardname+"]生成["+quantity+"]张卡？";
				confirmshowMsg(info,7,cardconfid,cardname);
        	});
        	
        	$(".showcard").on("click", function(){
        		var cardconfid = dataList[$(this).parents("tr").attr("index")].cardconfid;
        		var cardname = dataList[$(this).parents("tr").attr("index")].cardname;
        		var cardtype = dataList[$(this).parents("tr").attr("index")].cardtype;
        		showCardInfo(cardconfid,cardname,cardtype);
        	});
        	
        	$(".disable").on("click", function(){//禁用
        		var cardconfid = dataList[$(this).parents("tr").attr("index")].cardconfid;
        		var cardname = dataList[$(this).parents("tr").attr("index")].cardname;
        		var info = "确定禁用["+cardname+"]下的所有卡？";
        		confirmshowMsg(info,8,cardconfid,2);
        	});
        	
        	$(".enable").on("click", function(){//启用
        		var cardconfid = dataList[$(this).parents("tr").attr("index")].cardconfid;
        		var cardname = dataList[$(this).parents("tr").attr("index")].cardname;
        		var info = "确定启用["+cardname+"]下的所有卡？";
        		confirmshowMsg(info,8,cardconfid,1);
        	});
        	
        	currentpage = $(".data-tab-ul li[class='cur']").text();
        	if(currentpage == "" || currentpage == undefined){
        		currentpage = 1;
        	}
        }
		
	);
}

function showCardConf(cardconfid){
	var page = "manager/cardConfShow.html?cardconfid="+cardconfid;
	window.parent.$("#mainFrame").attr("src",page);
}


function editCardConf(cardconfid){
	var page = "manager/cardConfEdit.html?cardconfid="+cardconfid;
	window.parent.$("#mainFrame").attr("src",page);
}

function delCardConf(cardconfid){
	var url = service_url + "rest/cardConf/deleteCardConf";
	$.post( url,{cardconfid : cardconfid },function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	loadData(currentpage);
        }else if(result == 1208){
        	errorTip("提示","已生成卡号，不能删除");
        	return;
        }else if(result == 1203){
        	errorTip("提示","删除卡券失败，请稍后重试");
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


function createCard(cardconfid){
	loading();
	var url = service_url + "rest/card/addCard";
	$.post( url,{cardconfid : cardconfid },function(data) {
		loadover();
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	var quantity = retjson.data.quantity;
        	errorTip("提示","已生成"+quantity+"张卡号");
        	setTimeout(function(){
        		loadData(currentpage);
        	}, 2000);
        }else if(result == 1208){
        	errorTip("提示","已生成卡号");
        	return;
        }else if(result == 1201){
        	errorTip("提示","生成卡号失败，请稍后重试");
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


function showCardInfo(cardconfid,cardname,cardtype){
	var page = "manager/cardInfoList.html?cardconfid="+cardconfid;
	window.parent.$("#mainFrame").attr("src",page);
	window.parent.$("#mainFrame").attr("param",cardtype+cardname);
}


function changeConfStatus(cardconfid,status){
	var url = service_url + "rest/cardConf/changeConfStatus";
	$.post( url,{cardconfid : cardconfid,status : status },function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	if(status == 1){
        		errorTip("提示","已启用所有卡号");
        	}else if(status == 2){
        		errorTip("提示","已禁用所有卡号");
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

