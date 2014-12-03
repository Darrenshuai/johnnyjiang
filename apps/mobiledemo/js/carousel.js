function verDrag(element) {
    element = $(element);
    var self = this;
    var container = $(">ul", element);
    var panes = $(">ul>li", element);
    var pane_height = 0;
    var pane_count = panes.length;
    var current_pane = 0;

    /* 初始化 */
    this.init = function() {
        setPaneDimensions();
        $(window).on("load resize orientationchange", function() {
            setPaneDimensions();
        })
        giveAnimate();
    };

    //页面高宽设置函数
    function setPaneDimensions() {
        pane_height = element.height();
        panes.each(function() {
            $(this).height(pane_height);
        });
        container.height(pane_height * pane_count);
    };

    //容器偏移值函数
    function setContainerOffset(percent, animate) {
        container.removeClass("animate");
        if (animate) {
            container.addClass("animate");
        }
        container.css("transform", "translateY(" + percent + "%) scale3d(1,1,1)");
    };

    //赋予动画函数
    function giveAnimate() {
        $('*[data-animation]').removeAttr("style");
        var $curPane = ".pane" + parseInt(current_pane + 1);
        $($curPane).find('*[data-animation]').each(function() {
            var $animate = $(this).data("animation"); //获取动画名字                
            $(this).css('-moz-animation', $animate).css('-webkit-animation', $animate).css('-o-animation', $animate);
        });
    }

    this.showPane = function(index, animate) {
        index = Math.max(0, Math.min(index, pane_count - 1));
        current_pane = index;
        var offset = -((100 / pane_count) * current_pane);
        setContainerOffset(offset, animate);
        giveAnimate();
        $('#arrow').show();
        if( current_pane == (pane_count -1)){
            $('#arrow').hide();
        }
    };

    this.next = function() {
        return this.showPane(current_pane + 1, true);
    };
	
    this.prev = function() {
        return this.showPane(current_pane - 1, true);
    };

    function handleHammer(ev) {
        //console.log(ev);
        switch (ev.type) {
            case 'dragup':
            case 'dragdown':
                ev.gesture.preventDefault();
                var pane_offset = -(100 / pane_count) * current_pane;
                var drag_offset = ((100 / pane_height) * ev.gesture.deltaY) / pane_count;

                // 首末页减速
                if ((current_pane == 0 && ev.gesture.direction == "down") ||
                    (current_pane == pane_count - 1 && ev.gesture.direction == "up")) {
                    drag_offset *= .1;
                }
                setContainerOffset(drag_offset + pane_offset);                
                $('.up_arrow').hide();
                break;

            case 'release':
                if (Math.abs(ev.gesture.deltaY) > pane_height / 4) {
                    if (ev.gesture.direction == 'down') {
                        self.prev();
                    } else {
                        self.next();
                    }
                } else {
                    self.showPane(current_pane, true);
                }
                break;
        }
    }

    var z_carousel = new Hammer(element[0], {
        drag_lock_to_axis: true,
        drag_block_vertical: true,
        drag_block_horizontal: false,
        swipe: false
    })
    z_carousel.on("release dragup dragdown", handleHammer);

    $('#arrow').click(function(event) {
        self.next();
    });

    $('.nextbtn').click(function(event) {
        self.next();
    });

    $('.prevbtn').click(function(event) {
        self.prev();
    });
}

