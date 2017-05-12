import React, {Component} from 'react'
import { Button, Table, Popconfirm, pagination, Form, Row, Col, Input, Select, Icon } from 'antd'
import auth from '../../utils/auth'

class UserInfo extends Component {
    constructor(props) {
      super(props);
      //0无显示，1院线，2影院
      this.state = {
        categoryChange:'0',
      }
    }
    //显示切换
    onCategoryChange = (value) => {
      if(value === '0'){
        this.setState({
          categoryChange:'0'
        })
      } else if(value === '1'){
        this.setState({
          categoryChange:'1'
        })
      } else {
        this.setState({
          categoryChange:'2'
        })
        this.props.queryRoleCinema();
      }
    }
    //翻页
    handPageChange(params){
      this.props.handPageChange(params);
    }
    //搜索
    onSearch = () => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.onSearch({
            criteria: values.criteria || '',
            sel_roletype: values.sel_roletype || '',
            sel_theaterid: values.sel_theaterid || '',
            audit_flag: values.audit_flag || '',
            status: values.status || '',
            isConcern: values.isConcern || '',
            mobile:values.mobile || ''
          })
        }
      });
    }
    //清除
    onClear = () => {
      this.props.form.resetFields();
      this.setState({
        categoryChange:'0'
      })
    }

    render() {
      const Option = Select.Option;
      const FormItem = Form.Item;

      const pagination = {
        total:   this.props.total,
        current: this.props.current,
      };

      const columns =[{
        title:'用户名',
        dataIndex:'username',
        key:'username',
        className:'columnTextCenter',
      },{
        title:'角色类型',
        dataIndex:'roletype',
        key:'roletype',
        className:'columnTextCenter',
        render:(text,record)=>{
          if(text === 0){
            return <div>系统用户</div>
          } else if(text === 1){
            return <div>院线用户</div>
          } else {
            return <div>影院用户</div>
          }
        }
      },{
        title:'角色名',
        dataIndex:'rolename',
        key:'rolename',
        className:'columnTextCenter',
      },{
        title:'手机号码',
        dataIndex:'mobile',
        key:'mobile',
        className:'columnTextCenter',
      },{
        title:'影院/院线',
        key:'theater',
        className:'columnTextCenter',
        render(text, record){
          if( record.roletype !== 0 ){
            return record.theatername ? <span>{record.theatername}</span> : <span>{record.theaterchainname}</span>
          }
        }
      },{
        title:'真实姓名',
        dataIndex:'realname',
        key:'realname',
        className:'columnTextCenter',
      },{
        title:'创建日期',
        dataIndex:'createtime',
        key:'createtime',
        className:'columnTextCenter',
        render:(text,record) => {
          return record.createtime.substring(0,text.indexOf(' '))
        }
      },{
        title:'启用状态',
        dataIndex:'status',
        key:'status',
        className:'columnTextCenter',
        render(text){
          if( text === 0 ){
            return <span>已禁用</span>
          } else {
            return <span>已启用</span>
          }
        }
      }, {
        title:'审核状态',
        dataIndex:'audit_flag',
        key:'audit_flag',
        className:'columnTextCenter',
        render(text){
          if( text === 0 ){
            return <span>未审核</span>
          } else {
            return <span>已审核</span>
          }
        }
      }];

      Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
      };

      if(this.props.contentItem.length){
        if(this.props.contentItem[0].roletype === 0){
          //系统用户
        } else if(this.props.contentItem[0].roletype === 1){
          //院线用户
          columns.insert(3,{
            title:'所属院线',
            dataIndex:'theaterchainname',
            key:'theaterchainname',
            className:'columnTextCenter',
            render:(text,record) => {
              return text
            }
          })
        } else {
          //影院用户
          columns.insert(3,{
            title:'所属影院',
            dataIndex:'theatername',
            key:'theatername',
            className:'columnTextCenter',
            render:(text,record) => {
              return text
            }
          })
        }
      }

      if( auth(['16']).length >= 0 ){
        columns.push({
          title:'操作',
          dataIndex:'operation',
          key:'operation',
          className:'columnTextCenter',
          render: (text, record) => {
            return (
              <div>
                <Popconfirm title={"确认" + this.props.contentItem[0].status === 0 ? "启用" : "禁用" + "该用户吗？"} onConfirm={() => this.props.onToggle(record)}>
                  <a href="#" style={{marginRight: '5px'}}>{this.props.contentItem[0].status === 0 ? "启用" : "禁用"}</a>
                </Popconfirm>
                {
                  this.props.contentItem[0].audit_flag === 0 ?
                    <a onClick={() => this.props.onVerify(record)}>审核</a> :
                    <Popconfirm title="确认取消审核吗？" onConfirm={() => this.props.onVerify(record)}>
                      <a href="#">取消审核</a>
                    </Popconfirm>
                }
              </div>
            )
          }
        });
      }

      return (
        <div className="Content" style={{ width: '100%', left: '0' }}>
          <h1 className="ContentHeader">用户信息</h1>
          <div className="ContentBody">
            {
              JSON.parse(sessionStorage.getItem('user')).roletype === 2 ?
                '' : (
                <div style={{padding:'20px',minWidth:'1100px'}}>
                  <div style={{ display: 'inline-block', width: '100%'}}>
                    <Form>
                      <Row gutter={16}>
                        <Col span={3}>
                          <FormItem>
                            {
                              this.props.form.getFieldDecorator('criteria')(
                                <Input size="large" placeholder="输入用户名称查询" />
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col span={3}>
                          <FormItem>
                            {
                              this.props.form.getFieldDecorator('mobile')(
                                <Input size="large" placeholder="输入手机号查询" />
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col span={2}>
                          <FormItem>
                            {
                              this.props.form.getFieldDecorator('sel_roletype')(
                                <Select
                                  size="large"
                                  placeholder="选择角色类型"
                                  style={{ width: '100%' }}
                                  onChange={this.onCategoryChange}
                                >
                                  {
                                    JSON.parse(sessionStorage.getItem('user')).roletype === 0 ? (
                                      <Option value="0">系统用户</Option>
                                    ) : []
                                  }
                                  <Option value="1">院线用户</Option>
                                  <Option value="2">影院用户</Option>
                                </Select>
                              )
                            }
                          </FormItem>
                        </Col>
                        {
                          this.state.categoryChange === '-1' ? '' : this.state.categoryChange === '1' ?  (
                            <Col span={4}>
                              <FormItem>
                                {
                                  this.props.form.getFieldDecorator('theaterchainid')(
                                    <Select size="large" placeholder="选择院线" style={{ width: '100%' }}>
                                      <Option value="潇湘院线">潇湘院线</Option>
                                    </Select>
                                  )
                                }
                              </FormItem>
                            </Col>
                          ) : this.state.categoryChange === '2' ? (
                            <Col span={4}>
                              <FormItem>
                                {
                                  this.props.form.getFieldDecorator('sel_theaterid')(
                                    <Select
                                      showSearch
                                      optionFilterProp="children"
                                      filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                      size="large"
                                      placeholder="选择影院"
                                      style={{ width: '100%' }}
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
                          ) : ''
                        }
                        <Col span={2}>
                          <FormItem>
                            {
                              this.props.form.getFieldDecorator('status')(
                                <Select size="large" placeholder="启用状态" style={{ width: '100%' }}>
                                  <Option value="0">禁用</Option>
                                  <Option value="1">启用</Option>
                                </Select>
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col span={2}>
                          <FormItem>
                            {
                              this.props.form.getFieldDecorator('audit_flag')(
                                <Select size="large" placeholder="审核状态" style={{ width: '100%' }}>
                                  <Option value="0">未审核</Option>
                                  <Option value="1">已审核</Option>
                                </Select>
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col span={3}>
                          <FormItem>
                            {
                              this.props.form.getFieldDecorator('isConcern')(
                                <Select size="large" placeholder="绑定企业号状态" style={{ width: '100%' }}>
                                  <Option value="1">获取已关注成员列表</Option>
                                  <Option value="4">获取未关注成员列表</Option>
                                </Select>
                              )
                            }
                          </FormItem>
                        </Col>
                        <Col span={4}>
                          <Button size="large" type="primary" icon="search" onClick={this.onSearch}>搜索</Button>
                          <Button size="large" style={{ marginLeft: '10px' }} onClick={this.onClear}>清除</Button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </div>
              )
            }
            <Table
              columns={columns}
              dataSource={this.props.contentItem}
              loading={this.props.loading}
              rowKey={this.props.rowkey}
              pagination={this.props.total ? pagination : false}
              onChange={current => this.handPageChange(current)}
            />
          </div>
        </div>
      )
    }
}

export default Form.create()(UserInfo)
