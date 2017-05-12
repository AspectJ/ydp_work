package com.cp.rest.file;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.CellRangeAddress;
import org.jboss.resteasy.annotations.cache.NoCache;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import sun.misc.BASE64Encoder;

import com.cp.bean.ResMessage;
import com.cp.filter.BaseServlet;
import com.cp.rest.settle.SettleInfoRest;
import com.cp.rest.settle.dao.SettleDaoImpl;
import com.cp.rest.userinfo.redis.UserRedisImpl;
import com.cp.util.CodeUtil;
import com.cp.util.Config;
import com.cp.util.DateFormatUtil;
import com.mongo.MyMongo;
import com.tools.file.FileRedisImpl;
import com.tools.file.ImageUtils;
import com.tools.qiniu.init.QNInitAuth;
import com.tools.qiniu.init.upload.QNUpload;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Path("rest/file")
@NoCache
@Service()
public class FileRest extends BaseServlet
{
	private static final Logger logger = LoggerFactory.getLogger(FileRest.class);
	
	@Resource
	private FileRedisImpl fileRedis;
	
	@Autowired
	@Qualifier("settleDao")
	private SettleDaoImpl settleDao;
	
	@Resource
	private UserRedisImpl userRedis;
	
	@Resource(name="settleInfoRest")
	private SettleInfoRest settleInfoRest;
	
