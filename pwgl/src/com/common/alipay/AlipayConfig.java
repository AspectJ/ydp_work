package com.common.alipay;

/* *
 *类名：AlipayConfig
 *功能：基础配置类
 *详细：设置帐户有关信息及返回路径
 *版本：3.3
 *日期：2012-08-10
 *说明：
 *以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 *该代码仅供学习和研究支付宝接口使用，只是提供一个参考。

 *提示：如何获取安全校验码和合作身份者ID
 *1.用您的签约支付宝账号登录支付宝网站(www.alipay.com)
 *2.点击“商家服务”(https://b.alipay.com/order/myOrder.htm)
 *3.点击“查询合作者身份(PID)”、“查询安全校验码(Key)”

 *安全校验码查看时，输入支付密码后，页面呈灰色的现象，怎么办？
 *解决方法：
 *1、检查浏览器配置，不让浏览器做弹框屏蔽设置
 *2、更换浏览器或电脑，重新登录查询。
 */

public class AlipayConfig {

	// ↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
	// 合作身份者ID，以2088开头由16位纯数字组成的字符串
	public static String partner = "2088021596333855";
	// 商户的私钥
	public static String private_key = "MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAOb5Pz97kcaiZHZM0bFm+bqKFq2bA4UWlSt5zLC5dHiv4S2gkKiGJ5BDQrQfow+PPd/gcPoYOQGV3pSr1p+ZkM8eDIr/ue9h9O0QVgXxvuq0mqdE0mi98djZmYQBRZzRvHIsR7q2jxYnz55SBgPGJTetMEbyRBu6JRjuUxvRYfYDAgMBAAECgYEAioNSwLlUFLDyWld7MU412P5S102s8LU4Q9hJPnoZNP8UpQ4zcjzxoPwVFnwah4w5aPbqCbFZDnBYCQR8Mz4erlL5J4VkoJdxeLpF4DyVxEvls2t69bEFKs3fRWgliqw63guIoK1IDe2yBZ0+DhM6DMc+muhG1eJTgufENePBRkECQQD4W9jut7EC5rXOs+Y49dZtDvHgEZxq+c4IrI+Hvo/ySVPXuFv4NHDRgtZwZe4RhqBBomh5SFyDhGkV/s7wBuyxAkEA7hR3+Vmk4gTScIcaF0x3k3Fl10zIO9BStQiaibAywf91x7ecMa4kpEt7iHFBiL4eGep6tB24nS7H7JsHJS5q8wJAb8kXeUsg10d0qZb7lsPAQdIqOEp09wl9HRZefCDftZQfssb+Tld8ODEFyA14/FZ2J1SsZXqWeXPNwOKxzgOv4QJBALXaJqXtBleqDT/swk4nl3Kk/IBO4udlQbeMIdaoIq0yPznVEtaTyONB0NMwhzk21vE+vIkV5q0RTZ558CRDZ2cCQQDtBn2Az4M09RLD/wV3mOE81gckp174Ina1MhOsYPqHj0Y0k7xiGHtMHaJFbGmoVC2HizJVNoWpS/0n2PY/vBVZ";

	// 支付宝的公钥，无需修改该值
	public static String ali_public_key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnxj/9qwVfgoUh/y2W89L6BkRAFljhNhgPdyPuBV64bfQNN1PjbCzkIM6qRdKBoLPXmKKMiFYnkd6rAoprih3/PrQEB/VsW8OoM8fxn67UDYuyBTqA23MML9q1+ilIZwBC2AQ2UBVOrFXfFl75p6/B5KsiNG9zpgmLCUYuLkxpLQIDAQAB";

	// ↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

	// 调试用，创建TXT日志文件夹路径
	public static String log_path = "D:\\";

	// 字符编码格式 目前支持 gbk 或 utf-8
	public static String input_charset = "utf-8";

	// 签名方式 不需修改
	public static String sign_type = "RSA";

}
