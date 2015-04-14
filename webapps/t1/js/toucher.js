(function(a) {
	a.fn.touchwipe = function(c) {
		var b = {
			min_move_x: 80,
			min_move_y: 80,
			wipeLeft: function() {},
			wipeRight: function() {},
			wipeUp: function() {},
			wipeDown: function() {},
			preventDefaultEvents: true
		};
		if (c) {
			a.extend(b, c)
		}
		this.each(function() {
			var e;
			var d;
			var i = false;

			function h() {
				this.removeEventListener("touchmove", f);
				e = null;
				i = false
			}

			function f(m) {
				if (b.preventDefaultEvents) {
					m.preventDefault()
				}
				if (i) {
					var j = m.touches[0].pageX;
					var n = m.touches[0].pageY;
					var l = e - j;
					var k = d - n;
					if (Math.abs(l) >= b.min_move_x) {
						h();
						if (l > 0) {
							b.wipeLeft()
						} else {
							b.wipeRight()
						}
					} else {
						if (Math.abs(k) >= b.min_move_y) {
							h();
							if (k > 0) {
								b.wipeDown()
							} else {
								b.wipeUp()
							}
						}
					}
				}
			}

			function g(j) {
				if (j.touches.length == 1) {
					e = j.touches[0].pageX;
					d = j.touches[0].pageY;
					i = true;
					this.addEventListener("touchmove", f, false)
				}
			}
			this.addEventListener("touchstart", g, false)
		});
		return this
	}
})(jQuery);


$(function() {

	var h = $(window).height(),
		w = $(window).width();
	var b = $('.cont');
	var a = $('.cont section');
	var c = a.size();
	var k = 0,
		l = false,
		r = false,
		i = 0;

	var images =new Array(),
		bool = false,
		count = 0;
	
	$('html,body').find('img').each(function(i) {
		images[i]=$(this).attr('src');
	});

	for (var i = 0; i < images.length; i++) {
		img = new Image;
		img.src = images[i];
		img.onload = function() {
			count++;
			if (count == images.length) {
				$('.load').fadeOut(100,function(){
					$('.cont section').eq(0).addClass('cur');
				});
				
				a.css({
					'width': w + "px",
					'height': h + "px"
				});

				b.css({
					'width': c * w + "px"
				});
				$(".cont").touchwipe({
					wipeLeft: function() {
						if (k <= c - 2) {
							k++;
							d(k, 'l')
						}
					},
					wipeRight: function() {
						if (k > 0) {
							k--;
							d(k, 'r')
						}
					},
					min_move_x: 80,
					min_move_y: 80,
					preventDefaultEvents: true
				});
			}
		}
	}

	function d(p, n) {

		if (p == c - 1) {
			$('.arr').hide();
		} else {
			$('.arr').show();
		}

		var o = w * p,
			q;
		b.css({
			"-webkit-transform": "translate3d(-" + (o) + "px,0, 0)"
		});
		setTimeout(function() {
			if (n === 'l') {
				q = p + 1
			} else {
				q = p - 1
			}
			a.eq(p).addClass("cur").siblings().removeClass('cur');
		}, 100)
	}

	$('.arr').on('click', function() {
		if (k <= c - 2) {
			k++;
			d(k, 'l')
		}
	});

	$('.sharetips a').on('click tap', function() {
		$('.sharepic').fadeIn(200);
	});

	$('.sharepic').on('click', function() {
		$(this).fadeOut(100);
	})
})