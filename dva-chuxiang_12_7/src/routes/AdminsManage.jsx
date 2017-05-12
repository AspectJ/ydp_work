import React, { PropTypes } from 'react'
import { connect } from 'dva'
import AdminsManage from '../components/AdminsManage'
import AdminModal from '../components/AdminModal'

let Admins = ({ app, dispatch }) => {
  const {
    list,
    total,
    loading,
    modalVisible,
    modalType,
    currentItem
  } = app;

  const AdminsManageProps = {
    list,
    total,
    loading,
    flip(params){
      dispatch({
        type: 'app/queryAdminsList',
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
      })
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
          currentItem: {
          	cinemaid : sessionStorage.getItem('cinemaid'),
          	cinemaname : '楚湘院线'
          }
        }
      });
    },
  };

  const AdminModalProps = {
		item: currentItem,
  	modalVisible,
  	modalType,
  	onSubmit(params) {
      dispatch({
        type: `app/${modalType}Admin`,
        payload: params,
      });
    },
  	onClose() {
      dispatch({
        type: 'app/hideModal',
        payload: {
        	loading: false
        }
      });
    }
  };

  const AdminModalGen = () => {
    return <AdminModal {...AdminModalProps} />
  };

  return (
    <div>
      <AdminsManage {...AdminsManageProps} />
      <AdminModalGen />
    </div>
  )
}

Admins.PropTypes = {
  app: PropTypes.object.isRequired
}

function mapStateToProps({ app }){
  return { app };
}

export default connect(mapStateToProps)(Admins)
