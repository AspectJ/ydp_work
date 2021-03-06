package com.cp.rest.card;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;

import org.jboss.resteasy.annotations.cache.NoCache;
import org.springframework.stereotype.Service;

import com.cp.bean.Convert;
import com.cp.bean.ResMessage;
import com.cp.filter.BaseServlet;
import com.cp.rest.card.dao.CardConfDaoImpl;
import com.cp.rest.card.dao.CardDaoImpl;
import com.cp.rest.card.dao.ConfCinemaDaoImpl;
import com.cp.rest.userinfo.LogInfoAdd;
import com.cp.rest.userinfo.redis.UserRedisImpl;
import com.cp.util.Arith;
import com.cp.util.CodeUtil;
import com.cp.util.Config;
import com.cp.util.DateFormatUtil;
import com.cp.util.DesUtil;
import com.cp.util.Permission;
import com.mongo.MyMongo;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Path("rest/card")
@NoCache
@Service()
public class CardRest extends BaseServlet
{
	@Resource
	private CardConfDaoImpl cardConfDao;
	@Resource
	private CardDaoImpl cardDao;
	@Resource
	private ConfCinemaDaoImpl cinameDao;
	@Resource
	private LogInfoAdd logInfo;
	@Resource
	private UserRedisImpl userRedis;
	
	
	/**
	 * 查看卡号列表
	 */
	@GET
	@POST
	@Path("/getCardList")
	@Produces("text/html;charset=UTF-8")
	public String getRoleList(@Context HttpServletRequest request, @Context HttpServletResponse response){
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String userid = String.valueOf(request.getAttribute("userid"));
		List<String> userFeilds = userRedis.getUserField(userid, "roletype".getBytes(), "theaternum".getBytes(),"username".getBytes());
		if(userFeilds != null){
			if(!privilegeCheck(request, Permission.showCardInfo, userRedis)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
				return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
			}
			
			//分页参数、条件查询参数
			String pagesize = request.getParameter("pagesize");//每页多少条数据
			String page = request.getParameter("page");//page＝（当前页数－1）*pagesize
			String cardconfid = request.getParameter("cardconfid");//卡批次号
			try{
				String search = URLDecoder.decode(request.getParameter("search"), "UTF-8");
				Map<String, Object> searchInfo = new HashMap<String, Object>();
				searchInfo.put("pageSize", Integer.parseInt(pagesize));
				searchInfo.put("offsetNum", Integer.parseInt(pagesize) * (Integer.parseInt(page) - 1));
				searchInfo.put("cardconfid", cardconfid);
				if(!CodeUtil.checkParam(search)){
					searchInfo.put("cardnumber", "%" + search + "%");
				}
				Map<String, Object> countMap = cardDao.getCardCount(searchInfo);
				String count = countMap.get("count").toString();
				List<Map<String, Object>> resultList = cardDao.getCardList(searchInfo);
				JSONArray jsonArray = new JSONArray();
				if(resultList != null && resultList.size() > 0){
					for(int i=0;i<resultList.size();i++){
						Map<String, Object> resultMap = resultList.get(i);
						JSONObject data = new JSONObject();
						data.put("cardid", resultMap.get("cardid"));
						data.put("cardconfid", resultMap.get("cardconfid"));
						data.put("cardname", resultMap.get("cardname"));
						data.put("cardtype", resultMap.get("cardtype"));
						data.put("cardtype_name", Convert.convertCardConfType(resultMap.get("cardtype").toString()));
						data.put("status", resultMap.get("status"));
						data.put("count", resultMap.get("count"));
						data.put("value", resultMap.get("value"));
						data.put("starttime", new SimpleDateFormat("yyyy-MM-dd").format(resultMap.get("starttime")));
						data.put("endtime", new SimpleDateFormat("yyyy-MM-dd").format(resultMap.get("endtime")));
						data.put("quantity", resultMap.get("quantity"));
						data.put("note", resultMap.get("note"));
						data.put("cardnumber", resultMap.get("cardnumber"));
						data.put("cardcipher", resultMap.get("cardcipher"));
						data.put("restcount", resultMap.get("restcount"));
						data.put("restvalue", resultMap.get("restvalue"));
						data.put("operatorid", resultMap.get("username"));
						data.put("cardstatus", resultMap.get("cardstatus"));
						data.put("cardstatusname", Convert.convertCardStatus(resultMap.get("cardstatus").toString()));
						data.put("modifytime", new SimpleDateFormat("yyyy-MM-dd HH:mm").format(resultMap.get("modifytime")));
						jsonArray.add(data);
					}
					resultJson.put("total", count);
					resultJson.put("data", jsonArray);
					resultJson.put("current", page);
				}else{
					MyMongo.mRequestFail(request, "查询发行卡卡号信息列表不存在");
					return this.returnError(resultJson, ResMessage.Select_Info_NotExist.code, request);
				}
			} catch (Exception e){
				MyMongo.mErrorLog("查询发行卡卡号信息列表失败", request, e);
				return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request);
			}
			long etime = System.currentTimeMillis();
			MyMongo.mRequestLog("查询发行卡卡号信息列表成功",  etime - stime, request, resultJson);
			return this.response(resultJson, request);
		}else{
			MyMongo.mRequestFail(request, "登录超时");
			return this.returnError(resultJson, ResMessage.User_Login_TimeOut.code, request);
		}
	}
	
	
	
	/**
	 * 导出卡券信息
	 * @throws UnsupportedEncodingException 
	 */
	@GET
	@POST
	@Path("/exportCard")
	@Produces("text/html;charset=UTF-8")
	public String exportCard(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String cardconfid = request.getParameter("cardconfid");//ID
		String cardname = request.getParameter("cardname");
		try{
			if(!privilegeCheck(request, Permission.exportCardInfo, userRedis)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
				return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
			}
			
			if (CodeUtil.checkParam(cardconfid)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			Map<String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("cardconfid", Integer.parseInt(cardconfid));
			Map<String, Object> basicMap = cardConfDao.getCardConfBasic(paramMap);
			cardname = basicMap.get("cardname").toString();
			if("0".equals(basicMap.get("status").toString())){
				return this.returnError(resultJson, ResMessage.Commit_Operator_Fail.code, request);
			}else{
				String fileName = cardDao.exportXlsFile(cardconfid, request);
				if("0".equals(fileName)){//没有数据
					resultJson.put("failMsg", cardname+"未找到对应的卡号信息");
					return this.returnError(resultJson, ResMessage.Select_Info_NotExist.code, request); 
				}else if("1".equals(fileName)){//数据有误
					resultJson.put("failMsg", cardname+"卡号信息有误");
					return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request); 
				}else{
					resultJson.put("path", fileName);
				}
			}
		} catch (Exception e){
			MyMongo.mErrorLog("导出卡券卡号信息失败", request, e);
			return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request); 
		}
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("导出卡券["+cardname+"]卡号信息成功",  etime - stime, request, resultJson);
		String logContent = "导出卡券["+cardname+"]卡号信息";
		logInfo.addLogInfo(request, "0", logContent);
		return this.response(resultJson, request);
	}
	
	
	
	
	/**
	 * 新建卡号信息
	 * @throws UnsupportedEncodingException 
	 */
	@GET
	@POST
	@Path("/addCard")
	@Produces("text/html;charset=UTF-8")
	public String addCard(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String userid = String.valueOf(request.getAttribute("userid"));
		List<String> userFeilds = userRedis.getUserField(userid, "theaternum".getBytes(),"username".getBytes());
		if(userFeilds != null){
			String cardconfid = request.getParameter("cardconfid");
			String cardname = "";
			String cardtype = "";
			String restcount = "0";
			String restvalue = "0";
			try{
				if(!privilegeCheck(request, Permission.createCardInfo, userRedis)){
					MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
					return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
				}
				
				if (CodeUtil.checkParam(cardconfid)){
					MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
					return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
				}
				Map<String,Object> paramMap = new HashMap<String, Object>();
				paramMap.put("cardconfid", cardconfid);
				Map<String, Object> cardconfMap = cardConfDao.getCardConfBasic(paramMap);//查询基本信息
				MyMongo.mLog("INFO", "查询卡券基本信息", cardconfMap);
				if(cardconfMap.get("status").toString().equals("0")){//未生成
					MyMongo.mRequestLog("查询卡券未生成",  System.currentTimeMillis() - System.currentTimeMillis(), request, resultJson);
					cardname = cardconfMap.get("cardname").toString();
					cardtype = cardconfMap.get("cardtype").toString();
					String cardCipherPrefix = "CK";
					if("0".equals(cardtype)){
						restcount = cardconfMap.get("count").toString();
					}else if("1".equals(cardtype)){
						restvalue = cardconfMap.get("value").toString();
						cardCipherPrefix = "CZK";
					}
					
					String quantity = cardconfMap.get("quantity").toString();//需要生成的卡号数量
					resultJson.put("quantity", quantity);
					MyMongo.mLog("INFO", "查询卡券生成数量", quantity);
					int cardcount = Integer.parseInt(quantity);
					List<Map<String,Object>> insertList = new ArrayList<Map<String,Object>>();
					for(int i=0;i<cardcount;i++){
						String cardnumber = CodeUtil.getRandomUUID(16).toUpperCase();
//						String cardcipher = CodeUtil.getRandomUUID(16).toUpperCase();
						String cardcipher = (cardCipherPrefix + CodeUtil.randomNum(10000000000L, 99999999999L)).substring(0, 12);
						String desCardCipher = DesUtil.desEncrypt(cardcipher, Config.DES_KEY);//加密
						//System.out.println("cardnumber1:"+cardnumber+";cardcipher1:"+cardcipher+";desCardCipher1:"+desCardCipher);
						Map<String,Object> insertMap = new HashMap<String, Object>();
						insertMap.put("cardconfid", cardconfid);
						insertMap.put("restcount", restcount);
						insertMap.put("restvalue", restvalue);
						insertMap.put("createtime", new Date());
						insertMap.put("modifytime", new Date());
						insertMap.put("operatorid", userid);
						insertMap.put("cardnumber", cardnumber);
						insertMap.put("cardcipher", desCardCipher);
						insertList.add(insertMap);
					}
					resultJson.put("insertSize", insertList.size());
					MyMongo.mLog("INFO", "卡号生成数量", insertList);
					cardDao.insertCard(insertList);
					MyMongo.mRequestLog("批量生成卡号",  System.currentTimeMillis() - System.currentTimeMillis(), request, resultJson);
					Map<String, Object> updateMap = new HashMap<String, Object>();
					updateMap.put("status", 1);
					updateMap.put("cardconfid", cardconfid);
					Map<String, Object> countMap = cardDao.getCardCount(updateMap);
					String count = countMap.get("count").toString();
					resultJson.put("cardCount", count);
					MyMongo.mRequestLog("查询卡号数量",  System.currentTimeMillis() - System.currentTimeMillis(), request, resultJson);
					if(Integer.parseInt(count) == cardcount){//已全部添加
						MyMongo.mLog("INFO", "进入修改卡券状态", updateMap);
						cardConfDao.updateCardConf(updateMap);//修改生成卡号状态
//						cardConfDao.updateCardConfStatus(updateMap);//修改生成卡号状态
						MyMongo.mRequestLog("执行修改卡券状态",  System.currentTimeMillis() - System.currentTimeMillis(), request, resultJson);
					}else{//继续添加
						MyMongo.mLog("INFO", "进入继续添加卡券", paramMap);
						cardDao.deleteCard(paramMap);
						int uncount = cardcount - Integer.parseInt(count);
						insertList = new ArrayList<Map<String,Object>>();
						for(int i=0;i<uncount;i++){
							String cardnumber = CodeUtil.getRandomUUID(16).toUpperCase();
//							String cardcipher = CodeUtil.getRandomUUID(16).toUpperCase();
							String cardcipher = (cardCipherPrefix + CodeUtil.randomNum(10000000000L, 99999999999L)).substring(0, 12);
							String desCardCipher = DesUtil.desEncrypt(cardcipher, Config.DES_KEY);//加密
							Map<String,Object> insertMap = new HashMap<String, Object>();
							insertMap.put("cardconfid", cardconfid);
							insertMap.put("restcount", restcount);
							insertMap.put("restvalue", restvalue);
							insertMap.put("createtime", new Date());
							insertMap.put("modifytime", new Date());
							insertMap.put("operatorid", userid);
							insertMap.put("cardnumber", cardnumber);
							insertMap.put("cardcipher", desCardCipher);
							insertList.add(insertMap);
						}
						MyMongo.mLog("INFO", "继续添加卡券List", insertList);
						cardDao.insertCard(insertList);
						MyMongo.mLog("INFO", "继续添加卡券成功", insertList);
						cardConfDao.updateCardConf(updateMap);//修改生成卡号状态
//						cardConfDao.updateCardConfStatus(updateMap);
						MyMongo.mLog("INFO", "继续修改卡券状态成功", updateMap);
					}
					JSONObject data = new JSONObject();
					data.put("quantity", cardcount);
					resultJson.put("data", data);
					MyMongo.mRequestLog("全部成功",  System.currentTimeMillis() - System.currentTimeMillis(), request, resultJson);
				}else{
					MyMongo.mRequestLog("查询卡券已生成",  System.currentTimeMillis() - System.currentTimeMillis(), request, resultJson);
					return this.returnError(resultJson, ResMessage.Commit_Operator_Fail.code, request);
				}
			} catch (Exception e){
				MyMongo.mErrorLog("["+cardname+"]生成卡号信息失败", request, e);
				return this.returnError(resultJson, ResMessage.Add_Info_Fail.code, request);
			}
			long etime = System.currentTimeMillis();
			MyMongo.mRequestLog("["+cardname+"]生成卡号信息成功",  etime - stime, request, resultJson);
			String logContent = "["+cardname+"]生成卡号";
			logInfo.addLogInfo(request, "0", logContent);
			return this.response(resultJson, request);
		}else{
			MyMongo.mRequestFail(request, "登录超时");
			return this.returnError(resultJson, ResMessage.User_Login_TimeOut.code, request);
		}
	}

	
	/**
	 * 修改状态
	 * @throws UnsupportedEncodingException 
	 */
	@GET
	@POST
	@Path("/changeCardStatus")
	@Produces("text/html;charset=UTF-8")
	public String changeCardStatus(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String userid = String.valueOf(request.getAttribute("userid"));
		List<String> userFeilds = userRedis.getUserField(userid, "theaternum".getBytes(),"username".getBytes());
		if(userFeilds != null){
			if(!privilegeCheck(request, Permission.cardStatus, userRedis)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
				return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
			}
			
			String cardid = request.getParameter("cardid");//ID
			String status = request.getParameter("status");
			String cardnumber = request.getParameter("cardnumber");
			String statusName = "";
			if("1".equals(status)){statusName = "启用";}else{statusName = "禁用";}
			try{
				if (CodeUtil.checkParam(cardid)){
					MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
					return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
				}
				Map<String, Object> paramMap = new HashMap<String, Object>();
				paramMap.put("cardid", Integer.parseInt(cardid));
				paramMap.put("cardnumber", cardnumber);
				paramMap.put("status", status);
				paramMap.put("operatorid", userid);
				cardDao.updateCard(paramMap);
				JSONObject data = new JSONObject();
				data.put("cardid", cardid);
				resultJson.put("data", data);
			} catch (Exception e){
				MyMongo.mErrorLog("修改卡号状态为"+statusName+"失败", request, e);
				return this.returnError(resultJson, ResMessage.Update_Info_Fail.code, request);
			}
			long etime = System.currentTimeMillis();
			MyMongo.mRequestLog("修改卡号["+cardnumber+"]状态为"+statusName+"成功",  etime - stime, request, resultJson);
			String logContent = "修改卡号["+cardnumber+"]状态为"+statusName;
			logInfo.addLogInfo(request, "0", logContent);
			return this.response(resultJson, request);
		}else{
			MyMongo.mRequestFail(request, "登录超时");
			return this.returnError(resultJson, ResMessage.User_Login_TimeOut.code, request);
		}
	}
	
	
	
	/**
	 * 核销
	 */
	@GET
	@POST
	@Path("/cardMess")
	@Produces("text/html;charset=UTF-8")
	public String getCardConf(@Context HttpServletRequest request, @Context HttpServletResponse response){
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String userid = String.valueOf(request.getAttribute("userid"));
		List<String> userFeilds = userRedis.getUserField(userid, "roletype".getBytes(), "theaternum".getBytes(),"username".getBytes());
		if(userFeilds != null){
			if(!privilegeCheck(request, Permission.cardChargeOff, userRedis)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
				return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
			}
			
			String theaternum = userFeilds.get(1);//登录人影院编码
			if("0".equals(theaternum)){//不是影院工作人员、不能进行核销
				MyMongo.mRequestFail(request, "非影院登录账号，不能核销");
				return this.returnError(resultJson, ResMessage.No_Theater_Staff.code, request);
			}
			String cardcipher = request.getParameter("cardcipher");
			try{
				Map<String, Object> searchInfo = new HashMap<String, Object>();
				String desCardCipher = DesUtil.desEncrypt(cardcipher.toUpperCase(), Config.DES_KEY);//转大写后加密
				searchInfo.put("cardcipher", desCardCipher);
				Map<String, Object> resultMap = cardDao.getCardInfo(searchInfo);
				if(resultMap != null){//存在密码对应的卡信息
					searchInfo.put("cardconfid", resultMap.get("cardconfid"));
					String cardname = resultMap.get("cardname").toString();
					String starttime = new SimpleDateFormat("yyyy-MM-dd HH:mm").format(resultMap.get("starttime"));
					String endtime = new SimpleDateFormat("yyyy-MM-dd HH:mm").format(resultMap.get("endtime"));
					String status = resultMap.get("status").toString();
					String cardStatus = resultMap.get("cardstatus").toString();
					int compare1 = DateFormatUtil.compareDate(starttime);//-1
					int compare2 = DateFormatUtil.compareDate(endtime);//1
					if("2".equals(status) || "2".equals(cardStatus)){//被禁用
						MyMongo.mRequestFail(request, "此卡已被禁止使用");
						return this.returnError(resultJson, ResMessage.Card_Disabled.code, request);
					}else{
						if(compare1 == -1 && compare2 == 1){//符合有效期时间区间的要求
							if(resultMap.get("cardtype").equals("0")){//次卡
								String restcount = resultMap.get("restcount").toString();//剩余次数
								if(Integer.parseInt(restcount)==0){//已用完
									MyMongo.mRequestFail(request, "此卡次数已用完");
									return this.returnError(resultJson, ResMessage.All_Already_Used.code, request);
								}
							}else if(resultMap.get("cardtype").equals("1")){//储值卡
								String restvalue = resultMap.get("restvalue").toString();
								if(Integer.parseInt(restvalue)==0){//已用完
									MyMongo.mRequestFail(request, "此卡点数已用完");
									return this.returnError(resultJson, ResMessage.All_Already_Used.code, request);
								}
							}
							List<Map<String, Object>> cinemaList = cinameDao.getConfCinemaList(searchInfo);
							if(cinemaList != null && cinemaList.size()>0){
								String consumetype = "";
								boolean cinemaFlag = false;
								JSONArray jsonArray = new JSONArray();
								for(int i=0;i<cinemaList.size();i++){
									Map<String, Object> cinemaMap = cinemaList.get(i);
									String theaterNum = cinemaMap.get("theaternum").toString();
									String theaterName = cinemaMap.get("theatername").toString();
									if(theaternum.equals(theaterNum)){//存在该影院
										cinemaFlag = true;
										consumetype = cinemaMap.get("consumetype").toString();
									}
									JSONObject cinemaData = new JSONObject();
									cinemaData.put("cinemaname", theaterName);
									jsonArray.add(cinemaData);
								}
								if(cinemaFlag == false){
									JSONObject data = new JSONObject();
									data.put("cinemainfo", jsonArray);
									data.put("cardname", cardname);
									resultJson.put("data", data);
									MyMongo.mRequestFail(request, "此卡不能在当前影院进行消费");
									return this.returnError(resultJson, ResMessage.Card_Cinema_Consume_Fail.code, request);
								}else{
									if("2".equals(consumetype) || "3".equals(consumetype)){//前台可消费
										JSONObject data = new JSONObject();
										data.put("cardconfid", resultMap.get("cardconfid"));
										data.put("cardname", resultMap.get("cardname"));
										data.put("cardtype", resultMap.get("cardtype"));
										data.put("cardtype_name", Convert.convertCardConfType(resultMap.get("cardtype").toString()));
										data.put("count", resultMap.get("count"));
										data.put("value", resultMap.get("value"));
										data.put("starttime", new SimpleDateFormat("yyyy-MM-dd").format(resultMap.get("starttime")));
										data.put("endtime", new SimpleDateFormat("yyyy-MM-dd").format(resultMap.get("endtime")));
										data.put("quantity", resultMap.get("quantity"));
										data.put("note", resultMap.get("note"));
										data.put("cardnumber", resultMap.get("cardnumber"));
										data.put("cardcipher", resultMap.get("cardcipher"));
										data.put("cardid", resultMap.get("cardid"));
										data.put("restcount", resultMap.get("restcount"));
										data.put("restvalue", resultMap.get("restvalue"));
										data.put("createtime", resultMap.get("createtime"));
										data.put("consumetype", Convert.convertConfCinemaType(consumetype));
										resultJson.put("data", data);
									}else{
										JSONObject data = new JSONObject();
										data.put("cardname", cardname);
										resultJson.put("data", data);
										MyMongo.mRequestFail(request, "此卡只能在线上进行消费");
										return this.returnError(resultJson, ResMessage.Card_Cinema_Consume_Online.code, request);
									}
								}
							}else{
								JSONObject data = new JSONObject();
								data.put("cardname", cardname);
								resultJson.put("data", data);
								MyMongo.mRequestFail(request, "查询通卡券影院配置信息不存在");
								return this.returnError(resultJson, ResMessage.No_Conf_Cinema.code, request);
							}
							
						}else{
							JSONObject data = new JSONObject();
							data.put("cardname", cardname);
							data.put("starttime", starttime);
							data.put("endtime", endtime);
							resultJson.put("data", data);
							MyMongo.mRequestFail(request, "此卡不在可消费的有效期");
							return this.returnError(resultJson, ResMessage.Not_With_Validity.code, request);
						}
					}
					
				}else{
					MyMongo.mRequestFail(request, "查询发行卡号信息不存在");
					return this.returnError(resultJson, ResMessage.Select_Info_NotExist.code, request);
				}
			} catch (Exception e){
				MyMongo.mErrorLog("查询发行卡号信息失败", request, e);
				return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request);
			}
			long etime = System.currentTimeMillis();
			MyMongo.mRequestLog("查询发行卡号信息成功",  etime - stime, request, resultJson);
			return this.response(resultJson, request);
		}else{
			MyMongo.mRequestFail(request, "登录超时");
			return this.returnError(resultJson, ResMessage.User_Login_TimeOut.code, request);
		}
	}
	
	
	/**
	 * 根据卡号、密码核销
	 * @throws UnsupportedEncodingException 
	 */
	@GET
	@POST
	@Path("/chargeOffCard")
	@Produces("text/html;charset=UTF-8")
	public String chargeOffCard(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String userid = String.valueOf(request.getAttribute("userid"));
		List<String> userFeilds = userRedis.getUserField(userid, "theaternum".getBytes(),"theaterid".getBytes());
		if(userFeilds != null){
			String cardconfid = request.getParameter("cardconfid");
			String cardid = request.getParameter("cardid");
			String cardnumber = request.getParameter("cardnumber");
			String spend = request.getParameter("spend");//核销次数、点数
			String cardtype = "";
			try{
				if(!privilegeCheck(request, Permission.cardChargeOff, userRedis)){
					MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
					return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
				}
				
				if (CodeUtil.checkParam(cardconfid,cardid,spend)){
					MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
					return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
				}
				Map<String,Object> paramMap = new HashMap<String, Object>();
				paramMap.put("cardconfid", cardconfid);
				paramMap.put("cardid", cardid);
				paramMap.put("cinemaid", userFeilds.get(1));
				Map<String, Object> cardMap = cardDao.getCardInfo(paramMap);//查询基本信息
				String count = "0";
				String value = "0";
				if(cardMap.get("status").toString().equals("1")){//已生成
					cardtype = cardMap.get("cardtype").toString();
					count = cardMap.get("count").toString();//次数
					value = cardMap.get("value").toString();//面值
					
					//查询影院配置信息
					Map<String, Object> cinemaMap = cinameDao.getConfCinemaByCinemaid(paramMap);
					//插入核销次数记录
					Map<String,Object> insertRecordMap = new HashMap<String, Object>();
					insertRecordMap.put("cardid", cardid);
					insertRecordMap.put("cardconfid", cardconfid);
					insertRecordMap.put("cinemaid", userFeilds.get(1));
					insertRecordMap.put("ext_userid", 0);
					insertRecordMap.put("status", 0);
					insertRecordMap.put("createtime", new Date());
					insertRecordMap.put("operatorid", userid);
					//修改卡信息
					Map<String,Object> updateCardMap = new HashMap<String, Object>();
					updateCardMap.put("cardid", cardid);
					updateCardMap.put("cardconfid", cardconfid);
					updateCardMap.put("modifytime", new Date());
					DecimalFormat fnum = new  DecimalFormat("##0.00");
					Map<String, Object> recordMap = cardDao.getRecordByCardid(paramMap);//查询是否还可以核销
					if("0".equals(cardtype)){//次卡
						String sumCount = "0";//已消费次数
						if(recordMap != null){
							sumCount = recordMap.get("sumcount").toString();
						}
						int yucount = Integer.parseInt(count) - Integer.parseInt(sumCount);//剩余次数
						if(yucount > Integer.parseInt(spend) || yucount == Integer.parseInt(spend)){//可用次数大于或等于待消费次数
							float spendValue = Float.parseFloat(value) * Integer.parseInt(spend);//本次消费面值
							float spendSettle = Float.parseFloat(cinemaMap.get("settlevalue").toString()) * Integer.parseInt(spend);//本次消费结算价
							insertRecordMap.put("value", fnum.format(spendValue));//面值
							insertRecordMap.put("count", spend);//次数
							insertRecordMap.put("settleprice", fnum.format(spendSettle));//结算价
							cardDao.insertCardRecord(insertRecordMap);
							//更新可用的卡号信息
							String restcount = cardMap.get("restcount").toString();
							int writecount = Integer.parseInt(restcount) - Integer.parseInt(spend);//此次写入的剩余次数
							updateCardMap.put("restcount", writecount);
							cardDao.updateCard(updateCardMap);
							
						}else{//剩余次数不足、不可核销
							JSONObject data = new JSONObject();
							data.put("cardtype", cardtype);
							data.put("rest", yucount);
							resultJson.put("data", data);
							return this.returnError(resultJson, ResMessage.All_Already_Used.code, request);
						}
						
					}else if("1".equals(cardtype)){//储值卡
						String sumValue = "0";
						if(recordMap != null){
							sumValue = recordMap.get("sumvalue").toString();
						}
						double yuvalue1 = Double.parseDouble(value) - Double.parseDouble(sumValue);//剩余点数
						double yuvalue = Arith.sub(Double.parseDouble(value), Double.parseDouble(sumValue));//剩余点数
						double usevalue = Arith.sub(yuvalue1, Double.parseDouble(spend));
						if(usevalue >= 0){//可用点数大于或等于待消费点数
							float spendSettle = Float.parseFloat(cinemaMap.get("settlerate").toString()) * Float.parseFloat(spend);//本次消费结算价
							insertRecordMap.put("value", spend);//消费面值
							insertRecordMap.put("count", 0);//次数
							insertRecordMap.put("settleprice", fnum.format(spendSettle));//结算价
							cardDao.insertCardRecord(insertRecordMap);
							//更新可用的卡号信息
							String restvalue = cardMap.get("restvalue").toString();
							//float writevalue1 = Float.parseFloat(restvalue) - Float.parseFloat(spend);//
							double writevalue = Arith.sub(Double.parseDouble(restvalue), Double.parseDouble(spend));
							updateCardMap.put("restvalue", fnum.format(writevalue));
							cardDao.updateCard(updateCardMap);
						}else{//剩余点数不足、不可核销
							JSONObject data = new JSONObject();
							data.put("cardtype", cardtype);
							data.put("rest", yuvalue);
							resultJson.put("data", data);
							return this.returnError(resultJson, ResMessage.All_Already_Used.code, request);
						}
					}else{
						return this.returnError(resultJson, ResMessage.Commit_Operator_Fail.code, request);
					}
				}else{
					return this.returnError(resultJson, ResMessage.Commit_Operator_Fail.code, request);
				}
			} catch (Exception e){
				MyMongo.mErrorLog("卡号核销信息失败", request, e);
				return this.returnError(resultJson, ResMessage.Update_Info_Fail.code, request);
			}
			long etime = System.currentTimeMillis();
			MyMongo.mRequestLog("["+cardnumber+"]卡号核销["+spend+"]次/点数成功",  etime - stime, request, resultJson);
			String logContent = "["+cardnumber+"]卡号核销["+spend+"]次/点数";
			logInfo.addLogInfo(request, "0", logContent);
			return this.response(resultJson, request);
		}else{
			MyMongo.mRequestFail(request, "登录超时");
			return this.returnError(resultJson, ResMessage.User_Login_TimeOut.code, request);
		}
	}
	
	
	
	/**
	 * 查看核销列表
	 */
	@GET
	@POST
	@Path("/getChargeOffCardList")
	@Produces("text/html;charset=UTF-8")
	public String getChargeOffCardList(@Context HttpServletRequest request, @Context HttpServletResponse response){
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String userid = String.valueOf(request.getAttribute("userid"));
		List<String> userFeilds = userRedis.getUserField(userid, "roletype".getBytes(), "theaternum".getBytes(),"theaterid".getBytes());
		if(userFeilds != null){
			if(!privilegeCheck(request, Permission.cardRecordInfo, userRedis)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
				return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
			}
			//分页参数、条件查询参数
			String pagesize = request.getParameter("pagesize");//每页多少条数据
			String page = request.getParameter("page");//page＝（当前页数－1）*pagesize
			String type = request.getParameter("type");//是否查询个人核销数据
			try{
				Map<String, Object> searchInfo = new HashMap<String, Object>();
				searchInfo.put("pageSize", Integer.parseInt(pagesize));
				searchInfo.put("offsetNum", Integer.parseInt(pagesize) * (Integer.parseInt(page) - 1));
				Map<String, Object> countMap = new HashMap<String, Object>();
				String count = "";
				List<Map<String, Object>> resultList = null;
				if(type.equals("one")){//仅查询当前操作员的记录
					searchInfo.put("userid", userid);
					searchInfo.put("cinemaid", userFeilds.get(2));
					countMap = cardDao.getChargeOffCardCount(searchInfo);
					count = countMap.get("count").toString();
					resultList = cardDao.getChargeOffCardList(searchInfo);
				}else{
					if(!userFeilds.get(1).equals("0")){//影院人员只查询当前影院
						searchInfo.put("cinemaid", userFeilds.get(2));
					}
					String search = URLDecoder.decode(request.getParameter("search"), "UTF-8");
					if(!CodeUtil.checkParam(search)){
						searchInfo.put("cardnumber", "%" + search + "%");
					} 
					String starttime = request.getParameter("starttime");
					String endtime = request.getParameter("endtime");
					String status = request.getParameter("status");
					String cardtype = request.getParameter("cardtype");
					searchInfo.put("starttime", starttime);
					searchInfo.put("endtime", endtime);
					searchInfo.put("status", status);
					searchInfo.put("cardtype", cardtype);
					countMap = cardDao.getChargeOffCardCount(searchInfo);
					count = countMap.get("count").toString();
					resultList = cardDao.getChargeOffCardList(searchInfo);
				}
				
				JSONArray jsonArray = new JSONArray();
				if(resultList != null && resultList.size() > 0){
					for(int i=0;i<resultList.size();i++){
						Map<String, Object> resultMap = resultList.get(i);
						JSONObject data = new JSONObject();
						data.put("recordid", resultMap.get("recordid"));
						data.put("cardid", resultMap.get("cardid"));
						data.put("cardconfid", resultMap.get("cardconfid"));
						data.put("value", resultMap.get("value"));
						data.put("count", resultMap.get("count"));
						data.put("status", resultMap.get("status"));
						data.put("status_name", Convert.convertCardRecordStatus(resultMap.get("status").toString()));
						data.put("createtime", new SimpleDateFormat("yyyy-MM-dd HH:mm").format(resultMap.get("createtime")));
						String modifytime = resultMap.get("modifytime")==null || resultMap.get("modifytime").equals("") ? "无" : new SimpleDateFormat("yyyy-MM-dd HH:mm").format(resultMap.get("modifytime"));
						data.put("modifytime", modifytime);
						long time = DateFormatUtil.compareDayTime(resultMap.get("createtime").toString(), new SimpleDateFormat("yyyy-MM-dd HH:mm").format(new Date()));
						data.put("difftime", time);
						data.put("cardname", resultMap.get("cardname"));
						data.put("cardtype", resultMap.get("cardtype"));
						data.put("cardtype_name", Convert.convertCardConfType(resultMap.get("cardtype").toString()));
						data.put("confcount", resultMap.get("confcount"));
						data.put("confvalue", resultMap.get("confvalue"));
						data.put("starttime", new SimpleDateFormat("yyyy-MM-dd").format(resultMap.get("starttime")));
						data.put("endtime", new SimpleDateFormat("yyyy-MM-dd").format(resultMap.get("endtime")));
						data.put("cardnumber", resultMap.get("cardnumber"));
						data.put("restcount", resultMap.get("restcount"));
						data.put("restvalue", resultMap.get("restvalue"));
						data.put("username", resultMap.get("username"));
						data.put("cinemaid", resultMap.get("cinemaid"));
						data.put("theatername", resultMap.get("theatername"));
						jsonArray.add(data);
					}
					resultJson.put("total", count);
					resultJson.put("data", jsonArray);
				}else{
					MyMongo.mRequestFail(request, "查询卡号核销信息列表不存在");
					return this.returnError(resultJson, ResMessage.Select_Info_NotExist.code, request);
				}
			} catch (Exception e){
				MyMongo.mErrorLog("查询卡号核销信息列表失败", request, e);
				return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request);
			}
			long etime = System.currentTimeMillis();
			MyMongo.mRequestLog("查询卡号核销信息列表成功",  etime - stime, request, resultJson);
			return this.response(resultJson, request);
		}else{
			MyMongo.mRequestFail(request, "登录超时");
			return this.returnError(resultJson, ResMessage.User_Login_TimeOut.code, request);
		}
	}
	
	/**
	 * 退款
	 * @throws UnsupportedEncodingException 
	 */
	@GET
	@POST
	@Path("/refundChargeOff")
	@Produces("text/html;charset=UTF-8")
	public String refundChargeOff(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		String recordid = request.getParameter("recordid");
		String cardid = request.getParameter("cardid");
		String cardconfid = request.getParameter("cardconfid");
		String cinemaid = request.getParameter("cinemaid");
		String cardname = "";
		String cardnumber = "";
		String userid = String.valueOf(request.getAttribute("userid"));
		List<String> userFeilds = userRedis.getUserField(userid, "theaternum".getBytes(),"theaterid".getBytes());
		if(userFeilds != null){
			try{
				if(!privilegeCheck(request, Permission.refundCard, userRedis)){
					MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
					return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
				}
				if(!userFeilds.get(1).equals(cinemaid)){//当前操作员不为影城用户
					MyMongo.mRequestFail(request, ResMessage.No_Theater_Staff.code);
					return this.returnError(resultJson, ResMessage.No_Theater_Staff.code, request);
				}
				Map<String, Object> searchInfo = new HashMap<String, Object>();
				searchInfo.put("recordid", recordid);
				searchInfo.put("cardid", cardid);
				searchInfo.put("cardconfid", cardconfid);
				Map<String, Object> cardMap = cardDao.getCardInfo(searchInfo);//查询基本信息
				if(cardMap != null){
					cardname = cardMap.get("cardname").toString();
					cardnumber = cardMap.get("cardnumber").toString();
					String cardtype = cardMap.get("cardtype").toString();
					//修改消费记录信息
					Map<String,Object> updateMap = new HashMap<String, Object>();
					updateMap.put("cardid", cardid);
					updateMap.put("cardconfid", cardconfid);
					updateMap.put("recordid", recordid);
					updateMap.put("status", 1);
					updateMap.put("operatorid", userid);
					updateMap.put("modifytime", new Date());
					DecimalFormat fnum = new  DecimalFormat("##0.00");
					Map<String, Object> recordMap = cardDao.getRecordByRecordid(searchInfo);//查询到该条核销记录的数据
					if("0".equals(cardtype)){//次卡
						cardDao.updateCardReord(updateMap);//修改核销记录的状态为已退款
						//更新可用的卡号信息
						String restcount = cardMap.get("restcount").toString();
						String returncount = recordMap.get("count").toString();
						int writecount = Integer.parseInt(restcount) + Integer.parseInt(returncount);
						updateMap.put("restcount", writecount);
						cardDao.updateCard(updateMap); 
					}else if("1".equals(cardtype)){//储值卡
						cardDao.updateCardReord(updateMap);//修改核销记录的状态为已退款
						//更新可用的卡号信息
						String restvalue = cardMap.get("restvalue").toString();
						String returnvalue = recordMap.get("value").toString();
						double writevalue = Arith.add(Double.parseDouble(restvalue), Double.parseDouble(returnvalue));
						updateMap.put("restvalue", fnum.format(writevalue));
						cardDao.updateCard(updateMap);
					}else{
						return this.returnError(resultJson, ResMessage.Commit_Operator_Fail.code, request);
					}
				}else{
					return this.returnError(resultJson, ResMessage.Select_Info_NotExist.code, request);
				}
			} catch (Exception e){
				MyMongo.mErrorLog("["+cardname+"]批次下的卡号["+cardnumber+"]退款失败", request, e);
				return this.returnError(resultJson, ResMessage.Select_Info_Fail.code, request);
			}
			long etime = System.currentTimeMillis();
			MyMongo.mRequestLog("["+cardname+"]批次下的卡号["+cardnumber+"]退款成功",  etime - stime, request, resultJson);
			String logContent = "["+cardname+"]批次下的卡号["+cardnumber+"]退款成功";
			logInfo.addLogInfo(request, "0", logContent);
			return this.response(resultJson, request);
		}else{
			MyMongo.mRequestFail(request, "登录超时");
			return this.returnError(resultJson, ResMessage.User_Login_TimeOut.code, request);
		}
	}
	
	
}
