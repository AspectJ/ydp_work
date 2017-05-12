var rolePer = "";
var cardConfPer = "";
var cardPer = "";
var usertheaternum = "";
var userroletype = "";
var usertheatername = "";

$(function() {
	getPer();
});

function getPer(){
	usertheaternum = localStorage.getItem("theaternum");
	userroletype = localStorage.getItem("roletype"); 
    usertheatername = localStorage.getItem("theatername"); 
	var menu = localStorage.getItem("menuinfo");
	var menuinfo = JSON.parse(menu);
	if(menuinfo != null){
		for(var i=0;i<menuinfo.length;i++){
			var requesturl = menuinfo[i].requesturl;
			if(requesturl == "manager/userInfoList.html"){
				var show = menuinfo[i].show;
				if(show != null){
					for(var j=0;j<show.length;j++){
						var label = show[j].requesturl;
						rolePer = rolePer + label + ",";
						$("#"+label).show();
					}
				}
			}else if(requesturl == "manager/cardConfList.html"){
				var show = menuinfo[i].show;
				if(show != null){
					for(var j=0;j<show.length;j++){
						var label = show[j].requesturl;
						cardConfPer = cardConfPer + label + ",";
						$("#"+label).show();
					}
				}
			}else if(requesturl == "manager/cardChargeOff.html"){
				var show = menuinfo[i].show;
				if(show != null){
					for(var j=0;j<show.length;j++){
						var label = show[j].requesturl;
						cardPer = cardPer + label + ",";
						$("#"+label).show();
					}
				}
			}
		}
	}
}