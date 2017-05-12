import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
import styles from './AsideBar.less'

const SubMenu = Menu.SubMenu;

let AsideBar = ({ pathname }) => {
  const MENU_LIST = ['cinemalist', 'usersmanage', 'newsmanage', 'activesmanage', 'releasesmanage', 'sourcesmanage', 'bannermanage', 'adminsmanage'],
        defaultSelect = [(MENU_LIST.indexOf(pathname) + 1).toString()];

  return (
    <aside className={styles.antLayoutSider}>
      <Menu mode="inline" defaultSelectedKeys={defaultSelect} defaultOpenKeys={['sub1', 'sub2', 'sub3']}>
        <SubMenu key="sub1" title={<span><i className={"anticon " + styles.iconCinema}></i>影院管理</span>}>
          <Menu.Item key="1"><Link to='/cx/cinemalist'>影院信息管理</Link></Menu.Item>
          <Menu.Item key="2"><Link to='/cx/usersmanage'>平台用户管理</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="calendar" />信息管理</span>}>
          <Menu.Item key="3"><Link to="/cx/newsmanage">资讯动态管理</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/cx/activesmanage">最新活动管理</Link></Menu.Item>
          <Menu.Item key="5"><Link to="/cx/releasesmanage">发行通知管理</Link></Menu.Item>
          <Menu.Item key="6"><Link to="/cx/sourcesmanage">素材物料管理</Link></Menu.Item>
          <Menu.Item key="7"><Link to="/cx/bannermanage">首页轮播管理</Link></Menu.Item>
        </SubMenu>
        {
          sessionStorage.getItem('adminid') === '0' ?
            <SubMenu key="sub3" title={<span><Icon type="team" />系统管理</span>}>
              <Menu.Item key="8"><Link to="/cx/adminsmanage">系统用户管理</Link></Menu.Item>
            </SubMenu> : ''
        }
      </Menu>
    </aside>
  );
}

export default AsideBar
