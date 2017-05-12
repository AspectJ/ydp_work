import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Breadcrumb, Icon, Layout } from 'antd'
import CinemaInfo from '../components/Cinema/CinemaInfo'
import CinemaAlter from '../components/Cinema/CinemaAlter'
import DataList from '../components/DataList'
import styles from './CinemaManage.less'
import auth from '../utils/auth'

let CinemaManage = ({ app, dispatch }) => {
  const {
    list,
    total,
    loading,
    modalVisible,
    modalType,
    currentItem,
    areaInfo,
    contentVisible,
    contentType,
    bannerTitle,
    dropdownItem,
    contentItem,
    current,
  } = app;

  const CinemaInfoProps = {
    list,
    total,
    loading,
    contentItem,
    rowkey:'theaterid',
    onVerify(params){
      dispatch({
        type:'app/updataCinemaVerify',
        payload:{
          userid:record.userid,
          status:record.status === 1 ? 0 : 1,
        }
      })
    },
    flip(params){
      dispatch({
        type: 'app/queryCinemaInfo',
        payload: {
          offsetNum: (params.offsetNum - 1) * 10,
          pageSize: 10
        }
      });
    },
    onViewItem(params){
      dispatch({
        type: 'app/loadAreaInfo',
        payload: {
          modalType: 'visit',
          currentItem: params
        }
      });
    },
    onEditItem(params){
      dispatch({
        type: 'app/loadAreaInfo',
        payload: {
          modalType: 'update',
          currentItem: params
        }
      });
    },
    onAddItem(){
      dispatch({
        type: 'app/hideContentVisit',
        payload: {
          modalType: 'create',
          currentItem: {}
        }
      });
    },
    onUpdateStatus(j_id, audit_flag){
      dispatch({
        type: 'app/updateCinemaStatus',
        payload: {
          j_id,
          audit_flag: audit_flag === 1 ? 0 : 1,
          admin_id: sessionStorage.getItem('adminid')
        }
      });
    },
    onDeleteItem(params){
      dispatch({
        type: 'app/deleteCinema',
        payload: {
          j_id: params
        }
      })
    },
  }

  function queryAuth(params){
    // [32, 33, 34] = [增, 改, 删]
    const filtered = auth(params);
    let result = {
      add: false,
      edit: false,
      delete: false
    };

    if( filtered.length ){
      filtered.indexOf(params[0]) !== -1 ? result.add    = true : '';
      filtered.indexOf(params[1]) !== -1 ? result.edit   = true : '';
      filtered.indexOf(params[2]) !== -1 ? result.delete = true : '';
    }

    return result;
  }

  const DataListProps = {
    list,
    //按钮
    BtnText:'添加影院',
    loading,
    total,
    current,
    titleDataIndex:'theatername',
    subDataIndex:'theateraddress',
    rowKey:'theaterid',
    // 权限
    auth: queryAuth([32, 33, 34]),
    //查询
    onSearch(params){
      dispatch({
        type:'app/queryAllCinemaList',
        payload:{
          criteria:params,
        }
      })
    },
    //删除
    onDataDelete(params){
      dispatch({
        type:'app/deleteCinema',
        payload:{
          theaterid:params.theaterid
        }
      });
    },
    //切换至信息页面
    onSwitchInfo(params){
      dispatch({
        type: 'app/showContent',
        payload:{
          contentItem:new Array(params)
        }
      })
    },
    //切换至新增页面
    onAdd(){
      dispatch({
        type:'app/queryAllArchive',
        payload:{
          contentType:'create',
          contentItem: contentItem,
          bannerTitle:'新增影院信息'
        }
      })
    },
    //切换至修改页面
    onSwitchEdit(params){
      // const contentItem = list.filter((username) => {return username === params.record});
      dispatch({
        type: 'app/queryAllArchive',
        payload:{
          bannerTitle:'修改影院信息',
          contentItem:[params],
          contentType:'update',
          bannerTitle:'编辑影院信息'
        }
      });
    },
    //翻页
    onPageChange(type, params, values){
      dispatch({
        type:'app/queryAllCinemaList',
        payload:{
          criteria: values || '',
          pagesize: 10,
          page: params,
          type:''
        }
      })
    }
  };

  const CinemaAlterProps = {
    loading,
    bannerTitle,
    dropdownItem,
    contentType,
    contentItem:contentType === 'update' ? contentItem : '',
    //返回
    goBackBtn:true,
    //取消编辑表单返回
    goBack(){
      dispatch({
        type:'app/showContent'
      })
    },
    handleSubmit(params){
      dispatch({
        type:'app/createCinema',
        payload:params
      })
    },
    handleUpdate(params){
      dispatch({
        type:'app/updateCinema',
        payload:{
          ...params,
          theaterid:contentItem[0].theaterid,
        }
      })
    }
  }

  return (
    <div className="Relative">
      <DataList {...DataListProps} />
      {
        contentVisible ?
        <CinemaInfo {...CinemaInfoProps}/> :
        <CinemaAlter {...CinemaAlterProps}/>
      }
    </div>
  );
}

CinemaManage.PropTypes = {
  app: PropTypes.object.isRequired
}

function mapStateToProps({ app }){
  return { app };
}

export default connect(mapStateToProps)(CinemaManage)
