import React from 'react'
import { Table, Button, Popconfirm, pagination } from 'antd'

let SourcesManage = ({
  list,
  total,
  loading,
  onAddItem,
  onViewItem,
  onEditItem,
  onDeleteItem,
  onUpdateStatus,
  flip
}) => {
  const columns = [{
    title: '素材标题',
    dataIndex: 'material_name',
    key: 'material_name'
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
        <Popconfirm title="确定要删除吗?" onConfirm={() => onDeleteItem(record.material_id)}>
          <a>删除</a>
        </Popconfirm>
        &nbsp;&nbsp;
        {
          sessionStorage.getItem('audit_flag') ?
            <Popconfirm title={"确定更改为" + (record.audit_flag === 1 ? '未审核' : '已审核') + "吗?"} onConfirm={() => onUpdateStatus(record.material_id, record.audit_flag)}>
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

  return(
    <div>
      <h1 className="ContentHeader">素材管理</h1>
      <div className="ContentQuery">
        <Button size="large" type="primary" icon="plus" onClick={onAddItem}>添加素材</Button>
      </div>
      <Table columns={columns} dataSource={list} loading={loading} pagination={pagination} bordered />
    </div>
  );
};

export default SourcesManage
