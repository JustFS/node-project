import { combineReducers } from 'redux';

import postReducer from './post.reducer';
import userReducer from './user.reducer';
import trendingReducer from './trending.reducer';

export default combineReducers({
  postReducer,
  userReducer,
  trendingReducer
});