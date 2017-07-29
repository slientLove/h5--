(function (doc, win) {
    // 分辨率Resolution适配
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
    (function(){
        var dpr = scale =1;
         var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
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

window.onload=function(){
    var winheight=document.documentElement.clientHeight;
    var obj = document.getElementById('top');
    // obj.style.height=winheight+'px';
  //   function GetSlideAngle(dx, dy) {  
  //             return Math.atan2(dy, dx) * 180 / Math.PI;  
  //         }  
   
  //         //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动  
  //         function GetSlideDirection(startX, startY, endX, endY) {  
  //             var dy = startY - endY;  
  //             var dx = endX - startX;  
  //             varresult = 0;  
   
  //             //如果滑动距离太短  
  //             if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {  
  //                 return result;  
  //             }  
   
  //             var angle = GetSlideAngle(dx, dy);  
  //             if(angle >= -45 && angle < 45) {  
  //                 result = 4;  
  //             }else if (angle >= 45 && angle < 135) {  
  //                 result = 1;  
  //             }else if (angle >= -135 && angle < -45) {  
  //                 result = 2;  
  //             }  
  //             else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {  
  //                 result = 3;  
  //             }  
   
  //             return result;  
  //         }  
   
  //         //滑动处理  
  //         var startX, startY;  
  //         obj.addEventListener('touchstart',function (ev) {  
  //             startX = ev.touches[0].pageX;  
  //             startY = ev.touches[0].pageY;    
  //         }, false);  
  //         obj.addEventListener('touchend',function (ev) {  
  //             var endX, endY;  
  //             endX = ev.changedTouches[0].pageX;  
  //             endY = ev.changedTouches[0].pageY;  
  //             var direction = GetSlideDirection(startX, startY, endX, endY);  
  //             switch(direction) {  
  //                 case 0:  
  //                     break;  
  //                 case 1:  
  //                     $('.h5share_box').stop(true).animate({top:-winheight},1000);
  //                     $('.container').show();
  //                     $('.down_img').hide();
  //                       $('.container img').each(function(){
  //                         var url=$(this).attr('data-img');
  //                         $(this).attr('src',url);
  //                         $(this).attr('data-img','');
  //                     })
  //                     setTimeout(function(){
  //                       $('.h5share_box').removeClass('h5share_class');
  //                       $('#top').hide();
  //                       $('#bottom_nav').show();
  //                       $('#bottom_nav').addClass('animated fadeInRight');
  //                     },1000);
                      
  //                     break;  
  //                 case 2:  
  //                     //alert("向下"); 
  //                     break;
  //                 case 3:  
  //                     //alert("向左");  
  //                     break;  
  //                 case 4:  
  //                     //alert("向右");  
  //                     break;  
  //                 default:             
  //             }  
  //         }, false);
  // $('.down_img').on('click',function(){
  //   $('.h5share_box').stop(true).animate({top:-winheight},1500);
  //   $('.container').show();
  //   $('.down_img').hide();
  //   $('.container img').each(function(){
  //     var url=$(this).attr('data-img');
  //     $(this).attr('src',url);
  //     $(this).attr('data-img','');
  //   })
  //   setTimeout(function(){
  //     $('.h5share_box').removeClass('h5share_class');
  //     $('#top').hide();
  //     $('#bottom_nav').show();
  //     $('#bottom_nav').addClass('animated fadeInRight');
  //   },1501);
  // })
  var url=location.href.split('#')[0];
  var enurl=encodeURIComponent(url);
  var imgurl='http://www.enjoykeys.com/h5/images/ico.jpg';
  $.ajax({
      url:"http://www.enjoykeys.com/smart_callcenter/weixin_accesses/get_weixin_web_config",
      type:"POST",
      dataType:"json",
      cache:false,
      data:{url:url},
      success:function(data){
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
                title: '【KEYS房东福利】TeamLab降临深圳',
                desc: '吃饭睡觉打KEYS，在花舞森林与未来游乐园里做了一场梦',
                link: data.url,
                imgUrl: imgurl,
                success: function (res) {
                  
                },
                cancel: function (res) {
                  
                }
              });
              wx.onMenuShareTimeline({
                title: '【KEYS房东福利】TeamLab降临深圳',
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
// var topHide=function(){
//   $('#top').addClass('animated zoomOutUp');
//   setTimeout(function(){
//     $('.container').css('display','block');
//     $('.video').addClass('animated zoomInUp')
//     $('#top').css('display','none');
//   },1000);
//   setTimeout(function(){
//     $('.content_box').show();
//     $('.container img').each(function(){
//       var url=$(this).attr('data-img');
//       $(this).attr('src',url);
//       $(this).attr('data-img','');
//     })
//     $('.content_box').addClass('animated fadeInUp');
//   },2000);
//   setTimeout(function(){
//     $('#bottom_nav').show();
//     $('#bottom_nav').addClass('animated fadeInRight');
//   },3000);
// }
function openApp(){ 
  window.location= "http://a.app.qq.com/o/simple.jsp?pkgname=com.ejoykeys.one.android";
}

