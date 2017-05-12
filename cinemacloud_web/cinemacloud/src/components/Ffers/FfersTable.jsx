import React, { Component } from 'react';
import { Table, Form, Input, Button, Select, DatePicker, Upload, Icon, Modal, message, Popconfirm } from 'antd';

const { RangePicker } = DatePicker;
const Option = Select.Option;

class FfersTable extends Component {
  constructor(props) {
    super(props);
  }

  //提交搜索数据
  handleSubmit = () => {
    const rangeValue = this.props.form.getFieldValue('FfersDate');
    const values = {
      theatername: this.props.form.getFieldValue('theatername') || '',
      theaternum:  this.props.form.getFieldValue('theaternum') || '',
      moviename:   this.props.form.getFieldValue('moviename') || '',
			status:      this.props.form.getFieldValue('status') || '',
      s_time:      rangeValue ? rangeValue[0].format('YYYY-MM-DD') : '',
      e_time:      rangeValue ? rangeValue[1].format('YYYY-MM-DD') : ''
    };

    this.props.handleSearch(values);
  }

  handInfoPageChange(params){
    const newParams = {
      page: params.current,
      ffersconfid:this.props.ffersconfid,
      current:params.current,
      pagesize:10
    };

    const rangeValue = this.props.form.getFieldValue('FfersDate');
    const newValues = {
      theatername: this.props.form.getFieldValue('theatername') || '',
      theaternum:  this.props.form.getFieldValue('theaternum') || '',
      moviename:   this.props.form.getFieldValue('moviename') || '',
			status:      this.props.form.getFieldValue('status') || '',
      s_time:      rangeValue ? rangeValue[0].format('YYYY-MM-DD') : '',
      e_time:      rangeValue ? rangeValue[1].format('YYYY-MM-DD') : ''
    };

    this.props.pageOnchange(newParams, newValues)
  }

  //重置表单
  handleReset = () => {
    this.props.form.resetFields();
  }

  sendMsg = (record) => {
    this.props.handleSend(record.ffersid, this.props.ffersconfid);
  }

  edit = (record) => {
    this.props.edit({
      ffersid: record.ffersid
    });
  }

  onConfirm = (record) => {
    this.props.confirm({
      ffersid: record.ffersid
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const pagination = {
      total: this.props.contentTotal,
      current: this.props.contentCurrent,
    }
    const dateFormat = 'YYYY/MM/DD';

    const columns = [{
      title:'影院编码',
      dataIndex:'theaternum',
      key:'theaternum',
      className:'columnTextCenter',
    },{
      title:'影院',
      dataIndex:'theatername',
      key:'theatername',
      className:'columnTextCenter',
    },{
      title:'影片名称',
      dataIndex:'moviename',
      key:'moviename',
      className:'columnTextCenter',
    },{
      title:'硬盘编码',
      dataIndex:'diskcode',
      key:'diskcode',
      className:'columnTextCenter',
    },{
      title:'发货日期',
      dataIndex:'sendtime',
      key:'sendtime',
      className:'columnTextCenter',
    },{
      title:'快递公司',
      dataIndex:'logistics',
      key:'logistics',
    },{
      title:'快递单号',
      dataIndex:'waybill',
      key:'waybill',
      className:'columnTextCenter',
    },{
      title:'状态',
      dataIndex:'status',
      key:'status',
      className:'columnTextCenter',
      render:(text) => {
        if(text === 0){
          return <div>待回盘</div>
        } else if(text === 1) {
          return (
            <div>{ roletype === 1 ? '已回盘' : '待验收' }</div>
          )
        } else {
          return <div>已验收</div>
        }
      }
    }];

    const roletype = JSON.parse(sessionStorage.getItem('user')).roletype;
		if( roletype !== 0 ){
			columns.push({
        title:'操作',
        key:'operation',
        className:'columnTextCenter',
        render:(text, record) => {
          return (
            <div>
              {
                record.status === 0 ?
                  roletype === 1 ?
                    <a onClick={() => this.sendMsg(record)}>发送通知</a> :
                    <a onClick={() => this.edit(record)}>回执影盘</a> :
                  record.status === 1 ?
                    roletype === 1 ?
                      <Popconfirm title="是否确认影盘已收到?" onConfirm={() => this.onConfirm(record)}>
                        <a>确认验收</a>
                      </Popconfirm> :
                      <span>等待院线/片方验收</span> :
                    record.status === 2 ?
                      <span>院线/片方已验收</span> : ''
              }
            </div>
          );
        }
      });
    }

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
                        <Input placeholder="输入影院名称" type="text"/>
                      )
                    }
                  </Form.Item> : ''
              }
              {
                roletype !== 2 ?
                  <Form.Item >
                    {
                      getFieldDecorator('theaternum')(
                        <Input placeholder="输入影院编码" type="text"/>
                      )
                    }
                  </Form.Item> : ''
              }
              <Form.Item>
                {
                  getFieldDecorator('moviename')(
                    <Input placeholder="输入影片名称" type="text"/>

                  )
                }
              </Form.Item>
              <Form.Item>
                {
                  getFieldDecorator('status')(
                    <Select placeholder="选择通知状态" style={{width: '160px'}}>
                      <Option key="0">待回盘</Option>
                      <Option key="1">{ roletype === 1 ? '已回盘' : '待验收' }</Option>
                      <Option key="2">已验收</Option>
                    </Select>
                  )
                }
              </Form.Item>
              <Form.Item>
                {
                  getFieldDecorator('FfersDate')(
                    <RangePicker format={dateFormat} />
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
          rowKey={record => "Ffers" + record.ffersid}
        />
      </div>
    )
  }
}

export default FfersTable
