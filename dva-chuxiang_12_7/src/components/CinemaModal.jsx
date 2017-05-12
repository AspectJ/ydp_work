import React, { PropTypes } from 'react';
import { Col, Row, Form, Input, Modal, Cascader, Upload, Button, Icon, message } from 'antd';
import { baseUrl } from '../services/requests'

const FormItem = Form.Item;

// 图片上传后响应的路径
let responseUrl = '',
    uploadUrl = baseUrl + '/rest/image/newsThemeImgUpload';

let CinemaModal = ({
  item = {},
  modalVisible,
  modalType,
  areaInfo,
  onSubmit,
  onClose,
  form: { getFieldDecorator, validateFields, getFieldsValue, getFieldValue },
}) => {
  const modalOpts = {
    width: 600,
    title: modalType === "update" ? '编辑信息' : '添加影院',
    visible: modalVisible,
    maskClosable: false,
    onOk: handleOk,
    onCancel(){
      responseUrl = '';
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

  const uploadProps = {
    action: uploadUrl,
    data: { oldImg: "joincinema", flag: "joincinema" },
    accept: '.png,.gif,.jpeg,.jpg,.bmp',
    listType: "picture",
    onChange: handleUpload,
    defaultFileList: item.t_logo_url ? [{
      uid: -1,
      name: '当前影院Logo',
      status: 'done',
      url: item.t_logo_url,
      thumbUrl: item.t_logo_url
    }] : []
  }

  function isChangeable(){
    return modalType === 'visit' ?  true : false;
  }

  function handleUpload(info){
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功`);
      responseUrl = (info.file.response.data.picUrl).replace(/\\/g, "/");
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  }

  function handleOk(e){
    validateFields((error, values) => {
      if(error) return;

      // 判断上传图片是否修改
      let resultUrl,
          fileList = getFieldValue('t_logo_url');
      if(typeof(fileList) === 'object' ){
        if( fileList.fileList.length > 1 ){
          return message.error('只能上传一张图片', 3);
        } else if( fileList.fileList.length === 0 ) {
          resultUrl   = '';
          responseUrl = '';
        } else {
          resultUrl = responseUrl ? ('/cx' + responseUrl) : '';
          responseUrl = '';
        }
      } else {
        resultUrl = !!fileList ? fileList : '';
      }

      const params = {
        j_id: item.j_id | '',
        cinemaName: values.cinemaName,
        cinemaNumber: values.cinemaNumber,
        cinemaLinkMan: values.cinemaLinkMan,
        cinemaLinkMan_telphone: values.cinemaLinkMan_telphone,
        job: '',
        customer_phone: values.customer_phone,
        customer_qq: values.customer_qq,
        customer_email: values.customer_email,
        province: values.pcd[0],
        city: values.pcd[1],
        district: values.pcd[2],
        address: values.address,
        profile: values.profile ? values.profile : '' ,
        philosophy: values.philosophy ? values.philosophy : '',
        remark: values.remark ? values.remark : '',
        adminid: sessionStorage.getItem('adminid'),
        cinemaid: sessionStorage.getItem('cinemaid'),
        t_logo_url: resultUrl,
        area_number: values.pcd[2]
      }

      switch (modalType) {
        case 'create':
          onSubmit(params);
          break;
        case 'visit':
          onClose();
          break;
        case 'update':
          function checkChange(){
            if( values.cinemaName !== item.cinemaName ){
              return true;
            } else if ( values.cinemaNumber !== item.cinemaNumber ) {
              return true;
            } else if ( values.customer_qq !== item.customer_qq ) {
              return true;
            } else if ( values.customer_phone !== item.customer_phone ) {
              return true;
            } else if ( values.customer_email !== item.customer_email ) {
              return true;
            } else if ( values.cinemaLinkMan !== item.cinemaLinkMan ) {
              return true;
            } else if ( values.cinemaLinkMan_telphone !== item.cinemaLinkMan_telphone ) {
              return true;
            } else if ( values.district !== item.district ) {
              return true;
            } else if ( values.address !== item.address ) {
              return true;
            } else if ( values.profile !== item.profile ) {
              return true;
            } else if ( values.philosophy !== item.philosophy ) {
              return true;
            } else if ( values.remark !== item.remark ) {
              return true;
            } else if ( resultUrl !== item.t_logo_url ) {
              return true;
            } else {
              return false;
            }
          }

          checkChange() ? onSubmit(params) : message.warning('您尚未进行任何修改', 3);
          break;
        default:

      }
    });
  }

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <Row>
          <Col span={10}>
            <FormItem
              label="影院名称:"
              {...formItemLayout}
            >
              {getFieldDecorator('cinemaName', {
                initialValue: item.cinemaName,
                rules: [
                  { required: true, message: '影院名称不能为空' },
                  { max: 40, message: '影院名称不能超过40个字' }
                ],
              })(
                <Input disabled={isChangeable()} type="text" placeholder="请输入影院名称" />
              )}
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem
              label="影院编号:"
                {...formItemLayout}
              >
                {getFieldDecorator('cinemaNumber', {
                  initialValue: item.cinemaNumber,
                  rules: [
                    { required: true, message: '影院编号不能为空' },
                  ],
                })(
                  <Input disabled={isChangeable()} type="text" placeholder="请输入影院编号" />
                )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <FormItem
              label="客服QQ:"
              {...formItemLayout}
            >
              {getFieldDecorator('customer_qq', {
                initialValue: item.customer_qq,
                rules: [
                  { required: true, message: '客服QQ不能为空' },
                ],
              })(
                <Input disabled={isChangeable()} type="text" placeholder="请输入客服QQ" />
              )}
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem
              label="客服电话:"
              {...formItemLayout}
            >
              {getFieldDecorator('customer_phone', {
                initialValue: item.customer_phone,
                rules: [
                  { required: true, message: '客服电话不能为空' },
                ],
              })(
                <Input disabled={isChangeable()} type="text" placeholder="请输入客服电话" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <FormItem
              label="客服邮箱:"
              {...formItemLayout}
            >
              {getFieldDecorator('customer_email', {
                initialValue: item.customer_email,
                rules: [
                  { required: true, message: '客服邮箱不能为空' },
                  { type: 'email', message: '请输入正确的格式' },
                ],
              })(
                <Input disabled={isChangeable()} type="text" placeholder="请输入客服邮箱" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <FormItem
              label="联系人员:"
              {...formItemLayout}
            >
              {getFieldDecorator('cinemaLinkMan', {
                initialValue: item.cinemaLinkMan,
                rules: [
                  { required: true, message: '联系人员不能为空' },
                ],
              })(
                <Input disabled={isChangeable()} type="text" placeholder="请输入影院联系人员" />
              )}
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem
              label="联系电话:"
              {...formItemLayout}
            >
              {getFieldDecorator('cinemaLinkMan_telphone', {
                initialValue: item.cinemaLinkMan_telphone,
                rules: [
                  { required: true, message: '联系电话不能为空' },
                ],
              })(
                <Input disabled={isChangeable()} type="text" placeholder="请输入影院联系电话" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={20}>
            <FormItem
              label="影院地址:"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator('pcd', {
                initialValue: item.province ? [item.province, item.city, item.district] : '',
                rules: [
                  { type: 'array', required: true, message: '请选择影院地址' }
                ]
              })(
                <Cascader options={areaInfo} disabled={isChangeable()} style={isChangeable() ? {background: '#f7f7f7', color: '#ccc'} : {}} placeholder="请输入影院地址" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={20}>
            <FormItem
              label="详细地址:"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 18 }}
            >
              {getFieldDecorator('address', {
                initialValue: item.address,
                rules: [
                  { required: true, message: '影院详细地址不能为空' },
                ],
              })(
                <Input disabled={isChangeable()} type="text" placeholder="请输入影院的详细地址" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={20}>
            <FormItem
              label="公司简介:"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 18 }}
            >
              {getFieldDecorator('profile', {
                initialValue: item.profile
              })(
                <Input disabled={isChangeable()} type="textarea" placeholder="请输入公司简介" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={20}>
            <FormItem
              label="公司理念:"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 18 }}
            >
              {getFieldDecorator('philosophy', {
                initialValue: item.philosophy
              })(
                <Input disabled={isChangeable()} type="textarea" placeholder="请输入公司理念" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={20}>
            <FormItem
              label="备注信息:"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 18 }}
            >
              {getFieldDecorator('remark', {
                initialValue: item.remark
              })(
                <Input disabled={isChangeable()} type="textarea" placeholder="备注信息" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={20}>
            <FormItem
              label="影城Logo:"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 18 }}
              extra="只能上传一张图片，建议图片比例为16:9"
            >
              {
                isChangeable() ?
                  item.t_logo_url ? <img src={item.t_logo_url} alt="影视Logo" style={{display: 'block', maxWidth: '355px'}} /> : <p style={{color: '#999'}}>该影院暂无Logo</p> :
                  getFieldDecorator('t_logo_url', {
                    initialValue: item.t_logo_url
                  })(
                    <Upload {...uploadProps} className="upload-list-inline">
                      <Button type="ghost">
                        <Icon type="upload" /> 点击上传
                      </Button>
                    </Upload>
                  )
              }
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
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
