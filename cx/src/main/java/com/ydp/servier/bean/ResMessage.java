package com.ydp.servier.bean;


/**
 * 返回参数对应表
 * @author stone
 * 2015-6-18下午5:13:10
 */
public enum ResMessage {
	
	Success(1000, "Success"),

	// 用户(1001 - 2000)
//	Not_Reqkey(1001, "需要先登录", ""),
//	Login_Timeout(1002, "登录超时", ""),
//	Logged_In_Elsewhere(1003, "登录超时或在其他地方登录", ""),
//	User_Login_pass_Fail(1004, "密码错误", "您输入的密码不正确！"),
//	User_Login_mobile_Fail(1005, "手机号错误", "您输入的手机号码不存在，请确认后重新输入！"),
//	User_MobileHasRegist(1006, "号码已注册", "您的号码已经注册！"),
//	User_OldPassFail(1007, "当前密码输入错误", "当前密码输入错误，请重新输入"),
//	User_mobile_fomart_Fail(1008, "号码格式有误", "您输入的号码格式有误，请您重新输入！"),
	
	// 会员卡（2001 - 3000）
	Card_exist(2001, "会员卡已绑定"),
//	Paied_Fail(1052, "支付失败", "支付失败"),
	
	// 影片、影院(3001 - 4000) 排期、 影厅、座位 (4001 - 5000) 
	
	//　订单 影票(4001 - 5000)
	// 锁座 4001 - 4100
	Lock_Has_NoPay(4001, "存在未支付订单"),
	
	// 支付4101 - 4200
	Order_paid(4101, "订单已支付"),
	Order_State_Fail(4102, "订单状态错误"),
	Order_Paied_Fail(4103, "支付失败"),
	
//	Lock_Unfind(1301, "锁座-座位、排期没查到数据", "锁座失败，您可以尝试换个座位或者场次"),
//	SYSSell_Fail(1302, "系统商出票失败,已成功退款", "出票失败"),
//	SYSSellBack_Fail(1303, "系统商出票失败,退款失败,请联系客服!", "出票失败"),
//	AlreadyPrint(1305, "订单已打印成功，不能重复打印",""),
	
	
	// 公共信息(9001 - 10000)
	Server_Fail(9001, "服务器处理异常"),
	SysBusi_Fail(9002, "系统商错误"),
	SysBusi_Net_Fail(9003, "系统商网络异常"),
	Params_Fail(9004, "参数不正确"),
	
//	SysBusi_net_error(1900, "系统上网络异常", "系统上网络异常，请稍后再试！"),
//	TimeStamp_Over(1901, "请求时间超时", "请求时间超时,请重新登录"),
//	Verify_Fail(1905, "短信验证码错误", "短信验证码错误"),
//	SmsVerity_SendSucess(1908, "Success", "短信验证码发送成功"), // 短信验证码发送成功
//	SimplePass(1910, "密码过于简单", "对不起，您的密码过于简单，请持卡至影院售票处修改后再绑定。"), 
	;

	public int code;
	public String message;

	private ResMessage(int code, String message) {
		this.code = code;
		this.message = message;
	}

	public static String getMessage(int code)
	{
		for (ResMessage rm : values())
		{
			if (rm.code == code)
			{
				return rm.message;
			}
		}
		return "";
	}
	
	/**
	 * 设置错误信息
	 * @param code
	 * @param dataMessage
	 */
	public void setError(int code, DataMessage dataMessage){
		dataMessage.setErrorCode(code);
		dataMessage.setErrorMessage(ResMessage.getMessage(code));
	}
}
