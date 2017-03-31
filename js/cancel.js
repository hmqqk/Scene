


   $(".cancelButton").live(function () {
       alert("退票操作中");
       var token1=getCookie("token");
       var thirdpartyno1="123456789012";
       var content2D1="0030111143152195"
       var avaliablenum1="3";
           
       jQuery.ajax({
    		       url:"http://www.52uku.net/webservice.asmx/CancelTicketsForDistributor?jsoncallback=?",
                   type:"GET",   
                   contentType: "application/json", 
                   data:{
                   	"token":token1,
                    "thirdpartyno":thirdpartyno1,
                    "Content2D":content2D1,
                    "avaliablenum":avaliablenum1
                        },
                   dataType: "jsonp",
                   jsonp:'callback',
                   jsonpCallback:'jsonpCallback',
                   timeout:3000,
                  success: function (result) {
                 	if(result.STATUS=="OOOKK"){
                 		alert("退票成功");
                 	}
                 } ,
                 	Error: function(err){
                 	alert("退票失败");
                 }
            })
    });