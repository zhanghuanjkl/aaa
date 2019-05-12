package com.zichen.base.controller;

import java.beans.PropertyEditorSupport;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.propertyeditors.PropertiesEditor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.zichen.base.util.DateUtil;
import com.zichen.base.util.StringUtil;

/**
 * 控制层基类， 所有controller类都需要继承此类
 */
public class BaseController {
	protected static final Logger log = LoggerFactory
			.getLogger(BaseController.class);

	
	
	/**
	 * 转化前端传过来的String类型
	 * @param binder
	 */
	@InitBinder
	protected void initBinderStringFormat(WebDataBinder binder) {
		binder.registerCustomEditor(String.class, new PropertiesEditor() {
			@Override
			public void setAsText(String text) throws IllegalArgumentException {
				if (text == null) { 
					super.setValue(null);
				} else if(text.equals("")) {
					super.setValue(null);
				}else{
					/*try {
						super.setValue(new String(text.getBytes("iso-8859-1"),"utf-8"));
					} catch (UnsupportedEncodingException e) {
						e.printStackTrace();
					}*/
					super.setValue(new String(text));
				}
			}
			@Override
			public String getAsText() {
				return getValue().toString();
			}
		});
	}
	
	

	/**
	 * 转化前端传过来的    Date 类型
	 * @param binder
	 */
	@InitBinder
	protected void initBinderDateFormat(WebDataBinder binder) {
		binder.registerCustomEditor(Date.class, new PropertiesEditor() {
			@Override
			public void setAsText(String text) throws IllegalArgumentException {
				if (!StringUtils.isEmpty(text)) {
					if (text.indexOf(":") != -1) {
						setValue(DateUtil.stringtoDate(text, DateUtil.yyyyMMddHHmmss));
					} else {
						setValue(DateUtil.stringtoDate(text, DateUtil.yyyyMMdd));
					}
				} else {
					super.setValue(null);
				}
			}

			@Override
			public String getAsText() {
				return getValue().toString();
			}
		});
	}

	
	

	
	
	
	
	
	
	
	
	
	
	
	/*
	 * Object... argumets 该参数是：传入到方法的参数的个数是不固定的，其实就是一个参数数组
	 */
	protected boolean isNull(Object... argumets) {
		if (argumets == null) {
			return true;
		}
		for (Object obj : argumets) {
			if (obj == null || "".equals(obj)) {
				return true;
			}
		}
		return false;
	}

	@InitBinder
	public void initBinder(WebDataBinder binder) {
		// date,datetime
		binder.registerCustomEditor(Date.class, new PropertyEditorSupport() {
			@Override
			public void setAsText(String value) {
				if (StringUtil.isEmpty(value)) {
					setValue(null);
					return;
				}
				try {
					if (value.length() == 10) {
						setValue(new SimpleDateFormat("yyyy-MM-dd")
								.parse(value));
					} else if (value.length() == 8) {
						setValue(new SimpleDateFormat("HH:mm:ss").parse(value));
					} else if (value.length() == 16) {
						setValue(new SimpleDateFormat("yyyy-MM-dd HH:mm")
								.parse(value));
					} else {
						setValue(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
								.parse(value));
					}

				} catch (ParseException e) {
					log.error("Can not convert '" + value
							+ "' to java.util.Date", e);
				}
			}

			@Override
			public String getAsText() {
				return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
						.format((Date) getValue());
			}

		});
		// int
		binder.registerCustomEditor(Integer.class, new PropertyEditorSupport() {
			@Override
			public void setAsText(String value) {
				if (StringUtil.isEmpty(value)) {
					setValue(0);
					return;
				}
				setValue(Integer.parseInt(value));
			}

			@Override
			public String getAsText() {
				return getValue().toString();
			}

		});

		// long
		binder.registerCustomEditor(Long.class, new PropertyEditorSupport() {
			@Override
			public void setAsText(String value) {
				if (StringUtil.isEmpty(value)) {
					setValue(0);
					return;
				}
				setValue(Long.parseLong(value));
			}

			@Override
			public String getAsText() {
				return getValue().toString();
			}

		});

		// double
		binder.registerCustomEditor(Double.class, new PropertyEditorSupport() {
			@Override
			public void setAsText(String value) {
				if (StringUtil.isEmpty(value)) {
					setValue(0);
					return;
				}
				setValue(Double.parseDouble(value));
			}

			@Override
			public String getAsText() {
				return getValue().toString();
			}

		});
	}

	public ModelAndView redirectHandlerFor301(String sURL) {
		RedirectView rv = new RedirectView(sURL);
		rv.setStatusCode(HttpStatus.MOVED_PERMANENTLY);
		rv.setUrl(sURL);
		ModelAndView mv = new ModelAndView(rv);
		return mv;
	}

	/**
	 * 调用此方法说明你的controller方法将要转到显示系统消息页面
	 * 
	 * @param stack
	 * @param message
	 * @param links
	 */
	public void showMessage(Map<String, Object> stack, String message,
			List<Map<String, String>> links) {
		if (links == null || links.size() == 0) {
			links = new ArrayList<Map<String, String>>();
			Map<String, String> link = new HashMap<String, String>();
			link.put("text", "返回上一页");
			link.put("url", "javascript:history.back()");
			links.add(link);
		}
		stack.put("messageInfo", message);
		stack.put("links", links);
		stack.put("msgType", "message");
	}
	
	
	/**
	 * 
	 * FunctionName：com.zichen.base.controller-BaseController-getJsonParam
	 * @discription 获得终端传来的json参数
	 * @param request
	 * @return  
	 * @throws $
	 * @author zhanghuan     
	 * @throws IOException 
	 * @created 2017-10-21 下午1:58:05
	 */
	public String getJsonParam(HttpServletRequest request) throws IOException{
		log.info("开始读取数据流");
    	ServletInputStream in = request.getInputStream();
    	BufferedReader reader = new BufferedReader(new InputStreamReader(in));      
        StringBuilder sb = new StringBuilder();     
        log.info("reader对象是否为空："+reader.toString());
        try {      
           sb.append(reader.readLine());  //  按行读取，只读取一行 支持的长度是什么 post不影响
           log.info("传入的参数是："+sb.toString()); 
        } catch (IOException e) {      
           e.printStackTrace();      
        } finally {      
           try {      
               in.close();      
           } catch (IOException e) {      
               e.printStackTrace();      
           }      
        }      
        return sb.toString();
        
        
	}
	
	
	
	
}
