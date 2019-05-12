package com.zichen.base.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import org.apache.log4j.Logger;

/**
 * ��ȡϵͳ��ǰʱ��
 * 
 * @author Administrator 2011-11-03
 * @version 1.0
 */
public class GetDateTime {
	private static Logger log = Logger.getLogger(GetDateTime.class);

	/**
	 * �õ�ϵͳ��ǰ��ʱ��
	 * 
	 * @param str1������
	 *            ��������֮��ķָ���
	 * @param str2ʱ���
	 *            ��������֮��ķָ���
	 * @param str3����ʱ֮��ķָ���
	 * @param isTime
	 *            ��ʾ�Ƿ���Ҫʱ���� ��Ҫ��true ����Ҫ��false
	 * @return String ����һ��String���͵�ʱ��
	 */
	public static String getDateTimeNow(String str1, String str2, String str3,
			boolean isTime) {
		if (null == str1) {
			str1 = "-";
		}
		if (null == str2) {
			str2 = ":";
		}
		if (null == str3) {
			str3 = " ";
		}
		// ��õ�ǰϵͳʱ��
		String datenow = "";
		Calendar ca = Calendar.getInstance();

		int year = ca.get(Calendar.YEAR);// ��ȡ���
		int month = ca.get(Calendar.MONTH);// ��ȡ�·�
		month = month + 1;
		String monthString = month + "";
		if (month < 10) {
			monthString = "0" + month;
		}
		int day = ca.get(Calendar.DATE);// ��ȡ��
		String dayString = day + "";
		if (day < 10) {
			dayString = "0" + day;
		}
		// ��ʽ������
		if (false == isTime) {
			datenow = year + str1 + monthString + str1 + dayString;
			return datenow;
		} else {

			int hour = ca.get(Calendar.HOUR_OF_DAY);// Сʱ
			String hourString = hour + "";
			if (hour < 10) {
				hourString = "0" + hour;
			}
			int minute = ca.get(Calendar.MINUTE);// ��
			String minuteString = minute + "";
			if (minute < 10) {
				minuteString = "0" + minute;
			}
			int second = ca.get(Calendar.SECOND);// ��
			String secondString = second + "";
			if (second < 10) {
				secondString = "0" + second;
			}

			// ��ʽ��ʱ��
			datenow = year + str1 + monthString + str1 + dayString + str3
					+ hourString + str2 + minuteString + str2 + secondString;

			return datenow;
		}
	}

	/**
	 * �ж������Ƿ���һ�����ڵ����һ��
	 * 
	 * @param data
	 * @return
	 */
	public static boolean isLastDayOfWeek(String data) {
		boolean res = false;
		int indexOfWeek = 0;
		Calendar cal = Calendar.getInstance();
		DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			cal.setTime(sdf.parse(data));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		// ȡ��ǰ���ڵ�������������
		indexOfWeek = cal.get(Calendar.DAY_OF_WEEK);
		if (indexOfWeek == 7) {
			res = true;
		}
		return res;
	}

