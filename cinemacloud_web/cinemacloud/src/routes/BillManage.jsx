import React from 'react'
import { connect } from 'dva'
import { Modal, Form, Input, Row, Col, Spin, Select, Icon } from 'antd'
import DataList from '../components/DataList'
import BillInfo from '../components/Bill/BillInfo'
import CinemaSelect from '../components/CinemaSelect'
import auth from '../utils/auth'

const Option = Select.Option;

function BillManage({ app, dispatch, form }) {
  const {
    list,
    total,
    loading,
    modalItem = {},
    modalVisible,
    current,
    contentType,
    contentItem,
    contentVisible,
    bannerTitle,
    billconfname,
    billconfid,
    dropdownItem,
    contentTotal,
    contentCurrent,
    titleText,
  } = app;

  const isCinema = () => {
    return JSON.parse(sessionStorage.getItem('user')).roletype === 2;
  };

  function queryAuth(params){
    // [82, 84] = [增, 删]
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

  const DataListProps = {
    list,
    total,
    loading,
    modalVisible,
    current,
    rowKey:'billconfid',
    //按钮
    BtnText:'添加通知',
    //按钮功能
    ModalBtn:true,
    //Table的dataIndex：
    titleDataIndex:'billconfname',
    subDataIndex:'createtime',
    auth: queryAuth([82, 84]),
    //搜索方法
    onSearch(params){
      dispatch({
        type:'app/queryBillconfList',
        payload:{
          billconfname:params
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
        type:'app/queryBillInfo',
        payload:{
          billconfid: params.billconfid,
          billconfname:params.billconfname,
        }
      })
    },
    //删除
    onDataDelete(params){
      dispatch({
        type:'app/deleteBillconf',
        payload:{
          billconfid: params.billconfid,
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
    //翻页
    onPageChange(type,params,values){
      dispatch({
        type:'app/queryBillconfList',
        payload:{
          pagesize: 10,
          page: params,
          billconfname:values || '',
          type:''
        }
      })
    }
  }

  const BillInfoProps = {
    contentTotal,
    contentCurrent,
    contentType,
    contentItem,
    loading,
    billconfid,
    billconfname,
    modalVisible,
    dropdownItem,
    rowkey:'billid',
    //总体界面
    switchTotal(billconfid,billconfname){
      dispatch({
        type:'app/queryBillInfo',
        payload:{
          billconfid: billconfid,
          billconfname: billconfname
        }
      })
    },
    //新增通知
    handleSubmit(params){
      dispatch({
        type:'app/createBillInfo',
        payload:params
      })
    },
    // 发送通知
    sendMsg(record){
      dispatch({
        type:'app/updateBillMsg',
        payload:{
          billids: record.billid,
        }
      })
    },
    // 搜索通知
    handleSearch(params){
      dispatch({
        type:'app/queryBillInfo',
        payload:{
          ...params,
          billconfid,
          page: 1,
          pagesize: 1
        }
      })
    },
    // 翻页
    pageOnchange(params, newValues){
      dispatch({
        type:'app/queryBillInfo',
        payload:{
          billconfid:params.billconfid,
          pagesize:params.pagesize,
          page:params.page,
          ...newValues
        },
      })
    },
    updateBillLink(params){
      dispatch({
        type: 'app/updateBillLink',
        payload: params
      });
    },
    handleReceipt(params){
      dispatch({
        type: 'app/updateBillStatus',
        payload: params
      });
    }
  }

  function onOk(){
    form.validateFields((err, values)=>{
      if(!err){
        modalItem.billconfid ?
          dispatch({
            type:'app/updateBillconf',
            payload:{
              billconfname:values.pcmc,
              billconfid:modalItem.billconfid
            }
          }) :
          dispatch({
            type:'app/createBillconf',
            payload:{
              billconfname: values.pcmc,
              roleids:      values.roleids.join(','),
              theaterids:   values.theaterids
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

  function getValue(e, list){
    setFieldsValue({
      theaterids: list
    });
  }

  const { getFieldDecorator, setFieldsValue } = form;
  const formItemLayout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 21,
    },
  };
  return (
    <div className="Relative">
      {
        !isCinema() ? <DataList {...DataListProps} /> : ''
      }
      <BillInfo {...BillInfoProps} />
      {
        modalVisible ?
          <Modal title={titleText} width={800} visible={modalVisible} maskClosable={false} onOk={onOk} onCancel={onCancel}>
            <Spin spinning={loading}>
              <Form>
                <Row>
                  <Col>
                    <Form.Item
                      label='批次名称: '
                      {...formItemLayout}
                    >
                      {
                        getFieldDecorator('pcmc',{
                          initialValue: modalItem.billconfname ? modalItem.billconfname : '',
                          rules:[{
                            required:true,message:'请输入批次名称'
                          }]
                        })(
                          <Input style={{width: 200}} placeholder="请输入批次名称"/>
                        )
                      }
                    </Form.Item>
                    <Form.Item
                      label='角色设置: '
                      {...formItemLayout}
                    >
                      {
                        getFieldDecorator('roleids',{
                          rules:[{
                            required:true,message:'请选择角色设置'
                          }]
                        })(
                          <Select multiple placeholder="请选择角色设置" style={{width: 400}}>
                            {
                              dropdownItem.role.length ?
                                dropdownItem.role.map(role => {
                                  return <Option key={role.roleid}>{role.rolename}</Option>
                                }) :
                                <Option key="Role_Empty" disabled>加载中... <Icon type="loading" style={{float: 'right', lineHeight: '18px'}} /></Option>
                            }
                          </Select>
                        )
                      }
                    </Form.Item>
                    <Form.Item
                      label='选择影院: '
                      {...formItemLayout}
                    >
                      {
                        getFieldDecorator('theaterids', {
                          rules: [{ required: true, message: "请选择所属影院" }]
                        })(
                          <Input style={{display: 'none'}} />
                        )
                      }
                      <CinemaSelect list={dropdownItem.cinema} setValue={getValue.bind(null, this)} />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Spin>
          </Modal> : ''
      }
    </div>
  );
}

function mapStateToProps({ app }) {
  return { app };
}

export default Form.create()(connect(mapStateToProps)(BillManage));
