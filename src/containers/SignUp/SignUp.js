
import React, { Component } from 'react'; 
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import signUpThunk from '../../thunks/signUpThunk';
import * as routes from '../../constants/routes';
import { auth } from '../../firebase';
import PropTypes from 'prop-types';
import { SignInLink } from '../SignIn/SignIn';

import './SignUp.css';

export class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      passwordOne: "",
      passwordTwo: "",
      error: null
    };
  }

  createUser = userInfo => ({
    url: "http://rtd-revamp-api.herokuapp.com/api/v1/users",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        uid: userInfo.user.uid,
        email: userInfo.user.email
      })
    }
  });

  resetForm = () => {
    this.setState({
      username: "",
      email: "",
      passwordOne: "",
      passwordTwo: "",
      error: null
    });
  };

  onSubmit = event => {
    event.preventDefault();

    const { email, passwordOne } = this.state;

    const { history, signUpThunk } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        const newUser = this.createUser(authUser);
        return signUpThunk(newUser);
      })
      .catch(error => {
        this.setState({ error: error });
      });
    this.resetForm();
    history.push(routes.HOME);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
<<<<<<< HEAD
      <div className="sign-up-container">
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
          <button type="submit" disabled={isInvalid}>
            Sign Up
          </button>

          {error && <p>{error.message}</p>}
        </form>
        <SignInLink />
=======
      <div className='sign-up-page'>
        <div className='sign-up-container'>
          <form 
            className='sign-up-form'
            onSubmit={this.onSubmit}
          >
            <p className='sign-up-title'>
            Sign Up
            </p>
            <input
              className='sign-up-input'
              name='username'
              value={username}
              onChange={this.handleChange}
              type='text'
              placeholder='Full Name'
            />
            <input
              className='sign-up-input'
              name='email'
              value={email}
              onChange={this.handleChange}
              type='email'
              placeholder='Email Address'
            />
            <input
              className='sign-up-input'
              name='passwordOne'
              value={passwordOne}
              onChange={this.handleChange}
              type='password'
              placeholder='Password'
            />
            <input
              className='sign-up-input'
              id='password-two'
              name='passwordTwo'
              value={passwordTwo}
              onChange={this.handleChange}
              type='password'
              placeholder='Confirm Password'
            />
            <button 
              className='button'
              type='submit'
              disabled={isInvalid}
            >
        Sign Up
            </button>

            { error && <p>{error.message}</p> }
          </form>
          <SignInLink />
        </div>
>>>>>>> master
      </div>
    );
  }
}

const SignUpLink = () => {
  return (
    <p>
<<<<<<< HEAD
      Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
=======
    Don't have an account?
      {' '}
      <Link 
        className='link'
        to={routes.SIGN_UP}
      >
        Sign Up
      </Link>
>>>>>>> master
    </p>
  );
};

export const mapDispatchToProps = dispatch => ({
  signUpThunk: userInfo => dispatch(signUpThunk(userInfo))
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(SignUpPage)
);

export { SignUpLink };

SignUpPage.propTypes = {
  signUpThunk: PropTypes.func,
  history: PropTypes.object
};
