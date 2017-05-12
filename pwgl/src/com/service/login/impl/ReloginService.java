package com.service.login.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.common.constant.ExceptionCode;
import com.common.constant.SystemConstant;
import com.common.constant.UserConstant;
import com.common.constant.UserType;
import com.common.dp.Param;
import com.common.exception.DpException;
import com.common.session.ISession;
import com.common.session.SessionManager;
import com.common.util.DateUtil;
import com.service.BaseService;
import com.service.IService;
import com.service.login.entity.Relogin;
import com.service.login.entity.User;

/**
 * 
 * <p>
 * Title：自动重登录
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
@Component
public class ReloginService extends BaseService implements IService {

	@Transactional(rollbackFor = Exception.class)
	public void service(Param pm) throws Exception {
		int dataPackType = pm.getDataFormat();
		if (SystemConstant.jsonType == dataPackType) {

			// 根据失效的sessionId查询用户信息，如果查到了就自动创建新的SESSION，且SESSIONID为原SESSIONID，暂不考虑生成新的，后续再根据需要考虑生成新的SESSIONID
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sid", pm.getSessionId());
			Relogin rl = (Relogin) getDao().queryForObject(
					"login.selectLoginLog", map, Relogin.class);
			if (rl != null) {
				String sqlId = "";
				String userType = rl.getYhlx();
				if (userType.equals(UserType.PT)) {// 平台PC端用户
					pm.setRewriteMsg(true);
					pm.setData(ExceptionCode.NOT_LOGIN_OR_EXPIRED);
					throw new DpException(ExceptionCode.NOT_LOGIN_OR_EXPIRED,
							null);
				} else if (userType.equals(UserType.YH)) {// 用户端用户
					sqlId = "login.checkyhBySid";
				} else if (userType.equals(UserType.JMS)) {// 加盟商端
					sqlId = "login.checkjmsBySid";
				} else {
					pm.setRewriteMsg(true);
					pm.setData(ExceptionCode.NOT_LOGIN_OR_EXPIRED);
					throw new DpException(ExceptionCode.NOT_LOGIN_OR_EXPIRED,
							null);
				}
				map.put("xtid", rl.getXtid());
				@SuppressWarnings("unchecked")
				List<User> list = getDao().query(sqlId, map, User.class);
				if (list != null && list.size() > 0) {
					final User u = list.get(0);
					String sfFwjgFzr = "0";// 0：表示为不是服务机构负责人 1：表示为服务机构负责人
					if (userType.equals(UserType.JMS)) {
						@SuppressWarnings("unchecked")
						List<String> jsmList = getDao().querySingleColumnList(
								"apiorder.selectPdQx", map, String.class);
						if (null != jsmList && jsmList.size() > 0) {
							sfFwjgFzr = "1";
						}
					}
					ISession session = SessionManager.createSession(pm
							.getSessionId());
					session.setAttribute(UserConstant.USER_XTID, u.getYhid());
					session.setAttribute(UserConstant.DLZH, u.getUserName());
					session.setAttribute(UserConstant.YHNC, u.getYhnc());
					session.setAttribute("tx", u.getTx());// 头像
					session.setAttribute("hxid", u.getYhid().toLowerCase());// 环信ID
					final String sid = session.getSessionId();
					pm.setSessionId(sid);
					pm.setSession(session);
					SessionManager.addSession(session);

					// 更新登录日志
					map.put("lasttime", DateUtil.getNowTimestamp());
					map.put("sid", sid);
					getDao().update("login.updateLoginLog", map);
				}
			} else {
				pm.setRewriteMsg(true);
				pm.setData(ExceptionCode.NOT_LOGIN_OR_EXPIRED);
				throw new DpException(ExceptionCode.NOT_LOGIN_OR_EXPIRED, null);
			}
		}
	}

	public void install() {
		// TODO Auto-generated method stub
	}

	public void unInstall() {
		// TODO Auto-generated method stub
	}

}
