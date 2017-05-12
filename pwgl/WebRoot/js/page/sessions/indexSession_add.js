var sessionsService='sessionsService';//场馆的
var ticketpriceService='ticketpriceService';//票价等级
var indexSessnZoneService='indexSessnZoneService';//分区座位
var indexBookedSeatService="indexBookedSeatService";//预留分配
var indexSetPolicyService="indexSetPolicyService";//套票政策
var indexFavourableService="indexFavourableService";//优惠政策
var sessionsid="";//场次代码
var sessionsname='';//场次名称
var sessionscode="";//场次编号
var itemid="";//项目代码
var playtime="";//上演时间
var type="1";//座位的，2表示授权的
var prefpolicyid='';//套票政策代码
var producttypeid='';
var itemid='';
var venueid='';
var hallid='';
var performerid='';
var sessionscode='';
var sessionsname='';
var playtime='';
var length='';
var begintime='';
var endtime='';
var sponsor='';
var dessponsor='';
var actualsponsor='';
var website='';
var regnumb='';
var introduction='';

//新增场次
$(function(){
	sessionsid=sessionsids;
	
	//菜单点击
	$("#indexSession_add_table tr td span").click(function(){		
	    $('#indexSession_add_table tr td span').removeClass('bggreen1');
        $(this).addClass("bggreen1");
	});
	
	//第一步
	$("#indexSession_first_td_id").click(function(){
		$("#indexSession_six_div").hide();
		$("#indexSession_five_div").hide();
		$("#indexSession_first_steep_div").show();
		$("#indexSession_two_steep_div").hide();
		$("#indexSession_three_div").hide();
		$("#indexSession_four_div").hide();
		$("#indexSession_fq_div").hide();
		$("#indexSession_zwyl_all_div").hide();		
	});
	
	//第一步的下一步
	$("#indexSession_first_next_btn").click(function(){
		$("#indexSession_six_div").hide();
		$("#indexSession_five_div").hide();
		$("#indexSession_first_steep_div").hide();
		$("#indexSession_two_steep_div").show();
		$("#indexSession_three_div").hide();
		$("#indexSession_four_div").hide();
		$("#indexSession_fq_div").hide();
		$("#indexSession_zwyl_all_div").hide();
		$("#indexSession_zw_divId").hide();
		
		//设置第二步样式的样色
		$('#indexSession_add_table tr td span').removeClass('bggreen1');
		$("#indexSession_two_td_id span").addClass("bggreen1");
		
		two_step_func();//调用第二步的方法
	});
	
	//第二步
	$("#indexSession_two_td_id").click(function(){
		$("#indexSession_six_div").hide();
		$("#indexSession_five_div").hide();
		$("#indexSession_first_steep_div").hide();
		$("#indexSession_two_steep_div").show();
		$("#indexSession_three_div").hide();
		$("#indexSession_four_div").hide();
		$("#indexSession_fq_div").hide();
		$("#indexSession_zwyl_all_div").hide();
		$("#indexSession_zw_divId").hide();
		
		two_step_func();//调用第二步的方法
	});
	
	//第二步的下一步
	$("#indexSession_second_next_btn").click(function(){
		$("#indexSession_six_div").hide();
		$("#indexSession_five_div").hide();
		$("#indexSession_first_steep_div").hide();
		$("#indexSession_two_steep_div").hide();
		$("#indexSession_three_div").show();
		$("#indexSession_four_div").hide();
		$("#indexSession_fq_div").hide();
		$("#indexSession_zwyl_all_div").hide();
		$("#indexSession_zw_divId").hide();
		
		//设置第三步样式的样色
		$('#indexSession_add_table tr td span').removeClass('bggreen1');
		$("#indexSession_three_td_id span").addClass("bggreen1");
	});
	
	//第三步
	$("#indexSession_three_td_id").click(function(){
		$("#indexSession_six_div").hide();
		$("#indexSession_five_div").hide();
		$("#indexSession_first_steep_div").hide();
		$("#indexSession_two_steep_div").hide();
		$("#indexSession_three_div").show();
		$("#indexSession_four_div").hide();
		$("#indexSession_fq_div").hide();
		$("#indexSession_zwyl_all_div").hide();
		$("#indexSession_zw_divId").hide();
	});
	
	//第三步的下一步
	$("#indexSession_three_next_btn").click(function(){
		$("#indexSession_six_div").hide();
		$("#indexSession_five_div").hide();
		$("#indexSession_first_steep_div").hide();
		$("#indexSession_two_steep_div").hide();
		$("#indexSession_three_div").hide();
		$("#indexSession_four_div").show();
		$("#indexSession_fq_div").hide();
		$("#indexSession_zwyl_all_div").hide();
		$("#indexSession_zw_divId").hide();
		
		//设置第四步样式的样色
		$('#indexSession_add_table tr td span').removeClass('bggreen1');
		$("#indexSession_four_td_id span").addClass("bggreen1");
	});
	
	//第四步
	$("#indexSession_four_td_id").click(function(){
		$("#indexSession_six_div").hide();
		$("#indexSession_five_div").hide();
		$("#indexSession_fq_div").hide();
		$("#indexSession_zwyl_all_div").hide();
		$("#indexSession_first_steep_div").hide();
		$("#indexSession_two_steep_div").hide();
		$("#indexSession_three_div").hide();
		$("#indexSession_four_div").show();
		$("#indexSession_zw_divId").hide();
		
		//加载销售政策
		xszcFunc();
	});
	
	//第四步的下一步
	$("#indexSession_four_next_btn").click(function(){
		$("#indexSession_six_div").hide();
		$("#indexSession_five_div").show();
		$("#indexSession_first_steep_div").hide();
		$("#indexSession_two_steep_div").hide();
		$("#indexSession_three_div").hide();
		$("#indexSession_four_div").hide();
		$("#indexSession_fq_div").hide();
		$("#indexSession_zwyl_all_div").hide();
		$("#indexSession_zw_divId").hide();
		
		//设置第四步样式的样色
		$('#indexSession_add_table tr td span').removeClass('bggreen1');
		$("#indexSession_five_td_id span").addClass("bggreen1");
		
		//加载销售政策
		xszcFunc();
				
	});
	
	//第五步
	$("#indexSession_five_td_id").click(function(){
		$("#indexSession_six_div").hide();
		$("#indexSession_five_div").show();
		$("#indexSession_first_steep_div").hide();
		$("#indexSession_two_steep_div").hide();
		$("#indexSession_three_div").hide();
		$("#indexSession_four_div").hide();
		$("#indexSession_fq_div").hide();
		$("#indexSession_zwyl_all_div").hide();
		$("#indexSession_zw_divId").hide();
		
		//优惠政策
		yhzcFunc();
	});
	
	//第五步的下一步
	$("#indexSession_five_btn").click(function(){
		$("#indexSession_six_div").show();
		$("#indexSession_five_div").hide();
		$("#indexSession_first_steep_div").hide();
		$("#indexSession_two_steep_div").hide();
		$("#indexSession_three_div").hide();
		$("#indexSession_four_div").hide();
		$("#indexSession_fq_div").hide();
		$("#indexSession_zwyl_all_div").hide();
		$("#indexSession_zw_divId").hide();
		
		//设置第五步样式的样色
		$('#indexSession_add_table tr td span').removeClass('bggreen1');
		$("#indexSession_six_td_id span").addClass("bggreen1");
		
		//优惠政策
		yhzcFunc();
	});
	
	//第六步
	$("#indexSession_six_td_id").click(function(){
		$("#indexSession_six_div").show();
		$("#indexSession_five_div").hide();
		$("#indexSession_first_steep_div").hide();
		$("#indexSession_two_steep_div").hide();
		$("#indexSession_three_div").hide();
		$("#indexSession_four_div").hide();
		$("#indexSession_fq_div").hide();
		$("#indexSession_zwyl_all_div").hide();
		$("#indexSession_zw_divId").hide();
	});
	
	//第七步
	$("#indexSession_seven_td_id").click(function(){
		openUrl('pages/sessions/indexSessions.html','场次管理','场次管理');
	});
	
	
	//销售和售票授权---------js开始
	spsqinit();
	loadJg();
	loadXszc();
	
	/**售票授权逻辑begin*/
	$("input[name='tj']").click(function(){
		if($(this).val() == "jg"){
			$("#jg_div").show();
			$("#yh_div").hide();
		}else{
			$("#jg_div").hide();
			$("#yh_div").show();
		}
	});
	
	$("#spsq_save_btn").click(function(){
		var spqxids = "";
		if(sessionsid==""){
			ctl_showMsg("场次不能为空");
			return;
		}
		$("#spqx_div input").each(function(){
			if(!$(this).attr("checked")){
				return;
			}
			if(spqxids == ""){
				spqxids = $(this).val();
			}else{
				spqxids += ","+$(this).val();
			}
		});
		var type = $("input[name='tj']:checked").val();
		if(type == "jg"){
			var nodes = ctl_getCheckedNodes(treeObj);
			if(null == nodes){
				ctl_showMsg("请选择要授权的机构！");
				return;
			}
			if(spqxids == ""){
				ctl_showMsg("请选择售票权限！");
				return;
			}
			var jgids = "";
			for(var i = 0; i < nodes.length; i++){
				if(jgids != ""){
					jgids += ",";
				}
				jgids += nodes[i].id;
			}
			var data = {operType:'saveJgspsq',jgids:jgids,spqxids:spqxids,sessionsid:sessionsid};
			publicAjaxRequest("indexSellEmpowerService",data,jsonType, function(response) {
				var rdata = response.data;
				if("fail" == rdata) {
					ctl_showMsg("授权失败！");
				}else if("success" == rdata){
					init();
					ctl_showMsg("授权成功！");
				}
			});
		}else if(type == "yh"){
			var nodes = ctl_getCheckedNodes(treeObj);
			var spyids = "";
			for(var i = 0; i < nodes.length; i++){
				if(spyids != ""){
					spyids += ",";
				}
				spyids += nodes[i].id;
			}
//			$("#yh_div input").each(function(){
//				if(!$(this).attr("checked")){
//					return;
//				}
//				if(spyids == ""){
//					spyids = $(this).val();
//				}else{
//					spyids += ","+$(this).val();
//				}
//			});
			if(spyids == ""){
				ctl_showMsg("请选择要授权的售票员！");
				return;
			}
			if(spqxids == ""){
				ctl_showMsg("请选择售票权限！");
				return;
			}
			var data = {operType:'saveSpyspsq',spyids:spyids,spqxids:spqxids,sessionsid:sessionsid};
			publicAjaxRequest("indexSellEmpowerService",data,jsonType, function(response) {
				var rdata = response.data;
				if("fail" == rdata) {
					ctl_showMsg("授权失败！");
				}else if("success" == rdata){
					spsqinit();
					ctl_showMsg("授权成功！");
				}
			});
		}
	});
	/**售票授权逻辑end*/
	
	/**销售政策授权逻辑begin*/
	$("#payboxname").keydown(function(e){
		if(e.keyCode == "13"){
			loadJg();
		}
	});
	$("#areaname").keydown(function(e){
		if(e.keyCode == "13"){
			loadJg();
		}
	});
	$("#jg_sel").change(function(){
		$("#jgyh_div").html("");
		var payboxid = $(this).val();
		var data = {operType:'selectJgyh',payboxid:payboxid};
		publicAjaxRequest("indexSellEmpowerService",data,jsonType, function(response) {
			var obj = response.data;
			var str = "";
			for ( var i = 0; i < obj.length; i++) {
				str = "<p class='pt15'><input type='checkbox' class='v_m' value='"+obj[i].sellerid+"'/> "+obj[i].realname+"</p>";
				$("#jgyh_div").append(str);
			}
		});
	});
	$("#qx_chk").click(function(){
		if($(this).attr("checked")){
			$("#jgyh_div input").attr("checked",true);
		}else{
			$("#jgyh_div input").attr("checked",false);
		}
	});
	$("#zcsq_save_btn").click(function(){
		var zcid = $("#zc_sel").val();
		var zclx = $("#zc_sel").find("option:selected").attr("zclx");
		var spyids = "";
		if(sessionsid==""){
			ctl_showMsg("场次不能为空");
			return;
		}
		$("#jgyh_div input").each(function(){
			if(!$(this).attr("checked")){
				return;
			}
			if(spyids == ""){
				spyids = $(this).val();
			}else{
				spyids += ","+$(this).val();
			}
		});
		if(spyids == ""){
			ctl_showMsg("请选择要授权的售票员！");
			return;
		}
		if(zcid == ""){
			ctl_showMsg("请选择销售政策！");
			return;
		}
		
		var data = {operType:'saveXszcsq',spyids:spyids,zcid:zcid,sessionsid:sessionsid,zclx:zclx};
		publicAjaxRequest("indexSellEmpowerService",data,jsonType, function(response) {
			var rdata = response.data;
			if("fail" == rdata) {
				ctl_showMsg("授权失败！");
			}else if("success" == rdata){
				spsqinit();
				ctl_showMsg("授权成功！");
			}
		});
	});
	/**销售政策授权逻辑end*/
	
	
	
	//第七步的下一步
	$("#indexSession_seven_btn").click(function(){
		openUrl('pages/sessions/indexSessions.html','场次管理','场次管理');
	});
	
	//座位预留
	$("#indexSession_zwyl_td_id").click(function(){
		$("#indexSession_six_div").hide();
		$("#indexSession_five_div").hide();
		$("#indexSession_first_steep_div").hide();
		$("#indexSession_two_steep_div").hide();
		$("#indexSession_three_div").hide();
		$("#indexSession_four_div").hide();
		$("#indexSession_fq_div").hide();
		$("#indexSession_zw_divId").hide();
		
		//加载售票点和座位预留
		//预留分配加载售票点
		spd('');
		
		//预留分配加载预留种类
		ylzl('');
		
		if(sessionsid==''){
			ctl_showMsg("场次不能为空");
			return;
		}else{
			$("#indexSession_zwyl_all_div").show();
			
			//分区名称
        	$("#indexBookedseat_fqmc").ctl_select({
                id: 'indexBookedseat_fqmc_sel',
                width: 115,
                listboxmaxheight: 300,
        		listboxalign : 'auto',
        		listboxmaxheight : 200,
        		columns : 1,
                checkbox: false,
                disabled: false,
                columnValue: 'sessnzoneid',
                columnName: 'zonename',
                url: springMvcUrl,
                type: 'post',
                dateType: 'json',
                param: {
                    param: getParam(indexBookedSeatService),
                    data: "{operType:'queryFqmc',value:'"+sessionsid+"'}"
                },onchange:function(name,value){
                	
                	//加载左边的第一个表格
                	load_leftGrid(sessionsid,value);
                	
                   	//加载座位
                	bookedseat_load(sessionsid,value);
                }
        	});
        	
        	//加载左边的第一个表格
        	load_leftGrid(sessionsid,'');
        	
           	//加载座位
        	bookedseat_load(sessionsid,'');
        	
        	//加载票价等级
        	$("#indexBookedseat_pjdj").ctl_select({
                id: 'indexBookedseat_pjdj_sel',
                width: 115,
                listboxmaxheight: 300,
        		listboxalign : 'auto',
        		listboxmaxheight : 200,
        		columns : 1,
                checkbox: false,
                disabled: false,
                columnValue: 'pricelevelid',
                columnName: 'djpjstr',
                hiddenId:'indexBookedseat_pjdj_name',
                url: springMvcUrl,
                type: 'post',
                dateType: 'json',
                param: {
                    param: getParam(indexBookedSeatService),
                    data: "{operType:'queryPjdj',ccid:'"+sessionsid+"'}"
                }
        });
        	
        //预留种类
        $("#indexBookedseat_ylzl").ctl_select({
                id: 'indexBookedseat_ylzl_sel',
                width: 115,
                listboxmaxheight: 300,
        		listboxalign : 'auto',
        		listboxmaxheight : 200,
        		columns : 1,
                checkbox: false,
                disabled: false,
                columnValue: 'reserveid',
                columnName: 'reservename',
                url: springMvcUrl,
                type: 'post',
                dateType: 'json',
                param: {
                    param: getParam(indexBookedSeatService),
                    data: "{operType:'queryYlzl'}"
                }
        	});	
        
    	//保存按钮
    	$("#indexBookedseat_save_btn").click(function(){
    		var pewids='';//座位
    		if("1"==type){			
    			$("input[name='checkbox']:checked").each(function(){
    				if(pewids == ""){
    					pewids += $(this).attr("id");
    				}else{
    					pewids+= ","+$(this).attr("id");
    				}
    			});
    			if(pewids==""){
    				ctl_showMsg("至少选择一个座位");
    				return;
    			}
    			var ppdjid=$("#indexBookedseat_pjdj_sel").val();//票价等级
    			if(ppdjid==""){
    				ctl_showMsg("请选择票价等级");
    				return;
    			}
    			var pjstr=$("#indexBookedseat_pjdj_name").val().split("(")[1];
    			var pj=pjstr.substring(0,pjstr.length-2);
    			var ylzl=$("#indexBookedseat_ylzl_sel").val();
    			if(ylzl==""){
    				ctl_showMsg("请选择预留种类");
    				return;
    			}
    			var data = {pewids:pewids,ppdjid:ppdjid,pj:pj,ylzl:ylzl,operType:'update'};
    			publicAjaxRequest(indexBookedSeatService,data,jsonType, function(response) {
    				var rdata = response.data;
    				if("success" == rdata) {
    					ctl_showMsg("操作成功!");
    					ctl_reloadGrid('indexBookedSeat_left_table');	
    					var fqid=$("#indexBookedseat_fqmc_sel").val();
    					bookedseat_load(sessionsid,fqid);
    				}else if("fail" == rdata) {
    					ctl_showMsg("操作失败!");
    				}else {
    					ctl_showMsg(rdata);
    				}
    			});
    		}else{
    			var payboxids='';
    			var reserveids='';
    			$("input[name='payboxnamecheckbox']:checked").each(function(){
    				if(payboxids == ""){
    					payboxids += $(this).attr("id");
    				}else{
    					payboxids+= ","+$(this).attr("id");
    				}
    			});
    			$("input[name='reservenamecheckbox']:checked").each(function(){
    				if(reserveids == ""){
    					reserveids += $(this).attr("id");
    				}else{
    					reserveids+= ","+$(this).attr("id");
    				}
    			});
    			if($("input[name='payboxnamecheckbox']:checked").length==0){
    				ctl_showMsg("售票点至少选择一个");
    				return;
    			}
    			if($("input[name='reservenamecheckbox']:checked").length==0){
    				ctl_showMsg("预留种类至少选择一个");
    				return;
    			}
    			var data = {xsd:payboxids,ylzl:reserveids,xmid:itemid,ccid:sessionsid,operType:'save'};
    			publicAjaxRequest(indexBookedSeatService,data,jsonType, function(response) {
    				var rdata = response.data;
    				if("success" == rdata) {
    					ctl_showMsg("操作成功!");
    				}else if("fail" == rdata) {
    					ctl_showMsg("操作失败!");
    				}else {
    					ctl_showMsg(rdata);
    				}
    		    });
    		}		
    	});
	}
  });
	
	//取消选中
	$("#indexBookedseat_reselect_btn").click(function(){
		$("input[name='checkbox']:checked").each(function(){
			$(this).attr('checked',false);
			var id=$(this).attr("id");
			$("#"+id+"a").attr("class","db");
		});
	});
	
	//刷新座位
	$("#indexBookedseat_refresh_btn").click(function(){
	    var fqmc=$("#indexBookedseat_fqmc_sel").val();
	    if(""==sessionsid){
	    	ctl_showMsg("场次不能为空");
	    	return;
	    }
	    if(""==fqmc){
	    	ctl_showMsg("分区名称不能为空");
	    	return;
	    }
	    //刷新统计表格
		ctl_reloadGrid('indexBookedSeat_left_table');
		
//    	//加载座位
    	bookedseat_load(sessionsid,fqmc);
	});
	
	
	//座位预留
	$("#indexBookedseat_zwyl_div").click(function(){
		$(this).attr("class","c_p dnb bod on");
		$("#indexBookedseat_ylfp_div").attr("class","c_p dnb bod");
		$("#indexSession_zwyl_div").show();
		$("#indexBookedseat_ylfp_div_id").hide();
		type="1";
	});
	
	//预留分配
	$("#indexBookedseat_ylfp_div").click(function(){
		$(this).attr("class","c_p dnb bod on");
		$("#indexBookedseat_zwyl_div").attr("class","c_p dnb bod");
		$("#indexSession_zwyl_div").hide();
		$("#indexBookedseat_ylfp_div_id").show();
		type="2";
	});
	
	
	//销售授权
	$("#indexSession_six_xszcsq").click(function(){
		$(this).attr("class","c_p dnb bod on");
		$("#indexSession_six_spsq").attr("class","c_p dnb bod");		
		$("#indexSession_six_sdspqx_div").show();
		$("#indexSession_xsqxfp_div").hide();
	});
	
	//售票授权
	$("#indexSession_six_spsq").click(function(){
		$(this).attr("class","c_p dnb bod on");
		$("#indexSession_six_xszcsq").attr("class","c_p dnb bod");
		$("#indexSession_six_sdspqx_div").hide();
		$("#indexSession_xsqxfp_div").show();
	});
	
	//售票点和预留种类的查询
	$("#indexBookedseat_spd_query_btn").click(function(){
		var name=$("#indexBookedseat_spd_query_name").val();
		spd(name);
	});
	
	//预留种类的查询
	$("#indexBookedseat_ylp_query_btn").click(function(){
		var name=$("#indexBookedseat_ylp_query_name").val();
		ylzl(name);
	});
	
        	
	//分区座位
	$("#indexSession_fqzw_td_id").click(function(){
		$("#indexSession_fq_div").show();
		$("#indexSession_zwyl_all_div").hide();
		$("#indexSession_six_div").hide();
		$("#indexSession_five_div").hide();
		$("#indexSession_first_steep_div").hide();
		$("#indexSession_two_steep_div").hide();
		$("#indexSession_three_div").hide();
		$("#indexSession_four_div").hide();
		
		//分区座位
		subzoneFunc('');
	});
	
	//场馆的---js开始--------
	if(sessionsid!=''){
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
				$("#indexSession_two_ccbh").text("场次编号："+sessionscode);
				$("#indexSession_two_ccmc_txt").text("场次名称："+sessionsname);
				$("#indexSession_zwyl_sysj_span").text("上演时间："+playtime);
				$("#indexSession_zwyl_ccmc_span").text("场次名称："+sessionsname);
				two_step_func();				
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
			        }
			    });
				
				
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
			            data: "{operType:'queryyctmc'}"
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
			var sessionscode = $('#addsessionscode').val();//场次号
			var sessionsname = $('#addsessionsname').val();//场次名称
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
			if($.trim(sessionscode)==""){
				ctl_showMsg("场次编号不能为空");
				return;
			}
			if($.trim(sessionsname)==""){
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
			itemid:itemid,sessionscode:sessionscode,sessionsname:sessionsname,
			engname:engname,playtime:playtime,length:length,
			begintime:begintime,endtime:endtime,producttypeid:producttypeid,
			sponsor:sponsor,dessponsor:dessponsor,actualsponsor:actualsponsor,
			website:website,regnumb:sh,
			introduction:introduction,operType:'update',sessionsid:sessionsid};	
			publicAjaxRequest(sessionsService,data,jsonType, function(response) {
				var rdata = response.data;
				if(""!=rdata){
					sessionsid=rdata.split(",")[0];
					sessionsname=rdata.split(",")[1];
					sessionscode=rdata.split(",")[2];
					playtime=rdata.split(",")[3];//上演时间
					itemid=rdata.split(",")[4];//项目代码
					$("#indexSession_two_ccbh").text("场次编号："+sessionscode);
					$("#indexSession_two_ccmc_txt").text("场次名称："+sessionsname);
					$("#indexSession_zwyl_sysj_span").text("上演时间："+playtime);
					$("#indexSession_zwyl_ccmc_span").text("场次名称："+sessionsname);
					two_step_func();
				}
				if("" != rdata) {
					ctl_showMsg("操作成功!");
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
	    	selected:[''],
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
	    	selected:[''],
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
	        }
	    });
		
		
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
	            data: "{operType:'queryyctmc'}"
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
	    	selected:[''],
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
	
	
	
	//保存
	$("#indexSession_first_save_btn").click(function(){
		var venueid = $('#cgmc_sel').val();
		var hallid = $('#yctmc_sel').val();
		var performerid = $('#ycsmc_sel').val();
		var itemid = $('#xmmc_sel').val();
		var sessionscode = $('#addsessionscode').val();//场次号
		var sessionsname = $('#addsessionsname').val();//场次名称
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
/*		if($.trim(hallid)==""){
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
		if($.trim(sessionscode)==""){
			ctl_showMsg("场次编号不能为空");
			return;
		}
		if($.trim(sessionsname)==""){
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
		itemid:itemid,sessionscode:sessionscode,sessionsname:sessionsname,
		engname:engname,playtime:playtime,length:length,
		begintime:begintime,endtime:endtime,producttypeid:producttypeid,
		sponsor:sponsor,dessponsor:dessponsor,actualsponsor:actualsponsor,
		website:website,regnumb:sh,
		introduction:introduction,operType:'add',sessionsid:sessionsid};	
		publicAjaxRequest(sessionsService,data,jsonType, function(response) {
			var rdata = response.data;
			if(""!=rdata){
				sessionsid=rdata.split(",")[0];
				sessionsname=rdata.split(",")[1];
				sessionscode=rdata.split(",")[2];
				playtime=rdata.split(",")[3];//上演时间
				itemid=rdata.split(",")[4];//项目代码
				$("#indexSession_two_ccbh").text("场次编号："+sessionscode);
				$("#indexSession_two_ccmc_txt").text("场次名称："+sessionsname);
				$("#indexSession_zwyl_sysj_span").text("上演时间："+playtime);
				$("#indexSession_zwyl_ccmc_span").text("场次名称："+sessionsname);
				two_step_func();
			}
			if("" != rdata) {
				ctl_showMsg("操作成功!");
			}else if("fail" == rdata){
				ctl_showMsg("操作失败!");
			}else if("exists" == rdata){
				ctl_showMsg("已经存在!");
			}else{
				ctl_showMsg(rdata);
			}
		});	
	});
	
	//创建场次结束------------------------js	
	
	//新增分区
	$("#indexSessnZone_addBtn").click(function(){
		add_fq();
	});
	
	//删除分区
	$("#indexSessnzone_deletebtn").click(function(){
		var dlg = ctl_dialogDivClose('', {
	        title: '删除分区',
	        content: 'indexSessnzone_del_div',
	        lock: true,
	        min: false,
	        max: false,
	        drag: false,
	        resize: false
	    },
	    ['indexSessnZoneCancelBtn']);
		var data={operType:'fqindex',sessionsid:sessionsid};
		publicAjaxRequest(indexSessnZoneService,data,jsonType, function(response) {
		     var rdata = response.data.length;
			 var divHtml="";
			  for(var i=0;i<rdata;i++){
				 var data=response.data;
			     var sessnzoneid=data[i].sessnzoneid;
			     var zonename=data[i].zonename;
				 divHtml += "<dl>";
				 divHtml += "<dd>";
				 divHtml += "<input type='checkbox' id='" + sessnzoneid
				 + "' name='checkbox' />";
				
				 divHtml += "<label name='roleNameLabel' id='roleLabel_"
						+ sessnzoneid + "'>" + zonename + "</label>";
				divHtml += "</dd>";
				divHtml += "</dl>";
			}
			$("#deleteDataDiv").html(divHtml);
			
		});
		
		$("#indexSessnZoneSaveBtn").click(function(){
			var sessnzoneids = "";
			$("input[name='checkbox']:checked").each(function(){
				if(sessnzoneids == ""){
					sessnzoneids += $(this).attr("id");
				}else{
					sessnzoneids+= ","+$(this).attr("id");
				}
			});
			if(sessnzoneids==""){
				ctl_showMsg("请至少选择一个分区!");
				return;
			}
			var data = {sessnzoneids:sessnzoneids,operType:'sc'};
			publicAjaxRequest(indexSessnZoneService,data,jsonType, function(response) {
				var rdata = response.data;
				if("success" == rdata) {
					ctl_showMsg("删除成功!");
					subzoneFunc('');
					dlg.close();
				}else if("fail" == rdata) {
					ctl_showMsg("删除失败!");
					dlg.close();
				}else {
					ctl_showMsg(rdata);
				}
			});
	    });
	});
	
	//修改分区
	$("#indexSessnZone_updateBtn").click(function(){
		var dlg = ctl_dialogDivClose('', {
	        title: '修改分区',
	        content: 'indexSessnzone_del_div',
	        lock: true,
	        min: false,
	        max: false,
	        drag: false,
	        resize: false
	    },
	    ['indexSessnZoneCancelBtn']);
		var data={operType:'fqindex',sessionsid:sessionsid};
		publicAjaxRequest(indexSessnZoneService,data,jsonType, function(response) {
		     var rdata = response.data.length;
			 var divHtml="";
			  for(var i=0;i<rdata;i++){
				 var data=response.data;
			     var sessnzoneid=data[i].sessnzoneid;
			     var zonename=data[i].zonename;
				 divHtml += "<dl>";
				 divHtml += "<dd>";
				 divHtml += "<input type='checkbox' id='" + sessnzoneid
				 + "' name='checkbox' />";
				
				 divHtml += "<label name='roleNameLabel' id='roleLabel_"
						+ sessnzoneid + "'>" + zonename + "</label>";
				divHtml += "</dd>";
				divHtml += "</dl>";
			}
			$("#deleteDataDiv").html(divHtml);
			
		});
		
		$("#indexSessnZoneSaveBtn").click(function(){
			var sessnzoneids = "";
			$("input[name='checkbox']:checked").each(function(){
				if(sessnzoneids == ""){
					sessnzoneids += $(this).attr("id");
				}else{
					sessnzoneids+= ","+$(this).attr("id");
				}
			});
			if(sessnzoneids==""){
				ctl_showMsg("请至少选择一个分区!");
				return;
			}
			var len=$("input[name='checkbox']:checked").length;
			if(len>1){
				ctl_showMsg("请选择一个分区");
				return;
			}else if(len==1){
				xgClick(sessnzoneids);
			}
		});
	});
	
});

//销售政策开始------------js
function xszcFunc(){
	//票价等级
	$("#indexTpz_pjdj").ctl_select({
        id: 'indexTpz_pjdj_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
        columnValue: 'pricelevelid',
        hiddenId:'indexFavourable_pjdj_name',
        columnName: 'pname',
        selected:[''],
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(indexFavourableService),
            data: "{operType:'queryPjdj',sessionsid:'"+sessionsid+"'}"
        },onchange:function(name,value){
        	var pricename=name;
			var price=pricename.split("(")[1];
			var p=price.substring(0,price.length-2);
			var sumPrice=p*parseInt($("#indexTpz_sl").val());
			$("#indexTpz_pj").val(sumPrice);
        }
    });	
	
	$("#indexTpz_sl").change(function(){
		var pjdj=$("#indexTpz_pjdj_sel").val();
		var name=$("#indexTpz_pjdj_name").val();
		if($.trim(pjdj)==""){
			ctl_showMsg("请选择票价等级");
			return;
		}
		var sl=$("#indexTpz_sl").val();
		if($.trim(sl)==""){
			ctl_showMsg("请输入数量");
			return;
		}
		var pricename=name;
		var price=pricename.split("(")[1];
		var p=price.substring(0,price.length-2);
		var sumPrice=p*parseInt($("#indexTpz_sl").val());
		$("#indexTpz_pj").val(sumPrice);
	});	
	
	//保存
	$("#indexTpz_ok_btn").click(function(){
		var zcmc=$("#indexTpz_yhzcmc").val();
		var ccmc=sessionsid;//场次	
		var kssj=$("#indexTpz_kssj").val();//开始时间
		var jssj=$("#indexTpz_jssj").val();//结束时间
		var bj=$("#indexTpz_bj").val();//标记
		var pjdj=$("#indexTpz_pjdj_sel").val();//票价等级
		var sl=$("#indexTpz_sl").val();//数量		
		var pj=$("#indexTpz_pj").val();
		if(""==zcmc){
			ctl_showMsg("套票政策名称不能为空");
			return;
		}
		if(""==ccmc){
			ctl_showMsg("场次名称不能为空");
			return;
		}
		if(""==sl){
			ctl_showMsg("数量不能为空");
			return;
		}
		if(""==kssj){
			ctl_showMsg("开始时间不能为空");
			return;
		}
		if(""==jssj){
			ctl_showMsg("结束时间不能为空");
			return;
		}
		if(""==pjdj){
			ctl_showMsg("票价等级不能为空");
			return;
		}	
		if(""==pj){
			ctl_showMsg("票价不能为空");
			return;
		}
		var data={ccmc:ccmc,zcmc:zcmc,kssj:kssj,jssj:jssj,bj:bj,pjdj:pjdj,pj:pj,sl:sl,prefpolicyid:prefpolicyid,operType:'add'}; 
	     publicAjaxRequest(indexSetPolicyService,data,jsonType, function(response) {
				var rdata = response.data;
				prefpolicyid=rdata;
				if(""!= rdata) {
					ctl_showMsg("新增成功！");
		            var divHtml="<table id='indexFavourable_yhzc_grid' width='100%'></table><div id='indexFavourable_yhzc_pager'></div>";
		            $("#indexTpz_yhzc_grid_div").html(divHtml);
					initDetail_grid(prefpolicyid,600,sl);
				}else if("fail" == rdata){
					ctl_showMsg("新增失败");
				}else {
					ctl_showMsg("新增失败！");
				}
			});
	});	
}


function spsqinit(){
	//加载售票机构
	var data0 = "{operType:'spjg'}";
	var treeParam = {
		treeId:"menu",
		checkEnable:true,
		simpleEnable : true,
		asyncEnable : true,
		asyncUrl : springMvcUrl,
		asyncType : 'post',
		dataType : 'json',
		onClick : function(event,treeId,treeNode){
		},
		otherParam : {
			param : getParam("indexSellEmpowerService"),
			data : data0
		}
	};
	//初始化树
	treeObj = ctl_initTree(treeParam, null);
	
	//加载售票员
//	$("#yh_div ul").html("");
//	var data1 = {operType:'selectSpy'};
//	publicAjaxRequest("indexSellEmpowerService",data1,jsonType, function(response) {
//		var obj = response.data;
//		var str = "";
//		for ( var i = 0; i < obj.length; i++) {
//			str = "<li style='float:left;width:80px;'><input type='checkbox' class='v_m' value='"+obj[i].sellerid+"'/> "+obj[i].realname+"</li>";
//			$("#yh_div ul").append(str);
//		}
//	});
	var data1 = "{operType:'selectSpy'}";
	var treeParam1 = {
			treeId:"yh_menu",
			checkEnable:true,
			simpleEnable : true,
			asyncEnable : true,
			asyncUrl : springMvcUrl,
			asyncType : 'post',
			dataType : 'json',
			onClick : function(event,treeId,treeNode){
			},
			otherParam : {
				param : getParam("indexSellEmpowerService"),
				data : data1
			}
		};
	//初始化树
	treeObj = ctl_initTree(treeParam1, null);
	
	//加载售票权限
	$("#spqx_div p").remove();
	var data2 = {operType:'selectSpqx'};
	publicAjaxRequest("indexSellEmpowerService",data2,jsonType, function(response) {
		var obj = response.data;
		var str = "";
		for ( var i in obj) {
			str = "<p class='pt15'><input type='checkbox' class='v_m' value='"+obj[i].sellpowerid+"'/> "+obj[i].powername+"</p>";
			$("#spqx_div").append(str);
		}
	});
}

function loadJg(){
	$("#jg_sel").html("<option value=''>请选择</option>");
	var payboxname = $("#payboxname").val();
	var areaname = $("#areaname").val();
	var data = {operType:'selectJg',payboxname:payboxname,areaname:areaname};
	publicAjaxRequest("indexSellEmpowerService",data,jsonType, function(response) {
		var obj = response.data;
		var str = "";
		for ( var i = 0; i < obj.length; i++) {
			str = "<option value='"+obj[i].payboxid+"'>"+obj[i].payboxname+"</option>";
			$("#jg_sel").append(str);
		}
	});
}

function loadXszc(){
	var data = {operType:'selectXszc',sessionsid:sessionsid};
	publicAjaxRequest("indexSellEmpowerService",data,jsonType, function(response) {
		var obj = response.data;
		var str = "";
		for ( var i = 0; i < obj.length; i++) {
			str = "<option value='"+obj[i].zcid+"' zclx='"+obj[i].zclx+"'>"+obj[i].zcmc+"</option>";
			$("#zc_sel").append(str);
		}
	});
}

//票价制定开始-----------------js
function two_step_func(){

	ctl_initGrid({
		jqGridId:"ticketprice_grid",
		serviceId:ticketpriceService,
		requestDataXml:{operType:"index",sessionsid:sessionsid},
		singleRowData:true,
		dataFormat:jsonType,
		width:500,
		height:200,
		colNames:['场次票价ID','场次ID','场次名称','票价等级ID','票价等级','票价等级颜色值','票价','票价字样','操作'],
		colModel:[
		{name:'sessntkprid',index:'sessntkprid',hidden:true},
		{name:'sessionsid',index:'sessionsid',hidden:true},
		{name:'sessionsname',index:'sessionsname'},
		{name:'pricelevelid',index:'pricelevelid',hidden:true},
		{name:'pricelevelname',index:'pricelevelname'},
		{name:'color',index:'color'},
		{name:'price',index:'price'},
		{name:'mark',index:'mark'},
		{name:'oper',index:'oper',align:"center"}],
		pager:"ticketprice_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){
			var ids = ctl_getAllDataIds('ticketprice_grid');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var rowObj = ctl_getRowObjForRowNo('ticketprice_grid',cl);
   				var oper = "";
   				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updateTicketprice(\""+cl+"\")>修改</a>";
   				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deleteTicketprice(\""+rowObj.sessntkprid+"\")>删除</a>";
   				oper=xg + " | " + sc;
   				ctl_setCell('ticketprice_grid', cl, 'oper', oper);
   			}
            addAutoSize([{
                htmlId: "ticketprice_grid",
                htmlType: "jqgrid",
                widthResize: -305,
                heightResize: -500
            }]);
		},
		jsonReader:{
			root:"data",
			total:"totalPage",
			page:"page",
			records:"totalSize",
			repeatitems:false
		}
		
	  });
	
	//新增
	$("#ticketprice_add").click(function(){
		var dlgc = ctl_dialogDivClose('', {
	        title: '新增',
	        content: 'addticketprice_div',
	        lock: true,
	        min: false,
	        max: false,
	        drag: false,
	        resize: false
	    },
	    ['addticketprice_close']);
		
		
		
		//票价等级
		$("#pjdj").ctl_select({
	        id: 'pjdj_sel',
	        width: 115,
	        listboxmaxheight: 300,
			listboxalign : 'auto',
			listboxmaxheight : 200,
			columns : 1,
	        checkbox: false,
	        disabled: false,
	    	selectedIndex: '',
	    	dialogId:'addticketprice_div',
	    	selected:[],
			defaultValue : '',
			defaultText : '请选择',
	        columnValue: 'pricelevelid',
	        columnName: 'pricelevelname',
	        url: springMvcUrl,
	        type: 'post',
	        dateType: 'json',
	        hiddenId:'pjdjid',
	        param: {
	            param: getParam(ticketpriceService),
	            data: "{operType:'pjdj'}"
	        }
	    });	
	    //颜色值
		$("#addcolor").ctl_select({
	        id: "addcolor_sel",
	        listboxwidth: 0,
	        width: 115,
	        listboxmaxheight: 300,
	        selected:[''],
	        dialogId:'addticketprice_div',
	        columns: 1,
	        data:{'赤':'赤','橙':'橙','黄':'黄','绿':'绿','青':'青','蓝':'蓝','紫':'紫'},
	    });
		
		//保存点击事件
		$("#addticketprice_save").click(function(){
			var addpricelevelname=$("#pjdj_sel").val();//票价等级
			var addprice=$("#addprice").val();//票价
			var addmark=$("#addmark").val();//票价标记
			var addcolor=$("#addcolor_sel").val();//票价颜色值
			if($.trim(addpricelevelname)==""){
				ctl_showMsg("票价等级不能为空");
				return;
			}
			if($.trim(addprice)==""){
				ctl_showMsg("票价不能为空");
				return;
			}
			var reg = new RegExp("^(([0-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$");  
			if($.trim(addprice)!=""){
			   if(!reg.test(addprice)){  
				   ctl_showMsg("票价只能是带有2位小数点的数字");
				   return;
				}  
			}
			if($.trim(addcolor)==''){
				ctl_showMsg('颜色不能为空');
				return;
			}
			var data={sessionsid:sessionsid,addpricelevelname:$("#pjdjid").val(),pjdjid:addpricelevelname,addprice:addprice,addmark:addmark,addcolor:addcolor,operType:'add'};
			publicAjaxRequest(ticketpriceService,data,jsonType, function(response) {
				var rdata = response.data;
				if("success" == rdata) {
					dlgc.close();
					ctl_showMsg("新增成功!");			
					ctl_reloadGrid('ticketprice_grid');
				}else if("fail" == rdata){
					ctl_showMsg("新增失败!");
				}else if("exists" == rdata){
					ctl_showMsg("已经存在!");
				}else{
					ctl_showMsg(rdata);
				}
			});	
			
		});
	});
}

//票价等级修改------------js开始
function updateTicketprice(rowId){
	var dlg = ctl_dialogDivClose('', {
        title: '修改',
        content: 'addticketprice_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['addticketprice_close']);	
    var rowObj = ctl_getRowObjForRowNo('ticketprice_grid',rowId);
    
	//票价等级
	$("#pjdj").ctl_select({
        id: 'pjdj_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
    	selectedIndex: '',
    	dialogId:'addticketprice_div',
    	selected:[rowObj.pricelevelid],
        columnValue: 'pricelevelid',
        columnName: 'pricelevelname',
        hiddenId:'pjdjid',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(ticketpriceService),
            data: "{operType:'pjdj'}"
        }
    });	
	
    //颜色值
	$("#addcolor").ctl_select({
        id: "addcolor_sel",
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        selected:[rowObj.color],
        dialogId:'addticketprice_div',
        columns: 1,
        data:{'赤':'赤','橙':'橙','黄':'黄','绿':'绿','青':'青','蓝':'蓝','紫':'紫'},
    });
	
	//设置值
	$("#ccmc_hidden_id").val(rowObj.sessionsid);
	$("#pjdjid_hidden_id").val(rowObj.pricelevelid);
	$("#addcolor_hidden_id").val(rowObj.color);
	$("#addprice").val(rowObj.price);
	$("#addmark").val(rowObj.mark);
	
	//保存
	$("#addticketprice_save").click(function(){
		var sessntkprid=rowObj.sessntkprid;		
		var addpricelevelname=$("#pjdj_sel").val();
		var addprice=$("#addprice").val();
		var addmark=$("#addmark").val();
		var addcolor=$("#addcolor_sel").val();
		if($.trim(addpricelevelname)==""){
			ctl_showMsg("票价等级不能为空");
			return;
		}
		if($.trim(addprice)==""){
			ctl_showMsg("票价不能为空");
			return;
		}		
		var reg = new RegExp("^(([0-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$");  
		if($.trim(addprice)!=""){
			 if(!reg.test(addprice)){  
			        ctl_showMsg("票价只能是带有2位小数点的数字");
			        return;
			    }  
		}
		if($.trim(addcolor)==''){
			ctl_showMsg('颜色不能为空');
			return;
		}
		var data={sessntkprid:sessntkprid,pjdjid:addpricelevelname,addpricelevelname:$("#pjdjid").val(),addprice:addprice,
				addmark:addmark,addcolor:addcolor,operType:"update",type:type};
		publicAjaxRequest(ticketpriceService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_showMsg("修改成功!");
				dlg.close();
				ctl_reloadGrid('ticketprice_grid');
			}else if("fail" == rdata){
				ctl_showMsg("修改失败!");
			}else if("exists" == rdata){
				ctl_showMsg("已经存在!");
			}else{
				ctl_showMsg(rdata);
			}
		});	
	});
}
//票价等级修改---js结束

//票价等级删除----js 开始
function deleteTicketprice(sessntkprid){
	ctl_confirm('您确定要删除吗？',function() {
		var data = {sessntkprid:sessntkprid,operType:'delete'};
		publicAjaxRequest(ticketpriceService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('ticketprice_grid');
				ctl_showMsg("删除成功!");
			}else if("fail" == rdata) {
				ctl_showMsg("删除失败!");
			}else if("used" == rdata) {
				ctl_showMsg("已被使用，不能删除!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	},function(){});
}

//票价等级删除----js 结束

//分区座位开始--js 开始
function subzoneFunc(fqmc){
	var data={operType:'fqindex',sessionsid:sessionsid};
	publicAjaxRequest(indexSessnZoneService,data,jsonType, function(response) {
			var rdata = response.data.length;
		    var divHtml="";
		    for(var i=0;i<rdata;i++){
		    	var data=response.data;
		    	var sessnzoneid=data[i].sessnzoneid;
		    	var zonename=data[i].zonename;
		    	if(fqmc==zonename){
		    	    divHtml+="<li class='l on' onclick='fqClick(\"" + sessnzoneid + "\",\"" + zonename + "\")'><a class='c_f' >"+zonename+"</a></li>";
		    	}else{
		    		divHtml+="<li class='l' onclick='fqClick(\"" + sessnzoneid + "\",\"" + zonename + "\")'><a class='c_f' >"+zonename+"</a></li>";	
		    	}
		    }
		    $("#indexSessnZone_fq_ulId").html(divHtml);
		});
}


//座位
function fqClick(sessnzoneid,zonename){
	var data={sessnzoneid:sessnzoneid,operType:'queryZw'};
	publicAjaxRequest(indexSessnZoneService,data,jsonType, function(response) {
		var rdata = response.data.length;
	    var divHtml="";
	    for(var i=0;i<rdata;i++){
	    	var data=response.data;	    	
	    	divHtml+="<li class='l'><a class='db'></a></li>";
	    }
	    $("#indexSession_fq_div").hide();
	    $("#indexSession_zw_divId").show();
	    $("#indexSessnzone_zw_detail_div").html(divHtml);
	});
	$("#indexSessnzone_name_li").html("您所在的分区："+zonename);
	
	//返回的点击事件
	$("#indexSessnZone_return_back_btn").click(function(){
		 $("#indexSession_zw_divId").hide();//座位隐藏
		 $("#indexSession_fq_div").show();//分区显示
		 $('#indexSession_add_table tr td span').removeClass('bggreen1');
		 $("#indexSession_fqzw_td_id span").addClass("bggreen1");
		 
		 //分区重新加载
		 subzoneFunc('');
	});	
	initGird(sessnzoneid);
}

//加载表格
function initGird(sessnzoneid){
	var divHtml="<table id='indexSessnoZone_grid' width='40%'></table><div id='indexSessnoZone_pager'></div>";
	$("#indexSesszone_table_div").html(divHtml);
	ctl_initGrid({
		jqGridId:"indexSessnoZone_grid",
		serviceId:indexSessnZoneService,
		requestDataXml:{sessnzoneid:sessnzoneid,operType:"queryHz"},
		singleRowData:true,
		dataFormat:jsonType,
		width:500,
		height:200,
		colNames:['等级','票价','数量','金额'],
		colModel:[
		{name:'pricelevelname',index:'pricelevelname'},
		{name:'price',index:'price'},
		{name:'num',index:'num'},
		{name:'sumprice',index:'sumprice'}],
		pager:"indexSessnoZone_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],	
		gridComplete:function(){
			var ids = ctl_getAllDataIds('indexSessnoZone_grid');
			var len=ids.length;
			var number='0';
			var cl="";
   			for ( var i = 0; i < len; i++) {
   				cl = ids[i];
   				var rowObj = ctl_getRowObjForRowNo('indexSessnoZone_grid',cl);
   				number=parseInt(number)+parseInt(rowObj.num);
   			}
   			$("#indexSesszone_fq_div_num").html("本分区已自定义"+parseInt(number)+"个座位");		
		},
		jsonReader:{
			root:"data",
			total:"totalPage",
			page:"page",
			records:"totalSize",
			repeatitems:false
		}
	});
}

//新增分区
function add_fq(){
	var dlg = ctl_dialogDivClose('', {
        title: '新增分区',
        content: 'addSessnZone_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['qx']);	
	
	//演出厅
	$("#yct").ctl_select({
        id: 'yct_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		columns : 1,
        checkbox: false,
        disabled: false,
        dialogId:'addSessnZone_div',
    	selectedIndex: '',
    	selected:[],
		defaultValue : '',
		defaultText : '请选择',
        columnValue: 'hallid',
        columnName: 'hallname',
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(indexSessnZoneService),
            data: "{operType:'queryct'}"
        }
    });
	$("#ffgz").ctl_select({
        id: "ffgz_sel",
        listboxwidth: 0,
        width: 115,
        listboxmaxheight: 300,
        dialogId:'addSessnZone_div',
        columns: 1,
        data:{'分区座位包含单、双号交叉排列':'分区座位包含单、双号交叉排列',
        	'分区座位仅有单号排列':'分区座位仅有单号排列','分区座位仅有双号排列':'分区座位仅有双号排列'},
    });	
	
	//保存
	$("#qd").click(function(){
		var fqmc=$("#fqmc").val();//分区名称
		var sszwt=$("#sszwt").val();//所属座位图
		var sschc=$("#sschc").val();//所属场次
		var fqgz=$("#ffgz_sel").val();//分区规则
		var g=$("#g").val();//高
		var k=$("#k").val();//宽
		var zshs=$("#zshs").val();//座位行数
		var zwls=$("#zsls").val();//座位列数
		var xzb=$("#xzb").val();//x坐标
		var yzb=$("#yzb").val();//y坐标
		var fqwz=$("#fqwz").val();//分区文字
		var bjys=$("#bjys").val();//背景颜色
		var fqlx=$("#fqlx").val();//分区类型
		var sm=$("#sm").val();//说明
		var yct=$("#yct_sel").val();//演出厅
		var reg = new RegExp("^[0-9]*$");  
		if($.trim(fqmc)==""){
			ctl_showMsg("分区名称不能为空");
			return;
		}
		/*if($.trim(yct)==""){
			ctl_showMsg("演出厅不能为空");
			return;
		}*/
		if($.trim(sszwt)==""){
			ctl_showMsg("所属的座位图不能为空");
			return;
		}
		if($.trim(g)==""){
			ctl_showMsg("高不能为空");
			return;
		}
		if($.trim(g)!=""){
		    if(!reg.test(g)){  
		        ctl_showMsg("高只能为数字");
		        return;
		    }  
		}
		if($.trim(k)==""){
			ctl_showMsg("宽不能为空");
			return;
		}
		if($.trim(k)!=""){
		    if(!reg.test(k)){  
		        ctl_showMsg("宽只能为数字");
		        return;
		    }  
		}
		if($.trim(zshs)==""){
			ctl_showMsg("座位行数不能为空");
			return;
		}

		if($.trim(zshs)!=""){
		    if(!reg.test(zshs)){  
		        ctl_showMsg("座位行数只能为数字");
		        return;
		    }  
		}
		if($.trim(zwls)==""){
			ctl_showMsg("座位列数不能为空");
			return;
		}
		if($.trim(zwls)!=""){
		    if(!reg.test(zwls)){  
		        ctl_showMsg("座位列数只能为数字");
		        return;
		    }  
		}
		if($.trim(xzb)==""){
			ctl_showMsg("x坐标不能为空");
			return;
		}
		if($.trim(xzb)!=""){
		    if(!reg.test(xzb)){  
		        ctl_showMsg("x坐标只能为数字");
		        return;
		    }  
		}
		if($.trim(yzb)==""){
			ctl_showMsg("y坐标不能为空");
			return;
		}
		if($.trim(yzb)!=""){
		    if(!reg.test(xzb)){  
		        ctl_showMsg("y坐标只能为数字");
		        return;
		    }  
		}
		alert("sessionsid:"+sessionsid);
		var data={fqmc:fqmc,sessionsid:sessionsid,sszwt:sszwt,sschc:sschc,fqgz:fqgz,yct:yct,
				zwls:zwls,g:g,k:k,zshs:zshs,xzb:xzb,yzb:yzb,fqwz:fqwz,bjys:bjys,fqlx:fqlx,sm:sm,operType:'addFq'};
		publicAjaxRequest(indexSessnZoneService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_showMsg("添加成功!");
				dlg.close();
				subzoneFunc(fqmc);//通过分区名称来判断，是否是新增的分区
			}else if("fail" == rdata) {
				ctl_showMsg("添加失败!");
			}else {
				ctl_showMsg(rdata);
			}
		});
	});
}


