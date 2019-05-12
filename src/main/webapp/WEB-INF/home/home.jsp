<%@page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="renderer" content="webkit">
    <!--如果访问的页面中有 CSS3 代码，双核浏览器会自动切换到 Webkit 内核，content的取值为webkit，ie-comp，ie-stand之一，区分大小写，分别代表用极速模式，兼容模式，IE模式打开。  -->
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <title>基础框架系统</title>

    <meta name="keywords" content="基础框架系统">
    <meta name="description" content="西安远眺网络科技有限公司">

    <!--[if lt IE 8]>
    <meta http-equiv="refresh" content="0;ie.html" />
    <![endif]-->
    <!--页面定期刷新，如果加url的，则会重新定向到指定的网页，content后面跟的是时间（单位秒），把这句话加到指定网页的<head></head>里
一般也用在实时性很强的应用中，需要定期刷新的  -->
	<!-- 仅IE可识别 -->
    <link rel="shortcut icon" href="favicon.ico">
    <link href="../lib/home/css/bootstrap.min.css?v=3.3.5" rel="stylesheet">
    <link href="../lib/home/css/font-awesome.min.css?v=4.4.0" rel="stylesheet">
    <link href="../lib/home/css/animate.min.css" rel="stylesheet">
    <link href="../lib/home/css/style.min.css?v=4.0.0" rel="stylesheet">
    <link href="../lib/home/css/home.css" rel="stylesheet">
</head>
    

