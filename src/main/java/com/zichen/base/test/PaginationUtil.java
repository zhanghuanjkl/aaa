package com.zichen.base.test;

import java.io.Serializable;
import java.util.List;

/**
 * ssm框架分页工具类
 * @author 左喆
 * @version 1.0
 */
public class PaginationUtil<T> implements Serializable{

	/**
	 * Comment for <code>serialVersionUID</code>
	 */
	private static final long serialVersionUID = 1L;
	
	/** 当前页*/
	private int pageNo = 1;   
	
	/** 每页显示记录数 */
    private int pageSize = 20;   // 页面大小:一个页面显示多少个数据
  
    /** 数据总数 */
    private int rowCount;               // 数据总数：一共有多少个数据
    
    /** 页面总数 */
    private int pageCount;              // 页面总数
    
    /** 起始行号 */
    private int startRow;     
    
    /** 用于存放查询结果集 */
    private T list;
    
    public PaginationUtil(){
    	
    }
    
    /**
     * 有参构造，
     * @param pageNo    当前页
     * @param pageSize  每页显示记录数
     * @param pageCount 总页数
     */
	public PaginationUtil(String page_No,int pageSize, int rowCount){
		
		 int pageNo = 1;
	        if (page_No != null) {
	            try {
	            	pageNo = Integer.parseInt(page_No);
	            } catch (Exception e) {
	            	pageNo = 1;
	            }
	        }
	        this.pageNo = pageNo;
	        this.pageSize = pageSize;
	        this.rowCount = rowCount;
	        this.pageCount = (int) Math.ceil((double) rowCount / pageSize);

	        this.pageNo = Math.min(this.pageNo, pageCount);
	        this.pageNo = Math.max(1, this.pageNo);

	        this.startRow = (this.pageNo - 1) * pageNo;
	        
		
	}
	
	

	public PaginationUtil(int pageNo, int pageSize, int rowCount,
			int pageCount, int startRow, T list) {
		super();
		this.pageNo = pageNo;
		this.pageSize = pageSize;
		this.rowCount = rowCount;
		this.pageCount = pageCount;
		this.startRow = startRow;
		this.list = list;
	}

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		
		if(pageNo<=0){
			pageNo=1;
		}
		if(pageNo>pageCount){
			pageNo=pageCount;
		}
		// 计算开始行数据
		this.startRow = (pageNo - 1) * pageSize;
		this.pageNo = pageNo;
		
	}

	

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		// 当设置pageSize时,重新计算开始行
		
		this.startRow = (pageNo - 1) * pageSize;
		this.pageSize = pageSize;
	}

	public int getRowCount() {
		return rowCount;
	}

	public void setRowCount(int rowCount) {
		this.rowCount = rowCount;
	}

	public int getPageCount() {
		return pageCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

	public int getStartRow() {
		return startRow;
	}

	public void setStartRow(int startRow) {
		this.startRow = startRow;
	}

	

	public T getList() {
		return list;
	}

	public void setList(T list) {
		this.list = list;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
    
	
}
