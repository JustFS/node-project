import axios from 'axios';

export const GET_THREAD = "GET_THREAD";

export const getThread = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post`)
      .then((res) => {
        res.data.length = num
        dispatch({ type: GET_THREAD, payload: res.data });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
};