import React from 'react'
import { connect } from 'dva'
import DataList from '../components/DataList'
import RoleInfo from '../components/Role/RoleInfo'
import RoleAuth from '../components/Role/RoleAuth'
import RoleAlter from '../components/Role/RoleAlter'

const RoleManage = (props) => {
  const {
    list,
    total,
    contentCurrent,
    loading,
    modalItem,
    modalType,
    modalVisible,
    dropdownItem
  } = props.app;
  const PathName = props.location.pathname.split("/").pop();
  const RoleInfoProps = {
    list,
    loading,
    total,
    contentCurrent,
    dropdownItem,
    onToggle(params){
      props.dispatch({
        type: 'app/updateRoleStatus',
        payload: {
          roleid: params.roleid,
          status: params.status === 1 ? 0 : 1
        }
      });
    },
    onAuth(params){
      props.dispatch({
        type: 'app/queryRoleAuth',
        payload: params
      });
    },
    onAdd(){
      props.dispatch({
        type: 'app/showModal',
        payload: {
          modalItem: null,
          modalType: 'create'
        }
      })
    },
    onEdit(params){
      props.dispatch({
        type: 'app/showModal',
        payload: {
          modalItem: params,
          modalType: 'update'
        }
      })
    },
    onDelete(params){
      props.dispatch({
        type: 'app/deleteRole',
        payload: {
          roleid: params.roleid
        }
      });
    },
    handleChange(params){
      props.dispatch({
        type: `app/queryRole${params}`
      });
    },
    handleSearch(params){
      props.dispatch({
        type: 'app/queryRoleList',
        payload: params
      });
    }
  };

  const RoleAuthProps = {
    item: modalItem,
    modalType,
    visible: modalVisible && modalType === 'visit',
    loading,
    onOk(params){
      props.dispatch({
        type: 'app/updateRoleAuth',
        payload: params
      });
    },
    onCancel(){
      props.dispatch({
        type: 'app/hideModal',
        payload: {
          modalItem: null
        }
      });
    }
  };

  const RoleAlterProps = {
    item: modalItem,
    visible: modalVisible && modalType !== 'visit',
    modalType,
    loading,
    dropdownItem,
    handleChange(params){
      props.dispatch({
        type: `app/queryRole${params}`
      });
    },
    onOk(params){
      if( modalType === 'create' ){
        props.dispatch({
          type: 'app/createRole',
          payload: params
        });
      } else {
        props.dispatch({
          type: 'app/updateRoleInfo',
          payload: params
        });
      }
    },
    onCancel(){
      props.dispatch({
        type: 'app/hideModal'
      });
    }
  };

  return (
    <div className="Relative">
      <RoleInfo {...RoleInfoProps} />
      <RoleAuth {...RoleAuthProps} />
      <RoleAlter {...RoleAlterProps} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    app: state.app
  };
}

export default connect(mapStateToProps)(RoleManage)
