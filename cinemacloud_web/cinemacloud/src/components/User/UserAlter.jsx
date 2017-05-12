import React, { Component, PropTypes } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Spin } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class UserAlter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryChange:'0',
		}
	}
  //跟据选择显示/隐藏
	onCategoryChange = (value) => {

		if(value === '1'){
			//院线
			this.setState({
				categoryChange:'1',
			})
			this.props.findTheater(value);
			this.props.form.setFieldsValue({
				theaterid:'',
				roleid:''
			})
		} else if(value === '2'){
			//影院
			this.setState({
				categoryChange:'2',
			})
			this.props.findTheater(value);
			this.props.form.setFieldsValue({
				theaterchainid:'',
				roleid:''
			})
		} else {
			//系统
			this.setState({
				categoryChange:'0',
			})
			this.props.findRole({
				roletype:value,
			});
			this.props.form.setFieldsValue({
				roleid:''
			})
		}

    }
    //选择所属院线
    onBelongCinemaChainChange = (value) => {
    	this.props.findRole({
    		roletype:this.state.categoryChange,
    		theaterchainid:value
    	})
    }

    //选择所属影院
    onBelongCinemaChange = (value) => {
    	this.props.findRole({
    		roletype:this.state.categoryChange,
    		theaterid:value
    	})
    }

    //提交表单
    handleSubmit = () => {
    	this.props.form.validateFields((err, values) => {
    		if(!err){
    			const values = this.props.form.getFieldsValue(['username','password','mobile','email','roletype','theaterchainid','theaterid','roleid']);
    			const encodeName = encodeURIComponent(this.props.form.getFieldValue('realname'));

    			this.props.handleSubmit({
    				...values,
					password: values.username,
    				realname: encodeName
    			})
    		}
    	})
    }

    //没用到此方法
	handleFocus = () => {
		// let params = {};

		// const roletype = this.props.contentItem[0].roletype;

		// if( roletype === 1 ) {
		// 	params.theaterchainid = this.props.contentItem[0].theaterchainid;
		// } else if( roletype === 2 ) {
		// 	params.theaterid = this.props.contentItem[0].theaterid;
		// }

		// params.roletype = roletype;

		// params.status = this.props.bindStatus;

		// this.props.findRole(params);
	}

    handleUpdate = () => {
    	this.props.form.validateFields((err,values) => {
    		if(!err){
				let params = {
    				email:  this.props.form.getFieldsValue(['email']).email,
    				userid: this.props.contentItem[0].userid,
    			};

				if( this.props.contentItem[0].rolename === this.props.form.getFieldValue('roleid') ){
					params.roleid = this.props.contentItem[0].roleid;
				} else {
					params.roleid = this.props.form.getFieldValue('roleid');
				}

				params.status = this.props.bindStatus;

    			this.props.handleUpdate(params);
    		}
    	})
    }

    // 角色类型下拉框
	buildRoleType = () => {
	  const roletype = JSON.parse(sessionStorage.getItem('user')).roletype,
	    	typeList = ['系统用户', '院线用户', '影院用户'];

	  let RoleType = [];
	  for( let i = parseInt(roletype); i < typeList.length ; i++ ){
		  RoleType.push(<Option key={i}>{typeList[i]}</Option>);
	  }

	  return RoleType;
  	}

    render(){

    	const theaterchainname = this.props.contentItem[0] ? this.props.contentItem[0].theaterchainname : false;
    	const theaterid = this.props.contentItem[0] ? this.props.contentItem[0].theatername : false;
    	const {
    		getFieldDecorator,
    		getFieldValue,
    		validateFields
    	} = this.props.form;

		const formItemLayout = {
	      labelCol: { span: 6 },
	      wrapperCol: { span: 18 },
	    };

	    const tailFormItemLayout = {
	      wrapperCol: {
	        span: 14,
	        offset: 1,
	      },
	    };


		return (
			<div className="Content">
				<h1 className="ContentHeader">
					{this.props.bannerTitle}
					{
						this.props.goBackBtn ?
						<Button type="primary" style={{float:'right',marginTop:'16px',marginRight:'40px'}} onClick={this.props.goBack}>
							<Icon type="left" />取消并返回
						</Button> : ''
					}
				</h1>
				<div className="ContentBody">
			      <Form layout="horizontal" style={{float:'left',width:'400px',marginTop:'30px'}}>
			      	<Row>
			      		<Col span={24}>
			      			<FormItem
			      				label = '用户账号:'
			      				{...formItemLayout}
								extra="初始密码与用户账号相同"
			      			>
			      				{
			      					getFieldDecorator('username',{
			      						initialValue: this.props.contentItem[0] ? this.props.contentItem[0].username : '',
			      						rules:[{
			      							required:true,
			      							message:'请输入您的登录名'
			      						}, {
			      							pattern:/^[A-Za-z0-9_]{6,12}$/,
			      							message:'登录名为6-12位字符, 由中英文数字组成'
			      						}]
			      					})(
			      						<Input type="text" placeholder="请输入用户名称" disabled = {this.props.contentType === 'update' ? true : false}/>
		      						)

			      				}
			      			</FormItem>
			      		</Col>
			      	</Row>
			      	<Row>
			      		<Col span={24}>
			      			<FormItem
			      				label = '真实姓名:'
			      				{...formItemLayout}
			      			>
			      				{
			      					getFieldDecorator('realname',{
			      						initialValue: this.props.contentItem[0] ? this.props.contentItem[0].realname : '',
			      						rules:[{
			      							max:12,
			      							required:true,
			      							message:'请输入正确的真实姓名'
			      						}]
			      					})(
			      						<Input type="text" placeholder="请输入联系人" disabled = {this.props.contentType === 'update' ? true : false}/>
		      						)

			      				}
			      			</FormItem>
			      		</Col>
			      	</Row>
			      	<Row>
			      		<Col span={24}>
			      			<FormItem
			      				label = '联系电话:'
			      				{...formItemLayout}
			      			>
			      				{
			      					getFieldDecorator('mobile',{
			      						initialValue: this.props.contentItem[0] ? this.props.contentItem[0].mobile : '',
			      						rules:[{
			      							required:true,
			      							message:'请输入常用的联系电话'
			      						},
			      						{
		      								pattern: /^1[34578](\d){9}$/,
		      								message: '联系电话格式错误'
		      							}],
			      					})(
			      						<Input type="text" placeholder="请输入常用的联系电话" disabled = {this.props.contentType === 'update' ? true : false}/>
		      						)
			      				}
			      			</FormItem>
			      		</Col>
			      	</Row>
			      	<Row>
			      		<Col span={24}>
			      			<FormItem
			      				label = '常用邮箱:'
			      				{...formItemLayout}
			      			>	{
			      					getFieldDecorator('email',{
			      						initialValue: this.props.contentItem[0] ? this.props.contentItem[0].email : '',
			      						rules:[{
			      							type:'email',
			      							required:true,
			      							message:'请输入常用的电子邮箱'
			      						}]
			      					})(
			      						<Input type="text" placeholder="请输入常用的电子邮箱"/>
		      						)
			      				}
			      			</FormItem>
			      		</Col>
			      	</Row>
			      	<Row>
			      		<Col span={24}>
			      			<FormItem
			      				label = '用户类别:'
			      				{...formItemLayout}
			      			>
			      				{
			      					getFieldDecorator('roletype',{
			      						initialValue: this.props.contentItem[0] ?
			      									  this.props.contentItem[0].roletype === 0 ?
			      									  '系统用户' :
			      									  this.props.contentItem[0].roletype === 1 ?
			      									  '院线用户' : '影院用户' : [],
			      						rules:[{
			      							required:true,
			      							message:'请选择用户类别'
			      						}]
			      					})(
			      						<Select placeholder="请选择用户类别" onChange={this.onCategoryChange} disabled = {this.props.contentType === 'update' ? true : false}>
			      							{ this.buildRoleType() }
			      						</Select>
		      						)
			      				}
			      			</FormItem>
			      		</Col>
			      	</Row>
	      			{
	      				this.state.categoryChange === '1' || theaterchainname ? (
	      					<Row>
	      						<Col span={24}>
	      							<FormItem
	      								label = "所属院线"
	      								{...formItemLayout}
	      							>
	      								{
	      									getFieldDecorator('theaterchainid',{
	      										initialValue: this.props.contentItem[0] ? this.props.contentItem[0].theaterchainname : [],
	      										rules:[{
	      											required:true,
	      											message:'请选择所属院线'
	      										}]
	      									})(
			      								<Select showSearch
			      										onChange = { this.onBelongCinemaChainChange }
			      										optionFilterProp="children"
			      										filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
			      										disabled = {this.props.contentType === 'update' ? true : false}
	      										>
			      									{
			      										this.props.dropdownItem.belong.length ?
		      											this.props.dropdownItem.belong.map((item) => {
		      												return (<Option key={item.theaterchainid}>{item.theaterchainname}</Option>)
		      											}) : <Option key="theaterloading" disabled>加载中.. <Icon type="loading" style={{float: 'right', lineHeight: '18px'}} /></Option>
			      									}
			      								</Select>
      										)
	      								}
	      							</FormItem>
	      						</Col>
	      					</Row>
      					) : this.state.categoryChange === '2' || theaterid ?
      					(
	      					<Row>
	      						<Col span={24}>
	      							<FormItem
	      								label = "所属影院"
	      								{...formItemLayout}
	      							>
	      								{
	      									getFieldDecorator('theaterid',{
	      										initialValue:this.props.contentItem[0] ? this.props.contentItem[0].theatername : [],
	      										rules:[{
	      											required:true,
	      											message:'请选择所属影院'
	      										}]
	      									})(
			      								<Select showSearch
			      										onChange = { this.onBelongCinemaChange }
			      										optionFilterProp="children"
			      										filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
			      										disabled = {this.props.contentType === 'update' ? true : false}
	      										>
			      									{
			      										this.props.dropdownItem.cinema.length ?
				      										this.props.dropdownItem.cinema.map((item) => {
				      											return (<Option key={item.theaterid}>{item.theatername}</Option>)
				      										}) : <Option key="cinemaloading" disabled>加载中.. <Icon type="loading" style={{float: 'right', lineHeight: '18px'}} /></Option>
			      									}
			      								</Select>
      										)
	      								}
	      							</FormItem>
	      						</Col>
	      					</Row>
      					) : ''
	      			}
			      	<Row>
			      		<Col span={24}>
			      			<FormItem
			      				label = '角色设置:'
			      				{...formItemLayout}
			      			>
			      				<Spin spinning={this.props.loading} tip="加载中..." size="small">
				      				{
				      					getFieldDecorator('roleid',{
				      						initialValue: this.props.contentItem[0] ? this.props.contentItem[0].rolename : [],
				      						rules:[{
				      							required:true,
				      							message:'请选择角色类型'
				      						}]
				      					})(
						      				<Select placeholder="请选择角色类型" onFocus={this.handleFocus}>
						      					{
						      						this.props.dropdownItem.role.length ?
				  										this.props.dropdownItem.role.map((item) => {
				  											return (<Option key={item.roleid}>{item.rolename}</Option>)
				  										}) : []
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
				      			this.props.contentType === 'update' ?
				      			<Button type="primary" size="large" onClick={this.handleUpdate}>保存修改</Button> :
		          				<Button type="primary" size="large" onClick={this.handleSubmit}>提交审核</Button>
				      		}
		        			</FormItem>
				      	</Col>
				      </Row>
			      </Form>
		        </div>
			</div>
		)
    }
}

export default Form.create({})(UserAlter);



