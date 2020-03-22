window.onload = function(){
    waterfall();
    dialog();
    var onOff = true;
    var startImgNum,endImgNum,newImg,newItem;
    function addPic() {
        $.ajax({
            type: "POST",
            url: "test.txt",      //提交到一般处理程序请求数据
            success:function(data){   //data为返回的数据

                if(onOff){
                    $("#loading-img").css("display","block");
                    onOff = false;
                    var html=$(".waterfall").html();
                    var arr=eval(data);
                    // alert($(".grid").find("img:eq(0)").size());
                    startImgNum = $(".grid").find("img:eq(0)").size();
                    for(var i=0;i<arr.length;i++){
                        html += '<div class="grid">' +
                            '<img src="'+arr[i].picture+'" alt="优秀作品图片" class="grid-img"/>' +
                            '</div>';


                    }
                    $(".waterfall").eq(0).html(html);

                    dialog();
                    // alert($(".grid").find("img:eq(0)").size());
                    endImgNum = $(".grid").find("img:eq(0)").size();

                    // alert($(".grid").find("img:eq(0)").slice(startImgNum, endImgNum).size());//注意包含endImgNum但不包含startImgNum
                    newImg = $(".grid").find("img:eq(0)").slice(startImgNum, endImgNum); //筛选新加载的图片
                    newItem =  $(".grid").slice(startImgNum, endImgNum);
                    newItem.css("display","none");
                    
                    //判断新加载的图片是否加载完
                    var totalImg = newImg.size();
                    var currentImg = 0;
                    newImg.on('load',function(){
                        currentImg++;
                        console.log(currentImg)
                        if(currentImg === totalImg){
                            newItem.css("display","block");
                            waterfall();
                            setTimeout(function () {
                                onOff = true;
                            },200)
                            $("#loading-img").css("display","none");

                        }
                    })
                }


            },
            error:function(){
                console.log("请求失败");
            }
        });
    }



    function waterfall() {
        //每个格格不一定往自己序号%3这个列插入，看哪个列目前最矮，插在哪里=
        //得到所有的grid
        $grids = $(".grid");
        //用一个数组存储当前四个列的总高度
        var colHeight = [0,0,0,0];
        // console.log(colHeight);
        // 遍历小格格
        $grids.each(function(){
            //找一下当前的最短列是谁
            var minValue = _.min(colHeight); //colHeight里面的最小的值！
            //看一下最短列出现在index几的位置上
            var minIndex = _.indexOf(colHeight,minValue);//最短的值的下标
            // console.log(minIndex);
            $(this).css({
                "top" : minValue ,
                "left" : minIndex * 3.52 + "rem"      //调每行间距
            });
            colHeight[minIndex] += $(this).outerHeight() + 6;
            // console.log(colHeight[minIndex]);
        })
        colHeight.sort(function(a,b){return a-b;});   //用排序法求数组的最大/小值
        // var minN = colHeight[0];
        var maxN = colHeight[colHeight.length-1];   //最大高度
        $(".waterfall").css("height",maxN+100+"px"); //调节高度
    }

    //为jq添加获取原始宽高的方法
    (function($){
        var
            props = ['Width', 'Height'],
            prop;

        while (prop = props.pop()) {
            (function (natural, prop) {
                $.fn[natural] = (natural in new Image()) ?
                    function () {
                        return this[0][natural];
                    } :
                    function () {
                        var
                            node = this[0],
                            img,
                            value;

                        if (node.tagName.toLowerCase() === 'img') {
                            img = new Image();
                            img.src = node.src,
                                value = img[prop];
                        }
                        return value;
                    };
            }('natural' + prop, prop.toLowerCase()));
        }
    }(jQuery));

    var index = 0;
    var booPic = false;
    function dialog() {
        $(".grid").each(function (i,elem) {
            $(elem).click(function (event) {
                event.stopPropagation(); //阻止事件冒泡
                var urlImg = $(this).find("img").eq(0).attr("src");

                var viewWidth = $(window).width()*0.5;
                var viewHeight = $(window).height()*0.8;

                var imgWidth = $(this).find("img").eq(0).naturalWidth();
                var imgHeight = $(this).find("img").eq(0).naturalHeight();

                var ratio = viewWidth/viewHeight; //图片显示区域宽高比
                var ratio1 = imgWidth/imgHeight; //图片原始宽高比

                if(imgWidth>viewWidth || imgHeight>viewHeight){
                    //判断到底取图片高度还是宽度
                    if(ratio1>ratio){
                        imgWidth = viewWidth;
                        imgHeight = imgWidth/ratio1;
                    }else{
                        imgHeight = viewHeight;
                        imgWidth = imgHeight*ratio1;
                    }
                }

                $("#easyDialogWrapper").find("img").attr("src",urlImg);
                $("#easyDialogWrapper").find("img").css("width",imgWidth);
                $("#easyDialogWrapper").find("img").css("height",imgHeight);
                $("#easyDialogWrapper").find("img").css("marginTop",-imgHeight/2);
                $("#easyDialogWrapper").find("img").css("marginLeft",-imgWidth/2);
                index = i;
                $(".easyDialogWrapper-next").get(0).onclick = function (event) {
                    event.stopPropagation(); //阻止事件冒泡
                    if(index > ($(".grid").size()-2)){   //如果是最后一张，跳到第一张
                        index = 0;
                    }else{
                        index++;
                    }
                    urlImg = $(".grid").eq(index).find("img").eq(0).attr("src");
                    imgWidth = $(".grid").eq(index).find("img").eq(0).naturalWidth();
                    imgHeight = $(".grid").eq(index).find("img").eq(0).naturalHeight();

                    ratio1 = imgWidth/imgHeight; //图片原始宽高比

                    if(imgWidth>viewWidth || imgHeight>viewHeight){
                        //判断到底取图片高度还是宽度
                        if(ratio1>ratio){
                            imgWidth = viewWidth;
                            imgHeight = imgWidth/ratio1;
                        }else{
                            imgHeight = viewHeight;
                            imgWidth = imgHeight*ratio1;
                        }
                    }



                    $("#easyDialogWrapper").find("img").attr("src",urlImg);
                    $("#easyDialogWrapper").find("img").css("width",imgWidth);
                    $("#easyDialogWrapper").find("img").css("height",imgHeight);
                    $("#easyDialogWrapper").find("img").css("marginTop",-imgHeight/2);
                    $("#easyDialogWrapper").find("img").css("marginLeft",-imgWidth/2);
                }
                $(".easyDialogWrapper-prev").get(0).onclick = function (event) {
                    event.stopPropagation(); //阻止事件冒泡
                    if(index < 1){              //如果是第一张，跳到最后一张
                        index = $(".grid").size()-1;
                    }else{
                        index--;
                    }
                    urlImg = $(".grid").eq(index).find("img").eq(0).attr("src");
                    imgWidth = $(".grid").eq(index).find("img").eq(0).naturalWidth();
                    imgHeight = $(".grid").eq(index).find("img").eq(0).naturalHeight();

                    ratio1 = imgWidth/imgHeight; //图片原始宽高比

                    if(imgWidth>viewWidth || imgHeight>viewHeight){
                        //判断到底取图片高度还是宽度
                        if(ratio1>ratio){
                            imgWidth = viewWidth;
                            imgHeight = imgWidth/ratio1;
                        }else{
                            imgHeight = viewHeight;
                            imgWidth = imgHeight*ratio1;
                        }
                    }

                    $("#easyDialogWrapper").find("img").attr("src",urlImg);
                    $("#easyDialogWrapper").find("img").css("width",imgWidth);
                    $("#easyDialogWrapper").find("img").css("height",imgHeight);
                    $("#easyDialogWrapper").find("img").css("marginTop",-imgHeight/2);
                    $("#easyDialogWrapper").find("img").css("marginLeft",-imgWidth/2);
                }


                //打开弹出层
                easyDialog.open({
                    container : 'easyDialogWrapper',
                    fixed : false
                });

                booPic = true;
            })
        })
    }




    // 关闭弹出层
    $(document).click(function () {
        if(booPic){
            booPic = false;
            easyDialog.close();
        }
    })


    $("#load-pic").click(function () {
        addPic();
    })
}

