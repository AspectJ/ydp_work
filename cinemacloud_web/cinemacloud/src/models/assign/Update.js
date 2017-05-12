import {
  updatePassword,
  updateCinema,
  updateUser,
  updateUserVerify,
  updateUserStatus,
  updateColumnStatus,
  updateColumn,
  updataAllotList,
  updateAllotMsg,
  updateAllotStatus,
  updateNotice,
  updateActivityStatus,
  updateActivityMsg,
  // audit_flag
  updateRoleInfo,
  updateRoleAuth,
  updateRoleStatus,
  updateBillconf,
  updateBillMsg,
  updateBillStatus,
  updateFfersInfo,
  updateFfersMsg
} from '../../services/requests';
import { routerRedux } from 'dva/router'
import { message } from 'antd'

export default{
  *updatePassword({ payload }, { call, put }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(updatePassword, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        sessionStorage.clear();
        yield put(routerRedux.push('/cinemacloud/Login'));
        message.success('密码修改成功, 请重新登录', 3);
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *updateCinema({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(updateCinema, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        message.success('影院信息修改成功', 3);
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
  *updateColumn({ payload }, { select, call, put }){
    const hide = message.loading('栏目修改中...', 0);
    const {data} = yield call(updateColumn, payload);
    if(data){
      setTimeout(hide, 0);
      if(data.result === 1000){
        message.success('栏目修改成功', 3);
        yield put({
          type: 'hideModal',
        });
        yield put({
          type:'queryColumnList',
          payload: {
                pagesize: 10,
                page: 1,
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
  *updateColumnStatus({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(updateColumnStatus, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){


        payload.status === 0 ?
          message.success('栏目禁用成功', 3) :
            message.success('栏目启用成功', 3) ;


        const list = yield select(({app}) => app.list);
        list.map(columns => {
          if( columns.program_id === payload.program_id ){
            columns.status === 1 ? columns.status = 0 : columns.status = 1;
          }
        })

        yield put({
          type: 'querySuccess',
          list: list
        });

      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *updateUser({ payload }, { select, call, put }){
    const hide = message.loading('正在保存用户信息...', 0);
    const {data} = yield call(updateUser, payload);
    if(data){
      setTimeout(hide, 0);
      if(data.result === 1000){
         message.success('用户信息修改成功', 3);
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
  *updateUserVerify({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(updateUserVerify, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        const contentItem = yield select(({app}) => app.contentItem);
        contentItem.map((item) => {
          if(item.userid === payload.userid){
            payload.audit_flag === 0 ?
              item.audit_flag = 1 :
              item.audit_flag = 0;
          }
        })

        message.success('审核状态更改成功', 3);
        yield put({
          type: 'hideModal',
          payload: {
            contentItem: contentItem,
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
  *updateUserStatus({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(updateUserStatus, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        const contentItem = yield select(({app}) => app.contentItem);
        contentItem.map((item) => {
          if(item.userid === payload.userid){
            payload.status === 0 ?
              item.status = 1 :
              item.status = 0;
          }
        })

        message.success('审核状态更改成功', 3);
        yield put({
          type: 'hideModal',
          payload: {
            contentItem: contentItem,
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
  *updateNotice({ payload }, { select, call, put }){
    const hide = message.loading('文章修改中...', 0);
    const {data} = yield call(updateNotice, payload);
    const pages = yield select(({app}) => app.current);
    const app = yield select(({app}) => app);

    if(data){
      setTimeout(hide, 0);
      if(data.result === 1000){
        message.success('文章修改成功', 3);
        if(payload.columnChoosem === '0'){
          //如果当前是所有栏目
          yield put({
            type:'queryPageInfo',
            payload:{
              criteria:'',
              page:pages,
              pagesize:10,
              // userid: JSON.parse(sessionStorage.getItem('user')).userid
            }
          })
        } else{
          //当前为自选栏目
          yield put({
            type:'queryNoticeList',
            payload:{
              page:pages,
              criteria:'',
              pagesize:10,
              program_id:payload.program_id,
            }
          })
        }
        // yield put({
        //   type:'queryPageInfo',
        //   payload: {
        //     pagesize: 10,
        //     page: 1,
        //     userid: JSON.parse(sessionStorage.getItem('user')).userid
        //   }
        // })
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *updataAllotList({ payload }, { select, call, put }){
    const hide = message.loading('通知修改中...', 0);
    const {data} = yield call(updataAllotList, payload);
    if(data){
      setTimeout(hide, 0);
      if(data.result === 1000){
        message.success('通知修改成功', 3);
        const list = yield select(({ app }) => app.list);
        const newList = list.map(item => {
          if(item.suppliesconfid === payload.suppliesconfid){
            item.suppliesconfname = data.data.suppliesconfname;
            item.distributor = data.data.distributor;
          }
          return item;
        })
        yield put({
          type:'hideModal',
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
  *updateAllotMsg({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(updateAllotMsg, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        const contentItem = yield select(({app}) => app.contentItem);
        const newList = contentItem.map(item => {
          if( item.suppliesid === payload.suppliesids ){
            item.status = 1;
          }

          return item;
        });

        message.success('通知发送成功', 3);
        yield put({
          type: 'querySuccess',
          payload: {
            contentItem: newList
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
  *updateRoleInfo({ payload }, { select, put, call }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(updateRoleInfo, payload);
    yield put({ type: 'querySuccess' });
    if( data ){
      if( data.result === 1000 ){
        const list = yield select(({ app }) => app.list);
        list.map(role => {
          if( role.roleid === payload.roleid ){
            return role.rolename = payload.rolename;
          }
        });
        yield put({
          type: 'hideModal',
          payload: {
            list: list
          }
        });
        message.success('角色名称更改成功', 3);
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *updateRoleAuth({ payload }, { call, put, select }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(updateRoleAuth, payload);
    yield put({ type: 'querySuccess' });
    if( data ){
      if( data.result === 1000 ){
        const list = yield select(({app}) => app.list);
        list.map(role => {
          if( role.roleid === data.data.roleid ){
            return role = data.data;
          }
        });

        yield put({ type: 'hideModal' });
        message.success('授权成功', 3);
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  // Status
  *updateRoleStatus({ payload }, { call, put, select }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(updateRoleStatus, payload);
    yield put({ type: 'querySuccess' });
    if( data ){
      if( data.result === 1000 ){
        const list = yield select(({ app }) => app.list);
        list.map(role => {
          if( role.roleid === payload.roleid ){
            return role.status = payload.status;
          }
        });
        yield put({
          type: 'querySuccess',
          payload: {
            list: list
          }
        });
        message.success('角色状态更改成功', 3);
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *updateAllotStatus({ payload }, { select, put, call }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(updateAllotStatus, payload);
    yield put({ type: 'querySuccess' });
    if( data ){
      if( data.result === 1000 ){
        const contentItem = yield select(({app}) => app.contentItem);
        const newList = contentItem.map(item => {
          if( item.suppliesid === payload.suppliesid ){
            item.status = payload.status;
          }

          return item;
        });

        message.success('物料验收成功', 3);
        yield put({
          type: 'querySuccess',
          payload: {
            contentItem: newList
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
  *updateActivityLink({ payload }, { select, call ,put }){
    const contentItem = yield select(({app}) => app.contentItem);
    const newList = contentItem.map(item => {
      if(item.activityid.toString() === payload.activityid){
        item.doc_url = payload.savepath;
      }

      return item;
    });

    yield put({
      type: 'querySuccess',
      payload: {
        contentItem: newList
      }
    });
  },
  *updateActivityMsg({ payload }, { put, call }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(updateActivityMsg, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        message.success('通知发送成功', 3);
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *updateActivityStatus({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(updateActivityStatus, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        const contentItem = yield select(({app}) => app.contentItem);
        const newList = contentItem.map(item => {
          if(item.activityid === payload.activityid){
            item.status = payload.status;
          }

          return item;
        });

        yield put({
          type: 'querySuccess',
          payload: {
            contentItem: newList
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
  *updateBillconf({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(updateBillconf, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        message.success('账单批次修改成功', 3);
        const list = yield select(({ app }) => app.list);
        const newList = list.map(item => {
          if(item.billconfid === payload.billconfid){
            item.billconfname = data.data.billconfname;
          }
          return item;
        })
        yield put({
          type:'hideModal',
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
  *updateBillMsg({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(updateBillMsg, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        message.success('通知发送成功', 3);
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *updateBillStatus({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(updateBillStatus, payload);
    yield put({ type: 'querySuccess' });
    if(data) {
      if (data.result === 1000) {
        const contentItem = yield select(({app}) => app.contentItem);
        const newList = contentItem.map(item => {
          if( item.billid === payload.billid ){
            item.status = payload.status;
          }

          return item;
        });

        message.success('账单已核验', 3);
        yield put({
          type: 'querySuccess',
          payload: {
            contentItem: newList
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
  *updateBillLink({ payload }, { select, call, put }){
    const contentItem = yield select(({app}) => app.contentItem);
    const newList = contentItem.map(item => {
      if( item.billid === payload.billid ){
        item.status   = 1;
        item.filename = payload.filename;
      }

      return item;
    });

    yield put({
      type: 'querySuccess',
      payload: {
        contentItem: newList
      }
    });
  },
  *updateFfersInfo({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(updateFfersInfo, payload);
    yield put({ type: 'querySuccess' });
    if(data) {
      if (data.result === 1000) {
        message.success('影盘' + ( payload.status === 1 ? '回执' : '验收' ) + '成功', 3);
        const contentItem = yield select(({app}) => app.contentItem);
        const newList = contentItem.map(item => {
          if (item.ffersid === payload.ffersid) {
            if( payload.status === 1 ){
              item.logistics = payload.logistics;
              item.waybill   = payload.waybill;
            }
            item.status = payload.status;
          }

          return item;
        });

        yield put({
          type: 'hideModal',
          payload: {
            contentItem: newList
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
  *updateFfersMsg({ payload }, { select, call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(updateFfersMsg, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        message.success('重新发送通知成功', 3);
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  }
}
