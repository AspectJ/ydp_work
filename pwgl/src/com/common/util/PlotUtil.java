package com.common.util;

import java.util.List;

import com.common.plot.IPlot;
import com.common.plot.PlotEntity;
import com.common.plot.PlotImpl;

public class PlotUtil {

	private static IPlot plot = null;

	static {
		plot = new PlotImpl();
	}

	/**
	 * 
	 * <p>
	 * 作用描述：生成单线条图表数据结果（即只是一个数据集，无多组数据的对比）
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param plotType
	 *            要展示的图表类型
	 * @param title
	 *            图表标题
	 * @param list
	 *            要展示的原始数据
	 * @param xDataName
	 *            要展示数据的x轴属性
	 * @param yDataName
	 *            要展示数据的y轴属性
	 * @param xLabel
	 *            x轴label
	 * @param yLabel
	 *            y轴label
	 * @return 图表数据结果实体
	 * @throws Exception
	 * 
	 */
	public static PlotEntity genSinglePlotDataModel(String plotType, String title,
			List list, String xDataName, String yDataName,
			String xLabel, String yLabel) throws Exception {
		return plot.genSinglePlotDataModel(plotType, title, list, xDataName, yDataName, xLabel, yLabel);
	}

	/**
	 * 
	 * <p>
	 * /**
	 * 
	 * <p>
	 * 作用描述：生成单线条图表数据结果（即只是一个数据集，无多组数据的对比）
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param plotType
	 *            要展示的图表类型
	 * @param title
	 *            图表标题
	 * @param list
	 *            要展示的原始数据
	 * @param xDataName
	 *            要展示数据的x轴属性
	 * @param yDataName
	 *            要展示数据的y轴属性
	 * @param xLabel
	 *            x轴label
	 * @param yLabel
	 *            y轴label
	 * @param partName
	 *            数据部分命名属性
	 * @param classifyName
	 *            数据区分属性
	 * @return
	 * @throws Exception
	 * 
	 */
	public static PlotEntity genMultiPlotDataModel(String plotType, String title,
			List list, String xDataName, String yDataName,
			String xLabel, String yLabel, String partName, String classifyName)
			throws Exception {
		return plot.genMultiPlotDataModel(plotType, title, list, xDataName, yDataName, xLabel, yLabel, partName, classifyName);
	}
}
