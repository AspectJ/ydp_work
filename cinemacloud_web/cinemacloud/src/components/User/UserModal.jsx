import React from 'react'
import { Modal, Form, Select, Icon } from 'antd'

const FormItem = Form.Item,
      Option = Select.Option;

const UserModal = ({
  modalItem,
  modalVisible,
  dropdownItem,
  queryRoleDropdown,
  onOk,
  onCancel,
  form: { getFieldDecorator, resetFields, validateFields }
}) => {
  const ModalProps = {
    title: '确认审核',
    visible: modalVisible,
    onOk(){
      validateFields((err, values) => {
        if (!err) {
          const params = {
            userid: modalItem.userid,
            audit_flag: modalItem.audit_flag
          };

          if( modalItem.audit_flag === 0 ){
            params.roleid = values.roleid
          }

          onOk(params);
        }
      });
    },
    onCancel(){
      resetFields();
      onCancel();
    }
  };

  function handleFocus(){
    queryRoleDropdown({
      roletype: modalItem.roletype
    });
  }

  function buildOptions(){
    let dropdown = [];
    Array.isArray( dropdownItem.role) ?
    dropdownItem.role.length ?
    dropdownItem.role.map(role => {
        dropdown.push(<Option key={role.roleid}>{role.rolename}</Option>);
    }) :
    dropdown.push(<Option key="theater_loading" disabled>加载中...<Icon type="loading" style={{ float: 'right', lineHeight: '18px' }} /></Option>) : dropdown.push(<Option key="theater_loading" disabled>加载中...<Icon type="loading" style={{ float: 'right', lineHeight: '18px' }} /></Option>);

    return dropdown;
  }

  const layoutProps = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }

  return (
    <Modal {...ModalProps}>
      <Form>
        <FormItem
          label="用户名"
          {...layoutProps}
        >
          <div>{modalItem ? modalItem.username : ''}</div>
        </FormItem>
        <FormItem
          label="真实姓名"
          {...layoutProps}
        >
          <div>{modalItem ? modalItem.realname : ''}</div>
        </FormItem>
        <FormItem
          label="联系方式"
          {...layoutProps}
        >
          <div>{modalItem ? modalItem.mobile : ''}</div>
        </FormItem>
        <FormItem
          label="角色类型"
          {...layoutProps}
        >
          {getFieldDecorator('roleid', {
            rules: [{ required: true, message: '请选择角色类型' }]
          })(
            <Select size="large" placeholder="选择角色类型" style={{width: '100%'}} onFocus={handleFocus}>
              { buildOptions() }
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
}

export default Form.create()(UserModal)
