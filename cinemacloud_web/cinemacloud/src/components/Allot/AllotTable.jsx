import React, { Component } from 'react'
import { Table, Form, Input, Button, Select, DatePicker, Upload, Icon, Modal, message, Popconfirm } from 'antd'

const { RangePicker } = DatePicker;
const Option = Select.Option;

class AllotTable extends Component {
	constructor(props) {
		super(props);
		this.edit = this.edit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	//提交搜索数据
	handleSubmit(){
		const rangeValue = this.props.form.getFieldValue('AllotDate');
		const values = {
			theatername: this.props.form.getFieldValue('theatername') || '',
			theaternum: this.props.form.getFieldValue('theaternum') || '',
			waybill: this.props.form.getFieldValue('waybill') || '',
			status: this.props.form.getFieldValue('status') || '',
			s_time:rangeValue ? rangeValue[0].format('YYYY-MM-DD') : '',
			e_time:rangeValue ? rangeValue[1].format('YYYY-MM-DD') : ''
		};

		this.props.handleSearch(values);
	}

	//重置表单
	handleReset = () => {
	   this.props.form.resetFields();
	 }
	 //重新发送
	edit(text, record){
		this.props.handleEdit(record.suppliesid, this.props.suppliesconfid);
	}
	//确认收货
	receipt(record){
		this.props.handleReceipt({
			status: 2,
			suppliesid: record.suppliesid,
			suppliesconfid: record.suppliesconfid
		});
	}

	handInfoPageChange(params){
		const newParams = {
			page: params.current,
			suppliesconfid:this.props.suppliesconfid,
			current:params.current,
			pagesize:10
		};

		const rangeValue = this.props.form.getFieldValue('AllotDate');
		const newValues = {
			theatername: this.props.form.getFieldValue('theatername') || '',
			theaternum: this.props.form.getFieldValue('theaternum') || '',
			waybill: this.props.form.getFieldValue('waybill') || '',
			status: this.props.form.getFieldValue('status') || '',
			s_time:rangeValue ? rangeValue[0].format('YYYY-MM-DD') : '',
			e_time:rangeValue ? rangeValue[1].format('YYYY-MM-DD') : ''
		};

		this.props.pageOnchange(newParams,newValues)
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		const pagination = {
			total:this.props.contentTotal,
			current:this.props.contentCurrent,
		}
		const dateFormat = 'YYYY/MM/DD';

		const columns = [{
			title:'影院编码',
			dataIndex:'theaternum',
			key:'theaternum',
			className:'columnTextCenter',
		},{
			title:'影院',
			dataIndex:'theatername',
			key:'theatername',
			className:'columnTextCenter',
		},{
			title:'内容',
			dataIndex:'content',
			key:'content',
			className:'columnTextCenter',
		},{
			title:'状态',
			dataIndex:'status',
			key:'status',
			className:'columnTextCenter',
			render:(text) => {
				if(text === 0){
					return <div>未发送</div>
				} else if(text === 1) {
					return <div>已发送</div>
				} else {
					return <div>已验收</div>
				}
			}
		},{
			title:'发货日期',
			dataIndex:'sendtime',
			key:'sendtime',
			className:'columnTextCenter',
		},{
			title:'快递公司',
			dataIndex:'logistics',
			key:'logistics',
			
		},{
			title:'快递单号',
			dataIndex:'waybill',
			key:'waybill',
			className:'columnTextCenter',
		}];

		const roletype = JSON.parse(sessionStorage.getItem('user')).roletype;
		if( roletype !== 0 ){
			columns.push({
				title:'操作',
				dataIndex:'operation',
				key:'',
				className:'columnTextCenter',
				render:(text, record) => {
					return (
						<div>
							{
								roletype === 1 ?
									record.status === 2 ?
										<span>已验收</span> :
										<a onClick={() => this.edit(text, record)}>发送通知</a> :
									record.status === 1 ?
										<Popconfirm title={'确定物料已验收?'} onConfirm={() => this.receipt(record)}><a>确认验收</a></Popconfirm> : 
										<span>{record.status === 0 ? "待收货" : "已验收"}</span>
							}
						</div>
					)
				}
			})
		}

		return (
			<div className="ContentBody">
				{
					!this.props.loading ?
						<Form layout="inline" className="SearchWrapper" style={{marginLeft:'20px'}}>
							{
								roletype !== 2 ? 
									<Form.Item>
										{
											getFieldDecorator('theatername')(
												<Input placeholder="输入影院名称" type="text" />
											)
										}
									</Form.Item> : ''
							}
							{
								roletype !== 2 ? 
									<Form.Item>
										{
											getFieldDecorator('theaternum')(
												<Input placeholder="输入影院编码" type="text" />
											)
										}
									</Form.Item> : ''
							}
							<Form.Item>
								{
									getFieldDecorator('waybill')(
										<Input placeholder="输入快递单号" type="text" />
									)
								}
							</Form.Item>
							<Form.Item>
								{
									getFieldDecorator('status')(
										<Select placeholder="选择通知状态" style={{width: '160px'}}>
											<Option key="0">未发送</Option>
											<Option key="1">已发送</Option>
											<Option key="2">已验收</Option>
										</Select>
									)
								}
							</Form.Item>
							<Form.Item>
								{
									getFieldDecorator('AllotDate')(
										<RangePicker format={dateFormat} />
									)
								}
							</Form.Item>
							<Form.Item>
								<Button type="primary" onClick={this.handleSubmit}>查询</Button>
								<Button style={{marginLeft: '10px'}} onClick={this.handleReset}>重置</Button>
							</Form.Item>
						</Form> : ''
				}
				<Table 
					columns={columns} 
					dataSource={this.props.contentItem} 
					loading={this.props.loading} 
					pagination={pagination}
					onChange={current => this.handInfoPageChange(current)}
					rowKey={this.props.rowkey}
				/>
			</div>
		)
	}
}

export default AllotTable