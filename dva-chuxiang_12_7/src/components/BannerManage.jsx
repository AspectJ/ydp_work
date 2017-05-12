import React from 'react'
import { Col, Row, Modal, Form, Upload, Button, Icon, Spin, Carousel, message } from 'antd'
import { baseUrl } from '../services/requests'

const confirm = Modal.confirm;
const FormItem = Form.Item;
const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 21, offset: 1 }
      };

let uploadNode = [];

let BannerManage = React.createClass({
  getInitialState(){
    return {
      loadList: true
    };
  },
  componentDidUpdate(){
    if( this.state.loadList ){
      const uploadProps  = {
        action: baseUrl + '/rest/image/newsThemeImgUpload',
        data: { oldImg: 'carousel' },
        accept: '.png,.gif,.jpeg,.jpg,.bmp',
        listType: 'picture',
        className: 'upload-list-inline',
        onChange: this.handleChange
      };

      uploadNode = (
        <div>
          <Carousel>
            <div><img src={this.props.list[0].org_path} alt={this.props.list[0].org_path} /></div>
            <div><img src={this.props.list[1].org_path} alt={this.props.list[1].org_path} /></div>
            <div><img src={this.props.list[2].org_path} alt={this.props.list[2].org_path} /></div>
            <div><img src={this.props.list[3].org_path} alt={this.props.list[3].org_path} /></div>
          </Carousel>
          <Form horizontal style={{marginTop: '50px', padding: '24px', background: '#fbfbfb', border: '1px solid #d9d9d9', borderRadius: '6px'}}>
            <Row>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="第一张"
                >
                  {this.props.form.getFieldDecorator('firstUrl', {
                    initialValue: this.props.list[0].org_path
                  })(
                    <Upload {...uploadProps} defaultFileList={[{uid: -1, name: '第一张图片', status: 'done', url: this.props.list[0].org_path, thumbUrl: this.props.list[0].org_path}]}>
                      <Button type="ghost" size="large">
                        <Icon type="upload" /> 上传
                      </Button>
                    </Upload>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="第二张"
                >
                  {this.props.form.getFieldDecorator('secondUrl', {
                    initialValue: this.props.list[1].org_path
                  })(
                    <Upload {...uploadProps} defaultFileList={[{uid: -2, name: '第二张图片', status: 'done', url: this.props.list[1].org_path, thumbUrl: this.props.list[1].org_path}]}>
                      <Button type="ghost" size="large" >
                        <Icon type="upload" /> 上传
                      </Button>
                    </Upload>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="第三张"
                >
                  {this.props.form.getFieldDecorator('thirdUrl', {
                    initialValue: this.props.list[2].org_path
                  })(
                    <Upload {...uploadProps} defaultFileList={[{uid: -3, name: '第三张图片', status: 'done', url: this.props.list[2].org_path, thumbUrl: this.props.list[2].org_path}]}>
                      <Button type="ghost" size="large">
                        <Icon type="upload" /> 上传
                      </Button>
                    </Upload>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="第四张"
                >
                  {this.props.form.getFieldDecorator('fourthUrl', {
                    initialValue: this.props.list[3].org_path
                  })(
                    <Upload {...uploadProps} defaultFileList={[{uid: -4, name: '第四张图片', status: 'done', url: this.props.list[3].org_path, thumbUrl: this.props.list[3].org_path}]}>
                      <Button type="ghost" size="large">
                        <Icon type="upload" /> 上传
                      </Button>
                    </Upload>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem wrapperCol={{span: 12, offset: 3}}>
                  <p className="">请保持图片的尺寸或比例相同，建议图片比例为 8:3</p>
                  <Button type="primary" onClick={this.handleSubmit} size="large">提 交</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      );

      this.setState({
        loadList:  false,
      });
    }
  },
  handleChange(info){
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 已上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败，请稍后再试`);
    }
  },
  handleSubmit(){
    const that = this,
          fileList = this.props.form.getFieldsValue();

    for (let i in fileList) {
      if( typeof(fileList[i]) === 'object' ){
        if( fileList[i].fileList.length > 1 ){
          return message.warning('每个位置只能选择一张图片', 3);
        } else if ( fileList[i].fileList.length < 1 ){
          return message.warning('每个位置必须上传一张图片', 3);
        }
      }
    }

    confirm({
      title: '提示',
      content: '确定替换成新图片吗?',
      onOk() {
        const params = {
          'firstUrl':  typeof(fileList.firstUrl)=== 'string'   ? fileList.firstUrl  : baseUrl + fileList.firstUrl.fileList[0].response.data.picUrl.replace(/\\/g, "/"),
          'secondUrl': typeof(fileList.secondUrl) === 'string' ? fileList.secondUrl : baseUrl + fileList.secondUrl.fileList[0].response.data.picUrl.replace(/\\/g, "/"),
          'thirdUrl':  typeof(fileList.thirdUrl)=== 'string'   ? fileList.thirdUrl  : baseUrl + fileList.thirdUrl.fileList[0].response.data.picUrl.replace(/\\/g, "/"),
          'fourthUrl': typeof(fileList.fourthUrl) === 'string' ? fileList.fourthUrl : baseUrl + fileList.fourthUrl.fileList[0].response.data.picUrl.replace(/\\/g, "/")
        };

        console.log(params);

        that.props.onSubmit(params);
      },
      onCancel() {},
    });
  },
  render(){
    return (
      <div>
        <h1 className="ContentHeader">轮播图管理</h1>
        { uploadNode }
      </div>
    )
  }
});

export default Form.create()(BannerManage)
