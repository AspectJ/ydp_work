import {
  queryCinemaSide,
  queryCinemaFullList,
  queryCinemaSimpleList,
  queryRegistCinemaList,
  queryAllArchive,
  queryAllUserList,
  queryUsersList,
  queryTheaterList,
  queryProgramList,
  queryPicAddress,
  queryDocAddress,
  queryUnAuditedUser,
  queryNoticeArchive,
  queryNoticeList,
  queryAllNotice,
  queryActivityList,
  queryActivityDetail,
  queryActivityInfo,
  queryRoleList,
  queryRoleAuth,
  queryRoleCinema,
  queryRoleDropdown,
  queryAllotList,
  queryAllotInfo,
  queryAllotAllTheater,
  queryReleasesList,
  querySourcesList,
  queryAdminsList,
  queryBillconfList,
  queryBillInfo,
  queryFfersconfList,
  queryFfersInfo,
  queryLatestAllot,
  queryLatestBill,
  queryLatestInfo,
  queryLatestFfers,
  queryLastestActivityList,
} from '../../services/requests';
import { message } from 'antd'
import { routerRedux } from 'dva/router'

export default {
  *queryAllCinemaList({ payload }, { call, put }){
    yield put({
      type: 'showLoading',
      payload: {
        list: [],
        contentItem:null,
        total: 1
      }
    });
    //默认展示info
    yield put({
      type: 'showContent'
    })
    const { data } = yield call(queryCinemaFullList, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if( data.result === 1000 ){
        if(data.data){
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data.length ? data.data : [],
              total: parseInt(data.total),
              contentItem:data.data.length !== 0 ? [data.data[0]] : [],
              current: payload.page ? payload.page : 1,
            }
          });
        } else {
          yield put({
            type: 'querySuccess',
            payload:{
              list:[],
              contentItem:[],
              total:null
            }
          });
          message.warning('没有查找到匹配的结果', 3);
        }
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *queryCinemaSide({ payload }, { put, call }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(queryCinemaSide);
    yield put({ type: 'querySuccess' });
    if(data){
      if( data.result === 1000){
        yield put({
          type: 'changeDropdown',
          payload: {
            item: 'cinema',
            list: data.data ? data.data : []
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
  // 用户注册下拉框加载
  *queryRegistCinemaList({ payload }, { call, put }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(queryRegistCinemaList, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if( data.result === 1000){
        yield put({
          type: 'changeDropdown',
          payload: {
            item: 'cinema',
            list: data.data ? data.data : []
          }
        });
      } else {
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *queryRoleDropdown({ payload }, { call, put }){
    const { data } = yield call(queryRoleDropdown, payload);
    if( data ){
      if( data.result === 1000 ){
        yield put({
          type: 'changeDropdown',
          payload: {
            item: 'role',
            list: data.data
          }
        });

        yield put({ type: 'querySuccess' });
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }

    yield put({ type: 'querySuccess' });
  },
  // 角色
  *queryRoleList({ payload }, { call, put }){
    yield put({
      type: 'showLoading',
      payload: {
        list: []
      }
    });
    const {data} = yield call(queryRoleList, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        yield put({
          type:'querySuccess',
          payload:{
            list: data.data,
            total: data.total,
            contentCurrent: payload.page
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
  *queryRoleAuth({ payload }, { call, put }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(queryRoleAuth, payload);
    yield put({ type: 'querySuccess' });
    if( data ){
      if(data.result === 1000){
        let AllCheckbox = [],
            currentAuth = JSON.parse(sessionStorage.getItem('user')).role.menuList;

        data.data.map((authList, index) => {
          let options = [];
          authList.subMenuList.map(menu => {
            let checkable = true;
            currentAuth.map(current => {
              if( current.menuid === menu.menuid ){
                checkable = false;
              }
            });

            options.push({
              label: menu.menuname,
              value: menu.menuid,
              disabled: checkable
            });
          });

          AllCheckbox.push({
            title:  authList.menuname,
            values: options
          });
        });

        yield put({
          type: 'showModal',
          payload: {
            modalType: 'visit',
            modalItem: {
              AllCheckbox,
              ItemAuth: payload
            }
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
  *queryRoleTheater({ payload }, { call, put }){
    const { data } = yield call(queryTheaterList);
    if( data ){
      if(data.result === 1000){
        yield put({
          type: 'changeDropdown',
          payload: {
            item: 'theater',
            list: data.data
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
  *queryRoleCinema({ payload }, { call, put }){
    const { data } = yield call(queryCinemaSimpleList);
    if( data ){
      if(data.result === 1000){
        yield put({
          type: 'changeDropdown',
          payload: {
            item: 'cinema',
            list: data.data
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
  *queryAllUserList({ payload }, { call, put }){
    yield put({
      type: 'showLoading',
      payload: {
        list: [],
        contentItem: [],
        total: null
      }
    });
    yield put({
      type:'showContent',
    })
    const {data} = yield call(queryAllUserList, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        if(data.data){
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
              contentItem: data.data.length !== 0 ? data.data : [],
              total: data.total,
              current: payload.page,
            }
          });
        } else {
          message.warning('没有查找到匹配的结果', 3);
        }
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *queryUnAuditedUser({ payload }, { call, put }){
    yield put({ type: 'showLoading' });
    const { data } = yield call(queryUnAuditedUser, payload);
    yield put({ type: 'querySuccess' });
    if( data ){
      if( data.result === 1000 ){
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: data.total,
            current: payload.page,
            contentItem: data.data.length ? [data.data[0]] : []
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
  *queryAllArchive({ payload }, { call, put }){
    yield put({
      type:'hideContent',
      payload:{
        contentType:payload.contentType,
        contentItem:payload.contentItem,
        bannerTitle:payload.bannerTitle
      }
    })
    yield put({
      type:'showLoading'
    })
    const {data} = yield call(queryAllArchive, payload);
    if(data){
      if(data.result === 1000){
        yield put({type:'querySuccess'})
        yield put({
          type: 'changeDropdown',
          payload: {
            item: 'citytype',
            list: data.data[0]
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
  *queryTheaterList({ payload }, { call, put }){
    yield put({
      type: 'changeDropdown',
      payload: {
        item: 'role',
        list: []
      }
    });
    if(payload.roletype === '1'){
      //院线
      const {data} = yield call(queryTheaterList, payload);
      if(data){
        if(data.result === 1000){
          yield put({
            type:'changeDropdown',
            payload: {
              item: 'belong',
              list: data.data
            }
          })
        } else {
          if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
          message.error(data.msg, 3);
        }
      } else {
        message.error('系统异常，请稍后再试', 3);
      }
    } else if(payload.roletype === '2'){
      //影院
      const {data} = yield call(queryCinemaSimpleList, payload);
      if(data){
        if(data.result === 1000){
          yield put({
            type:'changeDropdown',
            payload: {
              item: 'cinema',
              list: data.data
            }
          })
        } else {
          if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
          message.error(data.msg, 3);
        }
      } else {
        message.error('系统异常，请稍后再试', 3);
      }
    }
  },
  //栏目管理
  *queryColumnList({ payload }, { call, put }){
    yield put({
      type:'showContent',
    })
    //loading层
    yield put({
      type: 'showLoading',
      payload: {
        list: [],
        contentItem:[],
        total: null
      }
    });
    const {data} = yield call(queryProgramList, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        const newData = data.data.map((item) => {
          const citytype = item.arlist.filter((i) => { return i.archiveid === 102});
          const jointype = item.arlist.filter((i) => { return i.archiveid === 101});
          return {
            program_id:item.program_id,
            program_name:item.program_name,
            status:item.status,
            citytype:Array.isArray(citytype) ? citytype[0] : [] ,
        //     jointype:Array.isArray(jointype) ? jointype[0] : [] ,
          }
        })

        yield put({
          type:'querySuccess',
          payload:{
            list: newData,
            modalItem: null,
            total: data.total,
            current: payload.page || 1
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
  //修改栏目
  *showColumnModal({ payload }, { call, put }){
    yield put({
      type:'showModal',
      payload:payload
    });
    yield put({ type: 'showLoading' });
    const {data} = yield call(queryAllArchive, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        yield put({
          type:'changeDropdown',
          payload:{
            item: 'citytype',
            list :data.data[0]
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
  //文章管理
  *queryNoticeDropdown({ payload }, { call, put }){
    yield put({
      type:'showContent',
      payload: {
        contentItem: null
      }
    });
    //loading层
    yield put({
      type: 'showLoading',
      payload: {
        list: [],
        total: 1
      }
    });
    //栏目数据
    const {data} = yield call(queryProgramList, payload);
    //文章数据
    const NoticeData = yield call(queryAllNotice, payload);

    yield put({ type: 'querySuccess' });
    if(data && NoticeData){
      if(data.result === 1000){
        if(data.data){
          //如果有文章
          if(NoticeData.data.data){
              const NoticeArr = NoticeData.data.data.map((item) => {
                const citytype = item.ariclist.filter((item) => { return  parseInt(item.archiveid) === 102 })
                // const jointype = item.ariclist.filter((item) => { return  parseInt(item.archiveid) === 101 })
                return {
                  NoticeTitle:item.title,
                  NoticeAuthor: item.author,
                  id:item.info_id,
                  content:item.content,
                  doc_url:item.doc_url,
                  program_id:item.program_id,
                  use_status:item.use_status,
                  citytype: citytype.length !== 0 ? citytype[0] : [],
                  // jointype: jointype.length !== 0 ? jointype[0] : [],
                  doc_name:item.doc_name,
                  image_name:item.image_name,
                  start_time: item.start_time !== null ? new Date(parseInt(item.start_time.time)).toLocaleString().replace(/:\d{1,2}$/,' ') : '',
                  end_time: item.end_time !== null ? new Date(parseInt(item.end_time.time)).toLocaleString().replace(/:\d{1,2}$/,' ') : '',
                }
            })

            yield put({
              type:'querySuccess',
              payload:{
                list:NoticeArr,
                total:NoticeData.data.total,
                current: payload.page ? payload.page : 1,
                contentItem: NoticeData ? { ...NoticeArr[0], doc_url:NoticeData.data.data[0].doc_url } : null,
              }
            })

            yield put({
              type: 'changeDropdown',
              payload: {
                item: 'columns',
                list: data.data
              }
            })

          } else {
            //如果没有文章
            yield put({
              type:'querySuccess',
              payload:{
                list:[],
                total:1,
                current: payload.page ? payload.page : 1,
                contentItem: null ,
              }
            })

            yield put({
              type: 'changeDropdown',
              payload: {
                item: 'columns',
                list: data.data
              }
            })
          }

        } else {
          message.error('暂无内容', 3);
          yield put({
            type:'querySuccess'
          })
        }
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  //文章翻页
  *queryPageInfo({ payload }, { call, put }){
    //loading层
    yield put({
      type: 'showLoading',
      payload: {
        list: [],
        total: 1
      }
    });
    //文章数据
    const NoticeData = yield call(queryAllNotice, payload);

    yield put({ type: 'querySuccess' });
    if(NoticeData){
      if(NoticeData.data.result === 1000){
        if(NoticeData.data){
            const NoticeArr = NoticeData.data.data.map((item) => {
              const citytype = item.ariclist.filter((item) => { return  parseInt(item.archiveid) === 1 })
              const jointype = item.ariclist.filter((item) => { return  parseInt(item.archiveid) === 101 })
              return {
                NoticeTitle:item.title,
                NoticeAuthor: item.author,
                id:item.info_id,
                content:item.content,
                program_id:item.program_id,
                use_status:item.use_status,
                citytype: citytype.length !== 0 ? citytype[0] : [],
                // jointype: jointype.length !== 0 ? jointype[0] : [],
                doc_name:item.doc_name,
                image_name:item.image_name,
                start_time: item.start_time !== null ? new Date(parseInt(item.start_time.time)).toLocaleString().replace(/:\d{1,2}$/,' ') : '',
                end_time: item.end_time !== null ? new Date(parseInt(item.end_time.time)).toLocaleString().replace(/:\d{1,2}$/,' ') : '',
              }
          })

          yield put({
            type:'showContent',
            payload:{
              list:NoticeArr,
              total:NoticeData.data.total,
              current: payload.page ? payload.page : 1,
              // contentItem: NoticeData ? NoticeData.data.data[0].content : null ,
              contentItem: NoticeData ? { ...NoticeArr[0], doc_url:NoticeData.data.data[0].doc_url } : null,
            }
          })

          // yield put({
          //   type: 'changeDropdown',
          //   payload: {
          //     item: 'columns',
          //     list: NoticeData.data
          //   }
          // })
        } else {
          message.error('暂无内容', 3);
        }
      } else {
        if( NoticeData.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(NoticeData.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *queryNoticeColumns({ payload }, { call, put }){
    //loading层
    yield put({
      type: 'showLoading'
    });
    const {data} = yield call(queryProgramList, payload);
    yield put({ type:'querySuccess' });
     if(data){
      if(data.result === 1000){
        yield put({
          type:'changeDropdown',
          payload:{
            item: 'columns',
            list: data.data
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
  *queryNoticeArchive({ payload }, { call, put }){
    //loading层
    yield put({
      type: 'showLoading'
    });
    const {data} = yield call(queryNoticeArchive, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        if(data.data){
          yield put({
            type:'changeDropdown',
            payload:{
              item: 'citytype',
              list: data.data[0]
            }
          });
          // yield put({
          //   type: 'changeDropdown',
          //   payload: {
          //     item: 'jointype',
          //     list: data.data[1]
          //   }
          // })
        } else {
          yield put({
            type:'changeDropdown',
            payload:{
              item:'citytype',
              list:[],
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
  },
  *queryNoticeList({ payload }, { call, put }){
    //loading层
    yield put({
      type: 'showLoading',
      payload: {
        list: [],
        total: null
      }
    })
    const { data } = yield call(queryNoticeList, payload);

    if(data){
      if(data.result = 1000){
        if(data.data){
          const NoticeArr = data.data.map((item) => {
            const citytype = item.ariclist.filter((item) => { return  parseInt(item.archiveid) == 102 })
            const jointype = item.ariclist.filter((item) => { return  parseInt(item.archiveid) == 101 })
            return {
              NoticeTitle:item.title,
              NoticeAuthor: item.author,
              use_status:item.use_status,
              id:item.info_id,
              content:item.content,
              program_id:item.program_id,
              citytype: citytype.length !== 0 ? citytype[0] : [],
              jointype: jointype.length !== 0 ? jointype[0] : [],
              start_time: item.start_time !== null ? new Date(parseInt(item.start_time.time)).toLocaleString().replace(/:\d{1,2}$/,' ') : '',
              end_time: item.end_time !== null ? new Date(parseInt(item.start_time.time)).toLocaleString().replace(/:\d{1,2}$/,' ') : '',
            }
          })

          yield put({
            type:'querySuccess',
            payload:{
              list:NoticeArr,
              total:data.total,
              current: payload.page ? payload.page : 1,
            }
          })

          yield put({
            type:'showContent',
            payload: {
              contentItem: NoticeArr ? NoticeArr[0] : null ,
            }
          })
        } else {
          message.warning('暂无内容', 3);
          yield put({
            type:'querySuccess',
            payload: {
              contentItem: null,
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
  },
  *queryNoticeInfo({ payload }, { call, put, select }){
    //loading层
    yield put({
      type: 'showLoading'
    });

    const program_id = payload.program_id.toString();
    const picName = encodeURIComponent(payload.image_name);
    const docName = encodeURIComponent(payload.doc_name);

    const {data} = yield call(queryNoticeArchive, {program_id});
    //图片url
    const picAddres = yield call(queryPicAddress, picName);
    //文档url
    const docAddres = yield call(queryDocAddress, docName);


    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        yield put({
          type: 'showContent',
        });
        yield put({
          type: 'changeDropdown',
          payload: {
            item: 'citytype',
            list: data.data ? data.data[0] : [],
          }
        });
        yield put({
          type: 'changeDropdown',
          payload: {
            item: 'jointype',
            list: data.data ? data.data[1] : [],
          }
        });

        //显示编辑界面
        yield put({
          type:'hideContent',
          payload:{
              contentType:payload.contentType,
              contentItem:{
                ...payload.contentItem,
                pic_url:picAddres.data.downURL || null,
                doc_url:docAddres.data.downURL || null,
              }
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
  *querySearchAll({ payload }, { call, put }){
    //loading层
    yield put({
      type: 'showLoading',
      payload: {
        list: [],
        total: 1
      }
    });
    const {data} = yield call(queryAllNotice, payload)

    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        const NoticeArr = data.data.map((item) => {
          const citytype = item.ariclist.filter((item) => { return  parseInt(item.archiveid) === 1 })
          const jointype = item.ariclist.filter((item) => { return  parseInt(item.archiveid) === 101 })
          return {
            NoticeTitle:item.title,
            NoticeAuthor: item.author,
            id:item.info_id,
            content:item.content,
            program_id:item.program_id,
            use_status:item.use_status,
            citytype: citytype.length !== 0 ? citytype[0] : [],
            jointype: jointype.length !== 0 ? jointype[0] : [],
            start_time: item.start_time !== null ? new Date(parseInt(item.start_time.time)).toLocaleString().replace(/:\d{1,2}$/,' ') : '',
            end_time: item.end_time !== null ? new Date(parseInt(item.end_time.time)).toLocaleString().replace(/:\d{1,2}$/,' ') : '',
          }
        })
        yield put({
          type:'querySuccess',
          payload:{
            list:NoticeArr,
            total:data.total,
            current: payload.page ? payload.page : 1 ,
          }
        })

        yield put({
          type: 'changeDropdown',
          payload: {
            item: 'columns',
            list: data.data
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
  // 活动通知
  *queryActivityList({ payload }, { call, put }){
    yield put({
      type: 'showLoading',
      payload: {
        list: [],
        contentItem: [],
        contentCurrent: 1,
        contentType: 'total'
      }
    });
    const {data} = yield call(queryActivityList, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if( data.result === 1000 ){
        function getLocalTime(second) {
          return new Date(parseInt(second)).toLocaleString().replace(/:\d{1,2}$/,' ');
        }

        const list = data.data.map(item => {
          item.createtime = getLocalTime(item.createtime.time);

          return item;
        });

        yield put({
          type: 'querySuccess',
          payload: {
            list,
            current:      payload.page,
            total:        data.total,
            contentType:  'total',
            contentTitle: data.firstBatch.title,
            contentItem:  data.firstBatch,
            contentTotal: data.firstBatch.batchDetailCount,
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
  *queryActivityDetail({ payload }, { call, put }){
    yield put({
      type: 'showLoading',
      payload: {
        contentTitle: null
      }
    });
    const {data} = yield call(queryActivityDetail, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if( data.result === 1000 ){
        yield put({
          type: 'querySuccess',
          payload: {
            contentType: 'total',
            contentTitle: data.data.title,
            contentTotal: data.data.batchDetailCount,
            contentCurrent: payload.page || 1,
            contentItem: data.data
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
  *queryActivityInfo({ payload }, { call, put }){
    yield put({ type: 'showLoading' });
    const {data} = yield call(queryActivityInfo, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if( data.result === 1000 ){
        yield put({
          type: 'querySuccess',
          payload: {
            contentType: 'total',
            contentCurrent: payload.page ? payload.page : 1,
            contentTotal: data.total,
            contentItem: data.data
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
  //物料分发
  *queryAllotList({ payload }, { call, put }){
    //loading层
    yield put({
      type: 'showLoading',
      payload: {
        list: [],
        contentItem: null,
        contentType: 'total',
        total: null
      }
    })

    const { data } = yield call(queryAllotList, payload)
    yield put({ type: 'querySuccess' });
    if(data){
      if( data.result === 1000 ){
        if(data.data){
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
              contentItem: data.first.list,
              contentTotal:parseInt(data.first.total),
              current: payload.page ? payload.page : 1,
              total: parseInt(data.total),
              suppliesconfid: data.first ? data.first.suppliesconfid : null,
              suppliesconfname: data.data[0] ? data.data[0].suppliesconfname : null
            }
          });
          //默认展示info
          yield put({
            type: 'showContent'
          })
        } else {
          yield put({
            type: 'querySuccess',
            payload:{
              list:[],
              contentItem:[],
              total:null
            }
          });
          message.warning('没有查找到匹配的结果', 3);
        }
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *queryAllotInfo({ payload }, { call, put }){
    //loading层
    yield put({
      type: 'showLoading',
      payload: {
        contentItem: null,
      }
    })

    const { data } = yield call(queryAllotInfo, payload)
    yield put({ type: 'querySuccess' });
    if(data){
      if( data.result === 1000 ){
        yield put({
          type: 'querySuccess',
          payload: {
            contentItem: data.data,
            contentTotal: parseInt(data.total),
            contentCurrent: payload.page,
            suppliesconfname:payload.suppliesconfname,
            suppliesconfid:payload.suppliesconfid
          }
        });
        yield put({
          type:'showContent',
          payload:{
            contentType:'total'
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
  *queryAllotFormInfo({ payload }, { call, put }){
    const { data } = yield call(queryAllotAllTheater, payload)
    yield put({ type: 'querySuccess' });
    if(data){
      if(data.result === 1000){
        yield put({
          type:'showContent',
          payload:{
            dropdownItem: data.data,
            contentType:'create'
          }
        });
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg,3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  //账单管理
  *queryBillconfList({ payload }, { call, put }){
    yield put({
      type:'showContent',
    })
    //loading层
    yield put({
      type: 'showLoading',
      payload: {
        list: [],
        contentItem: null,
        contentType: 'total',
        total: null
      }
    })

    const { data } = yield call(queryBillconfList, payload)
    yield put({ type: 'querySuccess' });
    if(data){
      if( data.result === 1000 ){
        if(data.data){
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
              contentItem: data.first.list,
              contentTotal: parseInt(data.first.total),
              total: parseInt(data.total),
              current: payload.page,
              billconfid: data.first ? data.first.billconfid : null,
              billconfname: data.data[0] ? data.data[0].billconfname : null
            }
          });
          //默认展示info
          yield put({
            type: 'showContent'
          })
        } else {
          message.warning('没有查找到匹配的结果', 3);
        }
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *queryBillInfo({ payload }, { call, put }){
    yield put({
      type: 'showLoading',
      payload: {
        contentItem: null,
      }
    });

    const { data } = yield call(queryBillInfo, payload);
    yield put({ type: 'querySuccess' });
    if(data){
      if( data.result === 1000 ){
        yield put({
          type: 'querySuccess',
          payload: {
            contentItem: data.data,
            contentTotal: parseInt(data.total),
            contentCurrent: payload.page,
            billconfname:payload.billconfname,
            billconfid:payload.billconfid
          }
        });
        yield put({
          type:'showContent',
          payload:{
            contentType:'total'
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
  *queryFfersconfList({ payload }, { call, put }){
    yield put({
      type:'showContent',
    });

    yield put({
      type: 'showLoading',
      payload: {
        list: [],
        contentItem: null,
        contentType: 'total',
        total: null
      }
    });

    yield put({
      type: 'showContent'
    });

    const { data } = yield call(queryFfersconfList, payload)

    yield put({ type: 'querySuccess' });
    if(data){
      if( data.result === 1000 ){
        if(data.data){
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
              contentItem: data.first.list,
              contentTotal:parseInt(data.first.total),
              current:payload.page,
              total: parseInt(data.total),
              ffersconfid: data.first ? data.first.ffersconfid : null,
              ffersconfname: data.data[0] ? data.data[0].ffersconfname : null
            }
          });
        } else {
          yield put({
            type: 'querySuccess',
            payload:{
              list:[],
              contentItem:[],
              total:null
            }
          });
          message.warning('没有查找到匹配的结果', 3);
        }
      } else {
        if( data.result === 1109 ) { yield put({ type: 'AdminLogout' }); }
        message.error(data.msg, 3);
      }
    } else {
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *queryFfersInfo({ payload }, { call, put }){
    yield put({
      type: 'showLoading',
      payload: {
        contentItem: null,
      }
    });

    const { data } = yield call(queryFfersInfo, payload);

    yield put({ type: 'querySuccess' });
    if(data){
      if( data.result === 1000 ){
        yield put({
          type: 'querySuccess',
          payload: {
            contentItem: data.data,
            contentTotal: parseInt(data.total),
            contentCurrent: payload.page,
            ffersconfname:payload.ffersconfname,
            ffersconfid:payload.ffersconfid
          }
        });
        yield put({
          type:'showContent',
          payload:{
            contentType:'total'
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
  //通知查询
  *queryLatestAllot({ payload }, { call, put, select }){
    yield put({
      type: 'showLoading',
      payload: {
        list: []
      }
    });
    const latesetAllotData = yield call(queryLatestAllot, payload);
    //原始数据
    const contentItem = yield select(({ app }) => app.contentItem);

    if(latesetAllotData){
      if(latesetAllotData.data.result === 1000){
        if(latesetAllotData.data.data){
          yield put({
            type: 'querySuccess',
            payload:{
              contentItem:{
                infoData:contentItem.infoData ? contentItem.infoData : [] ,
                billData:contentItem.billData ? contentItem.billData : [] ,
                allotData:latesetAllotData.data.data ,
                ffersData: contentItem.ffersData ? contentItem.ffersData : [] ,
              },
            }
          });
        } else {
          //data为空
        }
      } else {
        //服务器故障
        message.error(latesetBillData.data.msg, 3);
      }
    } else {
      //系统故障
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *queryLatestBill({ payload }, { call, put, select }){
    yield put({
      type: 'showLoading',
      payload: {
        list: []
      }
    });
    const latesetBillData = yield call(queryLatestBill, payload);
    //原始数据
    const contentItem = yield select(({ app }) => app.contentItem);

    if(latesetBillData){
      if(latesetBillData.data.result === 1000){
        if(latesetBillData.data.data){
          yield put({
            type: 'querySuccess',
            payload:{
              contentItem:{
                infoData:contentItem.infoData ? contentItem.infoData : [],
                billData:latesetBillData.data.data,
                allotData:contentItem.allotData ? contentItem.allotData :[] ,
                ffersData: contentItem.ffersData ? contentItem.ffersData : [] ,
              },
            }
          });
        } else {
          //data为空
        }
      } else {
        //服务器故障
        message.error(latesetBillData.data.msg, 3);
      }
    } else {
      //系统故障
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *queryLatestInfo({ payload }, { call, put, select }){
    yield put({
      type: 'showLoading',
      payload: {
        contentItem: []
      }
    });
    const latestInfoData = yield call(queryLatestInfo, payload);
    //原始数据
    const contentItem = yield select(({ app }) => app.contentItem);

    if(latestInfoData){
      if(latestInfoData.data.result === 1000){
        if(latestInfoData.data.data){
          yield put({
            type: 'querySuccess',
            payload:{
              contentItem:{
                infoData:latestInfoData.data.data,
                billData:contentItem.billData ? contentItem.billData : [] ,
                allotData:contentItem.allotData ? contentItem.allotData :[] ,
                ffersData: contentItem.ffersData ? contentItem.ffersData : [] ,
              },
            }
          });
        } else {
          //data为空
        }
      } else {
        //服务器故障
        message.error(latestInfoData.data.msg, 3);
      }
    } else {
      //系统故障
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *queryLatestFfers({ payload }, { call, put, select }){
    yield put({
      type: 'showLoading',
      payload: {
        contentItem: []
      }
    });
    const latestFfersData = yield call(queryLatestFfers, payload);
    //原始数据
    const contentItem = yield select(({ app }) => app.contentItem);

    if(latestFfersData){
      if(latestFfersData.data.result === 1000){
        if(latestFfersData.data.data){
          yield put({
            type: 'querySuccess',
            payload:{
              contentItem:{
                infoData: contentItem.infoData ? contentItem.infoData : [] ,
                billData: contentItem.billData ? contentItem.billData : [] ,
                allotData: contentItem.allotData ? contentItem.allotData :[] ,
                ffersData: latestFfersData.data.data,
              },
            }
          });
        } else {
          //data为空
        }
      } else {
        //服务器故障
        message.error(latestFfersData.data.msg, 3);
      }
    } else {
      //系统故障
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *queryLastestActivityInfo({ payload }, { call, put, select }){
    yield put({
      type: 'showLoading',
      payload: {
        contentItem: []
      }
    });
    const latestAcitivityInfoData = yield call(queryActivityInfo, payload);
    //原始数据
    const contentItem = yield select(({ app }) => app.contentItem);

    if(latestAcitivityInfoData){
      if(latestAcitivityInfoData.data.result === 1000){
        if(latestAcitivityInfoData.data.data){
          yield put({
            type: 'querySuccess',
            payload:{
              contentItem:{
                infoData: contentItem.infoData ? contentItem.infoData : [] ,
                billData: contentItem.billData ? contentItem.billData : [] ,
                allotData: contentItem.allotData ? contentItem.allotData : [],
                ffersData : contentItem.ffersData ? contentItem.ffersData : [],
                acitivityListData: latestAcitivityInfoData.data.data,
              },
            }
          });
        } else {
          //data为空
        }
      } else {
        //服务器故障
        message.error(latestAcitivityInfoData.data.msg, 3);
      }
    } else {
      //系统故障
      message.error('系统异常，请稍后再试', 3);
    }
  },
  *queryLastestActivityList({ payload }, { call, put, select }){
    yield put({
      type: 'showLoading',
      payload: {
        contentItem: []
      }
    });
    const latestAcitivityListData = yield call(queryLastestActivityList, payload);
    //原始数据
    const contentItem = yield select(({ app }) => app.contentItem);

    if(latestAcitivityListData){
      if(latestAcitivityListData.data.result === 1000){
        if(latestAcitivityListData.data.data){
          yield put({
            type: 'querySuccess',
            payload:{
              contentItem:{
                infoData: contentItem.infoData ? contentItem.infoData : [] ,
                billData: contentItem.billData ? contentItem.billData : [] ,
                allotData: contentItem.allotData ? contentItem.allotData : [],
                ffersData: contentItem.ffersData ? contentItem.ffersData : [],
                acitivityListData : latestAcitivityListData.data.data,
              },
            }
          });
        } else {
          //data为空
        }
      } else {
        //服务器故障
        message.error(latestAcitivityListData.data.msg, 3);
      }
    } else {
      //系统故障
      message.error('系统异常，请稍后再试', 3);
    }
  }
}
