import {
  queryCinemaList,
  queryUsersList,
  queryNewsList,
  queryActivesList,
  queryReleasesList,
  querySourcesList,
  queryBannerList,
  queryAdminsList
} from '../../services/requests';
import { message } from 'antd'
import { routerRedux } from 'dva/router'

export default {
  *queryCinemaList({ payload }, { call, put }){
    yield put({
      type: 'showLoading',
      payload: {
        list: [],
        total: null
      }
    });
    const {data} = yield call(queryCinemaList, payload);
    if(data){
      if( data.result === 1000 ){
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: parseInt(data.total)
          }
        });
      } else {
        yield put({ type: 'querySuccess' });
        message.error(data.msg, 3);
      }
    } else {
      yield put({ type: 'querySuccess' });
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *queryUsersList({ payload }, { call, put }){
    yield put({
      type: 'showLoading',
      payload: {
        list: [],
        total: null
      }
    });
    const {data} = yield call(queryUsersList, payload);
    if(data){
      if( data.result === 1000 ){
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: parseInt(data.total)
          }
        });
      }
    } else {
      message.error(data.msg, 3);
    }
  },
  *queryNewsList({ payload }, { call, put }){
    yield put({
      type: 'showLoading',
      payload: {
        list: [],
        total: null
      }
    });
    console.log(payload);
    const {data} = yield call(queryNewsList, payload);
    if(data){
      if(data.result === 1000){
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: parseInt(data.total)
          }
        });
      } else {
        yield put({ type: 'querySuccess' });
        message.error(data.msg, 3);
      }
    } else {
      yield put({ type: 'querySuccess' });
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *queryActivesList({ payload }, { call, put }){
    yield put({
      type: 'showLoading',
      payload: {
        list: [],
        total: null
      }
    });
    const {data} = yield call(queryActivesList, payload);
    if(data){
      if(data.result === 1000){
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: parseInt(data.total)
          }
        });
      } else {
        yield put({ type: 'querySuccess' });
        message.error(data.msg, 3);
      }
    } else {
      yield put({ type: 'querySuccess' });
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *queryReleasesList({ payload }, { call, put }){
    yield put({
      type: 'showLoading',
      payload: {
        list: [],
        total: null
      }
    });
    const {data} = yield call(queryReleasesList, payload);
    if(data){
      if(data.result === 1000){
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: parseInt(data.total)
          }
        });
      } else {
        yield put({ type: 'querySuccess' });
        message.error(data.msg, 3);
      }
    } else {
      yield put({ type: 'querySuccess' });
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *querySourcesList({ payload }, { call, put }){
    yield put({
      type: 'showLoading',
      payload: { list: [], total: null }
    });
    const {data} = yield call(querySourcesList, payload);
    if(data){
      if(data.result === 1000){
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: parseInt(data.total)
          }
        });
      } else {
        yield put({ type: 'querySuccess' });
        message.error(data.msg, 3);
      }
    } else {
      yield put({ type: 'querySuccess' });
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *queryBannerList({ payload }, { call, put }){
    yield put({
      type: 'showLoading',
      payload: {
        list: []
      }
    });
    const {data} = yield call(queryBannerList, payload);
    if(data){
      if(data.result === 1000){
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data
          }
        });
      } else {
        yield put({ type: 'querySuccess' });
        message.error(data.msg, 3);
      }
    } else {
      yield put({ type: 'querySuccess' });
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *queryAdminsList({ payload }, { call, put }){
    yield put({
      type: 'showLoading',
      payload: {
        list: [],
        total: null
      }
    });
    const {data} = yield call(queryAdminsList, payload);
    if(data){
      if(data.result === 1000){
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: parseInt(data.total)
          }
        });
      } else {
        yield put({ type: 'querySuccess' });
        message.error(data.msg, 3);
      }
    } else {
      yield put({ type: 'querySuccess' });
      message.error('系统异常，请稍后再试', 3);
    }
  }
}
