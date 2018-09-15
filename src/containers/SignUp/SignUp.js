import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import signUpThunk from '../../thunks';
import * as routes from '../../constants/routes';
import { auth } from '../../firebase';
import PropTypes from 'prop-types';
import { SignInLink } from '../SignIn/SignIn';


class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      passwordOne: '',
      passwordTwo: '',
      error: null
    };
  }

  createUser = (userInfo) => ({
    url: 'http://rtd-revamp-api.herokuapp.com/api/v1/users',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        uid: userInfo.user.uid,
        email: userInfo.user.email
      })
    }
  })
  
  resetForm = () => {
    this.setState({
      username: '',
      email: '',
      passwordOne: '',
      passwordTwo: '',
      error: null
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const {
      email,
      passwordOne
    } = this.state;
    
    const { history } = this.props;
    
    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        const newUser = this.createUser(authUser);
        return this.props.signUpThunk(newUser);
      })
      .catch(error => {
        this.setState({error: error});
      });
    this.resetForm();
    history.push(routes.HOME);
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
      <div className='sign-up-container'>
        <form onSubmit={this.onSubmit}>
          <input
            name='username'
            value={username}
            onChange={this.handleChange}
            type='text'
            placeholder='Full Name'
          />
          <input
            name='email'
            value={email}
            onChange={this.handleChange}
            type='email'
            placeholder='Email Address'
          />
          <input
            name='passwordOne'
            value={passwordOne}
            onChange={this.handleChange}
            type='password'
            placeholder='Password'
          />
          <input
            name='passwordTwo'
            value={passwordTwo}
            onChange={this.handleChange}
            type='password'
            placeholder='Confirm Password'
          />
          <button 
            type='submit'
            disabled={isInvalid}
          >
        Sign Up
          </button>

          { error && <p>{error.message}</p> }
        </form>
        <SignInLink />
      </div>
    );
  }
}

const SignUpLink = () => {
  return (
    <p>
    Don't have an account?
      {' '}
      <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>
  );

};

export const mapDispatchToProps = dispatch => ({
  signUpThunk: (userInfo) => dispatch(signUpThunk(userInfo))
});

export default withRouter(connect(null, mapDispatchToProps)(SignUpPage));

export {
  SignUpLink
};

SignUpPage.propTypes = {
  signUpThunk: PropTypes.func,
  history: PropTypes.object
};