import React from 'react'
import { Link } from 'dva/router'
import { Form, Input, Button, Icon, Select, Col, Row } from 'antd'

const FormItem = Form.Item,
      Option   = Select.Option;

let Regist = React.createClass({
  getInitialState(){
    return {
      Theater: '',
      passwordDirty: false
    };
  },
  handlePasswordBlur(e) {
    const value = e.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
  },
  checkPassowrd(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  },
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirmpwd'], { force: true });
    }

    callback();
  },
  handleTheaterChange(value){
    if( !!value && !!!this.state.Theater ){
      this.props.queryRegistCinemaList(value);
    } else if( value !== this.state.Theater ){
      this.setState({
        Theater: ''
      });
    }
  },
  handleTheaterSelect(value){
    this.setState({
      Theater: value
    });
  },
  handleSubmit(){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = {
          username: values.username,
          password: values.password,
          realname: values.realname,
          mobile:   values.mobile,
          email:    values.email,
          theater:  values.theater
        };

        this.props.onSubmit(params);
      }
    })
  },
  render(){
    const { getFieldDecorator, validateFields, getFieldsValue } = this.props.form;
    const TheaterOption = !!!this.state.Theater ? this.props.dropdownItem.cinema.map(cinema => {
      return <Option key={cinema.theatername}>{cinema.theatername}</Option>
    }) : [];
    
    return (
      <div>
        <Form layout="vertical" className="registbox">
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="登录账号: ">
                {getFieldDecorator('username', {
                  rules:[{
                    required: true,
                    message: '请输入登录账号'
                  }, {
                    pattern: /^[A-Za-z0-9_]{6,12}$/,
                    message: '登录账号由6-12位英文或数字组成'
                  }]
                })(
                  <Input
                    type="text"
                    className="input"
                    size="large"
                    placeholder="登录账号"
                  />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="真实姓名: ">
                {getFieldDecorator('realname', {
                  rules: [{
                    required: true, message: '真实姓名不能为空'
                  }]
                })(
                  <Input
                    className="input"
                    size="large"
                    placeholder="真实姓名"
                  />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="用户密码: ">
                {getFieldDecorator('password', {
                  rules: [{
                    min: 6, max: 20, message: '密码长度为6-12位',
                  }, {
                    required: true, message: '密码不能为空',
                  }, {
                    validator: this.checkConfirm,
                  }]
                })(
                  <Input
                    type="password"
                    className="input"
                    size="large"
                    placeholder="用户密码"
                    onBlur={this.handlePasswordBlur} />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="确认密码: ">
                {getFieldDecorator('confirmpwd', {
                  rules: [{
                    required: true, message: '确认密码不能为空',
                  }, {
                    validator: this.checkPassowrd,
                  }],
                })(
                  <Input
                    type="password"
                    className="input"
                    size="large"
                    placeholder="确认密码" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="联系方式: ">
                {getFieldDecorator('mobile',{
                  rules:[{
                    required:true,
                    message:'请输入常用的联系方式'
                  }, {
                    pattern: /^1[34578](\d){9}$/, 
                    message: '联系方式格式错误' 
                  }],
                })(
                  <Input
                    type="text"
                    className="input"
                    size="large"
                    placeholder="联系方式"
                  />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="电子邮箱: ">
                {getFieldDecorator('email', {
                  rules:[{
                    type: 'email',
                    required: true,
                    message: '请输入常用的电子邮箱'
                  }]
                })(
                  <Input
                    type="text"
                    className="input"
                    size="large"
                    placeholder="电子邮箱"
                  />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <FormItem label="所属影院: ">
                {getFieldDecorator('theater', {
                  rules:[{
                    required: true, message: '请选择您所属的影院'
                  }]
                })(
                  <Select
                    combobox
                    placeholder="请输入所属影院"
                    notFoundContent=""
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onChange={this.handleTheaterChange}
                    onSelect={this.handleTheaterSelect}
                  >
                    { TheaterOption }
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <FormItem>
            <Button type="primary" size="large" htmlType="submit" loading={this.props.loading} className="button" onClick={this.handleSubmit}>注 册</Button>
          </FormItem>
          <FormItem>
            <div style={{ textAlign: 'center' }}>
              <Link to="/cinemacloud/Login" style={{ fontSize: '15px' }}>已有账号? 点击登录</Link>
            </div>
          </FormItem>
        </Form>
      </div>
    )
  }
});

export default Form.create()(Regist)
