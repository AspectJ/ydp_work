package com.common.plot;

import java.util.List;

/**
 * 
 * 
 * <p>
 * Title：图表数据结构生成接口
 * </p>
 * <p>
 * Description：
 * </p>
 * <p>
 * Author :administrator 2013-3-7
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */
public interface IPlot {

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
	PlotEntity genSinglePlotDataModel(String plotType, String title,
			List<Object> list, String xDataName, String yDataName,
			String xLabel, String yLabel) throws Exception;

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
	PlotEntity genMultiPlotDataModel(String plotType, String title,
			List<Object> list, String xDataName, String yDataName,
			String xLabel, String yLabel, String partName, String classifyName) throws Exception;
}
