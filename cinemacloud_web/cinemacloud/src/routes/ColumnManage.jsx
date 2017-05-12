import React from 'react';
import { connect } from 'dva';
import NoticeColumnEdit from '../components/Column/NoticeColumnEdit'

function ColumnManage({ app, dispatch }) {
	const {
	  list,
	  total,
	  loading,
	  current,
	  modalVisible,
	  modalType,
	  modalItem,
	  currentItem,
	  areaInfo,
	  contentVisible,
	  contentType,
	  bannerTitle,
	  dropdownItem,
	  contentItem
	} = app;

	const noticeColumnEditProps = {
		list,
		loading,
		current,
		total,
		modalVisible,
		dropdownItem,
		modalItem,
		contentType,
		rowkey:'program_id',
		bannerTitle,
		//数据名
		dataIndexName:'program_name',
		dataIndexStatus:'status',
		dataIndexCityCate:'citytype.parlist',
		dataIndexAllyModel:'jointype.parlist',
		//新增栏目
		handleColumnAdd(){
			dispatch({
			  type:'app/showColumnModal',
			  payload:{
			  	title:'添加栏目',
			  	contentType:'create',
			  }
			})
		},
		//编辑栏目
		handleColumnEdit(record){
			dispatch({
				type:'app/showColumnModal',
				payload:{
					title:'修改栏目',
					modalItem:record,
					contentType:'update'
				}
			})
		},
		//弹窗确认
		onOk(params){
			dispatch({
				type:'app/createColumn',
				payload:params,
			})
		},
		//编辑确认
		onEditOk(params){
			dispatch({
				type:'app/updateColumn',
				payload:params,
			})
		},
		//关闭弹窗
		onCancel(){
			dispatch({
				type:'app/hideModal',
			})
		},

		//删除栏目
		onDeleteColumn(params){
			dispatch({
				type:'app/deleteColumn',
				payload:{
					program_id:params
				}
			})
		},
		//禁用栏目
		onDisableColumn(status,id){
			dispatch({
				type:'app/updateColumnStatus',
				payload:{
					program_id:id,
					status:status,
				}
			})
		},
		//启用栏目
		onEnableColumn(status,id){
			dispatch({
				type:'app/updateColumnStatus',
				payload:{
					program_id:id,
					status:status,
				}
			})
		},
		queryColumnList(params){
			dispatch({
				type: 'app/queryColumnList',
				payload: params
			});
		}
	}


	return (
	  <div className="Relative">
		<NoticeColumnEdit {...noticeColumnEditProps}/>
	  </div>
	);
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(ColumnManage);
