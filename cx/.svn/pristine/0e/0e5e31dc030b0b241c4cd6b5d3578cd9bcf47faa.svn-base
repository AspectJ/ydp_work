package com.cx.filter;

import javax.servlet.http.HttpServletRequest;

import com.cx.bean.ResMessage;
import com.cx.util.CodeUtil;

import net.sf.json.JSONObject;

public class BaseServlet
{
	/**
	 * 数据返回
	 */
	protected String response(JSONObject resultJson, HttpServletRequest request)
	{
		String resultStr = null;
		String jsonpCallback = request.getParameter("jsonpCallback");

		resultJson.put("result", ResMessage.Success.code);
		resultJson.put("msg", ResMessage.getMessage(ResMessage.Success.code));

		if (jsonpCallback != null && !"".equals(jsonpCallback))
		{
			resultStr = jsonpCallback + "(" + resultJson + ")";
		} else
		{
			resultStr = resultJson.toString();
		}
		return resultStr;
	}

	// /**
	// * 短信验证返回
	// */
	// protected String smsResponse(JSONObject resultJson, HttpServletRequest request)
	// {
	// String resultStr = null;
	// String jsonpCallback = request.getParameter("jsonpCallback");
	//
	// resultJson.put("result", ResMessage.SmsVerity_SendSucess.code);
	// resultJson.put("msg", ResMessage.getMessage(ResMessage.SmsVerity_SendSucess.code));
	//
	// if (jsonpCallback != null && !"".equals(jsonpCallback))
	// {
	// resultStr = jsonpCallback + "(" + resultJson + ")";
	// } else
	// {
	// resultStr = resultJson.toString();
	// }
	// String requestPath = request.getRequestURI();
	// String url = requestPath.substring(requestPath.indexOf("/", 15) + 1);
	// logger.info("【返回】【{}】【内容:{}】", url, resultStr);
	// // mongo.insert("INFO", requestPath, "返回结果", resultStr);
	// return resultStr;
	// }

	/**
	 * 异常返回
	 */
	protected String returnError(JSONObject resultJson, int typeCode, HttpServletRequest request)
	{
		String resultStr = null;

		resultJson.put("result", typeCode);
		resultJson.put("msg", ResMessage.getMessage(typeCode));

		String jsonpCallback = request.getParameter("jsonpCallback");
		if (jsonpCallback != null && !"".equals(jsonpCallback))
		{
			resultStr = jsonpCallback + "(" + resultJson + ")";
		} else
		{
			resultStr = resultJson.toString();
		}
		return resultStr;
	}

	// /**
	// * 返回文本错误
	// *
	// * @param code
	// * @param request
	// * @return
	// */
	// protected String returnStrError(int code, HttpServletRequest request)
	// {
	// return ResMessage.getMessage(code);
	// }

	// /**
	// * 系统商返回异常
	// */
	// protected String sysBusiError(JSONObject resultJson, Object message, HttpServletRequest request)
	// {
	// String resultStr = null;
	//
	// resultJson.put("result", ResMessage.SysBusi_Fail.code);
	// resultJson.put("msg", message);
	//
	// String jsonpCallback = request.getParameter("jsonpCallback");
	// if (jsonpCallback != null && !"".equals(jsonpCallback))
	// {
	// resultStr = jsonpCallback + "(" + resultJson + ")";
	// } else
	// {
	// resultStr = resultJson.toString();
	// }
	// String requestPath = request.getRequestURI();
	// String url = requestPath.substring(requestPath.indexOf("/", 15) + 1);
	// logger.info("【返回】【{}】【内容:{}】", url, resultStr);
	// // mongo.insert("INFO", requestPath, "返回结果", resultStr);
	// return resultStr;
	// }

	// /**
	// * 登录验证返回
	// */
	// protected void loginError(HttpServletRequest request, HttpServletResponse response, int eCode)
	// {
	// JSONObject resultJson = new JSONObject();
	// resultJson.put("result", eCode);
	// resultJson.put("msg", ResMessage.getMessage(eCode));
	//
	// PrintWriter out = null;
	// try
	// {
	// response.setCharacterEncoding("UTF-8");
	// response.setContentType("text/html; charset=UTF-8");
	// response.setHeader("Content-Type", "text/html; charset=UTF-8");
	//
	// out = response.getWriter();
	// String jsonpCallback = request.getParameter("jsonpCallback");
	// if (jsonpCallback != null && !"".equals(jsonpCallback))
	// {
	// out.write(jsonpCallback + "(" + resultJson + ")");
	// } else
	// {
	// out.write(resultJson.toString());
	// }
	// // String requestPath = request.getRequestURI();
	// // String url = requestPath.substring(requestPath.indexOf("/", 15) + 1);
	// } catch (IOException e)
	// {
	// logger.error("[utdm][result][登录验证返回]", e);
	// } finally
	// {
	// out.flush();
	// out.close();
	// }
	// }

	/**
	 * ------------------------------------------------------------- 
	 * --------------------------- 数据转换 ------------------------
	 * -------------------------------------------------------------
	 */

	// /**
	// * json数组转换为list
	// *
	// * @return
	// */
	// public static List<Map<String, Object>> jsonArrayToList(JSONArray jsonArray)
	// {
	// List<Map<String, Object>> list = new LinkedList<Map<String, Object>>();
	// for (Object object : jsonArray)
	// {
	// Map<String, Object> map = new HashMap<String, Object>();
	// JSONObject jsonObject = (JSONObject) object;
	//
	// @SuppressWarnings("unchecked")
	// Set<String> set = jsonObject.keySet();
	// for (String key : set)
	// {
	// map.put(key, jsonObject.get(key));
	// }
	// list.add(map);
	// }
	// return list;
	// }

	/**
	 * 获取数据
	 * @param request
	 * @param nParam 参数名称
	 * @param vDefault 默认值
	 * @return
	 */
	public static String getParam(HttpServletRequest request, String nParam, String vDefault)
	{
		String value = request.getParameter(nParam);
		if (CodeUtil.checkParam(value))
		{
			value = vDefault;
		}
		return value;
	}
}
