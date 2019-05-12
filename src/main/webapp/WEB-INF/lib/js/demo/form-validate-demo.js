//以下为修改jQuery Validation插件兼容Bootstrap的方法，没有直接写在插件中是为了便于插件升级
$.validator.setDefaults({
    highlight: function (element) {
        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    success: function (element) {
        element.closest('.form-group').removeClass('has-error').addClass('has-success');
    },
    errorElement: "span",
    errorPlacement: function (error, element) {
        if (element.is(":radio") || element.is(":checkbox")) {
            error.appendTo(element.parent().parent().parent());
        } else {
            error.appendTo(element.parent());
        }
    },
    errorClass: "help-block m-b-none",
    validClass: "help-block m-b-none"
});
//打印表格
function prientTable() {
    var printContent = $('#gview_table_list_2').html();
    var bodyContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = bodyContent;

}
//去掉所有空格，第二个参数为‘g’
function Trim(str, is_global) {

    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
    }
    return result;
}
//导出excel报表
function download(d) {
    $('.download-bt').click(function () {
        var param = $('.download-input');
        var date = {};
        var hasValue = true;
        var title = '';

        $.each(param, function (index, val) { 
            var obj = $(val);           
            date[obj.attr('name')] = Trim(obj.val(), 'g')          
            if (!obj.val()) {
                hasValue = false;
                title = obj.attr('title')
            }
        })
        console.log(date);
        if (!hasValue) { 
            swal({
                title: '请选择' + title,
                type: "warning",
            });
            return hasValue;
        }
        $.ajax({
            url: d.url,
            type: 'POST',
            data: date,
            success: function (data) {

              if(data.success){
                 location.href=d.downUrl+'?'+$.param(date)
              }else{
                 swal({
                    title: '该时间内没有数据',
                    text:'请重新选择时间段',
                    type: "warning",
                    timer:4500
                 });
              }
            },
            error: function () {
                alert('导出报表失败')
            }
        })
    })

}
//当前时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + date.getHours() + seperator2 + date.getMinutes() +
        seperator2 + date.getSeconds();
    return currentdate;
};
//计算两个日期天数差的函数，通用 
function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式 
    var aDate, oDate1, oDate2, iDays
    aDate = sDate1.split("-")
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为12-18-2006格式 
    aDate = sDate2.split("-")
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数 
    return iDays
}
//比较两个时间的大小，例如2016-08-12大于2017-05-19，如果d1大于d2则返回
function CompareDate(d1, d2) {
    return ((new Date(d1.replace(/-/g, "\/"))) > (new Date(d2.replace(/-/g, "\/"))));
}
/*加减乘除精度丢失*/
var floatTool = function () {

    /*
     * 判断obj是否为一个整数
     */
    function isInteger(obj) {
        return Math.floor(obj) === obj
    }

    /*
     * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
     * @param floatNum {number} 小数
     * @return {object}
     *   {times:100, num: 314}
     */
    function toInteger(floatNum) {
        var ret = {
            times: 1,
            num: 0
        }
        if (isInteger(floatNum)) {
            ret.num = floatNum
            return ret
        }
        var strfi = floatNum + ''
        var dotPos = strfi.indexOf('.')
        var len = strfi.substr(dotPos + 1).length
        var times = Math.pow(10, len)
        var intNum = parseInt(floatNum * times + 0.5, 10)
        ret.times = times
        ret.num = intNum
        return ret
    }

    /*
     * 核心方法，实现加减乘除运算，确保不丢失精度
     * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
     *
     * @param a {number} 运算数1
     * @param b {number} 运算数2
     * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
     * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
     *
     */
    function operation(a, b, op) {
        var o1 = toInteger(a)
        var o2 = toInteger(b)
        var n1 = o1.num
        var n2 = o2.num
        var t1 = o1.times
        var t2 = o2.times
        var max = t1 > t2 ? t1 : t2
        var result = null
        switch (op) {
            case 'add':
                if (t1 === t2) { // 两个小数位数相同
                    result = n1 + n2
                } else if (t1 > t2) { // o1 小数位 大于 o2
                    result = n1 + n2 * (t1 / t2)
                } else { // o1 小数位 小于 o2
                    result = n1 * (t2 / t1) + n2
                }
                return result / max
            case 'subtract':
                if (t1 === t2) {
                    result = n1 - n2
                } else if (t1 > t2) {
                    result = n1 - n2 * (t1 / t2)
                } else {
                    result = n1 * (t2 / t1) - n2
                }
                return result / max
            case 'multiply':
                result = (n1 * n2) / (t1 * t2)
                return result
            case 'divide':
                return result = function () {
                    var r1 = n1 / n2
                    var r2 = t2 / t1
                    return operation(r1, r2, 'multiply')
                }()
        }
    }

    // 加减乘除的四个接口
    function add(a, b) {
        return operation(a, b, 'add')
    }

    function subtract(a, b) {
        return operation(a, b, 'subtract')
    }

    function multiply(a, b) {
        return operation(a, b, 'multiply')
    }

    function divide(a, b) {
        return operation(a, b, 'divide')
    }

    // exports
    return {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide
    }
}();

