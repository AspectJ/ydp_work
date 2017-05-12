package com.common.util;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.common.constant.SpringBeanId;
import com.common.jdbc.BaseJdbcDao;

public class OrderUtil {

	/**
	 * 流水号长度
	 */
	private static final Integer ORDERLENGTH = 5;

	/**
	 * 入库单最大流水号
	 */
	private static Integer maxStockinOrderNum = null;
	/**
	 * 借用单最大流水号
	 */
	private static Integer maxBorrowOrderNum = null;
	/**
	 * 维修单最大流水号
	 */
	private static Integer maxMaintainOrderNum = null;
	/**
	 * 报废单最大流水号
	 */
	private static Integer maxScrapOrderNum = null;
	/**
	 * 申报单最大流水号
	 */
	private static Integer maxManascrapOrderNum = null;
	/**
	 * 变动单最大流水号
	 */
	private static Integer maxChangeOrderNum = null;
	/**
	 * 调剂单最大流水号
	 */
	private static Integer maxAdjustOrderNum = null;
	/**
	 * 临时物品最大流水号 (实验教学 xyk 2013-7-29)
	 */
	private static Integer maxTempArticleOrderNum = null;
	/**
	 * 仪器最大条形码
	 */
	private static Integer maxEquipTxmNum = null;

	/**
	 * 配套设备最大条形码
	 */
	private static Integer maxRoomTxmNum = null;

	/**
	 * 办公生活最大条形码
	 */
	private static Integer maxLifeTxmNum = null;

	/**
	 * 现代信息最大条形码
	 */
	private static Integer maxMetrecTxmNum = null;

	/**
	 * 交通工具最大的条形码
	 */
	private static Integer maxVehicleTxmNum = null;
	/**
	 * 单据类型-入库单(同时也是单据前缀)
	 */
	public static final String ORDER_STOCKIN = "R";
	/**
	 * 单据类型-借用单(同时也是单据前缀)
	 */
	public static final String ORDER_BORROW = "B";

	/**
	 * 单据类型-维修单(同时也是单据前缀)
	 */
	public static final String ORDER_MAINTAIN = "M";

	/**
	 * 单据类型-报废单(同时也是单据前缀)
	 */
	public static final String ORDER_SCRAP = "S";

	/**
	 * 单据类型-申报单(同时也是单据前缀)
	 */
	public static final String ORDER_MANASCRAP = "MS";

	/**
	 * 单据类型-变动单(同时也是单据前缀)
	 */
	public static final String ORDER_CHANGE = "C";

	/**
	 * 单据类型-调剂单(同时也是单据前缀)
	 */
	public static final String ORDER_ADJUNST = "A";
	/**
	 * 单据类型-临时物品申购单 (实验教学 xyk 2013-7-29) 如果这里改了，sql 也要调整
	 */
	public static final String ORDER_TEMP_ARTICLE = "OD";
	/**
	 * 仪器条形码(同时也是条形码前缀)
	 */
	public static final String EQUIP_TXM = "E";

	/**
	 * 配套条形码(同时也是条形码前缀)
	 */
	public static final String ROOM_TXM = "R";

	/**
	 * 现代信息条形码(同时也是条形码前缀)
	 */
	public static final String METREC_TXM = "MF";

	/**
	 * 办公生活条形码(同时也是条形码前缀)
	 */
	public static final String LIFE_TXM = "L";

	/**
	 * 交通工具条形码(同时也是条形码前缀)
	 */
	public static final String VEHICLE_TXM = "V";

	/**
	 * 
	 * <p>
	 * 作用描述：生成单号
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @return
	 * 
	 */
	public static synchronized String genOrder(String orderType) {
		return getMaxOrderNum(orderType);
	}

