import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import { dateParser, isEmpty } from "../Utils";
import UploadImg from "./UploadImg";
import { useDispatch, useSelector } from "react-redux";
import { getUser, uploadBio } from "../../actions/user.actions";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer.user);
  const uid = useContext(UidContext);

  const isUpdated = () => setUpdateForm(!updateForm);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(uploadBio(userData._id, bio));
    setUpdateForm(false);
  };

  useEffect(() => {
    if (uid) dispatch(getUser(uid));
  }, [uid]);

  return (
    <div className="update-container">
      <div className="left-part">
        <h1>{userData.pseudo}</h1>
        <h3>Membre depuis le : {dateParser(userData.createdAt)}</h3>
        <p>Abonnements : {!isEmpty(userData) ? userData.following.length : '0'}</p>
        <p>Abonnés : {!isEmpty(userData) ? userData.followers.length : '0'}</p>

      </div>
      <div className="right-part">
        <h3>Photo de profil</h3>
        <img src={userData.picture} alt="" />
        <UploadImg userData={userData} />
        <div className="bio-update">
          <h4>Bio</h4>
          {updateForm !== true && (
            <>
              <p onClick={isUpdated}>{userData.bio}</p>
              <button onClick={isUpdated}>Modifier Bio</button>
            </>
          )}
          {updateForm && (
            <>
              <textarea
                type="text"
                defaultValue={userData.bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <br />
              <button onClick={handleUpdate}>Valider modifications</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
