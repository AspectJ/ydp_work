var status = 1;

var 
//product_upload_privilege, // 添加商品
product_putaway_privilege, // 商品上架
product_soldout_privilege, // 商品下架
donwload_qrcode_privilege, // 下载二维码
product_edit_privilege, // 修改商品信息
product_del_privilege, // 删除商品信息
product_card_privilege; // 创建卡劵

$(function(){
	if(getPramStr("status") != null){
		status = getPramStr("status");	
		$(".main-box .data_box .operator span").removeClass("cur");
		$(".stayon").addClass("cur");
	}
	
	var menu = localStorage.getItem("menuinfo");
	var menuinfo = JSON.parse(menu);
	if(menuinfo != null){
		for(var i=0;i<menuinfo.length;i++){
			var requesturl = menuinfo[i].requesturl;
			if(requesturl == "manager/ProductList.html"){
				var show = menuinfo[i].show;
				if(show != null){
					for(var j=0;j<show.length;j++){
						var label = show[j].requesturl;
						if(label == "product_upload_privilege"){ $(".upload").css('display' ,'inline-block'); }
						else if(label == "product_putaway_privilege"){ product_putaway_privilege = 1; }
						else if(label == "product_soldout_privilege"){ product_soldout_privilege = 1; }
						else if(label == "donwload_qrcode_privilege"){ donwload_qrcode_privilege = 1; }
						else if(label == "product_edit_privilege"){ product_edit_privilege = 1; }
						else if(label == "product_del_privilege"){ product_del_privilege = 1; }
						else if(label == "product_card_privilege"){ product_card_privilege = 1; }
					}
				}
				break;
			}
		}
	}
	
	var header_nav = '',
	    url_status = window.location.href.split('status=');
	status = url_status[1];
	
	switch(status){
		case '-1':
			header_nav = '已下架商品';
			break;
		case '0':
			header_nav = '待上架商品';
			break;
		case '1':
			header_nav = '已上架商品';
			break;
	}
	$('.content-title span').html('您当前位置：首页/' + header_nav);
	loadData(1);
	
	$(".addgood").on("click", function(){
		window.location.href = "ProductUpload.html";
	});
//	$(".stayon").on("click", function(){
//		status = -1;
//		loadData(1);
//	});
//	$(".soldout").on("click", function(){
//		status = 0;
//		loadData(1);
//	});
//	$(".putaway").on("click", function(){
//		status = 1;
//		loadData(1);
//	});
//	$(".operator span").on("click", function(){
//		$(".operator span").removeClass("cur");
//		$(this).addClass("cur");
//	});
});


/**
 * 加载商品列表
 */
