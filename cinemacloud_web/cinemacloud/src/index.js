import 'babel-polyfill'
import 'antd/dist/antd.less'
import './index.html'
import './index.less'
import dva from 'dva'
import { browserHistory } from 'dva/router'
import createLogger from 'redux-logger'
import createLoading from 'dva-loading'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

// 1. Initialize
const app = dva({
  onError(e) {
    console.log(e);
  },
  onAction: createLogger(),
  history: browserHistory
});

// 2. Plugins
// app.use(createLoading());

// 3. Model
app.model(require('./models/app'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
