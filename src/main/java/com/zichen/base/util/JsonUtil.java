package com.zichen.base.util;

import java.lang.reflect.Type;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

/**
 * Json转换工具
 * 
 * @Filename: JsonUtil.java
 * @Version: 1.0
 * @Author: 陈万海
 * @Email: chenwanhai@sina.com
 * 
 */
public final class JsonUtil {
	private static Logger log = LoggerFactory.getLogger(JsonUtil.class);

	/**
	 * 将JSON字符串反序列化为Java对象。
	 * 
	 * @param json
	 *            JSON字符串
	 * @return <li>json字符串为空时返回null； <li>json字符串为无效JSON格式时，会记录日志，返回null；
	 */
	public static final <T> T fromJson(String json) {
		if (StringUtils.isEmpty(json))
			return null;

		try {
			Type type = new TypeToken<T>() {
			}.getType();
			Gson gson = new Gson();
			return gson.fromJson(json, type);
		} catch (Exception e) {
			log.warn("Invalidate json format:" + json, e);
			return null;
		}
	}

	/**
	 * 将Java对象序列化成JSON字符串。
	 * 
	 * @param obj
	 * @return
	 */
	public static final String toJson(Object obj) {
		if (obj == null)
			return null;
		try {
			GsonBuilder gb = new GsonBuilder();
			gb.setDateFormat("yyyy-MM-dd HH:mm:ss");
			return gb.create().toJson(obj);
		} catch (Exception e) {
			log.warn("Can not serialize object to json", e);
			return null;
		}
	}
	
	
}