	/**
	 * <p>
	 * 作用描述：得到最大单据流水号
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param orderType
	 *            单据类型
	 * @return
	 * 
	 */
	public static String getMaxOrderNum(String orderType) {
		String max = null;
		// 初始化获得目前最大单号
		initMaxOrderNum(orderType);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		String dateStr = sdf.format(DateUtil.getNowDate());
		if (orderType.equals(ORDER_STOCKIN)) {
			// 入库
			maxStockinOrderNum++;
			String mString = maxStockinOrderNum.toString();
			while (mString.length() < ORDERLENGTH) {
				mString = "0" + mString;
			}
			max = ORDER_STOCKIN + dateStr + mString;
		} else if (orderType.equals(ORDER_BORROW)) {
			// 借用
			maxBorrowOrderNum++;
			String mString = maxBorrowOrderNum.toString();
			while (mString.length() < ORDERLENGTH) {
				mString = "0" + mString;
			}
			max = ORDER_BORROW + dateStr + mString;
		} else if (orderType.equals(ORDER_CHANGE)) {
			// 变动
			maxChangeOrderNum++;
			String mString = maxChangeOrderNum.toString();
			while (mString.length() < ORDERLENGTH) {
				mString = "0" + mString;
			}
			max = ORDER_CHANGE + dateStr + mString;
		} else if (orderType.equals(ORDER_MAINTAIN)) {
			// 维修
			maxMaintainOrderNum++;
			String mString = maxMaintainOrderNum.toString();
			while (mString.length() < ORDERLENGTH) {
				mString = "0" + mString;
			}
			max = ORDER_MAINTAIN + dateStr + mString;
		} else if (orderType.equals(ORDER_MANASCRAP)) {
			// 申报
			maxManascrapOrderNum++;
			String mString = maxManascrapOrderNum.toString();
			while (mString.length() < ORDERLENGTH) {
				mString = "0" + mString;
			}
			max = ORDER_MANASCRAP + dateStr + mString;
		} else if (orderType.equals(ORDER_SCRAP)) {
			// 报废
			maxScrapOrderNum++;
			String mString = maxScrapOrderNum.toString();
			while (mString.length() < ORDERLENGTH) {
				mString = "0" + mString;
			}
			max = ORDER_SCRAP + dateStr + mString;
		} else if (orderType.equals(ORDER_ADJUNST)) {
			// 调剂
			maxAdjustOrderNum++;
			String mString = maxAdjustOrderNum.toString();
			while (mString.length() < ORDERLENGTH) {
				mString = "0" + mString;
			}
			max = ORDER_ADJUNST + dateStr + mString;
		} else if (orderType.equals(EQUIP_TXM)) {
			// 仪器条形码
			maxEquipTxmNum++;
			String mString = maxEquipTxmNum.toString();
			while (mString.length() < ORDERLENGTH) {
				mString = "0" + mString;
			}
			max = EQUIP_TXM + dateStr + mString;
		} else if (orderType.equals(ROOM_TXM)) {
			// 配套条形码
			maxRoomTxmNum++;
			String mString = maxRoomTxmNum.toString();
			while (mString.length() < ORDERLENGTH) {
				mString = "0" + mString;
			}
			max = ROOM_TXM + dateStr + mString;
		} else if (orderType.equals(METREC_TXM)) {
			// 现代条形码
			maxMetrecTxmNum++;
			String mString = maxMetrecTxmNum.toString();
			while (mString.length() < ORDERLENGTH) {
				mString = "0" + mString;
			}
			max = METREC_TXM + dateStr + mString;
		} else if (orderType.equals(LIFE_TXM)) {
			// 办公生活条形码
			maxLifeTxmNum++;
			String mString = maxLifeTxmNum.toString();
			while (mString.length() < ORDERLENGTH) {
				mString = "0" + mString;
			}
			max = LIFE_TXM + dateStr + mString;
		}

		else if (orderType.equals(VEHICLE_TXM)) {

			// 交通工具
			maxVehicleTxmNum++;
			String mString = maxVehicleTxmNum.toString();
			while (mString.length() < ORDERLENGTH) {
				mString = "0" + mString;
			}
			max = VEHICLE_TXM + dateStr + mString;
		} else if (orderType.equals(ORDER_TEMP_ARTICLE)) {
			if (maxTempArticleOrderNum == null) {
				maxTempArticleOrderNum = 0;
			}
			maxTempArticleOrderNum++;
			String mString = maxTempArticleOrderNum.toString();
			while (mString.length() < ORDERLENGTH) {
				mString = "0" + mString;
			}
			max = ORDER_TEMP_ARTICLE + dateStr + mString;
		}
		return max;
	}

	/**
	 * <p>
	 * 作用描述：初始化最大单据流水号
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param orderType
	 *            单据类型
	 * 
	 */
	public static void initMaxOrderNum(String orderType) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		String dateStr = sdf.format(DateUtil.getNowDate());

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("dateStr", dateStr);

