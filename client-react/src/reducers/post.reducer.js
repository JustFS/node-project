import {
  DELETE_COMMENT,
  DELETE_POST,
  EDIT_COMMENT,
  GET_POSTS,
  UPDATE_POST,
} from "../actions/actionsRoot";

const initialState = { posts: [] };

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case UPDATE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            post: { message: action.payload.message },
          };
        } else {
          return post;
        }
      });
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload);
    case EDIT_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
            if (comment._id === action.payload.commentId) {
              return {
                ...comment,
                text: action.payload.text,
              };
            } else {
              return comment;
            }
          })
        }
        } else {
          return post;
        }
      });
    case DELETE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.filter((comment) => comment._id !== action.payload.commentId)
          }
        } else { 
          return post
        }
      });
    default:
      return state;
  }
}
