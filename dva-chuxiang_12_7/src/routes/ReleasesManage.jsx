import React from 'react'
import { connect } from 'dva'
import ReleasesManage from '../components/ReleasesManage'
import ReleasesModal from '../components/ReleasesModal'

let Releases = ({ app, dispatch }) => {
  const {
    list,
    total,
    loading,
    modalType,
    modalVisible,
    currentItem
  } = app;

  const ReleasesManageProps = {
    list,
    total,
    loading,
    onQueryList(params){
      dispatch({
        type: 'app/queryReleasesList',
        payload: params
      });
    },
    flip(params){
      dispatch({
        type: 'app/queryReleasesList',
        payload: {
          offsetNum: (params.offsetNum - 1) * 10,
          pageSize: 10,
          keyword: params.keyword,
          type: params.type
        }
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
    onAddItem(){
      dispatch({
        type: 'app/showModal',
        payload: {
          modalType: 'create'
        }
      });
    },
    onUpdateStatus(noti_id, audit_flag){
      dispatch({
        type: 'app/updateReleaseStatus',
        payload: {
          noti_id,
          audit_flag: audit_flag === 1 ? 0 : 1,
          admin_id: sessionStorage.getItem('adminid')
        }
      });
    },
    onDeleteItem(params){
      dispatch({
        type: 'app/deleteRelease',
        payload: {
          noti_id: params
        }
      });
    }
  };

  const ReleasesModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    modalType,
    modalVisible,
    onSubmit(params){
      dispatch({
        type: `app/${modalType}Release`,
        payload: params
      });
    },
    onClose(){
      dispatch({
        type: 'app/hideModal'
      });
    }
  };

  const ReleasesModalGen = () =>
    <ReleasesModal {...ReleasesModalProps} />

  return (
    <div>
      <ReleasesManage {...ReleasesManageProps} />
      <ReleasesModalGen />
    </div>
  )
};

function mapStateToProps({ app }){
  return { app }
}

export default connect(mapStateToProps)(Releases)