//获取url里面的参数
function getUrlParam(url) {
    var Url;
    if (url) {
        Url = url;
    } else {
        Url = location.href;
    }
    var Url = Url.split('?');
    var urlObj = {};
    if (Url[1]) {
        $.each(Url[1].split('&'), function (index, val) {
            urlObj[decodeURI(val.split('=')[0])] = decodeURI(val.split('=')[1])
        });
        return urlObj;
    } else {
        return false;
    }
}
//=============================共用验证库===================================
var icon = "<i class='fa fa-times-circle'></i> ";
//自定义两位小数验证
jQuery.validator.addMethod("numberTwo", function (value, element) {
    var pattern = /^\+?(\d*\.\d{2})$/;
    return this.optional(element) || (pattern.test(value));
}, icon + "保留两位小数，如10.00");

//整数 
jQuery.validator.addMethod("integer", function (value, element) {
    var pattern = /^[0-9]+$/;
    return this.optional(element) || (pattern.test(value));
}, icon + "请输入整数");

//正整数 
jQuery.validator.addMethod("positive", function (value, element) {
    var pattern = /^[1-9]+[0-9]*]*$/;
    return this.optional(element) || (pattern.test(value));
}, icon + "请输入正整数");

//0+正整数 
jQuery.validator.addMethod("zeropositive", function (value, element) {
	  	if (value == '0') {
	        return true
	    } else {
	        var pattern = /^[1-9]+[0-9]*]*$/;
	        return pattern.test(value);
	    }

}, icon + "请输入0或正整数");

//不能有特殊字符 
jQuery.validator.addMethod("specialChart", function (value, element) {
    var reg = "[`~!@#$^&*()=|{}':;',\\[\\].<>?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]" + '"';
    var regular = reg.split('');
    var input = value.split('');
    var hasChart = true;
    for (var d = 0; d < input.length; d++) {
        for (var f = 0; f < regular.length; f++) {
            if (input[d] == regular[f]) {
                hasChart = false;
            };
        };
    };
    return hasChart;
}, icon + "不能有特殊字符");


//缴纳电费时候，实手水电费不能小于应收水电费额度
jQuery.validator.addMethod("shoudPay", function (value, element) {
    var shoudPay = Number($('#index').val())
    return (shoudPay > 0);
}, icon + "实收费用不能小于应缴费用");

//两个时间日历插件时，选择的起始时间需要小于结束时间
jQuery.validator.addMethod("twoDate", function (value, element) {
    var otherValue = $($(element).data('id')).val()
    if (otherValue) {
        var beginDate = $('#beginDate').val();
        var endDate = $('#endDate').val();;
        return CompareDate(endDate, beginDate);
    } else {
        return true;
    }

}, icon + "起租时间要小于止租时间");

//缴纳电费时候，需要先输入抄见数
jQuery.validator.addMethod("beforInput", function (value, element) {
    var shoudPay = $(element).parent().parent().parent().find('input[data-pay="thisValue"]').val()
    console.log(shoudPay)
    return (shoudPay);
}, icon + "先输入抄见数");

//只能输入中文和英文
jQuery.validator.addMethod("isChart", function (value, element) {
    var pattern = /^[\u0391-\uFFE5A-Za-z]+$/;
    return (pattern.test(value));
}, icon + "只能输入中文或英文");

//不能有中文
jQuery.validator.addMethod("NotChinese", function (value, element) {
    var pattern = /[\u4E00-\u9FA5]/;
    return (!pattern.test(value));
}, icon + "不能含有中文");

