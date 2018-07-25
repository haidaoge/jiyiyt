$(function() {
    var winH = $(window).height(), 
        winW = $(window).width(),
        /*监听导航栏滚动距离*/
        scrollTop = window.pageYOffset ? window.pageYOffset : window.document.documentElement.scrollTop,
        /*移动端菜单显示标志*/
        menuisshow = false,
        /*返回顶部定时器*/
        backtop = null;
    // 事件执行
    (function() {
        if(winW <= 1200){
          // 移动端事件管理
          stopTouchendPropagationAfterScroll();
          touchEvent();
          layoutMenu();
        }
        switchTit();
        addScrollEvent();
    }());
    //监听文档滚动
    function addScrollEvent() {
      $(window).on('scroll', function() {
        scrollTop = window.pageYOffset ? window.pageYOffset : window.document.documentElement.scrollTop;
        if(winW <= 1200){
          menuisshow = true;
          menuSlide();
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
    
    //菜单下拉处理
    function menuSlide() {
      if(menuisshow){
        $("#menulist").stop().slideUp();
        $('#menuBtn>img').eq(0).attr('src', 'images/ic_collection.png').removeClass("menu-close");
        menuisshow = false;
      }else{
        $("#menulist").stop().slideDown();
        $('#menuBtn>img').eq(0).attr('src', 'images/ic_shut_down.png').addClass("menu-close");
        menuisshow = true;
      }
    }
   //pc菜单和移动菜单转换
    function layoutMenu() {
      $('#menulist').removeClass('jy-pc-nav').addClass('jy-mob-nav');
    }
   //选项卡切换
    function switchTit() {
   	  $(".tit").on("click", function() {
   	  	var index = $(this).index();
   	  	$(".tit").addClass("tit-off").eq(index).removeClass("tit-off");
   	  	if(index === 0) {
   	  		$("#contentWrap").removeClass("service_on");
   	  	}else{
   	  		$("#contentWrap").addClass("service_on");
   	  	}
   	  })
    }
   //滑动阻止触发触摸事件(touchend)
    function stopTouchendPropagationAfterScroll(){
      var locked = false;
      window.addEventListener('touchmove', function(ev){
          locked || (locked = true, window.addEventListener('touchend', stopTouchendPropagation, true));
      }, true);
      function stopTouchendPropagation(ev){
          ev.stopPropagation();
          window.removeEventListener('touchend', stopTouchendPropagation, true);
          locked = false;
      }
    }


})
