import React from 'react'
import { connect } from 'dva'
import { Icon, Layout } from 'antd'
import { Link } from 'dva/router'
import AsideBar from '../components/AsideBar'
import TopMenu from '../components/TopMenu'
import styles from './Main.less'


const Main = React.createClass({
  getInitialState(){
    return {
      collapse: false
    }
  },
  onCollapseChange(){
    this.setState({
      collapse : !this.state.collapse
    })
  },
  render(){
    const that = this;
    const TopMenuProps = {
      log: that.props.app.log,
      adminname: JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')).username : '请先登录',
      logout(){
        that.props.dispatch({
          type: 'app/AdminLogout'
        });
      }
    };
    const AsideBarProps = {
      pathname: location.pathname.split('/').pop(),
      collapse: this.state.collapse,
      onCollapseChange(){
        that.onCollapseChange();
      }
    };

    return (
      <div className={styles.layoutTopaside}>
        <TopMenu {...TopMenuProps} />
        <div className={styles.layoutWrapper}>
          <div className={styles.layoutContainer}>
            <AsideBar {...AsideBarProps} />
            <div className={this.state.collapse ? styles.layoutContent + ' ' + styles.layoutContentCollapse : styles.layoutContent}>
              { this.props.children }
            </div>
          </div>
        </div>
      </div>
    )
  }
});

function mapStateToProps(state){
  return {
    app: state.app
  };
}

export default connect(mapStateToProps)(Main)
