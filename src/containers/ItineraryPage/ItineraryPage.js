import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItineraryCard from '../../components/ItineraryCard/ItineraryCard';
import PropTypes from 'prop-types';
import { postFavoriteUrl } from '../../constants/urlGenerator';
import addFavoriteThunk from '../../thunks/addFavoriteThunk';
import getFavoritesThunk from '../../thunks/getFavoritesThunk';
import LoadingPage from '../../components/Loading/Loading';


import './ItineraryPage.css';


export class ItineraryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: null
    };
  }

  componentDidMount() {
    const { itinerary } = this.props;
    if (itinerary.length) {
      this.setState({
        favorite: itinerary[0].favorite
      });
    }
  }

  addFavorite = (event) => {
    let id;
    if (this.props.itinerary.length) {
      id = this.props.itinerary[0].itinerary_id;
    }
    const { value } = event.target;
    const url = postFavoriteUrl(value, id);
    const fetchObject = {
      uid: value,
      url,
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    };
    this.props.addFavorite(fetchObject);
  }

  render() {
    const {
      itinerary,
      uid,
      isLoading
    } = this.props;

    let startAddress;
    let endAddress;
    if (itinerary.length) {
      startAddress = itinerary[0].start_address.split(',')[0];
      endAddress = itinerary[0].end_address.split(',')[0];
    }
    const isFavorite = this.state.favorite
      ? 'favorited'
      : 'unfavorited';

    const favoriteText = isFavorite === 'favorited'
      ? ''
      : `add from: ${startAddress} to: ${endAddress} to favorites?`;

    const itineraries = itinerary.reverse().map((itinerary, index) => {
      return (
        <ItineraryCard
          key={index}
          itinerary={itinerary}
          uid={uid}
        />
      );
    });

    if (isLoading) {
      return (
        <LoadingPage type='itinerary' />
      );
    } else {
      return (
        <div className='itinerary-page'>
          <div className='favorite-button-container'>
            {favoriteText}
            <button
              className={isFavorite}
              onClick={this.addFavorite}
              value={uid}
            >
            </button>
          </div>
          {itineraries}
        </div>
      );
    }
  }
}

export const mapStateToProps = state => ({
  favorites: state.favorites,
  itinerary: state.itinerary,
  uid: state.user.uid,
  isLoading: state.isLoading
});

export const mapDispatchToProps = dispatch => ({
  addFavorite: (url) => dispatch(addFavoriteThunk(url)),
  getFavorites: (url) => dispatch(getFavoritesThunk(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryPage);

ItineraryPage.propTypes = {
  favorites: PropTypes.array,
  itinerary: PropTypes.array,
  uid: PropTypes.string,
  addFavorite: PropTypes.func,
  isLoading: PropTypes.bool
};
