

$(function () {
    $('.btn-success').click(
        function () {
//            $.ajax({
//                type: 'post',
//                url: '/login/home',
//                data: $('#admim-add').serialize(),
//                async: false,
//                dataType: 'json',
//                success: function (data) {
//                    alert('登录成功');
//                },
//                error: function (XMLHttpRequest, textStatus, errorThrown) {
//                    $('p').show();
                    setTimeout(function () {
                        window.location.href = '/login/home';
                    }, 2000)

//                }
            });

        });
  
