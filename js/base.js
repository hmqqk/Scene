/**
 * Created by liuhong on 2016/11/22.
 */
(function(){
    /*login_part and register_part*/
    $("#login").click(function () {
        var token1="3714861a5b5d78f9bd5d25cb25b371a1358";//任意传即可
        var function1="SmartParkLogin";
        var para11=$("#username").val();
        var para21=$("#lpsd").val();
        var para31="0";
        var para41="1";
        var verifycode1=$.md5(token1+function1+para11+para21+para31+para41);
        //用户登录前验证
        if(para11.length==0||para21.length==0)
            alert("用户名和密码不能为空");
        if(para11.length!=0||para21.length!=0){
            jQuery.ajax({
                url:"http://www.52uku.net/webservice.asmx/login?jsoncallback=?",
                type:"GET",
                contentType: "application/json",
                data:{
                    "token":token1,
                    "function":function1,
                    "userName":para11,
                    "password":para21,
                    "para1":para31,
                    "para2":para41,
                    "verifycode": verifycode1
                },
                dataType: "jsonp",
                jsonp:'callback',
                jsonpCallback:'jsonpCallback',
                timeout:30000,
                success: function (result) {
                    if(result.STATUS=="OOOKK"){
                        getUserInformation(result);
                        window.location.href="index.html";
                    }
                } ,
                error: function(err){
                    alert("登录失败，请重新登录");
                }
            });
        }







    })
    $('#back').click(function(){
       window.location.href="index.html";
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
    //order_part
    var channelChoice1;
    var channelChoices=$(".channel");
    var token1 = getCookie("token");
    var querystr1;
    var distributorIDCode1 = getCookie("distributorIDCode");
    var code1 = channelChoice1;
    var beginDate1;
    var endDate1;
    var ticketType1;
    var groupOrDetailFlag1;
    var orderState1;
    var subDistributorInFlag1;
    var ticketID;
    var avaliablenum1;
    var content2D1;
    var phoneNumber1;
    function outputData(container, item) {
        var str= "<div class=\"menuDsp\">"+
            "<div class=\"menuHead\">"+
            "<div class=\"menuHead1\">"+
            "<a class=\"menuID\" href=\"\"><span class=\"red\">订单号:</span>"+item.OrderNo+"</a>"+
            "<a class=\"menuName\" href=\"\"><span class=\"red\">电子门票:</span><span class=\"content2D\">"+item.Content2D+"</span></a>"+
            "<label class=\"menuTime\"><span class=\"red\">下单时间:</span>"+item.BookTime+"</label>"+
            "</div>"+
            "<ul class=\"items\">"+
            "<li class=\"name1\"><a href=\"\" class=\"singleId\">"+item.TicketTypeName+"</a></li>"+
            "<li class=\"name3\">"+
            "<span class=\"touristName\">"+item.TouristName+"</span>"+
            "<br>"+
            "<span class=\"touristPhone\">"+item.TouristPhone+"</span>"+
            "</li>"+
            "<li class=\"name2\">"+item.DistributorName+"</li>"+
            "<li class=\"name4\">"+
            "<span class=\"red\">¥"+item.TicketPrice+"</span>*<span class=\"red\">"+item.BuyTicketNum+"</span>张=<span class=\"red\">¥"+item.TicketPrice*item.BuyTicketNum+"</span><br>"+
            "</li>"+
            "<li class=\"name4 green\">"+item.ProgressStatus+"</li><li class=\"name5 blue mulChoose\">"+
            "<a href=\"javascript:void(0)\" class=\"editButton\">编辑</a>"+
            "<a href=\"javascript:void(0)\" class=\"againID\">重发码</a></li>"+
            "</ul>"+
            "<div class=\"clear\"></div>"+
            "</div>"+
            "</div></div>";
        /*
         var test2="<ul class=\"items\">" +
         "<li class=\"name1\">" +
         "<span>" +
         "<a href=\"\" class=\"singleId\">" + item.TicketTypeID + "</a>" +
         "</span>" +
         "</li>" +
         "<li class=\"name3 blue\">" + item.TicketTypeName + "</li>" +
         "<li class=\"name2 green\">" + getTicketstatus(parseInt(item.TICKETSTATUS)) + "</li>" +
         "<li class=\"name4\">" + item.BUYNUM + "</li>" +
         "<li class=\"name4\">" + item.CANCELNUM + "</li>" +
         "<li class=\"name4\">" + item.AVAILABLENUM + "</li>" +
         "<li class=\"name4 red\">" + item.VERIFIEDNUM + "</li>" +
         "<li class=\"name5 blue mulChoose\">" +
         "</li>" +
         "</ul>";
         */

        container.append(str);
    }
    function outputData2(container,item,sumBuyTicketNum,sumTicketVerified,sumTicketAvailable){
        /*
         "<div class=\"ordersGroup\">"+
         "<div class=\"gTitle\">"+
         "<a href=\"\" class=\"gnumber\">票数</a>"+
         "<a href=\"\" class=\"gmoney\">金额</a>"+
         "</div>"+
         "<ul class=\"titleName\">"+
         "<li class=\"name1\">"+
         "<span>"+
         "<a href=\"\" class=\"allId\">票型ID</a>"+
         "</span>"+
         "</li>"+
         "<li class=\"name3\">票型名</li>"+
         "<li class=\"name2\">已购买总数</li>"+
         "<li class=\"name4\">已验票总数</li>"+
         "<li class=\"name4\">剩余可用票总数</li>"+
         "<li class=\"name5\"></li>"+
         "</ul>"+
         * */
        var str= "<ul class=\"items\">"+
            "<li class=\"name8\">"+
            "<span>"+
            "<a href=\"\" class=\"singleId\">"+item.DistributorName+"</a>"+
            "</span>"+
            "</li>"+
            "<li class=\"name6 blue\">"+sumBuyTicketNum+"</li>"+
            "<li class=\"name6 green\">"+sumTicketVerified+"</li>"+
            "<li class=\"name6\">"+sumTicketAvailable+"</li>"+
            "<li class=\"name6 red pointer detailMsg\">查看详情</li>"+
            "<li class=\"name7\"></li>"+
            "</ul>"+
            "<div class=\"clear\"></div> ";
        container.append(str);
    }
    function outputData3(container,item,sumBuyTicketNum,sumTicketVerified,sumTicketAvailable){
        var str= "<ul class=\"items\">"+
            "<li class=\"name8\">"+
            "<span>"+
            "<a href=\"\" class=\"singleIdHidden\">"+item.Info[0].TicketTypeID+"</a>"+
            "<a href=\"\" class=\"singleId\">"+item.TicketTypeName+"</a>"+
            "</span>"+
            "</li>"+
            "<li class=\"name6 blue\">"+sumBuyTicketNum+"</li>"+
            "<li class=\"name6 green\">"+sumTicketVerified+"</li>"+
            "<li class=\"name6\">"+sumTicketAvailable+"</li>"+
            "<li class=\"name6 red pointer detailMsg\">查看详情</li>"+
            "<li class=\"name7\"></li>"+
            "</ul>";
        container.append(str);
    }
    function outputData4(container,itemDetailMsg){
        var str=
            "<ul class=\"itemsDetail\">"+
            "<li class=\"name8\"><span class='red'>"+itemDetailMsg.TicketTypeName+"</span>"+
            "</li>"+
            "<li class=\"name6 blue\">"+itemDetailMsg.BuyTicketNum+"</li>"+
            "<li class=\"name6 green\">"+itemDetailMsg.TicketVerified+"</li>"+
            "<li class=\"name6\">"+itemDetailMsg.TicketAvailable+"</li>"+
            "<li class=\"name6 red pointer\"><a class=\"detailMsg\" href=\"javascript:void(0)\"></a></li>"+
            "<li class=\"name7\"></li>"+
            "</ul>";
        container.append(str);
    }
    function outputData5(container,itemDetailMsg){
        var str=
            "<ul class=\"itemsDetail\">"+
            "<li class=\"name8\"><span class='red'>"+itemDetailMsg.DistributorName+"</span>"+
            "</li>"+
            "<li class=\"name6 blue\">"+itemDetailMsg.BuyTicketNum+"</li>"+
            "<li class=\"name6 green\">"+itemDetailMsg.TicketVerified+"</li>"+
            "<li class=\"name6\">"+itemDetailMsg.TicketAvailable+"</li>"+
            "<li class=\"name6 red pointer\"><a class=\"detailMsg\" href=\"javascript:void(0)\"></a></li>"+
            "<li class=\"name7\"></li>"+
            "</ul>";
        container.append(str);
    }
    function getTicketstatus(i){
        switch (i)
        {
            case 0:return "未支付";
            case 1:return "已支付";
            case 2:return "部分使用";
            case 3:return "部分退票";
            case 4:return "已全部消费";
            case 5:return "已全部退票";

        }

    }
    function getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){
                return pair[1];
            }
        }
        return("all");
    }
    $(".ticketTypeLength").click(function(){
        window.location.href="ticketType.html";
    });
    $(".ticketTypeLength").attr("value",decodeURI(getQueryVariable("name"))=='all'?'全部':decodeURI(getQueryVariable("name")));
    $(".rName").attr("value",decodeURI(getQueryVariable("type"))=='all'?'0':decodeURI(getQueryVariable("type")));
    $("body").on("click",".editButton",function(){
        ticketID=$(this).parent("li").parent(".items").siblings(".menuHead1").find(".content2D").text();
        $(".calcleMenu").css("display","block");
        $(".electName").attr("value",ticketID);
        document.documentElement.style.overflow='hidden';

    });
    $("body").on("click",".orderCancle2",function(){
        $(".calcleMenu").css("display","none");
        document.documentElement.style.overflow='auto';

    });
    $("body").on("click",".orderSure2",function(){
        avaliablenum1=parseInt($(".cancleNum").val());
        jQuery.ajax({
            url:"http://www.52uku.net/webservice.asmx/addWithdrawTicket?jsoncallback=?",
            type:"GET",
            contentType: "application/json",
            data:{
                "token":token1,
                "isPayed":"0",
                "Content2D":ticketID,
                "channel":"0",
                "num2Buy":"-"+avaliablenum1
            },
            dataType: "jsonp",
            jsonp:'callback',
            jsonpCallback:'jsonpCallback',
            timeout:3000,
            success: function (result) {
                if(result.STATUS=="OOOKK"){
                    alert("退票成功");
                    $(".calcleMenu").css("display","none");
                    document.documentElement.style.overflow='auto';
                }
            } ,
            error: function(err){
                alert("退票失败");
            }
        });
    });
    $("body").on("click",".orderAdd2",function(){
        avaliablenum1=parseInt($(".cancleNum").val());
        jQuery.ajax({
            url:"http://www.52uku.net/webservice.asmx/addWithdrawTicket?jsoncallback=?",
            type:"GET",
            contentType: "application/json",
            data:{
                "token":token1,
                "isPayed":"0",
                "Content2D":ticketID,
                "channel":"0",
                "num2Buy":avaliablenum1
            },
            dataType: "jsonp",
            jsonp:'callback',
            jsonpCallback:'jsonpCallback',
            timeout:3000,
            success: function (result) {
                if(result.STATUS=="OOOKK"){
                    alert("新增成功");
                    $(".calcleMenu").css("display","none");
                    document.documentElement.style.overflow='auto';
                }
            } ,
            error: function(err){
                alert("退票失败");
            }
        });
    });
    $(".searchbyTime").click(function(){

        for(var i=0;i<channelChoices.length;i++){
            if(channelChoices[i].checked == true){
                channelChoice1=channelChoices[i].value;
                subDistributorInFlag1=channelChoice1;

            }
        }
        beginDate1=$(".startTime").val();
        endDate1=$(".endTime").val();
        ticketType1=$(".rName").val();
        var groupOrDetailFlag1=$(".rFlag").val();
        orderState1=$(".rStatus").val();
        //alert("subDistributorInFlag1"+channelChoice1);
        jQuery.ajax({
            url:"http://www.52uku.net/webservice.asmx/getOrderByComplexQuery?jsoncallback=?",
            type:"GET",
            contentType: "application/json",
            data:{
                "token":token1,
                "distributorIDCode":distributorIDCode1,
                "beginDate":beginDate1,
                "endDate":endDate1,
                "ticketTypeID":ticketType1,
                "parkID":0.000,
                "operatorID":0,
                "salerID":0,
                "subDistributorInFlag":subDistributorInFlag1,
                "groupOrDetailFlag":groupOrDetailFlag1,
                "orderState":orderState1
            },
            dataType: "jsonp",
            jsonp:'callback',
            jsonpCallback:'jsonpCallback1',
            timeout:30000,
            success: function (result) {
                // alert("ok吗");
                if (result.STATUS == "OOOKK") {

                    //alert("查询成功");
                    if (groupOrDetailFlag1 == "DETAIL") {
                        var orders = $(".menuDiff");
                        $(".orderSelect").show();
                        $(".titleName2").hide();
                        $(".titleName").show();
                        $(".menuDiff").empty();
                        $(".items,.itemsDetail").remove();
                        $(".ordersGroup").hide();
                        $(".noMenu").hide();
                        $("#calcleMenu3").hide();
                        $("#container").hide();

                        if (result.RECORDNUM > 0) {
                            $.each(result.Tickets, function (index, item) {
                                outputData(orders, item);
                            });
                        } else {
                            //alert("哈哈");
                            $(".noMenu").show().find(".noText").text("未查询到订单");
                        }
                    }
                    if (groupOrDetailFlag1 == "GroupByDistributorName") {
                        $(".orderSelect").hide();
                        $(".ordersGroup").empty();
                        var orders = $(".ordersGroup");
                        $(".titleName").hide();
                        $(".menuDiff").empty();
                        $(".items").empty();
                        $(".itemsDetail").empty();
                        $(".titleName2").show();
                        $(".noMenu").hide();
                        $("#calcleMenu3").hide();
                        $("#container").show();
                        if (result.RECORDNUM > 0) {
                            $(".orderSelect").hide();
                            $(".ordersGroup").show();
                            var orders = $(".ordersGroup");
                            $(".titleName").hide();
                            $(".menuDiff").empty();
                            //$(".items,.itemsDetail,.ordersGroup").show();
                            $(".titleName2").show();
                            $(".noMenu").hide();
                            var sumBuyTicketNum = [];
                            var sumTicketAvailable=[];
                            var sumTicketVerified=[];
                            var DistributorNameTmp=[];
                            var sum=0;
                            var sum_DistributorName=[];
                            $.each(result.Tickets, function (index, item) {
                                    //alert("outputData2");
                                    sumBuyTicketNum[index]=0;
                                    sumTicketAvailable[index]=0;
                                    sumTicketVerified[index]=0;
                                    for(var i=0;i<item.Info.length;i++){
                                        //alert(item.Info[i].BuyTicketNum);
                                        sumBuyTicketNum[index] += parseInt(item.Info[i].BuyTicketNum);
                                        sumTicketAvailable[index] += parseInt(item.Info[i].TicketAvailable);
                                        sumTicketVerified[index] += parseInt(item.Info[i].TicketVerified);
                                        //alert(sumTicketVerified[index]);
                                    }
                                    sum+=(sumBuyTicketNum[index]==0)?1:sumBuyTicketNum[index];
                                    DistributorNameTmp[index]=item.DistributorName;
                                    //alert("DistributorName[index]"+DistributorName[index]);


                                    //alert("index="+index);
                                    //alert(sum[index]);



                                    //alert("item="+item);
                                    //alert("sum[4]="+sum[4]);



                                    //alert("item"+itemInfo.BuyTicketNum);
                                    //alert("outputData2");
                                    //outputData2(orders, itemInfo);
                                    //var sum=0;
                                    //sum+=itemInfo.BuyTicketNum;
                                    //alert("sum[3]"+sum[3]);
                                    outputData2(orders, item, sumBuyTicketNum[index], sumTicketAvailable[index], sumTicketVerified[index]);
                                    $.each(item.Info, function (index, itemDetailMsg) {
                                        outputData4(orders, itemDetailMsg);

                                    });
                                }


                            );

                            for(var j=0;j<DistributorNameTmp.length;j++){
                                sum_DistributorName[j]=((sumBuyTicketNum[j]==0?1:sumBuyTicketNum[j])/sum*100).toFixed(1);
                                // alert("sum_DistributorName[j]"+sum_DistributorName[j]);
                            }
                            var json=[];
                            json.push(["其它",0.1]);
                            for(var p=0;p<sum_DistributorName.length;p++){
                                json.push([DistributorNameTmp[p],parseInt(sum_DistributorName[p])]);
                            }
                            /*

                             var chart;
                             chart = new Highcharts.Chart({
                             chart: {
                             renderTo: 'container',
                             margin: [40, 0, 0, 0]
                             },
                             title: {
                             text: '票务通票型销售排行'
                             },
                             plotArea: {
                             shadow: null,
                             borderWidth: null,
                             backgroundColor: null
                             },
                             tooltip: {
                             formatter: function() {
                             return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
                             }
                             },
                             plotOptions: {
                             pie: {
                             allowPointSelect: true,
                             cursor: 'pointer',
                             dataLabels: {
                             enabled: true,
                             formatter: function() {
                             if (this.y > 5) return this.point.name;
                             },
                             color: 'white',
                             style: {
                             font: '13px Trebuchet MS, Verdana, sans-serif'
                             }
                             }
                             }
                             },
                             legend: {
                             layout: 'vertical',
                             style: {
                             left: 'auto',
                             bottom: 'auto',
                             right: '100px',
                             top: '100px'
                             }
                             },
                             series: [{
                             type: 'pie',
                             name: 'chart',
                             data: json
                             }]
                             });
                             */
                        } else {
                            $(".noMenu").show().find(".noText").text("未查询到订单");
                        }
                    }
                    if (groupOrDetailFlag1 == "GroupByTicketTypeName") {
                        $(".orderSelect").hide();
                        $(".ordersGroup").empty();
                        var orders = $(".ordersGroup");
                        $(".titleName").hide();
                        $(".menuDiff").empty();
                        $(".items").empty();
                        $(".itemsDetail").empty();
                        $(".titleName2").show();
                        $(".noMenu").hide();
                        $("#container").hide();
                        if (result.RECORDNUM > 0) {
                            //$(".items,.itemDetail,.ordersGroup").show();
                            var sumBuyTicketNum = [];
                            var sumTicketAvailable=[];
                            var sumTicketVerified=[];
                            var TicketTypeName=[];
                            var sum=0;
                            var sum_DistributorName=[];
                            var indexDistributorName=[];
                            $.each(result.Tickets, function (index, item) {
                                    //alert("outputData2");
                                    sumBuyTicketNum[index]=0;
                                    sumTicketAvailable[index]=0;
                                    sumTicketVerified[index]=0;
                                    for(var i=0;i<item.Info.length;i++){
                                        //alert(item.Info[i].BuyTicketNum);
                                        sumBuyTicketNum[index] += parseInt(item.Info[i].BuyTicketNum);
                                        sumTicketAvailable[index] += parseInt(item.Info[i].TicketAvailable);
                                        sumTicketVerified[index] += parseInt(item.Info[i].TicketVerified);
                                    }
                                    sum+=(sumBuyTicketNum[index]>0)?sumBuyTicketNum[index]:-sumBuyTicketNum[index];
                                    TicketTypeName[index]=item.Info[0].TicketTypeName;
                                    outputData3(orders, item,sumBuyTicketNum[index],sumTicketVerified[index],sumTicketAvailable[index]);
                                    $.each(item.Info, function (index, itemDetailMsg) {
                                        outputData5(orders, itemDetailMsg);

                                    });


                                }

                            );

                        } else {
                            $(".noMenu").show().find(".noText").text("未查询到订单");

                        }
                    }

                }
            },
            error: function(err){
                alert("查询失败");
            }
        });
    });
    $(".searchbyMultiple").click(function(){
        for(var i=0;i<channelChoices.length;i++){
            if(channelChoices[i].checked == true){
                channelChoice1=channelChoices[i].value;
            }
        }

        distributorIDCode1=getCookie("distributorIDCode");
        code1=channelChoice1;
        querystr1=$(".multiple").val();

        jQuery.ajax({
            //url:"http://www.52uku.net/webservice.asmx/getOrderByMulCondition?jsoncallback=?",
            url:"http://www.52uku.net/webservice.asmx/getOrderBySimpleQuery?jsoncallback=?",
            type:"GET",
            contentType: "application/json",
            data:{
                "token":token1,
                "querystr":querystr1,
                "distributorIDCode":distributorIDCode1,
                "code":code1
            },
            dataType: "jsonp",
            jsonp:'callback',
            jsonpCallback:'jsonpCallback',
            timeout:3000,
            success: function (result) {
                alert("ok吗");
                alert(result.MESSAGE);
                if(result.STATUS=="OOOKK"){
                    alert("查询成功");
                    /*
                     var result="<ul class=\"items\"><li class=\"name1\"><span><a href=\"\" class=\"singleId\">1077188244478668</a></span></li><li class=\"name3 blue\">2017-03-07 12:51:18购票(网站) 1张。</li><li class=\"name2 green\">购票成功</li><li class=\"name4\">1</li><li class=\"name4\">0</li><li class=\"name4\">1</li><li class=\"name4 red\">0</li><li class=\"name5 blue\"><a href=\"javascript:void(0)\" class=\"editButton\">编辑</a></li></ul>"+
                     "<ul class=\"items\"><li class=\"name1\"><span><a href=\"\" class=\"singleId\">2077188244478668</a></span></li><li class=\"name3 blue\">2017-03-07 12:51:18购票(网站) 1张。</li><li class=\"name2 green\">购票成功</li><li class=\"name4\">1</li><li class=\"name4\">0</li><li class=\"name4\">1</li><li class=\"name4 red\">0</li><li class=\"name5 blue\"><a href=\"javascript:void(0)\" class=\"editButton\">编辑</a></li></ul>";

                     $(".items").remove();
                     $(".order").append(result);
                     alert("why");
                     */

                    var orders = $(".menuDiff");
                    $(".orderSelect").show();
                    $(".titleName").show();
                    $(".menuDiff").empty();
                    $(".ordersGroup").hide();
                    $(".noMenu").hide();
                    if (result.RECORDNUM > 0) {
                        $.each(result.Tickets, function (index, item) {
                            outputData(orders, item);
                        });
                    }
                    else{
                        $(".noMenu").show().find(".noText").text("未查询到订单");
                    }

                }
            } ,
            error: function(err){
                alert("查询失败");
            }
        });
    });
    $("body").on("click",".againID",function(){
        $(".calcleMenu2").css("display","block");
        content2D1=$(this).parent("li").parent(".items").siblings(".menuHead1").find(".content2D").text();
        phoneNumber1=$(this).parent("li").parent(".items").find(".touristPhone").text();
        $(".phoneNum").attr("value",phoneNumber1);
        document.documentElement.style.overflow='hidden';
    });
    $("body").on("click",".orderSure3",function(){
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
                // alert("ok吗");
                if (result.STATUS == "OOOKK") {

                    //alert("查询成功");
                    $(".calcleMenu2").css("display","none");
                    document.documentElement.style.overflow='auto';

                }
            },
            error: function(err){
                alert("重发码失败");
            }
        });
    });
    $(".orderCancle3").click(function(){
        $(".calcleMenu2").css("display","none");
        document.documentElement.style.overflow='auto';
    });
    $("body").on("click",".detailMsg",function(){
        $(this).parents(".items").nextUntil(".items").slideToggle();
        $(this).text()=="查看详情"?$(this).text("收起详情"):$(this).text("查看详情")
    })
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
        $(this).parent(".orderType").hide();
    });
})();


