import React, { Component } from 'react'
import { Table, Icon, Popconfirm, Input, Row, Col, Button, Form, Popover, Menu, Dropdown } from 'antd'
import FuncBar from './FuncBar'

const FormItem = Form.Item;
const Search = Input.Search;
const ButtonGroup = Button.Group;


class DataList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bindStatus: true,
      unbindStatus: false,
      unauditStatus: false,
      columnChoosem:"0",
      buttonText:'所有栏目',
      searchValue:null,
    }
  }
  //修改searchvalue
  changeValue(value){
    this.props.form.setFieldsValue({
      search:value
    })
  }

  //切换至修改页面
  handleEdit(record,event){
    const status = this.state.bindStatus === true ? 1 : 4;
    this.props.onSwitchEdit({
      ...record,
      status:status,
      columnChoosem:this.state.columnChoosem,
    });
  }
  //删除按钮
  handleDelete(record,event){
    //4是未绑定，1是已绑定
    const status = this.state.bindStatus === true ? 1 : 4;
    //如果在所有栏目中删除
    if(this.state.columnChoosem === "0"){
      this.props.onDataDelete({
        ...record,
        IsProgram_id:false
      });
      // return;
    } else {
      //在某栏目中删除
      this.props.onDataDelete({
        ...record,
        IsProgram_id:true
      });
      // return;
    }

    //其他删除
    // this.props.onDataDelete({
    //   ...record,
    //   status:status
    // });

  }
  // 搜索
  handleSearch = (value) => {
    // 判断过滤按钮是否在
    if(this.props.BtnFilter){
      // 如果是已绑定
      if( this.state.bindStatus ){
        this.props.onPageChange('bind', 1, value);

        return;
      // 如果是未绑定
      } else if( this.state.unbindStatus ){
        this.props.onPageChange('unbind', 1, value)

        return;
        //如果是未审核
      } else if( this.state.unauditStatus ){
        this.props.onPageChange('unaudit', 1, value);

        return;
      }
    }

    //判断栏目选择按钮是否在
    if(this.props.DropdownBtn){
      if(this.state.columnChoosem === "0"){
        this.props.onSearch(encodeURIComponent(value));

        return;
      } else {
        this.props.onSearchInColumn(encodeURIComponent(value),this.state.columnChoosem);

        return;
      }
    }

    this.props.onSearch(value);
  }

  //翻页
  handPageChange(params){
    const keyWord = this.props.form.getFieldValue('search') || '';
    const type    = this.state.bindStatus ? 'bind' :
                      this.state.unbindStatus ? 'unbind' :
                        this.state.unauditStatus ? 'unaudit' : '';
    //判断是否有带栏目
    if(this.props.DropdownBtn){
      //如果是所有栏目
      if(this.state.columnChoosem === "0"){
        this.props.onPageChange(params.current, keyWord);
      } else {
        this.props.handColumnPageChange(params.current,keyWord, this.state.columnChoosem);
      }
    } else {
      this.props.onPageChange(type, params.current, keyWord);
    }
  }

  //转换状态
  switchBind = () => {
    this.props.switchBind();
    this.setState({
      bindStatus:true,
      unbindStatus:false,
      unauditStatus: false
    })
  }

  //点击选择Column
  handleMenuClick = (item) => {
    if(item.key === '0'){
      this.props.form.setFieldsValue({
        search:null,
      })
    }
    this.setState({
      buttonText:item.item.props.children,
      columnChoosem:item.key
    })
    //key为program_id
    this.props.handleMenuClick(item.key);
  }

  switchUnbind = () => {
    this.props.switchUnbind();
    this.setState({
      bindStatus:false,
      unbindStatus:true,
      unauditStatus: false
    })
  }

  switchUnAudit = () => {
    this.props.switchUnAudit();
    this.setState({
      bindStatus:false,
      unbindStatus:false,
      unauditStatus: true
    });
  };

  columns = [{
    dataIndex: this.props.titleDataIndex,
    className: 'ListTitle',
    onCellClick:(values)=>{this.props.onSwitchInfo(values)},
    render:(text,record) => (
      <div>
        { text }
        {record.doc_url ?
          record.doc_url === '' ?
            '' : <Icon type="paper-clip" style={{color:'#f04134',fontSize:'14px',marginLeft:'10px'}}/>
        : ''
        }
      </div>
    )
  }, {
    className: 'ListHandle',
    render: (record) => (
      <div>
        {
          this.props.auth.edit ?
            <a style={{float: 'left' }} onClick={() => {this.handleEdit(record,event)}}><Icon type="edit" /></a> : ''
        }
        {
          this.props.auth.delete ?
            <Popconfirm title={'确定删除这条数据吗?'} onConfirm={() => this.handleDelete(record,event)} >
              <a style={{float: 'right'}}><Icon type="delete" /></a>
            </Popconfirm> : ''
        }
      </div>
    )
  }, {
    dataIndex: this.props.subDataIndex,
    className: 'ListSubtitle',
    onCellClick:(values)=>{this.props.onSwitchInfo(values)},
  }];


  render(){
    const pagination = {
      total:   this.props.total,
      current: this.props.current,
    };

    return (
      <div className="List">
        <div className="FuncBar">
          <Form layout="inline">
            {
              this.props.auth.add && this.props.BtnText ?
                <Row key="8" gutter={8}>
                  <Col span={14}>
                    <FormItem>
                    {
                      this.props.form.getFieldDecorator('search')(
                        <Search
                          key="IptSearch"
                          size="large"
                          placeholder="输入您要搜索的内容..."
                          onSearch={value => this.handleSearch(value)}
                          onChange={value => this.changeValue(value)}
                        />
                      )
                    }
                    </FormItem>
                  </Col>
                  <Col span={10}>
                    <Button
                      type="primary"
                      size="large"
                      icon="plus"
                      style={{width: '100%'}}
                      onClick={() => this.props.onAdd(this.state.columnChoosem)}
                    >
                      {this.props.BtnText}
                    </Button>
                    </Col>
                </Row>
                :
                <FormItem>
                  {
                    this.props.form.getFieldDecorator('search')(
                      <Search
                        key="IptSearch"
                        size="large"
                        style={{width: '344px'}}
                        placeholder="输入您要搜索的内容..."
                        onSearch={value => this.handleSearch(value)}
                      />
                    )
                  }
                </FormItem>
            }
          </Form>
        </div>
        {
          this.props.BtnFilter ?
            <div className="BtnFilter">
                <ButtonGroup className="FilterBtnGroup" defaultValue="bind">
                  <Button className="FilterButton" type={this.state.bindStatus === true ? "primary" : ''} value="bind" onClick={this.switchBind}>已绑定</Button>
                  <Button className="FilterButton" type={this.state.unbindStatus === true ? "primary" : ''} value="unbind" onClick={this.switchUnbind}>未绑定</Button>
                  <Button className="FilterButton" type={this.state.unauditStatus === true ? "primary" : ''} value="unaudit" onClick={this.switchUnAudit}>未审核</Button>
                </ButtonGroup>
            </div> : ''
        }
        {
          this.props.DropdownBtn ?
            <div className="BtnDropdownWrapper">
              <Dropdown overlay={
                <Menu onClick={this.handleMenuClick}>
                  {
                    this.props.dropdownItem ?
                      this.props.dropdownItem.columns ?
                        this.props.dropdownItem.columns.map((item) => {
                          return item.status == 1 ? (
                            <Menu.Item key={item.program_id}>{item.program_name}</Menu.Item>
                          ) : []
                        }) : (
                          <Menu.Item>正在查询,请等待......<Icon type="loading" style={{float:'right',marginTop:'2px'}}/></Menu.Item>
                        )
                    : ''
                  }
                  <Menu.Item key="0">所有栏目</Menu.Item>
                </Menu>
              } trigger={['click']}>
                <Button type="primary" className="BtnDropdown" size="large">
                  {this.state.buttonText} <Icon type="down" />
                </Button>
              </Dropdown >
            </div> : ''
        }
        <Table
          dataSource={this.props.list}
          columns={this.columns}
          showHeader={false}
          rowClassName={() => {return 'ListRow'}}
          rowKey={this.props.rowKey}
          loading={this.props.loading}
          onChange={current => this.handPageChange(current)}
          pagination={this.props.total ? pagination : false}
        />
      </div>
    )
  }
}


export default Form.create()(DataList)
