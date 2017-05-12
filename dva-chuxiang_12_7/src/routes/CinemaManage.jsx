import React, { PropTypes } from 'react'
import { connect } from 'dva'
import CinemaManage from '../components/CinemaManage'
import CinemaModal from '../components/CinemaModal'

let Cinemas = ({ app, dispatch }) => {
  const {
    list,
    total,
    loading,
    modalVisible,
    modalType,
    currentItem,
    areaInfo
  } = app;

  const CinemaManageProps = {
    list,
    total,
    loading,
    flip(params){
      dispatch({
        type: 'app/queryCinemaInfo',
        payload: {
          offsetNum: (params.offsetNum - 1) * 10,
          pageSize: 10
        }
      });
    },
    onViewItem(params){
      dispatch({
        type: 'app/loadAreaInfo',
        payload: {
          modalType: 'visit',
          currentItem: params
        }
      });
    },
    onEditItem(params){
      dispatch({
        type: 'app/loadAreaInfo',
        payload: {
          modalType: 'update',
          currentItem: params
        }
      });
    },
    onAddItem(){
      dispatch({
        type: 'app/loadAreaInfo',
        payload: {
          modalType: 'create',
          currentItem: {}
        }
      });
    },
    onUpdateStatus(j_id, audit_flag){
      dispatch({
        type: 'app/updateCinemaStatus',
        payload: {
          j_id,
          audit_flag: audit_flag === 1 ? 0 : 1,
          admin_id: sessionStorage.getItem('adminid')
        }
      });
    },
    onDeleteItem(params){
      dispatch({
        type: 'app/deleteCinema',
        payload: {
          j_id: params
        }
      })
    }
  };

  const CinemaModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    modalVisible,
    modalType,
    areaInfo,
    onSubmit(params) {
      dispatch({
        type: `app/${modalType}Cinema`,
        payload: params,
      });
    },
    onClose() {
      dispatch({
        type: 'app/hideModal',
      });
    }
  };

  const CinemaModalGen = () =>
    <CinemaModal {...CinemaModalProps} />

  return (
    <div>
      <CinemaManage {...CinemaManageProps} />
      <CinemaModalGen />
    </div>
  )
}

Cinemas.PropTypes = {
  app: PropTypes.object.isRequired
}

function mapStateToProps({ app }){
  return { app };
}

export default connect(mapStateToProps)(Cinemas)
