
/**
 *  这段代码有点混乱，但核心功能是为了回显用户选择的地区信息
 * @param DB_data
 */

function getAjaxCityData_forUpdate(DB_data) {
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
		                
		  //            alert(DB_data.province + DB_data.city + DB_data.district);
		        		
		                
		              /**
		               * 根据数据库的值更改option 省份
		               */  
		      		$("#Province option:contains('"+DB_data.province+"')").attr("selected",true);
		      		
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
		         
		               $.each(resultData, function (idx, item) {
		                   $("#City").append('<option value="' + item.cityID + '">' + item.city + '</option>');
		               });
		               
		               /**
			               * 根据数据库的值更改option 地市
			               */  
			      		$("#City option:contains('"+DB_data.city+"')").attr("selected",true);
			      		
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
			              
				           /**
			                * 根据数据库的值更改option 区县
			               */  		      		
				      		$("#District option:contains('"+DB_data.district+"')").attr("selected",true);
				      		
			      		break;
			  					case 1001:
			  					break;
			  					defaule:
			  					break;
			          }
			      }
			  });
			      		
		       		break;
		   					case 1001:
		   					break;
		   					defaule:
		   					break;
		       			}
		           }
		       });
		      		
		      
		      		
		      		
		 

		              
					break;
				case 1001:
				break;
				defaule:
				break;
    	}
    	}});

       


//    $("#Province").change(function () {
//        var _ProvinceId = $("#Province").val();
//        $.ajax( {
//        	type:"POST",
//        	cache:false,
//        	dataType:"json",
//        	data:{provinceid:_ProvinceId},
//        	url:requestUrl + "rest/cinema/AjaxCity",
//        	jsonp:"jsonpCallback",
//        	success:function(data) {
//        		var result = parseInt(data.result);
//    			switch(result){
//    				case 1000 :
//    					var resultData = data.data;
//            $("#City").find("option").remove(); //清空下拉列表内容
//            $("#City").append('<option value="">—请选择地市—</option>'); //添加默认项
//            $("#District").find("option").remove(); //清空下拉列表内容
//            $("#District").append('<option value="">—请选择区县—</option>'); //添加默认项
//            $.each(resultData, function (idx, item) {
//                $("#City").append('<option value="' + item.cityID + '">' + item.city + '</option>');
//            });
//    		break;
//					case 1001:
//					break;
//					defaule:
//					break;
//    			}
//        }
//    });
//    });

//    $("#City").change(function () {
//      
//        var _CityId = $("#City").val();
//        $.ajax( {
//        	type:"POST",
//        	cache:false,
//        	dataType:"json",
//        	data:{cityid:_CityId},
//        	url:requestUrl + "rest/cinema/AjaxArea",
//        	jsonp:"jsonpCallback",
//        	success:function(data) {
//        		var result = parseInt(data.result);
//    			switch(result){
//    				case 1000 :
//    					var resultData = data.data;
//            $("#District").find("option").remove(); //清空下拉列表内容
//            $("#District").append('<option value="">—请选择区县—</option>'); //添加默认项
//            $.each(resultData, function (idx, item) {
//                $("#District").append('<option value="' + item.areaID + '">' + item.area + '</option>');
//            });
//    		break;
//					case 1001:
//					break;
//					defaule:
//					break;
//        }
//    }
//});
//
//    } );
}