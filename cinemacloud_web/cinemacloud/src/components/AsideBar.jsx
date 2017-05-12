import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
import styles from './AsideBar.less'
import auth from '../utils/auth'

const AsideBar = React.createClass({
  render(){
    const collapse = this.props.collapse;
    const MENU_LIST = auth([35, 25, 15, 95, 65, 45, 85, 124]);

    return (
      <div className={ collapse ? styles.layoutAside + " " + styles.layoutAsideCollapse : styles.layoutAside }>
        <aside className={"asidebar " + styles.antLayoutSider}>
          <Menu mode="inline" defaultSelectedKeys={[this.props.pathname]}>
            {
              MENU_LIST.indexOf(35) >= 0 ?
                <Menu.Item key="Cinema">
                  <Link to='/cinemacloud/Cinema'>
                    <i className={"anticon iconCinema " + styles.localIcon}></i>
                    {!collapse && <span className={styles.navText}>加盟影院</span>}
                  </Link>
                </Menu.Item> : ''
            }
            {
              MENU_LIST.indexOf(25) >= 0 || MENU_LIST.indexOf(15) >= 0 ?
                <Menu.SubMenu key="Member" title={<span className={styles.navText}><i className={"anticon iconRole " + styles.localIcon}></i>成员管理</span>}>
                  {
                    MENU_LIST.indexOf(25) >= 0 ?
                      <Menu.Item key="Role">
                        <Link to='/cinemacloud/Role'>
                          {!collapse && <span style={{fontSize: '14px'}}>角色设置</span>}
                        </Link>
                      </Menu.Item> : ''
                  }
                  {
                    MENU_LIST.indexOf(15) >= 0 ?
                      <Menu.Item key="User">
                        <Link to="/cinemacloud/User">
                          {!collapse && <span style={{fontSize: '14px'}}>用户列表</span>}
                        </Link>
                      </Menu.Item> : ''
                  }
                </Menu.SubMenu> : ''
            }
            {
              JSON.parse(sessionStorage.getItem('user')) && JSON.parse(sessionStorage.getItem('user')).roletype !== 2 || MENU_LIST.indexOf(95) >= 0 || MENU_LIST.indexOf(124) >= 0 ?
                <Menu.SubMenu key="Content" title={<span className={styles.navText}><Icon type="bars" />内容管理</span>}>
                  {
                    JSON.parse(sessionStorage.getItem('user')) && JSON.parse(sessionStorage.getItem('user')).roletype !== 2 ?
                        <Menu.Item key="Column">
                          <Link to="/cinemacloud/Column">
                            {!collapse && <span style={{fontSize: '14px'}}>栏目管理</span>}
                          </Link>
                        </Menu.Item> : ''
                  }
                  {
                    MENU_LIST.indexOf(95) >= 0 ?
                      <Menu.Item key="Notice">
                        <Link to="/cinemacloud/Notice">
                          {!collapse && <span style={{fontSize: '14px'}}>文章管理</span>}
                        </Link>
                      </Menu.Item> : ''
                  }
                  {
                    MENU_LIST.indexOf(124) >= 0 ?
                      <Menu.Item key="Activity">
                        <Link to="/cinemacloud/Activity">
                          {!collapse && <span style={{fontSize: '14px'}}>活动通知</span>}
                        </Link>
                      </Menu.Item> : ''
                  }
                </Menu.SubMenu> : ''
            }
            {
              MENU_LIST.indexOf(65) >= 0 || MENU_LIST.indexOf(45) >= 0 || MENU_LIST.indexOf(85) >= 0 ?
                <Menu.SubMenu key="Batch" title={<span className={styles.navText}><i className={"anticon iconFfers " + styles.localIcon}></i>批次管理</span>}>
                  {
                    MENU_LIST.indexOf(65) >= 0 ?
                      <Menu.Item key="Allot">
                        <Link to="/cinemacloud/Allot">
                          {!collapse && <span style={{fontSize: '14px'}}>物料分发</span>}
                        </Link>
                      </Menu.Item> : ''
                  }
                  {
                    MENU_LIST.indexOf(45) >= 0 ?
                      <Menu.Item key="Ffers">
                        <Link to="/cinemacloud/Ffers">
                          {!collapse && <span style={{fontSize: '14px'}}>回盘批次</span>}
                        </Link>
                      </Menu.Item> : ''
                  }
                  {
                    MENU_LIST.indexOf(85) >= 0 ?
                      <Menu.Item key="Bill">
                        <Link to="/cinemacloud/Bill">
                          {!collapse && <span style={{fontSize: '14px'}}>账单批次</span>}
                        </Link>
                      </Menu.Item> : ''
                  }
                </Menu.SubMenu> : ''
            }
            {
              JSON.parse(sessionStorage.getItem('user')) && JSON.parse(sessionStorage.getItem('user')).roletype !== 0 ?
                <Menu.Item key="Introduce">
                  <Link to="/cinemacloud/Introduce">
                    <Icon type="layout" />
                    {!collapse && <span className={styles.navText}>院线介绍</span>}
                  </Link>
                </Menu.Item> : ''
            }
            {
              JSON.parse(sessionStorage.getItem('user')) && JSON.parse(sessionStorage.getItem('user')).roletype !== 0 ?
                <Menu.Item key="Helpme">
                  <Link to="/cinemacloud/Helpme">
                    <Icon type="question-circle-o" />
                    {!collapse && <span className={styles.navText}>帮助文档</span>}
                  </Link>
                </Menu.Item> : ''
            }
          </Menu>
          <div className={styles.asideAction} onClick={this.props.onCollapseChange}>
            {collapse ? <Icon type="right" /> : <Icon type="left" />}
          </div>
        </aside>
      </div>
    );
  }
});

export default AsideBar