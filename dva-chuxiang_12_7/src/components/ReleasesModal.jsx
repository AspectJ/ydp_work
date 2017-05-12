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
let responseDocUrl = '',
    document_name = '',
    uploadThemeUrl = baseUrl + '/rest/image/uploadNoticeDocu';

let ReleasesModal = React.createClass({
  getInitialState(){
    return {
      html: this.props.item.noti_content || '请输入...',
    };
  },
  handleUpload(info){
    this.setState({
			html: this.refs.editor.getContent()
		});

    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功`);
      responseDocUrl = (info.file.response.data.noti_document_url).replace(/\\/g, "/");
      document_name = (info.file.response.data.doc_name);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  },
  handleFormChange(){
		this.setState({
			html: this.refs.editor.getContent()
		});
	},
  render(){
    const that = this,
          ModalOpts = {
      title: this.props.modalType === 'create' ? '新建通知' : this.props.modalType === 'update' ? '编辑通知' : '查看通知',
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
                fileList = that.props.form.getFieldValue('doc_name');

            if(typeof(fileList) === 'object' ){
              if( fileList.fileList.length > 1 ){
                return message.error('只能上传一份文档', 3);
              } else if( fileList.fileList.length === 0 ) {
                resultUrl      = '';
                responseDocUrl = '';
              } else {
				resultUrl = responseDocUrl ? (responseDocUrl) : '';
                responseDocUrl = '';
              }
            } else {
              resultUrl = !!fileList ? fileList : '';
            }

            if( !!!that.refs.editor.getContent() || that.refs.editor.getContent() === '请输入...' ){
              return message.warning("通知内容不能为空", 3);
            }

            console.log(resultUrl);
            if( that.props.modalType === 'create' ){
              that.props.onSubmit({
      					noti_title: values.noti_title,
      					noti_type: values.noti_type,
      					noti_status: values.noti_status,
      					noti_content: encodeURIComponent(that.refs.editor.getContent()),
      					noti_document_url: resultUrl,
      					adminid: sessionStorage.getItem('adminid'),
              });
            } else {
              that.props.onSubmit({
              	noti_id: that.props.item.noti_id,
      					noti_title: values.noti_title,
      					noti_type: values.noti_type,
      					noti_status: values.noti_status,
      					noti_content: encodeURIComponent(that.refs.editor.getContent()),
      					noti_document_url: resultUrl,
      					adminname: sessionStorage.getItem('adminname'),
      					doc_name: !!resultUrl ? document_name : '',
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
      data: {},
      accept: '.doc,.docx,.dot,.dotx,.wps,.wpt,.pdf,.DOC,.DOCX,.DOT,.DOTX,.WPS,.WPT,.PDF',
      listType: "text",
      onChange: this.handleUpload,
      defaultFileList: this.props.item.doc_name ? [{
        uid: -1,
        name: this.props.item.doc_name,
        status: 'done',
      }] : []
    };

    return (
      <Modal {...ModalOpts}>
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="通知标题"
          >
            {
              this.props.modalType === 'visit' ?
                <p className="ant-form-text">{this.props.item.noti_title}</p> :
                getFieldDecorator('noti_title', {
                  initialValue: this.props.item.noti_title,
                  rules: [
                    { required: true, message: '通知标题不能为空' },
                    { max: 40, message: '通知标题不能超过40个字' }
                  ]
                })(
                  <Input type="text" size="large" style={{ width: 450 }} placeholder="请输入通知标题" onChange={this.handleFormChange} />
                )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="通知状态"
          >
            {
              this.props.modalType === 'visit' ?
                <p className="ant-form-text">
                  {
                    this.props.item.noti_status === 0 ? '正式发布' :
                    this.props.item.noti_status === 1 ? '不可查阅' :
                    this.props.item.noti_status === 2 ? '草稿' : ''
                  }
                </p> :
                getFieldDecorator('noti_status', {
                  initialValue: !!this.props.item.noti_status ? this.props.item.noti_status : 0
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
            label="通知类别"
          >
            {
              this.props.modalType === 'visit' ?
                <p className="ant-form-text">
                  {
                    this.props.item.noti_type === 0 ? '发行通知' :
                    this.props.item.noti_type === 1 ? '院线通知' : ''
                  }
                </p> :
                getFieldDecorator('noti_type', {
                  initialValue: !!this.props.item.noti_type ? this.props.item.noti_type : 0
                })(
                  <RadioGroup size="large" onChange={this.handleFormChange}>
                    <RadioButton value={0}>发行通知</RadioButton>
                    <RadioButton value={1}>院线通知</RadioButton>
                  </RadioGroup>
                )
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="通知文档"
            extra="只能上传一份文档"
          >
            {
              this.props.modalType === 'visit' ?
                this.props.item.doc_name ? <p>{this.props.item.doc_name}</p> : <p style={{color: '#999'}}>该通知暂无相关文档</p> :
                getFieldDecorator('doc_name', {
                  initialValue: this.props.item.noti_document_url
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
            label="通知内容"
          >
            {
              this.props.modalType === 'visit' ?
                <div dangerouslySetInnerHTML={{__html: this.props.item.noti_content}}></div> :
                <Editor ref="editor" icons={icons} plugins={plugins} defaultValue={this.state.html} />
            }
          </FormItem>
        </Form>
      </Modal>
    );
  }
});

 export default Form.create()(ReleasesModal)
