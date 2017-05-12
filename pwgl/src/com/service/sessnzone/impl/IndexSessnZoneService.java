package com.service.sessnzone.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.common.constant.PageConstant;
import com.common.constant.SystemConstant;
import com.common.constant.UserConstant;
import com.common.dp.Param;
import com.common.exception.DpException;
import com.common.session.ISession;
import com.common.session.SessionManager;
import com.common.util.DateUtil;
import com.common.util.IdUtil;
import com.common.util.SqlUtil;
import com.service.BaseService;
import com.service.IService;
import com.service.sessnzone.entity.SessnPew;
import com.service.sessnzone.entity.SessnZone;
/**
 * 分区/座位
 * 
 * @author Administrator
 * 
 */
@Component
public class IndexSessnZoneService extends BaseService implements IService {

	@Override
	public void install() {
		// TODO Auto-generated method stub

	}

	@Override
	@Transactional(rollbackFor = Exception.class)
	public void service(Param pm) throws Exception {

		String data = (String) pm.getData();
		if (StringUtils.trimToNull(data) == null) {
			return;
		}
		int dataPackType = pm.getDataFormat();
		if (SystemConstant.jsonType == dataPackType) {
			JSONObject obj = JSON.parseObject(data);
			String operType = obj.getString("operType");
			if ("fqindex".equals(operType)) {
				fqindex(pm, obj);
			} else if("addFq".equals(operType)){
				addFq(pm,obj);
			}else if("queryccmc".equals(operType)){
				queryccmc(pm,obj);
			}else if("queryct".equals(operType)){
				queryct(pm,obj);
			}else if("queryZw".equals(operType)){
				queryZw(pm,obj);
			}else if("queryHz".equals(operType)){
				queryHz(pm,obj);
			}else if("sc".equals(operType)){
				sc(pm,obj);
			}else if("update".equals(operType)){
				update(pm,obj);
			}else{
				pm.setData("fail");
				throw new DpException("操作类型错误，请联系系统管理员！", null);
			}
		}
	}