<body  class="fixed-sidebar full-height-layout gray-bg" style="overflow:hidden">
   <!--  判断父窗口是否存在，如果存在,父窗口跳转 -->
    <input class="index-href" type="hidden">
    <div id="wrapper">   
        <!--左侧导航开始-->
        <nav class="navbar-default navbar-static-side" role="navigation">
            <div class="nav-close"><i class="fa fa-times-circle"></i>
            </div>
            <div class="sidebar-collapse">
                <ul class="nav" id="side-menu">
                    <li class="nav-header">
                        <div class="dropdown profile-element">
                            <span><img alt="image" class="img-circle" src="../lib/home/img/head2.jpg" /></span>
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                <span class="clear">
                               <span class="block m-t-xs"><strong class="font-bold">${SESSION_USER.userName}</strong></span>
                                <span class="text-muted text-xs block">${SESSION_USER.roleName}<b class="caret"></b></span>
                                </span>
                            </a>
                            <ul class="my-dropdown-menu dropdown-menu animated fadeInRight m-t-xs">
                               <!--  <li><a class="J_menuItem" href="form_avatar.html">修改头像</a>
                                </li>
                                <li><a class="J_menuItem" href="profile.html">个人资料</a>
                                </li>
                                <li><a class="J_menuItem" href="contacts.html">联系我们</a>
                                </li>
                                <li><a class="J_menuItem" href="mailbox.html">信箱</a>
                                </li>
                                <li class="divider"></li> -->
                                
                                <li><a href="<%=basePath %>login/logout">安全退出</a>
                                </li>
                            </ul>
                        </div>
                        <div class="logo-element">你好！
                        </div>
                    </li>

                    <!--遍历菜单-开始-->
                    
                   <!--items 	进行循环的项目  -->
                    <!--var 	代表当前项目的变量名  -->
                    <c:forEach items="${menuList}" var="memu">
                          <li>
                            <a href="#">
                                <i class="fa fa-gears ${memu.icon}"></i>
                                <span class="nav-label">${memu.name}</span>  
                                 <span class="fa arrow"></span>
                            </a>
                            <ul class="nav nav-second-level">
                                <c:forEach items="${memu.secMenuList}" var="memulist">
                                    <li>
                                        <a class="J_menuItem ${memulist.className} refresh-list" data-info="${memulist.className}"  href="..${memulist.url}">${memulist.name}</a>
                                    </li>
                                 </c:forEach>  
                            </ul>
                          </li>
                     </c:forEach>
                    <!--遍历菜单-结束-->   
                </ul>
            </div>
        </nav>
        <!--左侧导航结束-->
        <!--右侧部分开始-->
        <div id="page-wrapper" class="gray-bg dashbard-1">
            <div class="row border-bottom">
                <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
                    <div class="navbar-header"><a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
                        <form role="search" class="navbar-form-custom index-title-form" method="post" action="search_results.html" style="width:250px">
                            <div class="form-group">
                                <h2 class="big-title" >基础框架系统</h2>
                            </div>
                        </form>
                    </div>
                    <ul class="nav navbar-top-links navbar-right">
                        <li class="dropdown">

                        </li>
   
                        <li class="dropdown hidden-xs">
                            <a class="right-sidebar-toggle" aria-expanded="false" style="color:white">
                                <i class="fa fa-tasks"></i> 主题
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="row content-tabs">
                <button class="roll-nav roll-left J_tabLeft"><i class="fa fa-backward"></i>
                </button>
                <nav class="page-tabs J_menuTabs">
                    <div class="page-tabs-content">
                        <a href="javascript:;" class="active J_menuTab" data-id="index_v1.html">首页</a>
                    </div>
                </nav>
                <button class="roll-nav roll-right J_tabRight"><i class="fa fa-forward"></i>
                </button>
                <div class="btn-group roll-nav roll-right">
                    <button class="dropdown J_tabClose" data-toggle="dropdown">关闭操作<span class="caret"></span>

                    </button>
                    <ul role="menu" class="dropdown-menu dropdown-menu-right">
                        <li class="J_tabShowActive"><a>定位当前选项卡</a>
                        </li>
                        <li class="divider"></li>
                        <li class="J_tabCloseAll"><a>关闭全部选项卡</a>
                        </li>
                        <li class="J_tabCloseOther"><a>关闭其他选项卡</a>
                        </li>
                    </ul>
                </div>
                <a href="<%=basePath %>login/logout" class="roll-nav roll-right J_tabExit"><i class="fa fa fa-sign-out"></i> 退出</a>
            </div>
            <div class="row J_mainContent" id="content-main">
              <iframe class="J_iframe" name="iframe0" width="100%" height="100%" src="../charts/charts.html" frameborder="0" data-id="index_v1.html" seamless></iframe>
          
     
            </div>
            <div class="footer">
                <div class="pull-right">&copy;<a href="http://www.yuantiaokj.com/xaytkj/prep.action" target="_blank">西安远眺网络科技有限公司</a>
                </div>
            </div>
        </div>
        <!--右侧部分结束-->
        <!--右侧边栏开始-->
        <div id="right-sidebar">
            <div class="sidebar-container">

                <ul class="nav nav-tabs navs-3">

                    <li class="active">
                        <a data-toggle="tab" href="#tab-1">
                            <i class="fa fa-gear"></i> 主题
                        </a>
                    </li>
                    <!-- <li class=""><a data-toggle="tab" href="#tab-2">
                        通知
                    </a>
                    </li>
                    <li><a data-toggle="tab" href="#tab-3">
                        项目进度
                    </a>
                    </li> -->
                </ul>

                <div class="tab-content">
                    <div id="tab-1" class="tab-pane active">
                        <div class="sidebar-title">
                            <h3> <i class="fa fa-comments-o"></i> 主题设置</h3>
                            <small><i class="fa fa-tim"></i> 你可以从这里选择和预览主题的布局和样式。</small>
                        </div>
                        <div class="skin-setttings">
                            <div class="title">主题设置</div>
                            <div class="setings-item">
                                <span>收起左侧菜单</span>
                                <div class="switch">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="collapsemenu" class="onoffswitch-checkbox" id="collapsemenu">
                                        <label class="onoffswitch-label" for="collapsemenu">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                          <!--  <div class="setings-item">
                                <span>固定顶部</span>

                                <div class="switch">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="fixednavbar" class="onoffswitch-checkbox" id="fixednavbar">
                                        <label class="onoffswitch-label" for="fixednavbar">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>-->
                            <div class="setings-item">
                                <span>
                        固定宽度
                    </span>

                                <div class="switch">
                                    <div class="onoffswitch">
                                        <input type="checkbox" name="boxedlayout" class="onoffswitch-checkbox" id="boxedlayout">
                                        <label class="onoffswitch-label" for="boxedlayout">
                                            <span class="onoffswitch-inner"></span>
                                            <span class="onoffswitch-switch"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="title">皮肤选择</div>
                            <div class="setings-item default-skin nb">
                                <span class="skin-name ">
                         <a href="#" class="s-skin-0">
                             默认皮肤
                         </a>
                    </span>
                            </div>
                            <div class="setings-item blue-skin nb">
                                <span class="skin-name ">
                        <a href="#" class="s-skin-1">
                            蓝色主题
                        </a>
                    </span>
                            </div>
                            <div class="setings-item yellow-skin nb">
                                <span class="skin-name ">
                        <a href="#" class="s-skin-3">
                            黄色/紫色主题
                        </a>
                    </span>
                            </div>
                        </div>
                    </div>
               
               
                </div>

            </div>
        </div>
     
        
        <div id="small-chat">
           <span class="badge badge-warning pull-right">5</span>
           <a class="open-small-chat">
               <i class="fa fa-comments"></i>
           </a>
        </div>
    </div>
    <script src="../lib/home/js/jquery.min.js?v=2.1.4"></script>
    <script src="../lib/home/js/bootstrap.min.js?v=3.3.5"></script>
    <script src="../lib/home/js/plugins/metisMenu/jquery.metisMenu.js"></script> 
    <!--  bootstrap实现手风琴样式-->
    <script src="../lib/home/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
    <!--页面左侧导航栏的上下滚动条以及iframe的链接 -->
    <script src="../lib/home/js/plugins/layer/layer.min.js"></script>
    <!--弹出层插件：无左侧滚动条无iframe链接无手风琴效果  -->
    <script src="../lib/home/js/hplus.min.js?v=4.0.0"></script> 
    <!-- 无手风琴动画效果无滚动条 -->
    <script src="../lib/home/js/contabs.min.js"></script>
    <!--无iframe链接  -->
    <!-- <script src="../lib/home/js/plugins/pace/pace.min.js"></script> -->
    <!-- 没啥作用 -->
    <script>
    /* 禁止后退 */
  	 history.pushState(null, null, document.URL);
     window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
    });
    
    /* 点击列表刷新 */
    $('.refresh-list').click(function(){
        var info=$(this).data('info');
        //console.log(info);       
        var infos=$('.page-tabs-content').find("a[data-info-s="+info+"] i");
    	if(infos.length==1){
    	 	infos.click();
    	}
    }); 
    </script>
    
</body>

</html>
