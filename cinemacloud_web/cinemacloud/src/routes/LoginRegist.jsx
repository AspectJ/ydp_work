import React, { PropTypes } from 'react'
import { connect } from 'dva'
import Login from '../components/Login'
import Regist from '../components/Regist'
import styles from './LoginRegist.less'

let LoginRegist = ({ app, dispatch, location }) => {
  const {
    loading,
    dropdownItem
  } = app;

  function LoginOrRegist(params){
    dispatch({
      type: `app/Admin${location.pathname.substring(1).replace('cinemacloud/', '')}`,
      payload: params
    });
  }

  const LoginProps = {
    loading,
    onSubmit(params){
      LoginOrRegist(params);
    }
  };

  const RegistProps = {
    loading,
    dropdownItem,
    queryRegistCinemaList(value){
      dispatch({
        type: 'app/queryRegistCinemaList',
        payload: {
          criteria: value
        }
      });
    },
    onSubmit(params){
      LoginOrRegist(params);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <a href="http://www.xiaoxiangfilm.com/" target="_blank" className={styles.logo}></a>
        <span className={styles.contact}>加盟热线: 0730-85000674</span>
      </div>
      <div className={location.pathname === '/cinemacloud/Login' ? styles.Login + ' ' + styles.wrapper : styles.Regist + ' ' + styles.wrapper}>
        <h1 className={styles.header}>
          {
            location.pathname === '/cinemacloud/Login' ? '用户登录' : '用户注册'
          }
        </h1>
        {
          location.pathname === "/cinemacloud/Login" ?
            <Login {...LoginProps} /> :
            <Regist {...RegistProps} />
        }
      </div>
    </div>
  );
};

LoginRegist.PropTypes = {
  app: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps(state){
  return {
    app: state.app
  };
}

export default connect(mapStateToProps)(LoginRegist)
