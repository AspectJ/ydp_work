
<%
	/* *
	 功能：支付宝服务器异步通知页面
	 版本：3.3
	 日期：2012-08-17
	 说明：
	 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
	 该代码仅供学习和研究支付宝接口使用，只是提供一个参考。

	 //***********页面功能说明***********
	 创建该页面文件时，请留心该页面文件中无任何HTML代码及空格。
	 该页面不能在本机电脑测试，请到服务器上做测试。请确保外部可以访问该页面。
	 该页面调试工具请使用写文本函数logResult，该函数在com.alipay.util文件夹的AlipayNotify.java类文件中
	 如果没有收到该页面返回的 success 信息，支付宝会在24小时内按一定的时间策略重发通知
	 //********************************
	 * */
%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="com.common.util.*"%>
<%@ page import="com.common.dp.*"%>
<%@ page import="com.common.constant.*"%>
<%@ page import="com.common.alipay.*"%>
<%@ page import="com.dispatch.Dispatcher"%>
<%@ page import="com.alibaba.fastjson.*"%>
<%
	//获取支付宝POST过来反馈信息
	Map<String, String> params = new HashMap<String, String>();
	Map<String, String[]> requestParams = request.getParameterMap();
	for (Iterator iter = requestParams.keySet().iterator(); iter
			.hasNext();) {
		String name = (String) iter.next();
		String[] values = (String[]) requestParams.get(name);
		String valueStr = "";
		for (int i = 0; i < values.length; i++) {
			valueStr = (i == values.length - 1) ? valueStr + values[i]
					: valueStr + values[i] + ",";
		}
		//乱码解决，这段代码在出现乱码时使用。如果mysign和sign不相等也可以使用这段代码转化
		//valueStr = new String(valueStr.getBytes("ISO-8859-1"), "gbk");
		params.put(name, valueStr);
	}

	//支付宝交易号
	String trade_no = new String(request.getParameter("trade_no")
			.getBytes("ISO-8859-1"), "UTF-8");
	//交易状态
	String trade_status = new String(request.getParameter(
			"trade_status").getBytes("ISO-8859-1"), "UTF-8");
	if (AlipayNotify.verify(params)) {//验证成功
		if (trade_status.equals("TRADE_FINISHED")
				|| trade_status.equals("TRADE_SUCCESS")) {
			//判断该笔订单是否在商户网站中已经做过处理
			//如果没有做过处理，根据订单号（out_trade_no）在商户网站的订单系统中查到该笔订单的详细，并执行商户的业务程序
			//如果有做过处理，不执行商户的业务程序

			//注意：
			//TRADE_FINISHED该种交易状态只在两种情况下出现
			//1、开通了普通即时到账，买家付款成功后。
			//2、开通了高级即时到账，从该笔交易成功时间算起，过了签约时的可退款时限（如：三个月以内可退款、一年以内可退款等）后。
			//TRADE_SUCCESS该种交易状态只在一种情况下出现——开通了高级即时到账，买家付款成功后。
			//商户订单号：即我们自己系统的订单号
			String out_trade_no = new String(request.getParameter(
					"out_trade_no").getBytes("ISO-8859-1"), "UTF-8");
			if (null == out_trade_no || "".equals(out_trade_no)) {
				out.println("fail");
			} else {
				try {
					Param pm = new Param();
					pm.setDataFormat(SystemConstant.jsonType);

					JSONObject json = new JSONObject();
					if (out_trade_no.startsWith("CZ")) {//表示充值记录
						pm.setServiceId("apiMyInfoService");
						json.put("operType", "wccz");
						json.put("tn", out_trade_no);
					} else {//表示订单支付
						pm.setServiceId("apiOrderService");
						json.put("operType", "ddzf");
						json.put("zffs", "zfb");
						json.put("orderid", out_trade_no);
					}

					pm.setData(json.toJSONString());

					Dispatcher dispatcher = (Dispatcher) SpringContextUtil
							.getBean(SpringBeanId.DISPATCHER);
					dispatcher.noFilterDispatch(pm);

					Object o = pm.getData();
					Map<String, Object> retMap = (Map<String, Object>) o;
					String sf = (String) retMap.get(TypeConstant.SF);
					if (null != sf && !"".equals(sf)
							&& sf.equals(TypeConstant.SUCCESS)) {
						out.println("success"); //请不要修改或删除
					} else {
						out.println("fail");
					}
				} catch (Exception e) {
					e.printStackTrace();
					out.println("fail");
				}
			}
		}
	} else {//验证失败
		out.println("fail");
	}
%>
