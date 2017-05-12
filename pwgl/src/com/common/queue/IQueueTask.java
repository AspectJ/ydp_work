package com.common.queue;

import java.io.Serializable;

/**
 * 
 * <p>
 * Title：队列任务对象，任务执行所需的所有属性都在该对象中，本接口提供一个执行任务方法供具体任务实现
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
public interface IQueueTask extends Serializable{

	/**
	 * <p>
	 * 作用描述：执行队列任务
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @return 0:执行失败 1:执行成功 2:已加入队列，待执行
	 * 
	 */
	String execute();

	/**
	 * 
	 * <p>
	 * 作用描述：判断队列中是否存在重复的队列任务
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param queueId
	 *            队列的id
	 * @return true存在，false不存在
	 * 
	 */
	boolean contain(String queueId);

	/**
	 * <p>
	 * 作用描述：获取错误消息
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @return
	 * 
	 */
	String getFailMsg();

	/**
	 * <p>
	 * 作用描述：获取任务对象唯一标识
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @return 任务对象唯一标识，字符串
	 * 
	 */
	String getTaskUniqId();

}
