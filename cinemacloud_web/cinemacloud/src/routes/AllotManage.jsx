import React from 'react'
import { connect } from 'dva'
import DataList from '../components/DataList'
import AllotInfo from '../components/Allot/AllotInfo'
import { Modal, Form, Input, Row, Col, Select } from 'antd'
import auth from '../utils/auth'

function AllotManage({ app, dispatch, form }) {
  const {
  	list,
    total,
    loading,
    modalItem = {},
    modalVisible,
    contentType,
    current,
    contentItem,
    contentVisible,
    bannerTitle,
    suppliesconfname,
    suppliesconfid,
    dropdownItem,
    contentTotal,
    contentCurrent,
    titleText,
  } = app;

  const isCinema = () => {
    return JSON.parse(sessionStorage.getItem('user')).roletype === 2;
  };

  function queryAuth(params){
    // [62, 63, 64] = [增, 改, 删]
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

  const DataListProps = {
  	list,
    total,
  	loading,
    modalVisible,
    current,
    rowKey:'suppliesconfid',
    //按钮
    BtnText:'添加通知',
    //按钮功能
    ModalBtn:true,
    //Table的dataIndex：
    titleDataIndex:'suppliesconfname',
    subDataIndex:'createtime',
    auth: queryAuth([62, 63, 64]),
    //搜索方法
    onSearch(params){
      dispatch({
        type:'app/queryAllotList',
        payload:{
          suppliesconfname:params
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
        }
      })
    },
    //显示信息界面
  	onSwitchInfo(params){
  		dispatch({
  			type:'app/queryAllotInfo',
  			payload:{
  				suppliesconfid: params.suppliesconfid,
          suppliesconfname:params.suppliesconfname,
  			}
  		})
  	},
    //删除
    onDataDelete(params){
      dispatch({
        type:'app/deleteAllot',
        payload:{
          suppliesconfid: params.suppliesconfid,
        }
      })
    },
    //添加
    onAdd(){
      dispatch({
        type:'app/showModal',
        payload:{
          modalItem: {},
          titleText:'添加通知',
        }
      })
    },
    //翻页
    onPageChange(type,params,values){
      dispatch({
        type:'app/queryAllotList',
        payload:{
          pagesize: 10,
          page: params,
          suppliesconfname:values || '',
          type:''
        }
      })
    }

    // onSwitchAdd(){

    // }
  }

  const AllotInfoProps = {
   contentTotal,
   contentCurrent,
   contentType,
	 contentItem,
	 loading,
   suppliesconfid,
   suppliesconfname,
   modalVisible,
   dropdownItem,
   //单个添加按钮
   singleUploadBtn:false,
   //批量上传按钮
   multiUploadBtn:true,
   rowkey:'suppliesid',
   //单个上传(界面切换)
   switchSingleUpload(){
    dispatch({
      type:'app/queryAllotFormInfo',
    })
   },
   //总体界面
   switchTotal(suppliesconfid,suppliesconfname){
    dispatch({
      type:'app/queryAllotInfo',
      payload:{
        suppliesconfid: suppliesconfid,
        suppliesconfname: suppliesconfname
      }
    })
   },
   ExcelTemplate(){
    dispatch({
      type: 'app/ExcelTemplate',
      payload: {
        type: 2
      }
    });
   },
   //新增通知
   handleSubmit(params){
    dispatch({
      type:'app/createAllotInfo',
      payload:params
    })
   },
   //取消添加
   handleCancelSubmit(params){
    dispatch({
      type:'app/deleteAllotInfo',
      payload: {
        ids:params
      }
    })
   },
   //表单操作
   handleEdit(suppliesid, suppliesconfid){
    dispatch({
      type:'app/updateAllotMsg',
      payload:{
        suppliesids:suppliesid,
        suppliesconfid:suppliesconfid,
      }
    })
   },
   //搜索通知
   handleSearch(params){
    dispatch({
      type:'app/queryAllotInfo',
      payload:{
        ...params,
        suppliesconfid,
        page: 1,
        pagesize: 10
      }
    })
   },
   //翻页
   pageOnchange(params, newValues){
    dispatch({
      type:'app/queryAllotInfo',
      payload:{
        suppliesconfid:params.suppliesconfid,
        pagesize:params.pagesize,
        page:params.page,
        ...newValues
      },
    })
   },
   handleReceipt(params){
     dispatch({
        type: 'app/updateAllotStatus',
        payload: params
     });
   }
  }

  function onOk(){
      form.validateFields((err,values)=>{
        if(!err){
          modalItem.suppliesconfid ?
          dispatch({
            type:'app/updataAllotList',
            payload:{
              suppliesconfname:values.pcmc,
              distributor:values.ffz[0],
              suppliesconfid:modalItem.suppliesconfid,

            }
          }) :
          dispatch({
            type:'app/createAllotNotice',
            payload:{
              suppliesconfname:values.pcmc,
              distributor:values.ffz[0],
              pagesize: 10,
              page: 1,
            }
          });

        }
      })
  }
  function onCancel(){
      dispatch({
        type:'app/hideModal'
      })
  }

  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };

  return (
    <div className="Relative">
      {
        !isCinema() ? <DataList {...DataListProps} /> : ''
      }
      <AllotInfo {...AllotInfoProps} />
      {
        modalVisible ?
        <Modal title={titleText} visible={modalVisible} onOk={onOk} onCancel={onCancel}>
          <Form style={{margin:'30px 0 0 40px',width:'400px'}}>
            <Row>
              <Col>
                <Form.Item
                  label='批次名称'
                  {...formItemLayout}
                >
                {
                  getFieldDecorator('pcmc',{
                    initialValue: modalItem.suppliesconfname ? modalItem.suppliesconfname : '',
                    rules:[{
                      required:true,message:'请输入批次名称'
                    }]
                  })(
                  <Input placeholder="请输入批次名称"/>
                  )
                }
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Item
                  label='分发者'
                  {...formItemLayout}
                >
                {
                  getFieldDecorator('ffz',{
                    initialValue: modalItem.distributor ? modalItem.distributor === 2 ? ['2'] : ['1'] : [],
                    rules:[{
                      required:true,
                      message:'请选择分发者'
                    }]
                  })(
                    <Select placeholder="请选择分发者">
                      <Select.Option key='1'>院线</Select.Option>
                      <Select.Option key='2'>制片方</Select.Option>
                    </Select>
                  )
                }
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal> : ''
      }
    </div>
  );
}

function mapStateToProps({ app }) {
  return { app };
}

export default Form.create()(connect(mapStateToProps)(AllotManage));
