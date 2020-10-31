import { combineReducers } from 'redux';

import postReducer from './post.reducer';
import userReducer from './user.reducer';
import trendingReducer from './trending.reducer';
import threadReducer from './thread.reducer';

export default combineReducers({
  postReducer,
  userReducer,
  trendingReducer,
  threadReducer
});