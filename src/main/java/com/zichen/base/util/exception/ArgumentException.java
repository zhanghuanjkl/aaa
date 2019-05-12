package com.zichen.base.util.exception;

/**
 * @ClassName ArgumentException
 * @Package com.zichen.base.util.exception
 * @discription 参数错误，方法调用的入参不符合要求
 * @author chensheng       
 * @created 2017年3月19日 下午2:49:12    
 * @version 版本信息    修改时间     修改人         修改内容        修改单编号
 * 
 */
public class ArgumentException extends BusinessException {

    /**
     *Comment for <code>serialVersionUID</code>
     */
    private static final long serialVersionUID = -5961619353798906031L;

    public ArgumentException(String message) {
        super(message);
    }

}
