package com.common.constant;

import java.lang.reflect.Field;
import java.util.List;

import com.common.util.DaoUtil;

/**
 * 
 * <p>
 * Title：通知信息常量
 * </p>
 * <p>
 * Description：2015
 * </p>
 * <p>
 * Author : 2015-11-19
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */
public class NoteConstant {

	static {
		// String str = PropertiesUtil.load(NoteConstant.class,
		// "/conf/properties/note.properties", null);
		// System.out.println("属性文件中如下属性在常量类中未找到匹配项：" + str);
		@SuppressWarnings("unchecked")
		List<Note> list = (List<Note>) DaoUtil.getDao().query(
				"common.selectNote", null, Note.class);
		if (null != list && list.size() > 0) {
			for (Note note : list) {
				String key = note.getSetKey();
				String value = note.getSetValue();
				Field[] fields = NoteConstant.class.getDeclaredFields();
				for (Field field : fields) {
					String fieldName = field.getName();
					if (fieldName.equals(key.trim())) {
						try {
							field.set(null, value);
							break;
						} catch (IllegalAccessException e) {
						}
					}
				}
			}
		}
	}

	public static String zc;
	public static String zhmm;
	public static String zccg;
	public static String drhycg;
	public static String jzfw;
	public static String jdcg;
	public static String qd;
	public static String ddqr;
	public static String pd;
	public static String wcfw;
	public static String zf;
	public static String pj;
	public static String zpt;
	public static String zyzrz;
	public static String jrzz;
	public static String zyzshtg;
	public static String zyzshwtg;
	public static String jmszc;
	public static String jmsshtg;
	public static String jmsshwtg;
	public static String sqjrjg;
	public static String gyhddn;
	public static String gyrwshtg;
	public static String gyrwshwtg;
	public static String gyrwxg;
	public static String gyhdsh;
	public static String gyhdshwtg;
	public static String gyhdxg;
	public static String sqtcjg;
	public static String sqtcjgtg;
	public static String sqtcjgwtg;
	public static String sqtczz;
	public static String sqtczztg;
	public static String sqtczzwtg;
	public static String yfkczcg;
	public static String xgjg;
	public static String jjlxrtg;
	public static String ddqrcs;
	public static String ddfwcs;
	public static String jrzzshtg;
	public static String jrzzshwtg;

	public static class Note {
		private String setKey;
		private String setValue;

		public String getSetKey() {
			return setKey;
		}

		public void setSetKey(String setKey) {
			this.setKey = setKey;
		}

		public String getSetValue() {
			return setValue;
		}

		public void setSetValue(String setValue) {
			this.setValue = setValue;
		}

	}

}
