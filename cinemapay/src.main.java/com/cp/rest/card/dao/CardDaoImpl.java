package com.cp.rest.card.dao;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.Number;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

import org.springframework.stereotype.Service;


import com.cp.bean.Convert;
import com.cp.filter.BaseDao;
import com.cp.util.Config;
import com.cp.util.DesUtil;
import com.mongo.MyMongo;
import com.tools.qiniu.init.QNInitAuth;
import com.tools.qiniu.init.upload.QNUpload;

@Service("cardDao")
public class CardDaoImpl extends BaseDao{

	/**
	 * 批次卡号信息查询 
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> getCardList(Map<String, Object> paramMap){
		List<Map<String, Object>> infoList = getSqlSession().selectList("card.getCardList", paramMap);
		return infoList;
	}
	
	/**
	 * 查询批次卡号总数量
	 */
	public Map<String, Object> getCardCount(Map<String, Object> paramMap){
		Map<String, Object> countMap = getSqlSession().selectOne("card.getCardCount", paramMap);
		return countMap;
	}
	
	/**
	 * 新增批次卡号
	 * 
	 * @param insertMap
	 */
//	public Map<String, Object> insertCard(Map<String, Object> insertMap){
//		getSqlSession().insert("card.insertCard", insertMap);
//		return insertMap;
//	}
	
	public void insertCard(List<Map<String, Object>> insertList){
		getSqlSession().insert("card.insertCard", insertList);
	}
	
	/**
	 * 修改批次卡号信息
	 * 
	 * @param updateMap
	 */
	public Map<String, Object> updateCard(Map<String, Object> updateMap){
		getSqlSession().update("card.updateCard", updateMap);
		return updateMap;
	}
	
	
	/**
	 * 删除通卡（券）卡号信息
	 * 
	 * @param deleteMap
	 */
	public Map<String, Object> deleteCard(Map<String, Object> paramMap){
		getSqlSession().delete("card.deleteCard", paramMap);
		return paramMap;
	}
	
	
	/**
	 * 查询批次卡号是否存在
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> checkRepeatCardNumber(Map<String, Object> paramMap){
		List<Map<String, Object>> list = getSqlSession().selectList("card.checkRepeatCardNumber", paramMap);
		return list;
	}
	
	
	/**
	 * 新增消费记录
	 * 
	 * @param insertMap
	 */
	public Map<String, Object> insertCardRecord(Map<String, Object> insertMap){
		getSqlSession().insert("card.insertCardRecord", insertMap);
		return insertMap;
	}
	
	/**
	 * 修改消费记录信息
	 * 
	 * @param updateMap
	 */
	public Map<String, Object> updateCardReord(Map<String, Object> updateMap){
		getSqlSession().update("card.updateCardReord", updateMap);
		return updateMap;
	}
	
	
	/**
	 * 根据密码查询卡号信息
	 * @param paramMap
	 * @return
	 */
	public Map<String, Object> getCardInfo(Map<String, Object> paramMap){
		Map<String, Object> map = getSqlSession().selectOne("card.getCardInfo", paramMap);
		return map;
	}
	
	
	/**
	 * 查询已消费情况
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> getCardRecordInfo(Map<String, Object> paramMap){
		List<Map<String, Object>> list = getSqlSession().selectList("card.getCardRecordInfo", paramMap);
		return list;
	}
	
	/**
	 * 查询单条消费记录
	 * @param paramMap
	 * @return
	 */
	public Map<String, Object> getRecordByRecordid(Map<String, Object> paramMap){
		Map<String, Object> map = getSqlSession().selectOne("card.getRecordByRecordid", paramMap);
		return map;
	}
	
	
	
