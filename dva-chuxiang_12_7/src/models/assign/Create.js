import {
  createCinema,
  createNews,
  createSource,
  createAdmin,
  createActive,
  createRelease,
} from '../../services/requests';
import { message } from 'antd'

export default {
  *createCinema({ payload }, { select, call, put }){
    const hide = message.loading('正在添加影院信息...', 0);
    const {data} = yield call(createCinema, payload);
    if(data){
      setTimeout(hide, 0);
      if(data.result === 1000){
        message.success('影院添加成功', 3);
        const list = yield select(({app}) => app.list);
        list.unshift(data.data);
        const newList = list.slice(0, 10);
        yield put({
          type: 'hideModal',
          payload: {
            list: newList
          }
        });
      } else {
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *createNews({ payload }, { select, call, put }){
    const hide = message.loading('正在添加资讯信息...', 0);
    const {data} = yield call(createNews, payload);
    if(data){
      setTimeout(hide, 0);
      if(data.result === 1000){
        message.success('资讯添加成功', 3);
        const list = yield select(({app}) => app.list);
        list.unshift(data.data);
        const newList = list.slice(0, 10);
        yield put({
          type: 'hideModal',
          payload: {
            list: newList
          }
        });
      } else {
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *createSource({ payload }, { select, call, put }){
    const hide = message.loading('正在添加素材信息...', 0);
    const {data} = yield call(createSource, payload);
    if(data){
      setTimeout(hide, 0);
      if(data.result === 1000){
        message.success('素材添加成功', 3);
        const list = yield select(({app}) => app.list);
        list.unshift(data.data);
        const newList = list.slice(0, 10);
        yield put({
          type: 'hideModal',
          payload: {
            list: newList
          }
        });
      } else {
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *createAdmin({ payload }, { select, call, put }){
    const {data} = yield call(createAdmin, payload);
    if(data){
      if(data.result === 1000){
        message.success('系统用户添加成功', 3);
        const list = yield select(({app}) => app.list);
        list.unshift(data.data);
        const newList = list.slice(0, 10);
        yield put({
          type: 'hideModal',
          payload: {
            list: newList
          }
        });
      } else {
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *createActives({ payload }, { select, call, put }){
    const hide = message.loading('正在添加活动信息...', 0);
    const {data} = yield call(createActive, payload);
    if(data){
      setTimeout(hide, 0);
      if(data.result === 1000){
        message.success('活动添加成功', 3);
        const list = yield select(({app}) => app.list);
        list.unshift(data.data);
        const newList = list.slice(0, 10);
        yield put({
          type: 'hideModal',
          payload: {
            list: newList
          }
        });
      } else {
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *createRelease({ payload }, { select, call, put }){
    const hide = message.loading('正在添加通知信息...', 0);
    const {data} = yield call(createRelease, payload);
    if(data){
      setTimeout(hide, 0);
      if(data.result === 1000){
        message.success('通知添加成功', 3);
        const list = yield select(({app}) => app.list);
        list.unshift(data.data);
        const newList = list.slice(0, 10);
        yield put({
          type: 'hideModal',
          payload: {
            list: newList
          }
        });
      } else {
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
}
