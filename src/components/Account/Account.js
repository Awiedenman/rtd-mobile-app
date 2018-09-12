import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from '../withAuthorization';
import AuthUserContext from '../AuthUserContext';
import PasswordChangeForm from '../PasswordChange/PasswordChange';

const AccountPage = ({ authUser }) =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordChangeForm />
      </div>
    }
  </AuthUserContext.Consumer>;

export const mapStateToProps = (state) => ({
  authUser: state.sessionsState.authUser
});

const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition),
  connect(mapStateToProps))(AccountPage);