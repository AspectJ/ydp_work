import React, { PropTypes } from 'react'
import { Table, pagination, Icon, Button, Popconfirm } from 'antd'

let ActivesManage = ({
  list,
  total,
  loading,
  onViewItem,
  onEditItem,
  onDeleteItem,
  onUpdateStatus,
  flip,
  onAddItem
}) => {
  const columns = [{
    title: '活动标题',
    dataIndex: 'acti_title',
    key: 'acti_title'
  }, {
    title: '活动状态',
    dataIndex: 'acti_status',
    key: 'acti_status',
    render: (text) => (
      <p>{text === 0 ? '正式发布' : text === 1 ? '不可查阅' : '草稿' }</p>
    )
  }, {
    title: '有效期',
    key: 'acti_time',
    render: (record) => (
      <p>{(record.start_time).split('.')[0] + " 至 " + (record.end_time).split('.')[0]}</p>
    )
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
      <span>{text === 1 ? '已审核' : '未审核'}</span>
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
        <Popconfirm title="确定要删除吗?" onConfirm={() => onDeleteItem(record)}>
          <a>删除</a>
        </Popconfirm>
        &nbsp;&nbsp;
        {
          sessionStorage.getItem('audit_flag') ?
            <Popconfirm title={"确定更改为" + (record.audit_flag === 1 ? '未审核' : '已审核') + "吗?"} onConfirm={() => onUpdateStatus(record.acti_id, record.audit_flag)}>
              <a>审核</a>
            </Popconfirm> : ''
        }
      </p>
    )
  }];

  let params = {
    offsetNum: 0,
    pageSize: 10
  };

  const pagination = {
    defaultCurrent: 1,
    total: total,
    onChange(e) {
      params.offsetNum = e;
      flip(params);
    }
  };

  function addActive(e){
    e.preventDefault();

    onAddItem();
  }

  return (
    <div>
      <h1 className="ContentHeader">活动中心</h1>
      <div className="ContentQuery">
        <Button size="large" type="primary" icon="plus" onClick={addActive}>添加活动</Button>
      </div>
      <Table columns={columns} dataSource={list} loading={loading} pagination={pagination} bordered />
    </div>
  )
};

export default ActivesManage
