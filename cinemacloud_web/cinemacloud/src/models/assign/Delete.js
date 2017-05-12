import {
  deleteCinema,
  deleteUser,
  deleteColumn,
  deleteAllot,
  deleteAllotInfo,
  deleteRole,
  deleteNotice,
  deleteActivity,
  deleteBillconf,
  deleteFfersconf,
  deleteFfersInfo
} from '../../services/requests';

import { routerRedux } from 'dva/router'
import { message } from 'antd'

export default {
  *deleteCinema({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(deleteCinema, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        message.success('影院删除成功', 3);
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
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *deleteColumn({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(deleteColumn, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        message.success('栏目删除成功', 3);
        yield put({
          type:'queryColumnList',
          payload:{
            userid: JSON.parse(sessionStorage.getItem('user')).userid
          }
        })
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *deleteNotice({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    message.success('正在删除文章....', 3);
    const {data} = yield call(deleteNotice, payload);
    if(data){
      if(data.result === 1000){
        message.success('文章删除成功', 3);
        
        if(payload.program_id){
          //查询单个栏目文章
          yield put({
            type:'queryNoticeList',
            payload:{
              program_id:payload.program_id
            }
          })
        } else {
          //查所有
          yield put({
            type:'queryNoticeDropdown',
            payload:{
              userid: JSON.parse(sessionStorage.getItem('user')).userid
            }
          })
        }
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }

    yield put({ type: 'querySuccess' });
  },
  *deleteActivity({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(deleteActivity, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        message.success('通知删除成功',3)
        yield put({
          type: 'queryActivityList',
          payload: {
            pagesize: 10,
            page: 1
          }
        })
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *deleteUser({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(deleteUser, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        message.success('用户删除成功',3)
        yield put({
          type:'queryAllUserList',
          payload:{
            pagesize: 10,
            page: 1,
            status:payload.status,
          }
        })
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *deleteAllot({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(deleteAllot,payload);
    if(data){
      if(data.result === 1000){
        // const list = yield select(({ app }) => app.list);
        // const newList = list.filter((item) => {
        //   return item.suppliesconfid !== payload.suppliesconfid;
        // })
        // message.success('通知删除成功',3);
        // yield put({
        //   type:'querySuccess',
        //   payload:{
        //     list:newList,
        //   }
        // })
        yield put({
          type: 'queryAllotList',
          payload: {
            pagesize: 10,
            page: 1,
          }
        });
        yield put({type: 'queryAllotList'});
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg,3);
      }
    } else {
      message.error('系统异常，请稍后再试',3);
    }
  },
  *deleteAllotInfo({ payload }, { select, call, put }){
    yield put({ type:'showLoading' });
    const {data} = yield call(deleteAllotInfo, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        // const list = yield select(({ app }) => app.list);
        // const newList = list.filter((item) => {
        //   return item.suppliesconfid !== payload.suppliesconfid;
        // })
        // message.success('通知删除成功',3);
        // yield put({
        //   type:'querySuccess',
        //   payload:{
        //     list:newList,
        //   }
        // })
        // yield put({type: 'queryAllotList'});
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg,3);
      }
    } else {
      message.error('系统异常，请稍后再试',3);
    }
  },
  *deleteRole({ payload }, { call, put, select }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(deleteRole, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        const list = yield select(({ app }) => app.list);
        const newList = list.filter((role) => {
          return role.roleid !== payload.roleid;
        });
        message.success('角色删除成功', 3);
        yield put({
          type:'querySuccess',
          payload:{
            list:newList,
          }
        })
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  //删除账单批次
   *deleteBillconf({ payload }, { select, call, put }){
     yield put({ type: 'showLoading' });
     const {data} = yield call(deleteBillconf,payload);
    yield put({ type: 'querySuccess' });
     if(data){
       if(data.result === 1000){
         yield put({
            type: 'queryBillconfList',
            payload: {
              pagesize: 10,
              page: 1,
            }
          });
       } else {
         if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
         message.error(data.msg,3);
       }
     } else {
       message.error('系统异常，请稍后再试',3);
     }
   },
   *deleteFfersconf({ payload }, { select, call, put }){
     yield put({ type: 'showLoading' });
     const {data} = yield call(deleteFfersconf,payload);
     yield put({ type: 'querySuccess' });
     if(data){
       if(data.result === 1000){
         yield put({
           type: 'queryFfersconfList',
           payload: {
             pagesize: 10,
             page: 1,
           }
         });
       } else {
         if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
         message.error(data.msg,3);
       }
     } else {
       message.error('系统异常，请稍后再试',3);
     }
   },
   *deleteFfersInfo({ payload }, { select, call, put }){
      yield put({type: 'showLoading'});
      const {data} = yield call(deleteFfersInfo, payload);
      yield put({ type: 'querySuccess' });
      if(data){
        if(data.result === 1000){
        // const list = yield select(({ app }) => app.list);
        // const newList = list.filter((item) => {
        //   return item.suppliesconfid !== payload.suppliesconfid;
        // })
        // message.success('通知删除成功',3);
        // yield put({
        //   type:'querySuccess',
        //   payload:{
        //     list:newList,
        //   }
        // })
        // yield put({type: 'queryAllotList'});
        } else {
         if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
          message.error(data.msg,3);
        }
      } else {
        message.error('系统异常，请稍后再试',3);
      }
    },
}
