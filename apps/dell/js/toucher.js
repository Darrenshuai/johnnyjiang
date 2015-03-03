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

$(function(){
	var h=$(window).height(),w=$(window).width();
	var b=$('.container');
	var a=$('.container section');
	var c=a.size();
	var k=0;
	var l = false,r=false,i=0;
	$("html").touchwipe({
		wipeUp: function() {
			if (k > 0) {
				k--;
				d(k, "up")
			}
		},
		wipeDown: function() {
			if (k <= c-2) {
				k++;
				d(k, "down")
			}
		},
		min_move_x: 80,
		min_move_y: 80,
		preventDefaultEvents: true
	});

	function d(p, n) {
		var o = h * p;
		b.css({
			"-webkit-transform": "translate3d(0, " + (-o) + "px, 0)"
		});
		setTimeout(function() {
			if (n === "up") {
				var q = p + 1
			} else {
				var q = p - 1
			}
			a.eq(q).removeClass("cur");
			a.eq(p).addClass("cur");
		}, 300)
	}
})