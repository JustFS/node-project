import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/userActions";


const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer.user);

  const handlePicture = (e) => {
    const data = new FormData();
    data.append("name", userData.pseudo);
    data.append("file", file);
    
    dispatch(uploadPicture(data))
  };

  return (
    <div className="upload-pic">
      <label htmlFor="file">file</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handlePicture}>Send</button>
    </div>
  );
};

export default UploadImg;