	private void fqindex(Param pm, JSONObject obj) throws Exception {
		try {
			Map<String,Object> map = new HashMap<String,Object>();
			map.put("sessnzoneid", obj.getString("sessnzoneid"));
			map.put("sessionsid", obj.getString("sessionsid"));
			List<SessnZone> list = getDao().query("sessnzone.querySessnzone", map,
					SessnZone.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败", e);
		}
	}
	
	//查询演出厅
	private void queryct(Param pm,JSONObject obj)throws Exception{
		try{
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("sessionsid", obj.getString("sessionsid"));
			List<SessnZone> list=getDao().query("sessnzone.queryYct", map, SessnZone.class);
			pm.setData(list);
		}catch(Exception e){
			pm.setData("fail");
			throw new DpException("查询失败",e);
		}
	}
	
	//添加分区
	private void addFq(Param pm,final JSONObject obj) throws Exception{
		try{
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String userId = (String) session.getAttribute(UserConstant.USER_XTID);
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			final String sessnzoneid = IdUtil.createThirteenId();
			final String sessionsid= obj.getString("sessionsid");
			getDao().getJdbcTemplate().update(
					SqlUtil.getSql("sessnzone.insertSessnzone", null).getSql(),
					new PreparedStatementSetter() {
						public void setValues(PreparedStatement ps)
								throws SQLException {
							ps.setObject(1, sessnzoneid);
							ps.setObject(2, sessionsid);//sessionsid
							ps.setObject(3, obj.getString("yct"));//hallid
							ps.setObject(4, obj.getString("fqmc"));//分区名称
							ps.setObject(5, obj.getString("wz"));//位置
							ps.setObject(6, obj.getString("sszwt"));//所属的座位图--pewpic
							ps.setObject(7, obj.getString("fqgz"));//分区规则
							ps.setObject(8, obj.getString("g"));//高度
							ps.setObject(9, obj.getString("k"));//宽度
							ps.setObject(10, obj.getString("zshs"));//行
							ps.setObject(11, obj.getString("zwls"));//列
							ps.setObject(12, obj.getString("xzb"));//x
							ps.setObject(13,obj.getString("yzb"));//y
							ps.setObject(14, obj.getString("fqwz"));//分区文字
							ps.setObject(15, obj.getString("bjys"));//背景颜色
							ps.setObject(16, obj.getString("tpurl"));//图片url
							ps.setObject(17, obj.getString("fqlx"));//分区类型
							ps.setObject(18, obj.getString("ms"));//分区图片描述
							ps.setObject(19, obj.getString("sm"));//说明	
							ps.setObject(20, SystemConstant.qyzt);
							ps.setObject(21, SystemConstant.delstatus);
							ps.setObject(22, obj.getString("vid"));
							ps.setObject(23, userId);
							ps.setObject(24,sysTime);
							ps.setObject(25, userId);
							ps.setObject(26, sysTime);
						}
					});
			
			//写入ch
			
			//写入座位表
		    String hs=obj.getString("zshs");//行数
		    String ls=obj.getString("zwls");//列数
		    int h=0,l=0;
		    if(!"".equals(hs)&&null!=hs){
		    	h=Integer.parseInt(hs);
		    }
		    
		    if(!"".equals(ls)&&null!=ls){
		    	l=Integer.parseInt(ls);
		    }
		    for(int i=0;i<h;i++){
		    	for(int j=0;j<l;j++){
		    		final int z=j;
		    		final int x=i;
		    		final String pewid = IdUtil.createThirteenId();
		    		getDao().getJdbcTemplate().update(
							SqlUtil.getSql("sessnzone.insertSessnpew", null).getSql(),
							new PreparedStatementSetter() {
								public void setValues(PreparedStatement ps)
										throws SQLException {
									ps.setObject(1, pewid);
									ps.setObject(2, obj.getString("sessionsid"));//sessionsid
									ps.setObject(3, obj.getString("yct"));//hallid
									ps.setObject(4,sessnzoneid);//zoneid
									ps.setObject(5, "第"+(x+1)+"排,第"+(z+1)+"座");//pewname --座位名
									ps.setObject(6, x+1);//排号
									ps.setObject(7, z+1);//列号
									ps.setObject(8, "");//是否加座
									ps.setObject(9, "");//票价等级ID
									ps.setObject(10, 0);//票价
									ps.setObject(11, "");//预留分类ID
									ps.setObject(12,"");//是否可预售
									ps.setObject(13, "");//是否可售
									ps.setObject(14, "");//是否可取
									ps.setObject(15, "");//备注
									ps.setObject(16, "");//座位状态
									ps.setObject(17, SystemConstant.qyzt);//禁启状态
									ps.setObject(18,SystemConstant.delstatus);//删除状态
									ps.setObject(19, 0);//数据版本号
									ps.setObject(20, userId);
									ps.setObject(21,sysTime);
									ps.setObject(22, userId);
									ps.setObject(23, sysTime);
									ps.setObject(24, x*10+z+1);
								}
							});
		    	}
		    }
			pm.setData("success");
		}catch(Exception e){
			pm.setData("fail");
			throw new DpException("新增失败",e);
		}
	} 
	
	//查询场次名称
	private void queryccmc(Param pm,JSONObject obj) throws Exception{
		try{
			List<SessnZone> list=getDao().query("sessnzone.queryCcmc", null, SessnZone.class);
			pm.setData(list);
		}catch(Exception e){
			pm.setData("fail");
			throw new DpException("查询失败",e);
		}
	}
	
	//根据分区查询座位
	private void queryZw(Param pm,JSONObject obj) throws Exception{
		try{
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("zoneid", obj.getString("sessnzoneid"));
			List<SessnPew> list=getDao().query("sessnzone.queryZw", map, SessnPew.class);
			pm.setData(list);
		}catch(Exception e){
			pm.setData("fail");
			throw new DpException("查询失败",e);
		}
	}
	
	//根据座位查询汇总数据
	private void queryHz(Param pm,JSONObject obj) throws Exception{
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			map.put("sessnzoneid", obj.getString("sessnzoneid"));
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao()
						.queryForPage("sessnzone.queryHz", map,
								SessnPew.class);
				pm.setData(list);
			} else {
				List<SessnPew> list = getDao()
						.query("sessnzone.queryHz", map,
								SessnPew.class);
				pm.setData(list);
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("加载失败！", e);
		}
	}
	
