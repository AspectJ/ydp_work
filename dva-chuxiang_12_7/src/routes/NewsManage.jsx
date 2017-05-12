import React, { PropTypes } from 'react'
import { connect } from 'dva'
import NewsManage from '../components/NewsManage'
import NewsModal from '../components/NewsModal'

let News = ({ dispatch, app }) => {
  const {
    list,
    total,
    loading,
    modalType,
    modalVisible,
    currentItem
  } = app;

  const NewsManageProps = {
    list,
    total,
    loading,
    flip(params){
      dispatch({
        type: 'app/queryNewsList',
        payload: {
          offsetNum: (params.offsetNum - 1) * 10,
          pageSize: 10,
          keyword: params.keyword,
          type: params.type
        }
      });
    },
    onQueryList(params){
      dispatch({
        type: 'app/queryNewsList',
        payload: params
      });
    },
    onViewItem(params){
      dispatch({
        type: 'app/showModal',
        payload: {
          modalType: 'visit',
          currentItem: params
        }
      });
    },
    onEditItem(params){
      dispatch({
        type: 'app/showModal',
        payload: {
          modalType: 'update',
          currentItem: params
        }
      });
    },
    onDeleteItem(news_id, mews_img){
      dispatch({
        type: 'app/deleteNews',
        payload: {
          news_id,
          imageid: mews_img
        }
      });
    },
    onUpdateStatus(news_id, audit_flag){
      dispatch({
        type: 'app/updateNewsStatus',
        payload: {
          news_id,
          audit_flag: audit_flag === 1 ? 0 : 1,
          admin_id: sessionStorage.getItem('adminid')
        }
      });
    },
    onAddItem(){
      dispatch({
        type: 'app/showModal',
        payload: {
          modalType: 'create'
        }
      });
    }
  };

  const NewsModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    modalType,
    modalVisible,
    onSubmit(params){
      console.log(params);
      dispatch({
        type: `app/${modalType}News`,
        payload: params
      });
    },
    onClose(){
      dispatch({
        type: 'app/hideModal'
      });
    }
  };

  const NewsModalGen = () =>
    <NewsModal {...NewsModalProps} />


  return (
    <div>
      <NewsManage {...NewsManageProps} />
      <NewsModalGen />
    </div>
  );
};

function mapStateToProps({ app }){
  return { app };
}

export default connect(mapStateToProps)(News)
