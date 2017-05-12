import React, { PropTypes } from 'react';
import { Col, Row, Modal, Form, Input, Button, Icon, Switch } from 'antd';

const FormItem = Form.Item;

let UsersModal = ({
  item = {},
  modalVisible,
  modalType,
  onClose,
  form: { getFieldDecorator }
}) => {
  const modalOpts = {
    width: 400,
    title: '用户信息',
    visible: modalVisible,
    maskClosable: false,
    onOk(){
      onClose();
    },
    onCancel(){
      onClose();
    },
  };

  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 12,
      offset: 1
    },
  };

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <Row>
          <Col span={17}>
            <FormItem
              label="邮箱:"
              {...formItemLayout}
            >
              {getFieldDecorator('email')(
                <p className="ant-form-text">{item.email}</p>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={17}>
            <FormItem
              label="手机号:"
              {...formItemLayout}
            >
              {getFieldDecorator('mobile')(
                <p className="ant-form-text">{item.mobile}</p>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={17}>
            <FormItem
              label="用户名:"
              {...formItemLayout}
            >
              {getFieldDecorator('nickname')(
                <p className="ant-form-text">{item.nickname}</p>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={17}>
            <FormItem
              label="真实姓名:"
              {...formItemLayout}
            >
              {getFieldDecorator('realname')(
                <p className="ant-form-text">{item.realname}</p>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={17}>
            <FormItem
              label="影院名称:"
              {...formItemLayout}
            >
              {getFieldDecorator('cinema_name')(
                <p className="ant-form-text">{item.cinema_name}</p>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={17}>
            <FormItem
              label="创建时间:"
              {...formItemLayout}
            >
              {getFieldDecorator('createtime')(
                <p className="ant-form-text">{item.createtime}</p>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={17}>
            <FormItem
              label="更改时间:"
              {...formItemLayout}
            >
              {getFieldDecorator('modifytime')(
                <p className="ant-form-text">{item.modifytime}</p>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={17}>
            <FormItem
              label="状态:"
              {...formItemLayout}
            >
      				{getFieldDecorator('state')(
								<Switch defaultChecked={item.state === '1'} checkedChildren={'可用'} unCheckedChildren={'禁用'} disabled={true}/>
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}


UsersModal.propTypes = {
  modalVisible: PropTypes.bool,
  modalType: PropTypes.string,
  form: PropTypes.object,
  item: PropTypes.object,
  onClose: PropTypes.func,
};

export default Form.create()(UsersModal)
