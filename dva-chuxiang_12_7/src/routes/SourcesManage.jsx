import React from 'react'
import { connect } from 'dva'
import SourcesManage from '../components/SourcesManage'
import SourcesModal from '../components/SourcesModal'

let Sources = ({ dispatch, app }) => {
  const {
    list,
    loading,
    total,
    modalType,
    modalVisible,
    currentItem
  } = app;

  const SourcesManageProps = {
    list,
    loading,
    total,
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
          modalType: 'create',
          currentItem: {}
        }
      });
    },
    onDeleteItem(params){
      dispatch({
        type: 'app/deleteSource',
        payload: {
          material_id: params
        }
      });
    },
    onUpdateStatus(material_id, audit_flag){
      dispatch({
        type: 'app/updateSourcesStatus',
        payload: {
          material_id,
          audit_flag: audit_flag === 1 ? 0 : 1,
          admin_id: sessionStorage.getItem('adminid')
        }
      });
    },
    flip(params){
      dispatch({
        type: 'app/querySourcesList',
        payload: {
          offsetNum: (params.offsetNum - 1) * 10,
          pageSize: 10
        }
      });
    },
  };

  const SourcesModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    modalType,
    modalVisible,
    onSubmit(params) {
      dispatch({
        type: `app/${modalType}Source`,
        payload: params,
      });
    },
    onClose() {
      dispatch({
        type: 'app/hideModal',
      });
    }
  }

  const SourcesManageGen = () =>
    <SourcesModal {...SourcesModalProps} />

  return (
    <div>
      <SourcesManage {...SourcesManageProps} />
      <SourcesManageGen />
    </div>
  )
};

function mapStateToProps({ app }){
  return { app };
}

export default connect(mapStateToProps)(Sources)
