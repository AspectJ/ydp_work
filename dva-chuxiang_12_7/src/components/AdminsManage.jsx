import React from 'react'
import { Button, Table, Popconfirm, pagination } from 'antd'

let AdminsManage = ({
  list,
  total,
  loading,
  flip,
  onViewItem,
  onEditItem,
  onAddItem
}) => {
  const columns = [{
    title: '用户名',
    dataIndex: 'adminname',
    key: 'adminname'
  }, {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname'
  }, {
    title: '院线名称',
    dataIndex: 'cinemaname',
    key: 'cinemaname'
  }, {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time'
  }, {
    title: '最后登录',
    dataIndex: 'last_login_time',
    key: 'last_login_time'
  }, {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    render: (text) => (
      <span>{text === true ? '可用' : '禁用'}</span>
    )
	}, {
    title: '能否审核',
    dataIndex: 'audit',
    key: 'audit',
    render: (text) => (
      <span>{text === 1 ? '是' : '否'}</span>
    )
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record, index) => (
      <p>
        <a onClick={() => onViewItem(record)}>查看</a>
        &nbsp;&nbsp;
        <a onClick={() => onEditItem(record)}>编辑</a>
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

  function addAdmin(e){
		e.preventDefault();

    onAddItem();
  }

  return (
    <div>
      <h1 className="ContentHeader">系统用户管理</h1>
      <div className="ContentHeader">
        <Button size="large" type="primary" icon="plus" onClick={addAdmin}>添加用户</Button>
      </div>
      <Table columns={columns} dataSource={list} loading={loading} pagination={pagination} bordered />
    </div>
  )
}

export default AdminsManage
