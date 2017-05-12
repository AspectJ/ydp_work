function initFreeDrag(option) {

	// 下面是自定义回调事件
	var beforeDragCallBack = option.beforeDragCallBack;
	var dragedCallBack = option.dragedCallBack;
	var beforeDropCallBack = option.beforeDropCallBack;
	var dropedCallBack = option.dropedCallBack;

	var startCallBack = option.startCallBack;
	var sortCallBack = option.sortCallBack;
	var changeCallBack = option.changeCallBack;
	var beforeStopCallBack = option.beforeStopCallBack;
	var stopCallBack = option.stopCallBack;
	var updateCallBack = option.updateCallBack;
	var receiveCallBack = option.receiveCallBack;
	var removeCallBack = option.removeCallBack;
	var overCallBack = option.overCallBack;

	var iNettuts = {

		jQuery : $,

		settings : {
			columns : '.dragableContainer',
			widgetSelector : '.dragableWidget',
			handleSelector : '.dragableWidget-head',
			contentSelector : '.dragableWidget-content',
			widgetDefault : {
				movable : true,
				removable : false,
				collapsible : false,
				editable : false,
				colorClasses : [ 'color-yellow', 'color-red', 'color-blue',
						'color-white', 'color-orange', 'color-green' ]
			},
			widgetIndividual : {
				intro1 : {
					movable : false,
					removable : false,
					collapsible : false,
					editable : false
				}
			}
		},

		init : function() {
			this.attachStylesheet('inettuts.js.css');
			this.addWidgetControls();
			this.makeSortable();
		},

		getWidgetSettings : function(id) {
			var $ = this.jQuery, settings = this.settings;
			return (id && settings.widgetIndividual[id]) ? $.extend({},
					settings.widgetDefault, settings.widgetIndividual[id])
					: settings.widgetDefault;
		},

		addWidgetControls : function() {
			var iNettuts = this, $ = this.jQuery, settings = this.settings;

			$(settings.widgetSelector, $(settings.columns))
					.each(
							function() {
								var thisWidgetSettings = iNettuts
										.getWidgetSettings(this.id);
								if (thisWidgetSettings.removable) {
									$('<a href="#" class="remove">CLOSE</a>')
											.mousedown(function(e) {
												e.stopPropagation();
											})
											.click(
													function() {
														if (confirm('This widget will be removed, ok?')) {
															$(this)
																	.parents(
																			settings.widgetSelector)
																	.animate(
																			{
																				opacity : 0
																			},
																			function() {
																				$(
																						this)
																						.wrap(
																								'<div/>')
																						.parent()
																						.slideUp(
																								function() {
																									$(
																											this)
																											.remove();
																								});
																			});
														}
														return false;
													}).appendTo(
													$(settings.handleSelector,
															this));
								}

								if (thisWidgetSettings.editable) {
									$('<a href="#" class="edit">EDIT</a>')
											.mousedown(function(e) {
												e.stopPropagation();
											})
											.toggle(
													function() {
														$(this)
																.css(
																		{
																			backgroundPosition : '-66px 0',
																			width : '55px'
																		})
																.parents(
																		settings.widgetSelector)
																.find(
																		'.edit-box')
																.show()
																.find('input')
																.focus();
														return false;
													},
													function() {
														$(this)
																.css(
																		{
																			backgroundPosition : '',
																			width : ''
																		})
																.parents(
																		settings.widgetSelector)
																.find(
																		'.edit-box')
																.hide();
														return false;
													}).appendTo(
													$(settings.handleSelector,
															this));
									$(
											'<div class="edit-box" style="display:none;"/>')
											.append(
													'<ul><li class="item"><label>Change the title?</label><input value="'
															+ $('b', this)
																	.text()
															+ '"/></li>')
											.append(
													(function() {
														var colorList = '<li class="item"><label>Available colors:</label><ul class="colors">';
														$(
																thisWidgetSettings.colorClasses)
																.each(
																		function() {
																			colorList += '<li class="'
																					+ this
																					+ '"/>';
																		});
														return colorList
																+ '</ul>';
													})()).append('</ul>')
											.insertAfter(
													$(settings.handleSelector,
															this));
								}

								if (thisWidgetSettings.collapsible) {
									$(
											'<a href="#" class="collapse">COLLAPSE</a>')
											.mousedown(function(e) {
												e.stopPropagation();
											})
											.toggle(
													function() {
														$(this)
																.css(
																		{
																			backgroundPosition : '-38px 0'
																		})
																.parents(
																		settings.widgetSelector)
																.find(
																		settings.contentSelector)
																.hide();
														return false;
													},
													function() {
														$(this)
																.css(
																		{
																			backgroundPosition : ''
																		})
																.parents(
																		settings.widgetSelector)
																.find(
																		settings.contentSelector)
																.show();
														return false;
													}).prependTo(
													$(settings.handleSelector,
															this));
								}
							});

			$('.edit-box')
					.each(
							function() {
								$('input', this)
										.keyup(
												function() {
													$(this)
															.parents(
																	settings.widgetSelector)
															.find('b')
															.text(
																	$(this)
																			.val().length > 20 ? $(
																			this)
																			.val()
																			.substr(
																					0,
																					20)
																			+ '...'
																			: $(
																					this)
																					.val());
												});
								$('ul.colors li', this)
										.click(
												function() {

													var colorStylePattern = /\bcolor-[\w]{1,}\b/, thisWidgetColorClass = $(
															this)
															.parents(
																	settings.widgetSelector)
															.attr('class')
															.match(
																	colorStylePattern);
													if (thisWidgetColorClass) {
														$(this)
																.parents(
																		settings.widgetSelector)
																.removeClass(
																		thisWidgetColorClass[0])
																.addClass(
																		$(this)
																				.attr(
																						'class')
																				.match(
																						colorStylePattern)[0]);
													}
													return false;

												});
							});

		},

		attachStylesheet : function(href) {
			var $ = this.jQuery;
			return $(
					'<link href="' + href
							+ '" rel="stylesheet" type="text/css" />')
					.appendTo('head');
		},

		makeSortable : function() {
			var iNettuts = this, $ = this.jQuery, settings = this.settings, $sortableItems = (function() {
				var notSortable = '';
				$(settings.widgetSelector, $(settings.columns)).each(
						function(i) {
							if (!iNettuts.getWidgetSettings(this.id).movable) {
								if (!this.id) {
									this.id = 'widget-no-id-' + i;
								}
								notSortable += '#' + this.id + ',';
							}
						});

				// 此处为兼容ie添加
				if (notSortable == '') {
					notSortable = "''";
					return $("> li", settings.columns);
				}
				return $('> li:not(' + notSortable + ')', settings.columns);
			})();

			$sortableItems.find(settings.handleSelector).css({
				cursor : 'move'
			}).mousedown(function(e) {
				$sortableItems.css({
					width : ''
				});
				$(this).parent().css({
					width : $(this).parent().width() + 'px'
				});
			}).mouseup(function() {
				if (!$(this).parent().hasClass('dragging')) {
					$(this).parent().css({
						width : ''
					});
				} else {
					$(settings.columns).sortable('disable');
				}
			});

			$(settings.columns)
					.sortable(
							{
								items : $sortableItems,
								connectWith : $(settings.columns),
								handle : settings.handleSelector,
								placeholder : 'dragableWidget-placeholder',
								forcePlaceholderSize : true,
								revert : 100,
								delay : 50,
								opacity : 0.8,
								containment : 'document',
								start : function(e, ui) {
									$(ui.helper).addClass('dragging');
									var target = $(e.target);
									if (startCallBack != null) {
										for ( var i = 0; i < startCallBack
												.keys().length; i++) {
											var key = startCallBack.keys()[i];
											if (key == target.attr('id')) {
												(startCallBack.get(key))(e,ui);
												break;
											}
										}
									}
								},
								beforeStop : function(e, ui) {
									var target = $(e.target);
									if (beforeStopCallBack != null) {
										for ( var i = 0; i < beforeStopCallBack
												.keys().length; i++) {
											var key = beforeStopCallBack.keys()[i];
											if (key == target.attr('id')) {
												(beforeStopCallBack.get(key))
														(e);
												break;
											}
										}
									}
								},
								stop : function(e, ui) {
									$(ui.item).css({
										width : ''
									}).removeClass('dragging');
									$(settings.columns).sortable('enable');

									
									
									var target = $(e.target);
									if (stopCallBack != null) {
										for ( var i = 0; i < stopCallBack
												.keys().length; i++) {
											var key = stopCallBack.keys()[i];
											if (key == target.attr('id')) {
												(stopCallBack.get(key))(e,ui);
												break;
											}
										}
									}
								},

								over : function(e, ui) {
									var target = $(e.target);
									if (overCallBack != null) {
										for ( var i = 0; i < overCallBack
												.keys().length; i++) {
											var key = overCallBack.keys()[i];
											if (key == target.attr('id')) {
												(overCallBack.get(key))(e,ui);
												break;
											}
										}
									}
								},
								remove : function(e, ui) {
									var target = $(e.target);
									if (removeCallBack != null) {
										for ( var i = 0; i < removeCallBack
												.keys().length; i++) {
											var key = removeCallBack.keys()[i];
											if (key == target.attr('id')) {
												(removeCallBack.get(key))(e,ui);
												break;
											}
										}
									}
								},
								receive : function(e, ui) {
									var target = $(e.target);
									if (receiveCallBack != null) {
										for ( var i = 0; i < receiveCallBack
												.keys().length; i++) {
											var key = receiveCallBack.keys()[i];
											if (key == target.attr('id')) {
												(receiveCallBack.get(key))(e,ui);
												break;
											}
										}
									}
								},
								update : function(e, ui) {
									var target = $(e.target);
									if (updateCallBack != null) {
										for ( var i = 0; i < updateCallBack
												.keys().length; i++) {
											var key = updateCallBack.keys()[i];
											if (key == target.attr('id')) {
												(updateCallBack.get(key))(e,ui);
												break;
											}
										}
									}
								},
								change : function(e, ui) {
									var target = $(e.target);
									if (changeCallBack != null) {
										for ( var i = 0; i < changeCallBack
												.keys().length; i++) {
											var key = changeCallBack.keys()[i];
											if (key == target.attr('id')) {
												(changeCallBack.get(key))(e,ui);
												break;
											}
										}
									}
								},
								sort : function(e, ui) {
									var target = $(e.target);
									if (sortCallBack != null) {
										for ( var i = 0; i < sortCallBack
												.keys().length; i++) {
											var key = sortCallBack.keys()[i];
											if (key == target.attr('id')) {
												(sortCallBack.get(key))(e,ui);
												break;
											}
										}
									}
								}
							});
		}

	};

	try {
		iNettuts.init();
	} catch (e) {
		alert(e.toLocaleString());
	}
}
