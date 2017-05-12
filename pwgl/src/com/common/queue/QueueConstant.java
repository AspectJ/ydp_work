package com.common.queue;

/**
 * 
 * <p>
 * Title：队列管理常量类
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
public class QueueConstant {

	/**
	 * 减少正在执行任务数
	 */
	public static final String TYPE_REDUCE = "reduce";

	/**
	 * 增加正在执行任务数
	 */
	public static final String TYPE_INCREASE = "increase";

	/**
	 * 默认允许最大同时执行任务数
	 */
	public static final int DETAULT_MAXSIZE = 10;

	/**
	 * 默认循环待处理队列频率，单位为毫秒
	 */
	public static final int DETAULT_WAITTIME = 1000;

	/**
	 * 待处理队列定时器启动状态
	 */
	public static final boolean STATE_RUN = true;

	/**
	 * 待处理队列定时器未启动状态
	 */
	public static final boolean STATE_STOP = false;

	/**
	 * 任务执行状态--失败状态
	 */
	public static final String EXE_FAIL = "0";

	/**
	 * 任务执行状态--成功状态
	 */
	public static final String EXE_SUCC = "1";

	/**
	 * 任务执行状态--待处理状态
	 */
	public static final String EXE_WAIT = "2";
	
	/**
	 * 任务执行状态--已存在状态
	 */
	public static final String EXE_EXISTS = "3";
	
	/**
	 * 记录失败队列任务数，超出队列按先进先出机制推出队列
	 */
	public static final int FAIL_SIZE = 5000;

}
