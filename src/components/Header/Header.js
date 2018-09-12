import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut/SignOut';
import AuthUserContext from '../AuthUserContext';

import * as routes from '../../constants/routes';

import './Header.css';
  
const Header = ({ authUser }) => {
  const HeaderNonAuth = () => {
    return (
      <header>
        <img src="images/rtd-logo.png" className="logo-banner" />
        <Link to={routes.SIGN_IN}>Sign In</Link>
      </header>
    );
  };
  
  const HeaderAuth  = () => {
    return (
      <header>
        <img src="images/rtd-logo.png" className="logo-banner" />
        <SignOutButton />
      </header>
    ); 
  };
  
  return (
    <AuthUserContext.Consumer>
      { authUser => authUser
        ? <HeaderAuth />
        : <HeaderNonAuth />
      }
    </AuthUserContext.Consumer>
  );
};

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(Header);