var CINEMA_DATA = []; //影院总数据

function getCardConfInfo(cardconfid,type){
	var url = service_url + "rest/cardConf/getCardConf";
	$.post( url,{cardconfid : cardconfid},function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
		if(result == 1000){
        	var resultData = retjson.data;
        	if(type == "show"){
        		cardConfShow(resultData);
        	}else if(type == "edit"){
        		cardConfEdit(resultData);
        	}
        }else if(result == 1205){
        	errorTip("提示","卡券信息不存在");
        	return;
        }else if(result == 1204){
        	errorTip("提示","查询卡券信息失败");
        	return;
        }else{
        	errorTip("提示","请求超时，请稍后重试");
        	return;
        }
	});
}

function cardConfEdit(resultData){
	if(resultData.status == "1"){
		$("#edit").hide();
	}
	$("#cardname").val(resultData.cardname);
	$("#cardtype").val(resultData.cardtype);
	$("#cardtype_name").html(resultData.cardtype_name);
	if(resultData.cardtype == "0"){//次卡
		$("#countcard").show();
		$("#storecard").hide();
		$("#count").val(resultData.count);
		$("#value").val(resultData.value);
		$("#quantity").val(resultData.quantity);
	}else if(resultData.cardtype == "1"){
		$("#storecard").show();
		$("#countcard").hide();
		$("#value_store").val(resultData.value);
		$("#quantity_store").val(resultData.quantity);
	}
	$("#maxDate").val(resultData.starttime);
	$("#starttime").val(resultData.starttime);
	$("#endtime").val(resultData.endtime);
	$("#note").val(resultData.note);
	
	CINEMA_DATA = resultData.cinemainfo;
	getArea(); //加载地区
	appendCinemaTable();
}

function getArea(){
	var url= service_url + "rest/cinema/areaList";
	$.post( url,{},function(data) {
		var retjson = data;
		var result = parseInt(retjson.result);
        if(result == 1000){
        	var resultData = retjson.data;
			if(resultData != null && resultData.length > 0){
				$("#city").empty();
				$("#city").append("<li value='' >全部地区</li>");
				for (var i=0; i<resultData.length; i++) {
					var citycode = resultData[i].citycode;
					var name = resultData[i].name;
					if( i === 0 ){
						$("#city").append("<li value='" + citycode + "' class='selected'>"+name+"</li>");
					} else {
						$("#city").append("<li value='" + citycode + "'>"+name+"</li>");	
					}
				}
				
				$('#city li').hover(
					function(){
						if(!$(this).hasClass('selected')){
							$(this).css('color', '#249b6a');
						}
					},
					function(){
						if(!$(this).hasClass('selected')){
							$(this).css('color', '#505052');
						}
					}
				);
				
				$('#city li').on('click', function(){
					if(!$(this).hasClass('selected')){
						$('#city li').removeClass('selected').attr('style', '');
						$(this).addClass('selected');
						
						getTheater($(this).attr('value'));
					}
				});
				
				getTheater();
			} else {
				$("#city").empty();
				$("#cinema").hide();
				$("#areaid").append("<option selected>暂无地区信息</option>");
			}
        }else{
        	$("#city").empty();
        	$("#cinema").hide();
			$("#areaid").append("<option selected>暂无地区信息</option>");
        }
	});
}

