import {
  updatePassword,
  updateCinema,
  updateNews,
  updateSource,
  updateBanners,
  // audit_flag
  updateCinemaStatus,
  updateUsersStatus,
  updateNewsStatus,
  updateActivesStatus,
  updateReleaseStatus,
  updateSourcesStatus,
  updateAdmin,
  updateActives,
  updateRelease,
} from '../../services/requests';
import { routerRedux } from 'dva/router'
import { message } from 'antd'

export default{
  *updatePassword({ payload }, { call, put }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(updatePassword, payload);
    if(data){
      if(data.result === 1000){
        sessionStorage.clear();
        yield put(routerRedux.push('/cx/login'));
        yield put({ type: 'querySuccess' });
        message.success('密码修改成功, 请重新登录', 3);
      } else {
        yield put({ type: 'querySuccess' });
        message.error(data.msg, 3);
      }
    } else {
      yield put({ type: 'querySuccess' });
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *updateCinema({ payload }, { select, call, put }){
    const {data} = yield call(updateCinema, payload);
    if(data){
      if(data.result === 1000){
        message.success('影院信息修改成功', 3);
        const list = yield select(({ app }) => app.list);
        const newList = list.map(cinema => {
          if( cinema.j_id === payload.j_id ){
            cinema.audit_flag = 0;
            return {...cinema, ...payload};
          }

          return cinema;
        });
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
  *updateNews({ payload }, { select, call, put}){
    const {data} = yield call(updateNews, payload);
    if( data ){
      if(data.result === 1000){
        message.success('新闻信息修改成功', 3);
        const list = yield select(({app}) => app.list),
              newList = list.map(news => {
          if(news.news_id === payload.news_id){
            news.audit_flag = 0;
            payload.news_content = decodeURIComponent(payload.news_content);
            return {...news, ...payload};
          }

          return news;
        });
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
  *updateSource({ payload }, { select, call, put }){
    const {data} = yield call(updateSource, payload);
    if(data){
      if(data.result === 1000){
        message.success('素材信息修改成功', 3);
        const list = yield select(({ app }) => app.list);
        const newList = list.map(source => {
          if( source.material_id === payload.material_id ){
            source.audit_flag = 0;
            return {...source, ...payload};
          }

          return source;
        });
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
  *updateBanners({ payload }, { call, put }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(updateBanners, payload);
    if(data){
      if(data.result === 1000){
        message.success('轮播图更新成功', 3);
        yield put({
          type: 'querySuccess',
          payload: {
            list: payload
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
  // audit_flag
  *updateCinemaStatus({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(updateCinemaStatus, payload);
    if( data ){
      if(data.result === 1000){
        const list = yield select(({ app }) => app.list);
        list.map((cinema) => {
          if( cinema.j_id === payload.j_id ){
            cinema.audit_flag = payload.audit_flag;
          }
        });
        yield put({
          type: 'querySuccess',
          payload: {
            list: list
          }
        });
        message.success('影院状态更改成功', 3);
      } else {
        yield put({ type: 'querySuccess' });
        message.error(data.msg, 3);
      }
    } else {
      yield put({ type: 'querySuccess' });
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *updateUsersStatus({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(updateUsersStatus, payload);
    if(data){
      if(data.result === 1000){
        message.success('用户状态修改成功', 3);
        const list = yield select(({ app }) => app.list);
        const newList = list.map((user) => {
          if( user.userid === payload.userid ){
            console.log(data.data);
            user = data.data;
          }

          return user;
        });

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
  *updateNewsStatus({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(updateNewsStatus, payload);
    if( data ){
      if(data.result === 1000){
        const list = yield select(({ app }) => app.list);
        list.map((news) => {
          if( news.news_id === payload.news_id ){
            news.audit_flag = payload.audit_flag;
          }
        });
        yield put({
          type: 'querySuccess',
          payload: {
            list: list
          }
        });
        message.success('新闻状态更改成功', 3);
      } else {
        yield put({ type: 'querySuccess' });
        message.error(data.msg, 3);
      }
    } else {
      yield put({ type: 'querySuccess' });
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *updateActivesStatus({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(updateActivesStatus, payload);
    if( data ){
      if(data.result === 1000){
        const list = yield select(({ app }) => app.list);
        list.map((active) => {
          if( active.acti_id === payload.acti_id ){
            active.audit_flag = payload.audit_flag;
          }
        });
        yield put({
          type: 'querySuccess',
          payload: {
            list: list
          }
        });
        message.success('活动状态更改成功', 3);
      } else {
        yield put({ type: 'querySuccess' });
        message.error(data.msg, 3);
      }
    } else {
      yield put({ type: 'querySuccess' });
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *updateReleaseStatus({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(updateReleaseStatus, payload);
    if( data ){
      if(data.result === 1000){
        const list = yield select(({ app }) => app.list);
        list.map((release) => {
          if( release.noti_id === payload.noti_id ){
            release.audit_flag = payload.audit_flag;
          }
        });
        yield put({
          type: 'querySuccess',
          payload: {
            list: list
          }
        });
        message.success('通知状态更改成功', 3);
      } else {
        yield put({ type: 'querySuccess' });
        message.error(data.msg, 3);
      }
    } else {
      yield put({ type: 'querySuccess' });
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *updateSourcesStatus({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(updateSourcesStatus, payload);
    if( data ){
      if(data.result === 1000){
        const list = yield select(({ app }) => app.list);
        list.map((source) => {
          if( source.material_id === payload.material_id ){
            source.audit_flag = payload.audit_flag;
          }
        });
        yield put({
          type: 'querySuccess',
          payload: {
            list: list
          }
        });
        message.success('素材状态更改成功', 3);
      } else {
        yield put({ type: 'querySuccess' });
        message.error(data.msg, 3);
      }
    } else {
      yield put({ type: 'querySuccess' });
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *updateAdmin({ payload }, { select, call, put }){
    const {data} = yield call(updateAdmin, payload);
    if(data){
      if(data.result === 1000){

        message.success('系统用户信息修改成功', 3);
        const list = yield select(({ app }) => app.list);
        list.map((admin) => {
          if( admin.adminid === payload.admin_id ){
            admin.audit = payload.audit === true ? 1 : 0;
            admin.state = payload.admin_state;
            admin.nickname = payload.admin_nickname;
          }
        });

        yield put({
          type: 'hideModal',
          payload: {
            list: list
          }
        });
      } else {
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *updateActives({ payload }, { select, call, put}){
    const {data} = yield call(updateActives, payload);
    if( data ){
      if(data.result === 1000){
        message.success('活动信息修改成功', 3);
        const list = yield select(({app}) => app.list),
              newList = list.map(activity => {
          if(activity.acti_id === payload.acti_id){
            activity.audit_flag = 0;
            payload.acti_content = decodeURIComponent(payload.acti_content);
            return {...activity, ...payload};
          }

          return activity;
        });
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
  *updateRelease({ payload }, { select, call, put}){
    const {data} = yield call(updateRelease, payload);
    if( data ){
      if(data.result === 1000){
        message.success('通知信息修改成功', 3);
        const list = yield select(({app}) => app.list),
              newList = list.map(release => {
          if(release.noti_id === payload.noti_id){
            release.audit_flag = 0;
            payload.noti_content = decodeURIComponent(payload.noti_content);
            return {...release, ...payload};
          }

          return release;
        });
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
