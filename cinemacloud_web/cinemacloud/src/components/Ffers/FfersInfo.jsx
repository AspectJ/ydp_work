
import React, { Component } from 'react'
import { Table, Form, Input, Button, Row, Col, DatePicker, Upload, Icon, Modal, message, Popover, Popconfirm } from 'antd'
import FfersAlter from './FfersAlter'
import FfersTable from './FfersTable'
import auth from '../../utils/auth'
import { baseUrl } from '../../services/requests'

const confirm = Modal.confirm;

class FfersInfo extends Component {
  constructor(props){
    super(props);
  }
  //显示确认对话框
  showConfirm(num, idsProps){
    const _this = this;
    const confirmProps = {
      title:'确认提交此EXCEL表格吗？',
      content:`Excel中一共包含${num}条数据...`,
      cancelText:'取消提交',
      okText:'确认提交',
      onOk(){
        _this.props.switchTotal(_this.props.ffersconfid,_this.props.ffersconfname);
      },
      onCancel(){
        _this.props.handleCancelSubmit(idsProps.toString());
      }
    };
    confirm({...confirmProps})
  }

  render() {
    const FfersTableProps = {...this.props};
    const FfersCreateProps = {...this.props};
    const FfersUpdateProps = {...this.props};
    //批量上传所用id
    const ffersconfid = this.props.ffersconfid;
    //批量上传
    const _this = this;
    const uploadProps = {
      name: 'file',
      accept:'.xls,.xltm,.xlsx,.xlam',
      showUploadList:false,
      withCredentials:true,
      onChange(info) {
        if(info.file.status === 'uploading'){
          const hide = message.loading('表格正在上传，请稍后', 0);
          setTimeout(hide, 3000);
        }

        if (info.file.status === 'done') {

          if(info.file.response.msg === 'Success'){
            message.success(`${info.file.name} 上传成功！`,2);
            _this.showConfirm(info.file.response.data.num,info.file.response.data.ids);
          }

          if(info.file.response.msg === '缺少参数'){
            message.error(`${info.file.name} 上传失败！缺少参数！`,2);
          }

        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败！请重新上传！.`,2);
        }
      },
    };

    const isCinema = () => {
      return JSON.parse(sessionStorage.getItem('user')).roletype === 2;
    };

    return (
      <div  className="Content" style={isCinema() ? {width: '100%', left: '0'} : {}}>
        <h1 className="ContentHeader">
          {this.props.ffersconfname ? this.props.ffersconfname+' --' : ''} 回盘通知列表
          {
            auth([56]).length && this.props.multiUploadBtn ? (
                <div className="headerUploadBtn">
                  <Popover content={
                    <Table
                      showHeader={false}
                      pagination={false}
                      rowKey={record => record.templateid}
                      dataSource={this.props.dropdownItem.template}
                      columns={[{
                        key: 'templateid',
                        dataIndex: 'templateid',
                        render: (text, record) => (
                          <Upload
                            action={baseUrl + '/rest/ffers/uploadFfers?ffersconfid=' + ffersconfid + '&templateid=' + text}
                            {...uploadProps}
                          >
                            <a>{record.name}</a>
                          </Upload>
                        )
                      }]} />
                  } title="选择模板" placement="bottomRight" trigger="click" overlayClassName="padding-none">
                    <Button onClick={() => this.props.ExcelTemplate()}><Icon type='upload' /> 批量上传</Button>
                  </Popover>
                </div>
              ) : ''
          }
          {
            this.props.singleUploadBtn ? (
                <div className="headerSingleBtn">
                  <Button onClick={() => {this.props.switchSingleUpload()}}>单个添加</Button>
                </div>
              ) : ''
          }
        </h1>
        <div className="ContentBody">
          {
            this.props.contentType === 'total' ? (
                <FfersTable {...FfersTableProps} />
              ) : this.props.contentType === 'create' ? (
                  <FfersAlter {...FfersCreateProps} />
                ) : this.props.contentType === 'update' ? (
                    <FfersAlter {...FfersUpdateProps} />
                  ) : ''
          }
        </div>
      </div>
    )
  }
}

export default Form.create()(FfersInfo);

