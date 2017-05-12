package com.common.plot;

import java.lang.reflect.Method;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.common.plot.PlotEntity.Series;

public class PlotImpl implements IPlot {

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public PlotEntity genSinglePlotDataModel(String plotType, String title,
			List<Object> list, String xDataName, String yDataName,
			String xLabel, String yLabel) throws Exception {

		if (list == null || list.size() == 0) {
			return null;
		}

		// 创建图表数据结构对象
		PlotEntity entity = new PlotEntity();
		entity.setTitle(title);
		entity.setType(plotType);
		entity.setxTitle(xLabel);
		entity.setyTitle(yLabel);

		// 获取x轴和y轴显示属性的getter
		Object obj = list.get(0);
		Class clazz = obj.getClass();
		String getXDataStr = "get" + xDataName.substring(0, 1).toUpperCase()
				+ xDataName.substring(1);
		String getYDataStr = "get" + yDataName.substring(0, 1).toUpperCase()
				+ yDataName.substring(1);
		Method getXMethod = clazz.getMethod(getXDataStr);
		Class xReturnType = getXMethod.getReturnType();
		Method getYMethod = clazz.getMethod(getYDataStr);
		Class yReturnType = getYMethod.getReturnType();

		if (Number.class.isAssignableFrom(xReturnType)) {
			entity.setxDataType(PlotEntity.DATA_NUMBER_TYPE);
		} else if (xReturnType == java.util.Date.class
				|| xReturnType == java.sql.Date.class) {
			entity.setxDataType(PlotEntity.DATA_DATE_TYPE);
		} else {
			entity.setxDataType(PlotEntity.DATA_STRING_TYPE);
		}

		if (Number.class.isAssignableFrom(yReturnType)) {
			entity.setyDataType(PlotEntity.DATA_NUMBER_TYPE);
		} else if (yReturnType == java.util.Date.class
				|| yReturnType == java.sql.Date.class) {
			entity.setyDataType(PlotEntity.DATA_DATE_TYPE);
		} else {
			entity.setyDataType(PlotEntity.DATA_STRING_TYPE);
		}

		Object[][] dataArray = new Object[list.size()][];
		for (int i = 0; i < dataArray.length; i++) {
			dataArray[i] = new Object[2];
		}

		for (int i = 0; i < list.size(); i++) {
			Object data = list.get(i);
			Object xData = getXMethod.invoke(data);
			Object yData = getYMethod.invoke(data);
			dataArray[i][0] = xData;
			dataArray[i][1] = yData;

			entity.getxTicks().add(xData);
			entity.getyTicks().add(yData);

		}

		// 下面将x轴数据进行排序
		sortList(entity.getxTicks(), entity.getxDataType());
		sortList(entity.getyTicks(), entity.getyDataType());
		entity.getData().add(dataArray);

		return entity;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public PlotEntity genMultiPlotDataModel(String plotType, String title,
			List<Object> list, String xDataName, String yDataName,
			String xLabel, String yLabel, String partName, String classifyName)
			throws Exception {

		if (list == null || list.size() == 0) {
			return null;
		}

		// 创建图表数据结构对象
		PlotEntity entity = new PlotEntity();
		entity.setTitle(title);
		entity.setType(plotType);
		entity.setxTitle(xLabel);
		entity.setyTitle(yLabel);

		// 获取x轴和y轴显示属性的getter
		Object obj = list.get(0);
		Class clazz = obj.getClass();
		String getXDataStr = "get" + xDataName.substring(0, 1).toUpperCase()
				+ xDataName.substring(1);
		String getYDataStr = "get" + yDataName.substring(0, 1).toUpperCase()
				+ yDataName.substring(1);
		Method getXMethod = clazz.getMethod(getXDataStr);
		Class xReturnType = getXMethod.getReturnType();
		Method getYMethod = clazz.getMethod(getYDataStr);
		Class yReturnType = getYMethod.getReturnType();

		String getClassifyNameStr = "get"
				+ classifyName.substring(0, 1).toUpperCase()
				+ classifyName.substring(1);
		String getPartNameStr = "get" + partName.substring(0, 1).toUpperCase()
				+ partName.substring(1);

		Method getPartNameMethod = clazz.getMethod(getPartNameStr);

		Method getClassifyNameMethod = clazz.getMethod(getClassifyNameStr);

		if (Number.class.isAssignableFrom(xReturnType)) {
			entity.setxDataType(PlotEntity.DATA_NUMBER_TYPE);
		} else if (xReturnType == java.util.Date.class
				|| xReturnType == java.sql.Date.class) {
			entity.setxDataType(PlotEntity.DATA_DATE_TYPE);
		} else {
			entity.setxDataType(PlotEntity.DATA_STRING_TYPE);
		}

		if (Number.class.isAssignableFrom(yReturnType)) {
			entity.setyDataType(PlotEntity.DATA_NUMBER_TYPE);
		} else if (yReturnType == java.util.Date.class
				|| yReturnType == java.sql.Date.class) {
			entity.setyDataType(PlotEntity.DATA_DATE_TYPE);
		} else {
			entity.setyDataType(PlotEntity.DATA_STRING_TYPE);
		}

		Map<Object, HashMap<Object, Object>> map = new LinkedHashMap<Object, HashMap<Object, Object>>();
		for (int i = 0; i < list.size(); i++) {

			Object data = list.get(i);
			Object classify = getClassifyNameMethod.invoke(data);
			Object part = getPartNameMethod.invoke(data);
			Series s = entity.new Series();
			s.setLabel(part.toString());
			entity.getSeries().add(s);

			HashMap<Object, Object> dataMap = map.get(classify);
			if (dataMap == null) {
				dataMap = new LinkedHashMap<Object, Object>();
			}

			Object xData = getXMethod.invoke(data);
			Object yData = getYMethod.invoke(data);
			dataMap.put(xData, yData);

			map.put(classify, dataMap);

			entity.getxTicks().add(xData);
			entity.getyTicks().add(yData);

		}

		for (Entry<Object, HashMap<Object, Object>> e : map.entrySet()) {
			HashMap<Object, Object> dataMap = e.getValue();

			for (Object x : entity.getxTicks()) {
				Object o = dataMap.get(x);
				if (o == null) {
					dataMap.put(x, 0);
				}
			}

			Object[][] dataArray = new Object[dataMap.keySet().size()][];
			int count = 0;
			for (Entry<Object, Object> entry : dataMap.entrySet()) {
				dataArray[count] = new Object[] { null, null };
				dataArray[count][0] = entry.getKey();
				dataArray[count][1] = entry.getValue();
				count++;
			}
			entity.getData().add(dataArray);
		}

		// 下面将x轴数据进行排序
		sortList(entity.getxTicks(), entity.getxDataType());
		sortList(entity.getyTicks(), entity.getyDataType());

		return entity;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	private void sortList(List list, String dataType) {
		if (dataType.equals(PlotEntity.DATA_NUMBER_TYPE)) {
			Collections.sort(list, new Comparator<Object>() {

				@Override
				public int compare(Object o1, Object o2) {
					if (((Number) o1).doubleValue() > ((Number) o2)
							.doubleValue())
						return 1;
					else if (((Number) o1).doubleValue() < ((Number) o2)
							.doubleValue())
						return -1;
					return 0;
				}
			});
		} else if (dataType.equals(PlotEntity.DATA_DATE_TYPE)) {
			Collections.sort(list, new Comparator<Object>() {

				@Override
				public int compare(Object o1, Object o2) {
					if (((java.util.Date) o1).getTime() > ((java.util.Date) o2)
							.getTime())
						return 1;
					else if (((java.util.Date) o1).getTime() < ((java.util.Date) o2)
							.getTime())
						return -1;
					return 0;
				}
			});
		}

	}

	public static void main(String[] args) {
		// System.out.println(Number.class.isAssignableFrom(Integer.class));
	}

}
