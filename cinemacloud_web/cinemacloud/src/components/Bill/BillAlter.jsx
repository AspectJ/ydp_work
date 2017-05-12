import React, { Component } from 'react'
import { Table, Icon, Radio, Badge, Input, Row, Col, Button, Form, DatePicker, Select } from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

class BillAlter extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(value){
        
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue)=>{
            if(!err){
                const values = {
                    ...fieldsValue,
                    billconfid:this.props.billconfid,
                    suppliesconfname:this.props.suppliesconfname,
                    sendtime:fieldsValue['sendtime'].format('YYYY-MM-DD'),
                }
                this.props.handleSubmit(values)
            }
        })
    }

    render(){
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
        };
        const { getFieldDecorator } = this.props.form;
        const dateFormat = 'YYYY/MM/DD';

        return (
            <div style={{padding:'40px'}} >
                <Col span={10}>
                    <Form>
                        <FormItem
                            label='影院'
                            {...formItemLayout}
                        >
                            {
                                getFieldDecorator('theaterid',{
                                    rules:[{
                                        required:true,
                                        message:'请选择影院'
                                    }]
                                })(
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        onChange={ this.handleChange }
                                        filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                        placeholder='请选择一个影院'
                                    >
                                        {
                                            this.props.dropdownItem.map((item) => {
                                                return (<Option key={item.theaterid}>{item.theatername}</Option>)
                                            })
                                        }
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem
                            label='内容'
                            {...formItemLayout}
                        >
                            {
                                getFieldDecorator('content',{
                                    rules:[{
                                        required:true,
                                        message:'请填写内容'
                                    }]
                                })(<Input placeholder='请填写内容'/>)
                            }
                        </FormItem>
                        <FormItem
                            label='快递单号'
                            {...formItemLayout}
                        >
                            {
                                getFieldDecorator('waybill',{
                                    rules:[{
                                        required:true,
                                        message:'请填写快递单号'
                                    }]
                                })(<Input placeholder='请填写快递单号'/>)
                            }
                        </FormItem>
                        <FormItem
                            label='状态'
                            {...formItemLayout}
                        >
                            {
                                getFieldDecorator('status',{
                                    rules:[{
                                        required:true,
                                        message:'请选择一个状态'
                                    }]
                                })(
                                    <Select placeholder='请选择一个状态'>
                                        <Option value="1">已发送</Option>
                                        <Option value="0">未发送</Option>
                                        <Option value="2">已收到</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem
                            label='发货日期'
                            {...formItemLayout}
                        >
                            {
                                getFieldDecorator('sendtime',{
                                    rules:[{
                                        required:true,
                                        message:'请选择一个日期'
                                    }]
                                })(
                                    <DatePicker format={dateFormat}/>
                                )
                            }
                        </FormItem>
                        <FormItem
                            label='快递公司'
                            {...formItemLayout}
                        >
                            {
                                getFieldDecorator('logistics',{
                                    rules:[{
                                        required:true,
                                        message:'请填写物流公司'
                                    }]
                                })(<Input placeholder='请填写物流公司'/>)
                            }
                        </FormItem>
                        <FormItem>
                            <Row type="flex" justify="center">
                                <Col span={6}>
                                    <Button onClick={() => this.props.switchTotal()}>取消并返回</Button>
                                </Col>
                                <Col span={6}>
                                    <Button type="primary" size="large" onClick={this.handleSubmit}>提交</Button>
                                </Col>
                            </Row>
                        </FormItem>
                    </Form>
                </Col>
            </div>
        )
    }
}

export default Form.create()(BillAlter)
