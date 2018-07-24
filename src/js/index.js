$(function() {
    var winH = $(window).height(), 
        winW = $(window).width(),
        gridCardScrollTop = $("#card1")[0].offsetTop - winH*2/3,
        /*监听导航栏滚动距离*/
        scrollTop = window.pageYOffset ? window.pageYOffset : window.document.documentElement.scrollTop,
        /*移动端菜单显示标志*/
        menuisshow = false,
        backtop = null;
    // 事件执行
    (function() {
        addResizeEvent();
        addScrollEvent();
        carousel();
        playVideo();
        langSlide();
        if(winW <= 1200){
          // 移动端事件管理
          touchEvent();
          layoutMenu();
        }else{
          // pc端事件管理
          
        }

    }());
    //监听窗口变化
    function addResizeEvent() {
      $(window).on("resize",function(){
        winH = $(window).height();
        winW = $(window).width();
        gridCardScrollTop = $("#gridCard")[0].offsetTop - winH*2/3;
        gridCardSlider();
      });
    }
    //监听文档滚动
    function addScrollEvent() {
      $(window).on('scroll', function() {
        scrollTop = window.pageYOffset ? window.pageYOffset : window.document.documentElement.scrollTop;
        gridCardScrollTop = $("#gridCard")[0].offsetTop - winH*2/3;
        // if(scrollTop > 10){
        //  $("header").addClass("header-fix");
        // }else{
        //  $("header").removeClass("header-fix");
        // }
        // //监听显示视频
        // if(scrollTop > 100){
        //  $(".grid-video li").addClass("anim-trans");
        //  $(".grid-video li").each(function(i, val){
        //    $(val).removeClass("vide-item"+(i+1));
        //    // console.log($(val));
        //  });
        // }else{
        //  $(".grid-video li").removeClass("anim-trans");
        //  $(".grid-video li").each(function(i, val){
        //    $(val).addClass("vide-item"+(i+1));
        //  });
        // }
        if(winW <= 1200){
          menuisshow = true;
          menuSlide();
        }else{
          gridCardSlider();
        }

      });
    }

    //中英文下拉
    function langSlide() {
      var key = false;
      $(".lang-on").on("click", function() {
        if(key){
          $("#jyLang").slideUp();
          key = false;
        }else{
           $("#jyLang").slideDown();
           key = true;
         }
      })
    }
    

    // 客户评论slider
    function gridCardSlider() {
      if(scrollTop > gridCardScrollTop){
        $("#gridCard li").addClass("anim-trans");
        $("#gridCard li").each(function(i, val){
          $(val).removeClass("card"+(i+1));
        });
      }else{
        $("#gridCard li").removeClass("anim-trans");
        $("#gridCard li").each(function(i, val){
          $(val).addClass("card"+(i+1));
        });
      }
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
              loading = dc.createElement("div"),
              loading = dc.createElement("div"),
              cancle = dc.createElement("button");
          cancle.setAttribute("type", "button");
          cancle.setAttribute("id", "cancleVideo");
          cancle.className = "v-cancle";
          cancle.appendChild(dc.createTextNode("×"));
          loading.className = "v-loading";
          vc.appendChild(loading);
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
          video.addEventListener('loadeddata', function() {
            if(video.readyState >= 3) {
              video.play();
              loading.style.display = "none";
            }

          });
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
    //点击、触摸播放视频
    function playVideo() {
      var source =["./video/sport.mp4", "./video/scenery.mp4", "./video/play.mp4"];
      $("#gridVideo").on("click", "li", function(){
        var index = $(this).index();
        if(winW <= 1200){
          // 移动端
          createVideo(source[index]);
        }else{
          // pc端
          if($(this).hasClass('vide-item2')){
            createVideo(source[index]);
          }
        }
      });
    }
    //视频轮播
    function carousel() {
        var source = ["vide-item1", "vide-item2", "vide-item3"];
        //上一张
        function previmg(){
          source.push(source[0]);
          source.shift();
          //i是元素的索引，从0开始
          //e为当前处理的元素
          //each循环，当前处理的元素移除所有的class，然后添加数组索引i的class
          $("#gridVideo li").each(function(i, e) {
            $(e).removeClass().addClass(source[i]);
          });
        }
        //下一张
        function nextimg(){
          source.unshift(source[2]);
          source.pop();
          $("#gridVideo li").each(function(i, e){
            $(e).removeClass().addClass(source[i]);
          })
        }
        
        $("#gridVideo .prev").on("click", function() {
          previmg();
        });
        $("#gridVideo .next").on("click", function() {
          nextimg();
        });
        // 左右图片点击事件
        $(document).on("click", ".vide-item1", function() {
          previmg();
        });
        $(document).on("click", ".vide-item3", function() {
          nextimg();
        });
    };

    //移动端事件操作
    function touchEvent() {
        // 菜单下拉
        $('#menuBtn').on('touchend', function(e) {
          e.stopPropagation();
          menuSlide();
        });
        //返回顶部
        $('#backtop').on('click', function() {
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
        })
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
    //pc移动菜单切换
    function layoutMenu() {
      $('#menulist').removeClass('jy-pc-nav').addClass('jy-mob-nav');
    }
    
})
