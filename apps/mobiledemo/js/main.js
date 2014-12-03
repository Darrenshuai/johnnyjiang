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

        //΢������¼�
        var url = window.location.href,
            /*����ĵ�ַ*/
            image = 'http://special.zhaopin.com/campus/2014/nj/hsyh112709/images/sharePic.jpg',
            /*����ͼƬ*/
            desc = '��������2015У԰��Ƹ', //��������
            title = document.title /*�������*/ ;

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
            WeixinJSBridge.on("menu:share:appmessage", shareToFriend); // �����¼� - ��������
            WeixinJSBridge.on("menu:share:timeline", shareToFriends); // �����¼� - ����Ȧ
        }

        function shareToFriend() {
            WeixinJSBridge.invoke("sendAppMessage", { // ����Ϣ�����ѣ���Ȼ��Ҳ����ͨ��������ʽ��������
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
                desc: desc, //����ʾ�����ǻ���Ҫ��
                title: desc
            }, function(res) {
                //alert(res.err_msg);
            });
        }
});