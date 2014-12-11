/*
	zephyr
	demo.ver.1.0
 */

$(function() {
        function wxShare() {
            var wxMask = $('.wxmask');
            wxMask.on('click', function(event) {
                event.preventDefault();
                $(this).hide();
            });
        }

        wxShare();

        //微信相关事件
        var url = window.location.href,
            /*分享的地址*/
            image = 'http://special.zhaopin.com/h5/bj/campus120458/images/sharePic.jpg',
            /*分享图片*/
            desc = '校园部招聘', //分享描述
            title = document.title ; /*分享标题*/

        if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
            init();
        } else {
            if (document.addEventListener) {
                document.addEventListener("WeixinJSBridgeReady", init, false);
            } else if (document.attachEvent) {
                document.attachEvent("WeixinJSBridgeReady", init);
                document.attachEvent("onWeixinJSBridgeReady", init);
            }
        }

        function init() {
            WeixinJSBridge.on("menu:share:appmessage", shareToFriend); // 监听事件 - 发给朋友
            WeixinJSBridge.on("menu:share:timeline", shareToFriends); // 监听事件 - 朋友圈
        }

        function shareToFriend() {
            WeixinJSBridge.invoke("sendAppMessage", { // 发消息给朋友，当然，也可以通过其它方式主动触发
                appid: "",
                img_url: image,
                img_width: "80",
                img_height: "80",
                link: url,
                desc: desc,
                title: title
            }, function(res) {
                //alert(res.err_msg);
            });
        }

        function shareToFriends() {
            WeixinJSBridge.invoke("shareTimeline", {
                img_url: image,
                img_width: "80",
                img_height: "80",
                link: url,
                desc: desc, //不显示，但是还是要传
                title: desc
            }, function(res) {
                //alert(res.err_msg);
            });
        }
});