package com.common.plot;

import java.util.ArrayList;
import java.util.List;

/**
 * 
 * 
 * <p>
 * Title：图表数据实体
 * </p>
 * <p>
 * Description：
 * </p>
 * <p>
 * Author :administrator 2012-10-11
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */
public class PlotEntity {

	public static final String LINE_TYPE = "line";
	public static final String BAR_TYPE = "bar";
	public static final String PIE_TYPE = "pie";

	public static final String DATA_STRING_TYPE = "string";
	public static final String DATA_NUMBER_TYPE = "number";
	public static final String DATA_DATE_TYPE = "date";

	private String id;
	// 图表title
	private String title;
	// 图表类型（线形图，柱形图，饼形图）
	private String type;
	// 图表数据结果
	private List<Object[][]> data = new ArrayList<Object[][]>();
	// x轴名称
	private String xTitle;
	// y轴名称
	private String yTitle;
	// x数据类型
	private String xDataType;
	// y数据类型
	private String yDataType;
	// x刻度值
	private List<Object> xTicks = new ArrayList<Object>();
	// y刻度值
	private List<Object> yTicks = new ArrayList<Object>();
	// 如果是多线的，此list会存线条的实体
	private List<Series> series = new ArrayList<Series>();
	// x轴刻度的最大值
	private Object xMax;
	// X轴刻度的最小值
	private Object xMin = 0;
	// y轴刻度的最大值
	private Object yMax;
	// y轴刻度的最小值
	private Object yMin = 0;

	public List<Object[][]> getData() {
		return data;
	}

	public void setData(List<Object[][]> data) {
		this.data = data;
	}

	public List<Object> getxTicks() {
		return xTicks;
	}

	public void setxTicks(List<Object> xTicks) {
		this.xTicks = xTicks;
	}

	public List<Object> getyTicks() {
		return yTicks;
	}

	public void setyTicks(List<Object> yTicks) {
		this.yTicks = yTicks;
	}

	public Object getxMax() {
		return xMax;
	}

	public void setxMax(Object xMax) {
		this.xMax = xMax;
	}

	public Object getxMin() {
		return xMin;
	}

	public void setxMin(Object xMin) {
		this.xMin = xMin;
	}

	public Object getyMax() {
		return yMax;
	}

	public void setyMax(Object yMax) {
		this.yMax = yMax;
	}

	public Object getyMin() {
		return yMin;
	}

	public void setyMin(Object yMin) {
		this.yMin = yMin;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getxTitle() {
		return xTitle;
	}

	public void setxTitle(String xTitle) {
		this.xTitle = xTitle;
	}

	public String getyTitle() {
		return yTitle;
	}

	public void setyTitle(String yTitle) {
		this.yTitle = yTitle;
	}

	public String getxDataType() {
		return xDataType;
	}

	public void setxDataType(String xDataType) {
		this.xDataType = xDataType;
	}

	public String getyDataType() {
		return yDataType;
	}

	public void setyDataType(String yDataType) {
		this.yDataType = yDataType;
	}

	public List<Series> getSeries() {
		return series;
	}

	public void setSeries(List<Series> series) {
		this.series = series;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}


	/**
	 * 
	 * 
	 * <p>
	 * Title：图表数据分类实体
	 * </p>
	 * <p>
	 * Description：
	 * </p>
	 * <p>
	 * Author :administrator 2012-10-11
	 * </p>
	 * <p>
	 * Department : 平台
	 * </p>
	 */
	public class Series {
		private String label;

		// private String renderer;

		public String getLabel() {
			return label;
		}

		public void setLabel(String label) {
			this.label = label;
		}

	}
}
