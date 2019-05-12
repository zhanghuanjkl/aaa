<%@page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!-- 中文编码问题 -->
    <%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

    <%  
 //String s2 = new String(request.getParameter("resultexists").getBytes("ISO-8859-1"),"gb2312"); 
 String s1 = (String)request.getParameter("resultexists");
 String s3 = (String)request.getParameter("resultlogin");
 String s4 = (String)request.getParameter("resultpass");
 String s5 = (String)request.getParameter("resultState");
 String s6 = (String)request.getParameter("dlzh");
%>

            <!DOCTYPE html>
            <html lang="en">

            <head>
                <script src="../lib/js/jquery.min.js"></script>
               	<script>
                    if (window.top!=window.self) {
                         parent.location.href = '../login/dologin';
                    }  
                </script>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
				
                <title>基础框架系统</title>
                <meta name="keywords" content="">
                <meta name="description" content="">
                <link href="../lib/home/css/bootstrap.min.css" rel="stylesheet">
                <link href="../lib/home/css/font-awesome.css?v=4.4.0" rel="stylesheet">
                <link href="../lib/home/css/animate.css" rel="stylesheet">
                <link href="../lib/home/css/style.css" rel="stylesheet">
                <link href="../lib/home/css/login.css" rel="stylesheet">

                <style>
                    .no-margins {
                        font-size: 22px;
                        color: black;
                        text-align: center;
                        padding-top: 20px;
                        padding-bottom: 30px;
                    }
                    
                    .signinpanel {
                        width: 27%;
                        min-width: 30px;
                    }
                    
                    .form-control,
                    .single-line {
                        height: 36px;
                    }
                    
                    .btn-success {
                        height: 36px;
                    }
                    
                    .signinpanel form {
                        border: 1px solid rgba(255, 255, 255, .3);
                    }
                    .index-logo{
                        display: inline-block;
                        width: 220px;
                        height: 60px;
                       
                      
                        position: absolute;
                        left: 0;
                        right: 0;
                        top:-70px;
                        region-break-after: 0;
                        margin: auto;
                    }
                   .signinpanel .form-control{
                     margin-top:7px; 
                   }
                  
                </style>

            </head>

            <body class="signin">
                <div class="base-path"></div>
                <div style="display:none" class="massage">

                </div>
                <div class="signinpanel">

                    <div class="row">
                        <div class="col-sm-12 create" style="margin-top:20px;">
                           <!-- <img class="index-logo" src="../lib/img/login-background.jpg">-->
                        </div>
                    </div>
                </div>

                <script>
                    $(function() {

                        var a = '<form onsubmit="reture submitFun();" action="' + '<%=basePath%>login/home' + '" method="post">' +
                            '<div  style="font-size:24px;color:#616f77;font-weight:bold;padding-left:0;padding-bottom:20px;text-align:center">停车收费智能管理系统</div>' +
                            '<div style="color:#676a6c;font-size:14px;" class="">登录账号</div>' +
                            '<input name="loginid" type="text" class="form-control uname" placeholder="请输入登录账号" />' +
                            '<div style="color:#676a6c;font-size:14px;margin-top:12px;" class="">密码</div>' +
                            '<input name="password" type="password" class="form-control pword m-b" placeholder="请输入密码" />' +
                            '<p style="color:red; display:none;" class="m-t-md verlidateP">用户名或密码错误</p>' +
                            '<button type="submit" class="btn btn-success btn-block" style="background-color:#02bcd5;border-color:#02bcd5;margin-top:35px">登录</button>' +
                            ' </form>';
                        $('.create').append(a);
                        /* 登录提示 */
                        var verification=[];
                        verification.push('<%=s1%>');
                        verification.push('<%=s3%>');
                        verification.push('<%=s4%>');
                        verification.push('<%=s5%>');
                        console.log(verification);
                        for (var i = 0; i < verification.length; i++) {
                            if (verification[i] != 'null') {
                                $('.verlidateP').show();
                                $('.verlidateP').text(verification[i])

                            }
                        }
                        /* 回显用户名 */
                        var loginVal = '<%=s6%>';
                        $('input[name="loginid"]').val(loginVal == 'null' ? "" : loginVal);
                        /* 获取焦点影藏提示 */
                        $('input').focus(function() {
                            $('.verlidateP').hide();
                        });

                        $('form').submit(function() {
                        	if ($('input[name="loginid"]').val() =='') {
                                $('.verlidateP').show();
                                $('.verlidateP').text('请输入登录账号');
                                return false;
                            };
                            if ($('input[name="password"]').val() =='') {
                                $('.verlidateP').show();
                                $('.verlidateP').text('请输入密码');
                                return false;
                            }
                            
                        })
                        

                    });

                </script>


<br>
<br>
<br>
<p align="center">西安远眺网络科技有限公司版权所有</p>

            </body>

            </html>
