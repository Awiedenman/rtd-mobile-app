import React, { Component } from 'react';
import Search from '../../containers/Search/Search';
import FavoritesContainer from '../FavoritesContainer/FavoritesContainer';
import { storeMockFavRoutes} from '../../actions';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import withAuthorization from '../withAuthorization';
import { db } from '../../firebase';

import './Home.css';

export class HomePage extends Component {
  componentDidMount() {
    const { onSetUsers } = this.props;

    db.onceGetUsers().then(snapshot =>
      onSetUsers(snapshot.val())  
    );
  }

  render(){
    const { users } = this.props;

    return (
      <div>
        <Search />
        <FavoritesContainer />

        { !!users && <UserList users={users} />}
      </div>
    );
  }
}

const UserList = ({ users }) => 
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>;

export const mapStateToProps = (state) => ({
  users: state.userState.users
});

export const mapDispatchToProps = dispatch => ({
  storeMockFavRoutes: (mockFavRoutes) => (
    dispatch(storeMockFavRoutes(mockFavRoutes))
  ),
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users })
});

const authCondition = (authUser) => !!authUser;

export default compose(withAuthorization(authCondition), connect(mapStateToProps, mapDispatchToProps))(HomePage);

HomePage.propTypes = {
  storeMockFavRoutes: PropTypes.array
};