import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
 
class StartPointInput extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      startAddress: ''
    };
  }
 
  handleChange = startAddress => {
    this.setState({ startAddress });
  };
 
  handleSelect = address => {
    console.log('start: ', address);
    return address;
  };
 
  render() {
    return (
      <PlacesAutocomplete
        name='startAddress'
        value={this.state.startAddress}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
  
          return (
            <div>
              <input
                value={this.state.startAddress}
                {...getInputProps({
                  placeholder: 'Search Starting Point ...',
                  className: 'location-search-input-start'
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, index )=> {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      key={index}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) 
;}}
      </PlacesAutocomplete>
    );
  }
}

export default StartPointInput;