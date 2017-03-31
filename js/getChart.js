/**
 * Created by liuhong on 2017/3/31.
 */
var chart;
$(document).ready(function() {
    jQuery.ajax({
        url:"http://www.52uku.net/webservice.asmx/SendOrderEticketsByContent2D?jsoncallback=?",
        type:"GET",
        contentType: "application/json",
        data:{
            "token":getCookie('token'),
            "Content2D":"0076112136195874",
            "phoneNumber":"18292864770"
        },
        dataType: "jsonp",
        jsonp:'callback',
        jsonpCallback:'jsonpCallback',
        timeout:3000,
        success: function (result) {
            if(result.STATUS=="OOOKK"){
                chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'container',
                        margin: [0, 0, 0, 0]
                    },
                    title: {
                        text: 'Browser market shares at a specific website, 2010'
                    },
                    plotArea: {
                        shadow: null,
                        borderWidth: null,
                        backgroundColor: null
                    },
                    tooltip: {
                        formatter: function() {
                            return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
                        }
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                formatter: function() {
                                    if (this.y > 5) return this.point.name;
                                },
                                color: 'white',
                                style: {
                                    font: '13px Trebuchet MS, Verdana, sans-serif'
                                }
                            }
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        style: {
                            left: 'auto',
                            bottom: 'auto',
                            right: '50px',
                            top: '100px'
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Browser share',
                        data: [
                            ['Firefox',   10.0],
                            ['IE',       10.0],
                            {
                                name: 'Chrome',
                                y: 10.0,
                                sliced: true,
                                selected: true
                            },
                            ['Safari',    6.0],
                            ['Opera',     6.0],
                            ['Others',   6.0]
                        ]
                    }]
                });
                //alert("重发码成功");
                //$(".calcleMenu2").css("display","none");
            }
        } ,
        error: function(err){
            alert("重发码失败");
            var arr=['1','2','3','4','5','6'];
            var arr2=[10.0,20.0,10.0,10.0,3.0,30.0];
            chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'container',
                    margin: [100, 0, 0, 0]
                },
                title: {
                    text: '票务通票型销售排行'
                },
                plotArea: {
                    shadow: null,
                    borderWidth: null,
                    backgroundColor: null
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            formatter: function() {
                                if (this.y > 5) return this.point.name;
                            },
                            color: 'white',
                            style: {
                                font: '13px Trebuchet MS, Verdana, sans-serif'
                            }
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    style: {
                        left: 'auto',
                        bottom: 'auto',
                        right: '50px',
                        top: '140px'
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'chart',
                    data: [
                        [arr[0],   arr2[0]],
                        [arr[1],       arr2[1]],
                        [arr[2],       arr2[2]],
                        [arr[3],    arr2[3]],
                        [arr[4],     arr2[4]],
                        [arr[5],   arr2[5]]
                    ]
                }]
            });

        }
    });

});