$(function () {
	 alert(123)
     //立即请求该方法，获取去页面展示信息
    $('.user-list-form').click();
    //            编辑时没选数据提示
    $('.demo1').click(function () {
        swal({
            title: "请选择要编辑的行",
            text: "一次只能编辑一行",
            type: "warning"
        });
    });

    //           编辑成功提示
    $('.demo2').click(function () {
        swal({
            title: "编辑成功",
            text: "",
            type: "success"
        });
    });
    //            删除时没选数据提示
    $('.demo3').click(function () {
        swal({
            title: "请选择要删除的行",
            text: "至少选择一行，可以一次删除多行",
            type: "warning"
        });
    });
    //           删除成功提示
    $('.demo4').click(function () {
        swal({
                title: "您确定要删除这条信息吗",
                text: "删除后将无法恢复，请谨慎操作！",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "狠心删除！",
                cancelButtonText: "我要取消",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function (isConfirm) {
                if (isConfirm) {
                    //调用jqgid的方法对数据删除
                    var deleteID = $('#table_list_2').jqGrid('getGridParam', 'selarrrow');
                   
                    //向后台提交删除的数据id
                    $.ajax({
                        type: "post",
                        url: $('.my-base').text()+'user/deleteUser',
                        data: {userid:deleteID.toString()},
                        success: function (data) {
                            alert("删除成功");
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert("失败");
                        }
                    });
                    $.each(deleteID, function (index, value) {
                        $("#table_list_2").jqGrid("delRowData", deleteID[0]);
                    });
                    swal("删除成功！", "您已经永久删除了这条信息。", "success");


                } else {
                    swal("已取消", "您取消了删除操作！", "error");
                };
                setTimeout(function () {
                    $('.confirm').click();
                }, 2500);

            });
    });
    // 获取表格数据
    var myTest = $('.my-test tr');
    console.log(myTest)
    var myarr = []
    for (var i = 0; i < myTest.length; i++) {
        myarr[i] = {
           
            id: $($(myTest[i]).children()[0]).text(),
            invdate: $($(myTest[i]).children()[1]).text(),
            name: $($(myTest[i]).children()[2]).text(),
            note: $($(myTest[i]).children()[3]).text(),
            tax: $($(myTest[i]).children()[4]).text(),
            total: $($(myTest[i]).children()[5]).text()
        }
    };

    console.log(myarr);

    //jqGrid表格初始化
    $.jgrid.defaults.styleUI = 'Bootstrap';
    // Configuration for jqGrid Example 2
    $("#table_list_2").jqGrid({
        data: myarr,
        datatype: "local",
        height: 450,
        autowidth: true,
        shrinkToFit: true,
        rowNum: 20,

        multiselect: true,
        multiselect: true,
        scroll: false,
        toolbar: [true, 'both'],
        pgbuttons: true,
        viewrecords: true,
        onSelectRow: function (id) {

        },
        //        分页输入框回车事件
        onPaging: function (pgButton) {
                  var pageValue=$('#input_pager_list_2 input').val();
                  //分页输入框数字验证
                  var number = /^[1-9]*[1-9][0-9]*$/;
                  //分页请求的接口方法
                  var pageUrl=$('.my-base').text() + 'user/page'
                  if(number.test(pageValue)){
                	  $.post(pageUrl, {
                          index: pageValue
                      }, function (result) {
                          console.log(result)
                      });    
                  }else{	  
                	  alert('请输入整数')
                  }
        },

        editurl: "JqGridHandler.ashx?sign=singleEdit", //这个文件需要有，但里面无需写任何处理代码  
        //                rowList: [10],
        colNames: ['编号', '日期', '客户', '金额', '运费', '总额'],
        colModel: [{
            name: 'id',
            index: 'id',
            editable: true,
            width: 60,
            sorttype: "int",
            search: true
                }, {
            name: 'invdate',
            index: 'invdate',
            editable: true,
            width: 90,
            sorttype: "date",
            formatter: "date"
                }, {
            name: 'name',
            index: 'name',
            editable: true,
            width: 100
                }, {
            name: 'note',
            index: 'note',
            editable: true,
            width: 80,
            align: "right",
            sorttype: "float",
            formatter: "number"
                }, {
            name: 'tax',
            index: 'tax',
            editable: true,
            width: 80,
            align: "right",
            sorttype: "float"
                }, {
            name: 'total',
            index: 'total',
            editable: true,
            width: 80,
            align: "right",
            sorttype: "float"
                }],
        pager: "#pager_list_2",
        viewrecords: true,
        caption: "管理员列表",
        add: false,
        del: true,
        edit: true,
        edittype: 'text',
        //                addtext: 'Add',
        edittext: 'Edit',
        hidegrid: false
    });

 
     //创建删除和编辑按钮
    $('.ui-jqgrid-caption').append('<a class="my-postioer"><img  data-toggle="popover" data-placement="right"   data-content="删除" data-trigger="hover" class="my-new-detele my-new-icon" src="../lib/img/de.png"></a><a class="my-postioer"><img  data-toggle="popover" data-placement="right"   data-content="编辑" data-trigger="hover" class="my-new-edit my-new-icon" src="../lib/img/ed.png"></a>');
    $('.my-new-detele,.my-new-edit').popover({
        html: true
    });


    //删除数据行
    $(document).on('click', '.my-new-detele', function () {
        //判断是否有要删除的选中数据
        var deleteID = $('#table_list_2').jqGrid('getGridParam', 'selarrrow');
        if (deleteID.length == 0) {
            $('.demo3').click()
        } else {
            $('.demo4').click()
        };
    });

    //编辑数据行
    $(document).on('click', '.my-new-edit', function () {
        //                判断是否选中了一行
        var checked = $('#table_list_2').jqGrid('getGridParam', 'selarrrow');
        var checkedId;
        if (checked.length != 1) {
            $('.demo1').click()
        } else {
            checkedId = $('#table_list_2').jqGrid('getGridParam', 'selrow');
            var editValue = $('.form-horizontal input');
            var editForm=$('form .form-group') 
            //编辑框样式初始化
           
            for(var c=0;c<editForm.length;c++){
            	editForm.eq(c).removeClass('has-error').removeClass('has-success');
            	editForm.eq(c).find('span').remove();
            }
           //编辑框数据初始化
           /* $(".userstate").find('"option[text='+$('')+']"').attr("selected",true);*/
            for (var k = 0; k < 6; k++) {
                editValue.eq(k).val($('#table_list_2 tr').eq(checkedId).children().eq(k + 1).text());
            };
            //模态框初始化
            $('.my-mode').click();
        }
    });
    //编辑时的模态框
    $(function () {
        $('#myModal').modal('hide')
    });
    $(window).bind('resize', function () {
        var width = $('.jqGrid_wrapper').width();
        $('#table_list_1').setGridWidth(width);
        $('#table_list_2').setGridWidth(width);
    });
  //分页数据
    //    一页多收条
    var pagesize = $('.pagesize').val();
    //    数据总条数
    var rowscount = $('.rowscount').val();
    //    当前第几页
    var index = $('.index').val();
    //    分页请求的接口方法
    var pageUrl=$('.my-base').text() + 'user/page';
    // 设置当前第几页
    $('#input_pager_list_2 input').val(577);
    alert($('#input_pager_list_2 input'))
    //设置一共多少几页
    $('#sp_1_pager_list_2').text(Math.ceil(rowscount / pagesize));
    //设置一共多少条信息
    $('#pager_list_2_right div').text(pagesize + " - " + pagesize  + "　共 " + rowscount + " 条");
    //请求第一页
    $('#first_pager_list_2').click(function () {
        var pageNumber = $('#input_pager_list_2 input').val();
        if (pageNumber == 1) {
            return false;
        } else {
            $.post(pageUrl, {
                index: 1
            }, function (result) {
                console.log(result)
            });
        }
    });
    //请求 尾页
    $('#last_pager_list_2').hide().click(function () {
     

        $.post(pageUrl, {
            index: Math.ceil(rowscount / pagesize)
        }, function (result) {
            console.log(result)
        });
    });
    //请求上一页
    $('#prev_pager_list_2').click(function () {
        if (pageNumber == 1) {
            return false;
        } else {
            $.post(pageUrl, {
                pageNum: pageNumber - 1
            }, function (result) {
                console.log(result)
            });
        }
    });
    //请求下一页
    $('#next_pager_list_2').click(function () {
        $.post(pageUrl, {
            pageNum: pageNumber + 1
        }, function (result) {
            console.log(result)
        });
    });


    
  //编辑表单验证和提交
    var icon = "<i class='fa fa-times-circle'></i> ";
    $(".editlist").validate({
        submitHandler: function (form) {
            var loginId = $("input[name='loginId']").val();
            var userName = $("input[name='userName']").val();
            var password = $("input[name='password']").val();
            var userState = $(".userstate").val();
            var roleName = $(".role").find("option:selected").text();
            var roleId = $(".role").val();
            var idCard = $("input[name='roleNum']").val();
            var phoneNumber = $("input[name='roleNum']").val();
            var userId = $('#table_list_2').jqGrid('getGridParam', 'selrow');
            $.ajax({
                type: "post",
                url: $('.my-base').text() + 'user/updateUser',
                data: {
                    loginId: loginId,
                    userName: userName,
                    password: password,
                    userState: userState,
                    roleName: roleName,
                    roleId: roleId,
                    idCard: idCard,
                    phoneNumber: phoneNumber,
                    userId: userId
                },
                success: function (data) {
                    //                    提交时候隐藏模态框
                	$('#myModal .btn-default').click();
                    alert("成功");
                    //                    弹框提示编辑成功
                    setTimeout(function () {
                        $('.demo2').click();
                        setTimeout(function () {
                            $('.confirm').click();
                        }, 2000)
                    }, 0);
                  
                    //把摸态框的编辑后的值替换掉表格里的数据
                    var checkedId = $('#table_list_2').jqGrid('getGridParam', 'selrow');
                    var newEditVal = $('.form-horizontal input');
                    for (var i = 0; i < newEditVal.length; i++) {
                        $('#table_list_2 tr').eq(checkedId).children().eq(i + 1).text(newEditVal.eq(i).val())
                    };
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('失败')
                    $('#myModal .btn-default').click();
                   
                }
            });


        },
        onsubmit: true,
        rules: {
            loginId: "required",
            userName: "required",
            userState: "required",
            roleId: "required",
            password: {
                required: true,
                minlength: 6,
                maxlength: 10
            }
        },
        messages: {
            loginId: icon + "必填",
            userNum: icon + "必填",
            userState: icon + "必填",
            roleId: icon + "必填",
            password: {
                required: icon + "请输入您的密码",
                minlength: icon + "密码必须6个字符以上",
                maxlength: icon + "密码必不能大于10个字符以上"

            }
        }
    });

});
