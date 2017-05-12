package com.service.producttype.entity;
import com.common.constant.SystemConstant;
import com.common.util.ConfigUtil;

/**
* 产品类别
如歌剧、篮球、马戏等
*/
public class Producttype{

	/**
	* 产品类别ID
	*/
	private String producttypeid;
	
	/**
	* 产品类别名称
	*/
	private String typename;
	
	/**
	* 排序号
	*/
	private String pxh;
	
	/**
	* 父产品类别ID
	*/
	private String fprodtypeid;
	
	/**
	* 说明
	*/
	private String des;
	
	/**
	* 禁启状态
	*/
	private String status;
	
	/**
	* 删除状态
	*/
	private String delstatus;
	
	/**
	* 数据版本号
	*/
	private Integer vid;
	
	/**
	* 创建人
	*/
	private String cid;
	
	/**
	* 创建时间
	*/
	private String ctime;
	
	/**
	* 修改人
	*/
	private String mid;
	
	/**
	* 修改时间
	*/
	private String mtime;
	
	//级别
	private Number level;
	private Boolean isLeaf;
	private Boolean loaded;
	private Boolean expanded;
	private String parent;
	private String statusname;
	
	//上级产品分类名称
	private String ftypename;
	public String getFtypename() {
		return ftypename;
	}
	public void setFtypename(String ftypename) {
		this.ftypename = ftypename;
	}
	public String getStatusname() {
		return statusname;
	}
	public void setStatusname(String statusname) {
		this.statusname = statusname;
	}
	public Number getLevel() {
		return level;
	}
	public void setLevel(Number level) {
		this.level = level;
	}
	public Boolean getIsLeaf() {
		return isLeaf;
	}
	public void setIsLeaf(Boolean isLeaf) {
		this.isLeaf = isLeaf;
	}
	public Boolean getLoaded() {
		return loaded;
	}
	public void setLoaded(Boolean loaded) {
		this.loaded = loaded;
	}
	public Boolean getExpanded() {
		return expanded;
	}
	public void setExpanded(Boolean expanded) {
		this.expanded = expanded;
	}
	public String getParent() {
		return parent;
	}
	public void setParent(String parent) {
		this.parent = parent;
	}
	public String getProducttypeid(){
		return this.producttypeid;
	}
	public void setProducttypeid(String producttypeid){
		this.producttypeid = producttypeid;
	}
	
	public String getTypename(){
		return this.typename;
	}
	public void setTypename(String typename){
		this.typename = typename;
	}
	
	public String getPxh(){
		return this.pxh;
	}
	public void setPxh(String pxh){
		this.pxh = pxh;
	}
	
	public String getFprodtypeid(){
		return this.fprodtypeid;
	}
	public void setFprodtypeid(String fprodtypeid){
		this.fprodtypeid = fprodtypeid;
	}
	
	public String getDes(){
		return this.des;
	}
	public void setDes(String des){
		this.des = des;
	}
	
	public String getStatus(){
		return this.status;
	}
	public void setStatus(String status){
		this.status = status;
		this.statusname = ConfigUtil.getDicValue(SystemConstant.jqzt, status);
	}
	
	public String getDelstatus(){
		return this.delstatus;
	}
	public void setDelstatus(String delstatus){
		this.delstatus = delstatus;
	}
	
	public Integer getVid(){
		return this.vid;
	}
	public void setVid(Integer vid){
		this.vid = vid;
	}
	
	public String getCid(){
		return this.cid;
	}
	public void setCid(String cid){
		this.cid = cid;
	}
	
	public String getCtime(){
		return this.ctime;
	}
	public void setCtime(String ctime){
		this.ctime = ctime;
	}
	
	public String getMid(){
		return this.mid;
	}
	public void setMid(String mid){
		this.mid = mid;
	}
	
	public String getMtime(){
		return this.mtime;
	}
	public void setMtime(String mtime){
		this.mtime = mtime;
	}
	
}
