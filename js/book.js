document.write("<script type='text/javascript' src='js/jquery.js'></script>");
document.write("<script type='text/javascript' src='js/jquery.md5.js'></script>");

function book(ticketTypeID,TicketTypeIDDistributorLevelCode,ticketTypeName,num,touristName,touristTel,touristDate,check){
       alert("ticketTypeName1="+ticketTypeName);
       alert("进入Book函数");
       alert("ticketTypeID="+ticketTypeID);//76
       var token1="3714861a5b5d78f9bd5d25cb25b371a1357";
       alert("token1="+token1);
       //根据获取到的票型来看ID
       var ticketTypeID1=ticketTypeID;
       alert("ticketTypeID1="+ticketTypeID1);
       var TicketTypeIDDistributorLevelCode1=TicketTypeIDDistributorLevelCode;
       var ticketTypeName1=ticketTypeName;
       alert("ticketTypeName1="+ticketTypeName1);
       var strticketNum1=num;
       var thirdpartyno1="123456789012";
       var TourDate1=touristDate;
       alert("touristDate="+touristDate);
       var touristName1=touristName; 
       var touristPhone1=touristTel;
       var MMSflag1=check;
       var bookorbuyorverifyflag1="1";

       jQuery.ajax({
    		      url:"http://www.52uku.net/webservice.asmx/bookAndBuyTicketsForDistributor?jsoncallback=?",
                   type:"GET",   
                   contentType: "application/json", 
                   data:{
                   	"token":token1,
                    "ticketTypeID":ticketTypeID1,
                    "TicketTypeIDDistributorLevelCode":TicketTypeIDDistributorLevelCode1,
                    "ticketTypeName":ticketTypeName1,
                    "strticketNum":strticketNum1,
                    "thirdpartyno":thirdpartyno1,
                    "TourDate":TourDate1,
                    "touristName":touristName1,
                    "touristPhone":touristPhone1,
                    "MMSflag":MMSflag1,
                    "bookorbuyorverifyflag":bookorbuyorverifyflag1,
                    
                    "verifycode":$.md5(token1+ticketTypeID1+TicketTypeIDDistributorLevelCode1+ticketTypeName1+strticketNum1+thirdpartyno1+TourDate1+touristName1+touristPhone1+MMSflag1+bookorbuyorverifyflag1)
                        },    //这里是要传递的参数，格式为data: "{paraName:paraValue}",
                   dataType: "jsonp",
                   jsonp:'callback',                          //服务器端获取回调函数名的key，对应后台有$_GET['callback']='getName';callback是默认值
                   jsonpCallback:'jsonpCallback',                   //回调函数名
                   timeout:3000,
                   //beforeSend:function(x) { x.setRequestHeader("Content-Type","application/json; charset=utf-8"); },
                 success: function (result) {
                 	alert("result.STATUS="+result.STATUS);
                 	alert("result.MESSAGE="+result.MESSAGE);
                    alert("touristDate="+touristDate);
                    alert("touristPhone1="+touristPhone1);
                 	if(result.STATUS=="OOOKK"){
                        alert("您已经购票成功");
                        var oInfor=document.getElementById("buy_information");
                        oInfor.style.display="none";
                 		
                 		
                 	}
                 	
                 
                 } ,
                 	Error: function(err){
                 	alert("ghfgh");
                 }
                 
                 
            })
       
       

}