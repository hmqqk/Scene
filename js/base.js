/**
 * Created by liuhong on 2016/11/22.
 */
(function(){
    /*login_part and register_part*/


     $('#back').click(function(){
     window.location.href="index.html";
     });

    /*index_part*/
    $('.searchtext').focus(function(){
        $(this).attr('value',null);
    });

    /*set cookie*/
        var UName=getCookie("UserName");
        var box_user=$(".box_user");
        var cookieMsg="<div>"+
            "<a href=\"personCenter.html\" class=\"uCookie\">"+UName+"</a>"+
            "<span>|</span>"+
            "<a href=\"javascript:void(0)\" class=\"uLogout\">退出</a>"+
            "</div>";
        var loginMsg="<div>"+
            "<a href=\"login.html\" class=\"uLogin\">登录</a>"+
            "<span>|</span>"+
            "<a href=\"register.html\" class=\"uRegister\">注册</a>"+
            "</div>";

        if(UName){
            printHtml(box_user,cookieMsg);
        }else{
            printHtml(box_user,loginMsg);
        }
        $(".uLogout").on("click",function(){
            emptyCookie();
            window.location.reload();
        })

    function printHtml(container,Msg) {
        container.html(Msg);
    }

    $(".i-triangle").click(function(){
        $(this).parents('.orderTypeMsg').find('.orderType').css("display","block");
    });
    $(".orderType").hover(function(){
        $(this).css("display","block");
    },function(){
        $(this).css("display","none");
    });
    $(".orderType li").click(function(){
        $(this).parent(".orderType").siblings("div").find("input.inputMsg").attr("value",$(this).find("a").text());
        $(this).parent(".orderType").siblings("div").find(".realNum").attr("value",$(this).find("a").attr("value"));
        //alert($(this).find("a").attr("value"));
        //alert($(this).parent(".orderType").siblings("div").find(".realNum").attr("value"));
    });

     $(".againID").on("click",function(){
         $(".calcleMenu2").css("display","block");
         content2D1=$(this).parent("li").parent(".items").siblings(".menuHead1").find(".content2D").text();
         phoneNumber1=$(this).parent("li").parent(".items").find(".touristPhone").text();
         $(".phoneNum").attr("value",phoneNumber1);
     });
     $(".orderSure3").click(function(){
         phoneNumber1=$(".phoneNum").val();
         jQuery.ajax({
             url:"http://www.52uku.net/webservice.asmx/SendOrderEticketsByContent2D?jsoncallback=?",
             type:"GET",
             contentType: "application/json",
             data:{
                 "token":token1,
                 "Content2D":content2D1,
                 "phoneNumber":phoneNumber1
             },
             dataType: "jsonp",
             jsonp:'callback',
             jsonpCallback:'jsonpCallback',
             timeout:3000,
             success: function (result) {
                 if(result.STATUS=="OOOKK"){
                     alert("重发码成功");
                     $(".calcleMenu2").css("display","none");
                 }
             } ,
             error: function(err){
                 alert("重发码失败");
             }
         });
     });
        $(".orderCancle3").click(function(){
         $(".calcleMenu2").css("display","none");
     });
        $(".i-triangle").click(function(){
            $(this).parents('.orderTypeMsg').find('.orderType').css("display","block");
        });
        $(".orderType").hover(function(){
            $(this).css("display","block");
        },function(){
            $(this).css("display","none");
        });
        $(".orderType li").click(function(){
            $(this).parent(".orderType").siblings("div").find("input.inputMsg").attr("value",$(this).find("a").text());
            $(this).parent(".orderType").siblings("div").find(".realNum").attr("value",$(this).find("a").attr("value"));
        })



})();


