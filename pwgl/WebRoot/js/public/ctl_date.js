/**
 *初始化日期
 *
 **/
 function ctl_initDate(param){
	WdatePicker(param);
 }
 /**
  *开始结束日期
  *@param tagId 数据类型String 后面日期所在文本框id
  *@param arg  时间差 类型String 格式是{y:[值],M:[值],d:[值],H:[值],m:[值],s:[值]}
  *@param indentity 
  *			用于标识限制日期表中可选最大日期还是最小日期 indentity为0限制日期表可选最大日期	
  *				否则表示制日期表中可选最小日期数 
  *@param idParam 自身标签的id 作用：当选定好时间后让输入框失去焦点
  *@param isAfter 只能显示当前以后的日期 值：true：显示当前以后的日期，false：显示当前以前的数据 默认是true
  *
  **/			  
  function ctl_bendDate(tagId,arg,indentify,idParam,isAfter){	 
	  if(idParam){
		  if(indentify==0){			 
			  if(isAfter){				  
				  WdatePicker({maxDate:'#F{$dp.$D(\''+tagId+'\','+arg+');}',onpicked:function(dp){$("#"+idParam).blur();},minDate:'%y-%M-{%d}',oncleared:function(dp){$("#"+idParam).blur();}}); 
			  }else{				 
				  WdatePicker({maxDate:'#F{$dp.$D(\''+tagId+'\','+arg+');}',onpicked:function(dp){$("#"+idParam).blur();},oncleared:function(dp){$("#"+idParam).blur();}});
			  }
		  }else{
			  if(isAfter){
				  WdatePicker({minDate:'#F{$dp.$D(\''+tagId+'\','+arg+');}',onpicked:function(dp){$("#"+idParam).blur();},minDate:'%y-%M-{%d}',oncleared:function(dp){$("#"+idParam).blur();}});
			  }else{			  
				  WdatePicker({minDate:'#F{$dp.$D(\''+tagId+'\','+arg+');}',onpicked:function(dp){$("#"+idParam).blur();},oncleared:function(dp){$("#"+idParam).blur();}});
			  }
		  }	
			
	  }else{
		  if(indentify==0){
			  if(isAfter){
				  WdatePicker({maxDate:'#F{$dp.$D(\''+tagId+'\','+arg+');}',minDate:'%y-%M-{%d}'});	 
			  }else{
				  WdatePicker({maxDate:'#F{$dp.$D(\''+tagId+'\','+arg+');}'});	 
			  }
			  
		  }else{
			  if(isAfter){
				  WdatePicker({minDate:'#F{$dp.$D(\''+tagId+'\','+arg+');}',minDate:'%y-%M-{%d}'});
			  }else{
				  WdatePicker({minDate:'#F{$dp.$D(\''+tagId+'\','+arg+');}'});
			  }
			  
		  }			
	  }		
 }	