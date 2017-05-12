import React from 'react';
import { connect } from 'dva';
import HelpmeInfo from '../components/Helpme/HelpmeInfo'
import HelpmeInfoCinema from '../components/Helpme/HelpmeInfoCinema'

function Helpme(props) {
  const roletype = JSON.parse(sessionStorage.getItem('user')).roletype;
  return (
    roletype === 1 ? (
      <HelpmeInfo ordered={props.params.OrderedList}/>
    ) : (
      <HelpmeInfoCinema ordered={props.params.OrderedList}/>
    )

  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Helpme);
