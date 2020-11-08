import { combineReducers } from 'redux';

import postReducer from './post.reducer';
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import trendingReducer from './trending.reducer';
import allPostsReducer from './allPosts.reducer';
import errorReducer from './error.reducer';

export default combineReducers({
  postReducer,
  userReducer,
  usersReducer,
  trendingReducer,
  errorReducer,
  allPostsReducer
});