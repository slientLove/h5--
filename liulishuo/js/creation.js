(function (doc, win) {

    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
        };

    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

    // 一物理像素在不同屏幕的显示效果不一样。要根据devicePixelRatio来修改meta标签的scale,要注释上面的meta标签
    (function () {
        var dpr = scale = 1;
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;

        // 
        var metaEl = "";
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    })();
})(document, window);



window.onload = function () {
    var winheight = document.documentElement.clientHeight;
    var obj = document.getElementById('top');
    obj.style.height = winheight + 'px';
    function GetSlideAngle(dx, dy) {
        return Math.atan2(dy, dx) * 180 / Math.PI;
    }

   

    /*滑动处理*/
    $('#top').on('click touchstart', function (event) {
        event.preventDefault();
        if (event.target.id === 'img_zhuan' || event.target.id === 'img_zhuan2') {
            return;
        } else {
            $('.h5share_box').stop(true).animate({ top: -winheight }, 800);
            $('.container').show();
            $('.down_img').hide();
            $('.container img').each(function () {
                var url = $(this).attr('data-img');
                $(this).attr('src', url);
                $(this).attr('data-img', '');
            })
            setTimeout(function () {
                $('.h5share_box').removeClass('h5share_class');
                $('#top').hide();
                $("#bottom_nav").animate({
                    "left":"0"
                },800)
            }, 801);
            
        }
    });


    var url = location.href.split('#')[0];
    var enurl = encodeURIComponent(url);
    var imgurl = 'http://www.enjoykeys.com/showTest/liulishuo/fenxiang.jpg';
    var ajaxurl = location.origin;
    
    $.ajax({
        url: ajaxurl + '/smart_callcenter/weixin_accesses/get_weixin_web_config',
        type: "POST",
        dataType: "json",
        cache: false,
        data: { url: url },
        success: function (data) {
            wx.config({
                debug: false,
                appId: 'wx2c9ca1095a4dfba4',
                timestamp: data.timestamp,
                nonceStr: data.noncestr,
                signature: data.sign,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ]
            });
            wx.ready(function () {
                
                wx.onMenuShareAppMessage({
                    title: 'KEYS × 英语流利说，打造今夏最潮party',
                    desc: '尽享新奇住宿体验',
                    link: data.url,
                    imgUrl: imgurl,
                    success: function (res) {
                    },
                    cancel: function (res) {

                    }
                });
                wx.onMenuShareTimeline({
                    title: 'KEYS × 英语流利说，打造今夏最潮party',
                    link: data.url,
                    imgUrl: imgurl,
                    success: function (res) {

                    },
                    cancel: function (res) {

                    }
                });
            });


        }
    })

}

function openApp() {
    window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.ejoykeys.one.android";
}

