var map, marker;
var cluster, markers = [];

$(function() {
	// Logo，地区，主菜单
	LogoMenuTextLoad(6);
	// 底部导航
	bottomTextLoad(1350);

	map = new AMap.Map("container", {
		resizeEnable: true,
		zoom: 15 // 范围
	});

	// var position = [113.012398,28.194393];
	// map.setCenter(position);
	// addCluster(position, "楚湘院线", "长沙市芙蓉区韭菜园南路16号金烨融府A座16018");
});


/**
 * 添加点聚合
 * @param {Object} position 设备的位置[123,123]
 */
function addCluster(position, cinemaName, cinemaAddress) {
	var marker = new AMap.Marker({
		map: map,
		icon: "http://developer.amap.com/wp-content/uploads/2014/06/marker.png",
		position: position,
		offset: { x: -8, y: -34 }
	});

	if(cinemaName != null && cinemaAddress != null){
		// 信息窗体内容
		var infoWindow = new AMap.InfoWindow({
	    autoMove: true,
	    offset: {x: 0, y: -30}
    });
    infoWindow.setContent(createContent(cinemaName, cinemaAddress));
		infoWindow.open(map, marker.getPosition());
	}
}


/**
 * 信息窗体内容
 * @param {Object} poi
 */
function createContent(cinemaName, cinemaAddress) {
	var content = "";
	content += "<div id='mark_cinema'>" + cinemaName + "</div>";
	content += "<div id='mark_address'>" + cinemaAddress + "</div>";
	return content;
}
