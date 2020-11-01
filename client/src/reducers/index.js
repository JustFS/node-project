import { combineReducers } from 'redux';

import postReducer from './post.reducer';
import userReducer from './user.reducer';
import trendingReducer from './trending.reducer';
import errorReducer from './error.reducer';

export default combineReducers({
  postReducer,
  userReducer,
  trendingReducer,
  errorReducer
});