//只能输入英文和数字
jQuery.validator.addMethod("isNumOrEnglish", function (value, element) {
    var pattern = /^[0-9a-zA_Z]+$/;
    return (pattern.test(value));
}, "只能输入数字或英文");

//身份证号码验证 
jQuery.validator.addMethod("idCard", function (value, element) {
    var length = value.length;
    var mobile = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    return this.optional(element) || (length == 18 && mobile.test(value));
}, icon + "请正确填写您的身份证号码");


//固定电话
jQuery.validator.addMethod("isTel", function (value, element) {
    var telphone = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
    return this.optional(element) || (telphone.test(value));
}, icon + "请正确填写您的电话号码");

// 手机号码验证
jQuery.validator.addMethod("isMobile", function (value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|170)\d{8}$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, icon + "请正确填写您的手机号码");


//用户名、密码验证,只能是 字母+数字+下划线   /^\w+$/   
jQuery.validator.addMethod("alnum", function (value, element) {
    return this.optional(element) || /^\w+$/.test(value);
}, icon + "只能包括英文字母、数字或下划线");

//用户名只能以字母开头   /^\w+$/   
jQuery.validator.addMethod("onlyChar", function (value, element) {
    return this.optional(element) || /^[a-zA-Z]/.test(value);
}, icon + "只能以字母开头");

//验重 ,唯一性验证
var labelText = ''
jQuery.validator.addMethod("isRepeat", function (value, element) {
	
    var ele = $(element)
    labelText = ele.parents('.form-group').find('label').text().split('：')[0];
    var repeat = true;
    var data = {};
    data[ele.attr('name')] = value;
    console.log(value);
    console.log(ele.data("oldVlaue"));
   if(ele.data("oldVlaue")!==value){
       $.ajax({
           async: false,
           url: '..' + ele.data('url'),
           type: 'POST',
           data: data,
           success: function (data) {
               console.log("进入success");
               var isRepeat = JSON.parse(data)[0].isRepeat;
               if (JSON.parse(isRepeat)) {
                   repeat = false;
               }
           },
           error: function () {
               console.log('验重失败')
           }
       })
   }

    return repeat
}, icon + "已存在，不能重复");
//资源格式，只能是mp4,jpeg,jpg,png
jQuery.validator.addMethod("format", function (value, element) {
    var file = element.files;
    var name = [];
    var type = true;
    var reg = /\.PNG$|\.png$|\.mp4$|\.avi$|\.zip$/;
    for (var i = 0; i < file.length; i++) {
        name.push(file[i].name)
    }
    $.each(name, function (index, val) {
        if (!reg.test(val)) {
            type = false;
        }
    })
    return this.optional(element) || (type);
}, icon + "只能上传PNG/png,mp4,avi,zip格式");
//字符长度
jQuery.validator.addMethod("charLength", function (value, element) {
    var min = $(element).attr('minlength')
    var max = $(element).attr('maxlength')
    var length = value.length;
    var re = true;
    if (!(length > min - 1 && length < max + 1)) {
        re = false;
    }
    return this.optional(element) || (re);
}, icon + "输入长度不合法");



//比较两个时间的大小，所有时间格式，例如2016-08-12大于2017-05-19，08:00大于10:00，如果d1大于d2则返回
function allCompareDate(d1, d2) {
    d1 = d1.replace(/:/g, "");
    d2 = d2.replace(/:/g, "");
    return (parseInt(d1) > parseInt(d2));
}


//通用的比较时间大小方法，选择的起始时间需要小于结束时间
jQuery.validator.addMethod("comparisonDate", function (value, element) {
    var otherValue = $(element).val();
    if (otherValue.length > 0) {
        var beginDate = $('#beginDate').val();
        var endDate = $('#endDate').val();
        return allCompareDate(endDate, beginDate);
    } else {
        return true;
    }
}, icon + "开始时间要小于结束时间");


//自定义经纬度 6位的正负小数
jQuery.validator.addMethod("decimalSix", function (value, element) {
    var pattern = /^[+-]?(\d*\.\d{6})$/;
    return this.optional(element) || (pattern.test(value));
}, icon + "保留六位小数，如46.803965");


//车牌号校验
jQuery.validator.addMethod("isNumberPlate", function (value, element) {
    var pattern = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    return (pattern.test(value));
}, icon + "请输入正确的车牌号");
