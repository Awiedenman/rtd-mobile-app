import { combineReducers } from 'redux';
import hasErrored from './hasErroredReducer';
import isLoading from './isLoadingReducer';
import schedules from './scheduleReducer';
import userSearch from './userSearchReducer';
import favorites from './favoritesReducer';
import sessionsReducer from './sessionsReducer';
import userReducer from './userReducer';


const rootReducer = combineReducers({
  userSearch,
  schedules,
  hasErrored,
  isLoading,
  favorites,
  sessionState: sessionsReducer,
  userState: userReducer
});

export default rootReducer;