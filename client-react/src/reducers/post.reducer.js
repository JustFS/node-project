import { GET_POSTS } from '../actions';

const initialState = { posts: [] }

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.posts;
    default:
      return state;
  }
}