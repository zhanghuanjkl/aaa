var icon = '<i class="icon iconfont icon-xxxxxx-" style="font-size:13px;"></i>';
var yuanTiao = {
    //添加
    add: function (data) {
        $("#admim-add").validate({
            submitHandler: function (form) {
                if (data.ajaxBefore) { //调用ajax前执行的方法是否存在
                    data.ajaxBefore(eval(yuanTiao.injection(data.ajaxBefore)));
                }
                var param = $('#admim-add').serialize(); //是否是上传文件类型;
                if (data.isFile) { //是否是上传文件类型
                    yuanTiao.isFileTip(true)
                    param = new FormData($('#admim-add')[0]);

                }
                var _data = data;
                var ajaxJson = { //ajax参数
                    type: "POST",
                    url: data.url,
                    data: param,
                    success: function (data) {
                        if (_data.ajaxAfter) { //ajax调用后的方法是否存在
                            _data.ajaxAfter(eval(yuanTiao.injection(_data.ajaxAfter)));
                        }
                        if (yuanTiao.callTsFileTip) { //如果是上传文件
                            setTimeout(function () {
                                swal({
                                    title: yuanTiao.getXhrTitle + "成功",
                                    text: "可在列表查看" + yuanTiao.getXhrTitle + "的信息",
                                    type: "success",
                                    timer: 1500
                                });
                            }, 2500)
                            yuanTiao.refreshToList()
                        } else {
                            swal({
                                title: "添加成功",
                                text: "可在列表查看添加的信息",
                                type: "success",
                                timer: 1500
                            });
                            yuanTiao.refreshToList()
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        location.href="../index/index.jsp";
                    }
                };
                if (_data.isFile) {
                    ajaxJson = $.extend(ajaxJson, {
                        contentType: false, //上传必须
                        processData: false, //上传必须
                        xhr: yuanTiao.getXhr(data.isFile),
                    })
                }
                if (data.newAjaxJson) { //可以改变ajax的参数设计
                    ajaxJson = $.extend(ajaxJson, data.newAjaxJson)
                }
                $.ajax(ajaxJson);
            },
            onsubmit: true,
            rules: data.valid
        });

    },
    //删除；
    delete: function (data) {
        //删除数据行
        $(document).on('click', '.my-new-detele', function () {
            //判断是否有要删除的选中数据
        	console.log("jinru");
        	console.log("终端状态"+data.columnValue);
            var deleteID = $('#table_list_2').jqGrid('getGridParam', 'selarrrow');
            var dataConfig = $('.my-jqgid-title').data('config');
            var deleteInfo = dataConfig.deleteTtext;
            var rowData = true; //是否有已经配置的资源
            if (data.canNotDelete) { //是否存在需要判断能否删除的列
                var canNotDeleteRol = data.canNotDelete.split(','); //不能删除的数组；
                var columnValue = data.columnValue.split(',') //不能删除的具体的值
                var canNotDeleteTitle = data.canNotDeleteTitle.split(',') //不能删除提示信息
                var canNotDeleteTitleIndex = 0; //不能删除的第n个列
                $.each(deleteID, function (index, val) {
                   
                    var deleteIDindex = val;
                    $.each(canNotDeleteRol, function (index, val) {
                        if ($('#table_list_2').jqGrid('getRowData', deleteIDindex)[canNotDeleteRol[index]] == columnValue[index]) {
                            rowData = false;
                            canNotDeleteTitleIndex = index;
                        }
                    })

                });
            }
            var deleteIDlength = deleteID.length;
            if (deleteID.length == 0) {
                swal({
                    title: "请选择要" + deleteInfo + "的行",
                    text: "至少选择一行，可以一次" + deleteInfo + "多行",
                    type: "warning",
                    timer: 3500
                });
            } else if (!rowData) {
                swal({
                    title: canNotDeleteTitle[canNotDeleteTitleIndex],
                    text: "请重新选择",
                    type: "warning",
                    timer: 3500
                });
            } else {
                swal({
                        title: "您确定要将这" + deleteIDlength + "条信息" + deleteInfo+"吗？",
                        text: "" + deleteInfo + "后将无法恢复，请谨慎操作！",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#ed5336",
                        confirmButtonText: deleteInfo,
                        cancelButtonColor: '#217fd0',
                        cancelButtonText: "取消",

                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            //向后台提交删除的数据id
                            var param = {
                                ids: deleteID.toString()
                            };
                            if (data.ajaxBefore) { //调用ajax前执行的方法是否存在
                                var flag = data.ajaxBefore(eval(yuanTiao.injection(data.ajaxBefore)));
                                //提交前的ajax验证，不通过返回false，阻止执行删除操作
                                if (("undefined" != typeof flag) && (!flag)) {
                                    return false;
                                }
                            }

                            var _data = data;
                            var ajaxJson = {
                                type: "post",
                                url: data.url,
                                data: param,
                                success: function (data) {
                                    if (_data.ajaxAfter) { //ajax调用后的方法是否存在
                                        _data.ajaxAfter(eval(yuanTiao.injection(_data.ajaxAfter)));
                                    }
                                    swal(deleteInfo + "成功！", "您已经永久" + deleteInfo + "了这" + deleteIDlength + "条信息", "success");
                                    setTimeout(function () {
                                        location.reload();
                                    }, 2000);
                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                	 location.href="../index/index.jsp";
                                }
                            };
                            if (data.newAjaxJson) { //可以改变ajax的参数设计
                                ajaxJson = $.extend(ajaxJson, data.newAjaxJson)
                            }
                            $.ajax(ajaxJson);
                        } else {
                            swal({
                                title: "已取消",
                                text: "您取消了" + deleteInfo + "操作！",
                                type: "error",
                                timer: 1000
                            });
                        };
                    });
            };
        });
    },
    //编辑
    edit: function (data) {
        //点击配置按钮，判断是否有选中的行
        var dataConfig = $('.my-jqgid-title').data('config');
        var editInfo = dataConfig.editText;
        $(document).on('click', '.my-new-edit', function () {
        	//console.log("终端状态"+data.columnValue);
            //判断是否选中了一行
            var checked = $('#table_list_2').jqGrid('getGridParam', 'selarrrow');
            var length = checked.length; //选择的行数
            var title = '请选择要' + editInfo + '的信息';
            var text = '一次只能' + editInfo + '一条信息';
            if (data.editS) { //可以选择多行
                text = '一次可以' + editInfo + '多条信息';
            } else if (length > 1) {
                title = '一次只能' + editInfo + '一条信息';
                text = '请重新选择';
            };
            if ((!length) || (!data.editS) && length > 1) {
                swal({
                    title: title,
                    text: text,
                    type: "warning",
                    timer: 4000
                });
            } else {

                if (data.clcikBefore) { //调用ajax前执行的方法是否存在
                    var canEdit= data.clcikBefore();
                    if(canEdit==false){
                        return false;
                    }

                }
               
                    //模态框初始化
                    $('#myModal').modal('show');
                    $('#myModal form input').each(function () {
                        clearValidateStyle($(this))
                    })
                    //获取选中行的数据，并回显至编辑的表单里
                    var showInput = $('[data-display]');

                    if (showInput.length > 0) {
                        var rowData = $("#table_list_2").jqGrid('getRowData', checked);
                        console.log(rowData)

                        $.each(showInput, function (index, val) {
                            var objInput = $(val);
                            if (objInput[0].nodeName == 'INPUT') {
                                objInput.val(rowData[objInput.data('display')]);
                                objInput.data('oldVlaue',rowData[objInput.data('display')]);
                            } else {
                                objInput.val(rowData[objInput.data('display')]);
                                objInput.data('oldVlaue',rowData[objInput.data('display')]);
                            }
                        })
                    };


                
            }
        })

        //编辑表单验证和提交
      
        $(".editlist").validate({
            submitHandler: function (form) {

                var userId = $('#table_list_2').jqGrid('getGridParam', 'selarrrow');
                $('input[name="resourceIds"]').val(userId.toString());
                //给省市县名称赋值

                $('.area-name').each(function () {
                    var select = $(this);
                    var selectText = $('select[name="' + select.data('id') + '"] option:selected');
                    if (selectText.val()) {
                        select.val(selectText.text())
                    }
                });
                if (data.ajaxBefore) { //调用ajax前执行的方法是否存在
                    data.ajaxBefore(eval(yuanTiao.injection(data.ajaxBefore)));
                }
                var param = $('.editlist').serialize();
                if (data.isFile) { //是否是上传文件类型
                    yuanTiao.isFileTip(true)
                    param = new FormData($('.editlist')[0]);
                }
                var _data = data;
                var ajaxJson = {
                    type: "POST",
                    url: data.url,
                    data: $('.editlist').serialize(),
                    success: function (data) {
                        //提交时候隐藏模态框
                        if (_data.ajaxAfter) { //ajax调用后的方法是否存在
                            _data.ajaxAfter(eval(yuanTiao.injection(data.ajaxAfter)));
                        }
                        $('#myModal .btn-default').click();
                        // 弹框提示编辑成功
                        if (yuanTiao.callTsFileTip) { //如果是上传文件
                            setTimeout(function () {
                                swal({
                                    title: yuanTiao.getXhrTitle + "成功",
                                    text: "可在列表查看" + yuanTiao.getXhrTitle + "的信息",
                                    type: "success",
                                    timer: 2000
                                });
                                setTimeout(function () {
                                    location.reload();
                                }, 2000)
                            }, 2500)
                        } else {
                            swal({
                                title: editInfo + "成功",
                                text: "",
                                type: "success",
                                timer: 2000
                            });
                            setTimeout(function () {
                                location.reload();
                            }, 2000)
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                    	location.href="../index/index.jsp";
                        $('#myModal .btn-default').click();
                    }
                };
                if (_data.isFile) {
                    ajaxJson = $.extend(ajaxJson, {
                        contentType: false, //上传必须
                        processData: false, //上传必须
                        xhr: yuanTiao.getXhr(data.isFile),
                    })
                }
                if (data.newAjaxJson) { //可以改变ajax的参数设计
                    ajaxJson = $.extend(ajaxJson, data.newAjaxJson)
                }
                $.ajax(ajaxJson);

            },
            onsubmit: true,
            rules: data.valid
        });
    },
    //根据参数自动执行ajaxBefore，和ajaxAfeer函数,实现依赖注入
    injection: function (ajaxTime) {
        var param = ajaxTime.toString().match(/\s*function[\w\s]*\(([\w\s,]*)\)/)[1].split(",");
        if (param.length > 0) {
            return param[0];
        };
    },
    //是否调用了上传提示，默认没有
    callTsFileTip: false,
    //正在上传的提示，isFile是否是上传，默认true
    isFileTip: function (isFile) {
        var isHtml = true;
        var upload = '<div class="progress progress-striped active">' +
            '<div id="upload" style="width: 0%;background-color:#4c9e4e;" aria-valuemax="100"' + 'aria-valuemin="0" aria-valuenow="75" role="progressbar"' + 'class="progress-bar progress-bar-danger">' +

            ' </div>' +
            '</div>';

        var text = "<span id='upload-info'><span>";
        if (!isFile) {
            isHtml = false;
            upload = ""
            text = '正在处理中，请稍后！';
        }
        swal({
            html: isHtml,
            title: upload,
            text: text,
            imageUrl: '../lib/img/up.png',
            imageSize: '150x150',
            showConfirmButton: false
        });
        this.callTsFileTip = true

    },
    getXhrTitle: '上传', //上传提示文字，默认为上传
    //得到封装$.ajax前的xhr对象，获取上传进度
    getXhr: function (isFile) {
        if (isFile) {
            return function () {
                //这是关键  获取原生的xhr对象  做以前做的所有事情  
                var xhr = jQuery.ajaxSettings.xhr();
                xhr.upload.onprogress = function (ev) {
                    if (ev.lengthComputable) {
                        var percent = Math.floor(100 * ev.loaded / ev.total);
                        console.log(percent)
                        $('#upload').width(percent + '%');
                        var text = '已' + yuanTiao.getXhrTitle + percent + '%';
                        if (percent === 100) {
                            text = '已' + yuanTiao.getXhrTitle + percent + '%' + '，正在保存，请稍后！';
                        }
                        $('#upload-info').text(text);
                    }
                }
                return xhr; //此处必须返回xhr
            }
        } else {
            return null
        }

    },
    //添加成功后刷新
    refreshToList: function () {
        var refresh = $(window.parent.document).find(".page-tabs-content a");
        var listName = ''
        $.each(refresh, function (index, val) {
            if ($(val).hasClass('active')) {
                listName = $(this).attr('data-info-s');
            }
        }) //获取添加的类名
        setTimeout(function () {
            var listClass = listName.split('-')[0] + '-list';
            var ad = $(window.parent.document).find('.' + listName);
            ad.parent().parent().find('.' + listClass)[0].click(); //开打列表页面
            location.href = location.href;
        }, 2500); //刷新当前页，并且打开对应的列表*/

    }
};


/*调用添加示例
       yuanTiao.add({
                    //添加的url
                    url: '${pageContext.request.contextPath}/resource/upload',
                    
                    //添加时表单验证
                    valid: {
                        contentType: "specialChart",
                        size: "positive",
                        file: {
                            format: true,
                            required: true
                        },
                        resourcePath: {
                            notIsChart: true,
                            required: true,
                        }
                    },
                    
                    //是否上传文件的form表单
                    isFile:true,
                    
                    //改变ajax的执行参数设置
                    newAjaxJson:{
                            contentType: false,
                            * 必须false才会避开jQuery对 formdata 的默认处理
                            * XMLHttpRequest会对 formdata 进行正确的处理
                            processData: false
                    },
                    
                    //ajax执行前调用的方法,可以传入一个参数
                    ajaxBefore:function (){

                    },
                    
                    //ajax请求成功后调用的方法，可以传入一个参数
                    ajaxAfter:function(){
                        alert(1)
                    } 
                    
                })
                
   */
/*调用编辑示例
 yuanTiao.edit({
                 //编辑的url
                 url:'${pageContext.request.contextPath}' + "/term/config",
                 
                 //是否可以一次操作多行，默认不可以
                 editS:false,
                 
                 /保存编辑时，验证表单
                 valid:{
                     provinceId: 'province'
                 }
                 
                 //是否上传文件的form表单
                 isFile:true,
                    
                 //改变ajax的执行参数设置
                 newAjaxJson:{
                            contentType: false,
                            * 必须false才会避开jQuery对 formdata 的默认处理
                            * XMLHttpRequest会对 formdata 进行正确的处理
                            processData: false
                 },
                    
                 //ajax执行前调用的方法,可以传入一个参数
                 ajaxBefore:function (){

                 },
                    
                 //ajax请求成功后调用的方法，可以传入一个参数
                 ajaxAfter:function(){
                        alert(1)
                 } 
            });


*/
/*调用删除示例
 yuanTiao.delete({
                  //添加的url
                  url: '${pageContext.request.contextPath}/resource/upload',
                  
                  //是否存在不可以删除的列，如果存在则值为列名，默认不存在，可以是多个值（用逗号隔开）
                  canNotDelete:'终端编号,状态',
                  
                  //如果存在不可以删除的列，值为该列的值，默认为空
                  columnValue:'132,启用',
                  
                  //如果存在不可以删除的列，不可删除的提示信息,默认为空
                  canNotDeleteTitle:'不能删除已经配置了的,不能删除启用的用户'
                  
                 //改变ajax的执行参数设置
                  newAjaxJson:{
                          contentType: false,
                          * 必须false才会避开jQuery对 formdata 的默认处理
                          * XMLHttpRequest会对 formdata 进行正确的处理
                          processData: false
                  },
                  
                  //ajax执行前调用的方法,可以传入一个参数
                  ajaxBefore:function (){

                  },
                  
                  //ajax请求成功后调用的方法，可以传入一个参数
                  ajaxAfter:function(){
                      alert(1)
                  } 
                  
              })

*/
//validate警示样式清除
function clearValidateStyle(obj) {
    if (obj.parent().parent().hasClass('has-error')) {
        obj.parent().parent().removeClass('has-error');
        obj.parent().parent().removeClass('has-success');
        obj.siblings('span').remove()
    }
}
