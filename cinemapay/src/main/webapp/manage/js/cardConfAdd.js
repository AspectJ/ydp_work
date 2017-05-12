
$(function() {
	getArea();
	
	$("#starttime").click(function(){
		WdatePicker({minDate:new Date(),maxDate:'#F{$dp.$D(\'endtime\')}'});
	});
	
	$("#endtime").click(function(){
		WdatePicker({minDate:'#F{$dp.$D(\'starttime\')}',maxDate:''});
	});
	
	$("#cardtype").change(function(){
		var cardtype = $("#cardtype").val();
		if(cardtype == "0"){
			$("#countcard").show();
			$("#storecard").hide();
			appendCinemaTable();
		}else if(cardtype == "1"){
			$("#storecard").show();
			$("#countcard").hide();
			appendCinemaTable();
		}
	});
	
	$("#count,#quantity,#quantity_store").on("input",function(){
		checkNum(this);
	});
	
	$("#value,#value_store").on("input",function(){
		checkPrice(this);
	});
	
	$(".cancelBn").on("click",function(){
		window.location.href = "cardConfList.html";
	});
	
});




