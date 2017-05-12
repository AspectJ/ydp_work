package com.common.util;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.jdbc.core.JdbcTemplate;

import com.common.constant.WyglExceptionCode;
import com.common.exception.DpException;
import com.common.file.ColumnRule;
import com.common.file.ExcelParseConfigApp;
import com.common.file.IFileParser;
import com.common.file.IFileValidator;
import com.common.file.RowRule;

/**
 * excel操作帮助类
 * 
 * <p>
 * Title：
 * </p>
 * <p>
 * Description：提供excel解析中的工具方法
 * </p>
 * <p>
 * Author :administrator 2012-8-16
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */
public class ExcelUtil {

	/**
	 * 
	 * <p>
	 * 作用描述：导入excel
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param file
	 *            excel文件
	 * @param parser
	 *            文件解析器(ExcelFileParser)
	 * @param isDeleteFile
	 *            是否删除临时文件（true：删除，false：不删除；默认传null，为删除临时文件）
	 * @param isToDB
	 *            是否立即持久化（true：持久化，false：不做持久化；如果此参数为true，则jdbcTemplate不能为空）
	 * @param jdbcTemplate
	 *            数据库操作jdbcTemplate
	 * @param validator
	 *            文件验证器(回调函数)
	 * @return 解析完成的结果二维数组（结果为一个二维数组，数组存放的是一个二维数据表，第一维表示数据行，第二维表示数据列）
	 * @throws DpException
	 * 
	 */
	public static Object[][] importExcel(File file, IFileParser parser,
			Boolean isDeleteFile, boolean isToDB, JdbcTemplate jdbcTemplate,
			IFileValidator validator) throws DpException {

		// 如果文件不存在
		if (file == null) {
			throw new DpException(WyglExceptionCode.EXCEL_NOT_EXIST, null);
		}

		// 如果文件的大小不合适
		if (file.length() == 0 || file.length() > 1024 * 1024 * 1024) {
			throw new DpException(WyglExceptionCode.EXCEL_SIZE_ERROR, null);
		}

		// 验证excel文件
		if (null != validator) {
			if (!validator.validateFile(file)) {
				return null;
			}
		}

		// 解析excel文件
		Object[][] result = parser.parseFile(file, isToDB, jdbcTemplate);

		// 导入完成后，删除临时文件
		if (null == isDeleteFile || isDeleteFile) {
			file.delete();
		}

		// 持久化数据
		return result;
	}

	/**
	 * 
	 * <p>
	 * 作用描述：导出Excel
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param templateFile
	 *            回写excel模板
	 * @param ruleId
	 *            回写规则id
	 * @param res
	 *            数据库查询结果集
	 * @return excel文件的字节数组
	 * @throws IOException
	 * @throws SQLException
	 * @throws Exception
	 * 
	 */
	public static byte[] exportExcel(String ruleId, ResultSet res)
			throws DpException {

		// 根据解析规则id获取解析规则
		RowRule rule = ExcelParseConfigApp.getExcelParseRule(ruleId);

		// 如果解析规则为空
		if (rule == null) {
			throw new DpException(WyglExceptionCode.PARSE_RULE_NOT_FOUND, null);
		}

		File file = new File(FileUtil.getFileName(rule.getTemplateFile()));

		// 获取到模板excel文件的workbook
		Workbook workBook = PoiUtil.getWorkbook(file);

		// 创建单元格全边框风格
		// CellStyle style = workBook.createCellStyle();
		// style.setBorderBottom(CellStyle.BORDER_THIN);
		// style.setBorderLeft(CellStyle.BORDER_THIN);
		// style.setBorderRight(CellStyle.BORDER_THIN);
		// style.setBorderTop(CellStyle.BORDER_THIN);
		// style.setLocked(true);

		// 往工作薄的第一个工作表写数据
		Sheet sheet = workBook.getSheetAt(0);

		// 数据从配置的开始行写起
		int rowIndex = rule.getStartRowNum();

		try {

			// 遍历查询结果集写excel
			while (res.next()) {

				// 创建excel数据行
				Row row = sheet.createRow(rowIndex);

				// 遍历列解析规则，新建excel单元格填充excel数据行
				for (ColumnRule colRule : rule.getColumnRuleList()) {

					// 通过配置写单元格
					Object value = res.getObject(colRule.getSqlFieldIndex());
					int columnNum = colRule.getColumnNum();
					CellStyle cs = sheet.getColumnStyle(columnNum);
					if (null == cs) {//如果没样式，给定默认样式
						cs = workBook.createCellStyle();
						cs.setBorderBottom(CellStyle.BORDER_THIN);
						cs.setBorderLeft(CellStyle.BORDER_THIN);
						cs.setBorderRight(CellStyle.BORDER_THIN);
						cs.setBorderTop(CellStyle.BORDER_THIN);
						cs.setLocked(true);
					}
					Cell cell = row.createCell(columnNum);

					// 设置单元格内容
					cell.setCellValue(value == null ? "" : value.toString());

					// 设置单元格风格
					if (null != cs) {
						cell.setCellStyle(cs);
					}
				}

				rowIndex++;
			}

			// 将excel内容写入流中
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			workBook.write(bos);

			return bos.toByteArray();
		} catch (Exception e) {
			throw new DpException(WyglExceptionCode.EXCEL_EXP_ERROR, e);
		}
	}

}
