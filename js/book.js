
document.write("<script type='text/javascript' src='js/jquery.md5.js'></script>");

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
                 	}
                 } ,
                 	error: function(err){
                 	alert("购票失败");
                 }
            })
       
       

}