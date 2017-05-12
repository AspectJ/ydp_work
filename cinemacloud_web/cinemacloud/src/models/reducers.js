export default {
  reducers: {
    showLoading(state, action){
      return { ...state, ...action.payload, loading: true };
    },
    // 控制 Modal 显示状态的 reducer
    showModal(state, action){
      return { ...state, ...action.payload, modalVisible: true };
    },
    hideModal(state, action){
      return { ...state, ...action.payload, modalVisible: false };
    },
    // 控制右侧的内容切换
    showContent(state,action){
      return { ...state, ...action.payload, contentVisible: true };
    },
    hideContent(state,action){
      return { ...state, ...action.payload, contentVisible: false };
    },
    // 使用静态数据返回
    querySuccess(state, action){
      return { ...state, ...action.payload, loading: false };
    },
    changeDropdown(state, { payload }){
      const { item, list } = payload;
      return { ...state, dropdownItem:{ ...state.dropdownItem, [item]: list }};
    },
    changeLogCount(state, action){
      return { ...state, ...action.payload };
    }
  }
}
