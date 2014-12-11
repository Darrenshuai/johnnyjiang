var SwipeApp = function(ele, tag) {
	var _$self = this;
	var _$element = $('#' + ele);
	var container = _$element.find('.con-inner');
	var totalh = 0; //容器总高度
	var totaltag = $(tag).length; //滑动屏幕的总数
	var tagheight = 0; //元素高度
	var current_pane = 0; //记录当前的显示


	var handleHeight = function() {
		container.css({
			'transition': 'all 700ms ease',
			'-webkit-transition': ' all 700ms ease'
		});
		tagheight = _$element.height(); //容器高度
		container.find(tag).each(function(i) {
			$(this).height(tagheight);
		});
		container.height(tagheight * totaltag);
	};

	//移动屏幕
	this.handleContainer = function(perh) {
		container.css({
			"transform": 'translate3d(0,' + perh + '%,0)',
			'-webkit-transform': 'translate3d(0,' + perh + '%,0)'
		});
	};
	//页面高宽设置函数
	// setPaneDimensions = function() {
	// 	pane_height = element.height();
	// 	panes.each(function() {
	// 		$(this).height(pane_height);
	// 	});
	// 	container.height(pane_height * pane_count);
	// },
	// //容器偏移值函数
	// setContainerOffset = function(percent, animate) {
	// 	container.removeClass("animate");
	// 	if (animate) {
	// 		container.addClass("animate");
	// 	}
	// 	container.css("transform", "translateY(" + percent + "%) scale3d(1,1,1)");
	// },
	//显示单前屏
	var showPane = function(index, animate) {
		var index = Math.max(0, Math.min(index, totaltag - 1));
		current_pane = index;
		var offsets = -((100 / totaltag) * current_pane);
		_$self.handleContainer(offsets);
		//setContainerOffset(offset, animate);
		//giveAnimate();
	};
	//上一屏
	this.next = function() {
		return showPane(current_pane + 1, true);
	};
	//下一屏
	this.prev = function() {
		return showPane(current_pane - 1, true);
	};
	var handlePress = function(event) {
		console.log(event.type);
	};
	return {
		init: function(options) {

			var defaultOptions = {
				touchActions: ['auto', 'pan-y', 'pan-x', 'pan-x pan-y', 'none']
			};

			$.extend(true, defaultOptions, options);

			var hammer = new Hammer(_$element[0], defaultOptions);
			hammer.get('swipe').set({
				enable: true
			});


			hammer.get('pan').set({
				direction: Hammer.DIRECTION_ALL
			});
			hammer.get('swipe').set({
				direction: Hammer.DIRECTION_VERTICAL
			});

			hammer.on('panmove panend', this.handlePan);
			//初始化高度
			handleHeight();
		},
		handlePan: function(event) {
			console.log(event.type);
			switch (event.type) {
				case 'panmove':
					var pane_offset = -(100 / totaltag) * current_pane;
					var drag_offset = ((100 / tagheight) * event.deltaY) / totaltag;

					// 首末页减速
					if ((current_pane == 0) || (current_pane == totaltag - 1)) {
						drag_offset *= .1;
					}
					_$self.handleContainer(drag_offset + pane_offset);
					break;
				case 'panend':
					if (event.offsetDirection == 8) {
						_$self.prev();
					} else if (event.offsetDirection == 16) {
						_$self.next();
					}
					break;
			}
		},
	};
}