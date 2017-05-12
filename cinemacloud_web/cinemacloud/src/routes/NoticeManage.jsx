import React, { PropTypes } from 'react'
import { connect } from 'dva'
import DataList from '../components/DataList'
import NoticeAlter from '../components/Notice/NoticeAlter'
import NoticeInfo from '../components/Notice/NoticeInfo'
import NoticeAlterEdit from '../components/Notice/NoticeAlterEdit'
import auth from '../utils/auth'

function NoticeManage({ app, dispatch }) {

	const {
	  list,
	  total,
	  loading,
	  modalVisible,
	  modalType,
	  currentItem,
	  areaInfo,
	  contentVisible,
	  contentType,
	  bannerTitle,
	  dropdownItem,
	  contentItem,
	  current,
	  columnChoosem,
	} = app;

	function queryAuth(params){
		// [92, 93, 94] = [增, 改, 删]
		const filtered = auth(params);
		let result = {
			add: false,
			delete: false,
			edit: false
		};

		if( filtered.length ){
			filtered.indexOf(params[0]) !== -1 ? result.add    = true : '';
			filtered.indexOf(params[1]) !== -1 ? result.edit   = true : '';
			filtered.indexOf(params[2]) !== -1 ? result.delete = true : '';
		}

		return result;
	}

	const dataListProps = {
		list,
		total,
		loading,
		current,
		BtnText:'添加文章',
		dropdownItem,
		//下拉菜单
		DropdownBtn:true,
		titleDataIndex:'NoticeTitle',
		subDataIndex:'NoticeAuthor',
		rowKey:'id',
		auth: queryAuth([92, 93, 94]),
		//栏目选择
		handleMenuClick(key){
			parseInt(key) === 0 ?
			//查询所有文章
			dispatch({
				type:'app/queryNoticeDropdown',
				payload:{
					page:1
				}
			}) :
			//查询单个栏目文章
			dispatch({
				type:'app/queryNoticeList',
				payload:{
					program_id:key
				}
			})
		},
		//文章添加
		onAdd(params){
			dispatch({
				type:'app/hideContent',
				payload:{
					contentType:'create',
					contentItem: [],
					columnChoosem:params
				}
			})

			dispatch({
				type: 'app/changeDropdown',
				payload: {
					item: 'citytype',
					list: []
				}
			})

			dispatch({
				type: 'app/changeDropdown',
				payload: {
					item: 'jointype',
					list: []
				}
			})

			dispatch({
				type: 'app/changeDropdown',
				payload: {
					item: 'image_name',
					list: []
				}
			})
		},
		//文章详情
		onSwitchInfo(params){
			dispatch({
				type:'app/showContent',
				payload:{
					contentItem:params,
				}
			})
		},
		//删除文章
		onDataDelete(params){
			if(params.IsProgram_id){
				dispatch({
					type:'app/deleteNotice',
					payload:{
						info_id:params.id,
						program_id:params.program_id
					}
				})
			}else{
				dispatch({
					type:'app/deleteNotice',
					payload:{
						info_id:params.id,
					}
				})
			}
		},
		//文章编辑
		onSwitchEdit(params){
			dispatch({
				type:'app/queryNoticeInfo',
				payload:{
					contentType:'update',
					contentItem:params,
					program_id:params.program_id,
					doc_name:params.doc_name,
					image_name:params.image_name,
				}
			})
		},
		//全局搜索
		onSearch(params){
			dispatch({
				type:'app/queryNoticeDropdown',
				payload:{
					criteria:params,
          pagesize:10,
          page:1
				}
			})
		},
		//分栏搜索
		onSearchInColumn(value,id){
			dispatch({
				type:'app/queryNoticeList',
				payload:{
					criteria:value,
					program_id:id,
          pagesize:10,
          page:1
				}
			})
		},
		//全部翻页
		onPageChange(current,keyWord){
			dispatch({
				type:'app/queryPageInfo',
				payload:{
					criteria:keyWord,
					page:current,
					pagesize:10,
				}
			})
		},
		//分栏翻页
		handColumnPageChange(current,keyWord,program_id){
			dispatch({
				type:'app/queryNoticeList',
				payload:{
					page:current,
					criteria:keyWord || '',
					pagesize:10,
					program_id,
				}
			})
		}
	};

	const noticeInfoProps = {
		//文章详情
		loading,
		modalVisible,
		contentItem,
		dropdownItem,
		fullScreen(){
			dispatch({
				type: 'app/showModal'
			});
		},
		hideModal(){
			dispatch({
				type: 'app/hideModal'
			});
		}
	};

	const noticeAlterProps = {
		loading,
		dropdownItem,
		contentItem,
		contentType,
		columnChoosem,
		goBackBtn:true,
		//取消返回上一步
		goBack(){
			dispatch({
				type:'app/queryNoticeColumns',
				payload:{
					userid: JSON.parse(sessionStorage.getItem('user')).userid
				}
			})
		},
		//查询栏目信息
		findColumns(){
			dispatch({
				type:'app/queryNoticeColumns',
				payload:{
					userid: JSON.parse(sessionStorage.getItem('user')).userid
				}
			})
		},
		//查询归档信息
		findProfile(params){
			dispatch({
				type:'app/queryNoticeArchive',
				payload:{
					program_id:params,
				}
			})
		},
		//添加文章
		handleSubmit(params){
			dispatch({
				type:'app/createNotice',
				payload:params,
			})
		},
		//更新
		handleUpdate(params){
			dispatch({
				type:'app/updateNotice',
				payload:params,
			})
		}
	}
	const noticeAlterEditProps = {
		loading,
		dropdownItem,
		contentItem,
		contentType,
		goBackBtn:true,
		//取消返回上一步
		goBack(){
			dispatch({
				type:'app/queryNoticeColumns',
				payload:{
					userid: JSON.parse(sessionStorage.getItem('user')).userid
				}
			});
		},
		//查询栏目信息
		findColumns(){
			dispatch({
				type:'app/queryNoticeColumns',
				payload:{
					userid: JSON.parse(sessionStorage.getItem('user')).userid
				}
			})
		},
		//查询归档信息
		findProfile(params){
			dispatch({
				type:'app/queryNoticeArchive',
				payload:{
					program_id:params,
				}
			})
		},
		//添加文章
		handleSubmit(params){
			dispatch({
				type:'app/createNotice',
				payload:params,
			})
		},
		handleUpdate(params){
			dispatch({
				type:'app/updateNotice',
				payload:params,
			})
		}
	}

	const NoticeInfoGen = () => <NoticeInfo {...noticeInfoProps} />;
  	return (
      <div className="Relative">
        <DataList {...dataListProps} />
        {
          contentVisible ?
	          <NoticeInfoGen /> :
	          	contentType === 'create' ?
	          		<NoticeAlter {...noticeAlterProps}/> :
	          			contentType === 'update' ?
	          				<NoticeAlterEdit {...noticeAlterEditProps}/> :  ''
        }
      </div>
  	);
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(NoticeManage);
