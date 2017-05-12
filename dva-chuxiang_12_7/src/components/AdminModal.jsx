import React, { PropTypes } from 'react';
import { Col, Row, Form, Input, Modal, Cascader, Upload, Button, Icon, message, Switch } from 'antd';

const FormItem = Form.Item;

let AdminModal = ({
  item = {},
  modalVisible,
  modalType,
  onSubmit,
  onClose,
  form: { getFieldDecorator, validateFields, getFieldsValue, getFieldValue },
}) => {
	const modalOpts = {
    width: 400,
    title: '系统用户信息',
    visible: modalVisible,
    maskClosable: false,
    onOk: handleOk,
    onCancel(){
      onClose();
    },
  };

  const formItemLayout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 14,
    },
  };

  function isChangeable(){
    return modalType === 'visit' ?  true : false;
  }

	function handleOk(e) {
		validateFields((error, values) => {
	      if(error) return;

	      const params = {}

	      switch (modalType) {
			      case 'create':

				        params.admin_name = values.adminname,
				        params.admin_nickname = values.nickname,
				        params.admin_pwd = values.adminpwd,
				        params.cinema_id = item.cinemaid,
				        params.audit = values.audit,
				        params.admin_state = values.state
		          onSubmit(params);
		          break;
		        case 'visit':
		          onClose();
		          break;
		        case 'update':

								params.admin_id = item.adminid,
				        params.admin_name = values.adminname,
				        params.admin_nickname = values.nickname,
				        params.admin_state = values.state,
				        params.audit = values.audit
		        	onSubmit(params);
		          break;
		        default:
		        	break;
	      }
    });
  }


	return (
	    <Modal {...modalOpts}>
	      <Form horizontal>
	        <Row>
	          <Col span={17}>
	            <FormItem
	              label="用户名:"
	              {...formItemLayout}
	            >
	              {getFieldDecorator('adminname', {
	                initialValue: item.adminname,
	                rules: [
                    { required: true, message: '用户名不能为空' },
                  ],
	              })(
	                <Input disabled={modalType != 'create'} type="text" />
	              )}
	            </FormItem>
	          </Col>
	        </Row>
	        <Row>
	          <Col span={17}>
	            <FormItem
	              label="昵称:"
	              {...formItemLayout}
	            >
	              {getFieldDecorator('nickname', {
	                initialValue: item.nickname,
	                rules: [
                    { required: true, message: '昵称不能为空' },
                  ],
	              })(
	                <Input disabled={isChangeable()} type="text" />
	              )}
	            </FormItem>
	          </Col>
	        </Row>
	        {
	        	modalType === 'create' ?
				        <Row>
				          <Col span={17}>
				            <FormItem
				              label="密码:"
				              {...formItemLayout}
				            >
				              {getFieldDecorator('adminpwd', {
				                initialValue: item.adminpwd,
				                rules: [
			                    { required: true, message: '密码不能为空' },
			                    { min: 6, max: 10, message: '密码长度为6~10位' },
			                  ],
				              })(
				                <Input disabled={isChangeable()} type="password" />
				              )}
				            </FormItem>
				          </Col>
				        </Row>
				        					: ''
	        }
	        <Row>
	          <Col span={17}>
	            <FormItem
	              label="院线名称:"
	              {...formItemLayout}
	            >
	              {getFieldDecorator('cinemaname', {
	                initialValue: item.cinemaname
	              })(
	                <Input disabled={true} type="text" />
	              )}
	            </FormItem>
	          </Col>
	        </Row>
	        {
							isChangeable() ?
										<Row>
						          <Col span={17}>
						            <FormItem
						              label="创建时间:"
						              {...formItemLayout}
						            >
						              {getFieldDecorator('create_time', {
						                initialValue: item.create_time
						              })(
						                <Input disabled={isChangeable()} type="text" />
						              )}
						            </FormItem>
						          </Col>
						        </Row>
														: ''
					}
	        {
							isChangeable() ?
						        <Row>
						          <Col span={17}>
						            <FormItem
						              label="最后登录:"
						              {...formItemLayout}
						            >
						              {getFieldDecorator('last_login_time', {
						                initialValue: item.last_login_time
						              })(
						                <Input disabled={isChangeable()} type="text" />
						              )}
						            </FormItem>
						          </Col>
						        </Row>
														: ''
					}
		      <Row>
	          <Col span={17}>
	            <FormItem
	              label="状态:"
	              {...formItemLayout}
	            >
	              {getFieldDecorator('state', {
	              	initialValue : item.state
	              })(
										<Switch defaultChecked={item.state} checkedChildren={'可用'} unCheckedChildren={'禁用'} disabled={modalType === 'visit'}/>
	              )}
	            </FormItem>
	          </Col>
	        </Row>
					<Row>
	          <Col span={17}>
	            <FormItem
	              label="能否审核:"
	              {...formItemLayout}
	            >
	      				{getFieldDecorator('audit', {
	      					initialValue : item.audit === 1
	              })(
										<Switch defaultChecked={item.audit === 1} checkedChildren={'是'} unCheckedChildren={'否'} disabled={modalType === 'visit'}/>
	              )}
	            </FormItem>
	          </Col>
	        </Row>
	      </Form>
	    </Modal>
	  );
}

export default Form.create()(AdminModal)
