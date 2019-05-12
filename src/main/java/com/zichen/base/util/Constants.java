package com.zichen.base.util;

public class Constants {

	public static final String SERVICE_RESULT_CODE_SYSERROR = "syserror";

	public static final String RETURN_STATUS_SUCCESS="00";           // 操作成功
	public static final String RETURN_STATUS_DATAERROR="100";        // 数据服务故障，请联系管理员
	public static final String RETURN_STATUS_PARAMERROR="101";       // 参数有误，请重新操作
	public static final String RETURN_STATUS_EMPTYLOGINNO="102";     // 登陆账号不存在，请重新操作
	public static final String RETURN_STATUS_PASSWORDERROR="103";    // 登陆密码不正确，请重新操作
	public static final String RETURN_STATUS_EMPTYFEEMODEL="104";    // 暂未配置计费模板，请联系管理员
	public static final String RETURN_STATUS_LEAVEWORKSPACE = "105"; // 已离开工作地点，请往工作地点移动，谢谢
	public static final String RETURN_STATUS_ERRORFORMAT = "106";    // 参数格式错误，请重新上传
	public static final String RETURN_STATUS_HISTORYERROR = "107";   // 该车有异常历史记录
	public static final String RETURN_STATUS_EMPTYHISTORY = "108";   // 该车暂无停车记录
	public static final String RETURN_STATUS_DATASYNFAIL = "109";    // 数据同步失败，暂不允许退出
	public static final String RETURN_STATUS_PARKISNOTEXISTS = "110";    // 该停车场不存在，请重新输入
	public static final String RETURN_STATUS_NONEOFALL = "111";          // 该终端或登录人与停车场不匹配
	
	public static final String HYPHEN="-";
	public static final String BLANK=" ";
	public static final String MARK_COMMA=",";
	public static final String MARK_BYTE="B";
	
}
