package com.common.util;

import java.net.MalformedURLException;
import java.net.URL;

import org.apache.http.client.HttpClient;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.common.constant.BaiduMap;
import com.common.httpclient.HttpClientManage;

/**
 * 
 * <p>
 * Title：百度地图
 * </p>
 * <p>
 * Description：2015
 * </p>
 * <p>
 * Author : 2015-10-26
 * </p>
 * <p>
 * Department : 平台
 * </p>
 */
public class BaiduMapUtil {

	/**
	 * <p>
	 * 作用描述：根据地名和地区名检索对应的经纬度
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param placeName
	 *            地名
	 * @param pageSize
	 *            每次返回的检索行数
	 * @param pageNum
	 *            页码，0表示第一页
	 * @param region
	 *            地名所在地区
	 * @return 返回经纬度 [0]纬度 [1]经度
	 * 
	 */
	public static String[] placeSearch(String placeName, int pageSize,
			int pageNum, String region) {
		try {
			HttpClient httpClient = HttpClientManage.getClient(null, null,
					false);
			URL url = new URL(BaiduMap.PLACE_SEARCH + "?" + "ak=" + BaiduMap.AK
					+ "&output=json&query=" + placeName + "&page_size="
					+ pageSize + "&page_num=" + pageNum + "&scope=1&region="
					+ region);
			String resp = HttpClientManage.httpGet(httpClient, url, null);
			if (null != resp && !"".equals(resp)) {
				JSONObject obj = JSON.parseObject(resp);
				JSONArray arr = obj.getJSONArray("results");
				if (null != arr && arr.size() > 0) {
					JSONObject r = arr.getJSONObject(0);
					JSONObject location = r.getJSONObject("location");
					if (null != location) {
						String lng = location.getString("lng");// 经度
						String lat = location.getString("lat");// 纬度
						return new String[] { lat, lng };
					}
				}
			}
			return null;
		} catch (MalformedURLException e) {
			return null;
		}
	}

	/**
	 * <p>
	 * 作用描述：根据地名查询
	 * </p>
	 * <p>
	 * 修改说明：根据地名查询
	 * </p>
	 * 
	 * @param placeName
	 *            要查询的地名
	 * @param region
	 *            所属城市/区域名称或代号
	 * @return 返回经纬度 [0]纬度 [1]经度 [2]地区名
	 * 
	 */
	public static String[] placeSugguestion(String placeName, String region) {
		try {
			HttpClient httpClient = HttpClientManage.getClient(null, null,
					false);
			URL url = new URL(BaiduMap.PLACE_SUGGESTION + "?" + "ak="
					+ BaiduMap.AK + "&output=json&query=" + placeName
					+ "&region=" + region);
			String resp = HttpClientManage.httpGet(httpClient, url, null);
			if (null != resp && !"".equals(resp)) {
				JSONObject obj = JSON.parseObject(resp);
				String status = obj.getString("status");
				if (null != status && !"".equals(status) && status.equals("0")) {
					JSONArray arr = obj.getJSONArray("result");
					if (null != arr && arr.size() > 0) {
						JSONObject r = arr.getJSONObject(0);
						JSONObject location = r.getJSONObject("location");
						if (null != location) {
							String lng = location.getString("lng");// 经度
							String lat = location.getString("lat");// 纬度
							String dq = "";
							dq = r.getString("city");
							String district = r.getString("district");
							if (null != district && !"".equals(district)) {
								dq = district;
							}
							return new String[] { lat, lng, dq };
						}
					}
				}
			}
			return null;
		} catch (MalformedURLException e) {
			return null;
		}
	}

	/**
	 * <p>
	 * 作用描述：计算两个地点的距离
	 * </p>
	 * <p>
	 * 修改说明：
	 * </p>
	 * 
	 * @param lat1
	 * @param lng1
	 * @param lat2
	 * @param lng2
	 * @param origin_region
	 *            地点1所在城市
	 * @param destination_region
	 *            地点2所在城市
	 * @return
	 * 
	 */
	public static String direction(String lat1, String lng1, String lat2,
			String lng2, String origin_region, String destination_region) {
		try {
			HttpClient httpClient = HttpClientManage.getClient(null, null,
					false);
			// tactics=12表示最短距离 mode=driving表示驾车模式
			URL url = new URL(BaiduMap.DIRECTION + "?" + "ak=" + BaiduMap.AK
					+ "&output=json&mode=driving&origin=" + lat1 + "," + lng1
					+ "&destination=" + lat2 + "," + lng2 + "&origin_region="
					+ origin_region + "&destination_region="
					+ destination_region + "&tactics=12");
			String resp = HttpClientManage.httpGet(httpClient, url, null);
			if (null != resp && !"".equals(resp)) {
				JSONObject obj = JSON.parseObject(resp);
				String status = obj.getString("status");
				if (null != status && !"".equals(status) && "0".equals(status)) {
					// 0：成功；2：参数错误；5：权限或配额校验失败
					JSONObject rest = obj.getJSONObject("result");
					if (null != rest) {
						JSONArray routes = rest.getJSONArray("routes");
						if (null != routes && routes.size() > 0) {
							JSONObject r = routes.getJSONObject(0);
							String distance = r.getString("distance");
							return distance;
						}
					}
				}
			}
			return "";
		} catch (MalformedURLException e) {
			return "";
		}
	}

	public static void main(String[] args) {
		String[] resp = placeSearch("黄兴广场", 10, 0, "湖北");
		System.out.println("lat=" + resp[0] + ",lng=" + resp[1]);

		String d = BaiduMapUtil.direction("28.224581", "113.047982",
				"28.190138", "113.02807", "长沙市", "黄兴广场");

		String[] resp2 = BaiduMapUtil.placeSugguestion("津市", "常德市");
		System.out.println("lat=" + resp2[0] + ",lng=" + resp2[1] + ",dq="
				+ resp2[2]);
		System.out.println(d);
	}
}