var page = 1;
var pagesize = 5;
var pagingsize = 3;
function loadData(side){
	page = pageUpDown(side);
	
	var param = {};
	param.page = page;
	param.pagesize = pagesize;
	param.status = status;
	param.filter = $(".filter_input").val();
	
	ajaxRequest("product/productList", "GET", true, param, 
		function(data) {
			var result = data.result;
			switch (result) {
				case 1000:
					var dataArr = [];
					dataList = data.data;
					var total = data.total;
					var totalpage = parseInt(total % pagesize == 0 ? total / pagesize : total / pagesize + 1);
					
					if(dataList != null && dataList.length > 0){
						for(var i=0; i<dataList.length; i++){
							var product = dataList[i];
							var dataJson = {};
//							dataJson.check = '<i class="check"></i>';
							dataJson.headimg =  'headimg||<img src="'+ product.headimg +'"/>';
							dataJson.productid = "fs_14||" + product.theaternum + product.productid;
							dataJson.productname =  product.productname;
							dataJson.price = "￥ " + product.price.toFixed(2);
							dataJson.status = "w60||" + getProductStatusText(product.status);
							dataJson.online = "w120||" + (product.online == 1 ? "线上/线下":"仅线下");
//							dataJson.intro = product.intro;
							dataJson.operator = product.username + "";
							dataJson.createtime = "w100||" + product.createtime;
							if(donwload_qrcode_privilege == 1){
								dataJson.qrcode = "w100||<i class='downqrcode'>下载二维码</i>";
							}
							
							var opreator = 'dataoperator||';
							if(product.status <= 0){
								if(product.cardid != null && product_putaway_privilege == 1){
									opreator += '<i class="product_putaway" onclick="productStatusChange( 1, '+ product.productid +')">上架</i>';
								}
							}else{
								if(product_soldout_privilege == 1){
									opreator += '<i class="product_soldout" onclick="productStatusChange( 0, '+ product.productid +')">下架</i>';
								}
							}
							if(product.cardid == null && product_card_privilege == 1){
								if(product_edit_privilege == 1){
									opreator += '<i class="edit">修改</i>';
								}
								if(product_del_privilege == 1){
									opreator += '<i class="del" onclick="operateTip(\'提示\', \'确认删除该信息?\', function(){delData('+ product.productid +');})">删除</i>';	
								}
								if(product_card_privilege == 1){
									opreator += '<i class="card">创建卡劵</i>';
								}
							}
							if( product_edit_privilege == 1 || product_del_privilege == 1 || product_card_privilege == 1){
								dataJson.opreator = opreator;
							}
							dataArr.push(dataJson);
						}
					}
					
					$(".data-tab tr").not(":first").remove();
					pushJsonData(".data-tab table", dataArr);
					
					// 分页
					var pagingstr = loadPaging(totalpage, page, pagingsize, "loadData");
					$(".data-tab-ul").html(pagingstr);
					break;
				default : errorTip( "加载错误", "数据加载错误：【"+ data.msg +"】" ); break;
			}
		}
		, null, function(){
			loading(); // 正在加载
			
			var table_head = '<tr><th class="w120">图片</th><th class="w100">商品ID</th><th>商品名称</th><th>价格</th><th>状态</th><th>渠道</th><th>操作员</th><th>创建时间</th>';
			table_head += donwload_qrcode_privilege == 1 ? '<th>二维码</th>' : "";
			if( product_edit_privilege == 1 || product_del_privilege == 1 || product_card_privilege == 1){
				table_head += '<th>操作</th>';
			}
			table_head += '</tr>';
			$(".data-tab table").append(table_head);
		}, 
		function(){
			loadover(); // 加载完
			
        	// 编辑商品
        	$(".edit").on("click", function(){
        		var product = dataList[$(this).parents("tr").attr("index")];
        		if(product.status < 1){
	        		window.location.href = "ProductUpload.html?productid=" + product.productid
        		}else{
        			errorTip("错误提示",data.msg);
        		}
        	});
        	// 添加卡劵、卡劵详情
        	$(".card").on("click", function(){
        		var productid = dataList[$(this).parents("tr").attr("index")].productid;
        		var skipurl = "ProductCoupons.html?productid=" + productid;
        		if($(this).attr("cardid") != null){
        			skipurl += "&cardid=" + $(this).attr("cardid");
        		}else{
        			window.location.href = skipurl;
        		}
        	});
        	// 查看、下载商品支付二维码
        	$(".downqrcode").unbind("click");
        	$(".downqrcode").bind("click", function() {
        		var product = dataList[$(this).parents("tr").attr("index")];
        		if(product.cardid != null){
	        		productQrcode(product.productid, product.productname); // 获取商品二维码
        		}else{
					errorTip("操作提示_2500", "对不起，请先创建卡劵再尝试下载！");
        		}
			});
        }
	);
}

/**
 * 删除数据
 */
function delData(productid){
	ajaxRequest("product/delProduct", "GET", true, {productid:productid},
		function(data) {
			result = data.result;
			switch (result) {
				case 1000: 
					if(dataList.length > 1){
						loadData(page); 	
					}else{
						loadData(page - 1); 
					}
					break;
				default :  errorTip( "提示", data.msg ); break;
			}
		},
		function(XMLHttpRequest, textStatus, errorThrown) {
			if(textStatus == "timeout"){$(".error-panel").text("请求超时").fadeIn(200).delay(1500).fadeOut(300);}
			console.log(textStatus);
		}
	);
}


