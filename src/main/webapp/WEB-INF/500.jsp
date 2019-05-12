<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>500</title>

    <style>
        body {
            font-family: 'Nova Flat', cursive;
            background-color: #5992dd;
            color: #fff;
        }

        .pad-top {
            padding-top: 60px;
        }

        .text-center {
            text-align: center;
        }

        #error-link {
            font-size: 150px;
        }

        .btn-success {
            color: #fff;
            background-color: #5cb85c;
            border-color: #4cae4c;
        }

        .btn-success:hover {
            color: #fff;
            background-color: #43ac43;
            border-color: #3f953f;
        }

        .btn {
            display: inline-block;
            padding: 6px 12px;
            margin-bottom: 0;
            font-size: 14px;
            font-weight: normal;
            line-height: 1.42857143;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            background-image: none;
            border: 1px solid transparent;
            border-radius: 4px;
        }

        a {
            color: #428bca;
            text-decoration: none;
            background: transparent;
        }

        .text-center {
            text-align: center;
            width: 100%;
        }

        .container {
            width: 100%;
            height: auto;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            padding-top: 5%;
        }

        span,
        #go {
            display: block;
            margin-left: auto;
            margin-right: auto;
            width: 100%;
        }

    </style>
</head>

<body>
    <div class="container">
        <div class="row pad-top text-center">
            <div class="col-md-6 col-md-offset-3 text-center">
                <h1> 服务器异常,请联系管理员!! </h1>
                <h3 id="go"> 5秒后返回首页</h3>
                <span id="error-link">500</span>
            </div>
        </div>
        <br/>
    </div>
    <input type="hidden" value="<%=basePath%>">
</body>
<script>
    var go = document.getElementById('go');
    var gogo = document.getElementById('gogo');
    var time = 6;
    var href = $('input').eq(0).val();
    setInterval(function() {
        time--;
        go.innerHTML = time + '秒后返回首页';
        if (time == -1) {
            location.href = '../home/home.jsp';
        };
    }, 1000);
    gogo.onclick = function() {
        location.href = '../home/home.jsp';
    }

</script>

</html>
