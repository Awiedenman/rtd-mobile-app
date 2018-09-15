import { combineReducers } from 'redux';
import hasErrored from './hasErroredReducer';
import isLoading from './isLoadingReducer';
import schedules from './scheduleReducer';
import user from './userReducer';
import favorites from './favoritesReducer';
import startAddress from './startAddressReducer';
import endAddress from './endAddressReducer';
import itinerary from './itineraryReducer';


const rootReducer = combineReducers({
  startAddress,
  endAddress,
  schedules,
  hasErrored,
  isLoading,
  favorites,
  user,
  itinerary
});

export default rootReducer;