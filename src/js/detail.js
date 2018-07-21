$(function() {
    var winH = $(window).height(), 
        winW = $(window).width(),
        /*移动端菜单显示标志*/
        menuisshow = false,
        /*返回顶部定时器*/
        backtop = null;
    // 事件执行
    (function() {
        if(winW <= 1200){
          // 移动端事件管理
          touchEvent();
          layoutMenu();
          addVideoPlay();
        }else{
          // pc端事件管理
          hoverPlayVideo();
        }
        clickEvent();
        prodcShow();
        playVideo();
        resizeEvent();
    }());
    //
    function resizeEvent(){
      $(window).on("resize", function(){
        winH = $(window).height();
        winW = $(window).width();
      })
    }
    //点击事件
    function clickEvent() {
        //产品详情
        $(".intro").on("click", function() {
        	var index = $(this).index();
        	if($(".arrimg").eq(index).hasClass('arr-bottom')){
	          $(".intro-list").eq(index).stop().slideUp();
	          $(".arrimg").eq(index).removeClass('arr-bottom');
        	}else{
        	  $(".intro-list").eq(index).stop().slideDown();
	          $(".arrimg").eq(index).addClass('arr-bottom');
        	}
        });
    }
    //移动端事件操作
    function touchEvent() {
        // 菜单下拉
        $('#menuBtn').on('touchend', function(e) {
          e.stopPropagation();
          menuSlide();
        });
        //返回顶部
        $('#backtop').on('touchend', function() {
          cancelAnimationFrame(backtop);
          backtop = requestAnimationFrame(function fn(){
              var oTop = document.body.scrollTop || document.documentElement.scrollTop;
              if(oTop > 0){
                  scrollTo(0, oTop-100);
                  backtop = requestAnimationFrame(fn);
              }else{
                  cancelAnimationFrame(backtop);
              }    
          });
        });
    };
    // 产品图片展示，轮播
    function prodcShow() {
      var index = 0,
          total = $(".image-slider").length,
          width = $(".image-slider").width(),
          slide = new Hammer(document.getElementById("prodcslider"));
      function prodcAction(width, index){
      	$(".big-img-list").css("left", -width*index);
        $(".product_thumb").removeClass("checkon").eq(index).addClass("checkon");
      }
      function next() {
      	index = index < (total - 1) ? index+1 : total - 1;
        prodcAction(width, index);
      }
      function prev() {
      	index = index > 0 ? index-1 : 0;
      	prodcAction(width, index);
      }
      $(".next").on("click", next);
      $(".prev").on("click", prev);
	  slide.on('swiperight', prev);
      slide.on('swipeleft', next);
      $(".product_thumb").on("click", function() {
        var sub = $(this).index();
        index = sub;
        prodcAction(width, index);
      });
    }
    //菜单下拉处理
    function menuSlide() {
      if(menuisshow){
        $("#menulist").stop().slideUp();
        $('#menuBtn>img').eq(0).attr('src', 'images/ic_collection.png');
        menuisshow = false;
      }else{
        $("#menulist").stop().slideDown();
        $('#menuBtn>img').eq(0).attr('src', 'images/ic_shut_down.png');
        menuisshow = true;
      }
    }
   //pc菜单和移动菜单转换
    function layoutMenu() {
      $('#menulist').removeClass('jy-pc-nav').addClass('jy-mob-nav');
    }
   //生成视频播放组件
    function createVideo(src) {
       if(src){
          var dc = document,
              video = dc.createElement("video");
          video.setAttribute("width", "100%");
          video.setAttribute("height", "100%");
          video.setAttribute("controls", "controls");
          video.setAttribute("autoplay", "autoplay");
          video.setAttribute("src", src);
          var v_wrap = dc.createElement("section"),
              vc = dc.createElement("div"),
              cancle = dc.createElement("button");
          cancle.setAttribute("type", "button");
          cancle.setAttribute("id", "cancleVideo");
          cancle.className = "v-cancle";
          cancle.appendChild(dc.createTextNode("×"));
          vc.appendChild(cancle);
          vc.className = "jy-vc";
          vc.appendChild(video);
          v_wrap.setAttribute("id", "videoWrap");
          v_wrap.className = "jy-vc-wrap";
          v_wrap.appendChild(vc);
          var body = dc.getElementsByTagName("body")[0];
          body.appendChild(v_wrap);
          video.volume = 1;
          //添加视频取消事件
          body.addEventListener("click", removeVideo, false);
          v_wrap.addEventListener("touchmove", stopSlide, false);
          function stopSlide(e) {
            var event = e || window.event;
            event.preventDefault();
          }
          function removeVideo(e) {
            var event = e || window.event,
                target = event.target;
            if(target.id === "videoWrap" || target.id === "cancleVideo"){
                body.removeChild(v_wrap);
                body.removeEventListener("click", removeVideo, false);
            }
          }
       }
    }
    //当ban-icon处于移动端时增加视频播放功能
    function addVideoPlay() {
      $(".mask").addClass("gridVideo");
    }
    //点击、触摸播放视频
    function playVideo() {
      var source =["./video/001.mp4", "./video/002.mp4", "./video/003.mp4", "./video/003.mp4"];
    	$(".gridVideo").on("click", function(){
        var index = $(".gridVideo").index($(this));
	        createVideo(source[index]);
    	});
    }
    //鼠标悬浮播放视频
    function hoverPlayVideo() {
      $(".mask").on('mouseenter', function() {
        var index = $('.mask').index($(this));
        $(".video-cover-item").eq(index).addClass('video-cover-on').siblings().removeClass('video-cover-on').addClass('video-cover-dis');
        $(".section-bg").removeClass("section-bg-on").eq(index).addClass("section-bg-on");
        $(".video-item").removeClass("video-item-on").eq(index).addClass("video-item-on");
        var video = $(".video-item-on video")[0];
        video.currentTime = 0;
        video.play();
      });
      $(".mask").on('mouseleave', function() {
        var index = $('.mask').index($(this));
        $(".video-cover-item").removeClass('video-cover-on video-cover-dis');
        $(".section-bg").removeClass("section-bg-on");
        $(".video-item").removeClass("video-item-on video-cover-dis");
      });
    }

})
