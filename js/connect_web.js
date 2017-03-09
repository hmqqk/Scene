
/*
 * 这个JS文件是用来连接webservice;
 */
document.write("<script type='text/javascript' src='js/jquery.js'></script>");
document.write("<script type='text/javascript' src='js/jquery.md5.js'></script>");

jQuery(document).ready(function(){
	   var token1="3714861a5b5d78f9bd5d25cb25b371a1357";
       var para11="SMARTPARKCLIENT";
       var para21="224";
       var para31="0";
       var para41="1";

    var ticketID=new Array(100);
    var levelCode=new Array(100);
    var ticketTypeName=new Array(100);
    var distributorID=new Array(100);
    var distributorName=new Array(100);
    var printPrice=new Array(100);
    var dealPrice=new Array(100);
    var lowerstPrice=new Array(100);
    var ticketTypeThatName=new Array(100);
   // var contractDescrip=new Array(100);
    var delayHours=new Array(100);
    var beginDate=new Array(100);
    var endDate=new Array(100);
    var ticketGateRelation=new Array(100);
    var demo=new Array(100);
    var toSalerInfo=new Array(100);
    var toTouristInfo=new Array(100);
    var website=new Array(100);
    var TicketTypeIDDistributorLevelCode=new Array(100);


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
                   timeout:3000,
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
                        }
                            for (i = 0; i < result.DATASET.length; i++) {
                                var sceneitems = $(".sceneitems");
                                outputData(sceneitems, i);
                            }

                            function outputData(container, item) {
                                var testStr = "<div class=\"scenePart\">" +
                                    "<ul class=\"sceneDMsg\">" +
                                    "<li class=\"type\"><a href=\"\">" + ticketID[item] + "</a></li>" +
                                    "<li class=\"type\"><a href=\"\">" + ticketTypeName[item] + "</a></li>" +
                                    "<li class=\"explation\">需在" + beginDate[item] + "至" + endDate[item] + "期间完成使用</li>" +
                                    "<li class=\"cost1\">￥" + printPrice[item] + "</li>" +
                                    "<li class=\"cost2 red\">￥" + dealPrice[item] + "</li>" +
                                    "<li class=\"buy\">" +
                                    "<button value=\"\">购买</button>" +
                                    "</li>"+
                                "</ul>";
                                container.append(testStr);
                            }

                            var sub = $(".sub");
                            var add = $(".add");
                            add.click(function () {
                                var attrNew = parseInt($(this).siblings("input").attr("value")) + 1;
                                $(this).siblings("input").attr("value", attrNew);
                            });
                            sub.click(function () {
                                var attrNew = parseInt($(this).siblings("input").attr("value")) - 1 <= 0 ? 1 : parseInt($(this).siblings("input").attr("value")) - 1;
                                $(this).siblings("input").attr("value", attrNew);
                            });



                            var aBuy = $(".buy");
                            var ID;
                            var TicketTypeIDDistributorLevelCode;
                            var Name;
                            var touristName;
                            var touristTel;
                            var touristDate;
                            var num;
                            var check;
                           /*
                           $(".buy").click(function(){
                               alert(1);
                               if($(".shopMsg").attr("display")=="block"){
                                   $(".shopMsg").attr("display","none");
                                   $(this).parent(".sceneDMsg").siblings(".shopMsg");
                               }
                               else
                                   $(this).parent(".sceneDMsg").siblings(".shopMsg");

                           });
                           */
                        $(".touristDate").live("click",function(){
                            setday(this);
                        });

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
                            "<input type=\"text\" class=\"basicMsg touristDate\" value=\"\">"+
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
                                    ID = ticketID[this.index];
                                    alert("ID IS WHAT"+ID);
                                    TicketTypeIDDistributorLevelCode = TicketTypeIDDistributorLevelCode[this.index];
                                    Name = ticketTypeName[this.index];
                                    //touristName = getCookie("UserRealName");
                                    //touristTel = getCookie("UserMobile");
                                    //num = parseInt($(".numbers").attr("value"));
                                    //alert(check);


                                    //var container1=$(this).parent('.sceneDMsg').parent(".scenePart");
                                    //container1.css("height","163px");
                                    //var container2=$(this).parent(".sceneDMsg").siblings(".shopMsg");
                                    //alert(container2);
                                    //container2.fadeIn();
                                    $(".orderCancle").click(function(){
                                        $(".shopMsg").css("display","none");
                                    });



                                    $(".orderSure").click(function(){
                                        touristName = $(this).parent(".shopMsg").find(".touristName").attr("value");
                                        alert("touristName"+touristName);
                                        touristTel = $(this).parent(".shopMsg").find(".touristPhone").attr("value");
                                        num = $(this).parent(".shopMsg").find(".numbers").attr("value");
                                        touristDate = $(this).parent(".shopMsg").find(".touristDate").attr("value");
                                        if($(this).parent(".shopMsg").find("#yes").attr("checked")==true)
                                        {
                                            check="1";
                                        }
                                        else
                                        {
                                            check="0";
                                        }
                                        alert("testing"+check);

                                        book(ID, TicketTypeIDDistributorLevelCode, Name, num, touristName, touristTel, touristDate, check);
                                    });



                                }
                            }


                        }

                   },

                   error:function(err){
                       alert("can't get sceneMsg");
                   }

         });
})  ;



