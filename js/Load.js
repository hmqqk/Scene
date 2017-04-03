
document.write("<script type='text/javascript' src='js/jquery.md5.js'></script>");

 jQuery(document).ready(function(){
       jQuery("#login").click(function () {
       var token1="3714861a5b5d78f9bd5d25cb25b371a1358";//任意传即可
       var function1="SmartParkLogin";
       var para11=document.getElementById("username").value;
       var para21=document.getElementById("lpsd").value;
       var para31="0";
       var para41="1";
       var verifycode1=$.md5(token1+function1+para11+para21+para31+para41);
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
                   timeout:3000,
                 success: function (result) {
                 	if(result.STATUS=="OOOKK"){
                        getUserInformation(result);
                        window.location.href="index.html";
                 	}
                 } ,
                 	Error: function(err){
                 	alert("登录失败，请重新登录");
                 }
                 
                 
            });
           


	
    })
})