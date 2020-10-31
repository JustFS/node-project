export const GET_TRENDS = "GET_TRENDS";

export const getTrends = (sortedArray) => {
  return (dispatch) => {
    dispatch({
      type: GET_TRENDS,
      payload: sortedArray,
    });
  };
};