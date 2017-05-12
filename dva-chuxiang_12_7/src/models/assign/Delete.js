import {
  deleteCinema,
  deleteNews,
  deleteActive,
  deleteRelease,
  deleteSource,
} from '../../services/requests';
import { routerRedux } from 'dva/router'
import { message } from 'antd'

export default {
  *deleteCinema({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(deleteCinema, payload);
    if(data){
      if(data.result === 1000){
        const list = yield select(({ app }) => app.list);
        const newList = list.filter((cinema) => {
          return cinema.j_id !== payload.j_id;
        });
        message.success('影院删除成功', 3);
        yield put({
          type: 'querySuccess',
          payload: {
            list: newList
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
  *deleteNews({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(deleteNews, payload);
    if(data){
      if(data.result === 1000){
        const list = yield select(({ app }) => app.list);
        const newList = list.filter((news) => {
          return news.news_id !== payload.news_id;
        });
        message.success('新闻删除成功', 3);
        yield put({
          type: 'querySuccess',
          payload: {
            list: newList
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
  *deleteActive({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(deleteActive, payload);
    if(data){
      if(data.result === 1000){
        const list = yield select(({ app }) => app.list);
        const newList = list.filter((active) => {
          return active.acti_id !== payload.acti_id;
        });
        message.success('活动删除成功', 3);
        yield put({
          type: 'querySuccess',
          payload: {
            list: newList
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
  *deleteRelease({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(deleteRelease, payload);
    if(data){
      if(data.result === 1000){
        const list = yield select(({ app }) => app.list);
        const newList = list.filter((release) => {
          return release.noti_id !== payload.noti_id;
        });
        message.success('通知删除成功', 3);
        yield put({
          type: 'querySuccess',
          payload: {
            list: newList
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
  *deleteSource({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(deleteSource, payload);
    if(data){
      if(data.result === 1000){
        const list = yield select(({ app }) => app.list);
        const newList = list.filter((source) => {
          return source.material_id !== payload.material_id;
        });
        message.success('素材删除成功', 3);
        yield put({
          type: 'querySuccess',
          payload: {
            list: newList
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
