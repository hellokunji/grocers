import React from 'react';
import {connect} from 'react-redux';
import {facebookLoginStart} from '../../store/actions/auth';
import './signin.scss';

class Todo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleFBLogin = () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
      //'display': 'popup'
    });

    firebase.auth().signInWithPopup(provider).then((result) => {
      let reqData = {};
      reqData.success = true;
      reqData.profile = result.additionalUserInfo.profile;
      reqData.credential = result.credential;
      this.props.facebookLoginStart(reqData);
    }).catch(error => {
      let reqData = {};
      reqData.success = false;
      reqData.error = error;
      this.props.facebookLoginStart(reqData);
      //console.log('error', error);
    });
  };

  render() {
    return (
      <div className="signin">
        <div className="box">
          <div className="logo">
            <img src='/img/logo.png' alt="logo"/>
          </div>
          <div className="title">Grocers</div>
          <button className='fb_button' onClick={this.handleFBLogin}>
            <img src="/img/facebook-circular-logo.png" alt="fb-logo"/>
            <span>Continue with facebook</span>
          </button>
        </div>
        <span className="align"/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    todo: state.todo
  };
};

export default connect(mapStateToProps, {facebookLoginStart})(Todo);
