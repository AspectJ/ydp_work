import React from 'react'
import { connect } from 'dva'
import { Modal, Icon } from 'antd'
import DataList from '../components/DataList'
import ActivityAlter from '../components/Activity/ActivityAlter'
import ActivityInfo from '../components/Activity/ActivityInfo'
import auth from '../utils/auth'

function Activity({ app, dispatch }) {
  const {
	  list,
	  total,
	  loading,
    current,
    // modal
	  modalVisible,
	  modalType,
	  modalItem,
    // content
    contentTitle,
	  contentVisible,
	  contentType,
	  contentItem,
    contentTotal,
    contentCurrent,
	  dropdownItem,
	} = app;

  function queryAuth(params){
    // [122, 123] = [增, 删]
    const filtered = auth(params);
    let result = {
      add: false,
      delete: false,
      edit: false
    };

    if( filtered.length ){
      filtered.indexOf(params[0]) !== -1 ? result.add    = true : '';
      filtered.indexOf(params[1]) !== -1 ? result.delete = true : '';
    }

    return result;
  }

  const dataListProps = {
    list,
		total,
		loading,
		current,
		dropdownItem,
		BtnText: '添加通知',
    // 删除按钮
    rowKey: "activityid",
    titleDataIndex: 'title',
    subDataIndex: 'createtime',
    auth: queryAuth([122, 123]),
    // 添加活动
		onAdd(params){
      dispatch({
        type: 'app/showContent',
        payload: {
          contentItem: null,
          contentType: 'create'
        }
      });

      dispatch({
        type:'app/queryCinemaSide'
      });

      dispatch({
        type: 'app/queryRoleDropdown',
        payload: {
          roletype: 2
        }
      });
    },
		// 活动详情
		onSwitchInfo(params){
      dispatch({
        type: 'app/queryActivityDetail',
        payload: {
          activityid: params.activityid
        }
      });
		},
    // 删除活动
    onDataDelete(params){
      dispatch({
        type: 'app/deleteActivity',
        payload: {
          activityid: params.activityid
        }
      });
    },
    // 全局搜索
		onSearch(params){
      dispatch({
        type: 'app/queryActivityList',
        payload: {
          page: 1,
          pagesize: 10,
          criteria: encodeURIComponent(params)
        }
      });
		},
    // 批次翻页
		onPageChange(type,params, values){
      dispatch({
        type: 'app/queryActivityList',
        payload: {
          page: params,
          pagesize: 10,
          criteria: values ? encodeURIComponent(values) : '',
          type:''
        }
      });
    }
  };

  const ActivityAlterProps = {
    loading,
    contentType,
    contentItem,
    contentTitle,
    dropdownItem,
    onOk(params){
      dispatch({
        type: 'app/createActivity',
        payload: params
      })
    }
  };

  const ActivityInfoProps = {
	  loading,
    dropdownItem,
    contentTitle,
    contentType,
	  contentItem,
    contentTotal,
    contentCurrent,
	  dropdownItem,
    onSearch(params, roletype){
      if( roletype === 2 ){
        dispatch({
          type: 'app/queryActivityInfo',
          payload: {
            ...params,
            pagesize: 10
          }
        });
      } else {
        dispatch({
          type: 'app/queryActivityDetail',
          payload: params,
          pagesize: 10,
          page: 1
        });
      }
    },
    sendMsg(params){
      dispatch({
        type: 'app/updateActivityMsg',
        payload: {
          id: params.id
        }
      });
    },
    fullScreen(params){
      dispatch({
        type: 'app/showModal',
        payload: {
          modalItem: params
        }
      });
    },
    onConfirm(record, status){
      const params = {};

      params.activityid = record.activityid;
      params.status = status;
      params.type = record.type;
      if( record.type === 1 ){
        params.doc_url = record.doc_url;
      }

      dispatch({
        type: 'app/updateActivityStatus',
        payload: params
      });
    },
    updateActivityLink(params){
      dispatch({
        type: 'app/updateActivityLink',
        payload: params
      })
    }
  };

  const isCinema = () => {
    return JSON.parse(sessionStorage.getItem('user')).roletype === 2;
  };

  const ModalProps = {
		title: '通知详情',
		visible: modalVisible,
		width: "100%",
		onOk(){
			dispatch({
        type: 'app/hideModal'
      });
		},
		onCancel(){
			dispatch({
        type: 'app/hideModal'
      });
		}
	};

  function getLocalTime(second) {
    return new Date(parseInt(second)).toLocaleString().replace(/:\d{1,2}$/,' ');
  }

  return (
    <div className="Relative">
      {
        !isCinema() ? <DataList {...dataListProps} /> : ''
      }
      {
        contentType === 'create' ?
          <ActivityAlter {...ActivityAlterProps} /> :
          <ActivityInfo {...ActivityInfoProps} />
      }
      {
        modalVisible ?
          <Modal {...ModalProps}>
            <div>
              <h3 className="article-title">{modalItem ? modalItem.title : ''}</h3>
              <ul className="article-subtitle">
                <li><Icon type="book" /> 文本类型：{modalItem ? modalItem.type === 0 ? '普通文本' : '回执文本' : ''}</li>
                <li><Icon type="clock-circle-o" /> 发布时间：{modalItem ? getLocalTime(modalItem.createtime.time) : ''}</li>
                {
                  modalItem.starttime || modalItem.endtime ?
                    <li>
                      <Icon type="calendar" /> 活动时间：&nbsp;
                      {getLocalTime(modalItem.starttime.time).split(' ')[0]} 到 {getLocalTime(modalItem.endtime.time).split(' ')[0]}
                    </li> : ''
                }
              </ul>
              <div className="article-content">
                <div dangerouslySetInnerHTML={{__html: modalItem ? modalItem.content : ''}} style={{fontSize:'16px'}}></div>
              </div>
            </div>
          </Modal> : ''
      }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    app: state.app
  };
}

export default connect(mapStateToProps)(Activity)
