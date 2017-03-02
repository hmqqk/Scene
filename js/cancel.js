document.write("<script type='text/javascript' src='js/jquery.js'></script>");
document.write("<script type='text/javascript' src='js/jquery.md5.js'></script>");



jQuery(document).ready(function(){


       jQuery("#register").click(function () {
	
      
       var token1="3714861a5b5d78f9bd5d25cb25b371a1357";
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
                       
                    //"verifycode":$.md5(token1+thirdpartyno1+avaliablenum1)
                    
                        },    //这里是要传递的参数，格式为data: "{paraName:paraValue}",
                   dataType: "jsonp",
                   jsonp:'callback',                          //服务器端获取回调函数名的key，对应后台有$_GET['callback']='getName';callback是默认值
                   jsonpCallback:'jsonpCallback',                   //回调函数名
                   timeout:3000,
                   //beforeSend:function(x) { x.setRequestHeader("Content-Type","application/json; charset=utf-8"); },
                  success: function (result) {
                 	
                 	alert("CancelTicketsForDistributor");
                 	alert(result.STATUS);
                 	alert(result.MESSAGE);
                 	
                 	if(result.STATUS=="OOOKK"){
                 		alert("退票成功");
                 	}
                 } ,
                 	Error: function(err){
                 	alert("退票失败");
                 }
            })
    })
})