import React from 'react'
import { Tabs, Checkbox, Spin } from 'antd'

const TabPane = Tabs.TabPane,
      CheckboxGroup = Checkbox.Group;

// Checkbox List
// props: {
//   plainOptions
// }
const CheckList = React.createClass({
  getInitialState(){
    return {
      checkedList: [],
      indeterminate: true,
      checkAll: false,
    }
  },
  onChange(checkedList){
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < this.props.plainOptions.length),
      checkAll: checkedList.length === this.props.plainOptions.length,
    });

    this.props.handleChange({
      checkedList,
      type: this.props.type
    });
  },
  onCheckAllChange(e){
    this.setState({
      checkedList: e.target.checked ? this.props.plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });

    this.props.handleChange({
      checkedList: e.target.checked ? this.props.plainOptions : [], 
      type: this.props.type
    });
  },
  render(){
    return (
      <div>
        <Checkbox
          indeterminate={this.state.indeterminate}
          onChange={this.onCheckAllChange}
          checked={this.state.checkAll}
        >
          全选
        </Checkbox>
        <CheckboxGroup options={this.props.plainOptions} value={this.state.checkedList} onChange={this.onChange} />
    </div>
    )
  }
});

const CinemaSelect = React.createClass({
  getInitialState(){
    return {
      Selected: {},
      total: 0
    }
  },
  buildSide(type, list){
    let SideList = [];
    list.map(cinema => {
      SideList.push(cinema.theatername);
    });

    return SideList;
  },
  buildTabs(){
    let _this = this,
        tabs = [];
    this.props.list.map((tab, index) => {
      tabs.push(
        <TabPane tab={tab.content} key={index + 1}>
          <CheckList type={tab.value} plainOptions={_this.buildSide(tab.value, tab.theaterList)} handleChange={_this.handleChange.bind(null, _this)} />
        </TabPane>
      );
    });

    return <Tabs type="card" defaultActiveKey="1">{ tabs }</Tabs>;
  },
  handleChange(e, value){
    const selectList = this.state.Selected;
    selectList['Side_' + value.type] = value.checkedList;
    this.setState({
      Selected: selectList
    });

    function isMatch(cinema){
      return cinema.theatername === current;
    }

    let TotalList = [];
    for (let key in this.state.Selected) {
      if (this.state.Selected.hasOwnProperty(key)) {
        this.state.Selected[key].map(Side => {
          function isMatch(cinema){
            return cinema.theatername === Side;
          }

          this.props.list.map(tab => {
            if( tab.value === parseInt(key.replace('Side_', '')) ){
              TotalList.push(tab.theaterList.find(isMatch).theaterid);
            }
          });
        });
      }
    }

    this.setState({
      total: TotalList.length
    });
    this.props.setValue(TotalList.join(","));
  },
  render(){
    return (
      <div style={{position: 'relative', width: '100%'}}>
        { this.buildTabs() }
        <span style={{position: 'absolute', top: '0', right: '0', fontSize: '14px'}}>
          已选影院： {this.state.total}
        </span>
      </div>
    );
  }
});

export default CinemaSelect
