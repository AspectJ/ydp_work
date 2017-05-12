var areaArray = []; 

$(function () {
     
//	 $.ajax( {
//     	type:"POST",
//     	cache:false,
//     	dataType:"json",
//     	url:requestUrl + "rest/cinema/AjaxAreaInfo",
//     	jsonp:"jsonpCallback",
//     	success:function(data) {
//     		var result = parseInt(data.result);
// 			switch(result){
// 				case 1000 :
// 					areaArray = data.data;  
// 					
//// 					$.each(resultData, function (idx, item) {
//// 						var provinceID = item.value;
//// 						var province = item.label;
//// 						var provChildren = item.children;
//// 						for(var i=0;i<provChildren.length;i++){
//// 							var cityID = provChildren[i].value;
//// 							var city = provChildren[i].label;
//// 							var cityChildren = provChildren[i].children;
//// 							for(var x=0;x<cityChildren.length;x++){
//// 	 							var areaID = cityChildren[x].value;
//// 	 							var area = cityChildren[x].label;
//// 	 						}
//// 						}
////	                });
// 					
// 					break;
//
// 				case 1001:
// 					break;
//				defaule:
//					break;	
//     	}
//     	}});
	 
	 
	 
	 $.ajax( {
            	type:"POST",
            	cache:false,
            	dataType:"json",
            	url:requestUrl + "rest/cinema/AjaxProvince",
            	jsonp:"jsonpCallback",
            	success:function(data) {
            		var result = parseInt(data.result);
        			switch(result){
        				case 1000 :
        					var resultData = data.data;    					
        		                $("#Province").find("option").remove(); //清空省级下拉列表内容
        		                $("#Province").append('<option value="">—请选择省份—</option>'); //添加默认项
        		                $("#City").find("option").remove(); //清空市级下拉列表内容
        		                $("#City").append('<option value="">—请选择地市—</option>'); //添加默认项
        		                $("#District").find("option").remove(); //清空区级下拉列表内容
        		                $("#District").append('<option value="">—请选择区县—</option>'); //添加默认项
        		                $.each(resultData, function (idx, item) {
        		                	 $("#Province").append('<option value="' + item.provinceID + '">' + item.province + '</option>');
        		                });
    						break;
    					case 1001:
    					break;
    					defaule:
    					break;
            	}
            	}});
 

            $("#Province").change(function () {
                var _ProvinceId = $("#Province").val();
                $.ajax( {
                	type:"POST",
                	cache:false,
                	dataType:"json",
                	data:{provinceid:_ProvinceId},
                	url:requestUrl + "rest/cinema/AjaxCity",
                	jsonp:"jsonpCallback",
                	success:function(data) {
                		var result = parseInt(data.result);
            			switch(result){
            				case 1000 :
            					var resultData = data.data;
                    $("#City").find("option").remove(); //清空下拉列表内容
                    $("#City").append('<option value="">—请选择地市—</option>'); //添加默认项
                    $("#District").find("option").remove(); //清空下拉列表内容
                    $("#District").append('<option value="">—请选择区县—</option>'); //添加默认项
                    $.each(resultData, function (idx, item) {
                        $("#City").append('<option value="' + item.cityID + '">' + item.city + '</option>');
                    });
            		break;
        					case 1001:
        					break;
        					defaule:
        					break;
            			}
                }
            });
            });

            $("#City").change(function () {
              
                var _CityId = $("#City").val();
                $.ajax( {
                	type:"POST",
                	cache:false,
                	dataType:"json",
                	data:{cityid:_CityId},
                	url:requestUrl + "rest/cinema/AjaxArea",
                	jsonp:"jsonpCallback",
                	success:function(data) {
                		var result = parseInt(data.result);
            			switch(result){
            				case 1000 :
            					var resultData = data.data;
                    $("#District").find("option").remove(); //清空下拉列表内容
                    $("#District").append('<option value="">—请选择区县—</option>'); //添加默认项
                    $.each(resultData, function (idx, item) {
                        $("#District").append('<option value="' + item.areaID + '">' + item.area + '</option>');
                    });
            		break;
        					case 1001:
        					break;
        					defaule:
        					break;
                }
            }
        });
 
            } );
 });