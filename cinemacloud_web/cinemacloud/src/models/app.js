import subscriptions from './subscriptions'
import effects from './effects'
import reducers from './reducers'

let state = {
  namespace: 'app',
  state: {
    loading: false,
    // 列表数据
    list: [],
    total: null,
    current: null,
    // 弹出层
    modalType: 'create', // create/visit/update
    modalItem: null,
    modalVisible: false,
    // 详细内容(总览/新建/查看/修改)
    contentType: 'total', // total/create/visit/update/
    contentItem: [],
    contentVisible: true,
    contentTotal: null,
    contentCurrent: null,
    contentTitle: null,
    // 用户日志
    log: 0,
    //下拉菜单
    dropdownItem: {
      belong:   [],
      operator: [],
      // 用户列表
      role:     [],  // 角色
      theater:  [],  // 院线
      cinema:   [],  // 影院
      // 归档属性
      citytype: [],  // 城市类别
      jointype: [],  // 加盟方式
      // 文章管理
      columns:  [],  // 栏目
      // excel模板
      template: []
    }
  }
};

let app = {...state, ...subscriptions, ...effects, ...reducers};

export default app
