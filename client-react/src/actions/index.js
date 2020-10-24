import axios from 'axios';

// posts
export const GET_POSTS = 'GET_POSTS';

// users
export const GET_USERS = 'GET_USERS';

export const setPosts = () => {
  return (dispatch) => {
    return axios.get(`${process.env.REACT_APP_API_URL}api/post`)
      .then((res) => {
        dispatch({type: GET_POSTS, posts: res.data})
      })
      .catch((err) => { console.log('error', err); });
  };
};

export const getUsers = () => {
  return (dispatch) => {
    return axios.get(`${process.env.REACT_APP_API_URL}api/user`)
      .then((res) => {
        dispatch({type: GET_USERS, users: res.data})
      })
      .catch((err) => { console.log('error', err); });
  };
};


