import {
  createCinema,
  createUser,
  createColumn,
  createNotice,
  createActivity,
  createAllotNotice,
  createAllotInfo,
  createRole,
  createBillconf,
  createFfersconf
} from '../../services/requests'
import { message } from 'antd'

export default {
  *createCinema({ payload }, { select, call, put }){
    const hide = message.loading('正在添加影院信息...', 0);
    const {data} = yield call(createCinema, payload);
    if(data){
      setTimeout(hide, 0);
      if(data.result === 1000){
        message.success('影院添加成功', 3);
        yield put({
          type:'showContent'
        })
        yield put({
          type: 'queryAllCinemaList',
          payload: {
            pagesize: 10,
            page: 1,
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
  },
  *createUser({ payload }, { select, call, put }){
    const hide = message.loading('正在添加用户信息...', 0);
    const {data} = yield call(createUser, {...payload,operatorid:JSON.parse(sessionStorage.getItem('user')).userid});
    if(data){
      setTimeout(hide, 0);
      if(data.result === 1000){
        message.success('用户添加成功', 3);
        yield put({
          type:'showContent'
        })
        yield put({
          type:'queryAllUserList',
          payload:{
            pagesize: 10,
            page: 1,
            status:4,
          }
        })
      } else {
        if( data.result === 1109 ) {
          yield put({ type: 'AdminLogout' });
        }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *createColumn({ payload }, { select, call, put }){
    const hide = message.loading('正在添加栏目...', 0);
    const {data} = yield call(createColumn, payload);
    if(data){
      setTimeout(hide, 0);
      if(data.result === 1000){
        message.success('栏目添加成功', 3);
        yield put({
          type: 'hideModal',
        });
        yield put({
          type:'queryColumnList',
          payload:{
            userid: JSON.parse(sessionStorage.getItem('user')).userid
          }
        })
      } else {
        if( data.result === 1109 ) {
          yield put({ type: 'AdminLogout' });
        }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *createNotice({ payload }, { select, call, put }){
    const hide = message.loading('正在添加文章...', 0);
    const {data} = yield call(createNotice, payload);
    if(data){
      setTimeout(hide, 0);
      if(data.result === 1000){
        message.success('文章添加成功', 3);
        yield put({
          type: 'showContent',
        });

        if(parseInt(payload.program_id) === payload.columnChoosem){
          //如果添加的栏目文章是当前栏目
          yield put({
            type:'queryNoticeList',
            payload:{
              program_id:payload.program_id
            }
          })
        } else if(payload.columnChoosem === 0){
          //如果当前栏目是所有栏目
          yield put({
            type:'queryNoticeDropdown',
            payload:{
              userid:JSON.parse(sessionStorage.getItem('user')).userid
            }
          })
        } else {
          //如果添加的栏目不是当前的栏目  
        }
      } else {
        if( data.result === 1109 ) {
          yield put({ type: 'AdminLogout' });
        }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *createActivity({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(createActivity, payload);
    if(data){
      if(data.result === 1000){
        message.success('活动通知添加成功', 3);
        yield put({
          type: 'queryActivityList',
          payload: {
            page: 1,
            pagesize: 10
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
  },
  //新建物料分发通知
  *createAllotNotice({ payload }, { select, call, put }){
    //提示
    message.loading('正在添加通知...', 2);
    //dispatch
    const {data} = yield call(createAllotNotice, payload);
    //返回响应
    if(data){
      if(data.result === 1000){
        message.success('影院添加成功', 3);
        yield put({
          type:'queryAllotList',
          payload:{
            page:1
          }
        })
        yield put({
          type:'hideModal'
        })
      } else {
        if( data.result === 1109 ) {
          yield put({ type: 'AdminLogout' });
        }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  //新建物料通知详情
  *createAllotInfo({ payload }, { select, call, put }){
    //提示
    message.loading('正在添加通知详情...', 2);
    const {data} = yield call(createAllotInfo,payload.params);
    //响应
    if(data){
      if(data.result === 1000){
        message.success('通知详情添加成功',3);
        yield put({
          type:'queryAllotInfo',
          payload:{
            suppliesconfid:payload.params.suppliesconfid,
            suppliesconfname:payload.params.suppliesconfname
          }
        })
      } else {
        if( data.result === 1109 ) {
          yield put({ type: 'AdminLogout' });
        }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *createRole({ payload }, { select, put, call }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(createRole, payload);

    yield put({ type: 'app/querySuccess' });
    if(data){
      if(data.result === 1000){
        const list = yield select(({app}) => app.list);
        list.unshift(data.data);

        message.success('角色添加成功', 3);
        yield put({
          type:'hideModal',
          payload:{
            list: list
          }
        })
      } else {
        if( data.result === 1109 ) {
          yield put({ type: 'AdminLogout' });
        }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  //新建物料分发通知
  *createFfersconf({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(createFfersconf, payload);
    if(data){
      if(data.result === 1000){
        message.success('回盘批次添加成功', 3);
        yield put({
          type:'queryFfersconfList',
          payload:{
            page:1,
            pagesize:10
          }
        });

        yield put({
          type:'hideModal',
          payload: {
            modalItem: null
          }
        });
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *createBillconf({ payload }, { select, call, put }){
    message.loading('正在添加通知...', 2);
    const {data} = yield call(createBillconf, payload);
    if(data){
      if(data.result === 1000){
        message.success('账单添加', 3);
        yield put({
          type:'queryBillconfList',
          payload:{
            page:1
          }
        })
        yield put({
          type:'hideModal'
        })
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
}
