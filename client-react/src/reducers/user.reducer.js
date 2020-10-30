import { FOLLOW_USER, GET_USER, GET_USERS, UNFOLLOW_USER, UPDATE_BIO } from "../actions/userActions";

const initialState = { user: [], users: [] };

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { user: action.payload, users: state.users };
    case GET_USERS:
      return { user: state.user, users: action.payload };
    case FOLLOW_USER:
      return {
        user: {
          ...state.user,
          following: [action.payload.idToFollow, ...state.user.following],
        },
        users: state.users,
      };
    case UNFOLLOW_USER:
      return {
        user: {
          ...state.user,
          following: state.user.following.filter(id => id !== action.payload.idToFollow)

        },
        users: state.users
      }
    case UPDATE_BIO:
      return {
        user: {
          ...state.user,
          bio: action.payload
        },
        users: state.users
      }
    default:
      return state;
  }
}