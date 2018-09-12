import React, { Component } from 'react';
import Search from '../../containers/Search/Search';
import FavoritesContainer from '../FavoritesContainer/FavoritesContainer';
import { storeMockFavRoutes} from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Home.css';

export class HomePage extends Component {

  render(){
    return (
      <div>
        <Search />
        <FavoritesContainer />
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  storeMockFavRoutes: (mockFavRoutes) => (
    dispatch(storeMockFavRoutes(mockFavRoutes))
  )
});

export default connect(null, mapDispatchToProps)(HomePage);

HomePage.propTypes = {
  storeMockFavRoutes: PropTypes.array
};