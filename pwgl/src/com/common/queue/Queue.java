package com.common.queue;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.common.constant.WyglExceptionCode;
import com.common.exception.DpException;

/**
 * 
 * 
 * <p>
 * Title：队列
 * </p>
 * <p>
 * Description：队列
 * </p>
 * <p>
 * Author :tw 2013-12-23
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */
public class Queue implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8318001021839150243L;

	/**
	 * 队列标识、队列名
	 */
	String queName;

	/**
	 * 待处理队列
	 */
	List<IQueueTask> list = new ArrayList<IQueueTask>();

	/**
	 * 处理失败队列
	 */
	List<IQueueTask> failList = new ArrayList<IQueueTask>();

	/**
	 * 正在执行队列
	 */
	List<IQueueTask> runList = new ArrayList<IQueueTask>();

	/**
	 * 正在执行任务数
	 */
	private int runCount = 0;

	/**
	 * 允许同时执行任务数
	 */
	public int maxCount = QueueConstant.DETAULT_MAXSIZE;

	/**
	 * 循环待处理队列频率，单位为毫秒
	 */
	public int waitTime = QueueConstant.DETAULT_WAITTIME;

	/**
	 * 定时线程是否启动，true：已启动 false：未启动
	 */
	private boolean runState = false;

	/**
	 * <p>
	 * 作用描述：执行队列任务
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param task
	 *            队列任务对象
	 * @return 0:执行失败 1:执行成功 2:已加入队列，待执行
	 * 
	 */
	public String execute(IQueueTask task) {
		String state = QueueConstant.EXE_FAIL;

		// 新增任务，首先看是否可以直接加到允许队列中去，否则将任务放到待处理队列
		state = increase(task);
		if (state.equals(QueueConstant.EXE_SUCC)) {
			try {
				state = task.execute();
				if (null != state && state.equals(QueueConstant.EXE_FAIL)) {
					if (failList.size() >= QueueConstant.FAIL_SIZE) {
						failList.remove(0);
					}
					failList.add(task);
				}
			} catch (Exception e) {
				throw new DpException(WyglExceptionCode.QUEUE_EXECUTE_ERROR, e);
			} finally {

				// 任务执行完后，不管成功、失败均减少正在执行队列
				runList.remove(task);
				reduce();
			}
		}
		return state;
	}

	/**
	 * <p>
	 * 作用描述：减少正在执行的任务数
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @return true:表示执行成功 false:表示执行失败
	 */
	public synchronized boolean reduce() {
		return manageQueue(QueueConstant.TYPE_REDUCE);
	}

	/**
	 * <p>
	 * 作用描述：增加正在执行的任务数
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @return true:表示执行成功 false:表示执行失败
	 */
	public synchronized boolean increase() {
		return manageQueue(QueueConstant.TYPE_INCREASE);
	}

	/**
	 * <p>
	 * 作用描述：增加正在执行的任务数
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @return 任务状态 true:表示执行成功 false:表示执行失败
	 */
	public synchronized String increase(IQueueTask task) {
		String queueId = task.getTaskUniqId();
		for (IQueueTask iq : this.list) {
			if (iq.contain(queueId)) {
				return QueueConstant.EXE_EXISTS;
			}
		}
		for (IQueueTask iq : this.runList) {
			if (iq.contain(queueId)) {
				return QueueConstant.EXE_EXISTS;
			}
		}
		if (increase()) {
			runList.add(task);
			return QueueConstant.EXE_SUCC;
		} else {
			list.add(task);
			timer();
			return QueueConstant.EXE_WAIT;
		}
	}

	/**
	 * <p>
	 * 作用描述：队列管理
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param type
	 *            reduce:减正在执行任务数 increase:加正在执行任务数
	 * 
	 * @return true:表示执行成功 false:表示执行失败
	 * 
	 */
	private synchronized boolean manageQueue(String type) {
		boolean flag = false;
		if (type.equals(QueueConstant.TYPE_REDUCE)) {
			if (this.runCount > 0) {
				this.runCount = this.runCount - 1;
				flag = true;
			} else {
				flag = false;
				// throw new DpException(WyglExceptionCode.QUEUE_RUNCOUNT_ZERO,
				// null);
			}
		} else if (type.equals(QueueConstant.TYPE_INCREASE)) {
			if (this.runCount < this.maxCount) {
				this.runCount = this.runCount + 1;
				flag = true;
			} else {
				flag = false;
			}
		}
		return flag;
	}

	/**
	 * <p>
	 * 作用描述：定时器，定时执行待处理队列的任务
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * 
	 */
	private synchronized void timer() {
		if (!runState) {
			startTimer();
			changeRunState(QueueConstant.STATE_RUN);
		}
	}

	/**
	 * <p>
	 * 作用描述：启动定时处理线程
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * 
	 */
	private void startTimer() {
		QueueTimer qt = new QueueTimer();
		Thread t = new Thread(qt);
		t.start();
	}

	/**
	 * <p>
	 * 作用描述：获得待处理队列任务
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @return
	 * 
	 */
	private synchronized IQueueTask getQueueTask() {
		IQueueTask it = null;
		it = list.get(0);
		return it;
	}

	private synchronized void changeRunState(boolean state) {
		this.runState = state;
	}

	public String getQueName() {
		return queName;
	}

	public void setQueName(String queName) {
		this.queName = queName;
	}

	public List<IQueueTask> getList() {
		return list;
	}

	public void setList(List<IQueueTask> list) {
		this.list = list;
	}

	public int getMaxCount() {
		return maxCount;
	}

	public void setMaxCount(int maxCount) {
		this.maxCount = maxCount;
	}

	public int getWaitTime() {
		return waitTime;
	}

	public void setWaitTime(int waitTime) {
		this.waitTime = waitTime;
	}

	/**
	 * 
	 * <p>
	 * Title：待处理队列，任务执行线程，单线程处理
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
	class QueueTimer implements Runnable {

		@Override
		public void run() {
			changeRunState(QueueConstant.STATE_RUN);

			// 待处理队列大于0，则执行队列任务
			while (list.size() > 0) {

				// 当开启队列任务成功
				if (increase()) {
					IQueueTask task = getQueueTask();
					if (null != task) {
						try {
							runList.add(task);
							String state = task.execute();

							// 将失败任务写入到失败队列中
							if (null != state
									&& state.equals(QueueConstant.EXE_FAIL)) {
								if (failList.size() >= QueueConstant.FAIL_SIZE) {
									failList.remove(0);
								}
								failList.add(task);
							}
						} catch (Exception e) {
							throw new DpException(
									WyglExceptionCode.QUEUE_EXECUTE_ERROR, e);
						} finally {

							// 任务执行完后，不管成功、失败均减少正在执行队列
							list.remove(task);
							runList.remove(task);
							reduce();
						}
					}
				} else {
					try {
						Thread.currentThread().sleep(waitTime);
					} catch (InterruptedException e) {
						throw new DpException(
								WyglExceptionCode.QUEUE_THREADSLEEP_ERROR, e);
					}
				}
			}
			changeRunState(QueueConstant.STATE_STOP);
		}
	}

}
