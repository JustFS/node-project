import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import axios from "axios";
import { dateParser } from "../Utils";
import UploadImg from "./UploadImg";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/userActions";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer.user);
  const uid = useContext(UidContext);

  const isUpdated = () => {
    setUpdateForm(!updateForm);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + uid,
      data: {
        bio,
      },
    })
      .then((res) => {
        console.log("Modifié");
      })
      .catch((err) => {
        console.log(err);
      });
    setUpdateForm(false);
  };

  useEffect(() => {
    if (uid) {
      dispatch(getUser(uid));
    }
  }, [uid, updateForm, bio]);

  return (
    <div className="update-container">
      <div className="left-part">
        <h3>Membre depuis le : {dateParser(userData.createdAt)} </h3>
        <h3>pseudo : {userData.pseudo}</h3>
        <h5>Changer Email</h5>
        <input type="text" />
        <div className="password">
          <h3>Changer mot de passe</h3>
          <h5>Mot de passe actuel : </h5>
          <input type="password" />
          <h5>Nouveau mot de passe</h5>
          <input type="password" />
          <h5>Confirmer mot de passe</h5>
          <input type="password" />
        </div>
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