//修改分区--
function xgClick(sessnzoneid){
	var dlg = ctl_dialogDivClose('', {
        title: '修改分区',
        content: 'updateSessnZone_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['qx']);	

	
	//查询赋值
	var data={sessnzoneid:sessnzoneid,sessionsid:sessionsid,operType:'fqindex'};
	publicAjaxRequest(indexSessnZoneService,data,jsonType, function(response) {
		var data=response.data[0];
		var zonename=data.zonename;
		var sessionsname=data.sessionsname;
		var hallname=data.hallname;
		var pewpic=data.pewpic;
		var rule=data.rule;
		var height=data.height;
		var width=data.width;
		var rownum=data.rownum;
		var colnum=data.colnum;
		var x=data.x;
		var y=data.y;
		var text=data.text;
		var color=data.color;
		var remark=data.remark;
	    var zonetype=data.zonetype;
	    var sessnzoneid=data.sessnzoneid;
	    var sessionsid=data.sessionsid;
		$("#ffgz").ctl_select({
	        id: "ffgz_sel",
	        listboxwidth: 0,
	        width: 115,
	        listboxmaxheight: 300,
	        dialogId:'addSessnZone_div',
	        columns: 1,
	        selected:[rule],
	        data:{'分区座位包含单、双号交叉排列':'分区座位包含单、双号交叉排列',
	        	'分区座位仅有单号排列':'分区座位仅有单号排列','分区座位仅有双号排列':'分区座位仅有双号排列'},
	    });	
		$("#fqmc").val(zonename);
		$("#scycc").val(sessionsname);//所属场次
		$("#yct").val(hallname);//演出听
		$("#sszwt").val(pewpic);//所属座位图
		$("#g").val(height);//高
		$("#k").val(width);//宽
		$("#zshs").val(rownum);//座位行数
		$("#zsls").val(colnum);
		$("#xzb").val(x);//x坐标
		$("#yzb").val(y);//y坐标
		$("#fqwz").val(text);//分区文字
		$("#bjys").val(color);//背景颜色
		$("#fqlx").val(zonetype);//分区类型
		$("#sm").val(remark);//说明
		
		//保存
		$("#qd").click(function(){
			var fqmc=$("#fqmc").val();//分区名称
			var zshs=$("#zshs").val();//座位行数
			var zsls=$("#zsls").val();//座位列数
			var yct=$("#yct").val();//演出厅	
			var data={fqmc:fqmc,zshs:zshs,zsls:zsls,sessionsid:sessionsid,sessnzoneid:sessnzoneid,yct:yct,operType:'update'};
			publicAjaxRequest(indexSessnZoneService,data,jsonType, function(response) {
				var rdata = response.data;
				if("success" == rdata) {
					ctl_showMsg("修改成功!");
					dlg.close();
					fq(fqmc);//通过分区名称来判断，是否是新增的分区
				}else if("fail" == rdata) {
					ctl_showMsg("修改失败!");
				}else {
					ctl_showMsg(rdata);
				}
			});
		});
	});		
}


//加载左边的第一个表格--票价等级，预留种类，票价来汇总
function load_leftGrid(ccid,fqid){
	var ccids=ccid;//场次ID
	var fqids=fqid;//分区ID
	var divHtml="<table id='indexBookedSeat_left_table' width='100%'></table><div id='indexBookedSeat_left_pagger'></div>";
	$("#indexBookedSeat_left_table_div").html(divHtml);
	ctl_initGrid({
		jqGridId:"indexBookedSeat_left_table",
		serviceId:indexBookedSeatService, 
		requestDataXml:{operType:"queryLeftGrid","ccid":ccids,"fqid":fqids},
		singleRowData:true,
		dataFormat:jsonType,
		width:500,
		height:450,
		colNames:['票价等级','预留种类','票价','颜色'],
		colModel:[
		{name:'pricelevelname',index:'pricelevelname'},
		{name:'reservename',index:'reservename'},
		{name:'sumprice',index:'sumprice'},
		{name:'color',index:'color',hidden:true}
        ],
		pager:"indexBookedSeat_left_pagger",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],	
		gridComplete:function(){
			var ids = ctl_getAllDataIds('indexBookedSeat_left_table');
   			var cl='';
   			for ( var i = 0; i < ids.length; i++) {
   				cl = ids[i];
   				var rowObj = ctl_getRowObjForRowNo('indexBookedSeat_left_table',cl);
   				var color=rowObj.color;
   				var pricelevelname='';
   				var cls='';
   				if(color=='赤'){
   					cls="<span  class='chiColor dnb v_m'></span>";
   				}else if(color=='橙'){
   					cls="<span  class='chengColor dnb v_m'></span>";
   				}else if(color=='黄'){
   					cls="<span  class='huangColor dnb v_m'></span>";
   				}else if(color=='绿'){
   					cls="<span  class='lvColor dnb v_m'></span>";
   				}else if(color=='青'){
   					cls="<span  class='lvColor dnb v_m'></span>";
   				}else if(color=='蓝'){
   					cls="<span  class='lanColor dnb v_m'></span>";
   				}else if(color=='紫'){
   					cls="<span  class='ziColor dnb v_m'></span>";
   				}
				pricelevelname=cls+"<span class='v_m' style='padding-left:5px;'>"+rowObj.pricelevelname+"</span>";
   				ctl_setCell('indexBookedSeat_left_table', cl, 'pricelevelname', pricelevelname);
   			}
		},
		jsonReader:{
			root:"data",
			total:"totalPage",
			page:"page",
			records:"totalSize",
			repeatitems:false
		}
  });
}

//加载座位
function bookedseat_load(ccid,fqid){
	var data={ccid:ccid,fqid:fqid,operType:"querySeat"};
	publicAjaxRequest(indexBookedSeatService,data,jsonType, function(response) {
		var rdata = response.data.length;
	    var divHtml="";
	    for(var i=0;i<rdata;i++){
	    	var data=response.data;
	       	var pewid=data[i].pewid;//座位ID
	       	var color=data[i].color;
	       	var cls="";
	       	if(color=='赤'){
	       		cls="db chiColor";
	       	}else if(color=='橙'){
	       		cls="db chengColor";
	       	}else if(color=='黄'){
	       		cls="db huangColor";
	       	}else if(color=='绿'){
	       		cls="db lvColor";
	       	}else if(color=='青'){
	       		cls="db qingColor";
	       	}else if(color=='蓝'){
	       		cls="db lanColor";
	       	}else if(color=='紫'){
	       		cls="db ziColor";
	       	}else {
	       		cls="db";
	       	}
	    	divHtml+="<li class='l'><a class='"+cls+"' id='"+pewid+"a' onclick='save(\"" + pewid + "\")'><input type='checkbox'  style='display:none;'  name='checkbox'  id='"+pewid+"' value='"+pewid+"' /></a></li>";
	    }
	    $("#indexBookedSeat_seat_div").html(divHtml);		
	});
}


//预留分配加载售票点
function spd(name){
	var data = {name:name,operType:'queryXsd'};
	publicAjaxRequest(indexBookedSeatService,data,jsonType, function(response) {
		var len = response.data.length;
		var divHtml="";
		for(var i=0;i<len;i++){
			var payboxname=response.data[i].payboxname;
			var payboxid=response.data[i].payboxid;
			divHtml+="<a href='#'  onclick='ylfpcheckboxclick(\"" + payboxid + "\")'><div  id='"+payboxid+"div' class='pl15 pt10 pb10 pr15' >"+payboxname+"</div></a><input style='display:none;' type='checkbox' value='"+payboxid+"' name='payboxnamecheckbox' id='"+payboxid+"'/>";
		}
		$("#indexBookedSeat_ylfp_spd_div").html(divHtml);
	});
}

//预留分配加载预留种类
function ylzl(name){
	var data = {name:name,operType:'queryYlzl'};
	publicAjaxRequest(indexBookedSeatService,data,jsonType, function(response) {
		var len = response.data.length;
		var divHtml="";
		for(var i=0;i<len;i++){
			var reservename=response.data[i].reservename;
			var reserveid=response.data[i].reserveid;
			divHtml+="<a href='#'  onclick='ylzlcheckboxclick(\"" + reserveid + "\")'><div  name='ylzldiv' id='"+reserveid+"div' class='pl15 pt10 pb10 pr15' >"+reservename+"</div></a><input style='display:none;' type='checkbox' value='"+reserveid+"' name='reservenamecheckbox' id='"+reserveid+"'/>";
		}
		$("#indexBookedSeat_ylfp_ylzl_div").html(divHtml);
	});
}

//设置选中
function ylzlcheckboxclick(id){
	if($("#"+id+"div").attr("class")=='pl15 pt10 pb10 pr15'){
		$("#"+id).attr("checked",true);
	}else{
		$("#"+id).attr("checked",false);
	}
	if($("#"+id).attr("checked")=='checked'){
		$("#"+id+"div").attr("class","c_f pl15 pt10 pb10 bggreen");
		$("#"+id).attr("checked",true);
	}else{
		$("#"+id+"div").attr("class","pl15 pt10 pb10 pr15");
		$("#"+id).attr("checked",false);
	}
}

//设置选中
function ylfpcheckboxclick(id){
	if($("#"+id+"div").attr("class")=='pl15 pt10 pb10 pr15'){
		$("#"+id).attr("checked",true);
	}else{
		$("#"+id).attr("checked",false);
	}
	if($("#"+id).attr("checked")=='checked'){
		$("#"+id+"div").attr("class","c_f pl15 pt10 pb10 bggreen");
		$("#"+id).attr("checked",true);
	}else{
		$("#"+id+"div").attr("class","pl15 pt10 pb10 pr15");
		$("#"+id).attr("checked",false);
	}
}

//设置选中
function save(id){
	$("#"+id).attr("checked",true);
	if($("#"+id).attr("checked")=='checked'){
		$("#"+id+"a").attr("class","db yes");
		$("#"+id).attr("checked",true);
		$("#"+id+"a").css("	border-color","red");
	}else{
		$("#"+id+"a").attr("class","db");
		$("#"+id).attr("checked",false);
	}
}

//新增套票政策
function initDetail_grid(prefpolicyid,width,sl){
	ctl_initGrid({
		jqGridId:"indexFavourable_yhzc_grid",
		serviceId:indexFavourableService,
		requestDataXml:{prefpolicyid:prefpolicyid,operType:"queryDetail"},
		singleRowData:true,
		dataFormat:jsonType,
		width:width,
		height:200,
		colNames:['detailid','票价等级ID','票价等级名称','票价','policyid','操作'],
		colModel:[
		{name:'detailid',index:'detailid',hidden:true},
		{name:'pricelevelid',index:'pricelevelid',hidden:true},
		{name:'pricelevelname',index:'pricelevelname'},
		{name:'price',index:'price'},
		{name:'policyid',index:'policyid',hidden:true},
		{name:'oper',index:'oper',align:"center",width:350}],
		pager:"indexFavourable_yhzc_pager",
		rowNum:10,
		viewrecords:true,
		rowList:[10,20,30],
		gridComplete:function(){		
			var ids = ctl_getAllDataIds('indexFavourable_yhzc_grid');
			var cl='';
			for ( var i = 0; i < ids.length; i++) {
				cl = ids[i];
				var rowObj = ctl_getRowObjForRowNo('indexFavourable_yhzc_grid',cl);
				var oper = "";
				var xg = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=updatePllicyDetail(\""+prefpolicyid+"\",\""+cl+"\",\""+sl+"\")>修改</a>";
				var sc = "<a href='javascript:void(0)' style='text-decoration:underline;color:#0061b3;font-weight:bold;' onclick=deletePllicyDetail(\""+rowObj.detailid+"\",\""+prefpolicyid+"\",\""+rowObj.price+"\")>删除</a>";   				
				oper=xg+" | "+sc;
				ctl_setCell('indexFavourable_yhzc_grid', cl, 'oper', oper);
			}
		},
		jsonReader:{
			root:"data",
			total:"totalPage",
			page:"page",
			records:"totalSize",
			repeatitems:false
		}
	});
}

//修改票价等级的数据
function updatePllicyDetail(prefpolicyid,rowId,sl){
	var dlg = ctl_dialogDivClose('', {
        title: '修改明细',
        content: 'indexFavourable_detail_update_div',
        lock: true,
        min: false,
        max: false,
        drag: false,
        resize: false
    },
    ['indexFavourable_detail_cancel_btn']); 
	var rowObj = ctl_getRowObjForRowNo('indexFavourable_yhzc_grid',rowId);
	var policyid=rowObj.policyid;
	var detailid=rowObj.detailid;
	$("#indexFavourable_detail_sl").val(sl);	

	//票价等级
	$("#indexFavourable_detail_pjdj").ctl_select({
	        id: 'indexFavourable_detail_pjdj_sel',
	        width: 115,
	        listboxmaxheight: 300,
			listboxalign : 'auto',
			listboxmaxheight : 200,
			dialogId:'indexFavourable_detail_update_div',
			columns : 1,
	        checkbox: false,
	        disabled: false,
	        columnValue: 'pricelevelid',
	        hiddenId:'indexFavourable_detail_pjdj_name',
	        columnName: 'pname',
	        selected:[''],
	        url: springMvcUrl,
	        type: 'post',
	        dateType: 'json',
	        param: {
	            param: getParam(indexFavourableService),
	            data: "{operType:'queryPjdj',sessionsid:'"+sessionsid+"'}"
	        },onchange:function(name,value){
	        	var pricename=name;
				var price=pricename.split("(")[1];
				var p=price.substring(0,price.length-2);
				var sumPrice=p*parseInt($("#indexFavourable_detail_sl").val());
				$("#indexFavourable_detail_jg").val(sumPrice);
	        }
   });	
	
	$("#indexFavourable_detail_sl").change(function(){
		var ccmc=sessionsid;
		var pjdj=$("#indexFavourable_detail_pjdj_sel").val();
		var name=$("#indexFavourable_detail_pjdj_name").val();
		if($.trim(ccmc)==""){
			ctl_showMsg("场次不能为空");
			return;
		}
		if($.trim(pjdj)==""){
			ctl_showMsg("请选择票价等级");
			return;
		}
		var sl=$("#indexFavourable_detail_sl").val();
		if($.trim(sl)==""){
			ctl_showMsg("请输入数量");
			return;
		}
		var pricename=name;
		var price=pricename.split("(")[1];
		var p=price.substring(0,price.length-2);
		var sumPrice=p*parseInt($("#indexFavourable_detail_sl").val());
		$("#indexFavourable_detail_jg").val(sumPrice);
	});
	
	//保存
	$("#indexFavourable_detail_save_btn").click(function(){	
		var sl=$("#indexFavourable_detail_sl").val();
		var jg=$("#indexFavourable_detail_jg").val();
		var pjdj=$("#indexFavourable_detail_pjdj_sel").val();
		var ccmc=sessionsid;
		if($.trim(ccmc)==""){
			ctl_showMsg("场次名称不能为空");
			return;
		}
		if($.trim(sl)==""){
			ctl_showMsg("数量不能为空");
			return;
		}
		if($.trim(pjdj)==""){
			ctl_showMsg("票价不能为空");
			return;
		}
		if($.trim(jg)==""){
			ctl_showMsg("总价不能为空");
			return;
		}
		var data={detailid:detailid,pjdj:pjdj,jg:jg,sl:sl,policyid:policyid,ccmc:ccmc,operType:'updateDetail'};
		publicAjaxRequest(indexSetPolicyService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				dlg.close();
				ctl_reloadGrid('indexSetPllicy_grid');
				ctl_reloadGrid('indexFavourable_yhzc_grid');
				ctl_showMsg("修改成功！");
			}else if("fail" == rdata){
				ctl_showMsg("修改失败");
			}else {
				ctl_showMsg("修改失败！");
			}
		});
	});
}

