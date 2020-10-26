import { ADD_COMMENT, GET_POSTS, UPDATE_POST } from '../actions/actionsRoot';

const initialState = { posts: [] }

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.posts;
    case UPDATE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            post: {message: action.payload.message}
          }
        } else {
          return {...post }
        }
      })
    case ADD_COMMENT:
      return 
    default:
      return state;
  }
}