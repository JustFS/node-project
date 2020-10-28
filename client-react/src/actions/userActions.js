import axios from "axios";

export const GET_USER = "GET_USER";
export const GET_USERS = "GET_USERS";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

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

export const followUser = (followerId, authorId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
      data: {authorId},
    })
      .then((res) => {
        dispatch({
          type: FOLLOW_USER,
          payload: {authorId},
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const unfollowUser = (followerId, authorId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
      data: {authorId},
    })
      .then((res) => {
        dispatch({
          type: UNFOLLOW_USER,
          payload: {authorId},
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};

export const uploadPicture = (data) => {
  return (dispatch) => {
      // axios.post(`https://httpbin.org/anything`, data)
      return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/upload`, data
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }
}
