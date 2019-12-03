import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import RequireAuth from './modules/common/auth/require_auth';
import PublicPage from './modules/common/auth/public_page';
import Layout from './layout';
import SignIn from './modules/signin/signin';
import Homepage from './modules/homepage/homepage';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Layout>
            <Route exact path='/' component={RequireAuth(Homepage)}/>
            <Route exact path='/dashboard' component={RequireAuth(Homepage)}/>
            <Route exact path='/dashboard/:company' component={RequireAuth(Homepage)}/>
            <Route exact path='/signin' component={PublicPage(SignIn)}/>
          </Layout>
        </Switch>
      </Router>
    )
  }
}

export default connect(null, null)(App);
