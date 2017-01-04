/**
 * Created by liuhong on 2016/11/22.
 */
$(function(){
    /*login_part and register_part*/

     $('#back').click(function(){
     window.location.href="index.html";
     });

    /*index_part*/
    $('.searchtext').focus(function(){
        $(this).attr('value',null);
    });

});