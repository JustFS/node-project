import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
// comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

// users
export const GET_USER = "GET_USER";
export const GET_USERS = "GET_USERS";

export const getPosts = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post`)
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};
export const addPost = (posterId, message, posterPic, posterPseudo) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/post`,
      data: { posterId, message, posterPic, posterPseudo },
    })
      .then((res) => {
        dispatch({
          type: ADD_POST,
          payload: {
            posterId,
            message,
            posterPic,
            posterPseudo,
          },
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};
export const updatePost = (postId, message) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: { message },
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { message, postId } });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: postId });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const addComment = (
  cardId,
  commenterId,
  text,
  commenterPic,
  commenterPseudo
) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/comment-post/` + cardId,
      data: { commenterId, text, commenterPic, commenterPseudo },
    })
      .then((res) => {
        dispatch({
          type: ADD_COMMENT,
          payload: { cardId },
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const editComment = (postId, commentId, text) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url:
        `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/` + postId,
      data: {
        commentId,
        text,
      },
    }).then((res) => {
      dispatch({
        type: EDIT_COMMENT,
        payload: {
          postId,
          commentId,
          text,
        },
      });
    });
  };
};

export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url:
        `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/` + postId,
      data: {
        commentId
      },
    }).then((res) => {
      dispatch({
        type: DELETE_COMMENT,
        payload: {postId, commentId}
      });
    });
  };
};

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const getUsers = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user`)
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};