/**
 * 修改商品状态(商品上架下架)
 * @param {Object} type 0-下架，1-上架
 * @param {Object} productid 单个商品ID
 */
function productStatusChange( status, productid ){
	var param = {};
	param.status = status;
	if(productid == null){
		if($(".data-tab").find(".checked").length > 1){
			var products = [];
			$(".data-tab").find(".checked").each(function(){
				if(!$(this).hasClass("checkall")){
					products[products.length] = dataList[$(this).parents("tr").attr("index")].productid;				
				}
			});
			param.products = JSON.stringify(products);
		}else{
			errorTip("请求错误", "您未选择需要"+ getProductStatusText(status) +"的商品！");
			return;
		}
	}else{
		param.productid = productid;
	}
	
	operateTip("确认修改", "您正在执行商品"+ getProductStatusText(status) +"操作", function(){
		ajaxRequest( "product/productStatusChange", "GET", true, param,
			function(data) {
				result = data.result;
				switch (result) {
					case 1000: 
						loadData();
						break;
					default :  errorTip( "请求错误", data.msg ); break;
				}
			}, null,
			loading(), loadover()
		)
	});
}

/**
 * 获取商品二维码
 */
function productQrcode(productid, productname){
	var param = {};
		param.productid = productid;
		
		$.ajax({
			url: service_url + "rest/product/productQrcode",
			type: "GET",
			data: param,
			dataType: 'json',
			async: false,
			beforeSend: function(request) {},
	        complete: function(){},
			success: function(data) {
				result = data.result;
				switch (result) {
					case 1000:
						var qrcodeURL = data.data;
						$(".scan_mask").fadeIn(200, "swing");
						$('#qrcode').qrcode({ width: 300, height:300, text: qrcodeURL });
						$(".cancel").on("click", function(){ $('#qrcode').html(""); $(".scan_mask").fadeOut(300, "swing"); });
						
						$(".donwload").on("click", function(){ 
							var measure = $("#measure").val();
							if(measure == ""){
								errorTip( "提示", "请输入合适的像素大小" );
								return;
							}
							
//							 var oCanvas = document.getElementById("#qrcode canvas");
							// Canvas2Image.saveAsPNG(oCanvas);  // 这将会提示用户保存PNG图片
							// Canvas2Image.saveAsPNG($("#qrcode canvas")[0], 2000, 2000)
							// Canvas2Image.saveAsPNG($("#qrcode canvas")[0], measure, measure)

							// 图片导出为 png 格式
							var type = 'png';
							// 创建一个下载的影藏试图
							var loadQRDiv = document.createElement("div");
							// 将二维码放入画布
							$(loadQRDiv).qrcode({ width: measure, height:measure, text: qrcodeURL });
							var imgData = $(loadQRDiv).find("canvas")[0].toDataURL(type);
							// 加工image data，替换mime type
							imgData = imgData.replace(_fixType(type),'image/octet-stream');
							// 下载后的问题名
							var filename = productname + '.' + type;
							// 下载图片
							saveFile(imgData, filename);

							$('#qrcode').html("");
							$(".scan_mask").fadeOut(300, "swing");
						});
						break;
					default :  errorTip( "提示", data.msg ); break;
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				if(textStatus == "timeout"){$(".error-panel").text("请求超时").fadeIn(200).delay(1500).fadeOut(300);}
				console.log(textStatus);
			},
			timeout: 120000
		});
}

/**
 * 商品状态
 * @param {Object} status
 */
function getProductStatusText(status){
	switch(status){
		case -1 : return "待上架";
		case 0 : return "下架";
		case 1 : return "上架";
	}
}


/**
 * 获取mimeType
 * @param  {String} type the old mime-type
 * @return the new mime-type
 */
var _fixType = function(type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    var r = type.match(/png|jpeg|bmp|gif/)[0];
    return 'image/' + r;
};


/**
 * 在本地进行文件保存
 * @param  {String} data     要保存到本地的图片数据
 * @param  {String} filename 文件名
 */
var saveFile = function(data, filename){
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = data;
    save_link.download = filename;
   
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
};