import React from 'react'
import { Modal, Checkbox } from 'antd'
import styles from './RoleAuth.less'

const CheckboxGroup = Checkbox.Group;

let checked = [];

const RoleAuth = React.createClass({
  handleChange(e, index){
    checked[index] = e;
  },
  buildCheckboxGroup(){
    let   renderHTML = [];
    const item = this.props.item;
    
    if( item && this.props.modalType === 'visit' ){
      item.AllCheckbox.map((menu, index) => {
        let defaultValue = [];
        menu.values.map(auth => {
          item.ItemAuth.menuList.map(item => {
            if( item.menuid === auth.value ){
              defaultValue.push(item.menuid);
            }
          });
        });

        checked[index] = defaultValue;

        renderHTML.push(<h2 key={"title" + index} className={styles.title}>{menu.title}</h2>);
        renderHTML.push(
          <CheckboxGroup
            key={"checkbox" + index}
            options={menu.values}
            className={styles.checkbox}
            defaultValue={defaultValue}
            onChange={(e) => this.handleChange(e, index)}
          />
        );
      });
    }

    return renderHTML;
  },
  render(){
    const _this = this;
    const ModalProps = {
      visible: this.props.visible,
      title: '角色授权',
      wrapClassName: "vertical-center-modal",
      confirmLoading: _this.props.loading,
      width: '600px',
      onOk(){
        let params = [];
        checked.map(arr => {
          params = params.concat(arr)
        });

        _this.props.onOk({
          roleid:  _this.props.item.ItemAuth.roleid,
          menuids: params.join('_')
        });
      },
      onCancel(){
        _this.props.onCancel();
      }
    };

    return (
      <Modal {...ModalProps}>
        { this.buildCheckboxGroup() }
      </Modal>
    );
  }
})

export default RoleAuth
