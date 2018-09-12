import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { auth, db } from '../../firebase';

import * as routes from '../../constants/routes';

const SignUpPage = ({ history }) => {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm history={history} />
    </div>
  );
};

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }

    onSubmit = (event) => {
      const {
        username,
        email,
        passwordOne
      } = this.state;

      const { history } = this.props;
  
      auth.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          db.doCreateUser(authUser.user.uid, username, email)
            .then(() => {
              this.setState({ ...INITIAL_STATE });
              history.push(routes.HOME);
            })
            .catch(error => {
              this.setState({error: error});
            });
        })
        .catch(error => {
          this.setState({error: error});
        });
  
      event.preventDefault();
    }

    handleChange = (event) => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };

    render() {
      const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error
      } = this.state;

      const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

      return (
        <form onSubmit={this.onSubmit}>
          <input
            name="username"
            value={username}
            onChange={this.handleChange}
            type="text"
            placeholder="Full Name"
          />
          <input
            name="email"
            value={email}
            onChange={this.handleChange}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.handleChange}
            type="password"
            placeholder="Password"
          />
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.handleChange}
            type="password"
            placeholder="Confirm Password"
          />
          <button 
            type="submit"
            disabled={isInvalid}
          >
          Sign Up
          </button>

          { error && <p>{error.message}</p> }
        </form>
      );
    }
}

const SignUpLink = () => {
  return (
    <p>Don't have an account?{' '}
      <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>
  );

};

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink
};