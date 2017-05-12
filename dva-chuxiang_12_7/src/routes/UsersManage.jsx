import React, { PropTypes } from 'react'
import { connect } from 'dva'
import UsersManage from '../components/UsersManage'
import UsersModal from '../components/UsersModal'

let Users = ({ app, dispatch }) => {
  const {
    list,
    total,
    loading,
    modalVisible,
    modalType,
    currentItem
  } = app;

  const UsersManageProps = {
    list,
    total,
    loading,
    flip(params){
      dispatch({
        type: 'app/queryUsersList',
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
    onUpdateState(params){
    	dispatch({
        type: 'app/updateUsersStatus',
        payload: {
          userid: params.userid,
          state: params.state,
          admin_id: sessionStorage.getItem('adminid')
        }
      })
    }
  };

  const UsersModalProps = {
    item: currentItem,
  	modalVisible,
  	modalType,
  	onClose() {
      dispatch({
        type: 'app/hideModal',
        payload: {
        	loading: false
        }
      });
    }
  };

  const UsersModalGen = () => {
    return <UsersModal {...UsersModalProps} />
  };

  return (
  	<div>
      <UsersManage {...UsersManageProps} />
      <UsersModalGen />
    </div>
  );
}

Users.PropTypes = {
  app: PropTypes.object.isRequired
}

function mapStateToProps({ app }){
  return { app };
}

export default connect(mapStateToProps)(Users)
