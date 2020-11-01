import { GET_POST_ERRORS } from "../actions/post.actions";
import { GET_USER_ERRORS } from "../actions/user.actions";

const initialState = { errors: [] };

export default function trendsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ERRORS:
      return action.payload;
    case GET_POST_ERRORS:
      return action.payload;
    default:
      return state;
  }
}