import React from 'react'
import { Button, Table, Popconfirm, pagination } from 'antd'

let UsersManage = ({
  list,
  total,
  loading,
  flip,
  onViewItem,
  onUpdateState
}) => {
  const columns = [{
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  }, {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile'
  }, {
    title: '用户名',
    dataIndex: 'nickname',
    key: 'nickname'
  }, {
    title: '真实姓名',
    dataIndex: 'realname',
    key: 'realname'
  }, {
    title: '影院名称',
    dataIndex: 'cinema_name',
    key: 'cinema_name'
  }, {
    title: '创建时间',
    dataIndex: 'createtime',
    key: 'createtime'
  }, {
    title: '更改时间',
    dataIndex: 'modifytime',
    key: 'modifytime'
  }, {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    render: (text) => (
      <span>{text === '1' ? '可用' : '禁用'}</span>
    )
  }, {
    title: '操作',
    key: 'operation',
    render: (record) => (
      <p>
        <a onClick={() => onViewItem(record)}>查看</a>
        &nbsp;&nbsp;
        <Popconfirm title={"确定要" + (record.state === '1' ? '禁用' : '启用' ) +"吗?"} onConfirm={() => onUpdateState(record)}>
          <a>{record.state === '1' ? '禁用' : '启用'}</a>
        </Popconfirm>
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

  return (
    <div>
      <h1 className="ContentHeader">用户信息</h1>
      <Table columns={columns} dataSource={list} loading={loading} pagination={pagination} bordered />
    </div>
  )
}

export default UsersManage
