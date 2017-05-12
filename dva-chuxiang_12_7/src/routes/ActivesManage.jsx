import React from 'react'
import { connect } from 'dva'
import ActivesManage from '../components/ActivesManage'
import ActivesModal from '../components/ActivesModal'

let Actives = ({ app, dispatch }) => {
  const {
    list,
    total,
    loading,
    modalType,
    modalVisible,
    currentItem
  } = app;

  const ActivesManageProps = {
    list,
    total,
    loading,
    flip(params){
      dispatch({
        type: 'app/queryActivesList',
        payload: {
          offsetNum: (params.offsetNum - 1) * 10,
          pageSize: 10
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
    onDeleteItem(params){
      dispatch({
        type: 'app/deleteActive',
        payload: {
          acti_id: params.acti_id,
          imageid: params.acti_img
        }
      });
    },
    onUpdateStatus(acti_id, audit_flag){
      dispatch({
        type: 'app/updateActivesStatus',
        payload: {
          acti_id,
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

  const ActivesModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    modalType,
    modalVisible,
    onSubmit(params){
      console.log(params);
      dispatch({
        type: `app/${modalType}Actives`,
        payload: params
      });
    },
    onClose(){
      dispatch({
        type: 'app/hideModal'
      });
    }
  };

  const ActivesModalGen = () =>
    <ActivesModal {...ActivesModalProps} />

  return (
    <div>
      <ActivesManage {...ActivesManageProps} />
      <ActivesModalGen />
    </div>
  )
};

function mapStateToProps({ app }){
  return { app }
}

export default connect(mapStateToProps)(Actives)
