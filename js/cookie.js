/**
 * Created by Administrator on 2016/12/2 0002.*/

function getUserInformation(Data) {
	alert(Data);
    setCookie("UserID",Data.DATASET[0].UserID);
    setCookie("UserName",Data.DATASET[0].UserName);
    setCookie('UserPassword',Data.DATASET[0].UserPassword);
    setCookie('UserIdentity',Data.DATASET[0].UserIdentity);
    setCookie('UserMobile',Data.DATASET[0].UserMobile);
    setCookie('UserRealName',Data.DATASET[0].UserRealName);
    setCookie('RegisterTimeD',Data.DATASET[0].RegisteTime);
    setCookie('Birthday',Data.DATASET[0].Birthday);
    setCookie('Sex',Data.DATASET[0].Sex);
}
function  setCookie(name,value) {
	//alert("setCookie");

   document.cookie=name+'='+value;
   alert(document.cookie);


}
function getCookie(name) {
    {

        var arr=document.cookie.split("; ");
        for(i=0;i<arr.length;i++)
        {
            var arr2=arr[i].split("=");
            if(arr2[0]==""+name)
            {

                return arr2[1];
            }
        }

        return '';
    }
}
function removeCookie(name)
{
    setCookie(name,"");
}
function emptyCookie() {
    var arr=document.cookie.split(";");
    for(i=0;i<arr.length;i++)
    {
        var arr2=arr[i].split("=");
        removeCookie(arr2[0]);
    }

}

