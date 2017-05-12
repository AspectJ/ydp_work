import React, { Component } from 'react'
import { Table, Form, Input, Button, Row, Col, DatePicker, Upload, Icon, Modal, message, Popconfirm } from 'antd'
import BillAlter from './BillAlter'
import BillTable from './BillTable'
import auth from '../../utils/auth'
import { baseUrl } from '../../services/requests'

const confirm = Modal.confirm;

class BillInfo extends Component {
    constructor(props){
        super(props);
    }
    //显示确认对话框
    showConfirm(num, idsProps){
        const _this = this;
        const confirmProps = {
            title:'确认提交此EXCEL表格吗？',
            content:`Excel中一共包含${num}条数据...`,
            cancelText:'取消提交',
            okText:'确认提交',
            onOk(){
                _this.props.switchTotal(_this.props.billconfid,_this.props.billconfname);
            },
            onCancel(){
                _this.props.handleCancelSubmit(idsProps.toString());
            }
        };
        confirm({...confirmProps})
    }

    render() {
        const BillTableProps = {...this.props};
        const BillCreateProps = {...this.props};
        const BillUpdateProps = {...this.props};
        //批量上传所用id
        const billconfid = this.props.billconfid;
        //批量上传
        const _this = this;
        const isCinema = () => {
			return JSON.parse(sessionStorage.getItem('user')).roletype === 2;
		};

        return (
            <div className="Content" style={isCinema() ? {width: '100%', left: '0'} : {}}>
                <h1 className="ContentHeader" >
                    {isCinema() ? '' : this.props.billconfname ? this.props.billconfname+' --' : ''} 财务账单列表
                </h1>
                <BillTable {...BillTableProps} />
            </div>
        )
    }
}

export default Form.create()(BillInfo);

