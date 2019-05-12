package com.zichen.base.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class FileDealUtil {

	

	/**
	 * 输入输出流转换
	 * @param in
	 * @param out
	 * @return
	 * @throws IOException
	 */
	public static int transfer(InputStream in, OutputStream out)
			throws IOException {
		int total = 0;
		byte[] buffer = new byte[4096];
		int bytesRead = in.read(buffer);
		while (bytesRead != -1) {
			out.write(buffer, 0, bytesRead);
			total += bytesRead;
			bytesRead = in.read(buffer);
		}
		return total;
	}	
    
}
