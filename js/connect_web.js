
/*
 * 这个JS文件是用来连接webservice;
 */

document.write("<script type='text/javascript' src='js/jquery.js'></script>");
document.write("<script type='text/javascript' src='js/jquery.md5.js'></script>");




jQuery(document).ready(function(){


	
	
	/*
	 * token1、 function1等变量是需要传递给服务器的信息，到时应该从HTML页面中获取；
	 * HTML页面调用该js文件  那要怎么赋值呢？？？？document.getelementbyid...
	 * 
	 * 暂时先给定
	 */
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
                   type:"GET",   //你选择get或者post最后都是get，跨域情况下都是get
                   contentType: "application/json", //不确定什么用
                   data:{
                   	
                   	"token":token1,
                    "program":para11,
                    "distributorID":para21,
                    "identity":para31,
                     "promotionflag":para41,
                    
                    "verifycode":$.md5(token1+para11+para21+para31+para41)
                        },    //这里是要传递的参数，格式为data: "{paraName:paraValue}",
                   dataType: "jsonp",
                   jsonp:'callback',                          //服务器端获取回调函数名的key，对应后台有$_GET['callback']='getName';callback是默认值
                   jsonpCallback:'jsonpCallback',                   //回调函数名
                   timeout:3000,
                   //beforeSend:function(x) { x.setRequestHeader("Content-Type","application/json; charset=utf-8"); },
                 success: function (result) {//回调函数，result，返回值
                     alert("connect_web is ok");
                     alert(result.STATUS);
                     //alert(result.RECODENUM);
                     /*
                     var result={"STATUS": "OOOKK",
                         "MESSAGE": "共1条数据",
                         "RECORDNUM": "1", "DATASET":[{"TicketTypeID":"30","LevelCode":"AAAAADAACAAt","TicketTypeName":"太白山滑雪周内套票","DistributorID":"51","DistributorName":"爱玩网","PrintPrice":"138","DealPrice":"11","LowestPrice":"0","TickeTypeThatName":"太白山滑雪周内套票","ContractDescrip":"售票","DelayHours":"0","BeginDate":"2014-12-8 0:00:00","EndDate":"2022-12-9 0:00:00","TicketGateRelation":"1T1G","Demo":"","Website":"","ToSalerInfo":"","ToTouristInfo":"","TicketTypeIDDistributorLevelCode":"00000088AAAACLAACAEH"
                     }]};
                     */
                    if(result.STATUS=="OOOKK"){
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
                         //contractDescrip[i] = result.DATASET[i].ContractDescrip;
                         delayHours[i] = result.DATASET[i].DelayHours;
                         beginDate[i] = result.DATASET[i].BeginDate;
                         endDate[i] = result.DATASET[i].EndDate;
                         ticketGateRelation[i] = result.DATASET[i].TicketGateRelation;
                         demo[i] = result.DATASET[i].Demo;
                         toSalerInfo[i] = result.DATASET[i].ToSalerInfo;
                         toTouristInfo[i] = result.DATASET[i].ToTouristInfo;
                         website[i] = result.DATASET[i].Website;//
                         TicketTypeIDDistributorLevelCode=result.DATASET[i].TicketTypeIDDistributorLevelCode;
                     }
                     
                     function createDiv(i) {
                         var oCon = document.getElementById("content");
                         var oL = document.createElement("div");
                         oL.className = "entry";
                         oCon.appendChild(oL);
                         var oUl = document.createElement("ul");
                         oUl.className = "list";
                         oL.appendChild(oUl);
                         var oLi1 = document.createElement("li");
                         oLi1.className = "tab_list1 tab_bq1";
                         oUl.appendChild(oLi1);
                         oLi1.innerHTML = distributorName[i];
                         var oLi2 = document.createElement("li");
                         oLi2.className = "tab_list2 tab_bq1";
                         oLi2.style.color = "blue";
                         oUl.appendChild(oLi2);
                         oLi2.innerHTML = ticketTypeName[i];
                         var oLi3 = document.createElement("li");
                         oLi3.className = "tab_list3 tab_bq1";
                         oUl.appendChild(oLi3);
                         oLi3.innerHTML = "￥" + printPrice[i];
                         var oLi4 = document.createElement("li");
                         oLi4.className = "tab_list4 tab_bq1";
                         oLi4.style.color = "#ff4500";
                         oLi4.style.fontSize = "15px";
                         oLi4.style.fontFamily = "Algerian";
                         oUl.appendChild(oLi4);
                         oLi4.innerHTML = "￥" + dealPrice[i];
                         var oLi5 = document.createElement("li");
                         oLi5.className = "tab_list5 tab_bq1";
                         oUl.appendChild(oLi5);
                         oLi5.innerHTML = beginDate[i] + "~" + endDate[i];
                         var oLi6 = document.createElement("li");
                         oLi6.className = "tab_list6 tab_bq1";
                         oUl.appendChild(oLi6);
                         oLi6.innerHTML = "<input type='button' value='购票' class='btn_buy'>"
                     }

                     for (i = 0; i < result.DATASET.length; i++) {
                         createDiv(i);
                     }
                     var aDiv = document.getElementsByClassName("entry");

                     for (i = 0; i < aDiv.length; i++) {
                         aDiv[i].index = i;
                         aDiv[i].onmouseover = function () {
                             this.className = "entry_mouse";


                         };
                         aDiv[i].onmouseout = function () {
                             this.className = 'entry';


                         };

                     }

                     var aBuy = document.getElementsByClassName("btn_buy");
                     var oInfor = document.getElementById("buy_information");
                     var ID;
                     var TicketTypeIDDistributorLevelCode;
                     var Name;
                     var touristName;
                     var touristTel;
                     var touristDate;
                     var num;
                     var check;

                     var oName = document.getElementById("touristName");
                     var oTel = document.getElementById("touristTel");
                     var oDate = document.getElementById("touristDate");
                     var oNum = document.getElementById("people_count");
                     var oBtn = document.getElementById("submit");
                     var oYes = document.getElementById("yes");
                     var oNo = document.getElementById("No");
                     var oClose=document.getElementById("close");

                     var oJian=document.getElementById("jian");
                     var oJia=document.getElementById("jia");
                        oJian.onclick=function()
                        {
                            oNum.value--;

                        };
                        oJia.onclick=function()
                        {
                            oNum.value++;
                        };


                     for (i = 0; i < aBuy.length; i++) {
                         aBuy[i].index = i;
                         aBuy[i].onmouseover = function () {
                             this.style.background = "orange";

                         };
                         aBuy[i].onmouseout = function () {
                             this.style.background = "#ff4500";
                         };
                         /*document.onclick=function () {
                             oInfor.style.display="none";

                         };*/

                         aBuy[i].onclick = function () {


                             ID = ticketID[this.index];
                             TicketTypeIDDistributorLevelCode=TicketTypeIDDistributorLevelCode[this.index];
                             Name = ticketTypeName[this.index];
                             oInfor.style.display = "block";
                             oName.value=getCookie("UserRealName");
                             oTel.value=getCookie("UserMobile");
                             oClose.onclick=function()
                             {
                                 oInfor.style.display = "none";

                             };
                          /*   oInfor.onmouseout=function () {
                                 document.onclick=function () {
                                     oInfor.style.display="none";

                                 };


                             };*/
                             oBtn.onclick = function () {
                                 touristName = oName.value;
                                 touristTel = oTel.value;
                                 num = oNum.value;
                                 touristDate = oDate.value;
                                 if(oYes.checked==true)
                                 {
                                     check="1";
                                 }
                                 else
                                 {
                                     check="0";
                                 }

                                 book(ID, TicketTypeIDDistributorLevelCode,Name, num, touristName, touristTel,touristDate,check);

                             };

                             }
                         }
                 }

                   },

                   error:function(err){
                       alert("connect_web is error");
                       alert(err.textStatus);
                   }

         });
})  ;