		orderBean oBean = null;
		if (orderType.equals(ORDER_STOCKIN) && maxStockinOrderNum == null) {
			// 入库
			oBean = (orderBean) getDao().queryForObject(
					"dymCommonOrder.selectMaxStockin", map, orderBean.class);
			maxStockinOrderNum = oBean.getBh();
		} else if (orderType.equals(ORDER_BORROW) && maxBorrowOrderNum == null) {
			// 借用
			oBean = (orderBean) getDao().queryForObject(
					"dymCommonOrder.selectMaxBorrow", map, orderBean.class);
			maxBorrowOrderNum = oBean.getBh();
		} else if (orderType.equals(ORDER_CHANGE) && maxChangeOrderNum == null) {
			// 变动
			oBean = (orderBean) getDao().queryForObject(
					"dymCommonOrder.selectMaxChange", map, orderBean.class);
			maxChangeOrderNum = oBean.getBh();
		} else if (orderType.equals(ORDER_MAINTAIN)
				&& maxMaintainOrderNum == null) {
			// 维修
			oBean = (orderBean) getDao().queryForObject(
					"dymCommonOrder.selectMaxMaintain", map, orderBean.class);
			maxMaintainOrderNum = oBean.getBh();
		} else if (orderType.equals(ORDER_MANASCRAP)
				&& maxManascrapOrderNum == null) {
			// 申报
			oBean = (orderBean) getDao().queryForObject(
					"dymCommonOrder.selectMaxManascrap", map, orderBean.class);
			maxManascrapOrderNum = oBean.getBh();
		} else if (orderType.equals(ORDER_SCRAP) && maxScrapOrderNum == null) {
			// 报废
			oBean = (orderBean) getDao().queryForObject(
					"dymCommonOrder.selectMaxScrap", map, orderBean.class);
			maxScrapOrderNum = oBean.getBh();
		} else if (orderType.equals(ORDER_ADJUNST) && maxAdjustOrderNum == null) {
			// 调剂
			oBean = (orderBean) getDao().queryForObject(
					"dymCommonOrder.selectMaxAdjust", map, orderBean.class);
			maxAdjustOrderNum = oBean.getBh();
		} else if (orderType.equals(EQUIP_TXM) && maxEquipTxmNum == null) {
			// 仪器条形码
			oBean = (orderBean) getDao().queryForObject(
					"dymCommonOrder.selectMaxEquipCardTxm", map,
					orderBean.class);
			maxEquipTxmNum = oBean.getBh();
		} else if (orderType.equals(ROOM_TXM) && maxRoomTxmNum == null) {
			// 配套设备条形码
			oBean = (orderBean) getDao().queryForObject(
					"dymCommonOrder.selectMaxRmCardTxm", map, orderBean.class);
			maxRoomTxmNum = oBean.getBh();
		} else if (orderType.equals(LIFE_TXM) && maxLifeTxmNum == null) {
			// 办公生活条形码
			oBean = (orderBean) getDao().queryForObject(
					"dymCommonOrder.selectMaxBgCardTxm", map, orderBean.class);
			maxLifeTxmNum = oBean.getBh();
		} else if (orderType.equals(METREC_TXM) && maxMetrecTxmNum == null) {
			// 现代信息条形码
			System.out.println(SqlUtil.getSql(
					"dymCommonOrder.selectMaxXdCardTxm", map).getSql());
			oBean = (orderBean) getDao().queryForObject(
					"dymCommonOrder.selectMaxXdCardTxm", map, orderBean.class);
			maxMetrecTxmNum = oBean.getBh();
		} else if (orderType.equals(VEHICLE_TXM) && maxVehicleTxmNum == null) {
			oBean = (orderBean) getDao().queryForObject(
					"dymCommonOrder.selectMaxVhCardTxm", map, orderBean.class);
			maxVehicleTxmNum = oBean.getBh();
			// (实验教学 xyk 2013-7-29)
		} else if (orderType.equals(ORDER_TEMP_ARTICLE)
				&& maxTempArticleOrderNum == null) {
			oBean = (orderBean) getDao().queryForObject(
					"dymCommonOrder.selectMaxTempArticleTxm", map,
					orderBean.class);
			maxTempArticleOrderNum = oBean.getBh();
		}
	}

	/**
	 * 
	 * 
	 * <p>
	 * Title：最大编号实体描述
	 * </p>
	 * <p>
	 * Description：
	 * </p>
	 * <p>
	 * Author :唐伟 2013-05-27
	 * </p>
	 * <p>
	 * Department : 平台
	 * </p>
	 */
	public static class orderBean {
		private Integer bh;

		public Integer getBh() {
			return bh;
		}

		public void setBh(Integer bh) {
			this.bh = bh;
		}

	}

	/**
	 * 
	 * <p>
	 * 作用描述：批量生成条形码
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param count 生成的条形码个数
	 * @return
	 *
	 */
	public static List<String> genTxm(int count) {
		if (count < 1) {
			return null;
		}
		List<String> list = new ArrayList<String>();
		for (int i = 0; i < count; i++) {
			list.add(UUID.randomUUID().toString());
		}
		return list;
	}

	/**
	 * 
	 * <p>
	 * 作用描述：获取dao方法
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @return
	 * 
	 */
	private static BaseJdbcDao getDao() {
		return (BaseJdbcDao) SpringContextUtil.getBean(SpringBeanId.DAO);
	}
}
