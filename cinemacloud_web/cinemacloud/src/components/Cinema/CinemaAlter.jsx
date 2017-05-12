import React, { Component, PropTypes } from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Spin } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

const CinemaAlter = ({
  ...props,
  form: { getFieldDecorator, validateFields, getFieldsValue, getFieldValue },
}) => {

	const formItemLayout = {
	  labelCol: {
	    span: 6,
	  },
	  wrapperCol: {
	    span: 18,
	  },
	};

	//返回上一步
	function goBack(){
		props.goBack();
	}
	//提交表单
	function handleSubmit(){
		props.form.validateFields((err,values) => {
			if(!err){
				const cityCateProps = {
					archiveid:props.dropdownItem.citytype.archiveid,
					archive_value:values.cityCate.key,
					archive_content:values.cityCate.label,
				}
				const value = props.form.getFieldsValue(['theatername','theaternum','theaterphone','theateraddress']);
				props.handleSubmit({ ...value, archiveArr:encodeURIComponent(JSON.stringify(new Array(cityCateProps))) });
			}
		})
	}
	//编辑表单
	function handleUpdate(){
		props.form.validateFields((err,values) => {
			if(!err){
				const cityCateProps = {
					archiveid:props.dropdownItem.citytype.archiveid,
					archive_value:values.cityCate.key,
					archive_content:values.cityCate.label,
				}
				const value = props.form.getFieldsValue(['theatername','theaternum','theaterphone','theateraddress']);
				props.handleUpdate({ ...value, archiveArr:encodeURIComponent(JSON.stringify(new Array(cityCateProps))) });
			}
		})
	}

	return (
		<div className="Content">
			<h1 className="ContentHeader">
				{props.bannerTitle}
				{
					props.goBackBtn ?
					<Button style={{float:'right',marginTop:'16px',marginRight:'40px'}} onClick={goBack}>
							<Icon type="left" />取消并返回
						</Button> : ''
				}
			</h1>
			<div className="ContentBody">
				<Form layout="horizontal" style={{float:'left',width:'400px',marginTop:'30px'}}>
					<Row>
						<Col span={24}>
							<FormItem
								label="影院名称:"
								{...formItemLayout}
							>
								{getFieldDecorator('theatername', {
									initialValue: props.contentItem[0] ? props.contentItem[0].theatername : '',
									rules: [
										{ required: true, message: '影院名称不能为空' },
										{ max: 40, message: '影院名称不能超过40个字' }
									],
								})(
									<Input type="text" placeholder="请输入影院名称"/>
								)}
							</FormItem>
						</Col>
						<Col span={24}>
							<FormItem
								label="影院编号:"
									{...formItemLayout}
								>
									{getFieldDecorator('theaternum', {
										initialValue: props.contentItem[0] ? props.contentItem[0].theaternum : '',
										rules: [
											{ required: true, message: '影院编号不能为空' },
											{ max: 40, message: '影院编号不能超过40个字' }
										],
									})(
										<Input type="text" placeholder="请输入影院编号" />
									)}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<FormItem
								label="详细地址:"
								{...formItemLayout}
							>
								{getFieldDecorator('theateraddress', {
									initialValue: props.contentItem[0] ? props.contentItem[0].theateraddress : '',
									rules: [
										{ required: true, message: '影院详细地址不能为空' },
										{ max: 40, message: '详细地址不能超过40个字' }
									],
								})(
									<Input type="text" placeholder="请输入影院的详细地址" />
								)}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<FormItem
								label="联系电话:"
								{...formItemLayout}
							>
								{getFieldDecorator('theaterphone', {
									initialValue: props.contentItem[0] ? props.contentItem[0].theaterphone : '',
									rules: [
										{ required: true, message: '联系电话不能为空' },
										{ pattern: /^1[34578](\d){9}$/, message: '联系电话格式错误' },
									],
								})(
									<Input type="text" placeholder="请输入影院联系电话" />
								)}
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<FormItem
								label='城市类别:'
								{...formItemLayout}
							>
								<Spin spinning={props.loading} tip="加载中..."  size="small">
									{
										getFieldDecorator('cityCate',{
											initialValue: props.contentItem[0] ?
															props.contentItem[0].archiveList ?
																props.contentItem[0].archiveList.map((item)=>{
																	// let i = parseInt(item.archive_value + 1).toString();
																	// return ({ key : i })
																	let label = (item.archive_content).toString();
																	return ({ label : label })
																}) : [] : [],
											rules:[{
												required:true,
												message:'请选择一个城市类别'
											}]
										})(
											<Select
												placeholder='请选择城市类别'
												labelInValue
											>
												{
													props.dropdownItem.citytype.length !== 0 ?
															props.dropdownItem.citytype.contList.map((item,index) => {
																let i = parseInt(index + 1).toString();
																return (<Option key={i}>{item[''+ i +'']}</Option>)
															}) :
															( <Option value="暂无">暂无</Option> )
												}
											</Select>
										)
									}
								</Spin>
							</FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={10} offset={6}>
							<FormItem>
							{
								props.contentType === 'update' ?
								<Button type="primary" size="large" onClick={handleUpdate}>保存修改</Button> :
							<Button type="primary" size="large" onClick={handleSubmit}>提交审核</Button>
							}
							</FormItem>
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	);
}

CinemaAlter.propTypes = {
  form: PropTypes.object,
  item: PropTypes.object,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};

export default Form.create()(CinemaAlter)