	//删除
	private void sc(Param pm,JSONObject obj) throws Exception{
		try{
			Map<String,Object> map = new HashMap<String,Object>();
			String ids=obj.getString("sessnzoneids");
			map.put("sessnzoneids", ids.split(","));
			getDao().delete("sessnzone.deleteFq", map);
			map.clear();
			map.put("zoneid", ids.split(","));
			getDao().delete("sessnzone.deleteZw", map);
			pm.setData("success");
		}catch(Exception e){
			pm.setData("fail");
			throw new DpException("删除失败！",e);
		}
	}
	
	//修改
	private void update(Param pm,final JSONObject obj) throws Exception{
		try{
		  Map<String,Object> map = new HashMap<String,Object>();
		  ISession session = SessionManager.getSession(pm.getSessionId());
		  final String userId = (String) session.getAttribute(UserConstant.USER_XTID);
		  final Timestamp sysTime = DateUtil.getNowTimestamp();
		  final String sessnzoneid = IdUtil.createThirteenId();
		  map.put("zonename", obj.getString("zonename"));
		  int i=getDao().queryCount("sessnzone.queryFqmc", map);
		  if(i>0){//表示修改--没有修改名称的情况
			  map.clear();
			  map.put("zonename", obj.getString("fqmc"));
			  map.put("rownum", obj.getString("zshs"));
			  map.put("colnum", obj.getString("zsls"));
			  map.put("sessnzoneid", obj.getString("sessnzoneid"));
			  map.put("des",obj.getString("sm"));
			  map.put("addr", obj.getString("wz"));
			  getDao().update("sessnzone.updateFq", map);
			  
			  //删除座位表信息
			  map.put("zoneid", obj.getString("sessnzoneid"));
			  getDao().delete("sessnzone.deleteZw", map);
			  
			  //写入座位表
		     String hs=obj.getString("zshs");//行数
		     String ls=obj.getString("zsls");//列数
		     int h=0,l=0;
		     if(!"".equals(hs)&&null!=hs){
		    	h=Integer.parseInt(hs);
		     }
		    
		     if(!"".equals(ls)&&null!=ls){
		    	l=Integer.parseInt(ls);
		     }
		     for(int a=0;a<h;a++){
		    	for(int j=0;j<l;j++){
		    		final int z=j;
		    		final int x=a;
		    		final String pewid = IdUtil.createThirteenId();
		    		getDao().getJdbcTemplate().update(
							SqlUtil.getSql("sessnzone.insertSessnpew", null).getSql(),
							new PreparedStatementSetter() {
								public void setValues(PreparedStatement ps)
										throws SQLException {
									ps.setObject(1, pewid);
									ps.setObject(2, obj.getString("sessionsid"));//sessionsid
									ps.setObject(3, obj.getString("yct"));//hallid
									ps.setObject(4,obj.getString("sessnzoneid"));//zoneid
									ps.setObject(5, "第"+(x+1)+"排,第"+(z+1)+"座");//pewname --座位名
									ps.setObject(6, x+1);//排号
									ps.setObject(7, z+1);//列号
									ps.setObject(8, "");//是否加座
									ps.setObject(9, "");//票价等级ID
									ps.setObject(10, 0);//票价
									ps.setObject(11, "");//预留分类ID
									ps.setObject(12,"");//是否可预售
									ps.setObject(13, "");//是否可售
									ps.setObject(14, "");//是否可取
									ps.setObject(15, obj.getString("sm"));//备注
									ps.setObject(16, "");//座位状态
									ps.setObject(17, SystemConstant.qyzt);//禁启状态
									ps.setObject(18,SystemConstant.delstatus);//删除状态
									ps.setObject(19, 0);//数据版本号
									ps.setObject(20, userId);
									ps.setObject(21,sysTime);
									ps.setObject(22, userId);
									ps.setObject(23, sysTime);
									ps.setObject(24, x*10+z+1);
								}
							});
			    	}
			    }
			  
		  }else{//表示添加--修改了名称不存在,表示添加			  
				getDao().getJdbcTemplate().update(
						SqlUtil.getSql("sessnzone.insertSessnzone", null).getSql(),
						new PreparedStatementSetter() {
							public void setValues(PreparedStatement ps)
									throws SQLException {
								ps.setObject(1, sessnzoneid);
								ps.setObject(2, obj.getString("sessionsid"));//sessionsid
								ps.setObject(3, obj.getString("yct"));//hallid
								ps.setObject(4, obj.getString("fqmc"));//分区名称
								ps.setObject(5, obj.getString("sszwt"));//所属的座位图--pewpic
								ps.setObject(6, obj.getString("fqgz"));//分区规则
								ps.setObject(7, obj.getString("g"));//高度
								ps.setObject(8, obj.getString("k"));//宽度
								ps.setObject(9, obj.getString("zshs"));//行
								ps.setObject(10, obj.getString("zsls"));//列
								ps.setObject(11, obj.getString("xzb"));//x
								ps.setObject(12,obj.getString("yzb"));//y
								ps.setObject(13, obj.getString("fqwz"));//分区文字
								ps.setObject(14, obj.getString("bjys"));//背景颜色
								ps.setObject(15, obj.getString("tpurl"));//图片url
								ps.setObject(16, obj.getString("fqlx"));//分区类型
								ps.setObject(17, obj.getString("ms"));//分区图片描述
								ps.setObject(18, obj.getString("sm"));//说明	
								ps.setObject(19, SystemConstant.qyzt);
								ps.setObject(20, SystemConstant.delstatus);
								ps.setObject(21, obj.getString("vid"));
								ps.setObject(22, userId);
								ps.setObject(23,sysTime);
								ps.setObject(24, userId);
								ps.setObject(25, sysTime);
							}
						});
				
				//写入座位表
			    String hs=obj.getString("zshs");//行数
			    String ls=obj.getString("zwls");//列数
			    int h=0,l=0;
			    if(!"".equals(hs)&&null!=hs){
			    	h=Integer.parseInt(hs);
			    }
			    
			    if(!"".equals(ls)&&null!=ls){
			    	l=Integer.parseInt(ls);
			    }
			    for(int a=0;a<h;a++){
			    	for(int j=0;j<l;j++){
			    		final int z=j;
			    		final int x=a;
			    		final String pewid = IdUtil.createThirteenId();
			    		getDao().getJdbcTemplate().update(
								SqlUtil.getSql("sessnzone.insertSessnpew", null).getSql(),
								new PreparedStatementSetter() {
									public void setValues(PreparedStatement ps)
											throws SQLException {
										ps.setObject(1, pewid);
										ps.setObject(2, obj.getString("sessionsid"));//sessionsid
										ps.setObject(3, obj.getString("yct"));//hallid
										ps.setObject(4,sessnzoneid);//zoneid
										ps.setObject(5, "第"+(x+1)+"排,第"+(z+1)+"座");//pewname --座位名
										ps.setObject(6, x+1);//排号
										ps.setObject(7, z+1);//列号
										ps.setObject(8, "");//是否加座
										ps.setObject(9, "");//票价等级ID
										ps.setObject(10, 0);//票价
										ps.setObject(11, "");//预留分类ID
										ps.setObject(12,"");//是否可预售
										ps.setObject(13, "");//是否可售
										ps.setObject(14, "");//是否可取
										ps.setObject(15, obj.getString("sm"));//备注
										ps.setObject(16, "");//座位状态
										ps.setObject(17, SystemConstant.qyzt);//禁启状态
										ps.setObject(18,SystemConstant.delstatus);//删除状态
										ps.setObject(19, 0);//数据版本号
										ps.setObject(20, userId);
										ps.setObject(21,sysTime);
										ps.setObject(22, userId);
										ps.setObject(23, sysTime);
										ps.setObject(24, x*10+z+1);
									}
								});
			    	}
			    }
		  }
		  pm.setData("success");
		}catch(Exception e){
			pm.setData("fail");
			throw new DpException("修改失败！",e);
		}
	}

	@Override
	public void unInstall() {
		// TODO Auto-generated method stub

	}

}
