import React from 'react'
import { connect } from 'dva'
import BannerManage from '../components/BannerManage'

let Banner = ({ app, dispatch }) => {
  const { list, loading } = app;

  const BannerManageProps = {
    list,
    loading,
    onSubmit(params){
      dispatch({
        type: 'app/updateBanners',
        payload: params
      });
    }
  };

  return(
    <BannerManage {...BannerManageProps} />
  )
}

function mapStateToProps({ app }){
  return { app };
}

export default connect(mapStateToProps)(Banner)
