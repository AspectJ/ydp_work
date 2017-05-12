package com.service.login.impl;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.common.constant.SpringBeanId;
import com.common.constant.SystemConstant;
import com.common.constant.TypeConstant;
import com.common.constant.UserConstant;
import com.common.constant.UserType;
import com.common.dp.Param;
import com.common.session.ISession;
import com.common.session.SessionManager;
import com.common.util.CacheUtil;
import com.service.BaseService;
import com.service.IService;
import com.service.login.entity.User;
import com.service.login.entity.UserMenu;

/**
 * 
 * <p>
 * Title：
 * </p>
 * <p>
 * Description：2014
 * </p>
 * <p>
 * Author : 2014-4-1
 * </p>
 * <p>
 * Department :
 * </p>
 */
public class LoginService extends BaseService implements IService {

	/**
	 * 失败次数(达到该失败次数则根据限制策略限制其再登录)
	 */
	public int failTimes;

	/**
	 * 限制策略(1：用户名 2：IP地址 3：用户名和IP地址)
	 */
	public int restrictPolicy;

	/**
	 * 限制登陆时长
	 */
	public int restrictTime = 0;

	/**
	 * 限制策略1 (用户名)
	 */
	private static final int POLICY_USER = 1;

	/**
	 * 限制策略2 (IP地址)
	 */
	private static final int POLICY_IP = 2;

	/**
	 * 限制策略3 (用户名和IP地址)
	 */
	private static final int POLICY_USER_IP = 3;

	@SuppressWarnings("unchecked")
	@Transactional
	public void service(Param pm) throws Exception {
		String data = (String) pm.getData();
		int dataPackType = pm.getDataFormat();
		if (SystemConstant.jsonType == dataPackType) {
			JSONObject json = JSON.parseObject(data);
			String userName = json.getString("loginuser");
			String passWord = json.getString("loginpwd");

			// 将登录信息放在map中
			Map<String, Object> messMap = new HashMap<String, Object>();
			// 1.检查用户名或密码是否为空
			if (null == userName || "".equals(userName) || null == passWord
					|| "".equals(passWord) || null == userName.trim()
					|| "".equals(userName.trim())) {
				userName = userName.trim();// 去除登录用户的空格
				messMap.put("error", "用户名和密码不能为空!");
				messMap.put(TypeConstant.SF, TypeConstant.FAIL);
				messMap.put(TypeConstant.SHOW_MSG, "用户名和密码不能为空!");
				pm.setData(messMap);
				return;
			}

			// 2.检查该用户名或IP是否被限制登录
			String ip = pm.getIp();
			if (isRestrict(userName, ip)) {
				messMap.put("error", "用户已被限制登录，请" + restrictTime + "分钟后再尝试登录!");
				messMap.put(TypeConstant.SF, TypeConstant.FAIL);
				messMap.put(TypeConstant.SHOW_MSG, "用户已被限制登录，请" + restrictTime
						+ "分钟后再尝试登录!");
				pm.setData(messMap);
				return;
			}

			// 3.检查用户名、密码是否正确
			String sqlId = "";
			String operType = json.getString("operType");
			String userType = "";
			if (null == operType || "".equals(operType)) {
				messMap.put(TypeConstant.SF, TypeConstant.FAIL);
				messMap.put(TypeConstant.SHOW_MSG, "操作类型错误，请联系系统管理员!");
				pm.setData(messMap);
				return;
			} else if (operType.equals("pt")) {// 平台
				sqlId = "login.checkUser";
				userType = UserType.PT;
			} else if(operType.equals("spy")){
				sqlId = "login.checkSpy";
				userType = UserType.SPY;
			}else{
				messMap.put(TypeConstant.SF, TypeConstant.FAIL);
				messMap.put(TypeConstant.SHOW_MSG, "操作类型错误，请联系系统管理员!");
				pm.setData(messMap);
				return;
			}
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("username", userName);
			map.put("password", passWord);
			List<User> list = getDao().query(sqlId, map, User.class);

			if (list != null && list.size() > 0) {

				// 取消该用户名及IP地址在限制队列中的记录
				CacheUtil.remove(SpringBeanId.CACHE_LOGINFAILED, userName);
				if (restrictPolicy != 1 && null != ip && !"".equals(ip)) {
					CacheUtil.remove(SpringBeanId.CACHE_LOGINFAILED, ip);
				}

				// 用户菜单List
				final User u = list.get(0);
				
				// 将用户相关数据写到Session中
				ISession session = SessionManager.createSession();
				if (userType.equals(UserType.PT)) {
					map.put("yhid", u.getYhid());
					List<UserMenu> userMenuList = null;
					userMenuList = getDao().query("login.getUserMenu", map,
							UserMenu.class);
					session.setAttribute(UserConstant.USER_XTID, u.getYhid());
					session.setAttribute(UserConstant.DLZH, userName);
					session.setAttribute(UserConstant.YHNC, u.getYhnc());
					session.setAttribute(UserConstant.MENU_LIST, userMenuList);
					if (userType.equals(UserType.PT)) {
						messMap.put("success", "success");
						session.setAttribute("sjhm", u.getSjhm());// 手机号码
						session.setAttribute("yhlx", UserType.PT);
					}
					session.setAttribute("hxid", u.getYhid().toLowerCase());// 环信ID
					final String sid = session.getSessionId();
					pm.setSessionId(sid);
					pm.setSession(session);
					SessionManager.addSession(session);
				}else if(userType.equals(UserType.SPY)){
					map.put("yhid", u.getXtid());
					List<UserMenu> userMenuList = null;
					userMenuList = getDao().query("login.getUserMenu", map,
							UserMenu.class);
					session.setAttribute(UserConstant.USER_XTID, u.getYhid());
					session.setAttribute(UserConstant.DLZH, userName);
					session.setAttribute(UserConstant.YHNC, u.getYhnc());
					session.setAttribute(UserConstant.MENU_LIST, userMenuList);
					
					session.setAttribute(UserConstant.USER_XTID, u.getXtid());
					session.setAttribute(UserConstant.DLZH, userName);
					session.setAttribute("tele", u.getTele());
					session.setAttribute("realname", u.getRealname());
					session.setAttribute("tx", u.getTxurl());
					session.setAttribute("jssj", SystemConstant.jssj);//座位解锁时间
					session.setAttribute("payboxid", u.getPayboxid());//售票机构ID
					final String sid = session.getSessionId();
					pm.setSessionId(sid);
					pm.setSession(session);
					SessionManager.addSession(session);
				}

				// 记录登录日志
//				final String utype = userType;
//				getDao().getJdbcTemplate().update(
//						SqlUtil.getSql("login.insertLoginLog", null).getSql(),
//						new PreparedStatementSetter() {
//							public void setValues(PreparedStatement ps)
//									throws SQLException {
//								ps.setObject(1, IdUtil.createThirteenId());
//								ps.setObject(2, u.getYhid());
//								ps.setObject(3, utype);
//								ps.setObject(4, "0");
//								ps.setObject(5, "0");
//								ps.setObject(6, DateUtil.getNowTimestamp());
//								ps.setObject(7, sid);
//							}
//						});

				messMap.put("session", session);
				messMap.put("imgurl", SystemConstant.imgurl);// 图片服务器访问地址
				messMap.put(TypeConstant.SF, TypeConstant.SUCCESS);
				messMap.put(TypeConstant.SHOW_MSG, "登录成功");
				pm.setData(messMap);
				return;
			} else {

				// 用户不存在或密码错误 则根据限制策略记录其失败次数
				int err = restrictLogin(userName, ip);
				messMap.put("error", "用户不存在或密码错误【错误超过" + failTimes + "次您将被锁定"
						+ restrictTime + "分钟，您还可以尝试" + (failTimes - err)
						+ "次。】");
				messMap.put(TypeConstant.SF, TypeConstant.FAIL);
				messMap.put(TypeConstant.SHOW_MSG, "用户不存在或密码错误【错误超过"
						+ failTimes + "次您将被锁定" + restrictTime + "分钟，您还可以尝试"
						+ (failTimes - err) + "次。】");
				pm.setData(messMap);
				return;
			}
		}
	}

