package com.service.ticketface.impl;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.apache.commons.lang.StringUtils;
import org.jbarcode.JBarcode;
import org.jbarcode.encode.Code128Encoder;
import org.jbarcode.paint.EAN8TextPainter;
import org.jbarcode.paint.WidthCodedPainter;
import org.jbarcode.util.ImageUtil;
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
import com.common.util.FilePathUtil;
import com.common.util.IdUtil;
import com.common.util.SqlUtil;
import com.common.util.UploadFileUtil;
import com.common.util.ZxingUtil;
import com.google.zxing.EncodeHintType;
import com.service.BaseService;
import com.service.IService;
import com.service.ticketface.entity.Ccxx;
import com.service.ticketface.entity.Dbfield;
import com.service.ticketface.entity.Facemake;

@Component
public class IndexFacemakeService extends BaseService implements IService {

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
			if ("index".equals(operType)) {
				index(pm, obj);
			}else if("updatePic".equals(operType)){
				updatePic(pm,obj);
			}else if("selectSessions".equals(operType)){
				selectSessions(pm,obj);
			}else if("add".equals(operType)){
				add(pm,obj);
			}else if("getBarcode".equals(operType)){
				getBarcode(pm,obj);//生成条形码
			}else if("getQrcode".equals(operType)){
				getQrcode(pm,obj);//生成二维码
			}else if("selectDbfieled".equals(operType)){
				selectDbfieled(pm,obj);//数据库字段
			}else if("update".equals(operType)){
				update(pm,obj);//修改
			}else if("select".equals(operType)){
				select(pm,obj);//查询
			}else if("selectFacemake".equals(operType)){
				selectFacemake(pm,obj);//查询票版
			} else {
				pm.setData("fail");
				throw new DpException("操作类型错误，请联系系统管理员！", null);
			}
		}
	}
	
	private void selectFacemake(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sessionsid", obj.getString("sessionsid"));
			Facemake fm = (Facemake) getDao().queryForObject("facemake.selectFacemake", map, Facemake.class);
			pm.setData(fm);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}

	private void select(Param pm, JSONObject obj) {
		try {
			List<Facemake> list = getDao().query("facemake.selectSessions", null, Facemake.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}
	
	private void update(Param pm, final JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String xtId = (String) session.getAttribute(UserConstant.USER_XTID);
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			final String ticketfaceid = obj.getString("ticketfaceid");
			map.put("ticketfaceid", ticketfaceid);
			map.put("ticketname", obj.getString("ticketname"));
			map.put("bgurl", obj.getString("bgurl"));
			map.put("carbonlocation", obj.getString("carbonlocation"));
			map.put("carbonnum", obj.getString("carbonnum"));
			map.put("carbonheight", obj.getString("carbonheight"));
			map.put("mid", xtId);
			map.put("mtime", sysTime);
			getDao().update("facemake.updateFacemake", map);
			getDao().getJdbcTemplate().update(
					SqlUtil.getSql("facemake.updateTicketelement", null).getSql(),
					new PreparedStatementSetter() {
						public void setValues(PreparedStatement ps)
								throws SQLException {
							ps.setObject(1, obj.getString("content"));
							ps.setObject(2, xtId);
							ps.setObject(3, sysTime);
							ps.setObject(4, ticketfaceid);
						}
					});
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}
	
	@SuppressWarnings("unchecked")
	private void selectDbfieled(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("sessionsid", obj.getString("sessionsid"));
			List<Ccxx> ccList = getDao().query("facemake.selectDbfieled", map, Ccxx.class);
			List<Dbfield> dbList = new ArrayList<Dbfield>(); 
			if(null != ccList && ccList.size() > 0){
				Dbfield zwmc = new Dbfield();
				Ccxx ccxx = ccList.get(0);
				
				//座位
				zwmc.setFieldname("座位");
				zwmc.setFieldvalue("$座位{座位}");
				dbList.add(zwmc);
				
				//票价
				Dbfield pjmc = new Dbfield();
				pjmc.setFieldname("票价");
				pjmc.setFieldvalue("#票价{票价}");
				dbList.add(pjmc);
				
				//场馆名称
				Dbfield cgmc = new Dbfield();
				cgmc.setFieldname("场馆名称");			
				cgmc.setFieldvalue(ccxx.getCgmc());
				dbList.add(cgmc);
				
				Dbfield yctmc = new Dbfield();
				yctmc.setFieldname("演出厅名称");
				yctmc.setFieldvalue(ccxx.getYctmc());
				dbList.add(yctmc);
				
				Dbfield ycsmc = new Dbfield();
				ycsmc.setFieldname("演出商名称");
				ycsmc.setFieldvalue(ccxx.getYcsmc());
				dbList.add(ycsmc);
				
				Dbfield xmmc = new Dbfield();
				xmmc.setFieldname("项目名称");
				xmmc.setFieldvalue(ccxx.getXmmc());
				dbList.add(xmmc);
				
				Dbfield ccbh = new Dbfield();
				ccbh.setFieldname("场次编号");
				ccbh.setFieldvalue(ccxx.getCcbh());
				dbList.add(ccbh);
				
				Dbfield ccmc = new Dbfield();
				ccmc.setFieldname("场次名称");
				ccmc.setFieldvalue(ccxx.getCcmc());
				dbList.add(ccmc);
				
				Dbfield ywmc = new Dbfield();
				ywmc.setFieldname("英文名称");
				ywmc.setFieldvalue(ccxx.getYwmc());
				dbList.add(ywmc);
				
				Dbfield sysj = new Dbfield();
				sysj.setFieldname("上映时间");
				sysj.setFieldvalue(ccxx.getSysj());
				dbList.add(sysj);
				
				Dbfield pc = new Dbfield();
				pc.setFieldname("片长");
				pc.setFieldvalue(ccxx.getPc());
				dbList.add(pc);
				
				Dbfield zbf = new Dbfield();
				zbf.setFieldname("主办方");
				zbf.setFieldvalue(ccxx.getZbf());
				dbList.add(zbf);
				
				Dbfield zdzbf = new Dbfield();
				zdzbf.setFieldname("指定主办方");
				zdzbf.setFieldvalue(ccxx.getZdzbf());
				dbList.add(zdzbf);
				
				Dbfield cbf = new Dbfield();
				cbf.setFieldname("承办方");
				cbf.setFieldvalue(ccxx.getCbf());
				dbList.add(cbf);
				
				Dbfield wz = new Dbfield();
				wz.setFieldname("网址");
				wz.setFieldvalue(ccxx.getWz());
				dbList.add(wz);
			}
			pm.setData(dbList);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}
	
	private void getBarcode(Param pm, JSONObject obj) {
		try {
			JBarcode txm = new JBarcode(Code128Encoder.getInstance(), WidthCodedPainter.getInstance(), EAN8TextPainter.getInstance());
			String code = obj.getString("code");
			BufferedImage bi = txm.createBarcode(code);
			String fileName = "TXM_"+System.currentTimeMillis()+".png";
			SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
			String date = df.format(new Date());
			String filePath = "/ticket/"+date+"/"+fileName;
			String path = FilePathUtil.getWebRootPath()+SystemConstant.img+filePath;
			File file = new File(path);
			if(!file.getParentFile().exists()){
				file.getParentFile().mkdir();
			}
			FileOutputStream fos = new FileOutputStream(file);
			ImageUtil.encodeAndWrite(bi, "png", fos, 100, 100);
			pm.setData(filePath);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}
	
	@SuppressWarnings("all")
	private void getQrcode(Param pm, JSONObject obj) {
		try {
			String codeInfo = obj.getString("codeInfo");
			String fileName = "EWM_"+System.currentTimeMillis()+".png";
			SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
			String date = df.format(new Date());
			String filePath = "/ticket/"+date+"/"+fileName;
			String path = FilePathUtil.getWebRootPath()+SystemConstant.img+filePath;
			File file = new File(path);
			if(!file.getParentFile().exists()){
				file.getParentFile().mkdir();
			}
			Map map = new HashMap();
			map.put(EncodeHintType.MARGIN, 0);
			ZxingUtil.encodeStr(path, codeInfo, 100, 100, map);
			pm.setData(filePath);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}
	
	private void add(Param pm, final JSONObject obj) {
		try {
			ISession session = SessionManager.getSession(pm.getSessionId());
			final String xtId = (String) session.getAttribute(UserConstant.USER_XTID);
			final Timestamp sysTime = DateUtil.getNowTimestamp();
			final String ticketfaceid = IdUtil.createThirteenId();
			getDao().getJdbcTemplate().update(
					SqlUtil.getSql("facemake.insertTicketface", null).getSql(),
					new PreparedStatementSetter() {
						public void setValues(PreparedStatement ps)
								throws SQLException {
							ps.setObject(1, ticketfaceid);
							ps.setObject(2, obj.getString("sessionsid"));
							ps.setObject(3, IdUtil.createThirteenId());
							ps.setObject(4, obj.getString("ticketname"));
							ps.setObject(5, obj.getString("bgurl"));
							ps.setObject(6, obj.getString("carbonlocation"));
							ps.setObject(7, obj.getString("carbonnum"));
							ps.setObject(8, obj.getString("carbonheight"));
							ps.setObject(9, xtId);
							ps.setObject(10, sysTime);
							ps.setObject(11, xtId);
							ps.setObject(12, sysTime);
						}
					});
			getDao().getJdbcTemplate().update(
					SqlUtil.getSql("facemake.insertTicketelement", null).getSql(),
					new PreparedStatementSetter() {
						public void setValues(PreparedStatement ps)
								throws SQLException {
							ps.setObject(1, IdUtil.createThirteenId());
							ps.setObject(2, ticketfaceid);
							ps.setObject(3, obj.getString("content"));
							ps.setObject(4, xtId);
							ps.setObject(5, sysTime);
							ps.setObject(6, xtId);
							ps.setObject(7, sysTime);
						}
					});
			pm.setData("success");
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("新增失败！", e);
		}
	}
	
	private void selectSessions(Param pm, JSONObject obj) {
		try {
			List<Facemake> list = getDao().query("facemake.selectSessions", null, Facemake.class);
			pm.setData(list);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询失败！", e);
		}
	}
	
	private void updatePic(Param pm, JSONObject obj) {
		try {
			List<String> picUrl = UploadFileUtil.uploadFiles("ticket");
			String rePicUrl = picUrl.get(0);
			pm.setData(rePicUrl);
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("图片上传失败！", e);
		}
	}
	
	private void index(Param pm, JSONObject obj) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("ticketname", obj.getString("ticketname"));
			map.put("sessionsname", obj.getString("sessionsname"));
			Integer page = obj.getInteger("page");
			Integer rowNum = obj.getInteger("rowNum");
			if (page != null && rowNum != null) {
				map.put(PageConstant.PAGE_NUM, page);
				map.put(PageConstant.ROW_NUMS, rowNum);
				Object[] list = getDao().queryForPage("facemake.selectFacemake", map, Facemake.class);
				pm.setData(list);
			}
		} catch (Exception e) {
			pm.setData("fail");
			throw new DpException("查询异常！", e);
		}
	}
	
	@Override
	public void install() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void unInstall() {
		// TODO Auto-generated method stub
		
	}
}