function getTheater(areaid){
	var url= service_url + "rest/cinema/cinemaList";
	var areaid = areaid | $('#city .selected').attr('value');
	if(areaid == "0"){areaid = "";}
	$.post( url, {areaid:areaid}, function(data) {
		var retjson=data;
		var result = parseInt(retjson.result);
        if(result == 1000){
        	var resultData = retjson.data;
			if(resultData != null && resultData.length > 0){
				var unCheckNum = 0,
				    cinemainfo = $("#cinema").empty();
				for (var i=0; i<resultData.length; i++) {
					var theaterid = resultData[i].theaterid;
					var theaternum = resultData[i].theaternum;
					var theatername = resultData[i].theatername;
					
					if(i == 0){
						$('#cinema').append(
							'<li>' +
								'<input class="checkbox" id="all-Cinema" type="checkbox">' +
								'<label class="cinema-name" for="all-Cinema">全选</label>' +
							'</li>');
					}
					
					$('#cinema').append(
						'<li>' +
							'<input class="checkbox" id="' + theaterid + '" type="checkbox" ' + (isCinemaExist(theaterid) ? 'checked' : unCheckNum++) + '>' +
							'<label class="cinema-name" data-cinemanum="' + theaternum + '" for="' + theaterid + '">' + theatername + '</label>' +
						'</li>');
				}
				
				if(unCheckNum == 0) $('#all-Cinema').iCheck('check');
				
				$('.checkbox').iCheck({
					checkboxClass: 'icheckbox_minimal-green',
				    increaseArea: '20%'
				});
				
				
				$('#all-Cinema').on('ifClicked', function(){
					if($(this).parent().hasClass('checked')){
						// 取消全选
						$('#cinema').find('input').iCheck('uncheck');
					} else {
						$('#cinema').find('input').iCheck('check');
					}
				});

				$('#cinema li').find('input:not(#all-Cinema)').on('ifChecked', function(e){
					// 勾选影院全选
					var checkAll = true,
					    cinemaList = $(this).parent().parent().siblings('li');
					for(var i = 1,len = cinemaList.length;i < len;i++){
						if(!cinemaList.eq(i).eq(0).children('div').hasClass('checked')){
							checkAll = false;
						}
					}
					
					if(checkAll) $('#all-Cinema').iCheck('check');
					
					chooseCinema($(this).attr('id'), $(this).parent().siblings('label').attr('data-cinemanum'), $(this).parent().siblings('label').text(), e.type);
				});
				$('#cinema li').find('input:not(#all-Cinema)').on('ifUnchecked', function(e){
					// 去除影院全选
					$('#all-Cinema').iCheck('uncheck');
					
					chooseCinema($(this).attr('id'), $(this).parent().siblings('label').attr('data-cinemanum'), $(this).parent().siblings('label').text(), e.type);
				});
			} else {
				console.log('cinema info is empty');
				$("#cinema").empty().append('<li>该地区暂无影院信息</li>');
			}
        } else {
        	return;
        }
	});
}

function isCinemaExist(cinemaid){
	if(CINEMA_DATA != ''){
		for(var i = 0;i<CINEMA_DATA.length;i++){
			if(CINEMA_DATA[i].cinemaid == cinemaid) return true;
		}
		
		return false;
	}
	
	return false;
}

// 添加cinema数据至CINEMA_DATA
function saveCinemaData(cinemaobj, type){
	// type: {push, pop};
	if( type == 'push'){
		CINEMA_DATA.push(cinemaobj);
	} else if( type == 'pop' ) {
		for(i in CINEMA_DATA){
			if(CINEMA_DATA[i].cinemaid == cinemaobj.cinemaid){
				CINEMA_DATA.splice(i, 1);
			}
		}
	}
}

function appendCinemaTable(){
	var tableNode = $('#cinema-table tbody');
		tableNode.empty();
	if(CINEMA_DATA == ''){
		if($("#cardtype").val() == '0'){
			tableNode.append('<tr><th>影院名称</th><th>使用方式</th><th>结算价</th><th>操作</th></tr>');
		}else if($("#cardtype").val() == '1'){
			tableNode.append('<tr><th>影院名称</th><th>使用方式</th><th>结算比值</th><th>操作</th></tr>');
		}
	}
	for(i in CINEMA_DATA){
		var settleprice = CINEMA_DATA[i].settlerate;
		if($("#cardtype").val() == '0'){
			settleprice = CINEMA_DATA[i].settlevalue;
		}else if($("#cardtype").val() == '1'){
			settleprice = CINEMA_DATA[i].settlevalue;
			var reg = /^0\.[1-9]{0,2}$/;
			if(settleprice != ""){
				if(!reg.test(settleprice)){
					if(settleprice == "1" || settleprice == "1.0"){
					}else{
		    			settleprice = "1";
		    		}
				}
			}else{
				settleprice = "1";
			}
		}
		if( i == 0 ){
			if($("#cardtype").val() == '0'){
				tableNode.append('<tr><th>影院名称</th><th>使用方式</th><th>结算价</th><th>操作</th></tr>');
			}else if($("#cardtype").val() == '1'){
				tableNode.append('<tr><th>影院名称</th><th>使用方式</th><th>结算比值</th><th>操作</th></tr>');
			}
		}
		
		tableNode.append(
			'<tr id="' + CINEMA_DATA[i].cinemaid + '">' + 
				'<td>' + CINEMA_DATA[i].cinemaname + '</td>' +
				'<td>' +
					'<label class="cinema-name"><input class="radiobox" data-type="offline" name="' + CINEMA_DATA[i].cinemaid + '" type="radio" ' + (CINEMA_DATA[i].consumetype == 'offline' ? 'checked' : '') + '> 线下使用</label>' + 
					'<label class="cinema-name"><input class="radiobox" data-type="online" name="' + CINEMA_DATA[i].cinemaid + '" type="radio" ' + (CINEMA_DATA[i].consumetype == 'online' ? 'checked' : '') + '> 线上使用</label>' +
					'<label class="cinema-name"><input class="radiobox" data-type="all" name="' + CINEMA_DATA[i].cinemaid + '" type="radio" ' + (CINEMA_DATA[i].consumetype == 'all' ? 'checked' : '') + '> 全部</label>' +
				'</td>' +
				'<td><input type="text" class="settle" value="' + settleprice + '" maxlength="6" oninput="checkSettle(this);" /></td>' +
				'<td><i class="del">删除</i></td>' +
			'</tr>');
		$('#cinema-table tbody tr:last').find('input.settle').focus();
		
		$('#cinema-table #'+ CINEMA_DATA[i].cinemaid).on('ifChecked', 'input', function(){
			changeCinemaProp($(this).parent().parent().parent().parent('tr').attr('id'), 'consumetype', $(this).attr('data-type'));
		});
		
		$('#cinema-table #'+ CINEMA_DATA[i].cinemaid).on('click', '.del', function(){
			var cinema_id = $(this).parent().parent('tr').attr('id');
			changeCinemaProp(cinema_id, 'del', '');
			
			$('#cinema-table').find('#' + cinema_id).remove();
			$('#cinema-table tbody tr:last').find('input.settle').focus();
		});
		
		$('#cinema-table #'+ CINEMA_DATA[i].cinemaid).on('input', 'input.settle', function(){
			changeCinemaProp($(this).parent().parent('tr').attr('id'), 'settle', $(this).val());
		});
	}
	
	$('.radiobox').iCheck({
		radioClass: 'iradio_minimal-green',
	    increaseArea: '20%'
	});
}

