import React from 'react'
import { Form, Input, Select, Spin, Icon, Button, Radio, DatePicker  } from 'antd'
import CinemaSelect from '../CinemaSelect'
import Editor from 'react-umeditor'
import { picUploadUrl } from '../../services/requests'

const FormItem = Form.Item;
const Option   = Select.Option;
const { RangePicker } = DatePicker;

const ActivityAlter = React.createClass({
  getInitialState(){
    return {
      content: this.props.contentItem ? this.props.contentItem.content : ''
    }
  },
  getValue(e, list){
    this.props.form.setFieldsValue({
      theaterids: list
    });
  },
  handleChange(){
    if( this.refs.editor ){
      this.setState({
        content: this.refs.editor.getContent()
      });

      this.props.form.setFieldsValue({
        content: this.refs.editor.getContent()
      });
    }
  },
  handleSubmit(){
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.props.onOk({
          title:      encodeURIComponent(values.title),
          content:    encodeURIComponent(values.content),
          starttime:  values.time ? values.time[0].format('YYYY-MM-DD') : '',
          endtime:    values.time ? values.time[1].format('YYYY-MM-DD') : '',
          type:       values.type,
          roleids:    values.roleids.join(","),
          theaterids: values.theaterids
        });
      }
    });
  },
  render(){
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 },
    };

    const icons = [
      "source | undo redo | bold italic underline strikethrough fontborder emphasis | ",
      "paragraph fontfamily fontsize | superscript subscript | ",
      "forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
      "cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
      "horizontal date time  | image emotion spechars | inserttable"
    ];

    const plugins = () => {
      return {
        image: {
          uploader: {
            name: "file",
            url: picUploadUrl,
          }
        }
      };
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <div className="Content">
        <h1 className="ContentHeader">添加活动通知</h1>
        <div className="ContentBody">
          <Spin spinning={this.props.loading}>
            <Form style={{marginTop: '40px'}}>
              <FormItem
                {...formItemLayout}
                label="通知名称"
              >
                {
                  getFieldDecorator('title',{
                    initialValue: this.props.contentItem ? this.props.contentItem.billconfname : '',
                    rules:[{
                      required:true, message:'请输入通知名称'
                    }]
                  })(
                    <Input style={{width: '280px'}} placeholder="请输入通知名称"/>
                  )
                }
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="角色设置"
              >
                {
                  getFieldDecorator('roleids',{
                    rules:[{
                      required:true,message:'请选择角色设置'
                    }]
                  })(
                    <Select multiple placeholder="请选择角色设置" style={{width: 400}}>
                      {
                        this.props.dropdownItem.role.length ?
                          this.props.dropdownItem.role.map(role => {
                            return <Option key={role.roleid}>{role.rolename}</Option>
                          }) :
                          <Option key="Role_Empty" disabled>加载中... <Icon type="loading" style={{float: 'right', lineHeight: '18px'}} /></Option>
                      }
                    </Select>
                  )
                }
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="通知类型"
              >
                {
                  getFieldDecorator('type',{
                    initialValue: "0",
                    rules:[{
                      required:true,message:'请选择是否需要回执'
                    }]
                  })(
                    <Radio.Group>
                      <Radio.Button value="0">普通文本</Radio.Button>
                      <Radio.Button value="1">回执文本</Radio.Button>
                    </Radio.Group>
                  )
                }
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="活动时间"
              >
                {
                  getFieldDecorator('time',{
                  })(
                    <RangePicker format="YYYY-MM-DD" />
                  )
                }
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="选择影院"
              >
                {
                  getFieldDecorator('theaterids', {
                    rules: [{ required: true, message: "请选择所属影院" }]
                  })(
                    <Input style={{display: 'none'}} />
                  )
                }
                <CinemaSelect list={this.props.dropdownItem.cinema} setValue={this.getValue.bind(null, this)} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="通知内容"
              >
                {
                  getFieldDecorator('content', {
                    rules: [{ required: true, message: "通知内容不能为空" }]
                  })(
                    <Input style={{display: 'none'}} />
                  )
                }
                <Editor ref="editor" icons={icons} value={this.state.content} defaultValue="" plugins={plugins()} onChange={this.handleChange} style={{width: '100%'}} />
              </FormItem>
              <FormItem wrapperCol={{ span: 12, offset: 2 }}>
                <Button type="primary" style={{marginRight: '30px'}} onClick={this.handleSubmit}>提 交</Button>
              </FormItem>
            </Form>
          </Spin>
        </div>
      </div>
    );
  }
});

export default Form.create()(ActivityAlter)