import React from 'react'
import { connect } from 'dva'
import DataList from '../components/DataList'
import FfersInfo from '../components/Ffers/FfersInfo'
import { Modal, Form, Input, Row, Col } from 'antd'
import auth from '../utils/auth'

function FfersManage({ app, dispatch, form }) {
  const {
    list,
    total,
    loading,
    modalItem,
    modalType,
    modalVisible,
    contentType,
    contentItem,
    contentVisible,
    bannerTitle,
    ffersconfname,
    ffersconfid,
    dropdownItem,
    current,
    contentTotal,
    contentCurrent,
    titleText,
  } = app;

  const { getFieldDecorator } = form

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };

  function queryAuth(params){
    // [42, 43, 44] = [增, 改, 删]
    const filtered = auth(params);
    let result = {
      add: false,
      delete: false,
      edit: false
    };

    if( filtered.length ){
      filtered.indexOf(params[0]) !== -1 ? result.add    = true : '';
      // filtered.indexOf(params[1]) !== -1 ? result.edit   = true : '';
      filtered.indexOf(params[2]) !== -1 ? result.delete = true : '';
    }

    return result;
  }

  const DataListProps = {
    list,
    total,
    loading,
    modalVisible,
    rowKey:'ffersconfid',
    //按钮
    BtnText:'添加通知',
    //按钮功能
    ModalBtn:true,
    //Table的dataIndex：
    titleDataIndex:'ffersconfname',
    subDataIndex:'createtime',
    current,
    auth: queryAuth([42, 43, 44]),
    //搜索方法
    onSearch(params){
      dispatch({
        type:'app/queryFfersconfList',
        payload:{
          ffersconfname:params
        }
      })
    },
    //显示编辑界面
    onSwitchEdit(params){
      dispatch({
        type:'app/showModal',
        payload: {
          modalItem: params,
          titleText:'修改通知',
          modalType: 'create'
        }
      })
    },
    //显示信息界面
    onSwitchInfo(params){
      dispatch({
        type:'app/queryFfersInfo',
        payload:{
          ffersconfid: params.ffersconfid,
          ffersconfname: params.ffersconfname,
        }
      })
    },
    //删除
    onDataDelete(params){
      dispatch({
        type:'app/deleteFfersconf',
        payload:{
          ffersconfid: params.ffersconfid
        }
      })
    },
    //添加
    onAdd(){
      dispatch({
        type:'app/showModal',
        payload:{
          modalItem: {},
          titleText:'添加通知'
        }
      })
    },
    //翻页
    onPageChange(type,params,values){
      dispatch({
        type:'app/queryFfersconfList',
        payload:{
          pagesize: 10,
          page: params,
          ffersconfname:values || '',
          type:''
        }
      })
    }
  }

  const FfersInfoProps = {
    contentTotal,
    contentCurrent,
    contentType,
    contentItem,
    loading,
    ffersconfid,
    ffersconfname,
    modalVisible,
    dropdownItem,
    //单个添加按钮
    singleUploadBtn:false,
    //批量上传按钮
    multiUploadBtn:true,
    //单个上传(界面切换)
    switchSingleUpload(){
      dispatch({
        type:'app/queryFfersFormInfo',
      })
    },
    //总体界面
    switchTotal(ffersconfid, ffersconfname){
      dispatch({
        type:'app/queryFfersInfo',
        payload:{
          ffersconfid: ffersconfid,
          ffersconfname: ffersconfname
        }
      })
    },
    ExcelTemplate(){
      dispatch({
        type: 'app/ExcelTemplate',
        payload: {
          type: 1
        }
      });
    },
    //新增通知
    handleSubmit(params){
      dispatch({
        type:'app/createFfersInfo',
        payload: params
      })
    },
    //取消添加
    handleCancelSubmit(params){
      dispatch({
        type:'app/deleteFfersInfo',
        payload: {
          ids:params
        }
      })
    },
    //搜索通知
    handleSearch(params){
      dispatch({
        type:'app/queryFfersInfo',
        payload:{
          ...params,
          ffersconfid,
          page: 1,
          pagesize: 10
        }
      })
    },
    //翻页
    pageOnchange(params, values){
      dispatch({
        type:'app/queryFfersInfo',
        payload:{
          ffersconfid:params.ffersconfid,
          pagesize:params.pagesize,
          page:params.page,
          ...values
        },
      })
    },
    //表单操作
    handleSend(ffersid, ffersconfid){
      dispatch({
        type:'app/updateFfersMsg',
        payload:{
          ffersids: ffersid,
          ffersconfid: ffersconfid,
        }
      })
    },
    edit(params){
      dispatch({
        type: 'app/showModal',
        payload: {
          modalType: 'update',
          modalItem: params
        }
      })
    },
    confirm(params){
      dispatch({
        type:'app/updateFfersInfo',
        payload:{
          ...params,
          status: 2
        }
      });
    }
  }

  function onOk(){
    form.validateFields((err,values)=>{
      if(!err){
        modalType === 'create' ?
          dispatch({
            type:'app/createFfersconf',
            payload:{
              ...values,
              pagesize: 10,
              page: 1,
            }
          }) :
          dispatch({
            type:'app/updateFfersInfo',
            payload:{
              ...values,
              ffersid: modalItem.ffersid,
              status: 1
            }
          })
      }
    })
  }
  function onCancel(){
    dispatch({
      type:'app/hideModal',
      payload: {
        modalItem: null
      }
    })
  }

  const isCinema = () => {
    return JSON.parse(sessionStorage.getItem('user')).roletype === 2;
  };

  return (
    <div className="Relative">
      {
        !isCinema() ? <DataList {...DataListProps} /> : ''
      }
      <FfersInfo {...FfersInfoProps} />
      {
        modalVisible ?
          modalType === 'create' ?
            <Modal title={titleText} confirmLoading={loading} visible={modalVisible && modalType === 'create'} onOk={onOk} onCancel={onCancel}>
              <Form style={{margin:'30px 0 0 40px',width:'400px'}}>
                <Form.Item
                  label='批次名称'
                  {...formItemLayout}
                >
                  {
                    getFieldDecorator('ffersconfname', {
                      rules:[{
                        required:true,message:'请输入批次名称'
                      }]
                    })(
                      <Input placeholder="请输入批次名称"/>
                    )
                  }
                </Form.Item>
              </Form>
            </Modal> :
            <Modal title="影盘回执" confirmLoading={loading} visible={modalVisible && modalType === 'update'} onOk={onOk} onCancel={onCancel}>
              <Form.Item
                label='物流公司'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('logistics',{
                    rules:[{
                      required:true,message:'请输入物流公司名称'
                    }]
                  })(
                    <Input placeholder="物流公司名称"/>
                  )
                }
              </Form.Item>
              <Form.Item
                label='快递单号'
                {...formItemLayout}
              >
                {
                  getFieldDecorator('waybill',{
                    rules:[{
                      required:true,message:'请输入快递单号'
                    }]
                  })(
                    <Input placeholder="快递单号"/>
                  )
                }
              </Form.Item>
            </Modal> : ''
        }
      }
    </div>
  );
}

function mapStateToProps({ app }) {
  return { app };
}

export default Form.create()(connect(mapStateToProps)(FfersManage));
