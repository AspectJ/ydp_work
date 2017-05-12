import React from 'react'
import { Modal, Form, Input, Radio, Upload, Icon, Button, message } from 'antd'
import { baseUrl } from '../services/requests'

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

// umeditor
import Editor from 'react-umeditor'
const icons = [
  "bold italic underline strikethrough fontborder emphasis | ",
  "paragraph fontfamily fontsize | superscript subscript | ",
  "forecolor backcolor |",
  "cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
  "horizontal date time  | image spechars | inserttable"
];
const plugins = {
  image: {
  	uploader: {
			url: baseUrl + '/rest/image/uploadContentImage',
			name: "file",
			request: "relativePath"
    }
  }
};


// 图片上传后响应的路径
let responseThemeUrl = '',
    uploadThemeUrl = baseUrl + '/rest/image/newsThemeImgUpload';

let NewsModal = React.createClass({
  getInitialState(){
    return {
      html: this.props.item.news_content || '请输入...'
    };
  },
  handleFormChange(){
    this.setState({
      html: this.refs.editor.getContent()
    });
  },
  handleUpload(info){
    this.setState({
      html: this.refs.editor.getContent()
    })

    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功`);
      responseThemeUrl = (info.file.response.data.picUrl).replace(/\\/g, "/");
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  },
  render(){
    const that = this,
          ModalOpts = {
      title: this.props.modalType === 'create' ? '新建资讯' : '编辑资讯',
      visible: this.props.modalVisible,
      maskClosable: false,
      width: '800px',
      wrapClassName: "rightModal",
      onOk(){
        if( that.props.modalType === 'visit' ){
          return that.props.onClose();
        } else {
          // 富文本BUG 需要先保存至state中
          that.setState({
      			html: that.refs.editor.getContent()
      		});

          that.props.form.validateFields((err, values) => {
            if(err) return;

            let resultUrl = '',
                fileList = that.props.form.getFieldValue('org_path');

            if(typeof(fileList) === 'object' ){
              if( fileList.fileList.length > 1 ){
                return message.error('只能上传一张图片', 3);
              } else if( fileList.fileList.length === 0 ) {
                resultUrl   = '';
                responseThemeUrl = '';
              } else {
                resultUrl = responseThemeUrl ? '/cx' + responseThemeUrl : '';
                responseThemeUrl = '';
              }
            } else {
              resultUrl = !!fileList ? fileList : '';
            }

            if( !!!that.state.html || that.refs.editor.getContent() === '请输入...' ){
              return message.warning("资讯内容不能为空", 3);
            }

            if( that.props.modalType === 'create' ){
              that.props.onSubmit({
                cinemaid: sessionStorage.getItem('cinemaid'),
          			news_title: values.news_title,
          			news_status: values.news_status,
          			news_type: values.news_type,
          			news_img: resultUrl,
          			news_content: encodeURIComponent(that.refs.editor.getContent()),
          			author: sessionStorage.getItem("adminname")
              });
            } else {
              that.props.onSubmit({
                news_id: that.props.item.news_id,
          			news_title: values.news_title,
          			news_status: values.news_status,
          			news_type: values.news_type,
          			org_path: resultUrl,
          			news_content: encodeURIComponent(that.refs.editor.getContent()),
          			image_change: 0,
          			imageid: that.props.item.news_img,
          			adminid: sessionStorage.getItem('adminid'),
              });
            }
          });
        }
      },
      onCancel(){
        that.props.onClose();
      }
    };

    const { getFieldDecorator, validateFields } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 20 }
    };

    const uploadProps = {
      action: uploadThemeUrl,
      data: { oldImg: "newsinfo" },
      accept: ".png,.gif,.jpeg,.jpg,.bmp",
      listType: "picture",
      onChange: this.handleUpload,
      defaultFileList: this.props.item.org_path ? [{
        uid: -1,
        name: '当前主题图',
        status: 'done',
        url: this.props.item.org_path,
        thumbUrl: this.props.item.org_path
      }] : []
    }

    return (
      <Modal {...ModalOpts}>
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="资讯标题"
          >
            {
              this.props.modalType === 'visit' ?
                <p className="ant-form-text">{this.props.item.news_title}</p> :
                getFieldDecorator('news_title', {
                  initialValue: this.props.item.news_title,
                  rules: [
                    { required: true, message: '资讯标题不能为空' },
                    { max: 40, message: '资讯标题不能超过40个字' }
                  ]
                })(
                  <Input type="text" size="large" style={{ width: 450 }} onChange={this.handleFormChange} placeholder="请输入资讯标题" />
                )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="资讯状态"
          >
            {
              this.props.modalType === 'visit' ?
                <p className="ant-form-text">
                  {
                    this.props.item.news_status === 0 ? '正式发布' :
                    this.props.item.news_status === 1 ? '不可查阅' :
                    this.props.item.news_status === 2 ? '草稿' : ''
                  }
                </p> :
                getFieldDecorator('news_status', {
                  initialValue: !!this.props.item.news_status ? this.props.item.news_status : 0
                })(
                  <RadioGroup size="large" onChange={this.handleFormChange}>
                    <RadioButton value={0}>正式发布</RadioButton>
                    <RadioButton value={1}>不可查阅</RadioButton>
                    <RadioButton value={2}>草稿</RadioButton>
                  </RadioGroup>
                )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="资讯类别"
          >
            {
              this.props.modalType === 'visit' ?
                <p className="ant-form-text">
                  {
                    this.props.item.news_status === 0 ? '电影政策' :
                    this.props.item.news_status === 1 ? '行业资讯' :
                    this.props.item.news_status === 2 ? '院线资讯' :
                    this.props.item.news_status === 3 ? '楚湘动态' : ''
                  }
                </p> :
                getFieldDecorator('news_type', {
                  initialValue: !!this.props.item.news_type ? this.props.item.news_type : 0
                })(
                  <RadioGroup size="large" onChange={this.handleFormChange}>
                    <RadioButton value={0}>电影政策</RadioButton>
                    <RadioButton value={1}>行业资讯</RadioButton>
                    <RadioButton value={2}>院线资讯</RadioButton>
                    <RadioButton value={3}>楚湘动态</RadioButton>
                  </RadioGroup>
                )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="封面图片"
            extra="只能上传一张图片，建议图片比例 16:9"
          >
            {
              this.props.modalType === 'visit' ?
                this.props.item.org_path ? <img className="ThemePic" src={this.props.item.org_path} alt="主题照片"/> : <p style={{color: '#999'}}>该资讯暂无主题照片</p> :
                getFieldDecorator('org_path', {
                  initialValue: this.props.item.org_path
                })(
                  <Upload {...uploadProps} className="upload-list-inline">
                    <Button type="ghost">
                      <Icon type="upload" /> 点击上传
                    </Button>
                  </Upload>
                )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="资讯内容"
          >
            {
              this.props.modalType === 'visit' ?
                <div dangerouslySetInnerHTML={{__html: this.props.item.news_content}}></div> :
                <Editor ref="editor" icons={icons} plugins={plugins} defaultValue={this.state.html} />
            }
          </FormItem>
        </Form>
      </Modal>
    );
  }
});

 export default Form.create()(NewsModal)
