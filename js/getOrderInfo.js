/*getOrderInfo_part*/

document.write("<script type='text/javascript' src='js/jquery.md5.js'></script>");
document.write("<script type='text/javascript' src='js/jquery-2.1.1.min.js'></script>");
jQuery(document).ready(function() {
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
            "<a class=\"menuID\" href=\"\"><span class=\"red\">订单号:</span>"+item.orderNo+"</a>"+
        "<a class=\"menuName\" href=\"\"><span class=\"red\">电子门票:</span><span class=\"content2D\">"+item.content2D+"</span></a>"+
            "<label class=\"menuTime\"><span class=\"red\">下单时间:</span>"+item.bookTime+"</label>"+
        "</div>"+
        "<ul class=\"items\">"+
            "<li class=\"name1\"><a href=\"\" class=\"singleId\">"+item.ticketTypeName+"</a></li>"+
        "<li class=\"name3\">"+
            "<span class=\"touristName\">"+item.touristName+"</span>"+
            "<br>"+
            "<span class=\"touristPhone\">"+item.touristPhone+"</span>"+
            "</li>"+
            "<li class=\"name2\">"+item.distributorName+"</li>"+
            "<li class=\"name4\">"+
            "<span class=\"red\">¥"+item.ticketPrice+"</span>*<span class=\"red\">"+item.buyTicketNum+"</span>张=<span class=\"red\">¥"+item.ticketPrice*item.buyTicketNum+"</span><br>"+
            "</li>"+
            "<li class=\"name4 green\">"+item.progressStatus+"</li><li class=\"name5 blue mulChoose\">"+
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
            "<li class=\"name6 red pointer\"></li>"+
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
            "<li class=\"name6 red pointer\"><a class=\"detailMsg\" href=\"javascript:void(0)\">详情</a></li>"+
            "<li class=\"name7\"></li>"+
            "</ul>"+
            "<div class=\"clear\"></div> ";
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
    function getTicketstype(i){
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
    function getTicketsFlag(i){
        switch (i)
        {
            case "GROUP":return "统计查询";
            case "DETAIL":return "详单查询";
        }

    }
    function getTicketsInFlag(i){
        switch (i)
        {
            case 1:return "仅自己";
            case 2:return "仅子分销商";
            case 3:return "自己及分销商";
        }

    }
    function getTicketscode(i){
        switch (i)
        {
            case 0:return "自己以及下线";
            case 1:return "仅自己";
            case 2:return "仅下线";
        }

    }

    $("body").on("click",".editButton",function(){
        ticketID=$(this).parent("li").parent(".items").siblings(".menuHead1").find(".content2D").text();
        $(".calcleMenu").css("display","block");
        $(".electName").attr("value",ticketID);

    });

    $("body").on("click",".orderCancle2",function(){
        $(".calcleMenu").css("display","none");

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
                "ticketTypeID":0,
                "parkID":0.000,
                "operatorID":0,
                "salerID":0,
                "subDistributorInFlag":subDistributorInFlag1,
                "groupOrDetailFlag":groupOrDetailFlag1,
                "orderState":orderState1
            },
            dataType: "jsonp",
            jsonp:'callback',
            jsonpCallback:'jsonpCallback',
            timeout:3000,
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
                        $(".ordersGroup").show();
                        var orders = $(".ordersGroup");
                        $(".titleName").hide();
                        $(".menuDiff").empty();
                        $(".items").remove();
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
                            $(".items").remove();
                            $(".titleName2").show();
                            $(".noMenu").hide();
                            var sumBuyTicketNum = [];
                            var sumTicketAvailable=[];
                            var sumTicketVerified=[];
                            var DistributorName=[];
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
                                    DistributorName[index]=item.DistributorName;
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
                                    outputData2(orders, item,sumBuyTicketNum[index],sumTicketAvailable[index],sumTicketVerified[index]);
                                }

                            );

                            for(var j=0;j<DistributorName.length;j++){
                                sum_DistributorName[j]=((sumBuyTicketNum[j]==0?1:sumBuyTicketNum[j])/sum*100).toFixed(1);
                                // alert("sum_DistributorName[j]"+sum_DistributorName[j]);
                            }
                            var json=[];
                            json.push(["其它",0.1]);
                            for(var p=0;p<sum_DistributorName.length;p++){
                                json.push([DistributorName[p],parseInt(sum_DistributorName[p])]);
                            }

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
                        } else {
                            $(".noMenu").show().find(".noText").text("未查询到订单");
                        }
                    }
                    if (groupOrDetailFlag1 == "GroupByTicketTypeName") {
                        $(".orderSelect").hide();
                        $(".ordersGroup").show();
                        var orders = $(".ordersGroup");
                        $(".titleName").hide();
                        $(".menuDiff").empty();
                        $(".items").remove();
                        $(".titleName2").show();
                        $(".noMenu").hide();
                        $("#container").hide();
                        if (result.RECORDNUM > 0) {
                            var sumBuyTicketNum = [];
                            var sumTicketAvailable=[];
                            var sumTicketVerified=[];
                            var DistributorName=[];
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
                                DistributorName[index]=item.Info[0].TicketTypeName;
                                outputData3(orders, item,sumBuyTicketNum[index],sumTicketAvailable[index],sumTicketVerified[index]);
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

        $("body").on("mouseenter",".detailMsg",function(){
        for(var i=0;i<channelChoices.length;i++){
            if(channelChoices[i].checked == true){
                channelChoice1=channelChoices[i].value;
            }
        }
        beginDate1=$(".startTime").val();
        endDate1=$(".endTime").val();
        ticketType1=$(this).parents(".items").find(".singleIdHidden").text();
        var groupOrDetailFlag1=$(".rFlag").val();
        orderState1=$(".rStatus").val();
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
            jsonpCallback:'jsonpCallback',
            timeout:3000,
            success: function (result) {
                if (result.STATUS == "OOOKK") {
                    if (result.RECORDNUM > 0) {
                        var BuyTicketNum=[];
                        var sumBuyTicketNum = [];
                        var sumTicketAvailable=[];
                        var sumTicketVerified=[];
                        var DistributorName=[];
                        var sum=0;
                        var sum_DistributorName=[];
                        var indexDistributorName=[];
                        $.each(result.Tickets, function (index, item) {
                                sumBuyTicketNum[index]=0;
                                sumTicketAvailable[index]=0;
                                sumTicketVerified[index]=0;
                                for(var i=0;i<item.Info.length;i++){
                                    BuyTicketNum[i]=parseInt(item.Info[i].BuyTicketNum);
                                    sumBuyTicketNum[index] += parseInt(item.Info[i].BuyTicketNum);
                                    sumTicketAvailable[index] += parseInt(item.Info[i].TicketAvailable);
                                    sumTicketVerified[index] += parseInt(item.Info[i].TicketVerified);
                                    DistributorName[i]=item.Info[i].DistributorName;
                                }
                                sum+=(sumBuyTicketNum[index]==0)?1:sumBuyTicketNum[index];
                            }

                        );


                        for(var j=0;j<DistributorName.length;j++){
                            sum_DistributorName[j]=(BuyTicketNum[j] == 0?1:BuyTicketNum[j])/sum*100;
                        }
                        var json=[];
                        json.push(["其它",0.1])
                        for(var p=0;p<sum_DistributorName.length;p++){
                            json.push([DistributorName[p],parseInt(sum_DistributorName[p])]);
                        }

                        var chart;
                        chart = new Highcharts.Chart({
                            chart: {
                                renderTo: 'calcleMenu3',
                                margin: [40, 0, 0, 0]
                            },
                            title: {
                                text: result.Tickets["0"].TicketTypeName,
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
                        $("#calcleMenu3").show();

                    } else {
                        $(".noMenu").show().find(".noText").text("未查询到订单");

                    }
                }
            },
            error: function(err){
                alert("查询失败");
            }
        });
    });
        $("body").on("mouseleave",".detailMsg",function(){


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
            });

    });







