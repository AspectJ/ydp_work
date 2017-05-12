import {
  AdminLogin,
  loadAreaInfo
} from '../services/requests'
import Create from './assign/Create'
import Retrieve from './assign/Retrieve'
import Update from './assign/Update'
import Delete from './assign/Delete'
import { routerRedux } from 'dva/router'
import { message } from 'antd'

let Basic = {
  *AdminLogin({ payload }, { call, put }) {
    yield put({ type: 'showLoading' });
    const {data} = yield call(AdminLogin, payload);
    if(data){
      yield put({ type: 'querySuccess' });
      if(data.result === 1000){
        message.success('登录成功', 3);
        sessionStorage.setItem("nickname", data.data.nickname);
  			sessionStorage.setItem("adminid", data.data.adminid);
  			sessionStorage.setItem("adminname", data.data.adminname);
  			sessionStorage.setItem("cinemaid", data.data.cinemaid);
  			sessionStorage.setItem("cinemaname", data.data.cinemaname);
        sessionStorage.setItem("audit_flag", data.data.audit_flag);
        yield put(routerRedux.push('/cx/cinemalist'));
      } else {
        message.error(data.msg, 3);
      }
    } else {
      yield put({ type: 'querySuccess' });
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *AdminLogout({ payload }, { call, put }){
    sessionStorage.clear();
    yield put(routerRedux.push('/cx/login'));
  },
  *loadAreaInfo({ payload }, { select, call, put }){
    const areaInfo = yield select(({ app }) => app.areaInfo);
    if( areaInfo.length ){
      yield put({
        type: 'showModal',
        payload: {
          modalType: payload.modalType,
          currentItem: payload.currentItem
        }
      });
    } else {
      const hide = message.loading('正在查询地区信息...', 0);
      const { data } = yield call(loadAreaInfo);
      if(data){
        setTimeout(hide, 0);
        if(data.result === 1000){
          yield put({
            type: 'showModal',
            payload: {
              areaInfo: data.data,
              modalType: payload.modalType,
              currentItem: payload.currentItem
            }
          });
        } else {
          message.error(data.error, 3);
        }
      }
    }
  }
};

export default {
  effects: {...Basic, ...Create, ...Retrieve, ...Update, ...Delete}
}
