import React from 'react';
import './Header.css';
import SignOutButton from '../SignOut/SignOut';
import { Link } from 'react-router-dom';

import AuthUserContext from '../AuthUserContext';
import * as routes from '../../constants/routes';

  
const Header = () => {
  const HeaderNonAuth = () => {
    return (
      <header>
        <img src="/rtd-logo.png" className="logo-banner" />
        <Link 
          to={routes.SIGN_IN}
          className='sign-in-link'
        >
          Sign In
        </Link>
      </header>
    );
  };
  
  const HeaderAuth  = () => {
    return (
      <header>
        <img src="/rtd-logo.png" className="logo-banner" />
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

export default Header;