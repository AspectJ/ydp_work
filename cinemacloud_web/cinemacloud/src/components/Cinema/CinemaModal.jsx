import React, { PropTypes } from 'react';
import { Col, Row, Form, Input, Modal, Cascader, Upload, Button, Icon, message } from 'antd';
import { baseUrl } from '../services/requests'

const FormItem = Form.Item;

// 图片上传后响应的路径
let responseUrl = '',
    uploadUrl = baseUrl + '/rest/image/newsThemeImgUpload';

let CinemaModal = ({
  
}) => {
  const modalOpts = {
    width: 600,
    title: modalType === "update" ? '编辑信息' : '添加影院',
    visible: modalVisible,
    cancelText: modalType === "visit" ? '关闭' : '取消',
    onOk: handleOk,
    onCancel(){
      responseUrl = '';
      onClose();
    },
  };

};

CinemaModal.propTypes = {
  modalVisible: PropTypes.bool,
  modalType: PropTypes.string,
  form: PropTypes.object,
  item: PropTypes.object,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};

export default Form.create()(CinemaModal)
