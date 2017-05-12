package com.service.api.impl;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.common.exception.DpException;
import com.common.util.DaoUtil;
import com.common.util.DateUtil;
import com.service.api.entity.TimeLockOrder;

/**
 * 锁座位30s定时器
 * 
 * @author Administrator
 * 
 */
@Component
public class ApiLockSeatService {
	public static String mainStr = "";

	/**
	 * cron表达式：* * * * * *（共6位，使用空格隔开，具体如下） cron表达式：*(秒0-59) *(分钟0-59) *(小时0-23)
	 * *(日期1-31) *(月份1-12或是JAN-DEC) *(星期1-7或是SUN-SAT)
	 */
	@Transactional(rollbackFor = Exception.class)
	@Scheduled(cron = "0 0/30 * * * *")
	public void query() {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sc", "0.5");// 半个小时
			@SuppressWarnings("unchecked")
			List<TimeLockOrder> list = DaoUtil.getDao().query(
					"timer.selectQrshByTime", map, TimeLockOrder.class);
			if (null != list && list.size() > 0 && !list.isEmpty()) {
				final Timestamp tt = DateUtil.getNowTimestamp();
				for (TimeLockOrder tobj : list) {

					// 修改订单的状态--释放座位
					String orderid = tobj.getOrderid();
					map.put("unlocktime", tt);
					map.put("orderid", orderid);
					DaoUtil.getDao().update("apiorder.updateOrderu", map);

					// 修改操作明细
					map.clear();
					map.put("optime", DateUtil.getNowTimestamp());
					map.put("orderid", orderid);
					DaoUtil.getDao().update("apiorder.updateOrderOper", map);

					// 根据订单Id查询座位
					List<TimeLockOrder> zwList = DaoUtil.getDao().query(
							"timer.queryZws", map, TimeLockOrder.class);
					if (null != zwList && zwList.size() > 0
							&& !zwList.isEmpty()) {
						for (TimeLockOrder zwbj : zwList) {
							String zwid = zwbj.getPewid();

							// 修改座位状态
							map.put("pewstatus", "1");// 1可售，2不可售 3已售
							map.put("pewid", zwid);
							DaoUtil.getDao().update("apiorder.updateZwStatus",
									map);

						}
					}
				}
			}

		} catch (Exception e) {
			throw new DpException("系统自动释放座位失败！", e);
		}
	}
}