// 点击勾选影院
function chooseCinema(cinemaid, cinemanum, cinemaname, event_type){
	var settleprice;
	if($("#cardtype").val() == "0"){
		settleprice = $("#value").val() | '0';
	}else if($("#cardtype").val() == "1"){
		settleprice = $("#value_store").val() | '0';
	}
	
	var obj = {
		cinemaid: cinemaid,
		cinemanum: cinemanum,
		cinemaname: cinemaname,
		consumetype: 'all',
		settlerate: settleprice,
	    settlevalue: settleprice
	};
	
	var type = 'pop';
	if( event_type == 'ifChecked' ){
		type = 'push';
		
		if( !isCinemaExist(cinemaid) ){
			saveCinemaData(obj, type);
			
			appendCinemaTable();
		}
	} else {
		saveCinemaData(obj, type);
		
		$('#cinema-table tr').each(function(){
			if($(this).attr('id') == cinemaid){
				$(this).remove();
			}
		});
	}
}

// 更改CINEMA_DATA的属性
function changeCinemaProp(cinemaid, prop, value){
	for(i in CINEMA_DATA){
		if(CINEMA_DATA[i].cinemaid == cinemaid){
			switch(prop){
				case 'consumetype':
					CINEMA_DATA[i].consumetype = value;
					break;
				case 'del':
					refreshCinemaList(cinemaid);
					CINEMA_DATA.splice(i, 1);
					break;
				case 'settle':
					CINEMA_DATA[i].settlevalue = value;
					CINEMA_DATA[i].settlerate = value;
					break;
				default:
			}
		}
	}
	
}

function refreshCinemaList(cinemaid){
	$('#cinema li').map(function(){
		var ipt = $(this).children('div').children('input');
		if( ipt.attr('id') == cinemaid){
			ipt.iCheck('uncheck');
		}
	});
}

function checkCardName(){
	var cardconfid = $("#cardconfid").val();
	var cardname = $("#cardname").val();
	var url = service_url + "rest/cardConf/checkCardConfRepeat";
	$.post( url,{cardname : encodeURIComponent(cardname),cardconfid : cardconfid },function(data) {
		var retjson=$.parseJSON(data);
		var result = parseInt(retjson.result);
        if(result == 1000){
        	var count = retjson.total;
    		if(count > 0){
    			errorTip("提示","卡券名称重复");
    			$("#cardname").val("");
    			return false;
    		}else{
    			return true;
    		}
        }else{
        	return true;
        }
	});
}


