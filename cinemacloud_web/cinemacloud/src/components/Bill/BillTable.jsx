import React, { Component } from 'react'
import { Table, Form, Input, Button, Select, DatePicker, Upload, Icon, Modal, message, Popconfirm } from 'antd'
import { baseUrl } from '../../services/requests'

const { RangePicker } = DatePicker;
const Option = Select.Option;

class BillTable extends Component {
  constructor(props){
    super(props);
  }

  // 提交搜索数据
  handleSubmit = () => {
    const rangeValue = this.props.form.getFieldValue('BillDate');
    const values = {
      theatername: this.props.form.getFieldValue('theatername') || '',
      theaternum:  this.props.form.getFieldValue('theaternum') || '',
      Bill:        this.props.form.getFieldValue('Bill') || '',
			status:      this.props.form.getFieldValue('status') || '',
      s_time:      rangeValue ? rangeValue[0].format('YYYY-MM-DD') : '',
      e_time:      rangeValue ? rangeValue[1].format('YYYY-MM-DD') : ''
    };

    this.props.handleSearch(values);
  }

  // 重置表单
  handleReset = () => {
    this.props.form.resetFields();
  }

  // 发送消息
  sendMsg = (record) => {
    this.props.sendMsg(record);
  }

  // 确认收货
	receipt = (record) => {
		this.props.handleReceipt({
			status: 2,
			billid: record.billid
		});
	}

  handInfoPageChange = (params) => {
    const newParams = {
      page:       params.current,
      current:    params.current,
      pagesize:   10,
      billconfid: this.props.billconfid
    }
    
    const rangeValue = this.props.form.getFieldValue('BillDate');
    const newValues = {
      theatername: this.props.form.getFieldValue('theatername') || '',
      theaternum:  this.props.form.getFieldValue('theaternum') || '',
      Bill:        this.props.form.getFieldValue('Bill') || '',
			status:      this.props.form.getFieldValue('status') || '',
      s_time:      this.rangeValue ? rangeValue[0].format('YYYY-MM-DD') : '',
      e_time:      this.rangeValue ? rangeValue[1].format('YYYY-MM-DD') : ''
    };

    this.props.pageOnchange(newParams, newValues);
  }

  render(){
    const { getFieldDecorator } = this.props.form;

    const pagination = {
      total:   this.props.contentTotal,
      current: this.props.contentCurrent
    };

    const _this = this;
    const uploadProps = {
      accept: '.xls,.xltm,.xlsx,.xlam',
      showUploadList: false,
      withCredentials: true,
      onChange(info) {
        if(info.file.status === 'uploading'){
          const hide = message.loading('表格正在上传，请稍后', 0);
          setTimeout(hide, 3000);
        }
        
        if (info.file.status === 'done') {
          if(info.file.response.msg === 'Success'){
            _this.props.updateBillLink(info.file.response.data);
            message.success(`${info.file.name} 上传成功`, 3);
          }
          if(info.file.response.msg === '缺少参数'){
            message.error(`${info.file.name} 上传失败, 缺少参数`, 3);
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败, 服务器异常!.`, 3);
        }
      }
    };

    const roletype = JSON.parse(sessionStorage.getItem('user')).roletype;
    const columns = [{
      title:'影院编码',
      dataIndex:'theaternum',
      key:'theaternum',
      className:'columnTextCenter',
    }, {
      title:'影院名称',
      dataIndex:'theatername',
      key:'theatername',
      className:'columnTextCenter',
    }, {
      title:'账单状态',
      dataIndex:'status',
      key:'status',
      className:'columnTextCenter',
      render:(text) => {
        if(text === 0){
          return <div>影院待上传</div>
        } else if(text === 1) {
          return <div>影院已上传</div>
        } else if(text === 2) {
          return <div>院线已核验</div>
        }
      }
    }, {
      title:'操作',
      dataIndex:'operation',
      key:'',
      className:'columnTextCenter',
      render:(text, record, index) => {
        return (
          <div>
            {
              record.status === 0 ?
                roletype === 1 ?
                  <a onClick={() => this.sendMsg(record)}>发送通知</a> :
                  roletype === 2 ?
                    <Upload action={baseUrl + '/rest/bill/uploadBill?billid=' + record.billid} {...uploadProps}>
                      <a>上传附件</a>
                    </Upload> :
                    <span>待上传</span> :
                record.status === 1 ?
                  roletype === 1 ?
                    <div>
                      <a href={baseUrl + record.filename} style={{marginRight: '10px'}}>下载附件</a>
                      <Popconfirm title={'确定账单已核验?'} onConfirm={() => this.receipt(record)}><a>确认核验</a></Popconfirm>
                    </div> :
                  roletype === 2 ?
                    <div>
                      <a href={baseUrl + record.filename} style={{marginRight: '10px'}}>下载附件</a>
                      <Upload action={baseUrl + '/rest/bill/uploadBill?billid=' + record.billid} {...uploadProps}>
                        <a>重新上传</a>
                      </Upload>
                    </div> :
                    <a href={baseUrl + record.filename} style={{marginRight: '10px'}}>下载附件</a> :
                  record.status === 2 ? <a href={baseUrl + record.filename}>下载附件</a> : ''
            }
          </div>
        )
      }
    }];
    
    return (
      <div className="ContentBody">
        {
          !this.props.loading ?
            <Form layout="inline" className="SearchWrapper" style={{marginLeft:'20px'}}>
              {
                roletype !== 2 ?
                  <Form.Item>
                    {
                      getFieldDecorator('theatername')(
                        <Input placeholder="输入影院编号或者名称" type="text"/>
                      )
                    }
                  </Form.Item> : ''
              }
              {
                roletype !== 2 ?
                  <Form.Item>
                    {
                      getFieldDecorator('theaternum')(
                        <Input placeholder="输入影院编码" type="text"/>
                      )
                    }
                  </Form.Item> : ''
              }
              <Form.Item>
                {
                  getFieldDecorator('status')(
                    <Select placeholder="选择通知状态" style={{width: 160}}>
                      <Option key="0">待上传</Option>
                      <Option key="1">已上传</Option>
                      <Option key="2">已核验</Option>
                    </Select>
                  )
                }
              </Form.Item>
              <Form.Item>
                {
                  getFieldDecorator('BillDate')(
                    <RangePicker format='YYYY/MM/DD' />
                  )
                }
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={this.handleSubmit}>查询</Button>
                <Button style={{marginLeft: '10px'}} onClick={this.handleReset}>重置</Button>
              </Form.Item>
            </Form> : ''
        }
        <Table
          columns={columns}
          dataSource={this.props.contentItem}
          loading={this.props.loading}
          pagination={pagination}
          onChange={current => this.handInfoPageChange(current)}
          rowKey={this.props.rowkey}
        />
      </div>
    )
  }
}

export default Form.create()(BillTable)
