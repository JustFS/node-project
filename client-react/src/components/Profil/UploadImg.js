import React from "react";

const UploadImg = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="file" name="avatar" />
      <input type="submit" value="envoyer" />
    </form>
  );
};

export default UploadImg;
