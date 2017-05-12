package com.tools.wxpay.tencent.common;

/**
 * User: rizenguo
 * Date: 2014/10/29
 * Time: 14:40
 * 这里放置各种配置数据
 */
public class Configure {
//这个就是自己要保管好的私有Key了（切记只能放在自己的后台代码里，不能放在任何可能被看到源代码的客户端程序中）
	// 每次自己Post数据给API的时候都要用这个key来对所有字段进行签名，生成的签名会放在Sign这个字段，API收到Post数据的时候也会用同样的签名算法对Post过来的数据进行签名和验证
	// 收到API的返回的时候也要用这个key来对返回的数据算下签名，跟API的Sign数据进行比较，如果值不一致，有可能数据被第三方给篡改

	private static String key = "XwEi3B4gN4mmpjdjjUgQYV0SA8yYxRXp";

	//微信分配的公众号ID（开通公众号之后可以获取到）
	private static String appID = "wx984f6afc9b7ec8d0";
//	个人测试公公众号ID
//	private static String appID = "wx907cc0b0ac0fefee";

	//微信支付分配的商户号ID（开通公众号的微信支付功能之后可以获取到）
	private static String mchID = "10024140";

	//受理模式下给子商户分配的子商户号
	private static String subMchID = "";

	//HTTPS证书的本地路径
	private static String certLocalPath = "";

	//HTTPS证书密码，默认密码等于商户号MCHID
	private static String certPassword = "";

	//是否使用异步线程的方式来上报API测速，默认为异步模式
	private static boolean useThreadToDoReport = true;

	// 微信公众号
	public static final String appsecret = "1e82939980bc5e347e27971214c2842a";
//	个人测试公众号密钥
//	public static final String appsecret = "4538f374066bd6b65ae561df49ca9ab1 ";

	// 获取access_token
	public static final String GETTOCKET = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";
	// 创建二维码ticket
	public static final String GETTICKET = "https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=";
	// 通过ticket换取二维码
	// public static final String GETQRCODE = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=";

	// 获取用户基本信息
	public static final String GETUSERNICK = "https://api.weixin.qq.com/cgi-bin/user/info?access_token={}&openid={}&lang=zh_CN";
	
	// 创建卡劵
	public static final String CARDCREATE= "https://api.weixin.qq.com/card/create?access_token=";
	// 卡劵-查询Code接口
	public static final String CARD_GET= "https://api.weixin.qq.com/card/code/get?access_token=";
	// 卡劵-核销Code接口
	public static final String CARD_CONSUME= "https://api.weixin.qq.com/card/code/consume?access_token=";
		
	
	// 卡券的商户logo
	public static final String CARDLOGO= "http://www.yidepiao.com/images/logo.png";
	
	// 消息群发接口
	public static final String MASS_MESSAGE_PREVIEW= "https://api.weixin.qq.com/cgi-bin/message/mass/preview?access_token=";
	public static final String MASS_MESSAGE_SEND= "https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token=";
	public static final String CUSTOM_MESSAGE_SEND= "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=";
	
	//机器IP
	private static String ip = "192.168.1.171";

	// 支付接口
	// 统一下单
	public static String UNIFIEDORDER_API = "https://api.mch.weixin.qq.com/pay/unifiedorder";
	// 关闭订单
	public static String CLOSEORDER_API = "https://api.mch.weixin.qq.com/pay/closeorder";
	// 查询订单状态
	public static String ORDER_QUERY_API = "https://api.mch.weixin.qq.com/pay/orderquery";
	// 申请退款
	public static String PAY_REFUND_API = "https://api.mch.weixin.qq.com/secapi/pay/refund";
	// 查询退款
	public static String PAY_REFUNDQUERY_API = "https://api.mch.weixin.qq.com/pay/refundquery";
	
	//以下是几个API的路径：
	//1）被扫支付API
	public static String PAY_API = "https://api.mch.weixin.qq.com/pay/micropay";

	//2）被扫支付查询API
	public static String PAY_QUERY_API = "https://api.mch.weixin.qq.com/pay/orderquery";

	//5）撤销API
	public static String REVERSE_API = "https://api.mch.weixin.qq.com/secapi/pay/reverse";

	//6）下载对账单API
	public static String DOWNLOAD_BILL_API = "https://api.mch.weixin.qq.com/pay/downloadbill";

	//7) 统计上报API
	public static String REPORT_API = "https://api.mch.weixin.qq.com/payitil/report";

	public static boolean isUseThreadToDoReport() {
		return useThreadToDoReport;
	}

	public static void setUseThreadToDoReport(boolean useThreadToDoReport) {
		Configure.useThreadToDoReport = useThreadToDoReport;
	}

	public static String HttpsRequestClassName = "com.ydp.wxpay.tencent.common.HttpsRequest";

	public static void setKey(String key) {
		Configure.key = key;
	}

	public static void setAppID(String appID) {
		Configure.appID = appID;
	}

	public static void setMchID(String mchID) {
		Configure.mchID = mchID;
	}

	public static void setSubMchID(String subMchID) {
		Configure.subMchID = subMchID;
	}

	public static void setCertLocalPath(String certLocalPath) {
		Configure.certLocalPath = certLocalPath;
	}

	public static void setCertPassword(String certPassword) {
		Configure.certPassword = certPassword;
	}

	public static void setIp(String ip) {
		Configure.ip = ip;
	}

	public static String getKey(){
		return key;
	}
	
	public static String getAppid(){
		return appID;
	}
	
	public static String getMchid(){
		return mchID;
	}

	public static String getSubMchid(){
		return subMchID;
	}
	
	public static String getCertLocalPath(){
		return certLocalPath;
	}
	
	public static String getCertPassword(){
		return certPassword;
	}

	public static String getIP(){
		return ip;
	}

	public static void setHttpsRequestClassName(String name){
		HttpsRequestClassName = name;
	}

}
