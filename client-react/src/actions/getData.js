import axios from "axios";

export const getData = async () => {
  await axios.get(`${process.env.REACT_APP_API_URL}api/post`).then((res) => {
    return res.data;
  });
};
