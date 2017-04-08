$(document).ready(function(){
    var ticketIDandName=[];
    ticketIDandName.push(["0","全部"]);
	var token1=getCookie("token");
    var para11="SMARTPARKCLIENT";
    var para21=getCookie("distributorID");
    var para31="0";
    var para41="1"
    var ticketID=new Array(100);
    var levelCode=new Array(100);
    var ticketTypeName=new Array(100);
    var distributorID=new Array(100);
    var distributorName=new Array(100);
    var printPrice=new Array(100);
    var dealPrice=new Array(100);
    var lowerstPrice=new Array(100);
    var ticketTypeThatName=new Array(100);
    var delayHours=new Array(100);
    var beginDate=new Array(100);
    var endDate=new Array(100);
    var ticketGateRelation=new Array(100);
    var demo=new Array(100);
    var toSalerInfo=new Array(100);
    var toTouristInfo=new Array(100);
    var website=new Array(100);
    var TicketTypeIDDistributorLevelCode=new Array(100);
    function output(item){
        var str="<a class=\"chooseType\" href=\"order.html?type="+item[0]+"&name="+encodeURI(item[1])+"\"><span>"+item[0]+"</span>"+item[1]+"</a>";
        $(".typecontainer").append(str);
    }
    function outputData(container, item) {
        var testStr="<div class=\"scenePart\">"+
            "<div class=\"sceneTitle\">"+
            "<img src=\"images/suzhou.jpg\">"+
            "<div class=\"introduction\">"+
            "<h2>"+ticketTypeName[item]+"<label>&lt;"+distributorName[item]+"&gt;</label></h2>"+
            "<label>特殊说明</label>"+
            "<p>"+toTouristInfo[item]+"</p>"+
            "</div>"+
            "<p class=\"lowestPrice\">¥<span class=\"myPrice\">"+lowerstPrice[item]+"</span><span class=\"myPriceqi\">起</span></p>"+
            "</div>"+
            "<ul class=\"sceneMsg\">"+
            "<li class=\"type\">票型名称</li>"+
            "<li class=\"explation\">购买说明</li>"+
            "<li class=\"cost1\">门市价</li>"+
            "<li class=\"cost2\">网购价</li>"+
            "</ul>"+
            "<ul class=\"sceneDMsg\">"+
            "<li class=\"type\"><a href=\"\">"+ticketTypeName[item]+"</a></li>"+
            "<li class=\"explation\">需在" + beginDate[item] + "至" + endDate[item] + "期间完成使用<br> 购票"+delayHours[item]+"小时后可验票<br>仅限"+ticketGateRelation[item]+"人使用</li>"+
            "<li class=\"cost1\">￥" + printPrice[item] + "</li>"+
            "<li class=\"cost2 red\">￥" + dealPrice[item] + "</li>"+
            "<li class=\"buy\">"+
            "<button value=\"\">购买</button>"+
            "</li>"+
            "</ul>"+
            "</div>"+
            "<div class=\"clear line\"></div>";
        container.append(testStr);
    }
    //if(getCookie("ticketTypeFlag")=="false"){
        //alert("第一次初始化");
        jQuery.ajax({
            url:"http://www.52uku.net/webservice.asmx/getTicketTypeListForDistributor?jsoncallback=?",
            type:"GET",
            contentType: "application/json",
            data:{
                "token":token1,
                "program":para11,
                "distributorID":para21,
                "identity":para31,
                "promotionflag":para41,
                "verifycode":$.md5(token1+para11+para21+para31+para41)
            },
            dataType: "jsonp",
            jsonp:'callback',
            jsonpCallback:'jsonpCallback',
            timeout:30000,
            success: function (result) {
                if(result.STATUS=="OOOKK") {
                    for (var i = 0; i < result.DATASET.length; i++) {
                        ticketID[i] = result.DATASET[i].TicketTypeID;
                        levelCode[i] = result.DATASET[i].LevelCode;
                        ticketTypeName[i] = result.DATASET[i].TicketTypeName;
                        distributorID[i] = result.DATASET[i].DistributorID;
                        distributorName[i] = result.DATASET[i].DistributorName;
                        printPrice[i] = result.DATASET[i].PrintPrice;
                        dealPrice[i] = result.DATASET[i].DealPrice;
                        lowerstPrice[i] = result.DATASET[i].LowestPrice;
                        ticketTypeThatName[i] = result.DATASET[i].TickeTypeThatName;
                        delayHours[i] = result.DATASET[i].DelayHours;
                        beginDate[i] = result.DATASET[i].BeginDate;
                        endDate[i] = result.DATASET[i].EndDate;
                        ticketGateRelation[i] = result.DATASET[i].TicketGateRelation;
                        demo[i] = result.DATASET[i].Demo;
                        toSalerInfo[i] = result.DATASET[i].ToSalerInfo;
                        toTouristInfo[i] = result.DATASET[i].ToTouristInfo;
                        website[i] = result.DATASET[i].Website;//
                        TicketTypeIDDistributorLevelCode = result.DATASET[i].TicketTypeIDDistributorLevelCode;
                        ticketIDandName.push([ticketID[i],ticketTypeName[i]]);
                    }

                    for(var i=0;i<ticketIDandName.length;i++){
                        output(ticketIDandName[i]);
                    }
                    //localStorage.setItem("ticketTypeandName",ticketIDandName);
                    //setCookie("ticketTypeFlag","true");
                    for (i = 0; i < result.DATASET.length; i++) {
                        var sceneitems = $(".sceneitems");
                        outputData(sceneitems, i);
                    }
                    var aBuy = $(".buy");
                    var ID;
                    var TicketTypeIDDistributorLevelCode;
                    var Name;
                    var touristName;
                    var touristTel;
                    var touristDate;
                    var num;
                    var check;
                    var str2="<div class=\"shopMsg\">"+
                        "<div class=\"ticketMsg\">"+
                        "<span>游客名</span>"+
                        "<input type=\"text\" class=\"basicMsg touristName\" value=\"\">"+
                        "</div>"+
                        "<div class=\"ticketMsg\">"+
                        "<span>电话</span>"+
                        "<input type=\"text\" class=\"basicMsg touristPhone\" value=\"\">"+
                        "</div>"+
                        "<div class=\"ticketMsg\">"+
                        "<span>游玩日期</span>"+
                        "<input type=\"text\" class=\"basicMsg touristDate\" value=\"\" >"+
                        "</div>"+
                        "<div class=\"ticketMsg chooseMsg\">"+
                        "<span>短信通知</span>"+
                        "<span class=\"changeMun\">"+
                        "<label>是</label>"+
                        "<input id=\"yes\" type=\"radio\" checked=\"checked\" name=\"choice\">"+
                        "<label>否</label>"+
                        "<input id=\"no\" type=\"radio\" name=\"choice\">"+
                        "</div>"+
                        "</span>"+
                        "<div class=\"ticketMsg\">"+
                        "<span>票数</span>"+
                        "<a href=\"javascript:void(0)\" class=\"sub\">-</a>"+
                        "<input type=\"text\" value=\"1\" class=\"numbers\">"+
                        "<a href=\"javascript:void(0)\" class=\"add\">+</a>"+
                        "</div>"+
                        "<button value=\"\" class=\"orderSure\">确定</button>"+
                        "<button value=\"\" class=\"orderCancle\">取消</button>"+
                        "</div>"+
                        "</div>";

                    var container=$(".sceneitems");
                    container.append(str2);
                    for (i = 0; i < aBuy.length; i++) {
                        aBuy[i].index = i;
                        aBuy[i].onclick = function () {
                            $(".shopMsg").css("display","block");
                            document.documentElement.style.overflow='hidden';
                            ID = ticketID[this.index];
                            TicketTypeIDDistributorLevelCode = TicketTypeIDDistributorLevelCode[this.index];
                            Name = ticketTypeName[this.index];
                            $(".orderCancle").click(function(){
                                $(".shopMsg").css("display","none");
                                document.documentElement.style.overflow='auto';
                            });
                            $("body").on('click','.orderSure',function(){
                                touristName = $(this).parent(".shopMsg").find(".touristName").val();
                                touristTel = $(this).parent(".shopMsg").find(".touristPhone").val();
                                num = $(this).parent(".shopMsg").find(".numbers").val();
                                touristDate = $(this).parent(".shopMsg").find(".touristDate").val();
                                if($(this).parent(".shopMsg").find("#yes").attr("checked")=="checked")
                                {
                                    check="1";
                                }
                                else
                                {
                                    check="0";
                                }
                                book(ID, TicketTypeIDDistributorLevelCode, Name, num, touristName, touristTel, touristDate, check);
                            });
                        }
                    }
                }
            },
            error:function(err){
                alert("请求超时，请重新获取");
            }

        });
    /*
    }else{
        alert("保证数据不重新加载");
        ticketIDandName=JSON.parse((localStorage.getItem("ticketTypeandName")));
        for(var i=0;i<ticketIDandName.length;i++){
            output(ticketIDandName[i]);
        }

    }
     */

    $("body").on("click",'.add',function () {
        var attrNew = parseInt($(this).siblings("input").attr("value")) + 1;
        $(this).siblings("input").attr("value", attrNew);
    });
    $("body").on("click",'.sub',function () {
        var attrNew = parseInt($(this).siblings("input").attr("value")) - 1 <= 0 ? 1 : parseInt($(this).siblings("input").attr("value")) - 1;
        $(this).siblings("input").attr("value", attrNew);
    });

    function book(ticketTypeID,TicketTypeIDDistributorLevelCode,ticketTypeName,num,touristName,touristTel,touristDate,check){
        var token1=getCookie("token");
        //alert("token1",token1);
        //根据获取到的票型来看ID
        //alert("check"+check);
        var ticketTypeID1=ticketTypeID;
        var TicketTypeIDDistributorLevelCode1=TicketTypeIDDistributorLevelCode;
        var ticketTypeName1=ticketTypeName;
        var strticketNum1=num;
        var TourDate1=touristDate;
        //alert("日期hahahah"+TourDate1);
        var touristName1=touristName;
        var touristPhone1=touristTel;
        var MMSflag1=check;
        var bookorbuyorverifyflag1="1";
        //alert(new Date().getTime());
        //alert("what");
        //alert("TicketTypeIDDistributorLevelCode:"+TicketTypeIDDistributorLevelCode);
        var thirdpartyno1=getCookie("distributorID")+new Date().getTime();
        jQuery.ajax({
            url:"http://www.52uku.net/webservice.asmx/bookAndBuyTicketsForDistributor?jsoncallback=?",
            type:"GET",
            contentType: "application/json",
            data:{
                "token":token1,
                "ticketTypeID":ticketTypeID1,
                "TicketTypeIDDistributorLevelCode":"",
                "ticketTypeName":ticketTypeName1,
                "strticketNum":strticketNum1,
                "thirdpartyno":thirdpartyno1,
                "TourDate":TourDate1,
                "touristName":touristName1,
                "touristPhone":touristPhone1,
                "MMSflag":MMSflag1,
                "bookorbuyorverifyflag":bookorbuyorverifyflag1,
                "verifycode":$.md5(token1+ticketTypeID1+""+ticketTypeName1+strticketNum1+thirdpartyno1+TourDate1+touristName1+touristPhone1+MMSflag1+bookorbuyorverifyflag1)},
            dataType: "jsonp",
            jsonp:'callback',
            jsonpCallback:'jsonpCallback',
            timeout:3000,
            success: function (result) {
                if(result.STATUS=="OOOKK"){
                    alert("您已经购票成功");
                    $(".shopMsg").css("display","none");
                    document.documentElement.style.overflow='auto';
                }
            } ,
            error: function(err){
                alert("购票失败");
            }
        })



    }
})  ;



