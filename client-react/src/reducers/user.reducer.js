import { GET_USER, GET_USERS } from '../actions/actionsRoot';

const initialState = { user: [], users: [] }

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {user: action.payload, users: state.users};
    case GET_USERS:
      return {user:state.user, users:action.payload};
    default:
      return state;
  }
}