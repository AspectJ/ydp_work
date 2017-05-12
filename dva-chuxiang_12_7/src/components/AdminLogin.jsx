import React, { PropTypes } from 'react'
import { Form, Input, Button, Icon, Alert } from 'antd'
import styles from './AdminLogin.less'

const createForm = Form.create;
const FormItem = Form.Item;

const AdminLogin = ({
  loading,
  onOk,
  form: { getFieldDecorator, validateFields, getFieldsValue },
}) => {
  function handleSubmit(e){
    e.preventDefault();

    validateFields((error, values) => {
      if(error){
        return;
      }

      onOk(values);
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginbox}>
        <h1 className={styles.loginheader}>楚湘院线总部管理系统</h1>
        <Form onSubmit={handleSubmit}>
          <FormItem>
            {getFieldDecorator('txtName', {
              rules: [{ required: true, message: '请输入您的登陆账号' }],
            })(
              <Input addonBefore={<Icon type="user" />} style={{height: '40px'}} size="large" placeholder="请输入登录账号" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('txtPass', {
              rules: [{ required: true, message: '请输入您的密码' }],
            })(
              <Input addonBefore={<Icon type="lock" />} type="password" style={{height: '40px'}} size="large" placeholder="请输入登录密码" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" size="large" loading={loading} className={styles.loginbutton}>立即登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

AdminLogin.PropTypes = {
  loading: PropTypes.bool,
  onOk: PropTypes.func,
};

export default createForm()(AdminLogin);
