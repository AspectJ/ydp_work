package com.common.queue;

import java.util.List;

import com.common.constant.SpringBeanId;
import com.common.util.CacheUtil;

/**
 * 
 * <p>
 * Title：队列管理器
 * </p>
 * <p>
 * Description：
 * </p>
 * <p>
 * Author :唐伟 2013-12-23
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */
public class QueueManage {

	public static int tm = 50000;

	/**
	 * <p>
	 * 作用描述：执行任务,需要启动队列自动处理机制的任务,通过本execute方法来加入队列，而不是直接put进队列
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param queueName
	 *            队列名
	 * @param task
	 *            任务
	 * @return 任务执行结果状态 0:失败状态 1:成功状态 2:待处理状态
	 * 
	 */
	public static String execute(String queueName, IQueueTask task) {
		String state = QueueConstant.EXE_FAIL;
		Queue q = createQueue(queueName);
		state = q.execute(task);
		return state;
	}

	/**
	 * 
	 * <p>
	 * 作用描述： 查询错误信息
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param queueName
	 *            队列名
	 * @param queueId
	 *            任务
	 * @return 失败的任务对象
	 * 
	 */
	public static IQueueTask getFailTask(String queueName, String queueId) {
		Queue q = (Queue) CacheUtil.get(SpringBeanId.CACHE_QUEUE, queueName);
		if (null == q) {
			return null;
		}
		List<IQueueTask> list = q.failList;
		for (IQueueTask iq : list) {
			if (iq.contain(queueId)) {
				q.failList.remove(iq);
				return iq;
			}
		}
		return null;
	}

	/**
	 * 
	 * <p>
	 * 作用描述：判断队列中是否已存在重复的队列任务
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param queueName
	 *            队列名
	 * @param queueId
	 *            队列id
	 * @return true存在，false不存在
	 * 
	 */
	public static boolean contain(String queueName, String queueId) {
		Queue q = (Queue) CacheUtil.get(SpringBeanId.CACHE_QUEUE, queueName);
		if (null == q) {
			return false;
		}
		List<IQueueTask> list = q.list;
		for (IQueueTask iq : list) {
			if (iq.contain(queueId)) {
				return true;
			}
		}
		List<IQueueTask> runList = q.runList;
		for (IQueueTask iq : runList) {
			if (iq.contain(queueId)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * <p>
	 * 作用描述：往队列中加任务，通过此方式加入队列的任务，仅作为队列容器，而不会启动队列任务自动执行功能，如需自动执行请使用execute方法
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param queueName
	 *            队列名
	 * @param queueId
	 *            队列唯一标识字符串
	 * @param task
	 *            队列任务对象
	 * @return 加任务是否成功标识，true:成功 false:失败(已存在该任务)
	 * 
	 */
	public synchronized static boolean put(String queueName, String queueId,
			IQueueTask task) {
		Queue q = (Queue) CacheUtil.get(SpringBeanId.CACHE_QUEUE, queueName);
		if (q == null) {
			q = createQueue(queueName);
		}
		if (!contain(queueName, queueId)) {
			q.list.add(task);
			CacheUtil.put(SpringBeanId.CACHE_QUEUE, queueName, q);
			return true;
		}
		return false;
	}

	/**
	 * <p>
	 * 作用描述：移除队列任务，通过put进队列的任务对象执行完成后续使用本方法来从队列中移除，使用自动执行模式的将会在执行完成后自动从队列中移除，
	 * 无需调用本方法移除
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param queueName
	 *            队列名
	 * @param task
	 *            队列任务对象
	 * @return 移除任务是否成功标识，true:成功 false:失败(队列不存在)
	 * 
	 */
	public synchronized static boolean remove(String queueName, IQueueTask task) {
		Queue q = (Queue) CacheUtil.get(SpringBeanId.CACHE_QUEUE, queueName);
		if (q == null) {
			return false;
		}
		return q.list.remove(task);
	}

	/**
	 * <p>
	 * 作用描述：判断队列队形是否存在
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param queueName
	 *            队列名
	 * @return 队列队形
	 * 
	 */
	private static synchronized Queue createQueue(String queueName) {
		Queue q = (Queue) CacheUtil.get(SpringBeanId.CACHE_QUEUE, queueName);
		if (null == q) {
			q = new Queue();
			q.setQueName(queueName);
			CacheUtil.put(SpringBeanId.CACHE_QUEUE, queueName, q);
		}
		return q;
	}

}
