import React from 'react'
import { connect } from 'dva'
import { Table } from 'antd' 

const Log = (props) => {
  const {
    list,
    loading,
    total,
    current
  } = props.app;

  function queryUserLog(params){
    props.dispatch({
      type: 'app/UserLog',
      payload: params
    });
  }

  const columns = [{
    title: 'IP地址',
    dataIndex: 'REQUEST_IP',
    key: 'REQUEST_IP'
  }, {
    title: '用户操作',
    dataIndex: 'METHOD_DESCRIPTION',
    key: 'METHOD_DESCRIPTION'
  }, {
    title: '操作时间',
    dataIndex: 'CREATE_TIME',
    key: 'CREATE_TIME'
  }];

  const pagination = {
    total,
    current,
    onChange(current){
      queryUserLog({
        page: current,
        pagesize: 10
      });
    }
  }

  return (
    <div className="Relative">
      <div className="Content" style={{width: '100%', left: '0'}}>
        <h1 className="ContentHeader">用户日志</h1>
        <div className="ContentBody">
          <Table
            dataSource={list}
            columns={columns}
            bordered
            style={{padding: '20px'}}
            loading={loading}
            pagination={pagination}
            rowKey={record => record.ID}
          />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    app: state.app
  };
}

export default connect(mapStateToProps)(Log)