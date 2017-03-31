/**
 * Created by Administrator on 2016/12/2 0002.*/

function getUserInformation(Data) {
    setCookie("UserID",Data.DATASET[0].UserID);
    setCookie("UserName",Data.DATASET[0].UserName);
    setCookie('UserPassword',Data.DATASET[0].UserPassword);
    setCookie('UserIdentity',Data.DATASET[0].UserIdentity);
    setCookie('UserMobile',Data.DATASET[0].UserMobile);
    setCookie('UserRealName',Data.DATASET[0].UserRealName);
    setCookie('RegisterTimeD',Data.DATASET[0].RegisteTime);
    setCookie('Birthday',Data.DATASET[0].Birthday);
    setCookie('Sex',Data.DATASET[0].Sex);
    setCookie('token',Data.DATASET[0].Token);
    setCookie('distributorID',Data.DATASET[0].DistributorID);
    setCookie('distributorIDCode',Data.DATASET[0].DistributorIDCode);
}
function  setCookie(name,value) {
   document.cookie=name+'='+value;
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

