var ccid = null;//场次ID
var sessionscode  =null;//场次编号
var sessionsname  = null;//场次名称
var xmid=null;//项目代码
$(function() {
	ccid = $.cookie("ccid");
	$.cookie("ccid",null);
	sessionscode = $.cookie("sessionscode");
	$.cookie("sessionscode",null);
	sessionsname = $.cookie("sessionsname");
	$.cookie("sessionsname",null);
	xmid = $.cookie("itemid");
	$.cookie("itemid",null);
	$("#headdiv").load("pages/sessions/head.html");
	showstepurl("pages/sessions/addsession.html","第一步（场次）","创建场次");
	
});

function showstepurl(url,mstep,step){
	//打开相应的界面
	$("#contentdiv").load(url);
	$("#dqwz_span").html("您当前的位置：场次管理-"+step);
	$("#mstep_span").html(mstep);
	$("#step_span").html(step);	
}