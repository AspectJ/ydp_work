import React from 'react'
import { connect } from 'dva'
import ModifyPwd from '../components/ModifyPwd'

let Pwd = ({ dispatch, app }) => {
  const { loading } = app;

  const ModifyPwdProps = {
    loading,
    onOk(params){
      dispatch({
        type: 'app/updatePassword',
        payload: params
      });
    }
  };

  return (
    <ModifyPwd {...ModifyPwdProps} />
  )
}

function mapStateToProps({ app }){
  return { app };
}

export default connect(mapStateToProps)(Pwd)
