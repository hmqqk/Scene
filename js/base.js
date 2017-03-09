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
        $(".uLogout").live("click",function(){
            emptyCookie();
            window.location.reload();
        })

    function printHtml(container,Msg) {
        container.html(Msg);
    }
    /*
    $(".buy").live("click",function(){
        alert(1);
        var str="<form class=\"shopMsg\">"+
            "<div class=\"ticketMsg\">"+
            "<span>游客名:</span>"+
        "<input type=\"text\" class=\"basicMsg\">"+
            "</div>"+
            "<div class=\"ticketMsg\">"+
            "<span>电话:</span>"+
        "<input type=\"text\" class=\"basicMsg\">"+
            "</div>"+
            "<div class=\"ticketMsg\">"+
            "<span>游玩日期:</span>"+
        "<input type=\"text\" class=\"basicMsg\">"+
            "</div>"+
            "<div class=\"ticketMsg chooseMsg\">"+
            "<span>短信通知：</span>"+
        "<label>是</label>“+
        "<input id=\"yes\" type=\"radio\" checked=\"checked\" >"+
            "<label>否</label>"+
            "<input id=\"no\" type=\"radio\" >"+
            "</div>"+
            "<div class=\"ticketMsg\">"+
            "<span>票数：</span>"+
        "<a href=\"javascript:void(0)\" class=\"sub\">-</a>"+
            "<input type=\"text\" value=\"1\" class=\"numbers\">"+
            "<a href=\"javascript:void(0)\" class=\"add\">+</a>"+
            "</div>"+
            "<button value=\"\" class=\"orderSure\">确定</button>"+
            "<button value=\"\" class=\"orderCancle\">取消</button>"+
            "</form>";
        var container=$(this).parent(".sceneDMSG");
        container.append(str);

    })

   */
    /*logout operator*/

    $(".i-triangle").click(function(){
        $(".orderType").css("display","block");
    });
    $(".orderType").hover(function(){
        $(this).css("display","block");
    },function(){
        $(this).css("display","none");
    });
    $(".orderType li").click(function(){
        $(this).parent(".orderType").siblings("div").find("input").attr("value",$(this).find("a").text());
    });


})();


