import React, { Component } from 'react';
// import { fetchScheduleThunk } from '../../thunks/fetchScheduleThunk';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StartAddressInput from '../../containers/StartAddressInput/StartAddressInput';
import EndAddressInput from '../../containers/EndAddressInput/EndAddressInput';
import postItineraryThunk from '../../thunks/postItineraryThunk';

import './Search.css';

export class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      hours: this.getTime().hours,
      minutes: this.getTime().minutes,
      departing: true
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  getTime = () => {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return {
      hours,
      minutes
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      hours,
      minutes,
      departing
    } = this.state;
    const depOrArr = departing
      ? 'departure_time'
      : 'arrival_time';
    const timeData = {
      [depOrArr]: `${hours}:${minutes}`
    };
    this.makeOptions(timeData);
  }

  makeOptions = (timeData) => {
    const {
      startAddress,
      endAddress,
      id,
      postItineraryThunk
    } = this.props;
    const url = 
    `http://rtd-revamp-api.herokuapp.com/api/v1/users/3/itineraries`;
    const bodyObj = {
      start_address: startAddress,
      end_address: endAddress,
      ...timeData
    };
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(bodyObj)
    };
    const fetchObject = {
      url,
      options
    };
    postItineraryThunk(fetchObject);
  };
  
  render(){
    return (
      <div className="search_container">
        <StartAddressInput />
        <EndAddressInput />
        <form 
          className='time'
          onSubmit={this.handleSubmit}
        >
          <select 
            name='hours'
            onChange={this.handleChange}
            value={this.state.hours}
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
            <option value='11'>11</option>
            <option value='12'>12</option>
          </select>
          <select 
            name='minutes'
            onChange={this.handleChange}
            value={this.state.minutes}
          >
            <option value='00'>00</option>
            <option value='05'>05</option>
            <option value='10'>10</option>
            <option value='15'>15</option>
            <option value='20'>20</option>
            <option value='25'>25</option>
            <option value='30'>30</option>
            <option value='35'>35</option>
            <option value='40'>40</option>
            <option value='45'>45</option>
            <option value='50'>50</option>
            <option value='55'>55</option>
          </select>
          <div 
            name='departing'
            onChange={this.handleChange}
          >
            <input 
              name='departing'
              id='departing'
              type='radio'
              defaultChecked
              value={true}
            />
            <label htmlFor='departing'>
            departing
            </label>
            <input
              name='departing'
              id='arriving' 
              type='radio'
              value={false}
            />
            <label htmlFor='arriving'>
            arriving
            </label>
            <p>at</p>
          </div>
          <button
            type='submit'
            className='itinerary-search-button'
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  startAddress: state.startAddress,
  endAddress: state.endAddress,
  id: state.userInfo.id
});

export const mapDispatchToProps = dispatch => ({
  postItineraryThunk: (fetchObject) => dispatch(postItineraryThunk(fetchObject))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);

Search.propTypes = {
  postItineraryThunk: PropTypes.func,
  storeUserSearch: PropTypes.func,
  startAddress: PropTypes.string,
  endAddress: PropTypes.string
};