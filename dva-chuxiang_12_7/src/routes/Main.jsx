import React, { PropTypes } from 'react'
import { connect } from 'dva'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'dva/router'
import styles from './Main.less'
import AsideBar from '../components/AsideBar'
import TopMenu from '../components/TopMenu'

let Main = ({ location, dispatch, children, app }) => {
  const TopMenuProps = {
    adminname: sessionStorage.getItem('nickname'),
    logout(){
      dispatch({
        type: 'app/AdminLogout'
      });
    }
  };

  const AsideBarProps = {
    pathname: location.pathname.split('/').pop()
  };

  return (
    <div className={styles.antLayoutTopaside}>
      <TopMenu {...TopMenuProps} />
      <div className={styles.antLayoutWrapper}>
        <div className={styles.antLayoutBreadcrumb}>
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>{ children.props.route.breadcrumbName }</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={styles.antLayoutContainer}>
          <AsideBar {...AsideBarProps} />
          <div className={styles.antLayoutContent}>
            { children }
          </div>
        </div>
        <div className={styles.antLayoutFooter}>
          © 2016 由湖南易得票提供技术支持
        </div>
      </div>
    </div>
  )
};

Main.PropTypes = {
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps({ app }){
  return { app };
}

export default connect(mapStateToProps)(Main)
