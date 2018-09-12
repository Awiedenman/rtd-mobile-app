import React from 'react';

import withAuthorization from '../withAuthorization';
import AuthUserContext from '../AuthUserContext';
import PasswordChangeForm from '../PasswordChange/PasswordChange';

const AccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordChangeForm />
      </div>
    }
  </AuthUserContext.Consumer>;

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);