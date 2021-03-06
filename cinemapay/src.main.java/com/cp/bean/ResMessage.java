package com.cp.bean;

/**
 * 返回参数对应表
 * @author stone
 * 2015-6-18下午5:13:10
 */
public enum ResMessage {
	Success(1000, "Success"),
	
	Userlogin_Name_Fail(1101,"用户名不存在"),
	Userlogin_Pass_Fail(1102,"密码错误"),
	Userlogin_Status_Fail(1103,"用户名已被禁用"),
	User_Add_Fail(1104,"新增用户信息失败"),
	User_Updata_Fail(1105,"修改用户信息失败"),
	User_Delete_Fail(1106,"删除用户信息失败"),
	User_Select_Fail(1107,"查询用户信息失败"),
	User_Select_NotExist(1108,"查询用户信息不存在"),
	User_Login_TimeOut(1109,"用户登录超时"),
	Userlogin_RoleStatus_Fail(1110,"角色已被禁用"),
	
	Add_Info_Fail(1201,"新增信息失败"),
	Update_Info_Fail(1202,"修改信息失败"),
	Delete_Info_Fail(1203,"删除信息失败"),
	Select_Info_Fail(1204,"查询信息失败"),
	Select_Info_NotExist(1205,"查询信息不存在"),
	Assign_RoleMenu_Fail(1206,"分配权限失败"),
	Commit_Repeat_Fail(1207,"重复提交"),
	Commit_Operator_Fail(1208,"不能进行该操作"),
	
	No_Theater_Staff(1301,"非影院工作人员"),
	No_Conf_Cinema(1302,"查询卡券影院配置信息不存在"),
	Not_With_Validity(1303,"此卡不在可消费的有效期"),
	All_Already_Used(1304,"此卡已被全部消费"),
	Card_Cinema_Consume_Fail(1305,"此卡不能在当前影院进行消费"),
	Card_Cinema_Consume_Online(1306,"此卡只能在当前影院线上进行消费"),
	Card_Disabled(1307,"此卡已被禁止消费"),
	
	Product_Createcoupons_Fail(4101, "商品微信卡劵创建失败"),
	Product_To_Online_Fail(4102, "卖品同步线上失败"),
	
	Pay_Wx_Pre_Fail(5001, "支付出错"), // 统一下单，获取预备支付ID错误
	Pay_Wx_OrderStatus_False(5002, "订单支付错误"), // 订单状态不正确,支付错误
	Pay_Wx_Product_UNPutaway(5003, "支付出错,商品未上架!"),
	Pay_Wx_Product_NoCard(5004, "支付出错,商品未创建卡劵!"),
	
	Pay_Wx_Refund_False(5101, "微信退款失败"), // 微信退款失败
	
	Order_Status_False(6003, "订单状态不正确"), // 订单状态不正确
	
	// 易得票订单核销(6101 - 6201)
	Order_ChargeOff_Fail_YDP(6101, "订单核销失败"),
	Order_ChargeOff_NotExist_YDP(6102, "订单不存在"),
	Order_ChargeOff_Already_YDP(6103, "订单已核销"),
	//易得票对账单
	Bill_NotExist_YDP(7101, "无符合条件的账单"),
	
	
	Lack_Privilege(9997, "您没有此项权限"),
	Lack_Param(9998, "缺少参数"),
	Server_Abnormal(9999, "服务器处理异常"),
	;

	public int code;
	public String message;

	private ResMessage(int code, String message) {
		this.code = code;
		this.message = message;
	}

	public static String getMessage(int code) {
		for (ResMessage rm : values()) {
			if (rm.code == code) {
				return rm.message;
			}
		}
		return "";
	}
}