	private void insertLoginLog() {
		// 只有APP用户做自动登录处理

	}

	/**
	 * <p>
	 * 作用描述：根据限制策略记录登录用户或IP的失败次数
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param userName
	 *            用户名
	 * @param ip
	 *            IP地址
	 */
	private Integer restrictLogin(String userName, String ip) {
		Integer errorTime = null;
		if (restrictPolicy == POLICY_USER) {
			errorTime = (Integer) CacheUtil.get(SpringBeanId.CACHE_LOGINFAILED,
					userName);
			if (null != errorTime) {
				errorTime += 1;
				if (errorTime >= failTimes) {
					CacheUtil.put(SpringBeanId.CACHE_LOGINRESTRICT, userName,
							Calendar.getInstance());
					CacheUtil.remove(SpringBeanId.CACHE_LOGINFAILED, userName);
				} else {
					CacheUtil.put(SpringBeanId.CACHE_LOGINFAILED, userName,
							errorTime);
				}
			} else {
				errorTime = 1;
				CacheUtil.put(SpringBeanId.CACHE_LOGINFAILED, userName,
						errorTime);
			}
		} else if (restrictPolicy == POLICY_IP) {
			if (ip != null && !ip.equals("")) {
				errorTime = (Integer) CacheUtil.get(
						SpringBeanId.CACHE_LOGINFAILED, ip);
				if (null != errorTime) {
					errorTime += 1;
					if (errorTime >= failTimes) {
						CacheUtil.put(SpringBeanId.CACHE_LOGINRESTRICT, ip,
								Calendar.getInstance());
						CacheUtil.remove(SpringBeanId.CACHE_LOGINFAILED, ip);
					} else {
						CacheUtil.put(SpringBeanId.CACHE_LOGINFAILED, ip,
								errorTime);
					}
				} else {
					errorTime = 1;
					CacheUtil
							.put(SpringBeanId.CACHE_LOGINFAILED, ip, errorTime);
				}
			}
		} else if (restrictPolicy == POLICY_USER_IP) {
			errorTime = (Integer) CacheUtil.get(SpringBeanId.CACHE_LOGINFAILED,
					userName);
			if (null != errorTime) {
				errorTime += 1;
				if (errorTime >= failTimes) {
					CacheUtil.put(SpringBeanId.CACHE_LOGINRESTRICT, userName,
							Calendar.getInstance());
					CacheUtil.remove(SpringBeanId.CACHE_LOGINFAILED, userName);
				} else {
					CacheUtil.put(SpringBeanId.CACHE_LOGINFAILED, userName,
							errorTime);
				}
			} else {
				errorTime = 1;
				CacheUtil.put(SpringBeanId.CACHE_LOGINFAILED, userName,
						errorTime);
			}

			if (ip != null && !ip.equals("")) {
				errorTime = (Integer) CacheUtil.get(
						SpringBeanId.CACHE_LOGINFAILED, ip);
				if (null != errorTime) {
					errorTime += 1;
					if (errorTime >= failTimes) {
						CacheUtil.put(SpringBeanId.CACHE_LOGINRESTRICT, ip,
								Calendar.getInstance());
						CacheUtil.remove(SpringBeanId.CACHE_LOGINFAILED, ip);
					} else {
						CacheUtil.put(SpringBeanId.CACHE_LOGINFAILED, ip,
								errorTime);
					}
				} else {
					errorTime = 1;
					CacheUtil
							.put(SpringBeanId.CACHE_LOGINFAILED, ip, errorTime);
				}
			}
		}
		return errorTime;
	}

