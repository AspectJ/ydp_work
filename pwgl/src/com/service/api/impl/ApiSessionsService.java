package com.service.api.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.common.constant.PageConstant;
import com.common.constant.SystemConstant;
import com.common.constant.TypeConstant;
import com.common.dp.Param;
import com.common.exception.DpException;
import com.common.util.SqlUtil;
import com.service.BaseService;
import com.service.IService;
import com.service.api.entity.ApiMoney;
import com.service.api.entity.ApiPew;
import com.service.api.entity.ApiPolicyPrice;
import com.service.api.entity.ApiPrefpolicy;
import com.service.api.entity.ApiPrice;
import com.service.api.entity.ApiReserve;
import com.service.api.entity.ApiSession;
import com.service.api.entity.ApiSetPolicy;
import com.service.api.entity.ApiZone;

/**
 * 场次列表
 * @author xjm
 *
 */
@Component
public class ApiSessionsService extends BaseService implements IService {

	@Override
	public void install() {
		// TODO Auto-generated method stub
		
	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void service(Param pm) throws Exception {

		String data = (String) pm.getData();
		int dataPackType = pm.getDataFormat();
		if (SystemConstant.jsonType == dataPackType) {
			JSONObject obj = JSON.parseObject(data);
			String operType = obj.getString("operType");
			if ("index".equals(operType)) {// 场次列表
				index(pm, obj);
			} else if("detail".equals(operType)){
				detail(pm,obj);
			}else{
				Map<String, Object> retMap = new HashMap<String, Object>();
				retMap.put(TypeConstant.SF, TypeConstant.FAIL);
				retMap.put(TypeConstant.SHOW_MSG, "操作类型错误！");
				pm.setData(retMap);
				throw new DpException("操作类型错误!", null);
			}
		}
	}
	
	//场次列表
	private void index(Param pm,JSONObject obj) throws Exception{
		Map<String, Object> retMap = new HashMap<String, Object>();
		try {
			Map<String,Object> map=new HashMap<String,Object>();
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if (null == page || null == rowNum) {
				retMap.put(TypeConstant.SF, "pageError");
				retMap.put(TypeConstant.SHOW_MSG, "分页参数有误!");
				pm.setData(retMap);
				return;
			}
			String itemid=obj.getString("itemid");
			String sessionsname=obj.getString("sessionsname");
			String producttypeid=obj.getString("producttypeid");
			String bgtime=obj.getString("bgtime");
			String endtime=obj.getString("endtime");
			map.put("itemid", itemid);
			map.put("sessionsname", sessionsname);
			map.put("producttypeid", producttypeid);
			map.put("bgtime",bgtime);
			map.put("endtime", endtime);
			map.put(PageConstant.PAGE_NUM, page);
			map.put(PageConstant.ROW_NUMS, rowNum);
			Object[] objArr = getDao().queryForPage("apisession.queryApiSession",
					map, ApiSession.class);
			List<ApiSession> list = null;
			Integer totalCount = 0;
			Integer totalPageSize = 0;
			if (null != objArr && objArr.length > 0) {
				list = (List<ApiSession>) objArr[0];
				totalCount = (Integer) objArr[1];
				totalPageSize = (Integer) objArr[2];
			}

			retMap.put("data", list);// 数据列表
			retMap.put("totalCount", totalCount);// 总记录数
			retMap.put("totalPageSize", totalPageSize);// 总页数
			retMap.put("pageNum", page);// 当前页
			retMap.put(TypeConstant.SF, TypeConstant.SUCCESS);
			retMap.put(TypeConstant.SHOW_MSG, "查询成功！");
			pm.setData(retMap);
		} catch (Exception e) {
			retMap.put(TypeConstant.SF, TypeConstant.FAIL);
			retMap.put(TypeConstant.SHOW_MSG, "查询失败！");
			pm.setData(retMap);
			throw new DpException("查询失败！", e);
		}
	}
	
	//场次详情
	private void detail(Param pm,JSONObject obj) throws Exception{
		Map<String, Object> retMap = new HashMap<String, Object>();
		try {
			Map<String,Object> map=new HashMap<String,Object>();
			String sessionsid=obj.getString("sessionsid");
			map.put("sessionsid", sessionsid);
			
			//查询分区
			List<ApiZone> zoneList=getDao().query("apisession.queryZoneList", map, ApiZone.class);
			
			//查询座位
			List<ApiPew> pewList=getDao().query("apisession.queryPewList", map, ApiPew.class);
			
			//查询票价等级
			List<ApiPrice> priceList=getDao().query("apisession.queryPriceList", map, ApiPrice.class);
			
			//查询预留种类
			List<ApiReserve> reserverList=getDao().query("apisession.queryReserverList", map, ApiReserve.class);
			
			//查询套票政策
			List<ApiSetPolicy> setpolicylist=getDao().query("apisession.querySetpolicyList", map, ApiSetPolicy.class);
			for(ApiSetPolicy policyObj:setpolicylist){
				
				//套票政策Id,根据套票政策ID查询明细表的票价，票价等级，原票价，套票价
				String setpolicyid=policyObj.getSetpolicyid();
				map.clear();
				map.put("policyid", setpolicyid);
				List<ApiPolicyPrice> pricePList=getDao().query("apisession.querySetpolicyPj", map, ApiPolicyPrice.class);
				if(null!=pricePList&&pricePList.size()>0){
					policyObj.setPriceList(pricePList);
				}
			}
			
			//查询优惠政策
			map.put("sessionsid", sessionsid);
			List<ApiPrefpolicy> prefpolicyList=getDao().query("apisession.queryPrefpolicyList", map, ApiPrefpolicy.class);
			for(ApiPrefpolicy prefpolicyObj:prefpolicyList){
				map.clear();
				String prefpolicyid=prefpolicyObj.getPrefpolicyid();
				map.put("policyid", prefpolicyid);
				List<ApiPolicyPrice> pricePList=getDao().query("apisession.querySetpolicyPj", map, ApiPolicyPrice.class);
				if(null!=pricePList&&pricePList.size()>0){
					prefpolicyObj.setPriceList(pricePList);
				}				
			}
			map.put("sessionsid", sessionsid);
			ApiMoney mobj=(ApiMoney) getDao().queryForObject("apisession.querySessionKyjj", map, ApiMoney.class);
			ApiMoney mobj1=(ApiMoney) getDao().queryForObject("apisession.queryXsjgKyjj", map, ApiMoney.class);
			double payboxtotal=0.00;
			double sessionstotal=0.00;
			if(mobj!=null){
				sessionstotal=mobj.getSessionstotal();//场次配额
			}
			if(mobj1!=null){
				payboxtotal=mobj1.getPayboxtotal();//售票机构配额
			}
			retMap.put("payboxtotal", payboxtotal);
			retMap.put("sessionstotal", sessionstotal);
			retMap.put("zonelist", zoneList);
			retMap.put("pewlist", pewList);
			retMap.put("pricelist", priceList);
			retMap.put("reservelist", reserverList);
			retMap.put("setpolicylist", setpolicylist);
			retMap.put("prefpolicylist", prefpolicyList);
			retMap.put(TypeConstant.SF, TypeConstant.SUCCESS);
			retMap.put(TypeConstant.SHOW_MSG, "查询成功！");
			pm.setData(retMap);			
		} catch (Exception e) {
			retMap.put(TypeConstant.SF, TypeConstant.FAIL);
			retMap.put(TypeConstant.SHOW_MSG, "查询失败！");
			pm.setData(retMap);
			throw new DpException("查询失败！", e);
		}
		
	}

	@Override
	public void unInstall() {
		// TODO Auto-generated method stub
		
	}

}