function checkSettle(obj) {  
	//检查是否是非数字值  
    if (isNaN(obj.value)) {
       obj.value = obj.value.substr(0, obj.value.length - 1);  
    }  
    if (obj != null) {  
        //检查小数点后是否对于两位http://blog.csdn.net/shanzhizi  
        if (obj.value.toString().split(".").length > 1 && obj.value.toString().split(".")[1].length > 2) {  
            obj.value = obj.value.substr(0, obj.value.length - 1);
        }  
    }  
    var cardtype = $("#cardtype").val();
    if(cardtype == "0"){//次卡
    	var value = $("#value").val();
    	if(parseInt(value)<parseInt(obj.value)){//结算价大于面值
    		obj.value = obj.value.substr(0, obj.value.length - 1);  
    	}
    }else if(cardtype == "1"){//储值卡
    	var reg = /^0\.[1-9]{0,2}$/;
    	if(reg.test (obj.value)){
    	}else if(obj.value == "0" || obj.value == "1" || obj.value == "1.0"){
    	}else{
    		obj.value = obj.value.substr(0, obj.value.length - 1); 
    		if(obj.value.indexOf(".")>-1){
    			var arr = obj.value.split(".");
        		if(arr[0] != "0"){
        			if(arr[0] == "1" && arr[1] == "0"){
        			}else{
        				obj.value = "1";
        			}
        		}
    		}
    	}
    }
}

function saveCardConf(type){
	var cardconfid = $("#cardconfid").val();
	var cardname = $("#cardname").val();
	var cardtype = $("#cardtype").val();
	var count = $("#count").val();
	var value = $("#value").val();
	var quantity = $("#quantity").val();
	if(cardtype == "1"){
		value = $("#value_store").val();
		quantity = $("#quantity_store").val();
	}
	var starttime = $("#starttime").val();
	var endtime = $("#endtime").val();
	if(cardname == ""){
		errorTip("提示","请填写卡券名称");
		return;
	}
	if(cardtype == "0" && count == ""){
		errorTip("提示","请填写次卡使用次数");
		return;
	}
	if(cardtype == "1"){
		count = 0;
	}
	if(value == "" || quantity == "" || starttime == "" || endtime == ""){
		errorTip("提示","请填写有效信息");
		return;
	}
	
	if(checkCardName() == false){
		return;
	}
	
	for(var i = 0,len = $('.settle').length; i < len; i++){
		if(cardtype == "0"){
			if(!$('.settle').eq(i).val()){
				errorTip("提示","请填写影院结算价");
				$('.settle').eq(i).focus();
				return false;
			}else if(parseInt(value)<parseInt($('.settle').eq(i).val())){
				errorTip("提示","影院结算价不能大于次卡面值");
				$('.settle').eq(i).focus();
				return false;
			}
		}else if(cardtype == "1"){
			var reg = /^0\.[1-9]{0,2}$/;
			if(!$('.settle').eq(i).val()){
				errorTip("提示","请填写影院结算比值");
				$('.settle').eq(i).focus();
				return false;
			}else if(!reg.test ($('.settle').eq(i).val())){
				if(!$('.settle').eq(i).val() == "1.0"){
					errorTip("提示","影院结算比值必须大于0且小于或等于1");
					$('.settle').eq(i).focus();
					return false;
				}
			}
		}
	}
	if(!CINEMA_DATA.length){
		errorTip("提示","请选择影院配置对应信息");
		return;
	}else{
		//设置保存按钮不可多次点击
		$("#"+type).attr("class","submitBn-temp");
		var url= "";
		if(type == "add"){
			url = service_url + "rest/cardConf/addCardConf";
		}else if(type == "edit"){
			url = service_url + "rest/cardConf/updateCardConf";
		}
		
		$.ajax({
            url : url,
            data : {
            	cardconfid : cardconfid,cardname : cardname,
   			 	cardtype : cardtype,count : count,value : value,quantity : quantity,
   			 	starttime : starttime,endtime : endtime,note : $("#note").val(),
   			 	cinema_data : JSON.stringify(CINEMA_DATA)
            },
            dataType : 'json',
            type : "post",
            traditional: true,
            success : function(data) {   
    			var result = data.result;
    			$("#add").attr("class","submitBn");
    	        if(result == 1000){
    				var page = "manager/cardConfList.html?status="+cardtype;
    				window.parent.$("#mainFrame").attr("src",page);
    	        }else if(result == 1201){
    	        	if(type == "add"){
    	        		errorTip("提示","卡券添加失败，请稍后重试");
    	        	}else if(type == "edit"){
    	        		errorTip("提示","卡券修改失败，请稍后重试");
    	        	}
    	        	return;
    	        }else if(result == 1207){
    				var page = "manager/cardConfList.html?status="+cardtype;
    				window.parent.$("#mainFrame").attr("src",page);
    	        }else if(result == 9997){
    	        	errorTip("提示",data.msg);
    	        	return;
    	        }else if(result == 9998){
    	        	errorTip("提示","缺少参数");
    	        	return;
    	        }else{
    	        	errorTip("提示","请求超时，请稍后重试");
    	        	return;
    	        }
            },
            waitMsg : '正在处理数据....'
        });

	}

}

