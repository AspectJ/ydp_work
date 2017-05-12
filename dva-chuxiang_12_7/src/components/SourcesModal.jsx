import React from 'react'
import { Modal, Form, Input, message } from 'antd'

const FormItem = Form.Item;

let SourcesModal = ({
  item = {},
  modalType,
  modalVisible,
  onSubmit,
  onClose,
  form: { getFieldDecorator, validateFields }
}) => {
  const ModalOpts = {
    width: 600,
    title: modalType === "update" ? '编辑素材' : '添加素材',
    visible: modalVisible,
    maskClosable: false,
    onOk: handleOk,
    onCancel(){
      onClose();
    }
  };

  function handleOk(e){
    validateFields((err, values) => {
      if(err) return;

      let params;
      switch (modalType) {
        case 'create':
          params = {
            material_name : values.material_name,
            material_content:values.material_content,
            adminid:sessionStorage.getItem('adminid'),
		        cinemaid:sessionStorage.getItem('cinemaid')
          }

          onSubmit(params);
          break;
        case 'update':
          if( item.material_name === values.material_name && item.material_content === values.material_content ){
            return message.warning('您尚未做出任何修改', 3);
          }

          params = {
            material_id:item.material_id,
            material_name:values.material_name,
            material_content:values.material_content,
            adminid: sessionStorage.getItem('adminid')
          };

          onSubmit(params);
          break;
        default:
          onClose();
      }
    });
  }

  return (
    <Modal {...ModalOpts}>
      <Form horizontal>
        <FormItem
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 10 }}
          label="素材标题:"
          hasFeedback
        >
          {
            modalType === "visit" ?
              <p className="ant-form-text">{item.material_name}</p> :
              getFieldDecorator('material_name', {
                initialValue: item.material_name,
                rules: [
                  { required: true, message: '素材标题不能为空' },
                  { max: 40, message: '素材标题不能超过40个字' }
                ],
              })(
                <Input disabled={modalType === "visit" ? true : false} type="text" placeholder="请输入素材标题" />
              )
          }
        </FormItem>
        <FormItem
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          label="素材内容:"
          hasFeedback
        >
          {
            modalType === "visit" ?
              <p className="ant-form-text">{item.material_content}</p> :
              getFieldDecorator('material_content', {
                initialValue: item.material_content,
                rules: [
                  { required: true, message: '素材内容不能为空' },
                ],
              })(
                <Input type="textarea" placeholder="请输入素材内容" />
              )
          }
        </FormItem>
      </Form>
    </Modal>
  );
};

 export default Form.create()(SourcesModal)
