import React from 'react'
import { Button, Table, Popconfirm, pagination, Modal } from 'antd'

let CinemaInfo = ({
  ...props
}) => {

  const columns = [{
    title: '影院名称',
    dataIndex: 'theatername',
    key: 'theatername',
    className:'columnTextCenter',
  }, {
    title: '影院编号',
    dataIndex: 'theaternum',
    key: 'theaternum',
    className:'columnTextCenter',
  }, {
    title: '影院地址',
    dataIndex: 'theateraddress',
    key: 'theateraddress',
    className:'columnTextCenter',
  }, {
    title: '电话',
    dataIndex: 'theaterphone',
    key: 'theaterphone',
    className:'columnTextCenter',
  }, {
    title: '城市类别',
    dataIndex: 'archiveList[0].archive_content',
    key: 'archiveList[0].archiveid',
    className:'columnTextCenter',
  }];

  // let params = {
  //   offsetNum: 0,
  //   pageSize: 10
  // };

  // const pagination = {
  //   defaultCurrent: 1,
  //   total: total,
  //   onChange(e) {
  //     params.offsetNum = e;
  //     flip(params);
  //   }
  // };

  // function addCinema(e){
  //   e.preventDefault();
  //   onAddItem();
  // }

  return (
    <div className="Content">
      <h1 className="ContentHeader">影院信息</h1>
      <div className="ContentBody">
        <Table
          columns={columns}
          dataSource={props.contentItem}
          loading={props.loading}
          pagination={props.pagination}
          rowKey={props.rowkey}
        />
      </div>
    </div>
  );
}

export default CinemaInfo;
