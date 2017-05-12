/**
 * 通用异步下载方法
 * 
 * @param paramData
 *            传递的参数 如："<roleName>" + roleName + "</roleName>"
 * @param serviceId
 *            serviceId相关参数 如："serviceId"
 * @param e
 *            单击事件
 */
function ctl_download(serviceId, paramData, requestType, dataType) {

	var param = null;
	var dataXml = null;
	if (dataType == jsonType) {
		dataXml = JSON.stringify(paramData);
		param = getParam(serviceId, undefined, dataType);
	} else {
		dataXml = getOneDataXml(paramData);
		param = getParam(serviceId);
	}

	$.generateFile({
				data : dataXml,
				param : param,
				script : springMvcUrl,
				requestType : requestType
			});

}

(function($) {

	// Creating a jQuery plugin:

	$.generateFile = function(options) {

		options = options || {};

		if (!options.script || !options.param) {
			throw new Error("参数中必须包含serviceId!");
		}
		if (options.requestType == null || options.requestType == "") {
			options.requestType = "GET";
		}

		// Creating a 1 by 1 px invisible iframe:

		var iframe = $('<iframe>', {
					width : 1,
					height : 1,
					frameborder : 0,
					css : {
						display : 'none'
					}
				}).appendTo('body');

		var formHTML = "<form action='' method='" + options.requestType + "'>"
				+ '<input type="hidden" name="data" />'
				+ '<input type="hidden" name="param" />' + '</form>';

		// Giving IE a chance to build the DOM in
		// the iframe with a short timeout:

		setTimeout(function() {

					// The body element of the iframe document:

					// alert(iframe.prop('paramDocument'));

					body = iframe.contents().find('body');

					// Adding the form to the body:
					body.html(formHTML);

					var form = body.find('form');

					form.attr('action', options.script);
					form.find('input[name=data]').val(options.data);
					form.find('input[name=param]').val(options.param);

					// Submitting the form to download.php. This will
					// cause the file download dialog box to appear.

					form.submit();
				}, 50);
	};

})(jQuery);
