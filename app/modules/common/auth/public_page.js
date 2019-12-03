import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

export default (ComposedComponent) => {
  class PublicPage extends React.Component {
    checkAuth() {
      const {isAuthenticated} = this.props;
      let redirectUrl = null;
      if (isAuthenticated) {
          redirectUrl = `/dashboard`;
      }
      return redirectUrl;
    }

    render() {
      const redirect = this.checkAuth();
      if (redirect !== null) return <Redirect to={redirect}/>;
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
    };
  };

  return connect(mapStateToProps)(PublicPage);
}
