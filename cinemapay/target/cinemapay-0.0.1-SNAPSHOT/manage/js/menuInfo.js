var page = 1;
var pagesize = 10;
var pagingsize = 3;
var currentpage = 1;

$(function() {
	loadData(1);

    $("#addMenu").on("click", function(){
    	$("#addInfo").fadeIn(200, "swing");
    	$("#menutype").val(0);
		$("#p_partentid").hide();
		$(".menu").find(".text").val("");
		$(".cancel").on("click", function(){ 
			$("#addInfo").fadeOut(300, "swing");
		});
		$("#add").on("click",function(){
			var className = $("#add").attr("class");
			if(className == "commit"){
				$("#add").attr("class","commit-temp");
				//commit("add","rolename",0);
				addMenuInfo();
			}
		});
		$("#menutype").change(function(){
			var menutype = $("#menutype").val();
			if(menutype == "0"){//页面
				$("#p_partentid").hide();
			}else if(menutype == "1"){//功能权限
				$("#p_partentid").show();
				getMenuSelect(0,"partentid");
			}
		});
		
		$("#sortno").blur(function(){
			checkNum();
		});
    	
	});
});


function loadData(side){
	page = pageUpDown(side);
	var param = {};
	param.page = page;
	param.pagesize = pagesize;
	param.search = encodeURIComponent($(".filter_input").val());
	ajaxRequest("menu/getMenuList", "GET", false, param, 
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
							var menuinfo = dataList[i];
							var dataJson = {};
							dataJson.menuname =  menuinfo.menuname;
							var partentid = menuinfo.partentid;
							if(partentid == "0"){
								partentid = "主页";
							}
							dataJson.partentid = partentid;
							dataJson.requesturl = menuinfo.requesturl;
							dataJson.sortno = menuinfo.sortno;
							var opreator = "<i class='get'>查看子功能</i>";
							if(rolePer.indexOf("updateMenu")>-1){
								opreator += "<i class='edit'>修改</i>";
							}
							if(rolePer.indexOf("deleteMenu")>-1){
								opreator += "<i class='delete'>删除</i>";
							}
							dataJson.opreator = opreator;
							dataArr.push(dataJson);
						}
						$(".data-tab tr").not(":first").remove();
						pushMenuData(".data-tab table", dataArr);
						var pagingstr = loadPaging(totalpage, page, pagingsize, "loadData");
						$(".data-tab-ul").html(pagingstr);
					}
					break;
				case 1204 :
					$(".data-tab tr").not(":first").remove();
					errorTip("提示","查询权限列表失败，请稍后重试");
					break;
				case 1205 :
					$(".data-tab tr").not(":first").remove();
					errorTip("提示","权限列表信息不存在");
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
		, null, null,
		function(){
			$(".get").on("click", function(){
        		var menuid = dataList[$(this).parents("tr").attr("index")].menuid;
        		var menuname = dataList[$(this).parents("tr").attr("index")].menuname;
        		showMenuSonInfo(menuid,menuname);
        	});
        	$(".edit").on("click", function(){
        		var menuid = dataList[$(this).parents("tr").attr("index")].menuid;
        		updateMenuInfo(menuid);
        	});
        	$(".delete").on("click", function(){
        		var menuid = dataList[$(this).parents("tr").attr("index")].menuid;
        		var menuname = dataList[$(this).parents("tr").attr("index")].menuname;
        		delMenuInfo(menuid,menuname);
        	});
        	
        	currentpage = $(".data-tab-ul li[class='cur']").text();
        	if(currentpage == "" || currentpage == undefined){
        		currentpage = 1;
        	}
        }
		
	);
}

function pushMenuData(){
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

