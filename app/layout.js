import React from 'react';
import {connect} from 'react-redux';
import Toast from './modules/common/toast/toast';

const Layout = props => {
  const {sidebar, toast, isAuthenticated, isCompleted} = props;
  return (
    <React.Fragment>
      {props.children}
      {toast.show && <Toast/>}
    </React.Fragment>
  )
};

const mapStateToProps = state => {
  return {
    toast: state.layout.toast,
  }
};

export default connect(mapStateToProps, null)(Layout);
