var sessionsService = 'sessionsService';//场馆的
var type=$.cookie("cctype")==null?"":$.cookie("cctype");
var sessionsid = ccid;
$(function() {	
	$("#addendtime").click(function(){
	    ctl_initDate({
            dateFmt: 'yyyy-MM-dd HH:mm',
            minDate: $("#addbegintime").val(),
            maxDate: $('#addplaytime').val()
        });
	});
	
	//根据场次查询场次相关的信息
	if("update"==type){
		 var data = {sessionsid:sessionsid,operType:'index'};
			publicAjaxRequest(sessionsService,data,jsonType, function(response) {
				var rdata = response.data;
				if(rdata.length!=0){
				 sessionsid=rdata[0].sessionsid;
					producttypeid=rdata[0].producttypeid;
					itemid=rdata[0].itemid;
					venueid=rdata[0].venueid;
					hallid=rdata[0].hallid;
					performerid=rdata[0].performerid;
					sessionscode=rdata[0].sessionscode;
					sessionsname=rdata[0].sessionsname;
					playtime=rdata[0].playtime;
					length=rdata[0].length;
					begintime=rdata[0].begintime;
					endtime=rdata[0].endtime;
					sponsor=rdata[0].sponsor;
					dessponsor=rdata[0].dessponsor;
					actualsponsor=rdata[0].actualsponsor;
					website=rdata[0].website;
					regnumb=rdata[0].regnumb;
					introduction=rdata[0].introduction;	
					var engname=rdata[0].engname;				
					$('#addsessionscode').val(sessionscode);//场次号
					$('#addsessionsname').val(sessionsname);//场次名称
					$('#addengname').val(engname);//英文名称
					$('#addplaytime').val(playtime);//上演时间
				    $('#addlength').val(length);//片长
					$('#addbegintime').val(begintime);
					$('#addendtime').val(endtime);
					$('#addsponsor').val(sponsor);//主办方
					$('#adddessponsor').val(dessponsor);//指定
					$('#addactualsponsor').val(actualsponsor);//承办方
					$('#addwebsite').val(website);//网址
					$("#addintroduction").val(introduction);
					if(regnumb=='是'){
						$("[name='sh']").attr("checked",true);
					}else{
						$("[name='sh']").attr("checked",false);
					}
					
					//根据场次查询场次相关的信息
					//产类别名称
					$("#cplbmc").ctl_select({
				        id: 'cplbmc_sel',
				        width: 115,
				        listboxmaxheight: 300,
						listboxalign : 'auto',
						listboxmaxheight : 200,
						columns : 1,
				        checkbox: false,
				        disabled: false,
				    	selectedIndex: '',
				    	selected:[producttypeid],
						defaultValue : '',
						defaultText : '请选择',
				        columnValue: 'producttypeid',
				        columnName: 'typename',
				        url: springMvcUrl,
				        type: 'post',
				        dateType: 'json',
				        param: {
				            param: getParam(sessionsService),
				            data: "{operType:'querycplbmc'}"
				        }
				    });
					
					
					//项目名称
					$("#xmmc").ctl_select({
				        id: 'xmmc_sel',
				        width: 115,
				        listboxmaxheight: 300,
						listboxalign : 'auto',
						listboxmaxheight : 200,
						columns : 1,
				        checkbox: false,
				        disabled: false,
				    	selectedIndex: '',
				    	selected:[itemid],
						defaultValue : '',
						defaultText : '请选择',
				        columnValue: 'itemid',
				        columnName: 'itemname',
				        url: springMvcUrl,
				        type: 'post',
				        dateType: 'json',
				        param: {
				            param: getParam(sessionsService),
				            data: "{operType:'queryxmmc'}"
				        }
				    });
					
					//场管名称
					$("#cgmc").ctl_select({
				        id: 'cgmc_sel',
				        width: 115,
				        listboxmaxheight: 300,
						listboxalign : 'auto',
						listboxmaxheight : 200,
						columns : 1,
				        checkbox: false,
				        disabled: false,
				    	selectedIndex: '',
				    	selected:[venueid],
						defaultValue : '',
						defaultText : '请选择',
				        columnValue: 'venueid',
				        columnName: 'venuename',
				        url: springMvcUrl,
				        type: 'post',
				        dateType: 'json',
				        param: {
				            param: getParam(sessionsService),
				            data: "{operType:'queryCgmc'}"
				        }, onchange: function(name, value) {				        	
							//演出厅名称
							$("#yctmc").ctl_select({
						        id: 'yctmc_sel',
						        width: 115,
						        listboxmaxheight: 300,
								listboxalign : 'auto',
								listboxmaxheight : 200,
								columns : 1,
						        checkbox: false,
						        disabled: false,
						    	selectedIndex: '',
						    	selected:[hallid],
								defaultValue : '',
								defaultText : '请选择',
						        columnValue: 'hallid',
						        columnName: 'hallname',
						        url: springMvcUrl,
						        type: 'post',
						        dateType: 'json',
						        param: {
						            param: getParam(sessionsService),
						            data: "{operType:'queryyctmc',value:'"+value+"'}"
						        }
						    });
				        },onsyncomplete: function(name, selectValue) {	   
				        	
							//演出厅名称
							$("#yctmc").ctl_select({
						        id: 'yctmc_sel',
						        width: 115,
						        listboxmaxheight: 300,
								listboxalign : 'auto',
								listboxmaxheight : 200,
								columns : 1,
						        checkbox: false,
						        disabled: false,
						    	selectedIndex: '',
						    	selected:[hallid],
								defaultValue : '',
								defaultText : '请选择',
						        columnValue: 'hallid',
						        columnName: 'hallname',
						        url: springMvcUrl,
						        type: 'post',
						        dateType: 'json',
						        param: {
						            param: getParam(sessionsService),
						            data: "{operType:'queryyctmc',value:'"+selectValue+"'}"
						        }
						    });
				        }
				    });
					
				
					
					//演出商名称
					$("#ycsmc").ctl_select({
				        id: 'ycsmc_sel',
				        width: 115,
				        listboxmaxheight: 300,
						listboxalign : 'auto',
						listboxmaxheight : 200,
						columns : 1,
				        checkbox: false,
				        disabled: false,
				    	selectedIndex: '',
				    	selected:[performerid],
						defaultValue : '',
						defaultText : '请选择',
				        columnValue: 'performerid',
				        columnName: 'performername',
				        url: springMvcUrl,
				        type: 'post',
				        dateType: 'json',
				        param: {
				            param: getParam(sessionsService),
				            data: "{operType:'queryycsmc'}"
				        }
				    });	
				}
			
			  });	
			
			//保存
			$("#indexSession_first_save_btn").click(function(){
				var venueid = $('#cgmc_sel').val();
				var hallid = $('#yctmc_sel').val();
				var performerid = $('#ycsmc_sel').val();
				var itemid = $('#xmmc_sel').val();
				var code = $('#addsessionscode').val();//场次号
				var name = $('#addsessionsname').val();//场次名称
				var engname = $('#addengname').val();//英文名称
				var playtime = $('#addplaytime').val();//上演时间
				var length = $('#addlength').val();//片长
				var begintime = $('#addbegintime').val();
				var endtime = $('#addendtime').val();
				var producttypeid = $('#cplbmc_sel').val();
				var sponsor = $('#addsponsor').val();//主办方
				var dessponsor = $('#adddessponsor').val();//指定
				var actualsponsor = $('#addactualsponsor').val();//承办方
				var website = $('#addwebsite').val();//网址
				var sh="";		
				$("input[name='sh']:checked").each(function(){
				     sh += $(this).val();
				});
				var introduction = $('#addintroduction').val();	
				if($.trim(venueid)==""){
					ctl_showMsg("场馆不能为空");
					return;
				}
				/*if($.trim(hallid)==""){
					ctl_showMsg("演出厅不能为空");
					return;
				}*/
				if($.trim(performerid)==""){
					ctl_showMsg("演出商不能为空");
					return;
				}
				if($.trim(itemid)==""){
					ctl_showMsg("项目名称不能为空");
					return;
				}
				if($.trim(code)==""){
					ctl_showMsg("场次编号不能为空");
					return;
				}
				if($.trim(name)==""){
					ctl_showMsg("场次名称不能为空");
					return;
				}
				if($.trim(playtime)==""){
					ctl_showMsg("上演时间不能为空");
					return;
				}
				if($.trim(length)==""){
					ctl_showMsg("片长不能为空");
					return;
				}
				var reg = new RegExp("^[0-9]*$");  
				if($.trim(length)!=""){
				    if(!reg.test(length)){  
				        ctl_showMsg("片长只能为数字");
				        return;
				    }  
				}
				if($.trim(begintime)==""){
					ctl_showMsg("售票开始时间不能为空");
					return;
				}
				if($.trim(endtime)==""){
					ctl_showMsg("售票截止时间不能为空");
					return;
				}
				var data={venueid:venueid,hallid:hallid,performerid:performerid,
				itemid:itemid,sessionscode:code,sessionsname:name,
				engname:engname,playtime:playtime,length:length,
				begintime:begintime,endtime:endtime,producttypeid:producttypeid,
				sponsor:sponsor,dessponsor:dessponsor,actualsponsor:actualsponsor,
				website:website,regnumb:sh,
				introduction:introduction,operType:'update',sessionsid:sessionsid};	
				publicAjaxRequest(sessionsService,data,jsonType, function(response) {
					var rdata = response.data;
					if(""!=rdata){
						sessionsid = rdata.split(",")[0];
						ccid = sessionsid;
						sessionsname = rdata.split(",")[1];
						sessionscode = rdata.split(",")[2];
						playtime = rdata.split(",")[3];//上演时间
						$.cookie("playtime", playtime);
						itemid = rdata.split(",")[4];//项目代码
						$.cookie("itemid", itemid);
					}
					if("" != rdata) {
						ctl_showMsg("操作成功!");
						showstepurl("pages/ticketprice/indexTicketprice.html");
						$(".step span").removeClass("bggreen");
						$(".step span").removeClass("c_f");
						$("#step_pjzd").addClass("bggreen");
						$("#step_pjzd").addClass("c_f");
					}else if("fail" == rdata){
						ctl_showMsg("操作失败!");
					}else if("exists" == rdata){
						ctl_showMsg("已经存在!");
					}else{
						ctl_showMsg(rdata);
					}
				});	
			});
	}else{
		$("#cplbmc").ctl_select({
			id : 'cplbmc_sel',
			width : 115,
			listboxmaxheight : 300,
			listboxalign : 'auto',
			listboxmaxheight : 200,
			columns : 1,
			checkbox : false,
			disabled : false,
			selectedIndex : '',
			selected : [ '' ],
			defaultValue : '',
			defaultText : '请选择',
			columnValue : 'producttypeid',
			columnName : 'typename',
			url : springMvcUrl,
			type : 'post',
			dateType : 'json',
			param : {
				param : getParam(sessionsService),
				data : "{operType:'querycplbmc'}"
			}
		});
	
		//项目名称
		$("#xmmc").ctl_select({
			id : 'xmmc_sel',
			width : 115,
			listboxmaxheight : 300,
			listboxalign : 'auto',
			listboxmaxheight : 200,
			columns : 1,
			checkbox : false,
			disabled : false,
			selectedIndex : '',
			selected : [ '' ],
			defaultValue : '',
			defaultText : '请选择',
			columnValue : 'itemid',
			columnName : 'itemname',
			url : springMvcUrl,
			type : 'post',
			dateType : 'json',
			param : {
				param : getParam(sessionsService),
				data : "{operType:'queryxmmc'}"
			}
		});
	
		//场管名称
		$("#cgmc").ctl_select({
	        id: 'cgmc_sel',
	        width: 115,
	        listboxmaxheight: 300,
			listboxalign : 'auto',
			listboxmaxheight : 200,
			columns : 1,
	        checkbox: false,
	        disabled: false,
	    	selectedIndex: '',
	    	selected:[''],
			defaultValue : '',
			defaultText : '请选择',
	        columnValue: 'venueid',
	        columnName: 'venuename',
	        url: springMvcUrl,
	        type: 'post',
	        dateType: 'json',
	        param: {
	            param: getParam(sessionsService),
	            data: "{operType:'queryCgmc'}"
	        }, onchange: function(name, value) {				        	
				//演出厅名称
				$("#yctmc").ctl_select({
			        id: 'yctmc_sel',
			        width: 115,
			        listboxmaxheight: 300,
					listboxalign : 'auto',
					listboxmaxheight : 200,
					columns : 1,
			        checkbox: false,
			        disabled: false,
			    	selectedIndex: '',
			    	selected:[''],
					defaultValue : '',
					defaultText : '请选择',
			        columnValue: 'hallid',
			        columnName: 'hallname',
			        url: springMvcUrl,
			        type: 'post',
			        dateType: 'json',
			        param: {
			            param: getParam(sessionsService),
			            data: "{operType:'queryyctmc',value:'"+value+"'}"
			        }
			    });
	        },onsyncomplete: function(name, selectValue) {	   
	        	
				//演出厅名称
				$("#yctmc").ctl_select({
			        id: 'yctmc_sel',
			        width: 115,
			        listboxmaxheight: 300,
					listboxalign : 'auto',
					listboxmaxheight : 200,
					columns : 1,
			        checkbox: false,
			        disabled: false,
			    	selectedIndex: '',
			    	selected:[''],
					defaultValue : '',
					defaultText : '请选择',
			        columnValue: 'hallid',
			        columnName: 'hallname',
			        url: springMvcUrl,
			        type: 'post',
			        dateType: 'json',
			        param: {
			            param: getParam(sessionsService),
			            data: "{operType:'queryyctmc',value:'"+selectValue+"'}"
			        }
			    });
	        }
	    });
		
	
//		//演出厅名称
//		$("#yctmc").ctl_select({
//			id : 'yctmc_sel',
//			width : 115,
//			listboxmaxheight : 300,
//			listboxalign : 'auto',
//			listboxmaxheight : 200,
//			columns : 1,
//			checkbox : false,
//			disabled : false,
//			selectedIndex : '',
//			selected : [ '' ],
//			defaultValue : '',
//			defaultText : '请选择',
//			columnValue : 'hallid',
//			columnName : 'hallname',
//			url : springMvcUrl,
//			type : 'post',
//			dateType : 'json',
//			param : {
//				param : getParam(sessionsService),
//				data : "{operType:'queryyctmc'}"
//			}
//		});
	
		//演出商名称
		$("#ycsmc").ctl_select({
			id : 'ycsmc_sel',
			width : 115,
			listboxmaxheight : 300,
			listboxalign : 'auto',
			listboxmaxheight : 200,
			columns : 1,
			checkbox : false,
			disabled : false,
			selectedIndex : '',
			selected : [ '' ],
			defaultValue : '',
			defaultText : '请选择',
			columnValue : 'performerid',
			columnName : 'performername',
			url : springMvcUrl,
			type : 'post',
			dateType : 'json',
			param : {
				param : getParam(sessionsService),
				data : "{operType:'queryycsmc'}"
			}
		});
	
		//保存
		$("#indexSession_first_save_btn").click(function() {
			var venueid = $('#cgmc_sel').val();
			var hallid = $('#yctmc_sel').val();
			var performerid = $('#ycsmc_sel').val();
			var itemid = $('#xmmc_sel').val();
			var code = $('#addsessionscode').val();//场次号
			var name = $('#addsessionsname').val();//场次名称
			var engname = $('#addengname').val();//英文名称
			var playtime = $('#addplaytime').val();//上演时间
			var length = $('#addlength').val();//片长
			var begintime = $('#addbegintime').val();
			var endtime = $('#addendtime').val();
			var producttypeid = $('#cplbmc_sel').val();
			var sponsor = $('#addsponsor').val();//主办方
			var dessponsor = $('#adddessponsor').val();//指定
			var actualsponsor = $('#addactualsponsor').val();//承办方
			var website = $('#addwebsite').val();//网址
			var sh = "";
			$("input[name='sh']:checked").each(function() {
				sh += $(this).val();
			});
			var introduction = $('#addintroduction').val();
			if ($.trim(venueid) == "") {
				ctl_showMsg("场馆不能为空");
				return;
			}
			/*if ($.trim(hallid) == "") {
				ctl_showMsg("演出厅不能为空");
				return;
			}*/
			if ($.trim(performerid) == "") {
				ctl_showMsg("演出商不能为空");
				return;
			}
			if ($.trim(itemid) == "") {
				ctl_showMsg("项目名称不能为空");
				return;
			}
			if ($.trim(code) == "") {
				ctl_showMsg("场次编号不能为空");
				return;
			}
			if ($.trim(name) == "") {
				ctl_showMsg("场次名称不能为空");
				return;
			}
			if ($.trim(playtime) == "") {
				ctl_showMsg("上演时间不能为空");
				return;
			}
			if ($.trim(length) == "") {
				ctl_showMsg("片长不能为空");
				return;
			}
			var reg = new RegExp("^[0-9]*$");
			if ($.trim(length) != "") {
				if (!reg.test(length)) {
					ctl_showMsg("片长只能为数字");
					return;
				}
			}
			if ($.trim(begintime) == "") {
				ctl_showMsg("售票开始时间不能为空");
				return;
			}
			if ($.trim(endtime) == "") {
				ctl_showMsg("售票截止时间不能为空");
				return;
			}
			var data = {
				venueid : venueid,
				hallid : hallid,
				performerid : performerid,
				itemid : itemid,
				sessionscode : code,
				sessionsname : name,
				engname : engname,
				playtime : playtime,
				length : length,
				begintime : begintime,
				endtime : endtime,
				producttypeid : producttypeid,
				sponsor : sponsor,
				dessponsor : dessponsor,
				actualsponsor : actualsponsor,
				website : website,
				regnumb : sh,
				introduction : introduction,
				operType : 'add'
			};
			publicAjaxRequest(sessionsService, data, jsonType, function(response) {
				var rdata = response.data;
				if ("" != rdata) {
					sessionsid = rdata.split(",")[0];
					ccid = sessionsid;
					sessionsname = rdata.split(",")[1];
					sessionscode = rdata.split(",")[2];
					playtime = rdata.split(",")[3];//上演时间
					$.cookie("playtime", playtime);
					itemid = rdata.split(",")[4];//项目代码
					$.cookie("itemid", itemid);
				}
				if ("" != rdata) {
					ctl_showMsg("操作成功!");
					showstepurl("pages/ticketprice/indexTicketprice.html","第二步（票务）","票价定制");
					$(".step span").removeClass("bggreen");
					$(".step span").removeClass("c_f");
					$("#step_pjzd").addClass("bggreen");
					$("#step_pjzd").addClass("c_f");
				} else if ("fail" == rdata) {
					ctl_showMsg("操作失败!");
				} else if ("exists" == rdata) {
					ctl_showMsg("已经存在!");
				} else {
					ctl_showMsg(rdata);
				}
			});
		});
	}
});