	/**
	 * 上传文件
	 */
	@GET
	@POST
	@Path("/uploadFile")
	@Consumes("multipart/form-data")  
//	@Produces("application/json;charset=UTF-8")
	@Produces(MediaType.TEXT_HTML) 
	public String uploadFile(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		try
		{
			String pathFile = Config.FILE_PATH;
			createFolder(pathFile);
			
			DiskFileItemFactory factory = new DiskFileItemFactory(); // 设置工厂
			factory.setRepository(new File(pathFile)); // 设置文件存储位置
			factory.setSizeThreshold(1024 * 1024); // 设置大小，如果文件小于设置大小的话，放入内存中，如果大于的话则放入磁盘中,单位是byte
			ServletFileUpload upload = new ServletFileUpload(factory);
			upload.setHeaderEncoding("utf-8"); // 这里就是中文文件名处理的代码，其实只有一行
			
			@SuppressWarnings("unchecked")
			List<FileItem> list = upload.parseRequest(request);
			FileItem item = null;
			for (FileItem fileItem : list)
			{
				if(fileItem.getName() != null){
					item = fileItem;
				}
			}
			String suffix = item.getName().substring(item.getName().lastIndexOf("."));
			String fileName = System.currentTimeMillis() + suffix;
			String value = "sp_media/" + new SimpleDateFormat("yyyyMM").format(new Date()) + "/" + fileName;
			
			item.write(new File(pathFile, fileName));
			
			// 上传七牛
			String token = null;
			QNInitAuth.initAuth(Config.QN_ACCESS, Config.QN_SECRET);
			token = QNInitAuth.getUpToken(Config.QN_BUCKET);
			QNUpload.upload(token, Config.FILE_PATH + "/" + fileName, value);
			
			resultJson.put("data", value);
		} catch (Exception e)
		{
			MyMongo.mErrorLog("上传文件", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("上传文件",  etime - stime, resultJson);
		return this.response(resultJson, request);
	}


	/**
	 * 上传文件流数据
	 */
	@GET
	@POST
	@Path("/uploadFileStream")
	@Consumes("application/x-www-form-urlencoded")  
	@Produces("application/json;charset=UTF-8")
	public String uploadFileStream(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		// -------------------------------------------------------------------------------
		String suffix = request.getParameter("suffix");
		String dataStream = request.getParameter("dataStream");
		
		try
		{
			dataStream = dataStream.substring( dataStream.indexOf(";base64,") + 8 );
			String fileName = System.currentTimeMillis() + suffix;
			String value = "sp_media/" + new SimpleDateFormat("yyyyMM").format(new Date()) + "/" + fileName;
			createFolder(Config.FILE_PATH);
			ImageUtils.decodeBase64ToImage(dataStream, Config.FILE_PATH, fileName);
			
			// 上传七牛
			String token = null;
//			String token = fileRedis.getQNToken();
//			if(token == null){
				QNInitAuth.initAuth(Config.QN_ACCESS, Config.QN_SECRET);
				token = QNInitAuth.getUpToken(Config.QN_BUCKET);
//				fileRedis.setQNToken(token);
//			}
			QNUpload.upload(token, Config.FILE_PATH + "/" + fileName, value);
			
			resultJson.put("data", value);
		} catch (Exception e)
		{
			MyMongo.mErrorLog("上传文件流数据", request, e);
			return this.returnError(resultJson, ResMessage.Server_Abnormal.code, request);
		}
		// -------------------------------------------------------------------------------
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("上传文件流数据",  etime - stime, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 文件下载
	 */
	@GET
	@Path("/download")
	@Consumes("text/html; charset=UTF-8")
	@Produces(MediaType.TEXT_PLAIN)
	public String downloadFile(@Context HttpServletRequest request, @Context HttpServletResponse response)
	{
		response.setCharacterEncoding("UTF-8");
   	
		Boolean isOnLine = false; // 是否在线浏览

		String fileName = request.getParameter("f");

		// 得到下载文件的名字
		String path = Config.FILE_PATH + fileName;
   
		File file = new File(path.toString());
		FileInputStream fis = null;
		BufferedInputStream buff = null;
		OutputStream myout = null;
		try
		{
			if (!file.exists())
			{
				response.sendError(404, "File not found!");
				return "";
			}
			response.reset();
			if (isOnLine)
			{ // 在线打开方式
				URL u = new URL("file:///" + path.toString());
				response.setContentType(u.openConnection().getContentType());
				response.setHeader("Content-Disposition", "inline; filename="
						+ new String(file.getName().getBytes("gbk"), "iso-8859-1"));
			} else
			{ // 纯下载方式
				// 设置response的编码方式
				response.setContentType("application/x-msdownload");
				// 写明要下载的文件的大小
				response.setContentLength((int) file.length());
				// 设置附加文件名(解决中文乱码)
				response.setHeader("Content-Disposition", "attachment;filename="
						+ new String(file.getName().getBytes("gbk"), "iso-8859-1"));
			}

			fis = new FileInputStream(file);
			buff = new BufferedInputStream(fis);
			byte[] b = new byte[1024];// 相当于我们的缓存
			long k = 0;// 该值用于计算当前实际下载了多少字节
			// 从response对象中得到输出流,准备下载
			myout = response.getOutputStream();
			while (k < file.length())
			{
				int j = buff.read(b, 0, 1024);
				k += j;
				// 将b中的数据写到客户端的内存
				myout.write(b, 0, j);
			}
			// 将写入到客户端的内存的数据,刷新到磁盘
			myout.flush();
		} catch (MalformedURLException e)
		{
			e.printStackTrace();
		} catch (FileNotFoundException e)
		{
			e.printStackTrace();
		} catch (IOException e)
		{
			e.printStackTrace();
		} finally
		{
			try
			{
				if (fis != null)
				{
					fis.close();
				}
				if (buff != null)
					buff.close();
				if (myout != null)
					myout.close();
			} catch (Exception e)
			{
				e.printStackTrace();
			}
		}
		return "";
	}
	
	
	/**
	 * 文件夹不存在则创建文件夹
	 * @param PathFile
	 */
	public static void createFolder(String PathFile){
		File file = new File(PathFile);
		if (!file.exists()) {//图片存储
			file.mkdirs();
		}
		logger.info("上传文件夹路径：" + PathFile);
	}
	
	/**
	 * 上传账单附件
	 * @param request
	 * @param response
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	@GET
	@POST
	@Path("/uploadAttachFile")
	@Produces("text/html;charset=UTF-8")
	public String uploadAttachFile(@Context HttpServletRequest request, @Context HttpServletResponse response) throws Exception{
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		
		
		if(!privilegeCheck(request, "uploadAttachFile", userRedis)){
			MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
			return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
		}
		//获取账单的主键ID
		String statementid = request.getParameter("statementid");
		logger.error(statementid);
		// 使用工厂
		DiskFileItemFactory factory = new DiskFileItemFactory();
		// 使用工厂创建解析器对象
		ServletFileUpload sfu = new ServletFileUpload(factory);
		sfu.setSizeMax(1024 * 1024 * 10); //限制表单上传大小为10M
		try {
			
			if (CodeUtil.checkParam(statementid)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			
			// 使用解析器对象解析request,获取FileItemList
			List<FileItem> fileItemList = sfu.parseRequest(request);
			
			FileItem fileItem = fileItemList.get(0);
			// 获取文件名称
			String name = fileItem.getName();
			// 如果客户端使用的是IE6，那么需要从完整路径中获取文件名称
			int lastIndex = name.lastIndexOf("\\");
			if(lastIndex != -1) {
				name = name.substring(lastIndex + 1);
			}
			
			// 获取上传文件的保存目录
			String savepath = request.getSession().getServletContext().getRealPath("/WEB-INF/attach_uploads");
			// 如果保存目录不存在，则创建
			createFolder(savepath);
			
			//创建file对象，下面会把上传文件保存到这个file指定的路径
			//savepath，即上传文件的保存目录
			//name，文件名称(解决文件名重名问题)
			name = UUID.randomUUID().toString().toUpperCase().replaceAll("-", "") + "_" + name;
			
			File file = new File(savepath, name);
			fileItem.write(file);
			
			//保存文件的上传路径以及时间到数据库(t_statement表中)
			String filePath = "/WEB-INF/attach_uploads/" + name ;
			Map<String, Object> paramsMap = new HashMap<String, Object>();
			paramsMap.put("filePath", filePath);
			paramsMap.put("statementid", Integer.parseInt(statementid));
			settleDao.insertFilePathAndDate(paramsMap);

		} catch (FileUploadException e) {
			MyMongo.mErrorLog("上传账单附件失败", request, e);
		}
		
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("上传账单附件成功", etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	@GET
	@POST
	@Path("/downloadRes")
	@Produces("text/html;charset=UTF-8")
	public String downloadRes(@Context HttpServletRequest request, @Context HttpServletResponse response) throws UnsupportedEncodingException {
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		
		if(!privilegeCheck(request, "downloadRes", userRedis)){
			MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
			return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
		}
		
		String path = request.getParameter("path");
		path = new String(path.getBytes("iso-8859-1"), "utf-8");
		path = request.getSession().getServletContext().getRealPath(path);
		try {
			File file = new File(path.toString());
			if (!file.exists()) {
				response.sendError(404, "File Not Found!");
				return "";
			}
			String filename = path.substring(path.lastIndexOf("\\") + 1);
			String framename = filenameEncoding(filename.substring(filename.indexOf("_") + 1), request);
			
			String contentType = request.getSession().getServletContext().getMimeType(filename);//通过文件名称获取MIME类型
			
			String contentDisposition = "attachment;filename=" + framename;
			
			//设置头
			response.setHeader("Content-Type", contentType);
			response.setHeader("Content-Disposition", contentDisposition);
			response.setHeader("Content-Length",String.valueOf(file.length()));
//			response.setContentLength((int)file.length());
			
			//设置流
			InputStream input = new FileInputStream(file);
			
			OutputStream output = response.getOutputStream();
			IOUtils.copy(input, output);
			input.close();
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("上传账单附件成功", etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
	
	/**
	 * 对文件名进行编码（各大主流浏览器--包括IE）
	 * @param filename
	 * @param request
	 * @return
	 * @throws IOException
	 */
	@SuppressWarnings("restriction")
	public static String filenameEncoding(String filename, HttpServletRequest request) throws IOException {
		String agent = request.getHeader("User-Agent"); //获取浏览器
		if (agent.contains("Firefox")) {
			BASE64Encoder base64Encoder = new BASE64Encoder();
			filename = "=?utf-8?B?"
					+ base64Encoder.encode(filename.getBytes("utf-8"))
					+ "?=";
		} else if(agent.contains("MSIE")) {
			filename = URLEncoder.encode(filename, "utf-8");
		} else {
			filename = URLEncoder.encode(filename, "utf-8");
		}
		return filename;
	}
	
	
	/**
	 * 导出账单明细为Excel表格
	 * @param request
	 * @param response
	 * @return
	 */
	@GET
	@POST
	@Path("exportExcel")
	@Produces("text/html;charset=UTF-8")
	public String exportExcel(@Context HttpServletRequest request, @Context HttpServletResponse response) {
		JSONObject resultJson = new JSONObject();
		long stime = System.currentTimeMillis();
		
		if(!privilegeCheck(request, "exportExcel", userRedis)){
			MyMongo.mRequestFail(request, ResMessage.Lack_Privilege.code);
			return this.returnError(resultJson, ResMessage.Lack_Privilege.code, request);
		}
		
		String sid = request.getParameter("sid");
		try{
			
			if (CodeUtil.checkParam(sid)){
				MyMongo.mRequestFail(request, ResMessage.Lack_Param.code);
				return this.returnError(resultJson, ResMessage.Lack_Param.code, request);
			}
			
			Map<String, Object> attrMap = new HashMap<String, Object>();
			attrMap.put("sid", sid);
			//获取流水详细
			resultJson = settleInfoRest.getStreamInstance(attrMap);
			JSONArray jsonArray = resultJson.getJSONArray("data");
			
			//创建HSSFWorkbook对象(excel的文档对象)
			HSSFWorkbook wb = new HSSFWorkbook();
			//建立新的sheet对象（excel的表单）
			HSSFSheet sheet = wb.createSheet();
			//在sheet里创建第一行，参数为行索引(excel的行)，可以是0～65535之间的任何一个  
			
			HSSFCellStyle cellStyle = wb.createCellStyle(); //让单元格数据左右居中
			cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
			HSSFRow row1 = sheet.createRow(0);
			//创建单元格（excel的单元格，参数为列索引，可以是0～255之间的任何一个  
			HSSFCell cell0=row1.createCell(0);
			HSSFCell cell1=row1.createCell(1);
			HSSFCell cell2=row1.createCell(2);
			HSSFCell cell3=row1.createCell(3);
			HSSFCell cell4=row1.createCell(4);
			HSSFCell cell5=row1.createCell(5);
			HSSFCell cell6=row1.createCell(6);
			HSSFCell cell7=row1.createCell(7);
			HSSFCell cell8=row1.createCell(8);
			HSSFCell cell9=row1.createCell(9);
			//设置单元格居中
			cell0.setCellStyle(cellStyle);
			cell1.setCellStyle(cellStyle);
			cell2.setCellStyle(cellStyle);
			cell3.setCellStyle(cellStyle);
			cell4.setCellStyle(cellStyle);
			cell5.setCellStyle(cellStyle);   
			cell6.setCellStyle(cellStyle);
//			cell7.setCellStyle(cellStyle);	//让该单元格默认居左
			cell8.setCellStyle(cellStyle);
			cell9.setCellStyle(cellStyle);
			//设置列宽
			sheet.setColumnWidth(cell0.getColumnIndex(), 256 * 15);
			sheet.setColumnWidth(cell1.getColumnIndex(), 256 * 15);
			sheet.setColumnWidth(cell2.getColumnIndex(), 256 * 20);
			sheet.setColumnWidth(cell3.getColumnIndex(), 256 * 15);
			sheet.setColumnWidth(cell4.getColumnIndex(), 256 * 15);
			sheet.setColumnWidth(cell5.getColumnIndex(), 256 * 25);
			sheet.setColumnWidth(cell6.getColumnIndex(), 256 * 15);
			sheet.setColumnWidth(cell7.getColumnIndex(), 256 * 25);
			sheet.setColumnWidth(cell8.getColumnIndex(), 256 * 25);
			sheet.setColumnWidth(cell9.getColumnIndex(), 256 * 15);
			//设置单元格内容 
			cell0.setCellValue("消费记录号");
			cell1.setCellValue("卡号");
			cell2.setCellValue("卡名");
			cell3.setCellValue("卡类型"); // 0表示次卡 1表示
			cell4.setCellValue("消费渠道");
			cell5.setCellValue("消费影院");
			cell6.setCellValue("次卡消费次数");
			cell7.setCellValue("储值卡消费金额/次卡消费次数等价价值");
			cell8.setCellValue("消费时间");
			cell9.setCellValue("结算价");
			
			
			//在sheet里创建第i行
			for(int i = 0; i < jsonArray.size(); i++) {
				HSSFRow row_i = sheet.createRow(i+1);
				row_i.setRowStyle(cellStyle);
				for(int j = 0; j < 10; j++) {
					String flag = "";
					switch(j) {
						case 0 :
							flag = "recordid";
							break;
						case 1 :
							flag = "cardid";
							break;
						case 2 :
							flag = "cardname";
							break;
						case 3 :
							flag = "cardtype_str";
							break;
						case 4 :
							flag = "online";
							break;
						case 5 :
							flag = "theatername";
							break;
						case 6 :
							flag = "count";
							break;
						case 7 :
							flag = "value";
							break;
						case 8 :
							flag = "createtime";
							break;
						case 9 :
							flag = "settleprice";
							break;
						default :
							break;
					}
					HSSFCell cell_j = row_i.createCell(j);
					cell_j.setCellValue(jsonArray.getJSONObject(i).get(flag).toString());
					cell_j.setCellStyle(cellStyle);
				}
			}
			  
			//输出Excel文件  
			    OutputStream output=response.getOutputStream();  
			    response.reset();  
			    response.setHeader("Content-disposition", "attachment; filename=details.xls");  
			    response.setContentType("application/msexcel");         
			    wb.write(output);  
		    
		} catch (Exception e){
			MyMongo.mErrorLog("导出Excel表格失败", request, e);
			return this.returnError(resultJson, ResMessage.Add_Info_Fail.code, request);
		}
		
		long etime = System.currentTimeMillis();
		MyMongo.mRequestLog("导出Excel表格成功", etime - stime, request, resultJson);
		return this.response(resultJson, request);
	}
	
}
