$(function () {

    whirligig(".index-score-item",".index-score-item0",".index-score-item1",".index-score-item2",".index-score-item3",".left-btn",".right-btn");

    //旋转木马函数
    function whirligig(fItem,item0,item1,item2,item3,left,right) {
        var imgIndex = 1;
        // 初始化
        var imgNum = $(fItem).find(item3).size();
        var item00 = $(fItem).find(item3).eq(0);
        var item11 = $(fItem).find(item3).eq(1);
        var item22 = $(fItem).find(item3).eq(2);
        item00.attr("class",item0.substring(1));
        item11.attr("class",item1.substring(1));
        item22.attr("class",item2.substring(1));

        if(imgNum>3){
            $(fItem).find(left).click(function () {

                if(imgIndex==0){
                    imgIndex = imgNum-1;
                }else{
                    imgIndex--;
                }
                $("#js-score-change").find("li").removeClass("active");
                $("#js-score-change").find("li").eq(imgIndex).addClass("active");

                $(fItem).find(item2).attr("class",item3.substring(1));
                $(fItem).find(item1).attr("class",item2.substring(1));
                $(fItem).find(item0).attr("class",item1.substring(1));
                $(fItem).find(item3).eq($(item3).size()-1).attr("class",item0.substring(1));
                $(fItem).find(item0).eq(0).insertAfter( $(fItem).find(left) );
            })

            $(fItem).find(right).click(function () {

                if(imgIndex==imgNum-1){
                    imgIndex = 0;
                }else{
                    imgIndex++;
                }
                $("#js-score-change").find("li").removeClass("active");
                $("#js-score-change").find("li").eq(imgIndex).addClass("active");

                $(fItem).find(item0).attr("class",item3.substring(1));
                $(fItem).find(item1).attr("class",item0.substring(1));
                $(fItem).find(item2).next().attr("class",item2.substring(1));
                $(fItem).find(item2).eq(0).attr("class",item1.substring(1));
                $(fItem).find(item3).eq(0).insertBefore( $(fItem).find(right) );
            })
        }else if(imgNum == 3){
            $(fItem).find(left).click(function () {

                if(imgIndex==0){
                    imgIndex = imgNum-1;
                }else{
                    imgIndex--;
                }
                $("#js-score-change").find("li").removeClass("active");
                $("#js-score-change").find("li").eq(imgIndex).addClass("active");

                $(fItem).find(item2).attr("class",item0.substring(1));
                $(fItem).find(item1).attr("class",item2.substring(1));
                $(fItem).find(item0).eq(0).attr("class",item1.substring(1));
                $(fItem).find(item0).insertAfter( $(fItem).find(left) );
            })

            $(fItem).find(right).click(function () {

                if(imgIndex==imgNum-1){
                    imgIndex = 0;
                }else{
                    imgIndex++;
                }
                $("#js-score-change").find("li").removeClass("active");
                $("#js-score-change").find("li").eq(imgIndex).addClass("active");

                $(fItem).find(item0).attr("class",item2.substring(1));
                $(fItem).find(item1).attr("class",item0.substring(1));
                $(fItem).find(item2).eq(1).attr("class",item1.substring(1));
                $(fItem).find(item2).insertBefore( $(fItem).find(right) );
            })
        }else{
            console.log("图片数量不足3张,旋转轮播无法正常轮播");
        }
    }
    
    $("#js-feature-change").find("li").each(function (i,elem) {
        $(this).click(function () {
            $(".index-feature-content-top").hide();
            $(".index-feature-content-top").eq(i).show();
            $("#js-feature-change").find("li").removeClass("active")
            $(this).addClass("active")
        })
    })
    $(".tab-nav-s").find("li").each(function (i,elem) {
        $(this).click(function () {
            $(".index-works-pic").hide();
            $(".index-works-pic").eq(i).show();
            $(".tab-nav-s").find("li").removeClass("active")
            $(this).addClass("active")
        })
    })

    $(".xx").click(function () {
        $(".fixed-apply").hide();
    })
    $(".fixed-back-top").click(function () {
        $("html, body").animate({"scrollTop":0})
    })

    var teacherIndex = 0;
    $(".btn-up").click(function () {
        if(teacherIndex==0){
            teacherIndex = $(".index-teacher-content-right").length -1
        }else{
            teacherIndex--;
        }
        $(".index-teacher-content-right").hide()
        $(".index-teacher-content-right").eq(teacherIndex).show()
    })
    $(".btn-down").click(function () {
        if(teacherIndex==$(".index-teacher-content-right").length-1){
            teacherIndex = 0;
        }else{
            teacherIndex++;
        }
        $(".index-teacher-content-right").hide()
        $(".index-teacher-content-right").eq(teacherIndex).show()
    })

    var answerIndex = 0;
    $(".js-answer-btn-left").click(function () {
        if(answerIndex==0){
            answerIndex = $(".js-answer-change").length -1
        }else{
            answerIndex--;
        }
        $(".js-answer-change").hide();
        $(".js-answer-change").eq(answerIndex).show()
    })
    $(".js-answer-btn-right").click(function () {
        if(answerIndex==$(".js-answer-change").length-1){
            answerIndex = 0;
        }else{
            answerIndex++;
        }
        $(".js-answer-change").hide();
        $(".js-answer-change").eq(answerIndex).show()
    })

    var answerIndex1 = 0;
    $(".js-answer-btn-left1").click(function () {
        if(answerIndex1==0){
            answerIndex1 = $(".js-answer-change1").length -1
        }else{
            answerIndex1--;
        }
        $(".js-answer-change1").hide();
        $(".js-answer-change1").eq(answerIndex1).show()
    })
    $(".js-answer-btn-right1").click(function () {
        if(answerIndex1==$(".js-answer-change1").length-1){
            answerIndex1 = 0;
        }else{
            answerIndex1++;
        }
        $(".js-answer-change1").hide();
        $(".js-answer-change1").eq(answerIndex1).show()
    })

    
})