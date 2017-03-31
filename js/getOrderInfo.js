/*getOrderInfo_part*/
document.write("<script type='text/javascript' src='js/jquery.js'></script>");
document.write("<script type='text/javascript' src='js/jquery.md5.js'></script>");

jQuery(document).ready(function() {
    var channelChoice1;
    var channelChoices=$(".channel");
    var token1 = getCookie("token");
    var querystr1;
    var distributorIDCode1 = getCookie("distributorIDCode");
    var code1 = channelChoice1;
    var beginDate1;
    //alert(beginDate1);
    var endDate1;
    var ticketType1;
    var groupOrDetailFlag1;
    var orderState1;
    var subDistributorInFlag1;
    var ticketID;
    var avaliablenum1;
    var content2D1;
    var phoneNumber1;

    /*
    jQuery.ajax({
        url:"http://www.52uku.net/webservice.asmx/getOrderByComplexQuery?jsoncallback=?",
        type:"GET",
        contentType: "application/json",
        data:{
            "token":token1,
            "distributorIDCode":distributorIDCode1,
            "beginDate":"2016-03-03",
            "endDate":"2017-03-31",
            "ticketTypeID":"76",
            "parkID":0.000,
            "operatorID":0,
            "salerID":0,
            "subDistributorInFlag":0,
            "groupOrDetailFlag":"DETAIL",
            "orderState":0
        },
        dataType: "jsonp",
        jsonp:'callback',
        jsonpCallback:'jsonpCallback',
        timeout:3000,
        success: function (result) {
            alert("ok吗");
            if(result.STATUS=="OOOKK"){
                alert("查询成功");
                var orders = $(".order");
                $(".menuDsp").remove();
                $.each(result.Tickets, function (index, item) {
                    outputData(orders, item);
                });
            }
        } ,
        error: function(err){
            alert("查询失败");
        }
    });
    */

    /*
     "<div class=\"order no-order\">" +
     "<ul class=\"titleName\">"+
     "<li class=\"name1\">"+
     "<span>"+
     "<a href=\"\" class=\"allId\">票信息</a>"+
     "</span>"+
     "</li>"+
     "<li class=\"name3\">游玩人</li>"+
     "<li class=\"name2\">分销商</li>"+
     "<li class=\"name4\">订单金额/支付方式</li>"+
     "<li class=\"name4\">订单状态</li>"+
     "<li class=\"name5\">操作</li>"+
     "</ul>"+
    * */
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
    function outputData2(container,item){
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
            "<li class=\"name1\">"+
            "<span>"+
            "<a href=\"\" class=\"singleId\">"+item.TicketTypeName+"</a>"+
            "</span>"+
            "</li>"+
            "<li class=\"name3 blue\">"+item.BuyTicketNum+"</li>"+
            "<li class=\"name2 green\">"+item.TicketVerified+"</li>"+
            "<li class=\"name4\">"+item.TicketAvailable+"</li>"+
            "<li class=\"name4 red pointer detailMsg\">详情</li>"+
            "<li class=\"name5\"></li>"+
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
    $(".editButton").live("click",function(){
        ticketID=$(this).parent("li").parent(".items").siblings(".menuHead1").find(".content2D").text();
        //alert(ticketID);
        $(".calcleMenu").css("display","block");
        $(".electName").attr("value",ticketID);

    });

    $(".orderCancle2").live("click",function(){
        $(".calcleMenu").css("display","none");

    });
    $(".orderSure2").live("click",function(){
        alert("cancelTickets");
        //var content2D1=$(this).parents(".menuHead").find(".menuName span").text();
        //alert("contentID"+content2D1);
        //alert($(this).siblings(".ticketMsg2").find(".singleId").val());

        avaliablenum1=parseInt($(".cancleNum").val());
        alert("avaliablenum1==",avaliablenum1);
        alert("咋不执行呢");
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
                alert("result.Message"+result.MESSAGE);
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
    $(".orderAdd2").live("click",function(){
        alert("cancelTickets");
        //var content2D1=$(this).parents(".menuHead").find(".menuName span").text();
        //alert("contentID"+content2D1);
        //alert($(this).siblings(".ticketMsg2").find(".singleId").val());

        avaliablenum1=parseInt($(".cancleNum").val());
        alert("avaliablenum1==",avaliablenum1);
        alert("咋不执行呢");
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
                alert("result.Message"+result.MESSAGE);
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

    $(".startTime,.endTime").click(function(){
        setday(this);
    });



    $(".searchbyTime").click(function(){

        for(var i=0;i<channelChoices.length;i++){
            if(channelChoices[i].checked == true){
                channelChoice1=channelChoices[i].value;
                alert("channelChoice1"+channelChoice1);subDistributorInFlag1=channelChoice1;

            }
        }
        beginDate1=$(".startTime").val();
        endDate1=$(".endTime").val();
        ticketType1=$(".rName").val();
        //alert($(".rFlag").val());
        var groupOrDetailFlag1=$(".rFlag").val();
        //alert("groupOrDetailFlag1"+groupOrDetailFlag1);
        orderState1=$(".rStatus").val();
        //alert("subDistributorInFlag1"+channelChoice1);
        jQuery.ajax({
            url:"http://www.52uku.net/webservice.asmx/getOrderByComplexQuery?jsoncallback=?",
            type:"GET",
            contentType: "application/json",
            data:{
                "token":token1,
                "distributorIDCode":"AEP",
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

                    alert("查询成功");
                    if (groupOrDetailFlag1 == "DETAIL") {
                        var orders = $(".menuDiff");
                        $(".orderSelect").show();
                        $(".titleName2").hide();
                        $(".titleName").show();
                        $(".menuDiff").empty();
                        $(".noMenu").hide();
                        if (result.RECORDNUM > 0) {
                            $.each(result.Tickets, function (index, item) {
                                outputData(orders, item);
                            });
                        } else {
                            //alert("哈哈");
                            $(".noMenu").show().find(".noText").text("未查询到订单");
                        }
                    }
                        if (groupOrDetailFlag1 == "GROUP") {
                            $(".orderSelect").hide();
                            $(".ordersGroup").show();
                            var orders = $(".ordersGroup");
                            $(".titleName").hide();
                            $(".menuDiff").empty();
                            $(".items").remove();
                            $(".titleName2").show();
                            $(".noMenu").hide();
                            if (result.RECORDNUM > 0) {
                                $.each(result.Tickets, function (index, item) {
                                    //alert("outputData2");
                                    outputData2(orders, item);
                                });
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
        alert("searchbyMultiple");
        distributorIDCode1="AEP";
        code1=channelChoice1;
        alert("code1"+code1);
        querystr1=$(".multiple").val();

        jQuery.ajax({
            //url:"http://www.52uku.net/webservice.asmx/getOrderByMulCondition?jsoncallback=?",
            url:"http://www.52uku.net/webservice.asmx/getOrderBySimpleQuery?jsoncallback=?",
            type:"GET",
            contentType: "application/json",
            data:{
                "token":token1,
                "querystr":querystr1,
                "distributorIDCode":"AEP",
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
    /*
    $(".Liuhong").click(function(){
        alert("Liuhong");
        var token1=sessionStorage.token;
        beginDate1=$(".startTime").val();
        endDate1=$(".endTime").val();
        ticketType1=$(".rName").val();
        groupOrDetailFlag1=$(".rFlag").val();
        alert("groupOrDetailFlag1"+groupOrDetailFlag1);
        orderState1=$(".rStatus").val();
        subDistributorInFlag1=channelChoice1;
        querystr1=$(".multiple").val();
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
                alert("ok吗");
                if(result.STATUS=="OOOKK"){
                    alert("查询成功");
                    $(".ordersGroup").show();
                    var orders = $(".ordersGroup");
                    $(".titleName").hide();
                    $(".menuDiff").empty();
                    $(".items").remove();
                    $(".titleName2").show();
                    $.each(result.Tickets, function (index, item) {
                        outputData2(orders, item);
                    });
                }
            } ,
            error: function(err){
                alert("查询失败");
            }
        });
    });
    */

    $(".againID").live("click",function(){
        $(".calcleMenu2").css("display","block");
        content2D1=$(this).parent("li").parent(".items").siblings(".menuHead1").find(".content2D").text();
        phoneNumber1=$(this).parent("li").parent(".items").find(".touristPhone").text();
        $(".phoneNum").attr("value",phoneNumber1);
        alert("phoneNumber1="+phoneNumber1);
    });
    $(".orderSure3").click(function(){
        //var thirdPartyOrderNo1="1234567890127";

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
    $(".detailMsg").live("click",function(){
        alert("详情");
        window.location.href="chart.html";
        /*
        var str="<script type=\"text/javascript\">"+
        "var chart;"+
        "$(document).ready(function() {"+
            "chart = new Highcharts.Chart({"+
                "chart: {"+
                    "renderTo: 'container',"+
                    "margin: [50, 200, 60, 170]"+
                "},"+
                "title: {"+
                    "text: 'Browser market shares at a specific website, 2010'"+
                "},"+
                "plotArea: {"+
                    "shadow: null,"+
                    "borderWidth: null,"+
                    "backgroundColor: null"+
                "},"+
                "tooltip: {"+
                    "formatter: function() {"+
                        "return '<b>'+ this.point.name +'</b>: '+ this.y +' %';"+
                    "}"+
                "},"+
                "plotOptions: {"+
                    "pie: {"+
                        "allowPointSelect: true,"+
                        "cursor: 'pointer',"+
                        "dataLabels: {"+
                            "enabled: true,"+
                            "formatter: function() {"+
                                "if (this.y > 5) return this.point.name;"+
                            "},"+
                            "color: 'white',"+
                            "style: {"+
                                "font: '13px Trebuchet MS, Verdana, sans-serif'"+
                            "}"+
                        "}"+
                    "}"+
                "},"+
                "legend: {"+
                    "layout: 'vertical',"+
                    "style: {"+
                        "left: 'auto',"+
                        "bottom: 'auto',"+
                        "right: '50px',"+
                        "top: '100px'"+
                    "}"+
                "},"+
                "series: [{"+
                    "type: 'pie',"+
                    "name: 'Browser share',"+
                    "data: ["+
                        "['Firefox',   10.0],"+
                        "['IE',       10.0],"+
                        "{"+
                            "name: 'Chrome',"+
                            "y: 10.0,"+
                            "sliced: true,"+
                            "selected: true"+
                        "},"+
                        "['Safari',    6.0],"+
                        "['Opera',     6.0],"+
                        "['Others',   6.0]"+
                    "]"+
                "}]"+
            "});"+
        "});"+
        "<\/script>"
        */
        //$("#container").show();
    });
    $(".ranking").live("click",function(){
        for(var i=0;i<channelChoices.length;i++){
            if(channelChoices[i].checked == true){
                channelChoice1=channelChoices[i].value;
                alert("channelChoice1"+channelChoice1);subDistributorInFlag1=channelChoice1;

            }
        }
        beginDate1=$(".startTime").val();
        endDate1=$(".endTime").val();
        ticketType1=$(".rName").val();
        //alert($(".rFlag").val());
        var groupOrDetailFlag1=$(".rFlag").val();
        //alert("groupOrDetailFlag1"+groupOrDetailFlag1);
        orderState1=$(".rStatus").val();
        //alert("subDistributorInFlag1"+channelChoice1);
        jQuery.ajax({
            url:"http://www.52uku.net/webservice.asmx/getOrderByComplexQueryV1?jsoncallback=?",
            type:"GET",
            contentType: "application/json",
            data:{
                "token":token1,
                "distributorIDCode":"AEP",
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

                    alert("查询成功");
                        if (result.RECORDNUM > 0) {

                        } else {
                            $(".noMenu").show().find(".noText").text("未查询到订单");
                        }

                }
            },
            error: function(err){
                alert("查询失败");
            }
        });
        alert("详情");
        //window.location.href="chart.html";
        /*
         var str="<script type=\"text/javascript\">"+
         "var chart;"+
         "$(document).ready(function() {"+
         "chart = new Highcharts.Chart({"+
         "chart: {"+
         "renderTo: 'container',"+
         "margin: [50, 200, 60, 170]"+
         "},"+
         "title: {"+
         "text: 'Browser market shares at a specific website, 2010'"+
         "},"+
         "plotArea: {"+
         "shadow: null,"+
         "borderWidth: null,"+
         "backgroundColor: null"+
         "},"+
         "tooltip: {"+
         "formatter: function() {"+
         "return '<b>'+ this.point.name +'</b>: '+ this.y +' %';"+
         "}"+
         "},"+
         "plotOptions: {"+
         "pie: {"+
         "allowPointSelect: true,"+
         "cursor: 'pointer',"+
         "dataLabels: {"+
         "enabled: true,"+
         "formatter: function() {"+
         "if (this.y > 5) return this.point.name;"+
         "},"+
         "color: 'white',"+
         "style: {"+
         "font: '13px Trebuchet MS, Verdana, sans-serif'"+
         "}"+
         "}"+
         "}"+
         "},"+
         "legend: {"+
         "layout: 'vertical',"+
         "style: {"+
         "left: 'auto',"+
         "bottom: 'auto',"+
         "right: '50px',"+
         "top: '100px'"+
         "}"+
         "},"+
         "series: [{"+
         "type: 'pie',"+
         "name: 'Browser share',"+
         "data: ["+
         "['Firefox',   10.0],"+
         "['IE',       10.0],"+
         "{"+
         "name: 'Chrome',"+
         "y: 10.0,"+
         "sliced: true,"+
         "selected: true"+
         "},"+
         "['Safari',    6.0],"+
         "['Opera',     6.0],"+
         "['Others',   6.0]"+
         "]"+
         "}]"+
         "});"+
         "});"+
         "<\/script>"
         */
        //$("#container").show();
    });
    });







