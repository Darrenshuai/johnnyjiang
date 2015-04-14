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

	var images = ['images/img1.png', 'images/img2.png', 'images/img3.png', 'images/img4.png', 'images/house.png',
			'images/house.png', 'images/icon.png', 'images/icon1.png', 'images/icon2.png', 'images/icon3.png', 'images/job1.png',
			'images/job2.png', 'images/job3.png', 'images/job4.png'
		],
		bool = false,
		count = 0;

	for (var i = 0; i < images.length; i++) {
		img = new Image;
		img.src = images[i];
		img.onload = function() {
			count++;
			$('.load').html(parseInt(count / images.length * 100) + '%');
			if (count == images.length) {
				$('.load').fadeOut();
				a.css({
					'width': w + "px",
					'height': h + "px"
				});

				b.css({
					'width': c * w + "px"
				});

				a.find('.sect-inner').each(function() {
					var h = $(this).height();
					$(this).css({
						height: h + 'px',
						position: 'absolute'
					});
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

		if (p == 0) {
			$('.a_l').hide();
		} else if (p == c - 1) {
			$('.a_r').hide();
		} else {
			$('.a_l,.a_r').show();
		}

		var o = w * p,
			q;
		b.css({
			"-webkit-transform": "translate3d(-" + (o) + "px,0, 0)",
			"transform": "translate3d(-" + (o) + "px,0, 0)",
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

	$('.a_l').on('click', function() {
		if (k > 0) {
			k--;
			d(k, 'r')
		}
	});

	$('.a_r,.more').on('click', function() {
		if (k <= c - 2) {
			k++;
			d(k, 'l')
		}
	});
	
	$('.btns a').on('click touchend',function(){
		var m=$(this).data('jid');
		$('#'+m).addClass('show').siblings('.job-desc').removeClass('show');
	});

	//点击关闭
	$('.job-desc .close').on('click',function(){
		$(this).parent().addClass('hide').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
      		$(this).removeClass('show hide');
      	});
	});
})