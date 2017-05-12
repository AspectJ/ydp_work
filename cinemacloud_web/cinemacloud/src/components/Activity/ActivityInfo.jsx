import React from 'react'
import { Form, Row, Col, Tag, Table, Icon, Button, Input, Select, Upload, message, Popconfirm } from 'antd'
import { baseUrl } from '../../services/requests'
import auth from '../../utils/auth'

const Option = Select.Option;

const ActivityInfo = (props) => {
  const roletype = JSON.parse(sessionStorage.getItem('user')).roletype;
  const isCinema = () => {
    return JSON.parse(sessionStorage.getItem('user')).roletype === 2;
  };

  const uploadProps = {
    showUploadList: false,
    withCredentials: true,
    onChange(info) {
      if(info.file.status === 'uploading'){
        const hide = message.loading('回执正在上传，请稍后', 0);
        setTimeout(hide, 3000);
      }

      if (info.file.status === 'done') {
          props.updateActivityLink(info.file.response.data);
        message.success(`${info.file.name} 上传成功`, 3);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败, 服务器异常!`, 3);
      }
    }
  };

  function buildManager(record){
    if( record.type === 0 ){
      return record.status === 0 && auth([125]).length ?
        <a onClick={() => props.sendMsg(record)}>发送通知</a> :
        <span>已查阅</span>
    } else {
      return record.status === 0 && auth([125]).length ?
        <a onClick={() => props.sendMsg(record)}>发送通知</a> :
        record.status === 1 ?
          <span style={{color: '#00a854'}}>已接受</span> :
          <span style={{color: '#f46e65'}}>已拒绝</span>
    }
  }

  // roletype === 1 || 2
  const manager_columns = [{
    title: '影院名称',
    dataIndex: 'theatername',
    key: 'theatername'
  }, {
    title: '文本类型',
    dataIndex: 'type',
    render(text){
      return (
        <div>
          { props.contentItem.type === 0 ? "普通文本" : "回执文本" }
        </div>
      )
    }
  }, {
    title: '角色设置',
    dataIndex: 'roleList',
    key: 'roleList',
    render(text){
      return (
        <div>
          {
            text.map(role => {
              return <Tag color="blue" key={role.roleid} style={{margin: '0 5px 5px 0'}}>{role.rolename}</Tag>
            })
          }
        </div>
      )
    }
  }, {
    title: '回执状态',
    dataIndex: 'status',
    key: 'status',
    render(text, record){
      return (
        <div>
          {
            props.contentItem.type === 0 ?
              text === 0 ? "待处理" : "已查阅" :
              text === 0 ? "待处理" : text === 1 ? "同意参加" : "拒绝参加"
          }
        </div>
      );
    }
  }, {
    title: '影院回执',
    dataIndex: 'doc_url',
    key: 'doc_url',
    render(text){
      return (
        <div>
          { text ? <a href={baseUrl + '/rest/file/downloadFile?doc_url=' + text}>下载回执</a> : '' }
        </div>
       )
    }
  }];

  function buildCinema(record){
    if( record.type === 0 ){
      return record.status === 0 ?
        <a onClick={() => props.onConfirm(record, 1)}>确认查阅</a> :
        <span>已查阅</span>
    } else {
      return record.status === 0 ?
          record.doc_url ?
            <div>
              <Popconfirm title="是否同意参加该活动?" onConfirm={() => props.onConfirm(record, 1)}>
                <a style={{marginRight: '10px', color: '#00a854'}}>同意参加</a>
              </Popconfirm>
              <Popconfirm title="是否拒绝参加该活动?" onConfirm={() => props.onConfirm(record, -1)}>
                <a style={{color: '#f46e65'}}>拒绝参加</a>
              </Popconfirm>
            </div> :
            <div>
              <Upload action={baseUrl + '/rest/file/uploadFileToLocal?activityid=' + record.activityid} {...uploadProps}>
                <a style={{marginRight: '10px'}}>上传回执</a>
              </Upload>
              <Popconfirm title="是否拒绝参加该活动?" onConfirm={() => props.onConfirm(record, -1)}>
                <a style={{color: '#f46e65'}}>拒绝参加</a>
              </Popconfirm>
            </div> :
          record.status === 1 ?
            <span style={{marginRight: '10px', color: '#00a854'}}>已参加</span> :
            <span style={{color: '#f46e65'}}>已拒绝</span>
    }
  }

  const cinema_columns = [{
    title: '通知名称',
    dataIndex: 'title',
    key: 'title'
  }, {
    title: '文本类型',
    dataIndex: 'type',
    render(text){
      return (
        <div>
          { text === 0 ? "普通文本" : "回执文本" }
        </div>
      )
    }
  }, {
    title: '角色设置',
    dataIndex: 'roleList',
    key: 'roleList',
    render(text){
      return (
        <div>
          {
            text.map(role => {
              return <Tag color="blue" key={role.roleid} style={{margin: '0 5px 5px 0'}}>{role.rolename}</Tag>
            })
          }
        </div>
      )
    }
  }, {
    title: '发布时间',
    key: 'createtime',
    render(text, record){
      return <span>{getLocalTime(record.createtime.time)}</span>
    }
  }, {
    title: '通知内容',
    dataIndex: 'content',
    key: 'content',
    render(text, record){
      return <a onClick={() => props.fullScreen(record)}>查看通知内容</a>
    }
  }, {
    title: '回执状态',
    dataIndex: 'status',
    key: 'status',
    render(text, record){
      return (
        <div>
          {
            record.type === 0 ?
              text === 0 ? "待处理" : "已查阅" :
              text === 0 ? "待处理" : text === 1 ? "同意参加" : "拒绝参加"
          }
        </div>
      );
    }
  }, {
    title: '影院回执',
    dataIndex: 'doc_url',
    key: 'doc_url',
    render(text){
      return (
        <div>
          { text ? <a href={baseUrl + '/rest/file/downloadFile?doc_url=' + text}>下载回执</a> : '' }
        </div>
       )
    }
  }];

  if( roletype !== 0 ){
    if( roletype === 1 ){
      manager_columns.push({
        title: '操作',
        key: 'operation',
        render(text, record){
          return(
            <div>
              { buildManager(record) }
            </div>
          )
        }
      });
    } else {
      cinema_columns.push({
        title: '操作',
        key: 'operation',
        render(text, record){
          return(
            <div>
              { buildCinema(record) }
            </div>
          )
        }
      })
    }
  }

  const pagination = {
    total:   props.contentTotal,
    current: props.contentCurrent
  };

  const handlePageChange = (values) => {
    const pageinfo = {
      page:            values.current,
      pagesize:        10,
    };

    handleSubmit(pageinfo);
  };

  function handleSubmit(pageinfo){
    validateFields((err, values) => {
      if(!err){
        let params = {};
        if( roletype !== 2 ){
          params = {
            activityid:  props.contentItem.activityid,
            theatername: values.theatername ? encodeURIComponent(values.theatername) : '',
            type:        props.contentItem.type,
            status:      props.contentItem.type === 0 ? values.status1 || '' : values.status2 || ''
          };
        } else {
          params = {
            criteria: values.title ? encodeURIComponent(values.title) : '',
            type:     values.type || ''
          };

          if( values.type ){
            values.type === '0' ? params.status = values.status1 || '' : params.status = values.status2 || ''
          }
        }

        if( pageinfo ){
          params.page = pageinfo.page;
          params.pagesize = 10;
        }

        props.onSearch(params, roletype);
      }
    });
  }

  function handleReset(){
    resetFields();
  }

  const { getFieldDecorator, resetFields, getFieldValue, setFieldsValue, validateFields } = props.form;
  function getLocalTime(second) {
    return new Date(parseInt(second)).toLocaleString().replace(/:\d{1,2}$/,' ');
  }

  let type;
  if( roletype === 2 ){
    type = parseInt(getFieldValue('type'));
  } else {
    type = props.contentItem.type;
  }

  return (
    <div className="Content" style={isCinema() ? {width: '100%', left: '0'} : {}}>
	    <h1 className="ContentHeader">{ props.contentTitle ? props.contentTitle + ' -- ' : '' }活动通知详情</h1>
      <div className="ContentBody">
        <div style={{padding:'20px'}}>
          {
            !props.loading && roletype !== 2 ?
              <div>
                <h3 className="article-title">{props.contentTitle}</h3>
                <ul className="article-subtitle">
                  <li><Icon type="book" /> 文本类型：{props.contentItem ? props.contentItem.type === 0 ? '普通文本' : '回执文本' : ''}</li>
                  <li><Icon type="clock-circle-o" /> 发布时间：{props.contentItem.createtime ? getLocalTime(props.contentItem.createtime.time) : ''}</li>
                  {
                    props.contentItem.starttime || props.contentItem.endtime ?
                      <li>
                        <Icon type="calendar" /> 活动时间：&nbsp;
                        {getLocalTime(props.contentItem.starttime.time).split(' ')[0]} 到 {getLocalTime(props.contentItem.endtime.time).split(' ')[0]}
                      </li> : ''
                  }
                </ul>
                <div className="article-content">
                  {
                    props.contentItem ?
                      (<div dangerouslySetInnerHTML={{__html:props.contentItem.content}} style={{fontSize:'16px'}}></div>) : ""
                  }
                </div>
              </div> : ''
          }
          <Form layout="inline" className="SearchWrapper">
            {
              roletype === 2 ?
                <Form.Item>
                  {
                    getFieldDecorator('title')(
                      <Input placeholder="输入通知名称" type="text" style={{ width: 230 }} />
                    )
                  }
                </Form.Item> :
                <Form.Item>
                  {
                    getFieldDecorator('theatername')(
                      <Input placeholder="输入影院名称" type="text" style={{ width: 230 }} />
                    )
                  }
                </Form.Item>
            }
            <Form.Item>
              {
                roletype === 2 ?
                  getFieldDecorator('type')(
                    <Select style={{ width: 150 }} placeholder="文本类型">
                      <Option key="0">普通文本</Option>
                      <Option key="1">回执文本</Option>
                    </Select>
                  ) : ''
              }
            </Form.Item>
            {
              ( roletype !== 2 && type === 0 ) || ( roletype === 2 && type && type === 0 ) ?
                <Form.Item>
                  {
                    getFieldDecorator('status1')(
                      <Select style={{ width: 150 }} size="large" placeholder="通知状态">
                        <Option key="0">待处理</Option>
                        <Option key="1">已处理</Option>
                      </Select>
                    )
                  }
                </Form.Item> : ''
            }
            {
              ( roletype !== 2 && type === 1 ) || ( roletype === 2 && type && type === 1 ) ?
                <Form.Item>
                  {
                    getFieldDecorator('status2')(
                      <Select style={{ width: 150 }} size="large" placeholder="通知状态">
                        <Option key="0">待处理</Option>
                        <Option key="1">已接受</Option>
                        <Option key="-1">未接受</Option>
                      </Select>
                    )
                  }
                </Form.Item> : ''
            }
            <Form.Item>
              <Button type="primary" onClick={handleSubmit}>查询</Button>
              <Button style={{marginLeft: '10px'}} onClick={handleReset}>重置</Button>
            </Form.Item>
          </Form>
          <Table
            columns={roletype === 2 ? cinema_columns : manager_columns}
            dataSource={props.contentItem ? Array.isArray(props.contentItem) ? props.contentItem : props.contentItem.batchDetailList : []}
            loading={props.loading}
            pagination={pagination}
            onChange={current => handlePageChange(current)}
            rowKey={record => "activity_" + record.id}
            bordered
          />
        </div>
      </div>
    </div>
  );
}

export default Form.create()(ActivityInfo)
