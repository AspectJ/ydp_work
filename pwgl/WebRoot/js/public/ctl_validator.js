/**
 *初始化验证    
 *@param valiParam 验证参数，格式是{setup:{},add:[{},{},{}],remove:[{},{}]}
 *@param regParam 正则表达式参数 格式 {require:/.+/,url:/.+/}
 */
 var Validator = YUI.Validator;
 function ctl_initValidator(valiParam,regParam){
	     Validator.options.length = 0;
		 var setup = valiParam.setup||"",
			 add = valiParam.add||"",
			 remove = valiParam.remove||"";
		 
		 	// 根据用户的传递的正则表达式参数，修改验证的正则表达式
		 	for(var reg in regParam){
		 		if(Validator.RULES[reg] != null){		 			
		 			Validator.RULES[reg] = regParam[reg];
		 		}else{
		 			alert("不存在rule为"+reg+"的验证方式，请仔细查看！");
		 		}
		 	}			
			 // setup
			 if(typeof setup != String ){
			 	 Validator.setup(setup);
			 }			 
			 // add
			 if(add instanceof Array){
				 for(var addIndex=0;addIndex<add.length;addIndex++){
					 Validator.add(add[addIndex]);
				 }
			 }else if(typeof add == object){
				 Validator.add(add);
			 }
			 // remove
			 if(remove instanceof Array){
				 for(var addIndex=0;addIndex<add.length;addIndex++){
					 Validator.remove(add[addIndex]);
				 }
			 }else if(typeof remove == 'object'){
				 Validator.remove(add);
			 }		
 } 


 /**
  * 根据下拉表单的值改变，更改验证方式
  * @param tagId 下拉框或单选框的标签id 类型String
  * @param keyparam 装下拉值和对应的验证参数 格式{1:{},2,{}}
  * 
  */
function ctl_changeValidator(tagId,keyparam){		
	var byId = YUI.byId,
	idType = byId(tagId);
	dyn_validator(tagId,keyparam);
	YUI.on(idType, 'change', function(){dyn_validator(tagId,keyparam);});
} 

/**
 * 根据下拉表单的值改变，更改验证方式
 * @param tagId 下拉框或单选框的标签id 类型String
 * @param keyparam 装下拉值和对应的验证参数 格式{1:{},2,{}}
 * 
 */
function dyn_validator(tagId,keyparam){	
	 var byId = YUI.byId, 
	     idType = byId(tagId),
	     val = idType.value;
	 
	 	for(var key in keyparam){
	 		if(val==key){
	 			Validator.add(keyparam[key]);
	 		}else{
	 			if(YUI.indexOf(Validator.options, keyparam[key]) > -1){					
	 				Validator.remove(keyparam[key]);					
	 			}
	 		} 
		}
}

/**
 * 验证长度
 * @param tabId 输入框的id,必填
 * @param length 长度,必填
 * @param mId提示信息的id,选填
 */
function ctl_validateLength(tabId,length,mId){
	var byId = YUI.byId;
	var cmt = byId(tabId), 
    counter = "", 
	len = cmt.value.length, 
	max = length,
	val = max - len;
	
	if(mId){
		counter = byId(mId);
	}
	
	if (val >= 0) {
		if(mId){
			counter.innerHTML = val;
		}
	}
	else {
	    cmt.value = cmt.value.substring(0, max); 
	}
}

/**
 * 添加验证信息
 * @param option 验证信息,格式：{"target": "addstockopt_endDate","rule": "require","tips" : "盘点结束时间不能为空","warn" : "盘点结束时间不能为空"}
 */
function ctl_addValidate(option){
	Validator.add(option);
}

/**
 * 删除验证信息
 * @param option 删除的验证信息,格式：{"target": "addstockopt_endDate"}
 */
function ctl_delValidate(option){
	Validator.remove(option);
}

/**
 * 隐藏提示框
 */
function ctl_hideValidateTip(){
	Validator.hideTip();
}

/**
 * 日期验证
 * @param {Date|Any} date  - 日期、任意值
 * @param {Boolean} isNull - 是否可以为空 true:可以为空；false：不可为空
 * @param {Object} reObj   - 自定义的日期验证正则表达式
 * @param {String} format  - 自定义的日期格式
 * @return {Boolean}
 */
function ctl_valiDateFun(date,isNull,reObj, format){	
	if(isNull){
		return true;
	}else{
		return Validator.isDate(date, reObj, format);
	}	
}



