import React, { Component } from 'react'
import { Button, Table, Popconfirm, pagination, Icon, Modal, Form, Row, Col, Input, Select, Tag, Spin } from 'antd'
import auth from '../../utils/auth'

const Option = Select.Option

class NoticeColumnEdit extends Component {

	constructor(props) {
		super(props);
	}
	//添加栏目界面
	handleAdd = () => {
		this.props.handleColumnAdd();
		this.props.form.resetFields();
	}
	//编辑栏目界面
	onEdit = (text, record, index) => {
		this.props.form.resetFields();
		this.props.handleColumnEdit(record)
	}
	//确认提交
	onOk = () => {
		this.props.form.validateFields((err, values) => {
			if (!err) {
				const cityCateArr = values.cityCate.length !== 0 ?
					values.cityCate.map((item) => {
						return {
							archiveid: this.props.dropdownItem.citytype.archiveid,
							archive_value: item.key,
							archive_content: item.label
						}
					}) : [];

				// const allyModelArr = values.allyModel  ?
				// values.allyModel.map((item) => {
				// 	return {
				// 		archiveid:this.props.dropdownItem.joinArchiveid,
				// 		archive_value:item.key.charAt(0),
				// 		archive_content:item.label
				// 	}
				// }): [];

				const archive_Array = encodeURIComponent(JSON.stringify(cityCateArr));

				const params = {
					archiveArr: archive_Array,
					program_name: values.pcmc,
				}

				this.props.contentType !== 'update' ?
					this.props.onOk(params) : this.props.onEditOk({ ...params, program_id: this.props.modalItem.program_id });
			}
		})
	}
	//删除
	onDelete = (text, record, index) => {
		this.props.onDeleteColumn(record.program_id)
	}
	//取消删除
	onCancel = () => {
		this.props.onCancel();
	}
	//禁用
	onBan = (text, record, index) => {
		const status = record.status === 0 ? 1 : 0;
		this.props.onDisableColumn(status, record.program_id)
	}
	//启用
	onEnable = (text, record, index) => {
		const status = record.status === 1 ? 0 : 1;
		this.props.onEnableColumn(status, record.program_id)
	}

	columns = [{
		title: '状态',
		dataIndex: this.props.dataIndexStatus,
		width: '6%',
		className: 'columnTextCenter',
		render: (text) => {
			return text === 0 ? (
				<div><Icon type="minus-circle" style={{ fontSize: '20px', color: '#f04134' }} /></div>
			) : (
					<div><Icon type="check" style={{ fontSize: '20px', color: '#00a854' }} /></div>
				)
		}
	}, {
		title: '栏目名称',
		dataIndex: this.props.dataIndexName,
		width: '60%',
		className: 'columnTextCenter',
		render: (text) => (<h3>{text}</h3>)
	}, {
		title: '城市类别',
		dataIndex: this.props.dataIndexCityCate,
		width: '10%',
		className: 'columnTextCenter',
		render: (text) => {
			return text !== undefined ?
				text.map((item) => {
					return item.value === 1 ?
						(<Tag color="blue" key={item.value} style={{ margin: '0 5px 5px 0' }}>{item.content}</Tag>)
						: (<Tag color="orange" key={item.value} style={{ margin: '0 5px 5px 0' }}>{item.content}</Tag>)
				})
				: (<Tag color="#87d068" style={{ marginBottom: '5px' }}>暂无</Tag>)
		}
	}, {
		title: '操作',
		dataIndex: 'operation',
		className: 'columnTextCenter',
		width: '10%',
		render: (text, record, index) => {
			return (
				<div>
					{
						auth([94]).length ?
							<Popconfirm title="确定要删除吗?" onConfirm={() => this.onDelete(text, record, index)}>
								<a style={{ marginRight: '5px' }}>删除</a>
							</Popconfirm> : ''
					}
					{
						auth([96]).length ?
							record.status === 1 ?
								<Popconfirm title="确定要禁用吗?" onConfirm={() => this.onBan(text, record, index)}>
									<a style={{ marginRight: '5px' }}>禁用</a>
								</Popconfirm> :
								<Popconfirm title="确定要启用吗?" onConfirm={() => this.onBan(text, record, index)}>
									<a style={{ marginRight: '5px' }}>启用</a>
								</Popconfirm>
							: ''
					}
					{
						auth([93]).length ?
							<a style={{ marginRight: '5px' }} onClick={() => this.onEdit(text, record, index)}>修改</a> : ''
					}
				</div>
			);
		}
	}];

	render() {
		const _this = this;
		const columns = this.columns;
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: {
				span: 6,
			},
			wrapperCol: {
				span: 14,
			},
		};

		const pagination = {
			total: this.props.total,
			current: this.props.current,
			onChange(current){
				_this.props.queryColumnList({
					page: current,
					pagesize: 10
				});
			}
		};

		const children = [];
		for (let i = 10; i < 36; i++) {
			children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
		}

		return (
			<div className="Content" style={{ width: '100%', left: '0' }}>
				<h1 className="ContentHeader">
					栏目编辑
				  {
						auth([92]).length ?
							<Button className="btn-title" onClick={this.handleAdd} size="large" icon="plus" type="primary">添加栏目</Button> : ''
					}
				</h1>
				<div className="ContentBody">
					<Table
						dataSource={this.props.list}
						columns={columns}
						rowKey={this.props.rowkey}
						loading={this.props.loading}
						style={{ padding: '20px' }}
            			pagination={pagination}
						bordered
					/>
				</div>
				<Modal title={this.props.bannerTitle} visible={this.props.modalVisible} onOk={this.onOk} onCancel={this.onCancel}>
					<Form style={{ margin: '30px 0 0 40px', width: '400px' }}>
						<Row>
							<Col>
								<Form.Item
									label='栏目名称'
									{...formItemLayout}
								>
									{
										getFieldDecorator('pcmc', {
											initialValue: this.props.contentType === 'create' ? '' :
												this.props.modalItem ? this.props.modalItem.program_name : '',
											rules: [{
												required: true, message: '请输入栏目名称'
											}]
										})(
											<Input placeholder="请输入栏目名称..." />
											)
									}
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Item
									label='城市类别'
									{...formItemLayout}
								>
									<Spin spinning={this.props.loading} tip="加载中..." size="small">
										{
											getFieldDecorator('cityCate', {
												initialValue: this.props.contentType === 'create' ? [] :
																	this.props.modalItem ?
																	this.props.modalItem.citytype.archiveid == 102 ?
																		this.props.modalItem.citytype.parlist.map((item,index) => {
																			let i = item.value.toString();
																			return { key : i }
																		}) : [] : [],
											})(
												<Select
													multiple
													style={{ width: '100%' }}
													placeholder="请选择一个或者多个城市类别(可不选)"
													labelInValue
                          disabled={this.props.contentType !== 'create' ? true : false}
												>
													{
                            this.props.modalVisible ?
                              this.props.dropdownItem.citytype.contList ?
															this.props.dropdownItem.citytype.contList.map((item, index) => {
																let i = parseInt(index + 1).toString();
																return (<Option key={i}>{item['' + i + '']}</Option>)
															}) :
															(<Option value="暂无">暂无</Option>) : (<Option value="暂无">暂无</Option>)
													}
												</Select>
												)
										}
									</Spin>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Modal>
			</div>
		)
	}

}

export default Form.create()(NoticeColumnEdit);
