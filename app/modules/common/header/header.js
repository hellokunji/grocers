import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {logoutStart} from '../../../store/actions/auth';
import './header.scss';

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    firebase.auth().signOut().then(() => {
      this.props.logoutStart();
    }).catch(function (error) {
      // An error happened.
    });
  };

  render() {
    const {profile} = this.props;
    return (
      <div className="header">
        <div className="cmn_container">
          <div className="left">
            <Link to="/">
              <img src="/img/logo.png" alt="logo"/>
              <span>Grocers</span>
            </Link>
          </div>
          <div className="right">
            <div className="profile">
              <img src={profile.picture.data.url} alt="logo"/>
              <span>{profile.first_name}</span>
            </div>
            <div className="logout" onClick={this.handleLogout}>
              <img src="/img/logout.png" alt="logout"/>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.auth.profile,
  };
};

export default withRouter(connect(mapStateToProps, {logoutStart})(Header));
