package com.common.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang.StringUtils;

import com.common.constant.SpringBeanId;
import com.common.jdbc.BaseJdbcDao;

/**
 * 
 * 
 * <p>
 * Title：配置工具类（字典数据、基本配置数据）
 * </p>
 * <p>
 * Description：
 * </p>
 * <p>
 * Author :
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */
public class ConfigUtil {

	static {

		// 初始化方法
		// init();
	}

	/**
	 * 
	 * <p>
	 * 作用描述：通过字典类型获取字典Map
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param dicType
	 *            字典类型
	 * @return 字典map
	 * 
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, String> getDicMap(String dicType) {

		// 从缓存列表中找到配置缓存，并根据Key值找到value（配置缓存中value为从数据库字典表中加载的字典map）
		Object o = CacheUtil.get(SpringBeanId.CACHE_CONFIG, dicType);

		// 如果从缓存中没找到，则尝试重新加载数据库中的数据（防止手动从数据库添加了字典配置数据，但是缓存中没加载而查找不到字典的情况）
		if (o == null) {
			loadDicFormDB(dicType);
			o = CacheUtil.get(SpringBeanId.CACHE_CONFIG, dicType);
		}

		// 如果在缓存中仍然没有找到，则返回null
		if (o == null)
			return null;

		return (Map<String, String>) o;
	}

	/**
	 * 
	 * <p>
	 * 作用描述：通过字典类型和字典键key获取字典value
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param dicType
	 *            字典类型
	 * @param dicKey
	 *            字典key
	 * @return 字典value
	 * 
	 */
	public static String getDicValue(String dicType, String dicKey) {

		if (StringUtils.trimToNull(dicType) == null
				|| StringUtils.trimToNull(dicKey) == null) {
			return null;
		}

		// 获取到字典类型对应的字典
		Map<String, String> map = getDicMap(dicType);

		if (map == null)
			return null;

		// 获取字典值
		String value = map.get(dicType+dicKey);

		// 如果没有得到字典值 （防止手动从数据库添加了字典配置数据，但是缓存中没加载而查找不到字典的情况）
		if (StringUtils.trimToNull(value) == null) {

			// 重新从数据库加载一次缓存数据
			loadDicFormDB(dicType);

			// 重新获取字典map
			map = getDicMap(dicType);

			// 重新获取字典值
			value = map.get(dicType+dicKey);
		}

		return value;
	}

	/**
	 * 
	 * <p>
	 * 作用描述：通过字典类型和字典键value获取字典key
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param dicType
	 *            字典类型
	 * @param dicValue
	 *            字典value
	 * @return 字典key
	 * 
	 */
	public static String getDicKey(String dicType, String dicValue) {

		if (null == dicValue || "".equals(dicValue)) {
			return null;
		}

		// 获取到字典类型对应的字典
		Map<String, String> map = getDicMap(dicType);

		if (map == null)
			return null;

		String key = "";
		// 获取字典key
		String v = dicValue.trim();
		for (Entry<String, String> e : map.entrySet()) {
			if (e.getValue().equals(v)) {
				key = e.getKey();
				break;
			}
		}

		// 如果没有得到字典值 （防止手动从数据库添加了字典配置数据，但是缓存中没加载而查找不到字典的情况）
		if (StringUtils.trimToNull(key) == null) {

			// 重新从数据库加载一次缓存数据
			loadDicFormDB(dicType);

			// 重新获取字典map
			map = getDicMap(dicType);

			// 重新获取字典key
			for (Entry<String, String> e : map.entrySet()) {
				if (e.getValue().equals(dicValue)) {
					key = e.getKey();
					break;
				}
			}
		}

		return key;
	}

	/**
	 * 
	 * <p>
	 * 作用描述：往配置字典缓存中插入配置项
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param dicType
	 *            字典类型
	 * @param key
	 *            字典key
	 * @param value
	 *            字典value
	 * @return
	 * 
	 */
	public static void putDic(String dicType, String key, String value) {

		// 获取到字典类型对应的字典
		Map<String, String> map = getDicMap(dicType);

		// 往字典Map中插入键值对
		map.put(key, value);

		// 更新配置缓存中的字典
		CacheUtil.put(SpringBeanId.CACHE_CONFIG, dicType, map);
	}

	/**
	 * 
	 * <p>
	 * 作用描述：系统启动时初始化服务
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * 
	 */
	private static synchronized void init() {
		loadDicFormDB(null);
	}

	/**
	 * 
	 * <p>
	 * 作用描述：从数据库加载更新字典配置缓存
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * 
	 */
	private static synchronized void loadDicFormDB(String sortType) {

		List<DictType> typeList = null;

		Map map = new HashMap();
		if (StringUtils.trimToNull(sortType) == null) {

			// 查找字典类型配置表获取到字典类型
			typeList = DaoUtil.getDao().query("common.selectDictType", null,
					DictType.class);

			// 遍历字典类型，查找字典配置表
			for (DictType type : typeList) {
				String typeId = type.getTypeId();
				map.put("flid", typeId);
				List<DictValue> sortList = DaoUtil.getDao().query(
						"common.selectDictByType", map, DictValue.class);
				map.clear();

				// 将查找到的字典转换成map
				Map<String, String> dicMap = new HashMap<String, String>();
				for (DictValue sort : sortList) {
					dicMap.put(sort.getDmId(), sort.getDmz());
				}

				// 将字典配置缓存到ehcache缓存中
				CacheUtil.put(SpringBeanId.CACHE_CONFIG, typeId, dicMap);
			}
		} else {
			map.put("flid", sortType);
			List<DictValue> sortList = DaoUtil.getDao().query(
					"common.selectDictByType", map, DictValue.class);
			// 将查找到的字典转换成map
			Map<String, String> dicMap = new HashMap<String, String>();
			for (DictValue sort : sortList) {
				dicMap.put(sort.getDmId(), sort.getDmz());
			}

			// 将字典配置缓存到ehcache缓存中
			CacheUtil.put(SpringBeanId.CACHE_CONFIG, sortType, dicMap);
		}
	}

	/**
	 * 
	 * <p>
	 * Title：系统字典表分类实体
	 * </p>
	 * <p>
	 * Description：2014
	 * </p>
	 * <p>
	 * Author :2014-4-5
	 * </p>
	 * <p>
	 * Department : 平台
	 * </p>
	 */
	public static class DictType {

		private String typeId;

		private String typeName;

		public String getTypeId() {
			return typeId;
		}

		public void setTypeId(String typeId) {
			this.typeId = typeId;
		}

		public String getTypeName() {
			return typeName;
		}

		public void setTypeName(String typeName) {
			this.typeName = typeName;
		}

	}

	/**
	 * 
	 * <p>
	 * Title：系统字典表实体
	 * </p>
	 * <p>
	 * Description：2014
	 * </p>
	 * <p>
	 * Author :2014-4-5
	 * </p>
	 * <p>
	 * Department : 平台
	 * </p>
	 */
	public static class DictValue {

		private String dmId;

		private String dmz;

		private String pxh;

		public String getDmId() {
			return dmId;
		}

		public void setDmId(String dmId) {
			this.dmId = dmId;
		}

		public String getDmz() {
			return dmz;
		}

		public void setDmz(String dmz) {
			this.dmz = dmz;
		}

		public String getPxh() {
			return pxh;
		}

		public void setPxh(String pxh) {
			this.pxh = pxh;
		}

	}

}
