import React from 'react'
import { Button, Form, Input, Icon, Select, Table, Popconfirm, pagination } from 'antd'

const FormItem = Form.Item,
      Option = Select.Option;

// 翻页参数
let params = {
  offsetNum: 0,
  pageSize: 10,
  keyword: '',
  type: -1
};

let ReleasesManage = ({
  list,
  total,
  loading,
  flip,
  onQueryList,
  onViewItem,
  onEditItem,
  onDeleteItem,
  onUpdateStatus,
  onAddItem,
  form: { getFieldDecorator, getFieldValue }
}) => {
  const columns = [{
    title: '标题',
    dataIndex: 'noti_title',
    key: 'noti_title'
  }, {
    title: '类别',
    dataIndex: 'noti_type',
    key: 'noti_type',
    render(text){
      let renderText;
      switch (text) {
        case 0:
          renderText = '发行通知';
          break;
        case 1:
          renderText = '院线通知';
          break;
        default:
        	break;
      }
      return (
        <span>{renderText}</span>
      )
    }
  }, {
    title: '状态',
    dataIndex: 'noti_status',
    key: 'noti_status',
    render(text){
      let renderText;
      switch (text) {
        case 0:
          renderText = '正式发布';
          break;
        case 1:
          renderText = '不可查阅';
          break;
        case 2:
          renderText = '草稿';
          break;
        default:
          renderText = '暂无状态';
      }
      return (
        <span>{renderText}</span>
      )
    }
  }, {
    title: '发布时间',
    dataIndex: 'create_time',
    key: 'create_time'
  }, {
    title: '编辑人',
    dataIndex: 'author',
    key: 'author'
  }, {
    title: '浏览次数',
    dataIndex: 'brows_times',
    key: 'brows_times'
  }, {
    title: '审核状态',
    dataIndex: 'audit_flag',
    key: 'audit_flag',
    render: (text) => (
      <span>{ text === 1 ? '已审核' : '未审核' }</span>
    )
  }, {
    title: '操作',
    key: 'operation',
    render: (record) => (
      <p>
        <a onClick={() => onViewItem(record)}>查看</a>
        &nbsp;&nbsp;
        <a onClick={() => onEditItem(record)}>编辑</a>
        &nbsp;&nbsp;
        <Popconfirm title="确定要删除吗?" onConfirm={() => onDeleteItem(record.noti_id)}>
          <a>删除</a>
        </Popconfirm>
        &nbsp;&nbsp;
        {
          sessionStorage.getItem('audit_flag') ?
            <Popconfirm title={"确定更改为" + (record.audit_flag === 1 ? '未审核' : '已审核') + "吗?"} onConfirm={() => onUpdateStatus(record.noti_id, record.audit_flag)}>
              <a>审核</a>
            </Popconfirm> : ''
        }
      </p>
    )
  }];

  const pagination = {
    defaultCurrent: 1,
    total: total,
    onChange(e) {
      params.offsetNum = e;
      flip(params);
    }
  };

  function addRelease(e){
    e.preventDefault();

    onAddItem();
  }

  function queryReleases(){
    params.keyword = !!getFieldValue('keyword') ? encodeURIComponent(getFieldValue('keyword')) : '';
    params.type = getFieldValue('type');

    onQueryList(params);
  }

  return (
    <div>
      <h1 className="ContentHeader">通知中心</h1>
      <div className="ContentQuery">
        <Form inline>
          <FormItem>
            {getFieldDecorator('keyword')(
              <Input type="text" size="large" style={{width: 260}} placeholder="搜索通知..." />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('type', {
              initialValue: '-1'
            })(
              <Select size="large" style={{width: 100}}>
                <Option key="-1">全部通知</Option>
                <Option key="0">发行通知</Option>
                <Option key="1">院线通知</Option>
              </Select>
            )}
          </FormItem>
          <FormItem>
            <Button size="large" type="primary" icon="search" onClick={queryReleases}>查询通知</Button>
          </FormItem>
          <FormItem>
            <Button size="large" type="primary" icon="plus" onClick={addRelease}>添加通知</Button>
          </FormItem>
        </Form>
      </div>
      <Table columns={columns} dataSource={list} loading={loading} pagination={pagination} bordered />
    </div>
  )
};

export default Form.create()(ReleasesManage)
