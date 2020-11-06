import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, uploadPicture } from "../../actions/user.actions";


const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData.pseudo);
    data.append("file", file);
    data.append("userId", userData._id);
    
    dispatch(uploadPicture(data));
    dispatch(getUser(userData._id));
    setFile('');
  };

  return (
    <form onSubmit={(e) => handlePicture(e)} className="upload-pic">
      <label htmlFor="file">Changer d'image</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br/>
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;
