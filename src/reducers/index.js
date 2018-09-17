import { combineReducers } from 'redux';
import hasErrored from './hasErroredReducer';
import isLoading from './isLoadingReducer';
import user from './userReducer';
import startAddress from './startAddressReducer';
import endAddress from './endAddressReducer';
import itinerary from './itineraryReducer';
import favorites from './favoriteReducer';

const rootReducer = combineReducers({
  startAddress,
  endAddress,
  hasErrored,
  isLoading,
  user,
  itinerary,
  favorites
});

export default rootReducer;