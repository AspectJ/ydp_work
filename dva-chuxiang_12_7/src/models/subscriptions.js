import { message } from 'antd'

export default {
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        switch (location.pathname) {
          case '/cx/cinemalist':
            dispatch({
              type: 'queryCinemaList',
              payload: {
                pageSize: 10,
                offsetNum: 0
              }
            });
            break;
          case '/cx/usersmanage':
            dispatch({
              type: 'queryUsersList',
              payload: {
                pageSize: 10,
                offsetNum: 0
              }
            });
            break;
          case '/cx/newsmanage':
            dispatch({
              type: 'queryNewsList',
              payload: {
                pageSize: 10,
                offsetNum: 0,
                keyword: '',
                type: -1
              }
            });
            break;
          case '/cx/activesmanage':
            dispatch({
              type: 'queryActivesList',
              payload: {
                pageSize: 10,
                offsetNum: 0
              }
            });
            break;
          case '/cx/releasesmanage':
            dispatch({
              type: 'queryReleasesList',
              payload: {
                pageSize: 10,
                offsetNum: 0
              }
            });
            break;
          case '/cx/sourcesmanage':
            dispatch({
              type: 'querySourcesList',
              payload: {
                pageSize: 10,
                offsetNum: 0
              }
            });
            break;
          case '/cx/bannermanage':
            dispatch({
              type: 'queryBannerList',
              payload: {
                type: 'index'
              }
            });
            break;
          case '/cx/adminsmanage':
            dispatch({
              type: 'queryAdminsList',
              payload: {
                pageSize: 10,
                offsetNum: 0
              }
            });
            break;
          default:

        }

        if(location.pathname !== '/cx/login'){
          const adminid    = sessionStorage.getItem('adminid'),
                adminname  = sessionStorage.getItem('adminname'),
                nickname   = sessionStorage.getItem('nickname'),
                cinemaid   = sessionStorage.getItem('cinemaid'),
                cinemaname   = sessionStorage.getItem('cinemaname'),
                audit_flag = sessionStorage.getItem('audit_flag');

          if( !(adminid && adminname && nickname && cinemaid && cinemaname && audit_flag) ){
            dispatch({
              type: 'AdminLogout'
            });
            message.warning('请先登录', 3);
          }
        }
      });
    },
  }
}
