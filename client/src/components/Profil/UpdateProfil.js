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
  const errors = useSelector((state) => state.errorReducer.userErrors);
  const uid = useContext(UidContext);

  const isUpdated = () => setUpdateForm(!updateForm);

  const handleUpdate = () => {
    dispatch(uploadBio(userData._id, bio));
    setUpdateForm(false);
  };

  useEffect(() => {
    if (uid) dispatch(getUser(uid));
  }, [uid]);

  return (
    <>
      <h1>Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="" />
          <UploadImg userData={userData} />
          <p>{errors.maxSize}</p>
          <p>{errors.format}</p>
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
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
          <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
          <h5>
            Abonnements : {!isEmpty(userData) ? userData.following.length : "0"}
          </h5>
          <h5>
            Abonnés : {!isEmpty(userData) ? userData.followers.length : "0"}
          </h5>
        </div>
      </div>
    </>
  );
};

export default UpdateProfil;
