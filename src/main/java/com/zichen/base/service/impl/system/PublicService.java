package com.zichen.base.service.impl.system;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import com.zichen.base.util.Constants;
import com.zichen.base.util.JsonUtil;


/**
 * 
 * @ClassName PublicService
 * @Package com.zichen.base.service.impl
 * @discription 公共返回的方法
 * @author zhanghuan       
 * @created 2017-10-19 下午3:47:41    
 * @version <table><tr><td>版本信息</td><td>修改时间</td><td>修改人</td><td>修改内容</td><td>修改单编号</td></tr></table>
 *
 */
public class PublicService {
	private static Logger log = LogManager.getLogger(PublicService.class);
	/**
	 * 
	 * FunctionName：com.zichen.base.service.impl-PublicService-returnJson
	 * @discription 公共返回方法
	 * @param status  状态码
	 * @return  
	 * @throws $
	 * @author zhanghuan     
	 * @created 2017-10-19 下午3:47:58
	 */
	public String returnJson(String status){
		Map<String, String> map = new HashMap<String, String>();
		// 添加状态值
		map.put("status", status);  // TODO  状态码 加载在常量类里面  避免使用数字
		// 添加状态描述
		switch (status) {
			case Constants.RETURN_STATUS_SUCCESS:
				map.put("message", "操作成功");
				break;
			// 数据服务故障，请联系管理
			case Constants.RETURN_STATUS_DATAERROR:
				map.put("message", "数据服务故障，请联系管理员");
				break;
			// 参数有误，请重新操作
			case Constants.RETURN_STATUS_PARAMERROR:
				map.put("message", "参数有误，请重新操作");
				break;	
			// 登陆账号不存在，请重新操作
			case Constants.RETURN_STATUS_EMPTYLOGINNO:
				map.put("message", "登陆账号不存在，请重新操作");
				break;	
			// 登陆密码不正确，请重新操作
			case Constants.RETURN_STATUS_PASSWORDERROR:
				map.put("message", "登陆密码不正确，请重新操作");
				break;
			// 暂未配置计费模板，请联系管理员  
			case Constants.RETURN_STATUS_EMPTYFEEMODEL:
				map.put("message", "暂未配置计费模板，请联系管理员");
				break;
			// 已离开工作地点，请往工作地点移动，谢谢  
			case Constants.RETURN_STATUS_LEAVEWORKSPACE:
				map.put("message", "已离开工作地点，请往工作地点移动，谢谢");
				break;
			case Constants.RETURN_STATUS_ERRORFORMAT:
				map.put("message", "参数格式错误，请重新上传");
				break;
			case Constants.RETURN_STATUS_DATASYNFAIL:
				map.put("message", "数据同步失败，暂不允许退出");
				break;
				
			case Constants.RETURN_STATUS_PARKISNOTEXISTS:
				map.put("message", "该停车场不存在，请重新输入");
				break;
			case Constants.RETURN_STATUS_NONEOFALL:
				map.put("message", "该终端或登录人与停车场不匹配");
				break;
		}
		
		return JsonUtil.toJson(map);
	}
	
	
	/**
	 * 
	 * FunctionName：com.zichen.base.service.impl-PublicService-checkParam
	 * @discription 检查上传的参数是否为空，通过遍历传入的参数，如果参数为空，就告诉终端
	 * @return  
	 * @throws $
	 * @author zhanghuan     
	 * @created 2017-10-19 下午4:36:04
	 */
	public String checkParam(Map<String,String> paramJson,String checkStr){
		log.info("需要检测的字段是："+checkStr);
		String paramValue = null; // 参数value值
		
		/*
		 * 如果参数为空，就返回101
		 * 如果全部不为空，就返回 "success"
		 */
		String checkStrArray[] = null;
		if(null != checkStr){
			checkStrArray = checkStr.split(",");
		}
		int checkStrArraySize = checkStrArray.length;
		
		for(int i = 0;i<checkStrArraySize;i++){
			paramValue = String.valueOf(paramJson.get(String.valueOf(checkStrArray[i])));
			log.info(checkStrArray[i]+"的paramValue == "+paramValue);
			if(null == paramValue || "".equals(paramValue) || "null".equals(paramValue)){
				log.info("未上传的参数key == " + String.valueOf(checkStrArray[i]));
				return returnJson(Constants.RETURN_STATUS_PARAMERROR);
			}
		}
			
		
		
//		for(String key : paramJson.keySet()) {
//			/*
//			 * 如果不验证参数序列里面包含key值，就取出值，否则就报参数异常
//			 */
//			if(checkStr != null && !checkStr.contains(key)){
//				// 取出key对于的value值
//				paramValue = String.valueOf(paramJson.get(String.valueOf(key)));   
//			}else{
//				log.info("未上传的参数key == " + key);
//				return returnJson(Constants.RETURN_STATUS_PARAMERROR);
//			}
//			
//			if(null == paramValue || "".equals(paramValue)){
//				log.info("有误的参数key == " + key + "   有误的参数value == " + paramValue);
//				return returnJson(Constants.RETURN_STATUS_PARAMERROR);
//			}
//			
//	    }
		
		return  "success";
	}
}