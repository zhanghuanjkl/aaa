package com.zichen.base.util.exception;

/**
 * @ClassName ArgumentException
 * @Package com.zichen.base.util.exception
 * @discription 业务层级的异常，这类异常在message中不能包含任何调试信息，必须是用户友好的描述信息， 能够显示在界面给用户看
 * 
 *              <p>
 *              异常处理规范：
 * 
 *              <p>
 *              要解决的问题：
 *              <ul>
 *              <li>1.
 *              </ul>
 *              代码在抛出这类型异常之前，必须先将详细描述信息、内部异常堆栈等记录到日志中，
 * @author chensheng
 * @created 2017年3月19日 下午2:49:12
 * @version 版本信息 修改时间 修改人 修改内容 修改单编号
 * 
 */
public class BusinessException extends RuntimeException {

	/**
	 * Comment for <code>serialVersionUID</code>
	 */
	private static final long serialVersionUID = 1L;

	public BusinessException(String message) {
		super(message);
	}

	public BusinessException(String message, String code) {
		super(message);
		this.code = code;
	}

	private String code;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
}