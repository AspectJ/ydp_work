import React, { PropTypes } from 'react'
import { Router, Route, Redirect } from 'dva/router'
import AdminLogin from './routes/AdminLogin'
import Main from './routes/Main'
import ModifyPwd from './routes/ModifyPwd'
import CinemaManage from './routes/CinemaManage'
import UsersManage from './routes/UsersManage'
import NewsManage from './routes/NewsManage'
import ActivesManage from './routes/ActivesManage'
import ReleasesManage from './routes/ReleasesManage'
import SourcesManage from './routes/SourcesManage'
import BannerManage from './routes/BannerManage'
import AdminsManage from './routes/AdminsManage'

export default function({ history }) {
  return (
    <Router history={history}>
      <Redirect from="/" to="/cx/" />
      <Route path="/cx/login" component={AdminLogin} />
      <Router path="/cx" component={Main}>
        <Route breadcrumbName="修改密码" path="modifypwd" component={ModifyPwd} />
        <Route breadcrumbName="影院信息管理" path="cinemalist" component={CinemaManage} />
        <Route breadcrumbName="平台用户管理" path="usersmanage" component={UsersManage} />
        <Route breadcrumbName="资讯动态管理" path="newsmanage" component={NewsManage} />
        <Route breadcrumbName="最新活动管理" path="activesmanage" component={ActivesManage} />
        <Route breadcrumbName="发行通知管理" path="releasesmanage" component={ReleasesManage} />
        <Route breadcrumbName="素材物料管理" path="sourcesmanage" component={SourcesManage} />
        <Route breadcrumbName="首页轮播管理" path="bannermanage" component={BannerManage} />
        <Route breadcrumbName="系统用户管理" path="adminsmanage" component={AdminsManage} />
      </Router>
    </Router>
  );
};
