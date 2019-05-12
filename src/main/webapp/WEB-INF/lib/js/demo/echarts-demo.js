$(function () {;
    var d = {};
              
    $.ajax({
        async: false,
        url: '../statistic/earchs',
        type: 'POST',
        data: {},
        success: function (data) {     
            d = {
                c1: {
                    v: data.resultMapFirst.timelyList[0],
                    m: data.resultMapFirst.timelyList[1]
                },
                c2: {
                    x: data.resultMapSecond.parkNameList,
                    h: data.resultMapSecond.occupyParkspaceList,
                    n: data.resultMapSecond.totalParkspaceList
                },
                c3: {
                    h: data.resultMapThird.amountList[0],
                    n: data.resultMapThird.amountList[1]
                },
                c4: {
                    x: data.resultMapForth.dateList,
                    v: data.resultMapForth.lastFewDaysCountList,
                    m: data.resultMapForth.lastFewDaysMoneyList
                }
            }
        },
        error: function () {
            alert('失败')
        }
    })
    
   
    /*第一个*/
    var lineChart = echarts.init(document.getElementById("echarts-line-chart"), 'shine');

    var lineoption = option = {
        title: {
            text: '今日成交统计',
            x: 'left',
            textStyle: {
                fontSize: 15,
            }

        },
        formatter: "{a} <br/>{c} {b}",

        series: [
            {
                name: '成交量',
                type: 'gauge',
                radius: '75%',
                center: ['70%', '55%'],
                min: 0,
                max: setMax(100, d.c1.v),
                detail: {
                    formatter: '{value}'
                },
                data: [{
                    value: d.c1.v,
                    name: '成交量'
                }],
                /*detail:{
                    fontSize:'22px',
                }*/
                axisLine: {
                    lineStyle: {
                        color: [[0.2, 'lightgreen'], [0.4, 'orange'], [0.8, 'skyblue'], [1, '#ff4500']],
                        width: 10
                    }
                }
        },
            {
                name: '成交额',
                type: 'gauge',
                radius: '85%',
                center: ['30%', '55%'],
                min: 0,
                max: setMax(1000, d.c1.m),
                detail: {
                    formatter: '{value}'
                },
                data: [{
                    value: d.c1.m,
                    name: '成交额'
                }],
                axisLine: {
                    lineStyle: {
                        color: [[0.6, '#00e68e'], [0.3, '#c39a02'], [1, '#ff4500']],
                        width: 2
                    }
                }
        }

    ]
    };




console.log(d.c2.h.concat(d.c2.n))
    lineChart.setOption(lineoption);
    $(window).resize(lineChart.resize);
    /* 第二个*/
    var barChart = echarts.init(document.getElementById("echarts-bar-chart"), 'shine');
    var baroption = option = {
        title: {
            text: '停车场停车位统计',
            x: 'left',
            textStyle: {
                fontSize: 15,
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },

        legend: {
            data: ['已停车位', '未停车位']
        },
        xAxis: [
            {
                type: 'category',
                data: d.c2.x,
                axisPointer: {
                    type: 'shadow'
                },
                /*   axisLabel: {
                       interval: 0, //横轴信息全部显示
                       rotate: 20, //60度角倾斜显示

                   }*/
            }
       ],
        yAxis: [
            {
                type: 'value',
                name: '数量',
                min: 0,
                max: setMax(100, arrayMax(d.c2.h.concat(d.c2.n))),
                interval: SetInterval(100, 20, arrayMax(d.c2.h.concat(d.c2.n))),
                axisLabel: {
                    formatter: '{value}'
                }
        }
    ],
        series: [
            {
                name: '已停车位',
                type: 'bar',
                data: d.c2.h,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'top'
                        },

                    }
                },
        },
            {
                name: '未停车位', 
                type: 'bar',
                data: d.c2.n,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'top'
                        },

                    }
                },
        }
    ]
    };;
    barChart.setOption(baroption);

    window.onresize = barChart.resize;
    /* /第三个/*/
    var scatterChart = echarts.init(document.getElementById("echarts-scatter-chart"), 'shine');
    var scatteroption = option = {
        title: {
            text: '停车位占用率',
            x: 'left',
            textStyle: {
                fontSize: 15,
            }
        },
        tooltip: {  
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
  /*    legend: {
            orient: 'vertical',
            left: 'center',
            data: ['已停车位', '未停车位']
        },*/
        series: [
            {
                name: '停车位统计',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                    {
                        value: d.c3.h,
                        name: '已停车位:'+d.c3.h,
                    },
                    {
                        value: d.c3.n,
                        name: '未停车位:'+d.c3.n,
                    }
            ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
        }
    ]
    };;
    scatterChart.setOption(scatteroption);
    $(window).resize(scatterChart.resize);

    /*第四个*/
    var kChart = echarts.init(document.getElementById("echarts-k-chart"), 'shine');
    var koption = option = {
        title: {
            text: '5日成交对比',
            /*subtext: '纯属虚构'*/
            textStyle: {
                fontSize: 15,
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['成交量', '成交额']
        },
        toolbox: {
            show: false,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {
                    readOnly: false
                },
                magicType: {
                    type: ['line', 'bar']
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: d.c4.x
        },
        yAxis: [{
                type: 'value',
                name: '成交量',
                min: 0,
                max: setMax(100, arrayMax(d.c4.v)),
                interval: SetInterval(100, 20, arrayMax(d.c4.v)),
                axisLabel: {
                    formatter: '{value} '
                }
        }, {
                type: 'value',
                name: '成交额(元)',
                min: 0,
                max: setMax(1000, arrayMax(d.c4.m)),
                interval: SetInterval(1000, 200, arrayMax(d.c4.m)),
                axisLabel: {
                    formatter: '{value}'
                }
        }
               ],
        series: [
            {
                name: '成交量',
                type: 'line',
                data: d.c4.v,
                yAxisIndex: 0,
                markPoint: {
                    data: [
                        {
                            type: 'max'
                        },
                        {
                            type: 'min'
                        }
                    ]

                }
        },
            {
                name: '成交额',
                type: 'line',
                yAxisIndex: 1,
                data: d.c4.m,
                /*  data:  chartData.resultMapForth.lastFewDaysMoneyList,*/
                markPoint: {
                    data: [
                        {
                            type: 'max'
                        },
                        {
                            type: 'min'
                        }
                    ]

                }
        }
    ]
    };
    kChart.setOption(koption);
    $(window).resize(kChart.resize);

    //获取数组最大值
    function arrayMax(arrs) {
        var max = arrs[0];
        for (var i = 1, ilen = arrs.length; i < ilen; i++) {
            if (Number(arrs[i]) > Number(max)) {
                max = Number(arrs[i]);
            }
        }
    
        
        return max;
        
       
    }
    //设置最大刻度,defalt:默认最大值，value，为实际最大值
    function setMax(defalt, value) {
        var maxValue = defalt; //默认最大值
        if (value > defalt) { //如果实际最大值大于了默认最大值
            maxValue = parseInt((parseInt(value) + parseInt(value / 5)) / 5) * 5;
        };
        return maxValue;
    }
    //设置步长，defalt：默认最大值，interval为默认跨度，value为实际最大值
    function SetInterval(defalt, interval, value) {
        var interval = interval; //默认跨度
        if (value > defalt) { //如果实际最大值大于了默认最大值，重新设置跨度
            var maxValue = parseInt(value) + parseInt(value / 5);
            var interval = parseInt(maxValue / 5);

        }
        return interval;

    }
});
