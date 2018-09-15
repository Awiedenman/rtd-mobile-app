const itinerary = (state = [], action) => {
  switch (action.type) {
  case 'STORE_ITINERARY':
    return action.itinerary;

  default:
    return state;
  }
};

export default itinerary;