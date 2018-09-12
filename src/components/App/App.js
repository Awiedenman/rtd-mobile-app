import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../Home/Home';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import AccountPage from '../Account/Account';
import LandingPage from '../Landing/Landing';
import SignUpPage from '../SignUp/SignUp';
import SignInPage from '../SignIn/SignIn';
import PasswordForgetPage from '../PasswordForget/PasswordForget';
import withAuthentication from '../withAuthentication';

import * as routes from '../../constants/routes';

import './App.css';

export const App = () => {
  return (
    <div className="App">
      <div className="overlay">
        <Header />
        <Switch>
          <Route 
            exact path={routes.LANDING} 
            component={LandingPage} 
          />
          <Route 
            exact path={routes.SIGN_UP} 
            component={SignUpPage}
          />
          <Route 
            exact path={routes.SIGN_IN} 
            component={SignInPage} 
          />
          <Route 
            exact path={routes.PASSWORD_FORGET} 
            component={PasswordForgetPage} 
          />
          <Route 
            exact path={routes.HOME} 
            component={HomePage} 
          />
          <Route 
            exact path={routes.ACCOUNT} 
            component={AccountPage} 
          />
        </Switch>
        <Footer />
      </div>
    </div>

  );
};


export default withAuthentication(App);
