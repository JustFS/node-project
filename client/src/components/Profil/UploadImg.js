import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";


const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer.user);

  const handlePicture = (e) => {
    const data = new FormData();
    data.append("name", userData.pseudo);
    data.append("file", file);
    data.append("userId", userData._id);
    
    dispatch(uploadPicture(data));
    setFile('');
  };

  return (
    <form onSubmit={(e) => handlePicture(e)} className="upload-pic">
      <label htmlFor="file">file</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;