	/**
	 * 查询某个批次影院配置信息
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> getJoinCinema(Map<String, Object> paramMap){
		List<Map<String, Object>> list = getSqlSession().selectList("card.getJoinCinema", paramMap);
		return list;
	}
	
	
	/**
	 * 查询卡号消费记录
	 * @param paramMap
	 * @return
	 */
	public Map<String, Object> getRecordByCardid(Map<String, Object> paramMap){
		Map<String, Object> map = getSqlSession().selectOne("card.getRecordByCardid", paramMap);
		return map;
	}
	
	
	/**
	 * 查询核销卡号信息
	 * @param paramMap
	 * @return
	 */
	public List<Map<String, Object>> getChargeOffCardList(Map<String, Object> paramMap){
		List<Map<String, Object>> list = getSqlSession().selectList("card.getChargeOffCardList", paramMap);
		return list;
	}
	
	
	/**
	 * 查询核销卡号信息总记录数
	 * @param paramMap
	 * @return
	 */
	public Map<String, Object> getChargeOffCardCount(Map<String, Object> paramMap){
		Map<String, Object> map = getSqlSession().selectOne("card.getChargeOffCardCount", paramMap);
		return map;
	}
	
	
	/**
	 * 生成卡号xls文件
	 */
	public String exportXlsFile(String cardconfid,HttpServletRequest request){
		String fileName = "";
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("cardconfid", Integer.parseInt(cardconfid));
		List<Map<String, Object>> resultList = getCardList(paramMap);
		List<Map<String, Object>> cinemaList = getJoinCinema(paramMap);
		if(resultList.size()>0 && cinemaList.size()>0){
			String cardname = cinemaList.get(0).get("cardname").toString();
			FileOutputStream outSTr = null;
			//BufferedOutputStream Buff = null;
			String path = request.getSession().getServletContext().getRealPath("/cardInfo/"+cardname+".xls");
			
			// 删除文件内容
			try {
				File f = new File(path);
				if(!f.exists()){//不存在则创建文件
					f.createNewFile();
				}else{//存在则先重写文件内容为空
					FileWriter fw = new FileWriter(f);
					fw.write("");
					fw.close();
				}
				
				outSTr = new FileOutputStream(new File(path));
				//Buff = new BufferedOutputStream(outSTr);
				String cardtype = cinemaList.get(0).get("cardtype").toString();
				String cardtypeName = Convert.convertCardConfType(cinemaList.get(0).get("cardtype").toString());
				String count = cinemaList.get(0).get("count").toString();
				String value = cinemaList.get(0).get("value").toString();
				String quantity = cinemaList.get(0).get("quantity").toString();
				String validity = new SimpleDateFormat("yyyy-MM-dd HH:mm").format(cinemaList.get(0).get("starttime"))+" 至 "+new SimpleDateFormat("yyyy-MM-dd HH:mm").format(cinemaList.get(0).get("endtime"));
//				String cinemas = "";   //20161028去掉可用影院的导出
//				int cinemaCount = 0;
//				for(int i=0;i<cinemaList.size();i++){
//					String cinema = cinemaList.get(i).get("theatername").toString();
//					if(cinemaCount == cinemaList.size() - 1){
//						cinemas = cinemas + cinema;
//					}else{
//						cinemas = cinemas + cinema + ",";
//					}
//					cinemaCount ++;
//				}
				//列标题
				String[] colTitle = null;
				if("0".equals(cardtype)){//次卡
					colTitle = new String[]{"序号","卡券名称","类型","可用次数","面值","发行数量","有效期","卡号","卡密码"};
				}else if("1".equals(cardtype)){//储值卡
					colTitle = new String[]{"序号","卡券名称","类型","可用次数","面值","发行数量","有效期","卡号","卡密码"};
				}
	            
				
				//创建工作薄
		        WritableWorkbook workbook = Workbook.createWorkbook(outSTr);
		        //创建新的一页
		        WritableSheet sheet = workbook.createSheet("卡号信息", 0);
		        for(int i=0;i<resultList.size()+1;i++){//行
		        	
		        	for(int j=0;j<colTitle.length;j++){//列
		        		if(i == 0){//第一行标题
		        			String title = colTitle[j];
		        			Label content = new Label(j,i,title);
		        			sheet.addCell(content);
		        		}else{//内容
		        			Map<String, Object> map = resultList.get(i-1);
		        			String col = "";
		        			String numType = "0";
		        			if(j == 0){//序号
		        				col = String.valueOf(i);
		        				numType = "1";
		        			}else if(j == 1){//第二列
		        				col = cardname;
		        			}else if(j == 2){
		        				col = cardtypeName;
		        			}else if(j == 3){
		        				col = count;
		        				numType = "1";
		        			}else if(j == 4){
		        				col = value;
		        				numType = "2";
		        			}else if(j == 5){
		        				col = quantity;
		        				numType = "1";
		        			}else if(j == 6){
		        				col = validity;
		        			}else if(j == 7){
		        				col = map.get("cardnumber").toString();
		        			}else if(j == 8){
		        				col = DesUtil.desDncrypt(map.get("cardcipher").toString(), Config.DES_KEY);
		        			}
		        			if(numType.equals("0")){
		        				Label content = new Label(j,i,col);
			        			sheet.addCell(content);
		        			}else if(numType.equals("1")){//整型
		        				Double coldou = Double.parseDouble(col);
		        				Number ints = new Number(j,i,coldou);
		        		        sheet.addCell(ints);
		        			}else if(numType.equals("2")){//浮点型
		        				Float colfloat = Float.parseFloat(col);
		        				Number number = new Number(j,i,colfloat);
		        		        sheet.addCell(number);
		        			}
		        			
		        		}
		        	}
		        }
		        workbook.write();
		        workbook.close();
		        outSTr.close();
				
		        fileName = "cardInfo\\"+cardname+".xls";
		        
		        String fileValue = "cardInfo/" + cardname+".xls";
		        // 上传七牛
				String token = null;
				QNInitAuth.initAuth(Config.QN_ACCESS, Config.QN_SECRET);
				token = QNInitAuth.getUpToken(Config.QN_BUCKET,fileValue);
				QNUpload.upload(token, path, fileValue);
				
				fileName = Config.QN_PREFIX+fileValue;
			} catch (Exception e) {
				MyMongo.mErrorLog("生成卡号导出文件失败", request, e);
				fileName = "1";//生成文件失败
			}
		}else{
			fileName = "0";//没有可导出的卡号信息
		}
				
		return fileName;
	}
	
}



