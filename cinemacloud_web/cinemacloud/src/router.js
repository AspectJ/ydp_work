import React, { PropTypes } from 'react'
import { Router, Route, Redirect } from 'dva/router'
import LoginRegist     from './routes/LoginRegist'
import Main            from './routes/Main'
import ModifyPwd       from './routes/ModifyPwd'
import Todos           from './routes/Todos'
import UserLog         from './routes/UserLog'
import CinemaManage    from './routes/CinemaManage'
import RoleManage      from './routes/RoleManage'
import UserManage      from './routes/UserManage'
import ColumnManage    from './routes/ColumnManage'
import NoticeManage    from './routes/NoticeManage'
import ActivityManage  from './routes/ActivityManage'
import AllotManage     from './routes/AllotManage'
import FfersManage     from './routes/FfersManage'
import BillManage      from './routes/BillManage'
import IntroduceManage from './routes/IntroduceManage'
import Helpme          from './routes/Helpme'

export default function({ history }) {
  return (
    <Router history={history}>
      <Redirect from="/cinemacloud" to="/cinemacloud/Login" />
      <Route path="/cinemacloud/Login" component={LoginRegist} />
      <Route path="/cinemacloud/Regist" component={LoginRegist} />
      <Router path="/cinemacloud" component={Main}>
        <Route path="modifypwd" component={ModifyPwd} />
        <Route path="userlog" component={UserLog} />
        <Route path="todos" component={Todos} />
        <Route breadcrumbName="加盟影院" path="Cinema" component={CinemaManage} />
        <Route breadcrumbName="角色设置" path="Role" component={RoleManage} />
        <Route breadcrumbName="用户列表" path="User" component={UserManage} />
        <Route breadcrumbName="栏目管理" path="Column" component={ColumnManage} />
        <Route breadcrumbName="文章管理" path="Notice" component={NoticeManage} />
        <Route breadcrumbName="活动通知" path="Activity" component={ActivityManage} />
        <Route breadcrumbName="分发批次" path="Allot" component={AllotManage} />
        <Route breadcrumbName="回盘批次" path="Ffers" component={FfersManage} />
        <Route breadcrumbName="账单批次" path="Bill" component={BillManage} />
        <Route breadcrumbName="院线介绍" path="Introduce" component={IntroduceManage} />
        <Route breadcrumbName="帮助文档" path="Helpme(/:OrderedList)" component={Helpme} />
      </Router>
    </Router>
  );
};
