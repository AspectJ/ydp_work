package com.common.filter.impl;

import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import com.common.dp.Param;
import com.common.exception.DpException;
import com.common.filter.IFilter;
import com.common.util.SpringContextUtil;

/**
 * 
 * <p>
 * Title：日志管理过滤器
 * </p>
 * <p>
 * Description：日志管理过滤器
 * </p>
 * <p>
 * Author : 2015-12-21
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */
public class LogWriterFilter implements IFilter {

	@Override
	public void doFilter(Param pm) throws Exception {

//		LogRunner lr = new LogRunner(pm);
		// 当一个任务通过execute(Runnable)方法欲添加到线程池时：
		// 1、 如果此时线程池中的数量小于corePoolSize，即使线程池中的线程都处于空闲状态，也要创建新的线程来处理被添加的任务。
		// 2、 如果此时线程池中的数量等于 corePoolSize，但是缓冲队列 workQueue未满，那么任务被放入缓冲队列。
		// 3、如果此时线程池中的数量大于corePoolSize，缓冲队列workQueue满，并且线程池中的数量小于maximumPoolSize，建新的线程来处理被添加的任务。
		// 4、
		// 如果此时线程池中的数量大于corePoolSize，缓冲队列workQueue满，并且线程池中的数量等于maximumPoolSize，那么通过
		// handler所指定的策略来处理此任务。也就是：处理任务的优先级为：核心线程corePoolSize、任务队列workQueue、最大线程
		// maximumPoolSize，如果三者都满了，使用handler处理被拒绝的任务。
		// 5、 当线程池中的线程数量大于
		// corePoolSize时，如果某线程空闲时间超过keepAliveTime，线程将被终止。这样，线程池可以动态的调整池中的线程数。
		try {
//			ThreadPoolTaskExecutor poolTaskExecutor = (ThreadPoolTaskExecutor) SpringContextUtil
//					.getBean("taskExecutor");
//			System.out.println("日志活动线程数：" + poolTaskExecutor.getActiveCount());
//			poolTaskExecutor.execute(lr);
		} catch (Exception e) {
			throw new DpException("", e);
		}
	}

}
