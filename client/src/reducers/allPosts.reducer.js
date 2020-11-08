import { GET_ALL_POSTS } from "../actions/post.actions";

const initialState = { trending: [] };

export default function trendsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.payload;
    default:
      return state;
  }
}