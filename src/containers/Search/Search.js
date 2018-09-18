import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import StartAddressInput from '../../containers/StartAddressInput/StartAddressInput';
import EndAddressInput from '../../containers/EndAddressInput/EndAddressInput';
import postItineraryThunk from '../../thunks/postItineraryThunk';
import * as routes from '../../constants/routes';
import { hours, minutes } from '../../constants/timeArrays';

import './Search.css';
import { itineraryUrl } from '../../constants/urlGenerator';

export class Search extends Component {
  constructor(props) {
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
      postItineraryThunk,
      history,
      uid
    } = this.props;
    const url = itineraryUrl(uid);
    const bodyObj = {
      start_address: startAddress,
      end_address: endAddress,
      ...timeData
    };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyObj)
    };
    const fetchObject = {
      url,
      options
    };
    postItineraryThunk(fetchObject);
    history.push(routes.ITINERARY);
  };


  minuteOptions = () => {

  };

  render() {

    const hourOptions = hours.map((hour, index) => (
      <option key={index} value={hour}>{hour}</option>
    ));

    const minuteOptions = minutes.map((minute, index) => (
      <option key={index} value={minute}>{minute}</option>
    ));

    return (
      <div className="search_container">
        <h2 className='search-title'>
          Search for a connection:
        </h2>
        <form
          className='time'
          onSubmit={this.handleSubmit}
        >
          <StartAddressInput />
          <EndAddressInput />
          <div className='time-select-container'>
            <div
              className='radio-container'
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
              <label
                htmlFor='departing'
                className='radio-label'
              >
                departing
              </label>
              <input
                name='departing'
                id='arriving'
                type='radio'
                value={false}
              />
              <label
                htmlFor='arriving'
                className='radio-label'
              >
                arriving
              </label>
              <p id='at'>at</p>
            </div>
            <input
              className='time-select'
              name='hours'
              onChange={this.handleChange}
              value={this.state.hours}
              list='hours'
              id='hours'
            />
            <datalist
              className='time-datalist'
              id='hours'
            >
              {hourOptions}
            </datalist>
            :
            <input
              className='time-select'
              name='minutes'
              onChange={this.handleChange}
              value={this.state.minutes}
              list='minutes'
              id='minutes'
            />
            <datalist
              className='time-datalist'
              id='minutes'
              value={this.state.minutes}
            >
              {minuteOptions}
            </datalist>
          </div>
          <button
            type='submit'
            className='search-button'
          >
            Search
          </button >
        </form>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  startAddress: state.startAddress,
  endAddress: state.endAddress,
  uid: state.user.uid
});

export const mapDispatchToProps = dispatch => ({
  postItineraryThunk: (fetchObject) => dispatch(postItineraryThunk(fetchObject))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));

Search.propTypes = {
  postItineraryThunk: PropTypes.func,
  storeUserSearch: PropTypes.func,
  startAddress: PropTypes.string,
  endAddress: PropTypes.string,
  history: PropTypes.object,
  uid: PropTypes.string
};