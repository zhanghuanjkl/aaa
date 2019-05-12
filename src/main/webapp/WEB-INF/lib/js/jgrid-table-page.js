/*表格*/

$(function () {
    // 获取表格数据
    var myTest = $('.my-test tr');

    if (myTest.length) {
        var jgridName = $('.my-jqgid-title').text().split(',')
        var trArray = [];
        var colModelData = [];
        var myTestTh = $('.my-test tr').eq(0).children().length;
        console.log("myTestTh=" + myTestTh); //9
        for (var g = 0; g < myTestTh; g++) {
            trArray[g] = jgridName[g];
            colModelData[g] = {
                name: trArray[g]
            }; //th name值
        };

        var myarr = [];
        for (var i = 0; i < myTest.length; i++) {
            myarr[i] = {};

            for (var h = 0; h < myTestTh; h++) {
                myarr[i][trArray[h]] = $($(myTest[i]).children()[h]).html();
            }
        };
        console.log(colModelData)
        //jqGrid表格初始化，默认把第一列数据作为id
        //设置列的宽度,隐藏列

        $(myTest.children()).each(function () {
            var dom = $(this);
            var width = dom.attr('width');
            var hidden = dom.attr('hidden');
            var index = dom.index();
            if (width) {
                colModelData[index]['width'] = width;
            };
            if (hidden) {
                colModelData[index]['hidden'] = true;
            }

        })
        colModelData[0]['key'] = true;

        /* 表格初始化*/
        $.jgrid.defaults.styleUI = 'Bootstrap';
        // Configuration for jqGrid Example 2
        $("#table_list_2").jqGrid({
            data: myarr,
            datatype: "local",
            height: 450,
            autowidth: true,
            shrinkToFit: true,
            rowNum: 20,
            multiselect: $('.my-jqgid-title').data('config').showCheck,
            scroll: false,
            toolbar: [true, 'both'],
            pgbuttons: true,
            viewrecords: true,
            onSelectRow: function (id) {

            },
            colNames: jgridName,
            colModel: colModelData,
            pager: "#pager_list_2",
            viewrecords: true,
            caption: $('.my-jqgid-caption').text(),
        });
        /*表格自适应*/
        $(window).bind('resize', function () {
            var width = $('.jqGrid_wrapper').width();
            $('#table_list_1').setGridWidth(width);
            $('#table_list_2').setGridWidth(width);
        });
    } else {
        $('.jqGrid_wrapper').after('<h4>暂无数据</h4>'); 
       /* $('.from-search').addClass('hidden')*/
    }
});

/*分页*/
$(function () {
    //创建删除和编辑按钮
    var dataConfig = $('.my-jqgid-title').data('config');
    var dele = "display:none";
    var edit = "display:none";
    if (dataConfig.showDelete) {
        dele = "display:block"
    }
    if (dataConfig.showEdit) {
        edit = "display:blcok;";
    }
    if (dataConfig.showDelete && dataConfig.showEdit) {
        edit += "margin-left:40px;";
    }
    $('.ui-jqgrid-caption').append('<a style="' + dele + '" class="my-postioer"><img  data-toggle="popover" data-placement="right"   data-content="' + dataConfig.deleteTtext + '" data-trigger="hover" class="my-new-detele my-new-icon" src="../lib/img/de.png"></a><a style="' + edit + '" class="my-postioer"><img  data-toggle="popover" data-placement="right"   data-content="' + dataConfig.editText + '" data-trigger="hover" class="my-new-edit my-new-icon" src="../lib/img/ed.png"></a>');
    $('.my-new-detele,.my-new-edit').popover({
        html: true
    });

    (function (pageUrl) {
        $('#first_pager_list_2').prop('id', 'firstPageReset');
        $('#prev_pager_list_2').prop('id', 'prevPageReset');
        $('#next_pager_list_2').prop('id', 'nextPageReset');
        $('#last_pager_list_2').prop('id', 'lastPageReset');
        $('#input_pager_list_2').prop('id', 'inputPageReset');
        var pageLocal = location.href.split('?');
        var pageUrl = pageLocal[0] + '?';
        if (pageLocal[1]) { //如果存在参数
            var urlParam = getUrlParam(); //获取参数对象
            if (urlParam.index) { //如果分页数据存在
                delete urlParam.index;
            }
        }
        if (urlParam && !(JSON.stringify(urlParam) == '{}')) {
            pageUrl = pageLocal[0] + '?' + $.param(urlParam) + '&';
        }
        //    一页多收条
        var pagesize = $('.pagesize').val();
        //    数据总条数
        var rowscount = $('.rowscount').val();
        //    当前第几页
        var index = $('.pageindex').val();
        //获得当前页多少条数据
        var pagenumber = $('.pagenumber').val();
        //获得查询条件
        var searchCondition = $('.search-condition').val();
        // 设置当前第几页
        $('#inputPageReset input').val(index);
        //设置一共多少几页
        $('#sp_1_pager_list_2').text(Math.ceil(rowscount / pagesize));
        //设置一共多少条信息

        $('#pager_list_2_right div').text((index - 1) * pagesize + 1 + " - " + (20 * (index - 1) + Number(pagenumber)) + "　共 " + rowscount + " 条");
        //请求第一页
        $('#firstPageReset').click(function () {
            location.href = pageUrl + "index=" + 1;
        });
        //请求 尾页
        $('#lastPageReset').hide().click(function () {
            location.href = pageUrl + "index=" + Math.ceil(rowscount / pagesize);
        });
        //请求上一页
        $('#prevPageReset').click(function () {
            var pageNumber = $('#inputPageReset input').val();
            if (pageNumber <= 1 || isNaN(pageNumber)) {
                return false;
            } else {
                location.href = pageUrl + "index=" + (Number(pageNumber) - 1);
            }
        });
        //请求下一页
        $('#nextPageReset').click(function () {
            var pageNumber = $('#inputPageReset input').val();
            if (pageNumber < Math.ceil(rowscount / pagesize)) {
                location.href = pageUrl + "index=" + (Number(pageNumber) + 1);
            }
        });
        // 分页输入框回车跳转
        $('#inputPageReset input').keyup(function (event) {
            var pageNumber = $('#inputPageReset input').val();
            if (event.keyCode == 13) {
                if (pageNumber > Math.ceil(rowscount / pagesize) || pageNumber < 1) {
                    alert('页数不存在');
                } else if (isNaN(pageNumber)) {
                    return false;
                } else {
                    location.href = pageUrl + "index=" + Math.round(pageNumber);
                }
            }
        });

        // 全局搜索回车事件
        $('.enter').keyup(function (event) {
            if (event.keyCode == 13) {
                var userName = $(".enter").val();
                location.href = pageUrl + '?logidOrName=' + userName + '&index=1';
            }
        });

        //搜索

        $('.search').click(function () {
            var reg=/[~]{1,10}/g;
        	var from =$(this).parents('form').serialize(); //表单参数
            var hasSpace=reg.test(from);
            if(hasSpace){
                from =from.replace('+','').replace('+','');
            }
            location.href = pageLocal[0] + '?' + from + '&index=1';
        })
        //搜索禁止回车 
        $('.search').parents('form').find('input').keydown(function (event) {
            if (event.keyCode == 13) {
                location.href = pageLocal[0] + '?' + from + '&index=1';
            }
        })


        /*    更改分页插件的样式 */
        $('#lastPageReset').show().css('height', '30px');
        $('#firstPageReset,#prevPageReset,#nextPageReset,#lastPageReset').removeClass('ui-disabled')
    })();

});

