import React from 'react'
import { Link } from 'dva/router'
import { Form, Input, Button, Icon } from 'antd'

const FormItem = Form.Item;

function Login(props) {
  const { getFieldDecorator, validateFields, getFieldsValue } = props.form;

  function handleSubmit(){
    validateFields((err, values) => {
      if( !err ){
        const params = {
          username: values.loginname,
          password: values.loginpwd
        };

        props.onSubmit(params);
      }
    });
  }

  return (
    <div>
      <Form className="registbox">
        <FormItem>
          {getFieldDecorator('loginname', {
            rules: [{ required: true, message: '请输入您的登陆账号' }],
          })(
            <Input addonBefore={<Icon type="user" style={{fontSize: '14px'}} />} className="input" size="large" placeholder="请输入登录账号" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('loginpwd', {
            rules: [{
              min: 6, max: 20, message: '登录密码长度为6-12位',
            }, {
              required: true, message: '登录密码不能为空',
            }]
          })(
            <Input
              addonBefore={<Icon type="lock" style={{fontSize: '14px'}} />}
              type="password"
              className="input"
              size="large"
              placeholder="请输入登录密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" size="large" htmlType="submit" loading={props.loading} className="button" onClick={handleSubmit}>登 录</Button>
        </FormItem>
        <FormItem>
          <div style={{ textAlign: 'center' }}>
            <Link to="/cinemacloud/Regist" style={{ fontSize: '15px' }}>没有账户, 点击注册</Link>
          </div>
        </FormItem>
      </Form>
    </div>
  );
}

export default Form.create()(Login)
