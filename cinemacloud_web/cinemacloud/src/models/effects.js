
import {
  AdminLogin,
  AdminLogout,
  AdminRegist,
  UserLog,
  queryLatestInfo,
  queryLatestBill,
  queryLatestAllot,
  queryLatestFfers,
  queryLastestActivityInfo,
  queryLastestActivityList,
  LogCount,
  loadAreaInfo,
  ExcelTemplate
} from '../services/requests'
import Create from './assign/Create'
import Retrieve from './assign/Retrieve'
import Update from './assign/Update'
import Delete from './assign/Delete'
import { routerRedux } from 'dva/router'
import { message, notification } from 'antd'

import React from 'react'
import auth from '../utils/auth'

let Basic = {
  *AdminLogin({ payload }, { call, put }) {
    yield put({ type: 'showLoading' });
    const {data} = yield call(AdminLogin, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        sessionStorage.setItem('user', JSON.stringify(data.data));

        const menuid   = [35, 25, 15, 95, 95, 65, 45, 85];
        const menuname = ['Cinema', 'Role', 'User', 'Column', 'Notice', 'Allot', 'Ffers', 'Bill'];
        const filtered = auth(menuid);
        if( filtered.length ){
          // const index = menuid.findIndex(id => {return id === filtered[0]});

          const qrcode = (
            <div>
              <p>关注后您可在微信中收发通知或消息。</p>
              <img className="imgQRcode" />
            </div>
          );

          // 企业号二维码扫描
          if( data.data.concern_status === 4 ){
            notification['warning']({
              message: '尚未关注微信企业号',
              description: qrcode,
              duration: null
            });
          }

          // 加载日志
          auth([102]).length ? yield put({ type: 'LogCount' }) : '';

          message.success('登录成功', 3);
          yield put(routerRedux.push('/cinemacloud/todos'));
        } else {
          message.warning('您尚未分配权限, 请联系系统管理员', 5);
        }

      } else {
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *AdminLogout({ payload }, { call, put }){
    yield put({ type: 'showLoading' });
    yield put(routerRedux.push('/cinemacloud/Login'));
    yield call(AdminLogout);
    yield put({ type: 'querySuccess' });
    sessionStorage.clear();
  },
  *AdminRegist({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const cinema = yield select(({app}) => app.dropdownItem.cinema);
    if( cinema.length === 1 && cinema[0].theatername === payload.theater ){
      payload.theaterid = cinema[0].theaterid
    }

    const { data } = yield call(AdminRegist, payload);
    if(data){
      if( data.result === 1000 ){
        yield put(routerRedux.push('/cinemacloud/Login'));
        message.success('注册成功, 请等待管理员审核', 5);
      } else {
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }

    yield put({ type: 'querySuccess' });
  },
  *UserLog({ payload }, { call, put }){
    yield put({
      type: 'showLoading',
      payload: {
        list: []
      }
    });
    const { data } = yield call(UserLog, payload);
    if(data){
      if( data.result === 1000 ){
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: data.total,
            current: payload.page
          }
        });
      } else {
        if( data.result === 1109 ) {
          yield put({ type: 'AdminLogout' });
        }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }

    yield put({ type: 'querySuccess' });
  },
  *todos({ payload }, { call, put }){
    if( JSON.parse(sessionStorage.getItem('user')) ){
      //账单palyload
      const billPayload = {
        ...payload,
        status: JSON.parse(sessionStorage.getItem('user')).roletype === 2 ?
                0 : JSON.parse(sessionStorage.getItem('user')).roletype === 1 ?
                  1 : 2
      }

    //物料payload
    const allotPayload = {
      ...payload,
      status: JSON.parse(sessionStorage.getItem('user')).roletype === 2 ?
              1 : JSON.parse(sessionStorage.getItem('user')).roletype === 1 ?
                2 : 0
    }
    //回盘payload
    const ffersPayload = {
      ...payload,
      status: JSON.parse(sessionStorage.getItem('user')).roletype === 2 ?
              0 : JSON.parse(sessionStorage.getItem('user')).roletype === 1 ?
                1 : ''
    }

      const funcArr = auth([95,65,45,85,124]);
      for(let i = 0;i<funcArr.length;i++){
        switch(funcArr[i]){
          case 65:
            //查询最新物料
            yield put({
              type:'queryLatestAllot',
              payload:allotPayload,
            })
            break;
          case 45:
            //查询回盘
            yield put({
              type:'queryLatestFfers',
              payload:ffersPayload,
            })
            break;
          case 85:
            //查询账单
            yield put({
              type:'queryLatestBill',
              payload:billPayload,
            })
            break;
          case 95:
            //查询文章
            yield put({
              type:'queryLatestInfo',
              payload:payload,
            })
            break;
          case 124:
            //查询活动
            yield put({
              type: 'queryLastestActivityList',
              payload: {
                pagesize: 10,
                page: 1
              }
            })
        }
      }

      // if( JSON.parse(sessionStorage.getItem('user'))){
      //   if( JSON.parse(sessionStorage.getItem('user')).roletype === 2 ){
      //     yield put({
      //       type: 'queryLastestActivityInfo',
      //       payload: {
      //         pagesize: 10,
      //         page: 1
      //       }
      //     });
      //   } else {
      //     yield put({
      //       type: 'queryLastestActivityList',
      //       payload: {
      //         pagesize: 10,
      //         page: 1
      //       }
      //     });
      //   }
      // }

    } else {
      yield put({
        type: 'AdminLogout'
      });
    }
  },
  *LogCount({ payload }, { call, put }){
    const { data } = yield call(LogCount);
    if( data && data.result === 1000 ){
      yield put({
        type: 'changeLogCount',
        log: data.total
      });
    } else {
      message.error('系统异常, 获取日志失败', 5)
    }
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
          if( data.result === 1109 ) {
            yield put({ type: 'AdminLogout' });
          }
          message.error(data.error, 3);
        }
      } else {
        message.error('系统异常，请稍后再试', 3);
      }
    }
  },
  *ExcelTemplate({ payload }, { call, put }){
    const { data } = yield call(ExcelTemplate, payload);
    if( data ){
      if(data.result === 1000){
        yield put({
          type: 'changeDropdown',
          payload: {
            item: 'template',
            list: data.data
          }
        });
      } else {
        if( data.result === 1109 ) {
          yield put({ type: 'AdminLogout' });
        }
        message.error(data.error, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  }
};

export default {
  effects: {...Basic, ...Create, ...Retrieve, ...Update, ...Delete}
}
