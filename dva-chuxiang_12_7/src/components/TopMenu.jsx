import React from 'react'
import { Menu, Icon, Modal } from 'antd'
import { Link } from 'dva/router'
import styles from './TopMenu.less'

const SubMenu = Menu.SubMenu;
const confirm = Modal.confirm

let TopMenu = ({
  adminname,
  logout,
}) => {
  function handleClick(e){
    switch (e.key) {
      case '2':
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
        <a href="http://cp.yidepiao.net:8080/index.html" target="_blank" className={styles.antLayoutLogo}></a>
        <Menu className={styles.topMenu} theme="dark" mode="horizontal" onClick={handleClick}>
          <SubMenu title={<span><Icon type="user" />{adminname} <Icon type="down" /></span>}>
            <Menu.Item key="1"><Link to="/cx/modifypwd">修改密码</Link></Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2"><Icon type="poweroff" />退出</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  );
};

export default TopMenu
