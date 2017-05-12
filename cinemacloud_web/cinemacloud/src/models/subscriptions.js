import {
  message
} from 'antd'
import auth from '../utils/auth'

// 记录当前路由
let current_pathname = '';

export default {
  subscriptions: {
    setup({
      dispatch,
      history
    }) {
      history.listen(location => {
        // Session => Auth => Dispatch
        if (current_pathname !== location.pathname) {
          current_pathname = location.pathname;

          const Unwanted_Session = ['/cinemacloud/Login', '/cinemacloud/Regist'];
          if (Unwanted_Session.findIndex(path => path === location.pathname) === -1) {
            const adminid = sessionStorage.getItem('user');
            if (!adminid) {
              dispatch({
                type: 'AdminLogout'
              });

              message.warning('请先登录', 3);
            } else {
              const Unwanted_Auth = ['/cinemacloud/modifypwd', '/cinemacloud/todos', '/cinemacloud/Introduce', '/cinemacloud/Helpme'];
              if (Unwanted_Auth.findIndex(path => location.pathname.indexOf(path) !== -1) === -1) {
                const menuid = [35, 25, 15, 95, 95, 65, 45, 85, 102, 124];
                const menuname = ['Cinema', 'Role', 'User', 'Column', 'Notice', 'Allot', 'Ffers', 'Bill', 'userlog', 'Activity'];
                const filtered = auth(menuid);
                const index = menuname.findIndex(name => {
                  return '/cinemacloud/' + name === location.pathname;
                });

                if (filtered.indexOf(menuid[index]) < 0) {
                  dispatch({
                    type: 'AdminLogout'
                  });

                  message.warning('您没有权限查看此页面!', 5);
                }
              }
            }
          }

          // global state init
          dispatch({
            type: 'querySuccess',
            payload: {
              //中间栏
              list: [],
              total: null,
              current: null,
              // 弹出层
              modalType: 'create', // create/visit/update
              modalItem: null,
              modalVisible: false,
              //右边
              contentType: "total",
              contentItem: [],
              contentTitle: null,
              contentTotal: null,
              contentCurrent: null
            }
          });


          switch (location.pathname) {
            case '/cinemacloud/Cinema':
              dispatch({
                type: 'queryAllCinemaList',
                payload: {
                  pagesize: 10,
                  page: 1,
                }
              });
              break;
            case '/cinemacloud/Role':
              dispatch({
                type: 'queryRoleList',
                payload: {
                  page: 1,
                  pagesize: 10,
                }
              });
              break;
            case '/cinemacloud/User':
              dispatch({
                type: 'queryAllUserList',
                payload: {
                  pagesize: 10,
                  page: 1,
                  // status: 1
                }
              });
              break;
            case '/cinemacloud/Column':
              dispatch({
                type: 'queryColumnList',
                payload: {
                  pagesize: 10,
                  page: 1,
                  userid: JSON.parse(sessionStorage.getItem('user')).userid
                }
              });
              break;
            case '/cinemacloud/Notice':
              dispatch({
                type: 'queryNoticeDropdown',
                payload: {
                  pagesize: 10,
                  page: 1,
                  userid: JSON.parse(sessionStorage.getItem('user')).userid
                }
              });
              break;
            case '/cinemacloud/Activity':
              if (JSON.parse(sessionStorage.getItem('user'))) {
                if (JSON.parse(sessionStorage.getItem('user')).roletype === 2) {
                  dispatch({
                    type: 'queryActivityInfo',
                    payload: {
                      pagesize: 10,
                      page: 1
                    }
                  });
                } else {
                  dispatch({
                    type: 'queryActivityList',
                    payload: {
                      pagesize: 10,
                      page: 1
                    }
                  });
                }
              }
              break;
            case '/cinemacloud/Allot':
              if (JSON.parse(sessionStorage.getItem('user'))) {
                if (JSON.parse(sessionStorage.getItem('user')).roletype === 2) {
                  dispatch({
                    type: 'queryAllotInfo',
                    payload: {
                      pagesize: 10,
                      page: 1,
                    }
                  })
                } else {
                  dispatch({
                    type: 'queryAllotList',
                    payload: {
                      pagesize: 10,
                      page: 1,
                    }
                  });
                }
              }
              break;
            case '/cinemacloud/Bill':
              if (JSON.parse(sessionStorage.getItem('user'))) {
                if (JSON.parse(sessionStorage.getItem('user')).roletype === 2) {
                  dispatch({
                    type: 'queryBillInfo',
                    payload: {
                      pagesize: 10,
                      page: 1,
                    }
                  })
                } else {
                  dispatch({
                    type: 'queryBillconfList',
                    payload: {
                      pagesize: 10,
                      page: 1,
                    }
                  });
                }
              }
              break;
            case '/cinemacloud/Ffers':
              if (JSON.parse(sessionStorage.getItem('user'))) {
                if (JSON.parse(sessionStorage.getItem('user')).roletype === 2) {
                  dispatch({
                    type: 'queryFfersInfo',
                    payload: {
                      pagesize: 10,
                      page: 1,
                    }
                  })
                } else {
                  dispatch({
                    type: 'queryFfersconfList',
                    payload: {
                      pagesize: 10,
                      page: 1,
                    }
                  });
                }
              }
              break;
            case '/cinemacloud/userlog':
              dispatch({
                type: 'UserLog',
                payload: {
                  pagesize: 10,
                  page: 1
                }
              });
              break;
            case '/cinemacloud/todos':
              dispatch({
                type: 'todos',
                payload: {
                  pagesize: 10,
                  page: 1,
                }
              });
              break;
            case '/cinemacloud/Introduce':
              dispatch({
                type: 'queryNoticeList',
                payload: {
                  program_id: "145"
                }
              });
              break;
            default:

          }
        }

      });
    },
  }
}