	/**
	 * <p>
	 * 作用描述：根据限制策略判断登录的用户或IP地址是否已经被限制
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param userName
	 *            用户名
	 * @param ip
	 *            IP地址
	 * @return true:被限制,false：未被限制
	 */
	private boolean isRestrict(String userName, String ip) {
		boolean flag = false;
		Calendar currentCalendar = Calendar.getInstance();
		currentCalendar.add(Calendar.MINUTE, -restrictTime);
		if (restrictPolicy == POLICY_USER) {
			Calendar beginCalendar = (Calendar) CacheUtil.get(
					SpringBeanId.CACHE_LOGINRESTRICT, userName);
			if (null != beginCalendar) {
				if (!currentCalendar.after(beginCalendar)) {
					flag = true;
				} else {
					CacheUtil
							.remove(SpringBeanId.CACHE_LOGINRESTRICT, userName);
				}
			}
		} else if (restrictPolicy == POLICY_IP) {
			if (!flag && ip != null && !ip.equals("")) {
				Calendar beginCalendar = (Calendar) CacheUtil.get(
						SpringBeanId.CACHE_LOGINRESTRICT, ip);
				if (null != beginCalendar) {
					if (!currentCalendar.after(beginCalendar)) {
						flag = true;
					} else {
						CacheUtil.remove(SpringBeanId.CACHE_LOGINRESTRICT, ip);
					}
				}
			}
		} else if (restrictPolicy == POLICY_USER_IP) {
			Calendar beginCalendar = (Calendar) CacheUtil.get(
					SpringBeanId.CACHE_LOGINRESTRICT, userName);
			if (null != beginCalendar) {
				if (!currentCalendar.after(beginCalendar)) {
					flag = true;
				} else {
					CacheUtil
							.remove(SpringBeanId.CACHE_LOGINRESTRICT, userName);
				}
			}

			if (!flag && ip != null && !ip.equals("")) {
				beginCalendar = (Calendar) CacheUtil.get(
						SpringBeanId.CACHE_LOGINRESTRICT, ip);
				if (null != beginCalendar) {
					if (!currentCalendar.after(beginCalendar)) {
						flag = true;
					} else {
						CacheUtil.remove(SpringBeanId.CACHE_LOGINRESTRICT, ip);
					}
				}
			}
		}
		return flag;
	}

	public int getFailTimes() {
		return failTimes;
	}

	public void setFailTimes(int failTimes) {
		this.failTimes = failTimes;
	}

	public int getRestrictPolicy() {
		return restrictPolicy;
	}

	public void setRestrictPolicy(int restrictPolicy) {
		this.restrictPolicy = restrictPolicy;
	}

	public int getRestrictTime() {
		return restrictTime;
	}

	public void setRestrictTime(int restrictTime) {
		this.restrictTime = restrictTime;
	}

	public void install() {
		// TODO Auto-generated method stub
	}

	public void unInstall() {
		// TODO Auto-generated method stub
	}

}
