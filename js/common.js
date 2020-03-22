$(function () {

    $(".header-icon-change").click(function () {
        $(this).hide()
        $(".header-icon-xx").show();
        $(".header-detail").show()
    })
    $(".header-icon-xx").click(function () {
        $(this).hide()
        $(".header-icon-change").show();
        $(".header-detail").hide()
    })

    // 导航固定
    var viewHeight;
    var lastScrollTop = 0;
    $(window).scroll(function(){
        var st = $(this).scrollTop();
        viewHeight = $(window).height();
        if (st > lastScrollTop&& st > viewHeight){     //滚动条下滚
            $("nav").css({"position":"fixed","marginTop":"0"});

        }else{       //滚动条上滚
            if(st < lastScrollTop && st<=viewHeight){
                $("nav").css({"position":"relative","marginTop":"-.8rem"});
            }
        }
        lastScrollTop = st;
    });


})
