import React, { Component } from 'react';
import { fetchScheduleThunk } from '../../thunks/fetchScheduleThunk';
import { storeUserSearch } from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Search.css';
// import LocationSearchInput from
//   '../../components/LocationSearchInput.js/LocationSearchInput';


export class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      startPoint: '',
      destination: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const url = 'somestring';
    this.props.storeRouteSchedules(url);
    this.props.storeUserSearch(this.state);  
    this.setState({startPoint: '', destination: ''});
  }

  render(){
    return (
      <div className="search_container">
        <form onSubmit={ this.handleSubmit }>
          {/* <LocationSearchInput />
          <LocationSearchInput /> */}
          <input
            id="starting_location"
            className="search-input"
            onChange={ this.handleChange }
            type="text" 
            name="startPoint"
            value={ this.state.startPoint } 
            placeholder="Starting Location" 
          />
          <input 
            id="destination"
            className="search-input"
            onChange={ this.handleChange }
            type="text" 
            name='destination' 
            value={ this.state.destination } 
            placeholder="Destination" 
          />
          <button 
            className="search_button"
            type='submit'>Search
          </button>
        </form>   
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  storeRouteSchedules: (url) => dispatch(fetchScheduleThunk(url)),
  storeUserSearch: (startingPoint, destination) => (
    dispatch(storeUserSearch(startingPoint, destination)))
});

export default connect(null, mapDispatchToProps)(Search);

Search.propTypes = {
  storeRouteSchedules: PropTypes.func,
  storeUserSearch: PropTypes.func
};