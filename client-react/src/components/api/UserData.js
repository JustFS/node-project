import axios from "axios";

export const userData = async(id) => {
  const result = await axios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}api/user/` + id,
  }).then(res => res.data.ppseudo)

  return result;
};
