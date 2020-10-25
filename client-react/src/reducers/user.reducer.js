import { GET_USER, GET_USERS } from '../actions/actionsRoot';

const initialState = { users: [] }

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case GET_USERS:
      return action.payload;
    default:
      return state;
  }
}