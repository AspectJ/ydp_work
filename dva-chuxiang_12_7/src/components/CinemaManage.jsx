import React from 'react'
import { Button, Table, Popconfirm, pagination } from 'antd'

let CinemaManage = ({
  list,
  total,
  loading,
  flip,
  onViewItem,
  onEditItem,
  onDeleteItem,
  onUpdateStatus,
  onAddItem
}) => {
  const columns = [{
    title: '影院名称',
    dataIndex: 'cinemaName',
    key: 'cinemaName'
  }, {
    title: '影院编号',
    dataIndex: 'cinemaNumber',
    key: 'cinemaNumber'
  }, {
    title: '影院地址',
    dataIndex: 'address',
    key: 'address'
  }, {
    title: '联系人',
    dataIndex: 'cinemaLinkMan',
    key: 'cinemaLinkMan'
  }, {
    title: '联系人电话',
    dataIndex: 'cinemaLinkMan_telphone',
    key: 'cinemaLinkMan_telphone'
  }, {
    title: '编辑人',
    dataIndex: 'author',
    key: 'author'
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
        <Popconfirm title="确定要删除吗?" onConfirm={() => onDeleteItem(record.j_id)}>
          <a>删除</a>
        </Popconfirm>
        &nbsp;&nbsp;
        {
          sessionStorage.getItem('audit_flag') ?
            <Popconfirm title={"确定更改为" + (record.audit_flag === 1 ? '未审核' : '已审核') + "吗?"} onConfirm={() => onUpdateStatus(record.j_id, record.audit_flag)}>
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

  function addCinema(e){
    e.preventDefault();

    onAddItem();
  }

  return (
    <div>
      <h1 className="ContentHeader">影院信息</h1>
      <div className="ContentQuery">
        <Button size="large" type="primary" icon="plus" onClick={addCinema}>添加影院</Button>
      </div>
      <Table columns={columns} dataSource={list} loading={loading} pagination={pagination} bordered />
    </div>
  );
}

export default CinemaManage
