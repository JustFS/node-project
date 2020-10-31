import {
  GET_TRENDS
} from "../actions/trending.actions";

const initialState = { trending: [] };

export default function trendsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRENDS:
      return action.payload;
    default:
      return state;
  }
}