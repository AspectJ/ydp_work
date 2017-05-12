import React from 'react'
import { Button, Table, Popconfirm, Row, Col, Select, Input, Form, Icon } from 'antd'
import auth from '../../utils/auth'

const Option = Select.Option;

const RoleInfo = React.createClass({
	getInitialState() {
		return {
			roletype: '',
			disabled: false,
			current: this.props.contentCurrent || 1,
		}
	},
	// 选择角色类型
	handleChange(value) {
		this.setState({
			roletype: value,
			disabled: value === '0' ? true : false
		});
	},
	// 角色类型下拉框
	buildRoleType() {
		const roletype = JSON.parse(sessionStorage.getItem('user')).roletype,
			typeList = ['系统角色', '院线角色', '影院角色'];

		let RoleType = [];
		for (let i = parseInt(roletype); i < typeList.length; i++) {
			RoleType.push(<Option key={i}>{typeList[i]}</Option>);
		}

		return RoleType;
	},
	handleSearch() {
		const values = {
			criteria: this.props.form.getFieldValue('criteria') ? encodeURIComponent(this.props.form.getFieldValue('criteria')) : '',
			roletype: this.props.form.getFieldValue('roletype') || ''
		}

		values.page = this.state.current;
		values.pagesize = 10;

		this.props.handleSearch(values);
	},
	handleReset() {
		this.props.form.resetFields();
	},
	render() {
		// 增 改 删 审 授
		const filtered = auth([22, 23, 24, 26, 27]);
		const _this = this;
		const columns = [{
			title: '角色名称',
			dataIndex: 'rolename',
			key: 'rolename'
		}, {
			title: '角色类型',
			dataIndex: 'roletype',
			key: 'roletype',
			render(text) {
				switch (text) {
					case 0:
						return <span>系统角色</span>
						break;
					case 1:
						return <span>院线角色</span>
						break;
					case 2:
						return <span>影院角色</span>
						break;
					default:

				}
			}
		}, {
			title: '状态',
			dataIndex: 'status',
			render(text) {
				if (text === 0) {
					return <span>已禁用</span>
				} else {
					return <span>已启用</span>
				}
			}
		}];

		if (filtered.length) {
			columns.push({
				title: '操作',
				render(text, record) {
					return (
						<div>
							{
								filtered.indexOf(26) >= 0 ?
									<Popconfirm title={"确定" + (record.status === 1 ? '禁用' : '启用') + "该角色吗?"} onConfirm={() => _this.props.onToggle(record)}>
										<a style={{ marginRight: '5px' }}>
											{record.status === 1 ? '禁用' : '启用'}
										</a>
									</Popconfirm> : ''
							}
							{
								filtered.indexOf(27) >= 0 ?
									<a style={{ marginRight: '5px' }} onClick={() => _this.props.onAuth(record)}>授权</a> : ''
							}
							{
								filtered.indexOf(23) >= 0 ?
									<a style={{ marginRight: '5px' }} onClick={() => _this.props.onEdit(record)}>编辑</a> : ''
							}
							{
								filtered.indexOf(24) >= 0 ?
									<Popconfirm title="确定要删除该角色吗?" onConfirm={() => _this.props.onDelete(record)}>
										<a style={{ marginRight: '5px' }}>删除</a>
									</Popconfirm> : ''
							}
						</div>
					)
				}
			})
		}

		const pagination = {
			total: this.props.total,
			current: this.props.contentCurrent,
			onChange(current) {
				_this.setState({
					current: current
				});
				_this.handleSearch(current);
			}
		}

		const { getFieldDecorator } = this.props.form;
		return (
			<div className="Content" style={{ width: '100%', left: '0' }}>
				<h1 className="ContentHeader">角色设置</h1>
				<div className="ContentBody">
					<div style={{ padding: '20px' }}>
						<div style={{ display: 'inline-block', width: '850px', marginBottom: '20px' }}>
							<Row gutter={16}>
								<Col span={5}>
									{
										getFieldDecorator('criteria')(
											<Input size="large" placeholder="输入角色名称查询" />
										)
									}
								</Col>
								<Col span={4}>
									{
										getFieldDecorator('roletype')(
											<Select size="large" placeholder="选择角色类型" style={{ width: '100%' }} onChange={this.handleChange}>
												{this.buildRoleType()}
											</Select>
										)
									}
								</Col>
								<Col span={6}>
									<Button size="large" type="primary" onClick={this.handleSearch} icon="search">搜索</Button>
									<Button size="large" onClick={this.handleReset} style={{ marginLeft: '10px' }}>清除</Button>
								</Col>
							</Row>
						</div>
						{
							filtered.indexOf(22) >= 0 ?
								<Button size="large" type="primary" onClick={this.props.onAdd} icon="plus" style={{ float: 'right' }}>添加角色</Button> : ''
						}
						<Table
							columns={columns}
							dataSource={this.props.list}
							bordered
							loading={this.props.loading}
							rowKey="roleid"
							pagination={pagination}
						/>
					</div>
				</div>
			</div>
		);
	}
});

export default Form.create()(RoleInfo)