	/**
	 * �жϵ�ǰ�����Ƿ��µ����һ�죺���ڸ�ʽ������:yyyy-mm-dd
	 * 
	 * @param rq
	 * @return
	 */
	public static boolean isLastDayOfMonth(String rq) {
		String[] rqs = rq.split("-");
		int year = Integer.parseInt(rqs[0]);
		int month = Integer.parseInt(rqs[1]);
		int day = Integer.parseInt(rqs[2]);
		Integer[] max = { 0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
		if (year % 4 == 0) {
			max[1] = 29;

		}
		return day == max[month];
	}

	/**
	 * 
	 * ��ȡĳ��ĳ�µ����һ��
	 * 
	 * 
	 * @param year
	 * 
	 *            ��
	 * 
	 * @param month
	 * 
	 *            ��
	 * 
	 * @return ���һ����ַ�
	 */

	public static String getLastDayOfMonthByArray(int year, int month) {
		// ʹmonth��ֵ�������±걣��һ�£������±��0��ʼ
		month = month - 1;
		Integer[] max = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
		if (year % 4 == 0) {
			max[1] = 29;

		}
		return year + "-" + month + "-" + max[month] + "-";

	}

	/**
	 * 
	 * ��ȡĳ��ĳ�µ����һ��
	 * 
	 * 
	 * @param year
	 * 
	 *            ��
	 * 
	 * @param month
	 * 
	 *            ��
	 * 
	 * @return ���һ��
	 */
	public static int getLastDayOfMonth(int year, int month) {
		// ʹmonth��ֵ�������±걣��һ�£������±��0��ʼ
		month = month - 1;
		Integer[] max = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
		if (year % 4 == 0) {
			max[1] = 29;

		}
		return max[month];

	}

	/**
	 * dateStr1��dateStr2�õ�����
	 * 
	 * @param dateStr1
	 * @param dateStr2
	 * @param type
	 *            1:����2:����3������4��Сʱ�� 5�������� 6�� ����
	 * @return
	 */
	public static int getInterval(String dateStr1, String dateStr2, int type) {
		if (null == dateStr1 || "".equals(dateStr1)) {
			return 0;
		}
		if (null == dateStr2 || "".equals(dateStr2)) {
			return 0;
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd");
		try {
			dateStr1 = sdf.format(sdf2.parse(dateStr1));
			dateStr2 = sdf.format(sdf2.parse(dateStr2));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		int year1 = Integer.parseInt(dateStr1.substring(0, 4));
		int month1 = Integer.parseInt(dateStr1.substring(4, 6));
		int day1 = Integer.parseInt(dateStr1.substring(6, 8));
		int year2 = Integer.parseInt(dateStr2.substring(0, 4));
		int month2 = Integer.parseInt(dateStr2.substring(4, 6));
		int day2 = Integer.parseInt(dateStr2.substring(6, 8));
		Calendar c1 = Calendar.getInstance();
		c1.set(Calendar.YEAR, year1);
		c1.set(Calendar.MONTH, month1 - 1);
		c1.set(Calendar.DAY_OF_MONTH, day1);
		Calendar c2 = Calendar.getInstance();
		c2.set(Calendar.YEAR, year2);
		c2.set(Calendar.MONTH, month2 - 1);
		c2.set(Calendar.DAY_OF_MONTH, day2);
		long mills = c1.getTimeInMillis() > c2.getTimeInMillis() ? c1
				.getTimeInMillis()
				- c2.getTimeInMillis() : c2.getTimeInMillis()
				- c1.getTimeInMillis();

		switch (type) {
		case 1:

			return (int) (mills / 1000 / 3600 / 24 / 365);
		case 2:
			return (int) (mills / 1000 / 3600 / 24 / 30);
		case 3:
			return (int) (mills / 1000 / 3600 / 24);
		case 4:
			return (int) (mills / 1000 / 3600);
		case 5:
			return (int) (mills / 1000 / 60);
		case 6:
			return (int) (mills / 1000);
		default:
			return (int) (mills / 1000 / 3600 / 24);
		}

	}

	/**
	 * ����ָ��ʱ����ٻ���������
	 * 
	 * @param date
	 *            ��������
	 * @param num
	 *            ���ӻ���ٵ�����
	 * @return
	 */
	public static String addDay(String strdate, int num) {
		Calendar startDT = Calendar.getInstance();

		DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			startDT.setTime(sdf.parse(strdate));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		startDT.add(Calendar.DAY_OF_MONTH, num);

		return sdf.format(startDT.getTime());
	}

	/**
	 * ������ڵõ��������ǵ���ĵڼ���
	 * 
	 * @param strdate
	 * @return
	 */
	public static int getWeekOfYear(String strdate) {
		System.err.println("***********" + strdate + "***************");
		int xq = 1;
		Calendar cal = Calendar.getInstance(Locale.CHINA);
		DateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.CHINA);
		try {
			cal.setTime(sdf.parse(strdate));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		// ȡ��ǰ���ڵ�������������
		xq = cal.get(Calendar.WEEK_OF_YEAR);
		return xq;
	}

	/**
	 * ϵͳʱ��ǰ�ƺ��ƣ�������Ϳɰ��ꡢ�·ݡ��ܡ��졢ʱ���֡������ƶ�������ǰ�ƣ�����Ϊ����
	 * 
	 * @param str1������
	 *            ��������֮��ķָ���
	 * @param str2ʱ���
	 *            ��������֮��ķָ���
	 * @param str3����ʱ֮��ķָ���
	 * @param isTime
	 *            ��ʾ�Ƿ���Ҫʱ���� ��Ҫ��true ����Ҫ��false
	 * @param type
	 *            ��ȥ������ 1����ݣ�2���·ݣ�3��4���ܣ�5��6��7��8���죬10��11��Сʱ��12�����ӣ�13����
	 * @param data
	 *            ��ǰ���ڼ�ȥ����
	 * @return String ����һ��String���͵�ʱ��
	 */
	public static String getDateOfMove(String str1, String str2, String str3,
			boolean isTime, int type, Integer data) {
		if (null == str1) {
			str1 = "-";
		}
		if (null == str2) {
			str2 = ":";
		}
		if (null == str3) {
			str3 = " ";
		}
		// ��õ�ǰϵͳʱ��
		String datenow = "";
		Calendar ca = Calendar.getInstance();
		ca.add(type, data);
		int year = ca.get(Calendar.YEAR);// ��ȡ���
		int month = ca.get(Calendar.MONTH);// ��ȡ�·�
		month = month + 1;
		// if (0 != rmonth) {
		// if ((month + rmonth) >= 12) {
		// year = year + ((month + rmonth) / 12);
		// if (0 == ((month + rmonth) % 12)) {
		// month = 1;
		// } else {
		// month = (month + rmonth) % 12;
		// }
		// } else if ((month + rmonth) <= 0 && (month + rmonth) > -12) {
		// month = month + 12 + rmonth;
		// year = year - 1;
		// } else if ((month + rmonth) <= -12) {
		// year = year + ((month + rmonth) / 12);
		// if (0 == ((-rmonth - month) % 12)) {
		// month = 1;
		// } else {
		// month = (-rmonth - month) % 12;
		// }
		// } else {
		// month = month + rmonth;
		// }
		// }
		String monthString = month + "";
		if (month < 10) {
			monthString = "0" + month;
		}
		int day = ca.get(Calendar.DATE);// ��ȡ��
		String dayString = day + "";
		if (day < 10) {
			dayString = "0" + day;
		}
		// ��ʽ������
		if (false == isTime) {
			datenow = year + str1 + monthString + str1 + dayString;
			return datenow;
		} else {

			int hour = ca.get(Calendar.HOUR_OF_DAY);// Сʱ
			String hourString = hour + "";
			if (hour < 10) {
				hourString = "0" + hour;
			}
			int minute = ca.get(Calendar.MINUTE);// ��
			String minuteString = minute + "";
			if (minute < 10) {
				minuteString = "0" + minute;
			}
			int second = ca.get(Calendar.SECOND);// ��
			String secondString = second + "";
			if (second < 10) {
				secondString = "0" + second;
			}

			// ��ʽ��ʱ��
			datenow = year + str1 + monthString + str1 + dayString + str3
					+ hourString + str2 + minuteString + str2 + secondString;

			return datenow;
		}
	}

	/**
	 * ʱ��Ƚ�
	 * 
	 * @param str
	 * @return ֮ǰ���� 1 ֮�󷵻� -1 �쳣���� 0
	 */
	public static int TimeBj(String str) {
		java.util.Date nowdate = new java.util.Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.CHINA);
		Date d = null;
		try {
			d = sdf.parse(str);
		} catch (ParseException e) {

			log.error("ʱ���ʽת��ʧ��" + e);
			return 0;
		}

		boolean flag = d.before(nowdate);
		if (flag) {
			return 1;
		} else {
			return -1;
		}
	}
	
	/**
	 * 
	 * FunctionName：com.zichen.base.util-GetDateTime-getDateByString
	 * @discription 将字符串时间改为date时间
	 * @param str
	 * @return  
	 * @throws $
	 * @author zhanghuan     
	 * @throws ParseException 
	 * @created 2017-10-23 下午7:11:15
	 */
	public static Date getDateByString(String str) throws ParseException{
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return df.parse(str);
	}
	
	public static void main(String[] args) {
		System.out.println(getDateTimeNow("-",":"," ",true));
		Date d = new Date();
		System.out.println(d.toString());
		
	}
}
