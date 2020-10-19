import React, { useState } from "react";
import axios from 'axios';

const UploadImg = () => {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);

  const uploadFiles = async () => {
    const imageData = new FormData();
    files.forEach((file, i) => {
      imageData.set(i, file);
    });
    setUploadingImage(true);
    const res = await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/`,
      data: {
        files:imageData
      },
    });
    const newImages = [...res, ...images];
    setImages(newImages);
    setUploadingImage(false);
  };

  return (
    <div className="container">
        <div className="align-center">
          <button onClick={uploadFiles}>
            {uploadingImage ? "Uploading..." : "Upload"}
          </button>
          <button onClick={() => setFiles([])}>Remove</button>
        </div>
    </div>
  );
};

export default UploadImg;