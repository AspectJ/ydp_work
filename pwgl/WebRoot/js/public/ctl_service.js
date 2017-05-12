/**
 * 服务URL、会话ID、服务号常量定义统一文件
 */
var propertiesName='jsparam';
var propertiesPath='resourse/i18n/';

var springMvcUrl = "pages/springMvcEntry/service.do";// 请求的URL
var defaultSessionId = "0";// 会话ID
var defaultDataFormat = "2";// 参数数据格式
var session = null;// session对象
var jsonType="2";//json格式的参数

var loginService = "loginService";// 用户登录服务
var goOutService = "goOutService";// 用户退出系统服务
var getDictionaryService = "getDictionaryService";//系统通用字典模块
var getTemplateFileService = "getTemplateFileService";//文件下载通用服务
var getAllOrgService = "getAllOrgService";//取所有行政区划的公共服务

//弹出窗体的样式
var centerDivId = "workMainDiv";// 框架的centerDiv Id
var workLeftDivId = "leftDiv";// 框架的左边菜单的divId
var uiDialog = 'ui_dialog';
var minDialogWidth = 392;// 弹出窗体的最小宽度
var minDialogHeight = 208;// 弹出窗体的最小高度
var ddl_listbox = "ddl-listbox"; // 下拉框的class
var jqgridPagerHtmlClass = 'ui-pg-grid-html';// jqgrid表格分页栏显示html内容的div样式
var gridViewIdPre = "gview_";// jqgrid的表格内容外围DIV的ID前缀
var gridHeaderFrc = ".jqg-first-row-header";// jqgrid的多级表头时的第一个隐藏行的特有样式名
var gridTableFrc = ".jqgfirstrow";// jqgrid的表格的第一个隐藏行的特有样式名
var dialogDefaultIcon = 'tips.gif';
var expIcon = 'images/main/exp.jpg';// 导出图片
var impIcon = 'images/main/imp.jpg';// 导入图片
var schoolPath = "tempImg/";// 图片临时路径
var expandName = ".jpg";// 上传图片的扩展名,jpg

var rootConstant = 'ROOT';// 跟节点
var imgPath="img/";//上传图片的默认路径

var currentUser = {
	yhid:"",//用户系统ID
	dlzh : "",// 登录用户名
	yhnc : "",// 用户昵称
	yhlx : "",// 用户类型
	jgfzr: "",// 机构负责人：是、否
	jgid : "",// 机构ID
	jgmc : ""// 机构名称x
};

var dmfl_zt = "10";//状态
var zt_qy='1';//启用
var zt_jy='2';//禁用
var dmfl_fjlx = "11";//附件类型
var dmfl_sf = "12";//是否
var sf_s = "1201";//是
var sf_f = "1202";//否
var dmfl_fbzt = "13";//发布状态
var fbzt_wfb = "1301";//未发布
var fbzt_yfb = "1302";//已发布
var dmfl_xmlx = "14";//项目类型
var dmfl_jzlx = "15";//建筑类型
var dmfl_xqzt = "16";//小区状态
var xqzt_dqr = "1601";//待确认
var xqzt_yqr = "1602";//已确认
var dmfl_rzzt = "17";//认证状态
var dmfl_bxlx = "19";//报修类型
var dmfl_jdzt = "20";//进度状态
var jdzt_dpg = "2001";//待派工
var jdzt_ypg = "2002";//已派工
var jdzt_ycl = "2003";//已处理
var jdzt_ypj = "2004";//已评价
var dmfl_hdfqrlx = "21";//活动发起人类型
var hdfqrlx_wy = "2101";//物业公司
var dmfl_hdlx = "22";//活动类型
var dmfl_hdzt = "23";//活动状态
var dmfl_hyzt = "25";//好友状态
var dmfl_jylx = "26";//交易类型
var dmfl_ydqxlx = "27";//阅读权限类型
var dmfl_jshx = "28";//居室户型
var dmfl_cyfs = "29";//出游方式
var dmfl_cyjb = "30";//成员级别
var dmfl_hydj = "31";//活跃等级
var dmfl_bcclzt = "32";//报错处理状态
var dmfl_bclx = "33";//报错类型
var dmfl_xb = "34";//性别
var dmfl_zxfs = "35";//装修方式
var dmfl_zxjd = "36";//装修阶段
var dmfl_zxfg = "37";//装修风格
var dmfl_zxkj = "38";//装修空间
var dmfl_zzdj = "39";//资质等级
var dmfl_jylx = "40";//交易类型
var dmfl_pllx = "41";//评论类型
var dmfl_yywy = "42";//有用无用
var dmfl_xjcd = "43";//新旧程度
var dmfl_zxlx = "44";//资讯类型

var rootConstant = 'ROOT';// 跟节点
var fjlx="11";
var zt='10';//状态
var jsonType="2";
var xmlx="14";//项目类型
var jzlx="15";//建筑类型
var dqr_zt="1601";//待确认状态
var yqr_zt="1602";//已确认状态
var getTemplateFileService="getTemplateFileService";
var xb='34';//性别
var wfb_zt="1301";//未发布状态
var yfb_zt="1302";//已发布状态
var ypg_zt='2002';//已派工
var ycl_zt='2003';//已处理
var jd_zt='20';//进度
var zzdj="39";//资质等级

var tjxx_template="conf/excel/template/体检信息导入模板.xlsx";
var lrxx_template="conf/excel/template/老人信息导入模板.xlsx";
var jmshy_template="conf/excel/template/加盟商会员导入模板.xlsx";