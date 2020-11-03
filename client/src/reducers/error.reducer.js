import { GET_POST_ERRORS } from "../actions/post.actions";
import { GET_USER_ERRORS } from "../actions/user.actions";

const initialState = { userErrors: [], postErrors: [] };

export default function trendsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ERRORS:
      return {
        userErrors: action.payload,
        postErrors: []
      }
    case GET_POST_ERRORS:
      return {
        postErrors: action.payload,
        userErrors: []
      }
    default:
      return state;
  }
}