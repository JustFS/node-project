import { GET_USERS } from '../actions';

const initialState = { users: [] }

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    default:
      return state;
  }
}