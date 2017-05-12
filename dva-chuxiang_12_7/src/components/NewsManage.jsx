import React, { PropTypes } from 'react'
import { Table, pagination, Icon, Form, Input, Select, Button, Popconfirm } from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

// 翻页参数
let params = {
  offsetNum: 0,
  pageSize: 10,
  keyword: '',
  type: -1
};

let NewsManage = ({
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
    title: '资讯标题',
    dataIndex: 'news_title',
    key: 'news_title'
  }, {
    title: '资讯状态',
    dataIndex: 'news_status',
    key: 'news_status',
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
    title: '资讯类别',
    dataIndex: 'news_type',
    key: 'news_type',
    render(text){
      let renderText;
      switch (text) {
        case 0:
          renderText = '电影政策';
          break;
        case 1:
          renderText = '行业资讯';
          break;
        case 2:
          renderText = '院线资讯';
          break;
        case 3:
          renderText = '楚湘动态';
          break;
        default:
          renderText = '暂无类别';
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
        <Popconfirm title="确定要删除吗?" onConfirm={() => onDeleteItem(record.news_id, record.news_img)}>
          <a>删除</a>
        </Popconfirm>
        &nbsp;&nbsp;
        {
          sessionStorage.getItem('audit_flag') ?
            <Popconfirm title={"确定更改为" + (record.audit_flag === 1 ? '未审核' : '已审核') + "吗?"} onConfirm={() => onUpdateStatus(record.news_id, record.audit_flag)}>
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

  function queryNews(){
    params.keyword = !!getFieldValue('keyword') ? encodeURIComponent(getFieldValue('keyword')) : '';
    params.type = getFieldValue('type');

    onQueryList(params);
  }

  function addNews(e){
    e.preventDefault();

    onAddItem();
  }

  return (
    <div>
      <h1 className="ContentHeader">资讯中心</h1>
      <div className="ContentQuery">
        <Form inline>
          <FormItem>
            {getFieldDecorator('keyword')(
              <Input type="text" size="large" style={{width: 260}} placeholder="搜索资讯..." />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('type', {
              initialValue: '-1'
            })(
              <Select size="large" style={{width: 100}}>
                <Option key="-1">全部资讯</Option>
                <Option key="0">电影政策</Option>
                <Option key="1">行业资讯</Option>
                <Option key="2">院线资讯</Option>
                <Option key="3">楚湘动态</Option>
              </Select>
            )}
          </FormItem>
          <FormItem>
            <Button size="large" type="primary" icon="search" onClick={queryNews}>查询资讯</Button>
          </FormItem>
          <FormItem>
            <Button size="large" type="primary" icon="plus" onClick={addNews}>添加资讯</Button>
          </FormItem>
        </Form>
      </div>
      <Table columns={columns} dataSource={list} loading={loading} pagination={pagination} bordered />
    </div>
  );
};

export default Form.create()(NewsManage)
