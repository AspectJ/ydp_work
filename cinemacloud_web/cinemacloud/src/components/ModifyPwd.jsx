import React from 'react'
import { Form, Input, Button, message } from 'antd'

const FormItem = Form.Item;

let ModifyPwd = React.createClass({
  getInitialState() {
    return {
      passwordDirty: false,
    };
  },
  handleSubmit(){
    this.props.form.validateFields((err, values) => {
      if(err) return;

      if( values.fore_adminpwd === values.new_adminpwd ){
        message.warning('新密码与旧密码不能一致', 3);
      } else {
        this.props.onOk({
          userid:      JSON.parse(sessionStorage.getItem('user')).userid,
          oldPassword: values.fore_adminpwd,
          newPassword: values.new_adminpwd
        });
      }
    });
  },
  handlePasswordBlur(e) {
    const value = e.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
  },
  checkPassowrd(rule, value, callback) {
    if (value && value !== this.props.form.getFieldValue('new_adminpwd')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  },
  checkConfirm(rule, value, callback) {
    if (value && this.state.passwordDirty) {
      this.props.form.validateFields(['confirm_adminpwd'], { force: true });
    }
    callback();
  },
  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12, offset: 2 },
    };
    return (
      <div className="Content" style={{width: '100%', left: '0'}}>
        <h1 className="ContentHeader">修改密码</h1>
        <div className="ContentBody">
          <Form layout="horizontal" style={{maxWidth: '460px', padding: '40px 20px'}}>
            <FormItem
              {...formItemLayout}
              label="旧密码"
              hasFeedback
            >
              {getFieldDecorator('fore_adminpwd', {
                rules: [{
                  required: true, message: '旧密码不能为空',
                }]
              })(
                <Input type="password" placeholder="请输入您的旧密码" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="新密码"
              hasFeedback
            >
              {getFieldDecorator('new_adminpwd', {
                rules: [{
                  min: 6, max: 16, message: '密码长度为6-16位',
                }, {
                  required: true, message: '新密码不能为空',
                }, {
                  validator: this.checkConfirm,
                }],
              })(
                <Input type="password" placeholder="请输入您的新密码" onBlur={this.handlePasswordBlur} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="确认密码"
              hasFeedback
            >
              {getFieldDecorator('confirm_adminpwd', {
                rules: [{
                  required: true, message: '确认密码不能为空',
                }, {
                  validator: this.checkPassowrd,
                }],
              })(
                <Input type="password" placeholder="请再次输入您的新密码" />
              )}
            </FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" size="large" loading={this.props.loading} size="large" onClick={this.handleSubmit}>修改</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
});

export default Form.create()(ModifyPwd)
