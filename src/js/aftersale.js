$(function() {
    var winH = $(window).height(), 
        winW = $(window).width(),
        /*移动端菜单显示标志*/
        menuisshow = false,
        /*返回顶部定时器*/
        backtop = null;
    // 事件执行
    (function() {
        if(winW <= 1024){
          // 移动端事件管理
          touchEvent();
          layoutMenu();
        }else{
          // pc端事件管理
        }
          switchTit();
    }());
    
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



})
