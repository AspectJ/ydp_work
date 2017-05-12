import subscriptions from './subscriptions'
import effects from './effects'
import reducers from './reducers'

let state = {
  namespace: 'app',
  state: {
    list: [],
    total: null,
    message: {},
    areaInfo: [],
    result: {}, // 返回信息
    loading: false, // 控制加载状态
    current: null, // 当前分页信息
    currentItem: {}, // 当前操作的用户对象
    modalVisible: false, // 弹出窗的显示状态
    modalType: 'create', // 弹出窗的类型（create/update/visit）
  }
};

let app = {...state, ...subscriptions, ...effects, ...reducers};

export default app
