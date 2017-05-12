import React from 'react'
import { Modal, Form, Input, Select, Icon } from 'antd'

const FormItem = Form.Item,
      Option   = Select.Option;

// item,
// modalType,
// visible,
// loading,
// dropdownItem,
// onOk,
// onCancel,
const RoleAlter = React.createClass({
  getInitialState(){
    return {
      roletype: ''
    }
  },
  // 选择角色类型
	handleChange(value){
	  this.setState({
			roletype: value,
	  });

	  this.props.form.resetFields(['theater']);
	},
  // 角色类型下拉框
	buildRoleType(){
	  const roletype = JSON.parse(sessionStorage.getItem('user')).roletype,
	    	  typeList = ['系统角色', '院线角色', '角色设置'];
  
	  let RoleType = [];
	  for( let i = parseInt(roletype); i < typeList.length; i++ ){
		  RoleType.push(<Option key={i}>{typeList[i]}</Option>);
	  }  

	  return RoleType;
  },
  render(){
    const _this = this;
    const ModalProps = {
      visible: _this.props.visible,
      title: _this.props.modalType === 'create' ? '添加角色' : '修改角色',
      wrapClassName: "vertical-center-modal",
      confirmLoading: _this.props.loading,
      onOk(){
        validateFields((err, values) => {
          if(!err){
            if( _this.props.modalType === 'create' ){
              const params = {
                rolename: encodeURIComponent(values.rolename),
                roletype: values.roletype,
              };

              if( values.roletype === '1' ){
                params.theaterchainid = values.theater
              } else if ( values.roletype === '2' ) {
                params.theaterid = values.theater
              }

              _this.props.onOk(params);
            } else {
              if( _this.props.item.rolename !== values.rolename ) {
                const params = {
                  roleid:   _this.props.item.roleid,
                  rolename: values.rolename
                };

                _this.props.onOk(params);
              } else {
                resetFields();
                _this.props.onCancel();
              }
            }
          }
        });
      },
      onCancel(){
        resetFields();
        _this.props.onCancel();
      }
    };


    const FormItemLayout = {
      labelCol: { span: 5 }
    };
    const { getFieldDecorator, validateFields, resetFields } = this.props.form;
    return (
      <Modal {...ModalProps}>
        <Form>
          <FormItem
            label="角色名称"
            wrapperCol={{span: 8}}
            {...FormItemLayout}
          >
            {
              getFieldDecorator('rolename', {
                initialValue: this.props.item ? this.props.item.rolename: '',
                rules: [{ required: true, message: '角色名称不能为空' }]
              })(
                <Input placeholder="输入角色名称" />
              )
            }
          </FormItem>
          {
            this.props.modalType === 'create' ?
              <FormItem
                label="角色类型"
                wrapperCol={{span: 8}}
                {...FormItemLayout}
              >
                {
                  getFieldDecorator('roletype', {
                    rules: [{ required: true, message: '角色类型不能为空' }],
                  })(
                    <Select placeholder="选择角色类型" onChange={this.handleChange}>
                      { this.buildRoleType() }
                    </Select>
                  )
                }
              </FormItem> : ''
          }
        </Form>
      </Modal>
    );
  }
});

export default Form.create()(RoleAlter)
