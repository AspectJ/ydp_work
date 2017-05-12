import React from 'react'
import { connect } from 'dva'
import DataList from '../components/DataList'
import IntroduceInfo from '../components/Introduce/IntroduceInfo'

function IntroduceManage({ app, dispatch }) {
  const {
	  list,
	  total,
	  loading,
	  current,
	  modalVisible,
	  modalType,
	  currentItem,
	  contentVisible,
	  contentType,
	  contentItem,
	  bannerTitle,
    dropdownItem
	} = app;

  const dataListProps = {
		list,
		total,
		loading,
		current,
		titleDataIndex:'NoticeTitle',
		subDataIndex:'NoticeAuthor',
		rowKey:'id',
		auth: {
			add: false,
			delete: false,
			edit: false
		},
		//文章详情
		onSwitchInfo(params){
			dispatch({
				type:'app/showContent',
				payload:{
					contentItem: params,
				}
			})
		},
		//全局搜索
		onSearch(params){
			dispatch({
				type:'app/queryNoticeDropdown',
				payload:{
					criteria:params
				}
			})
		},
		//全部翻页
		onPageChange(type,current,keyWord){
			dispatch({
				type:'app/queryPageInfo',
				payload:{
					criteria:keyWord,
					page:current,
					pagesize:10,
          type:''
				}
			})
		},
	};

  const IntroduceInfoProps = {
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

  const IntroduceInfoGen = () => <IntroduceInfo {...IntroduceInfoProps} />

  return (
    <div className="Relative">
      <DataList {...dataListProps} />
      <IntroduceInfoGen />
    </div>
  );
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(IntroduceManage);
