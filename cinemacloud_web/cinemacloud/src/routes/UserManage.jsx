import React from 'react';
import { connect } from 'dva';
import DataList from '../components/DataList'
import UserInfo from '../components/User/UserInfo'
import UserAlter from '../components/User/UserAlter'
import UserModal from '../components/User/UserModal'
import auth from '../utils/auth'

function UserManage({ app,dispatch }) {
  const {
    list,
    total,
    loading,
    current,
    modalItem,
    modalVisible,
    modalType,
    contentType,
    currentItem,
    contentItem,
    areaInfo,
    contentVisible,
    bannerTitle,
    dropdownItem,
    bindStatus,
  } = app;

  function queryAuth(params){
    // [12, 13, 14] = [增, 改, 删]
    const filtered = auth(params);
    let result = {
      add: false,
      delete: false,
      edit: false
    };

    if( filtered.length ){
      filtered.indexOf(params[0]) !== -1 ? result.add    = true : '';
      filtered.indexOf(params[1]) !== -1 ? result.edit   = true : '';
      filtered.indexOf(params[2]) !== -1 ? result.delete = true : '';
    }

    return result;
  }

  // const DataListProps = {
  //   list,
  //   total,
  //   loading,
  //   current,
  //   rowKey:'userid',
  // 	//添加按钮
  // 	BtnText:'添加用户',
  // 	//过滤按钮
  // 	BtnFilter: true,
  //   //Table的dataIndex：
  //   titleDataIndex:'username',
  //   subDataIndex:'rolename',
  //   auth: queryAuth([12, 13, 14]),
  //   //分页
  //   onPageChange(type, page, keyword){
  //     switch (type) {
  //       case 'bind':
  //         dispatch({
  //           type:'app/queryAllUserList',
  //           payload:{
  //             criteria: keyword || '',
  //             status: 1,
  //             page
  //           }
  //         })
  //         break;
  //       case 'unbind':
  //         dispatch({
  //           type:'app/queryAllUserList',
  //           payload:{
  //             criteria: keyword || '',
  //             status: 4,
  //             page
  //           }
  //         })
  //         break;
  //       case 'unaudit':
  //         dispatch({
  //           type:'app/queryUnAuditedUser',
  //           payload:{
  //             criteria: keyword || '',
  //             page,
  //             pagesize: 10
  //           }
  //         });
  //         break;
  //       default:
  //
  //     }
  //   },
  //   //搜索方法
  //   onSearch(params){
  //     dispatch({
  //       type:'app/queryAllUserList',
  //       payload:{
  //         criteria:params.value,
  //         status:params.status
  //       }
  //     })
  //   },
  //   //删除
  //   onDataDelete(params){
  //     dispatch({
  //       type:'app/deleteUser',
  //       payload:{
  //         userid: params.record.userid,
  //         status:params.status,
  //       }
  //     })
  //   },
  //   //绑定
  //   switchBind(params){
  //     dispatch({
  //       type:'app/queryAllUserList',
  //       payload:{
  //         ...params,
  //         status: 1,
  //         page: 1
  //       }
  //     })
  //   },
  //   //未绑定
  //   switchUnbind(params){
  //     dispatch({
  //       type:'app/queryAllUserList',
  //       payload:{
  //         ...params,
  //         status: 4,
  //         page: 1
  //       }
  //     })
  //   },
  //   // 未审核
  //   switchUnAudit(params){
  //     dispatch({
  //       type: 'app/queryUnAuditedUser',
  //       payload: {
  //         ...params,
  //         page: 1
  //       }
  //     })
  //   },
  // 	//切换至信息页面
  // 	onSwitchInfo(values){
  //     const contentItem = list.filter((username) => {return username === values});
  // 	  dispatch({
  // 	    type: 'app/showContent',
  //       payload:{
  //         contentItem,
  //       }
  // 	  })
  // 	},
  // 	//切换至新增页面
  // 	onAdd(){
  // 	  dispatch({
  // 	    type: 'app/hideContent',
  // 	    payload:{
  // 	      bannerTitle:'新增用户',
  //         contentType: 'create'
  // 	    }
  // 	  });
  // 	},
  // 	//切换至修改页面
  // 	onSwitchEdit(values){
  //     // const contentItem = list.filter((username) => {return username === values.record});
  // 	  dispatch({
  // 	    type: 'app/hideContent',
  // 	    payload:{
  //         bindStatus: values.status,
  // 	      bannerTitle:'修改用户',
  //         contentType:'update',
  //         contentItem:new Array(values),
  // 	    }
  // 	  });
  // 	}
  // };

  function updateUserVerify(params){
    dispatch({
      type: 'app/updateUserVerify',
      payload: params
    });
  }

  const UserInfoProps = {
    dropdownItem,
    contentItem,
    loading,
    total,
    current,
    rowkey:'userid',
    onToggle(params){
      dispatch({
        type: 'app/updateUserStatus',
        payload: params
      })
    },
    onVerify(params){
      if( params.audit_flag === 0 ){
        dispatch({
          type: 'app/showModal',
          payload: {
            modalItem: params
          }
        });
      } else {
        updateUserVerify(params);
      };
    },
    handPageChange(params){
      dispatch({
        type:"app/queryAllUserList",
        payload:{
          page:params.current,
          pagesize: 10
        }
      })
    },
    //搜索
    onSearch(params){
      dispatch({
        type: 'app/queryAllUserList',
        payload:{
          ...params,
          page:1,
          pagesize: 10,
        }
      })
    },
    //查找院线
    queryRoleCinema(){
      dispatch({
        type: 'app/queryRoleCinema',
      })
    }
  };
  const UserAlterProps = {
    loading,
    bindStatus,
    dropdownItem,
    //返回按钮
    goBackBtn:true,
    //标题
  	bannerTitle:bannerTitle,
    contentItem:contentType === 'update' ? contentItem : '',
    contentType,
    //返回详情页面
    goBack(){
      dispatch({
        type:'app/showContent'
      })
    },
    //查找院线/影院
    findTheater(params){
      dispatch({
        type:'app/queryTheaterList',
        payload: {
          roletype: params
        }
      })
    },
    //查找角色
    findRole(params){
      dispatch({
        type: 'app/queryRoleDropdown',
        payload: params
      })
    },
    //保存提交
    handleSubmit(params){
      dispatch({
        type:'app/createUser',
        payload:params
      })
    },
    //保存修改
    handleUpdate(params){
      dispatch({
        type:'app/updateUser',
        payload:params
      })
    }
  };

  const UserModalProps = {
    modalItem,
    modalVisible,
    dropdownItem,
    queryRoleDropdown(params){
      dispatch({
        type: 'app/queryRoleDropdown',
        payload: params
      });
    },
    onOk(params){
      updateUserVerify(params);
    },
    onCancel(){
      dispatch({
        type: 'app/hideModal',
        modalItem: null
      })
    }
  };

  return (
    <div className="Relative">
      {/*<DataList {...DataListProps} />*/}
      {
        contentVisible ?
        <UserInfo {...UserInfoProps} /> :
        <UserAlter {...UserAlterProps}/>
      }
      <UserModal {...UserModalProps} />
    </div>
  );
}

function mapStateToProps({ app }) {
  return { app };
}

export default connect(mapStateToProps)(UserManage);
