import React, { PropTypes } from 'react'
import { connect } from 'dva';
import AdminLogin from '../components/AdminLogin'

let Login = ({ dispatch, app }) => {
  const { loading } = app;

  const AdminLoginProps = {
    loading,
    onOk(params){
      dispatch({
        type: 'app/AdminLogin',
        payload: params
      });
    }
  };

  return (
    <AdminLogin {...AdminLoginProps} />
  )
};

Login.PropTypes = {
  app: PropTypes.object,
  dispatch: PropTypes.func,
}

function mapStateToProps({app}){
  return {app};
}

export default connect(mapStateToProps)(Login)