function deletePllicyDetail(detailid,setpolicyid,price){
	ctl_confirm("您确定要删除吗？",function() {
		var data = {operType:"deleteDetail",detailid:detailid,setpolicyid:setpolicyid,price:price};
		publicAjaxRequest(indexSetPolicyService,data,jsonType, function(response) {
			var rdata = response.data;
			if("success" == rdata) {
				ctl_reloadGrid('indexFavourable_yhzc_grid');
				ctl_showMsg("删除成功！");
			}else {
				ctl_showMsg("删除失败！");
			}
		});
	},function(){});
}


//加载优惠政策
function yhzcFunc(){
	
	//票价等级
	$("#indexFavourable_pjdj").ctl_select({
        id: 'indexFavourable_pjdj_sel',
        width: 115,
        listboxmaxheight: 300,
		listboxalign : 'auto',
		listboxmaxheight : 200,
		dialogId:'indexFavourable_div',
		columns : 1,
        checkbox: false,
        disabled: false,
        columnValue: 'pricelevelid',
        hiddenId:'indexFavourable_pjdj_name',
        columnName: 'pname',
        selected:[''],
        url: springMvcUrl,
        type: 'post',
        dateType: 'json',
        param: {
            param: getParam(indexFavourableService),
            data: "{operType:'queryPjdj',sessionsid:'"+sessionsid+"'}"
        },onchange:function(name,value){
        	var pricename=name;
			var price=pricename.split("(")[1];
			var p=price.substring(0,price.length-2);
			var zk=parseInt($("#indexFavourable_zkbl").val())/100;
			var s=parseFloat(zk);
			var sumPrice=p*parseInt($("#indexFavourable_sl").val())*s;
			$("#indexFavourable_pj").val(sumPrice);
        }
    });	
	
	$("#indexFavourable_sl").change(function(){
		var ccmc=sessionsid;
		var pjdj=$("#indexFavourable_pjdj_sel").val();
		var name=$("#indexFavourable_pjdj_name").val();
		var zkbl=$("#indexFavourable_zkbl").val();
		if($.trim(ccmc)==""){
			ctl_showMsg("请先选择场次");
			return;
		}
		if($.trim(pjdj)==""){
			ctl_showMsg("请选择票价等级");
			return;
		}
		if($.trim(zkbl)==""){
			ctl_showMsg("请输入折扣比例");
			return;
		}
		var sl=$("#indexFavourable_sl").val();
		if($.trim(sl)==""){
			ctl_showMsg("请输入数量");
			return;
		}
		var pricename=name;
		var price=pricename.split("(")[1];
		var p=price.substring(0,price.length-2);
		var zk=parseInt($("#indexFavourable_zkbl").val())/100;
		var s=parseFloat(zk);
		var sumPrice=p*parseInt($("#indexFavourable_sl").val())*s;
		$("#indexFavourable_pj").val(sumPrice);
	});
	
	$("#indexFavourable_zkbl").change(function(){
		var ccmc=$("#indexFavourable_ccmc_sel").val();
		var pjdj=$("#indexFavourable_pjdj_sel").val();
		var name=$("#indexFavourable_pjdj_name").val();
		var zkbl=$("#indexFavourable_zkbl").val();
		if($.trim(ccmc)==""){
			ctl_showMsg("请先选择场次");
			return;
		}
		if($.trim(pjdj)==""){
			ctl_showMsg("请选择票价等级");
			return;
		}
		if($.trim(zkbl)==""){
			ctl_showMsg("请输入折扣比例");
			return;
		}
		var sl=$("#indexFavourable_sl").val();
		if($.trim(sl)==""){
			ctl_showMsg("请输入数量");
			return;
		}
		var pricename=name;
		var price=pricename.split("(")[1];
		var p=price.substring(0,price.length-2);
		var zk=parseInt($("#indexFavourable_zkbl").val())/100;
		var s=parseFloat(zk);
		var sumPrice=p*parseInt($("#indexFavourable_sl").val())*s;
		$("#indexFavourable_pj").val(sumPrice);
	});		
	
	//保存
	$("#indexFavourable_ok_btn").click(function(){	
		var yhzcmc=$("#indexFavourable_yhzcmc").val();	
		var zkbl=$("#indexFavourable_zkbl").val();		
		var ccmc=sessionsid;//场次名称	
		var kssj=$("#indexFavourable_kssj").val();//开始时间
		var jssj=$("#indexFavourable_jssj").val();//结束时间
		var bj=$("#indexFavourable_bj").val();//标记
		var pjdj=$("#indexFavourable_pjdj_sel").val();//票价等级
		var sl=$("#indexFavourable_sl").val();//数量		
		var pj=$("#indexFavourable_pj").val();
		if(""==yhzcmc){
			ctl_showMsg("优惠政策名称不能为空");
			return;
		}
		if(""==zkbl){
			ctl_showMsg("折扣比例不能为空");
			return;
		}
		if(""==ccmc){
			ctl_showMsg("场次名称不能为空");
			return;
		}
		if(""==sl){
			ctl_showMsg("数量不能为空");
			return;
		}
		if(""==kssj){
			ctl_showMsg("开始时间不能为空");
			return;
		}
		if(""==jssj){
			ctl_showMsg("结束时间不能为空");
			return;
		}
		if(""==pjdj){
			ctl_showMsg("票价等级不能为空");
			return;
		}	
		if(""==pj){
			ctl_showMsg("票价不能为空");
			return;
		}
		var data={ccmc:ccmc,yhzcmc:yhzcmc,zkbl:zkbl,kssj:kssj,jssj:jssj,bj:bj,pjdj:pjdj,pj:pj,sl:sl,prefpolicyid:prefpolicyid,operType:'add'}; 
	     publicAjaxRequest(indexFavourableService,data,jsonType, function(response) {
				var rdata = response.data;
				prefpolicyid=rdata;
				if(""!= rdata) {
					ctl_showMsg("新增成功！");
		            var divHtml="<table id='indexFavourable_yhzc_grid' width='100%'></table><div id='indexFavourable_yhzc_pager'></div>";
		            $("#indexFavourable_yhzc_grid_div").html(divHtml);
					initDetail_grid(prefpolicyid,600,zkbl,sl);
				}else if("fail" == rdata){
					ctl_showMsg("新增失败");
				}else {
					ctl_showMsg("新增失败！");
				}
			});

	});	
}