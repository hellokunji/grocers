import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

export default (ComposedComponent) => {
  class Authentication extends React.Component {
    checkAuth() {
      const {isAuthenticated, isCompleted} = this.props;
      const {pathname} = this.props.location;
      let redirectUrl = null;
      if (!isAuthenticated) {
        redirectUrl = `/signin?redirect=${pathname}`;
      }
      return redirectUrl;
    }

    render() {
      const redirect = this.checkAuth();
      //console.log(redirect);
      if (redirect !== null) return <Redirect to={redirect}/>;
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    };
  };

  return connect(mapStateToProps)(Authentication);
}
