import React from 'react'
import { Menu, Icon, Modal, Badge  } from 'antd'
import { Link } from 'dva/router'
import styles from './TopMenu.less'
import auth from '../utils/auth'

const SubMenu = Menu.SubMenu;
const confirm = Modal.confirm

let TopMenu = ({
  log,
  adminname,
  logout,
}) => {

  function handleClick(e){
    switch (e.key) {
      case '-1':
        confirm({
          title: '确定退出吗?',
          onOk() {
            logout();
          },
          onCancel() {},
        });
        break;
      default:
    }
  }

  return (
    <div className={styles.antLayoutHeader}>
      <div className={styles.antLayoutWrapper}>
        <a href="http://www.xiaoxiangfilm.com/" target="_blank" className={styles.antLayoutLogo}></a>
        <Menu className={styles.topMenu} theme="dark" mode="horizontal" onClick={handleClick}>
          <Menu.Item key="3"><Link to="/cinemacloud/todos"><Icon type="exception" />工作台</Link></Menu.Item>
          {
            auth([102]).length ? 
              <Menu.Item key="0"><Link to="/cinemacloud/userlog"><Icon type="message" /><Badge dot={log > 0}>用户日志</Badge></Link></Menu.Item> : ''
          }
          <SubMenu title={<span>{adminname} <Icon type="down" /></span>}>
            <Menu.Item key="1"><Link to="/cinemacloud/modifypwd"><Icon type="setting" />修改密码</Link></Menu.Item>
            <Menu.Divider />
            <Menu.Item key="-1"><Icon type="poweroff" />退出</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
};

export default TopMenu
