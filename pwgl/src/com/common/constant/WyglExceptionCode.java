package com.common.constant;

/**
 * <p>
 * Title：异常代码
 * </p>
 * <p>
 * Description：异常代码定义
 * </p>
 * <p>
 * Author :彭彩红 2012-5-2
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */
public class WyglExceptionCode {
	
	/**
	 * 文件上传异常
	 */
	public static final String UPLOAD_FILE_ERROR = "DP-01101";

	// excel解析模块begin

	/**
	 * 错误的excel文件
	 */
	public static final String NOT_EXCEL_TYPE_ERROR = "DP-01201";

	/**
	 * excel文件不存在
	 */
	public static final String EXCEL_NOT_EXIST = "DP-01202";

	/**
	 * excel文件大小不合适
	 */
	public static final String EXCEL_SIZE_ERROR = "DP-01203";

	/**
	 * 没有找到对应的excel解析规则
	 */
	public static final String PARSE_RULE_NOT_FOUND = "DP-01204";

	/**
	 * 加载rule.xml文件失败
	 */
	public static final String LOAD_RULE_ERROR = "DP-01205";

	/**
	 * EXCEL导出异常
	 */
	public static final String EXCEL_EXP_ERROR = "DP-01206";

	/**
	 * 配置不能为空，EXCEL文件中确为空
	 */
	public static final String EXCEL_EMPTY_ERROR = "DP-01207";

	// excel解析模块end

	/**
	 * 队列管理，减少当前正在执行任务数时，发现正在执行任务数为0异常
	 */
	public static final String QUEUE_THREADSLEEP_ERROR = "LYET-19001";

	/**
	 * 队列管理，队列任务执行时发生异常
	 */
	public static final String QUEUE_EXECUTE_ERROR = "LYET-19002";

	/**
	 * 远程文件读取异常
	 */
	public static final String REMOTEFILE_READ_ERROR = "LYET-20001";

	/**
	 * 远程文件写入异常
	 */
	public static final String REMOTEFILE_WRITE_ERROR = "LYET-20002";

	/**
	 * 远程文件删除异常
	 */
	public static final String REMOTEFILE_DELETE_ERROR = "LYET-20003";

	/**
	 * 获取服务器IP地址异常
	 */
	public static final String GET_SERVERIP_ERROR = "LYET-20004";

	/**
	 * 被限制登录异常
	 */
	public final static String LOGIN_RESTRICT = "LYET-01601";

}
