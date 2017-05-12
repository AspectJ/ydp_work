/**
 * 数组操作帮助js
 */

/**
 * 判断数组中是否存在某个元素
 * 
 * @param array
 *            数组
 * @param e
 *            元素
 * @returns {Boolean}
 */
function ctl_arrayContains(array, e) {
	for ( var i = 0, len = array.length; i < len; i++) {
		if (array[i] == e)
			return true;
	}
	return false;
}

/**
 * 获取某元素在数组中的索引位
 * 
 * @param array
 *            数组
 * @param e
 *            元素
 * @returns {Number}
 */
function ctl_arrayIndexOf(array, e) {
	for ( var i = 0, len = array.length; i < len; i++) {
		if (array[i] == e)
			return i;
	}
	return -1;
}

/**
 * 删除数组中的某元素
 * 
 * @param array
 *            数组
 * @param e
 *            元素
 * @returns {Number}
 */
function ctl_arrayRemove(array, e) {
	var index = ctl_arrayIndexOf(array, e);
	if (index == -1)
		return;
	array.splice(index, 1);
}

/**
 * 往数组中添加元素（如果有重复则不添加）
 * 
 * @param array
 *            数组
 * @param e
 *            元素
 * @returns {Number}
 */
function ctl_arrayAdd(array, e) {
	if (!ctl_arrayContains(array, e))
		array.push(e);
}

/**
 * 替换索引位的元素
 * 
 * @param array
 *            数组
 * @param e
 *            元素
 * @param index
 *            要替换的索引
 * @returns {Number}
 */
function ctl_arrayReplace(array, index, e) {
	if (index >= array.length)
		return;
	array[index] = e;
}

/**
 * 把数据的元素进行相加 （应用数组）
 * 
 * @param array
 *            数组
 * @param e
 *            元素
 * @param index
 *            要替换的索引
 * @returns {Number}
 */
function ctl_plusElement(array){
	if(!array){
		return;
	}
	var value = 0;
	for(var index in array){
		v = array[index];
		value += Number(v);
	}
	return value;
}

/**
 * 数组转map
 * @param array  对象数组
 * @param attributeArr   对象中指定哪些属性作为key
 */
function ctl_arrayToMap(array,attributeArr){
	var map = new Map();
	for(var k=0;k<array.length;k++){
		var obj=array[k];
		var key = "";
		for(var i = 0;i<attributeArr.length;i++){
			var attribute = attributeArr[i];
			key+=obj[attribute];
			key+="&";
		}
		key = key.substring(0, key.length-1);
		if(map.containsKey(key)){
			var valueArr = map.get(key);
			ctl_arrayAdd(valueArr,obj);
			map.put(key, valueArr);
		} else {
			var valueArr = [obj];
			map.put(key, valueArr);
		}
	}
	return map;
}
